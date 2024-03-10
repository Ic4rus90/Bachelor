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
              
              const response = await fetch('http://bsc-group-17-web-server.bsc-group-17:3001/getreports', {
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