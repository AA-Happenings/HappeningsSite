import { useState, useEffect } from "react";
import { Dialog } from "react-dialog-element";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import "../styles/Dialog.css";

export default function EditProfileDialog({ isOpen, setOpen, profile, setProfile }) {
  const { user } = useAuthContext();

  const [form, setForm] = useState({
    name: "",
    description: "",
    link: "",
    color: "",
    profilePic: ""
  });

  // Function to fetch organizer profile details
  async function fetchProfile() {
    if (!user || !user._id) return;

    try {
      const response = await fetch(`http://localhost:5050/organizer/${user._id}`, {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProfile({
        name: data.username,
        description: data.description || "",
        link: data.linkToWebsite || "",
        color: data.color || "#ffffff",
        profilePic: data.profilePic || ""
      });
    } catch (error) {
      console.error("Error fetching organizer profile:", error);
    }
  }

  // Fetch profile data when the dialog opens
  useEffect(() => {
    if (isOpen) {
      fetchProfile();
    }
  }, [isOpen]);

  useEffect(() => {
    setForm({
      name: profile.name || "",
      description: profile.description || "",
      link: profile.link || "",
      color: profile.color || "",
      profilePic: profile.profilePic || ""
    });
  }, [profile]);

  function updateForm(value) {
    setForm((prev) => ({ ...prev, ...value }));
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
          linkToWebsite: form.link,
          color: form.color,
          profilePic: form.profilePic
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedOrganizer = await response.json();
      setProfile({
        name: updatedOrganizer.username,
        description: updatedOrganizer.description,
        link: updatedOrganizer.linkToWebsite,
        color: updatedOrganizer.color,
        profilePic: updatedOrganizer.profilePic
      });
    } catch (error) {
      console.error("Error updating organizer profile:", error);
    } finally {
      setOpen(false);
    }
  }

  return (
    <div>
      {isOpen && (
        <Dialog isOpen={isOpen} setOpen={setOpen} style={{ borderRadius: "10px", border: "3px solid rgb(92, 91, 91)" }}>
          <h1 className="dialog-header">Edit Profile</h1>
          <div className="dialog-container">
            <div className="item-container-left">
              {/* Name (read-only) */}
              <label className="dialog-label">Name:</label>
              <input
                required
                type="text"
                name="name"
                placeholder="Association Name"
                className="dialog-input"
                value={form.name}
                readOnly
              />
              {/* Description */}
              <label className="dialog-label">Beskrivning:</label>
              <textarea
                name="description"
                placeholder="Ange en beskrivning"
                className="dialog-textarea"
                value={form.description}
                onChange={(e) => updateForm({ description: e.target.value })}
              />
              {/* Website Link */}
              <label className="dialog-label">Länk:</label>
              <input
                type="url"
                name="link"
                placeholder="Ange din webbplats"
                className="dialog-input"
                value={form.link}
                onChange={(e) => updateForm({ link: e.target.value })}
              />
            </div>
            <div className="item-container-right">
              {/* Color */}
              <label className="dialog-label">Färg:</label>
              <input
                type="color"
                name="color"
                className="dialog-input"
                value={form.color}
                onChange={(e) => updateForm({ color: e.target.value })}
              />
              {/* Profile Picture URL */}
              <label className="dialog-label">Profilbild URL:</label>
              <input
                type="url"
                name="profilePic"
                placeholder="Ange URL för profilbild"
                className="dialog-input"
                value={form.profilePic}
                onChange={(e) => updateForm({ profilePic: e.target.value })}
              />
            </div>
          </div>
          <div className="dialog-buttons">
            <button onClick={() => setOpen(false)} className="button-style-cancel">
              Avbryt
            </button>
            <button onClick={onSubmit} className="button-style">
              Spara ändringar
            </button>
          </div>
        </Dialog>
      )}
    </div>
  );
}
