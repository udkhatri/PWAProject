import Firebase from "../firebase.js";
console.log("logging ");
const firebase = new Firebase();
const myNavigator = document.getElementById('my-navigator');
var userName = "Guest user"
const baseURL =
"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=";
const endURL =
"&instructionsRequired=true&fillIngredients=false&addRecipeInformation=true&ignorePantry=true&number=10&limitLicense=false";

        const baseID_URL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/";
        const endID_URL = "/information?includeNutrition=true"

function viewRecipe(recipeID) {
  let number = 22;
  const myNavigator = document.getElementById('my-navigator');
      //id = parseInt(recipeID);
      console.log("This is from recipes page what I have for iD "+ recipeID);
     // document.querySelector('#my-navigator').bringPageTop('pages/view-recipe.html', { data: id });
      myNavigator.pushPage("pages/view-recipe.html",{ data: {recipeID}});
    }
// Service Worker registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./service-worker.js')
    .catch(function (error) {
      console.log('Service Worker failed to register:', error);
    });
}
else {
  console.log('Service Worker is not supported by this browser.');
}
setTimeout(() => {
  // Timeout required for onsenUI
 

} , 1000);
document.addEventListener('show', ({ target }) => {
  if (target.matches('#view-recipe')) {
    //has to be curly brackets 
    let {recipeID} = document.querySelector('#my-navigator').topPage.data;
    var id = recipeID;
    console.log("This is the id from other page " + id); // Get id from the other page"   

    const get = async () => {
      // do the API call and get JSON response
     
      let recipeURL = baseID_URL + id + endID_URL;
      const response = await fetch(recipeURL, options);
      const json = await response.json();

      const nutrientsMap = json.nutrition.nutrients.map(({amount})=> amount);
      const {summary, title, image, instructions} = json;

      // This variables can be used as well, might be easier to read but left to show that both are good the ones in element id and these
      const recipeSummary = summary;
      const recipeTitle = title;
      const recipeImage = image;
      const recipeInstructions = instructions;
      const caloriesValue = nutrientsMap[0];
      const fatValue = nutrientsMap[1];
      const carbsValue = nutrientsMap[3];
      const proteinValue = nutrientsMap[9];


      document.getElementById('recipeTitle').innerHTML = title;
      document.getElementById("recipeImage").src = image;
      document.getElementById('recipeSummary').innerHTML = summary;
      document.getElementById('recipeInstructions').innerHTML = instructions;
      document.getElementById('caloriesValue').innerHTML = nutrientsMap[0];
      document.getElementById('fatValue').innerHTML = nutrientsMap[1];
      document.getElementById('carbsValue').innerHTML =  nutrientsMap[3];
      document.getElementById('proteinValue').innerHTML = nutrientsMap[9];

    };
    // get the first set of results as soon as the page is initialised
     get();
  }

});
document.addEventListener('init', function(event) {
  if (event.target.matches('#welcome')) {
    document.getElementById('loginButton').addEventListener('click', onSignInClick);
    document.getElementById('signupButton').addEventListener('click', onSignUpClick);
    document.getElementById('guestButton').addEventListener('click', anonymousLogin);
  }
  if (event.target.matches('#signup')) {
    document.getElementById('onSignup').addEventListener('click', signup);
  }
  if (event.target.matches('#login')) {
    document.getElementById('onSignin').addEventListener('click', signin);
  }
  if (event.target.matches('#profile')) {
    document.getElementById('logout').addEventListener('click', logout);
    document.getElementById('switch').addEventListener('click', switchChange);
    document.getElementById('username').innerHTML = userName != null ? userName : "Guest user";
    console.log("user name is: ",userName);
  }
  if (event.target.matches('#view-recipe')) {
   document.getElementById('saveRecipeButton').addEventListener('click', saveRecipe);
  }
  if (event.target.matches("#search-page")) {
    const myNavigator = document.getElementById('my-navigator');
    let searchResult = document.getElementById("search");
    searchResult.addEventListener('change',()=>{
      console.log("chnage",searchResult.value);
      get(searchResult.value);
    })
    document.getElementById('searchButton').addEventListener('click', ()=>{
      // use to keep track of the recipe numbers
      let recipeImage;
      
    
      console.log("You are searching for this " + searchResult.value);
    get(searchResult.value);
    });
  }

  
}, false);
let nextrecipeNumber = 1;
const get = async (searchResult) => {
  // do the API call and get JSON response

  let searchURL = baseURL + searchResult + endURL;
  const response = await fetch(searchURL, options);
  const json = await response.json();

  const newRecipeTitle = json.results.map((e) => e.title);
  const recipeImage = json.results.map((e) => e.image);
  const recipeId = json.results.map((e)=>e.id);
  
  const list = document.querySelector("#result-list");
  list.innerHTML = "";
  newRecipeTitle.forEach((title, i) => {
    image = recipeImage[i];
    id = recipeId[i];
    //avoids getting reesults without images
    if (typeof image === "string") {
      list.appendChild(
        ons.createElement(`
        <ons-list-item tappable onclick="viewRecipe(${id})">
          <div class="left">
            <img class="list-item__thumbnail" src=${image}>
          </div>
          <div class="center">
            <span class="list-item__title">${title}</span><span class="list-item__subtitle"></span>
          </div>
        </ons-list-item>
`)
      );
      nextrecipeNumber++;
    } else {
      console.log("No image found");
    }
  });

  // hide the spinner for now
};
const signin = () => {
  const email = document.getElementById('siemail').value;
  const password = document.getElementById('sipassword').value;
  console.log(email, password);
  firebase
    .signin(email, password)
    .then(user => {
      console.log(user);
      checkUser();
    })
    .catch(error => {
      ons.notification.alert(error.code);
    }
    );
}
const anonymousLogin = () => {
  firebase.anonymousLogin().then(() => {
    checkUser();
  }).catch(error => {
    ons.notification.alert(error);
  }
  );
}
const signup = () =>{
  console.log('signup');
  const email = document.getElementById('suemail').value;
  const password = document.getElementById('supassword').value;
  const name = document.getElementById('suname').value;
  console.log(email, password, name);
  firebase
    .signup(email, password)
    .then(user => {
      console.log(user);
      firebase.storeUserName(name);
      firebase.createUser(user.uid, name, email);
      checkUser();
    })
    .catch(error => {
      ons.notification.alert(error);
    })
}
const checkUser = () =>{
  firebase.onAuthStateChanged(user => {
    if(user){
      console.log(user);
      userName = user.displayName;
      myNavigator.resetToPage('pages/home.html');
    }
    else{
      console.log('not logged in');
      myNavigator.resetToPage('pages/welcome.html');
    }
  }
  );
}
checkUser();

function getRecipeId(valueID){
  
  console.log("This is the ID" + valueID);
}

const login = () => {
    myNavigator.resetToPage('pages/home.html');
}

document.addEventListener('prechange', function(event) {
  document.querySelector('ons-toolbar .center')
    .innerHTML = event.tabItem.getAttribute('label');
});
function onSignInClick(){
  myNavigator.pushPage('pages/login.html');
}

function onSignUpClick(){
  myNavigator.pushPage('pages/signup.html');
}

function onGuestClick(){
  myNavigator.pushPage('pages/home.html')
}

const saveRecipe = () =>{
  
}

const logout = () => {
  firebase.logout().then(() => {
    checkUser();
  });
  myNavigator.resetToPage('pages/welcome.html');
}
const switchChange = () =>{
  const switchh = document.querySelector('#switch');
  if(switchh.checked){
    document.querySelector('#theme').setAttribute('href', 'css/css/dark-onsen-css-components.css');
    document.querySelector('#themeMeta').setAttribute('content', '#000')
  }
  else{
    document.querySelector('#theme').setAttribute('href', 'css/css/onsen-css-components.css');
    document.querySelector('#themeMeta').setAttribute('content', '#fff')
  }
}