import { useState } from "react";
import FunError from "./FunError";

function FormFunLogin(){
    const [inputs, setInputs] = useState('');
    const [errors, setErrors]= useState({});

    //hàm handleInput: hàm dùng chung cho các thẻ input. textarea
    const handleInput= (e)=>{
        const nameInput= e.target.name;
        const value= e.target.value;
        setInputs(state => ({...state, [nameInput]:value}))
        // var ww = {[nameInput]:value};
        // console.log(ww)
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        let errorSubmit= {};
        let flag= true;
        if(inputs.email == undefined){
            flag= false;
            errorSubmit.email= ('Vui long nhap email');
        }
        if(inputs.password == undefined){
            flag= false;
            errorSubmit.password= ('Vui long nhap pass');
        }
        if(!flag){
            setErrors(errorSubmit);
        }
    console.log(inputs)
    }
    
    return(
        <div>
            {<FunError errors= {errors} />}
            <form onSubmit = {handleSubmit}>
                <input type="email" placeholder="Email" name="email" onChange={handleInput} />
                <input type="password" name="password" onChange= {handleInput} />
                <button type="submit" className="btn btn-default">Login</button>
            </form>
        </div>
    );
}
export default FormFunLogin;