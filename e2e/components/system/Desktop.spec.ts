import { expect, test } from "@playwright/test";
import {
  DESKTOP_ENTRIES_SELECTOR,
  DESKTOP_MENU_ITEMS,
  DESKTOP_SELECTOR,
  NEW_FILE_LABEL,
  NEW_FILE_LABEL_TEXT,
  NEW_FOLDER_LABEL,
  RICH_TEXT_FILE_LABEL,
  RICH_TEXT_FILE_LABEL_TEXT,
} from "e2e/constants";
import {
  appIsOpen,
  captureConsoleLogs,
  clickCloseWindow,
  clickContextMenuEntry,
  clickDesktop,
  closePage,
  contextMenuEntryIsHidden,
  contextMenuEntryIsVisible,
  contextMenuHasCount,
  contextMenuIsVisible,
  desktopEntriesAreVisible,
  desktopEntryHasBlobIcon,
  desktopEntryIsHidden,
  desktopEntryIsRenaming,
  desktopEntryIsVisible,
  desktopIsVisible,
  disableWallpaper,
  doubleClickDesktopEntry,
  filterMenuItems,
  loadApp,
  pressDesktopKeys,
  selectArea,
  windowIsHidden,
  windowTitlebarHasBlobIcon,
} from "e2e/functions";

test.beforeEach(captureConsoleLogs());
test.beforeEach(disableWallpaper);
test.beforeEach(loadApp());
test.beforeEach(desktopIsVisible);
test.afterEach(closePage);

test("has file entry", desktopEntriesAreVisible);

test("has the Pastas shortcut", async ({ page }) => {
  await desktopEntryIsVisible(/^Pastas$/, { page });
});

test("can move a desktop shortcut", async ({ page }) => {
  const entry = page.locator(DESKTOP_ENTRIES_SELECTOR).getByLabel(/^Rabisco$/);
  const desktop = page.locator(DESKTOP_SELECTOR);
  const [entryBefore, desktopBounds] = await Promise.all([
    entry.boundingBox(),
    desktop.boundingBox(),
  ]);

  if (!entryBefore || !desktopBounds) {
    throw new Error("Não foi possível localizar o atalho e a área de trabalho.");
  }

  const { height, width, x, y } = entryBefore;
  const {
    height: desktopHeight,
    width: desktopWidth,
    x: desktopX,
    y: desktopY,
  } = desktopBounds;
  const targetX = Math.min(desktopWidth - 20, x - desktopX + width + 100);
  const targetY = Math.min(desktopHeight - 20, y - desktopY + height + 40);

  await entry.dragTo(desktop, { targetPosition: { x: targetX, y: targetY } });

  await expect
    .poll(async () => (await entry.boundingBox())?.x)
    .toBeGreaterThan(x + 30);
});

test("can open Rabisco", async ({ page }) => {
  await doubleClickDesktopEntry(/^Rabisco$/, { page });

  const paintFrame = page.locator('iframe[id^="jspaint-"]');

  await expect(paintFrame).toBeVisible();
  await expect
    .poll(async () =>
      page.frameLocator('iframe[id^="jspaint-"]').locator(".menus").count()
    )
    .toBe(1);
  await expect(page.getByRole("alert")).toHaveCount(0);
});

test.describe("has selection", () => {
  test("has effect", async ({ page }) => {
    const { height = 0, width = 0 } =
      (await page.locator(DESKTOP_SELECTOR).boundingBox()) || {};

    await selectArea({
      page,
      selection: { height: 25, width: 25, x: width / 2, y: height / 2 },
    });
  });

  test("can select entry", async ({ page }) => {
    await desktopEntriesAreVisible({ page });
    await selectArea({
      page,
      selection: { height: 80, up: true, width: 70, x: 0, y: 0 },
    });
    await expect(page.locator(".focus-within")).toHaveCount(1);
  });
});

