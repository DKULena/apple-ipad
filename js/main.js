const $basketStarter = document.querySelector('header .basket-starter');
const $basket = $basketStarter.querySelector('.basket');

const showBasket = () => {
    $basket.classList.add('show');
}

const hideBasket = () => {
    $basket.classList.remove('show');
}

$basketStarter.addEventListener("click", (event) => {
    event.stopPropagation();
    $basket.classList.contains('show') ? hideBasket() : showBasket()
})

$basket.addEventListener("click", (event) => {
    event.stopPropagation();
})

window.addEventListener("click", () => {
    hideBasket();
});