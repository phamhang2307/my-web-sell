import axios from "axios";
import { useEffect, useState } from "react";
import FunError from "../form/FunError";

function Update_User(){
    const [input, setInput]= useState({
      name:'',
      email:'',
      password:'',
      address:'',
      country:'',
      phone:'',
      avatar:'',
    });
    const [error, setError]= useState({});
    const [file, setFile] = useState('');
    const [avatar,setAvatar] = useState('');
    useEffect(()=>{
        let auth = JSON.parse(localStorage.getItem('auth'));
          setInput({
            name: auth.name,
            email: auth.email,
            password: auth.password,
            address: auth.address,
            country: auth.country,
            phone: auth.phone,
            avatar: auth.avatar,
          })
    
    },[])
    function handleChange(e){
      const nameInput= e.target.name;
      const value= e.target.value;
      setInput(state=>({...state, [nameInput]:value}))
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
        let names='' ;
        let size='' ;
        let tachname='';
        if(file!=''){
            names= file['name'];//c1
            size= file.size;//c2
            tachname= names.split('.');
        }
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
            console.log(input)
            const formData = new FormData();
                    formData.append('name',input.name);
                    formData.append('email', input.email);
                    formData.append('password', input.password);
                    formData.append('phone',input.phone);
                    formData.append('address', input.address);
                    formData.append('country', input.country);
                    formData.append('level', 0);
                    formData.append('avatar', avatar);
            let accessToken = JSON.parse(localStorage.getItem('token'));
            let auth = JSON.parse(localStorage.getItem('auth'));
            console.log(auth.id)
                let config = {
                    headers: {
                        'Authorization' : 'Bearer ' + accessToken,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept' : 'application/json',
                    }
                };
                axios.post('http://localhost/laravel/laravel/public/api/user/update/'+ auth.id, formData, config )
                .then((res)=>{
            
                    console.log(res)
                    if(res.data.errors){
                        setError(res.data.errors)
                    }
                })
            };
            
            e.preventDefault();
    }
    return(
        <div>
            <FunError errors= {error}/>
            <h3>User Update</h3>
                <div className="col-sm-9">
                    <div className="signup-form" >
                        <form action="#" onSubmit={handleSubmit}>
                            <input type="text" name="name" className="form-control" value={input.name} onChange={handleChange}/>
                            <input type="email" name="email" readOnly className="form-control" value={input.email} onChange={handleChange}/>
                            <input type="password" name="password" className="form-control" value={''} onChange={handleChange} />
                            <input type="text" name="address" className="form-control" value={input.address} onChange={handleChange}/>
                            <input type="text" name="country" className="form-control" value={input.country} onChange={handleChange}/>
                            <input type="text" name="phone" className="form-control" value={input.phone} onChange={handleChange}/>
                            <input type="file" name="image" className="form-control" onChange={handleInputFile} />
                            <button type="submit" className="btn btn-default">Signup</button>
                        </form>
                    </div>
                </div>
        </div>
    )
}
export default Update_User;