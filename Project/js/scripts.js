// import Firebase from "../firebase.js";
// console.log("logging ");
// const firebase = new Firebase();
const myNavigator = document.getElementById('my-navigator');
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

// document.getElementById('loginButton').addEventListener('click', login);
// const checkUser = () =>{
//   firebase.onAuthStateChanged(user => {
//     if(user){
//       console.log(user);
//       myNavigator.resetToPage('pages/nav.html');
//     }
//     else{
//       console.log('not logged in');
//       myNavigator.resetToPage('pages/welcome.html');
//     }
//   }
//   );
// }

// checkUser();
// const login = () => {
//     myNavigator.resetToPage('pages/nav.html');
// }

// document.addEventListener('prechange', function(event) {
//   document.querySelector('ons-toolbar .center')
//     .innerHTML = event.tabItem.getAttribute('label');
// });
function onSignInClick(){
  myNavigator.pushPage('pages/login.html');
}

function onSignUpClick(){
  myNavigator.pushPage('pages/signup.html');
}

function onGuestClick(){
  myNavigator.pushPage('pages/home.html')
}


// const pushPage = () => {
//   myNavigator.pushPage('pages/recipe.html', {data: {title: 'Page 2'}});
// };
const logout = () => {
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