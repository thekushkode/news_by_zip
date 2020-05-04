
 searchZip= document.getElementById("search")



 function getCityName(e){   
    e.preventDefault()
    let zipcode = document.querySelector(".form-control").value
    console.log(zipcode)
    axios.get(`http://ZiptasticAPI.com/${zipcode}`).then(data => console.log(data.data.city))
    } 
searchZip.addEventListener("click",getCityName) 


