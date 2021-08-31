if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('sw.js')
        .then(registration => {
            console.log(registration)
        })
        .catch(e => console.log(e))
}