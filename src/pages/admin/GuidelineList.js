import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import { baseUrl } from "../../api/baseUrl";
import { header } from "../../component/core/helper";
import { toast } from "react-toastify";
import { ALL_GUIDELINE } from "../../api/constApi";

export default function GuidelineList() {
  
  const [guidelineList, setGuidelineList] = useState([]);

  const getAllGuidelineList = async () => {
    try {
      const response = await axios(`${baseUrl}${ALL_GUIDELINE}`, {headers: header});
      if (response.data.IsSuccess) {
        setGuidelineList(response.data.Data);
      } else {
        toast.error(response.data.Message);
      }
    } catch (error) { 
      toast.error("Something Went To Wrong!!");
    }
  };

  
  const columns = [
    {
      header: "Guideline ID",
      field: (row) => {
        return (
          <span className="text-sm">
            {row.policyid}
          </span>
        );
      },
    },
    {
      header: "Guideline",
      field: (row) => {
        return <span className="text-sm">{row.policy}</span>;
      },
    },
  ];

  useEffect(() => {
    getAllGuidelineList();
  }, []);

  return (
    <>
      <div className="w-full lg:max-w-[calc(100%-230px)]">
        {/* <!-- Content In --> */}
        <div className="rightInContent relative">
          <div className="wrapper min-h-full relative">
            <div className="flex items-center justify-between mb-5 sm:mb-10">
              <h3 className="text-2xl font-play font-bold tracking-wider leading-8">
                Guideline List
              </h3>
            </div>
            <DataTable
              value={guidelineList}
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
