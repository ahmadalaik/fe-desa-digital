import { useEffect, type FC } from "react";
import { useThemeStore } from "../stores/theme";
import Sidebar from "../components/Admin/Sidebar/Sidebar";
import Header from "../components/Admin/Header/Header";
import { useShallow } from "zustand/react/shallow";

const AdminLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { sidebarOpen, isMobile, setMobile } = useThemeStore(
    useShallow((state) => ({
      sidebarOpen: state.sidebarOpen,
      isMobile: state.isMobile,
      setMobile: state.setMobile,
    }))
  );

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setMobile(mobile);
      if (!mobile) useThemeStore.setState({ sidebarOpen: true });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Bersihkan event saat component di-unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [setMobile]);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Overlay hitam untuk mode mobile saat sidebar terbuka */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20"
          onClick={() => useThemeStore.setState({ sidebarOpen: false })}
        />
      )}

      {/* Sidebar kiri */}
      <Sidebar />

      {/* Konten utama (header + konten halaman) */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-4 bg-gray-50">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
