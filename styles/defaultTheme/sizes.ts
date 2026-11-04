const sizes = {
  calendar: {
    maxHeight: 357,
  },
  clock: {
    fontSize: "16px",
    padding: 5,
  },
  contextMenu: {
    subMenuOffset: 3,
  },
  fileEntry: {
    fontSize: "clamp(16px, 1.042vw, 20px)",
    iconPadding: "2px",
    iconSize: "clamp(48px, 4.167vw, 80px)",
    maxIconTextDisplayWidth: 123,
    maxListTextDisplayWidth: 100,
    renamePadding: 5,
    renameWidth: 75,
  },
  fileExplorer: {
    menuBarHeight: "38px",
    minimumStatusBarWidth: 268,
    navBarHeight: "60px",
    navInputHeight: 38,
    statusBarHeight: "23px",
  },
  fileManager: {
    columnGap: "1px",
    columnHeight: 25,
    columnMinWidth: 70,
    columnResizeWidth: 7,
    detailsEndPadding: 16,
    detailsRowHeight: "22px",
    detailsStartPadding: 14,
    gridEntryHeight: "clamp(91px, 6.72vw, 129px)",
    gridEntryWidth: "clamp(98px, 6.406vw, 123px)",
    padding: "5px 0",
    rowGap: "clamp(10px, 0.938vw, 18px)",
  },
  search: {
    headerHeight: 52,
    inputHeight: 40,
    maxHeight: 415,
    size: 600,
  },
  startMenu: {
    maxHeight: 550,
    sideBar: {
      buttonHeight: 48,
      expandedWidth: "228px",
      iconSize: "16px",
      width: 48,
    },
    size: 450,
  },
  taskbar: {
    ai: {
      buttonWidth: "40px",
      chatWidth: 415,
    },
    blur: "5px",
    button: {
      iconSize: "15px",
      width: 36,
    },
    entry: {
      borderSize: "2px",
      fontSize: "12px",
      iconSize: "16px",
      maxWidth: "160px",
      peekControlsHeight: 36,
      peekImage: {
        height: 82,
        margin: 8,
      },
    },
    panelBlur: "12px",
  },
  titleBar: {
    buttonIconWidth: "10px",
    buttonWidth: "34px",
    fontSize: "12px",
    height: 38,
    iconMarginRight: "4px",
    iconSize: "16px",
  },
  window: {
    cascadeOffset: 26,
    outline: "2px",
    textTopPadding: 14,
  },
};

export default sizes;
