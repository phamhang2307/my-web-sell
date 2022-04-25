import { render } from "@testing-library/react";
import axios from "axios";
import { useEffect, useState } from "react";

// get: lay ve
function Demo(){
    const [data, setData] = useState([]);

    //ham  chay 1 lan khi reload trang, va chay sau return  
    useEffect (()=>{
        axios.get('http://jsonplaceholder.typicode.com/users')
        .then(res=>{
            console.log(res.data)
             setData(res.data)
        })
        .catch(error=> console.log(error))
    }, [])



    function renderData(){
        if(data.length > 0){
            return data.map((value, key)=>{
                return(
                    <li key={key}>{value.name}
                        <p>{value.email}</p>
                    </li>
                )
            })
        }
        
    }

    return(
        <ul>
            {renderData()}
        </ul>
    )
}
export default Demo;