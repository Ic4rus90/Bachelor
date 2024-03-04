import { useAuth0 } from '@auth0/auth0-react';
import React, { Fragment, useEffect, useState } from 'react';


const ListVulnerabilities = () => {
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
                            {reportData.analyzed_code.map(code => (
                                <div key={code.analyzed_code_id}>
                                    {code.code}
                                </div>
                            ))}
                        </td>
                    </tr>
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListVulnerabilities;