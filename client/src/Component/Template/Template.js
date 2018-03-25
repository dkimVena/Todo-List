import React from 'react';
import classNames from 'classnames/bind';
import styles from './Template.scss';

const cx = classNames.bind(styles);


const Template = ({form, children, palette}) => {
  return (
    <main className={cx('todo-template')}>
      <div className={cx('todo-template-title')}>
        ToDo Today
      </div>
      <section className={cx('todo-template-palette')}>
        {palette}
      </section>
      <section className={cx('todo-template-form')}>
        {form}
      </section>
      <section className={cx('todo-template-todolist')}>
        {children}
      </section>
    </main>
  );
};

export default Template;
