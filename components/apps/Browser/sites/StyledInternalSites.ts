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
`;

export default StyledInternalSites;
