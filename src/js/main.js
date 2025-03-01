import ipads from "../data/ipads";
import ipad from "../data/ipads";
import navigations from "../data/navigations";

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
const $searchInput = $searchWrap.querySelector("input");
const $searchDelay = [...$searchWrap.querySelectorAll("li")];

const showSearch = () => {
  $header.classList.add("searching");
  stopScroll();
  $headerMenuList.reverse().forEach(($li, index) => {
    $li.style.transitionDelay = (index * 0.4) / $headerMenuList.length + "s";
  });

  $searchDelay.forEach(($li, index) => {
    $li.style.transitionDelay = (index * 0.4) / $searchDelay.length + "s";
  });
  setTimeout(() => {
    $searchInput.focus();
  }, 600);
};

const hideSearch = () => {
  $header.classList.remove("searching");
  playScroll();
  $headerMenuList.reverse().forEach(($li, index) => {
    $li.style.transitionDelay = (index * 0.4) / $headerMenuList.length + "s";
  });
  $searchDelay.reverse().forEach(($li, index) => {
    $li.style.transitionDelay = (index * 0.4) / $searchDelay.length + "s";
  });
  $searchDelay.reverse();
  $searchInput.value = "";
};

$searchStarter.addEventListener("click", showSearch);

$searchCloser.addEventListener("click", (e) => {
  e.stopPropagation();
  hideSearch();
});
$shadow.addEventListener("click", hideSearch);

const playScroll = () => {
  document.documentElement.classList.remove("fixed");
}

const stopScroll = () => {
  document.documentElement.classList.add("fixed");
}

// 헤더 메뉴 토글
const $menuStarter = document.querySelector('header .menu-starter');
$menuStarter.addEventListener("click", () => {
  if ($header.classList.contains('menuing')) {
    $header.classList.remove('menuing');
    $searchInput.value = "";
    playScroll();
  } else {
    $header.classList.add('menuing');
    stopScroll();
  }
})

// 헤더 검색
const $searchTextField = document.querySelector('header .textfield');
const $searchCancel = document.querySelector('header .search-canceler');
$searchTextField.addEventListener("click", () => {
  $header.classList.add('searching--mobile');
  $searchInput.focus();
})
$searchCancel.addEventListener("click", () => {
  $header.classList.remove('searching--mobile');
})

// 
window.addEventListener("resize", () => {
  if (window.innerWidth <= 740) {
    $header.classList.remove('searching');
  } else {
    $header.classList.remove('searching--mobile');
  }

})

// 요소 가시성 관찰
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("show");
    console.log('watching')
  });
});

const $infos = document.querySelectorAll(".info");
$infos.forEach((el) => {
  io.observe(el);
});

// 비디오 재생
const $video = document.querySelector(".stage video");
const $playBtn = document.querySelector(".stage .controller--play");
const $pauseBtn = document.querySelector(".stage .controller--pause");

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

// 아이템 렌더링
const $items = document.querySelector("section.compare .items");

ipads.forEach((ipad) => {
  const $item = document.createElement("div");
  $item.classList.add("item");

  let colorList = '';
  ipad.colors.forEach((color) => {
    colorList += `<li style="background-color: ${color};"></li>`
  })

  $item.innerHTML = /* html */ `
  <div class="thumbnail">
    <img src="${ipad.thumbnail}" alt = "${ipad.name}" />
  </div>

  <ul class = "colors">
    ${colorList}
  </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class = "tagline">${ipad.tagline}</p>
    <p class = "price">&#8361;${ipad.price.toLocaleString('en-US')}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>


  `;

  $items.append($item);
});

// 푸터 내비게이션 맵 랜더링
const $navigations = document.querySelector('footer .navigations')
navigations.forEach(nav => {
  const map = document.createElement('div')
  map.classList.add('map')

  let mapList = ''
  nav.maps.forEach(map => {
    mapList += /* html */ `<li>
      <a href="${map.url}">${map.name}</a>
    </li>`
  })

  map.innerHTML = /* html */ `
    <h3>
      <span class="text">${nav.title}</span>
      <span class="icon">+</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `

  $navigations.append(map)
})

// 년도 삽입
const $this_year = document.querySelector('span.this-year');
$this_year.textContent = new Date().getFullYear();