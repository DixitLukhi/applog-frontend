import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { baseUrl } from '../../api/baseUrl';
import { ALL_APP, ALL_GUIDELINE, APP, COMPARE_APP } from '../../api/constApi';
import PolicyPopUp from '../../component/popUp/PolicyPopUp';
import Modal from '../../common/Modals/Modal';
import Header from '../../component/core/Header';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
import { header, logos } from '../../component/core/helper';
import { MultiSelect } from 'primereact/multiselect';
import ViewGuidelinePopUp from '../../component/popUp/ViewGuidelinePopUp';
import moment from "moment";
import ProofPopUp from '../../component/popUp/ProofPopUp';


export default function Home() {

  const [appList, setAppList] = useState([]);
  const [compareResult, setCompareResult] = useState([]);
  const [isPolicyPopUpOpen, setIsPolicyPopUpOpen] = useState(false);
  const [viewPolicyData, setViewPolicyData] = useState({});
  const [isViewGuidelinePopUp, setIsViewGuidelinePopUp] = useState(false);
  const [guidelineList, setGuidelineList] = useState([]);
  const [selectedApps, setSelectedApps] = useState(null);
  const [oneAppData, setOneAppData] = useState(null);
  const [profData, setProofData] = useState({});
  const [isProofPopUpOpen, setIsProofPopUpOpen] = useState(false);

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

  const getOneApp = async (id) => {
    try {
      const response = await axios.get(`${baseUrl}${APP}?appid=${id}`);

      if (response.data.IsSuccess) {
        setOneAppData(response.data.Data);
      } else {
        toast.error(response.data.Message);
      }
    } catch (error) {
      toast.error("Sonething Went Wrong!!");
    }
  }

  const encodeQueryData = (data) => {
    if (data != null) {
      return data.map(id => `apps[]=${encodeURIComponent(id.id)}`).join('&');
    }
  };

  const compareApp = async () => {
    if (selectedApps == null) {
      return toast.error("Select atleast one app");
    }
    const queryString = encodeQueryData(selectedApps);
    try {
      const [guidelineResponse, compareResponse] = await Promise.all([
        axios.get(`${baseUrl}${ALL_GUIDELINE}`, { headers: header }),
        axios.get(`${baseUrl}${COMPARE_APP}?${queryString}`)
      ]);

      // Handle guideline response
      if (guidelineResponse.data.IsSuccess) {
        setGuidelineList(guidelineResponse.data.Data);
      } else {
        toast.error(guidelineResponse.data.Message);
      }

      // Handle compare response
      if (compareResponse.data.IsSuccess) {
        setCompareResult(compareResponse.data.Data);
      } else {
        toast.error(compareResponse.data.Message);
      }
    } catch (error) {
      toast.error("Something went wrong!!");
    }
  }

  useEffect(() => {
    getAppList();
  }, []);

  // const columns = [
  //   {
  //     header: "Name",
  //     body: (row) => {
  //       return (
  //         <Link className="text-sm"
  //           to={{
  //             pathname: `/app/${row.id}`,
  //           }}>
  //           {row.appName}
  //         </Link>
  //       );
  //     },
  //   },
  //   {
  //     header: "Logo",
  //     // body: (row) => {
  //     //   return row.appLogo ? (
  //     //     <div>
  //     //     <img
  //     //       src={row.appLogo ? driveUrl + row?.appLogo?.url : ""}
  //     //       className="h-8 w-full block"
  //     //       alt="NA"
  //     //       typeof='webp'
  //     //       loading="lazy"
  //     //     /> 
  //     //     </div>
  //     //   ) : (
  //     //     "NA"
  //     //   )
  //     // },
  //     body:
  //       (row) => {
  //         const logo = logos.find(logo => logo.name === row?.appName);
  //         return <img src={logo ? logo?.url : ""} alt={row.appName} className="w-6rem shadow-2 border-round" />;
  //       }
  //   },
  // ];

  return (
    <>
      <Header />
      <div className="home-container">
        <h1>Apps</h1>
        <button className="policy-button" onClick={() => setIsPolicyPopUpOpen(true)}>Policy</button>

        <div className="card flex justify-content-center">

          <MultiSelect value={selectedApps} onChange={(e) => setSelectedApps(e.value)} options={appList} optionLabel="appName"
            filter placeholder="Select Apps" maxSelectedLabels={5} className="w-full md:w-20rem" />
          <button onClick={() => compareApp()}>Compare</button>
        </div>

        {guidelineList && guidelineList.length > 0 && compareResult && compareResult.length > 0 ?
          <>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Guidelines</th>
                  {compareResult.map((cr) => (
                    <th style={{ border: '1px solid black', padding: '8px' }} onClick={() => getOneApp(cr._id)}>{cr.appName}</th>
                  ))}
                  {/* <th style={{ border: '1px solid black', padding: '8px' }}>Gpay</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>ICICI</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>ADCCB</th> */}
                </tr>
              </thead>
              <tbody>
                {guidelineList.map((guideline) => (
                  <tr key={guideline._id}>
                    <td style={{ border: '1px solid black', padding: '8px' }} className={`${guideline?.priority === 'l' ? 'bg-green' : guideline?.priority === 'h' ? 'bg-red' : 'bg-yellow'}`} onClick={() => { setViewPolicyData({ policyid: guideline.policyid, policy: guideline.policy }); setIsViewGuidelinePopUp(true) }}>{guideline.policyid}</td>
                    {compareResult.map((app) => {
                      const guidelineFollowed = (app.guidelines).find(g => g._id === guideline._id)?.followed;
                      return (
                        <td key={app.appName} style={{ border: '1px solid black', padding: '8px' }}>
                          {guidelineFollowed ? 'YES' : <div style={{ color: 'red' }}>NO</div>}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </> : "Compare Apps As You Want"}


        {/* {appList && appList.length > 0 ?
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
          : "No app is there"} */}

        {oneAppData && oneAppData != null ? <>
          <div>App : {oneAppData.appName}</div>
          <img src={logos.find(logo => logo.name === oneAppData.appName)?.url} alt={oneAppData.appName} className="w-6rem shadow-2 border-round" />

          {oneAppData?.guidelines && oneAppData?.guidelines.length > 0 ? (
            <table className="policy-table" style={{ textAlign: 'justify' }}>
              <thead>
                <tr>
                  {/* <th>Policy ID</th> */}
                  <th>Policy</th>
                </tr>
              </thead>
              <tbody>
                {oneAppData?.guidelines.map((pol) => (
                  <tr key={pol._id._id} className={`policy-item ${pol?._id?.priority === 'l' ? 'bg-green' : pol?._id?.priority === 'h' ? 'bg-red' : 'bg-yellow'}`}>
                    <td>{pol?.modified_at && pol.modified_at !== "" && moment(pol?.modified_at).format('L')}</td>
                    <td>{pol._id.policyid}</td>
                    <td>{pol._id.policy}</td>
                    <div onClick={() => {setProofData({img: pol?.proofImage?.url, desc: pol?.proofDescription}); setIsProofPopUpOpen(true)}}> {pol.followed ?
                      <button className='btn'>Follow</button>
                      :
                      <button className='btn'>Not Follow</button>
                    }
                    </div>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            "No policy added"
          )}
        </> : ""}

        <Modal isOpen={isPolicyPopUpOpen}>
          <PolicyPopUp handleClose={setIsPolicyPopUpOpen} />
        </Modal>
        <Modal isOpen={isProofPopUpOpen}>
          <ProofPopUp handleClose={setIsProofPopUpOpen} data={profData}/>
        </Modal>
        <Modal isOpen={isViewGuidelinePopUp}>
          <ViewGuidelinePopUp handleClose={setIsViewGuidelinePopUp} data={viewPolicyData} />
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
