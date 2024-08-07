/// <reference types="../@types/jquery"/>


$('.loading-screen').fadeOut(300, function(){
    $('.loading-screen i').fadeOut(300)
      $('body').css('overflow', 'auto');
      $('#navBar').removeClass('d-none');
    })
  

function loadingAcreenAppear(){
  $('.loading-screen').fadeIn(300, function(){
    $('.loading-screen i').fadeIn(300)
  })
}

function loadingAcreenHide(){
  $('.loading-screen').fadeOut(300, function(){
    $('.loading-screen i').fadeOut(300)
  })
}

 

function openNav(){
  for(let i = 0 ; i < 5; i++){
    $('.innerside li').eq(i).animate({marginTop: 0}, 600)
  }

  $('.animate').animate({width: 'show'}, 500, function(){
    
    $('#toggle-icon').removeClass('fa-bars')
    $('#toggle-icon').addClass('fa-x')

  })
}

function closeNav(){
  for(let i = 0 ; i < 5; i++){
    $('.innerside li').eq(i).animate({marginTop: 194}, 1000)
  }
    $('.animate').animate({width: 'hide'}, 500, function(){
      $('#toggle-icon').addClass('fa-bars')
      $('#toggle-icon').removeClass('fa-x')

    })
}


$('#toggle-icon').on('click', function(){

  if( $('#toggle-icon').hasClass('fa-bars')){

    openNav()

  }else if( $('#toggle-icon').hasClass('fa-x')){
    closeNav()
  }
 
})



/////////////////////////////// Home Data ////////////////////////////////
let homeRow = document.getElementById('homeRow');
let homeApi = [];
let imgApi = [];
let categoryApi = [];
let mealName;
let ingredient = '';
let ingredients = '';
let tag = '';

async function getHomeData(endPoint){
  loadingAcreenAppear()
    let respose = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${endPoint}`) ;
    let finalResponse = await respose.json();

    homeApi = finalResponse.meals;

    displayHomeData();  
    loadingAcreenHide()

    $('.imgDetails').on('click', function(e){
        mealName = e.target.innerText;
       getImgDetails(mealName);
    })

}

function displayHomeData(){
    let data = '';

    for(let i = 0; i < homeApi.length; i++){
        data+=`<div class="col-md-3">
        <div class="content imgDetails">
          <img src="${homeApi[i].strMealThumb}" class="w-100 rounded"
            role="button" alt="img">

          <div class="layer" role="button">
            <h3>${homeApi[i].strMeal}</h3>
          </div>
        </div>

      </div>`
    }

    homeRow.innerHTML = data;
}

getHomeData('');


async function getImgDetails(meal){
  loadingAcreenAppear()
    let respose = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`) ;
    let finalResponse = await respose.json();

    imgApi = finalResponse.meals[0];
    displayImgDetails();
    loadingAcreenHide()
}

function displayImgDetails(){

  searchRow.innerHTML ='';

    getIngredients();
    getTags();

    let data = `<div class="col-md-4">
    <div class="img-details">
      <img src="${imgApi.strMealThumb}" class="w-100 rounded"
        alt="img">
      <h3>${imgApi.strMeal}</h3>
    </div>
  </div>

  <div class="col-md-8">

    <div class="details">
      <h2>Instructions</h2>
      <p>${imgApi.strInstructions}</p>

      <div class="paragraph">
        <p>Area : ${imgApi.strArea}</p>
        <p>Category : ${imgApi.strCategory}</p>
        <p>Recipes : </p>

        ${ingredients}

        <p>Tags :</p>
        <div class="tags">

             ${tag}

          </div>  

        <a href="${imgApi.strSource}" target="_blank" class="btn btn-success">Source</a>
        <a href="${imgApi.strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
      </div>

    </div>

  </div>`
   homeRow.innerHTML = data;

}

function getIngredients(){

    for(let i = 1; i <= 20; i++){

      if(imgApi[`strIngredient${i}`] != null){

        if(imgApi[`strIngredient${i}`].length > 0){
          ingredient = imgApi[`strMeasure${i}`] + ' ' + imgApi[`strIngredient${i}`];
          ingredients += `<span>${ingredient}</span>`
      }
      }

    }
}

function getTags(){

    if(imgApi.strTags != null){
        let arrayTag = imgApi.strTags;
        let arraySplit = arrayTag.split(',');

        for(let i = 0; i < arraySplit.length; i++){

            tag += `<span>${arraySplit[i]}</span>`

        }
    }

}

