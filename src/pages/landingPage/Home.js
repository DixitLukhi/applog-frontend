import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { baseUrl, driveUrl } from '../../api/baseUrl';
import { ALL_APP } from '../../api/constApi';
import PolicyPopUp from '../../component/popUp/PolicyPopUp';
import Modal from '../../common/Modals/Modal';
import Header from '../../component/core/Header';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Link } from 'react-router-dom';

export default function Home() {

  const [appList, setAppList] = useState([]);
  const [isPolicyPopUpOpen, setIsPolicyPopUpOpen] = useState(false);

  const getAppList = async () => {
    try {
      const response = await axios.get(`${baseUrl}${ALL_APP}`);

      if (response.data.IsSuccess) {
        setAppList(response.data.Data);
      } else {
        toast.error(response.data.Message);
      }
    } catch (error) {
      toast.error("Something went wrong!!");
    }
  }

  useEffect(() => {    
    getAppList();
  }, []);

  const columns = [
    {
      header: "Name",
      body: (row) => {
        return (
          <Link className="text-sm" 
            to={{
              pathname: `/app/${row.appName}`,
              state: { appId: row._id } // Pass the appId as state
            }}>
              {row.appName}
          </Link>
        );
      },
    },
    {
      header: "Logo",
      body: (row) => {
        return row.appLogo ? (
          <img
            src={row.appLogo ? driveUrl + row?.appLogo?.url : ""}
            className="object-cover w-8 h-8"
            alt="NA"
            width={50}
            height={50}
            loading="lazy"
          />
        ) : (
          "NA"
        )
      },
    },
  ];

  return (
    <>
      <Header />
      <div className="home-container">
        <h1>Home</h1>
        {appList && appList.length > 0 ? 
        <>
          <div className="data-table-container">
            <DataTable
              value={appList}
              columnResizeMode={"expand"}
              resizableColumns={true}
              scrollable={true}
              className="data-table"
            >
              {columns.map((col, index) => (
                <Column key={index} field={col.field} header={col.header} body={col.body} />
              ))}
            </DataTable>
          </div>
        </>
        : "No app is there"} 
        <button className="policy-button" onClick={() => setIsPolicyPopUpOpen(true)}>Policy</button>
        
        <Modal isOpen={isPolicyPopUpOpen}>
          <PolicyPopUp handleClose={setIsPolicyPopUpOpen} />
        </Modal>
      </div>
    </>
  )
}
