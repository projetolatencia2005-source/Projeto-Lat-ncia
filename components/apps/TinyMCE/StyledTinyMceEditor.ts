import styled from "styled-components";
import FocusRing from "styles/common/FocusRing";

const StyledTinyMceEditor = styled.div`
  height: 100%;

  &.doors-post-it {
    background: #e1edff;

    [role="application"] {
      background: #e1edff;
      border: 0;

      .tox-editor-header,
      .tox-statusbar {
        display: none;
      }

      .tox-edit-area,
      .tox-edit-area__iframe,
      iframe {
        background: #e1edff;
      }
    }
  }

  [role="application"] {
    border-radius: 0;
    height: 100% !important;

    button[aria-disabled="true"] {
      pointer-events: none;

      svg {
        fill: rgb(255 255 255 / 50%);
      }
    }

    .tox-statusbar {
      font-size: 12px;
    }

    &[aria-disabled="true"] {
      .tox-editor-header {
        height: 0;
        margin-top: -1px;
        overflow: hidden;
        padding: 0;
        position: relative;

        /* Only its parts hide, as a hidden header couldn't take focus */
        > * {
          visibility: hidden;
        }

        &::after {
          bottom: 0;
          color: rgb(200 200 200);
          content: "Edit Document";
          cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
          display: flex;
          font-size: 12px;
          font-weight: 600;
          height: 24px;
          left: 0;
          padding: 0 10px;
          padding-bottom: 2px;
          place-content: center;
          place-items: center;
          position: fixed;
          transform: translateZ(0);
          width: auto;
          z-index: 1;
        }

        &:hover::after {
          background-color: rgb(255 255 255 / 15%);
        }

        :root[data-keyboard] &:focus {
          box-shadow: none;
          outline: 0;

          &::after {
            ${FocusRing};
          }
        }

        .tox-toolbar-overlord {
          display: none;
        }
      }

      /* stylelint-disable selector-class-pattern */
      .tox-statusbar__path-item {
        display: none;
      }
      /* stylelint-enable selector-class-pattern */
    }

    iframe {
      background-color: #202124;
    }
  }
`;

export default StyledTinyMceEditor;
