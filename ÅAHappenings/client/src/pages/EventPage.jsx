import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Event() {

    //event object to store information
    const [event, setEvent] = useState({
        title: "",
        location: "",
        date: "",
        time:""
    });

    const [isNew, setIsNew] = useState(true);
    const params = useParams();
    const navigate = useNavigate();

    //fetches data for an event by id from the db 
    useEffect(() => {
        async function fetchData() {
            const id = params.id?.toString() || undefined;
            if(!id) return;
            setIsNew(false);
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
                        <p><strong>Vad?</strong> {event.type || "Placeholder Event Type"}</p>
                        <p><strong>När?</strong> {event.date || "Placeholder Date"}, kl.{event.time || "Placeholder Time"}</p>
                        <p><strong>Var?</strong> {event.location || "Placeholder Location"}</p>
                        <p><strong>Hur?</strong> {event.dresscode || "Placeholder Dresscode"}</p>
                    </div>
    
                    {/* Link to Registration */}
                    <h2 className="section-title">Länk till anmälan</h2>
                    <div className="event-link-box">
                        <p>https://placeholder.url</p>
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
            </div>
        </div>
    );
}