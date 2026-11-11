import { AnimatePresence } from "motion/react";
import dynamic from "next/dynamic";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import Clock from "components/system/Taskbar/Clock";
import {
  importAIButton,
  importAIChat,
  importCalendar,
  importSearch,
  importStartMenu,
  SEARCH_MENU_EVENT,
} from "components/system/Taskbar/functions";
import { useProcessesActions } from "contexts/process";
import StartButton from "components/system/Taskbar/StartButton";
import StyledTaskbar from "components/system/Taskbar/StyledTaskbar";
import TaskbarEntries from "components/system/Taskbar/TaskbarEntries";
import useTaskbarContextMenu from "components/system/Taskbar/useTaskbarContextMenu";
import { useShowAI } from "hooks/useWindowAI";
import { CLOCK_CANVAS_BASE_WIDTH, FOCUSABLE_ELEMENT } from "utils/constants";
import { haltEvent } from "utils/functions";
import { focusByKey } from "utils/keyboard";
import {
  getSystemVolume,
  installSystemAudioVolume,
  registerSystemMedia,
  setSystemVolume,
  unregisterSystemMedia,
} from "utils/systemVolume";

const AIButton = dynamic(importAIButton);
const AIChat = dynamic(importAIChat);
const Calendar = dynamic(importCalendar);
const Search = dynamic(importSearch);
const StartMenu = dynamic(importStartMenu);

const onSystemMediaPlay = (event: Event): void => {
  if (
    event.target &&
    (event.target as Element).matches?.("audio, video")
  ) {
    registerSystemMedia(event.target as HTMLMediaElement);
  }
};

