import NavItem from '../NavItem';

const Nav = ({ navItems, classes, onNav }) => (
  <nav className={classes.nav}>
    {navItems.map((item) => (
      <NavItem key={item.label} item={item} classes={classes} onNav={onNav} />
    ))}
  </nav>
);

export default Nav;
