import { useState } from "react";
import Loginbutton from "./Loginbutton";
import Logoutbutton from "./Logoutbutton";

function Loginlogin(){
    const [getItem, setItem] = useState(false);
    function handleLogin(){
        setItem(true)
    }
   const handleLogout = () =>{
        setItem(false)
    }
   const renderButton = () =>{
        let button =123;
        if(getItem){
            button= <Logoutbutton onClick= {handleLogout}/>
        }else{
            button = <Loginbutton onClick= {handleLogin}/>
        }
        return button;
    }
    return (
        <div>
            {renderButton()}
        </div>
    );
}
export default Loginlogin;