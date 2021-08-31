const groceryList = document.querySelector('#groceryListOl')
const inputGroceryItem = document.querySelector('#groceryItem')
const addItem = document.querySelector('#addItem')
const clearList = document.querySelector('#clearList')
const saveList = document.querySelector('#saveList')

const quote = document.querySelector('#quote')
const author = document.querySelector('#author')
const date = document.querySelector('#date')
const weatherText = document.querySelector('#weather')
const weatherImage = document.querySelector('#weatherIcon')
const weight = document.querySelector('#weight')
const height = document.querySelector('#height')
const submitInfo = document.querySelector('#submitInfo')
const bmi = document.querySelector('#bmi')
const r = document.querySelector('#line')

let aud = document.querySelector('#playSong')

addItem.onclick = () => {
    let newItem = document.createElement('li')
    newItem.innerHTML = inputGroceryItem.value
    groceryList.appendChild(newItem)
}

window.onload = () => {
    if (!(window.localStorage.getItem('list') == '')) {
        JSON.parse(window.localStorage.getItem('list')).forEach(item => {
            let newItem = document.createElement('li')
            newItem.innerHTML = item
            groceryList.appendChild(newItem)
        })
    } else {
        groceryList.innerHTML = ''
    }
}

clearList.onclick = () => {
    window.localStorage.setItem('list', '')
    groceryList.innerHTML = window.localStorage.getItem('list')
}
saveList.onclick = () => {
    let items = Array.from(
        groceryList.getElementsByTagName('li'),
        li => li.innerHTML
    )

    console.log(items)
    window.localStorage.setItem('list', JSON.stringify(items))
}
const audio =
    new Date().getDate() % 2 == 0 ? new Audio('bg.mp3') : new Audio('sound2.mp3')

window.onscroll = () => {
    if (audio.duration <= 0 || audio.paused) audio.play()
}

fetch('https://backendapianjali.herokuapp.com/getFacts', {
        method: 'GET'
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))

window.onload = () => {
    fetch('https://backendapianjali.herokuapp.com/getQuote', {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
            quote.innerHTML =
                data.quote == undefined ?
                'BETTER BE IGNORANT OF A MATTER THAN HALF KNOW IT' :
                data.quote

            author.innerHTML =
                data.author == undefined ? 'PUBLILIUS SYRUS' : data.author
        })
        .catch(err => console.log(err))
    const day = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    ]
    fetch('https://backendapianjali.herokuapp.com/getTime', {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            date.innerHTML =
                data.date == undefined ||
                data.day == undefined ||
                data.month == undefined ?
                day[new Date().getDay() - 1] +
                ' , ' +
                new Date().getDay() +
                ' ' +
                new Date().getMonth() :
                data.day + ' , ' + data.date + ' ' + data.month
        })
        .catch(err => console.log(err))

    fetch('https://backendapianjali.herokuapp.com/getFacts', {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => (fact.innerHTML = data.fact == undefined ? '' : data.fact))
        .catch(err => console.log(err))

    fetch('https://backendapianjali.herokuapp.com/getWeather', {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
            weatherText.innerHTML =
                data.temperature + ' , ' + data.conditionText + ' and ' + data.humidity
            weatherImage.src = 'https:' + data.conditionIcon
            console.log(data)
        })
        .catch(err => console.log(err))


}

submitInfo.onclick = () => {
    const w = Number(weight.value)
    const h = Number(height.value) / 100
    const BMI = w / (h * h)

    let range = ''

    if (BMI < 15) range = 'Very severely underweight'
    else if (BMI > 15 && BMI < 16) range = 'Severely underweight'
    else if (BMI > 16 && BMI < 18.5) range = 'Underweight'
    else if (BMI > 18.5 && BMI < 25) range = 'Normal (healthy weight)'
    else if (BMI > 25 && BMI < 30) range = 'Overweight'
    else if (BMI > 30 && BMI < 35) range = 'Obese Class I (Moderately obese)'
    else if (BMI > 35 && BMI < 40) range = 'Obese Class II (Severly obese)'
    else if (BMI > 40) range = 'Obese Class III (Very Severly obese)'

    bmi.innerHTML = range
    r.innerHTML = "BMI : " + BMI
}