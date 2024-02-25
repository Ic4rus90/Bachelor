import React, { Fragment, useEffect, useState } from 'react';

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