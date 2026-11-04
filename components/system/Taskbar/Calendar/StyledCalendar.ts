import { m as motion } from "motion/react";
import styled from "styled-components";
import { TASKBAR_HEIGHT } from "utils/constants";

const StyledCalendar = styled(motion.section)`
  backdrop-filter: ${({ theme }) => `blur(${theme.sizes.taskbar.panelBlur})`};
  background-color: #d7e4f7;
  border: 2px solid #31302c;
  bottom: ${TASKBAR_HEIGHT}px;
  position: absolute;
  right: 0;
  z-index: 10000;

  table {
    padding: 4px 10px 19px;
    white-space: nowrap;

    td,
    th {
      color: #31302c;
      box-sizing: border-box;
      display: inline-table;
      font-weight: inherit;
      height: 35px;
      line-height: 32px;
      margin: 1px;
      text-align: center;
      width: 36px;

      &.prev,
      &.next {
        color: #777;
      }
    }

    tbody td {
      border: 2px solid #31302c;
      background-color: #f7edd7;
      box-shadow: 3px 3px 0 #31302c;
    }

    thead {
      font-size: 12px;

      td[colspan] {
        display: table-cell;
        padding: 0;

        div {
          display: flex;
          font-size: 15px;
          padding: 0 16px 0 12px;
          place-content: space-between;

          header {
            color: #31302c;

            &:hover {
              color: #000;
            }

            &:active {
              color: #555;
            }
          }
        }
      }

      th {
        height: auto;
        margin-top: -1px;
      }

      nav {
        display: flex;
        flex-direction: row;
        gap: 8px;
        padding-top: 2px;

        button {
          align-items: center;
          background: transparent;
          border: 0;
          display: inline-flex;
          flex: 0 0 30px;
          height: 30px;
          justify-content: center;
          padding: 0;
          width: 30px;

          &:hover {
            filter: brightness(1.04);
          }

          &:active {
            filter: brightness(0.94);
            transform: translate(2px, 2px);
          }

          img {
            height: 30px;
            width: 30px;
          }
        }
      }
    }

    tbody.curr td.today {
      background-color: rgb(0 120 215);
      color: #fff;
      border-color: #000;

      &:hover {
        border-color: rgb(102 174 231);
      }

      &:active {
        border-color: rgb(153 201 239);
      }
    }
  }
`;

export default StyledCalendar;
