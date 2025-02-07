import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EventForm from "../components/EventForm";
import { GoPencil } from "react-icons/go";

export default function Event() {
    const isEO = true;
    const [isOpen, setOpen] = useState(false);
    const handleOpenChange = (newValue) => {
        setOpen(newValue);
    };

    // Event object to store information
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

    function editEvent() {
        if (isEO) {
            return (
                <div>
                    <button 
                        onClick={() => setOpen(true)} 
                        className="button-style flex items-center gap-2"
                    >
                        Edit <GoPencil size={18} />
                    </button>
                    <EventForm isOpen={isOpen} setOpen={handleOpenChange} isNew={false} />
                </div>
            );
        }
    }

    // Fetches data for an event by id from the db
    useEffect(() => {
        async function fetchData() {
            const id = params.id?.toString() || undefined;
            if (!id) return;
            const response = await fetch(`http://localhost:5050/event/${params.id.toString()}`);
            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                console.error(message);
                return;
            }
            const event = await response.json();
            if (!event) {
                console.warn(`Event with id ${id} not found`);
                navigate("/");
                return;
            }
            setEvent(event);
        }
        fetchData();
    }, [params.id, navigate]);

    return (
        <div className="event-page">
            {/* Event Title at the Top */}
            <div className="event-title">
                <h1>{event.title || "Placeholder Event Title"}</h1>
            </div>

            <div className="event-content">
                {/* Left Sidebar: Organizer Info & TLDR */}
                <div className="event-sidebar">
                    {/* Organizer Info */}
                    <div className="event-organizer-section">
                        <h2 className="section-title">PLACEHOLDER FOR EO NAME</h2>
                        <img
                            /* Insert picture for actual event */
                            src="https://www.studyinfinland.fi/sites/default/files/styles/logo_image/public/2019-09/Abo%20Akademi%20UUSI.png?itok=mDVmnidZ"
                            alt="Event Organizer"
                            className="organizer-image"
                        />
                    </div>

                    {/* TLDR Section */}
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
                    {/* Edit button for logged in */}
                    <div className="edit-button">
                        {editEvent()}</div>
                </div>

                {/* Right Main: Event Description & Registration Link */}
                <div className="event-main">
                    {/* Description Section (Top in the right column) */}
                    <div className="event-description-section">
                        <h2 className="section-title">Evenemangsbeskrivning</h2>
                        <div className="event-description">
                            <p>
                                {event.description ||
                                    "Här följer en längre evenemangsbeskrivning som kan vara samma text som på anmälningsblanketten/hemsidan."}
                            </p>
                        </div>
                    </div>

                    {/* Registration Link Section (Below the description) */}
                    {/* RKrävs att länken startar med "https://" för att redirect ska funka */}
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
    );
}
