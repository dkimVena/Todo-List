import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './Item.scss';

const cx = classNames.bind(styles);

class Item extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.checked !== nextProps.checked;
  }

  render() {
    const { content, id, onRemove, onToggle, checked, color } = this.props;
    return (
      <div className={cx("todo-item")} onClick={() => onToggle(id)}>
        <div
          className={cx("todo-item-remove")}
          onClick={e => {
            e.stopPropagation();
            onRemove(id);
          }}>
          &times;
        </div>
        <div className={cx('todo-item-content', {'checked': checked})}>
          <div style={{color: color}}>{content}</div>
        </div>
        { checked && (<div className={cx("todo-item-checkmark")}>✓</div>)}
      </div>
    );
  }
}

export default Item;
