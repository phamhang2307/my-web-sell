import { useState } from "react";
import FunError from "../form/FunError";

function FormLoginReg(){
    const [input, setInput]= useState('');
    const [error, setError]= useState({});

    function handleInput(e){
        const nameInput= e.target.name;
        const value= e.target.value;
        setInput(state=> ({...state, [nameInput]: value}))
    }
    function handleSubmit(e){
        e.preventDefault();
        let check= (/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
        let getReg= localStorage.getItem('login')
        let objReg={};
        if(getReg){
            objReg= JSON.parse(getReg)
        }
        let tongemailreg=[];
        let tongpassreg=[];
        let demo= true;
        let errorSubmit= {};
        setError(errorSubmit);
        Object.keys(objReg).map((key)=>{
            let emailreg= objReg[key]['email']
            let passreg= objReg[key]['password']
            tongemailreg.push(emailreg);
            tongpassreg.push(passreg);
        }) 
        if(input.email==undefined || input.email==''){
            demo=false;
            errorSubmit.email= ('vui long nhap email');
            
        }else if(check.test(input.email)== false){
            demo= false;
            errorSubmit.email= ('nhap sai dinh dang email')
        }
        if(input.password==undefined || input.password==''){
            demo= false;
            errorSubmit.password= ('vui long nhap pass')
        }
        if(demo){
            if(tongemailreg.includes(input.email)==false || tongpassreg.includes(input.password)==false ){
                alert('email hoac pass khong dung')
            }else{
                alert('login thanh cong')
            }
        }
        if(!demo){
            setError(errorSubmit);
        }
        console.log(!demo)
    }
    return(
        <div>
            <FunError errors={error}/>
            <form onSubmit={handleSubmit} >
                <input type='text' name= 'email' onChange= {handleInput} />
                <input type='password' name= 'password' onChange= {handleInput} />
                <button type='submit' >Login</button>
            </form>
        </div>
    );
}
export default FormLoginReg;