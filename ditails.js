const queryString = location.search
const params = new URLSearchParams(queryString)
const id = params.get("id")
const eventById = data.events.find(a => a._id == id)
 
let containerCard = document.getElementById("tarjeta")
    containerCard.innerHTML = `
        <figure class="w-100 figure-detail" style="background-image:url(${eventById.image})">

        </figure>
        <div class="w-100 d-flex flex-column align-items-center justify-content-center text-detail">
            <h1>${eventById.name}</h1>
            <p>${eventById.description}</p>
            <div class="details d-flex flex-wrap justify-content-between">
                <p>Place: <span class="fw-bold">${eventById.place}</span></p>
                <p>Capacity: <span class="fw-bold">${eventById.capacity}</span></p>
                <p>Capacity: <span class="fw-bold">${eventById.assistance}</span></p>
                <p>Capacity: <span class="fw-bold">${eventById.price}</span></p>
            </div>
        </div>
        `






