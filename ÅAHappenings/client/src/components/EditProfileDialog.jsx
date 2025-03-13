import { useState, useEffect } from "react";
import { Dialog } from "react-dialog-element";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import "../styles/Dialog.css";

export default function EditProfileDialog({ isOpen, setOpen, profile, setProfile }) {
  const { user } = useAuthContext();
  const [image, setImage] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const [form, setForm] = useState({
    description: profile?.description || "",
    linkToWebsite: profile?.linkToWebsite || "",
    pfpUrl: profile?.pfpUrl || null,
    color: profile?.color || "#3498db"
  });
  const [error, setError] = useState("");

  // Update local form state when parent's profile changes
  useEffect(() => {
    if (profile) {
      setForm({
        description: profile.description || "",
        linkToWebsite: profile.linkToWebsite || "",
        pfpUrl: profile.pfpUrl 
        ? profile.pfpUrl
        : `http://localhost:5050/uploads/${user._id}`,
        color: profile.color || "#3498db"
      });
    }
  }, [profile, user._id]);

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
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        updateForm({ pfpUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post("http://localhost:5050/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${user.token}`
        },
      });

      setUploadMessage("Upload Successful");
      console.log(response.data);
    } catch (error) {
      setUploadMessage("Upload Failed");
    }
  }

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
          pfpUrl: user._id
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      uploadImage();
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
                {form.pfpUrl ? (
                  <div className="logo-container">
                    <img src={form.pfpUrl} alt="Logo" className="logo-preview" />
                    <button 
                      onClick={() => updateForm({ pfpUrl: null })} 
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
                  className={`dialog-input ${form.pfpUrl ? "hidden-file-input" : ""}`} 
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
