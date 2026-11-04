import styled from "styled-components";
import StyledLoading from "components/system/Apps/StyledLoading";
import StyledDetailsFileManager from "components/system/Files/Views/Details/StyledFileManager";
import StyledIconFileEntry from "components/system/Files/Views/Icon/StyledFileEntry";
import StyledIconFileManager from "components/system/Files/Views/Icon/StyledFileManager";

const StyledFileExplorer = styled.div`
  cursor: url("/System/Doors/cursors/mouse.svg") 0 0, default;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  overflow: hidden;

  .file-explorer-workspace {
    display: flex;
    flex: 1 1 auto;
    min-height: 0;
    min-width: 0;
    position: relative;
  }

  .quick-access-sidebar {
    background: #f2f6fc;
    border: 2px solid #2670b8;
    display: flex;
    flex: 0 0 clamp(146px, 18vw, 180px);
    flex-direction: column;
    min-height: 0;
    overflow-y: auto;
    padding: 1px;
  }

  .quick-access-entry {
    align-items: center;
    background: transparent;
    border: 1px solid transparent;
    color: #26364b;
    cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
    display: flex;
    flex: 0 0 42px;
    font-family: inherit;
    font-size: 14px;
    gap: 10px;
    justify-content: flex-start;
    padding: 0 12px;
    text-align: left;
    white-space: nowrap;

    img {
      flex: 0 0 32px;
      height: 26px;
      object-fit: contain;
      width: 32px;
    }

    &:hover {
      background: #e6eef8;
      border-color: #91a3bb;
    }

    &[aria-current="page"] {
      background: #d7e7f8;
      border-color: #31302c;
    }
  }

  .quick-access-entry.workspace-entry {
    flex-basis: 50px;
    line-height: 1.1;
    white-space: normal;
  }

  .file-explorer-main {
    flex: 1 1 auto;
    min-height: 0;
    min-width: 0;
    position: relative;
  }

  .file-explorer-main.workspace-folder > ${StyledIconFileManager} {
    gap: 0;
    grid-auto-rows: 80px;
    grid-template-columns: repeat(auto-fill, 80px);
    grid-template-rows: none;
    padding: 6px;
  }

  .file-explorer-main.workspace-folder
    > ${StyledIconFileManager}
    > ${StyledIconFileEntry} {
    box-sizing: border-box;
    height: 80px;
    margin: 0;
    padding: 0;
    width: 80px;
  }

  .file-explorer-main.workspace-folder
    > ${StyledIconFileManager}
    > ${StyledIconFileEntry}
    > button {
    align-items: center;
    box-sizing: border-box;
    display: flex;
    height: 100%;
    justify-content: center;
    padding: 0;
    width: 100%;
  }

  .file-explorer-main.workspace-folder
    > ${StyledIconFileManager}
    > ${StyledIconFileEntry}
    > button
    > figure {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 4px;
    height: 100%;
    justify-content: center;
    margin: 0;
    width: 100%;

    picture:first-of-type {
      height: 40px;
      width: 40px;
    }

    figcaption {
      font-size: 12px;
      line-height: 1.1;
      max-width: 72px;
      overflow-wrap: normal;
      padding: 0;
      text-align: center;
      transform: translateY(8px);
      white-space: normal;
      width: 100%;
      word-break: normal;
    }
  }

  .file-explorer-main.photos-folder > ol {
    display: grid;
    gap: 22px 45px;
    grid-auto-rows: 309px;
    grid-template-columns: repeat(6, 167px);
    grid-template-rows: none;
    overflow: auto;
    padding: 20px 38px;
  }

  .file-explorer-main.photos-folder > ol > li {
    box-sizing: border-box;
    height: 309px;
    margin: 0;
    padding: 0;
    width: 167px;
  }

  .file-explorer-main.photos-folder > ol > li > button {
    align-items: flex-start;
    background: transparent;
    border: 1px solid transparent;
    box-sizing: border-box;
    display: flex;
    height: 100%;
    justify-content: center;
    padding: 0;
    width: 100%;

    &:hover,
    &:focus-visible {
      background: #e7eff9;
      border-color: #91a3bb;
    }

    &:active {
      background: #d7e4f7;
    }
  }

  .file-explorer-main.photos-folder > ol > li > button > figure {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 8px;
    height: 100%;
    justify-content: flex-start;
    margin: 0;
    width: 100%;

    picture:first-of-type {
      background: #f7edd7;
      border: 2px solid #31302c;
      box-shadow: 5px 5px 0 #31302c;
      box-sizing: border-box;
      flex: 0 0 269px;
      height: 269px;
      width: 162px;

      img {
        height: 100%;
        max-height: none;
        max-width: none;
        object-fit: cover;
        width: 100%;
      }
    }

    picture:not(:first-of-type) {
      display: none;
    }

    figcaption {
      color: #31302c;
      font-family: "Pixelify Sans", monospace;
      font-size: 16px;
      line-height: 1.2;
      max-width: 100%;
      overflow-wrap: anywhere;
      padding: 0;
      text-align: center;
      text-shadow: none;
      width: 100%;
    }
  }

  @media (max-width: 1400px) {
    .file-explorer-main.photos-folder > ol {
      gap: 22px 28px;
      grid-template-columns: repeat(4, 167px);
      padding-left: 24px;
    }
  }

  @media (max-width: 1000px) {
    .file-explorer-main.photos-folder > ol {
      gap: 22px 18px;
      grid-template-columns: repeat(3, 167px);
      padding-left: 16px;
    }
  }

  @media (max-width: 700px) {
    .file-explorer-main.photos-folder > ol {
      gap: 18px 12px;
      grid-template-columns: repeat(2, 167px);
      padding-left: 12px;
    }
  }

  .file-explorer-main
    ${StyledDetailsFileManager},
    .file-explorer-main
    ${StyledIconFileManager} {
    height: ${({ theme }) =>
      `calc(100% - ${theme.sizes.fileExplorer.statusBarHeight})`};
    min-height: 0;
  }

  .file-explorer-main.photos-folder ${StyledIconFileEntry} {
    align-items: flex-start;
    display: flex;
    justify-content: center;
  }

  ${StyledIconFileManager} {
    column-gap: 2px;
    padding: 6px 6px 6px 14px;

    figcaption {
      padding: 1px 0 2px;
    }
  }

  .file-explorer-main.photos-folder > ${StyledIconFileManager} {
    gap: 22px 45px;
    grid-auto-rows: 309px;
    grid-template-columns: repeat(6, 167px);
    grid-template-rows: none;
    padding: 20px 38px;
  }

  @media (max-width: 1400px) {
    .file-explorer-main.photos-folder > ${StyledIconFileManager} {
      gap: 22px 28px;
      grid-template-columns: repeat(4, 167px);
      padding-left: 24px;
    }
  }

  @media (max-width: 1000px) {
    .file-explorer-main.photos-folder > ${StyledIconFileManager} {
      gap: 22px 18px;
      grid-template-columns: repeat(3, 167px);
      padding-left: 16px;
    }
  }

  @media (max-width: 700px) {
    .file-explorer-main.photos-folder > ${StyledIconFileManager} {
      gap: 18px 12px;
      grid-template-columns: repeat(2, 167px);
      padding-left: 12px;
    }
  }

  .file-explorer-main ${StyledLoading} {
    height: ${({ theme }) =>
      `calc(100% - ${theme.sizes.fileExplorer.statusBarHeight})`};
    left: 0;
    position: absolute;
    top: 0;
  }

  .file-explorer-main > [aria-label="This folder is empty."] {
    bottom: ${({ theme }) => theme.sizes.fileExplorer.statusBarHeight};
    left: 0;
    right: 0;
    top: 0;
  }

  @media (max-width: 620px) {
    .quick-access-sidebar {
      flex-basis: 132px;
    }

    .quick-access-entry {
      font-size: 12px;
      gap: 6px;
      padding: 0 5px;

      img {
        flex-basis: 28px;
        width: 28px;
      }
    }
  }
`;

export default StyledFileExplorer;
