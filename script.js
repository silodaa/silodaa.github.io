const travelData = [
    { id: 1, title: 'Milano Games Week 2k24', country: 'Italia', date: '2024-11-23', organizer: 'Marimba', price: '~€60', img: 'img1.jpg', days: '1 giorno', },
    { id: 2, title: 'Ski Weekend 2k24', country: 'Italia', date: '2024-12-10', organizer: 'Foxy & Marimba', price: '€?', img: 'image.jpg', days: '2 giorni', },
    { id: 3, title: 'Milano Games Week 2k25', country: 'Italia', date: '2025-11-23', organizer: 'Marimba', price: '~€60 ', img: 'img1.jpg', days: '1 giorno', },
    { id: 4, title: 'Ski Weekend 2k25', country: 'Italia', date: '2025-12-10', organizer: 'Foxy & Marimba', price: '€?', img: 'image.jpg', days: '2 giorni', },
    { id: 5, title: 'Croatia 2k26', country: 'Croazia', date: '2026-07-01', organizer: 'Marimba', price: '€400', img: 'img5.jpg', days: '10 giorni', },
    { id: 6, title: 'Milano Games Week 2k26', country: 'Italia', date: '2026-11-23', organizer: 'Marimba', price: '~€60', img: 'img1.jpg', days: '1 giorno', },
    { id: 7, title: 'Ski Week', country: 'Italia', date: '2026-12-01', organizer: 'Bebbesi & Marimba', price: '€?', img: 'img7.png', days: '7 giorni', },
    { id: 8, title: 'Japan 2k27', country: 'Giappone', date: '2027-03-25', organizer: 'Marimba', price: '€5000', img: 'img4.jpeg', days: '20 giorni',},
    { id: 9, title: 'Rome Meetup 2k24', country: 'Italia', date: '2024-06-13', organizer: 'Bebbesi', price: '€50', img: 'img9.jpeg', days: '1 giorno', }
];

const renderCards = () => {
    const now = new Date();

    travelData.forEach(travel => {
        const travelDate = new Date(travel.date);
        const diffInMonths = (travelDate.getFullYear() - now.getFullYear()) * 12 + (travelDate.getMonth() - now.getMonth());
        const card = document.createElement('div');
        card.classList.add('travel-card');
        card.innerHTML = `
            <div class="image-container">
                <img src="${travel.img}" class="half-image">
            </div>
            <div class="details">
                <h3> ${travel.title}</h3>
                <p>Paese: ${travel.country}</p>
                <p>Data: ${travel.date}</p>
                <p>Giorni: ${travel.days}</p>
                <p>Organizzatore: ${travel.organizer}</p>
                <p>Tempo rimanente: <span id="time-left${travel.id}">${calculateTimeLeft(travelDate)}</span></p>
                <p class="price">Prezzo: ${travel.price}</p>
            </div>
            <div class="button-container">
                <button class="participate-button"><a href="whatsapp.html">Partecipa!</a></button>
            </div>
        `;

        if (travelDate < now) {
            document.getElementById('travel-cards-terminati').appendChild(card);
        } else if (diffInMonths > 3) {
            document.getElementById('travel-cards-programmati').appendChild(card);
        } else {
            document.getElementById('travel-cards-a-breve').appendChild(card);
        }
    });
};

const calculateTimeLeft = (date) => {
    const now = new Date();
    const difference = date - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    if (difference < 0) {
        return "Scaduto";
    }
    return `${days} giorni, ${hours} ore, ${minutes} minuti`;
};

const updateTimers = () => {
    travelData.forEach(travel => {
        const travelDate = new Date(travel.date);
        const timeLeft = calculateTimeLeft(travelDate);
        const timeLeftElement = document.getElementById(`time-left${travel.id}`);
        if (timeLeftElement) {
            timeLeftElement.textContent = timeLeft;
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    renderCards();
    updateTimers();
    setInterval(() => {
        updateTimers();
        // Riorganizza le card in base alla data
        const cardsAbreve = document.getElementById('travel-cards-a-breve');
        const cardsProgrammati = document.getElementById('travel-cards-programmati');
        const cardsTerminati = document.getElementById('travel-cards-terminati');

        cardsAbreve.innerHTML = '';
        cardsProgrammati.innerHTML = '';
        cardsTerminati.innerHTML = '';

        travelData.forEach(travel => {
            const travelDate = new Date(travel.date);
            const diffInMonths = (travelDate.getFullYear() - new Date().getFullYear()) * 12 + (travelDate.getMonth() - new Date().getMonth());
            const card = createTravelCard(travel);

            if (travelDate < new Date()) {
                cardsTerminati.appendChild(card);
            } else if (diffInMonths > 3) {
                cardsProgrammati.appendChild(card);
            } else {
                cardsAbreve.appendChild(card);
            }
        });
    }, 60000); // Aggiorna ogni minuto
});

const createTravelCard = (travel) => {
    const card = document.createElement('div');
    card.classList.add('travel-card');
    card.innerHTML = `
        <div class="image-container">
            <img src="${travel.img}" class="half-image">
        </div>
        <div class="details">
            <h3> ${travel.title}</h3>
            <p>Paese: ${travel.country}</p>
            <p>Data: ${travel.date}</p>
            <p>Organizzatore: ${travel.organizer}</p>
            <p>Tempo rimanente: <span id="time-left${travel.id}">${calculateTimeLeft(new Date(travel.date))}</span></p>
            <p class="price">Prezzo: ${travel.price}</p>
        </div>
        <div class="button-container">
            <button class="participate-button"><a href="whatsapp.html">Partecipa!</a></button>
        </div>
    `;
    return card;
};
