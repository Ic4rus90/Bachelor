import '../App.css';
import { Container } from 'react-bootstrap';
import HeaderAuthenticated from "../components/header-authenticated";

export default function ReportHistoryPage() {
    return (
      <div className="App">
        <HeaderAuthenticated />
        <header className="App-header">
          <Container fluid>
            <h1 style={{ marginBottom: '30px' }} >Welcome to your history</h1>
            <h5>Will your code get our Seal of Approval?</h5>
          </Container>
        </header>
      </div>
    );
  }