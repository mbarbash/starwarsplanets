import React from 'react';

const Item = ({...props}) => {
	return (
		<div>
          <ul>
          <li>{name}</li> 
            <li>{rotation_period}</li>  
            <li>{orbital_period}</li>  
            <li>{diameter}</li>  
            <li>{climate}</li>  
            <li>{gravity}</li>  
            <li>{terrain}</li> 
            <li>{surface_wa}</li> 
            <li>{residents}</li>  
          </ul>
        </div>
	)

}

export default Item;