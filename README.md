# Video Radio Star

Video helper web component. Intended for use with `muted` by default HTML5 videos.

* [Demo](https://zachleat.github.io/video-radio-star/demo.html)

## Installation

```
npm install @zachleat/video-radio-star
```

## Features

* Add classes for styling for:
  * `radiostar-enhanced` (component initialized)
  * `radiostar-muted`
  * `radiostar-playing`
  * `radiostar-paused`
  * `radiostar-ended`

* Only start playing when the video is visible in the viewport with `data-visible-autoplay` (via IntersectionObserver)
  * Optionally conditional on media query, e.g. `data-visible-autoplay="(min-width: 48em)`
  * Don’t use with the `autoplay` attribute.
* Automatically pause video when it scrolls out of view  (via IntersectionObserver)
* Sets `preload="none"` when [SaveData](https://caniuse.com/mdn-api_networkinformation_savedata) is true.
* Disables `autoplay` when [`prefers-reduced-motion` is enabled](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
* Use your own external mute/play/pause controls by adding `data-mute`, `data-play`, or `data-pause` respectively to one or more `<button>` elements.

## Credits

* [MIT](./LICENSE)
* [Demo video from MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)