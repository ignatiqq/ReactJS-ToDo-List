import React from 'react';
import './AddTodoError.css';
import classNames from 'classnames';

function AddTodoError({ activeError, onCloseError }) {

  return (
    <div className="addtodo__wrapper-error">
      <div
        className={classNames('addtodo__error', {
          active: activeError === true,
        })}>
        <div className="addtodo__error-popup">
          <div className="addtodo__error-text">Пожалуйста введите корректные данные!</div>
          <button onClick={onCloseError} className="addtodo__error-btn">
            Ок
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTodoError;
