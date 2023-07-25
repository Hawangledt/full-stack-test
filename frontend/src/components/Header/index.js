import { Link } from 'react-router-dom'
import { useApp } from '../../hooks/index'
import './Header.css'

function Header() {
  const { logout, user } = useApp()
  return (
      <header>
        <nav>
          <Link to="/">Beers</Link>
          <Link to={`/edit/${user.id}/user`}>My Profile</Link>
          <Link to="/users">Users</Link>
          <Link onClick={logout}>Logout</Link>
        </nav>
      </header>
  );
}

export { Header };
