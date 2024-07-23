import './index.html';
import './style.scss';


$('.video-slider').slick({
  infinite: true,
  speed: 1200,
  fade: false,
  cssEase: 'linear',
  slidesToShow:3,
  slidesToScroll:1,
  variableWidth: true,
  autoplay: true,
  centerMode: true,
  arrows: false,
  dots: true,
  dotsClass: 'slick-dots',
});


// мобильное меню

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


// модалка

export class Modal {
	constructor(options) {
		let defaultOptions = {
			isOpen: () => {},
			isClose: () => {},
		};
		this.options = Object.assign(defaultOptions, options);
		this.modal = document.querySelector(".modal");
		this.speed = false;
		this.animation = false;
		this.isOpen = false;
		this.modalContainer = false;
		this.previousActiveElement = false;
		this.fixBlocks = document.querySelectorAll(".fix-block");
		
		this.events();
	}

	events() {
		if (this.modal) {
			document.addEventListener(
				"click",
				function(e) {
					const clickedElement = e.target.closest("[data-path]");
					if (clickedElement) {
						let target = clickedElement.dataset.path;
						let animation = clickedElement.dataset.animation;
						let speed = clickedElement.dataset.speed;
						this.animation = animation ? animation : "fadeInUp";
						this.speed = speed ? parseInt(speed) : 300;
						this.modalContainer = document.querySelector(`[data-target="${target}"]`);
						this.open();
						return;
					}

					if (e.target.closest(".close")) {
						this.close();
						return;
					}
				}.bind(this)
			);

			window.addEventListener(
				"keydown",
				function(e) {
					if (e.keyCode == 27) {
						if (this.isOpen) {
							this.close();
						}
					}

					if (e.keyCode == 9 && this.isOpen) {
						this.focusCatch(e);
						return;
					}
				}.bind(this)
			);

			this.modal.addEventListener(
				"click",
				function(e) {
					if (!e.target.classList.contains("modal__container") && !e.target.closest(".modal__container") && this.isOpen) {
						this.close();
					}
				}.bind(this)
			);
		}
	}

	open() {
		this.previousActiveElement = document.activeElement;

		this.modal.style.setProperty("--transition-time", `${this.speed / 1000}s`);
		this.modal.classList.add("is-open");
		this.disableScroll();

		this.modalContainer.classList.add("modal-open");
		this.modalContainer.classList.add(this.animation);

		setTimeout(() => {
			this.options.isOpen(this);
			this.modalContainer.classList.add("animate-open");
			this.isOpen = true;
			// this.focusTrap();
		}, this.speed);
	}

	close() {
		if (this.modalContainer) {
			this.modalContainer.classList.remove("animate-open");
			this.modalContainer.classList.remove(this.animation);
			this.modal.classList.remove("is-open");
			this.modalContainer.classList.remove("modal-open");

			this.enableScroll();
			this.options.isClose(this);
			this.isOpen = false;
			// this.focusTrap();
		}
	}

	// focusCatch(e) {
	// 	const focusable = this.modalContainer.querySelectorAll(this.focusElements);
	// 	const focusArray = Array.prototype.slice.call(focusable);
	// 	const focusedIndex = focusArray.indexOf(document.activeElement);

	// 	if (e.shiftKey && focusedIndex === 0) {
	// 		focusArray[focusArray.length - 1].focus();
	// 		e.preventDefault();
	// 	}

	// 	if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
	// 		focusArray[0].focus();
	// 		e.preventDefault();
	// 	}
	// }

	// focusTrap() {
	// 	const focusable = this.modalContainer.querySelectorAll(this.focusElements);
	// 	if (this.isOpen) {
	// 		focusable[0].focus();
	// 	} else {
	// 		this.previousActiveElement.focus();
	// 	}
	// }

	disableScroll() {
		let pagePosition = window.scrollY;
		this.lockPadding();
		document.body.classList.add("disable-scroll");
		document.body.dataset.position = pagePosition;
		document.body.style.top = -pagePosition + "px";
	}

	enableScroll() {
		let pagePosition = parseInt(document.body.dataset.position, 10);
		this.unlockPadding();
		document.body.style.top = "auto";
		document.body.classList.remove("disable-scroll");
		window.scroll({top: pagePosition, left: 0});
		document.body.removeAttribute("data-position");
	}

	lockPadding() {
		let paddingOffset = window.innerWidth - document.body.offsetWidth + "px";
		this.fixBlocks.forEach((el) => {
			el.style.paddingRight = paddingOffset;
		});
		document.body.style.paddingRight = paddingOffset;
	}

	unlockPadding() {
		this.fixBlocks.forEach((el) => {
			el.style.paddingRight = "0px";
		});
		document.body.style.paddingRight = "0px";
	}
}

export const modal = new Modal({});

// логика для видео 
const btnOk = document.querySelector('.btn-play');
const wrapperVideo = document.getElementById('fon');

btnOk.addEventListener('click',function(){
  wrapperVideo.play();
});