import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form'

import './app.css';

export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            { label: 'Drink Coffee', important: false, done: false, id: 1 },
            { label: 'Make Awesome App', important: false, done: false, id: 2 },
            { label: 'Have a lunch', important: false, done: false, id: 3 }
        ],
        term:'',
        filter:'all' //active, all, done 
    };

    deleteItem = (id) => {
        this.setState(({todoData})=>{
            const idx = todoData.findIndex((el) => el.id === id);
            const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx+1)];
            return {
                todoData: newArray
            }
        });        
    }

    addItem = (text) => {
        this.setState(({todoData}) => {
            const newItem = {
                label: text,
                important: false,
                done: false,
                id: this.maxId++
            }
            
            const newArray = [...todoData, newItem];

            return {
                todoData: newArray
            }
        })       
    }

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};
        return [...arr.slice(0, idx), newItem, ...arr.slice(idx+1)];
    }

    onToggleDone = (id) => {
        this.setState(({todoData})=>{
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        })
    }

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        })
    }

    onSearchChange = (term) => {        
        this.setState({
            term: term
        });        
    }

    onChangeFilter = (filter) => {
        this.setState({
            filter: filter
        })
    }

    search(array, text) {
        if (text.length === 0) {
            return array;
        }
        return array.filter(item => {
            return item.label.toLowerCase().indexOf(text.toLowerCase()) > -1;
        })
    }

    filter(array, filter) {
        switch (filter) {
            case 'all':
                return array;
            case 'active':
                return array.filter(item => !item.done)
            case 'done':
                return array.filter(item => item.done)
            default:
                return array;
        }
    }
    
    render() {
        const { todoData, term, filter } = this.state;
        
        const doneCount = todoData.filter(item => item.done === true).length;
        const todoCount = todoData.length - doneCount;   
        
        const newTodoDate = this.filter(this.search(todoData, term), filter);

        return (
            <div className="todo-app">
            <AppHeader toDo={todoCount} done={doneCount} />
            <div className="top-panel d-flex">
                <SearchPanel onSearchChange={this.onSearchChange}/>
                <ItemStatusFilter filter={filter} onChangeFilter={this.onChangeFilter}/>
            </div>
    
            <TodoList 
            todos={newTodoDate}  
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            onToggleImportant={this.onToggleImportant}
            />
            <ItemAddForm onItemAdd={this.addItem}/>
            </div>
        );
    }
}