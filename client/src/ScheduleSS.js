import * as React from 'react';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { useState } from 'react';
import app from "./Firebase";
import { getDatabase, ref, set, push } from "firebase/database";
import { useLocation, useNavigate } from 'react-router-dom';

import './ScheduleSS.css';

export default function ScheduleSS() {
    const groupKey = useLocation().state.groupKeySS;
    const groupData = useLocation().state.groupData;
    const navigate = useNavigate();

    const [inputValue4, setInputValue4] = useState("");
    const [inputValue5, setInputValue5] = useState("");
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [time, setTime] = React.useState(dayjs());

    const createSS = () => {
        navigate("/viewgroup", { state: { groupKey: groupKey, groupData: groupData } });
    };

    const saveData = async () => {
        const db = getDatabase(app);
        const newDocRef = push(ref(db, `groups/${groupKey}/sessions`));
        set(newDocRef, {
            month: month,
            day: day,
            time: time.format(),
            location: inputValue4,
            zoomLink: inputValue5
        }).then(() => {
            alert("data saved successfully");
            createSS();
        }).catch((error) => {
            alert("error: " + error.message);
        });
    };

    const cancel = () => {
        navigate("/StudyFusion/viewgroup", { state: { groupKey: groupKey, groupData: groupData } });
    };
    
    const months = [
        { value: 'January', label: 'January' },
        { value: 'February', label: 'February' },
        { value: 'March', label: 'March' },
        { value: 'April', label: 'April' },
        { value: 'May', label: 'May' },
        { value: 'June', label: 'June' },
        { value: 'July', label: 'July' },
        { value: 'August', label: 'August' },
        { value: 'September', label: 'September' },
        { value: 'October', label: 'October' },
        { value: 'November', label: 'November' },
        { value: 'December', label: 'December' },
    ];

    const days = [...Array(31).keys()].map(day => ({ value: day + 1, label: (day + 1).toString() }));

    return (
        <div className="container">
            <p className="title">Schedule a Study Session</p>
            <div className="content">
                <div className="date-time">
                    <h1 className="date-title">Date and Time</h1>
                    <Stack direction="row" spacing={4} justifyContent="center">
                        <FormControl>
                            <h3 className="class-title">Month</h3>
                            <Select
                                value={month}
                                onChange={(e) => setMonth(e.target.value.toString())}
                            >
                                {months.map((month) => (
                                    <MenuItem key={month.value} value={month.value}>{month.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <h3 className="class-title">Day</h3>
                            <Select
                                value={day}
                                onChange={(e) => setDay(e.target.value.toString())}
                            >
                                {days.map((day) => (
                                    <MenuItem key={day.value} value={day.value}>{day.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <h3 className="class-title">Time</h3>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    label="Controlled picker"
                                    value={time}
                                    onChange={(newTime) => setTime(newTime)}
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </Stack>
                </div>
                <div className="location">
                    <h2 className="location-title">Location</h2>
                    <form>
                        <input
                            onChange={(e) => setInputValue4(e.target.value.toString())}
                            type="text"
                            placeholder="Enter location..."
                            className="location-input"
                        />
                        <button className="location-button">Book a Room</button>
                    </form>
                </div>
                <div className="notification">
                    <h2 className="notification-title">Notifications</h2>
                    <FormControlLabel control={<Checkbox />} label="Notify me via email" />
                    <FormControlLabel control={<Checkbox />} label="Notify me via text" />
                </div>
                <div className="zoom-link">
                    <h2 className="zoom-title">Zoom Link</h2>
                    <input
                        onChange={(e) => setInputValue5(e.target.value.toString())}
                        type="text"
                        placeholder="Enter Zoom link..."
                        className="zoom-input"
                    />
                </div>
                <div className="buttons">
                    <button onClick={saveData} className="submit-session">Submit</button>
                    <button onClick={cancel} className="cancel-session">Cancel</button>
                </div>
            </div>
        </div>
    );
}
