
import React, {useState} from 'react';
import app from "./Firebase";
import { getDatabase, ref, get } from "firebase/database";
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import './ViewGroup.css'

export default function ViewGroup() {
    let [sessionArray, setSessionArray] = useState([]);

    const fetchData = async () => {
        const db = getDatabase(app);
        const dbRef = ref(db, "groups/group1/sessions");
        const snapshot = await get(dbRef);
        if(snapshot.exists()) {
          setSessionArray(Object.values(snapshot.val()));
        } else {
          alert("error");
        }
    }

    return (

        <div className='group-info-container'>
            <h1 className='group-title'>Chem Buds</h1>
            <h3 className='desc'>Description</h3>
            <div className='desc-container'>
                <h4>
                    This will be a study group for the CHEM 1210 course.
                    Feel free to join this group if you want to meet people
                    who are in the same class!
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
                <button>Create a Study Session</button>
            </div>
        </div>
    );
}