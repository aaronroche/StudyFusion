
import * as React from 'react';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import 'react-time-picker/dist/TimePicker.css';
import Checkbox from '@mui/material/Checkbox';
import TimePicker from 'react-time-picker';
import { useState } from 'react';
import app from "./Firebase";
import { getDatabase, ref, set, push } from "firebase/database";
import { useLocation, useNavigate } from 'react-router-dom';

import './ScheduleSS.css'

export default function ScheduleSS() {
    const [age] = React.useState('');
    const [value] = useState('10:00');
    const groupKey = useLocation().state.groupKeySS;
    const groupData = useLocation().state.groupData;
    const navigate = useNavigate();

    let [inputValue1, setInputValue1] = useState("");
    let [inputValue2, setInputValue2] = useState("");
    let [inputValue3, setInputValue3] = useState("");
    let [inputValue4, setInputValue4] = useState("");
    let [inputValue5, setInputValue5] = useState("");

    const createSS = (e) => {
        navigate(
            "/StudyFusion/viewgroup", 
            {
                state: {groupKeySS: groupKey, groupData: groupData}
            });
    };
    
    const saveData = async () => {
        const db = getDatabase(app);
        const newDocRef = push(ref(db, "groups/" + groupKey +"/sessions"));
        set(newDocRef, {
          month: inputValue1,
          day: inputValue2,
          time: inputValue3,
          location: inputValue4,
          zoomLink: inputValue5

        }).then( () => {
          alert("data saved successfully")
        }).catch((error) => {
          alert("error: ", error.message);
        })

        createSS();
    }

    return (
        <div>
            <h1 className='title'>Schedule a Study Session</h1>

            <div className='dark-blue-box'></div>
            <div className='blue-box'>
                <h1 className='date-title'>Date and Time</h1>
                <Stack 
                        direction="row"
                        justifyContent="center"
                        alignItems="flex-start"
                        spacing={{ xs: 1, sm: 2, md: 4 } }
                >
                    <FormControl style={{minWidth: 175}}>
                        <h3 className='class-title'>Month</h3>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            onChange={(e) => setInputValue1(e.target.value.toString())}
                        >
                            <MenuItem value={1}>01</MenuItem>
                            <MenuItem value={2}>02</MenuItem>
                            <MenuItem value={3}>03</MenuItem>
                            <MenuItem value={4}>04</MenuItem>
                            <MenuItem value={5}>05</MenuItem>
                            <MenuItem value={6}>06</MenuItem>
                            <MenuItem value={7}>07</MenuItem>
                            <MenuItem value={8}>08</MenuItem>
                            <MenuItem value={9}>09</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={11}>11</MenuItem>
                            <MenuItem value={12}>12</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl style={{minWidth: 175}}>
                        <h3 className='class-title'>Day</h3>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            onChange={(e) => setInputValue2(e.target.value.toString())}
                        >
                            <MenuItem value={1}>01</MenuItem>
                            <MenuItem value={2}>02</MenuItem>
                            <MenuItem value={3}>03</MenuItem>
                            <MenuItem value={4}>04</MenuItem>
                            <MenuItem value={5}>05</MenuItem>
                            <MenuItem value={6}>06</MenuItem>
                            <MenuItem value={7}>07</MenuItem>
                            <MenuItem value={8}>08</MenuItem>
                            <MenuItem value={9}>09</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={11}>11</MenuItem>
                            <MenuItem value={12}>12</MenuItem>
                            <MenuItem value={13}>13</MenuItem>
                            <MenuItem value={14}>14</MenuItem>
                            <MenuItem value={15}>15</MenuItem>
                            <MenuItem value={16}>16</MenuItem>
                            <MenuItem value={17}>17</MenuItem>
                            <MenuItem value={18}>18</MenuItem>
                            <MenuItem value={19}>19</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={21}>21</MenuItem>
                            <MenuItem value={22}>22</MenuItem>
                            <MenuItem value={23}>23</MenuItem>
                            <MenuItem value={24}>24</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                            <MenuItem value={26}>26</MenuItem>
                            <MenuItem value={27}>27</MenuItem>
                            <MenuItem value={28}>28</MenuItem>
                            <MenuItem value={29}>29</MenuItem>
                            <MenuItem value={30}>30</MenuItem>
                            <MenuItem value={31}>31</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl style={{minWidth: 175}}>
                        <h3 className='class-title'>Time</h3>
                        <div>
                            <TimePicker onChange={(value) => setInputValue3(value.toString())} value={value} />
                        </div>
                    </FormControl>
                </Stack>

                <div className='location-text'>
                    <form action="/my-handling-form-page" method="post">
                        <label for="name" className='location-label'>Location</label>
                        <input onChange={(e) => setInputValue4(e.target.value.toString())} type="text" id="name" name="user_name" />
                    </form>
                    <button className='submit-location'>Book a Room</button>
                </div>

                <div className='checkbox-notif'>
                    <Stack 
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                    >
                        <FormControlLabel control={<Checkbox/>} label="Notify me via email" />
                        <FormControlLabel control={<Checkbox/>} label="Notify me via text" />
                    </Stack>
                </div>
                
                <div className='zoom-link'>
                    <form action="/my-handling-form-page" method="post">
                        <label for="name" className='zoom-label'>Zoom Link</label>
                        <input onChange={(e) => setInputValue5(e.target.value.toString())} type="text" id="name1" name="user_name" />
                    </form>
                </div>

                <div className='submit-session-btn'>
                    <button onClick={saveData}  className='submit-session'>Submit</button>
                </div>
            </div>
        </div>
    );
}