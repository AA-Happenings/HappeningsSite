db = connect( "mongodb://localhost:27017/happenings" );

db.events.insertMany( [
    {
        title: "Kubbturnering",
        description: "",
        location: "Agora torget",
        date: "2025-03-12",
        time: "16:00",
        how: "",
        price: "",
        link: "",
        membersOnly: "",
        tags: ["Sport", "Kultur"]
    },
    {
        title: "DaTe X Infå LoL tournament",
        description: "",
        location: "Summoner's rift & DaTe twitch",
        date: "2025-03-22",
        time: "18:00",
        how: "",
        price: "",
        link: "",
        membersOnly: "",
        tags: ["DaTe", "Infå"]
    },
    {
        title: "Axelnatten",
        description: "Det ryktas om att gruvsitzen är tillbaka i samband med Axelnatten!?\n\nVälkomna med på Axelnatten 2025! I år den 15.3 kl. 19.00 börjar vi Axelnatten på F med en sitz med gruvtema, ta på dej hjälmen & pannlampan, det är mörkt nere i gruvan... Kvällen fortsätter kl.23.00 på Kårens innergård där Axelbandet uppträder med fina melodier samt delas kamratskapsstipendiet ut. Efter detta fortsätter kvällen med AÖ.",
        location: "Kårens innergård",
        date: "2025-03-15",
        time: "19:00",
        how: "Pannlampa",
        price: "12€ (10€)",
        link: "https://kemistklubben.org/events/axelnatten_2/",
        membersOnly: "",
        tags: ["Kemistklubben"]
    },
    {
        title: "Allwarnatten",
        description: "Årets höjdpunkt närmar sig! \n\n För att fira vår älskade förenings 100 verksamhetsår, samlas vi med gamla och nya SF-are natten till SF-klubbens födelsedag på K för att njuta av kvällen tillsammans i sann SF-anda! Klädkoden är ingen halare och lite finare. Detta är ett av årets populäraste evenemang så se till att inte missa denna fest! \n\n Vi ses på K Lördagen 22.3.2025, kl. 00 framåt!",
        location: "K",
        date: "2025-03-22",
        time: "00:00",
        how: "Med Allwar",
        price: "for free",
        link: "https://sfklubben.fi/evenemang/?action=996",
        membersOnly: "",
        tags: ["SF"]
    },
    {
        title: "Eurovision sitz",
        description: "Vi har glädjen att bjuda er till en oförglömlig kväll fylld med Cha Cha Cha, Hard rock hallelujah och No rules!🔥 Gör dig redo för att dra fram ditt musikaliska sinne, din bästa Eurovisions outfit och en otrolig scenkarisma! Den 7.3. tar vi en ordentlig tjuvstart in i Eurovisionsbubblan! 🌟",
        location: "MK",
        date: "2025-03-07",
        time: "19:00",
        how: "Niinku Cha Cha Cha",
        price: "15 € (12 €)",
        link: "https://www.merkantilaklubben.com/event-details/eurovisions-sitz",
        membersOnly: "",
        tags: ["MK", "sitz"]
    },
    {
        title: "Faustivalen",
        description: "",
        location: "F",
        date: "2025-10-18",
        time: "16:00",
        how: "",
        price: "tba",
        link: "",
        membersOnly: "",
        tags: ["Kultur","HF", "musik"]
    }
])

db.whitelists.insertMany( [
    {
        email: "kk@abo.fi",
    },
    {
        email: "date@abo.fi",
    },
])