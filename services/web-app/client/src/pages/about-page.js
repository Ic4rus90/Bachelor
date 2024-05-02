import React from 'react';
import '../App.css';
import HeaderNotAuthenticated from '../components/header-not-authenticated';
import securityseal from './securityseal.png';
import { Container, Row, Col, Image } from 'react-bootstrap';

export default function AboutPage() {
    return (
        <div className='App' style={{ height: '100vh', overflow: 'hidden' }}>
            <HeaderNotAuthenticated />
            <div className="App-header" style={{ height: '-50vh' }}>
                <Container fluid style={{ height: '100%', padding: '5px' }}>
                    <Row style={{ height: '100%' }}>
                        <Col md={7} style={{ textAlign: 'left', marginTop: '140px' }}>
                            <h1 style={{ fontWeight: 'bold', fontSize: '50px', marginBottom: '20px', marginLeft:'7px' }}>About Security Seal</h1>
                            <p style={{ fontSize: '18px', marginLeft:'7px' }}>
                            Security Seal is a system for scanning user code in C, C++, C# and Python for vulnerabilities in the <a href="https://cwe.mitre.org/top25/archive/2023/2023_top25_list.html">CWE top 25 list</a> leveraging a large language model (LLM).
                            The system is developed using a microservice architecture with a Visual Studio Code extension for sending code to analysis and displaying a summary of the results, and a web application to display the report in its entirety.
                            The back-end services include a token validator, a code verifier (to verify that the code sent is in the correct language), an LLM (currently the Phind CodeLlama-34b model), and a report generator (for creating and summarizing the output from the LLM).
                            The services are orchestrated through Prefect.

                            </p>
                            <p style={{ fontWeight: 'bold', marginLeft:'7px'}}>
                                For full documentation on how to install and use Security Seal, please visit our <a href="https://github.com/Ic4rus90/Bachelor">GitHub repository</a>.
                            </p>
                            <p style={{ fontSize: '15px', marginLeft:'7px', marginTop:'100px' }}>
                                Security Seal was created as part of a bachelor project at University of Agder. Please note that while we strive for accuracy, there is no guarantee that the reported results are correct.
                            </p>
                        </Col>
                        <Col md={5} style={{ marginTop: '40px' }}>
                            <Image src={securityseal} alt="Security Seal Logo" fluid />
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}