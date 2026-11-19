import { AnimatePresence } from "motion/react";
import dynamic from "next/dynamic";
import StyledTaskbarEntries from "components/system/Taskbar/TaskbarEntries/StyledTaskbarEntries";
import { useProcesses, useProcessesActions } from "contexts/process";
import { PROCESS_DELIMITER } from "utils/constants";

const TaskbarEntry = dynamic(
  () => import("components/system/Taskbar/TaskbarEntry")
);

type TaskbarEntriesProps = {
  clockWidth: number;
  hasAI: boolean;
};

const TaskbarEntries: FC<TaskbarEntriesProps> = ({ clockWidth, hasAI }) => {
  const processes = useProcesses();
  const { open } = useProcessesActions();
  const processIsOpen = (name: string): boolean =>
    Object.keys(processes).some(
      (id) => id === name || id.startsWith(`${name}${PROCESS_DELIMITER}`)
    );

  return (
    <StyledTaskbarEntries
      $clockWidth={clockWidth}
      $hasAI={hasAI}
      aria-label="Running applications"
    >
      <AnimatePresence initial={false} presenceAffectsLayout={false}>
        {!processIsOpen("Browser") && (
          <li className="doors-taskbar-pinned" key="pinned-browser">
            <button aria-label="Abrir Internet Expandida" onClick={() => open("Browser")} title="Internet Expandida" type="button">
              <img alt="" src="/System/Doors/figma/icon-internet-expanded.png" />
            </button>
          </li>
        )}
        {!processIsOpen("FileExplorer") && (
          <li className="doors-taskbar-pinned" key="pinned-folders">
            <button aria-label="Abrir Pastas" onClick={() => open("FileExplorer", { url: "/Users/Public/Documents" })} title="Pastas" type="button">
              <img alt="" src="/System/Doors/figma/icon-documents.png" />
            </button>
          </li>
        )}
        {Object.entries(processes)
          .filter(
            ([, { closing, hideTaskbarEntry }]) => !closing && !hideTaskbarEntry
          )
          .map(([id, { icon, title }]) => (
            <TaskbarEntry key={id} icon={icon} id={id} title={title} />
          ))}
      </AnimatePresence>
    </StyledTaskbarEntries>
  );
};

export default TaskbarEntries;
