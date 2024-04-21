import { IconButton } from "@material-ui/core";
import { SendOutlined } from "@material-ui/icons";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import Announcement from "../components/Announcement";
import { auth, db, storage, firebase } from "../firebase";
import "./Class.css";




function Class() {
  const [classData, setClassData] = useState({});
  const [announcementContent, setAnnouncementContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [user, loading, error] = useAuthState(auth);
  const { id } = useParams();
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);

  /*
    PLAN: Create a snapshot listener and fill in the data into classData, 
    and then map through it during render
  */

  useEffect(() => {
    // reverse the array
    let reversedArray = classData?.posts?.reverse();
    setPosts(reversedArray);
  }, [classData]);


  const createPost = async () => {
    try {
      const myClassRef = await db.collection("classes").doc(id).get();
      const myClassData = await myClassRef.data();
      console.log(myClassData);
      let tempPosts = myClassData.posts;

      const fileInput = document.querySelector('input[type="file"]');
      const file = fileInput.files[0];
      let fileURL = null;

      // Only upload if there's a file selected
      if (file) {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(`posts/${file.name}`);
        await fileRef.put(file);
        fileURL = await fileRef.getDownloadURL();
      }

      tempPosts.push({
        authorId: user.uid,
        content: announcementContent,
        date: moment().format("MMM Do YY"),
        image: user.photoURL,
        name: user.displayName,
        fileURL: fileURL,
      });

      myClassRef.ref.update({
        posts: tempPosts,
      });
    } catch (error) {
      console.error(error);
      console.log(error.msg);
      alert(`There was an error posting the announcement, please try again!`);
    }
  };

  useEffect(() => {
    db.collection("classes")
      .doc(id)
      .onSnapshot((snapshot) => {
        const data = snapshot.data();
        if (!data) navigate("/", { replace: true });
        console.log(data);
        setClassData(data);
      });
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/", { replace: true });
  }, [loading, user]);



  return (
    <div className="class">
      <div className="class__nameBox">
        <div className="class__name">{classData?.name}</div>
      </div>
      <div className="class__announce">
        <img src={user?.photoURL} alt="My image" />
        <input
          type="text"
          value={announcementContent}
          onChange={(e) => setAnnouncementContent(e.target.value)}
          placeholder="Announce something to your class"
        />
        {/* <br/> */}
        <input type="file" />
        <IconButton onClick={createPost}>
          <SendOutlined />
        </IconButton>
      </div>
      {posts?.map((post) => (
        <Announcement
          authorId={post.authorId}
          content={post.content}
          date={post.date}
          image={post.image}
          name={post.name}
          fileURL={post.fileURL}
        // key={}
        />
      ))}
    </div>
  );
}

export default Class;