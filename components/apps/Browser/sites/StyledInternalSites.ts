import styled from "styled-components";
import { type InternalSiteId } from "components/apps/Browser/config";

type StyledInternalSitesProps = {
  $site: InternalSiteId;
};

const StyledInternalSites = styled.main<StyledInternalSitesProps>`
  background: ${({ $site }) =>
    $site === "gluugli" ? "#89c1ff" : $site === "bubble" ? "#f37319" : "#fff"};
  box-sizing: border-box;
  color: #31302c;
  cursor: url("/System/Doors/cursors/mouse.svg") 0 0, default;
  flex: 1 1 auto;
  font-family: "Pixelify Sans", monospace;
  font-size: 16px;
  min-height: 0;
  overflow: auto;
  position: relative;
  width: 100%;

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
    min-height: 100%;
    padding: clamp(15px, 3vw, 34px);

    .bubble-notice {
      background: #fff;
      border: 2px solid #31302c;
      margin: 0 0 18px;
      padding: 10px 13px;

      strong {
        color: #ee439c;
      }
    }

    .bubble-login-layout {
      display: grid;
      gap: 18px;
      grid-template-columns: minmax(0, 1fr) minmax(235px, 0.42fr);
    }

    .bubble-welcome,
    .bubble-login {
      background: #fff;
      border: 2px solid #31302c;
      min-height: 275px;
      padding: clamp(16px, 3vw, 35px);
    }

    .bubble-welcome {
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      text-align: center;

      .bubble-logo-window {
        height: 88px;
        margin: 8px 0 24px;
        overflow: hidden;
        width: min(290px, 100%);
      }

      .bubble-logo-window img {
        display: block;
        height: auto;
        transform: translateY(-31%);
        width: 100%;
      }

      p {
        margin: 5px 0;
      }

      strong {
        color: #ee439c;
      }
    }

    .bubble-login h2 {
      font-size: 17px;
      margin: 0 0 18px;
      text-align: center;
    }

    .bubble-login label {
      align-items: center;
      display: grid;
      gap: 9px;
      grid-template-columns: 54px minmax(0, 1fr);
      margin-bottom: 10px;
    }

    .bubble-login input {
      border: 1px solid #aaa;
      min-width: 0;
      padding: 8px;
      width: 100%;
    }

    .bubble-save {
      align-items: flex-start;
      display: flex;
      gap: 8px;
      margin: 15px 0;

      input {
        margin: 3px 0 0;
        width: auto;
      }
    }

    .bubble-login button,
    .bubble-action {
      background: #f7edd7;
      border: 1px solid #31302c;
      box-shadow: 2px 2px 0 #31302c;
      padding: 7px 13px;
    }

    .bubble-login .login-submit {
      display: block;
      margin: 14px auto 0;
    }

    .bubble-login .pink-link {
      background: none;
      border: 0;
      box-shadow: none;
      color: #ee439c;
      display: block;
      margin: 14px auto 0;
      padding: 3px;
      text-decoration: underline;
    }

    .bubble-footer {
      color: #454545;
      margin: 22px 0 0;
      text-align: center;
    }

    .bubble-header {
      align-items: center;
      background: #ee439c;
      color: #fff;
      display: flex;
      gap: 14px;
      justify-content: space-between;
      margin: -15px -15px 16px;
      padding: 12px 16px;

      button {
        background: transparent;
        border: 0;
        color: inherit;
        padding: 4px;
      }
    }

    .bubble-feed-layout {
      display: grid;
      gap: 16px;
      grid-template-columns: minmax(140px, 0.3fr) minmax(0, 1fr);
    }

    .bubble-profile,
    .bubble-post {
      background: #fff;
      border: 2px solid #31302c;
      margin-bottom: 12px;
      padding: 15px;
    }

    .bubble-profile h3,
    .bubble-post h3 {
      color: #ee439c;
      margin-top: 0;
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
      grid-template-columns: minmax(320px, 425fr) minmax(0, 1fr);
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
    .site-bubble .bubble-header {
      flex-wrap: wrap;
      height: auto;
      justify-content: flex-start;
      min-height: 65px;
      padding: 9px 14px;
    }

    .site-bubble .bubble-header nav {
      flex: 1 1 480px;
      order: 3;
    }

    .site-bubble .bubble-header > .site-search {
      flex: 1 1 260px;
      max-width: none;
    }

    .site-bubble .bubble-chat-layout {
      grid-template-columns: minmax(255px, 33%) minmax(0, 1fr);
      height: 800px;
    }

    .site-bubble .bubble-contact {
      grid-template-columns: 62px minmax(0, 1fr) auto;
      min-height: 96px;
      padding: 8px;
    }

    .site-bubble .bubble-contact > img {
      height: 60px;
      width: 60px;
    }

    .site-bubble .bubble-inbox h2 {
      flex-basis: 70px;
      padding: 0 18px;
    }

    .site-bubble .bubble-conversation-header {
      flex-basis: 70px;
      padding: 8px 12px;
    }

    .site-bubble .bubble-conversation-header > img {
      height: 52px;
      width: 52px;
    }

    .site-youspace .you-page-layout {
      gap: 32px;
      grid-template-columns: minmax(0, 1fr) minmax(270px, 32%);
      padding-left: 24px;
      padding-right: 24px;
    }

    .site-youspace .you-sidebar-panel ol {
      padding-left: 12px;
      padding-right: 12px;
    }

    .site-youspace .you-video-grid {
      gap: 30px 14px;
    }
  }

  @media (max-width: 720px) {
    .site-bubble .bubble-header {
      gap: 9px;
      padding: 8px 10px;
    }

    .site-bubble .bubble-wordmark {
      width: 92px;
    }

    .site-bubble .bubble-header nav {
      flex: 1 1 100%;
      gap: 0;
      justify-content: space-between;
      order: 4;
      overflow-x: auto;
    }

    .site-bubble .bubble-header nav button {
      font-size: 13px;
      gap: 3px;
      padding: 5px 3px;
    }

    .site-bubble .bubble-header nav img {
      height: 16px;
      width: 16px;
    }

    .site-bubble .bubble-header > .site-search {
      flex: 1 1 190px;
      min-width: 120px;
    }

    .site-bubble .bubble-logout {
      padding-left: 10px;
    }

    .site-bubble .bubble-page-heading {
      height: auto;
      margin: 18px 12px 24px;
      min-height: 112px;
      padding: 17px 18px;
    }

    .site-bubble .bubble-home-heading {
      min-height: 82px;
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
      font-size: 21px;
      padding: 0 16px;
    }

    .site-bubble .bubble-inbox-search {
      padding: 10px;
    }

    .site-bubble .bubble-contact-list {
      display: grid;
      grid-template-columns: 1fr;
      max-height: 300px;
    }

    .site-bubble .bubble-contact {
      grid-template-columns: 58px minmax(0, 1fr) auto;
      min-height: 78px;
      padding: 7px 9px;
    }

    .site-bubble .bubble-contact > img {
      height: 54px;
      width: 54px;
    }

    .site-bubble .bubble-contact-copy strong {
      font-size: 16px;
    }

    .site-bubble .bubble-contact-copy > span {
      font-size: 13px;
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

    .site-bubble .bubble-conversation-header strong {
      font-size: 17px;
    }

    .site-bubble .bubble-conversation-header span {
      font-size: 13px;
    }

    .site-bubble .bubble-message-list {
      padding: 14px 10px 8px;
    }

    .site-bubble .bubble-message-row {
      gap: 8px;
      margin-bottom: 16px;
    }

    .site-bubble .bubble-message-row > img {
      flex-basis: 38px;
      height: 38px;
      width: 38px;
    }

    .site-bubble .bubble-message-row p {
      max-width: 82%;
      min-height: 54px;
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

    .site-bubble .bubble-footer img {
      width: 85px;
    }

    .site-bubble .bubble-footer span {
      font-size: 13px;
    }

    .site-bubble .bubble-footer small {
      flex: 1 0 100%;
      font-size: 12px;
      margin: 0;
    }

    .site-bubble .bubble-feed-layout {
      grid-template-columns: 1fr;
      margin: 0 12px;
    }

    .site-youspace {
      min-height: 100%;
    }

    .site-youspace .you-topbar {
      flex-wrap: wrap;
      gap: 8px;
      min-height: 58px;
      padding: 8px 12px;
    }

    .site-youspace .you-topbar .you-home-link,
    .site-youspace .you-topbar .you-home-link img {
      flex-basis: 132px;
      width: 132px;
    }

    .site-youspace .you-topbar .site-search {
      flex: 1 1 190px;
    }

    .site-youspace .you-topbar .you-profile-control {
      flex: 0 0 36px;
    }

    .site-youspace .you-topbar .you-profile-button {
      height: 36px;
      width: 36px;
    }

    .site-youspace .you-page-layout {
      display: flex;
      flex-direction: column;
      gap: 34px;
      min-height: 0;
      padding: 26px 16px 54px;
    }

    .site-youspace .you-section-heading {
      align-items: flex-start;
      flex-direction: column;
      gap: 8px;
      min-height: 0;
      padding-bottom: 12px;
    }

    .site-youspace .you-section-heading h1 {
      font-size: clamp(28px, 7vw, 38px);
    }

    .site-youspace .you-section-heading > p {
      font-size: 14px;
      margin: 0;
    }

    .site-youspace .you-category-list {
      gap: 10px;
      margin: 18px 0 28px;
    }

    .site-youspace .you-category-list button {
      font-size: 14px;
      min-height: 40px;
      padding: 5px 12px;
    }

    .site-youspace .you-video-grid {
      gap: 24px 12px;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .site-youspace .you-video-card .you-video-title {
      font-size: 15px;
    }

    .site-youspace .you-video-card > p {
      font-size: 12px;
      line-height: 1.35;
    }

    .site-youspace .you-load-more {
      font-size: 17px;
      margin-top: 28px;
    }

    .site-youspace .you-sidebar {
      gap: 22px;
      padding: 0;
    }

    .site-youspace .you-sidebar-welcome h2,
    .site-youspace .you-sidebar-panel h2 {
      font-size: 22px;
    }

    .site-youspace .you-footer {
      flex-wrap: wrap;
      gap: 12px 18px;
      min-height: 115px;
      padding: 14px;
    }

    .site-youspace .you-footer > img {
      width: 110px;
    }

    .site-youspace .you-footer nav {
      flex-wrap: wrap;
      gap: 4px 12px;
    }

    .site-youspace .you-footer nav button {
      font-size: 13px;
      padding: 0;
    }

    .site-youspace .you-footer small {
      flex: 1 0 100%;
      font-size: 12px;
      margin: 0;
    }
  }

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
    grid-template-columns: minmax(260px, 22.2vw) minmax(0, 1fr);
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

  /* Bubble messages page restored to the published layout. */
  .site-bubble .bubble-published-page-content {
    box-sizing: border-box;
    margin: clamp(18px, 2.2vw, 32px) auto 0;
    max-width: 1196px;
    padding: 0 16px;
    width: 100%;
  }

  .site-bubble .bubble-published-page-banner {
    background: #f37319;
    border: 2px solid #181818;
    box-shadow: 4px 5px 0 #181818;
    color: #fff;
    margin-bottom: clamp(26px, 3vw, 42px);
    padding: 20px 24px;
  }

  .site-bubble .bubble-published-page-banner h1 {
    font-size: clamp(28px, 2.6vw, 42px);
    font-weight: 400;
    line-height: 1.05;
    margin: 0 0 5px;
  }

  .site-bubble .bubble-published-page-banner p {
    font-size: clamp(14px, 1.04vw, 18px);
    line-height: 1.35;
    margin: 0;
  }

  .site-bubble .bubble-published-messenger {
    border: 2px solid #181818;
    box-shadow: 4px 5px 0 #181818;
    display: grid;
    grid-template-columns: minmax(245px, 24%) minmax(0, 1fr);
    height: 655px;
    min-height: 520px;
    overflow: hidden;
  }

  .site-bubble .bubble-published-inbox {
    background: #fff;
    border-right: 2px solid #181818;
    display: flex;
    flex-direction: column;
    min-height: 0;
    min-width: 0;
  }

  .site-bubble .bubble-published-inbox > h2 {
    align-items: center;
    background: #f37319;
    border-bottom: 2px solid #181818;
    color: #fff;
    display: flex;
    flex: 0 0 68px;
    font-size: clamp(19px, 1.35vw, 24px);
    font-weight: 400;
    margin: 0;
    padding: 0 26px;
  }

  .site-bubble .bubble-published-inbox-search {
    align-items: center;
    background: #fff;
    border: 1px solid #aaa;
    box-sizing: border-box;
    display: flex;
    flex: 0 0 150px;
    gap: 8px;
    margin: 12px;
    padding: 10px;
  }

  .site-bubble .bubble-published-inbox-search input {
    background: #fff;
    border: 1px solid #aaa;
    flex: 1 1 auto;
    min-width: 0;
    padding: 7px 9px;
  }

  .site-bubble .bubble-published-inbox-search button {
    align-items: center;
    background: #fff;
    border: 1px solid #aaa;
    display: flex;
    flex: 0 0 36px;
    height: 36px;
    justify-content: center;
    padding: 5px;
  }

  .site-bubble .bubble-published-inbox-search button img {
    height: 20px;
    width: 20px;
  }

  .site-bubble .bubble-published-contact-list {
    flex: 1 1 auto;
    min-height: 0;
    overflow: auto;
  }

  .site-bubble .bubble-published-contact {
    align-items: center;
    background: #fff;
    border: 0;
    border-bottom: 1px solid #b7b7b7;
    display: grid;
    gap: 10px;
    grid-template-columns: 58px minmax(0, 1fr) auto;
    min-height: 88px;
    padding: 8px 10px;
    text-align: left;
    width: 100%;
  }

  .site-bubble .bubble-published-contact:hover,
  .site-bubble .bubble-published-contact.is-active {
    background: #ffddc7;
  }

  .site-bubble .bubble-published-contact.is-active {
    box-shadow: inset 4px 0 #f37319;
  }

  .site-bubble .bubble-published-contact > img {
    border: 2px solid #181818;
    box-shadow: 2px 3px 0 #181818;
    height: 54px;
    object-fit: cover;
    width: 54px;
  }

  .site-bubble .bubble-published-contact-copy {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .site-bubble .bubble-published-contact-copy strong {
    align-items: center;
    display: flex;
    font-size: clamp(14px, 1vw, 18px);
    font-weight: 400;
    gap: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .site-bubble .bubble-published-contact-copy i {
    background: #299c38;
    border-radius: 50%;
    flex: 0 0 7px;
    height: 7px;
  }

  .site-bubble .bubble-published-contact-copy small {
    color: #555;
    font-size: clamp(11px, 0.75vw, 14px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .site-bubble .bubble-published-contact-stamp {
    align-self: end;
    color: #555;
    font-size: 10px;
    text-align: right;
    white-space: nowrap;
  }

  .site-bubble .bubble-published-contact-stamp b {
    background: #f37319;
    border: 1px solid #181818;
    color: #181818;
    display: block;
    margin-bottom: 3px;
    padding: 1px 4px;
    text-align: center;
  }

  .site-bubble .bubble-published-empty-inbox {
    padding: 14px;
  }

  .site-bubble .bubble-published-chat {
    background: #f3f3f3;
    display: flex;
    flex-direction: column;
    min-height: 0;
    min-width: 0;
  }

  .site-bubble .bubble-published-chat-header {
    align-items: center;
    background: #f37319;
    border-bottom: 2px solid #181818;
    color: #fff;
    display: flex;
    flex: 0 0 84px;
    gap: 10px;
    padding: 8px 18px;
  }

  .site-bubble .bubble-published-chat-header > img {
    border: 2px solid #181818;
    box-shadow: 2px 3px 0 #181818;
    height: 62px;
    object-fit: cover;
    width: 62px;
  }

  .site-bubble .bubble-published-chat-header > div {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
  }

  .site-bubble .bubble-published-chat-header strong {
    font-size: clamp(16px, 1.12vw, 20px);
    font-weight: 400;
  }

  .site-bubble .bubble-published-chat-header small {
    font-size: 13px;
  }

  .site-bubble .bubble-published-chat-header button {
    background: #fff;
    border: 2px solid #181818;
    box-shadow: 2px 3px 0 #181818;
    color: #181818;
    padding: 5px 9px;
  }

  .site-bubble .bubble-published-chat-history {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    gap: 0;
    min-height: 0;
    overflow-y: auto;
    padding: 8px 14px 12px;
  }

  .site-bubble .bubble-published-message-fragment {
    display: contents;
  }

  .site-bubble .bubble-published-chat-day {
    align-items: center;
    color: #888;
    display: flex;
    font-size: 13px;
    gap: 16px;
    margin: 9px 0 12px;
  }

  .site-bubble .bubble-published-chat-day::before,
  .site-bubble .bubble-published-chat-day::after {
    background: #b8b8b8;
    content: "";
    height: 1px;
    width: 100%;
  }

  .site-bubble .bubble-published-message {
    align-items: flex-end;
    display: flex;
    gap: 10px;
    margin: 0 0 clamp(20px, 2.1vw, 36px);
    max-width: 100%;
  }

  .site-bubble .bubble-published-message.is-sent {
    justify-content: flex-end;
  }

  .site-bubble .bubble-published-message > img {
    border: 2px solid #181818;
    height: 42px;
    object-fit: cover;
    width: 42px;
  }

  .site-bubble .bubble-published-message > div {
    background: #fff;
    border: 1px solid #181818;
    box-shadow: 2px 3px 0 #181818;
    display: flex;
    flex-direction: column;
    max-width: min(68%, 510px);
    min-width: 92px;
    padding: 7px 9px 5px;
  }

  .site-bubble .bubble-published-message.is-sent > div {
    background: #ffddc7;
  }

  .site-bubble .bubble-published-message p {
    font-size: clamp(12px, 0.82vw, 15px);
    line-height: 1.3;
    margin: 0 0 5px;
    overflow-wrap: anywhere;
  }

  .site-bubble .bubble-published-message time {
    align-self: flex-end;
    font-size: 9px;
    line-height: 1;
  }

  .site-bubble .bubble-published-composer {
    background: #fff;
    border-top: 1px solid #b7b7b7;
    display: flex;
    flex: 0 0 74px;
    flex-direction: column;
    justify-content: space-between;
    padding: 7px 9px 8px;
  }

  .site-bubble .bubble-published-composer textarea {
    background: #fff;
    border: 0;
    flex: 1 1 auto;
    min-height: 32px;
    outline-color: #7d94b8;
    resize: none;
  }

  .site-bubble .bubble-published-composer > div {
    align-items: center;
    display: flex;
    gap: 7px;
    justify-content: flex-end;
  }

  .site-bubble .bubble-published-composer label {
    align-items: center;
    background: #f37319;
    border: 1px solid #181818;
    box-shadow: 2px 2px 0 #181818;
    display: inline-flex;
    height: 24px;
    justify-content: center;
    position: relative;
    width: 25px;
  }

  .site-bubble .bubble-published-composer label img {
    filter: brightness(0) invert(1);
    height: 15px;
    width: 15px;
  }

  .site-bubble .bubble-published-composer label input {
    cursor: pointer;
    height: 100%;
    inset: 0;
    opacity: 0;
    position: absolute;
    width: 100%;
  }

  .site-bubble .bubble-published-send {
    background: #f37319;
    border: 1px solid #181818;
    box-shadow: 2px 2px 0 #181818;
    color: #fff;
    padding: 3px 9px;
  }

  .site-bubble .bubble-published-send:disabled {
    opacity: 0.65;
  }

  .site-bubble .bubble-published-footer {
    background: #f37319;
    color: #fff;
    display: flex;
    gap: clamp(20px, 3vw, 50px);
    margin-top: 34px;
    min-height: 76px;
    padding: 14px 2.3vw;
  }

  .site-bubble .bubble-published-footer > strong {
    color: #fff;
    font-size: clamp(24px, 2vw, 36px);
    letter-spacing: -0.06em;
  }

  .site-bubble .bubble-published-footer nav {
    display: flex;
    gap: 20px;
  }

  .site-bubble .bubble-published-footer nav button {
    background: transparent;
    border: 0;
    color: #fff;
    padding: 0;
  }

  .site-bubble .bubble-published-footer small {
    font-size: 12px;
    margin-left: auto;
  }

  @container (max-width: 720px) {
    .site-bubble .bubble-published-page-content {
      padding: 0 12px;
    }

    .site-bubble .bubble-published-page-banner {
      margin-bottom: 20px;
      padding: 16px;
    }

    .site-bubble .bubble-published-messenger {
      grid-template-columns: minmax(0, 1fr);
      height: auto;
      min-height: 0;
    }

    .site-bubble .bubble-published-inbox {
      border-bottom: 2px solid #181818;
      border-right: 0;
      max-height: 390px;
    }

    .site-bubble .bubble-published-inbox > h2 {
      flex-basis: 54px;
      padding: 0 16px;
    }

    .site-bubble .bubble-published-inbox-search {
      flex-basis: 96px;
      margin: 8px;
      padding: 8px;
    }

    .site-bubble .bubble-published-contact-list {
      max-height: 220px;
    }

    .site-bubble .bubble-published-contact {
      grid-template-columns: 48px minmax(0, 1fr) auto;
      min-height: 68px;
      padding: 6px 8px;
    }

    .site-bubble .bubble-published-contact > img {
      height: 44px;
      width: 44px;
    }

    .site-bubble .bubble-published-chat {
      min-height: 540px;
    }

    .site-bubble .bubble-published-chat-header {
      flex-basis: 66px;
      padding: 6px 9px;
    }

    .site-bubble .bubble-published-chat-header > img {
      height: 48px;
      width: 48px;
    }

    .site-bubble .bubble-published-chat-history {
      padding: 8px 8px 12px;
    }

    .site-bubble .bubble-published-message > img {
      height: 34px;
      width: 34px;
    }

    .site-bubble .bubble-published-message > div {
      max-width: 78%;
    }

    .site-bubble .bubble-published-footer {
      flex-wrap: wrap;
      gap: 10px 16px;
      padding: 12px;
    }

    .site-bubble .bubble-published-footer nav {
      gap: 12px;
    }

    .site-bubble .bubble-published-footer small {
      flex: 1 0 100%;
      margin: 0;
    }
  }
`;

export default StyledInternalSites;
