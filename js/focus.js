(function () {
  function initFocusSlider(root) {
    var track = root.querySelector(".lb-slider-focus__track");
    if (!track) return;

    var timer = null;
    var interval = Number(root.getAttribute("data-interval")) || 2200;
    var busy = false;

    function slides() {
      return Array.prototype.slice.call(track.querySelectorAll(".lb-slider-focus__slide"));
    }

    function setCenter(index, withTransition) {
      var list = slides();
      if (list.length < 3) return;
      list.forEach(function (el, i) {
        el.classList.toggle("is-center", i === index);
      });
      var left = list[index - 1] || list[0];
      var apply = function () {
        track.style.transform = "translate3d(" + -left.offsetLeft + "px,0,0)";
      };
      if (withTransition === false) {
        var prev = track.style.transition;
        track.style.transition = "none";
        apply();
        void track.offsetHeight;
        track.style.transition = prev;
      } else {
        requestAnimationFrame(function () {
          requestAnimationFrame(apply);
        });
      }
    }

    function next() {
      if (busy) return;
      busy = true;
      setCenter(2, true);
      setTimeout(function () {
        var list = slides();
        track.appendChild(list[0]);
        setCenter(1, false);
        busy = false;
      }, 560);
    }

    function start() {
      stop();
      timer = setInterval(next, interval);
    }

    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
    }

    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    window.addEventListener("resize", function () {
      setCenter(1, false);
    });
    setCenter(1, false);
    start();
  }

  document.querySelectorAll(".lb-slider-focus").forEach(initFocusSlider);
})();
