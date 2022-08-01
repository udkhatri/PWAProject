

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(
        '/Project/service-worker.js',
        {
            scope: '/Project/',
            type: 'module'
        }
        )
    .then((registration) => {
    console.log('Success. Scope:', registration.scope);
    })
    .catch((error) => {
    console.log('Failed. Error:', error);
    });
    }