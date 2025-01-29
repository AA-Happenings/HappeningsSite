db = connect( "mongodb://localhost:27017/happenings" );

db.events.insertMany( [
    {
        title: "DaTe&KK Gulisintagning",
        location: "Agora torget",
        date: "6.9",
        time: "16:00",
        tags: ["Sport", "Kultur", "Gulisevenemang", "Endast Medlemmar", "DaTe", "Kemistklubben"]
    },
    {
        title: "MK Gulisintagning",
        location: "ASA",
        date: "6.9",
        time: "17:00",
        tags: ["Gulisevenemang", "Endast Medlemmar", "Merkantila Klubben"]
    },
    {
        title: "Biologica Gulisintagning",
        location: "BioCity",
        date: "6.9",
        time: "18:00",
        tags: ["Gulisevenemang", "Endast Medlemmar", "Biologica"]
    },
    {
        title: "SF Gulisintagning",
        location: "K",
        date: "6.9",
        time: "19:00",
        tags: ["Sport", "Kultur", "Gulisevenemang", "Endast Medlemmar", "SF-Klubben"]
    },
    {
        title: "Infå Gulisintagning",
        location: "Spakun",
        date: "6.9",
        time: "20:00",
        tags: ["Sport", "Gulisevenemang", "Endast Medlemmar", "Infå"]
    },
    {
        title: "Busscup",
        location: "F",
        date: "13.7",
        time: "13:37",
        tags: ["Kultur","Endast Medlemmar", "DaTe"]
    },
    {
        title: "Tomtejakt",
        location: "ASK stugan",
        date: "20.11",
        time: "18:00",
        tags: ["Sport", "Kultur", "Kemistklubben"]
    },
])