test.describe("has context menu", () => {
  test.beforeEach(async ({ page }) => clickDesktop({ page }, true));
  test.beforeEach(contextMenuIsVisible);

  test("has items", async ({ browserName, page }) => {
    const MENU_ITEMS = filterMenuItems(DESKTOP_MENU_ITEMS, browserName);
    const shownCount = MENU_ITEMS.filter(([, shown]) => shown).length;

    await contextMenuHasCount(shownCount, { page });

    for (const [label, shown] of MENU_ITEMS) {
      // eslint-disable-next-line no-await-in-loop
      await (shown
        ? contextMenuEntryIsVisible(label, { page })
        : contextMenuEntryIsHidden(label, { page }));
    }
  });

  test.describe("has file functions", () => {
    test.beforeEach(desktopEntriesAreVisible);

    test("can create folder", async ({ page }) => {
      await desktopEntryIsHidden(NEW_FOLDER_LABEL, { page });

      await clickContextMenuEntry(/^Novo$/, { page });
      await clickContextMenuEntry(/^Pasta$/, { page });

      await desktopEntryIsVisible(NEW_FOLDER_LABEL, { page });
      // Reloading before the lazy rename box loads aborts its chunk
      await desktopEntryIsRenaming({ page });

      await page.reload();

      await desktopEntriesAreVisible({ page });
      await desktopEntryIsVisible(NEW_FOLDER_LABEL, { page });
    });

    test("can create file", async ({ page }) => {
      await desktopEntryIsHidden(NEW_FILE_LABEL, { page });

      await clickContextMenuEntry(/^Novo$/, { page });
      await clickContextMenuEntry(/^Documento de texto$/, { page });

      await desktopEntryIsVisible(NEW_FILE_LABEL, { page });
      await desktopEntryIsRenaming({ page });

      await page.reload();

      await desktopEntriesAreVisible({ page });
      await desktopEntryIsVisible(NEW_FILE_LABEL, { page });
    });

    test("can add file", async ({ page }) => {
      await desktopEntryIsHidden(NEW_FILE_LABEL, { page });

      const uploadPromise = page.waitForEvent("filechooser");

      await clickContextMenuEntry(/^Adicionar arquivo\(s\)$/, { page });

      await (
        await uploadPromise
      ).setFiles({
        buffer: Buffer.from(""),
        mimeType: "text/plain",
        name: NEW_FILE_LABEL_TEXT,
      });

      await desktopEntryIsVisible(NEW_FILE_LABEL, { page });
    });

    test("can reopen added file with icon", async ({ page }) => {
      const uploadPromise = page.waitForEvent("filechooser");

      await clickContextMenuEntry(/^Adicionar arquivo\(s\)$/, { page });

      await (
        await uploadPromise
      ).setFiles({
        buffer: Buffer.from("<p>Note</p>"),
        mimeType: "text/html",
        name: RICH_TEXT_FILE_LABEL_TEXT,
      });

      // Windows copy the desktop icon's blob, so closing one can't revoke it
      await desktopEntryHasBlobIcon(RICH_TEXT_FILE_LABEL, { page });
      await doubleClickDesktopEntry(RICH_TEXT_FILE_LABEL, { page });
      await windowTitlebarHasBlobIcon({ page });
      await clickCloseWindow({ page });
      await windowIsHidden({ page });
      await doubleClickDesktopEntry(RICH_TEXT_FILE_LABEL, { page });
      await windowTitlebarHasBlobIcon({ page });
    });
  });

  test("hides browser developer and terminal actions", async ({ page }) => {
    await contextMenuEntryIsHidden(/^Inspect$/, { page });
    await contextMenuEntryIsHidden(/^View page source$/, { page });
    await contextMenuEntryIsHidden(/^Abrir Terminal aqui$/, { page });
  });
});

test.describe("has keyboard shortcuts", () => {
  test("can open run dialog (ctrl + shift + r)", async ({ page }) => {
    await pressDesktopKeys("Control+Shift+KeyR", { page });
    await appIsOpen(/^Run$/, page);
  });

  test("can open file explorer (ctrl + shift + e)", async ({ page }) => {
    await pressDesktopKeys("Control+Shift+KeyE", { page });
    await appIsOpen(/^My PC$/, page);
  });

  test("can open terminal (shift + f10)", async ({ page }) => {
    await pressDesktopKeys("Shift+F10", { page });
    await appIsOpen(/^Terminal$/, page);
  });

  test("can inspect page (shift + f12)", async ({ page }) => {
    await pressDesktopKeys("Shift+F12", { page });
    await appIsOpen(/^DevTools$/, page);
  });
});
