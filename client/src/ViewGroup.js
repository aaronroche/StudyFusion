
import React, {useState} from 'react';
import app from "./Firebase";
import { getDatabase, ref, get } from "firebase/database";

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

        <div>
            <h1>Chem Buds</h1>
            <h3>Description</h3>
            <h3>Upcoming Study Sessions</h3>
            <div>
                <button onClick={fetchData}> Display Sessions </button>
                {sessionArray.map( (item, index) => (
                <p key={index}> 
                    Session on {item.month}-{item.day} {item.time} {item.location}
                </p>
                ) )}
            </div>
            <button className='create-a-ss'>Create a Study Session</button>
        </div>
    );
}