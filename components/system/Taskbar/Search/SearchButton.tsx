import { useTheme } from "styled-components";
import {
  importSearch,
  SEARCH_BUTTON_TITLE,
} from "components/system/Taskbar/functions";
import StyledSearchButton from "components/system/Taskbar/Search/StyledSearchButton";
import useTaskbarContextMenu from "components/system/Taskbar/useTaskbarContextMenu";
import { useMenuPreload } from "hooks/useMenuPreload";
import { CLICK_FOCUSABLE_ELEMENT, SEARCH_ICON } from "utils/constants";
import { label } from "utils/functions";

type StartButtonProps = {
  searchVisible: boolean;
  toggleSearch: (showMenu?: boolean) => void;
};

const SearchIcon: FC = () => (
  <img
    alt=""
    aria-hidden="true"
    className="taskbar-search-icon"
    draggable={false}
    src={SEARCH_ICON}
  />
);

const SearchButton: FC<StartButtonProps> = ({
  searchVisible,
  toggleSearch,
}) => {
  const {
    sizes: { taskbar },
  } = useTheme();
  const onClick = (): void => toggleSearch();

  return (
    <StyledSearchButton
      $active={searchVisible}
      $left={taskbar.button.width}
      aria-expanded={searchVisible}
      aria-haspopup="dialog"
      {...(searchVisible && { "aria-controls": "searchMenu" })}
      onClick={onClick}
      {...CLICK_FOCUSABLE_ELEMENT}
      {...label(SEARCH_BUTTON_TITLE)}
      {...useTaskbarContextMenu()}
      {...useMenuPreload(importSearch)}
    >
      <SearchIcon />
    </StyledSearchButton>
  );
};

export default SearchButton;
