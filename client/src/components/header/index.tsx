import { useAuth } from "@utils/auth";
import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";

export function Header() {
    const { isLoggedIn } = useAuth();


    return (
        <>
            <Navbar collapseOnSelect expand='md' style={{background: '#0061FF', height: '160px'}}>
                <Container fluid>
                    <Navbar.Brand href="/">
                            <img
                                src="https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/kl5ohei6cf7esl6yvvib"
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
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/achieved-funds">
                                    Achieved
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href='/creators' style={{color: '#FFF148'}}>Creators</Nav.Link>
                            <Nav.Link href='/blog' style={{color: '#FFF148'}}>Blog</Nav.Link>
                            <Nav.Link href='/help' style={{color: '#FFF148'}}>How to Start a Project</Nav.Link>
                        </Nav>
                        <Nav> 
                             {isLoggedIn ? (
                                <>
                                <Button
                                    variant="primary"
                                    style={{
                                        background: '#FFF148',
                                        fontFamily: "cursive",
                                        color: '#0061FF',
                                        fontSize: '20px', 
                                        padding: '10px 20px', 
                                        border: 'none', 
                                        display: 'inline-block', 
                                        textAlign: 'center', 
                                        borderRadius: '5px' 
                                    }}
                                    href='/profile/settings'
                                >
                                    Profile
                                </Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="outline-primary" style={{ background: '#FFF68C', fontFamily: "cursive" }} href='/registration' className="me-2">Registration</Button>
                                    <Button variant="primary" style={{ color: '#FFF148', fontFamily: "cursive" }} href='/login'>Login</Button>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}