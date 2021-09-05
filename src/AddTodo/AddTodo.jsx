import React from 'react';
import '../assets/img/addtodo.svg';
import './AddTodo.css';
import classNames from 'classnames';

import TodoItem from '../TodoItems/TodoItem';
import AddTodoError from '../errors/AddTodoError';

function AddTodo({ colors, onAddTodo }) {
  const [activeColor, setActiveColor] = React.useState(1);
  const [inputValue, setInputValue] = React.useState('');
  const [popupActive, setPopupActive] = React.useState(false);
  const [loadedTodo, setLoadedTodo] = React.useState(false);
  const [errorPopupActive, setErrorPopupActive] = React.useState(false);

  const popupColors = React.useRef();

  React.useEffect(() => {
    document.body.addEventListener('click', closePopupColors);
  }, []);

  const closePopupColors = (e) => {
    if (!e.path.includes(popupColors.current)) {
      setPopupActive(false);
    }
  };

  const addTodo = () => {
    if (!inputValue) {
      setErrorPopupActive(true);
    } else {
      setLoadedTodo(true);

      fetch('http://localhost:3004/lists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: inputValue, colorId: activeColor, tasks: [] }),
      })
        .then((res) => res.json())
        .then((res) => onAddTodo(res))
        .finally(
          () => (
            setErrorPopupActive(false),
            setPopupActive(false),
            setActiveColor(1),
            setInputValue(''),
            setLoadedTodo(false)
          ),
        );
    }
  };

  return (
    <div className="addtodo">
      <div ref={popupColors} className="addtodo_wrapper">
        <TodoItem
          onOpenPopup={() => setPopupActive(!popupActive)}
          items={[
            {
              name: 'Добавить папку',
              img: (
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0L12 25" stroke="#1D1D1F" />
                  <path d="M25 13L0 13" stroke="#1D1D1F" />
                </svg>
              ),
            },
          ]}
        />
        {popupActive && (
          <div className="addtodo__popup">
            <div className="addtodo__popup-wrapper">
              <input
                onChange={(e) => setInputValue(e.target.value)}
                type="text"
                placeholder="Название папки"
                className="addtodo__popup-input"
              />
              <div className="addtodo__popup-colors">
                <div className="addtodo__popup-colors-text">Выберите цвет:</div>
                <div className="addtodo__popup-colors-wrapper">
                  {colors &&
                    colors.map((color) => (
                      <div
                        onClick={() => setActiveColor(color.id)}
                        key={`colorid-${color.id}`}
                        style={{ background: color.hex }}
                        className={classNames('addtodo__popup-colors-items', {
                          active: color.id === activeColor,
                        })}></div>
                    ))}
                </div>
              </div>
              <button onClick={addTodo} className="addtodo__popup-addBtn">
                {loadedTodo ? 'Добавление...' : 'Добавить.'}
              </button>
            </div>
          </div>
        )}
      </div>
      <AddTodoError
        onCloseError={() => setErrorPopupActive(false)}
        activeError={errorPopupActive}
      />
    </div>
  );
}

export default AddTodo;
