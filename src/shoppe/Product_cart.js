import axios from "axios";
import Cart from './shoppe/Cart';

function Product_cart(){
    let getLocal= localStorage.getItem('qty');
    let obj= JSON.parse(getLocal);
    console.log(obj)
    
    axios.post("http://localhost/laravel/laravel/public/api/user/product-cart",obj)
    .then((res)=>{
        console.log(res)
    })
    return(
        <Cart/>
    )
}
export default Product_cart;