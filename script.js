
var firebaseConfig = {
    apiKey: "AIzaSyD1Ji7REPKpoLwak2zH5ytDl4EpTWqgc34",
    authDomain: "bearfound-ebae0.firebaseapp.com",
    databaseURL: "https://bearfound-ebae0.firebaseio.com",
    projectId: "bearfound-ebae0",
    storageBucket: "bearfound-ebae0.appspot.com",
    messagingSenderId: "359869576279",
    appId: "1:359869576279:web:cf0dd73da94af8790cdf12",
    measurementId: "G-0Q5LLSSFBN"
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

db.collection('lost').onSnapshot((querySnap) => {
    querySnap.forEach((doc) => {
        console.log('doc inside');
        console.log(JSON.stringify(doc.data()));
        addItem(doc.data(), "lost");
    })
})


db.collection("objects").get().then((querySnap) => {
    querySnap.forEach((doc) => {
        let docID = doc.id;
        let data = JSON.stringify(doc.data())
        console.log(doc.data().date);
        let date = doc.data().date;
        console.log(date.toDate());
        console.log(data);

        addItem(doc.data(), "found");
    })
})

document.getElementById("download-btn").onclick = function () {
    location.href = 'https://apps.apple.com/us/app/bearfound/id1503739627';
};



function addItem(item, type) {
    let title = item.name;
    let location = item.location;
    let category = item.category;
    let desc = item.detail;
    let date = item.date.toDate().toDateString(); //Source: https://www.w3schools.com/jsref/jsref_todatestring.asp
    let time = item.date.toDate().toLocaleTimeString([], { timeStyle: 'short' }); //Get time without seconds. Source: https://stackoverflow.com/questions/17913681/how-do-i-use-tolocaletimestring-without-displaying-seconds

    let d = document;

    let con = (type === 'lost' ? d.getElementById("lost-container") : d.getElementById("found-container"));

    let col = d.createElement("div");
    col.classList = "col";

    let card = d.createElement("div");
    card.classList = "card mb-3";

    let cardBody = d.createElement("div");
    cardBody.classList = "card-body";

    let cardTitle = d.createElement("h5");
    cardTitle.classList = "card-title"
    cardTitle.appendChild(d.createTextNode(title));

    let cardText = d.createElement("p");
    cardText.classList = "card-text";
    let spD = d.createElement("span");
    spD.appendChild(d.createTextNode("Description: "));
    cardText.appendChild(spD);
    cardText.appendChild(d.createTextNode(desc));

    let cat = d.createElement("p");
    cat.classList = "card-text";
    let spC = d.createElement("span");
    spC.appendChild(d.createTextNode("Category: "));
    cat.appendChild(spC);
    cat.appendChild(d.createTextNode(category));

    let loc = d.createElement("p");
    loc.classList = "card-text";
    let sp = d.createElement("span");
    sp.appendChild(d.createTextNode("Location: "));
    loc.appendChild(sp);
    loc.appendChild(d.createTextNode(location));

    let dateEl = d.createElement("p");
    dateEl.classList = "card-text";
    let sm = d.createElement("small");
    sm.classList = "text-muted";
    let spd = d.createElement("span");
    spd.appendChild(d.createTextNode("Date posted: "));
    sm.appendChild(spd);
    sm.appendChild(d.createTextNode(date));

    let timeEl = d.createElement("small");
    timeEl.classList = "text-muted";
    let spt = d.createElement("span");
    spt.appendChild(d.createTextNode("Time posted: "));
    timeEl.appendChild(spt);
    timeEl.appendChild(d.createTextNode(time));

    dateEl.appendChild(sm);
    dateEl.appendChild(d.createElement("br"));
    dateEl.appendChild(timeEl);

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cat);
    cardBody.appendChild(loc);
    cardBody.appendChild(dateEl);
    card.appendChild(cardBody);
    col.appendChild(card);
    con.appendChild(col);
}
