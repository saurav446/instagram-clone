import { useEffect, useState } from 'react';
import './App.css';
import Post from './Post';
import {auth, db} from './firebase.config.js'
import Modal from '@material-ui/core/Modal';
import {makeStyles,} from '@material-ui/core/styles';
import { Avatar, Button,Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import { Container } from 'react-bootstrap';


 function getModelStyle() {
          const top = 50;
          const left = 50;
          
          return {
            height: "200px",
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
          } 
          
 }
          
          const useStyles = makeStyles((theme) => ({
          paper: {
            position: "absolute",
            width: 400,
            height: 200,
            backgroundColor: theme.palette.background.paper,
            border: "2px solid #000",
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
          },
          }));
 
 


function App() {
   const classes = useStyles();
  const [post,setPost] = useState([]);
  const [open,setOpen] = useState(false)
  const [openSignIn,setOpenSignIn] = useState(false)
  const [modelStyle] = useState(getModelStyle);
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('') 
  const [user,setUser] = useState(null)

   useEffect(() => {
     db.collection('post').orderBy('timestamp','desc').onSnapshot(snapshot => 
      setPost(snapshot.docs.map(doc => 
        ({id:doc.id,post: doc.data()})
        ))
      )
   },[])
    
   useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user is logged in...
        console.log(authUser);
        setUser(authUser);

        if (authUser.displayName) {
          // dont update username
        } else {
          return authUser.updateProfile({
            displayName: username,
          });
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, username]);
   
   const handleRegister  = (e) => {
       e.preventDefault();
       auth.createUserWithEmailAndPassword(email,password).then((users) =>
       {return users.user.updateProfile({
         displayName: username
       }) }
       )
       .catch((error) =>  alert(error.message))
       setOpen(false)
   }
   const signin = (e) =>{
    e.preventDefault();
    auth.signInWithEmailAndPassword(email,password)
    .catch((error) =>  alert(error.message))
     setOpenSignIn(false)
   }

  return (
    <div className="app">
            
          <Modal
            open={open}
            onClose={() => setOpen(false)} 
          >
            <div style={modelStyle} className={classes.paper} >
              <form className="app__login"> 
               <center>
               <img
                className="app__headerImg"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="Instagram"
              />
               </center>
               <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={handleRegister}>Sign In</Button> 
            </form>
            </div> 
          </Modal>

          <Modal
            open={openSignIn}
            onClose={() => setOpenSignIn(false)} 
          >
            <div style={modelStyle} className={classes.paper} >
              <form className="app__login"> 
               <center>
               <img
                className="app__headerImg"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="Instagram"
              />
               </center>
               
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signin}>Sign In</Button> 
            </form>
            </div> 
          </Modal>

          <div className="app__head"> 
            <Container>
       <div className="app__header">
      
          <a href="/">
              <img
                className="app__headerImg"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="Instagram"
              />
            </a> 

            {
         user?.displayName ?
         <Button onClick={() => auth.signOut()} >Log Out</Button> :
         (
           <div className="app__loginContainer">
              
         <Button onClick={() => setOpenSignIn(true)} >Sign IN</Button>
         <Button onClick={() => setOpen(true)} >Sign Up</Button>

           </div>
         ) 
         }
          
       </div> 
       </Container>
       </div>

         {
             user?.displayName ? (<ImageUpload username={user?.displayName} />) :
             ('')
           }
           
         <div className="app__post">
         <Container> 
         {
            post.map(({id,post}) => 
              <Post 
              key={id}
              postId={id}
              username={post.username}
              caption={post.caption}
              ImageUrl={post.ImageUrl}
              user={user}
              />
              )
          }
        </Container> 
         </div>
  
   
         <div className="profile">
          {user ? (
            <div className="profile_container">
              <div className="profile_avatar">
                <Avatar
                  className="post_avatar"
                  alt={user && user.displayName}
                  src="/static/saurav.jpg"
                />
              </div>
              <p>{user && user.displayName}</p>
              <p>{user && user.email}</p>
            </div>
          ) : (
            <div>
              <div className="profile_avatar">
                <Avatar
                  className="post_avatar"
                  alt={username}
                  src="/static/saurav.jpg"
                />
              </div>
              <h5 className="text-center mt-5">Please Login</h5>
            </div>
          )}
        </div> 
        
        
          
            
    </div>
  );
}

export default App;
