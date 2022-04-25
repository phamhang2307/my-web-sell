import { useState } from "react"
import FunError from "../form/FunError"
function FormRegister(){
    const [inputs, setInput]= useState('');
    const [errors, setErrors]= useState({});
    const [file, setFile]= useState('');

    function handleInput(e){
        const nameInput= e.target.name;
        const value= e.target.value;
        const allimage= e.target.files;
        setFile(state => ({...state, [nameInput]: allimage}))
        setInput(state => ({...state, [nameInput]:value}))
    }
    
    let tong={};
    
    function handleSubmit(e){
        e.preventDefault();
        let names='' ;
        let size='' ;
        if(file.image){
            names= file.image[0]['name'];//c1
            size= file.image[0].size;//c2
        }
        let errorSubmit = {};
        let flag =true;
        setErrors(errorSubmit);
        let check= ( /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
        
        let tachname= names.split('.');
        console.log(tachname)
        
        let tach= tachname[(tachname.length)-1];
        
        let duoi= ['png', 'jpg', 'jpeg', 'PNG', 'JPG'];
        
        if(inputs.email==undefined || inputs.email==''){
            flag = false;
            errorSubmit.email='vui long nhap email';
        }else if(check.test(inputs.email)==false){
            flag = false;
            errorSubmit.email='ban ghi sai dinh dang';
        }
        if(inputs.password==undefined || inputs.password==''){
            flag = false;
            errorSubmit.password='vui long nhap password';
        }
        if(inputs.image==undefined){
            flag = false;
            errorSubmit.image=('vui long chon anh');
        }
        else if(duoi.includes(tach)== false){
            flag = false;
            errorSubmit.image=('day khong phai là anh');
        }else if(size> 1024*1024){
            flag = false;
            errorSubmit.image=('kich thuoc lớn');
        }

        if(!flag){
            setErrors(errorSubmit)
        }
        let getLogin= localStorage.getItem('login')
        if(getLogin){
            tong=JSON.parse(getLogin)
        }
        tong = {
            'email':inputs.email, 
            "password":inputs.password
        };
        
        localStorage.setItem('login', JSON.stringify(tong))
       console.log(tong)
    }
    return(
        <div>
            <FunError errors = {errors}/>
            <form onSubmit= {handleSubmit}>
                email:
                <input type='email' name= 'email' onChange={handleInput} />
                pass:
                <input type='password' name='password' onChange={handleInput} />
                <input type='file' name= 'image' onChange={handleInput} />
                <button type="submit" >Submit</button>
            </form>
        </div>
    )
}
export default FormRegister;