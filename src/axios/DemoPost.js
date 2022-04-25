
import axios from "axios";
import { useState } from "react";

// post: dua di
function DemoPost(){
    const [input, setInput] = useState("");

    function handleChange(e){

        setInput(e.target.value)
    }
    function handleSubmit(e){
        e.preventDefault();
        const data= {
            name: 'abc',
        }
   
        axios.post("http://jsonplaceholder.typicode.com/users", data)
        .then((res)=>{
            console.log(res)
        })
    }
    return(
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" value={input} onChange={handleChange} />
                <button type="submit" >Submit</button>
            </form>
        </>
    )
}
export default DemoPost;