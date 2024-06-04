var siteNameInput=document.querySelector('#siteName');
var urlInput=document.querySelector('#url');
var searchInput=document.querySelector('.search');
var container=[];
var deleted=[];


// Get the stored JSON string from localStorage
let storedWebSites = localStorage.getItem('webSites');
let storeDeletedWebSites=localStorage.getItem('deleted')
if (storedWebSites != null) {
    try {
        // Parse the JSON string and push the result into `container`
        container=JSON.parse(storedWebSites);
    } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
    }
}

if (storeDeletedWebSites != null) {
    try {
        // Parse the JSON string and push the result into `container`
        deleted=JSON.parse(storeDeletedWebSites);
    } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
    }
}


display();
displayDeleted();
console.log(deleted)
//? ============ Add New WebSite ==========//
function add(){
    if(validateForm(siteNameInput)&&
    validateForm(urlInput)
       ){
        var webSite={
            siteName: siteNameInput.value,
            url: urlInput.value
        }
        
        container.push(webSite);
        clear();
        display();
        localStorage.setItem('webSites',JSON.stringify(container));
       }

  
    
}

//& Excute Add 
var submitBtn=document.querySelector('.sub');
submitBtn.addEventListener('click',add);


//? ============  Display WebSite ==========//
function display(){
    var x='';
    for(var i=0;i<container.length;i++){
        var num=i;
        x +=` 
        <tr>
        <td >${++num}</td>
        <td>${container[i].siteName}</td>
        <td><a href="${container[i].url}" class="btn btn-visit " target="_blank">Veiw</a></td>
        <td> <button type="button" onclick=" delet(${i})" class=" btn btn-delete ">Delete</button></td>
    </tr>
    `
    }
    document.querySelector('.websites').innerHTML=x;
}
// ?============= Search==============//
function search(){
    var term=searchInput.value;

    var cartona='';
    for(var i=0;i<container.length;i++){
        if(container[i].siteName.toLowerCase().includes(term.toLowerCase())){
            var num=i;
            cartona+=` <tr>
            <td >${++num}</td>
            <td>${container[i].siteName}</td>
            <td><a href="${container[i].url}" class="btn btn-visit " target="_blank">Veiw</a></td>
            <td> <button type="button" onclick=" delet(${i})" class=" btn btn-delete ">Delete</button></td>
        </tr>
        `
        }
       
    }
    document.querySelector('.websites').innerHTML=cartona;
} 
//? ============  Delete All ==========//
 function deleteAll(){
    
    while (container.length > 0) {
        var x=container.pop();
        console.log(x);
        deleted.push(x);
       
    }
    display();

    localStorage.setItem('webSites',JSON.stringify(container));
    localStorage.setItem('deleted',JSON.stringify(deleted));
    displayDeleted();
    
 }

//? ============  Clear WebSite ==========//
function clear(){
    siteNameInput.value=null;
    urlInput.value=null;
    siteNameInput.classList.remove('is-valid');
    urlInput.classList.remove('is-valid');
}

//? ============  Display Deleted WebSite ==========//

function displayDeleted(){
    var x='';
    for(var i=0;i<deleted.length;i++){
        var num=i;
        x +=` 
        <tr>
              <td >${++num}</td>
              <td>${deleted[i].siteName}</td>
              <td><a href="${deleted[i].url}" class="btn btn-success " target="_blank">Veiw</a></td>
              <td> <button type="button" onclick=" deletForEver(${i})" class=" btn btn-danger">Delete</button></td>
              <td><button type="button" onclick=" resore(${i})" class="btn btn-warning">Resore</button></td>
            </tr>
    `
    }
    document.querySelector('.Dwebsites').innerHTML=x;
}

document.querySelector('.dw').addEventListener('click',function(){
    document.querySelector('.box').classList.remove('d-none');
})

document.querySelector('.times').addEventListener('click',function(){
    document.querySelector('.box').classList.add('d-none');
})
//? ============   Resore WebSite  ==========//
function resore(index){
    container.push(deleted[index]);
    display();
    deletForEver(index);
}
//? ============   Delete WebSite ForEver ==========//
  function deletForEver(index){
    deleted.splice(index,1)
        
           
    localStorage.setItem('deleted',JSON.stringify(deleted));
    displayDeleted();
  }


//? ============  Delete WebSite ==========//

function delet(index){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success mx-2",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            //&==========
            var x=container.splice(index,1)
        
            var z=x[0];
             
            deleted.push(z);
            localStorage.setItem('deleted',JSON.stringify(deleted));
            localStorage.setItem('webSites',JSON.stringify(container));
            displayDeleted();
            display();
             //&==========
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error"
          });
        }
      });









  
}



// ?===========Regex Patterns=========//
function validateForm(input) {
    console.log('ff');
    var regex = {
        siteName: /[a-zA-Z]{4,}/gm,
        url: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})|[a-zA-Z]{1,}\.com/gi
    };
    
    if (regex[input.id].test(input.value)) {
        input.classList.remove('is-invalid'); // Fixed typo: change delet to remove
        input.classList.add('is-valid');
        input.nextElementSibling.classList.add('d-none');
        return true;
    } else {
        input.classList.remove('is-valid'); // Fixed typo: change delet to remove
        input.classList.add('is-invalid');
        input.nextElementSibling.classList.remove('d-none');
        return false;
    }
}

// Assuming you have defined siteNameInput and urlInput somewhere in your HTML

siteNameInput.addEventListener('input', function() {
    validateForm(siteNameInput);
});

urlInput.addEventListener('input', function() {
    validateForm(urlInput);
});
