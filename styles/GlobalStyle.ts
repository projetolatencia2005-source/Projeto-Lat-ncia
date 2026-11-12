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
    margin-top: clamp(24px, 3vh, 34px);
    transform: translateY(-40px);
    width: min(316px, 90%);
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
    padding: clamp(10px, 2.22vh, 24px) clamp(12px, 1.875vw, 36px);
  }

  .doors-tutorial-window {
    animation: doorsTutorialFadeZoomOut 1s ease-out both;
    background: #31302c;
    border: 5px solid #f7edd7;
    box-sizing: border-box;
    display: flex;
    flex: 1;
    flex-direction: column;
    height: min(800px, calc(100vh - 32px));
    min-height: 0;
    min-width: 0;
    overflow: hidden;
  }

  @keyframes doorsTutorialFadeZoomOut {
    from {
      opacity: 0;
      transform: scale(1.08);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .doors-tutorial-titlebar {
    flex: 0 0 clamp(32px, 4.44vh, 48px);
    font-size: 20px;
    padding-left: clamp(10px, 1.2vw, 23px);
  }

  .doors-tutorial-titlebar > span:first-child {
    font-weight: 700;
    transform: translateY(-4px);
  }

  .doors-tutorial-titlebar .doors-boot-controls {
    transform: translateY(-4px);
  }

  .doors-tutorial-content {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: clamp(24px, 3.4vh, 42px);
    justify-content: flex-start;
    min-height: 0;
    -ms-overflow-style: none;
    overflow: auto;
    padding: clamp(24px, 4vh, 44px) clamp(24px, 5vw, 80px)
      clamp(24px, 3vh, 36px);
    scrollbar-width: none;

    &::-webkit-scrollbar {
      background: transparent;
      display: none !important;
      height: 0;
      width: 0 !important;
    }
  }

  .doors-tutorial-content::-webkit-scrollbar {
    display: none !important;
    height: 0 !important;
    width: 0 !important;
  }

  .doors-tutorial-about {
    align-items: center;
    border: 3px dashed #f7edd7;
    box-sizing: border-box;
    display: grid;
    gap: clamp(14px, 2vw, 28px);
    grid-template-columns: 164px minmax(0, 1fr);
    margin: 0 auto;
    min-height: 250px;
    padding: 55px 80px;
    max-width: 100%;
    width: 1200px;
  }

  .doors-tutorial-about-icon {
    font-family: "Pixelify Sans", monospace;
    font-size: 164px;
    font-weight: 400;
    justify-self: center;
    line-height: 0.8;
  }

  .doors-tutorial-about h2 {
    font-size: 28px;
    font-weight: 400;
    letter-spacing: 0.04em;
    line-height: 1.1;
    margin-bottom: 8px;
    text-align: left;
  }

  .doors-tutorial-about p {
    font-size: 20px;
    letter-spacing: 0.04em;
    line-height: 1.2;
    text-align: left;
  }

  .doors-tutorial-steps {
    align-items: start;
    display: grid;
    gap: clamp(12px, 2vw, 38px);
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) auto minmax(
        0,
        1fr
      );
    margin-top: 50px;
    transform: translateY(-20px);
  }

  .doors-tutorial-step h2 {
    align-items: center;
    display: flex;
    font-size: clamp(15px, 1.25vw, 24px);
    font-weight: 600;
    gap: clamp(8px, 0.9vw, 17px);
    line-height: 1.1;
    letter-spacing: 0.08em;
    margin-bottom: clamp(22px, 2.7vh, 30px);
    white-space: nowrap;
  }

  .doors-tutorial-number {
    align-items: center;
    display: inline-flex;
    flex: 0 0 clamp(30px, 2.5vw, 48px);
    height: clamp(30px, 2.5vw, 48px);
    isolation: isolate;
    justify-content: center;
    position: relative;

    > img {
      height: 100%;
      image-rendering: pixelated;
      inset: 0;
      object-fit: contain;
      position: absolute;
      width: 100%;
      z-index: 1;
    }

    > span {
      align-items: center;
      color: #f7edd7;
      display: flex;
      font-size: 0.78em;
      font-weight: 700;
      inset: 0;
      justify-content: center;
      line-height: 1;
      pointer-events: none;
      position: absolute;
      z-index: 3 !important;
    }
  }

  .doors-tutorial-step p {
    font-size: clamp(20px, 1.49vw, 28px);
    letter-spacing: 0.08em;
    line-height: 1.22;
    max-width: 390px;
    text-align: left;
  }

  .doors-tutorial-step p span,
  .doors-tutorial-about p span {
    color: #69a6ff;
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .doors-tutorial-arrow {
    align-self: start;
    font-family: "Pixelify Sans", monospace;
    font-size: clamp(15px, 1.25vw, 24px);
    font-weight: 700;
    line-height: 1;
    margin-top: 1px;
    text-align: center;
  }

  @media (width >= 901px) and (height <= 1200px) {
    .doors-tutorial-content {
      gap: clamp(18px, 2.5vh, 30px);
      padding-bottom: clamp(16px, 2.5vh, 30px);
      padding-top: clamp(18px, 3vh, 36px);
    }
  }

  .doors-tutorial-start {
    margin-top: auto;
  }

  .doors-tutorial-start:focus-visible,
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
  }
`;

export default GlobalStyle;
