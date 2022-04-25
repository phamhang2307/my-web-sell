import FooterShop from "../shoppe/FooterShop";
import HeaderShop from "../shoppe/HeaderShop";
import Login from "./Login";
import Register from "./Register";

function Index(props){
    return(
        <div>
            <section id="form">{/*form*/}
                <div className="container">
                    <div className="row"></div>
                </div>  
                <Register/>
                <div className="col-sm-1">
                    <h2 className="or">OR</h2>
                </div>
                <Login/>
            </section>
        </div>
    )
}
export default Index;