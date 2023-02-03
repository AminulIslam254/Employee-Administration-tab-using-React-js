import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { CSVLink, CSVDownload } from "react-csv";






import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Pagination } from '@mui/material';
import { Stack } from '@mui/system';






const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    '@media (min-width: 780px)': {
        width: '80%'
    },

    box2: {

        width: "80%",
        height: 90,
        display: "flex",
        flexDirection: "row",

    },
    box2Div: {
        display: "flex",
        alignItems: "center",


    },
    box2DivTitle: {

        display: "flex",
        alignItems: "center",
        '&:hover': {
            cursor: "pointer",
        },
    },
    delAndEditDiv: {
        '&:hover': {
            cursor: "pointer",
        },
    }



}));



const Component2 = () => {

    const classes = useStyles();


    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogKey, setDialogKey] = useState(0);
    const [EditId, setEditId] = useState("");
    var today = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];





    const options = {
        method: 'GET',
        url: 'https://uers-api.p.rapidapi.com/api/users',
        headers: {
            'X-RapidAPI-Key': '4207619a63msh51012b55d8e5987p1ec80cjsne2c8759ceb36',
            'X-RapidAPI-Host': 'uers-api.p.rapidapi.com'
        }
    };

    const handleData = async () => {
        setIsLoading(true);

        await axios.request(options).then(function (response) {
            const { data } = response.data;
            console.log(data);
            setUserData(data);
        }).catch(function (error) {
            console.error(error);
        });

        setIsLoading(false);
    };




    useEffect(() => {
        handleData();
    }, []);





    //handle edit

    const handleEdit = (e) => {
        setIsDialogOpen(true);
        console.log(e.target.id);
        setEditId(e.target.id);


    }

    const handleEditData = () => {
        if (formValue.name === "" && formValue.role === "") {

        }
        else {
            if (formValue.name !== "" && formValue.role !== "") {
                for (let key in userData) {
                    if (userData[key].id === EditId) {
                        userData[key].Name = formValue.name;
                        userData[key].Role = formValue.role;
                        let flag = 0;
                        let hrs = today.getHours();
                        if (today.getHours() > 12) {
                            flag = 1;
                            hrs = hrs - 12;
                        }
                        userData[key].LastLogin = months[today.getMonth()] + " " + today.getDate() + ", " + today.getFullYear() + " " + hrs + ":" + today.getMinutes() + " " + ((flag) ? "PM" : "AM");
                        break;
                    }
                }
            }
            else if (formValue.name === "" && formValue.role !== "") {
                for (let key in userData) {
                    if (userData[key].id === EditId) {
                        userData[key].Role = formValue.role;
                        let flag = 0;
                        let hrs = today.getHours();
                        if (today.getHours() > 12) {
                            flag = 1;
                            hrs = hrs - 12;
                        }
                        userData[key].LastLogin = months[today.getMonth()] + " " + today.getDate() + ", " + today.getFullYear() + " " + hrs + ":" + today.getMinutes() + " " + ((flag) ? "PM" : "AM");
                        break;

                    }
                }
            }
            else if (formValue.name !== "" && formValue.role === "") {
                for (let key in userData) {
                    if (userData[key].id === EditId) {
                        userData[key].Name = formValue.name;
                        let flag = 0;
                        let hrs = today.getHours();
                        if (today.getHours() > 12) {
                            flag = 1;
                            hrs = hrs - 12;
                        }
                        userData[key].LastLogin = months[today.getMonth()] + " " + today.getDate() + ", " + today.getFullYear() + " " + hrs + ":" + today.getMinutes() + " " + ((flag) ? "PM" : "AM");

                        break;
                    }
                }
            }
            setDialogKey(Math.random());
            setFormValue(initialState);
        }
    }







    const [open, setOpen] = useState(false);



    const initialState = { name: "", role: "" };
    const [formValue, setFormValue] = useState(initialState);


    const handleChange = (event) => {

        const { name, value } = event.target;
        setFormValue({ ...formValue, [name]: value });
    };

    const handleClose = () => {
        setOpen(false);
        setIsDialogOpen(false);
        handleEditData();
    };

    useEffect(() => {
        if (isDialogOpen) {
            setOpen(true);
        }


        setDialogKey(Math.random());
    }, [isDialogOpen])



    //handle delete

    const handleDelete = (e) => {
        let cnf = window.confirm("Are you Sure ? ");
        if (cnf) {
            const { id } = e.target;
            let cnt = 1;
            let var1;
            setUserData((prevstate) => {
                if (cnt === 1) {
                    var1 = userData.filter(
                        (info, index) => {
                            return ((info.id != id));
                        }

                    );
                    cnt--;

                }
                return var1;

            });

            setDialogKey(Math.random());

        }


    };


    // handle Sort



    const com = (item1, item2) => {
        if (item1.Name < item2.Name) {
            return -1;
        }
        else {
            return 1;
        }

    }
    const handleSort = () => {
        userData.sort(com);
        setDialogKey(Math.random());
    }


    //Handle Add User


    const handleAddUser = async () => {
        const addOptions = {
            method: 'POST',
            url: 'https://uers-api.p.rapidapi.com/api/users',
            headers: {
                'X-RapidAPI-Key': '4207619a63msh51012b55d8e5987p1ec80cjsne2c8759ceb36',
                'X-RapidAPI-Host': 'uers-api.p.rapidapi.com'
            }
        };


        await axios.request(addOptions).then(function (response) {
            const { data } = response.data;
            console.log(data);
            setUserData((prevstate) => {
                let var1 = prevstate;
                var1.push(data);
                return var1;
            })
        }).catch(function (error) {
            console.error(error);
        });

        setDialogKey(Math.random());


    }



    //Pagination Part

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(7);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = userData.slice(indexOfFirstPost, indexOfLastPost);



    //CSV Part



    const headers = [
        {
            label: "Name", key: "Name"
        },
        {
            label: "Email", key: "Email"
        },
        {
            label: "Role", key: "Role"
        },
        {
            label: "Last Login", key: "LastLogin"
        },
    ]

    const csvLink = {
        filename: "file.csv",
        headers: headers,
        data: userData,
    }








    return (
        <>



            <div style={{ display: "none" }}>
                <>

                    <div key={dialogKey}>

                        <Dialog open={open} onClose={handleClose} key={dialogKey}>
                            <DialogTitle>Subscribe</DialogTitle>
                            <DialogContent key={dialogKey}>
                                <DialogContentText>
                                    Enter Edit Details
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Enter Name"
                                    type="email"
                                    fullWidth
                                    variant="standard"
                                    name='name'
                                    onChange={handleChange}
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Enter Role"
                                    type="email"
                                    fullWidth
                                    variant="standard"
                                    name='role'
                                    onChange={handleChange}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={handleClose}>Done</Button>
                            </DialogActions>
                        </Dialog>
                    </div>

                </>
            </div>


            {
                (isLoading) ? (
                    <>
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress />
                        </Box>



                    </>
                ) : (
                    <>

                        <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}>
                            <div style={{ width: "94%", height: 90, display: "flex", justifyContent: "center",border:"2px solid black" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "93%", height: "94%" }}>
                                    <div >
                                        <div style={{ height: 24, display: "flex", flexDirection: "row", alignItems: "center" }}><span style={{ fontWeight: "bold", fontSize: 22 }}>Users</span> <div style={{ backgroundColor: "#afa", borderRadius: 25, width: 75, textAlign: "center", marginLeft: 8 }}>{userData.length} users </div></div>
                                        <div>Manage your team members and their account permission here</div>
                                    </div>

                                    <div style={{ display: "flex", flexDirection: "row", width: 255, justifyContent: "space-between" }}>
                                        <CSVLink {...csvLink} style={{ display: "flex", textDecoration: "none", color: "black", backgroundColor: "white", height: 32, borderRadius: 5, justifyContent: "center", alignItems: "center" }}><span>Download CSV</span></CSVLink>
                                        <Button variant="contained" onClick={handleAddUser}>+ Add User</Button>
                                    </div>
                                </div>
                            </div>

                            
                            <div style={{ width: "94%", display: "flex", alignItems: "center", flexDirection: "column",border:"2px solid black",justifyContent:"center" }} key={dialogKey}>

                                <div className={classes.box2}>

                                    <div className={classes.box2DivTitle} style={{ width: "53.7%" }} onClick={handleSort}>Name</div>
                                    <div className={classes.box2DivTitle} style={{ width: "13.1%" }} >Status</div>
                                    <div className={classes.box2DivTitle} style={{ width: "8.9%" }}>Roll</div>
                                    <div className={classes.box2DivTitle} style={{ width: "11.5%" }}>Last Login</div>


                                </div>
                                {
                                    currentPosts.map((item, index) => {

                                        return (
                                            <div key={item.id} className={classes.box2} style={{ backgroundColor: (index & 1) ? "#d9d4d4" : "white" }}>

                                                <div className={classes.box2Div} style={{ width: "61%" }}>{<>
                                                    <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "row" }}>
                                                        <div style={{ height: "100%", width: "10%", display: "flex", alignItems: "center" }}>
                                                            <img src={item.Image} alt="" style={{ width: "91%", height: "fit-content", borderRadius: 30 }} />
                                                        </div>
                                                        <div style={{ height: "100%", width: "40%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                                            <span>{item.Name}</span>
                                                            <span>{item.Email}</span>
                                                        </div>

                                                    </div>
                                                </>}</div>
                                                <div className={classes.box2Div} style={{ width: "15%" }}>{(item.Status) ? (
                                                    <div style={{ width: "60%", height: "40%", backgroundColor: "#afa", display: "flex", flexDirection: "row", borderRadius: 25, alignItems: "center" }}>
                                                        <div style={{ height: 10, width: 10, backgroundColor: "green", borderRadius: 30, marginLeft: 8 }}></div>
                                                        <div style={{ height: "90%", width: "50%", color: "green", display: "flex", alignItems: "center", marginBottom: 4, marginLeft: 6 }}>Active</div>
                                                    </div>
                                                ) : (
                                                    <div style={{ width: "60%", height: "40%", backgroundColor: "rgb(147, 151, 147)", display: "flex", flexDirection: "row", borderRadius: 25, alignItems: "center" }}>
                                                        <div style={{ height: 10, width: 10, backgroundColor: "black", borderRadius: 30, marginLeft: 8 }}></div>
                                                        <div style={{ height: "90%", width: "50%", color: "black", display: "flex", alignItems: "center", marginBottom: 4, marginLeft: 6 }}>Invited</div>
                                                    </div>
                                                )}
                                                </div>
                                                <div className={classes.box2Div} style={{ width: "10%" }}>{item.Role}</div>
                                                <div className={classes.box2Div} style={{ width: "13%" }} id={index} >{item.LastLogin}</div>
                                                <div className={classes.box2Div} style={{ width: "13%" }} id={index} >{
                                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                                                        <div className={classes.delAndEditDiv} style={{ width: "45%", }}><img src="https://cdn-icons-png.flaticon.com/512/1345/1345874.png" alt="" style={{ height: "78%", width: "50%" }} onClick={handleDelete} id={item.id} /></div>
                                                        <div className={classes.delAndEditDiv} style={{ width: "45%", }}> <img src="https://cdn-icons-png.flaticon.com/512/61/61456.png" alt="" style={{ height: "78%", width: "50%" }} onClick={handleEdit} id={item.id} /></div>



                                                    </div>
                                                }
                                                </div>

                                            </div>
                                        )

                                    })
                                }



                            </div>
                            <div style={{ height: 62, width: "94%", display: "flex", justifyContent: "center", alignItems: "center" ,border:"2px solid black"}}>
                                <Stack spacing={2}>

                                    <Pagination count={10} color="primary"
                                        onChange={(e, value) => { setCurrentPage(value) }}
                                    />


                                </Stack>
                            </div>

                        </div>
                    </>
                )
            }

        </>
    )
}

export default Component2;
