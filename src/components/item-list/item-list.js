import React, { Component } from 'react';

import './item-list.css';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner/spinner";
export default class ItemList extends Component {

  swapiService = new SwapiService();

  state = {
    peopleList: null
  }; 

  componentDidMount(){
    this.swapiService
      .getAllPeople()
      .then((peopleList) => {
        this.setState({
          peopleList
        });
    });
  }
//for every element create list item with key and event listener which on click call onItemSelected function  
  renderItems(arr) { 
    return arr.map(({id, name}) => {
      return (
        <li className = "list-group-item" 
            key={id}  //id of person 
            onClick ={() => this.props.onItemSelected(id)}>
          {name}
        </li>
      );
    });
  }

  render() {

    const { peopleList } = this.state;

    if (!peopleList) {
      return < Spinner />;
    } //if peopleList -null return spinner
    
    const items = this.renderItems(peopleList);

    return (
      <ul className="item-list list-group">
        {items}
      </ul>
    );
  }
}
