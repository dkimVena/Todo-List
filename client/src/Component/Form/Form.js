import React from 'react';
import classNames from 'classnames/bind';
import styles from './Form.scss';

const cx = classNames.bind(styles);

const Form = ({value, onCreate, onChange, onKeyPress, selectedColor}) => {
  return (
    <div className={cx('todo-form')}>
      <input value={value} onChange={onChange} onKeyPress={onKeyPress} style={{color: selectedColor}}/>
      <div className={cx('todo-form-addBtn')} onClick={onCreate}>ADD</div>
    </div>
  );
};

export default Form;
