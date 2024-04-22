import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { CardActionArea, Checkbox, Radio, RadioGroup } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import app from "./Firebase";
import { getDatabase, ref, get, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import './MyGroupsGrid.css';
import groupImg from './static/images/cards/chemistry.jpeg';
import {Link} from "react-router-dom";

const FilterBox = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 500,
    lineHeight: '60px',
    position: 'relative'
}));

const lightTheme = createTheme({ palette: { mode: 'light' } });
const db = getDatabase(app);
const dbRef = ref(db, "users/user0/groups");
const dbRefUsers = ref(db, "users");

function MyGroupsGrid() {
    const [age, setClass] = useState('');
    const [groupSubject, setGroupSubject] = useState('');
    const [groupSearchTerm, setGroupSearchTerm] = useState('');
    const [groupData, setGroupData] = useState([]);
    const [numGroups, setNumGroups] = useState(0);
    const [email, setEmail] = useState(null)
    const max = 6

    const handleChange = (event) => {
        setGroupSubject(event.target.value);
    };

    const handleKeyUp = (event, someTerm, someSubject) => {
        if (event.key == 'Enter') {
            performSearch(event, someTerm, someSubject);
        }
    }

    const performSearch = (e, someTerm, someSubject) => {
        e.preventDefault();
        localStorage.setItem('SearchTerm', someTerm);
        localStorage.setItem('SubjectTerm', someSubject)
        window.location.reload();
      }

    const auth = getAuth();

    const displayUserGroups = (userEmail) => {
        var searchedTerm = localStorage.getItem('SearchTerm') || 1;
        var subjectTerm = localStorage.getItem('SubjectTerm') || 1;
        var userKey;
        get(dbRefUsers).then((snapshot) => {
            Object.entries(snapshot.val()).forEach((userVal) => {
                if (userVal[1].email === userEmail) {
                    userKey = userVal[0];
                    get(ref(db, 'users/' + userKey + '/groups')).then((groupSnap) => {
                        var current = 0;
                        if (groupSnap.val() != null) {
                            Object.entries(groupSnap.val()).forEach((group) => {
                                if (current < max) {
                                    var groupRef = ref(db, "groups/" + group[0]);
        
                                    var groupArray;
                                    get(groupRef).then((snapshotGroup) => {
                                        if ((searchedTerm == 1 || searchedTerm == ''|| searchedTerm.length < 1)) {
                                            if ((subjectTerm == 1 || subjectTerm == '' || subjectTerm.length < 1)) {
                                                groupArray = [group[0], snapshotGroup.val()];
                                                setGroupData((groups) => [...groups, groupArray]);
                                                current++;
                                            }
                                            else if (snapshotGroup.val().subject.includes(subjectTerm)) {
                                                groupArray = [group[0], snapshotGroup.val()];
                                                setGroupData((groups) => [...groups, groupArray]);
                                                current++;
                                            }
                                        }
                                        else if (snapshotGroup.val().groupName.includes(searchedTerm)) {
                                            if ((subjectTerm == 1 || subjectTerm == '' || subjectTerm.length < 1)) {
                                                groupArray = [group[0], snapshotGroup.val()];
                                                setGroupData((groups) => [...groups, groupArray]);
                                                current++;
                                            }
                                            else if (snapshotGroup.val().subject.includes(subjectTerm)) {
                                                groupArray = [group[0], snapshotGroup.val()];
                                                setGroupData((groups) => [...groups, groupArray]);
                                                current++;
                                            }
                                        }
                                    });
                                }
                            });
                        }
                        setNumGroups(current);
                    });
                    return;
                }
            });
        });
    }

    useEffect(() => {
        const onAuthDone = onAuthStateChanged(auth, (user) => {
        if (user) {
            setEmail(user.email);
            displayUserGroups(user.email);
        }
        else {
            console.log("user could not be found");
        }
    });
        return () => { onAuthDone();}
    }, []);

    return (
        <div className='my-groups-container'>
            <div className='search-groups-btn'>
                <Stack 
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Link to="/searchgroup">
                        <button>Search Groups</button>
                    </Link>

                    <Link to="/createagroup">
                        <button>Create a Group</button>
                    </Link>
                </Stack>
            </div>
            <Box sx={{ flexGrow: 1 }}>
                <h2 className='my-groups-title'>My Groups</h2>
                <Grid container spacing={2}>
                    {[lightTheme].map((theme, index) => (
                        <ThemeProvider theme={theme} key={index}>
                            <Grid item xs={6}>
                                <Box
                                    sx={{
                                        p: 2,
                                        borderRadius: 2,
                                        bgcolor: 'background.default',
                                        display: 'grid',
                                        gridTemplateColumns: { md: '1fr 1fr' },
                                        gap: 2,
                                    }}
                                >
                                    {[2].map((elevation) => (
                                        <FilterBox key={elevation} elevation={elevation}>
                                            <h3 className='filters-title'>Filters</h3>
                                            <Stack
                                                direction="column"
                                                justifyContent="flex-start"
                                                alignItems="flex-start"
                                                spacing={2}
                                            >
                                                <div className='checkbox-container'>
                                                    <FormGroup>
                                                        <FormControl>
                                                            <RadioGroup value={groupSubject} onChange={handleChange}>
                                                                <FormControlLabel control={<Radio />} label="Math" value="Math"/>
                                                                <FormControlLabel control={<Radio />} label="Science" value="Science" />
                                                                <FormControlLabel control={<Radio />} label="Engineering" value="Engineering" />
                                                                <FormControlLabel control={<Radio />} label="Other" value="Other" />
                                                                <FormControlLabel control={<Radio />} label="Any" value="" />
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </FormGroup>
                                                </div>
                                                <div className='select-container'>
                                                    <FormControl fullWidth>
                                                        <TextField id="demo-simple-select-label" label="Search"
                                                        value={groupSearchTerm} onChange={(e) => setGroupSearchTerm(e.target.value)}
                                                        onKeyUp={(e) => handleKeyUp(e, groupSearchTerm, groupSubject)}></TextField>
                                                    </FormControl>
                                                </div>
                                            </Stack>
                                        </FilterBox>
                                    ))}
                                </Box>
                            </Grid>

                            <Grid item xs={6} key={index}>
    <Box
        sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: 'background.default',
            display: 'grid',
            gridTemplateColumns: { md: '1fr 1fr' },
            gap: 2,
        }}
    >
        {groupData.map((groupInfo, index) => (
            <div key={index}>
                <Link className="group-link" to="/viewgroup" state={{ groupKey: groupInfo[0], groupData: groupInfo[1] }}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={groupInfo[1].imageUrl}
                                alt="chemistry"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {groupInfo[1].groupName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {groupInfo[1].groupDesc}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Link>
            </div>
        ))}
    </Box>
</Grid>

                        </ThemeProvider>
                    ))}
                </Grid>
            </Box>
        </div>
    );
}

export default MyGroupsGrid;
