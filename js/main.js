var ProductNmeInput = document.getElementById("ProdName");
var ProductPriceInput = document.getElementById("ProdPrice");
var ProductCategoryInput = document.getElementById("ProdCategory");
var ProductDescInput = document.getElementById("ProductDesc");
var productImgeInput = document.getElementById("ProdImage");
var productSearchInput =document.getElementById('productSearch')
var addbtn=document.getElementById('addbtn')
var updatebtn=document.getElementById('updatebtn')
var myindex
var allproducts=[]
if(localStorage.getItem('productContainer') === null){
    allproducts=[]
}
else{
    allproducts=JSON.parse(localStorage.getItem('productContainer'))
    displayProducts()
}


function addProduct(){

    if(vallidateAllInputs(ProductNmeInput) &&
    vallidateAllInputs(ProductPriceInput) &&
    vallidateAllInputs(ProductCategoryInput) &&
    vallidateAllInputs(ProductDescInput)
    ){
        var Product={
        name: ProductNmeInput.value,
        price: ProductPriceInput.value,
        category: ProductCategoryInput.value,
        desc: ProductDescInput.value,
        image: `images/${productImgeInput.files[0]?.name}`,
    };

    allproducts.push(Product);

    localStorage.setItem('productContainer', JSON.stringify(allproducts));
    console.log(allproducts);
    displayProducts()
    clearInput();
    

    }
    

    
    
}

function clearInput(){
    ProductNmeInput.value=" ";
    ProductPriceInput.value=" ";
    ProductCategoryInput.value=" ";
    ProductDescInput.value=" ";
}


function displayProducts(){
    var cartoona=``;
    for(var i=0; i<allproducts.length; i++){
        cartoona+=`<div class="col-md-3 mt-5">
          <div class="border bg-light shadow-lg p-2">
            <img class="w-100" src=${allproducts[i].image} alt="">
            <h2>Name : ${allproducts[i].name}</h2>
            <h3 class="text-info">Category : ${allproducts[i].category}</h3>
            <span>${allproducts[i].price} EGP</span>
            <h4>desc : ${allproducts[i].desc}</h4>
            <button onclick='getdataforupdate(${i})' class="btn btn-warning w-100 my-2 "> Update Product</button>
            <button onclick='deleteproduct(${i})' class="btn btn-danger w-100 my-2 "> Delete Product</button>

          </div>
        </div>`
    }

    document.getElementById("tableData").innerHTML=cartoona;
}



function deleteproduct(index){
    allproducts.splice(index,1);
    localStorage.setItem('productContainer', JSON.stringify(allproducts));
    displayProducts()
}







function searchProduct() {
    var term=productSearchInput.value
    var cartona=''
    for (var i = 0; i < allproducts.length; i++) {
        if (allproducts[i].name.toLowerCase().includes(term.toLowerCase())) {
             cartona+=`<div class="col-md-3 mt-5">
          <div class="border bg-light shadow-lg p-2">
            <img class="w-100" src=images/${productImgeInput.files[i]?.name} alt="">
            <h2>Name : ${allproducts[i].name.replace(term , `<span class="bg-info">${term}</span>`)}</h2>
            <h3 class="text-info">Category : ${allproducts[i].category}</h3>
            <span>${allproducts[i].price} EGP</span>
            <button onclick='deleteproduct(${i})' class="btn btn-danger w-100 my-2 "> Delete Product</button>
            <button onclick='getdataforupdate(${i})' class="btn btn-warning w-100 my-2 "> Update Product</button>
          </div>
        </div>`
        }  
    }
    document.getElementById('tableData').innerHTML=cartona
}


function getdataforupdate(index){
    myindex=index
    console.log('mido', index);
    ProductNmeInput.value=allproducts[index].name;
    ProductPriceInput.value=allproducts[index].price;
    ProductCategoryInput.value=allproducts[index].category;
    ProductDescInput.value=allproducts[index].desc;

    addbtn.classList.add('d-none')
    updatebtn.classList.remove('d-none')
}


function updateproduct(){
    allproducts[myindex].name=ProductNmeInput.value;
    allproducts[myindex].price=ProductPriceInput.value;
    allproducts[myindex].category=ProductCategoryInput.value;
    allproducts[myindex].desc=ProductDescInput.value;
    if(productImgeInput.files.length > 0){
        allproducts[myindex].image=`images/${productImgeInput.files[0].name}`;
    }
    displayProducts()
    localStorage.setItem('productContainer', JSON.stringify(allproducts));

    updatebtn.classList.add('d-none')
    addbtn.classList.remove('d-none')
    clearInput();
}


function vallidateAllInputs(element){
    var val=element.value
    var id=element.id
    var regex={
        ProdName:/^[A-Z][a-z]{3,5}$/,
        ProdPrice:/^[1-9][0-9]{3,5}$/,
        ProdCategory:/^(TV|mobail|laptop|screen)$/,
        ProductDesc:/^.{6,20}$/,
    }

    if(regex[id].test(val)==true){

        element.classList.add('is-valid')
        element.classList.remove('is-invalid')
        element.nextElementSibling.classList.replace('d-block','d-none')
        return true;
    }
    else{
        element.classList.add('is-invalid')
        element.classList.remove('is-valid')
        element.nextElementSibling.classList.replace('d-none','d-block')
        return false;
    }
}





