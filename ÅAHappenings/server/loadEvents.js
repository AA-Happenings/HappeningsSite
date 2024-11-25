db = connect( "mongodb://localhost:27017/happenings" );

db.events.insertMany( [
    {
        title: "DaTe&KK Gulisintagning",
        location: "Agora torget",
        date: "6.9",
        time: "16:00"
    },
    {
        title: "MK Gulisintagning",
        location: "ASA",
        date: "6.9",
        time: "17:00"
    },
    {
        title: "Biologica Gulisintagning",
        location: "BioCity",
        date: "6.9",
        time: "18:00"
    },
    {
        title: "SF Gulisintagning",
        location: "K",
        date: "6.9",
        time: "19:00"
    },
    {
        title: "Infå Gulisintagning",
        location: "Spakun",
        date: "6.9",
        time: "20:00"
    },
    {
        title: "Busscup",
        location: "F",
        date: "13.7",
        time: "13:37"
    },
    {
        title: "Tomtejakt",
        location: "ASK stugan",
        date: "20.11",
        time: "18:00"
    },
])