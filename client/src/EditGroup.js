
import React, { useState } from "react";
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import app from "./Firebase";
import { getDatabase, ref, set, push } from "firebase/database";
import { useLocation, useNavigate } from "react-router-dom";
import './CreateAGroup.css';

export default function EditGroup() {
    const groupKey = useLocation().state.groupKey;
    const groupData = useLocation().state.groupData;
    let [inputValue1, setInputValue1] = useState(groupData.subject);
    let [inputValue2, setInputValue2] = useState(groupData.groupName);
    let [inputValue3, setInputValue3] = useState("");
    let [inputValue4, setInputValue4] = useState(groupData.groupDesc);

    const navigate = useNavigate();

    function valuetext(value) {
        return `${value}°C`;
    }

    const saveData = async () => {
        const db = getDatabase(app);
        const newDocRef = ref(db, "groups/" + groupKey);
        set(newDocRef, {
            subject: inputValue1,
            groupName: inputValue2,
            groupSize: inputValue3,
            groupDesc: inputValue4
        }).then(() => {
            alert("data saved successfully")
        }).catch((error) => {
            alert("error: ", error.message);
        })

        navigate("/mygroups")
    }

    return (
        <div>
            <h1 className='title'>Edit Group</h1>
            <div className='dark-blue-box'></div>
            <div className='blue-box'>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Stack direction="column" spacing={3}>
                                <FormControl fullWidth>
                                    <h3 className='class-title'>Class</h3>
                                    <h3 className='class-title'>Subject</h3>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        defaultValue={(groupData.subject === "" || groupData.subject === null) ?
                                        ("Other") : (groupData.subject)}
                                        value={inputValue1}
                                        onChange={(e) => setInputValue1(e.target.value.toString())}
                                    >
                                        <MenuItem value={"Math"}>Math</MenuItem>
                                        <MenuItem value={"Science"}>Science</MenuItem>
                                        <MenuItem value={"Engineering"}>Engineering</MenuItem>
                                        <MenuItem value={"Other"}>Other</MenuItem>
                                    </Select>
                                </FormControl>
                                <div className='textfield-container'>
                                    <h3>Group Name</h3>
                                    <form>
                                        <label>
                                            <input onChange={(e) => setInputValue2(e.target.value)}
                                            className='group-name-field' type="text" name="name" placeholder={groupData.groupName} />
                                        </label>
                                    </form>
                                </div>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <div className='col2'>
                                <h3>Description</h3>
                                <form>
                                    <label>
                                        <input onChange={(e) => setInputValue4(e.target.value)}
                                        className='desc-field' type="text" name="name" placeholder={groupData.groupDesc} />
                                    </label>
                                </form>
                                <div className='submit-info-container'>
                                    <input onClick={saveData} className='submit-info' type="submit" value="Submit"></input>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
            </div>
        </div>
    );
}
