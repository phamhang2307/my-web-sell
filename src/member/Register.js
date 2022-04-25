import axios from "axios";
import { useState } from "react";
import FunError from "../form/FunError";

function Register(){    
    const [input, setInput] = useState('');
    const [error, setError] =  useState({});
    const [file, setFile] = useState('');
    const [avatar,setAvatar] = useState('');

    function handleChange(e){
        const value= e.target.value;
        const name= e.target.name;
        setInput(state=> ({...state, [name]:value}))
    }
    function handleInputFile(e){
        const files= e.target.files;
        let reader= new FileReader();
        reader.onload = (e)=>{
            setAvatar(e.target.result);
            setFile(files[0]);
        };
        reader.readAsDataURL(files[0]);
    }
    function handleSubmit(e){
        e.preventDefault();
        let names='' ;
        let size='' ;
        let tachname='';
        if(file!=''){
            names= file['name'];//c1
            size= file.size;//c2
            tachname= names.split('.');
        }
        
        console.log(tachname)
        let tach= tachname[(tachname.length)-1];  
        let duoi= ['png', 'jpg', 'jpeg', 'PNG', 'JPG'];
        let check= (/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);

        let demo= true;
        let errorSubmit= {};
        setError(errorSubmit);
        if(input.name==undefined || input.name==''){
            demo=false;
            errorSubmit.name= ('vui long nhap name');
        }
        if(input.email==undefined || input.email==''){
            demo=false;
            errorSubmit.email= ('vui long nhap email');
        }else if(check.test(input.email)== false){
            demo= false;
            errorSubmit.email= ('nhap sai dinh dang email')
        }
        if(input.password==undefined || input.password==''){
            demo=false;
            errorSubmit.password= ('vui long nhap password');
        }
        if(input.phone==undefined || input.phone==''){
            demo=false;
            errorSubmit.phone= ('vui long nhap phone');
        }
        if(input.address==undefined || input.address==''){
            demo=false;
            errorSubmit.address= ('vui long nhap address');
        }
        if(input.country==undefined || input.country==''){
            demo=false;
            errorSubmit.country= ('vui long nhap country');
        }
        if(file==''){
            demo = false;
            errorSubmit.image=('vui long chon anh');
        }else if(duoi.includes(tach) == false){
            demo = false;
            errorSubmit.image=('day khong phai là anh');
        }else if(size> 1024*1024){
            demo = false;
            errorSubmit.image=('kich thước lớn');
        }
        if(!demo){
            setError(errorSubmit);
        }
        if(demo){
            
            const data = {
                'name': input.name,
                'email': input.email,
                'pasword': input.password,
                'phone': input.phone,
                'address': input.address,
                'country':input.country,
                'level': 0,
                'avatar': avatar,
            }
                axios.post('http://localhost/laravel/laravel/public/api/register', data )
                .then((res)=>{
                    if(res.data.errors){
                        setError(res.data.errors)
                    }
                    console.log(res)
                })
            };
            
    }
        return(
            <div>
                <FunError errors= {error}/>
                <div className="col-sm-4">
                    <div className="signup-form" >
                        <h2>New User Signup!</h2>
                            <form action="#" onSubmit={handleSubmit} enctype="multipart/form-data">
                                <input type="text" placeholder="Name" name="name" onChange={handleChange} />
                                <input type="email" placeholder="Email Address" name="email" onChange={handleChange}/>
                                <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
                                <input type='number' placeholder="Phone" name="phone" onChange={handleChange}/>
                                <input type='text' placeholder="Address" name="address" onChange={handleChange}/>
                                <input type='text' placeholder="Country" name="country" onChange={handleChange}/>
                                <input type='file' name="image" onChange={handleInputFile}/>
                                <input type='number' placeholder="Level" name="level" value="0" onChange={handleChange}/>
                                <button type="submit" className="btn btn-default">Signup</button>
                            </form>
                    </div>
              </div>
            </div>
        )    
}
export default Register;