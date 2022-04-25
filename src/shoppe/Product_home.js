
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext";

function Product_home(){
    const[data, setData] = useState('');
    useEffect(()=>{
        axios.get("http://localhost/laravel/laravel/public/api/product")
        .then((res)=>{
            setData(res.data.data)
        })
        .catch()
    },[])
    let qty={};
    let tongClass='';
    let datas=(data);

    const getCart= useContext(CartContext);

    function handleQty(e){ 
      e.preventDefault();
      let getLocal= localStorage.getItem("qty");
      if(getLocal){
        qty= JSON.parse(getLocal)
      }
      let getClass= e.target.closest(".product-overlay").id;
      if( Object.keys(qty).length>0){
        if(Object.keys(qty).includes(getClass)){
          console.log(qty[getClass])
            qty[getClass]= qty[getClass]+ 1;
          }else{
            qty[getClass]=1;
          }
        }else{
        qty[getClass]=1;
      }
      console.log(qty)
      localStorage.setItem("qty", JSON.stringify(qty))

      getCart.HangContext();
    }
    return(
        <div>
						{
              datas != '' ? 
              datas.map((value, key) =>{
                  return(
                      <div key={key} className="col-sm-4">
                      <div className="product-image-wrapper">
                        <div className="single-products">
                          <div id={value.id} className="productinfo text-center">
                            <img src={"http://localhost/laravel/laravel/public/upload/user/product/"+ value.id_user +'/'+ JSON.parse(value.image)[0] } alt="" />
                            <h2>{value.price}</h2>
                            <p>{value.name}</p>
                            <a href="#" className="btn btn-default add-to-cart idProduct"><i className="fa fa-shopping-cart" />Add to cart</a>
                          </div>
                          <div id={value.id} className="product-overlay">
                            <div className="overlay-content">
                              <h2>{value.price}</h2>
                              <p>{value.name}</p>
                              <a href="" className="btn btn-default add-to-cart " onClick={handleQty} ><i className="fa fa-shopping-cart"  />Add to cart</a>
                            </div>
                          </div>
                        </div>
                        <div className="choose">
                          <ul className="nav nav-pills nav-justified">
                            <li><a href><i className="fa fa-plus-square" />Add to wishlist</a></li>
                            <li><a href><i className="fa fa-plus-square" />Add to compare</a></li>
                          </ul>
                        </div>
                        <div className="choose">
                          <ul className="nav nav-pills nav-justified">
                            <li><a href={"/product/detail/" + value.id}>MORE</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>        
                  )
              }): "abc"                   
            }
        </div>
    )
}
export default Product_home;