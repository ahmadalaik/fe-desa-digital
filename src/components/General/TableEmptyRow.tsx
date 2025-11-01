import type { FC } from "react";
import { FiSearch } from "react-icons/fi";

interface TableEmptyRowProps {
  colSpan: number;
  text: string;
  subText?: string;
}

const TableEmptyRow: FC<TableEmptyRowProps> = ({ colSpan, text, subText }) => {
  return (
    <tr>
      <td colSpan={colSpan} className="px-6 py-8 text-center">
        <div className="flex flex-col items-center justify-center">
          <FiSearch className="text-gray-400 mb-2" size={24} />
          <p className="text-gray-500 font-medium">{text}</p>
          {subText && <p className="text-gray-400 text-sm mt-1">{subText}</p>}
        </div>
      </td>
    </tr>
  );
};

export default TableEmptyRow;
