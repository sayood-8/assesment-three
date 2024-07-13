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
    const {type} = action;
    const inputElement = document.getElementById("inp") as HTMLInputElement;
    const inputValue: string = inputElement.value;
    console.log(inputValue);
    switch (type){
        case "add" :{
            return {...state, todo : (state.todo = inputValue )  }
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
        <div>
            <input type="text"  id = "inp" placeholder="Enter your username"/>
            <br></br>
            <button className = {styles.button1} onClick={() => dispatch({type: 'add'})}>add</button>
            <button className = {styles.button2} onClick={() => dispatch({type: 'remove'})}>remove</button>
        </div>
        <div>
            <p className={styles.start}>Tasks:</p>
            
            <pre>{state.todo}</pre>

            
        </div>
        </>
    )
}