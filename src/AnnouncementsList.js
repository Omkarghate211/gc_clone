import React, { useState, useEffect } from 'react';
import Announcement from './Announcement';

function AnnouncementsList() {
    const [announcementsData, setAnnouncementsData] = useState([]);

    useEffect(() => {
      
        db.collection('announcements').get().then(snapshot => {
            const fetchedData = snapshot.docs.map(doc => ({ 
                id: doc.id,
                ...doc.data() 
            }));
            setAnnouncementsData(fetchedData);
        });
    }, []);

    return (
        <div>
            {announcementsData.map(announcement => (
                <Announcement 
                    key={announcement.id}
                    announcementId={announcement.id}
                    image={announcement.image}
                    name={announcement.name}
                    date={announcement.date}
                    content={announcement.content}
                    isAdmin={announcement.isAdmin}
                    fileURL={announcement.fileURL}
                />
            ))}
        </div>
    );
}

export default AnnouncementsList;
