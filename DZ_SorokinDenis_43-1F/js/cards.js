// Функция для создания карточки
function createCard(title, body) {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = 'https://images.techinsider.ru/upload/img_cache/999/99958e030ba3e8ac9893730337be10bc_cropped_666x444.jpg';
    img.alt = 'Card Image';

    const cardTitle = document.createElement('h3');
    cardTitle.textContent = title;

    const cardInfo = document.createElement('div');
    cardInfo.classList.add('info');

    const cardBody = document.createElement('p');
    cardBody.textContent = body;
    cardInfo.appendChild(cardBody);

    card.appendChild(img);
    card.appendChild(cardTitle);
    card.appendChild(cardInfo);

    return card;
}

async function loadCards() {
    const cardsContainer = document.getElementById('cards-container');

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();

        const posts = data.slice(0, 8);

        posts.forEach(post => {
            const card = createCard(post.title, post.body);
            cardsContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading data:', error);
        alert('Произошла ошибка при загрузке данных');
    }
}

window.onload = loadCards;
