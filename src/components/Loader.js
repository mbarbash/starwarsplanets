import React/*, { Component */ from 'react';

const WithLoading = (Component) => {
  return ({ isLoading, ...props }) => {
  	return (<Component {...props} />);
    /*if (!isLoading) return (<Component {...props} />);
    return (<div className="loading" style={{width:"100%", height:"100%", background:"rgba(0,0,0,.8)", position: "absolute"}}><Component {...props} /></div>);*/
  }
}

export default WithLoading;