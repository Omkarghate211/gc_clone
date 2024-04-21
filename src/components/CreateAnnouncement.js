import React, { useState } from 'react';
import { Button, TextField } from "@material-ui/core";

function CreateAnnouncement({ onPost }) {
  const [announcement, setAnnouncement] = useState('');

  const handlePost = () => {
    if (announcement.trim() !== '') {
      onPost(announcement);
      setAnnouncement(''); // Clear the input after posting
    }

function ClassroomPage() {
  const [announcements, setAnnouncements] = useState([]);
  const isAdmin = true; // You'd get this value based on user role

  const handleNewAnnouncement = (announcementContent) => {
    // Add new announcement to the list. In real-world scenarios, you'd post to a server.
    setAnnouncements(prev => [...prev, {
      image: 'path_to_image',
      name: 'Admin Name',
      date: new Date().toISOString(),
      content: announcementContent,
    }]);

  };

  return (
    <div className="createAnnouncement">
      <TextField
        value={announcement}
        onChange={(e) => setAnnouncement(e.target.value)}
        placeholder="Make an announcement..."
      />
      <Button onClick={handlePost}>Announce</Button>
    </div>
        <div>
      {isAdmin && <CreateAnnouncement onPost={handleNewAnnouncement} />}
      {announcements.map(announcement => (
        <Announcement key={announcement.date} {...announcement} />
      ))}
    </div>
  );
}

export default CreateAnnouncement;
