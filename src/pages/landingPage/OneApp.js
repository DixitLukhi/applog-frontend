import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseUrl, driveUrl } from '../../api/baseUrl';
import { APP } from '../../api/constApi';
import Header from '../../component/core/Header';

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
      <img src={appData && appData?.appLogo && appData?.appLogo?.url && appData?.appLogo?.url !== "" ? driveUrl+appData?.appLogo?.url : ""} alt={appData?.appName} w-full h-full/>

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
                <tr key={pol._id._id} className="policy-item">
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
