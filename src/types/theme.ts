export interface ThemeState {
  //======== DASHBOARD SIDEBAR ========//
  sidebarOpen: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
  setMobile: (isMobile: boolean) => void;

  //======== WEB DRAWER ========//
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  closeDrawer: () => void;
}