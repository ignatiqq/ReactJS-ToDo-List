import { act } from "react-dom/cjs/react-dom-test-utils.production.min"

const initialState = {
    todos: [],
    colors: [],
    isLoaded: false,
}

const Todos = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ALL_TODOS":
            return {
                ...state,
                todos: action.payload,
                isLoaded: true,
            }
            
        case "SET_ALL_COLORS":
            return {
                ...state,
                colors: action.payload
            }

        case "SET_TODO_ITEM":
            const newTodos = [...state.todos, action.payload]
            return {
                ...state,
                todos: newTodos
            }

        case "DELETE_TODO_ITEM": 
            const filteredTodos = state.todos.filter(todo => todo.id !== action.payload)
            return {
                ...state,
                todos: filteredTodos
            }

        case "SET_TASK_ITEM":
            const itemTasks = state.todos.map(item => {
                if(item.id === action.payload.listId) {
                    item.tasks = [...item.tasks, action.payload]
                }
                return item
            })    

            return {
                ...state,
                todos: itemTasks
            }
            
        case "CHANGE_TASK_NAME":
            const newNameObj = state.todos.map(item => {
                if(item.id === action.payload.id) {
                    item.name = action.payload.name
                }
                return item
            })

        case "DELETE_TASK_ITEM": 
            const newListTasks = state.todos.map(item => {
                if(item.id === action.payload.listId) {
                    const filteredTasks = item.tasks.filter(task => task.id !== action.payload.id)
                    item.tasks = filteredTasks
                }
            })

        case "SET_COMPLETE_TOGGLE":
            const newListTaskCompleted = state.todos.map(item => {
                if(item.id === action.payload.listId) {
                    const completedList = item.tasks.filter(item => item.id === action.payload.id);
                    completedList.map(list => {
                        list.completed = action.payload.completed
                    })
                }
            })

            return {
                ...state
            }

        default:
         return state;
    }
}

export default Todos;