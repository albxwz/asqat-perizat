
    const URL_APP = "https://script.google.com/macros/s/AKfycbzyxxcgw0qhx9WPUldmj-erBGuQhjSEnUngWMQ6ajuyMbTj_95r9X2kuh7A62oe5EXF/exec";

const form = document.querySelector("#form");

form.action = URL_APP;

function isFilled(details) {
  const {name, message } = details;
  if (!name || !message) return false;
  return true;
}

form.addEventListener("submit", async (ev) => {
  ev.preventDefault();

  const name = document.querySelector("[name=name]:checked");
  const message = document.querySelector("[name=message]");

  let details = {
    name: name ? name.value : '',
    message: message.value.trim(),
  };


  let formBody = [];
  for (let property in details) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

 name.value = '';
  message.value = '';
  alert('Жауабыңызға рахмет!');

  // Деректерді серверге жіберу
  fetch(URL_APP, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    mode: "no-cors",
    body: formBody,
  }).catch((err) => {
    console.error('Error:', err);
    alert("Ошибка!");
  }).finally(() => {
    submitButton.disabled = false; // Жіберу батырмасын қайта қосу
  });
});







document.addEventListener('DOMContentLoaded', function() {
    const musicButton = document.getElementById('musicButton');
    const music = document.getElementById('music');
    const buttonIcon = document.getElementById('buttonIcon');

    let isPlaying = false;

    musicButton.addEventListener('click', function() {
        if (isPlaying) {
            music.pause();
            buttonIcon.src = 'uiluil.png';
        } else {
            music.play();
            buttonIcon.src = 'u,luilui.png';
        }
        isPlaying = !isPlaying;
    });

    music.addEventListener('ended', function() {
        buttonIcon.src = 'play-icon.png';
        isPlaying = false;
    });
});








       "use strict";

var Sakura = function Sakura(selector, options) {
  var _this = this;

  if (typeof selector === 'undefined') {
    throw new Error('No selector present. Define an element.');
  }

  this.el = document.querySelector(selector); // Defaults for the option object, which gets extended below.

  var defaults = {
    className: 'sakura',
    // Classname of the petal. This corresponds with the css.
    fallSpeed: 1,
    // Speed factor in which the petal falls (higher is slower).
    maxSize: 14,
    // The maximum size of the petal.
    minSize: 10,
    // The minimum size of the petal.
    delay: 300,
    // Delay between petals.
    colors: [{
      // You can add multiple colors (chosen randomly) by adding elements to the array.
      gradientColorStart: 'rgba(255, 183, 197, 0.9)',
      // Gradient color start (rgba).
      gradientColorEnd: 'rgba(255, 197, 208, 0.9)',
      // Gradient color end (rgba).
      gradientColorDegree: 120 // Gradient degree angle.

    }]
  }; // Merge defaults with user options.

  var extend = function extend(originalObj, newObj) {
    Object.keys(originalObj).forEach(function (key) {
      if (newObj && Object.prototype.hasOwnProperty.call(newObj, key)) {
        var origin = originalObj;
        origin[key] = newObj[key];
      }
    });
    return originalObj;
  };

  this.settings = extend(defaults, options); // Hide horizontal scrollbars on the target element.

  this.el.style.overflowX = 'hidden'; // Random array element

  function randomArrayElem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  } // Random integer


  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } // Check for animation events.


  var prefixes = ['webkit', 'moz', 'MS', 'o', ''];

  function PrefixedEvent(element, type, callback) {
    for (var p = 0; p < prefixes.length; p += 1) {
      var animType = type;

      if (!prefixes[p]) {
        animType = type.toLowerCase();
      }

      element.addEventListener(prefixes[p] + animType, callback, false);
    }
  } // Check if the element is in the viewport.


  function elementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
  }

  this.createPetal = function () {
    if (_this.el.dataset.sakuraAnimId) {
      setTimeout(function () {
        window.requestAnimationFrame(_this.createPetal);
      }, _this.settings.delay);
    } // Name the animations. These have to match the animations in the CSS file.


    var animationNames = {
      blowAnimations: ['blow-soft-left', 'blow-medium-left', 'blow-soft-right', 'blow-medium-right'],
      swayAnimations: ['sway-0', 'sway-1', 'sway-2', 'sway-3', 'sway-4', 'sway-5', 'sway-6', 'sway-7', 'sway-8']
    }; // Get one random animation of each type and randomize fall time of the petals

    var blowAnimation = randomArrayElem(animationNames.blowAnimations);
    var swayAnimation = randomArrayElem(animationNames.swayAnimations);

    var fallTime = (document.documentElement.clientHeight * 0.007 + Math.round(Math.random() * 5)) * _this.settings.fallSpeed; // Create animations



    var animationsArr = ["fall ".concat(fallTime, "s linear 0s 1"), "".concat(blowAnimation, " ").concat((fallTime > 30 ? fallTime : 30) - 20 + randomInt(0, 20), "s linear 0s infinite"), "".concat(swayAnimation, " ").concat(randomInt(2, 4), "s linear 0s infinite")];
    var animations = animationsArr.join(', '); // Create petal and give it a random size.

    var petal = document.createElement('div');
    petal.classList.add(_this.settings.className);
    var height = randomInt(_this.settings.minSize, _this.settings.maxSize);
    var width = height - Math.floor(randomInt(0, _this.settings.minSize) / 3); // Get a random color.

    var color = randomArrayElem(_this.settings.colors);
    petal.style.background = "linear-gradient(".concat(color.gradientColorDegree, "deg, ").concat(color.gradientColorStart, ", ").concat(color.gradientColorEnd, ")");
    petal.style.webkitAnimation = animations;
    petal.style.animation = animations;
    petal.style.borderRadius = "".concat(randomInt(_this.settings.maxSize, _this.settings.maxSize + Math.floor(Math.random() * 10)), "px ").concat(randomInt(1, Math.floor(width / 4)), "px");
    petal.style.height = "".concat(height, "px");
    petal.style.left = "".concat(Math.random() * document.documentElement.clientWidth - 100, "px");
    petal.style.marginTop = "".concat(-(Math.floor(Math.random() * 20) + 15), "px");
    petal.style.width = "".concat(width, "px"); // Remove petals of which the animation ended.

    PrefixedEvent(petal, 'AnimationEnd', function () {
      if (!elementInViewport(petal)) {
        petal.remove();
      }
    }); // Remove petals that float out of the viewport.

    PrefixedEvent(petal, 'AnimationIteration', function () {
      if (!elementInViewport(petal)) {
        petal.remove();
      }
    }); // Add the petal to the target element.

    _this.el.appendChild(petal);
  };

  this.el.setAttribute('data-sakura-anim-id', window.requestAnimationFrame(this.createPetal));
};

