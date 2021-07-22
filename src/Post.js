import React from 'react';
import { Avatar,Input,Button } from '@material-ui/core';
import './Post.css'
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';
import { db } from './firebase.config';
import firebase from 'firebase';

const Post = ({caption,username,ImageUrl,postId,user}) => {
     
       const [comments,setComments] = useState([])
       const [comment,setComment] = useState('')

       useEffect(() => {
           let unSubcribe;
           if(postId){
            unSubcribe = db
            .collection('post')
             .doc(postId) 
             .collection('comments')
             .orderBy('timestamp','desc')
             .onSnapshot((snapshot) => {
                 setComments(snapshot.docs.map((doc) => doc.data()));
             })
           }
           return () =>{
               unSubcribe();
           }
     
       },[postId])

       const postComment =(e) =>{
          e.preventDefault();
          db.collection('post').doc(postId).collection('comments').add({
              text:comment,
              username: user.displayName,
              timestamp: firebase.firestore.FieldValue.serverTimestamp()
          })
          setComment('')
       }
     
    return (
        <div className="post">
            
        
            <div className="post__header">
            <Avatar className="post__avater" alt={username} src="/static/saurav.jpg" />
             <h3>{username}</h3>
            </div> 

             <img className="post__image" src={ImageUrl} alt="" />
             <h4 className="post__text" ><strong>{username} </strong> {caption}</h4>
       {
           <div className="post__comment">
              {comments.map((comment) => [
                  <p>
                      <strong>{comment.username} </strong>{comment.text}
                  </p>
              ])}
           </div>
       }
       
       
         <form className="post__box">
             <Input
             className="post__input"
             type="text"
             placeholder="Add a comment"
             value={comment}
             onChange={(e) => setComment(e.target.value)}
             />

             <Button 
             className="post__button"
             disabled={!comment}
             type="submit"
             onClick={postComment}
             >
            Comment
             </Button>
         </form>

        </div>
    );
};

export default Post;