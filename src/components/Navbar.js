import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});


const Navbar = (props) => {

	const { prevClick, nextClick, state, classes } = props;
	const { next, previous, count, showingStart, showingEnd } = state;

	return (
		<div>
			<div className="navbar">
				<Button name="prev" style={{visibility: previous ? 'visible' : 'hidden'}} onClick={prevClick} variant="contained" color="default" className={classes.button}>
					<KeyboardArrowLeftIcon className={classes.leftIcon} />Previous
				</Button>
				<Button name="next" style={{visibility: next ? 'visible' : 'hidden'}} onClick={nextClick} variant="contained" color="default" className={classes.button}>
					Next<KeyboardArrowRightIcon className={classes.rightIcon} />
				</Button> 
	      	</div>
	      	<p style={{visibility: count ? 'visible' : 'hidden'}}>{`Displaying ${showingStart} - ${showingEnd} of ${count} planets`}</p>
      	</div>
	)
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);