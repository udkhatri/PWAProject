const myNavigator = document.getElementById('my-navigator');
// Service Worker registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service-worker.js')
    .catch(function (error) {
      console.log('Service Worker failed to register:', error);
    });
}
else {
  console.log('Service Worker is not supported by this browser.');
}

function onSignInClick(){
  myNavigator.pushPage('pages/sign-in.html');
}

function onSignUpClick(){
  myNavigator.pushPage('pages/sign-up.html');
}

function onGuestClick(){
  console.log(ons);

  const device = ons.platform.getMobileOS();
  console.log('Device: ', device);

  ons.notification.alert('My device is ' + device);
}