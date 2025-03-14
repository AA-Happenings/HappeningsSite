import { useState, useEffect } from 'react';
import { Dialog } from 'react-dialog-element';
import { useNavigate, useParams } from 'react-router-dom';
import { useEventsContext } from '../hooks/useEventsContext.jsx';
import { useAuthContext } from '../hooks/useAuthContext.jsx';

export default function EventForm({isOpen, setOpen, isNew}) {

    const {dispatch} = useEventsContext();
    const {user} = useAuthContext();

    const [form, setForm] = useState({
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        how: "",
        price: "",
        link: "",
        membersOnly: "",
        tags: [""],
        ao: "",
    });

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
          const id = params.id?.toString() || undefined;
          if(id == undefined) return;
          const response = await fetch(
            `http://localhost:5050/event/${params.id.toString()}`
          );
          if (!response.ok) {
            const message = `An error has occurred: ${response.statusText}`;
            console.error(message);
            return;
          }
          const event = await response.json();
          console.log(event)
          if (!event) {
            console.warn(`Event with id ${id} not found`);
            navigate("/");
            return;
          }
          setForm(event);
        }
        fetchData();

    }, [params.id, navigate]);

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    function updateTags(tag, checked) {
        // When checking the aö checkbox, also set a default value if not already set
        if (tag === "aö" && checked && !form.ao) {
            updateForm({ ao: "F" });
        }
        const oldTags = form.tags;
        const newTags = checked ? [...oldTags, tag] : oldTags.filter((t) => t !== tag);
        setForm((prev) => ({ ...prev, tags: newTags }));
    }
    

    async function onSubmit() {
        const event = { ...form };
        try {
        let response;
        if (isNew) {
            // if we are adding a new event we will POST to /event.
            response = await fetch("http://localhost:5050/event", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                },
                body: JSON.stringify(event),
            });
            const json = response.json();
            dispatch({type: "CREATE_EVENT", payload: json});
        } else {
            // if we are updating an event we will PATCH to /event/:id.
            response = await fetch(`http://localhost:5050/event/${params.id.toString()}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify(event),
            });
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        } catch (error) {
        console.error('A problem occurred adding or updating an event: ', error);
        } finally {
            setForm({title: "", description: "", location: "", date: "", time: "", how: "", price: "", link: "", membersOnly: "", tags: [], ao: ""})
            navigate("/");
        }
    }

    return (
        <div>
            {/* Dialog component */}
            {isOpen && (
                <Dialog isOpen={isOpen} setOpen={setOpen} style={{borderRadius: "10px", border: "3px solid rgb(92, 91, 91)" }}>
                <h1 className="dialog-header">Skapa Ditt Evenemang</h1>
                <div className="dialog-container">
                    <div className="item-container-left">

                    {/* Title Field */}
                    <label className="dialog-label">*Rubrik:</label>
                    <input 
                        required type="text" name="title" 
                        placeholder="Ge ditt evenemang ett namn" 
                        className="dialog-input" 
                        value={form.title}
                        onChange={(e) => updateForm({title: e.target.value})}
                    />

                    {/* Description Field */}
                    <label className="dialog-label">Beskrivning:</label>
                    <textarea 
                        placeholder="Ge ditt evenemang en beskrivning" 
                        className="dialog-textarea" 
                        value={form.description}
                        onChange={(e) => updateForm({description: e.target.value})}
                    />

                    {/* Price Field */}
                    <label className="dialog-label">Pris:</label>
                    <input 
                        type="text" placeholder="Ange priset för ditt evenemang" 
                        className="dialog-input"
                        value={form.price}
                        onChange={(e) => updateForm({price: e.target.value})}
                    />

                    {/* Location Field */}
                    <label className="dialog-label">Plats:</label>
                    <input 
                        type="text" placeholder="Ge platsen för ditt evenemang" 
                        className="dialog-input" 
                        value={form.location}
                        onChange={(e) => updateForm({location: e.target.value})}
                    />

                    {/* How Field */}
                    <label className="dialog-label">Hur:</label>
                    <input 
                        type="text" placeholder="Ge ett tema/klädkod" 
                        className="dialog-input" 
                        value={form.how}
                        onChange={(e) => updateForm({how: e.target.value})}
                    />
                    {/* Link Field */}
                    <label className="dialog-label">Länk:</label>
                    <input 
                        type="text" placeholder="Lägg till en länk" 
                        className="dialog-input"
                        value={form.link}
                        onChange={(e) => updateForm({link: e.target.value})}
                    />
                    </div>

                    <div className="item-container-right">
                    {/* Co-organizer Dropdown */}
                    <label className="dialog-label">Välj medorganisatör</label>
                    <select className="dialog-select-co">
                        <option value="">Välj</option>
                        {/* Add more options dynamically if needed */}
                    </select>

                    {/* Members Only Checkbox */}
                    <div className="dialog-checkbox">
                    <input type="checkbox" id="members-only" checked={form.membersOnly} onChange={(e) => updateForm({membersOnly: e.target.checked})}/>
                    <label htmlFor="members-only">Endast för medlemmar</label>
                    </div>

                    {/* Date Section */}
                    <div className="dialog-date">
                    <label className="dialog-label" htmlFor="date">*Välj datum</label>
                    <input 
                        required type="date" 
                        id="date" 
                        className="dialog-input" 
                        format-value="yyyy-MM-dd"
                        value={form.date}
                        onChange={(e) => updateForm({date: e.target.value})}
                        />
                    </div>

                    {/* Time Field */}
                    <label className="dialog-label">Tid:</label>
                    <input 
                        type="time" 
                        placeholder="Ge ett klockslag" 
                        className="dialog-input"
                        value={form.time}
                        onChange={(e) => updateForm({time: e.target.value})}

                    />
                    {/* Tags */}
                    <div className="dialog-checkbox-container">
                    <div className="dialog-checkbox">
                        <input 
                            type="checkbox" id="sport" 
                            checked={form.tags.includes("sport")} 
                            onChange={(e) => updateTags("sport", e.target.checked)}
                        />
                        <label htmlFor="sport">Sport</label>
                        </div>
                        <div className="dialog-checkbox">
                        <input 
                            type="checkbox" id="kultur" 
                            checked={form.tags.includes("kultur")} 
                            onChange={(e) => updateTags("kultur", e.target.checked)}
                        />
                        <label htmlFor="kultur">Kultur</label>
                        </div>
                        <div className="dialog-checkbox">
                        <input 
                            type="checkbox" id="sittning"
                            checked={form.tags.includes("sittning")} 
                            onChange={(e) => updateTags("sittning", e.target.checked)}
                        />
                        <label htmlFor="sittning">Sittning</label>
                        </div>
                        <div className="dialog-checkbox">
                        <input 
                            type="checkbox" id="gulisevenemang" 
                            checked={form.tags.includes("gulisevenemang")} 
                            onChange={(e) => updateTags("gulisevenemang", e.target.checked)}
                        />
                        <label htmlFor="gulisevenemang">Gulisevenemang</label>
                        </div>
                        <div className="dialog-checkbox">
                        <input 
                            type="checkbox" id="byob" 
                            checked={form.tags.includes("byob")} 
                            onChange={(e) => updateTags("byob", e.target.checked)}
                        />
                        <label htmlFor="byob">BYOB</label>
                        </div>
                        <div className="dialog-checkbox">
                        <input
                            type="checkbox" id="gratis"
                            checked={form.tags.includes("gratis")}
                            onChange={(e) => updateTags("gratis", e.target.checked)}
                        />
                        <label htmlFor="gratis">Gratis</label>
                        </div>
                        <div className="dialog-checkbox">
                            <input
                                type="checkbox"
                                id="aö"
                                checked={form.tags.includes("aö")}
                                onChange={(e) => updateTags("aö", e.target.checked)}
                            />
                            <label htmlFor="aö">AÖ</label>
                            {form.tags.includes("aö") && (
                                <select
                                    value = {form.ao}
                                    onChange = {(e) => updateForm({ ao: e.target.value})}
                                    className = "dialog-select-ao"
                                >
                                    <option value = "F">F(HF)</option>
                                    <option value = "MK">MK</option>
                                    <option value = "K">K</option>
                                    <option value = "B">F(KK)</option>
                                </select>
                            )}
                        </div>
                        {/* Add other checkboxes following the same pattern */}
                    </div>

                    </div>
                </div>
                {/* Buttons */}
                <div className="dialog-buttons">
                    <button onClick={() => setOpen(false)} className="button-style-cancel">Avbryt</button>
                    <button onClick={() => {
                        console.log("Event Created!");
                        onSubmit();
                        }} className="button-style">
                        {isNew ? "Skapa evenemang" : "Spara ändringar"}
                        </button>
                    </div>
                </Dialog>
            )}
            </div>
    );
}