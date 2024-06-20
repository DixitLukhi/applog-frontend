import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import { baseUrl } from "../../api/baseUrl";
import { header } from "../../component/core/helper";
import { toast } from "react-toastify";
import { ADMIN, ALL_USER } from "../../api/constApi";

export default function UserList() {
  
  const [userList, setUserList] = useState([]);

  const getAllUserList = async () => {
    try {
      const response = await axios.get(`${baseUrl}${ALL_USER}`, {headers: header});
      if (response.data.IsSuccess) {
        setUserList(response.data.Data);
      } else {
        toast.error(response.data.Message);
      }
    } catch (error) {
      toast.error("Something Went To Wrong!!");
    }
  };

  const makeAdmin = async (email, role) => {
    const payload = {
      email: email,
      role: role
    }
    try {
      const response = await axios.post(`${baseUrl}${ADMIN}`, payload, {headers: header});
      if (response.data.IsSuccess) {
        getAllUserList();
        toast.success(response.data.Message);
      } else {
        toast.error(response.data.Message);
      }
    } catch (error) {
      toast.error("Something Went To Wrong!!");
    }
  };

  
  const columns = [
    {
      header: "Name",
      field: (row) => {
        return (
          <span className="text-sm">
            {row.first_name} {row.last_name}
          </span>
        );
      },
    },
    {
      header: "Email",
      field: (row) => {
        return <span className="text-sm">{row.email}</span>;
      },
    },
    {
      header: "Role",
      field: (row) => {
        return (
          <span className="text-sm" onClick={() => makeAdmin(row.email, row.role)}>{row.role === 0 ? "User" : "Admin"}</span>
        );
      },
    },
  ];

  useEffect(() => {
    getAllUserList();
  }, []);

  return (
    <>
      <div className="w-full lg:max-w-[calc(100%-230px)]">
        {/* <!-- Content In --> */}
        <div className="rightInContent relative">
          <div className="wrapper min-h-full relative">
            <div className="flex items-center justify-between mb-5 sm:mb-10">
              <h3 className="text-2xl font-play font-bold tracking-wider leading-8">
                User List
              </h3>
            </div>
            <DataTable
              value={userList}
              columnResizeMode={"expand"}
              resizableColumns={true}
              scrollable={true}
            >
              {columns.map((col) => (
                <Column key={col.field} field={col.field} header={col.header} />
              ))}
            </DataTable>
          </div>
        </div>
      </div>
    </>
  );
}
