# Video Radio Star

A lightweight web component helper for HTML5 videos. Intended for use with `muted` by default HTML5 videos.

* [Demo](https://zachleat.github.io/video-radio-star/demo.html)

## Installation

```
npm install @zachleat/video-radio-star
```

```html
<video-radio-star>
  <video src="./media/flower.mp4" muted controls controlsList="nodownload" playsinline disablePictureInPicture disableRemotePlayback></video>

  <button type="button" data-play>Play</button>
  <button type="button" data-pause>Pause</button>
  <button type="button" data-mute>Toggle Mute</button>
</video-radio-star>
<script type="module" src="video-radio-star.js"></script>
```

## Features

* Add classes for styling for:
  * `radiostar-enhanced` (component initialized)
  * `radiostar-muted`
  * `radiostar-playing`
  * `radiostar-paused`
  * `radiostar-ended`

* Only start playing when the video is visible in the viewport with `data-visible-autoplay` (via IntersectionObserver) Make sure you don’t use the `autoplay` attribute.
  * Optionally conditional on media query, e.g. `data-visible-autoplay="(min-width: 48em)`
  * The `muted` attribute is required when using this feature.
  * Don’t use the `autoplay` attribute.
* Automatically pause video when it scrolls out of view  (via IntersectionObserver)
* Sets `preload="none"` when [SaveData](https://caniuse.com/mdn-api_networkinformation_savedata) is true.
* Disables `autoplay` when [`prefers-reduced-motion` is enabled](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
* Use your own external mute/play/pause controls by adding `data-mute`, `data-play`, or `data-pause` respectively to one or more `<button>` elements.

## Credits

* [MIT](./LICENSE)
* [Demo video from MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)