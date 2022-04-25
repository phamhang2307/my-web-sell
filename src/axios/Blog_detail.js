import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Blog_rate from "./Blog_rate";
let getId= 0;
function Blog_detail(props){
    let params= useParams();
    const [data, setData] = useState([]);
    useEffect (()=>{
        axios.get("http://localhost/laravel/laravel/public/api/blog/detail/"+params.id)
        .then(res=>{
             setData(res.data.data);
            //  axios.get("http://localhost/laravel/laravel/public/api/blog/rate/"+ params.id)
            //  .then(res =>{   
            //      setDataRate(res.data);
            //  })
            //  .catch()
        })
        .catch()
        
    }, [])

    let layid='';
    let layid2='';
    function handleCmt(e){

        layid= e.target;
        layid2= layid.closest(".media");
        getId= layid2.getAttribute("id");
    }
    let comments =[];
    function renderComment(){
        if (typeof(data.comment) == 'object' ){
            comments = data.comment;
            return (
                comments.map((value1, key1)=>{
                    if(value1.id_comment== 0 ){
                        return (
                            // có 2 thẻ thì dùng <> </>
                            // js nằm trong html dùng dấu ngoặc nhọn
                            <>
                                <li key={key1} id={value1.id} className="media">
                                    <a className="pull-left" href="#">
                                        <img className="media-object" src="images/blog/man-two.jpg" alt="" />
                                    </a>
                                    <div className="media-body">
                                        <ul className="sinlge-post-meta">
                                            <li><i className="fa fa-user" />{value1['name_user']}</li>
                                            <li><i className="fa fa-clock-o" /> {value1.created_at}</li>
                                            <li><i className="fa fa-calendar" /> {value1.created_at}</li>
                                        </ul>
                                    <p>{value1.comment}</p>
                                    <a className="btn btn-primary" onClick={handleCmt} href="#cmt" ><i className="fa fa-reply" />Replay
                                    </a>
                                    </div>
                                </li>
                                
                                {comments.map((value2, key2) =>{
                                    if(value2.id_comment == value1.id){
                                        return(
                                                <li key={key2} className="media second-media">
                                                    <a className="pull-left" href="#">
                                                    <img className="media-object" src="images/blog/man-two.jpg" alt="" />
                                                    </a>
                                                    <div className="media-body">
                                                    <ul className="sinlge-post-meta">
                                                        <li><i className="fa fa-user" />{value2['name_user']}</li>
                                                        <li><i className="fa fa-clock-o" /> {value2.created_at}</li>
                                                        <li><i className="fa fa-calendar" /> {value2.created_at}</li>
                                                    </ul>
                                                    <p>{value2.comment}</p>
                                                    <a className="btn btn-primary" href= "#cmt" ><i className="fa fa-reply" />Replay
                                                    </a>
                                                    </div>
                                                </li>
                                        )
                                    }
                                })}
                            </>    
                        )
                    } 
             } )
            )
        }
    }
    
        function handlePost(e){
            let getLocal= localStorage.getItem('log');
            if (getLocal=='false'){
                alert('Vui lòng đăng nhập để comment')
            }else {
                let check = document.querySelector('.commentPost').value;
                let url = 'http://localhost/laravel/laravel/public/api/blog/comment/' + params.id;
                let accessToken = JSON.parse(localStorage.getItem('token'));
                let auth = JSON.parse(localStorage.getItem('auth'));
                let config = {
                    headers: {
                        'Authorization' : 'Bearer ' + accessToken,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept' : 'application/json'
                    }
                };
                if(check){
                    const formData = new FormData();
                    formData.append('id_blog', params.id);
                    formData.append('id_user', auth.id);
                    formData.append('id_comment', getId);
                    formData.append('comment', check);
                    formData.append('image_user', auth.avatar);
                    formData.append('name_user', auth.name);
                    axios.post(url, formData, config)
                    .then(response =>{
                        axios.get("http://localhost/laravel/laravel/public/api/blog/detail/"+params.id)
                        .then(res=>{
                             setData(res.data.data);
                        })
                        .catch()
                    })
                }
                
            }
            getId=0;
            e.preventDefault();
        }
    
    return(
             <div className="col-sm-9" >
                <div className="blog-post-area">
                    <h2 className="title text-center">Latest From our Blog</h2>
                    <div className="single-blog-post">
                        <h3>{data.title}</h3>
                            <div className="post-meta">
                                <ul>
                                    <li><i className="fa fa-user" />{data.id_auth}</li>
                                    <li><i className="fa fa-clock-o" />{data.created_at}</li>
                                    <li><i className="fa fa-calendar" />{data.created_at}</li>
                                </ul>
                            </div>
                            <a href>
                                <img src={"http://localhost//laravel/laravel/public/upload/Blog/image/"+ data.image} alt="" />
                            </a> 
                            <p>{data.content}</p>
                            
                    </div>
                    
                </div>
                <div className="pager-area">
                    <ul className="pager pull-right">
                        <li><a href="#">Pre</a></li>
                        <li><a href="#">Next</a></li>
                    </ul>
                </div>
                <div className="rating-area">
                    <Blog_rate/>
                    <ul className="tag">
                        <li>TAG:</li>
                        <li><a className="color" href>Pink <span>/</span></a></li>
                        <li><a className="color" href>T-Shirt <span>/</span></a></li>
                        <li><a className="color" href>Girls</a></li>
                    </ul>
                </div>
                <div className="response-area">
                    <h2>3 RESPONSES</h2>
                    <ul className="media-list">
                        {renderComment()}
                    </ul>
                </div>
                <div className="replay-box">
                    <div className="row">
                        <div className="col-sm-12">
                            <h2>Leave a replay</h2>
                            <div className="text-area">
                            <div className="blank-arrow">
                                <label>Your Name</label>
                            </div>
                            <span>*</span>
                            <textarea id="cmt" className="commentPost" name="message" rows={11} defaultValue={""} />
                            <a className="btn btn-primary" onClick={handlePost} href='#'>Post comment</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
export default Blog_detail;