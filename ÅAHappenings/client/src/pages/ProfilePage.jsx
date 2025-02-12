import React, { useState } from "react";
import "../styles/profile.css"; 

const profilepage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [color, setColor] = useState("#3498db"); // Default color
  const [error, setError] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const validImageTypes = ["image/png", "image/jpeg", "image/jpg"]; // Allowed image formats

    if (file) {
      if (!validImageTypes.includes(file.type)) {
        setError("Endast bildfiler (PNG, JPEG, JPG) är tillåtna.");
        return; 
      }

      setError(""); 
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="profile-container">
        {/* Profile Picture Box */}
        <div className="profile-pic-container">
          <div className="profile-pic-box">
            {profilePic ? (
              <img src={profilePic} alt="Profile" className="profile-pic" />
            ) : (
              <span className="placeholder-text">Upload Profile Picture</span>
            )}
          </div>
          <div className="chooseFile">
            <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleImageUpload} />
          </div>
          {error && <p className="error-message">{error}</p>} {/* Error message display */}
        </div>

        {/* Textboxes for Profile Info */}
        <div className="profile-info">
          <input
            type="text"
            placeholder="Föreningens namn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="profile-input"
          />
          <textarea
            placeholder="Beskrivning"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="profile-textarea"
          />
          <input
            type="text"
            placeholder="Länk"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="profile-input"
          />
        </div>

        {/* Color Picker */}
        <div className="color-picker-container">
          <label>Välj föreningens färg:</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default profilepage;