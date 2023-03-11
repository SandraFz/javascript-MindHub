let allCategoriesByPast=[]
let pastCategories=[]
let pastChackboxes=[]

setCards(pastEvents, 
        pastEventsCards, 
        "cards-group")

filterCategories(pastEvents, 
                allCategoriesByPast, 
                pastCategories)

setCheckboxes(pastCategories, 
            pastChackboxes, 
            "checkboxes")

//Eventos en checkboxes

let pastFather = document.getElementById("checkboxes")
let pastContainerCheck = pastFather.querySelectorAll('input')
let pastNewChild = Array.from(pastContainerCheck)
let pastSelectedCardsFiltered = []

console.log(upcomingEvents)

filteredByCheckbox(pastNewChild, 
                pastEvents, 
                pastSelectedCardsFiltered, 
                "cards-group")
