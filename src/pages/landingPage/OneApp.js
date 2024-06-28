import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseUrl } from '../../api/baseUrl';
import { APP } from '../../api/constApi';
import Header from '../../component/core/Header';
import { logos } from '../../component/core/helper';
import moment from "moment";

export default function OneApp() {
      const {appId} = useParams();
  const [appData, setAppData] = useState({});

  const getOneApp = async () => {
    try {
      const response = await axios.get(`${baseUrl}${APP}?appid=${appId}`);

      if (response.data.IsSuccess) {
        setAppData(response.data.Data);
      } else {
        toast.error(response.data.Message);
      }
    } catch (error) {
      toast.error("Sonething Went Wrong!!");
    }
  }

  useEffect(() => {
    getOneApp();
  }, []);

  return (
    <>
      <Header />
      <div>App : {appData.appName}</div>
      <img src={logos.find(logo => logo.name === appData.appName)?.url} alt={appData.appName} className="w-6rem shadow-2 border-round" />

      {appData?.guidelines && appData?.guidelines.length > 0 ? (
          <table className="policy-table">
            <thead>
              <tr>
                <th>Policy ID</th>
                <th>Policy</th>
              </tr>
            </thead>
            <tbody>
              {appData?.guidelines.map((pol) => (
                <tr key={pol._id._id} className={`policy-item ${pol?._id?.priority === 'l' ? 'bg-green' : pol?._id?.priority === 'h' ? 'bg-red' : 'bg-yellow'}`}>
                  <td>{pol?.modified_at && pol.modified_at !== "" && moment(pol?.modified_at).format('L')}</td>
                  <td>{pol._id.policyid}</td>
                  <td>{pol._id.policy}</td>
                  {pol.followed ? 
                  <button className='btn'>Follow</button>
                  : 
                  <button className='btn'>Not Follow</button>
                  }
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          "No policy added"
        )}
    </>
  )
}
