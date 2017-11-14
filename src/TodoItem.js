import React, { Component } from 'react';

export default class TodoItem extends Component {
  
  constructor(props,context){
    super(props,context);
    this.state = {
      todoText : props.todo.todo,
      editable : false
    };
  }  


  _editTodo(e){
    let {editable,todoText} = this.state;
    const {todo} = this.props;
    editable = !editable;
    todoText = editable ? todo.todo : todoText; 
    this.setState({editable,todoText});
  }

  _updateTodo(id,todo){
    this.props.updateTodo(id,todo);
  }

  _onCommentEdited(){
    this.setState({editable : false});                             
    const _id = this.props.todo._id;
    const {todoText} = this.state;
    this.props.updateTodo(_id,todoText);
  }
  
  _onChange(e){
    const todoText = e.target.value;
    this.setState({todoText});
  }

  render() {

    const {editable,todoText} = this.state;
    const {todo,_id} = this.props.todo; 
    const value = editable ? todo.todo : todoText;

    return (
      <div key={_id} className="todo-item">
          {editable ? 
          <textarea onChange={this._onChange.bind(this)} value={todoText} />
           : 
          <div>
            {todoText}
          </div>
          }
          {!editable ?
          (
            <div className='edit-section'>
              <span className='remove' onClick={() =>  this.props.removeTodo(_id) }>X</span>
              <span onClick={this._editTodo.bind(this)} className='edit'>Edit</span> 
           </div>
          ) :
          <button onClick={this._onCommentEdited.bind(this)}>Edit Comment</button>
         }
      </div>
    );
  }
}
