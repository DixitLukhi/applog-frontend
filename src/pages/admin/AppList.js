import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import { baseUrl } from "../../api/baseUrl";
import { header } from "../../component/core/helper";
import { toast } from "react-toastify";
import { ALL_APP } from "../../api/constApi";

export default function AppList() {
  
  const [appList, setAppList] = useState([]);

  const getAllApprList = async () => {
    try {
      const response = await axios(`${baseUrl}${ALL_APP}`, {headers: header});
      if (response.data.IsSuccess) {
        setAppList(response.data.Data);
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
            {row.appName}
          </span>
        );
      },
    },
    {
      header: "Logo",
      field: (row) => {
        return <span className="text-sm">{row.appLogo}</span>;
      },
    },
  ];

  useEffect(() => {
    getAllApprList();
  }, []);

  return (
    <>
      <div className="w-full lg:max-w-[calc(100%-230px)]">
        {/* <!-- Content In --> */}
        <div className="rightInContent relative">
          <div className="wrapper min-h-full relative">
            <div className="flex items-center justify-between mb-5 sm:mb-10">
              <h3 className="text-2xl font-play font-bold tracking-wider leading-8">
                App List
              </h3>
            </div>
            <DataTable
              value={appList}
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
