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

                setHtml(createCard(events, ""), "cards-group")

                let boxList = createCheckbox(definirCategorias(events))
                setHtml(boxList, "checkboxes")

                // Eventos

                boxContainer.addEventListener("change", ()=>{
                        crossFilter(events, formSearch.value, "")
                })

                // formSearch.addEventListener("keyup", ()=>{
                //         crossFilter(events, formSearch.value)
                // })

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

                events = clasificarUpcomingEvents(allEvents, dataBase.currentDate)

                setHtml(createCard(events,""), "cards-group")

                let boxList = createCheckbox(definirCategorias(events))
                setHtml(boxList, "checkboxes")

                
                boxContainer.addEventListener("change", ()=>{
                        crossFilter(events, formSearch.value, "")
                })

                // formSearch.addEventListener("keyup", ()=>{
                //         crossFilter(events, formSearch.value)
                // })

                searchButton.addEventListener("mousedown", ()=>{
                        crossFilter(events, formSearch.value, "")
                    })       
        }
}

