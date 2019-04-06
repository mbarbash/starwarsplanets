import React from 'react';
import Item from './Item';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 'calc(60px + 30vh) 40px',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height:'100%', 
    boxSizing:'border-box',
    backgroundColor: 'rgba(255,255,255,.7)'
  },
});

const ItemList = (props) => {

	const { state, makePlanetKey, classes } = props;
	const { planets, residents } = state;
	
	return (
		<div className={classes.root}>
	    	<Grid container spacing={40}>
				{ 
					planets.map((planet) => {
						const planetKey = makePlanetKey(planet.name);
						return (
							<Grid item lg={4} md={6} sm={12}>
				          		<Paper className={classes.paper}>
					          		<Item 
									key={planetKey} 
									planet={planet} 
									residents={residents[planetKey].length ? residents[planetKey].join(', ') : "None"} />
								</Paper>
        					</Grid>
						);
					}) 
				}
		</Grid>
		</div>
	);
}

ItemList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemList);