import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import LeftAccount from "./LeftAccount";
import My_product from "./My_product";
import Update_User from "./Update_User";

function Account(props){
    let accessToken = JSON.parse(localStorage.getItem('token'));
    let url = 'http://localhost/laravel/laravel/public/api/user/my-product';

    let config = {
        headers: {
            'Authorization' : 'Bearer ' + accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept' : 'application/json'
        }
    };
    useEffect(()=>{
        axios.get(url, config)
        .then(response =>{
            console.log(response)
        })
        .catch()

    }, [])
    
    return(
        <div className="container">
            <div className="row">
                <LeftAccount/>
                <div className="col-sm-9 padding-right">
                    <Update_User/>
                </div>
            </div>
        </div>
    );
}
export default Account;