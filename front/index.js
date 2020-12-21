let index = document.getElementById('index');

window.onload=()=>{
    
    fetch(`http://localhost:5001/user/index`,{
        method:'POST',
        
    })
    .then(resp=>{return resp.json()})
    .then(data=>{
        console.log(data);
        for(let i=0; i<data.length; i++){
            posts.innerHTML+=`<div class="card-body w-100 border m-3" >
                                <h5 class="card-title">${data[i].cotent}</h5>
                                <small class="card-text">${data[i].user}</small>
                            </div>`
        }
        
    })
    .catch(err=>{
        console.log(err);
    })
}


