// TAB SLIDER

const tabContentBlocks = document.querySelectorAll('.tab_content_block');
const tabs = document.querySelectorAll('.tab_content_item');
const tabsParent = document.querySelector('.tab_content_items');

const hideContent = () => {
    tabContentBlocks.forEach( block => {
        block.style.display = 'none'
    })
    tabs.forEach((tab)=> {
        tab.classList.remove('tab_content_item_active')

    })
}

const showTabContent = (id = 0) => {
    tabContentBlocks[id].style.display = 'block'
    tabs[id].classList.add('tab_content_item_active')
}

hideContent()
showTabContent()

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabs.forEach((tab, tabIndex)=> {
            if (event.target === tab) {
                hideContent()
                showTabContent(tabIndex)
            }
        })
    }
}

let currentIndex = 0;

const autoSlide = () => {
    hideContent();
    showTabContent(currentIndex);
    currentIndex = (currentIndex + 1) % tabs.length;
};

setInterval(autoSlide, 3000);

// CONVERTER

const usdInput = document.querySelector("#usd");
const somInput = document.querySelector("#som");
const eurInput = document.querySelector("#eur");

const converter = (element, targetElement1, targetElement2) => {
    element.oninput = () => {
        const request = new XMLHttpRequest();
        request.open("GET", "../data/converter.json");
        request.setRequestHeader("Content-type", "application/json");
        request.send();

        request.onload = () => {
            const data = JSON.parse(request.response);

            if (element.id === "som") {
                targetElement1.value = (element.value / data.usd).toFixed(2);
                targetElement2.value = (element.value / data.eur).toFixed(2);
            }

            if (element.id === "usd") {
                targetElement1.value = (element.value * data.usd).toFixed(2);
                targetElement2.value = ((element.value * data.usd) / data.eur).toFixed(
                    2
                );
            }

            if (element.id === "eur") {
                targetElement1.value = (element.value * data.eur).toFixed(2);
                targetElement2.value = ((element.value * data.eur) / data.usd).toFixed(
                    2
                );
            }

            if (element.value === "") {
                targetElement1.value = "";
                targetElement2.value = "";
            }
        };
    };
};

converter(somInput, usdInput, eurInput);
converter(usdInput, somInput, eurInput);
converter(eurInput, somInput, usdInput);

// CARD SWiTСHER

const nextButton = document.querySelector("#btn-next");
const prevButton = document.querySelector("#btn-prev");
const cardBlock = document.querySelector(".card");
let cardIndex = 1;

const fetchCardData = (index) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${index}`)
        .then((response) => response.json())
        .then((data) => {
            cardBlock.innerHTML = `
                <p>${data.title}</p>
                <p>${data.completed}</p>
                <span>${data.id}</span>
            `;
        })
};

fetchCardData(cardIndex);

nextButton.onclick = () => {
    cardIndex = cardIndex < 200 ? cardIndex + 1 : 1;
    fetchCardData(cardIndex);
};

prevButton.onclick = () => {
    cardIndex = cardIndex > 1 ? cardIndex - 1 : 200;
    fetchCardData(cardIndex);
};

fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((data) => console.log(data))