/////////////////////////////// Search ////////////////////////////////
let searchLink = document.getElementById('searchLink');
let searchRow = document.getElementById('searchRow')
let searchInputName;
let searchInputLetter;
let inputNameValue;
let inputLetterValue;

async function getSearchLetterData(endPointLetter){
  loadingAcreenAppear()
  let respose = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${endPointLetter}`) ;
  let finalResponse = await respose.json();

  homeApi = finalResponse.meals;

  displaySearchLetterData();  
  loadingAcreenHide()


  $('.imgDetails').on('click', function(e){
      mealName = e.target.innerText;
     getImgDetails(mealName);
  })

}

function displaySearchLetterData(){
  let data = '';

  for(let i = 0; i < homeApi.length; i++){
      data+=`<div class="col-md-3">
      <div class="content imgDetails">
        <img src="${homeApi[i].strMealThumb}" class="w-100 rounded"
          role="button" alt="img">

        <div class="layer" role="button">
          <h3>${homeApi[i].strMeal}</h3>
        </div>
      </div>

    </div>`
  }

  homeRow.innerHTML = data;
}

searchLink.addEventListener('click', function(){
  displaySearchSection();
  closeNav();

  searchInputName.addEventListener('input', function(){
    inputNameValue = searchInputName.value;
    getHomeData(inputNameValue);
  })

  searchInputLetter.addEventListener('input', function(){
    inputLetterValue = searchInputLetter.value;
    getSearchLetterData(inputLetterValue);
  })

})

function displaySearchSection(){

  let inputs = `<div class="col-md-5">          
  <input type="text" class="search-inputs form-control" id="searchInputName" placeholder="Search By Name">
</div>

<div class="col-md-5">     
  <input type="text" class="search-inputs form-control" id="searchInputLetter" placeholder="Search By First Letter">
</div>`

    searchRow.innerHTML = inputs;
    homeRow.innerHTML = '';

    searchInputName = document.getElementById('searchInputName');
    searchInputLetter = document.getElementById('searchInputLetter');
}


/////////////////////////////// Categories ////////////////////////////////

let categoryLink = document.getElementById('categoryLink');
let categoryName;
let categoryMealName;

async function getAllCategories() {
  loadingAcreenAppear()
  let respose = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
  let finalResponse = await respose.json();

  categoryApi = finalResponse.categories;

  displayAllCategories();
  loadingAcreenHide()

}

function displayAllCategories() {
  let data = '';

  for (let i = 0; i < categoryApi.length; i++) {
    data += `<div class="col-md-3">

    <div class="content imgDetails">
      <img src="${categoryApi[i].strCategoryThumb}" class="w-100 rounded" role="button" alt="img">

      <div class="category-layer text-center rounded" role="button">
        <h3 class="${categoryApi[i].strCategory}">${categoryApi[i].strCategory}</h3>
        <p class="${categoryApi[i].strCategory}">${categoryApi[i].strCategoryDescription}</p>
      </div>
    </div>

  </div>`

  }

  homeRow.innerHTML = data;


  $('.imgDetails').on('click', function(e){
      categoryName =  e.target.className;

      getCategoryData(categoryName);
  })

}

categoryLink.addEventListener('click', function () {
  searchRow.innerHTML = '';
  getAllCategories();
  closeNav();

})


async function getCategoryData(categoryName) {
  loadingAcreenAppear()
  let respose = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
  let finalResponse = await respose.json();

  categoryApi = finalResponse.meals;

  displayCategoryData();
  loadingAcreenHide()
}

function displayCategoryData() {
  let data = '';
  for (let i = 0; i < categoryApi.length; i++) {
    data += `<div class="col-md-3">
             <div class="content imgDetails">
               <img src="${categoryApi[i].strMealThumb}" class="w-100 rounded"
                role="button" alt="img">

               <div class="layer" role="button">
                 <h3>${categoryApi[i].strMeal}</h3>
               </div>
             </div>
         </div>`
  }

  homeRow.innerHTML = data;

  $('.imgDetails').on('click', function(e){
    categoryMealName = e.target.innerText
    getImgDetails(categoryMealName)
  })

}

/////////////////////////////// Areas ////////////////////////////////
let areasApi = [];
let areaLink = document.getElementById('areaLink');
let areaName;

async function getAllAreas(){
  loadingAcreenAppear()
 let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
 let finalresponse = await response.json();

 areasApi = finalresponse.meals;
 displayAllAreas();
 loadingAcreenHide()
}

function displayAllAreas(){
  searchRow.innerHTML = '';
  let data = '';

  for(let i = 0; i < areasApi.length; i++){
    data += `<div class="col-md-3">
    <div class="area" role="button">

    <i class="fa-solid fa-house-laptop">
    <h3>${areasApi[i].strArea}</h3></i>

    </div>
  </div>`
  }

homeRow.innerHTML = data;

$('.area').on('click', function(e){
  areaName = e.target.innerText
  getAreaDetails(areaName);
})

}

areaLink.addEventListener('click', function(){
  getAllAreas();
  closeNav();
})

async function getAreaDetails(areaName){
  loadingAcreenAppear()
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`)
 let finalresponse = await response.json();

 areasApi = finalresponse.meals;
 displayAreaDetails();
 loadingAcreenHide()
}

