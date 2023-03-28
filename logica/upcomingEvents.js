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
            
                formSearch.addEventListener("keyup", ()=>{
                        crossFilter(events, formSearch.value, "")
                
                        let txt = searchByTxt(events, formSearch.value)
                        setHtml(createCard(txt, ""), "cards-group")
                })
        
                formSearch.addEventListener("reset", (e)=>{
                        crossFilter(events, formSearch.value, "")
                        console.log("Funciona el reset!")
                })
        
        
                modalButton.addEventListener("click", ()=>{
                        closeModal()
                        crossFilter(events, formSearch.value, "")
                })
        
                xButton.addEventListener("click", ()=>{
                        formSearch.value=""
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
            
                formSearch.addEventListener("keyup", ()=>{
                        crossFilter(events, formSearch.value, "")
                
                        let txt = searchByTxt(events, formSearch.value)
                        setHtml(createCard(txt, ""), "cards-group")
                })
        
                formSearch.addEventListener("reset", (e)=>{
                        crossFilter(events, formSearch.value, "")
                        console.log("Funciona el reset!")
                })
        
        
                modalButton.addEventListener("click", ()=>{
                        closeModal()
                        crossFilter(events, formSearch.value, "")
                })
        
                xButton.addEventListener("click", ()=>{
                        formSearch.value=""
                        crossFilter(events, formSearch.value, "")
                })              
        }
}

