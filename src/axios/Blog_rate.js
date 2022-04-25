import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings"
function Blog_rate(){
    const [rating, setRating] = useState(0);
    const [user, setUser] = useState(0);
    let params= useParams('');
    let tongUser= [];
    let uniqueUser = {};
    let backArr= [];
    let dataRates={};
    let soUser= 0;
    let arr=[];
    let arr1='';
    let dataBlog=0;
    let dataUser=0;
    let dataSao= 0;
    useEffect(()=>{
        axios.get("http://localhost/laravel/laravel/public/api/blog/rate/"+ params.id)
             .then(res =>{   
                 if(typeof(res.data.data)=='object'){
                        let auth = JSON.parse(localStorage.getItem('auth'));
                        dataRates= res.data.data;
                        Object.keys(dataRates).map((value) =>{
                            dataUser=dataRates[value].user_id;
                            console.log(dataUser)
                            dataBlog=dataRates[value].blog_id;
                            dataSao=dataRates[value].rate;
                            if(dataUser==auth.id && dataBlog==params.id){
                                arr.push(dataSao);
                            }
                                tongUser.push(dataUser)
                        })  
                        arr1= arr[arr.length-1];//lấy sao cuối của user
                        setRating(arr1) ;

                        //cách xóa các user giống nhau
                        uniqueUser = new Set(tongUser);
                        backArr = [...uniqueUser];
                        soUser= backArr.length;
                        setUser(soUser)
                        //tính tổng sao
                        let sum=0;
                        arr.map((value)=>{
                            sum+= value;
                        })
                        //trung binh cong sao trong blog
                        let tongtbc= sum/(arr.length);
                        let lamTron= Math.round(tongtbc)
                        console.log(lamTron) 
                        setRating(lamTron)       
                }
             })
             .catch()
    }, [])
    
    function changeRating(newRating, name){
        setRating(newRating)
        let getLocal= localStorage.getItem('log');
        if (getLocal=='false'){
            alert('Vui lòng đăng nhập để đánh giá')
        }else {
            let auth = JSON.parse(localStorage.getItem('auth'));
                let url = 'http://localhost/laravel/laravel/public/api/blog/rate/' + params.id;
                let accessToken = JSON.parse(localStorage.getItem('token'));
                let config = {
                    headers: {
                        'Authorization' : 'Bearer ' + accessToken,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept' : 'application/json'
                    }
                };
                    const formData = new FormData();
                    formData.append('blog_id', params.id);
                    formData.append('user_id', auth.id);
                    formData.append('rate', newRating);
                    axios.post(url, formData, config)
                    .then(response =>{
                        axios.get("http://localhost/laravel/laravel/public/api/blog/rate/"+ params.id)
                        .then(response =>{   
                        })
                        .catch()
                    })
        }
    }
    return(
        <ul className="ratings">
            <li className="rate-this">Rate this item:</li>
                <li>
                    <StarRatings
                        rating={rating}
                        starRatedColor="yellow"
                        changeRating= {changeRating}
                        numberOfStar= {6}
                        name='rating'
                    />
                </li>
            <li className="color"> ({user} votes)</li>
        </ul>
    )
}
export default Blog_rate;