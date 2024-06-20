import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import { baseUrl } from "../../api/baseUrl";
import { header } from "../../component/core/helper";
import { toast } from "react-toastify";
import { ALL_GUIDELINE, REMOVE_GUIDELINE } from "../../api/constApi";
import Modal from "../../common/Modals/Modal";
import AddGuidelinePopUp from "../../component/popUp/AddGuidelinePopUp";

export default function GuidelineList() {
  
  const [guidelineList, setGuidelineList] = useState([]);
  const [isAddGuidelinePopUpOpen, setIsAddGuidelinePopUpOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [details, setDetails] = useState(false);

  const getAllGuidelineList = async () => {
    try {
      const response = await axios.get(`${baseUrl}${ALL_GUIDELINE}`, {headers: header});
      if (response.data.IsSuccess) {
        setGuidelineList(response.data.Data);
      } else {
        toast.error(response.data.Message);
      }
    } catch (error) { 
      toast.error("Something Went To Wrong!!");
    }
  };

  const removeGuideline = async (id) => {
    try {
      const response = await axios.post(`${baseUrl}${REMOVE_GUIDELINE}`, {guidelineid: id}, {headers: header});
      if (response.data.IsSuccess) {
        getAllGuidelineList();
      } else {
        toast.error(response.data.Message);
      }
    } catch (error) { 
      toast.error("Something Went To Wrong!!");
    }
  }

  
  const columns = [
    {
      header: "Policy ID",
      field: (row) => {
        return (
          <span className="text-sm">
            {row.policyid}
          </span>
        );
      },
    },
    {
      header: "Policy",
      field: (row) => {
        return <span className="text-sm">{row.policy}</span>;
      },
    },
    {
      header: "Action",
      field: (row) => {
        return <div>
        <button className="btn" onClick={() => {setDetails({guidelineid: row._id, policyid: row.policyid, policy: row.policy}); setIsAddGuidelinePopUpOpen(true);}}>Edit</button>
        <button className="btn" onClick={() => removeGuideline(row._id)}>Remove</button>
        </div>
      }
    },

  ];

  useEffect(() => {
    getAllGuidelineList();
  }, [reload]);

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
              <button className="btn btn-dark" onClick={() => setIsAddGuidelinePopUpOpen(true)}>Add Guideline</button>
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
      <Modal isOpen={isAddGuidelinePopUpOpen}>
        <AddGuidelinePopUp handleClose={setIsAddGuidelinePopUpOpen} setReload={reload} data={details}/>
    </Modal>
    </>
  );
}
