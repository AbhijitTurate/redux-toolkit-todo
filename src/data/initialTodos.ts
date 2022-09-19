import { v1 as uuid } from "uuid";
import { Todo } from "../Types";
export const todos: Todo[] = [
    {
      id: uuid(),
      desc: "Learn React",
      isComplete: true
    },
    {
      id: uuid(),
      desc: "Learn Redux",
      isComplete: true
    },
    {
      id: uuid(),
      desc: "Learn Redux-ToolKit",
      isComplete: false
    }
  ];