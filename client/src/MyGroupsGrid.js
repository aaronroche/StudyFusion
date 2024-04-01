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
import { CardActionArea, Checkbox } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
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
    const [groupData, setGroupData] = useState([]);
    const [numGroups, setNumGroups] = useState(0);
    const [email, setEmail] = useState(null)
    const max = 6

    const handleChange = (event) => {
        setClass(event.target.value);
    };

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const db = getDatabase(app);
    //         const dbRef = ref(db, "groups/");
    //         var current = 0;
    //         try {
    //             onValue(dbRef, (snapshot) => {
    //                 Object.entries(snapshot.val()).forEach((group) => {
    //                     if (current < max) {
    //                         console.log(group);
    //                         setGroupData((groups) => [...groups, group]);
    //                         current++;
    //                       }
    //                 });
    //                 setNumGroups(current);
    //             })
    //             // const snapshot = await get(dbRef);
                
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    const auth = getAuth();
    onAuthStateChanged(auth, function(user) {
        if (user) {
            setEmail(user.email)
        }
        else {
            console.log("user could not be found");
        }
    })

    console.log("Email: " + email);

    useEffect(() => {
        return onValue(dbRef, (snapshot) => {
            var current = 0;
            setNumGroups(current);
            Object.entries(snapshot.val()).forEach((group) => {
                if (current < max) {
                    console.log(group);
                    var groupRef = ref(db, "groups/" + group[0]);

                    var groupArray;
                    onValue(groupRef, (snapshotGroup) => {
                        console.log(snapshotGroup.val())
                        groupArray = [group[0], snapshotGroup.val()];
                        console.log(groupArray);
                        setGroupData((groups) => [...groups, groupArray]);
                        current++;
                    });
                }
            });
            setNumGroups(current);
            })
            // const snapshot = await get(dbRef);
    }, []);

    return (
        <div className='my-groups-container'>
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
                                                        <FormControlLabel control={<Checkbox />} label="Math" />
                                                        <FormControlLabel control={<Checkbox />} label="Science" />
                                                        <FormControlLabel control={<Checkbox />} label="Engineering" />
                                                    </FormGroup>
                                                </div>
                                                <div className='select-container'>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">Class</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={age}
                                                            label="Class"
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value={10}>CHEM 1210</MenuItem>
                                                            <MenuItem value={20}>COMP 2040</MenuItem>
                                                            <MenuItem value={30}>COMP 4620</MenuItem>
                                                        </Select>
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
                    {groupData ? groupData.map(groupInfo => (
                        <div>
                            <Link className="group-link" to="/StudyFusion/viewgroup" state= {{groupKey: groupInfo[0], groupData: groupInfo[1]}}>
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
                    )) : null }
                    { Array.from(Array(max - numGroups), (e, i) => (
                        <div>
                            <Card sx={{ maxWidth: 345 }}>
                                    <CardActionArea>
                                        <CardMedia
                                                component="img"
                                                height="140"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                        </div>
                    ))}
                </Box>
                            <div className='search-groups-btn'>
                            <Stack 
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}
                            >
                                <Link to="/StudyFusion/searchgroup">
                                    <button>Search Groups</button>
                                </Link>

                                <Link to="/StudyFusion/createagroup">
                                    <button>Create a Group</button>
                                </Link>
                            </Stack>
                            </div>
                            </Grid>
                        </ThemeProvider>
                    ))}
                </Grid>
            </Box>
        </div>
    );
}

export default MyGroupsGrid;