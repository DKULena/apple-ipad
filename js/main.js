// 장바구니
const $basketStarter = document.querySelector("header .basket-starter");
const $basket = $basketStarter.querySelector(".basket");

const showBasket = () => {
  $basket.classList.add("show");
};

const hideBasket = () => {
  $basket.classList.remove("show");
};

$basketStarter.addEventListener("click", (event) => {
  event.stopPropagation();
  $basket.classList.contains("show") ? hideBasket() : showBasket();
});

$basket.addEventListener("click", (event) => {
  event.stopPropagation();
});

window.addEventListener("click", () => {
  hideBasket();
});

// 검색
const $header = document.querySelector("header");
const $headerMenuList = [...$header.querySelectorAll("ul.menu > li")];
const $searchWrap = $header.querySelector(".search-wrap");
const $searchStarter = $header.querySelector(".search-starter");
const $searchCloser = $searchWrap.querySelector(".search-closer");
const $shadow = $searchWrap.querySelector(".shadow");
const $searchInput = $searchWrap.querySelector('input');
const $searchDelay = [...$searchWrap.querySelectorAll("li")];


const showSearch = () => {
  $header.classList.add("searching");
  document.documentElement.classList.add("fixed");
  $headerMenuList.reverse().forEach(($li, index) => {
    $li.style.transitionDelay = (index * 0.4) / $headerMenuList.length + "s";
  });

  $searchDelay.forEach(($li, index) => {
    $li.style.transitionDelay = (index * 0.4) / $searchDelay.length + "s";
  });
    setTimeout(() => {
        $searchInput.focus();
    }, 600)
};

const hideSearch = () => {
  $header.classList.remove("searching");
  document.documentElement.classList.remove("fixed");
  $headerMenuList.reverse().forEach(($li, index) => {
    $li.style.transitionDelay = (index * 0.4) / $headerMenuList.length + "s";
  });
  $searchDelay.reverse().forEach(($li, index) => {
    $li.style.transitionDelay = (index * 0.4) / $searchDelay.length + "s";
  });
    $searchDelay.reverse();
    $searchInput.value = '';
};

$searchStarter.addEventListener("click", showSearch);

$searchCloser.addEventListener("click", hideSearch);
$shadow.addEventListener("click", hideSearch);


// 요소 가시성 관찰
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting)
      return;
    entry.target.classList.add('show');
  })
})

const $infos = document.querySelectorAll('.info');
$infos.forEach((el) => {
  io.observe(el);
})

// 비디오 재생
const $video = document.querySelector('.stage video');
const $playBtn = document.querySelector('.stage .controller--play');
const $pauseBtn = document.querySelector('.stage .controller--pause');

$playBtn.addEventListener("click", () => {
  $video.play();
  $playBtn.classList.add("hide");
  $pauseBtn.classList.remove("hide");
});
$pauseBtn.addEventListener("click", () => {
  $video.pause();
  $playBtn.classList.remove("hide");
  $pauseBtn.classList.add("hide");
});