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
