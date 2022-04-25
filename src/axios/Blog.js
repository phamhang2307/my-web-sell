import { render } from "@testing-library/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

// get: lay ve
function Blog(){

    const [data, setData] = useState([]);
    const [dataRate, setDataRate] = useState([])
    const [rating, setRating] = useState(0);

    let blogid=[];
    let tongBlog_id=[];
    let dataRates={};
    let arr=[];
    let dataBlog=0;
    let dataUser=0;
    let dataSao= 0;
    let tongtbc= 0;
    let lamTron= 0;
    //ham  chay 1 lan khi reload trang, va chay sau return  
    useEffect (()=>{
        axios.get('http://localhost/laravel/laravel/public/api/blog')
        .then(res=>{
             setData(res.data.blog.data)
             res.data.blog.data.map((value)=>{
                blogid= value.id
                tongBlog_id.push(blogid)
            })
                axios.get("http://localhost/laravel/laravel/public/api/blog/rate/" + tongBlog_id)
                .then(res =>{   
                    setDataRate(res.data);
                    if(typeof(res.data.data)=='object'){
                        let auth = JSON.parse(localStorage.getItem('auth'));
                        dataRates= res.data.data;
                        Object.keys(dataRates).map((value) =>{
                            dataUser=dataRates[value].user_id;
                            dataBlog=dataRates[value].blog_id;
                            dataSao=dataRates[value].rate;
                            if(dataUser==auth.id && dataBlog==tongBlog_id){
                                arr.push(dataSao);
                            }
                        })  
                        //tính tổng sao
                        let sum=0;
                        arr.map((value)=>{
                            sum+= value;
                        })
                        //trung binh cong sao trong blog
                        tongtbc= sum/(arr.length);
                        lamTron= Math.round(tongtbc)
                        // setRating(lamTron)        
                }
                })
                .catch()
        })
        .catch()
    }, [])
    console.log(lamTron )
    
    function renderData(){
        if(data.length > 0){
            return data.map((value, key)=>{
                return(
                                <div className="single-blog-post" key={key}>
                                    <h3>{value.title}</h3>
                                    <div className="post-meta">
                                    <ul>
                                        <li><i className="fa fa-user" />{value.id_auth}</li>
                                        <li><i className="fa fa-clock-o" />{value.created_at}</li>
                                        <li><i className="fa fa-calendar" />{value.created_at}</li>
                                    </ul>
                                    <span>
                                    <StarRatings
                                        rating={rating}
                                        starRatedColor="yellow"
                                        numberOfStar= {6}
                                        name='rating'
                                    />
                                    </span>
                                    </div>
                                    <Link to="">
                                        <img src={"http://localhost/laravel/laravel/public/upload/Blog/image/"+ value.image} alt="" />
                                    </Link>
                                    <p>{value.description}</p>
                                    <Link to={'/blog/detail/' + value.id} className="btn btn-primary">Read More</Link>
                                </div>
                           
                )
            })
        }
        
    }

    return(
        <div className="col-sm-9" >
            <div className="blog-post-area">
                <h2 className="title text-center">Latest From our Blog</h2>
                {renderData()}
                <div className="pagination-area">
                    <ul className="pagination">
                    <li><a href className="active">1</a></li>
                    <li><a href>2</a></li>
                    <li><a href>3</a></li>
                    <li><a href><i className="fa fa-angle-double-right" /></a></li>
                    </ul>
                </div>
                
            </div>
        </div>
    )
}
export default Blog;
