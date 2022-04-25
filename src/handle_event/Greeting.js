import Guest from "./Guest";
import User from "./User";

function Greeting(props){
    const isLoginn = props.isLogin;
    if(isLoginn){
        return <User/>
    }return <Guest/>
}

export default Greeting;
