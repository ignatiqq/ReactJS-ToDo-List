export const getAllTodos = () => (dispatch) => {
    fetch('http://localhost:3004/lists?_expand=color&_embed=tasks')
    .then(res => res.json())
    .then(res => dispatch(setAllTodos(res)))
}

export const getAllColors = () => (dispatch) => {
    fetch("http://localhost:3004/colors")
    .then(res => res.json())
    .then(res => dispatch(setAllColors(res)))
}

export const setAllTodos = (arr) => {
    return {
        type: "SET_ALL_TODOS",
        payload: arr
    }
}

export const setAllColors = (colors) => {
    return {
        type: "SET_ALL_COLORS",
        payload: colors
    }
}

export const setTodoItem = (obj) => {
    return {
        type: "SET_TODO_ITEM",
        payload: obj
    }
}

export const deleteTodoItem = (id) => {
    return {
        type: "DELETE_TODO_ITEM",
        payload: id
    }
}

export const setTaskItem = (obj) => {
    return {
        type: "SET_TASK_ITEM",
        payload: obj
    }
}

export const changeTaskTitleName = (obj) => {
    return {
        type: "CHANGE_TASK_NAME",
        payload: obj
    }
}

export const deleteTaskItem = (obj) => {
    return {
        type: "DELETE_TASK_ITEM",
        payload: obj
    }
}

export const setCompleteToggle = (obj) => {
    return {
        type: "SET_COMPLETE_TOGGLE",
        payload: obj
    }
}