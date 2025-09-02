import React from "react";
import { AdminData } from "../dashboard/admin/hook/useAdminData";

interface AdminTableProps {
    data: AdminData[];
    loading: boolean;
    error: string | null;
    onEdit:(admin: AdminData) => void;
    onDelete:(admin:AdminData) => void;
}

const AdminTable :React.FC<AdminTableProps> = ({
    data,loading,error,onEdit,onDelete
})=>{
    return (
        <>  
        {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : error ? (
                  <div className="text-center py-10 text-red-500">{error}</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            N/o
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Username
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Level
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="tablebody">
                        {data?.map((item,index) => (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {index + 1}
                              </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.name}
                            </td>
                            <td className="tabletd">{item.username}</td>
                            <td className="tabletd">{item.level}</td>
                            <td className="tabletd">
                              <button
                                className="text-blue-600 hover:text-blue-800 mr-2"
                                onClick={() => onEdit(item)}
                               
                              >
                                <i className="fa fa-edit"></i> Edit
                              </button>
                              <button className="text-red-600 hover:text-red-800"
                               onClick={() => onDelete(item)}
                              >
                                <i className="fa fa-trash"></i> Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
        </>
    )
}
export default AdminTable;