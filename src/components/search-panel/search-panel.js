import React, { Component } from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {

  state = {
    term:''
  }

  onSearchChange = (e) => {
    this.setState({
      term: e.target.value
    });
    this.props.onSearchChange(e.target.value);
  }

  render() {     
    return (
      <input type="text"
                className="form-control search-input"
                placeholder="type to search"
                onChange={this.onSearchChange}                
                />
    );
    
  }  
};
