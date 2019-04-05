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
      error: null,
      loading: true
    }
  }

  prevClick = (event) => this.fetchPlanets(this.state.previous, event.target.name);
  nextClick = (event) => this.fetchPlanets(this.state.next, event.target.name);

  makePlanetKey = planetName => planetName.toLowerCase().replace(' ', '_');

  fetchPlanets = async (url='https://swapi.co/api/planets/', dir=null) => {
    this.setState({ loading: true });
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
        showingEnd: showingEnd,
        loading: false
      });
    }
    catch(error) {
      throw Error(error);
      this.setState({ loading: false });
    }
  }

  componentDidMount() {
    this.fetchPlanets(this.state.planetsPage);  
  }

  render() {
    const { planets } = this.state;
    console.log(this.state.loading);

    return (
      <div className="App tc">
        <header className="App-header">
          <h1>Star Wars Planet Intel</h1>
        </header>
        <ErrorBoundryLoading isLoading={this.state.loading}>
          <Navbar state={this.state} prevClick={this.prevClick} nextClick={this.nextClick}  />
            <ItemList state={this.state} makePlanetKey={this.makePlanetKey}>
              <Item />
            </ItemList>
          <Navbar state={this.state} prevClick={this.prevClick} nextClick={this.nextClick}  />
        </ErrorBoundryLoading>
      </div>
    );
  }
}

export default App;
