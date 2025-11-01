import type { FC } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  position?: "left" | "center" | "right";
  maxVisiblePages?: number;
}

const Pagination: FC<PaginationProps> = (props) => {
  const {
    currentPage,
    totalPages,
    onPageChange,
    position = "center",
    maxVisiblePages = 5,
  } = props;

  const getPositionClass = () => {
    switch (position) {
      case "left":
        return "justify-start";
      case "right":
        return "justify-end";
      default:
        return "justify-center";
    }
  };

  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisiblePages / 2);
    let start = currentPage - half;
    let end = currentPage + half;

    if (start < 1) {
      start = 1;
      end = maxVisiblePages;
    } else if (end > totalPages) {
      end = totalPages;
      start = totalPages - maxVisiblePages + 1;
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={`flex items-center gap-1 mt-6 ${getPositionClass}`}>
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex items-center justify-center cursor-pointer w-8 h-8 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors duration-200"
      >
        <FiChevronLeft className="text-gray-600" />
      </button>

      {/* Menambahkan ellipsis jika perlu */}
      {visiblePages[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={`w-10 h-10 border rounded-md ${
              1 === currentPage
                ? "bg-linear-to-br from-yellow-800 to-yellow-400 text-white cursor-not-allowed"
                : "bg-white text-gray-700 cursor-pointer hover:bg-gray-100"
            } transition-colors duration-200`}
          >
            1
          </button>
          {visiblePages[0] > 2 && <span className="px-2">...</span>}
        </>
      )}

      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-8 h-8 border rounded-md ${
            page === currentPage
              ? "bg-linear-to-br from-yellow-800 to-yellow-400 text-white cursor-not-allowed"
              : "bg-white text-gray-700 cursor-pointer hover:bg-gray-100"
          } transition-colors duration-200`}
        >
          {page}
        </button>
      ))}

      {/* Menambahkan ellipsis jika perlu */}
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="px-2">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className={`w-8 h-8 border rounded-md ${
              totalPages === currentPage
                ? "bg-linear-to-br from-yellow-800 to-yellow-400 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            } transition-colors duration-200`}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center cursor-pointer w-8 h-8 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors duration-200"
      >
        <FiChevronRight className="text-gray-600" />
      </button>
    </div>
  );
};

export default Pagination;
