//Clasificar eventos por la fecha

let currentDate = data.currentDate;
let allEvents = data.events;
let allEventsCards = [];
let upcomingEvents = [];
let upcomingEventsCards = [];
let pastEvents = [];
let pastEventsCards = [];

for(const eventItem of data.events)
{
    if( eventItem.date < currentDate)
    {
        pastEvents.push(eventItem)
    }
}

function createCard(array, newArray)
{
    let newCard;
    for( const element of array)
    {
        newCard = `<div
        class="d-flex flex-column align-items-center justify-content-between p-3 w-100 p-1 rounded-2 content-card-group">
        <figure class="figure-card figure-card1 rounded-top rounded-end mt-1">
        </figure>
        <h3>
            ${element.name}
        </h3>
        <p>
        ${element.description}
        </p>
        <div class="d-flex justify-content-between align-items-center g-5 w-100 button-card-group">

            <small>
            Price $${element.price}
            </small>

            <a href="./details.html" class="btn p-1">
            more...
            </a>
        </div>
        </div>`
        newArray.push(newCard)
    }
    return newArray

}

console.log(createCard(pastEvents, pastEventsCards))

