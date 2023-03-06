//Clasificación de eventos por la fecha

let currentDate = data.currentDate;
let allEvents = data.events;
let allEventsCards = [];
let upcomingEvents = [];
let upcomingEventsCards = [];
let pastEvents = [];
let pastEventsCards = [];

for(const eventItem of allEvents)
{
    if( eventItem.date >= currentDate)
    {
        upcomingEvents.push(eventItem)
    }
    else 
    {
        pastEvents.push(eventItem)
    }
}

  // console.log(data.events)
  // console.log(data.events[0].name)
  // console.log(data.events[0].description)
  // console.log(data.events[0].price)
  // console.log(data.events[0].description)
  // console.log(data.events[0].image)

//Convierte cada objeto de un array en una card html

function createCard(array, newArray)
{
  let newCard;
  for(const element of array)
  {
      newCard = `<div
      class="d-flex flex-column align-items-center justify-content-between p-3 w-100 p-1 rounded-2 content-card-group">
      <figure style="background-image: url(${element.image})" class="figure-card figure-card1 rounded-top rounded-end mt-1">
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

//Invocación al método createdCard y seteo al cointainer html, sin comas.

function setCards(array, newArray, htmlContainerId)
{
    let cardList = createCard(array, newArray)
    // console.table(listCard)
    let cardsGroup = document.getElementById(htmlContainerId)
    // console.table(cardsGroup);
    cardsGroup.innerHTML=cardList.join('')
    // cardsGroup.replaceChild(id, newArray)
}

setCards(allEvents, allEventsCards, "cards-group")

