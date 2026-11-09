import styled from "styled-components";
import { type InternalSiteId } from "components/apps/Browser/config";

type StyledInternalSitesProps = {
  $site: InternalSiteId;
};

const StyledInternalSites = styled.main<StyledInternalSitesProps>`
  background: ${({ $site }) =>
    $site === "gluugli" ? "#89c1ff" : $site === "bubble" ? "#ebf2fb" : "#fff"};
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

`;

export default StyledInternalSites;
