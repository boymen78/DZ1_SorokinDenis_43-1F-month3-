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

const fetchConversionRates = async () => {
    try {
        const response = await fetch("../data/converter.json", {
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching conversion rates:", error);
        return null;
    }
};

const converter = (element, targetElement1, targetElement2) => {
    element.oninput = async () => {
        const data = await fetchConversionRates();
        if (!data) {
            targetElement1.value = "";
            targetElement2.value = "";
            return;
        }

        try {
            const value = parseFloat(element.value);

            if (isNaN(value)) {
                targetElement1.value = "";
                targetElement2.value = "";
                return;
            }

            if (element.id === "som") {
                targetElement1.value = (value / data.usd).toFixed(2);
                targetElement2.value = (value / data.eur).toFixed(2);
            }

            if (element.id === "usd") {
                targetElement1.value = (value * data.usd).toFixed(2);
                targetElement2.value = ((value * data.usd) / data.eur).toFixed(2);
            }

            if (element.id === "eur") {
                targetElement1.value = (value * data.eur).toFixed(2);
                targetElement2.value = ((value * data.eur) / data.usd).toFixed(2);
            }
        } catch (error) {
            console.error("Error during conversion:", error);
            targetElement1.value = "";
            targetElement2.value = "";
        }
    };
};

converter(somInput, usdInput, eurInput);
converter(usdInput, somInput, eurInput);
converter(eurInput, somInput, usdInput);
