import React, { useState } from "react";
import EditProfileDialog from "../components/EditProfileDialog";
import { GoPencil } from "react-icons/go";
import "../styles/profile.css"; 

export default function AssociationProfile() {
  const [profile, setProfile] = useState({
    name: "Association Name",
    description:
      "This is a brief description about the association. It can be updated later via the edit dialog.",
    link: "http://association.example.com",
    profilePic: null,
    color: "#3498db"
  });
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

          {/* Right Column: Header Above the Bordered Box */}
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
