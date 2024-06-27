import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { baseUrl, driveUrl } from '../../api/baseUrl';
import { ALL_APP, COMPARE_APP } from '../../api/constApi';
import PolicyPopUp from '../../component/popUp/PolicyPopUp';
import Modal from '../../common/Modals/Modal';
import Header from '../../component/core/Header';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Link } from 'react-router-dom';
import ADCB from "../../asset/images/adcb.webp"
import { logos } from '../../component/core/helper';
import { MultiSelect } from 'primereact/multiselect';


export default function Home() {

  const [appList, setAppList] = useState([]);
  const [compareResult, setCompareResult] = useState([]);
  const [isPolicyPopUpOpen, setIsPolicyPopUpOpen] = useState(false);
 
  const [selectedApps, setSelectedApps] = useState(null);

  const getAppList = async () => {
    try {
      const response = await axios.get(`${baseUrl}${ALL_APP}`);

      if (response.data.IsSuccess) {
        const apps = response.data.Data.map(app => ({
          id: app._id,
          appName: app.appName
        }));
        setAppList(apps);
     } else {
        toast.error(response.data.Message);
      }
    } catch (error) {
      toast.error("Something went wrong!!");
    }
  }

  const encodeQueryData = (data) => {
    return data.map(id => `apps[]=${encodeURIComponent(id.id)}`).join('&');
  };

  const compareApp = async () => {
    const queryString = encodeQueryData(selectedApps);
    try {
      const response = await axios.get(`${baseUrl}${COMPARE_APP}?${queryString}`);

      if (response.data.IsSuccess) {
        setCompareResult(response.data.Data);
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
              pathname: `/app/${row.id}`,
            }}>
              {row.appName}
          </Link>
        );
      },
    },
    {
      header: "Logo",
      // body: (row) => {
      //   return row.appLogo ? (
      //     <div>
      //     <img
      //       src={row.appLogo ? driveUrl + row?.appLogo?.url : ""}
      //       className="h-8 w-full block"
      //       alt="NA"
      //       typeof='webp'
      //       loading="lazy"
      //     /> 
      //     </div>
      //   ) : (
      //     "NA"
      //   )
      // },
      body: 
      (row) => {
         const logo = logos.find(logo => logo.name === row?.appName); 
        return <img src={logo ? logo?.url : ""} alt={row.appName} className="w-6rem shadow-2 border-round" />;
      }
    },
  ];
  const data = [
    { guideline: "RBI001", Gpay: "YES", ICICI: "YES", ADCCB: "NO" },
    { guideline: "RBI002", Gpay: "NO", ICICI: "NO", ADCCB: "NO" },
    { guideline: "RBI006", Gpay: "YES", ICICI: "NO", ADCCB: "YES" }
  ];
  return (
    <>
      <Header />
      <div className="home-container">
        <h1>Apps</h1>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid black', padding: '8px' }}>Guidelines</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Gpay</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>ICICI</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>ADCCB</th>
        </tr>
      </thead>
      <tbody>
        {guidelines.map((guideline) => (
          <tr key={guideline.id}>
            <td style={{ border: '1px solid black', padding: '8px' }}>{guideline.name}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>
              {appCompliance.Gpay?.includes(guideline.id) ? 'YES' : 'NO'}
            </td>
            <td style={{ border: '1px solid black', padding: '8px' }}>
              {appCompliance.ICICI?.includes(guideline.id) ? 'YES' : 'NO'}
            </td>
            <td style={{ border: '1px solid black', padding: '8px' }}>
              {appCompliance.ADCCB?.includes(guideline.id) ? 'YES' : 'NO'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
        <div className="card flex justify-content-center">
            
        <MultiSelect value={selectedApps} onChange={(e) => setSelectedApps(e.value)} options={appList} optionLabel="appName" 
                filter placeholder="Select Apps" maxSelectedLabels={5} className="w-full md:w-20rem" />
                </div>
                <button onClick={() => compareApp()}>Compare</button>
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
        <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      </div>
    </>
  )
}
