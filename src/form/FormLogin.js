import { useState } from "react";

function FormLogin(){
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPass, setErrorPass] = useState('');

    function handleEmail(e){
        setEmail(e.target.value)
    }
    const handlePass = (e) =>{
        setPass(e.target.value)
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(email==""){
            setErrorEmail('vui long nhap email');
        }
        else{
            setErrorEmail("")
        }
        if(pass==""){
            setErrorPass("vui long nhap pass");
        }
        else{
            setErrorPass("")
        }
    }
    return(
        <form onSubmit={handleSubmit}>
            email:
            <input type="email" name="email" value={email} onChange={handleEmail} />
            <p>{errorEmail}</p>
            pass:
            <input type="password" name="password" value={pass} onChange= {handlePass} />
            <p>{errorPass}</p>
            <button type="submit" >submit</button>
        </form>
    );
}
export default FormLogin;