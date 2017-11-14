import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {connect} from 'react-redux';
import TodoItem from './TodoItem'; 
import './App.css';
import {fetchTodos,removeTodo,updateTodo,createTodo} from './actions';

class App extends Component {
  
  constructor(props,context){
    super(props,context);
    this.state = {
      todo : ''
    }

  }  

  componentWillMount(){
    this.props.fetchTodos();
  }

  addTodo(){
    const todo = this.state.todo;
    this.props.createTodo(todo);
  }

  onChange(e){
    const todo = e.target.value;
    this.setState({todo});
   }

  render() {
    return (
      <div className="App">
        <h4>Todos</h4>
        <ul>
            {
              this.props.todos.map((todo) => {
               return (<TodoItem removeTodo={this.props.removeTodo} updateTodo={this.props.updateTodo} todo={todo} key={todo._id} />)
            })}
        </ul>
        <div>
          <input onChange={this.onChange.bind(this)} value={this.state.todo} type="text" placeholder="Enter a todo" />
          <button onClick={this.addTodo.bind(this)}>Add Todo</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos : state.todos
  }
};

const mapDispactorToProps = (dispatch) => {
  return {
    updateTodo : (id,todo) => dispatch(updateTodo(id,todo)),
    removeTodo : (id) => dispatch(removeTodo(id)),
    createTodo : (todo) => dispatch(createTodo(todo)),
    fetchTodos : () => dispatch(fetchTodos())
      
  };
};

export default connect(mapStateToProps,mapDispactorToProps)(App)

