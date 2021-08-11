import React, { Component } from 'react';
import './item-status-filter.css';


export default class ItemStatusFilter extends Component {

  button = [
    {name: 'all', label: 'All'},
    {name: 'active', label: 'Active'},
    {name: 'done', label: 'done'}
  ]

//btn-outline-secondary
//app filter = 'all'

  render() {
    const {filter, onChangeFilter} = this.props;    

    const buttons = this.button.map(({name, label}) => {
      const isActive = filter === name;
      const clazz = isActive ? 'btn-info' : 'btn-outline-secondary';

      return <button type="button"
              className={`btn ${clazz}`}
              key={name}
              onClick={()=>onChangeFilter(name)}>{label}</button>
    })

    return (
      <div className="btn-group">
        {buttons}
      </div>
    );
  }
}
