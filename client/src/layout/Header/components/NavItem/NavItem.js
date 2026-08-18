import { Highlight } from 'arwes';
import { Link } from 'react-router-dom';

import Clickable from '../../../../components/Clickable';

const NavItem = ({ classes, item, onNav }) => (
  <Clickable className={classes.clickable} onClick={onNav}>
    <Highlight className={classes.button} animate layer='header'>
      <Link className={classes.link} to={item.link}>
        <i className='material-icons'>{item.icon}</i>
        {item.label}
      </Link>
    </Highlight>
  </Clickable>
);

export default NavItem;
