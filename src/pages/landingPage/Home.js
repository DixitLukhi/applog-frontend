import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { baseUrl } from '../../api/baseUrl';
import { ALL_APP} from '../../api/constApi';
import PolicyPopUp from '../../component/popUp/PolicyPopUp';
import Modal from '../../common/Modals/Modal';
import Header from '../../component/core/Header';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

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

  

  return (
    <>
    <Header />
    <div >Home</div>
    {appList && appList.length > 0 ? 
    <>
    <DataTable value={appList} tableStyle={{ minWidth: '50rem' }}>
        <Column field="appName" header="Name"></Column>
        <Column field="appLogo" header="Logo"></Column>
    </DataTable>
    </>
    : "No app is there"} 
    <button onClick={() => setIsPolicyPopUpOpen(true)}>Policy</button>
    
    <Modal isOpen={isPolicyPopUpOpen}>
        <PolicyPopUp handleClose={setIsPolicyPopUpOpen} />
    </Modal>

    </>
  )
}
