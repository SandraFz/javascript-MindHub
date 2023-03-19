startUpcoming()

async function startUpcoming()
{
        try
        {
                const res = await fetch(url)
                dataBase = await res.json()
                allEvents = dataBase.events

                // Invocaciones

                events = clasificarUpcomingEvents(allEvents, dataBase.currentDate)
                // events = clasificarEventos3(dataBase, "upcoming")


                setHtml(createCard(events), "cards-group")

                let boxList = createCheckbox(filterCategories(events))
                setHtml(boxList, "checkboxes")

                // Eventos

                // boxContainer.addEventListener("change", ()=>{
                //         crossFilter(events, formSearch.value)
                // })

                // formSearch.addEventListener("keyup", ()=>{
                //         crossFilter(events, formSearch.value)
                // })

                // searchButton.addEventListener("mousedown", ()=>{
                //         crossFilter(events, formSearch.value)
                //     })            
        }
        catch(error)
        {
                console.log(error)
        }
}

