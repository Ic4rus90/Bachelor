import { useAuth0 } from '@auth0/auth0-react';
import React, { Fragment, useEffect, useState } from 'react';


const ListVulnerabilities = () => {
    const [reports, setReports] = useState([]);
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
                    console.log("response fetched. If it fails then it is set reports")
                    setReports(data);
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

    return (
        <Fragment>
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Code</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map(report => (
                        <tr key={report.id}>
                            <td>{report.code}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListVulnerabilities;