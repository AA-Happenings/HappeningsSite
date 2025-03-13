import { useAuthContext } from '../hooks/useAuthContext';  // Adjust the path if needed
import { useState, useEffect, } from "react";
import { Dialog } from "react-dialog-element";
import { useParams, useNavigate } from 'react-router-dom';

import React from "react";
import EditProfileDialog from "../components/EditProfileDialog";
import { GoPencil } from "react-icons/go";
import "../styles/profile.css";


export default function ProfilePage() {
  const { user, admin } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const params = useParams();

  // Fetch profile data when component mounts
  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;
      const id = params.id?.toString();
      
      try {
        const response = await fetch(`http://localhost:5050/organizer/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();
        setProfile(data);  // Set profile data
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }

    fetchProfile();
  }, [user]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  const isOwner = user && profile._id && user._id === profile._id;
  const canEdit = admin || isOwner;

  const handleProfileUpdate = (updatedProfile) => {
    setProfile(updatedProfile);  // Update the profile state with the new data
    setIsOpen(false);  // Close the dialog after saving the changes
  };

  return (
    <>
      <div className="profile-title-outside">
        <h1>{profile.username || "Placeholder Profile Name"}</h1>
      </div>

      <div className="profile-container">
        <div className="profile-content">
          <div className="profile-sidebar">
            <div className="profile-pic-box">
              {profile.profilePic ? (
                <img src={`/uploads/${user._id}.*`} alt="Profile" className="profile-pic" />
              ) : (
                <span className="placeholder-text">No profile picture</span>
              )}
            </div>
            <div className="profile-quick-info">
              <p>
                <strong>Link:</strong>{" "}
                <a href={profile.linkToWebsite || "#"} target="_blank" rel="noopener noreferrer">
                  {profile.linkToWebsite || "No link provided"}
                </a>
              </p>
            </div>
          </div>

          <div className="profile-main-wrapper">
            <h2 className="profile-subheader">About Us</h2>
            <div className="profile-main">
              <p>{profile.description || "No description provided."}</p>
            </div>
          </div>
        </div>
      </div>

      {canEdit && (
        <div className="fixed-buttons">
          <button onClick={() => setIsOpen(true)} className="edit-button">
            Edit <GoPencil size={18} />
          </button>
        </div>
      )}

      {isOpen && (
        <EditProfileDialog
          isOpen={isOpen}
          setOpen={setIsOpen}
          profile={profile}
          setProfile={handleProfileUpdate}  // Pass the update function to the dialog
        />
      )}
    </>
  );
}
