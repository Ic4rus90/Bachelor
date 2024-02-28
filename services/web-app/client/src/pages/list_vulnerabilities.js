import { useAuth0 } from '@auth0/auth0-react';
import React, { Fragment, useEffect, useState } from 'react';



async function GetReports() {
    const { getAccessTokenSilently } = useAuth0();
    const token = await getAccessTokenSilently();
    const response = await fetch('http://localhost:3000/reports', {
        headers: {
            Authorization: `Bearer ${token}`,
    },
    });
    const data = await response.json();
    return data;
}


const ListVulnerabilities = () => {
    const [vulnerabilities, setVulnerabilities] = useState([]);

    const getVulnerabilities = async () => {
        try {
            const response = await fetch("http://localhost:3000/reports/2");
            console.log(response)
            const data = await response.json();
            
            setVulnerabilities(data);
            console.log(data);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getVulnerabilities();
    }, []); // Brackets make the useEffect run only once

    return (
        <Fragment>
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Report</th>
                        <th>Vulnerabilities</th>
                    </tr>
                </thead>
                <tbody>
                    {vulnerabilities.map(vulnerability => (
                        <tr key={vulnerability.id}>
                            <td>{vulnerability.vulnerability}</td>
                            <td>{vulnerability.vulnerable_code}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListVulnerabilities;