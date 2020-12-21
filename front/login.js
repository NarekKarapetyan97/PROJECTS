let login = document.getElementById('login');

login.onclick=()=>{
    
    fetch(`http://localhost:5001/user/login`,{
        method:'POST',
        headers:{
            'Content-type':'application/json',
        },
        body:JSON.stringify({
            login:loginid.value,
            pass:loginpswid.value,
        })
    })
    .then(resp=>{return resp.json()})
    .then(data=>{
        window.localStorage.setItem("userset", JSON.stringify(data.user));

        if(data.success===true){
            location.href = "profile.html"
         }
    })
    .catch(err=>{
        console.log(err);
    })
}




