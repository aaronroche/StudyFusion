
import React, {useState} from 'react';
import app from "./Firebase";
import { getDatabase, ref, get } from "firebase/database";
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import './ViewGroup.css'
import { Link, useLocation } from 'react-router-dom';

export default function ViewGroup() {
    let [sessionArray, setSessionArray] = useState([]);
    const groupKey = useLocation().state.groupKey;
    const groupData = useLocation().state.groupData;

    const fetchData = async () => {
        const db = getDatabase(app);
        const dbRef = (groupKey === null || groupKey === 0) ? ref(db, "groups/group1/sessions")
        : ref(db, "groups/" + groupKey +"/sessions");
        const snapshot = await get(dbRef);
        if(snapshot.exists()) {
          setSessionArray(Object.values(snapshot.val()));
        } else {
          alert("error");
        }
    }

    return (

        <div className='group-info-container'>
            <h1 className='group-title'>{groupData.groupName}</h1>
            <h3 className='desc'>Description</h3>
            <div className='desc-container'>
                <h4>
                {groupData.groupDesc}
                </h4>
            </div>

            <Stack direction="row" spacing={20} justifyContent="center"
                alignItems="start">
                <Stack direction="column" spacing={1} justifyContent="center"
                alignItems="flex-start">
                    <h3>Members</h3>
                    <Avatar>1</Avatar>
                    <Avatar>2</Avatar>
                    <Avatar>3</Avatar>
                </Stack>
                <div>
                    <h3>Upcoming Study Sessions</h3>
                    <button onClick={fetchData}> Display Sessions </button>
                    {sessionArray.map( (item, index) => (
                    <p key={index}> 
                        Session on {item.month}-{item.day} {item.time} {item.location}
                    </p>
                    ) )}
                </div>
            </Stack>
            <div className='create-a-ss'>
                <Link to='/studysession'>
                    <button>Create a Study Session</button>
                </Link>
            </div>
        </div>
    );
}