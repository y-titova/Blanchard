/*меню*/

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".menu__btn").forEach(item => {
    item.addEventListener("click", function () {
      let menuBtn = this;
      let menuOpen = this.parentElement.querySelector(".menu__disclosure");
      let links = this.parentElement.querySelectorAll(".menu__disclosure-link");

      document.querySelectorAll(".menu__disclosure").forEach(el => {
        if (el != menuOpen) {
          el.classList.remove("menu__disclosure--active");
        }
      })

      document.querySelectorAll(".menu__btn").forEach(el => {
        if (el != menuBtn) {
          el.classList.remove("menu__btn--active");
          menuBtn.setAttribute("aria-label", "Список развёрнут");
        }
      })

      menuOpen.classList.toggle("menu__disclosure--active");
      menuBtn.classList.toggle("menu__btn--active");

      links.forEach(function (elem) {
        elem.addEventListener('click', function () {
          menuOpen.classList.remove('menu__disclosure--active');
        });
      })

      menuBtn.forEach(function (elem) {
        elem.addEventListener('click', function () {
          menuBtn.classList.remove('menu__btn--active');
        });
      })
    })
  })

  document.addEventListener("click", function (e) {
    let target = e.target;
    if (!target.closest(".menu")) {
      document.querySelectorAll(".menu__disclosure").forEach(el => {
        el.classList.remove("menu__disclosure--active");
      });
    }
  })
});

/*селект*/

const element = document.querySelector("#filter-sel");
const choices = new Choices(element, {
  searchEnabled: false,
  shouldSort: false,
});


/*свайпер галерея*/

const swiper = new Swiper('.interactive__swiper', {
  slidesPerView: 3,
  slidesPerGroup: 3,
  spaceBetween: 50,
  speed: 500,
  loop: false,


  navigation: {
    nextEl: '.interactive__button-next',
    prevEl: '.interactive__button-prev',
    clickable: true
  },

  a11y: {
    prevSlideMessage: 'Предыдущий слайд',
    nextSlideMessage: 'Следующий слайд',
  },

  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
    clickable: true,
  },

  breakpoints: {
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 20
    },
    576: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 34
    },
    1200: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 50
    }
  }
});

/*свайпер события*/

const eventsSwiper = new Swiper('.events__swiper', {
  slidesPerView: 3,
  slidesPerGroup: 3,
  spaceBetween: 50,
  speed: 500,
  loop: false,


  navigation: {
    nextEl: '.events__button-next',
    prevEl: '.events__button-prev',
  },

  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },

  a11y: {
    prevSlideMessage: 'Предыдущий слайд',
    nextSlideMessage: 'Следующий слайд',
  },

  breakpoints: {
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 20
    },
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 34
    },
    922: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 27
    },
    1200: {
      spaceBetween: 50
    },
  }
});

/*аккордеон*/

$('.accordion').accordion({
  heightStyle: 'content',
  collapsible: true,
  active: 0,
  icons: false,
});

/*табы*/

document.querySelectorAll('.sorter__creators-btn').forEach(function (tabsBtn) {
  tabsBtn.addEventListener('click', function (e) {
    const path = e.currentTarget.dataset.path;

    document.querySelectorAll('.sorter__creators-btn').forEach(function (btn) {
      btn.classList.remove('sorter__creators-btn--active')
    });
    e.currentTarget.classList.add('sorter-creators-btn--active');

    document.querySelectorAll('.creator').forEach(function (tabsBtn) {
      tabsBtn.classList.remove('creator--active')
    });

    document.querySelector(`[data-target="${path}"]`).classList.add('creator--active');
  });
});

/*тултипы*/

tippy('[data-tippy-content]', {
  maxWidth: 264,
});

/*свайпер партнеры*/

const partnersSwiper = new Swiper('.partners', {
  slidesPerView: 3,
  slidesPerGroup: 3,
  spaceBetween: 50,
  speed: 500,
  loop: true,

  navigation: {
    nextEl: '.partners__button-next',
    prevEl: '.partners__button-prev',
  },

  a11y: {
    prevSlideMessage: 'Предыдущий слайд',
    nextSlideMessage: 'Следующий слайд',
  },

  breakpoints: {
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 20,
    },
    576: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 34,
    },
    769: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 50,
    },
    1200: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    }
  }
});


/*карта*/

