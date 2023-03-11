let allCategoriesByUpcoming=[]
let upcomingCategories=[]
let upcomingCheckboxes=[]

setCards(upcomingEvents, 
        upcomingEventsCards, 
        "cards-group")

filterCategories(upcomingEvents, 
                allCategoriesByUpcoming, 
                upcomingCategories)

setCheckboxes(upcomingCategories, 
            upcomingCheckboxes, 
            "checkboxes")

//Eventos en checkboxes

let padreUpcoming = document.getElementById("checkboxes")
let divContainerCheckUpcoming = padreUpcoming.querySelectorAll('input')
let newAOfChildUpcoming = Array.from(divContainerCheckUpcoming)
let selectedCardsFilteredUpcoming = []

console.log(upcomingEvents)

filteredByCheckbox(newAOfChildUpcoming, 
                upcomingEvents, 
                selectedCardsFilteredUpcoming, 
                "cards-group")


