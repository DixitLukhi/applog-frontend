import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../api/baseUrl";
import { ALL_APP, ALL_GUIDELINE } from "../../api/constApi";
import { toast } from "react-toastify";

export default function AnalysisPopUp({ handleClose }) {
    const [appList, setAppList] = useState([]);
    const [guidelineList, setGuidelineList] = useState([]);

    const getAppList = async () => {
        try {
            const response = await axios.get(`${baseUrl}${ALL_APP}`);
            if (response.data.IsSuccess) {
                const apps = response.data.Data.map(app => ({
                    id: app._id,
                    appName: app.appName,
                    guidelines: app.guidelines
                }));
                setAppList(apps);
            } else {
                toast.error(response.data.Message);
            }
        } catch (error) {
            toast.error("Something went wrong!!");
        }
    };

    const getGuidelineList = async () => {
        try {
            const response = await axios.get(`${baseUrl}${ALL_GUIDELINE}`);
            if (response.data.IsSuccess) {
                setGuidelineList(response.data.Data);
            } else {
                toast.error(response.data.Message);
            }
        } catch (error) {
            toast.error("Something went wrong!!");
        }
    };

    useEffect(() => {
        getAppList();
        getGuidelineList();
    }, []);

    return (
        <div className="modal-overlay" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-content" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', width: '80%', maxWidth: '800px' }}>
                <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 className="modal-title">Analysis</h1>
                    <button className="modal-close" onClick={() => handleClose(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <svg className="w-6 h-6" width="50" height="50" fill="none" viewBox="0 0 24 24">
                            <path fill="#0F0F0F" d="M20.746 3.329a1 1 0 00-1.415 0l-7.294 7.294-7.294-7.294a1 1 0 10-1.414 1.414l7.294 7.294-7.294 7.294a1 1 0 001.414 1.415l7.294-7.295 7.294 7.295a1 1 0 001.415-1.415l-7.295-7.294 7.295-7.294a1 1 0 000-1.414z"/>
                        </svg>
                    </button>
                </div>
                {guidelineList.length > 0 && appList.length > 0 ? (
                    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Apps</th>
                                {guidelineList.map((gd) => (
                                    <th key={gd._id} style={{ border: '1px solid black', padding: '8px' }} >
                                        {gd.policyid}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {appList.map((app) => (
                                <tr key={app.id}>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>
                                        {app.appName}
                                    </td>
                                    {guidelineList.map((gd) => {
                                        const guidelineFollowed = app.guidelines.find(g => g._id === gd._id)?.followed;
                                        return (
                                            <td key={gd._id} style={{ border: '1px solid black', padding: '8px' }}>
                                                {guidelineFollowed ? 'YES' : <span style={{ color: 'red' }}>NO</span>}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : "Analysis"}
            </div>
        </div>
    );
}
