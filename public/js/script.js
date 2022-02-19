console.log("hello mohamed")


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById("message-1")
const messageTwo = document.getElementById("message-2")

weatherForm.addEventListener('submit', (e) => {

    messageOne.textContent = "Loading..."

    e.preventDefault()
    let location = search.value

    fetch("http://localhost:3000/weather?address=" + location).then((response) => {
        response.json().then((data) => {

            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ""
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })

})