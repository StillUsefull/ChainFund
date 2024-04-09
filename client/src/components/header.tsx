import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";

export function Header() {
    return (
        <>
            <Navbar collapseOnSelect expand='md' style={{background: '#0061FF'}}>
                <Container fluid>
                    <Navbar.Brand href="/">
                            <img
                                src="./chainfund-favicon-color.png"
                                height='100'
                                className="d-inline-block align-top"
                                alt="Logo"
                                style={{marginRight: 100, marginLeft: 60}}
                            />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id='responsive-navbar-nav'>
                        <Nav className="me-auto" style={{ fontSize: '25px', fontFamily: "cursive", gap: '20px'}}> {}
                            <NavDropdown title={<span style={{color: '#FFF148'}}>Funds</span>} id="navbarScrollingDropdown" color="#FFF148">
                                <NavDropdown.Item href="/funds">
                                    All
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/funds/military">
                                    Military Support
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/funds/health">
                                    Health and Medical
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/funds/development">
                                    Development and Open Source
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/funds/tech">
                                    Technology and Innovation
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/funds/eco">
                                    Environment and Conservation
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/funds/art">
                                    Arts and Culture
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href='/creators' style={{color: '#FFF148'}}>Creators</Nav.Link>
                            <Nav.Link href='/blog' style={{color: '#FFF148'}}>Blog</Nav.Link>
                            <Nav.Link href='/about' style={{color: '#FFF148'}}>About Us</Nav.Link>
                            <Nav.Link href='/help' style={{color: '#FFF148'}}>How to Start a Project</Nav.Link>
                        </Nav>
                        <Nav> 
                            <Button variant="outline-primary" style={{background:'#FFF68C', fontFamily: "cursive"}} href='/registration' className="me-2">Registration</Button>
                            <Button variant="primary"  style={{color: '#FFF148', fontFamily: "cursive"}} href='/login'>Login</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}