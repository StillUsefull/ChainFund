import { useAuth } from '@utils/auth';
import { Button, Nav } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router';

function SidebarMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsLoggedIn, clearUser, user } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    clearUser();
    navigate('/', { replace: true });
  };

  const isAdmin = user?.role === 'ADMIN';
  const isSuper = user?.role === 'SUPER';
  const isUser = user?.role === 'USER';

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      height: 'auto',
      width: '260px',
      fontFamily: 'cursive',
      fontSize: '20px'
    }}>
      <Nav variant="tabs" activeKey={location.pathname} className="flex-column bg-light" style={{
          flex: 1,
          overflowY: 'auto',
          marginBottom: '50px'  
        }}>
        {isUser && (
          <>
            <Nav.Link href="/profile/settings" eventKey="/profile/settings">Profile Settings</Nav.Link>
            <Nav.Link href="/profile/donations" eventKey="/profile/donations">Donations</Nav.Link>
          </>
        )}
        {isAdmin && (
          <>
            <Nav.Link href="/profile/settings" eventKey="/profile/settings">Profile Settings</Nav.Link>
            <Nav.Link href="/profile/funds" eventKey="/profile/funds">My Funds</Nav.Link>
            <Nav.Link href="/profile/posts" eventKey="/profile/posts">My Posts</Nav.Link>
            <Nav.Link href="/profile/donations" eventKey="/profile/donations">Donations</Nav.Link>
            <Nav.Link href="/profile/help" eventKey="/profile/help">Help</Nav.Link>
          </>
        )}
        {isSuper && (
          <>
            <Nav.Link href="/profile/settings" eventKey="/profile/settings">Profile Settings</Nav.Link>
            <Nav.Link href="/profile/donations" eventKey="/profile/donations">Donations</Nav.Link>
            <Nav.Link href="/super/feature1" eventKey="/super/feature1">Super Feature 1</Nav.Link>
            <Nav.Link href="/super/feature2" eventKey="/super/feature2">Super Feature 2</Nav.Link>
          </>
        )}
      </Nav>
      <Button onClick={handleLogout} style={{
          background: '#FF5555',
          border: 'none',
          width: '100%',
          textAlign: 'center',
          padding: '10px 0'
        }}>
        Logout
      </Button>
    </div>
  );
}

export default SidebarMenu;
