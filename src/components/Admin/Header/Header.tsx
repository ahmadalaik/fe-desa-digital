import type { FC } from "react";
import { useThemeStore } from "../../../stores/theme";
import { useShallow } from "zustand/react/shallow";
import UserDropDown from "./UserDropDown";
import { FiMenu } from "react-icons/fi";

const Header: FC = () => {
  const { sidebarOpen, isMobile, toggleSidebar } = useThemeStore(
    useShallow((state) => ({
      sidebarOpen: state.sidebarOpen,
      isMobile: state.isMobile,
      toggleSidebar: state.toggleSidebar,
    }))
  );

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center">
          {/* Tampilkan tombol menu jika sidebar tertutup atau layar mobile */}
          {(!sidebarOpen || isMobile) && (
            <button
              onClick={toggleSidebar}
              className="mr-4 p-1 rounded-md hover:bg-gray-100 transition-colors duration-200"
            >
              {/* Ikon menu */}
              <FiMenu className="h-6 w-6 text-gray-500" />
            </button>
          )}
        </div>
        {/* Dropdown untuk user (misal: profil, logout) */}
        <UserDropDown />
      </div>
    </header>
  );
};

export default Header;
