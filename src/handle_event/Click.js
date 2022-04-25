function Click(){
    function handleClick(e){
        e.preventDefault();
        console.log('hello')
    }
    return (
        <a href="#" onClick={handleClick}> 
            Click me
        </a>
    );
}
export default Click;