function displayAreaDetails(){
  let data = '';
  for (let i = 0; i < areasApi.length; i++) {
    data += `<div class="col-md-3">
             <div class="content imgDetails">
               <img src="${areasApi[i].strMealThumb}" class="w-100 rounded"
                role="button" alt="img">

               <div class="layer" role="button">
                 <h3>${areasApi[i].strMeal}</h3>
               </div>
             </div>
         </div>`
  }

  homeRow.innerHTML = data;

  $('.imgDetails').on('click', function(e){

    mealName = e.target.innerText
    getImgDetails(mealName)
  })
}

/////////////////////////////// Ingredients ////////////////////////////////
let ingredientsLink = document.getElementById('ingredientsLink');

let ingredientsApi = [];

let ingredientName;
async function getAllIngredients() {
  loadingAcreenAppear()
  let response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  let finalrResponse = await response.json()
  ingredientsApi = finalrResponse.meals;
  displayAllIngredients();
  loadingAcreenHide()
}

function displayAllIngredients() {
  searchRow.innerHTML = '';
  let data = '';

  for (let i = 0; i < 20; i++) {
    data += ` <div class="col-md-3">
  <div id="ingredients" class="ingredients" role="button">

    <i title="${ingredientsApi[i].strIngredient}" class="fa-solid fa-drumstick-bite">
    <h3 title="${ingredientsApi[i].strIngredient}">${ingredientsApi[i].strIngredient}</h3>
    </i>

     <p title="${ingredientsApi[i].strIngredient}">${ingredientsApi[i].strDescription}</p>

  </div>
</div>`
  }

  homeRow.innerHTML = data;


    $('.ingredients').on('click', function(e){
      ingredientName = e.target.getAttribute('title');
      getIngredientDetails(ingredientName)
    })

}

ingredientsLink.addEventListener('click', function(){
  getAllIngredients()
  closeNav();
})

