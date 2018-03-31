import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Template from './Component/Template';
import Form from './Component/Form';
import ItemList from './Component/ItemList';
import Palette from './Component/Palette';


class App extends Component {

    constructor(props) {
      super(props);
      this.state = {
        input: '',
        selectedColor: '#343a40',
        todos: [],
        colors: ['#343a40', '#f03e3e', '#12b886', '#228ae6']
      }
      this.handleCreate = this.handleCreate.bind(this);
      this.handleToggle = this.handleToggle.bind(this);
      this.handleRemove = this.handleRemove.bind(this);
    }

  async componentDidMount() {
    try {
      const response = await axios.get('/api/todos');
      const todos   = await response.data;
      this.setState({ todos : todos });
    } catch(e) {
      toast(e.response.data.message, {
        type: toast.TYPE.ERROR });
    }
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    });
  }

  async handleCreate () {
      const {input, todos, selectedColor} = this.state;

      const formData = {
        content: input,
        color: selectedColor
      }
      try {
        const response = await axios.post('/api/todos', formData);
        const todo = await response.data;
  
        this.setState({
          todos: todos.concat({
            _id: todo._id,
            content: todo.content,
            checked: todo.checked,
            color: todo.color
          }),
          input: ''
        });
      } catch(e) {
        toast(e.response.data.message, {
          type: toast.TYPE.ERROR });
      }
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      this.handleCreate();
    }
  }

  async handleToggle (id) {
    const {todos} = this.state;

    const index = todos.findIndex(todo => todo._id === id);
    const selected = todos[index];

    let nextTodos = [...todos];

    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    }
    if(!selected.checked) {
      const tmpTodo = nextTodos.splice(index, 1);
      nextTodos = nextTodos.concat(tmpTodo);
    } else {
      const tmpTodo = nextTodos.splice(index, 1);
      nextTodos = tmpTodo.concat(nextTodos);
    }

    try {
      const response = await axios.put('/api/todos', nextTodos[index]);
      if(!response.error) {
        this.setState({
          todos: nextTodos
        });
      }
    } catch(e) {
      toast(e.response.data.message, {
        type: toast.TYPE.ERROR });
    }
  }

  async handleRemove (id) {
    try {
      const {todos} = this.state;
      const response = await axios.delete(`/api/todos/${id}`);
      if(!response.error) {
        this.setState({
          todos: todos.filter(todo => todo._id !== id)
        });
      }
    } catch(e) {
      toast(e.response.data.message, {
        type: toast.TYPE.ERROR });
    }
  }

  handleColor = (id) => {
    this.setState({
      selectedColor: id
    });
  }

  render() {
    const {input, todos, colors, selectedColor} = this.state;
    const {handleChange, handleCreate, handleKeyPress, handleToggle, handleRemove, handleColor} = this;

    return (
      <Template
        form={
          <Form
            value={input}
            onKeyPress={handleKeyPress}
            onChange={handleChange}
            onCreate={handleCreate}
            selectedColor={selectedColor}
          />
        }

        palette={
          <Palette colors={colors} selectedColor={selectedColor} onColor={handleColor} />
        }
        >
        <ItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
        <ToastContainer />
      </Template>
    );
  }
}

export default App;
