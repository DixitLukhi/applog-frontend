import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import { baseUrl, driveUrl } from "../../api/baseUrl";
import { header } from "../../component/core/helper";
import { toast } from "react-toastify";
import { ALL_APP, REMOVE_APP } from "../../api/constApi";
import Modal from "../../common/Modals/Modal";
import AddAppPopUp from "../../component/popUp/AddAppPopUp";

export default function AppList() {
  
  const [appList, setAppList] = useState([]);
  const [isAddAppPopUpOpen, setIsAddAppPopUpOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [details, setDetails] = useState({});

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

  const removeApp = async (id) => {
    try {
      const response = await axios.post(`${baseUrl}${REMOVE_APP}`, {appid: id}, {headers: header});
      if (response.data.IsSuccess) {
        getAllApprList();
      } else {
        toast.error(response.data.Message);
      }
    } catch (error) { 
      toast.error("Something Went To Wrong!!");
    }
  }

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
        return row.appLogo ? (
          <img
            src={row.appLogo ? driveUrl + row?.appLogo?.url : ""}
            className="object-cover w-8 h-8"
            alt="NA"
            width={100}
            height={100}
            loading="lazy"
          />
        ) : (
          "NA"
        )
      },
    },
    {
      header: "Action",
      field: (row) => {
        return <div>
        <button className="btn" onClick={() => {setDetails({guidelineid: row._id, policyid: row.policyid, policy: row.policy})}}>Edit</button>
        <button className="btn" onClick={() => removeApp(row._id)}>Remove</button>
        </div>
      }
    },
  ];

  useEffect(() => {
    getAllApprList();
  }, [reload]);

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
              <button className="btn btn-dark" onClick={() => setIsAddAppPopUpOpen(true)}>Add App</button>
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
      <Modal isOpen={isAddAppPopUpOpen}>
        <AddAppPopUp handleClose={setIsAddAppPopUpOpen} setReload={reload} data={details}/>
    </Modal>

    </>
  );
}
