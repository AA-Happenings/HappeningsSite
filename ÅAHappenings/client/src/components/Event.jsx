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

    return(
        <div class="event-box">
            <div>
                <h2>
                    TLDR
                </h2>
            </div>
            <div>
                <h1>
                    Event description
                    <br />
                    {event.title}
                </h1>
            </div>
        </div>
    );
}