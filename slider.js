////////////////////////////////////////////////////////////////////////////////////////////////////
//Carousel Code
////////////////////////////////////////////////////////////////////////////////////////////////////

var currentSlide = 0;
var images = document.getElementsByClassName("slider-holder");
var imageIndex = 1;

for (let index = 0; index < images.length; index++) {
  var dot = document.createElement("div");
  dot.className = "dot";
  document.getElementById("dots_holder").appendChild(dot);
}

const slides = document.querySelectorAll(".slider-holder");
const text = document.querySelectorAll(".hero-text-holder");
const dots = document.querySelectorAll(".dot");

const init = (n) => {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
  slides[n].classList.add("active");

  text.forEach((text) => {
    text.classList.remove("active");
  });
  text[n].classList.add("active");

  dots.forEach((dots) => {
    dots.classList.remove("active");
  });
  dots[n].classList.add("active");
};

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    init(index);
    currentSlide = index;
    timer.stop();
    timer.start();
  });
});

const next = () => {
  currentSlide >= slides.length - 1 ? (currentSlide = 0) : currentSlide++;
  init(currentSlide);

  timer.stop();
  timer.start();
};

const prev = () => {
  currentSlide <= 0 ? (currentSlide = slides.length - 1) : currentSlide--;
  init(currentSlide);

  timer.stop();
  timer.start();
};

function Timer(fn, t) {
  var timerObj = setInterval(fn, t);

  this.stop = function () {
    if (timerObj) {
      clearInterval(timerObj);
      timerObj = null;
    }
    return this;
  };

  // start timer using current settings (if it's not already running)
  this.start = function () {
    if (!timerObj) {
      this.stop();
      timerObj = setInterval(fn, t);
    }
    return this;
  };

  // start with new or original interval, stop current interval
  this.reset = function (newT = t) {
    t = newT;
    return this.stop().start();
  };
}

var timer = new Timer(function () {
  next();
}, 10000);

document.getElementById("next_slide").addEventListener("click", next);
document.getElementById("prev_slide").addEventListener("click", prev);
document.addEventListener("DOMContentLoaded", init(currentSlide));
