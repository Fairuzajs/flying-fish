import './index.html';
import './style.scss';
// $('.major__slider-wrapper').slick({
//   speed: 1000,
//   fade: true,
//   cssEase: 'linear',
//   prevArrow: $('.major__prev'),
//   nextArrow: $('.major__next'),
// });

// $('.experts__slider_wrapper').slick({
//   infinite: true,
//   speed: 500,
//   fade: false,
//   cssEase: 'linear',
//   slidesToShow:4,
//   centerMode:false,
//   slidesToScroll:1,
//   variableWidth: true,
//   prevArrow: $('.experts__prev'),
//   nextArrow: $('.experts__next'),
// });
// $('.idea__slider_wrapper').slick({
//   infinite: true,
//   speed: 500,
//   fade: false,
//   cssEase: 'linear',
//   slidesToShow:1,
//   centerMode:false,
//   slidesToScroll:1,
//   variableWidth: true,
//   prevArrow: $('.idea__prev'),
//   nextArrow: $('.idea__next'),
// });
// $('.news__slider_wrapper').slick({
//   infinite: true,
//   speed: 500,
//   fade: false,
//   cssEase: 'linear',
//   slidesToShow:3,
//   centerMode:false,
//   slidesToScroll:1,
//   variableWidth: true,
//   prevArrow: $('.news__prev'),
//   nextArrow: $('.news__next'),
// });

// $('.support__stategic__wrapper').slick({
//  infinite: true,
//   speed: 8000,
//   fade: false,
//   cssEase: 'linear',
//   slidesToShow:1,
//   centerMode:false,
//   slidesToScroll:1,
//   variableWidth: true,
//   arrows:false,
//   autoplay: true,
//   autoplaySpeed: 0,
//   responsive: [
//     {
//       breakpoint: 801,
//       settings: { 
//         rows: 2,
//         infinite: true,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//       }
//     }
// ]
// });
// $('.support__info_wrapper').slick({
//   infinite: true,
//   speed: 8000,
//   fade: false,
//   cssEase: 'linear',
//   slidesToShow:1,
//   centerMode:false,
//   slidesToScroll:1,
//   variableWidth: true,
//   arrows:false,
//   autoplay: true,
//   autoplaySpeed: 0,
//   rtl:true,
//   responsive: [
//     {
//       breakpoint: 801,
//       settings: { 
//         rows: 2,
//         infinite: true,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//       }
//     }
// ]
// });

// $('.header__burger').click(function(){
//   $(this).toggleClass('active');
//   $('.header__nav').toggleClass('active');
// })


export function menu() {
    const burger = document.querySelector("[data-burger]"),
      menu = document.querySelector("[data-menu]");
    let activePoint;
  
    try {
      if (burger) {
        burger.setAttribute("role", "button");
        ariaClosed(burger, "меню");
  
        burger.onclick = (e) => {
          e.stopPropagation();
          burger.classList.toggle("active");
  
          if (burger.classList.contains("active")) {
            ariaOpened(burger, "меню");
          } else {
            ariaClosed(burger, "меню");
          }
  
          if (menu) {
            menu.classList.toggle("active");
            document.body.classList.toggle("lock");
            document.body.style.overflow = document.body.style.overflow != "hidden" ? "hidden" : "";
          }
        };
      } else {
        throw new Error("Элемента с атрибутом data-burger не существует!");
      }
  
      if (menu) {
        const items = menu.querySelectorAll("[data-menu-item]"),
          itemsLength = items.length;
  
        if (burger) {
          if (!menu.id) {
            burger.setAttribute("aria-controls", "menu");
            menu.id = "menu";
          } else {
            burger.setAttribute("aria-controls", menu.id);
          }
  
          if (!menu.classList.length) {
            menu.classList.add(menu.id);
          }
        } else {
          throw new Error("Элемента с атрибутом data-burger не существует!");
        }
  
        if (itemsLength) {
          menu.onclick = (e) => {
            const point = e.target.closest("[data-menu-item]"),
              link = e.target.closest('a[href^="#"]:not(a[href="#"])');
  
            if (link) {
              e.stopPropagation();
              e.preventDefault();
              const id = link.getAttribute("href").substring(1),
                scrollBlock = document.getElementById(id);
  
              if (scrollBlock) {
                scrollBlock.scrollIntoView({behavior: "smooth"});
              }
            }
  
            if (point) {
              if (point != activePoint) {
                if (activePoint) {
                  activePoint.classList.remove("active");
                }
  
                point.classList.add("active");
                activePoint = point;
              }
  
              if (menu.classList.contains("active")) {
                burger.click();
              }
            }
          };
        } else {
          console.error("Добавьте элементам меню атрибут data-menu-item!");
        }
      } else {
        console.error("Добавьте блоку с меню атрибут data-menu!");
      }
  
      const burgerMedia = window.matchMedia("(min-width: 922px)");
      burgerMedia.onchange = burgerMediaChange;
      burgerMediaChange(burgerMedia);
  
      function burgerMediaChange(e) {
        if (burger.classList.contains("active") && menu.classList.contains("active") && e.matches) {
          burger.click();
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
  
  function ariaOpened(element, string) {
    element.setAttribute("aria-expanded", "true");
    element.setAttribute("aria-label", "Закрыть " + string);
  }
  
  function ariaClosed(element, string) {
    element.setAttribute("aria-expanded", "false");
    element.setAttribute("aria-label", "Открыть " + string);
  }
  

  menu();


//   // маска для телефона
// import $ from "jquery";
// import "./js/jquery.maskedinput";

// export default function validateForm() {
//     $(".tel-input").mask("+7(999)999-99-99");
// }
