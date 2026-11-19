import { AnimatePresence } from "motion/react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { TaskbarEntryDragProps } from "components/system/Taskbar/TaskbarEntry";
import StyledTaskbarEntries from "components/system/Taskbar/TaskbarEntries/StyledTaskbarEntries";
import { useProcesses, useProcessesActions } from "contexts/process";
import { PROCESS_DELIMITER } from "utils/constants";

const TaskbarEntry = dynamic(
  () => import("components/system/Taskbar/TaskbarEntry")
);
const TASKBAR_ORDER_STORAGE_KEY = "doors-taskbar-entry-order";

type TaskbarItem = {
  icon?: string;
  id?: string;
  index: number;
  key: string;
  kind: "browser" | "folders" | "process";
  title?: string;
};

type TaskbarEntriesProps = {
  clockWidth: number;
  hasAI: boolean;
};

const TaskbarEntries: FC<TaskbarEntriesProps> = ({ clockWidth, hasAI }) => {
  const processes = useProcesses();
  const { open } = useProcessesActions();
  const [entryOrder, setEntryOrder] = useState<string[]>([]);
  const [entryOrderLoaded, setEntryOrderLoaded] = useState(false);
  const [draggedKey, setDraggedKey] = useState<string | null>(null);
  const [dropTargetKey, setDropTargetKey] = useState<string | null>(null);
  const draggedKeyRef = useRef<string | null>(null);
  const suppressClickRef = useRef(false);
  const processIsOpen = (name: string): boolean =>
    Object.keys(processes).some(
      (id) => id === name || id.startsWith(`${name}${PROCESS_DELIMITER}`)
    );

  const processEntries = Object.entries(processes).filter(
    ([, { closing, hideTaskbarEntry }]) => !closing && !hideTaskbarEntry
  );
  const taskbarItems: TaskbarItem[] = [];
  let browserSlotAssigned = false;
  let foldersSlotAssigned = false;

  if (!processIsOpen("Browser")) {
    taskbarItems.push({
      index: taskbarItems.length,
      key: "app:Browser",
      kind: "browser",
    });
  }
  if (!processIsOpen("FileExplorer")) {
    taskbarItems.push({
      index: taskbarItems.length,
      key: "app:FileExplorer",
      kind: "folders",
    });
  }

  processEntries.forEach(([id, { icon, title }]) => {
    let key = `process:${id}`;

    if (id.startsWith("Browser") && !browserSlotAssigned) {
      key = "app:Browser";
      browserSlotAssigned = true;
    } else if (id.startsWith("FileExplorer") && !foldersSlotAssigned) {
      key = "app:FileExplorer";
      foldersSlotAssigned = true;
    }

    taskbarItems.push({
      icon,
      id,
      index: taskbarItems.length,
      key,
      kind: "process",
      title,
    });
  });

  const itemKeys = taskbarItems.map(({ key }) => key);
  const itemKeysSignature = JSON.stringify(itemKeys);

  useEffect(() => {
    try {
      const savedOrder = JSON.parse(
        window.localStorage.getItem(TASKBAR_ORDER_STORAGE_KEY) || "[]"
      );
      if (Array.isArray(savedOrder)) {
        setEntryOrder(savedOrder.filter((key): key is string => typeof key === "string"));
      }
    } catch {
      // Keep the default order when browser storage is unavailable.
    }
    setEntryOrderLoaded(true);
  }, []);

  useEffect(() => {
    if (!entryOrderLoaded) return;

    setEntryOrder((currentOrder) => {
      const nextOrder = [...currentOrder];
      let changed = false;

      (JSON.parse(itemKeysSignature) as string[]).forEach((key) => {
        if (nextOrder.includes(key)) return;

        nextOrder.push(key);
        changed = true;
      });

      return changed ? nextOrder : currentOrder;
    });
  }, [entryOrderLoaded, itemKeysSignature]);

  useEffect(() => {
    if (!entryOrderLoaded) return;

    try {
      window.localStorage.setItem(
        TASKBAR_ORDER_STORAGE_KEY,
        JSON.stringify(entryOrder)
      );
    } catch {
      // Reordering still works for the current session.
    }
  }, [entryOrder, entryOrderLoaded]);

  const moveTaskbarItem = (
    sourceKey: string,
    targetKey: string,
    afterTarget: boolean
  ): void => {
    if (sourceKey === targetKey) return;

    setEntryOrder((currentOrder) => {
      const nextOrder = [...currentOrder];
      itemKeys.forEach((key) => {
        if (!nextOrder.includes(key)) nextOrder.push(key);
      });

      const sourceIndex = nextOrder.indexOf(sourceKey);
      const targetIndex = nextOrder.indexOf(targetKey);
      if (sourceIndex < 0 || targetIndex < 0) return currentOrder;

      const [movedKey] = nextOrder.splice(sourceIndex, 1);
      const adjustedTargetIndex = nextOrder.indexOf(targetKey);
      nextOrder.splice(adjustedTargetIndex + (afterTarget ? 1 : 0), 0, movedKey);

      return nextOrder;
    });
  };

  const orderedItems = [...taskbarItems].sort((first, second) => {
    const firstOrder = entryOrder.indexOf(first.key);
    const secondOrder = entryOrder.indexOf(second.key);
    const normalizedFirst = firstOrder < 0 ? Number.MAX_SAFE_INTEGER : firstOrder;
    const normalizedSecond = secondOrder < 0 ? Number.MAX_SAFE_INTEGER : secondOrder;

    return normalizedFirst === normalizedSecond
      ? first.index - second.index
      : normalizedFirst - normalizedSecond;
  });

  const getDragProps = (key: string): TaskbarEntryDragProps => ({
    "data-taskbar-dragging": draggedKey === key ? "true" : undefined,
    "data-taskbar-drop-target": dropTargetKey === key ? "true" : undefined,
    draggable: true,
    onClickCapture: (event) => {
      if (!suppressClickRef.current) return;

      event.preventDefault();
      event.stopPropagation();
      suppressClickRef.current = false;
    },
    onDragEnd: (event) => {
      draggedKeyRef.current = null;
      setDraggedKey(null);
      setDropTargetKey(null);
      suppressClickRef.current = true;
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 150);
      event.stopPropagation();
    },
    onDragOver: (event) => {
      if (!draggedKeyRef.current) return;

      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      setDropTargetKey(key);
      event.stopPropagation();
    },
    onDragStart: (event) => {
      draggedKeyRef.current = key;
      setDraggedKey(key);
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", key);
      event.stopPropagation();
    },
    onDrop: (event) => {
      const sourceKey =
        draggedKeyRef.current || event.dataTransfer.getData("text/plain");
      if (!sourceKey) return;

      event.preventDefault();
      event.stopPropagation();
      const { left, width } = event.currentTarget.getBoundingClientRect();
      moveTaskbarItem(sourceKey, key, event.clientX >= left + width / 2);
    },
    onKeyDownCapture: (event) => {
      if (!event.altKey || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;

      const orderedKeys = orderedItems.map(({ key: itemKey }) => itemKey);
      const currentIndex = orderedKeys.indexOf(key);
      const targetKey = orderedKeys[currentIndex + (event.key === "ArrowRight" ? 1 : -1)];
      if (!targetKey) return;

      event.preventDefault();
      event.stopPropagation();
      moveTaskbarItem(key, targetKey, event.key === "ArrowRight");
    },
  });

  return (
    <StyledTaskbarEntries
      $clockWidth={clockWidth}
      $hasAI={hasAI}
      aria-label="Running applications"
    >
      <AnimatePresence initial={false} presenceAffectsLayout={false}>
        {orderedItems.map((item) => {
          const dragProps = getDragProps(item.key);

          if (item.kind === "browser") {
            return (
              <li className="doors-taskbar-pinned" key={item.key} {...dragProps}>
                <button
                  aria-label="Abrir Internet Expandida"
                  onClick={() => open("Browser")}
                  title="Internet Expandida"
                  type="button"
                >
                  <img alt="" src="/System/Doors/figma/icon-internet-expanded.png" />
                </button>
              </li>
            );
          }

          if (item.kind === "folders") {
            return (
              <li className="doors-taskbar-pinned" key={item.key} {...dragProps}>
                <button
                  aria-label="Abrir Pastas"
                  onClick={() => open("FileExplorer", { url: "/Users/Public/Documents" })}
                  title="Pastas"
                  type="button"
                >
                  <img alt="" src="/System/Doors/figma/icon-documents.png" />
                </button>
              </li>
            );
          }

          return (
            <TaskbarEntry
              dragProps={dragProps}
              icon={item.icon ?? ""}
              id={item.id ?? ""}
              key={item.key}
              title={item.title ?? ""}
            />
          );
        })}
      </AnimatePresence>
    </StyledTaskbarEntries>
  );
};

export default TaskbarEntries;
