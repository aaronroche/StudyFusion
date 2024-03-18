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
import { getDatabase, ref, get } from "firebase/database";
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

export default function MyGroupsGrid() {
    const [age, setClass] = useState('');
    const [groupData, setGroupData] = useState([]);

    const handleChange = (event) => {
        setClass(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            const db = getDatabase(app);
            const dbRef = ref(db, "groups/group1");
            try {
                const snapshot = await get(dbRef);
                setGroupData(snapshot.val());
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
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
                                    {[1].map((elevation) => (
                                        <div>
                                            <Link className="group-link" to="/group1">
                                                <Card sx={{ maxWidth: 345 }} key={elevation}>
                                                    <CardActionArea>
                                                        <CardMedia
                                                            component="img"
                                                            height="140"
                                                            image={groupImg}
                                                            alt="chemistry"
                                                        />
                                                        <CardContent>
                                                                <Typography gutterBottom variant="h5" component="div">
                                                                    {groupData.groupName}
                                                                </Typography>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    {groupData.groupDesc}
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
