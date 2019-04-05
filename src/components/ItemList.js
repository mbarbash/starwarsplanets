import React from 'react';
import Item from './Item';

const ItemList = ({ state, makePlanetKey }) => {

	const { planets, residents } = state;
	
	return (
		<div>
			{ 
				planets.map((planet) => {
					const planetKey = makePlanetKey(planet.name);
					return (<Item 
						key={planetKey} 
						planet={planet} 
						residents={residents[planetKey].length ? residents[planetKey].join(', ') : "None"} />
					);
				}) 
			}
		</div>
	);
}

export default ItemList