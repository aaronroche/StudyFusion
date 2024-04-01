import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, Checkbox } from '@mui/material';
import Typography from '@mui/material/Typography';
import app from "./Firebase";
import { getStorage, getDownloadURL, ref as storage_ref} from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref as db_ref, push, set, query, onValue, get, child, limitToFirst,
  orderByKey, orderByChild, onChildAdded, DataSnapshot, equalTo } from "firebase/database";
import { useState, useEffect, useRef } from 'react'; 
import { Popup } from 'reactjs-popup';
import { Link, useNavigate } from 'react-router-dom';

const firebaseConfig = {
  apiKey: "AIzaSyBOhZNloTmqpBBPOy0103bsyhY-S-AQFi4",
  authDomain: "studyfusion-4620.firebaseapp.com",
  projectId: "studyfusion-4620",
  storageBucket: "studyfusion-4620.appspot.com",
  messagingSenderId: "803677334069",
  appId: "1:803677334069:web:00a1efeaf396f553529f7c",
  measurementId: "G-6GR16XG4SR"
};

// Initialize Firebase
const db = getDatabase(app);
const dbRef = db_ref(db, 'groups/group1');
const snapShot = await get(dbRef);
const snapVal = snapShot.val().groupDesc;
// console.log(snapVal);
const storage = getStorage();

// onValue(dbRef, (snapshot) => {
//   console.log(snapshot.val());
// }, (errorObject) => {
//   console.log('The read failed: ' + errorObject.name);
// }); 

const groupRef = db_ref(db, 'groups');
const userRef = db_ref(db, 'users');
// const newMsg = query(groupRef, limitToFirst(8));
// onChildAdded(newMsg, (data) => {
//   console.log(data.val().groupID);
// });

// const downloadedImage = getDownloadURL(storage_ref(storage, 'groupImages/chemimage.jpg'))
// .then((url) => {
//   // `url` is the download URL for 'images/stars.jpg'

//   // Or inserted into an <img> element
//   const img = document.getElementById('chemimage');
//   // img.setAttribute('alt', "");
//   img.setAttribute('src', url);
//   // return img;
// })
// .catch((error) => {
//   // Handle any errors
//   console.log(error);
// });

