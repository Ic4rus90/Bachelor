import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import VulnerabilityCards from './vulnerability-cards';
import CodeBlock from './display-code';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import './dashboard-tabs.css'
import '../pages/dashboard-page.css'
import mapExtensionToLanguage from './language-mapper';



const DashboardTabs = () => {
  const [reportData, setReportData] = useState(null);
  const { getAccessTokenSilently } = useAuth0();

  // Formats date and time to a more readable format
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: false };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
  };

  // Fetches report
  useEffect(() => {
    const getReports = async () => {
        try {
            const token = await getAccessTokenSilently(); 
          
            // Request to get reports
            const response = await fetch('https://cair-gpu12.uia.no:3001/getreports', {

              headers: {
                  Authorization: `Bearer ${token}`,
              },
              credentials: 'include',
              });

              // Sets fetched data if response is successful
              if (response.ok) {
                  const data = await response.json();
                  setReportData(data); 
              } 

          } catch (error) {

              // Logs errors to console
              console.error(error);
          }
      };

    getReports();
  }, [getAccessTokenSilently]);

  // Displays message if no reports are available
  if (!reportData) {
    return <div>You have no reports</div>;
  }

  // Determines the language of analyzed code
  const language = reportData ? mapExtensionToLanguage(reportData.analyzed_code.code_language) : 'none';


  return (
    <>
      <div className="dashboard-header">
        <h1 className="dashboard-title">Latest security scan</h1>
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
        <div className="vulnerabilities-container">
          <VulnerabilityCards vulnerabilities={reportData.vulnerabilities} language={language} />
        </div>
        </Tab>
        <Tab eventKey="code" title="Analyzed code" className="custom-tab">
          <CodeBlock codeString={reportData.analyzed_code.code} language={language} />
        </Tab>
      </Tabs>
    </>
  );
};

export default DashboardTabs;