const SystemTray: FC = () => {
  const { open } = useProcessesActions();
  const [volume, setVolume] = useState(() =>
    Math.round(getSystemVolume() * 100)
  );
  const [volumeControlOpen, setVolumeControlOpen] = useState(false);
  const trayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observedDocuments = new Map<
      Document,
      { observer: MutationObserver; onPlay: (event: Event) => void }
    >();
    const observedFrames = new Map<HTMLIFrameElement, () => void>();

    const elementsInNode = (node: Node, selector: string): Element[] => {
      if (node.nodeType !== 1 && node.nodeType !== 9) return [];

      const root = node as ParentNode;
      const matches = [...root.querySelectorAll(selector)];

      if (node.nodeType === 1 && (node as Element).matches(selector)) {
        matches.unshift(node as Element);
      }

      return matches;
    };

    const syncMediaInNode = (node: Node, register: boolean): void => {
      elementsInNode(node, "audio, video").forEach((element) => {
        const media = element as HTMLMediaElement;
        if (register) registerSystemMedia(media);
        else unregisterSystemMedia(media);
      });
    };

    // oxlint-disable no-use-before-define, func-style -- These observer helpers call each other to manage nested iframes.
    const stopObservingDocument = (targetDocument: Document): void => {
      const observed = observedDocuments.get(targetDocument);
      if (!observed) return;

      observed.observer.disconnect();
      targetDocument.removeEventListener("play", observed.onPlay, true);
      syncMediaInNode(targetDocument, false);
      elementsInNode(targetDocument, "iframe").forEach((element) => {
        removeFrame(element as HTMLIFrameElement);
      });
      observedDocuments.delete(targetDocument);
    };

    function observeDocument(targetDocument: Document): void {
      if (observedDocuments.has(targetDocument)) return;

      const targetWindow = targetDocument.defaultView;
      if (!targetWindow) return;

      installSystemAudioVolume(targetWindow);
      syncMediaInNode(targetDocument, true);

      const observer = new targetWindow.MutationObserver((mutations) => {
        mutations.forEach(({ addedNodes, removedNodes }) => {
          addedNodes.forEach((node) => {
            syncMediaInNode(node, true);
            elementsInNode(node, "iframe").forEach((element) => {
              observeFrame(element as HTMLIFrameElement);
            });
          });
          removedNodes.forEach((node) => {
            syncMediaInNode(node, false);
            elementsInNode(node, "iframe").forEach((element) => {
              removeFrame(element as HTMLIFrameElement);
            });
          });
        });
      });

      observer.observe(targetDocument.documentElement, {
        childList: true,
        subtree: true,
      });
      targetDocument.addEventListener("play", onSystemMediaPlay, true);
      observedDocuments.set(targetDocument, {
        observer,
        onPlay: onSystemMediaPlay,
      });
      elementsInNode(targetDocument, "iframe").forEach((element) => {
        observeFrame(element as HTMLIFrameElement);
      });
    }

    function observeFrame(frame: HTMLIFrameElement): void {
      if (observedFrames.has(frame)) return;

      const onLoad = (): void => {
        try {
          if (frame.contentDocument) observeDocument(frame.contentDocument);
        } catch {
          // Cross-origin frames cannot be controlled by the desktop volume.
        }
      };

      observedFrames.set(frame, onLoad);
      frame.addEventListener("load", onLoad);
      onLoad();
    }

    function removeFrame(frame: HTMLIFrameElement): void {
      const onLoad = observedFrames.get(frame);
      if (!onLoad) return;

      frame.removeEventListener("load", onLoad);
      observedFrames.delete(frame);
      try {
        if (frame.contentDocument) {
          stopObservingDocument(frame.contentDocument);
        }
      } catch {
        // Cross-origin frames cannot be controlled by the desktop volume.
      }
    }
    // oxlint-enable no-use-before-define, func-style

    observeDocument(document);

    return () => stopObservingDocument(document);
  }, []);

  useEffect(() => {
    if (!volumeControlOpen) return;

    const closeOnOutsideClick = (event: PointerEvent): void => {
      if (
        event.target instanceof Node &&
        !trayRef.current?.contains(event.target)
      ) {
        setVolumeControlOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent): void => {
      if (event.key === "Escape") setVolumeControlOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [volumeControlOpen]);

  const changeVolume = (nextVolume: number): void => {
    const next = Math.max(0, Math.min(100, nextVolume));
    setVolume(next);
    setSystemVolume(next / 100);
  };

  return (
    <div ref={trayRef} className="doors-system-tray">
      <button
        aria-label="Acessibilidade"
        className="doors-accessibility-toggle"
        onClick={() => open("Accessibility")}
        type="button"
      >
        <img alt="" aria-hidden="true" src="/System/Icons/accessibility.svg" />
      </button>
      <img
        alt=""
        aria-hidden="true"
        src="/System/Doors/figma/icon-tray-alert.svg"
      />
      <img
        alt=""
        aria-hidden="true"
        src="/System/Doors/figma/icon-tray-network.svg"
      />
      <button
        aria-expanded={volumeControlOpen}
        aria-haspopup="dialog"
        aria-label={`Volume: ${volume}%`}
        className="doors-system-volume-toggle"
        onClick={() => setVolumeControlOpen((currentlyOpen) => !currentlyOpen)}
        type="button"
      >
        <img
          alt=""
          aria-hidden="true"
          src="/System/Doors/figma/icon-tray-volume.svg"
        />
      </button>
      {volumeControlOpen && (
        <div
          aria-label="Controle de volume do sistema"
          className="doors-volume-control"
          role="dialog"
        >
          <button
            aria-label="Diminuir volume"
            onClick={() => changeVolume(volume - 10)}
            type="button"
          >
            −
          </button>
          <input
            aria-label="Volume do sistema"
            max="100"
            min="0"
            onChange={(event) =>
              changeVolume(event.currentTarget.valueAsNumber)
            }
            onKeyDown={(event) => {
              if (event.key !== "Escape") event.stopPropagation();
            }}
            style={{ "--volume-level": `${volume}%` } as CSSProperties}
            type="range"
            value={volume}
          />
          <button
            aria-label="Aumentar volume"
            onClick={() => changeVolume(volume + 10)}
            type="button"
          >
            +
          </button>
          <output aria-live="polite">{volume}%</output>
        </div>
      )}
    </div>
  );
};

const Taskbar: FC = () => {
  const [startMenuVisible, setStartMenuVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [aiVisible, setAIVisible] = useState(false);
  const [clockWidth, setClockWidth] = useState(CLOCK_CANVAS_BASE_WIDTH);
  const hasAI = useShowAI();
  const toggleStartMenu = (showMenu?: boolean): void =>
    setStartMenuVisible((currentMenuState) => showMenu ?? !currentMenuState);
  const toggleSearch = (showSearch?: boolean): void =>
    setSearchVisible((currentSearchState) => showSearch ?? !currentSearchState);
  const toggleCalendar = (showCalendar?: boolean): void =>
    setCalendarVisible(
      (currentCalendarState) => showCalendar ?? !currentCalendarState
    );
  const toggleAI = (showAI?: boolean): void =>
    setAIVisible((currentAIState) => showAI ?? !currentAIState);

  useEffect(() => {
    const openSearch = (): void => {
      setStartMenuVisible(false);
      setSearchVisible(true);
    };

    window.addEventListener(SEARCH_MENU_EVENT, openSearch);
    return () => window.removeEventListener(SEARCH_MENU_EVENT, openSearch);
  }, []);

  return (
    <>
      <AnimatePresence initial={false} presenceAffectsLayout={false}>
        {startMenuVisible && (
          <StartMenu
            key="startMenu"
            toggleSearch={toggleSearch}
            toggleStartMenu={toggleStartMenu}
          />
        )}
        {searchVisible && <Search key="search" toggleSearch={toggleSearch} />}
      </AnimatePresence>
      <StyledTaskbar
        aria-label="Barra de tarefas"
        onKeyDown={(event) => {
          if (
            focusByKey(
              event.key,
              [
                ...event.currentTarget.querySelectorAll<HTMLElement>(
                  ":scope > button, :scope > ol > li > button"
                ),
              ],
              { vertical: false }
            )
          ) {
            haltEvent(event);
          }
        }}
        {...useTaskbarContextMenu()}
        {...FOCUSABLE_ELEMENT}
      >
        <StartButton
          startMenuVisible={startMenuVisible}
          toggleStartMenu={toggleStartMenu}
        />
        <TaskbarEntries clockWidth={clockWidth} hasAI={hasAI} />
        <SystemTray />
        <Clock
          calendarVisible={calendarVisible}
          hasAI={hasAI}
          setClockWidth={setClockWidth}
          toggleCalendar={toggleCalendar}
          width={clockWidth}
        />
        {hasAI && <AIButton aiVisible={aiVisible} toggleAI={toggleAI} />}
      </StyledTaskbar>
      <AnimatePresence initial={false} presenceAffectsLayout={false}>
        {calendarVisible && (
          <Calendar key="calendar" toggleCalendar={toggleCalendar} />
        )}
        {aiVisible && <AIChat key="aiChat" toggleAI={toggleAI} />}
      </AnimatePresence>
    </>
  );
};

export default Taskbar;
