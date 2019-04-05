import React from 'react';

const Item = ({ planet, residents, planetKey }) => {

	const addThousandsSeparators = (num) => {
		var num_parts = num.toString().split(".");
		num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return num_parts.join(".");
	}

	const { 
		name, 
		rotation_period, 
		orbital_period, 
		diameter, 
		climate, 
		gravity, 
		terrain, 
		surface_water
	} = planet;

	return (
		<div>
          <h2>{name}</h2>
          <ul className="list tl">
            <li>Day Length: {rotation_period} days</li>  
            <li>Year Length: {addThousandsSeparators(orbital_period)} days</li>  
            <li>Diameter: {addThousandsSeparators(diameter)} miles</li>  
            <li>Climate Zones: {climate}</li>  
            <li>Gravitational Strength: {gravity}</li>  
            <li>Terrian Types: {terrain}</li> 
            <li>Percentage of Surface Covered by Water: {surface_water === 'unknown' ? 'unknown' 
              : surface_water + '%'}</li> 
            <li>Notable Residents: {residents}</li>  
          </ul>
        </div>
	);
}

export default Item;