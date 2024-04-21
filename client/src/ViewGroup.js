import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import app from "./Firebase";
import { getDatabase, ref, get, remove, child, update } from "firebase/database";
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import './ViewGroup.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL} from "firebase/storage";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function ViewGroup() {
    let [sessionArray, setSessionArray] = useState([]);
    const [email, setEmail] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const groupKey = useLocation().state.groupKey;
    const groupData = useLocation().state.groupData;
    const auth = getAuth();
    const navigate = useNavigate();

    const storage = getStorage(app);

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const uploadStorageRef = storageRef(storage, 'groupImages/' + file.name);
        await uploadBytes(uploadStorageRef, file);
        const downloadURL = await getDownloadURL(uploadStorageRef);
        const db = getDatabase(app);
        const imageRef = ref(db, `groups/${groupKey}`);
        update(imageRef, { imageUrl: downloadURL });
        
        setSnackbarMessage('Image uploaded successfully');
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setEmail(user.email);
        }
        else {

        }
    })

    const leaveGroup = async () => {
        // console.log("Here.");
        const db = getDatabase(app);
        const dbRef = (groupKey === null || groupKey === 0) ? ref(db, "groups/group1/groupMembers")
            : ref(db, "groups/" + groupKey + "/groupMembers");

        var userExists = false;

        get(ref(db, 'users')).then((usersData) => {
            // console.log(usersData.val());
            var thisUser;
            Object.entries(usersData.val()).forEach((user) => {
                // console.log(user);
                // console.log(user[1].email);
                // console.log(email);
                if (user[1].email === email) {
                    thisUser = user[0];
                }
            })
            if (thisUser != null) {
                const userRef = ref(db, 'users/' + thisUser);
                get(userRef).then((foundUser) => {
                    if (foundUser.val().groups != null) {
                        remove(child(userRef, 'groups/' + groupKey));
                        remove(child(dbRef, thisUser));

                    }
                })
                // console.log(get(ref(db, 'groups/' + groupKey + '/groupMembers/' + thisUser)));
            }
        });

        navigate("/");
    }

    const fetchData = async () => {
        const db = getDatabase(app);
        const dbRef = (groupKey === null || groupKey === 0) ? ref(db, "groups/group1/sessions")
            : ref(db, "groups/" + groupKey + "/sessions");
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            setSessionArray(Object.values(snapshot.val()));
        } else {
            alert("error");
        }
    }

    // console.log(groupKey);
    // console.log(groupData);

    return (
        <div className='group-info-container'>
            <h1 className='group-title'>{groupData.groupName}</h1>
            <h3 className='desc'>Description</h3>
            <div className='desc-container'>
                <h4>{groupData.groupDesc}</h4>
            </div>

            <Stack direction="row" spacing={20} justifyContent="center" alignItems="start">
                <Stack direction="column" spacing={1} justifyContent="center" alignItems="flex-start">
                    <h3>Members</h3>
                    <Avatar>1</Avatar>
                    <Avatar>2</Avatar>
                    <Avatar>3</Avatar>
                </Stack>
                <div>
                    <h3>Upcoming Study Sessions</h3>
                    <button onClick={fetchData}>Display Sessions</button>
                    {sessionArray.map((item, index) => (
    <p key={index}>
        Session on {item.month}-{item.day} {new Date(item.time).toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        })} {item.location}
    </p>
))}
                </div>
            </Stack>
            <Stack direction="row" spacing={2}>
                <Grid item xs={6}>
                    <div className='create-a-ss'>
                        <Link
                            to='/studysession'
                            state={{ groupKeySS: groupKey, groupData: groupData }}>
                            <button>Create a Study Session</button>
                        </Link>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className='create-a-ss'>
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                        <button onClick={leaveGroup}>Leave Group</button>
                    </div>
                </Grid>
            </Stack>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleCloseSnackbar}
                    severity="success"
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </div>
    );
}
