// let boxContainer = document.getElementById("checkboxes")
// let searchButton = document.querySelector('button[type="submit"]')


startPast()

async function startPast()
{
        try
        {
                const res = await fetch(url)
                dataBase = await res.json()
                allEvents = dataBase.events

                // Invocaciones

                events = clasificarPastEvents(allEvents, dataBase.currentDate)

                setHtml(createCard(events, ""), "cards-group")

                let boxList = createCheckbox(filterCategories(events))
                setHtml(boxList, "checkboxes")

                //Eventos

                boxContainer.addEventListener("change", ()=>{
                crossFilter(events, formSearch.value, "")
            })
    
                searchButton.addEventListener("mousedown", ()=>{
                crossFilter(events, formSearch.value, "")
            })
        }
        catch(error)
        {
                console.log(error)
                const res = await fetch("../service/bd.json")
                dataBase = await res.json()
                allEvents = dataBase.events

                // Invocaciones

                events = clasificarPastEvents(allEvents, dataBase.currentDate)

                setHtml(createCard(events, ""), "cards-group")

                let boxList = createCheckbox(definirCategorias(events))
                setHtml(boxList, "checkboxes")

                //Eventos

                boxContainer.addEventListener("change", ()=>{
                crossFilter(events, formSearch.value, "")
            })
    
            searchButton.addEventListener("mousedown", ()=>{
                crossFilter(events, formSearch.value, "")
            })

        }
}
