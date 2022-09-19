 export interface Todo{
    id: string,
    desc: string,
    isComplete: boolean
 }

 export interface State{
    todos: Todo[],
    counter : number,
    selectedTodo : string|null
 }