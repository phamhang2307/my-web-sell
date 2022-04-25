import { useState } from "react";

function Form(){
const [state, setState]  =  useState('')
    function handleChange(e){
        setState(e.target.value)
    }
    const handleSubmit =  (e) =>{
        alert('name:'+ state)
        e.preventDefault();
    }
    return(
        <form  onSubmit= {handleSubmit}>
            <label>
                name:
                <input type="text" value={state} onChange={handleChange}/>
            </label>
            <bbutton  type= "submit" >submit</bbutton>
        </form>
    );
}
export default Form;