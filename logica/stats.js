let table = document.getElementById("table")

startStats()

async function startStats()
{
    try
    {
        let res = await fetch(url)
        let dataBase = await res.json()

        setRow(dataBase.events, dataBase.currentDate/*, "name", "assistance"*/)
        generarEstadisticas(dataBase.events/*, data.currentDate*/)

    }
    catch(error)
    {
        console.log(error)
    }
}

//FUNCIONES

function clasificarPastEvents(eventArray, currentDate) //Clasifico los eventos pasados.
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

// function getMaxAndLowAttendance(eventArray, currentDate) //Tomo el array de eventos pasados y los ordeno de mayor a menor según la asistencia.
// {   
//     let events = Array.from(clasificarPastEvents(eventArray, currentDate))
//     let assitOrdenado = events.sort((a,b)=> b.assistance - a.assistance)
//     let highestAssitance = assitOrdenado[0]
//     console.log(highestAssitance)
//     return highestAssitance.name
// }

function getHighAndLowStates(events/*, attr1, attr2*/, i) //Tomo el array de eventos, los ordeno de mayor a menor según el atributo y selecciono el índice que me interese.
{   
    let percentage = []
    events.map((element)=>
    {
        let percentageInd 
        element = [element.name, (element.assistance / element.capacity*100).toFixed(2), percentageInd] 
        percentage.push(element)
        console.log(element)
    } )
    console.log(percentage)
    let assitOrdenado = percentage.sort((a,b) => b - a)
    let highestAssitance = assitOrdenado[i]
    return highestAssitance
}

function printTd1 (row, i, txt) // Inserto una fila, tres columnas y agrego el TextNode que consiste en determinados elementos de un array.
{
    let pastStats = table.insertRow(row)
    let col1 = pastStats.insertCell(0)
    let col2 = pastStats.insertCell(1)
    let col3 = pastStats.insertCell(2)
    col1.appendChild(document.createTextNode(txt[i]))
    col2.appendChild(document.createTextNode(txt[i+1]))
    col3.appendChild(document.createTextNode(txt[i+2]))
}


// setRow(data.events, data.currentDate, "name")


// function setRow(eventArray, currentDate, attribute)
// {
//     let row = []
//     let events = Array.from(clasificarPastEvents(eventArray, currentDate))
//     let highAssistance = getHighAndLowStates(events, "assistance", 0)
//     let lowAssisntance = getHighAndLowStates(events, "assistance", events.length-1)
//     let hightCapacity = getHighAndLowStates(events, "capacity", 0)
//     row.push(highAssistance[attribute] ,lowAssisntance[attribute] , hightCapacity[attribute])
//     printTd(2, 0, row)
// }

function setRow(eventArray, currentDate/*, attrName, attrStats*/) // Sólo para los stats hight y low, tomo los eventos clasificados, selecciono los atributos del índice indicado, los agrego an un array que es impreso en pantalla.
{
    let row = []
    let events = Array.from(clasificarPastEvents(eventArray, currentDate))
    let highAssistance = getHighAndLowStates(events, "assistance", "capacity", 0)
    let lowAssisntance = getHighAndLowStates(events, "assistance", "capacity", events.length-1)
    let hightCapacity = getHighAndLowStates(events, "capacity", "", 0)
    let col1 = (highAssistance.assistance / highAssistance.capacity) * 100
    let col2 = (lowAssisntance.assistance / lowAssisntance.capacity) * 100
    console.log(col1.toFixed(2))
    row.push(`${highAssistance.name}: ${col1.toFixed(2)}%`,
            `${lowAssisntance.name}: ${col2.toFixed(2)}%`, 
            `${hightCapacity.name}: `+ hightCapacity.capacity)
    printTd1(2, 0, row)
}

clasificarPorCategoría(data.events)

function clasificarPorCategoría(allEvents) // Genero una matriz de eventos según su categoría.
{
    let categorias = definirCategorias(allEvents)
    let arrayDeListas = []
    for(let i=0; i<categorias.length; i++)
    {
        let arrayDeCategorias = []
        for(let j=0; j<allEvents.length; j++)
        {
            if(allEvents[j].category == categorias[i])
            {
                arrayDeCategorias.push(allEvents[j])
            }
        }
        arrayDeListas.push(arrayDeCategorias)
    }
        // console.log([arrayDeListas])
        return arrayDeListas
}


function sumarAll(total, num)
{
    total + num
    return total
}

function generarEstadisticas(eventos, currentDate)
{
    let stats = {}
    let pastEvents = clasificarPastEvents(eventos, currentDate)
    let arrayDeListas = clasificarPorCategoría(eventos)

    for(let i=0; i<arrayDeListas.length; i++)
    {
        for(let j=0; j<arrayDeListas[i].length; j++)
        {
            let totalSuma
            // console.log(arrayDeListas[i][j])
            // console.log(data.currentDate)
            let attr = arrayDeListas[i][j].assistance
            arrayDeListas[i].reduce(totalSuma,  (sumarAll(totalSuma, attr)))
        }
        console.log(totalSuma)

    }
}



