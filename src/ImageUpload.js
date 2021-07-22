import { Avatar, Button ,Input} from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { db, storage } from './firebase.config';
import firebase from 'firebase'
import   './ImageUpload.css';
import { Container } from 'react-bootstrap';

const ImageUpload = ({username}) => {
    const [caption,setCaption] = useState('')
    const [image,setImage] = useState(null)
    const [progress,setProgress] = useState(0)
    
    const [openProgress, setOpenProgress] = useState(false);

    const handleChange = (e) =>{
       if(e.target.files[0]){
         setImage(e.target.files[0]);
       }
    }
    const handleUpload = (e) =>{
        setOpenProgress(true);
        e.preventDefault();
       const upload  = storage.ref(`images/${image.name}`).put(image);

       upload.on(
           "state_changed",
           (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes));
            setProgress([progress])
           },
           (error) =>{
            alert(error.message)
           },
           () =>{
               storage.ref('images').child(image.name).getDownloadURL()
               .then((url) => {
                   db.collection('post').add({
                       timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                       caption:caption,
                       ImageUrl: url,
                       username:username
                   })
                   setCaption('') 
                   setImage(null)
                   setProgress(0)
                   setOpenProgress(false);
                })
           }
       )
    }

    return (
        <div >
       <Container> 
      <div className="upload_container upload mt-4">
        <div className="avatar_caption"> 
          <Avatar
            className="post_avatar"
            alt={username}
            src="./static/saurav.jpg"
          />
          <Input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write your caption..."
          />
        </div>
        <div className="file_upload">
          <label for="file">Choose a picture</label>
          <input
            type="file"
            id="file"
            className="inputfile"
            onChange={handleChange}
          />
          <div>
            <Button
              disabled={!image}
              size="small"
              onClick={handleUpload}
              variant="outlined"
              color="primary"
            >
              Post
            </Button>
          </div>
        </div>
        {openProgress && (
          <progress className="progress" value={progress} max="100" />
        )}
      </div>
      </Container>
    </div>
    );
};

export default ImageUpload;