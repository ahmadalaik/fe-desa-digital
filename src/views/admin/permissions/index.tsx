import { useEffect, useState, type FC } from "react";
import AdminLayout from "../../../layouts/admin";
import { Link, useSearchParams } from "react-router";
import { FiEdit2, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import hasAnyPermission from "../../../utils/permissions";
import { usePermissions } from "../../../hooks/admin/permission/usePermissions";
import Loading from "../../../components/General/Loading";
import Error from "../../../components/General/Error";
import Pagination from "../../../components/General/Pagination";
import TableEmptyRow from "../../../components/General/TableEmptyRow";
import { useQueryClient } from "@tanstack/react-query";
import { usePermissionDelete } from "../../../hooks/admin/permission/usePermissionDelete";
import toast from "react-hot-toast";

const Permissions: FC = () => {
  document.title = "Permissions - Desa Konohagakure";

  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  const [searchTerm, setSearchTerm] = useState<string>(initialSearch);
  const [submittedSearch, setSubmittedSearch] = useState<string>(initialSearch);
  const [page, setPage] = useState<number>(initialPage);

  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [itemDelete, setItemDelete] = useState<number>(0);

  const toggleDeleteModal = (id?: number) => {
    if (id) setItemDelete(id);
    setIsDeleteOpen(!isDeleteOpen);
  };

  const { data, isLoading, isError } = usePermissions({
    page,
    search: submittedSearch,
  });

  useEffect(() => {
    const params: Record<string, string> = {};

    if (submittedSearch) params.search = submittedSearch;
    if (page > 1) params.page = String(page);

    setSearchParams(params);
  }, [submittedSearch, page, setSearchParams]);

  const queryClient = useQueryClient();

  const { mutate, isPending } = usePermissionDelete();

  const handleDelete = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["permissions"] });
        setPage(1);
        toast.success("Permission deleted successfully!", {
          position: "top-right",
          duration: 3000,
        });
      },
      onError: (error: Error) => {
        alert(`Failed to delete permission: ${error.message}`);
      },
    });
  };

  return (
    <AdminLayout>
      <div className="p-5">
        {/* Header with Add Button */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Manage Permissions</h1>
            <p className="text-sm text-gray-500 mt-1 italic">
              Manage your system permissions. Add, edit, or delete access rights.
            </p>
          </div>
          {hasAnyPermission(["permissions-create"]) && (
            <Link
              to="/admin/permissions/create"
              className="px-4 py-2 bg-linear-to-br from-yellow-800 to-yellow-400 border-2 border-yellow-100 text-white rounded-xl hover:bg-blue-700 
                        flex items-center transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <FiPlus className="mr-2" size={18} />
              Add New Permission
            </Link>
          )}
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" size={18} />
          </div>
          <input
            type="text"
            className="bg-white block w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none transition-all duration-200"
            placeholder="Search permission..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setPage(1);
                setSubmittedSearch(searchTerm);
              }
            }}
          />
        </div>

        {/* Loading State */}
        {isLoading && <Loading />}

        {/* Error State */}
        {isError && <Error />}

        {/* Success State */}
        {!isLoading && !isError && (
          <div className="border border-gray-100 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Permission Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-6 py-3 max-w-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {data?.data && data.data.length > 0 ? (
                    data.data.map((permission) => (
                      <tr
                        key={permission.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {permission.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {new Date(permission.created_at).toLocaleDateString(
                            "id-ID",
                            {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            },
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-3">
                            {hasAnyPermission(["permissions-edit"]) && (
                              <Link
                                to={`/admin/permissions/edit/${permission.id}`}
                                className="text-blue-500 hover:text-blue-700 p-1.5 rounded-full hover:bg-blue-50 transition-colors"
                                title="Edit"
                              >
                                <FiEdit2 size={18} />
                              </Link>
                            )}

                            {hasAnyPermission(["permissions-delete"]) && (
                              <button
                                onClick={() => {
                                  setItemDelete(permission.id);
                                  setIsDeleteOpen(true);
                                }}
                                disabled={isPending}
                                className="text-red-500 hover:text-red-700 p-1.5 rounded-full hover:bg-red-50 transition-colors"
                                title="Delete"
                              >
                                <FiTrash2 size={18} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <TableEmptyRow
                      colSpan={3}
                      text="No Permissions Found"
                      subText={
                        searchTerm ? "Try with Other Keywords" : "Add New Permission"
                      }
                    />
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {data?.data && data.data.length > 0 && (
              <div className="px-6 pb-5 border-t border-gray-100 bg-gray-100 flex justify-end">
                <Pagination
                  currentPage={data.current_page}
                  totalPages={data.last_page}
                  onPageChange={(newPage) => setPage(newPage)}
                  position="right"
                  maxVisiblePages={5}
                />
              </div>
            )}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteOpen && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
              onClick={() => toggleDeleteModal()}
            ></div>

            <div className="relative bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center overflow-hidden">
              {/* Alert Icon */}
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                <svg
                  className="h-10 w-10 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Hapus Permission?
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Apakah Anda yakin ingin menghapus? Tindakan ini tidak dapat
                dibatalkan.
              </p>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    handleDelete(itemDelete);
                    toggleDeleteModal();
                  }}
                  className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-red-200"
                >
                  Ya, Hapus Sekarang
                </button>
                <button
                  onClick={() => toggleDeleteModal()}
                  className="w-full py-3 px-4 bg-white hover:bg-gray-50 text-gray-700 font-medium border border-gray-200 rounded-xl transition-all"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Permissions;
