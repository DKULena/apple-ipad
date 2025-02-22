// 장바구니
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

// 검색
const $header = document.querySelector('header');
const $searchWrap = $header.querySelector('.search-wrap');
const $searchStarter = $header.querySelector('.search-starter');
const $searchCloser = $searchWrap.querySelector('.search-closer');
const $shadow = $searchWrap.querySelector('.shadow');

const showSearch = () => {
    $header.classList.add('searching');
    document.documentElement.classList.add('fixed');
}

const hideSearch = () => {
    $header.classList.remove('searching');
    document.documentElement.classList.remove('fixed');
}

$searchStarter.addEventListener("click", showSearch);

$searchCloser.addEventListener("click", hideSearch);
$shadow.addEventListener("click", hideSearch);