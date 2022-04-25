/* <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://code.jquery.com/jquery-3.5.0.js"></script>
    <style>
        *{
            padding: 0;
            border: 0;
        }
        div{
            display: block;
            margin: 0 auto;
            width: 500px;

        }
        .imgbig{
            width: 100%;
        }
        div ul{
            width: 100%;
        }
        li {
            float: left;
            list-style: none;
            width: 17%;
            margin-right: 3.5%;

        }
        li:last-child{
            margin-right: 0;
        }
        li img.imgsmall{
            width: 100%;
            height: 70px;
        }

    </style>
    <script>
        $(document).ready(function(){
            $("img.imgsmall").click(function(){
                var small= $(this).attr("src")
                $("img.imgbig").attr("src",small)
            })
        })
    </script>
</head>
<body>
    <div class="big">
        <img class="imgbig" src="https://cf.shopee.vn/file/038165cf80e6ede2f09925e586c280ed_tn" alt="">
    </div>
    <div class="small">
        <ul>
            <li><img class="imgsmall" src="https://cf.shopee.vn/file/038165cf80e6ede2f09925e586c280ed_tn" alt=""></li>
            <li><img class="imgsmall" src="https://cf.shopee.vn/file/656c188c45a00a77ab45660c82f4dcbf_tn" alt=""></li>
            <li><img class="imgsmall" src="https://cf.shopee.vn/file/75b95becb9d85e16ee0442c2c140d6ba_tn" alt=""></li>
            <li><img class="imgsmall" src="https://cf.shopee.vn/file/5367c3052a6b6a9acdeddc4f80a459a1_tn" alt=""></li>
            <li><img class="imgsmall" src="https://cf.shopee.vn/file/60ddd512b6dc1748936e28247bb98d86_tn" alt=""></li>
        </ul>
    </div>
    
</body>
</html> */