
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FunError from "../form/FunError";
import LeftAccount from "./LeftAccount";
import Select from "react-select";
import { type } from "@testing-library/user-event/dist/type";

function Edit_product(){
    const [dataCategory, setDataCategory] = useState([]);
    const [dataBrand, setDataBrand] = useState([]);
    const [category, setCategory] = useState({
        value:'', lable:''
    });
    const [brand, setBrand] = useState({
        value:'', lable:''
    });
    const [status, setStatus] = useState(
        {value:'',label:''}
    );
    
    const [error, setError] =  useState({});
    const [getFile, setFile] = useState('');
    const [data, setData] = useState({});
    const [avatar,setAvatar] = useState('');
    const [input, setInput]= useState({
        name:'',
        price:'',
        category:'',
        brand:'',
        status:'',
        sale:'',
        image:[],
        company:'',
        detail:'',
      });
    let params= useParams();
    useEffect(()=>{

        axios.get("http://localhost/laravel/laravel/public/api/category-brand")
        .then((res1)=>{
            setDataCategory(res1.data.category);
            setDataBrand(res1.data.brand);
            
            axios.get("http://localhost/laravel/laravel/public/api/product/detail/" + params.id)
            .then((res)=>{
                setData(res.data.data)
                setInput({
                    name: res.data.data.name,
                    price: res.data.data.price,
                    sale: res.data.data.sale,
                    company:res.data.data.company_profile,
                    detail:res.data.data.detail,
                    image:res.data.data.image,
                    status:res.data.data.status,
                    category:res.data.data.id_category,
                    brand:res.data.data.id_brand,
                  });
                setStatus({value:res.data.data.status})
                setCategory({value:res.data.data.id_category})
                setBrand({value:res.data.data.id_brand})
            });
        })
        .catch()
    },[])
    function handleChange(e){
        const value= e.target.value;
        const name= e.target.name;
        setInput(state=> ({...state, [name]:value}))
    }

    function handleChooseCate(){
        let options= [];
        (dataCategory).map((value)=>{    
            options.push({ value: (value.id), 
            label: value.category},)
        });
        if(options!=''){
            if(input.category!=''){
                return(
                    <Select value={options.value} options={options} defaultValue={options[(input.category)-1]} onChange= {setCategory} /> 
                )
            }
        }
    }   

    function handleChooseBrand(){
        let optionsBrand= [];
        (dataBrand).map((value)=>{
            optionsBrand.push({value: value.id,
                                label:value.brand})
        })
        if(optionsBrand!=''){
            if(input.brand!=''){
                return(
                    <Select value={optionsBrand.value} options={optionsBrand} defaultValue={optionsBrand[(input.brand)-1]} onChange={setBrand} />
                )
            }
        }
    }

    function handleChooseStatus(){
        let optionStatus=[{
            value: 0, label: "New"
        }, {value: 1, label: "Sale"}];
        if(typeof(input.status)=='number'){
            return(
                <Select value={optionStatus.value} options={optionStatus} defaultValue={optionStatus[input.status]} onChange={setStatus} />
            )
        }
    }
    function handleSale(){
            if((status.value)== '1' ){
                return(
                    <div>
                        <input type="text" name="sale" value={input.sale} onChange={handleChange}/> %
                    </div>
                )
            }else{
                    return(
                        <div></div>
                    )
                }
    }
    let files=[];
    let lengthChecked=0;
    let lengthApi=0;
    let lengthCheck= 0;
    let lengthFile=0;
    function handleInputFile(e){

        files= e.target.files;
        setFile(files);
         console.log(files)
        var checked1= document.querySelectorAll("input.ckeckbox_img");
        for (var i = 0; i < checked1.length; i++){
            checked1[i].checked = false;
        }
        setAvatar(files.length)
    }
    let auth = JSON.parse(localStorage.getItem('auth'));
    let avatar1= [];
    let getBox= '';
    let value=true;
    function handleCheckBox(e) {
        value= e.target.checked;    
        if(value==true){
            getBox=e.target.value;
            console.log(getBox)
            avatar1.push(getBox)
        }
        else{
            let getBox1=e.target.value;
            for (var key in avatar1) {
                if (avatar1[key] == getBox1) {
                    avatar1.splice(key, 1);
                }
            }
        }
        console.log(avatar1)
        
        
      };
      
    function handleSubmit(e){
        e.preventDefault();
        if(data!=""){
            lengthApi= (JSON.parse(data.image).length);
        }
        lengthChecked= avatar1.length;
        console.log(lengthChecked)
        lengthCheck= lengthApi - lengthChecked + avatar;

        console.log(lengthCheck)

        let names='';
        let tongname=[];
        let size='' ;
        let tachname='';
        let demo= true;
        let errorSubmit= {};
        if(getFile!=''){
            Object.keys(getFile).map((value,i)=> {
                names= getFile[value].name
                size= getFile[value].size;//c2
                tongname.push(names)
            })
        }
        let tongtachname=[];
        tongname.map((value) =>{
            tachname= value.split('.');
            tongtachname.push(tachname)
        })

        tongtachname.map((value) =>{
            let tach= value[(value.length)-1];  
            let duoi= ['png', 'jpg', 'jpeg', 'PNG', 'JPG'];
            if(getFile==''){
                demo = false;
                errorSubmit.image=('vui long chon anh');
            }else if(duoi.includes(tach) == false){
                demo = false;
                errorSubmit.image=('day khong phai là anh');
            }else if(size> 1024*1024){
                demo = false;
                errorSubmit.image=('kich thước lớn');
            }
            
        })
        if(lengthCheck>3){
            demo=false;
            errorSubmit.image=("so file anh lon hon 3, vui long chon lai");
        }
        if(!demo){
            setError(errorSubmit);
        }
        
        if(demo){
                const formData = new FormData();
                        formData.append('name',input.name);
                        formData.append('price', input.price);
                        formData.append('category', category.value);
                        formData.append('brand', brand.value);
                        formData.append('status', status.value);
                        formData.append('sale', input.sale ? input.sale : 0);
                        formData.append('company', input.company);
                        formData.append('detail', input.detail);
                       Object.keys(avatar1).map((value) => {
                            formData.append('avatarCheckBox[]', avatar1[value]);
                       })
                       Object.keys(getFile).map((value) => {
                        formData.append('file[]', getFile[value]);
                   })
                    let accessToken = JSON.parse(localStorage.getItem('token'));
                    let config = {
                        headers: {
                            'Authorization' : 'Bearer ' + accessToken,
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Accept' : 'application/json',
                        }
                    };
                    axios.post('http://localhost/laravel/laravel/public/api/user/edit-product/'+ data.id, formData, config )
                    .then((res)=>{
                        console.log(res)
                        if(res.data.errors){
                            setError(res.data.errors)
                        }
                    })
            };
    }
    
   function renderImg(){
       console.log(data)
        if(Object.keys(data).length>0){
            let getImg = JSON.parse(data.image);
            return getImg.map((value, key) => {
                return(
                    <label key={key} className="edit_image">
                        <img className="image_product" src={"http://localhost/laravel/laravel/public/upload/user/product/" + auth.id +'/'+ value} /> <br></br>
                        <input className="ckeckbox_img" type="checkbox" id="image" value={value}  onChange={handleCheckBox} />
                    </label>
                )    
            })
        }
   }
    
    return(
        <div>
            <FunError errors= {error}/>
            <div className="container">
            <div className="row">
                <LeftAccount/>
                <div className="col-sm-9 padding-right">
                    <h3>Create Product</h3>
                    <form className="form-group" onSubmit={handleSubmit} encType="multipart/form-data">
                        <input type="text" className="form-control"  name="name" value={input.name} placeholder="Name" onChange={handleChange} />
                        <input type="text" className="form-control" name="price" value={input.price} placeholder="Price" onChange={handleChange}/>
                        
                        {handleChooseCate()}
                        {handleChooseBrand()}
                        {handleChooseStatus()}
                        
                        {handleSale()}
                        <input type="file" className="form-control" name="image" onChange={handleInputFile} multiple='multiple' />
                        
                        {renderImg()}
                        <input type="text" className="form-control" name="company" value={input.company} placeholder="Company" onChange={handleChange}/>
                        <textarea type="text" rows={7} name='detail' placeholder="detail" value={input.detail} onChange={handleChange}></textarea>
                        <button type="submit" className="btn btn-default">Signup</button>
                        
                    </form>     
                </div>
            </div>
        </div>
        </div>
        
        
    )
}
export default Edit_product;