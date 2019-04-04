import React, { Component } from 'react';
//import Item from '../components/Item';
import './App.css';

/*const fetchPlanets = async () => {
  try {
    const response = await fetch('https://swapi.co/api/planets')
    const data = await response.json();
    return data.results;
  }
  catch(error) {
    console.log(error);
  }
}*/





class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      planets: [],
      next: null,
      previous: null,
      count: 0,
      showingStart: 0,
      showingEnd: 0,
      residents: {}
    }
  }

  addThousandsSeparators = (num) => {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }

  prevClick = (event) => this.fetchPlanets(this.state.previous, event.target.name);
  nextClick = (event) => this.fetchPlanets(this.state.next, event.target.name);

  makePlanetKey = planetName => planetName.toLowerCase().replace(' ', '_');

  fetchPlanets = async (url='https://swapi.co/api/planets/', dir=null) => {
    try {
      const response = await fetch(url)
      const data = await response.json();
      const { results, next, previous, count } = data;
      const residentsState = {};
      for (let planet of results) {
        const { name, residents } = planet;
        let planetResidents = [];
        for (let resident of residents) {
          const response = await fetch(resident);
          const data = await response.json();
          planetResidents.push(data.name);
        }
        residentsState[this.makePlanetKey(name)] = planetResidents;
      }
      let showingStart, showingEnd;
      switch(dir) {
        case 'prev':
          showingStart = this.state.showingStart - results.length;
          showingEnd = this.state.showingEnd - results.length;
          break;
        case 'next':
          showingStart = this.state.showingStart + results.length;
          showingEnd = this.state.showingEnd + results.length;
          break;
        default:
          showingStart = 1;
          showingEnd = results.length;
      }
      this.setState({ 
        planets: results, 
        residents: residentsState,
        next: next,
        previous: previous,
        count: count,
        showingStart: showingStart,
        showingEnd: showingEnd
      });
    }
    catch(error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.fetchPlanets(this.state.planetsPage);  
  }

  render() {
    const { planets, residents, next, previous, count, showingStart, showingEnd } = this.state;
    let prevButton, nextButton;
    if (previous) {
        prevButton = <button name="prev" onClick={this.prevClick}>Previous</button>
    }
    if (next) {
      nextButton = <button name="next" onClick={this.nextClick}>Next</button>
    }
    return !planets.length ? <div className="App tc">
          <header className="App-header">
            <h1>Loading</h1>
          </header>
        </div>
    : (
      <div className="App tc">
        <header className="App-header">
          <h1>Star Wars Planet Intel</h1>
        </header>
        <div>
          <div>
            {prevButton} {nextButton}
          </div>
          <p>{`Displaying ${showingStart} - ${showingEnd} of ${count} planets`}</p>
        </div>
        {
        planets.map((planet) => {
          const { name, rotation_period, orbital_period, diameter, climate, gravity, terrain, surface_water } = planet;
          const planetKey = this.makePlanetKey(name);
          
          return (
            <div key={planetKey}>
              <h2>{name}</h2>
              <ul className="list tl">
                <li>Day Length: {rotation_period} days</li>  
                <li>Year Length: {this.addThousandsSeparators(orbital_period)} days</li>  
                <li>Diameter: {this.addThousandsSeparators(diameter)} miles</li>  
                <li>Climate Zones: {climate}</li>  
                <li>Gravitational Strength: {gravity}</li>  
                <li>Terrian Types: {terrain}</li> 
                <li>Percentage of Surface Covered by Water: {surface_water === 'unknown' ? 'unknown' 
                  : surface_water + '%'}</li> 
                <li>Notable Residents: {residents[planetKey].length ? residents[planetKey].join(', ') : "None"}</li>  
              </ul>
            </div>
          )
         })
      }
        <div>
          <div>
            {prevButton} {nextButton}
          </div>
          <p>{`Displaying ${showingStart} - ${showingEnd} of ${count} planets`}</p>
        </div>
      </div>
    );
  }
}

export default App;
