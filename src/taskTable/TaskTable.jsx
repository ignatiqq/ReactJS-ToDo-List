import React from 'react';
import AddTodoError from '../errors/AddTodoError';
import TaskTableForm from '../taskTableForm/TaskTableForm';

import '../assets/img/bi_trash.svg';
import '../assets/img/jam_write.svg';
import '../errors/AddTodoError.css';
import './TaskTable.css';

function TaskTable({ task, onAddTask, changeTitleTask, deleteTask, setCompleteTask }) {
  const [changeNamePopup, setChangeNamePopup] = React.useState(false);
  const [changeNameInput, setChangeNameInput] = React.useState('');
  const [erorrPopup, setErrorPopup] = React.useState(false);

  const changeNameTask = () => {
    if (!changeNameInput) {
      setErrorPopup(true);
    } else {
      const objTitle = {
        name: changeNameInput,
        id: task.id,
      };
      fetch('http://localhost:3004/lists/' + task.id, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objTitle),
      })
        .then(changeTitleTask(objTitle))
        .finally(() => {
          setChangeNameInput('');
          setErrorPopup(false);
          setChangeNamePopup(false);
        });
    }
  };

  const changeName = () => {
    setChangeNamePopup(!changeNamePopup);
  };

  const deleteTaskItem = (id, listId) => {
    fetch('http://localhost:3004/tasks/' + id, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(deleteTask(id, listId));
  };

  const setCompleted = (todo) => {
    fetch('http://localhost:3004/tasks/' + todo.id, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: !todo.completed }),
    })
      .then((res) => res.json())
      .then((res) => setCompleteTask(res));
  };

  return (
    <div className="task">
      <div className="todo__task">
        <div className="todo__task-wrapper">
          <div className="todo__task-header">
            {task.color && (
              <div style={{ color: task.color.hex }} className="todo__task-name">
                {task.name}
              </div>
            )}

            <button onClick={changeName} className="todo__task-changename taskbtn">
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.755 14.399L8.29588 13.9545L17.5735 4.56575C17.6467 4.49076 17.6874 4.38999 17.6869 4.28521C17.6864 4.18044 17.6448 4.08005 17.5709 4.00575L17.0152 3.444C16.9793 3.40711 16.9365 3.37774 16.8891 3.3576C16.8417 3.33747 16.7908 3.32697 16.7393 3.32673C16.6878 3.32648 16.6368 3.33649 16.5892 3.35618C16.5417 3.37586 16.4985 3.40483 16.4622 3.44138L7.20913 12.8056L6.75412 14.3981L6.755 14.399ZM18.1151 2.331L18.6707 2.89363C19.4373 3.66975 19.4443 4.92188 18.6847 5.69013L9.1245 15.3659L5.831 16.3144C5.62992 16.3707 5.41473 16.3449 5.23264 16.2427C5.05056 16.1405 4.91645 15.9702 4.85975 15.7693C4.81756 15.6248 4.81695 15.4713 4.858 15.3265L5.81612 11.9665L15.351 2.31613C15.5323 2.13357 15.7481 1.98893 15.9859 1.89066C16.2237 1.79239 16.4787 1.74245 16.736 1.74375C16.9933 1.74506 17.2477 1.79758 17.4845 1.89825C17.7213 1.99893 17.9357 2.14574 18.1151 2.33013V2.331ZM8.036 3.33988C8.47 3.33988 8.82175 3.696 8.82175 4.13525C8.82244 4.23909 8.80266 4.34204 8.76354 4.43822C8.72441 4.53441 8.66671 4.62194 8.59374 4.69581C8.52076 4.76968 8.43394 4.82844 8.33824 4.86873C8.24254 4.90902 8.13984 4.93006 8.036 4.93063H4.893C4.025 4.93063 3.3215 5.64288 3.3215 6.5205V16.0633C3.3215 16.9418 4.025 17.654 4.893 17.654H14.322C15.19 17.654 15.8944 16.9418 15.8944 16.0633V12.8826C15.8944 12.4434 16.2461 12.0873 16.6801 12.0873C17.1141 12.0873 17.4659 12.4434 17.4659 12.8835V16.0633C17.4659 17.8203 16.058 19.2448 14.322 19.2448H4.893C3.157 19.2448 1.75 17.8203 1.75 16.0633V6.5205C1.75 4.76438 3.157 3.33988 4.893 3.33988H8.036Z"
                  fill="black"
                />
              </svg>
            </button>
          </div>

          {changeNamePopup && (
            <div className="todo__task-popup changename">
              <input
                onChange={(e) => setChangeNameInput(e.target.value)}
                type="text"
                placeholder="Название"
              />
              <div className="todo__task-popup-buttons">
                <button onClick={changeNameTask} className="todo__task-btnadd btnadd">
                  Изменить
                </button>

                <button onClick={changeName} className="todo__task-btnremove btnadd">
                  Отмена
                </button>
              </div>
            </div>
          )}

          <div className="todo__task-tasks">
            {task.tasks.map((todo) => (
              <div key={todo.id} className="todo__task-tasks-item">
                <div className="todo__task-itemwrapper">
                  <div className="checkbox">
                    {todo.completed ? (
                      <input
                        onClick={() => setCompleted(todo)}
                        id={`checkbox-${todo.id}`}
                        type="checkbox"
                        defaultChecked
                      />
                    ) : (
                      <input
                        onClick={() => setCompleted(todo)}
                        id={`checkbox-${todo.id}`}
                        type="checkbox"
                      />
                    )}

                    <label className="todo__task-fakecheckhox" to={`checkbox-${todo.id}`} />
                  </div>
                  <div className="todo__task-text">{todo.text}</div>
                </div>
                <button
                  onClick={() => deleteTaskItem(todo.id, todo.listId)}
                  className="todo__task-deletetask taskbtn">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5.5 5.5C5.63261 5.5 5.75979 5.55268 5.85355 5.64645C5.94732 5.74021 6 5.86739 6 6V12C6 12.1326 5.94732 12.2598 5.85355 12.3536C5.75979 12.4473 5.63261 12.5 5.5 12.5C5.36739 12.5 5.24021 12.4473 5.14645 12.3536C5.05268 12.2598 5 12.1326 5 12V6C5 5.86739 5.05268 5.74021 5.14645 5.64645C5.24021 5.55268 5.36739 5.5 5.5 5.5ZM8 5.5C8.13261 5.5 8.25979 5.55268 8.35355 5.64645C8.44732 5.74021 8.5 5.86739 8.5 6V12C8.5 12.1326 8.44732 12.2598 8.35355 12.3536C8.25979 12.4473 8.13261 12.5 8 12.5C7.86739 12.5 7.74021 12.4473 7.64645 12.3536C7.55268 12.2598 7.5 12.1326 7.5 12V6C7.5 5.86739 7.55268 5.74021 7.64645 5.64645C7.74021 5.55268 7.86739 5.5 8 5.5ZM11 6C11 5.86739 10.9473 5.74021 10.8536 5.64645C10.7598 5.55268 10.6326 5.5 10.5 5.5C10.3674 5.5 10.2402 5.55268 10.1464 5.64645C10.0527 5.74021 10 5.86739 10 6V12C10 12.1326 10.0527 12.2598 10.1464 12.3536C10.2402 12.4473 10.3674 12.5 10.5 12.5C10.6326 12.5 10.7598 12.4473 10.8536 12.3536C10.9473 12.2598 11 12.1326 11 12V6Z"
                      fill="#9A9A9E"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.5 3C14.5 3.26522 14.3946 3.51957 14.2071 3.70711C14.0196 3.89464 13.7652 4 13.5 4H13V13C13 13.5304 12.7893 14.0391 12.4142 14.4142C12.0391 14.7893 11.5304 15 11 15H5C4.46957 15 3.96086 14.7893 3.58579 14.4142C3.21071 14.0391 3 13.5304 3 13V4H2.5C2.23478 4 1.98043 3.89464 1.79289 3.70711C1.60536 3.51957 1.5 3.26522 1.5 3V2C1.5 1.73478 1.60536 1.48043 1.79289 1.29289C1.98043 1.10536 2.23478 1 2.5 1H6C6 0.734784 6.10536 0.48043 6.29289 0.292893C6.48043 0.105357 6.73478 0 7 0L9 0C9.26522 0 9.51957 0.105357 9.70711 0.292893C9.89464 0.48043 10 0.734784 10 1H13.5C13.7652 1 14.0196 1.10536 14.2071 1.29289C14.3946 1.48043 14.5 1.73478 14.5 2V3ZM4.118 4L4 4.059V13C4 13.2652 4.10536 13.5196 4.29289 13.7071C4.48043 13.8946 4.73478 14 5 14H11C11.2652 14 11.5196 13.8946 11.7071 13.7071C11.8946 13.5196 12 13.2652 12 13V4.059L11.882 4H4.118ZM2.5 3V2H13.5V3H2.5Z"
                      fill="#9A9A9E"
                    />
                  </svg>
                </button>
              </div>
            ))}

            <TaskTableForm task={task} onAddTask={onAddTask} />
          </div>
        </div>
        {erorrPopup && (
          <AddTodoError
            activeError={erorrPopup}
            task={task}
            onCloseError={() => setErrorPopup(false)}
          />
        )}
      </div>
    </div>
  );
}

export default TaskTable;
