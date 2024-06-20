import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseUrl } from '../../api/baseUrl';
import { APP } from '../../api/constApi';

export default function OneApp() {
      const {appName, appId} = useParams();
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
    <div>OneApp : {appData.appName}</div>
  )
}
