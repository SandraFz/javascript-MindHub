//Clasificación de eventos por la fecha

let currentDate = data.currentDate;

let allEvents = data.events;
let allEventsCards = [];

let upcomingEvents = [];
let upcomingEventsCards = [];

let pastEvents = [];
let pastEventsCards = [];

let allCategoriesByEvent=[]
let categories=[]
let categoryCheckboxes=[]

//Clasifica los eventos en futuro y pasado

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

setCards(allEvents, 
        allEventsCards, 
        "cards-group")

filterCategories(allEvents, 
                allCategoriesByEvent, 
                categories)

setCheckboxes(categories, 
            categoryCheckboxes, 
            "checkboxes")

//Eventos en checkboxes

let padre = document.getElementById("checkboxes")
let divContainerCheck = padre.querySelectorAll('input')
let newAOfChild = Array.from(divContainerCheck)
let selectedCardsFiltered = []

filteredByCheckbox(newAOfChild, 
                allEvents, 
                selectedCardsFiltered, 
                "cards-group")








//////////FUNCIONES//////////////////
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
    let cardsGroup = document.getElementById(htmlContainerId)
    cardsGroup.innerHTML=cardList.join('')
    // document.replaceChild(cardList, )
}

//Crea las listas de categorías según sean eventos pasados o futuros

function filterCategories(eventArray, 
                        allCategoriesArray, 
                        newCategoriesArray)
{
    for(let event of eventArray)
    {
        allCategoriesArray.push(event.category)
    }

    allCategoriesArray.sort()

    for(let i=0; i<allCategoriesArray.length; i++)
    {
        if(allCategoriesArray[i]!= allCategoriesArray[i+1])
        {
            newCategoriesArray.push(allCategoriesArray[i])
        }
    }
    // console.log(allCategoriesArray)
    // console.log(newCategoriesArray)
}

//Convierte cada objeto de un array en una checkboxes html

function createCheckbox(array, newArray)
{
  let newCheckbox;
  for(const element of array)
  {
      newCheckbox = `<label for="${element}" class="mx-2">
                    <input id="${element}" type="checkbox" class="eventCheckbox">
                    ${element}
                    </label>`
      newArray.push(newCheckbox)
  }
  return newArray
}

//Invocación al método createdCheckboxes y seteo al cointainer html, sin comas.

function setCheckboxes(array, newArray, htmlContainerId)
{
    let cardList = createCheckbox(array, newArray)
    let checkGroup = document.getElementById(htmlContainerId)
    checkGroup.innerHTML=cardList.join('')
}

//Eventos en checkboxes: previo, capturo el container de los checkboxes, para luego a los checkboxes y los convierto en un array. 
//En la función, por cada elemento este nuevo array escucho el evento "change". Si el evento ocurre, guardo en una variable un array resultante de filtrar la lista original de eventos, siempre que la categoría del evento sea igual al id del elemento que estoy iterando. Finalmente, invoco el método setCards.

function filteredByCheckbox(elementByListener, 
                            originalEvents, resultedCardsList, htmlContainerId)
{
    elementByListener.forEach(element =>
    {
        element.addEventListener("change", (e)=>
        {
            let selectedCards = originalEvents.filter(event => event.category == element.id)
                setCards(selectedCards, 
                        resultedCardsList, 
                        htmlContainerId)
        })
    })   
}




