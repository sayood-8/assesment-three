import { useReducer, useState } from "react";
import styles from "./style.module.css"
import { todo } from "node:test";
import { count } from "console";

interface State {
    todo : string;
}
interface Action{
    type : 'add' | 'remove';
}

function reducer(state :State , action:Action){
    const inputElement = document.getElementById("inp") as HTMLInputElement;
    const inputValue: string = inputElement.value;
    switch (action.type){
        case "add" :{
            return {...state , todo : (state.todo = inputValue )  }
        }
        case "remove" :{
            return {...state, todo : ("")  }
        }        
    }  
}

export default function Demo(){
    const [state , dispatch] = useReducer(reducer , 
        {
            todo : ""
        }
    );

    return(
        <>
        <br></br>
        <section>
            <input type="text"  id = "inp" placeholder="Enter your task" className="border-2  border-black rounded-full  text-center text-black  " />
            <br></br>
            <button className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => dispatch({type: 'add'})}>add</button>
            <button className = "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => dispatch({type: 'remove'})}>remove</button>
        </section>

        <div>
            <p className="text-base text-black border-2  border-black rounded-full  text-center w-5/12 bg-blue-400  ">Tasks:</p>
            <p className="text-black">{state.todo}</p>
        </div>
        </>
    )
}