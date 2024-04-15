import { Container } from 'react-bootstrap';


export function ErrorPage() {

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <h1 style={{ fontSize: '3rem', color: '#dc3545' }}>Oops!</h1>
      <p style={{ fontSize: '1.5rem' }}>We can't seem to find the page you're looking for.</p>
    </Container>
  );
}