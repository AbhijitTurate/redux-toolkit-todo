import { randomUUID } from "crypto";
import { State, Todo } from "../Types";
import { v1 as uuid } from "uuid";
import { stringify } from "querystring";
import {combineReducers , createStore} from "redux"
import { todos } from "../data/initialTodos";
// constants
export const CREATE_TODO = "CREATE_TODO";
export const EDIT_TODO = "EDIT_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";
const SELECT_TODO = "SELECT_TODO"

// Action and action types
interface createTodoActionType {
    type: typeof CREATE_TODO,
    payload: Todo
}

export const createTodoAction = (data: { desc: string }): createTodoActionType => {
    return {
        type: CREATE_TODO,
        payload: {
            id: uuid(),
            desc: data.desc,
            isComplete: false
        }
    }
}

interface editTodoActionType {
    type: typeof EDIT_TODO,
    payload: {
        id: string,
        desc: string,
    }
}

export const editTodoAction = (data: { id: string, desc: string }): editTodoActionType => {
    return {
        type: EDIT_TODO,
        payload: {
            id: data.id,
            desc: data.desc
        }
    }
}

interface toggleTodoActionType {
    type: typeof TOGGLE_TODO,
    payload: {
        id: string,
        isComplete: boolean
    }
}

export const toggleDataAction = (data: { id: string, isComplete: boolean }): toggleTodoActionType => {
    return {
        type: TOGGLE_TODO,
        payload: {
            id: data.id,
            isComplete: data.isComplete
        }
    }
}

interface deleteTodoActionType{
    type: typeof DELETE_TODO,
    payload: {
        id:string
    }
}

export const deleteTodoAction = ({ id }: { id: string }): deleteTodoActionType => {
    return {
        type: DELETE_TODO,
        payload: {
            id
        }
    }
}

interface selectTodoActionType{
    type: typeof SELECT_TODO, payload: {
        id: string
    }
}
export const selectedTodoAction = ({ id }: { id: string }): selectTodoActionType => {
    return {
        type: SELECT_TODO,
        payload: {
            id
        }
    }
}

type todoActionType = createTodoActionType | toggleTodoActionType | editTodoActionType | selectTodoActionType | deleteTodoActionType
// reducer



export const todoReducer=(state : Todo[]=todos , action : todoActionType)=>{
    const {type , payload} = action
    switch(type){
        case CREATE_TODO:{
            return [...state , payload]
        }
        case EDIT_TODO:{
            return state.map((todo)=>todo.id === payload.id ? {...todo, desc: payload.desc}: todo)
        }
        case DELETE_TODO:{
            return state.filter((todo) => todo.id !== payload.id)
        }
        case TOGGLE_TODO:{
            return state.map((todo) => todo.id=== payload.id ?{...todo , isComplete: payload.isComplete}:todo)
        }
        default:
            return state;
    }
}

export const selectReducer=( state :null|string = null , action: selectTodoActionType)=>{
    switch(action.type){
        case SELECT_TODO:{
            return action.payload.id;   
        }
        default:
            return state
    }
}

const counterReducer = (state:number = 0 , action: todoActionType)=>{
    switch(action.type){
        case DELETE_TODO:{
            return state+1;
        }
        case CREATE_TODO:{
            return state+1;
        }
        case EDIT_TODO:{
            return state+1;
        }
        case TOGGLE_TODO:{
            return state+1;
        }
        default:
            return state;
    }
}

const reducers = combineReducers({
    todos: todoReducer,
    counter: counterReducer,
    selectedTodo : selectReducer
})

export const store = createStore(reducers)