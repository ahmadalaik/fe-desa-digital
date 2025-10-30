import { create } from "zustand";
import type { ThemeState } from "../types/theme";

export const useThemeStore = create<ThemeState>((set) => ({
  sidebarOpen: false,
  isMobile: window.innerWidth < 768,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setMobile: (isMobile) => set({ isMobile }),

  isDrawerOpen: false,
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
  closeDrawer: () => set({ isDrawerOpen: false }),
}));
