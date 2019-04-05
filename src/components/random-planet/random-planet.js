import React, { Component } from 'react';

import Spinner from '../spinner';
import SwapiService from '../../services/swapi-service'; //client connection
import ErrorIndicator from '../error-indicator';

import './random-planet.css';


export default class RandomPlanet extends Component {

  swapiService = new SwapiService(); //initialization

  state = {
    planet : {}, //distruct obj
    loading: true, 
  
  };// changing data from server 
  
  componentDidMount(){
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, 10000);
    
  } 

  componentWillUnmount() {
    clearInterval(this.interval);
  }  

  //create like ivent listener 
  onPlanetLoaded = (planet) => {
    this.setState({planet, 
      loading: false,
      error: false
    });
  };

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    })
  }

  //create func update planet  by id 
  updatePlanet = () => {
    const id = Math.floor(Math.random()*25)+3;
    this.swapiService
      .getPlanet (id)//server connection
      .then(this.onPlanetLoaded)
       //copy value from swapi.co to our state (transfer object) 
      .catch(this.onError);
  }

  render() {
  
    const {  planet,  loading, error
    } = this.state;

    const hasData = !(loading || error); //have data if don't  have error or loading 

    const errorMessage = error ? <ErrorIndicator/> : null; 
    const spinner = loading ? <Spinner /> : null; //if load return spinner? or null (nothing)
    const content = hasData ? <PlanetView planet = {planet}/> : null; // if not load return planet view 
    
    return ( 
      <div className="random-planet jumbotron rounded">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const PlanetView = ({ planet }) => {
  
  const { id, name, population, rotationPeriod, diameter} = planet; // distruct data
  return ( 
    < React.Fragment>
      < img className = "planet-image"
            src = {`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}/> 
      <div>
        <h4> {name} </h4>
        <ul className = "list-group list-group-flush">
          <li className = "list-group-item">
            <span className = "term">Population:</span> 
            <span> {population}</span>
          </li>
          <li className = "list-group-item" >
            <span className = "term" > Rotation Period: </span>
            <span> {rotationPeriod} </span>
          </li>
          <li className = "list-group-item" >
            <span className = "term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div> 
    </React.Fragment>
  );
};