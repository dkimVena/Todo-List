import React, { Component } from 'react';
import Item from './Item';

class ItemList extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.todos !== nextProps.todos;
  }

  render() {
    const { todos, onToggle, onRemove } = this.props;

    const todoList = todos.map((todo) => {
      return (
        <Item
          {...todo}
          key={todo._id}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      )
    });
    return (
      <div>
        {todoList}
      </div>
    );
  }
}

export default ItemList;
