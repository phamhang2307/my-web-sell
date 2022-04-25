import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MenuLeft from "./MenuLeft";
import { PopupboxManager, PopupboxContainer } from 'react-popupbox';
import "react-popupbox/dist/react-popupbox.css"

function Product_detail(){
    let params= useParams();

    const [data, setData]= useState([]);
    const [qty, setQty]= useState({
        [params.id]:1,
    });
    const [dataCategory, setDataCategory] = useState([]);
    const [dataBrand, setDataBrand] = useState([]);
    useEffect (()=>{
        axios.get("http://localhost/laravel/laravel/public/api/product/detail/"+params.id)
        .then(res=>{
             setData(res.data.data);
             console.log(res.data.data)
             axios.get("http://localhost/laravel/laravel/public/api/category-brand")
             .then((res1)=>{
                 setDataCategory(res1.data.category);
                 setDataBrand(res1.data.brand);
             });
        })        

        .catch()
    }, [])
    
    function openZoom(){
        let getClass = document.querySelector(".imgBig")
        let getSrc= getClass.getAttribute("src")
        console.log(getSrc)

        const content= <img className="imgZoom" src={getSrc}/>
        PopupboxManager.open({
            content,
            config:{
                fadeIn: true,
                fadeInSpeed: 500
            }
        })
    }
    function handleZoom(){
        return(
            <div>
                <a  href="#" onClick={openZoom} ><h3>ZOOM</h3></a>
                <PopupboxContainer />
            </div>
        )
    }
    let abc={};
    function handleAddCart(){
        console.log(qty)
        localStorage.setItem('qty', JSON.stringify(qty))
    }

    function handleChangeQty(){
        let getClassQty= document.querySelector(".qty");
        let valueQty= getClassQty.value;
        console.log(valueQty)
        const id= params.id;
        console.log(id)
        setQty(state=> ({...state, [id]:valueQty}))
        console.log(qty)

    }

    function handleRight(){
        function handleStatus(){
            if(data.status=="1"){
                return(
                   <div>
                        <p><b>Condition: </b>Sale</p>
                        <p><b>Sale: </b>{data.sale}%</p>
                   </div>
                )
            }else if(data.status=="0"){
                return(
                    <p><b>Condition:</b>New</p>
                )

            }
            
        }
        if(Object.keys(data).length>0){
            /* if(dataCategory.length>0){
                dataCategory.map((value)=>{
                    
                })
            } */
            
            return(
                <div className="col-sm-7">
                            <div className="product-information">{/*/product-information*/}
                            <img src="images/product-details/new.jpg" className="newarrival" alt="" />
                            <h2>{data.name}</h2>
                            <p>Web ID: {data.id}</p>
                            <img src="images/product-details/rating.png" alt="" />
                            <span>
                                <span>US ${data.price}</span>
                                <label>Quantity: </label>
                                <input className="qty" type="text" defaultValue={1} onChange={handleChangeQty} />
                                <button type="button" className="btn btn-fefault cart" onClick={handleAddCart} ><i className="fa fa-shopping-cart" />Add to cart</button>
                            </span>
                            <p><b>Availability:</b> In Stock</p>
                            {handleStatus()}
                            <p><b>Brand:</b> E-SHOPPER</p>
                            <a href><img  className="share img-responsive" alt="" /></a>
                            </div>{/*/product-information*/}
                        </div>
            )
        }
        
    }
    function handleChange(e){
        let getSrc = e.target.src;
        let changeSrc= document.querySelector(".imgBig")
        changeSrc.setAttribute("src", getSrc)
    }
    function handleShow(){
        if(Object.keys(data).length>0){
            let imgs= JSON.parse(data.image)
            return imgs.map((value)=>{
                return(
                    <div className="item active">
                        <a href><img className="imgSmall" src={"http://localhost/laravel/laravel/public/upload/user/product/"+ data.id_user +'/'+ value} onClick={handleChange} alt="" /></a>
                    </div>
                )
            })
            
        }
        
    }
    return(
        <div>
            <MenuLeft/>
            <div>
            {
                data != '' ? 
            <div className="col-sm-9 padding-right">
                <div className="product-details">
                    <div className="col-sm-5">
                        <div className="view-product">
                            <img className="imgBig" src={"http://localhost/laravel/laravel/public/upload/user/product/"+ data.id_user +'/'+JSON.parse(data.image)[0]} alt="" />
                            {handleZoom()}
                            
                        </div>
                        
                        <div id="similar-product" className="carousel slide" data-ride="carousel">
                                    <div className="carousel-inner">
                                        
                                        {handleShow()}
                                    </div>
                                    <a className="left item-control" href="#similar-product" data-slide="prev">
                                    <i className="fa fa-angle-left" />
                                    </a>
                                    <a className="right item-control" href="#similar-product" data-slide="next">
                                    <i className="fa fa-angle-right" />
                                    </a>
                                </div>
                    </div>
                    {handleRight()}

                </div>
            </div>
                :console.log("abc")
            }
            </div>
            
        </div>
    )
}
export default Product_detail;