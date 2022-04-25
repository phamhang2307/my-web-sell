import { useState } from "react";
//getItem: lấy ra sài
//setItem: thay đổi giá trị chỗ useState
// useState: cú pháp
function Test(props) {
    const [getItem, setItem] = useState(2)

    function thaydoi(){
        setItem(3)
    }
    return(
        <div>
            {getItem}
            <button onClick={thaydoi}>click</button>
        </div>
    );
  }
  export default Test;