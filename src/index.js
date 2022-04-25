import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Link
 } from 'react-router-dom';
import App from './App';
import Home from './shoppe/Home';
import Cart from './shoppe/Cart';
import reportWebVitals from './reportWebVitals';
import Account from './shoppe/Account';
import Click from './handle_event/Click'
import Test from './handle_event/Test';
import Greeting from './handle_event/Greeting';
import Loginlogin from './handle_event/Loginlogin';
import Form from './form/Form';
import FormLogin from './form/FormLogin';
import FormFunLogin from './form/FormFunLogin';
import FormRegister from './register/FormRegister';
import FormLoginReg from './register/FormLoginReg';
import FunError from './form/FunError';
import Demo from './axios/Demo';
import DemoPost from './axios/DemoPost';
import Blog from './axios/Blog';
import Blog_detail from './axios/Blog_detail';
import Register from './member/Register';
import Login from './member/Login';
import Index from './member/Index';
import My_product from './shoppe/My_product';
import Create_product from './shoppe/Create_product';
import Edit_product from './shoppe/Edit_product';
import Product_detail from './shoppe/Product_detail';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route index path='/index.html' element= {<Home/>}/>
          <Route  path='/cart.html' element= {<Cart />}/>
          <Route  path='/account' element= {<Account />}/>
          {/* <Route  path='/login.html' element= {<Login/>}/> */}
          <Route  path='/test' element= {<Test />}/>
          <Route  path='/click' element= {<Click />}/>
          <Route  path='/loginlogin' element= {<Loginlogin />}/>
          <Route  path='/greeting' element= {<Greeting isLogin={false}/>}/>
          <Route  path='/form' element= {<Form/>} />
          <Route  path='/formlogin' element= {<FormLogin/>} />
          <Route  path='/formfunlogin' element= {<FormFunLogin/>}/>
          <Route  path='/formregister' element= { <FormRegister/> }/>
          <Route  path='/formloginregister'element={<FormLoginReg/>}/>
          <Route  path='/error'element={ <FunError/> }/>
          <Route  path='/demo'element={<Demo/>}/>
           <Route  path='/demopost'element={<DemoPost/>}/>
          <Route  path='/blog/list'  element={ <Blog/> }/>
          <Route  path='/blog/detail/:id'  element={ <Blog_detail/> }/>
           <Route path='/login' element={ <Index/> }/>
           <Route path='/my_product' element={<My_product/>}/>
           <Route path='/create_product'element={<Create_product/>}/>
           <Route path='/edit_product/:id'element={<Edit_product/>}/>
           <Route path='/product/detail/:id'element={<Product_detail/>}/>

           
        </Routes>
      </App>  
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