async function getIngredientDetails(ingredientName) {
  loadingAcreenAppear()
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`)
  let finalresponse = await response.json();

  ingredientsApi = finalresponse.meals;
  displayIngredientDetails();
  loadingAcreenHide()
}

function displayIngredientDetails() {
  let data = '';
  for (let i = 0; i < ingredientsApi.length; i++) {
    data += `<div class="col-md-3">
               <div class="content imgDetails">
                 <img src="${ingredientsApi[i].strMealThumb}" class="w-100 rounded"
                  role="button" alt="img">

                 <div class="layer" role="button">
                   <h3>${ingredientsApi[i].strMeal}</h3>
                 </div>
               </div>
           </div>`
  }

  homeRow.innerHTML = data;

  $('.imgDetails').on('click', function (e) {

    mealName = e.target.innerText
    getImgDetails(mealName)
  })
}


/////////////////////////////// Contact ////////////////////////////////

let contactLink = document.getElementById('contactLink');
let inputName;
let inputEmail;
let inputphone;
let inputAge;
let inputPassword;
let inputRepassword;
let nameAlert;
let emailAlert;
let phoneAlert;
let ageAlert;
let passwordAlert;
let repasswordAlert;
let submitButton;
function displayContactSection() {
  searchRow.innerHTML = '';
  let data = `<form class="d-flex justify-content-center align-items-center">

<div class="container w-75 row">
<div class="col-md-6 mb-4">
  <input type="text" class="form-control" id="inputName" name="name" placeholder="Enter Your Name">
  <div id="nameAlert" class="alert alert-danger mt-2 text-center d-none" role="alert">
    Special characters and numbers not allowed
  </div>
</div>

<div class="col-md-6 mb-4">       
  <input type="email" class="form-control" id="inputEmail" name="email" placeholder="Enter Your Email">
  <div id="emailAlert" class="alert alert-danger mt-2 text-center d-none" role="alert">
    Email not valid *exemple@yyy.zzz*
  </div>
</div>

<div class="col-md-6 mb-4">       
  <input type="text" class="form-control" id="inputphone" name="phone" placeholder="Enter Your Phone">
  <div id="phoneAlert" class="alert alert-danger mt-2 text-center d-none" role="alert">
    Enter valid Phone Number
  </div>
</div>

<div class="col-md-6 mb-4">       
  <input type="number" class="form-control" id="inputAge" name="age" placeholder="Enter Your Age">
  <div id="ageAlert" class="alert alert-danger mt-2 text-center d-none" role="alert">
    Enter valid age
  </div>
</div>

<div class="col-md-6 mb-4">       
  <input type="password" class="form-control" id="inputPassword" placeholder="Enter Your Password">
  <div id="passwordAlert" class="alert alert-danger mt-2 text-center d-none" role="alert">
    Enter valid password *Minimum eight characters, at least one letter and one number*
  </div>
</div>

<div class="col-md-6 mb-4">       
  <input type="password" class="form-control" id="inputRepassword" placeholder="Repassword">
  <div id="repasswordAlert" class="alert alert-danger mt-2 text-center d-none" role="alert">
    Enter valid repassword
  </div>
</div>

<button id="submitButton" type="submit" class="mx-auto col-md-1 btn btn-outline-danger" disabled>Submit</button>
</div>


</form>`
  homeRow.innerHTML = data;

  inputName = document.getElementById('inputName');
  inputEmail = document.getElementById('inputEmail');
  inputphone = document.getElementById('inputphone');
  inputAge = document.getElementById('inputAge');
  inputPassword = document.getElementById('inputPassword');
  inputRepassword = document.getElementById('inputRepassword');
  nameAlert = document.getElementById('nameAlert');
  emailAlert = document.getElementById('emailAlert');
  phoneAlert = document.getElementById('phoneAlert');
  ageAlert = document.getElementById('ageAlert');
  passwordAlert = document.getElementById('passwordAlert');
  repasswordAlert = document.getElementById('repasswordAlert');
  submitButton = document.getElementById('submitButton');

  inputName.addEventListener('input', function () {
    checkValidName()
    checkAllValidation();
  })
  inputEmail.addEventListener('input', function () {
    checkValidEmail()
    checkAllValidation();
  })
  inputphone.addEventListener('input', function () {
    checkValidphone()
    checkAllValidation();
  })
  inputAge.addEventListener('input', function () {
    checkValidAge()
    checkAllValidation();
  })
  inputPassword.addEventListener('input', function () {
    checkValidPassword()
    checkAllValidation();
  })
  inputRepassword.addEventListener('input', function () {
    checkValidRepassword() 
    checkAllValidation();
  })


}

contactLink.addEventListener('click', function () {
  displayContactSection();
  closeNav();
})


function checkValidName() {
  let text = inputName.value
  let regex = /^([a-z]|[A-Z])*$/

  if (regex.test(text)) {
    nameAlert.classList.add('d-none');
    return true

  } else {
    nameAlert.classList.remove('d-none');
  }

}
function checkValidEmail() {
  let text = inputEmail.value
  let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3}$/

  if (regex.test(text)) {
    emailAlert.classList.add('d-none');
    return true

  } else {
    emailAlert.classList.remove('d-none');
  }

}
function checkValidphone() {
  let text = inputphone.value
  let regex = /^01[0125][\d]{8}$/

  if (regex.test(text)) {
    phoneAlert.classList.add('d-none');
    return true

  } else {
    phoneAlert.classList.remove('d-none');
  }

}
function checkValidAge() {
  let text = inputAge.value;
  let regex = /^([1-9]|[1-9][0-9]|[1][0-2][0-9])$/

  if (regex.test(text)) {
    ageAlert.classList.add('d-none');
    return true

  } else {
    ageAlert.classList.remove('d-none');
  }
}
function checkValidPassword() {
  let text = inputPassword.value;
  let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

  if (regex.test(text)) {
    passwordAlert.classList.add('d-none');
    return true

  } else {
    passwordAlert.classList.remove('d-none');
  }
}
function checkValidRepassword() {
  if (inputPassword.value == inputRepassword.value) {
    repasswordAlert.classList.add('d-none');
    return true;
  } else {
    repasswordAlert.classList.remove('d-none');
  }
}

function checkAllValidation(){

  if(checkValidName() && checkValidEmail() && checkValidphone() && checkValidAge() && checkValidPassword() && checkValidRepassword()){
    submitButton.removeAttribute('disabled');
  }else{
    submitButton.setAttribute('disabled', 'true');
  }
}