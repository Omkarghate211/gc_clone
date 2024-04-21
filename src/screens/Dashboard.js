import React, { useEffect, useState, useCallback } from "react";
import "./Dashboard.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import ClassCard from "../components/ClassCard";

function Dashboard() {
  const [user, loading, authError] = useAuthState(auth);
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  const fetchClasses = useCallback(async () => {
    if (user && user.uid) {
      try {
        await db
          .collection("users")
          .where("uid", "==", user.uid)
          .onSnapshot((snapshot) => {
            const userData = snapshot?.docs[0]?.data();
            if (userData && Array.isArray(userData.enrolledClassrooms)) {
              setClasses(userData.enrolledClassrooms);
            } else {
              setClasses([]);
            }
          });
      } catch (error) {
        console.error("Error fetching classes:", error.message);
      }
    }
  }, [user]);

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/", { replace: true });
    else fetchClasses();
  }, [user, loading, fetchClasses, navigate]);

  return (
    <div className="dashboard">
      {classes.length === 0 ? (
        <div className="dashboard__404">
          No classes found! Join or create one!
        </div>
      ) : (
        <div className="dashboard__classContainer">
          {classes.map((individualClass) => (
            <ClassCard
              key={individualClass.id}
              creatorName={individualClass.creatorName}
              creatorPhoto={individualClass.creatorPhoto}
              name={individualClass.name}
              id={individualClass.id}
              style={{ marginRight: 30, marginBottom: 30 }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
