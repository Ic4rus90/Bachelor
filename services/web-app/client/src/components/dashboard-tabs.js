import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import VulnerabilityCards from './vulnerability-cards';
import CodeBlock from './display-code';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';


const DashboardTabs = () => {
  const [reportData, setReportData] = useState(null);
  const { getAccessTokenSilently } = useAuth0();
  useEffect(() => {
      const getReports = async () => {
          try {
              const token = await getAccessTokenSilently(); 
              console.log(token)
              const response = await fetch('http://127.0.0.1:3000/getreports', {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              });
              if (response.ok) {
                  console.log("Response is OK");
                  const data = await response.json();
                  setReportData(data); 
                  console.log("response fetched. If it fails then it is set reports")
              } else {
                  console.error("Error fetching reports")
              }

          } catch (error) {
              console.log("List vulnerabilities error")
              console.error(error);
          }
      };

    getReports();
  }, [getAccessTokenSilently]);

  if (!reportData) {
    return <div>Loading...</div>;
  }

  return (
    <Tabs
      defaultActiveKey="vulnerabilities"
      id="Report-tabs"
      className="mb-3"
      style={{ color: '#FFFFFF' }}>
      <Tab eventKey="vulnerabilities" title="Vulnerabilities ">
        <VulnerabilityCards vulnerabilities={reportData.vulnerabilities} />
      </Tab>
      <Tab eventKey="code" title="Code">
        <CodeBlock codeString={reportData.analyzed_code.code} />
      </Tab>
    </Tabs>
  );
};

export default DashboardTabs;