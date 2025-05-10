"use client";

import DashBoardRoot from "@/app/dashboard/DashBoard_layout/DashBoardRoot";
import useCategoriesLogic from "@/app/hooks/useCategoriesLogic";
import { FolderPlus } from "lucide-react";
import Link from "next/link";
function CategoryListPage() {
  const { categories } = useCategoriesLogic();
  return (
    <DashBoardRoot>
      <div className="min-h-screen bg-bg text-white p-6">
        <div className="max-w-6xl mx-auto">
          <section className="flex justify-between items-center  gap-y-4 flex-row">
            <h1 className="text-3xl font-bold mb-6 mt-10 md:mt-0">
              Categories
            </h1>
            <Link href="/dashboard/categories/create-category">
              <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm transition flex items-center gap-x-2">
                <FolderPlus className="h-4 w-4 mr-2 " />
                Create Category
              </button>
            </Link>
          </section>

          {/* Responsive Table/List */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-gray-800 hidden md:table-header-group">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((category) => (
                  <tr
                    key={category.id}
                    className="border-b border-gray-700 md:table-row block mb-4 md:mb-0"
                  >
                    <td className="md:p-4 p-2 block md:table-cell">
                      <span className="font-medium">{category._id}</span>
                    </td>
                    <td className="md:p-4 p-2 block md:table-cell">
                      <span className="font-medium">{category.name}</span>
                    </td>
                    <td className="md:p-4 p-2 block md:table-cell text-right md:text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/categories/edit/${category._id}`}
                          className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm transition"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() =>
                            alert(`Delete category ${category?._id}`)
                          }
                          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashBoardRoot>
  );
}
export default CategoryListPage;
