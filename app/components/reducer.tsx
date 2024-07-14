import { useReducer, useState } from "react";
import styles from "./style.module.css";

interface Todo {
    task: string;
    completed: boolean;
}

interface State {
    todos: Todo[];
    count: number;
}

interface Action {
    type: 'add' | 'remove' | 'toggle';
    text?: string;
    index?:number;
}

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "add": {
            if (action.text) {
                return {
                    ...state,
                    todos: [...state.todos, { task: action.text, completed: false }]
                };
            }
            return state;
        }
        case "toggle": {
            if (action.index !== undefined) {
                return {
                    ...state,
                    todos: state.todos.map((todo, i) =>
                        i === action.index ? { ...todo, completed: !todo.completed } : todo
                    )
                };
            }
            return state;
        }
        case "remove":{
            return{todos:state.todos.filter((task,index) => index !== action.index)}
        }
        default:
            return state;
    }
}

export default function Demo() {
    const [{ todos, count }, dispatch] = useReducer(reducer, {
        todos: [],
        count: 0
    });
    const [text, setText] = useState('');

    return (
        <>
            <form onSubmit={e => { e.preventDefault(); dispatch({ type: "add", text }); setText(""); }}>
                <input type="text" value={text} onChange={e => setText(e.target.value) } placeholder="enter your task" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </form>
            <br></br>
            <ul className="text-black "  >
                {todos.map((todo, index) => (
                    <li key={index} 
                    className="text-black border border-black rounded-full text-center w-5/12 bg-violet-500"
                    style = {{textDecoration:todo.completed ? "line-through"  : ""}}
                    onClick ={() => dispatch ({type:'toggle' ,index})} 
                    onDoubleClick={() => dispatch ({type: 'remove',index})}
                     >
                        {todo.task}
                        </li>
                ))}
            </ul>
        </>
    );
}
