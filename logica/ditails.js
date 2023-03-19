const queryString = location.search
const params = new URLSearchParams(queryString)
const id = params.get("id")

startditails()

async function startditails()
{
try
{
    const res = await fetch(url)

    let dataBase = await res.json()
    let allEvents = dataBase.events

    const eventById = allEvents.find(a => a._id == id)
    createDetailCard(eventById)
}
catch(error)
    {
        console.log(error)
    }
}

// FUNCIONES
 
let containerCard = document.getElementById("tarjeta")

function createDetailCard (event){

    containerCard.innerHTML = `
        <figure class="w-100 figure-detail" style="background-image:url(${event.image})">

        </figure>
        <div class="w-100 d-flex flex-column align-items-center justify-content-center text-detail">
            <h1>${event.name}</h1>
            <p>${event.description}</p>
            <div class="details d-flex flex-wrap justify-content-between">
                <p>Date: <span class="fw-bold">${event.date}</span></p>
                <p>Place: <span class="fw-bold">${event.place}</span></p>
                <p>Capacity: <span class="fw-bold">${event.capacity}</span></p>
                <p>Asistance: <span class="fw-bold">${event.assistance}</span></p>
                <p>Price: <span class="fw-bold">$ ${event.price}</span></p>
            </div>
        </div>
        `
}






