import { test, vi, expect, Mock } from "vitest";
import { createTray } from "./tray.js";
import { BrowserWindow, Menu, app } from "electron";

vi.mock("electron", () => {
  return {
    Tray: vi.fn().mockReturnValue({
      setContextMenu: vi.fn(),
    }),
    app: {
      getAppPath: vi.fn().mockReturnValue("/"),
      dock: {
        show: vi.fn(),
      },
      quit: vi.fn(),
    },
    Menu: {
      buildFromTemplate: vi.fn(),
    },
  };
});

const mainWindow = {
  show: vi.fn(),
} satisfies Partial<BrowserWindow> as any as BrowserWindow;

test("", () => {
  createTray(mainWindow);
  const calls = (Menu.buildFromTemplate as any as Mock).mock.calls;
  const args = calls[0] as Parameters<typeof Menu.buildFromTemplate>;

  const template = args[0];
  expect(template).toHaveLength(2);

  // show button
  template[0]?.click?.(null as any, null as any, null as any);
  expect(app.dock?.show).toHaveBeenCalled();

  // quit button
  template[1]?.click?.(null as any, null as any, null as any);
  expect(app.quit).toHaveBeenCalled();
  expect(template[1].label).toEqual("Quit");
});
