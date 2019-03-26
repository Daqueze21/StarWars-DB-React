import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service'; //client connection

import './random-planet.css';

export default class RandomPlanet extends Component {

  SwapiService = new SwapiService(); //initialization

  state = {
    planet : {} //distruct obj
  };// changing data from server 
  
  //func constructor
  constructor (){
    super();
    this.updatePlanet();
  }

//create like ivent listener 
 
onPlanetLoaded = (planet) => {
  this.setState({planet});
};


  //create func update planet  by id 
  updatePlanet(){
    const id = Math.floor(Math.random()*25)+2;
    this.SwapiService
      .getPlanet (id)//server connection
      .then(this.onPlanetLoaded);
       //copy value from swapi.co to our state (transfer object) 
  }

  render() {
    const {planet : {id, name, population, rotationPeriod, diameter} } = this.state; // distruct data

    return (
      <div className="random-planet jumbotron rounded">
        <img className="planet-image"
            src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
        <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term"> Population: </span>
              < span > {population} </span>
            </li>
            <li className="list-group-item">
              < span className = "term" > Rotation Period: </span>
              < span > {rotationPeriod} </span>
            </li>
            <li className="list-group-item">
              < span className = "term" > Diameter </span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
      </div>

    );
  }
}
