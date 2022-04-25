import logo from './logo.svg';
import Content from './zing/Content.js';
import Head from './zing/Head';
import Multimedia from './zing/Multimedia';
import Footer from './zing/Footer';
import HeaderShop from './shoppe/HeaderShop';
import FooterShop from './shoppe/FooterShop';
import { CartContext } from './CartContext';
import MenuLeft from './shoppe/MenuLeft';
import { useState } from 'react';

function App(props) {
  
  let sogiohang=0;
  let getLocal= localStorage.getItem('qty');
  let obj= JSON.parse(getLocal);
  Object.keys(obj).map((item)=>{
    if(obj[item]){
    sogiohang= sogiohang + obj[item];/*  */
    }
  })
  const [cart, setCart] = useState(sogiohang);
  //setCart(sogiohang)
  function HangContext(data){
    let sogiohangs=0;
    let getLocals= localStorage.getItem('qty');
    let objs= JSON.parse(getLocals);
    Object.keys(objs).map((items)=>{
      if(objs[items]){
      sogiohangs= sogiohangs + objs[items];/*  */
      }
    })
    setCart(sogiohangs)
  }

  return(
    <>
    <CartContext.Provider value={{
      cart: cart,
      HangContext: HangContext
    }} >
        <HeaderShop/>
          <section>
              <div className="container">
                  <div className="row">
                      {/* <MenuLeft/> */}
                      {props.children}
                  </div>
		          </div>
	        </section>
          <FooterShop/>
    </CartContext.Provider>
    </>
    
    
  );
}
export default App;
// - node_module: bo core cua source, khi chay npm tu tao ra, k dung vao

// - public: chua file index.html(file chinh cua du an nay)
//     + css va html
// - src: chua' cac component(nghia la cac doan html dc chia nho ra),
//  va dung lenh react dom de bien dich(noi lai) cac file component lai => 1 doan html va nhet vao file index.html ben public


// web:
// -header.js: html ...
// -content.js
// -footer.js 

// => index.html- node_module: bo core cua source, khi chay npm tu tao ra, k dung vao

// - public: chua file index.html(file chinh cua du an nay)
//     + css va html
// - src: chua' cac component(nghia la cac doan html dc chia nho ra),
//  va dung lenh react dom de bien dich(noi lai) cac file component lai => 1 doan html va nhet vao file index.html ben public


// web:
// -header.js: html ...
// -content.js
// -footer.js 

// => index.html


// const info = {
//     phone:13131,
//     name: "baovic"
//   }
//   let  abc = 123;
//   return (
//     <div className="App">
//       <Head yy={abc} xx = {info} />
//     </div>
//   );