import styled from "styled-components";
import { type InternalSiteId } from "components/apps/Browser/config";

type StyledInternalSitesProps = {
  $site: InternalSiteId;
};

const StyledInternalSites = styled.main<StyledInternalSitesProps>`
  background: ${({ $site }) =>
    $site === "gluugli" ? "#89c1ff" : "#fff"};
  box-sizing: border-box;
  color: #31302c;
  cursor: url("/System/Doors/cursors/mouse.svg") 0 0, default;
  flex: 1 1 auto;
  font-family: "Pixelify Sans", monospace;
  font-size: 16px;
  min-height: 0;
  overflow: auto;
  position: relative;
  scrollbar-color: #7d94b8 #f7edd7;
  scrollbar-width: auto;
  width: 100%;

  &::-webkit-scrollbar {
    background: #f7edd7;
    border-radius: 0;
    width: 16px;
  }

  &::-webkit-scrollbar-track {
    background: #d7e4f7;
    border-left: 2px solid #31302c;
    border-radius: 0;
  }

  &::-webkit-scrollbar-thumb {
    background: #7d94b8;
    border: 2px solid #31302c;
    border-radius: 0;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #536b8c;
  }

  button,
  input {
    font: inherit;
  }

  button {
    color: inherit;
    cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
  }

  input {
    box-sizing: border-box;
  }

  .site-gluugli {
    align-items: center;
    display: flex;
    flex-direction: column;
    min-height: 100%;
    padding: clamp(36px, 9vh, 90px) 22px 36px;
    text-align: center;

    .gluugli-wordmark {
      align-items: center;
      display: flex;
      font-size: clamp(45px, 9vw, 78px);
      font-weight: 700;
      justify-content: center;
      letter-spacing: -0.055em;
      line-height: 1;
      margin: 0 0 27px;
      position: relative;
      text-shadow: none;

      span {
        --logo-accent: #4d01ff;

        -webkit-text-stroke: 1px var(--logo-accent);
        color: #070707;
        paint-order: stroke fill;
        position: relative;
        text-shadow: -3px 3px 0 var(--logo-accent);
      }

      span:nth-of-type(2) {
        --logo-accent: #e8e000;
      }

      span:nth-of-type(3),
      span:nth-of-type(4) {
        --logo-accent: #39ac0f;
      }

      span:nth-of-type(5) {
        --logo-accent: #ff0004;
      }

      span:nth-of-type(6),
      span:nth-of-type(7) {
        --logo-accent: #304acc;
      }
    }

    .site-search {
      margin: 0 auto;
      max-width: 560px;
      width: min(100%, 560px);
      box-shadow: 2px 2px 0 #31302c;
    }

    .site-shortcuts {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      justify-content: center;
      margin: 34px auto 0;
      max-width: 610px;
    }

    .site-shortcuts button {
      background: rgb(247 237 215 / 88%);
      border: 2px solid #31302c;
      box-shadow: 2px 2px 0 #31302c;
      padding: 8px 12px;
    }

    .search-results {
      margin: 30px auto 0;
      max-width: 650px;
      text-align: left;
      width: min(100%, 650px);
    }

    .search-results button {
      background: #f7edd7;
      border: 1px solid #31302c;
      display: block;
      margin-top: 9px;
      padding: 10px 12px;
      text-align: left;
      width: 100%;

      strong {
        color: #0645ad;
        display: block;
        margin-bottom: 3px;
        text-decoration: underline;
      }
    }
  }

  .site-search {
    display: flex;

    input {
      background: #fff;
      border: 2px solid #31302c;
      border-right: 0;
      min-width: 0;
      padding: 9px 12px;
      width: 100%;

      &:focus {
        outline: 2px solid #7d94b8;
        outline-offset: 1px;
      }
    }

    button {
      align-items: center;
      background: #f7edd7;
      border: 2px solid #31302c;
      display: flex;
      flex: 0 0 44px;
      justify-content: center;

      img {
        height: 18px;
        image-rendering: pixelated;
        width: 18px;
      }
    }
  }

  .site-bubble {
    container-name: bubble-site;
    container-type: inline-size;
    background: #fff;
    color: #31302c;
    min-height: 100%;
    padding: 0;

    .bubble-header {
      align-items: center;
      background: #f37319;
      color: #fff;
      display: flex;
      gap: clamp(14px, 2.1vw, 40px);
      min-height: clamp(52px, 3.385vw, 65px);
      padding: 0 clamp(16px, 2.03vw, 39px);

      .bubble-wordmark {
        flex: 0 0 auto;
        font-size: clamp(30px, 2.92vw, 56px);
        font-weight: 700;
        letter-spacing: -0.035em;
        line-height: 1;
      }

      nav {
        align-items: stretch;
        display: flex;
        flex: 1 1 auto;
        gap: clamp(7px, 1.2vw, 24px);
        justify-content: space-around;
        min-width: 0;
      }

      nav button,
      .bubble-session-button {
        background: transparent;
        border: 0;
        color: inherit;
        font-size: clamp(15px, 1.12vw, 22px);
        padding: 8px 3px;
        white-space: nowrap;
      }

      nav button.is-active {
        font-weight: 700;
      }

      .bubble-header-note {
        flex: 1;
        font-size: clamp(15px, 1.12vw, 22px);
      }

      .bubble-top-search {
        border: 2px solid #31302c;
        display: flex;
        flex: 0 1 515px;
        height: clamp(34px, 2.03vw, 39px);
        min-width: 130px;
      }

      .bubble-top-search input {
        background: #fff;
        border: 0;
        color: #31302c;
        flex: 1;
        font-size: clamp(13px, 0.83vw, 16px);
        min-width: 0;
        padding: 0 10px;
      }

      .bubble-top-search button {
        align-items: center;
        background: #fff;
        border-left: 2px solid #31302c;
        display: flex;
        flex: 0 0 clamp(32px, 2.03vw, 39px);
        justify-content: center;
      }

      .bubble-top-search img {
        height: 20px;
        object-fit: contain;
        width: 20px;
      }

      .bubble-session-button {
        border-left: 1px solid rgb(255 255 255 / 50%);
        flex: 0 0 auto;
        padding-left: clamp(12px, 1.25vw, 24px);
      }
    }

    .bubble-content-grid {
      align-items: start;
      display: grid;
      gap: clamp(18px, 1.78vw, 34px);
      grid-template-columns: minmax(0, 3.38fr) minmax(240px, 1fr);
      margin: clamp(20px, 1.56vw, 30px) clamp(16px, 2.03vw, 39px) 0;
    }

    .bubble-feed,
    .bubble-sidebar {
      min-width: 0;
    }

    .bubble-composer {
      background: #f37319;
      border: 2px solid #31302c;
      box-shadow: 4px 5px 0 #31302c;
      margin-bottom: clamp(18px, 1.56vw, 30px);
      padding-bottom: clamp(8px, 0.73vw, 14px);
    }

    .bubble-composer-title {
      align-items: center;
      color: #fff;
      display: flex;
      font-size: clamp(19px, 1.56vw, 30px);
      font-weight: 400;
      gap: 9px;
      line-height: 1.2;
      padding: clamp(9px, 0.73vw, 14px) clamp(12px, 1.56vw, 30px);
    }

    .bubble-composer textarea {
      background: #fff;
      border: 2px solid #31302c;
      display: block;
      font-size: clamp(16px, 1.25vw, 24px);
      min-height: clamp(60px, 4.85vw, 93px);
      padding: 8px 10px;
      resize: vertical;
      width: calc(100% - clamp(24px, 3.12vw, 60px));
    }

    .bubble-composer textarea::placeholder {
      color: rgb(49 48 44 / 55%);
    }

    .bubble-composer-controls {
      align-items: center;
      display: flex;
      gap: clamp(8px, 1vw, 18px);
      padding: clamp(8px, 0.73vw, 14px) clamp(12px, 1.56vw, 30px) 0;
    }

    .bubble-attach-photo,
    .bubble-publish,
    .bubble-friend button {
      background: #fff;
      border: 2px solid #31302c;
      box-shadow: 2px 3px 0 #31302c;
      color: #31302c;
      cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
      font-size: clamp(13px, 0.83vw, 16px);
      padding: 5px 9px;
    }

    .bubble-attach-photo {
      align-items: center;
      display: inline-flex;
      position: relative;
    }

    .bubble-attach-photo input {
      cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
      height: 100%;
      inset: 0;
      opacity: 0;
      position: absolute;
      width: 100%;
    }

    .bubble-photo-name {
      max-width: 35%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .bubble-character-count {
      color: #fff;
      font-size: clamp(12px, 0.83vw, 16px);
      margin-left: auto;
    }

    .bubble-publish {
      flex: 0 0 auto;
    }

    .bubble-post-card {
      background: #fff;
      border: 2px solid #31302c;
      box-shadow: 4px 5px 0 #31302c;
      margin-bottom: clamp(14px, 1.38vw, 27px);
      min-width: 0;
    }

    .bubble-post-header {
      align-items: center;
      background: #f37319;
      color: #fff;
      display: flex;
      gap: clamp(8px, 0.73vw, 14px);
      min-height: clamp(48px, 3vw, 58px);
      padding: 5px clamp(8px, 0.73vw, 14px);
    }

    .bubble-avatar {
      border: 1px solid #31302c;
      flex: 0 0 clamp(34px, 2.19vw, 42px);
      height: clamp(34px, 2.19vw, 42px);
      object-fit: cover;
      width: clamp(34px, 2.19vw, 42px);
    }

    .bubble-post-header > div {
      display: flex;
      flex: 1;
      flex-direction: column;
      min-width: 0;
    }

    .bubble-post-header strong {
      font-size: clamp(16px, 1.25vw, 24px);
      font-weight: 400;
      line-height: 1.1;
    }

    .bubble-post-header small {
      font-size: clamp(11px, 0.83vw, 16px);
      line-height: 1.1;
      opacity: 0.92;
    }

    .bubble-post-menu {
      background: transparent;
      border: 0;
      color: #fff;
      font-size: 24px;
      line-height: 1;
      padding: 0 4px;
    }

    .bubble-post-content {
      background: #fff;
      display: flex;
      flex-direction: column;
      min-height: clamp(112px, 8.75vw, 168px);
      padding: clamp(10px, 1.04vw, 20px);
    }

    .bubble-post-content > p {
      font-size: clamp(15px, 1.04vw, 20px);
      line-height: 1.4;
      margin-bottom: 12px;
    }

    .bubble-post-content.has-image {
      min-height: clamp(300px, 28.23vw, 542px);
    }

    .bubble-post-image {
      aspect-ratio: 581 / 411;
      display: block;
      height: auto;
      margin: clamp(22px, 3.44vw, 66px) 0 clamp(12px, 1.25vw, 24px);
      max-width: 100%;
      object-fit: cover;
      width: min(100%, 30.3vw, 581px);
    }

    .bubble-post-actions {
      align-items: center;
      border-top: 1px solid #b9b9b9;
      color: rgb(49 48 44 / 68%);
      display: flex;
      font-size: clamp(11px, 0.83vw, 16px);
      gap: clamp(12px, 1.5vw, 28px);
      margin-top: auto;
      min-height: 28px;
      padding-top: 5px;
    }

    .bubble-post-actions button {
      background: transparent;
      border: 0;
      color: inherit;
      white-space: nowrap;
    }

    .bubble-post-actions > span {
      margin-left: auto;
      text-align: right;
      white-space: nowrap;
    }

    .bubble-profile-card,
    .bubble-side-panel {
      border: 2px solid #31302c;
      box-shadow: 4px 5px 0 #31302c;
      margin-bottom: clamp(18px, 1.56vw, 30px);
      min-width: 0;
    }

    .bubble-profile-card {
      align-items: start;
      background: #f37319;
      color: #fff;
      display: grid;
      grid-template-columns: clamp(44px, 2.7vw, 52px) minmax(0, 1fr);
      min-height: clamp(170px, 11.93vw, 229px);
      padding: clamp(12px, 0.9vw, 18px);
      position: relative;
    }

    .bubble-profile-card::after {
      background: #31302c;
      content: "";
      height: 100%;
      left: calc(clamp(12px, 0.9vw, 18px) + clamp(44px, 2.7vw, 52px));
      pointer-events: none;
      position: absolute;
      top: 0;
      width: 2px;
    }

    .bubble-profile-avatar {
      border: 1px solid #31302c;
      height: clamp(42px, 2.7vw, 52px);
      object-fit: cover;
      width: clamp(42px, 2.7vw, 52px);
    }

    .bubble-profile-name {
      display: flex;
      flex-direction: column;
      font-size: clamp(17px, 1.25vw, 24px);
      line-height: 1.1;
      min-width: 0;
      padding-left: clamp(5px, 0.4vw, 8px);
    }

    .bubble-profile-name small {
      font-size: clamp(11px, 0.83vw, 16px);
    }

    .bubble-profile-card > button {
      align-self: end;
      background: transparent;
      border: 0;
      color: #fff;
      font-size: clamp(11px, 0.73vw, 14px);
      grid-column: 2;
      justify-self: start;
      padding: 0 0 0 clamp(5px, 0.4vw, 8px);
      text-align: left;
      text-decoration: underline;
    }

    .bubble-side-panel h2 {
      background: #f37319;
      color: #fff;
      font-size: clamp(18px, 1.67vw, 32px);
      font-weight: 400;
      min-height: clamp(44px, 3vw, 58px);
      padding: clamp(7px, 0.73vw, 14px) clamp(10px, 0.9vw, 18px);
    }

    .bubble-side-panel-body {
      background: #fff;
      border-top: 2px solid #31302c;
      min-height: clamp(110px, 13.3vw, 256px);
      padding: clamp(10px, 0.9vw, 18px);
    }

    .bubble-friend-panel .bubble-side-panel-body {
      min-height: clamp(220px, 24.8vw, 476px);
    }

    .bubble-community-panel .bubble-side-panel-body {
      min-height: clamp(220px, 24.1vw, 463px);
    }

    .bubble-side-panel-body > p {
      color: #777;
      font-size: clamp(13px, 0.9vw, 17px);
    }

    .bubble-friend {
      align-items: center;
      display: grid;
      gap: 8px;
      grid-template-columns: clamp(32px, 2.19vw, 42px) minmax(0, 1fr) auto;
      margin: 0 0 clamp(10px, 1vw, 18px);
      min-width: 0;
    }

    .bubble-friend img {
      border: 1px solid #31302c;
      height: clamp(32px, 2.19vw, 42px);
      object-fit: cover;
      width: clamp(32px, 2.19vw, 42px);
    }

    .bubble-friend strong {
      font-size: clamp(13px, 0.9vw, 17px);
      font-weight: 400;
      min-width: 0;
      overflow-wrap: anywhere;
    }

    .bubble-friend button {
      padding: 3px 6px;
    }

    .bubble-community {
      background: transparent;
      border: 0;
      color: #31302c;
      display: block;
      font-size: clamp(14px, 1.04vw, 20px);
      line-height: 1.35;
      margin-bottom: clamp(7px, 0.73vw, 14px);
      padding: 0;
      text-align: left;
      width: 100%;
    }

    .bubble-footer {
      align-items: center;
      background: #f37319;
      color: #fff;
      display: flex;
      gap: clamp(20px, 2.5vw, 48px);
      margin-top: clamp(24px, 2.6vw, 50px);
      min-height: clamp(96px, 8.65vw, 166px);
      padding: clamp(18px, 2.03vw, 39px);
    }

    .bubble-footer > strong,
    .bubble-auth-promo > strong {
      font-size: clamp(30px, 2.92vw, 56px);
      font-weight: 700;
      letter-spacing: -0.035em;
    }

    .bubble-footer nav {
      display: flex;
      flex: 1;
      flex-wrap: wrap;
      gap: clamp(9px, 0.9vw, 18px);
    }

    .bubble-footer nav span {
      font-size: clamp(14px, 0.83vw, 16px);
    }

    .bubble-footer small {
      font-size: clamp(12px, 0.83vw, 16px);
      margin-left: auto;
      text-align: right;
    }

    &.is-login {
      background: #f37319;
      box-sizing: border-box;
      color: #fff;
      display: flex;
      flex-direction: column;
      min-height: 100%;
      padding: clamp(24px, 5.3vh, 70px) clamp(12px, 1.25vw, 24px)
        clamp(18px, 4.5vh, 50px);
    }

    .bubble-auth-notice {
      background: #fff;
      border: 2px solid #31302c;
      box-sizing: border-box;
      color: #31302c;
      font-size: clamp(12px, 1vw, 16px);
      line-height: 1.1;
      padding: clamp(8px, 0.8vw, 12px) clamp(10px, 1.05vw, 20px);
    }

    .bubble-auth-notice strong,
    .bubble-auth-promo p strong {
      color: #f37319;
    }

    .bubble-auth-layout {
      display: grid;
      gap: clamp(8px, 1vw, 16px);
      grid-template-columns: minmax(0, 2.02fr) minmax(255px, 1fr);
      height: clamp(240px, 37vh, 400px);
      margin-top: clamp(10px, 2vh, 18px);
    }

    .bubble-auth-promo {
      align-items: center;
      background: #fff;
      border: 2px solid #31302c;
      box-shadow: none;
      box-sizing: border-box;
      color: #31302c;
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-height: 0;
      padding: clamp(16px, 2vw, 38px);
      text-align: center;
    }

    .bubble-auth-promo .bubble-logo-window {
      aspect-ratio: 564 / 152;
      flex: 0 0 auto;
      margin: 0 0 clamp(16px, 1.7vw, 32px);
      overflow: hidden;
      position: relative;
      max-width: 100%;
      width: min(14vw, 270px);
    }

    .bubble-auth-promo .bubble-logo-window img {
      display: block;
      height: 478.57%;
      left: -14.07%;
      max-width: none;
      position: absolute;
      top: -189.29%;
      width: 128.14%;
    }

    .bubble-auth-promo p {
      font-size: clamp(12px, 1vw, 16px);
      line-height: 1.25;
      margin: 0.25em 0;
      max-width: 100%;
    }

    .bubble-login {
      align-items: center;
      background: transparent;
      border: 0;
      box-shadow: none;
      box-sizing: border-box;
      color: #fff;
      display: flex;
      flex-direction: column;
      min-height: 0;
      padding: clamp(4px, 0.5vw, 8px) clamp(6px, 1.2vw, 23px);
    }

    .bubble-login h2 {
      font-size: clamp(12px, 1.05vw, 18px);
      font-weight: 400;
      line-height: 1.25;
      margin: 0 auto clamp(4px, 0.6vh, 7px);
      max-width: 420px;
      text-align: center;
      width: 100%;
    }

    .bubble-login .bubble-login-field {
      align-items: center;
      display: grid;
      font-size: clamp(12px, 1vw, 16px);
      gap: clamp(5px, 0.7vw, 10px);
      grid-template-columns: clamp(48px, 5.05vw, 97px) minmax(0, 1fr);
      margin: 0 auto clamp(3px, 0.35vw, 5px);
      max-width: 420px;
      width: 100%;
    }

    .bubble-login input:not([type="checkbox"]) {
      background: #fff;
      border: 2px solid rgb(49 48 44 / 25%);
      box-sizing: border-box;
      height: clamp(22px, 2vw, 28px);
      justify-self: start;
      min-width: 0;
      padding: 3px 7px;
      width: min(100%, clamp(140px, 18vw, 286px));
    }

    .bubble-login .bubble-save {
      align-items: start;
      display: grid;
      font-size: clamp(12px, 0.9vw, 14px);
      gap: clamp(5px, 0.7vw, 10px);
      grid-template-columns: clamp(14px, 1.1vw, 18px) minmax(0, 1fr);
      line-height: 1.2;
      margin: clamp(4px, 0.4vw, 6px) auto clamp(4px, 0.4vw, 6px);
      max-width: 420px;
      width: 100%;
    }

    .bubble-login input[type="checkbox"] {
      height: clamp(14px, 1.1vw, 18px);
      margin: 0;
      padding: 0;
      width: clamp(14px, 1.1vw, 18px);
    }

    .bubble-public-warning {
      font-size: clamp(12px, 0.9vw, 14px);
      line-height: 1.2;
      margin: 0 auto clamp(4px, 0.5vw, 6px);
      max-width: 420px;
      text-align: center;
      width: 100%;
    }

    .bubble-login .login-submit {
      background: #fff;
      border: 2px solid #31302c;
      box-shadow: 2px 2px 0 #31302c;
      display: block;
      color: #31302c;
      font-size: clamp(12px, 0.9vw, 14px);
      height: clamp(24px, 2.1vw, 28px);
      margin: 0 auto clamp(4px, 0.5vw, 6px);
      min-width: clamp(48px, 4.6vw, 88px);
      padding: 0 8px;
    }

    .bubble-login .bubble-help {
      background: transparent;
      border: 0;
      box-shadow: none;
      color: #fff;
      display: block;
      font-size: clamp(12px, 0.9vw, 14px);
      margin: 0 auto clamp(4px, 0.5vw, 6px);
      padding: 3px;
      text-decoration: underline;
    }

    .bubble-register {
      font-size: clamp(12px, 0.9vw, 14px);
      line-height: 1.2;
      margin: 0;
      text-align: center;
    }

    .bubble-login .bubble-register-link {
      background: transparent;
      border: 0;
      box-shadow: none;
      color: #fff;
      display: inline;
      font-size: 1em;
      font-weight: 700;
      margin: 0;
      padding: 0 2px;
      text-decoration: underline;
    }

    .bubble-login-footer {
      color: #fff;
      font-size: clamp(11px, 0.85vw, 13px);
      line-height: 1.25;
      margin: clamp(10px, 1.2vh, 12px) 0 0;
      text-align: center;
    }

    @media (max-width: 980px) {
      .bubble-header {
        flex-wrap: wrap;
        gap: 10px 18px;
        padding-bottom: 8px;
        padding-top: 8px;
      }

      .bubble-header nav {
        flex: 1 0 100%;
        justify-content: flex-start;
        order: 3;
        overflow-x: auto;
      }

      .bubble-content-grid {
        grid-template-columns: minmax(0, 2.2fr) minmax(210px, 1fr);
      }
    }

    @media (max-width: 720px) {
      .bubble-content-grid {
        grid-template-columns: minmax(0, 1fr);
      }

      &.is-login {
        padding: 24px 12px;
      }

      &.is-login .bubble-auth-layout {
        height: auto;
      }

      &.is-login .bubble-auth-promo {
        min-height: 275px;
      }

      &.is-login .bubble-login {
        min-height: 390px;
        padding: 18px;
      }

      .bubble-sidebar {
        display: grid;
        gap: 14px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .bubble-profile-card {
        grid-column: 1 / -1;
      }

      .bubble-side-panel {
        margin-bottom: 8px;
      }

      .bubble-footer {
        align-items: flex-start;
        flex-wrap: wrap;
      }

      .bubble-footer small {
        margin-left: 0;
        text-align: left;
        width: 100%;
      }

      .bubble-auth-layout {
        grid-template-columns: minmax(0, 1fr);
      }
    }

    @media (max-width: 480px) {
      .bubble-header {
        padding-left: 12px;
        padding-right: 12px;
      }

      .bubble-header-note {
        display: none;
      }

      .bubble-top-search {
        order: 4;
        flex-basis: 100%;
      }

      .bubble-content-grid {
        margin-left: 12px;
        margin-right: 12px;
      }

      .bubble-sidebar {
        grid-template-columns: minmax(0, 1fr);
      }

      .bubble-profile-card {
        grid-column: auto;
      }

      .bubble-post-actions {
        flex-wrap: wrap;
      }

      .bubble-post-actions > span {
        margin-left: 0;
      }

      .bubble-footer {
        gap: 12px;
      }
    }
  }

  .site-bubble {
    .bubble-header .bubble-wordmark {
      background: transparent;
      border: 0;
      color: #fff;
      cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
      padding: 0;
    }

    .bubble-header nav button:hover,
    .bubble-header nav button.is-active {
      text-decoration: underline;
      text-underline-offset: 5px;
    }

    .bubble-page-content {
      margin: clamp(18px, 2.2vw, 42px) clamp(16px, 2.03vw, 39px) 0;
      min-width: 0;
    }

    .bubble-page-banner {
      background: #f37319;
      border: 2px solid #181818;
      box-shadow: 4px 5px 0 #181818;
      color: #fff;
      margin-bottom: clamp(24px, 3vw, 56px);
      padding: clamp(16px, 1.35vw, 26px) clamp(18px, 1.56vw, 30px);
    }

    .bubble-page-banner h1 {
      font-size: clamp(28px, 2.6vw, 50px);
      font-weight: 400;
      line-height: 1.05;
      margin: 0 0 4px;
    }

    .bubble-page-banner p {
      font-size: clamp(14px, 1.04vw, 20px);
      line-height: 1.35;
      margin: 0;
    }

    .bubble-primary-button,
    .bubble-light-button {
      align-items: center;
      background: #f37319;
      border: 2px solid #181818;
      box-shadow: 3px 4px 0 #181818;
      color: #fff;
      cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
      display: inline-flex;
      font-size: clamp(13px, 0.94vw, 18px);
      justify-content: center;
      line-height: 1.15;
      min-height: 34px;
      padding: 5px 12px;
      text-align: center;
    }

    .bubble-light-button {
      background: #fff;
      color: #181818;
    }

    .bubble-primary-button:hover,
    .bubble-light-button:hover,
    .bubble-attach-photo:hover,
    .bubble-publish:hover {
      filter: brightness(0.96);
      transform: translate(-1px, -1px);
    }

    .bubble-primary-button:disabled {
      cursor: not-allowed;
      opacity: 0.55;
      transform: none;
    }

    .bubble-text-link {
      background: transparent;
      border: 0;
      color: #1260a4;
      padding: 0;
      text-decoration: underline;
    }

    .bubble-visually-hidden {
      clip: rect(0, 0, 0, 0);
      clip-path: inset(50%);
      height: 1px;
      overflow: hidden;
      position: absolute;
      white-space: nowrap;
      width: 1px;
    }

    .bubble-profile-cover {
      background:
        radial-gradient(ellipse at 14% 22%, #fff 0 6%, transparent 6.5%),
        radial-gradient(ellipse at 27% 18%, #fff 0 8%, transparent 8.5%),
        radial-gradient(ellipse at 69% 20%, #fff 0 7%, transparent 7.5%),
        radial-gradient(ellipse at 81% 27%, #fff 0 10%, transparent 10.5%),
        linear-gradient(180deg, #9ed4f4 0%, #d2eeff 57%, #77bf68 57.5%, #5dad54 100%);
      border: 2px solid #181818;
      box-shadow: 4px 5px 0 #181818;
      margin-bottom: clamp(28px, 3vw, 58px);
      min-height: clamp(260px, 27vw, 520px);
      overflow: hidden;
      position: relative;
    }

    .bubble-cover-cloud {
      background: #fff;
      height: clamp(28px, 4vw, 76px);
      opacity: 0.88;
      position: absolute;
      width: clamp(90px, 16vw, 305px);
    }

    .bubble-cover-cloud-one {
      border-radius: 50%;
      left: 12%;
      top: 18%;
    }

    .bubble-cover-cloud-two {
      border-radius: 50%;
      right: 9%;
      top: 11%;
      transform: scale(1.25);
    }

    .bubble-profile-summary {
      align-items: center;
      background: #fff;
      border-top: 2px solid #181818;
      bottom: 0;
      display: flex;
      gap: clamp(16px, 1.5vw, 30px);
      left: 0;
      min-height: clamp(125px, 9vw, 175px);
      padding: clamp(12px, 1.5vw, 28px) clamp(18px, 3vw, 58px);
      position: absolute;
      right: 0;
    }

    .bubble-profile-summary > img {
      align-self: flex-end;
      border: 3px solid #181818;
      box-shadow: 3px 4px 0 #181818;
      flex: 0 0 clamp(92px, 10.4vw, 200px);
      height: clamp(92px, 10.4vw, 200px);
      object-fit: cover;
      transform: translateY(-14px);
      width: clamp(92px, 10.4vw, 200px);
    }

    .bubble-profile-copy {
      flex: 1;
      min-width: 0;
    }

    .bubble-profile-copy h2 {
      font-size: clamp(24px, 2vw, 38px);
      font-weight: 400;
      line-height: 1.1;
      margin: 0 0 3px;
    }

    .bubble-profile-copy p {
      font-size: clamp(14px, 1vw, 19px);
      margin: 0;
    }

    .bubble-profile-copy .bubble-profile-about {
      font-size: clamp(16px, 1.15vw, 22px);
      margin-top: clamp(10px, 1vw, 20px);
    }

    .bubble-profile-summary > .bubble-primary-button {
      flex: 0 0 auto;
      margin-left: auto;
    }

    .bubble-edit-profile {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 12px;
    }

    .bubble-edit-profile label {
      display: flex;
      flex: 1 1 260px;
      flex-direction: column;
      font-size: 13px;
      gap: 4px;
    }

    .bubble-edit-profile input,
    .bubble-inline-create input,
    .bubble-create-community input {
      border: 1px solid #737373;
      min-width: 0;
      padding: 6px 8px;
      width: 100%;
    }

    .bubble-edit-profile > div {
      align-items: end;
      display: flex;
      gap: 8px;
    }

    .bubble-edit-profile > div button,
    .bubble-request-actions > button:not(.bubble-primary-button) {
      background: #fff;
      border: 1px solid #181818;
      padding: 5px 10px;
    }

    .bubble-profile-columns {
      align-items: start;
      display: grid;
      gap: clamp(18px, 2.5vw, 48px);
      grid-template-columns: minmax(0, 2.15fr) minmax(235px, 0.9fr);
    }

    .bubble-profile-timeline,
    .bubble-profile-details {
      min-width: 0;
    }

    .bubble-profile-friends {
      display: grid;
      gap: 10px;
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .bubble-profile-friends button {
      background: transparent;
      border: 0;
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
      padding: 0;
      text-align: left;
    }

    .bubble-profile-friends img {
      border: 1px solid #181818;
      height: clamp(42px, 4vw, 76px);
      object-fit: cover;
      width: clamp(42px, 4vw, 76px);
    }

    .bubble-profile-friends span {
      font-size: clamp(11px, 0.8vw, 15px);
      overflow-wrap: anywhere;
    }

    .bubble-profile-details .bubble-side-panel-body > p {
      line-height: 1.5;
      margin: 0 0 12px;
    }

    .bubble-comment-form {
      display: flex;
      gap: 8px;
      margin-top: 12px;
    }

    .bubble-comment-form input {
      border: 1px solid #999;
      flex: 1;
      min-width: 0;
      padding: 6px 8px;
    }

    .bubble-comment-form button {
      background: #fff;
      border: 1px solid #31302c;
      padding: 5px 10px;
    }

    .bubble-comment {
      border-top: 1px solid #ddd;
      font-size: 13px !important;
      margin: 9px 0 0 !important;
      padding-top: 7px;
    }

    .bubble-friends-layout,
    .bubble-community-layout {
      align-items: start;
      display: grid;
      gap: clamp(18px, 2vw, 38px);
      grid-template-columns: minmax(0, 3fr) minmax(260px, 0.88fr);
    }

    .bubble-friends-main,
    .bubble-friends-aside,
    .bubble-community-main,
    .bubble-community-aside {
      min-width: 0;
    }

    .bubble-friend-toolbar,
    .bubble-community-toolbar {
      align-items: center;
      background: #f37319;
      border: 2px solid #181818;
      box-shadow: 3px 4px 0 #181818;
      color: #fff;
      display: flex;
      gap: 16px;
      justify-content: space-between;
      margin-bottom: clamp(18px, 2vw, 38px);
      min-height: 58px;
      padding: 8px 16px;
    }

    .bubble-friend-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: clamp(8px, 1.5vw, 28px);
    }

    .bubble-friend-tabs button {
      background: transparent;
      border: 1px solid transparent;
      color: #fff;
      padding: 6px 12px;
      white-space: nowrap;
    }

    .bubble-friend-tabs button.is-active {
      background: #fff;
      border: 2px solid #181818;
      box-shadow: 2px 3px 0 #181818;
      color: #181818;
    }

    .bubble-list-search,
    .bubble-inbox-search {
      align-items: center;
      background: #fff;
      border: 1px solid #737373;
      color: #181818;
      display: flex;
      flex: 0 1 360px;
      min-width: 145px;
    }

    .bubble-list-search input,
    .bubble-inbox-search input {
      background: transparent;
      border: 0;
      min-width: 0;
      padding: 7px 10px;
      width: 100%;
    }

    .bubble-list-search > span:last-child,
    .bubble-inbox-search > span:last-child {
      border-left: 1px solid #aaa;
      flex: 0 0 34px;
      font-size: 22px;
      line-height: 1;
      text-align: center;
    }

    .bubble-friend-grid {
      display: grid;
      gap: clamp(14px, 1.8vw, 34px);
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .bubble-friend-card {
      background: #fff;
      border: 2px solid #181818;
      box-shadow: 4px 5px 0 #181818;
      display: grid;
      grid-template-columns: clamp(86px, 11.6vw, 223px) minmax(0, 1fr) 22px;
      grid-template-rows: auto 1fr auto;
      min-height: clamp(130px, 12vw, 230px);
      position: relative;
    }

    .bubble-friend-photo {
      border-right: 2px solid #181818;
      grid-row: 1 / 4;
      height: 100%;
      min-height: 128px;
      object-fit: cover;
      width: 100%;
    }

    .bubble-friend-info {
      min-width: 0;
      padding: clamp(10px, 1vw, 20px);
    }

    .bubble-friend-info h2 {
      align-items: center;
      display: flex;
      font-size: clamp(17px, 1.45vw, 28px);
      font-weight: 400;
      gap: 5px;
      line-height: 1.1;
      margin: 0 0 3px;
    }

    .bubble-friend-info p {
      font-size: clamp(12px, 0.92vw, 18px);
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .bubble-friend-info small {
      color: #757575;
      display: block;
      font-size: clamp(11px, 0.83vw, 16px);
      margin-top: clamp(10px, 1.2vw, 22px);
    }

    .bubble-card-menu {
      align-self: start;
      background: transparent;
      border: 0;
      font-size: 22px;
      padding: 4px 1px;
    }

    .bubble-online-dot {
      background: #38a92c;
      border-radius: 50%;
      display: inline-block;
      height: 9px;
      width: 9px;
    }

    .bubble-friend-status {
      align-self: end;
      color: #555;
      font-size: 12px;
      grid-column: 2 / 4;
      padding: 0 10px 10px;
    }

    .bubble-request-actions {
      display: flex;
      gap: 8px;
      grid-column: 2 / 4;
      padding: 0 10px 10px;
    }

    .bubble-request-actions button {
      font-size: 12px;
      min-height: 28px;
      padding: 3px 8px;
    }

    .bubble-friends-aside .bubble-side-panel,
    .bubble-community-aside .bubble-side-panel {
      margin-bottom: clamp(16px, 1.5vw, 28px);
    }

    .bubble-friends-aside .bubble-side-panel-body,
    .bubble-community-aside .bubble-side-panel-body {
      min-height: auto;
    }

    .bubble-summary-stats p {
      align-items: center;
      border-bottom: 1px solid #b9b9b9;
      color: #181818;
      display: flex;
      font-size: clamp(14px, 1vw, 19px);
      justify-content: space-between;
      margin: 0;
      padding: 7px 0;
    }

    .bubble-summary-stats p:last-of-type {
      border-bottom: 0;
    }

    .bubble-summary-stats .bubble-primary-button {
      display: flex;
      font-size: 13px;
      margin: 12px auto 0;
      min-height: 30px;
      width: min(100%, 250px);
    }

    .bubble-suggested-person {
      align-items: start;
      border-bottom: 1px solid #bbb;
      display: grid;
      gap: 10px;
      grid-template-columns: 56px minmax(0, 1fr);
      padding: 8px 0 12px;
    }

    .bubble-suggested-person:last-child {
      border-bottom: 0;
    }

    .bubble-suggested-person > img {
      border: 1px solid #181818;
      height: 56px;
      object-fit: cover;
      width: 56px;
    }

    .bubble-suggested-person > div {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .bubble-suggested-person strong {
      font-size: 15px;
      font-weight: 400;
    }

    .bubble-suggested-person small {
      color: #666;
      font-size: 11px;
      margin: 2px 0 7px;
    }

    .bubble-suggested-person button {
      align-self: flex-start;
      font-size: 12px;
      min-height: 27px;
      padding: 3px 8px;
    }

    .bubble-inline-create {
      display: flex;
      gap: 6px;
      margin-top: 10px;
    }

    .bubble-inline-create button {
      flex: 0 0 auto;
      margin: 0;
      width: auto;
    }

    .bubble-empty-state {
      background: #fff;
      border: 2px dashed #aaa;
      color: #555;
      padding: 34px 18px;
      text-align: center;
    }

    .bubble-empty-state h2 {
      color: #31302c;
      font-size: 22px;
      font-weight: 400;
      margin: 0 0 8px;
    }

    .bubble-empty-state p {
      margin: 0;
    }

    .bubble-community-feature {
      border: 2px solid #181818;
      box-shadow: 4px 5px 0 #181818;
      display: grid;
      grid-template-columns: minmax(220px, 0.62fr) minmax(0, 1fr);
      margin-bottom: clamp(26px, 2.6vw, 50px);
      min-height: clamp(230px, 29vw, 558px);
    }

    .bubble-community-feature-art {
      align-items: center;
      background:
        radial-gradient(ellipse at 70% 25%, rgb(255 255 255 / 70%) 0 8%, transparent 8.5%),
        linear-gradient(140deg, #53616d, #a7b9c7 45%, #27313c);
      border-right: 2px solid #181818;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-height: 230px;
      overflow: hidden;
      position: relative;
      text-shadow: 2px 2px #181818;
    }

    .bubble-community-feature-art::after {
      background: linear-gradient(0deg, rgb(0 0 0 / 30%), transparent 60%);
      content: "";
      inset: 0;
      position: absolute;
    }

    .bubble-community-feature-art span {
      font-size: clamp(90px, 14vw, 270px);
      line-height: 1;
      position: relative;
      z-index: 1;
    }

    .bubble-community-feature-art small {
      bottom: 13px;
      font-size: 12px;
      left: 14px;
      position: absolute;
      text-transform: uppercase;
      z-index: 1;
    }

    .bubble-community-feature-copy {
      align-content: center;
      background: #f37319;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: clamp(20px, 2.5vw, 48px);
    }

    .bubble-community-feature-copy > small {
      font-size: clamp(12px, 0.9vw, 17px);
      text-transform: uppercase;
    }

    .bubble-community-feature-copy h2 {
      font-size: clamp(27px, 3vw, 58px);
      font-weight: 400;
      line-height: 1.08;
      margin: 7px 0;
    }

    .bubble-community-feature-copy p {
      font-size: clamp(14px, 1.15vw, 22px);
      line-height: 1.4;
      margin: 0 0 18px;
      max-width: 750px;
    }

    .bubble-community-feature-copy > div {
      display: flex;
      flex-wrap: wrap;
      font-size: clamp(12px, 0.85vw, 16px);
      gap: 20px;
      margin: 0 0 18px;
    }

    .bubble-community-feature-copy .bubble-light-button {
      align-self: flex-start;
    }

    .bubble-community-toolbar {
      margin-bottom: clamp(18px, 2vw, 38px);
    }

    .bubble-community-toolbar strong {
      font-size: clamp(15px, 1vw, 19px);
      font-weight: 400;
    }

    .bubble-community-toolbar label {
      align-items: center;
      display: flex;
      gap: 8px;
      white-space: nowrap;
    }

    .bubble-community-toolbar select {
      border: 1px solid #aaa;
      color: #31302c;
      min-width: 135px;
      padding: 4px 7px;
    }

    .bubble-community-list {
      display: flex;
      flex-direction: column;
      gap: clamp(16px, 1.7vw, 32px);
    }

    .bubble-community-card {
      align-items: stretch;
      background: #fff;
      border: 2px solid #181818;
      box-shadow: 4px 5px 0 #181818;
      display: grid;
      grid-template-columns: clamp(82px, 12vw, 230px) minmax(0, 1fr);
      min-height: clamp(130px, 12vw, 230px);
    }

    .bubble-community-art {
      align-items: center;
      background: #d8e6f8;
      border-right: 2px solid #181818;
      display: flex;
      font-size: clamp(36px, 5.5vw, 106px);
      justify-content: center;
      min-height: 100%;
    }

    .bubble-community-art.art-1 { background: #ffe3c9; }
    .bubble-community-art.art-2 { background: #d9eec8; }
    .bubble-community-art.art-3 { background: #f9dfec; }
    .bubble-community-art.art-4 { background: #d7edf0; }
    .bubble-community-art.art-5 { background: #f4ecc8; }

    .bubble-community-card > div {
      align-self: center;
      min-width: 0;
      padding: clamp(10px, 1vw, 20px);
    }

    .bubble-community-card small {
      color: #f37319;
      font-size: clamp(11px, 0.78vw, 15px);
    }

    .bubble-community-card h2 {
      font-size: clamp(17px, 1.5vw, 29px);
      font-weight: 400;
      line-height: 1.1;
      margin: 2px 0;
    }

    .bubble-community-card p {
      font-size: clamp(12px, 0.9vw, 17px);
      line-height: 1.2;
      margin: 0 0 5px;
    }

    .bubble-member-count {
      color: #666;
      display: block;
      font-size: 11px;
      margin: 0 0 7px;
    }

    .bubble-community-card .bubble-primary-button {
      font-size: 13px;
      min-height: 29px;
      padding: 3px 9px;
    }

    .bubble-my-community {
      align-items: center;
      border-bottom: 1px solid #bbb;
      display: grid;
      gap: 10px;
      grid-template-columns: 52px minmax(0, 1fr);
      padding: 7px 0;
    }

    .bubble-my-community:last-child {
      border: 0;
    }

    .bubble-my-community > span {
      align-items: center;
      background: #d8e6f8;
      border: 1px solid #181818;
      display: flex;
      font-size: 24px;
      height: 52px;
      justify-content: center;
    }

    .bubble-my-community div {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .bubble-my-community strong {
      font-size: 13px;
      font-weight: 400;
      line-height: 1.2;
    }

    .bubble-my-community small {
      color: #666;
      font-size: 11px;
      margin-top: 3px;
    }

    .bubble-category-grid {
      background: #fff;
      border: 2px solid #181818;
      box-shadow: 4px 5px 0 #181818;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      margin-bottom: 24px;
      padding: 8px;
    }

    .bubble-category-grid button {
      background: transparent;
      border: 0;
      border-bottom: 1px solid #ddd;
      display: flex;
      font-size: 12px;
      justify-content: space-between;
      padding: 7px 4px;
      text-align: left;
    }

    .bubble-category-grid span {
      color: #f37319;
      margin-left: 5px;
    }

    .bubble-create-invite {
      background: #f37319;
      border: 2px solid #181818;
      box-shadow: 4px 5px 0 #181818;
      color: #fff;
      padding: clamp(16px, 1.4vw, 27px);
    }

    .bubble-create-invite h2 {
      font-size: clamp(18px, 1.4vw, 27px);
      font-weight: 400;
      margin: 0 0 5px;
    }

    .bubble-create-invite p {
      font-size: clamp(13px, 0.9vw, 17px);
      line-height: 1.35;
      margin: 0 0 14px;
    }

    .bubble-create-community {
      align-items: end;
      background: #fff8ef;
      border: 2px solid #181818;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 16px;
      padding: 12px;
    }

    .bubble-create-community label {
      display: flex;
      flex: 1 1 230px;
      flex-direction: column;
      font-size: 13px;
      gap: 5px;
    }

    .bubble-create-community > button:not(.bubble-primary-button) {
      background: #fff;
      border: 1px solid #181818;
      min-height: 34px;
      padding: 4px 10px;
    }

    .bubble-messenger {
      border: 2px solid #181818;
      box-shadow: 4px 5px 0 #181818;
      display: grid;
      grid-template-columns: minmax(265px, 0.56fr) minmax(0, 1.74fr);
      min-height: clamp(560px, 68vw, 1300px);
    }

    .bubble-inbox {
      background: #fff;
      border-right: 2px solid #181818;
      min-width: 0;
    }

    .bubble-inbox > h2 {
      background: #f37319;
      border-bottom: 2px solid #181818;
      color: #fff;
      font-size: clamp(21px, 1.8vw, 34px);
      font-weight: 400;
      margin: 0;
      padding: clamp(12px, 1.2vw, 23px);
      text-align: center;
    }

    .bubble-inbox-search {
      margin: 12px;
      width: calc(100% - 24px);
    }

    .bubble-conversation-list {
      border-top: 1px solid #aaa;
    }

    .bubble-conversation {
      align-items: center;
      background: #fff;
      border: 0;
      border-bottom: 1px solid #b7b7b7;
      display: grid;
      gap: 12px;
      grid-template-columns: clamp(58px, 5.6vw, 108px) minmax(0, 1fr) auto;
      min-height: clamp(84px, 8.2vw, 158px);
      padding: 9px;
      text-align: left;
      width: 100%;
    }

    .bubble-conversation:hover,
    .bubble-conversation.is-active {
      background: #ffddc7;
    }

    .bubble-conversation.is-active {
      border-left: 5px solid #f37319;
      padding-left: 4px;
    }

    .bubble-conversation > img {
      border: 2px solid #181818;
      height: clamp(58px, 5.6vw, 108px);
      object-fit: cover;
      width: clamp(58px, 5.6vw, 108px);
    }

    .bubble-conversation-copy {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .bubble-conversation-copy strong {
      font-size: clamp(15px, 1.3vw, 25px);
      font-weight: 400;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .bubble-conversation-copy small {
      color: #666;
      font-size: clamp(11px, 0.9vw, 17px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .bubble-conversation-stamp {
      align-self: end;
      color: #666;
      font-size: 11px;
      white-space: nowrap;
    }

    .bubble-conversation-stamp b {
      background: #f37319;
      border: 1px solid #181818;
      color: #181818;
      display: block;
      margin-bottom: 3px;
      padding: 1px 5px;
      text-align: center;
    }

    .bubble-chat {
      background: #f3f3f3;
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .bubble-chat-header {
      align-items: center;
      background: #f37319;
      border-bottom: 2px solid #181818;
      color: #fff;
      display: flex;
      gap: 12px;
      min-height: clamp(72px, 6.3vw, 122px);
      padding: 10px clamp(12px, 1.5vw, 28px);
    }

    .bubble-chat-header > img {
      border: 2px solid #181818;
      height: clamp(48px, 5.2vw, 100px);
      object-fit: cover;
      width: clamp(48px, 5.2vw, 100px);
    }

    .bubble-chat-header > div {
      display: flex;
      flex: 1;
      flex-direction: column;
    }

    .bubble-chat-header strong {
      font-size: clamp(17px, 1.35vw, 26px);
      font-weight: 400;
    }

    .bubble-chat-header small {
      font-size: clamp(12px, 0.9vw, 17px);
    }

    .bubble-chat-history {
      display: flex;
      flex: 1;
      flex-direction: column;
      gap: clamp(16px, 2.2vw, 42px);
      min-height: 390px;
      overflow-y: auto;
      padding: clamp(18px, 2.5vw, 48px) clamp(14px, 1.5vw, 29px);
    }

    .bubble-chat-message {
      border: 1px solid #181818;
      box-shadow: 2px 3px 0 #181818;
      max-width: min(68%, 510px);
      padding: 10px 12px 6px;
    }

    .bubble-chat-message.is-theirs {
      align-self: flex-start;
      background: #fff;
    }

    .bubble-chat-message.is-mine {
      align-self: flex-end;
      background: #ffddc7;
    }

    .bubble-chat-message p {
      font-size: clamp(12px, 0.92vw, 18px);
      line-height: 1.3;
      margin: 0 0 5px;
      overflow-wrap: anywhere;
    }

    .bubble-chat-message small {
      display: block;
      font-size: 10px;
      text-align: right;
    }

    .bubble-chat-composer {
      background: #fff;
      border-top: 2px solid #181818;
      display: flex;
      gap: 10px;
      padding: 12px;
    }

    .bubble-chat-composer input {
      border: 1px solid #858585;
      flex: 1;
      min-width: 0;
      padding: 9px 10px;
    }

    .bubble-footer nav button {
      background: transparent;
      border: 0;
      color: #fff;
      font-size: clamp(14px, 0.83vw, 16px);
      padding: 0;
    }

    .bubble-footer nav button:hover {
      text-decoration: underline;
    }

    @media (max-width: 980px) {
      .bubble-profile-columns,
      .bubble-friends-layout,
      .bubble-community-layout {
        grid-template-columns: minmax(0, 1fr);
      }

      .bubble-friends-aside,
      .bubble-community-aside {
        display: grid;
        gap: 12px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .bubble-community-aside .bubble-create-invite {
        grid-column: 1 / -1;
      }

      .bubble-messenger {
        grid-template-columns: minmax(220px, 0.72fr) minmax(0, 1.4fr);
      }

      .bubble-conversation {
        grid-template-columns: 54px minmax(0, 1fr);
      }

      .bubble-conversation-stamp {
        display: none;
      }
    }

    @media (max-width: 720px) {
      .bubble-page-content {
        margin-left: 12px;
        margin-right: 12px;
      }

      .bubble-profile-summary {
        align-items: flex-start;
        flex-wrap: wrap;
        gap: 8px 12px;
        padding: 12px;
      }

      .bubble-profile-summary > img {
        flex-basis: 74px;
        height: 74px;
        transform: none;
        width: 74px;
      }

      .bubble-profile-copy {
        flex: 1 1 calc(100% - 100px);
      }

      .bubble-profile-summary > .bubble-primary-button {
        margin-left: 86px;
      }

      .bubble-profile-cover {
        min-height: 310px;
      }

      .bubble-friend-grid {
        grid-template-columns: minmax(0, 1fr);
      }

      .bubble-friend-toolbar {
        align-items: stretch;
        flex-direction: column;
      }

      .bubble-list-search {
        flex-basis: 36px;
        width: 100%;
      }

      .bubble-community-feature {
        grid-template-columns: minmax(0, 1fr);
      }

      .bubble-community-feature-art {
        border-bottom: 2px solid #181818;
        border-right: 0;
        min-height: 200px;
      }

      .bubble-community-feature-art span {
        font-size: 120px;
      }

      .bubble-community-toolbar {
        align-items: flex-start;
        flex-direction: column;
      }

      .bubble-messenger {
        grid-template-columns: minmax(0, 1fr);
      }

      .bubble-inbox {
        border-bottom: 2px solid #181818;
        border-right: 0;
      }

      .bubble-conversation-list {
        display: flex;
        max-height: 180px;
        overflow-x: auto;
      }

      .bubble-conversation {
        flex: 0 0 210px;
        grid-template-columns: 48px minmax(0, 1fr);
      }

      .bubble-conversation > img {
        height: 48px;
        width: 48px;
      }

      .bubble-chat-history {
        min-height: 340px;
      }

      .bubble-friends-aside,
      .bubble-community-aside {
        grid-template-columns: minmax(0, 1fr);
      }

      .bubble-community-aside .bubble-create-invite {
        grid-column: auto;
      }
    }

    @media (max-width: 480px) {
      .bubble-profile-columns {
        gap: 14px;
      }

      .bubble-profile-summary > .bubble-primary-button {
        margin-left: 0;
      }

      .bubble-profile-friends {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .bubble-friend-card {
        grid-template-columns: 86px minmax(0, 1fr) 20px;
      }

      .bubble-friend-photo {
        min-height: 112px;
      }

      .bubble-community-card {
        grid-template-columns: 72px minmax(0, 1fr);
      }

      .bubble-community-card h2 {
        font-size: 16px;
      }

      .bubble-community-feature-copy {
        padding: 16px;
      }

      .bubble-chat-header .bubble-light-button {
        font-size: 12px;
        padding: 4px 7px;
      }

      .bubble-chat-composer {
        padding: 8px;
      }

      .bubble-chat-composer .bubble-primary-button {
        padding-left: 8px;
        padding-right: 8px;
      }
    }
  }

  @container bubble-site (max-width: 980px) {
    .site-bubble .bubble-header {
      flex-wrap: wrap;
      gap: 8px 12px;
      padding-bottom: 8px;
      padding-top: 8px;
    }

    .site-bubble .bubble-header nav {
      flex: 1 0 100%;
      justify-content: flex-start;
      order: 3;
      overflow-x: auto;
    }

    .site-bubble .bubble-header .bubble-top-search {
      flex: 1 1 210px;
      min-width: 100px;
    }

    .site-bubble .bubble-content-grid {
      grid-template-columns: minmax(0, 2fr) minmax(180px, 1fr);
    }

    .site-bubble .bubble-profile-columns,
    .site-bubble .bubble-friends-layout,
    .site-bubble .bubble-community-layout {
      grid-template-columns: minmax(0, 1fr);
    }

    .site-bubble .bubble-friends-aside,
    .site-bubble .bubble-community-aside {
      display: grid;
      gap: 12px;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .site-bubble .bubble-community-aside .bubble-create-invite {
      grid-column: 1 / -1;
    }

    .site-bubble .bubble-messenger {
      grid-template-columns: minmax(220px, 0.72fr) minmax(0, 1.4fr);
    }

    .site-bubble .bubble-conversation {
      grid-template-columns: 54px minmax(0, 1fr);
    }

    .site-bubble .bubble-conversation-stamp {
      display: none;
    }
  }

  @container bubble-site (max-width: 720px) {
    .site-bubble .bubble-content-grid,
    .site-bubble .bubble-profile-columns,
    .site-bubble .bubble-friends-layout,
    .site-bubble .bubble-community-layout {
      grid-template-columns: minmax(0, 1fr);
    }

    .site-bubble .bubble-content-grid {
      margin-left: 12px;
      margin-right: 12px;
    }

    .site-bubble .bubble-page-content {
      margin-left: 12px;
      margin-right: 12px;
    }

    .site-bubble .bubble-sidebar {
      display: grid;
      gap: 14px;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .site-bubble .bubble-profile-card {
      grid-column: 1 / -1;
    }

    .site-bubble .bubble-friend-grid {
      grid-template-columns: minmax(0, 1fr);
    }

    .site-bubble .bubble-friend-toolbar,
    .site-bubble .bubble-community-toolbar {
      align-items: stretch;
      flex-direction: column;
    }

    .site-bubble .bubble-list-search {
      flex-basis: 36px;
      width: 100%;
    }

    .site-bubble .bubble-community-feature {
      grid-template-columns: minmax(0, 1fr);
    }

    .site-bubble .bubble-community-feature-art {
      border-bottom: 2px solid #181818;
      border-right: 0;
      min-height: 200px;
    }

    .site-bubble .bubble-community-feature-art span {
      font-size: 120px;
    }

    .site-bubble .bubble-community-toolbar {
      align-items: flex-start;
    }

    .site-bubble .bubble-messenger {
      grid-template-columns: minmax(0, 1fr);
    }

    .site-bubble .bubble-inbox {
      border-bottom: 2px solid #181818;
      border-right: 0;
    }

    .site-bubble .bubble-conversation-list {
      display: flex;
      max-height: 180px;
      overflow-x: auto;
    }

    .site-bubble .bubble-conversation {
      flex: 0 0 210px;
      grid-template-columns: 48px minmax(0, 1fr);
    }

    .site-bubble .bubble-conversation > img {
      height: 48px;
      width: 48px;
    }

    .site-bubble .bubble-chat-history {
      min-height: 340px;
    }

    .site-bubble .bubble-friends-aside,
    .site-bubble .bubble-community-aside {
      grid-template-columns: minmax(0, 1fr);
    }

    .site-bubble .bubble-community-aside .bubble-create-invite {
      grid-column: auto;
    }

    .site-bubble .bubble-profile-cover {
      min-height: 310px;
    }

    .site-bubble .bubble-profile-summary {
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 8px 12px;
      padding: 12px;
    }

    .site-bubble .bubble-profile-summary > img {
      flex-basis: 74px;
      height: 74px;
      transform: none;
      width: 74px;
    }

    .site-bubble .bubble-profile-copy {
      flex: 1 1 calc(100% - 100px);
    }

    .site-bubble .bubble-profile-summary > .bubble-primary-button {
      margin-left: 86px;
    }

    .site-bubble .bubble-community-card {
      grid-template-columns: 82px minmax(0, 1fr);
    }

    .site-bubble .bubble-friend-card {
      grid-template-columns: 90px minmax(0, 1fr) 20px;
    }

    .site-bubble .bubble-friend-photo {
      min-height: 112px;
    }

    .site-bubble .bubble-profile-friends {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .site-bubble .bubble-profile-summary > .bubble-primary-button {
      margin-left: 0;
    }

    .site-bubble .bubble-community-feature-copy {
      padding: 16px;
    }
  }

  @container bubble-site (max-width: 480px) {
    .site-bubble .bubble-header {
      padding-left: 12px;
      padding-right: 12px;
    }

    .site-bubble .bubble-profile-card {
      grid-column: auto;
    }

    .site-bubble .bubble-community-card {
      grid-template-columns: 72px minmax(0, 1fr);
    }

    .site-bubble .bubble-community-card h2 {
      font-size: 16px;
    }

    .site-bubble .bubble-chat-header .bubble-light-button {
      font-size: 12px;
      padding: 4px 7px;
    }

    .site-bubble .bubble-chat-composer {
      padding: 8px;
    }

    .site-bubble .bubble-chat-composer .bubble-primary-button {
      padding-left: 8px;
      padding-right: 8px;
    }
  }

  .site-encicloweb {
    background: #f3f3f3;
    min-height: 100%;
    padding: 18px;

    .wiki-header {
      align-items: center;
      display: flex;
      gap: 12px;
      justify-content: space-between;
      margin-bottom: 18px;

      .wiki-brand {
        align-items: center;
        display: flex;
        gap: 8px;
        min-width: 0;

        img {
          flex: 0 0 auto;
          height: 52px;
          object-fit: contain;
          width: 48px;
        }

        strong {
          display: block;
          font-size: clamp(17px, 3vw, 26px);
        }

        small {
          color: #585858;
          display: block;
          font-size: 12px;
        }
      }

      .wiki-search {
        flex: 0 1 330px;
        min-width: 140px;
      }
    }

    .wiki-layout {
      display: grid;
      gap: 14px;
      grid-template-columns: minmax(145px, 0.23fr) minmax(0, 1fr);
    }

    .wiki-sidebar,
    .wiki-article {
      background: #fff;
      border: 1px solid #31302c;
      box-shadow: 3px 3px 0 #31302c;
    }

    .wiki-sidebar {
      align-self: start;
      padding: 13px 11px;

      h3 {
        font-size: 15px;
        margin: 0 0 8px;
      }

      button {
        background: none;
        border: 0;
        color: #0645ad;
        display: block;
        padding: 5px 0;
        text-align: left;
        text-decoration: underline;
        width: 100%;
      }
    }

    .wiki-article {
      line-height: 1.55;
      padding: clamp(14px, 2.5vw, 25px);

      h1 {
        font-size: clamp(21px, 3vw, 29px);
        line-height: 1.2;
        margin: 0 0 13px;
      }

      h2 {
        border-bottom: 1px solid #aaa;
        font-size: 19px;
        margin: 20px 0 8px;
      }

      p {
        margin: 10px 0;
      }

      .wiki-infobox {
        background: #f3f3f3;
        border: 1px solid #aaa;
        float: right;
        margin: 0 0 12px 14px;
        max-width: 190px;
        padding: 12px;
      }
    }

    .wiki-article {
      .wiki-how-to-list {
        margin: 14px 0 24px;
        padding-left: 24px;

        li {
          margin: 5px 0;
        }
      }

      .wiki-founder-note,
      .wiki-author-card {
        background: #dedede;
        border: 1px solid #aaa;
        margin: 20px 0 0;
        padding: 14px;

        p {
          margin: 0;
        }
      }

      .wiki-essay-columns {
        display: grid;
        gap: clamp(14px, 2vw, 26px);
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .wiki-essay-column {
        min-width: 0;
      }

      .wiki-essay-section {
        margin: 0 0 12px;

        h2 {
          border: 0;
          font-size: 14px;
          line-height: 1.25;
          margin: 0 0 5px;
        }

        p {
          font-size: 13px;
          line-height: 1.35;
          margin: 0 0 8px;
        }
      }

      .wiki-author-card {
        h2 {
          border: 0;
          font-size: 16px;
          margin: 0 0 6px;
        }
      }

      .wiki-disclaimer {
        border: 1px solid #aaa;
        font-size: 12px;
        margin: 10px 0 0;
        padding: 12px;
      }
    }

    @media (max-width: 700px) {
      .wiki-essay-columns {
        grid-template-columns: 1fr;
      }
    }
  }

  .site-encicloweb {
    background: #e9edf3;
    color: #31302c;
    font-family: "Pixelify Sans", monospace;
    padding: 12px 14px 18px;

    .wiki-header {
      background: #eef2f8;
      border-bottom: 1px solid #bcc6d4;
      margin: -12px -14px 12px;
      min-height: 54px;
      padding: 7px 12px;

      .wiki-brand img {
        height: 40px;
        width: 40px;
      }

      .wiki-brand strong {
        font-size: 20px;
      }

      .wiki-brand small {
        font-size: 10px;
      }
    }

    .wiki-layout {
      align-items: start;
      gap: 12px;
      grid-template-columns: minmax(185px, 0.22fr) minmax(0, 1fr);
    }

    .wiki-sidebar,
    .wiki-article {
      background: #f8faff;
      border: 2px solid #31302c;
      box-shadow: 3px 3px 0 #31302c;
    }

    .wiki-sidebar {
      padding: 12px 10px;

      h3 {
        border-bottom: 1px solid #b8bfca;
        font-size: 14px;
        margin: 0 0 5px;
        padding: 0 0 4px;
      }

      nav {
        margin-bottom: 16px;
      }

      button {
        font-size: 12px;
        line-height: 1.35;
        padding: 4px 0;
      }
    }

    .wiki-article {
      min-width: 0;
      padding: clamp(14px, 1.6vw, 24px);
    }

    .wiki-article-heading {
      align-items: start;
      display: flex;
      justify-content: space-between;
    }

    .wiki-breadcrumb {
      color: #636d7b;
      font-size: 11px;
      margin-bottom: 6px;
    }

    .wiki-article h1 {
      font-size: clamp(22px, 1.9vw, 30px);
      margin-bottom: 12px;
    }

    .wiki-page-tabs {
      border-bottom: 1px solid #9aa5b4;
      display: flex;
      gap: 4px;
      margin: -2px 0 17px;

      button {
        background: #e5ebf4;
        border: 1px solid #31302c;
        border-bottom: 0;
        color: #31302c;
        cursor: pointer;
        font: inherit;
        font-size: 12px;
        padding: 6px 14px;
      }

      button[aria-current="page"] {
        background: #f8faff;
        font-weight: 700;
        margin-bottom: -1px;
      }
    }

    .wiki-essay-columns {
      align-items: start;
      gap: clamp(14px, 1.5vw, 24px);
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .wiki-essay-section {
      break-inside: avoid;
      margin-bottom: 16px;

      h2 {
        border-bottom: 1px solid #aeb7c4;
        font-size: 16px;
        line-height: 1.3;
        margin: 12px 0 7px;
        padding-bottom: 4px;
      }

      p {
        font-size: 13px;
        line-height: 1.5;
      }
    }

    .wiki-article-lead {
      font-size: 15px;
      font-weight: 600;
      margin-bottom: 14px;
    }

    .wiki-article-figure {
      background: #eef2f8;
      border: 1px solid #31302c;
      box-shadow: 2px 2px 0 #31302c;
      margin: 8px 0 15px;
      padding: 5px;

      img {
        display: block;
        height: auto;
        max-height: 310px;
        object-fit: cover;
        width: 100%;
      }

      figcaption {
        color: #515a67;
        font-size: 10px;
        line-height: 1.35;
        padding: 5px 2px 1px;
      }
    }

    .wiki-feature-figure {
      float: right;
      margin: 2px 0 12px 16px;
      max-width: min(38%, 420px);
    }

    .wiki-inline-figure {
      float: right;
      margin-left: 10px;
      max-width: 190px;
    }

    .wiki-author-card,
    .wiki-founder-note {
      align-items: start;
      background: #e5e9ef;
      border: 1px solid #929daa;
      display: grid;
      gap: 13px;
      grid-template-columns: 124px minmax(0, 1fr);
      margin: 18px 0 0;
      padding: 11px;

      img {
        border: 1px solid #31302c;
        display: block;
        max-height: 150px;
        object-fit: cover;
        width: 100%;
      }

      .wiki-author-label {
        color: #596372;
        display: block;
        font-size: 10px;
        margin-bottom: 3px;
      }

      h2 {
        border: 0;
        font-size: 15px;
        margin: 0 0 5px;
      }

      p {
        font-size: 12px;
        line-height: 1.45;
        margin: 0;
      }
    }

    .wiki-founder-note {
      grid-template-columns: 135px minmax(0, 1fr);

      img {
        max-height: 124px;
      }
    }

    .wiki-sidebar-author {
      background: #e5e9ef;
      border: 1px solid #929daa;
      margin-top: 18px;
      padding: 9px;
      text-align: center;

      h3 {
        text-align: left;
      }

      img {
        border: 1px solid #31302c;
        height: 112px;
        object-fit: cover;
        width: 100%;
      }

      p {
        font-size: 12px;
        font-weight: 700;
        margin: 6px 0 2px;
      }

      small {
        color: #596372;
        font-size: 10px;
      }
    }

    .wiki-disclaimer,
    .wiki-legacy-information {
      background: #f0f2f5;
      border: 1px solid #a7b0bc;
      font-size: 12px;
      margin-top: 14px;
      padding: 10px 12px;
    }

    .wiki-legacy-information {
      h2 {
        font-size: 16px;
        margin: 8px 0;
      }

      p {
        font-size: 12px;
      }
    }

    .wiki-comment-form {
      background: #eef2f8;
      border: 1px solid #a7b0bc;
      display: grid;
      gap: 7px;
      margin: 14px 0 18px;
      padding: 10px;

      label {
        font-size: 12px;
        font-weight: 700;
      }

      textarea {
        background: #fff;
        border: 1px solid #697384;
        color: #31302c;
        font: inherit;
        font-size: 12px;
        min-height: 70px;
        padding: 8px;
        resize: vertical;
      }

      button {
        background: #f7edd7;
        border: 1px solid #31302c;
        box-shadow: 2px 2px 0 #31302c;
        color: #31302c;
        cursor: pointer;
        font: inherit;
        justify-self: end;
        padding: 6px 12px;
      }

      button:disabled {
        cursor: default;
        opacity: 0.55;
      }
    }

    .wiki-comment-list {
      display: grid;
      gap: 10px;
    }

    .wiki-comment {
      align-items: start;
      background: #fff;
      border: 1px solid #bcc4cf;
      display: grid;
      gap: 10px;
      grid-template-columns: 42px minmax(0, 1fr);
      padding: 9px;

      img,
      .wiki-default-avatar {
        border: 1px solid #31302c;
        height: 40px;
        object-fit: cover;
        width: 40px;
      }

      .wiki-default-avatar {
        align-items: center;
        background: #d6e0ee;
        display: flex;
        font-size: 20px;
        justify-content: center;
      }

      strong {
        font-size: 12px;
      }

      p {
        font-size: 12px;
        line-height: 1.4;
        margin: 4px 0 0;
      }
    }

    .wiki-comment-reply {
      background: #eef2f8;
      border: 0;
      border-left: 2px solid #8998ad;
      margin-top: 9px;
      margin-left: 12px;
      padding: 7px;
    }

    @media (max-width: 740px) {
      .wiki-layout {
        grid-template-columns: minmax(0, 1fr);
      }

      .wiki-sidebar {
        display: grid;
        gap: 5px 10px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .wiki-sidebar-author {
        grid-column: 1 / -1;
        max-width: 220px;
      }

      .wiki-essay-columns {
        grid-template-columns: minmax(0, 1fr);
      }

      .wiki-feature-figure {
        float: none;
        margin: 10px 0;
        max-width: 100%;
      }
    }
  }

  .site-youspace {
    background: #fff;
    min-height: 100%;

    .you-topbar {
      align-items: center;
      background: #f33;
      border-bottom: 2px solid #31302c;
      border-radius: 0 0 10px 10px;
      color: #fff;
      display: flex;
      gap: 14px;
      justify-content: space-between;
      min-height: 35px;
      padding: 4px 12px;

      nav {
        display: flex;
        flex-wrap: wrap;
        gap: 0;
      }

      button {
        background: none;
        border: 0;
        color: inherit;
        font-size: 13px;
        padding: 5px 9px;
      }

      .you-account button {
        color: #0033cf;
        text-decoration: underline;
      }
    }

    .you-brand-search {
      align-items: center;
      display: flex;
      flex-direction: column;
      gap: 9px;
      padding: 24px 16px 18px;

      img {
        height: auto;
        max-height: 42px;
        object-fit: contain;
        width: min(220px, 65%);
      }

      .site-search {
        max-width: 480px;
        width: min(100%, 480px);
      }
    }

    .you-section-title {
      border-top: 2px solid #31302c;
      font-size: 19px;
      margin: 0;
      padding: 9px 14px 4px;
    }

    .you-video-grid {
      border: 4px solid #f33;
      box-shadow:
        inset 0 0 0 4px #ff9b9b,
        3px 3px 0 #31302c;
      display: grid;
      gap: 12px;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      margin: 4px 14px 18px;
      padding: 11px;
    }

    .you-video-card {
      background: #fff;
      border: 1px solid #31302c;
      min-width: 0;
      padding: 4px;
      text-align: left;

      img {
        aspect-ratio: 16 / 9;
        border: 1px solid #31302c;
        display: block;
        object-fit: cover;
        width: 100%;
      }

      strong {
        color: #06c;
        display: block;
        font-size: 13px;
        font-weight: 400;
        margin-top: 5px;
        overflow: hidden;
        text-decoration: underline;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .you-player {
      margin: 12px auto 22px;
      max-width: 760px;
      padding: 0 16px;

      .player-screen {
        align-items: center;
        background: #161616;
        display: flex;
        justify-content: center;
        min-height: 180px;
        position: relative;

        img {
          max-height: 55vh;
          max-width: 100%;
          object-fit: contain;
        }

        button {
          background: #f33;
          border: 2px solid #fff;
          border-radius: 50%;
          color: #fff;
          font-size: 21px;
          height: 54px;
          left: 50%;
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 54px;
        }
      }

      .player-controls {
        background: #262626;
        color: #fff;
        padding: 8px 11px;
      }
    }
  }

  @media (max-width: 720px) {
    .site-bubble {
      .bubble-login-layout,
      .bubble-feed-layout,
      .wiki-layout {
        grid-template-columns: 1fr;
      }
    }

    .site-encicloweb .wiki-layout {
      grid-template-columns: 1fr;
    }

    .site-encicloweb .wiki-sidebar {
      display: flex;
      flex-wrap: wrap;
      gap: 5px 10px;

      h3 {
        flex: 0 0 100%;
      }

      button {
        width: auto;
      }
    }

    .site-youspace .you-topbar {
      align-items: flex-start;
      flex-direction: column;
      gap: 2px;
    }
  }
  .site-encicloweb {
    background: #f3f3f3; color: #292929; min-height: 100%; padding: 14px 16px 24px;

    .wiki-header {
      align-items: center; background: transparent; border: 0; display: flex;
      gap: 22px; justify-content: space-between; margin: 0 0 20px; min-height: 62px; padding: 0;
      .wiki-brand {
        gap: 10px;
        img { height: 54px; width: 54px; }
        strong { font-size: 24px; }
        small { font-size: 12px; }
      }
      .site-search { flex: 0 1 720px; margin-left: auto; max-width: 52%; }
    }

    .site-search {
      align-items: center; background: #fff; border: 2px solid #31302c;
      box-shadow: 3px 3px 0 #31302c; display: flex; min-width: 0;
      input {
        background: transparent; border: 0; color: #31302c; flex: 1 1 auto;
        font: inherit; font-size: 13px; min-width: 0; outline: 0; padding: 7px 9px;
      }
      button {
        align-items: center; background: #e9e9e9; border: 0; border-left: 2px solid #31302c;
        display: flex; flex: 0 0 38px; height: 34px; justify-content: center; padding: 5px;
        img { height: 20px; width: 20px; }
      }
    }

    .wiki-layout {
      align-items: start; display: grid; gap: 24px;
      grid-template-columns: minmax(210px, 0.24fr) minmax(0, 1fr);
    }
    .wiki-sidebar {
      align-self: start; background: transparent; border: 0; box-shadow: none;
      display: grid; gap: 14px; min-width: 0; padding: 0;
    }
    .wiki-sidebar-logo {
      align-items: center; display: flex; justify-content: center; min-height: 138px;
      img { height: 82px; object-fit: contain; width: 82px; }
    }
    .wiki-sidebar-panel {
      background: #fff; border: 2px solid #31302c; box-shadow: 4px 4px 0 #31302c;
      min-width: 0; padding: 11px 14px;
      h3 { border: 0; font-size: 15px; line-height: 1.2; margin: 0 0 7px; padding: 0; }
      nav { margin: 0; }
      button {
        background: none; border: 0; color: #0645ad; display: block; font-size: 13px;
        line-height: 1.35; padding: 3px 0; text-align: left; text-decoration: underline; width: 100%;
      }
    }
    .wiki-search-panel {
      .site-search { box-shadow: none; width: 100%; }
      .site-search button { flex-basis: 32px; height: 30px; }
    }
    .wiki-tools-panel { margin-top: 1px; }
    .wiki-sidebar-author {
      margin: 0; padding: 11px;
      h3 { margin-bottom: 10px; text-align: left; }
      img {
        display: block; height: 132px; margin: 0 auto 8px; max-height: none;
        object-fit: cover; width: min(100%, 155px);
      }
      p { color: #31302c; font-size: 13px; font-weight: 700; margin: 4px 0; text-align: left; }
      small { color: #31302c; display: block; font-size: 11px; line-height: 1.35; text-align: left; }
    }

    .wiki-article {
      background: #fff; border: 2px solid #31302c; box-shadow: 4px 4px 0 #31302c;
      line-height: 1.38; min-width: 0; padding: 18px 20px;
    }
    .wiki-article h1 {
      border-bottom: 1px solid #aaa; font-size: clamp(22px, 1.65vw, 32px);
      font-weight: 500; line-height: 1.2; margin: 0 0 14px; padding: 0 0 8px;
    }
    .wiki-article p { font-size: 13px; line-height: 1.42; margin: 8px 0 12px; }
    .wiki-content-page > h1 { margin-bottom: 12px; }
    .wiki-page-tabs {
      align-items: end; border-bottom: 1px solid #31302c; display: flex; gap: 4px;
      margin: -18px -20px 17px; padding: 0 18px;
      button {
        background: #f3f3f3; border: 1px solid #31302c; border-bottom: 0;
        color: #292929; cursor: pointer; font: inherit; font-size: 12px; line-height: 1;
        padding: 6px 14px 7px;
      }
      button[aria-current="page"] { background: #fff; font-weight: 700; margin-bottom: -1px; }
    }

    .wiki-home-page h1 { font-weight: 700; margin-bottom: 14px; }
    .wiki-how-to-list {
      margin: 6px 0 24px; padding-left: 27px;
      li { font-size: 13px; line-height: 1.4; margin: 5px 0; }
    }
    .wiki-founder-note {
      align-items: center; background: #dedede; border: 0; display: grid; gap: 18px;
      grid-template-columns: minmax(0, 1fr) minmax(160px, 29%); margin: 20px 0 0; padding: 14px;
      p { font-size: 13px; margin: 0; }
      img { border: 0; display: block; height: 100%; max-height: 280px; object-fit: cover; width: 100%; }
    }

    .wiki-essay-columns {
      align-items: start; display: grid; gap: clamp(16px, 1.5vw, 26px);
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .wiki-essay-column { min-width: 0; }
    .wiki-essay-section {
      break-inside: avoid; margin: 0 0 13px;
      h2 {
        border-bottom: 1px solid #aaa; font-size: 14px; line-height: 1.25;
        margin: 9px 0 5px; padding-bottom: 3px;
      }
      p { font-size: 12px; line-height: 1.38; margin: 0 0 8px; }
    }
    .wiki-article-lead { font-size: 13px; font-weight: 400; line-height: 1.4; margin: 0 0 10px; }
    .wiki-article-figure {
      background: #f2f2f2; border: 1px solid #aaa; box-shadow: 3px 3px 0 #31302c;
      margin: 0 0 14px; max-width: 100%; padding: 6px;
      img { display: block; height: auto; max-height: 330px; object-fit: contain; width: 100%; }
      figcaption { color: #555; font-size: 10px; line-height: 1.35; padding: 5px 2px 1px; }
    }
    .wiki-feature-figure { float: none; margin: 0 0 14px; max-width: 100%; }
    .wiki-disclaimer {
      background: #f0f0f0; border: 1px solid #999; font-size: 11px; line-height: 1.4;
      margin: 18px 0 0; padding: 9px 11px;
    }

    .wiki-comment-form {
      align-items: center; background: #fff; border: 2px solid #31302c;
      box-shadow: 3px 3px 0 #31302c; display: flex; gap: 5px; margin: 12px 0 20px; padding: 2px 5px;
      textarea {
        background: transparent; border: 0; flex: 1 1 auto; font: inherit;
        font-size: 12px; line-height: 1.2; min-height: 24px; outline: 0; padding: 5px; resize: vertical;
      }
      button {
        background: #e9e9e9; border: 1px solid #31302c; box-shadow: 1px 1px 0 #31302c;
        color: #31302c; font-size: 13px; min-width: 24px; padding: 2px 5px;
      }
    }
    .wiki-visually-hidden {
      clip: rect(0, 0, 0, 0); clip-path: inset(50%); height: 1px; overflow: hidden;
      position: absolute; white-space: nowrap; width: 1px;
    }
    .wiki-comment-list { display: grid; gap: 14px; }
    .wiki-comment {
      background: #fff; border: 2px solid #31302c; box-shadow: 3px 3px 0 #31302c;
      display: grid; gap: 8px; grid-template-columns: 28px minmax(0, 1fr);
      margin: 0; padding: 8px; width: min(78%, 620px);
      img, .wiki-default-avatar { border: 1px solid #aaa; height: 26px; object-fit: cover; width: 26px; }
      strong { font-size: 11px; }
      .wiki-comment-time { color: #888; display: inline; font-size: 9px; margin-left: 4px; }
      p { font-size: 12px; line-height: 1.32; margin: 5px 0 0; }
    }
    .wiki-comment-reply {
      background: #fff; border: 2px solid #31302c; border-left: 2px solid #31302c;
      margin: 13px 0 0 16px; padding: 8px; width: calc(100% - 18px);
    }
    .wiki-search-results > p { border-bottom: 1px solid #ddd; padding-bottom: 9px; }
    .wiki-search-results > p button {
      background: transparent; border: 0; color: #0645ad; font: inherit; font-weight: 700;
      padding: 0; text-align: left; text-decoration: underline;
    }

    @media (max-width: 720px) {
      .wiki-header {
        align-items: flex-start; flex-direction: column;
        .site-search { max-width: 100%; width: 100%; }
      }
      .wiki-layout { grid-template-columns: 1fr; }
      .wiki-sidebar { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .wiki-sidebar-logo { grid-column: 1 / -1; min-height: 70px; }
      .wiki-sidebar-author { grid-column: 1 / -1; }
      .wiki-essay-columns { grid-template-columns: 1fr; }
      .wiki-founder-note { grid-template-columns: 1fr; }
      .wiki-founder-note img { max-height: 240px; }
      .wiki-comment { width: 100%; }
      .wiki-comment-reply { width: calc(100% - 18px); }
    }
  }

  .site-encicloweb.wiki-home {
    background: #e9edf3;
    color: #31302c;
    font-family: "Pixelify Sans", monospace;
    padding: 12px 14px 18px;

    .wiki-header {
      align-items: center;
      background: transparent;
      border: 0;
      display: flex;
      gap: 20px;
      justify-content: space-between;
      margin: 0 0 12px;
      min-height: 48px;
      padding: 0;

      .wiki-brand {
        gap: 8px;

        img {
          height: 48px;
          width: 48px;
        }

        strong { font-size: 21px; }
        small { font-size: 10px; }
      }

      .site-search {
        box-shadow: 2px 2px 0 #31302c;
        flex: 0 1 430px;
        margin: 0 0 0 auto;
        max-width: 430px;
        width: 100%;
      }
    }

    .wiki-layout {
      align-items: start;
      gap: 12px;
      grid-template-columns: minmax(185px, 0.22fr) minmax(0, 1fr);
    }

    .wiki-sidebar {
      align-self: start;
      background: #f8faff;
      border: 2px solid #31302c;
      box-shadow: 3px 3px 0 #31302c;
      display: block;
      padding: 12px 10px;
    }

    .wiki-sidebar-panel {
      background: transparent;
      border: 0;
      box-shadow: none;
      padding: 0;

      h3 {
        border-bottom: 1px solid #b8bfca;
        font-size: 14px;
        margin: 0 0 6px;
        padding: 0 0 4px;
      }

      button {
        font-size: 12px;
        line-height: 1.35;
        padding: 3px 0;
      }

      & + .wiki-sidebar-panel {
        margin-top: 15px;
      }
    }

    .wiki-article {
      background: #f8faff;
      border: 2px solid #31302c;
      box-shadow: 3px 3px 0 #31302c;
      line-height: 1.4;
      min-width: 0;
      padding: clamp(14px, 1.55vw, 22px);
    }

    .wiki-home-page {
      h1 {
        border-bottom: 1px solid #aaa;
        font-size: clamp(20px, 1.75vw, 28px);
        font-weight: 600;
        line-height: 1.2;
        margin: 0 0 10px;
        padding-bottom: 5px;
      }

      h2 {
        border-bottom: 1px solid #aaa;
        font-size: clamp(15px, 1.25vw, 19px);
        line-height: 1.2;
        margin: 16px 0 6px;
        padding-bottom: 4px;
      }

      p {
        font-size: clamp(12px, 0.92vw, 14px);
        line-height: 1.42;
        margin: 7px 0 9px;
      }
    }

    .wiki-how-to-list {
      margin: 6px 0 19px;
      padding-left: 24px;

      li {
        font-size: clamp(12px, 0.9vw, 14px);
        line-height: 1.4;
        margin: 4px 0;
      }
    }

    .wiki-founder-note {
      align-items: center;
      background: #d9d9d9;
      border: 0;
      display: grid;
      gap: 16px;
      grid-template-columns: minmax(0, 1fr) minmax(160px, 31%);
      margin: 18px 0 0;
      padding: 14px;

      p {
        font-size: clamp(12px, 0.9vw, 14px);
        margin: 0;
      }

      p strong {
        display: block;
        font-size: clamp(17px, 1.45vw, 22px);
        margin-bottom: 3px;
      }

      img {
        border: 0;
        display: block;
        height: 100%;
        max-height: 240px;
        object-fit: cover;
        width: 100%;
      }
    }

    @media (max-width: 720px) {
      padding: 10px;

      .wiki-header {
        align-items: flex-start;
        flex-direction: column;
        gap: 10px;

        .site-search { margin: 0; max-width: 100%; }
      }

      .wiki-layout { grid-template-columns: 1fr; }
      .wiki-sidebar { display: grid; gap: 14px; grid-template-columns: 1fr 1fr; }
      .wiki-article { padding: 14px; }
      .wiki-founder-note { grid-template-columns: 1fr; }
      .wiki-founder-note img { max-height: 220px; }
    }
  }

  && {
    padding: 0;
  }

  && .site-bubble {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    min-height: 100%;
    padding: 0;
    width: 100%;
  }

  && .site-bubble > .bubble-header {
    flex: 0 0 auto;
    margin: 0;
    width: 100%;
  }

  && .site-bubble > .bubble-content-grid,
  && .site-bubble > .bubble-page-content {
    flex: 1 0 auto;
  }

  && .site-bubble > .bubble-footer {
    box-sizing: border-box;
    margin-top: auto;
    width: 100%;
  }

  && .site-bubble .bubble-composer textarea {
    box-sizing: border-box;
    font-family: inherit;
    margin-inline: clamp(12px, 1.56vw, 30px);
    width: calc(100% - clamp(24px, 3.12vw, 60px));
  }

  && .site-bubble .bubble-composer-title img {
    height: clamp(18px, 1.35vw, 26px);
    image-rendering: pixelated;
    object-fit: contain;
    width: clamp(18px, 1.35vw, 26px);
  }

  && .site-bubble .bubble-header nav button {
    align-items: center;
    display: inline-flex;
    gap: 5px;
    justify-content: center;
  }

  && .site-bubble .bubble-header nav button img {
    height: clamp(16px, 1.35vw, 26px);
    image-rendering: pixelated;
    object-fit: contain;
    width: clamp(16px, 1.35vw, 26px);
  }

  && .site-bubble .bubble-attach-photo > span {
    align-items: center;
    display: inline-flex;
    gap: 5px;
  }

  && .site-bubble .bubble-attach-photo img {
    height: 16px;
    width: 16px;
  }

  && .site-bubble .bubble-post-actions button {
    align-items: center;
    display: inline-flex;
    gap: 4px;
    text-decoration: underline;
  }

  && .site-bubble .bubble-post-actions button img {
    height: 15px;
    image-rendering: pixelated;
    width: 15px;
  }

  && .site-bubble .bubble-footer nav button {
    background: transparent;
    border: 0;
    color: inherit;
    cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
    font: inherit;
    padding: 0;
    text-decoration: underline;
  }

  && .site-bubble .bubble-community,
  && .site-bubble .bubble-text-link,
  && .site-bubble .bubble-profile-card > button {
    text-decoration: underline;
  }

  && .site-bubble .bubble-community-feature-art {
    background: #31302c;
  }

  && .site-bubble .bubble-community-feature-art > img {
    height: 100%;
    inset: 0;
    object-fit: cover;
    position: absolute;
    width: 100%;
  }

  && .site-bubble .bubble-community-feature-art > small {
    position: relative;
    z-index: 1;
  }

  && .site-bubble .bubble-profile-cover {
    background: #9ed4f4 url("/System/Doors/sites/bubble/profile-cover.jpg") center / cover no-repeat;
  }

  && .site-bubble .bubble-community-art img {
    display: block;
    height: 100%;
    object-fit: cover;
    width: 100%;
  }

  && .site-encicloweb .wiki-sidebar-panel h3 {
    font-size: calc(15px + 4pt);
  }

  && .site-encicloweb .wiki-sidebar-panel button,
  && .site-encicloweb .wiki-sidebar-author p,
  && .site-encicloweb .wiki-article p {
    font-size: calc(13px + 4pt);
  }

  && .site-encicloweb .wiki-sidebar-author small {
    font-size: calc(11px + 4pt);
  }

  && .site-encicloweb .wiki-how-to-list li {
    font-size: calc(clamp(12px, 0.9vw, 14px) + 4pt);
  }

  && .site-encicloweb .wiki-home-page p {
    font-size: calc(clamp(12px, 0.92vw, 14px) + 4pt);
  }

  && .site-encicloweb .wiki-founder-note p {
    font-size: calc(clamp(12px, 0.9vw, 14px) + 4pt);
  }

  && .site-encicloweb .wiki-keyword {
    background: transparent;
    border: 0;
    color: #7d94b8;
    cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
    font: inherit;
    padding: 0;
    text-decoration: underline;
  }

  && .site-encicloweb .wiki-key-icon {
    background: transparent;
    border: 0;
    cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
    display: inline-flex;
    margin-left: 5px;
    padding: 0;
    vertical-align: middle;
  }

  && .site-encicloweb .wiki-key-icon svg {
    height: 22px;
    width: 28px;
  }


  && .site-bubble.is-login {
    padding: clamp(56px, 12vh, 112px) clamp(15px, 1.25vw, 24px) 32px;
  }

  && .site-bubble.is-login .bubble-auth-notice {
    font-size: clamp(16px, 1.3vw, 20px);
    padding: clamp(12px, 1vw, 16px) clamp(14px, 1.3vw, 24px);
  }

  && .site-bubble.is-login .bubble-auth-layout {
    gap: clamp(12px, 1.25vw, 20px);
    grid-template-columns: minmax(0, 2.05fr) minmax(300px, 1fr);
    height: clamp(340px, 52vh, 460px);
    margin-top: clamp(12px, 1.8vh, 18px);
  }

  && .site-bubble.is-login .bubble-auth-promo {
    padding: clamp(20px, 2.5vw, 42px);
  }

  && .site-bubble.is-login .bubble-auth-promo .bubble-logo-window {
    margin-bottom: clamp(20px, 2.2vw, 34px);
    width: min(30vw, 430px);
  }

  && .site-bubble.is-login .bubble-auth-promo p {
    font-size: clamp(16px, 1.35vw, 21px);
    line-height: 1.35;
  }

  && .site-bubble.is-login .bubble-login {
    padding: clamp(10px, 1.2vw, 22px) clamp(12px, 1.6vw, 30px);
  }

  && .site-bubble.is-login .bubble-login h2 {
    font-size: clamp(17px, 1.4vw, 22px);
    margin-bottom: clamp(10px, 1.1vh, 14px);
  }

  && .site-bubble.is-login .bubble-login .bubble-login-field {
    font-size: clamp(15px, 1.1vw, 18px);
    gap: clamp(8px, 0.8vw, 12px);
    grid-template-columns: clamp(58px, 5.1vw, 96px) minmax(0, 1fr);
    margin-bottom: clamp(6px, 0.5vw, 9px);
  }

  && .site-bubble.is-login .bubble-login input:not([type="checkbox"]) {
    height: clamp(30px, 2.5vw, 38px);
    width: min(100%, clamp(180px, 15vw, 286px));
  }

  && .site-bubble.is-login .bubble-login .bubble-save,
  && .site-bubble.is-login .bubble-public-warning,
  && .site-bubble.is-login .bubble-login .bubble-help,
  && .site-bubble.is-login .bubble-register {
    font-size: clamp(14px, 1vw, 17px);
  }

  && .site-bubble.is-login .bubble-login input[type="checkbox"] {
    height: 18px;
    width: 18px;
  }

  && .site-bubble.is-login .bubble-login .login-submit {
    font-size: clamp(14px, 1vw, 17px);
    height: clamp(30px, 2.4vw, 38px);
    min-width: clamp(58px, 4.8vw, 90px);
  }

  && .site-bubble.is-login .bubble-login-footer {
    font-size: clamp(13px, 0.95vw, 16px);
    margin-top: clamp(18px, 2.4vh, 28px);
  }

  && .site-bubble .bubble-profile-card,
  && .site-bubble .bubble-side-panel {
    margin-bottom: clamp(18px, 1.35vw, 26px);
  }

  && .site-bubble .bubble-profile-card {
    align-items: stretch;
    grid-template-columns: minmax(110px, 1fr) minmax(0, 1.05fr);
    grid-template-rows: 1fr auto;
    min-height: clamp(160px, 11.2vw, 215px);
    padding: 0;
  }

  && .site-bubble .bubble-profile-avatar {
    border: 0;
    grid-column: 1;
    grid-row: 1 / 3;
    height: 100%;
    min-height: 160px;
    width: 100%;
  }

  && .site-bubble .bubble-profile-name {
    align-self: start;
    grid-column: 2;
    grid-row: 1;
    overflow-wrap: anywhere;
    padding: clamp(12px, 1vw, 18px) clamp(10px, 1vw, 18px) 0;
  }

  && .site-bubble .bubble-profile-card > button {
    align-self: end;
    grid-column: 2;
    grid-row: 2;
    margin: 0 clamp(10px, 1vw, 18px) clamp(14px, 1vw, 20px);
  }

  && .site-bubble .bubble-birthday-content {
    align-items: center;
    display: grid;
    gap: clamp(12px, 1.1vw, 20px);
    grid-template-columns: clamp(72px, 5.2vw, 100px) minmax(0, 1fr);
    min-height: clamp(150px, 10vw, 190px);
  }

  && .site-bubble .bubble-birthday-date {
    align-items: center;
    background: #fff;
    border: 2px solid #181818;
    box-shadow: 3px 4px 0 #181818;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: clamp(76px, 5.2vw, 100px);
    text-align: center;
  }

  && .site-bubble .bubble-birthday-date small {
    background: #f37319;
    color: #fff;
    font-size: clamp(13px, 0.9vw, 17px);
    padding: 4px;
    width: 100%;
  }

  && .site-bubble .bubble-birthday-date strong {
    font-size: clamp(34px, 2.5vw, 48px);
    line-height: 1.05;
  }

  && .site-bubble .bubble-birthday-copy {
    min-width: 0;
  }

  && .site-bubble .bubble-birthday-copy > strong {
    font-size: clamp(18px, 1.25vw, 24px);
  }

  && .site-bubble .bubble-birthday-copy p {
    font-size: clamp(13px, 0.9vw, 17px);
    line-height: 1.3;
    margin: 5px 0;
  }

  && .site-bubble .bubble-birthday-copy .bubble-primary-button {
    margin-top: 7px;
    padding: 5px 10px;
  }

  && .site-bubble .bubble-friend-panel .bubble-side-panel-body {
    min-height: 0;
    padding: 8px clamp(12px, 1vw, 18px);
  }

  && .site-bubble .bubble-friend-panel .bubble-friend {
    align-items: start;
    border-bottom: 1px solid #b9b9b9;
    gap: clamp(10px, 1vw, 18px);
    grid-template-columns: clamp(58px, 4.4vw, 82px) minmax(0, 1fr);
    margin: 0;
    padding: clamp(10px, 0.9vw, 16px) 0;
  }

  && .site-bubble .bubble-friend-panel .bubble-friend:last-child {
    border-bottom: 0;
  }

  && .site-bubble .bubble-friend-panel .bubble-friend img {
    height: clamp(58px, 4.4vw, 82px);
    width: clamp(58px, 4.4vw, 82px);
  }

  && .site-bubble .bubble-friend-copy {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
  }

  && .site-bubble .bubble-friend-copy strong {
    font-size: clamp(17px, 1.2vw, 23px);
    line-height: 1.15;
  }

  && .site-bubble .bubble-friend-copy small {
    color: #777;
    font-size: clamp(12px, 0.78vw, 15px);
  }

  && .site-bubble .bubble-friend-copy button {
    align-self: flex-start;
    background: #f37319;
    border: 2px solid #181818;
    box-shadow: 2px 2px 0 #181818;
    color: #fff;
    cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
    font: inherit;
    font-size: clamp(12px, 0.75vw, 14px);
    margin-top: 4px;
    padding: 4px 10px;
  }

  && .site-bubble .bubble-community-panel .bubble-side-panel-body {
    min-height: 0;
    padding: 7px clamp(12px, 1vw, 18px);
  }

  && .site-bubble .bubble-community-panel .bubble-community {
    align-items: center;
    border-bottom: 1px solid #b9b9b9;
    display: grid;
    gap: clamp(10px, 1vw, 18px);
    grid-template-columns: clamp(58px, 4.4vw, 82px) minmax(0, 1fr);
    margin: 0;
    padding: clamp(10px, 0.9vw, 16px) 0;
    text-decoration: none;
  }

  && .site-bubble .bubble-community-panel .bubble-community:last-child {
    border-bottom: 0;
  }

  && .site-bubble .bubble-community-panel .bubble-community > img {
    border: 2px solid #181818;
    height: clamp(58px, 4.4vw, 82px);
    object-fit: cover;
    width: clamp(58px, 4.4vw, 82px);
  }

  && .site-bubble .bubble-community-copy {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
  }

  && .site-bubble .bubble-community-panel .bubble-community-title {
    background: transparent;
    border: 0;
    color: #181818;
    cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
    font: inherit;
    font-size: clamp(17px, 1.2vw, 23px);
    line-height: 1.12;
    padding: 0;
    text-align: left;
  }

  && .site-bubble .bubble-community-copy small {
    color: #777;
    font-size: clamp(12px, 0.78vw, 15px);
  }

  && .site-bubble .bubble-community-panel .bubble-community-join {
    align-self: flex-start;
    background: #f37319;
    border: 2px solid #181818;
    box-shadow: 2px 2px 0 #181818;
    color: #fff;
    cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
    font: inherit;
    font-size: clamp(12px, 0.75vw, 14px);
    margin-top: 4px;
    padding: 4px 10px;
  }

  && .site-bubble .bubble-community-feature-art > small {
    display: none;
  }

  && .site-bubble .bubble-category-panel-body {
    min-height: 0;
  }

  && .site-bubble .bubble-category-grid {
    border: 0;
    box-shadow: none;
    margin: 0;
  }

  && .site-bubble .bubble-category-grid button {
    font-family: "Pixelify Sans", monospace;
    font-size: clamp(14px, 0.85vw, 17px);
    line-height: 1.25;
    padding: clamp(9px, 0.7vw, 13px) 5px;
  }

  && .site-bubble .bubble-footer {
    margin-top: clamp(42px, 3vw, 58px);
  }

  && .site-bubble .bubble-profile-cover {
    background-position: center 42%;
    min-height: clamp(250px, 21vw, 420px);
  }

  && .site-encicloweb .wiki-sidebar-panel button {
    padding-left: 6px;
  }

  && .site-encicloweb .wiki-essay-section h2 {
    font-size: 24px;
  }

  @media (max-width: 720px) {
    && .site-bubble.is-login {
      padding: 36px 12px 24px;
    }

    && .site-bubble.is-login .bubble-auth-layout {
      grid-template-columns: minmax(0, 1fr);
      height: auto;
    }

    && .site-bubble.is-login .bubble-auth-promo {
      min-height: 250px;
    }

    && .site-bubble.is-login .bubble-auth-promo .bubble-logo-window {
      width: min(56vw, 330px);
    }

    && .site-bubble.is-login .bubble-login {
      min-height: 400px;
    }
  }


  @media (max-width: 900px) {
    && .site-bubble .bubble-friends-layout,
    && .site-bubble .bubble-community-layout,
    && .site-bubble .bubble-profile-columns,
    && .site-bubble .bubble-messenger {
      grid-template-columns: 1fr;
    }
  }
  && .site-bubble .bubble-post-content.has-image > p {
    margin-bottom: 0;
  }

  && .site-bubble .bubble-post-content.has-image .bubble-post-image {
    margin-top: clamp(8px, 0.8vw, 14px);
  }

  && .site-bubble .bubble-profile-cover {
    background-position: center 42%;
    min-height: clamp(350px, 19vw, 390px);
  }

  && .site-bubble .bubble-profile-panel-heading {
    align-items: center;
    background: #f37319;
    color: #fff;
    display: flex;
    justify-content: space-between;
    min-height: clamp(44px, 3vw, 58px);
    padding: clamp(7px, 0.73vw, 14px) clamp(10px, 0.9vw, 18px);
  }

  && .site-bubble .bubble-profile-panel-heading > h2 {
    background: transparent;
    color: inherit;
    flex: 1;
    font-size: clamp(18px, 1.67vw, 32px);
    font-weight: 400;
    margin: 0;
    min-height: 0;
    padding: 0;
  }

  && .site-bubble .bubble-profile-panel-heading > .bubble-text-link {
    background: transparent;
    border: 0;
    color: inherit;
    cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
    font: inherit;
    font-size: clamp(12px, 0.8vw, 15px);
    padding: 0;
    text-decoration: underline;
  }

  && .site-bubble .bubble-profile-about-panel .bubble-side-panel-body {
    min-height: 0;
    padding: clamp(9px, 0.75vw, 14px) clamp(12px, 1vw, 18px);
  }

  && .site-bubble .bubble-profile-description {
    color: #181818;
    font-size: clamp(13px, 0.9vw, 17px);
    line-height: 1.25;
    margin: 0 0 8px;
  }

  && .site-bubble .bubble-profile-detail-row {
    align-items: center;
    border-top: 1px solid #aaa;
    color: #181818;
    display: flex;
    font-size: clamp(12px, 0.85vw, 16px);
    gap: 10px;
    justify-content: space-between;
    line-height: 1.2;
    margin: 0;
    padding: clamp(7px, 0.58vw, 11px) 0;
  }

  && .site-bubble .bubble-profile-detail-row span {
    color: #888;
    flex: 0 0 auto;
  }

  && .site-bubble .bubble-profile-detail-row strong {
    font-weight: 400;
    text-align: right;
  }

  && .site-bubble .bubble-profile-friends-panel .bubble-side-panel-body {
    display: grid;
    gap: clamp(7px, 0.65vw, 12px);
    grid-template-columns: repeat(3, minmax(0, 1fr));
    min-height: 0;
    padding: clamp(10px, 0.9vw, 17px);
  }

  && .site-bubble .bubble-profile-friends-panel .bubble-profile-friends > button {
    aspect-ratio: 1;
    background: #fff;
    border: 2px solid #181818;
    box-shadow: 2px 3px 0 #181818;
    display: block;
    min-width: 0;
    overflow: hidden;
    padding: 0;
    width: 100%;
  }

  && .site-bubble .bubble-profile-friends-panel .bubble-profile-friends > button img {
    display: block;
    height: 100%;
    object-fit: cover;
    width: 100%;
  }

  && .site-bubble .bubble-profile-communities-panel .bubble-side-panel-body {
    min-height: 0;
    padding: clamp(6px, 0.5vw, 10px) clamp(12px, 1vw, 18px);
  }

  && .site-bubble .bubble-profile-community {
    align-items: center;
    background: transparent;
    border: 0;
    border-bottom: 1px solid #aaa;
    color: #181818;
    cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
    display: grid;
    font: inherit;
    gap: clamp(8px, 0.8vw, 14px);
    grid-template-columns: clamp(38px, 3.4vw, 54px) minmax(0, 1fr);
    padding: clamp(6px, 0.55vw, 10px) 0;
    text-align: left;
    width: 100%;
  }

  && .site-bubble .bubble-profile-community:last-child {
    border-bottom: 0;
  }

  && .site-bubble .bubble-profile-community img {
    border: 2px solid #181818;
    height: clamp(38px, 3.4vw, 54px);
    object-fit: cover;
    width: clamp(38px, 3.4vw, 54px);
  }

  && .site-bubble .bubble-profile-community span {
    font-size: clamp(13px, 0.9vw, 17px);
    line-height: 1.15;
    overflow-wrap: anywhere;
  }

  && .site-bubble .bubble-community-aside .bubble-side-panel-body {
    min-height: 0;
    padding: 8px clamp(12px, 1vw, 18px);
  }

  && .site-bubble .bubble-my-community {
    gap: clamp(8px, 0.8vw, 14px);
    grid-template-columns: clamp(44px, 3.5vw, 58px) minmax(0, 1fr);
    padding: clamp(6px, 0.6vw, 10px) 0;
  }

  && .site-bubble .bubble-my-community > img {
    border: 2px solid #181818;
    display: block;
    height: clamp(44px, 3.5vw, 58px);
    object-fit: cover;
    width: clamp(44px, 3.5vw, 58px);
  }

  && .site-bubble .bubble-my-community strong {
    font-size: clamp(13px, 0.9vw, 17px);
    line-height: 1.15;
  }

  && .site-bubble .bubble-my-community small {
    font-size: clamp(11px, 0.72vw, 14px);
  }

  && .site-bubble .bubble-category-grid button {
    font-size: clamp(12px, 0.75vw, 15px);
    padding: clamp(6px, 0.45vw, 9px) 4px;
  }

  @container bubble-site (max-width: 720px) {
    && .site-bubble .bubble-profile-cover {
      min-height: 310px;
    }

    && .site-bubble .bubble-profile-friends-panel .bubble-side-panel-body {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }




/* Bubble messaging layout from the Figma based implementation. */
    .bubble-chat-layout {
      border: 2px solid #31302c;
      box-shadow: 4px 5px 0 #31302c;
      display: grid;
      grid-template-columns: minmax(220px, 0.24fr) minmax(0, 0.76fr);
      height: 983px;
      margin: 0 2.08vw;
      overflow: hidden;
    }

    .bubble-inbox {
      background: #fff;
      border-right: 2px solid #31302c;
      display: flex;
      flex-direction: column;
      min-height: 0;
      min-width: 0;

      h2 {
        align-items: center;
        background: #f37319;
        border-bottom: 2px solid #31302c;
        color: #fff;
        display: flex;
        flex: 0 0 98px;
        font-size: clamp(21px, 1.42vw, 28px);
        margin: 0;
        padding: 0 40px;
      }
    }

    .bubble-inbox-search {
      display: flex;
      gap: 8px;
      padding: 18px 12px 12px;

      input {
        background: #fff;
        border: 2px solid #bcbcbc;
        flex: 1 1 auto;
        min-width: 0;
        padding: 7px 10px;
      }

      button {
        align-items: center;
        background: #fff;
        border: 2px solid #bcbcbc;
        display: flex;
        flex: 0 0 40px;
        justify-content: center;

        img {
          height: 19px;
          width: 19px;
        }
      }
    }

    .bubble-contact-list {
      flex: 1 1 auto;
      min-height: 0;
      overflow: auto;
    }

    .bubble-contact {
      align-items: center;
      background: #fff;
      border: 0;
      border-bottom: 1px solid #bdbdbd;
      display: grid;
      grid-template-columns: clamp(68px, 4vw, 78px) minmax(0, 1fr) auto;
      min-height: 122px;
      padding: 10px 12px;
      position: relative;
      text-align: left;
      width: 100%;

      > img {
        aspect-ratio: 1;
        border: 2px solid #31302c;
        box-shadow: 3px 3px 0 #31302c;
        height: clamp(68px, 4vw, 78px);
        object-fit: cover;
        width: clamp(68px, 4vw, 78px);
      }
    }

    .bubble-contact.is-selected {
      background: #ffdac5;
      box-shadow: inset 4px 0 #f37319;
    }

    .bubble-contact-copy {
      align-self: center;
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
      padding-left: 9px;

      strong {
        align-items: center;
        display: flex;
        font-size: clamp(16px, 1.2vw, 23px);
        gap: 6px;
        line-height: 1.12;
      }

      strong i {
        background: #2c9e38;
        border-radius: 50%;
        height: 9px;
        width: 9px;
      }

      > span {
        font-size: clamp(13px, 0.95vw, 18px);
        line-height: 1.2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .bubble-contact-time {
      align-self: end;
      font-size: clamp(10px, 0.7vw, 14px);
      grid-column: 3;
      margin: 0 1px 0 8px;
      white-space: nowrap;
    }

    .bubble-unread {
      background: #f37319;
      border: 1px solid #31302c;
      color: #fff;
      font-size: 12px;
      grid-column: 3;
      grid-row: 1;
      padding: 2px 5px;
    }

    .bubble-empty-inbox {
      padding: 18px;
    }

    .bubble-conversation {
      background: #f3f3f3;
      display: flex;
      flex-direction: column;
      min-height: 0;
      min-width: 0;
    }

    .bubble-conversation-header {
      align-items: center;
      background: #f37319;
      border-bottom: 2px solid #31302c;
      color: #fff;
      display: flex;
      flex: 0 0 98px;
      gap: 10px;
      padding: 12px 24px;

      > img {
        border: 2px solid #31302c;
        box-shadow: 3px 3px 0 #31302c;
        height: 76px;
        object-fit: cover;
        width: 76px;
      }

      div {
        display: flex;
        flex-direction: column;
        gap: 3px;
      }

      strong {
        font-size: clamp(19px, 1.3vw, 25px);
      }

      span {
        font-size: 16px;
      }
    }

    .bubble-view-profile {
      background: #fff;
      border: 2px solid #31302c;
      box-shadow: 2px 2px 0 #31302c;
      margin-left: auto;
      padding: 7px 11px;
    }

    .bubble-message-list {
      flex: 1 1 auto;
      min-height: 0;
      overflow: auto;
      padding: 25px 24px 12px;
    }

    .bubble-message-fragment {
      display: contents;
    }

    .bubble-chat-day {
      align-items: center;
      color: #898989;
      display: flex;
      font-size: 17px;
      gap: 24px;
      margin: 10px 0 14px;

      &::before,
      &::after {
        background: #bcbcbc;
        content: "";
        height: 1px;
        width: 100%;
      }
    }

    .bubble-message-row {
      align-items: flex-end;
      display: flex;
      gap: 15px;
      margin: 0 0 29px;

      > img {
        border: 2px solid #31302c;
        box-shadow: 2px 2px 0 #31302c;
        flex: 0 0 55px;
        height: 55px;
        object-fit: cover;
        width: 55px;
      }

      p {
        background: #fff;
        border: 2px solid #31302c;
        box-shadow: 2px 2px 0 #31302c;
        display: flex;
        flex-direction: column;
        font-size: clamp(13px, 0.72vw, 15px);
        justify-content: space-between;
        line-height: 1.3;
        margin: 0;
        max-width: min(610px, 72%);
        min-height: 67px;
        padding: 8px 9px 5px;
      }

      time {
        align-self: flex-end;
        font-size: 11px;
        line-height: 1;
      }
    }

    .bubble-message-row.is-sent p {
      background: #ffdac5;
    }

    .bubble-message-composer {
      background: #fff;
      border-top: 2px solid #bdbdbd;
      display: flex;
      flex: 0 0 100px;
      flex-direction: column;
      justify-content: space-between;
      padding: 12px;

      textarea {
        background: #fff;
        border: 0;
        flex: 1 1 auto;
        min-height: 40px;
        outline-color: #7d94b8;
        resize: none;
      }
    }

    .bubble-message-tools {
      align-items: center;
      display: flex;
      gap: 8px;
      justify-content: flex-end;
    }

    .bubble-attach-message {
      align-items: center;
      background: #31302c;
      color: #fff;
      cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
      display: flex;
      gap: 5px;
      height: 28px;
      max-width: 200px;
      overflow: hidden;
      padding: 4px 7px;
      white-space: nowrap;

      img {
        filter: brightness(0) invert(1);
        height: 16px;
        width: 16px;
      }

      input {
        height: 1px;
        opacity: 0;
        position: absolute;
        width: 1px;
      }

      span {
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .bubble-send-message {
      background: #f37319;
      border: 2px solid #31302c;
      box-shadow: 2px 2px 0 #31302c;
      color: #fff;
      padding: 4px 9px;
    }

    .bubble-footer {
      align-items: center;
      background: #f5f5f5;
      color: #777;
      display: flex;
      gap: 40px;
      margin: 50px 0 0;
      min-height: 110px;
      padding: 18px 2.08vw;
      text-align: left;

      img {
        filter: brightness(0) saturate(100%) invert(52%) sepia(92%) saturate(1296%) hue-rotate(346deg) brightness(98%) contrast(94%);
        height: auto;
        width: 116px;
      }

      small {
        font-size: 15px;
        margin-left: auto;
      }
    }




/* YouSpace Figma page layout and responsive sections. */
  .site-youspace {
    background: #fff;
    min-height: 100%;

    .you-topbar {
      align-items: center;
      background: #f33;
      border-bottom: 2px solid #31302c;
      border-radius: 0 0 10px 10px;
      color: #fff;
      display: flex;
      gap: 14px;
      justify-content: space-between;
      min-height: 35px;
      padding: 4px 12px;

      nav {
        display: flex;
        flex-wrap: wrap;
        gap: 0;
      }

      button {
        background: none;
        border: 0;
        color: inherit;
        font-size: 13px;
        padding: 5px 9px;
      }

      .you-account button {
        color: #0033cf;
        text-decoration: underline;
      }
    }

    .you-brand-search {
      align-items: center;
      display: flex;
      flex-direction: column;
      gap: 9px;
      padding: 24px 16px 18px;

      img {
        height: auto;
        max-height: 42px;
        object-fit: contain;
        width: min(220px, 65%);
      }

      .site-search {
        max-width: 480px;
        width: min(100%, 480px);
      }
    }

    .you-section-title {
      border-top: 2px solid #31302c;
      font-size: 19px;
      margin: 0;
      padding: 9px 14px 4px;
    }

    .you-video-grid {
      border: 4px solid #f33;
      box-shadow:
        inset 0 0 0 4px #ff9b9b,
        3px 3px 0 #31302c;
      display: grid;
      gap: 12px;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      margin: 4px 14px 18px;
      padding: 11px;
    }

    .you-video-card {
      background: #fff;
      border: 1px solid #31302c;
      min-width: 0;
      padding: 4px;
      text-align: left;

      img {
        aspect-ratio: 16 / 9;
        border: 1px solid #31302c;
        display: block;
        object-fit: cover;
        width: 100%;
      }

      strong {
        color: #06c;
        display: block;
        font-size: 13px;
        font-weight: 400;
        margin-top: 5px;
        overflow: hidden;
        text-decoration: underline;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .you-player {
      margin: 12px auto 22px;
      max-width: 760px;
      padding: 0 16px;

      .player-screen {
        align-items: center;
        background: #161616;
        display: flex;
        justify-content: center;
        min-height: 180px;
        position: relative;

        img {
          max-height: 55vh;
          max-width: 100%;
          object-fit: contain;
        }

        button {
          background: #f33;
          border: 2px solid #fff;
          border-radius: 50%;
          color: #fff;
          font-size: 21px;
          height: 54px;
          left: 50%;
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 54px;
        }
      }

      .player-controls {
        background: #262626;
        color: #fff;
        padding: 8px 11px;
      }
    }
  }

  @media (max-width: 720px) {
    .site-bubble {
      .bubble-login-layout,
      .bubble-feed-layout,
      .wiki-layout {
        grid-template-columns: 1fr;
      }
    }

    .site-encicloweb .wiki-layout {
      grid-template-columns: 1fr;
    }

    .site-encicloweb .wiki-sidebar {
      display: flex;
      flex-wrap: wrap;
      gap: 5px 10px;

      h3 {
        flex: 0 0 100%;
      }

      button {
        width: auto;
      }
    }

    .site-youspace .you-topbar {
      align-items: flex-start;
      flex-direction: column;
      gap: 2px;
    }
  }

  .site-bubble {
    background: #fff;
    min-height: 100%;
    padding: 0;

    .bubble-header {
      align-items: center;
      background: #f37319;
      border-bottom: 2px solid #31302c;
      color: #fff;
      display: flex;
      gap: clamp(10px, 1.3vw, 25px);
      height: 65px;
      justify-content: space-between;
      margin: 0;
      padding: 0 2.08vw;

      nav {
        align-items: stretch;
        display: flex;
        flex: 0 1 auto;
        gap: clamp(8px, 1.5vw, 28px);
        height: 100%;
        justify-content: space-between;
        min-width: 0;
      }

      nav button {
        align-items: center;
        background: transparent;
        border: 0;
        color: #fff;
        display: flex;
        gap: 7px;
        padding: 0 5px;
        white-space: nowrap;
      }

      nav button.is-active,
      nav button:hover {
        text-decoration: underline;
        text-underline-offset: 5px;
      }

      nav img {
        height: 20px;
        object-fit: contain;
        width: 20px;
      }

      .site-search {
        flex: 1 1 300px;
        max-width: 515px;
        min-width: 170px;
      }

      .site-search input,
      .site-search button {
        height: 39px;
      }

      .site-search input {
        border-color: #31302c;
        padding: 5px 10px;
      }

      .site-search button {
        background: #f7edd7;
        flex-basis: 39px;
      }
    }

    .bubble-wordmark {
      background: transparent;
      border: 0;
      flex: 0 0 auto;
      line-height: 0;
      padding: 0;
      width: clamp(94px, 6.3vw, 122px);

      img {
        display: block;
        filter: brightness(0) invert(1);
        height: auto;
        width: 100%;
      }
    }

    .bubble-logout {
      background: transparent;
      border: 0;
      border-left: 1px solid rgb(255 255 255 / 65%);
      color: #fff;
      flex: 0 0 auto;
      padding: 8px 0 8px 22px;
    }

    .bubble-page-heading {
      background: #f37319;
      border: 2px solid #31302c;
      box-shadow: 4px 5px 0 #31302c;
      color: #fff;
      height: 171px;
      margin: 30px 2.08vw 53px;
      padding: 28px 32px;

      h1 {
        font-size: clamp(28px, 2.1vw, 40px);
        line-height: 1.1;
        margin: 0 0 7px;
      }

      p {
        font-size: clamp(16px, 1.12vw, 22px);
        margin: 0;
      }
    }

    .bubble-home-heading {
      height: 112px;
      margin-bottom: 28px;
    }

    .bubble-chat-layout {
      border: 2px solid #31302c;
      box-shadow: 4px 5px 0 #31302c;
      display: grid;
      grid-template-columns: minmax(220px, 0.24fr) minmax(0, 0.76fr);
      height: 983px;
      margin: 0 2.08vw;
      overflow: hidden;
    }

    .bubble-inbox {
      background: #fff;
      border-right: 2px solid #31302c;
      display: flex;
      flex-direction: column;
      min-height: 0;
      min-width: 0;

      h2 {
        align-items: center;
        background: #f37319;
        border-bottom: 2px solid #31302c;
        color: #fff;
        display: flex;
        flex: 0 0 98px;
        font-size: clamp(21px, 1.42vw, 28px);
        margin: 0;
        padding: 0 40px;
      }
    }

    .bubble-inbox-search {
      display: flex;
      gap: 8px;
      padding: 18px 12px 12px;

      input {
        background: #fff;
        border: 2px solid #bcbcbc;
        flex: 1 1 auto;
        min-width: 0;
        padding: 7px 10px;
      }

      button {
        align-items: center;
        background: #fff;
        border: 2px solid #bcbcbc;
        display: flex;
        flex: 0 0 40px;
        justify-content: center;

        img {
          height: 19px;
          width: 19px;
        }
      }
    }

    .bubble-contact-list {
      flex: 1 1 auto;
      min-height: 0;
      overflow: auto;
    }

    .bubble-contact {
      align-items: center;
      background: #fff;
      border: 0;
      border-bottom: 1px solid #bdbdbd;
      display: grid;
      grid-template-columns: clamp(68px, 4vw, 78px) minmax(0, 1fr) auto;
      min-height: 122px;
      padding: 10px 12px;
      position: relative;
      text-align: left;
      width: 100%;

      > img {
        aspect-ratio: 1;
        border: 2px solid #31302c;
        box-shadow: 3px 3px 0 #31302c;
        height: clamp(68px, 4vw, 78px);
        object-fit: cover;
        width: clamp(68px, 4vw, 78px);
      }
    }

    .bubble-contact.is-selected {
      background: #ffdac5;
      box-shadow: inset 4px 0 #f37319;
    }

    .bubble-contact-copy {
      align-self: center;
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
      padding-left: 9px;

      strong {
        align-items: center;
        display: flex;
        font-size: clamp(16px, 1.2vw, 23px);
        gap: 6px;
        line-height: 1.12;
      }

      strong i {
        background: #2c9e38;
        border-radius: 50%;
        height: 9px;
        width: 9px;
      }

      > span {
        font-size: clamp(13px, 0.95vw, 18px);
        line-height: 1.2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .bubble-contact-time {
      align-self: end;
      font-size: clamp(10px, 0.7vw, 14px);
      grid-column: 3;
      margin: 0 1px 0 8px;
      white-space: nowrap;
    }

    .bubble-unread {
      background: #f37319;
      border: 1px solid #31302c;
      color: #fff;
      font-size: 12px;
      grid-column: 3;
      grid-row: 1;
      padding: 2px 5px;
    }

    .bubble-empty-inbox {
      padding: 18px;
    }

    .bubble-conversation {
      background: #f3f3f3;
      display: flex;
      flex-direction: column;
      min-height: 0;
      min-width: 0;
    }

    .bubble-conversation-header {
      align-items: center;
      background: #f37319;
      border-bottom: 2px solid #31302c;
      color: #fff;
      display: flex;
      flex: 0 0 98px;
      gap: 10px;
      padding: 12px 24px;

      > img {
        border: 2px solid #31302c;
        box-shadow: 3px 3px 0 #31302c;
        height: 76px;
        object-fit: cover;
        width: 76px;
      }

      div {
        display: flex;
        flex-direction: column;
        gap: 3px;
      }

      strong {
        font-size: clamp(19px, 1.3vw, 25px);
      }

      span {
        font-size: 16px;
      }
    }

    .bubble-view-profile {
      background: #fff;
      border: 2px solid #31302c;
      box-shadow: 2px 2px 0 #31302c;
      margin-left: auto;
      padding: 7px 11px;
    }

    .bubble-message-list {
      flex: 1 1 auto;
      min-height: 0;
      overflow: auto;
      padding: 25px 24px 12px;
    }

    .bubble-message-fragment {
      display: contents;
    }

    .bubble-chat-day {
      align-items: center;
      color: #898989;
      display: flex;
      font-size: 17px;
      gap: 24px;
      margin: 10px 0 14px;

      &::before,
      &::after {
        background: #bcbcbc;
        content: "";
        height: 1px;
        width: 100%;
      }
    }

    .bubble-message-row {
      align-items: flex-end;
      display: flex;
      gap: 15px;
      margin: 0 0 29px;

      > img {
        border: 2px solid #31302c;
        box-shadow: 2px 2px 0 #31302c;
        flex: 0 0 55px;
        height: 55px;
        object-fit: cover;
        width: 55px;
      }

      p {
        background: #fff;
        border: 2px solid #31302c;
        box-shadow: 2px 2px 0 #31302c;
        display: flex;
        flex-direction: column;
        font-size: clamp(13px, 0.72vw, 15px);
        justify-content: space-between;
        line-height: 1.3;
        margin: 0;
        max-width: min(610px, 72%);
        min-height: 67px;
        padding: 8px 9px 5px;
      }

      time {
        align-self: flex-end;
        font-size: 11px;
        line-height: 1;
      }
    }

    .bubble-message-row.is-sent p {
      background: #ffdac5;
    }

    .bubble-message-composer {
      background: #fff;
      border-top: 2px solid #bdbdbd;
      display: flex;
      flex: 0 0 100px;
      flex-direction: column;
      justify-content: space-between;
      padding: 12px;

      textarea {
        background: #fff;
        border: 0;
        flex: 1 1 auto;
        min-height: 40px;
        outline-color: #7d94b8;
        resize: none;
      }
    }

    .bubble-message-tools {
      align-items: center;
      display: flex;
      gap: 8px;
      justify-content: flex-end;
    }

    .bubble-attach-message {
      align-items: center;
      background: #31302c;
      color: #fff;
      cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
      display: flex;
      gap: 5px;
      height: 28px;
      max-width: 200px;
      overflow: hidden;
      padding: 4px 7px;
      white-space: nowrap;

      img {
        filter: brightness(0) invert(1);
        height: 16px;
        width: 16px;
      }

      input {
        height: 1px;
        opacity: 0;
        position: absolute;
        width: 1px;
      }

      span {
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .bubble-send-message {
      background: #f37319;
      border: 2px solid #31302c;
      box-shadow: 2px 2px 0 #31302c;
      color: #fff;
      padding: 4px 9px;
    }

    .bubble-footer {
      align-items: center;
      background: #f5f5f5;
      color: #777;
      display: flex;
      gap: 40px;
      margin: 50px 0 0;
      min-height: 110px;
      padding: 18px 2.08vw;
      text-align: left;

      img {
        filter: brightness(0) saturate(100%) invert(52%) sepia(92%) saturate(1296%) hue-rotate(346deg) brightness(98%) contrast(94%);
        height: auto;
        width: 116px;
      }

      small {
        font-size: 15px;
        margin-left: auto;
      }
    }

    .bubble-feed-layout {
      display: grid;
      gap: clamp(24px, 2vw, 38px);
      grid-template-columns: minmax(250px, 0.31fr) minmax(0, 1fr);
      margin: 0 2.08vw;
    }

    .bubble-profile,
    .bubble-post {
      background: #fff;
      border: 2px solid #31302c;
      box-shadow: 3px 4px 0 #31302c;
      margin-bottom: 18px;
      padding: 18px;
    }

    .bubble-post h3 {
      background: #f37319;
      color: #fff;
      margin: -18px -18px 16px;
      padding: 12px 16px;
    }

    .bubble-composer form {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .bubble-composer textarea {
      border: 2px solid #31302c;
      min-height: 110px;
      padding: 10px;
      resize: vertical;
    }

    .bubble-composer .bubble-action {
      align-self: flex-end;
      background: #f37319;
      color: #fff;
    }
  }

  .site-bubble-login {
    background: #f37319;
    padding: clamp(15px, 3vw, 34px);
  }

  .site-youspace {
    background: #fff;
    display: flex;
    flex-direction: column;
    min-height: 1949px;

    .you-topbar {
      align-items: center;
      background: #f7f7f7;
      border-bottom: 2px solid #31302c;
      border-radius: 0;
      color: #31302c;
      display: flex;
      flex: 0 0 58px;
      gap: 32px;
      justify-content: space-between;
      min-height: 58px;
      padding: 0 20px;
      position: relative;

      .you-home-link {
        background: transparent;
        border: 0;
        flex: 0 0 162px;
        line-height: 0;
        padding: 0;

        img {
          display: block;
          height: auto;
          object-fit: contain;
          width: 162px;
        }
      }

      .site-search {
        flex: 0 1 558px;
        margin: 0 auto;
        max-width: 558px;
      }

      .site-search input,
      .site-search button {
        height: 42px;
      }

      .site-search input {
        background: #fff;
        border-color: #31302c;
        border-width: 2px;
        padding: 6px 14px;
      }

      .site-search input::placeholder {
        color: #b7b7b7;
      }

      .site-search button {
        background: #fff;
        border-color: #31302c;
        flex-basis: 44px;
      }

      .you-profile-control {
        flex: 0 0 40px;
        position: relative;
      }

      .you-profile-button {
        align-items: center;
        background: #fff;
        border: 2px solid #31302c;
        border-radius: 50%;
        display: flex;
        height: 40px;
        justify-content: center;
        overflow: hidden;
        padding: 0;
        width: 40px;

        span {
          background: #c5c5c5;
          border-radius: 50%;
          color: #c5c5c5;
          font-size: 24px;
          height: 17px;
          line-height: 12px;
          position: relative;
          width: 17px;

          &::after {
            background: #c5c5c5;
            border-radius: 50% 50% 20% 20%;
            content: "";
            height: 11px;
            left: 3px;
            position: absolute;
            top: 13px;
            width: 12px;
          }
        }
      }

      .you-profile-menu {
        background: #fff;
        border: 2px solid #31302c;
        box-shadow: 3px 3px 0 #31302c;
        display: flex;
        flex-direction: column;
        gap: 7px;
        padding: 10px;
        position: absolute;
        right: 0;
        top: 44px;
        white-space: nowrap;
        z-index: 3;

        button {
          background: #f33;
          border: 2px solid #31302c;
          color: #fff;
          padding: 5px 10px;
        }
      }
    }

    .you-page-layout {
      display: grid;
      flex: 1 0 auto;
      gap: 7.6vw;
      grid-template-columns: minmax(0, 1fr) minmax(320px, 21.25vw);
      min-height: 1779px;
      padding: 56px 3.125vw 0 3.75vw;
    }

    .you-main {
      min-width: 0;
    }

    .you-section-heading {
      align-items: flex-end;
      border-bottom: 5px solid #f33;
      display: flex;
      justify-content: space-between;
      min-height: 102px;
      padding-bottom: 24px;

      > div > span {
        color: #f33;
        display: block;
        font-size: 19px;
        line-height: 1.1;
        margin-bottom: 5px;
      }

      h1 {
        color: #31302c;
        font-size: clamp(30px, 2.5vw, 48px);
        line-height: 1;
        margin: 0;
      }

      > p {
        flex: 0 0 auto;
        font-size: clamp(14px, 1.1vw, 21px);
        margin: 0 0 4px 14px;
        white-space: nowrap;
      }
    }

    .you-category-list {
      display: flex;
      flex-wrap: wrap;
      gap: 18px;
      margin: 28px 0 56px;

      button {
        background: #f33;
        border: 2px solid #111;
        box-shadow: 4px 5px 0 #111;
        color: #fff;
        font-size: clamp(16px, 1.25vw, 24px);
        min-height: 56px;
        padding: 8px 24px;
      }
    }

    .you-video-grid {
      border: 0;
      box-shadow: none;
      display: grid;
      gap: 42px 20px;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      margin: 0;
      padding: 0;
    }

    .you-video-card {
      background: transparent;
      border: 0;
      min-width: 0;
      padding: 0;

      .you-video-thumbnail {
        background: transparent;
        border: 0;
        display: block;
        line-height: 0;
        padding: 0;
        width: 100%;

        img {
          aspect-ratio: 396 / 220;
          border: 0;
          display: block;
          object-fit: cover;
          width: 100%;
        }

        span {
          display: none;
        }
      }

      .you-video-title {
        background: transparent;
        border: 0;
        color: #078bff;
        display: block;
        font-size: clamp(15px, 1.15vw, 22px);
        line-height: 1.35;
        margin: 8px 4px 0;
        padding: 0;
        text-align: left;
        text-decoration: underline;
        text-underline-offset: 2px;
        width: calc(100% - 8px);
      }

      > p {
        font-size: clamp(12px, 0.83vw, 16px);
        margin: 14px 4px 0;

        button {
          background: transparent;
          border: 0;
          color: #078bff;
          padding: 0;
        }
      }
    }

    .you-empty-results {
      grid-column: 1 / -1;
      padding: 20px;
    }

    .you-load-more {
      background: #f33;
      border: 2px solid #111;
      box-shadow: 5px 6px 0 #111;
      color: #fff;
      display: block;
      font-size: clamp(17px, 1.25vw, 24px);
      margin: 52px auto 0;
      padding: 12px 14px;
    }

    .you-load-message {
      text-align: center;
    }

    .you-sidebar {
      display: flex;
      flex-direction: column;
      gap: 42px;
      min-width: 0;
      padding-top: 28px;
    }

    .you-sidebar-welcome,
    .you-sidebar-panel {
      background: #fff;
      border: 2px solid #111;
      box-shadow: 5px 6px 0 #111;
      min-width: 0;

      h2 {
        align-items: center;
        background: #f33;
        border-bottom: 2px solid #111;
        color: #fff;
        display: flex;
        font-size: clamp(22px, 1.55vw, 30px);
        justify-content: center;
        line-height: 1.1;
        margin: 0;
        min-height: 65px;
        padding: 10px;
        text-align: center;
      }
    }

    .you-sidebar-welcome {
      background: #f33;
      border-color: #111;
      min-height: 67px;

      h2 {
        border: 0;
        min-height: 67px;
      }

      p {
        display: none;
      }
    }

    .you-sidebar-panel ol {
      list-style: none;
      margin: 0;
      padding: 10px 18px;

      li {
        align-items: center;
        border-bottom: 1px solid #aaa;
        display: grid;
        gap: 12px;
        grid-template-columns: 44px minmax(0, 1fr);
        min-height: 71px;
        padding: 8px 0;
      }

      li:last-child {
        border-bottom: 0;
      }

      li > span {
        align-items: center;
        background: #f33;
        border: 2px solid #111;
        box-shadow: 3px 3px 0 #111;
        color: #fff;
        display: flex;
        font-size: 28px;
        height: 42px;
        justify-content: center;
        width: 42px;
      }

      li button {
        background: transparent;
        border: 0;
        font-size: clamp(15px, 1.1vw, 21px);
        line-height: 1.3;
        padding: 0;
        text-align: left;
      }
    }

    .you-popular-panel > div {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      padding: 18px;

      button {
        background: #f33;
        border: 2px solid #111;
        box-shadow: 3px 4px 0 #111;
        color: #fff;
        font-size: clamp(14px, 1vw, 19px);
        padding: 6px 10px;
      }
    }

    .you-player {
      margin: 56px auto 0;
      max-width: 1250px;
      padding: 0 3.75vw;
      width: 100%;

      .player-screen {
        align-items: center;
        background: #111;
        border: 3px solid #111;
        display: flex;
        justify-content: center;
        min-height: 300px;
        position: relative;

        > img {
          display: block;
          height: auto;
          max-height: 68vh;
          max-width: 100%;
          object-fit: contain;
          width: 100%;
        }

        button {
          background: #f33;
          border: 3px solid #fff;
          border-radius: 50%;
          color: #fff;
          font-size: 28px;
          height: 66px;
          left: 50%;
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 66px;
        }
      }

      .player-controls {
        background: #fff;
        border: 2px solid #31302c;
        color: #31302c;
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 14px 18px;
      }
    }

    .you-footer {
      align-items: center;
      background: #f5f5f5;
      border-top: 2px solid #31302c;
      color: #777;
      display: flex;
      flex: 0 0 112px;
      gap: 50px;
      min-height: 112px;
      padding: 16px 2.3vw;

      > img {
        height: auto;
        width: 182px;
      }

      nav {
        display: flex;
        gap: 24px;
      }

      nav button {
        background: transparent;
        border: 0;
        color: #777;
        font-size: 20px;
      }

      small {
        font-size: 18px;
        margin-left: auto;
      }
    }
  }

  .site-bubble-login {
    background: #f37319;
    padding: clamp(15px, 3vw, 34px);
  }

  @media (max-width: 1100px) {
  


  /* Match the Figma frame proportions at desktop width. */
  .site-bubble .bubble-header {
    height: 44px;
  }

  .site-bubble .bubble-page-heading {
    height: 114px;
    margin: 20px 2.08vw 35px;
    padding: 18px 22px;
  }

  .site-bubble .bubble-page-heading h1 {
    font-size: clamp(28px, 2.1vw, 40px);
  }

  .site-bubble .bubble-page-heading p {
    font-size: clamp(16px, 1.12vw, 22px);
  }

  .site-bubble .bubble-chat-layout {
    grid-template-columns: minmax(220px, 0.24fr) minmax(0, 0.76fr);
    height: 655px;
  }

  .site-bubble .bubble-inbox h2,
  .site-bubble .bubble-conversation-header {
    flex-basis: 66px;
  }

  .site-bubble .bubble-inbox h2 {
    padding: 0 28px;
  }

  .site-bubble .bubble-contact {
    grid-template-columns: 76px minmax(0, 1fr) auto;
    min-height: 108px;
  }

  .site-bubble .bubble-contact > img {
    height: 76px;
    width: 76px;
  }

  .site-bubble .bubble-conversation-header > img {
    height: 55px;
    width: 55px;
  }

  .site-bubble .bubble-message-composer {
    flex-basis: 66px;
  }

  .site-bubble .bubble-footer {
    margin-top: 48px;
    min-height: 76px;
  }

  .site-youspace .you-page-layout {
    grid-template-columns: minmax(0, 1fr) minmax(260px, 21.25vw);
  }

  .site-youspace .you-category-list button {
    padding-left: clamp(16px, 1.25vw, 24px);
    padding-right: clamp(16px, 1.25vw, 24px);
  }

  .site-bubble,
  .site-youspace {
    container-type: inline-size;
  }

  @container (max-width: 900px) {
    .site-bubble .bubble-header {
      flex-wrap: wrap;
      height: auto;
      justify-content: flex-start;
      min-height: 65px;
      padding: 8px 12px;
    }

    .site-bubble .bubble-header nav {
      flex: 1 1 100%;
      order: 4;
      overflow-x: auto;
    }

    .site-bubble .bubble-header > .site-search {
      flex: 1 1 170px;
      min-width: 120px;
    }

    .site-bubble .bubble-page-heading {
      height: auto;
      margin: 18px 12px 24px;
      min-height: 112px;
      padding: 17px 18px;
    }

    .site-bubble .bubble-chat-layout {
      grid-template-columns: minmax(0, 1fr);
      height: auto;
      margin: 0 12px;
    }

    .site-bubble .bubble-inbox {
      border-bottom: 2px solid #31302c;
      border-right: 0;
    }

    .site-bubble .bubble-inbox h2 {
      flex-basis: 58px;
      padding: 0 16px;
    }

    .site-bubble .bubble-contact-list {
      max-height: 300px;
    }

    .site-bubble .bubble-conversation {
      min-height: 600px;
    }

    .site-bubble .bubble-conversation-header {
      flex-basis: 66px;
      padding: 7px 10px;
    }

    .site-bubble .bubble-conversation-header > img {
      height: 48px;
      width: 48px;
    }

    .site-bubble .bubble-message-composer {
      flex-basis: 94px;
      padding: 8px;
    }

    .site-bubble .bubble-footer {
      flex-wrap: wrap;
      gap: 12px 20px;
      margin-top: 30px;
      min-height: 92px;
      padding: 15px;
    }

    .site-youspace .you-page-layout {
      display: flex;
      flex-direction: column;
      gap: 34px;
      min-height: 0;
      padding: 26px 16px 54px;
    }

    .site-youspace .you-video-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @container (max-width: 560px) {
    .site-youspace .you-video-grid {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  .site-bubble .bubble-wordmark {
    height: 30px;
    line-height: 0;
    min-height: 0;
    min-width: 0;
    padding: 0;
    width: clamp(86px, 9.2vw, 118px);
  }

  .site-bubble .bubble-wordmark img {
    filter: none;
    height: auto;
    width: 100%;
  }

  .site-bubble .bubble-view-profile {
    color: #31302c;
  }

  .site-bubble .bubble-footer {
    box-sizing: border-box;
    flex: 0 0 76px;
    height: 76px;
    min-height: 76px;
    padding-bottom: 0;
    padding-top: 0;
  }

  .site-bubble .bubble-footer img {
    height: auto;
    width: clamp(86px, 9.2vw, 118px);
  }

  .site-youspace .you-sidebar-welcome h2,
  .site-youspace .you-sidebar-panel h2 {
    font-size: clamp(18px, 1.55vw, 30px);
  }

  .site-bubble .bubble-chat-layout {
    align-items: stretch;
    background: #f2f2f2;
    border: 2px solid #31302c;
    box-shadow: 5px 6px 0 #31302c;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: minmax(220px, 0.24fr) minmax(0, 0.76fr);
    height: min(655px, calc(100vh - 300px));
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

  .site-bubble .bubble-contact {
    grid-template-columns: 58px minmax(0, 1fr) auto;
    min-height: 82px;
  }

  .site-bubble .bubble-contact > img {
    height: 55px;
    width: 55px;
  }

  .site-bubble .bubble-conversation {
    background: #f2f2f2;
    display: flex;
    flex-direction: column;
    min-height: 0;
    min-width: 0;
    overflow: hidden;
  }

  .site-bubble .bubble-conversation-header {
    flex: 0 0 66px;
    min-width: 0;
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
    color: #31302c;
    flex: 0 1 auto;
    max-width: min(610px, 72%);
    min-width: 0;
    overflow-wrap: anywhere;
    white-space: normal;
  }

  .site-bubble .bubble-message-row p > span {
    color: #31302c;
    display: block;
    line-height: 1.35;
    overflow-wrap: anywhere;
    white-space: normal;
  }

  .site-bubble .bubble-message-row.is-received p {
    background: #fff;
  }

  .site-bubble .bubble-message-row.is-sent p {
    background: #f8d8c5;
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

  .site-bubble .bubble-message-composer textarea {
    flex: 1 1 auto;
    min-height: 44px;
    min-width: 0;
    resize: none;
  }

  .site-bubble .bubble-message-tools {
    align-items: flex-end;
    display: flex;
    flex: 0 0 auto;
    gap: 8px;
  }

  .site-youspace .you-video-card .you-video-thumbnail {
    background: #fff;
    border: 2px solid #111;
    box-shadow: 5px 6px 0 #111;
    box-sizing: border-box;
    overflow: visible;
    position: relative;
  }

  .site-youspace .you-sidebar-panel ol li button {
    text-align: left;
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .site-youspace .player-screen {
    position: relative;
  }

  .site-youspace .you-player-feedback {
    background: #31302c;
    border: 2px solid #111;
    box-shadow: 4px 5px 0 #111;
    color: #fff;
    font-size: clamp(14px, 1.1vw, 20px);
    left: 50%;
    max-width: calc(100% - 32px);
    padding: 10px 14px;
    position: absolute;
    text-align: center;
    top: calc(50% + 48px);
    transform: translateX(-50%);
    z-index: 2;
  }

  .site-youspace .you-load-more:disabled {
    cursor: default;
    opacity: 0.85;
  }

  @container (max-width: 900px) {
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
  }

  @media (max-width: 600px) {
    .site-bubble .bubble-message-list {
      padding: 18px 12px;
    }

    .site-bubble .bubble-message-row {
      gap: 8px;
    }

    .site-bubble .bubble-message-row p {
      max-width: 82%;
    }

    .site-bubble .bubble-message-composer {
      flex-basis: auto;
      flex-wrap: wrap;
      min-height: 90px;
      padding: 8px;
    }

    .site-bubble .bubble-message-composer textarea {
      flex-basis: 100%;
    }

    .site-bubble .bubble-message-tools {
      justify-content: flex-end;
      width: 100%;
    }

    .site-youspace .you-player-feedback {
      font-size: 14px;
      top: calc(50% + 34px);
    }
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

  .site-youspace .you-watch-main .player-screen .you-video-duration {
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
    border-top: 0;
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
    color: #31302c;
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

  .site-youspace .you-watch-related .you-load-more {
    margin: 18px auto 0;
  }

  .site-youspace .you-load-message {
    color: #b42318;
    font-size: 14px;
    margin: 0 auto;
    text-align: center;
  }

  .site-youspace .you-video-grid,
  .site-youspace .you-video-card {
    overflow: visible;
  }

  .site-youspace .you-video-card {
    padding-bottom: 6px;
  }

  .site-youspace .you-video-card .you-video-thumbnail {
    box-shadow: 5px 6px 0 #111 !important;
    margin: 0 6px 6px 0;
    width: calc(100% - 6px);
  }

  .site-youspace .you-sidebar-panel ol li button {
    text-decoration: underline !important;
    text-underline-offset: 2px;
  }

  @container (max-width: 900px) {
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

    .site-youspace .you-watch-channel strong {
      font-size: 15px;
    }

    .site-youspace .you-watch-channel small {
      font-size: 10px;
    }

    .site-youspace .you-watch-channel > button {
      font-size: 10px;
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

`;

export default StyledInternalSites;
