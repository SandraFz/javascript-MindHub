///// VARIABLES /////

let url = "https://mindhub-xj03.onrender.com/api/amazing"
let dataBase
let events
let formSearch = document.querySelector('input[type="search"]')
let boxContainer = document.getElementById("checkboxes")
let searchButton = document.querySelector('button[type="submit"]')


///// INVOCACIONES /////

startHome()

///// FUNCIONES ASYNC /////

async function startHome()
{
    try
    {
        const res = await fetch(url)
        dataBase = await res.json()
        events = dataBase.events
 
        // Invocaciones

        setHtml(createCard(events), "cards-group")

        let boxList = createCheckbox(filterCategories(events))
        setHtml(boxList, "checkboxes")

        //Eventos

        boxContainer.addEventListener("change", ()=>{
            crossFilter(events, formSearch.value)
        })

        // formSearch.addEventListener("keyup", ()=>{
        //     crossFilter(events, formSearch.value)
        // })

        searchButton.addEventListener("mousedown", ()=>{
            crossFilter(events, formSearch.value)
        })
    }
    catch(error){console.log(error)}
}

///// FUNCIONES SINCRÓNICAS /////

// Inyecta los datos en el elemento card html
function createCard(eventArray)
{
    let newCard;
    let newArray = []
    for(const element of eventArray)
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

// Envía los elementos html creados (cards o checkboxes) a sus contenedores

function setHtml(htmlList, htmlContainerId)
{
    let elementGroup = document.getElementById(htmlContainerId)
    elementGroup.innerHTML=htmlList.join('')
}

// Se crea un array con las categorías, sin repetir.

function filterCategories(eventArray)
{
    let allCategories = []
    let filteredCategories = []

    for(let event of eventArray)
    {
        allCategories.push(event.category)
    }

    allCategories.sort()

    for(let i=0; i<allCategories.length; i++)
    {
        if(allCategories[i]!= allCategories[i+1])
        {
            filteredCategories.push(allCategories[i])
        }
    }
    return filteredCategories
}

// Se inyecta los datos en el elemento html checkbox.

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

// Se filtra las cards según los checbox selaccionados

function filterByCheckbox(array)
{
    let checkboxes = document.querySelectorAll("input[type='checkbox']")
    let checkboxList = Array.from(checkboxes)
    let chequeados = checkboxList.filter(element => element.checked)
    if(chequeados.length == 0){return array}
    let mapeado = chequeados.map(element => element.id.toLowerCase())
    let eventosSeleccionados = array.filter(element => mapeado.includes(element.category.toLowerCase()))
    return eventosSeleccionados
}

// Se filtra las cards por el nombre en el input

function searchByTxt(array, text){
    let arrayFiltrado = array.filter(elemento => elemento.name.toLowerCase().includes(text.toLowerCase()))
    if(arrayFiltrado.length == 0){
        alert("No hay coincidencias")
        return
    }
    return arrayFiltrado
}

// Filtro cruzado

function crossFilter(array, input){
    let checkbox = filterByCheckbox(array)
    let searchInput = searchByTxt(checkbox, input)

    setHtml(createCard(searchInput), "cards-group")
}

// Clasificación de eventos según fecha

function clasificarUpcomingEvents(eventArray, currentDate)
{
    let newArray = []
    eventArray.forEach(element => 
    {
        if(element.date >= currentDate){
            newArray.push(element)
        }
    })
    return newArray
}

function clasificarPastEvents(eventArray, currentDate)
{
    let newArray = []
    eventArray.forEach(element => 
    {
        if(element.date < currentDate){
            newArray.push(element)
        }
    })
    return newArray
}

// function clasificarEventos1(objeto, temporada)
// {
//     let newArray = []
//     switch(temporada)
//     {
//         case "past":
            
//             for(const eventItem of objeto.events)
//             {
//                 if(eventItem.date < objeto.events.date)
//                 {
//                     return newArray.push(eventItem)
//                 }
//             }
//             break
//         case "upcoming":
//             for(const eventItem of objeto.events)
//             {
//                 if(eventItem.date <= objeto.events.date)
//                 {
//                     return newArray.push(eventItem)
//                 }
//             }
//             break
//     }
// }

// function clasificarEventos2(objeto, temporada)
// {
//     let newArray = []
//     for(const eventItem of objeto.events)
//     {
//         switch(temporada)
//         {
//             case "past":
//                 if(eventItem.date < objeto.events.date)
//                 { 
//                     return newArray.push(eventItem)
//                 }
//                 break
//             case "upcoming":
//                 if(eventItem.date >= objeto.events.date)
//                 {
//                     return newArray.push(eventItem)
//                 }
//                 break
//         }
//     }
// }

// function clasificarEventos3(objeto, temporada)
// {
//     let newArray = []
//     let pastEvents = []
//     let upcomingEvents = []
//     objeto.events.forEach(element => {
//         switch(temporada)
//         {
//             case "past":
//                 if(element.date < objeto.currentDate)
//                 { 
//                     pastEvents.push(element)
//                     return pastEvents
//                 }
//                 break
//             case "upcoming":
//                 if(element.date >= objeto.currentDate)
//                 {
//                     upcomingEvents.push(element)
//                     return upcomingEvents
//                 }
//                 break
//         }
//     });
    // newArray = Math.max(pastEvents.length, upcomingEvents.length)
    // console.log(newArray)
    // return newArray
// }




