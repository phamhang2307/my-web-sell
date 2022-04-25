import LeftAccount from "./LeftAccount";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function My_product(){

    let accessToken = JSON.parse(localStorage.getItem('token'));
    const [data, setData] = useState({});
    let config = {
        headers: {
            'Authorization' : 'Bearer ' + accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept' : 'application/json'
        }
    };
    let layid='';
    let layid2='';
    let getId=0;
    function handleDelete(e){

        layid= e.target;
        layid2= layid.closest("tbody");
        getId= layid2.getAttribute("id");
        console.log(getId)

        let url2= 'http://localhost/laravel/laravel/public/api/user/delete-product/'+ getId;
        axios.get(url2, config)
            .then(res=>{
                console.log(res)
                axios.get(url, config)
                .then(response =>{
                    setData(response.data.data)
                })
                .catch()
            })
        .catch()    
        e.preventDefault();

    }
    let url = 'http://localhost/laravel/laravel/public/api/user/my-product';
    useEffect(()=>{
        axios.get(url, config)
        .then(response =>{
            setData(response.data.data)
        })
        .catch()

    }, [])
    
    let datas= data;
    return(
        <div className="container">
            <div className="row">
                <LeftAccount/>
                <div className="col-sm-9 ">
                    <section id="account_items">
                            <div className="table-responsive account_info">
                                <table className="table table-condensed">
                                    <thead>
                                        <tr className="account_menu">
                                            <td className="id">Id</td>
                                            <td className="description">Name</td>
                                            <td className="image">Image</td>
                                            <td className="price">Price</td>
                                            <td className="action">Action</td>
                                        </tr>
                                    </thead>
                                    {   
                                        Object.keys(datas).map((value, key) =>{
                                            let dataImage= JSON.parse(datas[value].image);
                                            let anh= '';
                                            Object.keys(dataImage).map((value2,key2) =>{
                                                console.log(datas[value].id)
                                                anh=  dataImage[value2];
                                            })

                                            if(typeof(datas[value])=="object"){
                                                let auth = JSON.parse(localStorage.getItem('auth'));
                                                    return(
                                                        <tbody  key={key} id={datas[value].id}>
                                                            <tr  > 
                                                                <td className="account_id">
                                                                    <h4>{datas[value].id}</h4>
                                                                </td>
                                                                <td className="account_name">
                                                                    <h4>{datas[value].name}</h4>
                                                                </td>
                                                                <td className='account_image'>
                                                                    <img src={"http://localhost/laravel/laravel/public/upload/user/product/"+auth.id+'/'+ anh }/>
                                                                </td>
                                                                <td className="account_price">
                                                                    <h4>${datas[value].price}</h4>
                                                                </td>
                                                                <td className="account_action">
                                                                    <a href={"/edit_product/"+ datas[value].id}><i className="fa fa-edit"></i></a>
                                                                    <a href="" onClick={handleDelete}><i className="fa fa-times" ></i></a>
                                                                </td>
                                                            </tr>
                                                        </tbody>                           
                                                    )    
                                                }
                                            
                                        })
                                    }
                                </table>
                            </div>
                            <button type="submit" className="btn btn-primary"> <a href="/create_product">Add New</a> </button>

                        </section>      
                </div>
            </div>
        </div>
        
        
    )
}
export default My_product;