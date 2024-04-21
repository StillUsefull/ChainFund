import { useAuth } from '@utils/auth';
import { Button, Nav } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router';

function SidebarMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsLoggedIn, clearUser } = useAuth();
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    clearUser();  
    navigate('/', { replace: true });
};

  return (
    <div style={{ position: 'fixed', height: '30%', width: '260px', overflowY: 'auto', fontFamily: 'cursive', fontSize: '20px'}}>
      <Nav  variant="tabs" activeKey={location.pathname} className="flex-column bg-light" style={{ width: '100%', height: '100%' }}>
        <Nav.Link href="/profile/settings" eventKey="/profile/settings">Profile settings</Nav.Link>
        <Nav.Link href="/profile/funds" eventKey="/profile/funds">My Funds</Nav.Link>
        <Nav.Link href="/profile/posts" eventKey="/profile/posts">My Posts</Nav.Link>
        <Nav.Link href="/profile/donations" eventKey="/profile/donations">Donations</Nav.Link>
        <Nav.Link href="/profile/help" eventKey="/profile/help">Help</Nav.Link>
        <Nav.Item style={{ width: '100%' }}>
          <Button onClick={handleLogout} style={{
              background: '#FF5555', 
              border: 'none', 
              width: '250px', 
              textAlign: 'center', 
              padding: '10px 0' 
            }}>
            Logout
          </Button>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default SidebarMenu;