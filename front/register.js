let singin = document.getElementById('singin');


singin.onclick=()=>{
    
    fetch(`http://localhost:5001/user/register`,{
        method:'POST',
        headers:{
            'Content-type':'application/json',
        },
        body:JSON.stringify({
            name:nameid.value,
            login:usernameid.value,
            pass:pswid.value,
        })
    })
    .then(resp=>{return resp.json()})
    .then(data=>{
        if(data.success===true){
           location.href = "login.html"
        }
    })
    .catch(err=>{
        console.log(err);
    })
}
