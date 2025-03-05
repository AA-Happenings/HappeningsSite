import { useState, useEffect } from "react";
import { Dialog } from "react-dialog-element";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import "../styles/Dialog.css";

export default function EditProfileDialog({ isOpen, setOpen, profile, setProfile }) {
  const { user } = useAuthContext();

  const [form, setForm] = useState({
    name: profile?.username || "",
    description: profile?.description || "",
    linkToWebsite: profile?.linkToWebsite || "",
    color: profile?.color || "#ffffff",
    profilePic: profile?.profilePic || "",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.username || "",
        description: profile.description || "",
        linkToWebsite: profile.linkToWebsite || "",
        color: profile.color || "#ffffff",
        profilePic: profile.profilePic || "",
      });
    }
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
          "Authorization": `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          description: form.description,
          linkToWebsite: form.linkToWebsite,
          color: form.color,
          profilePic: form.profilePic,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedOrganizer = await response.json();
      setProfile(updatedOrganizer);  // Update the profile in parent component
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
              <label className="dialog-label">Name:</label>
              <input
                required
                type="text"
                name="name"
                placeholder="Association Name"
                className="dialog-input"
                value={form.name}
                readOnly // If you don't want users to edit their name
              />
              <label className="dialog-label">Description:</label>
              <textarea
                name="description"
                placeholder="Enter a description"
                className="dialog-textarea"
                value={form.description}
                onChange={(e) => updateForm({ description: e.target.value })}
              />
              <label className="dialog-label">Link:</label>
              <input
                type="url"
                name="link"
                placeholder="Enter your website URL"
                className="dialog-input"
                value={form.linkToWebsite}
                onChange={(e) => updateForm({ linkToWebsite: e.target.value })}
              />
            </div>
            <div className="item-container-right">
              <label className="dialog-label">Color:</label>
              <input
                type="color"
                name="color"
                className="dialog-input"
                value={form.color}
                onChange={(e) => updateForm({ color: e.target.value })}
              />
              <label className="dialog-label">Profile Picture URL:</label>
              <input
                type="url"
                name="profilePic"
                placeholder="Enter Profile Picture URL"
                className="dialog-input"
                value={form.profilePic}
                onChange={(e) => updateForm({ profilePic: e.target.value })}
              />
            </div>
          </div>
          <div className="dialog-buttons">
            <button onClick={() => setOpen(false)} className="button-style-cancel">Cancel</button>
            <button onClick={onSubmit} className="button-style">Save Changes</button>
          </div>
        </Dialog>
      )}
    </div>
  );
}
