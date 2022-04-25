import axios from "axios";
import { useEffect, useState } from "react";
import FunError from "../form/FunError";
import LeftAccount from "./LeftAccount";

function Create_product(){
    const [dataCategory, setDataCategory] = useState([]);
    const [dataBrand, setDataBrand] = useState([]);
    const [status, setStatus] = useState("");
    const [idCategory, setIdCategory] = useState("");
    const [idBrand, setIdBrand] = useState("");
    const [input, setInput] = useState('');
    const [error, setError] =  useState({});
    const [sale, setSale] = useState([]);
    const [getFile, setFile] = useState('');
    const [avatar,setAvatar] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost/laravel/laravel/public/api/category-brand")
        .then((res)=>{
            setDataCategory(res.data.category)
            setDataBrand(res.data.brand)
        })
        .catch()
    },[])
    function handleChange(e){
        const value= e.target.value;
        const name= e.target.name;
        setInput(state=> ({...state, [name]:value}))
        
    }
    
    function handleInputFile(e){
        const files= e.target.files;
        setFile(files);
    }
    
    
    function handleCategory(e){
        const value1= e.target.value;
        dataCategory.map((value,key)=>{
            if(value1== value.category){
                setIdCategory(value.id);
            }
        })
    }
    // function handleChoseCategory(){
    //     if(typeof(dataCategory)==Array){
    //         dataCategory.map((value,key)=>{
    //             return(
    //                 <option key={key}>{value.category}</option>
    //             )
    //         })
    //     }
    // }
    function handleBrand(e){
        const value2= e.target.value;
        dataBrand.map((value,key)=>{
            if(value2== value.brand){
                setIdBrand(value.id);
            }
        })
    }
    function handleStatus(e){
        const value= e.target.value;
        setSale(value)
        if(value=="New"){
            setStatus('0')
            
        }else if(value=="Sale"){
            setStatus('1')
        }
    }
    function handleSale(e){
        function handleInput(e){
            const value= e.target.value;
            const name= e.target.name;
            setInput(state=> ({...state, [name]:value}))
        }
        if(sale=='Sale'){
            return(
                <div>
                    <input type="text" name="sale" onChange={handleInput}/> %
                </div>
            )
        }
    }
    function handleSubmit(e){
        e.preventDefault();

        let names='';
        let tongname=[];
        let size='' ;
        let tachname='';
        let demo= true;
        let errorSubmit= {};
        console.log(getFile)
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
            console.log(tach)
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
        if(!demo){
            setError(errorSubmit);
        }
        
        if(demo){
                const formData = new FormData();
                        formData.append('name',input.name);
                        formData.append('price', input.price);
                        formData.append('category', idCategory);
                        formData.append('brand', idBrand);
                        formData.append('status', status);
                        formData.append('sale', input.sale ? input.sale : 0);
                        formData.append('company', input.company);
                        formData.append('detail', input.detail);
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
                    axios.post('http://localhost/laravel/laravel/public/api/user/add-product', formData, config )
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
            <div className="container">
            <div className="row">
                <LeftAccount/>
                <div className="col-sm-9 padding-right">
                    <h3>Create Product</h3>
                    <form className="form-group" onSubmit={handleSubmit} encType="multipart/form-data">
                        <input type="text" className="form-control"  name="name" placeholder="Name" onChange={handleChange} />
                        <input type="text" className="form-control" name="price" placeholder="Price" onChange={handleChange}/>
                        <input type="file" className="form-control" name="image" onChange={handleInputFile} multiple='multiple' />
                        <select className="form-control" name="category" onChange={handleCategory}>
                            <option selected disabled hidden >Please choose category</option>
                        {
                            // handleChoseCategory()
                            dataCategory.map((value,key)=>{
                                return(
                                    <option key={key}>{value.category}</option>
                                )
                            })
                        }
                        </select>
                        <select className="form-control" name="brand" onChange={handleBrand}>
                            <option selected disabled hidden >Please choose brand</option>
                        {
                            dataBrand.map((value, key)=>{
                                return(
                                    <option key={key}>{value.brand}</option>
                                )
                            })
                        }
                        </select>
                        <select className="form-control" name="status" onChange={handleStatus}>
                            <option selected disabled hidden >Status</option>
                            <option>New</option>
                            <option >Sale</option>
                        </select>
                        {handleSale()}
                        <input type="text" className="form-control" name="company" placeholder="Company" onChange={handleChange}/>
                        <textarea type="text" rows={7} name='detail' placeholder="Detail" onChange={handleChange}></textarea>
                        <button type="submit" className="btn btn-default">Signup</button>
                        
                    </form>     
                </div>
            </div>
        </div>
        </div>
        
        
    )
}
export default Create_product;