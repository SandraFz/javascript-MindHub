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
                // events = clasificarEventos3(dataBase, "upcoming")

                setHtml(createCard(events), "cards-group")

                let boxList = createCheckbox(filterCategories(events))
                setHtml(boxList, "checkboxes")
        }
        catch(error)
        {
                console.log(error)
        }
}
