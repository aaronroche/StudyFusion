
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
import { useNavigate } from "react-router-dom";
import './CreateAGroup.css';

export default function CreateAGroup() {
    let [inputValue1, setInputValue1] = useState("");
    let [inputValue2, setInputValue2] = useState("");
    let [inputValue3, setInputValue3] = useState("");
    let [inputValue4, setInputValue4] = useState("");

    const navigate = useNavigate();

    function valuetext(value) {
        return `${value}°C`;
    }

    const saveData = async () => {
        const db = getDatabase(app);
        const newDocRef = push(ref(db, "groups"));
        set(newDocRef, {
            class: inputValue1,
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
            <h1 className='title'>Create a Group</h1>
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
                                            <input onChange={(e) => setInputValue2(e.target.value)} className='group-name-field' type="text" name="name" />
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
                                        <input onChange={(e) => setInputValue4(e.target.value)} className='desc-field' type="text" name="name" />
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
