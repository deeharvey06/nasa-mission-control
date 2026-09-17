import { NavLink } from 'react-router-dom';
const Header = () => (
  <header className="topbar">
    <div className="topbar-inner">
      <NavLink to="/launch" className="brand" aria-label="Asterion Control home">
        <span className="brand-mark" aria-hidden="true"><span></span></span>
        <span><strong>ASTERION</strong><small>MISSION CONTROL</small></span>
      </NavLink>
      <nav className="primary-nav" aria-label="Primary navigation">
        <NavLink to="/launch" activeClassName="active"><span className="nav-icon">＋</span>Mission Planning</NavLink>
        <NavLink to="/upcoming" activeClassName="active"><span className="nav-icon">◌</span>Mission Queue</NavLink>
        <NavLink to="/history" activeClassName="active"><span className="nav-icon">↺</span>Archive</NavLink>
      </nav>
      <div className="system-state"><span className="status-dot"></span><span><b>ALL SYSTEMS</b><small>NOMINAL</small></span></div>
    </div>
  </header>
);
export default Header;
