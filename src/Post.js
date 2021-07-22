import React from 'react';
import { Avatar } from '@material-ui/core';
import './Post.css'
import { Container } from 'react-bootstrap';
const Post = ({caption,username,ImageUrl}) => {

    const Hit = () => {
       return ( ImageUrl ? ImageUrl : null )
    }
    return (
        <div className="post">
            
        
            <div className="post__header">
            <Avatar className="post__avater" alt={username} src="/static/saurav.jpg" />
             <h3>{username}</h3>
            </div> 

             <img className="post__image" src={Hit()} alt="" />
             <h4 className="post__text" ><strong>{username} </strong> {caption}</h4>
         
        </div>
    );
};

export default Post;