class VideoRadioStar extends HTMLElement {
  connectedCallback() {
    this.attr = {
      visibleAutoplay: "data-visible-autoplay",
    };
    this.classes = {
      init: "radiostar-enhanced",
      muted: "radiostar-muted",
      playing: "radiostar-playing",
      paused: "radiostar-paused",
      ended: "radiostar-ended",
      controls: "radiostar-controls",
    };

    this.reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.reduceData = "connection" in navigator && navigator.connection.saveData === true;

    this.video = this.querySelector(":scope video");
    this.setClasses();
    this.bindEvents();

    if(this.reduceData) {
      this.video.setAttribute("preload", "none");
    } else if(!this.reduceMotion) { // don’t autoplay if reduced motion
      this._whenVisible(this.video, (isVisible) => {
        // Video must be visible to play, auto pause when invisible
        if(this.hasAttribute(this.attr.visibleAutoplay)) {
          if(isVisible) {
            if(this._matchesMediaQueryForAutoplay()) {
              this.video.play();
            }
          } else {
            if(!this.paused) {
              this.video.pause();
            }
          }
        }
      });
    }
  }

  _whenVisible(el, callback) {
    if(!('IntersectionObserver' in window)) {
      // run by default without intersectionobserver
      callback(undefined);
      return;
    }
  
    return new IntersectionObserver(entries => {
      entries.forEach(entry => callback(entry.isIntersecting))
    }).observe(el);
  }

  _matchesMediaQueryForAutoplay() {
    if(!("matchMedia" in window)) {
      return false;
    }

    if(this.hasAttribute(this.attr.visibleAutoplay)) {
      return true;
    }
    let mq = this.getAttribute(this.attr.visibleAutoplay);
    if(mq) {
      return window.matchMedia(mq).matches;
    }

    return false;
  }

  setClasses() {
    if(this.video) {
      this.classList.add(this.classes.init);
      this.classList.toggle(this.classes.muted, this.video.muted);
      this.classList.toggle(this.classes.paused, this.video.paused);
      this.classList.toggle(this.classes.playing, !this.video.paused);
      this.classList.toggle(this.classes.ended, this.video.ended);
      this.classList.toggle(this.classes.controls, this.video.hasAttribute("controls"));
    }
  }

  bindEvents() {
    if(!this.video) {
      return;
    }

    let update = () => {
      this.setClasses();
    };

    this.video.addEventListener("play", update);
    this.video.addEventListener("pause", update);
    this.video.addEventListener("ended", update);

    this.addEventListener("click", (event) => {
      if(event.target.closest("[data-mute]")) {
        event.stopPropagation();
        this.video.muted = !this.video.muted;
        this.setClasses();
      } else if(event.target.closest("[data-play]")) {
        event.stopPropagation();
        this.video.play();
      } else if(event.target.closest("[data-pause]")) {
        event.stopPropagation();
        this.video.pause();
      } else if(event.target.closest("[data-controls]")) {
        event.stopPropagation();
        if(this.video.hasAttribute("controls")) {
          this.video.removeAttribute("controls");
        } else {
          this.video.setAttribute("controls", "");
        }
        this.setClasses();
      }
    });
  }
}

if("customElements" in window) {
  window.customElements.define("video-radio-star", VideoRadioStar);
}
