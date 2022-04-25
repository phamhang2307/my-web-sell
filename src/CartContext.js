import  React  from "react";
export const CartContext=React.createContext();
/* function CartProvider({ children }){
        let getLocal= localStorage.getItem('qty');
        let obj= JSON.parse(getLocal);
        Object.keys(obj).map((item)=>{
          if(obj[item]){
          sogiohang= sogiohang + obj[item];
          }
        })
        console.log(sogiohang)
        return (
          <CartContext.Provider value={sogiohang} >
            {children}
          </CartContext.Provider>
        )
}
export {CartContext, CartProvider } */