import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EventForm from "../components/EventForm";
import { GoPencil } from "react-icons/go";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { useEventsContext } from '../hooks/useEventsContext.jsx';

export default function Event() {
    const {user} = useAuthContext()
    const isEO = true;
    const [isOpen, setOpen] = useState(false);
    const handleOpenChange = (newValue) => {
        setOpen(newValue);
    };

    const [event, setEvent] = useState({
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        how: "",
        price: "",
        link: "",
        membersOnly: "",
        tags: [""]
    });

    const params = useParams();
    const navigate = useNavigate();

    async function removeEvent() {
        if (!window.confirm("Are you sure you want to remove this event?")) return;
        const id = params.id?.toString();
        if (!id) return;
        try {
            const response = await fetch(`http://localhost:5050/event/${id}`, { 
                 method: "DELETE",
                 headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                 }
                
             });
            if (!response.ok) {
                throw new Error("Failed to remove event");
            }
            navigate("/");
        } catch (error) {
            console.error("Error removing event:", error);
        }
    }


    useEffect(() => {
        async function fetchData() {
            const id = params.id?.toString() || undefined;
            if (!id) return;
            const response = await fetch(`http://localhost:5050/event/${id}`);
            if (!response.ok) {
                console.error(`An error has occurred: ${response.statusText}`);
                return;
            }
            const eventData = await response.json();
            if (!eventData) {
                console.warn(`Event with id ${id} not found`);
                navigate("/");
                return;
            }
            setEvent(eventData);
        }
        fetchData();
    }, [params.id, navigate]);

    return (
        <>
            {/* Event title placed outside of the container */}
            <div className="event-title-outside">
                <h1>{event.title || "Placeholder Event Title"}</h1>
            </div>
            
            {/* Main container for the rest of the content */}
            <div className="event-container">
                <div className="event-content">
                    {/* Left Column: Student association info and TLDR */}
                    <div className="event-sidebar">
                        <div className="event-organizer-section">
                            <h2 className="section-title">{event.username || "PLACEHOLDER FOR EO NAME"}</h2>
                            <img
                                src="https://www.studyinfinland.fi/sites/default/files/styles/logo_image/public/2019-09/Abo%20Akademi%20UUSI.png?itok=mDVmnidZ"
                                alt="Event Organizer"
                                className="organizer-image"
                            />
                        </div>
                        <div className="event-tldr-section">
                            <h2 className="section-title">TLDR</h2>
                            <div className="event-tldr">
                                <p>
                                    <strong>Var?</strong> {event.location || "-"}
                                </p>
                                <p>
                                    <strong>När?</strong> {event.date || "-"}, kl. {event.time || "-"}
                                </p>
                                <p>
                                    <strong>Hur?</strong> {event.how || "Ingen klädkod"}
                                </p>
                                <p>
                                    <strong>Pris?</strong> {event.price || "Inget pris uppgett"}
                                </p>
                                <p>
                                    <strong>{event.membersOnly ? "Endast för medlemmar" : ""}</strong>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Evenemangsbeskrivning and registration link */}
                    <div className="event-main">
                        <div className="event-description-section">
                            <h2 className="section-title">Evenemangsbeskrivning</h2>
                            <div className="event-description">
                                <p>
                                    {event.description ||
                                        "Här följer en längre evenemangsbeskrivning som kan vara samma text som på anmälningsblanketten/hemsidan."}
                                </p>
                            </div>
                        </div>
                        <div className="event-link-section">
                            <h2 className="section-title">Länk till anmälan</h2>
                            <div className="event-link-box">
                                <a
                                    href={event.link || "https://placeholder.url"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {event.link || "https://placeholder.url"}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fixed buttons container for EO */}
            {isEO && (
                <div className="fixed-buttons">
                    <button 
                        onClick={() => setOpen(true)} 
                        className="edit-button"
                    >
                        Edit <GoPencil size={18} />
                    </button>
                    <button 
                        onClick={removeEvent} 
                        className="remove-button"
                    >
                        Remove
                    </button>
                    <EventForm isOpen={isOpen} setOpen={setOpen} isNew={false} />
                </div>
            )}
        </>
    );
}
