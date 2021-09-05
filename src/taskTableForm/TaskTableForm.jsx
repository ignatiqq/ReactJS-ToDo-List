import React from 'react';
import './TaskTableForm.css';

function TaskTableForm({ onAddTask, task }) {
  const [activePopup, setActivePopup] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [erorrPopup, setErrorPopup] = React.useState(false);
  const [taskSendState, setTaskSendState] = React.useState(false);

  const setTask = () => {
    if (!inputValue) {
      setErrorPopup(true);
      setTimeout(() => {
        setErrorPopup(false);
      }, 2000);
    } else {
      const obj = {
        listId: task.id,
        text: inputValue,
        completed: false,
      };
      setTaskSendState(true);
      fetch('http://localhost:3004/tasks', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      })
        .then((res) => res.json())
        .then((res) => onAddTask(res))
        .finally(() => {
          setTaskSendState(false);
          setActivePopup(false);
          setErrorPopup(false);
          setInputValue('');
        });
    }
  };

  const taskPopupState = () => {
    setActivePopup(!activePopup);
  };

  return (
    <div className="todo__task-addtodo">
      <button onClick={taskPopupState} className="todo__task-addbtn btnadd">
        Добавить задачу
      </button>

      {activePopup && (
        <div className="todo__task-popup">
          <input
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            placeholder="Что сделать?"
          />
          <div className="todo__task-popup-buttons">
            {erorrPopup ? (
              <button disabled onClick={setTask} className="todo__task-btnadd btnadd">
                Введите название
              </button>
            ) : (
              <button onClick={setTask} className="todo__task-btnadd btnadd">
                {taskSendState ? 'Добавление..' : 'Добавить'}
              </button>
            )}
            <button onClick={taskPopupState} className="todo__task-btnremove btnadd">
              Отмена
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskTableForm;