Sakura.prototype.start = function () {
  var animId = this.el.dataset.sakuraAnimId;

  if (!animId) {
    this.el.setAttribute('data-sakura-anim-id', window.requestAnimationFrame(this.createPetal));
  } else {
    throw new Error('Sakura is already running.');
  }
};

Sakura.prototype.stop = function () {
  var _this2 = this;

  var graceful = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var animId = this.el.dataset.sakuraAnimId;

  if (animId) {
    window.cancelAnimationFrame(animId);
    this.el.setAttribute('data-sakura-anim-id', '');
  } // Remove all current blossoms at once.
  // You can also set 'graceful' to true to stop new petals from being created.
  // This way the petals won't be removed abruptly.


  if (!graceful) {
    setTimeout(function () {
      var petals = document.getElementsByClassName(_this2.settings.className);

      while (petals.length > 0) {
        petals[0].parentNode.removeChild(petals[0]);
      }
    }, this.settings.delay + 50);
  }
};





 var sakura = new Sakura('body', {
        colors: [
          {
            gradientColorStart: 'rgba(255, 255, 255, 0.9)',
            gradientColorEnd: 'rgba(255, 255,  255, 0.9)',
            gradientColorDegree: 120,
          },
          {
            gradientColorStart: 'rgba(44,  0)',
            gradientColorEnd: 'rgba(44,  0)',
            gradientColorDegree: 120,
          },
          {
            gradientColorStart: 'rgba(44,  0)',
            gradientColorEnd: 'rgba(44, 0)',
            gradientColorDegree: 120,
          },
        ],
        delay: 40,
      });





    document.addEventListener('DOMContentLoaded', function() {
    function updateCountdown() {
        const endDate = new Date("July 24, 2024 18:00:00").getTime();
        const now = new Date().getTime();
        const distance = endDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours;
        document.getElementById("minutes").innerText = minutes;
        document.getElementById("seconds").innerText = seconds;

        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById("days").innerText = "00";
            document.getElementById("hours").innerText = "00";
            document.getElementById("minutes").innerText = "00";
            document.getElementById("seconds").innerText = "00";
        }
    }

    const timerInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
});





     function onEntry(entry) { 
      entry.forEach(change => { 
        if (change.isIntersecting) { 
         change.target.classList.add('element-show'); 
         
        } 
      }); 
    } 
        let options = { 
      threshold: [0.5] }; 
    let observer = new IntersectionObserver(onEntry, options); 
    let elements = document.querySelectorAll('.element-animation'); 
     
    for (let elm of elements) { 
      observer.observe(elm); 
    }










