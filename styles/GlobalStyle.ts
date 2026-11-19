import * as styled from "styled-components";
import FocusRing from "styles/common/FocusRing";

const GlobalStyle = styled.createGlobalStyle`
  @font-face {
    font-display: swap;
    font-family: "Silkscreen";
    font-style: normal;
    font-weight: 400;
    src: url("/System/Doors/fonts/Silkscreen-Regular.ttf") format("truetype");
  }

  @font-face {
    font-display: swap;
    font-family: "Pixelify Sans";
    font-style: normal;
    font-weight: 400 700;
    src: url("/System/Doors/figma/PixelifySans-LatinExt.woff2") format("woff2");
    unicode-range:
      U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304,
      U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020,
      U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }

  @font-face {
    font-display: swap;
    font-family: "Pixelify Sans";
    font-style: normal;
    font-weight: 400 700;
    src: url("/System/Doors/figma/PixelifySans-Latin.woff2") format("woff2");
    unicode-range:
      U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
      U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191,
      U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  *,
  *::before,
  *::after {
    border: 0;
    box-sizing: border-box;
    font-variant-numeric: tabular-nums;
    margin: 0;
    outline: 0;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
    text-rendering: optimizeLegibility;
    -webkit-touch-callout: none;
    user-select: none;
  }

  body,
  html {
    cursor: url("/System/Doors/cursors/mouse.svg") 0 0, default;
    font-family: ${({ theme }) => theme.formats.systemFont};
  }

  button:not(:disabled),
  a[href],
  [role="button"],
  input[type="checkbox"],
  input[type="radio"],
  input[type="range"],
  label,
  select,
  summary {
    cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
  }

  body {
    height: 100%;
    overflow: hidden;
    position: fixed;
    text-size-adjust: none;
  }

  html {
    background-color: ${({ theme }) => theme.colors.background};
    /* stylelint-disable value-no-vendor-prefix */
    height: -webkit-fill-available;
    height: -moz-available;
    /* stylelint-enable value-no-vendor-prefix */

    &::before,
    &::after {
      background-blend-mode: var(--background-blend-mode);
      background-position: center;
      content: "";
      height: 100%;
      image-rendering: pixelated;
      position: absolute;
      transition: opacity var(--background-transition-timing, 0s) ease-in-out;
      width: 100%;
      z-index: -1;
    }

    &::before {
      background: var(--before-background);
      opacity: var(--before-background-opacity, 0%);
    }

    &::after {
      background: var(--after-background);
      opacity: var(--after-background-opacity, 100%);
    }
  }

  :root[data-keyboard] {
    a[href]:focus,
    button:focus,
    input[type="checkbox"]:focus,
    select:focus,
    [role="button"]:focus,
    [role="slider"]:focus,
    ol[tabindex]:not(.has-selection):focus > li:first-of-type > button {
      ${FocusRing};
    }
  }

  /* Older Firefox draws its own dotted rectangle inside focused buttons, whose
     border only loses its color, as removing it would resize every button */
  button::-moz-focus-inner {
    border-color: transparent;
  }

  input::selection,
  textarea::selection {
    background-color: rgb(0 120 215);
    color: #fff;
  }

  input,
  textarea {
    cursor: text;
    user-select: text;
  }

  .doors-keyword-gif-overlay {
    align-items: center;
    animation: doors-keyword-overlay-in 500ms ease-out both;
    background: rgb(0 0 0 / 92%);
    display: flex;
    transition: background-color 700ms ease;
    inset: 0;
    justify-content: center;
    overflow: hidden;
    pointer-events: none;
    position: absolute;
    z-index: 100002;
  }

  .doors-keyword-gif-overlay--playing {
    background: rgb(0 0 0 / 70%);
  }

  .doors-keyword-gif-overlay--notice {
    pointer-events: auto;
  }

  .doors-keyword-gif-overlay--confirmation {
    pointer-events: auto;
  }

  .doors-keyword-gif-overlay--dismissing {
    animation: doors-keyword-overlay-out 500ms ease-in both;
    pointer-events: none;
  }

  @keyframes doors-keyword-overlay-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes doors-keyword-overlay-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  .doors-keyword-gif-overlay--playing img {
    animation: doors-keyword-gif-fade-out 500ms ease-in 7500ms both;
  }

  @keyframes doors-keyword-gif-fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  .doors-keyword-gif-overlay img {
    display: block;
    height: 100%;
    object-fit: contain;
    width: 100%;
  }

  .doors-unlock-video-overlay {
    align-items: center;
    background: #000;
    display: flex;
    inset: 0;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    transition: opacity 800ms ease;
    visibility: hidden;
    z-index: 100003;
  }

  .doors-unlock-video-overlay--fading-in,
  .doors-unlock-video-overlay--playing,
  .doors-unlock-video-overlay--blocked {
    opacity: 1;
    visibility: visible;
  }

  .doors-unlock-video-overlay--blocked {
    pointer-events: auto;
  }

  .doors-unlock-video-overlay--fading-out {
    opacity: 0;
    visibility: visible;
  }

  .doors-unlock-video-overlay video {
    display: block;
    height: 100%;
    object-fit: contain;
    opacity: 0;
    transition: opacity 800ms ease;
    width: 100%;
  }

  .doors-unlock-video-overlay--playing video {
    opacity: 1;
  }

  .doors-unlock-video-overlay--blocked video {
    opacity: 0;
  }

  .doors-unlock-video-error {
    color: #fff;
    font-family: "Pixelify Sans", monospace;
    position: absolute;
    text-align: center;
  }

  .doors-unlock-video-retry {
    background: #f5ecd6;
    border: 2px solid #ded3b9;
    box-shadow: 3px 3px 0 #111;
    color: #111;
    cursor: pointer;
    font: inherit;
    padding: 12px 18px;
    position: absolute;
  }

  .doors-keyword-notice {
    box-sizing: border-box;
    color: #ffffff;
    font-family: "Pixelify Sans", monospace;
    font-size: clamp(21px, calc(2.2vw + 3px), 27px);
    font-weight: 400;
    line-height: 1.7;
    max-width: calc(100% - 48px);
    width: min(56vw, 860px);
  }

  .doors-keyword-notice-copy {
    transform: translateY(-25px);
  }

  .doors-keyword-notice-copy p {
    margin: 0 0 20px;
  }

  .doors-keyword-notice-copy p:last-child {
    margin-bottom: 0;
  }

  .doors-keyword-confirmation {
    box-sizing: border-box;
    color: #ffffff;
    font-family: "Pixelify Sans", monospace;
    font-size: clamp(21px, calc(2.2vw + 3px), 30px);
    line-height: 1.6;
    margin: 0 auto;
    max-width: calc(100% - 48px);
    text-align: center;
    width: min(860px, calc(100% - 48px));
  }

  .doors-keyword-notice-caret {
    animation: doors-keyword-notice-caret-blink 800ms steps(2, start) infinite;
    border-right: 2px solid #ffffff;
    display: inline-block;
    height: 1em;
    margin-left: 1px;
    vertical-align: -0.12em;
  }

  .doors-keyword-notice-sr-only {
    clip: rect(0, 0, 0, 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  @keyframes doors-keyword-notice-caret-blink {
    to {
      visibility: hidden;
    }
  }

  .doors-keyword-notice strong {
    font-weight: 400;
  }

  .doors-keyword-notice-continue {
    background: #f7edd7;
    border: 2px solid #171715;
    box-shadow: 3px 3px 0 #111;
    color: #31302c;
    cursor: pointer;
    font: inherit;
    font-size: 16px;
    margin-top: 2px;
    padding: 6px 20px;
  }

  .doors-keyword-notice-continue:hover {
    opacity: 0.9;
  }

  .doors-keyword-notice-continue:focus-visible {
    outline: 2px solid #86baff;
    outline-offset: 3px;
  }

  @media (max-width: 600px) {
    .doors-keyword-notice {
      font-size: clamp(19px, calc(4.5vw + 3px), 23px);
      line-height: 1.6;
      max-width: calc(100% - 40px);
      width: calc(100% - 40px);
    }

    .doors-keyword-notice-copy p {
      margin-bottom: 16px;
    }

    .doors-keyword-confirmation {
      font-size: clamp(19px, calc(4.5vw + 3px), 23px);
      max-width: calc(100% - 40px);
      width: calc(100% - 40px);
    }
  }

  .doors-boot-screen {
    background: #f7ecd6;
    color: #31302c;
    display: grid;
    grid-template-rows: min(13.89vh, 150px) minmax(0, 1fr) min(13.89vh, 150px);
    inset: 0;
    position: absolute;
    text-align: center;
    z-index: 100001;
  }

  .doors-intro-screen {
    align-items: center;
    background: #31302c;
    color: #f7edd7;
    display: flex;
    font-family: "Pixelify Sans", monospace;
    justify-content: center;
    padding: 16px;
  }

  @keyframes doors-loading-mouse-cursor {
    0%,
    24.99% {
      cursor: url("/System/Doors/cursors/loading-mouse-1.svg") 0 0, wait;
    }
    25%,
    49.99% {
      cursor: url("/System/Doors/cursors/loading-mouse-2.svg") 0 0, wait;
    }
    50%,
    74.99% {
      cursor: url("/System/Doors/cursors/loading-mouse-3.svg") 0 0, wait;
    }
    75%,
    100% {
      cursor: url("/System/Doors/cursors/loading-mouse-4.svg") 0 0, wait;
    }
  }

  .doors-loading-screen,
  [data-loading-cursor] {
    animation: doors-loading-mouse-cursor 900ms steps(1, end) infinite;
    cursor: url("/System/Doors/cursors/loading-mouse-1.svg") 0 0, wait;
  }

  .doors-loading-content {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .doors-loading-progress {
    aspect-ratio: 197 / 29;
    width: 100px;
  }

  .doors-loading-image {
    height: 100%;
    image-rendering: pixelated;
    width: 100%;
  }

  .doors-loading-content span {
    font-size: clamp(14px, 1.1vw, 20px);
  }

  .doors-splash-screen {
    cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
    overflow: hidden;
  }

  .doors-splash-animation {
    display: block;
    height: 100%;
    inset: 0;
    object-fit: contain;
    object-position: center;
    pointer-events: none;
    position: absolute;
    width: 100%;
  }

  .doors-splash-stack {
    height: 100%;
    inset: 0;
    position: absolute;
    width: 100%;
    z-index: 1;
  }

  .doors-tutorial-titlebar {
    align-items: center;
    background: #f7edd7;
    color: #31302c;
    display: flex;
    font-size: clamp(11px, 0.83vw, 16px);
    justify-content: space-between;
  }

  .doors-splash-start,
  .doors-tutorial-start {
    align-items: center;
    background: #31302c;
    border: 2px solid #f7edd7;
    box-shadow:
      inset 0 0 0 2px #31302c,
      2px 3px 0 #f7edd7;
    color: #f7edd7;
    cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
    display: flex;
    font-family: "Pixelify Sans", monospace;
    font-size: clamp(18px, 1.1vw, 22px);
    height: clamp(34px, 4.26vh, 46px);
    justify-content: center;
    line-height: 1;
    padding: 0 12px;
  }

  .doors-splash-start {
    bottom: calc(clamp(28px, 8vh, 76px) + 60px);
    left: 50%;
    margin: 0;
    position: absolute;
    transform: translateX(-50%);
    width: min(534px, calc(100% - 32px));
    z-index: 2;
  }

  .doors-tutorial-start {
    align-self: center;
    flex: 0 0 auto;
    font-size: clamp(16px, 1.45vw, 28px);
    height: clamp(40px, 4.45vh, 48px);
    margin: 0;
    min-width: clamp(150px, 10.6vw, 203px);
    white-space: nowrap;
    width: auto;
  }

  .doors-splash-start:hover,
  .doors-tutorial-start:hover {
    background: #f7edd7;
    border-color: #31302c;
    box-shadow:
      inset 0 0 0 2px #f7edd7,
      2px 3px 0 #31302c;
    color: #31302c;
  }

  .doors-tutorial-screen {
    overflow: hidden;
    padding: 0;
  }

  .doors-tutorial-window {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0;
    position: relative;
    width: 100%;
  }

  .doors-tutorial-content {
    flex: 1;
    height: 100%;
    min-height: 0;
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  .doors-tutorial-content-multipage {
    flex: 1 1 auto;
    height: 100%;
    min-height: 0;
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  .doors-tutorial-slide {
    animation: doors-tutorial-slide-in 260ms ease-out both;
    color: #f7ecd6;
    font-family: "Pixelify Sans", monospace;
    letter-spacing: 0.08em;
  }

  @keyframes doors-tutorial-slide-in {
    0% {
      opacity: 0%;
    }

    100% {
      opacity: 100%;
    }
  }

  .doors-tutorial-slide-intro {
    margin: 0 auto;
    padding-top: calc(16.95vh + var(--tutorial-intro-shift, 100px));
    width: min(1302px, 84vw);
  }

  .doors-tutorial-intro-top {
    align-items: center;
    display: grid;
    gap: clamp(20px, 5.73vw, 110px);
    grid-template-columns: clamp(80px, 7.86vw, 151px) minmax(0, 1fr);
  }

  .doors-tutorial-question {
    display: block;
    height: auto;
    image-rendering: pixelated;
    justify-self: center;
    width: 100%;
  }

  .doors-tutorial-intro-copy h1 {
    color: #e3f0ff;
    font-size: clamp(42px, 5.1vw, 98px);
    font-weight: 700;
    letter-spacing: 0.08em;
    line-height: 1.05;
    margin-bottom: clamp(18px, 2.6vh, 28px);
  }

  .doors-tutorial-intro-copy p,
  .doors-tutorial-intro-summary {
    color: #f7ecd6;
    font-size: calc(clamp(22px, 2.5vw, 48px) - 2.6667px);
    font-weight: 400;
    letter-spacing: 0.08em;
    line-height: 1.195;
  }

  .doors-tutorial-intro-summary {
    margin-top: clamp(32px, 5.75vh, 66px);
    width: 100%;
  }

  .doors-tutorial-slide:not(.doors-tutorial-slide-intro) {
    align-items: start;
    display: grid;
    gap: clamp(16px, 3vw, 58px);
    grid-template-columns: minmax(0, 650fr) minmax(0, 912fr);
    left: 50%;
    position: absolute;
    top: 16.95vh;
    transform: translateX(-50%);
    width: min(1591px, 82.86vw);
  }

  .doors-tutorial-slide-step-1 {
    gap: clamp(16px, 4.84vw, 93px) !important;
    grid-template-columns: minmax(0, 567fr) minmax(0, 912fr) !important;
    left: calc(50% + 22px) !important;
    width: min(1572px, 82vw) !important;
  }

  .doors-tutorial-slide-step-2 {
    gap: clamp(14px, 1.51vw, 29px) !important;
    left: calc(50% + 12.5px) !important;
  }

  .doors-tutorial-slide-step-3 {
    gap: clamp(14px, 1.51vw, 29px) !important;
  }

  .doors-tutorial-step-copy {
    color: #f7ecd6;
    min-width: 0;
    text-align: left;
  }

  .doors-tutorial-step-number {
    color: #e3f0ff;
    display: block;
    font-family: "Silkscreen", "Pixelify Sans", monospace;
    font-size: clamp(40px, 4.17vw, 80px);
    font-weight: 400;
    letter-spacing: 0.08em;
    line-height: 1.15;
    margin-bottom: clamp(18px, 3vh, 32px);
  }

  .doors-tutorial-step-copy p {
    font-size: calc(clamp(22px, 2.29vw, 44px) - 2.6667px);
    font-weight: 400;
    letter-spacing: 0.08em;
    line-height: 1.18;
    margin: 0;
    max-width: 650px;
  }

  .doors-tutorial-step-copy p + p {
    margin-top: clamp(20px, 2.4vh, 26px);
  }

  .doors-tutorial-slide-step-1 .doors-tutorial-step-copy p {
    max-width: 567px;
  }

  .doors-tutorial-step-copy p span {
    color: #d7e4f7;
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .doors-tutorial-step-copy p .doors-silkscreen-number {
    color: inherit;
    font-family: "Silkscreen", "Pixelify Sans", monospace;
    text-decoration: none;
  }

  .doors-tutorial-desktop-preview {
    aspect-ratio: 16 / 9;
    background: transparent;
    border: 0;
    box-shadow: none;
    margin-top: 1.95vh;
    min-width: 0;
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  .doors-tutorial-wallpaper {
    display: block;
    height: 100%;
    image-rendering: pixelated;
    inset: 0;
    object-fit: contain;
    position: absolute;
    width: 100%;
  }

  .doors-tutorial-preview-icons {
    display: flex;
    flex-direction: column;
    gap: 1.6%;
    left: 1.7%;
    position: absolute;
    top: 2.5%;
    width: 9%;
  }

  .doors-tutorial-preview-icon {
    align-items: center;
    color: #24231f;
    display: flex;
    flex-direction: column;
    font-family: "Pixelify Sans", monospace;
    font-size: clamp(5px, 0.48vw, 9px);
    line-height: 1;
    text-align: center;
    text-shadow: 0 1px #f7ecd6;
  }

  .doors-tutorial-gif-slot {
    align-items: center;
    color: #090909;
    display: flex;
    font-family: Arial, sans-serif;
    font-size: clamp(20px, 3.33vw, 64px);
    font-weight: 400;
    height: auto;
    justify-content: center;
    left: 43.64%;
    line-height: 1;
    position: absolute;
    text-transform: lowercase;
    top: 37.1%;
    transform: translate(-50%, -50%);
    width: max-content;
  }

  .doors-tutorial-slide-step-2 .doors-tutorial-gif-slot {
    top: 39.26%;
  }

  .doors-tutorial-slide-step-3 .doors-tutorial-gif-slot {
    left: 38.27%;
    top: 39.26%;
  }

  .doors-tutorial-preview-taskbar {
    align-items: center;
    background: #8ba2c1;
    border-top: 1px solid #292824;
    bottom: 0;
    color: #25241f;
    display: flex;
    font-family: "Pixelify Sans", monospace;
    font-size: clamp(5px, 0.47vw, 9px);
    height: 6.2%;
    justify-content: space-between;
    left: 0;
    position: absolute;
    width: 100%;
  }

  .doors-tutorial-preview-start {
    align-items: center;
    background: #f7ecd6;
    border: 1px solid #302e2a;
    display: flex;
    gap: 2%;
    height: 88%;
    justify-content: flex-start;
    padding: 0 1.2%;
    white-space: nowrap;
    width: 14%;
  }

  .doors-tutorial-preview-tray {
    align-items: center;
    display: flex;
    gap: 5px;
    height: 100%;
    padding-right: 1.2%;
  }

  .doors-tutorial-preview-date {
    line-height: 1;
    text-align: center;
  }

  .doors-tutorial-actions {
    align-items: center;
    bottom: 14.35vh;
    display: flex;
    gap: clamp(12px, 2vw, 24px);
    justify-content: center;
    left: 50%;
    position: absolute;
    transform: translate(-50%, 20px);
    width: max-content;
    z-index: 1;
  }

  .doors-tutorial-start-final {
    min-width: 0;
    width: min(19.17vw, 368px);
  }

  .doors-tutorial-back {
    background: transparent;
    color: #f7ecd6;
    cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
    font-family: "Pixelify Sans", monospace;
    font-size: clamp(15px, 1.15vw, 22px);
    padding: 10px;
    position: absolute;
    right: calc(100% + 14px);
    text-decoration: underline;
    text-underline-offset: 3px;
    white-space: nowrap;
  }

  .doors-tutorial-back:hover {
    opacity: 90%;
  }

  .doors-tutorial-start:focus-visible,
  .doors-tutorial-back:focus-visible,
  .doors-splash-start:focus-visible {
    outline: 2px solid #69a6ff;
    outline-offset: 5px;
  }

  .doors-login-top,
  .doors-login-bottom {
    background: #7d94b8;
  }

  .doors-login-content {
    align-items: center;
    background: #d7e4f7;
    display: grid;
    grid-template-columns: 50.3% 49.7%;
    min-height: 0;
    position: relative;
  }

  .doors-login-intro {
    align-items: flex-end;
    display: flex;
    flex-direction: column;
    grid-column: 1;
    justify-content: center;
    transform: translateX(calc(9.3vw - 230px));
  }

  .doors-login-wordmark {
    height: auto;
    max-width: calc(100% - 24px);
    width: min(370px, 19.27vw);
  }

  .doors-login-intro p {
    font-size: clamp(16px, 1.667vw, 32px);
    margin-top: 4.45vh;
    text-align: right;
    white-space: nowrap;
  }

  .doors-login-divider {
    height: min(680px, 86%);
    left: 50.3%;
    max-height: calc(100% - 24px);
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 2px;
  }

  .doors-login-user {
    aspect-ratio: 504 / 174;
    background: #f7edd7;
    border: 2px solid #31302c;
    box-shadow: 4px 5px 0 #31302c;
    color: #31302c;
    font-family: "Pixelify Sans", monospace;
    grid-column: 2;
    justify-self: start;
    margin-left: 3.23vw;
    position: relative;
    text-align: left;
    width: min(504px, 26.25vw);
  }

  .doors-shutdown:focus-visible {
    outline: 3px solid #31302c;
    outline-offset: 4px;
    z-index: 1;
  }

  .doors-login-avatar {
    aspect-ratio: 1;
    border: 2px solid #31302c;
    height: auto;
    left: 4.37%;
    object-fit: cover;
    position: absolute;
    top: 11%;
    width: 25.79%;
  }

  .doors-login-user-name {
    font-size: min(32px, 1.667vw);
    left: 34.52%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    white-space: nowrap;
  }

  .doors-login-next {
    align-items: center;
    display: flex;
    justify-content: center;
    position: absolute;
    right: 7.54%;
    top: 40.23%;
    height: 27px;
    width: 27px;

    img {
      display: block;
      height: 100%;
      width: 100%;
    }
  }

  .doors-shutdown {
    aspect-ratio: 343 / 56;
    background: transparent;
    border: 0;
    bottom: clamp(16px, 4.45vh, 48px);
    box-shadow: none;
    display: block;
    height: auto;
    left: clamp(16px, 2.5vw, 48px);
    line-height: 0;
    padding: 0;
    position: absolute;
    width: min(340px, max(220px, 17.71vw));
  }

  .doors-shutdown img {
    display: block;
    height: 100%;
    image-rendering: pixelated;
    object-fit: contain;
    width: 100%;
  }

  .doors-login-user:hover {
    background: #f1e6cb;
  }

  @media (width <= 900px) {
    .doors-tutorial-content {
      gap: 24px;
      padding: 32px clamp(14px, 4vw, 36px);
    }

    .doors-tutorial-about {
      grid-template-columns: 76px minmax(0, 1fr);
      min-height: 0;
      padding: 14px;
      width: 100%;
    }

    .doors-tutorial-about-icon {
      font-size: 76px;
    }

    .doors-tutorial-about p {
      font-size: clamp(13px, 1.8vw, 16px);
    }

    .doors-tutorial-steps {
      gap: 14px;
      grid-template-columns: 1fr;
    }

    .doors-tutorial-step h2 {
      font-size: clamp(16px, 2vw, 19px);
      margin-bottom: 10px;
    }

    .doors-tutorial-number {
      flex-basis: 32px;
      height: 32px;
    }

    .doors-tutorial-step p {
      font-size: clamp(20px, 2.57vw, 23px);
      padding-left: 42px;
    }

    .doors-tutorial-arrow {
      display: none;
    }
  }

  @media (width <= 700px) {
    .doors-boot-screen {
      grid-template-rows: 56px minmax(0, 1fr) 76px;
    }

    .doors-login-content {
      flex-direction: column;
      gap: clamp(20px, 4vh, 32px);
      justify-content: center;
      padding: 24px 16px 74px;
      display: flex;
    }

    .doors-login-intro {
      gap: 16px;
      transform: none;
    }

    .doors-login-wordmark {
      width: min(230px, 65vw);
    }

    .doors-login-intro p {
      font-size: clamp(16px, 4vw, 20px);
      margin-top: 0;
      white-space: normal;
    }

    .doors-login-divider {
      display: none;
    }

    .doors-login-user {
      aspect-ratio: 504 / 174;
      margin: 0;
      width: min(420px, calc(100vw - 32px));
    }

    .doors-login-user-name {
      font-size: clamp(18px, 5vw, 26px);
    }

    .doors-login-next {
      height: 28px;
      width: 28px;
    }

    .doors-shutdown {
      aspect-ratio: 343 / 56;
      bottom: 12px;
      height: auto;
      left: 16px;
      max-width: calc(100vw - 32px);
      width: min(343px, calc(100vw - 32px));
    }

    .doors-shutdown img {
      height: 100%;
      width: 100%;
    }

    .doors-splash-stack {
      width: 100%;
    }

    .doors-tutorial-screen {
      padding: 8px;
    }

    .doors-tutorial-window {
      border-width: 3px;
    }

    .doors-tutorial-content {
      gap: 18px;
      justify-content: space-between;
      padding: 24px clamp(12px, 4vw, 24px) 16px;
    }

    .doors-tutorial-steps {
      flex: 0 0 auto;
      gap: clamp(24px, 4.5vh, 36px);
      grid-template-columns: 1fr;
      margin-top: 0;
      transform: none;
    }

    .doors-tutorial-step h2 {
      align-items: center;
      font-size: 17px;
      line-height: 1.2;
      margin-bottom: 10px;
      white-space: normal;
    }

    .doors-tutorial-number {
      flex-basis: 30px;
      height: 30px;
    }

    .doors-tutorial-step p {
      font-size: clamp(16px, 3.8vw, 18px);
      line-height: 1.35;
      overflow-wrap: anywhere;
      padding-left: 40px;
    }

    .doors-tutorial-arrow {
      justify-self: center;
      line-height: 0.7;
      transform: rotate(90deg);
    }

    .doors-tutorial-about {
      align-items: start;
      flex: 0 0 auto;
      gap: 12px;
      grid-template-columns: 44px minmax(0, 1fr);
      min-height: auto;
      padding: 12px;
    }

    .doors-tutorial-about > div {
      min-width: 0;
    }

    .doors-tutorial-about-icon {
      align-self: start;
      font-size: 48px;
      line-height: 1;
    }

    .doors-tutorial-about h2 {
      font-size: 15px;
      line-height: 1.2;
      margin-bottom: 6px;
    }

    .doors-tutorial-about p {
      font-size: 13px;
      line-height: 1.35;
      overflow-wrap: anywhere;
    }

    .doors-tutorial-start {
      flex: 0 0 auto;
      margin-top: 0;
      transform: translateY(-10px);
    }
  }

  .doors-session-notice {
    align-items: flex-start;
    display: flex;
    inset: calc(20vh + 50px) 0 auto;
    justify-content: center;
    padding: 0 16px;
    pointer-events: none;
    position: absolute;
    z-index: 100004;
  }

  .doors-session-notice-window {
    background: #f7edd7;
    border: 2px solid #31302c;
    box-shadow: 4px 4px 0 #31302c;
    color: #31302c;
    font-family: "Pixelify Sans", monospace;
    max-width: calc(100vw - 32px);
  }

  .doors-session-notice-window header {
    background: #526889;
    border-bottom: 2px solid #31302c;
    color: #fff;
    font-size: 14px;
    padding: 7px 12px;
  }

  .doors-session-notice-window p {
    font-size: 15px;
    margin: 0;
    padding: 12px 16px;
    white-space: nowrap;
  }

  .doors-session-status {
    background: #dbd0ba;
    border: 2px solid #31302c;
    border-radius: 0;
    box-shadow: 3px 3px 0 #31302c;
    color: #31302c;
    cursor: grab;
    display: grid;
    font-family: "Pixelify Sans", monospace;
    font-size: clamp(10px, 0.94vw, 16px);
    grid-template-rows: 1fr 1fr;
    max-width: calc(100vw - 12px);
    padding: 3px 4px 4px;
    position: absolute;
    bottom: 55px;
    right: 5px;
    top: auto;
    width: min(432px, max(280px, 22.5vw), calc(100vw - 12px));
    height: min(67px, 6.2vh);
    touch-action: none;
    z-index: 10;

    &:active {
      cursor: grabbing;
    }

    .metrics {
      align-items: stretch;
      display: grid;
      background: #31302c;
      border: 2px solid #31302c;
      grid-template-columns: 1fr 1.48fr 1fr;
      min-height: 0;
      touch-action: none;
      white-space: nowrap;
    }

    .metrics:focus-visible {
      outline: 2px solid #2778c5;
      outline-offset: -3px;
    }

    .metrics span {
      align-items: center;
      border-right: 2px solid #31302c;
      display: flex;
      gap: 3px;
      justify-content: center;
      min-width: 0;
      padding: 0 3px;
    }

    .metrics span:first-child,
    .metrics span:last-child {
      background: #fff;
    }

    .metrics .brand {
      background: #f7edd7;
      font-size: clamp(10px, 0.94vw, 16px);
    }

    .metrics span:last-child {
      border-right: 0;
      font-family: "Pixelify Sans", monospace;
      gap: 1px;
    }

    .metrics span:first-child .doors-silkscreen-number,
    .metrics span:last-child .doors-silkscreen-number {
      letter-spacing: -0.5px;
    }
    .metrics strong {
      font-weight: 400;
    }
    .metrics time {
      color: #df3434;
      font-family: "Pixelify Sans", monospace;
      font-weight: 700;
    }
    .notice {
      background: #D7E4F7;
      border: 2px solid #31302c;
      align-items: center;
      display: flex;
      font-size: clamp(10px, 0.83vw, 16px);
      line-height: 1.15;
      justify-content: center;
      margin: 0;
      min-height: 0;
      padding: 0 4px;
      text-align: center;
    }

    .notice > span {
      white-space: nowrap;
    }

    .notice .doors-silkscreen-number {
      letter-spacing: -0.5px;
      margin-inline: -1px;
    }

    @media (max-width: 560px) {
      right: 5px;
      top: 5px;
      width: min(432px, max(280px, 22.5vw), calc(100vw - 12px));
      .notice {
        display: block;
      }
    }
  }

  .doors-accessibility-panel {
    background: #d7e4f7;
    border: 2px solid #31302c;
    box-shadow: 3px 3px 0 #31302c;
    color: #31302c;
    cursor: url("/System/Doors/cursors/mouse.svg") 0 0, default;
    display: flex;
    flex-direction: column;
    font-family: "Pixelify Sans", monospace;
    gap: 12px;
    height: 100%;
    overflow: auto;
    padding: 16px;

    header {
      background: #526889;
      border: 2px solid #31302c;
      color: #fff;
      margin: -16px -16px 0;
      padding: 12px 14px;

      p {
        color: #fff;
      }
    }
    h1 {
      color: #fff;
      font-family: "Silkscreen", "Pixelify Sans", monospace;
      font-size: 17px;
      line-height: 1.4;
      margin-bottom: 5px;
    }
    p {
      color: #31302c;
      font-size: 13px;
      line-height: 1.5;
    }
    h2 {
      color: #31302c;
      font-family: "Silkscreen", "Pixelify Sans", monospace;
      font-size: 12px;
      margin-bottom: 8px;
    }
    .options {
      background: #f7edd7;
      border: 2px solid #31302c;
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 12px;
    }
    label {
      align-items: center;
      cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
      display: flex;
      font-size: 14px;
      gap: 10px;
      line-height: 1.4;
    }
    input[type="checkbox"] {
      accent-color: #f47a12;
      appearance: auto;
      border: 1px solid #31302c;
      cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
      flex: 0 0 18px;
      height: 18px;
      width: 18px;
    }
    button {
      align-self: flex-start;
      background: #f7edd7;
      border: 2px solid #31302c;
      box-shadow: 3px 3px 0 #31302c;
      color: #31302c;
      cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
      font: inherit;
      padding: 7px 12px;
    }
    button:focus-visible,
    input:focus-visible {
      outline: 3px solid #0872d1;
      outline-offset: 2px;
    }
    .shortcuts {
      background: #f7edd7;
      border: 2px solid #31302c;
      padding: 12px;
    }
    .shortcuts ul {
      list-style: disc;
      margin: 8px 0 0 19px;
    }
    .shortcuts li {
      font-size: 12px;
      line-height: 1.7;
    }
    kbd {
      background: #fff;
      border: 1px solid #31302c;
      box-shadow: 1px 1px 0 #31302c;
      font: inherit;
      padding: 1px 4px;
    }
  }

  .doors-accessibility-toggle {
    align-items: center;
    background: transparent;
    border: 0;
    box-shadow: none;
    color: inherit;
    cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
    display: flex;
    flex: 0 0 20px;
    height: 30px;
    justify-content: center;
    padding: 0;
    width: 20px;
  }

  .doors-system-volume-toggle {
    align-items: center;
    background: transparent;
    border: 0;
    box-shadow: none;
    color: inherit;
    cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
    display: flex;
    flex: 0 0 20px;
    height: 30px;
    justify-content: center;
    padding: 0;
    width: 20px;
  }

  .doors-volume-control {
    align-items: center;
    background: #f7edd7;
    border: 2px solid #31302c;
    bottom: calc(100% + 8px);
    box-shadow: 2px 2px 0 #31302c;
    color: #302e2a;
    display: flex;
    gap: 6px;
    justify-content: center;
    padding: 8px;
    position: absolute;
    right: -110px;
    width: 250px;
    z-index: 2;
  }

  .doors-volume-control button {
    background: #f7edd7;
    border: 2px solid #31302c;
    box-shadow: 2px 2px 0 #31302c;
    color: #302e2a;
    cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
    flex: 0 0 26px;
    font-family: "Pixelify Sans", monospace;
    font-size: 18px;
    height: 26px;
    line-height: 1;
    padding: 0;
    width: 26px;
  }

  .doors-volume-control input[type="range"] {
    appearance: none;
    background: transparent;
    border: 0;
    cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
    flex: 1 1 auto;
    height: 20px;
    min-width: 0;
    padding: 0;
  }

  .doors-volume-control input[type="range"]::-webkit-slider-runnable-track {
    background: linear-gradient(
      to right,
      #d7e4f7 0 var(--volume-level),
      #7d94b8 var(--volume-level) 100%
    );
    border: 2px solid #31302c;
    box-sizing: border-box;
    height: 12px;
  }

  .doors-volume-control input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    background: #dbd0ba;
    border: 2px solid #31302c;
    border-radius: 0;
    box-shadow: 2px 2px 0 #31302c;
    height: 18px;
    margin-top: -5px;
    width: 12px;
  }

  .doors-volume-control input[type="range"]::-moz-range-track {
    background: #7d94b8;
    border: 2px solid #31302c;
    box-sizing: border-box;
    height: 12px;
  }

  .doors-volume-control input[type="range"]::-moz-range-progress {
    background: #d7e4f7;
    height: 8px;
  }

  .doors-volume-control input[type="range"]::-moz-range-thumb {
    background: #dbd0ba;
    border: 2px solid #31302c;
    border-radius: 0;
    box-shadow: 2px 2px 0 #31302c;
    height: 14px;
    width: 8px;
  }

  .doors-volume-control output {
    font-family: "Pixelify Sans", monospace;
    font-size: 13px;
    min-width: 34px;
    text-align: right;
  }

  nav[aria-label="Barra de tarefas"] button#clock {
    color: #302e2a;
  }

  .doors-system-tray > img,
  .doors-system-volume-toggle img,
  .doors-accessibility-toggle img {
    height: 20px;
    image-rendering: pixelated;
    object-fit: contain;
    width: 20px;
  }

  @media (max-width: 560px) {
    .doors-system-tray {
      display: none;
    }
  }

  picture > img {
    display: block;
  }

  button:hover:not(:disabled) {
    opacity: 0.9 !important;
  }

  ol,
  ul {
    list-style: none;
  }

  .doors-boot-controls img {
    height: 30px;
    image-rendering: pixelated;
    width: 30px;
  }

  @media (width <= 700px) {
    .doors-boot-controls img {
      height: clamp(16px, 4.8vw, 24px);
      width: clamp(16px, 4.8vw, 24px);
    }

    .doors-splash-start {
      font-size: clamp(12px, 3.1vw, 16px);
      line-height: 1;
      max-width: calc(100% - 12px);
      padding: 0 10px;
      white-space: nowrap;
      width: max-content;
    }

    .doors-splash-titlebar .doors-boot-controls {
      transform: translate(4px, -3px);
    }
  }

  @media (width <= 900px) {
    .doors-tutorial-screen { align-items: stretch; padding: 0; }
    .doors-tutorial-window { min-height: 0; }
    .doors-tutorial-content-multipage {
      display: flex; flex-direction: column; height: 100%; overflow: hidden auto;
      padding: 32px clamp(14px, 4vw, 36px);
    }
    .doors-tutorial-slide-intro { flex: 0 0 auto; padding-top: 0; width: 100%; }
    .doors-tutorial-intro-top {
      gap: clamp(12px, 3vw, 28px);
      grid-template-columns: clamp(64px, 12vw, 104px) minmax(0, 1fr);
    }
    .doors-tutorial-question { font-size: clamp(76px, 12vw, 108px); }
    .doors-tutorial-intro-copy h1 { font-size: clamp(23px, 4vw, 36px); margin-bottom: 12px; }
    .doors-tutorial-intro-copy p, .doors-tutorial-intro-summary {
      font-size: clamp(17px, 2.3vw, 22px); line-height: 1.35;
    }
    .doors-tutorial-intro-summary { margin-top: 24px; }
    .doors-tutorial-slide:not(.doors-tutorial-slide-intro) {
      flex: 0 0 auto; gap: 20px; grid-template-columns: minmax(0, 1fr);
      left: auto; position: relative; top: auto; transform: none; width: 100%;
    }
    .doors-tutorial-step-number { font-size: clamp(40px, 8vw, 64px); margin-bottom: 12px; }
    .doors-tutorial-step-copy p { font-size: calc(clamp(20px, 2.7vw, 25px) - 2.6667px); line-height: 1.35; max-width: 100%; }
    .doors-tutorial-desktop-preview { margin: 0 auto; max-width: 912px; width: 100%; }
    .doors-tutorial-actions {
      align-self: stretch;
      background: linear-gradient(180deg, rgb(49 48 44 / 0%), #31302c 26%);
      bottom: 0; flex: 0 0 auto; justify-content: center; left: auto;
      margin-top: auto; padding: 20px 0 max(18px, env(safe-area-inset-bottom));
      position: sticky; transform: none; width: 100%;
    }
    .doors-tutorial-back { position: static; right: auto; }
    .doors-tutorial-start { font-size: clamp(16px, 2.4vw, 21px); min-width: 150px; }
  }
  @media (width <= 700px) {
    .doors-tutorial-screen { align-items: stretch; padding: 0; }
    .doors-tutorial-window { height: 100%; width: 100%; }
    .doors-tutorial-content-multipage { padding: 24px 16px 0; }
    .doors-tutorial-intro-top { gap: 12px; grid-template-columns: 48px minmax(0, 1fr); }
    .doors-tutorial-question { font-size: clamp(58px, 14vw, 78px); }
    .doors-tutorial-intro-copy h1 {
      font-size: clamp(21px, 5.4vw, 27px); letter-spacing: 0.04em; line-height: 1.1;
    }
    .doors-tutorial-intro-copy p, .doors-tutorial-intro-summary {
      font-size: clamp(16px, 4.2vw, 19px); letter-spacing: 0.04em; line-height: 1.35;
    }
    .doors-tutorial-intro-summary { margin-top: 20px; }
    .doors-tutorial-slide:not(.doors-tutorial-slide-intro) { gap: 16px; }
    .doors-tutorial-step-number { font-size: 42px; line-height: 1; margin-bottom: 10px; }
    .doors-tutorial-step-copy p { font-size: calc(clamp(18px, 5vw, 21px) - 2.6667px); letter-spacing: 0.035em; line-height: 1.38; }
    .doors-tutorial-preview-icons { gap: 0; }
    .doors-tutorial-preview-icon { font-size: clamp(5px, 1.2vw, 7px); }
    .doors-tutorial-preview-taskbar { font-size: clamp(5px, 1.15vw, 7px); }
    .doors-tutorial-actions { gap: 8px; justify-content: center; padding-top: 16px; }
    .doors-tutorial-back { font-size: 15px; padding: 8px 4px; }
    .doors-tutorial-start { font-size: clamp(14px, 4vw, 17px); height: 40px; min-width: 128px; padding: 0 8px; }
    .doors-tutorial-start-final { flex: 0 1 auto; min-width: 0; width: min(242px, calc(100% - 88px)); }
  }
  @media (width <= 360px) {
    .doors-tutorial-start-final { font-size: 12px; }
  }
  .doors-tutorial-intro-copy h1,
  .doors-tutorial-intro-copy p,
  .doors-tutorial-intro-summary {
    text-align: left;
  }

  .doors-session-status--centered {
    bottom: auto !important;
    left: 50% !important;
    right: auto !important;
    top: 8px !important;
    transform: translateX(-50%);
  }

  .doors-session-status--centered .notice {
    text-align: center;
  }

  /* Global overrides for the internal-site layouts in the Browser window. */
  .site-bubble .bubble-chat-layout {
    align-items: stretch;
    background: #f2f2f2;
    border: 2px solid #31302c;
    box-shadow: 5px 6px 0 #31302c;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: minmax(220px, 0.24fr) minmax(0, 0.76fr);
    height: min(655px, calc(100vh - 228px));
    margin: 0 2.08vw;
    min-height: 520px;
    overflow: hidden;
  }

  .site-bubble .bubble-inbox {
    background: #fff;
    border-right: 2px solid #31302c;
    display: flex;
    flex-direction: column;
    min-height: 0;
    min-width: 0;
    overflow: hidden;
  }

  .site-bubble .bubble-contact-list {
    flex: 1 1 auto;
    max-height: none;
    min-height: 0;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .site-bubble .bubble-conversation {
    background: #f2f2f2;
    display: flex;
    flex-direction: column;
    min-height: 0;
    min-width: 0;
    overflow: hidden;
  }

  .site-bubble .bubble-message-list {
    background: #f2f2f2;
    flex: 1 1 auto;
    min-height: 0;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 24px;
  }

  .site-bubble .bubble-message-row {
    align-items: flex-end;
    display: flex;
    gap: 14px;
    margin: 0 0 24px;
    min-width: 0;
  }

  .site-bubble .bubble-message-row p {
    box-sizing: border-box;
    flex: 0 1 auto;
    max-width: min(610px, 72%);
    min-width: 0;
    overflow-wrap: anywhere;
    white-space: normal;
  }

  .site-bubble .bubble-message-row p > span {
    display: block;
    line-height: 1.35;
    overflow-wrap: anywhere;
    white-space: normal;
  }

  .site-bubble .bubble-message-composer {
    align-items: stretch;
    background: #fff;
    border-top: 2px solid #31302c;
    box-sizing: border-box;
    display: flex;
    flex: 0 0 74px;
    gap: 10px;
    min-height: 74px;
    padding: 10px 12px;
  }

  .site-youspace .you-watch-layout {
    align-items: start;
    display: grid;
    flex: 1 0 auto;
    gap: 0;
    grid-template-columns: minmax(0, 1.38fr) minmax(0, 1fr);
    padding: 40px 3vw 72px;
    width: 100%;
  }

  .site-youspace .you-watch-main {
    min-width: 0;
    padding-right: 34px;
  }

  .site-youspace .you-watch-main .you-player {
    margin: 0;
    max-width: none;
    padding: 0;
    width: 100%;
  }

  .site-youspace .you-watch-main .player-screen {
    aspect-ratio: 1016 / 572;
    background: #111;
    border: 3px solid #111;
    min-height: 0;
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  .site-youspace .you-watch-main .player-screen > img {
    display: block;
    height: 100%;
    max-height: none;
    max-width: none;
    object-fit: cover;
    width: 100%;
  }

  .site-youspace .you-watch-main .player-screen > button {
    align-items: center;
    background: #f33;
    border: 2px solid #fff;
    border-radius: 50%;
    color: #fff;
    display: flex;
    font-size: 26px;
    height: 58px;
    justify-content: center;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 58px;
  }

  .site-youspace .you-watch-main .you-video-duration {
    background: #111;
    bottom: 0;
    color: #fff;
    font-size: 15px;
    line-height: 1;
    padding: 4px 7px;
    position: absolute;
    right: 0;
  }

  .site-youspace .you-watch-main .you-player .player-controls {
    background: transparent;
    border: 0;
    color: #31302c;
    display: block;
    padding: 0;
  }

  .site-youspace .you-watch-info h1 {
    border-bottom: 2px solid #aaa;
    font-size: clamp(22px, 1.8vw, 32px);
    font-weight: 400;
    line-height: 1.18;
    margin: 12px 0 0;
    padding: 0 4px 10px;
  }

  .site-youspace .you-watch-meta-row {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: space-between;
    padding: 14px 4px 18px;
  }

  .site-youspace .you-watch-channel {
    align-items: center;
    display: flex;
    flex: 1 1 auto;
    gap: 10px;
    min-width: 220px;
  }

  .site-youspace .you-watch-channel > img {
    border: 1px solid #31302c;
    border-radius: 50%;
    flex: 0 0 57px;
    height: 57px;
    object-fit: cover;
    width: 57px;
  }

  .site-youspace .you-watch-channel > div {
    display: flex;
    flex-direction: column;
    line-height: 1.1;
  }

  .site-youspace .you-watch-channel strong {
    font-size: 17px;
    font-weight: 700;
  }

  .site-youspace .you-watch-channel small {
    color: #777;
    font-size: 11px;
  }

  .site-youspace .you-watch-channel > button {
    background: #f33;
    border: 0;
    color: #fff;
    font-size: 12px;
    margin-left: 4px;
    padding: 5px 8px;
  }

  .site-youspace .you-watch-channel > button.is-subscribed {
    background: #d7e4f7;
    color: #31302c;
  }

  .site-youspace .you-watch-actions {
    align-items: center;
    display: flex;
    flex: 0 0 auto;
    gap: 12px;
  }

  .site-youspace .you-watch-actions button {
    align-items: center;
    background: transparent;
    border: 0;
    display: flex;
    flex-direction: column;
    font-size: 17px;
    gap: 2px;
    min-width: 34px;
    padding: 4px;
  }

  .site-youspace .you-watch-actions button span {
    font-size: 11px;
  }

  .site-youspace .you-comments-panel {
    border: 2px solid #111;
    box-shadow: 4px 5px 0 #111;
    margin-top: 8px;
    padding: 16px 20px 20px;
  }

  .site-youspace .you-comments-panel h2 {
    font-size: 20px;
    font-weight: 400;
    margin: 0 0 14px;
  }

  .site-youspace .you-comment-composer {
    align-items: center;
    background: #f7f7f7;
    border: 2px solid #111;
    box-shadow: 3px 4px 0 #111;
    display: flex;
    gap: 10px;
    margin: 0 8px 22px;
    min-height: 48px;
    padding: 5px 8px;
  }

  .site-youspace .you-comment-composer > span {
    background: #d7e4f7;
    border: 1px solid #31302c;
    flex: 0 0 28px;
    font-size: 17px;
    line-height: 24px;
    text-align: center;
  }

  .site-youspace .you-comment-composer input {
    background: transparent;
    border: 0;
    color: #31302c;
    flex: 1 1 auto;
    font: inherit;
    min-width: 0;
    outline: 0;
    user-select: text;
  }

  .site-youspace .you-comment-composer button {
    background: #f7f7f7;
    border: 2px solid #111;
    box-shadow: 2px 2px 0 #111;
    font-size: 18px;
    height: 28px;
    line-height: 20px;
    width: 30px;
  }

  .site-youspace .you-comments-panel ol {
    display: flex;
    flex-direction: column;
    gap: 16px;
    list-style: none;
  }

  .site-youspace .you-comment {
    align-items: flex-start;
    background: #fff;
    border: 2px solid #111;
    box-shadow: 3px 4px 0 #111;
    display: flex;
    gap: 12px;
    min-width: 0;
    padding: 9px 10px 6px;
  }

  .site-youspace .you-comment-avatar {
    border: 1px solid #111;
    flex: 0 0 24px;
    height: 24px;
    width: 24px;
  }

  .site-youspace .you-comment-body {
    min-width: 0;
  }

  .site-youspace .you-comment-body > p:first-child {
    font-size: 11px;
    margin: 0 0 2px;
  }

  .site-youspace .you-comment-body > p:first-child strong {
    font-weight: 400;
  }

  .site-youspace .you-comment-body > p:first-child small {
    color: #888;
  }

  .site-youspace .you-comment-body > p:nth-child(2) {
    font-size: clamp(13px, 0.95vw, 17px);
    line-height: 1.25;
    margin: 0;
    overflow-wrap: anywhere;
  }

  .site-youspace .you-comment-actions {
    align-items: center;
    display: flex;
    gap: 7px;
    margin-top: 5px;
  }

  .site-youspace .you-comment-actions button {
    background: transparent;
    border: 0;
    font-size: 11px;
    padding: 0;
  }

  .site-youspace .you-watch-related {
    border-left: 2px solid #c7c7c7;
    display: flex;
    flex-direction: column;
    gap: 26px;
    min-width: 0;
    padding: 0 0 20px 34px;
  }

  .site-youspace .you-related-video {
    align-items: start;
    display: grid;
    gap: 18px;
    grid-template-columns: minmax(0, 0.4fr) minmax(0, 0.6fr);
    min-width: 0;
  }

  .site-youspace .you-related-thumbnail {
    aspect-ratio: 16 / 9;
    background: #fff;
    border: 2px solid #111;
    box-shadow: 5px 6px 0 #111;
    display: block;
    line-height: 0;
    overflow: visible;
    padding: 0;
    position: relative;
    width: calc(100% - 6px);
  }

  .site-youspace .you-related-thumbnail img {
    display: block;
    height: 100%;
    object-fit: cover;
    width: 100%;
  }

  .site-youspace .you-related-thumbnail span {
    background: #111;
    bottom: 0;
    color: #fff;
    font-size: 10px;
    line-height: 1;
    padding: 3px 5px;
    position: absolute;
    right: 0;
  }

  .site-youspace .you-related-title {
    background: transparent;
    border: 0;
    color: #078bff;
    display: block;
    font-size: clamp(15px, 1.05vw, 20px);
    line-height: 1.15;
    margin: 0 0 8px;
    padding: 0;
    text-align: left;
    text-decoration: underline !important;
    text-underline-offset: 2px;
    width: 100%;
  }

  .site-youspace .you-related-video p {
    font-size: clamp(11px, 0.72vw, 14px);
    line-height: 1.2;
    margin: 0;
  }

  .site-youspace .you-sidebar-panel ol li button {
    text-decoration: underline !important;
    text-underline-offset: 2px;
  }

  .site-youspace .you-load-more:disabled {
    cursor: default;
    opacity: 0.85;
  }

  @media (max-width: 900px) {
    .site-bubble .bubble-chat-layout {
      grid-template-columns: minmax(0, 1fr);
      height: auto;
      margin: 0 12px;
      min-height: 0;
    }

    .site-bubble .bubble-inbox {
      border-bottom: 2px solid #31302c;
      border-right: 0;
      max-height: 390px;
    }

    .site-bubble .bubble-contact-list {
      max-height: 300px;
    }

    .site-bubble .bubble-conversation {
      min-height: 560px;
    }

    .site-youspace .you-watch-layout {
      grid-template-columns: minmax(0, 1fr);
      gap: 28px;
      padding: 28px 18px 48px;
    }

    .site-youspace .you-watch-main {
      padding-right: 0;
    }

    .site-youspace .you-watch-related {
      border-left: 0;
      border-top: 2px solid #c7c7c7;
      padding: 28px 0 0;
    }

    .site-youspace .you-related-video {
      grid-template-columns: minmax(120px, 0.4fr) minmax(0, 0.6fr);
    }
  }

  @media (max-width: 600px) {
    .site-youspace .you-watch-layout {
      padding: 16px 12px 34px;
    }

    .site-youspace .you-watch-meta-row {
      align-items: flex-start;
      flex-direction: column;
      gap: 8px;
      padding: 12px 2px 16px;
    }

    .site-youspace .you-watch-channel {
      gap: 8px;
      min-width: 0;
      width: 100%;
    }

    .site-youspace .you-watch-channel > img {
      flex-basis: 46px;
      height: 46px;
      width: 46px;
    }

    .site-youspace .you-watch-channel > button {
      margin-left: auto;
    }

    .site-youspace .you-watch-actions {
      align-self: flex-end;
    }

    .site-youspace .you-comments-panel {
      padding: 12px 10px 14px;
    }

    .site-youspace .you-comment-composer {
      margin: 0 2px 18px;
    }

    .site-youspace .you-related-video {
      gap: 12px;
      grid-template-columns: minmax(108px, 0.4fr) minmax(0, 0.6fr);
    }
  }

  /* Preview hotfix: bind the annotated spacing and sizing changes to the global stylesheet. */
  .site-youspace .you-load-message {
    margin-top: 20px !important;
  }

  .site-youspace .you-comments-panel > .you-comment-composer {
    margin-bottom: 20px !important;
  }

  .site-bubble .bubble-profile-card > img.bubble-profile-avatar {
    border: 2px solid #31302c !important;
    box-sizing: border-box !important;
  }

  .site-bubble .bubble-profile-cover {
    min-height: clamp(700px, 38vw, 780px) !important;
  }

  .site-bubble .bubble-inbox-search {
    box-sizing: border-box !important;
    flex: 0 0 150px !important;
    gap: 0 !important;
    height: 150px !important;
    max-height: 150px !important;
    min-height: 150px !important;
  }

  .site-bubble .bubble-inbox-search input,
  .site-bubble .bubble-inbox-search button {
    box-sizing: border-box !important;
    height: 39px !important;
    min-height: 39px !important;
  }

  .site-bubble .bubble-inbox-search button {
    margin-left: 0 !important;
  }

  @media (max-width: 720px) {
    .site-bubble .bubble-profile-cover {
      min-height: 620px !important;
    }
  }


  .doors-silkscreen-number {
    font-family: "Silkscreen", "Pixelify Sans", monospace;
  }

  .doors-session-status .doors-silkscreen-number,
  #clock .doors-clock-date {
    font-family: "Silkscreen", "Pixelify Sans", monospace !important;
  }

  .doors-first-visit-overlay {
    align-items: flex-start;
    background: transparent;
    display: flex;
    inset: 100px 0 auto;
    justify-content: center;
    padding: 0 18px;
    pointer-events: none;
    position: fixed;
    z-index: 1000000;
  }

  .doors-first-visit-window {
    background: #f7edd7;
    border: 3px solid #31302c;
    box-shadow: 6px 6px 0 #111;
    color: #20232a;
    font-family: "Pixelify Sans", monospace;
    max-width: min(560px, calc(100vw - 36px));
    padding: 0 18px 18px;
    pointer-events: auto;
    width: max-content;
  }

  .doors-first-visit-titlebar {
    align-items: center;
    background: #839abc;
    border-bottom: 2px solid #31302c;
    color: #fff;
    display: flex;
    font-size: 16px;
    font-weight: 700;
    justify-content: space-between;
    margin: 0 -18px 18px;
    min-height: 38px;
    padding: 6px 10px;
    cursor: grab;
    touch-action: none;
    user-select: none;

    &:active {
      cursor: grabbing;
    }
  }

  .doors-first-visit-window p {
    font-size: 15px;
    line-height: 1.35;
    margin: 0 0 18px;
    overflow: visible;
    scrollbar-width: none;
    white-space: nowrap;
  }

  .doors-first-visit-window button {
    background: #f7edd7;
    border: 2px solid #31302c;
    box-shadow: 3px 3px 0 #31302c;
    color: #20232a;
    display: block;
    font-family: "Pixelify Sans", monospace;
    font-size: 13px;
    margin-left: auto;
    min-height: 30px;
    padding: 2px 10px;
  }

  .doors-first-visit-window button:focus-visible {
    outline: 2px solid #0872d1;
    outline-offset: 3px;
  }

  @media (max-width: 600px) {
    .doors-first-visit-window {
      max-width: calc(100vw - 36px);
      width: calc(100vw - 36px);
    }

    .doors-first-visit-window p {
      overflow-wrap: anywhere;
      white-space: normal;
    }
  }

  .doors-post-it-window-title {
    align-self: center;
    color: #31302c;
    flex: 1 1 auto;
    font-family: "Pixelify Sans", monospace;
    font-size: 14px;
    font-weight: 700;
    overflow: visible;
    padding: 0 8px;
    text-align: left;
    text-overflow: clip;
    transform: translateX(-1px);
    white-space: nowrap;
  }

  .doors-taskbar-pinned {
    align-items: center;
    display: flex;
    flex: 0 0 40px;
    height: 100%;
    justify-content: center;
    min-width: 40px;
    padding: 3px;
  }

  .doors-taskbar-pinned button {
    align-items: center;
    background: #f7edd7;
    border: 2px solid #31302c;
    box-shadow: 2px 2px 0 #31302c;
    display: flex;
    height: 30px;
    justify-content: center;
    padding: 2px;
    width: 30px;
  }

  .doors-taskbar-pinned img {
    height: 23px;
    image-rendering: pixelated;
    object-fit: contain;
    width: 23px;
  }

  .doors-system-network-toggle img {
    height: 20px;
    image-rendering: pixelated;
    object-fit: contain;
    width: 20px;
  }

  .doors-system-network-toggle {
    align-items: center;
    background: transparent;
    border: 0;
    box-shadow: none;
    color: inherit;
    cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
    display: flex;
    flex: 0 0 20px;
    height: 30px;
    justify-content: center;
    padding: 0;
    width: 20px;
  }

  .doors-network-info {
    background: #31302c;
    border: 2px solid #111;
    bottom: calc(100% + 8px);
    box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.75);
    color: #f7edd7;
    display: grid;
    font-family: "Pixelify Sans", monospace;
    font-size: 13px;
    gap: 4px;
    min-width: 260px;
    padding: 8px 10px;
    position: absolute;
    right: 0;
    z-index: 3;
  }

  .doors-network-info strong {
    font-weight: 400;
  }

  .doors-network-info-status {
    color: #00d18f;
    font-weight: 700;
  }

  .doors-network-info-signal {
    color: #00d18f;
    letter-spacing: 1px;
    margin-left: 4px;
  }

  @media (max-width: 560px) {
    .doors-first-visit-window {
      padding: 0 14px 14px;
    }

    .doors-first-visit-titlebar {
      margin: 0 -14px 14px;
    }
  }
  /* Keep the intro composition proportional on shorter desktop viewports. */
  @media (min-width: 901px) and (max-height: 1050px) {
    .doors-tutorial-window-intro {
      --tutorial-intro-shift: 111.11px;
      height: 111.11%;
      transform: scale(0.9);
      transform-origin: center top;
    }
  }

  @media (min-width: 901px) and (max-height: 950px) {
    .doors-tutorial-window-intro {
      --tutorial-intro-shift: 117.65px;
      height: 117.65%;
      transform: scale(0.85);
    }
  }

  @media (min-width: 901px) and (max-height: 900px) {
    .doors-tutorial-window-intro {
      --tutorial-intro-shift: 121.95px;
      height: 121.95%;
      transform: scale(0.82);
    }
  }

  @media (min-width: 901px) and (max-height: 820px) {
    .doors-tutorial-window-intro {
      --tutorial-intro-shift: 131.58px;
      height: 131.58%;
      transform: scale(0.76);
    }
  }

  @media (min-width: 901px) and (max-height: 740px) {
    .doors-tutorial-window-intro {
      --tutorial-intro-shift: 144.93px;
      height: 144.93%;
      transform: scale(0.69);
    }
  }
  /* Tighter intro-to-button spacing for the 1514 × 883 desktop layout. */
  @media (min-width: 1450px) and (max-width: 1560px) and (min-height: 850px) and (max-height: 910px) {
    .doors-tutorial-window-intro {
      --tutorial-intro-shift: 256px;
    }
  }
`;

export default GlobalStyle;