function SearchGroup() {
  const [dbGroups, setDbGroups] = useState([]);
  const [groupSearchTerm, setGroupSearchTerm] = useState('');
  const [numGroups, setNumGroups] = useState(0);
  const [email, setEmail] = useState(null);
  const max = 8;
  const navigate = useNavigate();
  // const [imagesLoaded, setImagesLoaded] = useState(true);
  // const [groupImages, setGroupImages] = useState([]);

  // const getGroupImage = (gImgName) => {
  //   getDownloadURL(storage_ref(storage, 'groupImages/' + gImgName))
  //         .then((url) => {
  //           return url; });
  // }

  const auth = getAuth();
  onAuthStateChanged(auth, function(user) {
      if (user) {
          // console.log(user.email);
          setEmail(user.email);
      }
      else {

      }
  })

  const userQuery = query(userRef, orderByChild('email'));

  // const emailQuery = query(userQuery, );

  // const emailQuery = query(userQuery, equalTo(email, "email"));


  const performSearch = (someTerm) => {
    localStorage.setItem('SearchTerm', someTerm);
    window.location.reload();
  }

  const setGroupKey = (someKey) => {
    localStorage.setItem('GroupKey', someKey);
  }

  const userJoinGroup = (groupKey) => {
    var thisGroupRef = db_ref(db, 'groups/' + groupKey + '/groupMembers');
    var userExists = false;
    get(thisGroupRef).then((data) => {
      if (!data.exists()) {
        return;
      }
      // console.log(data.val());
      var groupInfo = data.val();
      // console.log(groupInfo);
      Object.entries(groupInfo).forEach( (user) => {
        console.log(user[0]);
        
        get(db_ref(db, 'users/' + user[0])).then((userSnap) => {
          // console.log(userSnap.val());
          var emailVal;
          if (userSnap.val() != null) {
            emailVal = userSnap.val().email;
            if (emailVal === email) {
              userExists = true;
            }
          }
          // if (emailVal === email) {
          //   userExists = true;
            // do not join group because group member exists
            // var searchingDone = false;
            // get(thisGroupRef).then( (gSnap) => {
            //   Object.entries(gSnap.val()).forEach((gUser) => {
            //     if (gUser[0] == user[0]) {
            //       searchingDone = true;
            //       return;
            //     }
            //   });
            //   searchingDone = true;
            // })
            // while (!searchingDone) {
  
            // }
  
          // //   set(newUserRef, {
          // //     groupID: 0
          // // })
          //   // set(child(newUserRef, data.val()[0]), {
          //   //   groupID: 0
          //   // });
          //   // set(child(newGroupRef, user[0]), {
          //   //   userID: 0
          //   // });
  
          // }
        });
      })});
      // console.log(data.val());

      if (!userExists) {
        get(userRef).then((data) => {
          var allUsers = data.val();
          var thisUser;
          Object.entries(allUsers).forEach((user) => {
            if (user[1].email === email) {
              thisUser = user[0];
            }
          });
          // console.log("This user: " + thisUser);
          var newUserRef = db_ref(db, "users/" + thisUser + "/groups/" + groupKey);
          var newGroupRef = db_ref(db, "groups/" + groupKey + "/groupMembers/" + thisUser);
          // console.log(newUserRef);
          // console.log(newGroupRef);
          set(newUserRef, {
            groupID: 0
          })
          set(newGroupRef, {
            userID: 0
          });
          // console.log(child(newGroupRef, thisUser));
          // console.log(child(newGroupRef, groupKey));
        });
      }

      get(db_ref(db, 'groups/' + groupKey)).then((groupInfo) => {
        navigate("/StudyFusion/viewgroup", { state: {
          groupKey: groupKey,
          groupData: groupInfo.val()
        }});
      });

      
  }

  useEffect(() => {
    return onValue(groupRef, (snapshot) => {
      var searchedTerm = localStorage.getItem('SearchTerm') || 1;
      var groupSnap = snapshot.val();
      var current = 0;
      setNumGroups(current);

      if (snapshot.exists()) {
        Object.entries(groupSnap).forEach((group) => {
          if (current < max) {
            if ((searchedTerm == 1 || searchedTerm == '' || searchedTerm.length < 1)) {
              setDbGroups((groups) => [...groups, group]);
              current++;
            }
            else if (group[1].groupName.includes(searchedTerm)) {
              console.log(group);
              setDbGroups((groups) => [...groups, group]);
              current++;
            }
          }
          // setImagesLoaded(false);
          // setGroupImages((groupImages) => [...groupImages, getGroupImage(group.imageName)]);
          // setImagesLoaded(true);
        });
        setNumGroups(current);

      }
    });
  }, []);

  // useEffect(() => {
  //   if (!imagesLoaded) {
  //     onValue(groupRef, (snapshot) => {
  //       var groupSnap = snapshot.val();
  
  //       if (snapshot.exists()) {
  //         Object.values(groupSnap).map((group) => {
  //           setImagesLoaded(false);
  //           setGroupImages((groupImages) => [...groupImages, getGroupImage(group.imageName)]);
  //           setImagesLoaded(true);
  //         });
          
  //         console.log(groupImages);
  //       }
  //     });
  //   }
    
  // }, []);


  // useEffect(() => {
  //   return onValue(groupRef, (snapshot) => {
  //     var groupSnap = snapshot.val();
  //     setGroupImages([]);

  //     if (snapshot.exists()) {

  //       Object.values(groupSnap).forEach((groupInfo) => {
  //         getDownloadURL(storage_ref(storage, 'groupImages/' + groupInfo.imageName))
  //         .then((url) => {
  //           console.log(url);
  //           groupImages.push(url);
  //         });
  //       })
  //     }
  //   });
  // }, []);

  // const [renderReady, setRenderReady] = useState(true);
  // const [gCount, setGCount] = useState();
  // const [gKeys, setGKeys] = useState([]);
  // const groupCount = null;
  // const groupKeys = null;
  // const groupKeys = [];

  // onValue(groupRef, (snapshot) => {
  //   // groupKeys = Object.keys(snapshot.val());
  //   Object.keys(snapshot.val()).forEach(groupInfo => {
  //     console.log('no');
  //     groupKeys.push(snapshot.val()[groupInfo]);
  //   })
  //   // console.log(groupCount.val())
  //   // Object.keys(groupCount.val()).forEach(groupInfo => {
  //   //   console.log(groupKeys.current.val()[groupInfo].groupID);
  //   // })
  // });

  // useEffect(() => {
  //   setRenderReady(false);
  //   onValue(groupRef, (snapshot) => {
  //     setGCount(snapshot);
  //     setGKeys(Object.keys(snapshot.val()));
  //     // console.log(groupCount.val())
  //     Object.keys(gCount.val()).forEach(groupInfo => {
  //       console.log(gCount.current.val()[groupInfo].groupID);
  //     })
  //   });
  //   setRenderReady(true);
  // }, [renderReady, gCount, gKeys]);

  return (
    // <div style={{height: "100vh", width: "100vh", margin: "0"}}>
    //   <div style={{height:"100vh", width: "100vh"}}>
        <div>
        <div>
          Join a Group
        </div>
        <div>
          Search
          <form>
            <input type="groupSearchTerm" placeholder="Search" value={groupSearchTerm} onChange={(e) => setGroupSearchTerm(e.target.value)} />
            <button type="submit" onClick={() => performSearch(groupSearchTerm)}>Search</button>
          </form>
          </div>
        <Box sx={{flexGrow: 1}}>
        <Grid container spacing={2}>
          {/* { dbGroups ? dbGroups.map(groupInfo => (
              <Grid xs={3}>
                {groupInfo.groupID}
              </Grid>
            )) : console.log('hi')} */}
                      { dbGroups ? dbGroups.map(groupInfo => (
            <Grid xs={3}>
                                    <Card sx={{ maxWidth: 345 }}>
                                    <Popup trigger={<CardActionArea>
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
                                    </CardActionArea>} modal nested>
                                    {
                                      close => (
                                        <Card className="d-flex card mx-auto justify-content-center">
                                          <div className="card-body d-flex flex-row justify-content-end">
                                            <button className="d-flex" onClick={() => close()}>X</button>
                                          </div>
                                          <div className="card-body d-flex flex-row">
                                            Would you like to join {groupInfo[1].groupName}?
                                          </div>
                                          <div className="card-body d-flex flex-row justify-content-center">
                                          <button className="d-flex" onClick={() => userJoinGroup(groupInfo[0])}>Join</button>
                                          </div>
                                          
                                        </Card>
                                      )
                                    }
                                    </Popup>
                                </Card>
                                </Grid>
                                )) : 
                                null
                                }
                      { Array.from(Array(max - numGroups), (e, i) => {
                        return <Grid xs={3}>
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
                    </Grid>
                    }) }
        </Grid>
        </Box>
        </div>
    /* </div>
  </div> */
    
  );
}

export default SearchGroup;
