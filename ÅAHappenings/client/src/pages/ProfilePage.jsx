import React, { useState } from "react";
import EditProfileDialog from "../components/EditProfileDialog";
import { GoPencil } from "react-icons/go";
import { useAuthContext } from "../hooks/useAuthContext";
import "../styles/profile.css"; 

export default function ProfilePage() {
  const { user } = useAuthContext();

  // Use the logged-in organizer's details if available.
  const initialProfile = user
    ? {
        name: user.username,
        description: user.description || "No description provided",
        link: user.linkToWebsite || "",
        color: user.color || "#3498db",
        profilePic: user.profilePic || ""
      }
    : {
        name: "Association Name",
        description: "This is a brief description about the association.",
        link: "http://association.example.com",
        color: "#3498db",
        profilePic: null
      };

  const [profile, setProfile] = useState(initialProfile);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="profile-page-wrapper">
      <div className="profile-title-outside">
        <h1>{profile.name}</h1>
      </div>

      <div className="profile-container">
        <div className="profile-content">
          {/* Left Column: Sidebar */}
          <div className="profile-sidebar">
            <div className="profile-pic-box">
              {profile.profilePic ? (
                <img src={profile.profilePic} alt="Profile" className="profile-pic" />
              ) : (
                <span className="placeholder-text">Ingen profilbild vald</span>
              )}
            </div>
            <div className="profile-quick-info">
              <p>
                <strong>Link:</strong>{" "}
                <a href={profile.link} target="_blank" rel="noopener noreferrer">
                  {profile.link}
                </a>
              </p>
            </div>
          </div>

          {/* Right Column: Profile Description */}
          <div className="profile-main-wrapper">
            <h2 className="profile-subheader">Om vår förening</h2>
            <div className="profile-main">
              <p>{profile.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed-buttons">
        <button onClick={() => setIsOpen(true)} className="edit-button">
          Edit <GoPencil size={18} />
        </button>
      </div>

      {isOpen && (
        <EditProfileDialog
          isOpen={isOpen}
          setOpen={setIsOpen}
          profile={profile}
          setProfile={setProfile}
        />
      )}
    </div>
  );
}
