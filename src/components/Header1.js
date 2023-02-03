import { makeStyles } from '@material-ui/core';
import React from 'react'


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

  tab1:{
    width:74,
    height:38,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    border:"2px solid black"
  }
  


}));


const Header1 = () => {


  const classes=useStyles();


  return (
    <>
      <div style={{ width: "100%", display: "flex", height: 178,justifyContent:"center" }}>
        <div style={{ display: "flex", flexDirection: "column",width:"82%" }}>
          <div><h1>Company Settings</h1></div>
          <div style={{display:"flex",flexDirection:"row",border:"2px solid black",borderRadius:8,width:410}}>
            <div className={classes.tab1} ><span>General</span> </div>
            <div className={classes.tab1} style={{backgroundColor:"#a69c9c"}}><span>Users</span> </div>
            <div className={classes.tab1} ><span>Plan</span> </div>
            <div className={classes.tab1} ><span>Billing</span> </div>
            <div className={classes.tab1} style={{width:110}}><span>Integration</span> </div>
          </div>
        </div>


      </div>


    </>
  )
}

export default Header1