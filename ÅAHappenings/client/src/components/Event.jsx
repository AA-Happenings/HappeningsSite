import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EventForm from "./EventForm";


export default function Event() {
    const isEO = true;
    const [isOpen, setOpen] = useState(false);
    const handleOpenChange = (newValue) => {
        setOpen(newValue);
    }

    //event object to store information
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
        tags: {}
    });

    const params = useParams();
    const navigate = useNavigate();

    function editEvent() {
        if(isEO) {
            return (
                <div>
                <button onClick={() => setOpen(true)} className="button-style">Edit event</button>
                <EventForm isOpen={isOpen} setOpen={handleOpenChange} isNew={false}/>
                </div>
            );
        }
    }

    //fetches data for an event by id from the db 
    useEffect(() => {
        async function fetchData() {
            const id = params.id?.toString() || undefined;
            if(!id) return;
            const response = await fetch(
                `http://localhost:5050/event/${params.id.toString()}`
            );
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
        return;
    }, [params.id, navigate]);

    return (
        <div className="event-page">
            {/* Event Title at the Top */}
            <div className="event-title">
                <h1>{event.title || "Placeholder Event Title"}</h1>
            </div>
    
            <div className="event-content">
                {/* TLDR Section */}
                <div className="event-tldr-section">
                    <h2 className="section-title">TLDR</h2>
                    <div className="event-tldr">
                        <p><strong>Var?</strong> {event.location || "-"}</p>
                        <p><strong>När?</strong> {event.date || "-"}, kl.{event.time || "-"}</p>
                        <p><strong>Hur?</strong> {event.how || "Ingen klädkod"}</p>
                        <p><strong>Pris?</strong> {event.price || "Inget pris uppgett"}</p>
                        <p><strong>{event.membersOnly ? "Endast för medlemmar" : ""}</strong></p>
                    </div>
    
                    {/* Link to Registration */}
                    <h2 className="section-title">Länk till anmälan</h2>
                    <div className="event-link-box">
                        <p>{event.link || "https://placeholder.url"}</p>
                    </div>
                </div>
    
                {/* Description Section */}
                <div className="event-description-section">
                    <h2 className="section-title">Evenemangsbeskrivning</h2>
                    <div className="event-description">
                        <p>
                            {event.description || "Här följer en längre evenemangsbeskrivning som kan vara samma text som på anmälningsblanketten/hemsidan."}
                        </p>
                    </div>
                </div>

                {/* Edit button for logged in */}
                <div>
                    {editEvent()}
                </div>
            </div>
        </div>
    );
}