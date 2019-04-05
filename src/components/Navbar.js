import React from 'react';

const Navbar = ({ prevClick, nextClick, state }) => {

	const { next, previous, count, showingStart, showingEnd } = state;

    const prevButton = previous ? <button name="prev" onClick={prevClick}>Previous</button> : '';
    const nextButton = next ? <button name="next" onClick={nextClick}>Next</button> : '';

	return (
		<div>
			<div className="navbar">
	       	 {prevButton} {nextButton}
	      	</div>
	      	<p>{ count ? `Displaying ${showingStart} - ${showingEnd} of ${count} planets` : ""}</p>
      	</div>
	)
}

export default Navbar;