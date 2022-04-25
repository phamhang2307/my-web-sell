import axios from "axios";
import { useEffect, useState, createContext, useContext } from "react";
import React from "react";
import { CartContext } from "../CartContext";

function Cart(){
    const [data, setData]  =  useState([]);
    const [tong, setTong] = useState(0);
    let getLocal= localStorage.getItem('qty');
    let obj= JSON.parse(getLocal);
    
    useEffect(()=>{
      axios.post("http://localhost/laravel/laravel/public/api/product/cart", obj)
    .then((res)=>{
        setData(res.data.data)
        let tongtien = 0;
        res.data.data.map((item)=>{
            tongtien += item.price*item.qty;
        })
        setTong(tongtien)
    });
    },[])
    let valuett=0;
    let sum =0;
    let sogiohang=0;
    let tongTotal= 0;
//tạo func ->getLocal -> tính qty -> dùng context đưa qty vô headerShop (gọi hàm này ở cuối 3 hàm đấy)
    const getCart= useContext(CartContext)

    function handleCong(e){
      e.preventDefault();

        let congCha= e.target.closest("tr");
        let congCon= congCha.querySelector('.cart_quantity_input');//tim con
        let price = congCha.querySelector('.cart_price p').innerHTML.replace(/[^0-9]/g, '');
        let Id= congCon.id;
        valuett= congCon.value;
        let values= Number(valuett)+1;
        valuett=values;
        congCon.value=values;
        Object.keys(obj).map((item)=>{
          if(obj[Id]){
            obj[Id]= values;
          }
        })
        localStorage.setItem("qty", JSON.stringify(obj))

         sum =valuett*price;
         congCha.querySelector('.cart_total_price').innerHTML= '$'+sum; 
         tongTotal= tong + Number(price) ;// tinh tong tien
         setTong(tongTotal);
          getCart.HangContext();
        
    }
    function handleTru(e){
      e.preventDefault();
      let truCha= e.target.closest("tr");
      let truCon= truCha.querySelector('.cart_quantity_input');//tim con
      let price = truCha.querySelector('.cart_price p').innerHTML.replace(/[^0-9]/g, '')
      let Id= truCon.id;
      valuett= truCon.value;
      let values= Number(valuett)-1;
      
      valuett=values;
      truCon.value=values;
      Object.keys(obj).map((item)=>{
        if(obj[Id]){
          obj[Id]= values;
          
        }
        if(obj[Id]==0){
          truCha.remove();
          delete obj[Id];
        }
      })
      localStorage.setItem("qty", JSON.stringify(obj))

       sum =valuett*price;
       truCha.querySelector('.cart_total_price').innerHTML= '$'+sum; //innerHTML or text
       tongTotal= tong - Number(price); //tinh tong tien
       setTong(tongTotal)
       //setTong(tongTotal);
      getCart.HangContext();
      
    }
    function handleDelete(e){
      e.preventDefault();

      let deleCha= e.target.closest("tr");
      let deleCon= deleCha.querySelector('.cart_quantity_delete');//tim con
      //tinh tien khi delete
      let dele= deleCha.querySelector('.cart_total_price').innerHTML.replace(/[^0-9]/g, '');
      tongTotal= tong- Number(dele);
      setTong(tongTotal)

      let idDelete = deleCon.id;
      Object.keys(obj).map((item)=>{
        sogiohang = sogiohang - Number(obj[idDelete])
      console.log(sogiohang)

        if(obj[idDelete]){
          delete obj[idDelete];
        }
      })
      localStorage.setItem("qty", JSON.stringify(obj))
      deleCha.remove();
      getCart.HangContext();

    }
    function handleTong(){
      
        return (
           <li className="tien">Total 
              <span className="tongtien" >${tong}</span>
            </li>
        )
    }
    function handleShow(){
      if(data.length>0){
        return data.map((item, key)=>{
          
          return(
            <tr key={key} > 
                <td className='cart_product'>
                  <a href=""><img src={"http://localhost/laravel/laravel/public/upload/user/product/"+ item.id_user +'/'+ JSON.parse(item.image)[0] } /></a>
                </td>
                <td className="cart_description">
                  <h4><a href="">{item.name}</a></h4>
                  <p></p>
                </td>
                <td className="cart_price">
                  <p>${item.price}</p>
                </td>
                <td className="cart_quantity">
                  <div className="cart_quantity_button">
                    <a className="cart_quantity_up" href="" onClick={handleCong}> + </a>
                    <input id={item.id} className="cart_quantity_input" type="text" name="quantity" defaultValue={item.qty} autocomplete="off" size="2" />
                    <a className="cart_quantity_down" href="" onClick={handleTru} > - </a>
                  </div>
                </td>
                <td className="cart_total">
                  <p id={item.id} className="cart_total_price">${item.price*item.qty}</p>
                </td>
                <td className="cart_delete">
                  <a id={item.id} className="cart_quantity_delete" href="" onClick={handleDelete} ><i className="fa fa-times"></i></a>
                </td>
            </tr>
        )
        })
      }
    }
    return(
      <div>
        <section id="cart_items">
          <div className="container">
            <div className="breadcrumbs">
              <ol className="breadcrumb">
                <li><a href="#">Home</a></li>
                <li className="active">Shopping Cart</li>
              </ol>
            </div>
            <div className="table-responsive cart_info">
              <table className="table table-condensed">
                <thead>
                  <tr className="cart_menu">
                    <td className="image">Item</td>
                    <td className="description">Name</td>
                    <td className="price">Price</td>
                    <td className="quantity">Quantity</td>
                    <td className="total">Total</td>
                  </tr>
                </thead>
                <tbody>
                  {handleShow()}
                </tbody>
              </table>
            </div>
          </div>
        </section> {/*/#cart_items*/}
        <section id="do_action">
          <div className="container">
            <div className="heading">
              <h3>What would you like to do next?</h3>
              <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div className="chose_area">
                  <ul className="user_option">
                    <li>
                      <input type="checkbox" />
                      <label>Use Coupon Code</label>
                    </li>
                    <li>
                      <input type="checkbox" />
                      <label>Use Gift Voucher</label>
                    </li>
                    <li>
                      <input type="checkbox" />
                      <label>Estimate Shipping &amp; Taxes</label>
                    </li>
                  </ul>
                  <ul className="user_info">
                    <li className="single_field">
                      <label>Country:</label>
                      <select>
                        <option>United States</option>
                        <option>Bangladesh</option>
                        <option>UK</option>
                        <option>India</option>
                        <option>Pakistan</option>
                        <option>Ucrane</option>
                        <option>Canada</option>
                        <option>Dubai</option>
                      </select>
                    </li>
                    <li className="single_field">
                      <label>Region / State:</label>
                      <select>
                        <option>Select</option>
                        <option>Dhaka</option>
                        <option>London</option>
                        <option>Dillih</option>
                        <option>Lahore</option>
                        <option>Alaska</option>
                        <option>Canada</option>
                        <option>Dubai</option>
                      </select>
                    </li>
                    <li className="single_field zip-field">
                      <label>Zip Code:</label>
                      <input type="text" />
                    </li>
                  </ul>
                  <a className="btn btn-default update" href>Get Quotes</a>
                  <a className="btn btn-default check_out" href>Continue</a>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="total_area">
                  <ul className="thanhtoan">
                    <li>Cart Sub Total <span>$59</span></li>
                    <li>Eco Tax <span>$2</span></li>
                    <li>Shipping Cost <span>Free</span></li>
                    {handleTong()}
                    
                  </ul>
                  <a className="btn btn-default update" href>Update</a>
                  <a className="btn btn-default check_out" href>Check Out</a>
                </div>
              </div>
            </div>
          </div>
        </section>{/*/#do_action*/}
    </div>
    );
}
export default Cart;