import '../App.css';
import { Container } from 'react-bootstrap';
import HeaderAuthenticated from "../components/header-authenticated";
import { useAuth0 } from '@auth0/auth0-react';
import React, { Fragment, useEffect, useState } from 'react';


// Component for displaying the history of reports (not currently in use as this is still a work in progress)
export default function ReportHistoryPage() {
  const [reportData, setReportData] = useState(null);
  const { getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    const getReports = async () => {
      try {
        const token = await getAccessTokenSilently(); 
        console.log(token)
        const response = await fetch('https://securityseal.no/getreports', {
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
    <div className="App">
      <HeaderAuthenticated />
      <header className="App-header">
        <Container fluid>
        <Fragment>
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Report Date</th>
                        <th>Vulnerabilities</th>
                        <th>Analyzed Code</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={reportData.report.report_id}>
                        <td>{reportData.report.user_id}</td>
                        <td>{new Date(reportData.report.report_date).toLocaleString()}</td>
                        <td>
                            {reportData.vulnerabilities.map(vuln => (
                                <div key={vuln.vuln_id}>
                                    {vuln.code_extract} - {vuln.vuln_summary}
                                </div>
                            ))}
                        </td>
                        <td>
                            
                            <div>
                                {reportData.analyzed_code.code}
                            </div>
                            
                        </td>
                    </tr>
                </tbody>
            </table>
        </Fragment>
        </Container>
      </header>
    </div>
  );
}