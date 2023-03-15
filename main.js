let currentDate = data.currentDate;

let allEvents = data.events;
let allEventsCards = [];

let upcomingEvents = [];
let pastEvents = [];
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
console.log(upcomingEvents)

setCards(allEvents, 
        "cards-group")

filterCategories(allEvents, 
                categories)

setCheckboxes(categories, 
            "checkboxes")

//Eventos en checkboxes

let padre = document.getElementById("checkboxes")
let divContainerCheck = padre.querySelectorAll('input')
let newAOfChild = Array.from(divContainerCheck)
let selectedCardsFiltered = []

// filterByCheckbox(newAOfChild, 
//                 allEvents,  
//                 "cards-group")








//////////FUNCIONES//////////////////
//Convierte cada objeto de un array en una card html

function createCard(array)
{
  let newCard;
  let newArray = []
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

          <a href="./details.html?id=${element._id}" class="btn p-1">
          more...
          </a>
      </div>
      </div>`
      newArray.push(newCard)
  }
  return newArray
}

//Invocación al método createdCard y seteo al cointainer html, sin comas.

function setCards(array, htmlContainerId)
{
    let cardList = createCard(array)
    let cardsGroup = document.getElementById(htmlContainerId)
    cardsGroup.innerHTML=cardList.join('')
}

//Crea las listas de categorías según sean eventos pasados o futuros

function filterCategories(eventArray, 
                        newCategoriesArray)
{
    let allCategories = []
    for(let event of eventArray)
    {
        allCategories.push(event.category)
    }

    allCategories.sort()
 
    for(let i=0; i<allCategories.length; i++)
    {
        if(allCategories[i]!= allCategories[i+1])
        {
            newCategoriesArray.push(allCategories[i])
        }
    }
    // console.log(allCategoriesArray)
    // console.log(newCategoriesArray)
}

//Convierte cada objeto de un array en una checkboxes html

function createCheckbox(array)
{
  let newCheckbox;
  let newArray = []
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

function setCheckboxes(array, htmlContainerId)
{
    let cardList = createCheckbox(array)
    console.log(cardList)
    let checkGroup = document.getElementById(htmlContainerId)
    checkGroup.innerHTML=cardList.join('')
}

// Eventos en checkboxes: previo, capturo el container de los checkboxes, para luego a los checkboxes y los convierto en un array. 
// En la función, por cada elemento este nuevo array escucho el evento "change". Si el evento ocurre, guardo en una variable un array resultante de filtrar la lista original de eventos, siempre que la categoría del evento sea igual al id del elemento que estoy iterando. Finalmente, invoco el método setCards.

// function filterByCheckbox(elementByListener, 
//                             originalEvents, htmlContainerId)
// {
//     elementByListener.forEach(element =>
//     {
//         element.addEventListener("change", ()=>
//         {
//             let selectedCards
//             if(element.checked)
//             {
//                 selectedCards = originalEvents.filter(event => event.category == element.id)
//                 setCards(selectedCards,  
//                         htmlContainerId)
//             }
//         })
//     })   
// }

function clasificPorCheckbox(array)
{
    let checkboxes = document.querySelectorAll("input[type='checkbox']")
    console.log(checkboxes)
    let checkboxList = Array.from(checkboxes)
    console.log(checkboxList)
    let chequeados = checkboxList.filter(element => element.checked)
    console.log(chequeados)
    let mapeado = chequeados.map(element => element.id.toLowerCase())
    console.log(mapeado)
    let eventosSeleccionados = array.filter(element => mapeado.includes(element.category.toLowerCase()))
    console.log(eventosSeleccionados)
    return eventosSeleccionados
}

let elementByListener = document.getElementById("checkboxes")

elementByListener.addEventListener("change", ()=>{
    let eventos = clasificPorCheckbox(allEvents)
    console.log(eventos)
    setCards(eventos, "cards-group")
})

//Evento en renglón de búsqueda
let formSearch = document.querySelector('input[type="search"]')
let button = document.querySelector('button[type="submit"]')
let filtrados = []

console.log(formSearch)
let selectedBySearch = [] //Array de eventos que coinciden con la búsqueda.
function filtrarPorTexto(array, text){
    let arrayFiltrado = array.filter(elemento => elemento.name.toLowerCase().includes(text.toLowerCase()))
    return arrayFiltrado
}

formSearch.addEventListener("keyup", ()=>{
    
    let arrayFiltrado = filtrarPorTexto(allEvents, formSearch.value)
    console.log(arrayFiltrado)
    button.addEventListener("mousedown", ()=>
    {
        let newArray = []
        let cardList = createCard(arrayFiltrado, newArray)
        let cardsGroup = document.getElementById("cards-group")
        cardsGroup.innerHTML=cardList.join('')
    })
})

//Renglón búsqueda
function searchByTxt(){
    
}






