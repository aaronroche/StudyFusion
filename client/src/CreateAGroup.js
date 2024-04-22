import React, { useState } from "react";
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import app from "./Firebase";
import { getDatabase, ref, set, push } from "firebase/database";
import { useNavigate } from "react-router-dom";
import './CreateAGroup.css';

export default function CreateAGroup() {
    const [inputValues, setInputValues] = useState({
        class: "",
        groupName: "",
        groupDesc: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    }       

    const saveData = async () => {
        const { subject, groupName, groupDesc } = inputValues;
        if (!subject || !groupName || !groupDesc) {
            alert("Please fill in all fields.");
            return;
        }
    
        const db = getDatabase(app);
        const newDocRef = push(ref(db, "groups"));
        set(newDocRef, {
            subject,
            groupName,
            groupDesc
        }).then(() => {
            alert("Data saved successfully");
            navigate("/mygroups");
        }).catch((error) => {
            alert("Error: ", error.message);
        });
    }    

    return (
        <div className="create-group-container">
            <h1 className='title'>Create a Group</h1>
            <div className='blue-box'>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Stack direction="column" spacing={3}>
                            <FormControl fullWidth>
                                <h3 className='class-title'>Subject</h3>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={inputValues["class"]}
                                    name="class"
                                    onChange={handleChange}
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
                                        <input onChange={handleChange} className='group-name-field' type="text" name="groupName" />
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
                                    <textarea onChange={handleChange} className='desc-field' name="groupDesc" />
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