ymaps.ready(init);
function init() {
  var contactsMap = new ymaps.Map("contacts-map", {
    center: [55.75846806898367, 37.60108849999989],
    zoom:
      15,
    controls: []
  });

  var geolocationControl = new ymaps.control.GeolocationControl({
    options: {
      position: {
        right: '16px', top: '353px',
      }
    }
  });

  const mediaQuery = window.matchMedia('(min-width: 1200px)')
  if (mediaQuery.matches) {
    contactsMap.controls.add(geolocationControl);
  }

  ZoomLayout =
    ymaps.templateLayoutFactory.createClass("<div class='zoom-wrapper'>" +
      "<div id='zoom-in' class='zoom-btn'><i class='icon-plus'></i></div><br>" +
      "<div id='zoom-out' class='zoom-btn'><i class='icon-minus'></i></div>" +
      "</div>", {
      build: function () {
        ZoomLayout.superclass.build.call(this);
        this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
        this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);
        $('#zoom-in').bind('click', this.zoomInCallback);
        $('#zoom-out').bind('click', this.zoomOutCallback);
      },

      clear: function () {
        $('#zoom-in').unbind('click', this.zoomInCallback);
        $('#zoom-out').unbind('click', this.zoomOutCallback);
        ZoomLayout.superclass.clear.call(this);
      },

      zoomIn: function () {
        var map = this.getData().control.getMap();
        this.events.fire('zoomchange', {
          oldZoom: map.getZoom(),
          newZoom: map.getZoom() + 1
        });
      },

      zoomOut: function () {
        var map = this.getData().control.getMap();
        this.events.fire('zoomchange', {
          oldZoom: map.getZoom(),
          newZoom: map.getZoom() - 1
        });
      }
    }),
    zoomControl = new ymaps.control.ZoomControl({ options: { layout: ZoomLayout, position: { right: '14px', top: '262px' }, }, });

  contactsMap.controls.add(zoomControl);

  var myPlacemark = new ymaps.Placemark([55.75846806898367, 37.60108849999989], {}, {
    iconLayout: 'default#image',
    iconImageHref: './img/map.svg',
    iconImageSize: [20, 20],
    iconImageOffset: [-10, -13]
  });

  contactsMap.behaviors.disable('scrollZoom');
  contactsMap.geoObjects.add(myPlacemark);
}

/*форма*/

const validator = new JustValidate('.contacts__form', {
  errorLabelStyle: {
    color: '#d11616',
  },
}
);

validator
  .addField('#name', [
    {
      rule: 'required',
      errorMessage: 'Обязательное поле',
    },
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'Введите от 2 до 30 символов',
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: 'Введите от 2 до 30 символов'
    },
    {
      rule: 'customRegexp',
      value: '^[а-яА-ЯёЁ -]+$',
      errorMessage: 'Введите имя на кириллице'
    },
  ])
  .addField('#tel', [
    {
      rule: 'required',
      errorMessage: 'Обязательное поле'
    },
    {
      rule: 'number',
      errorMessage: 'Введите номер'
    },
    {
      rule: 'minLength',
      value: 10,
      errorMessage: 'Введите 10 цифр',
    },
    {
      rule: 'maxLength',
      value: 10,
      errorMessage: 'Введите 10 цифр',
    }
  ])

  .onSuccess((event) => {

    let formData = new FormData(event.target);

    console.log(...formData);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log('Отправлено');
        }
      }
    }

    xhr.open('POST', 'mail.php', true);
    xhr.send(formData);

    event.target.reset();
  });





  /*скролл*/

var $page = $('html, body');
$('a[href*="#"]').click(function () {
  $page.animate({
    scrollTop: $($.attr(this, 'href')).offset().top
  }, 400);
  return false;
});

/*бургер*/

let burger = document.querySelector(".burger");
let menu = document.querySelector(".header__modal-wrapper");
let menuLinks = document.querySelectorAll(".nav__link");
let login = document.querySelector(".header__btn");

burger.addEventListener("click",

  function () {
    burger.classList.toggle("burger--active");
    menu.classList.toggle("header__modal-wrapper--active");
    document.body.classList.toggle("stop-scroll");
  });

menuLinks.forEach(function (el) {
  el.addEventListener('click', function () {
    burger.classList.remove('burger--active');
    menu.classList.remove('header__modal-wrapper--active');
    document.body.classList.remove('stop-scroll');
  });
});

login.addEventListener('click', function () {
  burger.classList.remove('burger--active');
  menu.classList.remove('header__modal-wrapper--active');
  document.body.classList.remove('stop-scroll');
});

/*форма отправки*/
let search = document.querySelector(".header__search-btn-copy");
let form = document.querySelector(".header__form");
let closeForm = document.querySelector(".search__close");

search.addEventListener('click', () => {
  form.classList.add('header__form--active');
  search.classList.add('header__search-btn--active');
});

closeForm.addEventListener('click', () => {
  form.classList.remove('header__form--active');
  search.classList.remove('header__search-btn--active');
});


/*скролл к художникам*/
const mobile = window.matchMedia('(max-width: 768px)')
  if (mobile.matches) {
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".sorter__creators-btn").forEach(scrollItem => {
    scrollItem.addEventListener("click", function () {
      const scrollPath = document.querySelector('.catalog__creator.creator--active');
      scrollPath.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
      })
    })
  })
  }


  const modal = new GraphModal();
