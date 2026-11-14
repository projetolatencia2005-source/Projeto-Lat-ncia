import * as styled from "styled-components";
import FocusRing from "styles/common/FocusRing";

const GlobalStyle = styled.createGlobalStyle`
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
    inset: 0;
    justify-content: center;
    overflow: hidden;
    pointer-events: none;
    position: absolute;
    z-index: 100002;
  }

  .doors-keyword-gif-overlay--playing {
    background: rgb(0 0 0 / 78%);
  }

  .doors-keyword-gif-overlay--notice {
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
  }

  .doors-splash-stack {
    align-items: center;
    animation: doorsSplashFadeZoomOut 1s ease-out both;
    display: flex;
    flex-direction: column;
    transform: translateY(4vh);
    width: min(928px, 88vw);
  }

  @keyframes doorsSplashFadeZoomOut {
    from {
      opacity: 0;
      transform: translateY(4vh) scale(1.08);
    }
    to {
      opacity: 1;
      transform: translateY(4vh) scale(1);
    }
  }

  .doors-splash-window {
    animation: doorsSplashWindowFloat 6s ease-in-out infinite;
    aspect-ratio: 928 / 395;
    border: 5px solid #f7edd7;
    color: #f7edd7;
    position: relative;
    width: min(928px, 88vw);
  }

  @keyframes doorsSplashWindowFloat {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }

  .doors-splash-titlebar,
  .doors-tutorial-titlebar {
    align-items: center;
    background: #f7edd7;
    color: #31302c;
    display: flex;
    font-size: clamp(11px, 0.83vw, 16px);
    justify-content: space-between;
  }

  .doors-splash-titlebar {
    height: 15.5%;
    justify-content: flex-end;
    padding-right: 1%;
  }

  .doors-boot-controls {
    align-items: center;
    display: flex;
    flex: 0 0 auto;
    gap: 2px;
    margin-right: 2px;
  }

  .doors-splash-brand {
    align-items: center;
    display: flex;
    inset: 15.5% 0 0;
    justify-content: center;
    position: absolute;
  }

  .doors-splash-logo {
    height: auto;
    max-height: 75%;
    object-fit: contain;
    width: 85%;
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
    margin-top: clamp(18px, 3.7vh, 40px);
    width: min(534px, 57.5%);
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
    padding-top: 16.95vh;
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
    font-size: clamp(22px, 2.5vw, 48px);
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
  }

  .doors-tutorial-step-number {
    color: #e3f0ff;
    display: block;
    font-family: "Pixelify Sans", monospace;
    font-size: clamp(40px, 4.17vw, 80px);
    font-weight: 400;
    letter-spacing: 0.08em;
    line-height: 1.15;
    margin-bottom: clamp(18px, 3vh, 32px);
  }

  .doors-tutorial-step-copy p {
    font-size: clamp(22px, 2.29vw, 44px);
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

  .doors-tutorial-desktop-preview {
    aspect-ratio: 16 / 9;
    background: #79a0cf;
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
    object-fit: cover;
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
    transform: translateX(-50%);
    width: max-content;
    z-index: 1;
  }

  .doors-tutorial-start-final {
    min-width: 0;
    width: min(368px, 84vw);
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

    .doors-splash-window {
      width: min(928px, 92vw);
    }

    .doors-splash-stack {
      width: min(928px, 92vw);
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
      background: #dbd0ba;
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
    background: #f3f7fb;
    color: #1d3348;
    cursor: url("/System/Doors/cursors/mouse.svg") 0 0, default;
    display: flex;
    flex-direction: column;
    font-family: "Pixelify Sans", Tahoma, Verdana, "Segoe UI", sans-serif;
    gap: 16px;
    height: 100%;
    overflow: auto;
    padding: 18px;

    h1 {
      color: #194f7d;
      font-size: 20px;
      margin-bottom: 5px;
    }
    p {
      font-size: 13px;
      line-height: 1.5;
    }
    h2 {
      color: #194f7d;
      font-size: 14px;
      margin-bottom: 8px;
    }
    .options {
      border-top: 1px solid #c4d1dd;
      display: flex;
      flex-direction: column;
      gap: 13px;
      padding-top: 14px;
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
      accent-color: #2479bd;
      appearance: auto;
      border: 1px solid #55748d;
      cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
      flex: 0 0 18px;
      height: 18px;
      width: 18px;
    }
    button {
      align-self: flex-start;
      background: linear-gradient(180deg, #fff 0%, #e3edf6 100%);
      border: 1px solid #718ba2;
      border-radius: 3px;
      color: #1d3348;
      cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
      font: inherit;
      padding: 7px 12px;
    }
    button:focus-visible,
    input:focus-visible {
      outline: 3px solid #d39e00;
      outline-offset: 2px;
    }
    .shortcuts {
      background: #e7eef5;
      border: 1px solid #c4d1dd;
      border-radius: 4px;
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
      border: 1px solid #a8b7c5;
      border-radius: 3px;
      font: inherit;
      padding: 1px 4px;
    }
  }

  .doors-high-contrast body {
    filter: contrast(1.45);
  }
  .doors-large-interface {
    zoom: 1.12;
  }
  .doors-reduced-motion *,
  .doors-reduced-motion *::before,
  .doors-reduced-motion *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }

  @media (prefers-reduced-motion: reduce) {
    .doors-boot-screen .prompt {
      animation: none;
    }

    .doors-splash-stack,
    .doors-splash-window,
    .doors-tutorial-window {
      animation: none;
    }
  }

  main > ol > li button figure > picture img {
    image-rendering: pixelated;
  }

  main > ol > li button figure figcaption {
    font-family: "Pixelify Sans", monospace;
    line-height: 0.9 !important;
    margin: 0 !important;
    padding: 0 !important;
    text-align: center;
  }

  .doors-system-tray > img,
  .doors-system-tray > button:not(:disabled) {
    transition: opacity 120ms ease;
  }

  .doors-system-tray > img:hover {
    cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
  }

  .doors-system-tray > img:hover,
  .doors-system-tray > button:hover:not(:disabled) {
    opacity: 0.75 !important;
  }

  .doors-system-tray {
    align-items: center;
    color: #302e2a;
    display: flex;
    gap: 8px;
    height: 100%;
    position: absolute;
    right: 150px;
    top: 0;
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
    .doors-tutorial-step-copy p { font-size: clamp(20px, 2.7vw, 25px); line-height: 1.35; max-width: 100%; }
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
    .doors-tutorial-step-copy p { font-size: clamp(18px, 5vw, 21px); letter-spacing: 0.035em; line-height: 1.38; }
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
`;

export default GlobalStyle;
