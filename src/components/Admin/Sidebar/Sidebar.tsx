import type { FC } from "react";
import { useThemeStore } from "../../../stores/theme";
import { useShallow } from "zustand/react/shallow";
import SidebarHeader from "./SidebarHeader";
import SidebarMenu from "./SidebarMenu";

const Sidebar: FC = () => {
  // Ambil status sidebar (terbuka/tutup) dan apakah di layar mobile
  const { sidebarOpen, isMobile } = useThemeStore(
    useShallow((state) => ({
      sidebarOpen: state.sidebarOpen,
      isMobile: state.isMobile,
    }))
  );

  return (
    <div
      className={`bg-white shadow-lg transform transition-all duration-300 ease-in-out z-30 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        ${isMobile ? "fixed inset-y-0 left-0 w-75" : "relative w-75"}`}
    >
      {/* Bagian atas sidebar (biasanya logo atau judul) */}
      <SidebarHeader />
      {/* Daftar menu navigasi */}
      <SidebarMenu />
    </div>
  );
};

export default Sidebar;
