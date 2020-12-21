

const user = JSON.parse(window.localStorage.getItem("userset"));
if(user===null)window.location.href="./index.html"
showname.innerHTML = user.name;


postid.onsubmit=(e)=>{
    e.preventDefault();
    let newfrom=new FormData(postid);
    newfrom.append("user", user.login);
    fetch(`http://localhost:5001/user/profile`,{
        method:'POST',
        body:newfrom
    })
    .then(resp=>{return resp.json()})
    .then(data=>{
        if(data.success===true){
            location.href = "index.html"
            
        }
        //console.log(user)    
    })
    
    .catch(err=>{
        console.log(err);
    })
}

window.onload=()=>{
    
    fetch(`http://localhost:5001/online`)
    .then(data=> data.json())
    .then(console.log)
    .catch(err=>{
        console.log(err);
    })
}

logout.onclick=()=>{
    
    window.localStorage.clear('userset');
    window.location.href = "index.html"
}
