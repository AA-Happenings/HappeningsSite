import { useState, useEffect } from "react";
import { Dialog } from "react-dialog-element";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import "../styles/Dialog.css";

export default function EditProfileDialog({ isOpen, setOpen, profile, setProfile }) {
  const { user } = useAuthContext();

  const [form, setForm] = useState({
    description: profile?.description || "",
    linkToWebsite: profile?.linkToWebsite || "",
    profilePic: profile?.profilePic || null,
    color: profile?.color || "#3498db"
  });
  const [error, setError] = useState("");

  // Update local form state when parent's profile changes
  useEffect(() => {
    if (profile) {
      setForm({
        description: profile.description || "",
        linkToWebsite: profile.linkToWebsite || "",
        profilePic: profile.profilePic || null,
        color: profile.color || "#3498db"
      });
    }
  }, [profile]);

  function updateForm(value) {
    setForm((prev) => ({ ...prev, ...value }));
  }

  // Handle image upload with preview and file type validation
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const validImageTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file) {
      if (!validImageTypes.includes(file.type)) {
        setError("Endast bildfiler (PNG, JPEG, JPG) är tillåtna.");
        return;
      }
      setError("");
      const reader = new FileReader();
      reader.onloadend = () => {
        updateForm({ profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit() {
    try {
      const response = await fetch(`http://localhost:5050/organizer/update/${user._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify({
          description: form.description,
          linkToWebsite: form.linkToWebsite,
          color: form.color,
          profilePic: form.profilePic
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedOrganizer = await response.json();
      setProfile(updatedOrganizer); // Update parent profile state
    } catch (error) {
      console.error("Error updating organizer profile:", error);
    } finally {
      setOpen(false);
    }
  }

  return (
    <>
      {isOpen && (
        <Dialog 
          isOpen={isOpen} 
          setOpen={setOpen} 
          style={{ borderRadius: "10px", border: "3px solid rgb(92, 91, 91)" }}
        >
          <h1 className="dialog-header">Redigera Föreningsprofil</h1>
          <div className="dialog-container">
            <div className="item-container-left">
              <label className="dialog-label">Föreningens logo</label>
              <div className="logo-upload">
                {form.profilePic ? (
                  <div className="logo-container">
                    <img src={form.profilePic} alt="Logo" className="logo-preview" />
                    <button 
                      onClick={() => updateForm({ profilePic: null })} 
                      className="remove-logo-button"
                    >
                      Ta bort logotyp
                    </button>
                  </div>
                ) : (
                  <span className="placeholder-text">Ingen logotyp vald</span>
                )}
              </div>
              {/* Always reserve space for the file input */}
              <div className="file-input-wrapper">
                <input 
                  type="file" 
                  accept="image/png, image/jpeg, image/jpg" 
                  onChange={handleImageUpload} 
                  className={`dialog-input ${form.profilePic ? "hidden-file-input" : ""}`} 
                />
              </div>
              {error && <p className="error-message">{error}</p>}
              <label className="dialog-label" style={{ marginTop:"10px" }}>Ange föreningens färg</label>
              <input 
                type="color" 
                value={form.color} 
                onChange={(e) => updateForm({ color: e.target.value })}
                className="dialog-input color-input"
              />
            </div>
            <div className="item-container-right">
              <label className="dialog-label">Kort om föreningen</label>
              <textarea 
                placeholder="Skriv en beskrivning av din förening" 
                className="dialog-textarea" 
                value={form.description}
                onChange={(e) => updateForm({ description: e.target.value })}
              />
              <label className="dialog-label">Länk till hemsida</label>
              <input 
                type="text" 
                placeholder="Länk till föreningens hemsida" 
                className="dialog-input"
                value={form.linkToWebsite}
                onChange={(e) => updateForm({ linkToWebsite: e.target.value })}
              />
            </div>
          </div>
          <div className="dialog-buttons">
            <button onClick={() => setOpen(false)} className="button-style-cancel">Avbryt</button>
            <button onClick={onSubmit} className="button-style">Spara ändringar</button>
          </div>
        </Dialog>
      )}
    </>
  );
}
