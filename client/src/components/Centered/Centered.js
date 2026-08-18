import { withStyles } from 'arwes';

import { styles } from './styles';

const Centered = ({ classes, className, children, ...rest }) => (
  <div className={`${classes.root} ${className}`} {...rest}>
    {children}
  </div>
);

export default withStyles(styles)(Centered);
