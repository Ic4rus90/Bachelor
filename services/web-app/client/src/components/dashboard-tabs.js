import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import VulnerabilityCards from './vulnerability-cards';
import CodeBlock from './display-code';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import './dashboard-tabs.css'
import '../pages/dashboard-page.css'



const DashboardTabs = () => {
  const [reportData, setReportData] = useState(null);
  const { getAccessTokenSilently } = useAuth0();
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: false };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
  };
  useEffect(() => {
      const getReports = async () => {
          try {
              const token = await getAccessTokenSilently(); 
              
              const response = await fetch('http://127.0.0.1:3001/getreports', {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              });
              if (response.ok) {
                  const data = await response.json();
                  setReportData(data); 
              } 

          } catch (error) {
              console.error(error);
          }
      };

    getReports();
  }, [getAccessTokenSilently]);

  
  if (!reportData) {
    return <div>You have no reports</div>;
  }



  return (
    <>
      <div className="dashboard-header">
        <h1 className="dashboard-title">Latest Security Scan Results</h1>
          {reportData && (
            <span className="dashboard-timestamp">
            Scanned: {formatDate(reportData.report.report_date)}
          </span>
          )}
      </div>
      <Tabs
        defaultActiveKey="vulnerabilities"
        id="Report-tabs"
        className="custom-tabs mb-3"
        >
        <Tab eventKey="vulnerabilities" title="Vulnerabilities" className="custom-tab">
          <VulnerabilityCards vulnerabilities={reportData.vulnerabilities} />
        </Tab>
        <Tab eventKey="code" title="Code" className="custom-tab">
          <CodeBlock codeString={reportData.analyzed_code.code} />
        </Tab>
      </Tabs>
    </>
  );
};

export default DashboardTabs;