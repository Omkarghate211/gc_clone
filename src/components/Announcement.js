import { IconButton, Button, TextField } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import React, { useState } from "react";
import { db, firebase } from '../firebase';
import { useEffect } from "react";
import "./Announcement.css";


function Announcement({ image, name, date, content, isAdmin, fileURL, announcementId }) {
  const [comments, setComments] = useState([]); // Mock comments
  const [comment, setComment] = useState('');

  // const handleCommentSubmit = () => {
  //   if (comment.trim() !== '') {
  //     setComments(prevComments => [...prevComments, comment]);
  //     setComment(''); // Clear the comment input after submission
  //   }

  // };

  const handleCommentSubmit = () => {
    if (comment.trim() !== '') {
        // Push to local state
        setComments(prevComments => [...prevComments, comment]);

        // Push to Firestore
        db.collection('announcements').doc(announcementId).collection('comments').add({
            text: comment,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        setComment(''); // Clear the comment input after submission
    }
};

useEffect(() => {
    const unsubscribe = db.collection('announcements').doc(announcementId).collection('comments')
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => {
            setComments(snapshot.docs.map(doc => doc.data().text));
        });

    // Clean up listener
    return () => {
        unsubscribe();
    };
}, [announcementId]);


  



  return (
    <div className="announcement">
      <div className="announcement__informationContainer">
        <div className="announcement__infoSection">
          <div className="announcement__imageContainer">
            <img src={image} alt="Profile photo" />
          </div>
          <div className="announcement__nameAndDate">
            <div className="announcement__name">{name}</div>
            <div className="announcement__date">{date}</div>
          </div>
        </div>
        {isAdmin && (
          <div className="announcement__infoSection">
            <IconButton>
              <MoreVert />
            </IconButton>
          </div>
        )}
      </div>
      <div className="announcement__content">{content}</div>
      {/* Display the file link if fileURL exists */}
      {fileURL && (
                <div className="announcement__file">
                    <a href={fileURL} target="_blank" rel="noopener noreferrer">View Attached File</a>
                </div>
            )}
      <div className="announcement__comments">
        <h4>Comments</h4>
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            {comment}
          </div>
        ))}
        <div className="comment__inputSection">
          <TextField 
            value={comment} 
            onChange={(e) => setComment(e.target.value)} 
            placeholder="Add a comment..." 
          />
          <Button onClick={handleCommentSubmit}>Add</Button>
        </div>
      </div>
    </div>
  );
}

export default Announcement;
