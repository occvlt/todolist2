import React, { Component } from 'react';
import './item-add-form.css';

export default class ItemAddForm extends Component {

    state = {
        text: ''
    }

    onLabelChange = (e) => {
        this.setState({
            text: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();          
        this.props.onItemAdd(this.state.text);
        this.setState({
            text:''
        })
    }

    render() {
        return (            
            <form className='item-add-form d-flex' onSubmit={this.onSubmit}>
                <input 
                    type='text' 
                    className='form-control' 
                    placeholder='текст заметки'                    
                    onChange={this.onLabelChange}
                    value={this.state.text}
                    required
                />
                <button 
                    className='btn btn-outline-secondary'                
                >Add Item</button>
            </form>            
        )
    }
}