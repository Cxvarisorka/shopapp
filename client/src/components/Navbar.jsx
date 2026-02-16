import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        Shop<span>Admin</span>
      </div>
      <div className="navbar-right">
        <span className="navbar-user">{user?.fullname}</span>
        <button className="btn-logout" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
