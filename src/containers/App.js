import React, { Component } from 'react';
import ItemList from '../components/ItemList';
import Item from '../components/Item';
import Navbar from '../components/Navbar';
import ErrorBoundry from './ErrorBoundry';
import Loader from '../components/Loader';
import './App.css';

const ErrorBoundryLoading = Loader(ErrorBoundry);
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
      residents: {},
      rotationPeriods: [], 
      orbitalPeriods: [], 
      diameters: [], 
      climates: [], 
      gravities: [], 
      terrains: [], 
      surfaceWaters: [],
      error: null,
      loading: true
    }
  }

  prevClick = (event) => this.fetchPlanets(this.state.previous, event.currentTarget.name);
  nextClick = (event) => this.fetchPlanets(this.state.next, event.currentTarget.name);

  makePlanetKey = planetName => planetName.toLowerCase().replace(' ', '_');

  fetchPlanets = async (url='https://swapi.co/api/planets/', dir=null) => {
    this.setState({ loading: true });
    try {
      const response = await fetch(url)
      const data = await response.json();
      const { results, next, previous, count } = data;
      const residentsState = {};

      let rotationPeriodSet = new Set(); 
      let orbitalPeriodSet = new Set(); 
      let diameterSet = new Set();  
      let climateSet = new Set(); 
      let gravitySet = new Set();  
      let terrainSet = new Set(); 
      let surfaceWaterSet = new Set(); 

      for (let planet of results) {
        const { 
          name, 
          residents, 
          rotation_period, 
          orbital_period, 
          diameter, 
          climate, 
          gravity, 
          terrain, 
          surface_water 
        } = planet;

        rotationPeriodSet.add(rotation_period); 
        orbitalPeriodSet.add(orbital_period);
        diameterSet.add(diameter);
        climateSet.add(climate);
        gravitySet.add(gravity);
        terrainSet.add(terrain);
        surfaceWaterSet.add(surface_water);

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
        showingEnd: showingEnd,
        rotationPeriods: [...rotationPeriodSet], 
        orbitalPeriods: [...orbitalPeriodSet], 
        diameters: [...diameterSet], 
        climates: [...climateSet], 
        gravities: [...gravitySet], 
        terrains: [...terrainSet], 
        surfaceWaters: [...surfaceWaterSet],
        loading: false
      });
    }
    catch(error) {
      throw Error(error);
      // this.setState({ loading: false });
    }
  }

  componentDidMount() {
    this.fetchPlanets(this.state.planetsPage);  
  }

  render() {
    return (
      <div className="App">
        <ErrorBoundryLoading isLoading={this.state.loading}>
          <header className="App-header">
            <h1>Star Wars Planet Intel</h1>
            <Navbar state={this.state} prevClick={this.prevClick} nextClick={this.nextClick}  />
          </header>
          <ItemList state={this.state} makePlanetKey={this.makePlanetKey}>
            <Item />
          </ItemList>
        </ErrorBoundryLoading>
      </div>
    );
  }
}

export default App;
