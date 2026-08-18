import { Logo, Words, Header as ArwesHeader, withStyles } from 'arwes';

import Centered from '../../components/Centered';
import Nav from './components/Nav';

import { styles } from './styles';

const navItems = [
  {
    label: 'Launch',
    link: '/launch',
    icon: 'check_circle_outline',
  },
  {
    label: 'Upcoming',
    link: '/upcoming',
    icon: 'update',
  },
  {
    label: 'History',
    link: '/history',
    icon: 'history',
  },
];

const Header = ({ classes, onNav, ...rest }) => (
  <ArwesHeader animate>
    <Centered className={classes.root} {...rest}>
      <img
        src='/favicon.png'
        alt=''
        className={classes.img}
        style={{
          margin: '15px 10px 15px 0',
          height: '50px',
          width: 'auto',
        }}
      />

      <Logo animate size={50} className={classes.logo} layer='header' />

      <Words animate className={classes.banner}>
        NASA Mission Control
      </Words>

      <Nav navItems={navItems} classes={classes} onNav={onNav} />
    </Centered>
  </ArwesHeader>
);

export default withStyles(styles)(Header);
