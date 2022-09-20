import { combineReducers, configureStore, createSlice, getDefaultMiddleware, PayloadAction } from "@reduxjs/toolkit";
import { create } from "domain";
import logger from "redux-logger";
import { v1 as uuid } from "uuid";
import { todos } from "../data/initialTodos";
import { CREATE_TODO } from "./redux-og";

const todoSlice = createSlice({
    name: "todos",
    initialState: todos,
    reducers: {
        edit: (state, { payload }: PayloadAction<{ id: string, desc: string }>) => {

            const todo = state.find((todo) => todo.id === payload.id);
            if (todo) {
                todo.desc = payload.desc;
            }
        },
        remove: (state, { payload }: PayloadAction<{ id: string }>) => {
            const index = state.findIndex((todo) => todo.id === payload.id);
            if (index !== -1) {
                state.splice(index, 1)
            }
        },
        toggle: (state, { payload }: PayloadAction<{ id: string, isComplete: boolean }>) => {
            const todo = state.find((todo) => todo.id === payload.id);
            if (todo) {
                todo.isComplete = payload.isComplete;
            }
        },
        create: {
            reducer: (state , {payload}: PayloadAction<{id: string , desc:string , isComplete: boolean}>) => {
                state.push(payload)
            },
            prepare: ({ desc }: { desc: string }) => ({
                payload: {
                    id: uuid(),
                    desc,
                    isComplete: false
                }
            })
        }
    }
})

// id:uuid() , desc: desc , isComplete:false

const selectTodoSlice=createSlice({
    name:"selectedTodo",
    initialState: null as string |null,
    reducers:{
        select:(state , {payload}: PayloadAction<{id:string}>) => payload.id
    }
})

const counterSlice = createSlice({
    name:"counter",
    initialState:0,
    reducers:{
        
    },
    extraReducers:{
        [todoSlice.actions.create.type]: state=>state+1,
        [todoSlice.actions.edit.type]: state=>state+1,
        [todoSlice.actions.remove.type]: state=>state+1,
        [todoSlice.actions.toggle.type]: state=>state+1,
    }
})

const themeSlice= createSlice({
    name:"theme",
    initialState: false,
    reducers:{
        toggle:(state , {payload}: PayloadAction<{theme : boolean}>)=> payload.theme
    }
})
const reducers= combineReducers({
    todos: todoSlice.reducer,
    counter : counterSlice.reducer,
    selectedTodo: selectTodoSlice.reducer,
    theme: themeSlice.reducer
})

export const{
    create: createTodoAction,
    remove: deleteTodoAction,
    edit: editTodoAction,
    toggle:toggleDataAction
} = todoSlice.actions

export const{
    toggle: toggleThemeAction
} = themeSlice.actions;

export const{
    select: selectedTodoAction
} = selectTodoSlice.actions;


const middleware = [...getDefaultMiddleware(),logger]
export const store = configureStore({ reducer: reducers ,  devTools: process.env.NODE_ENV !== 'production', middleware})