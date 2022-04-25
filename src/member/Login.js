import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FunError from "../form/FunError";

function Login(){
    const [input, setInput]= useState('');
    const [error, setError]= useState({});
    function handleChange(e){
        const nameInput= e.target.name;
        const value= e.target.value;
        setInput(state=>({...state, [nameInput]:value}))
    }
    const navigate= useNavigate();
    function handleSubmit(e){
        
        let errorSubmit= {};
        setError(errorSubmit);
        let flag=true;
        let check= (/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
        if(input.email=='' || input.email==undefined){
            errorSubmit.email='vui long nhap email';
            flag= false;
        }else if(check.test(input.email)== false){
            flag= false;
            errorSubmit.email='nhap sai dinh dang email';
        }else{
            errorSubmit.email='';
        }
        if(input.password=='' || input.password==undefined){
            errorSubmit.password='vui long nhap password';
            flag= false;
        }else{
            errorSubmit.password='';
        }
        if(!flag){
            setError(errorSubmit);
        }
        if(flag){
            const data = {
                email: input.email,
                password: input.password,
                level: 0
            };
                axios.post('http://localhost/laravel/laravel/public/api/login', data )
                .then((res)=>{
                    if(res.data.errors){
                        setError(res.data.errors)

                    }else{
                        localStorage.setItem('log', JSON.stringify(true))
                        navigate("/index.html")    
                        localStorage.setItem('token', JSON.stringify(res.data.success.token));
                        localStorage.setItem('auth', JSON.stringify(res.data.Auth));      
                    }
                    console.log(res)
                    
                })
        };
        e.preventDefault();
    }
    
    return(
        <div>
            <FunError errors={error}/>
            <div className="col-sm-4 col-sm-offset-1">
                <div className="login-form">
                    <h2>Login to your account</h2>
                    <form action="#" onSubmit={handleSubmit} encType="multipart/form-data" >
                        <input type="email" placeholder="Email Address" name="email" onChange={handleChange}/>
                        <input type="password" placeholder="Password" name="password" onChange={handleChange} />
                        <span>
                            <input type="checkbox" className="checkbox"/> 
                            Keep me signed in
                        </span>
                        <button type="submit" className="btn btn-default">Login</button>
                  </form>
                </div>
            </div>
        </div>
        
    );
}
export default Login;