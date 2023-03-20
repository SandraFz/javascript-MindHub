let table = document.getElementById("table")

startStats()

async function startStats()
{
    try
    {
        let res = await fetch(url)
        let dataBase = await res.json()

        setRowHightAndLow(dataBase.events, dataBase.currentDate, 3, 1)
        // generarEstadisticas(dataBase.events, dataBase.currentDate)
        printMatriz(generarEstadisticas(clasificarPastEvents(dataBase.events, dataBase.currentDate)), 9)
        printMatriz(generarEstadisticas(clasificarUpcomingEvents(dataBase.events, dataBase.currentDate)), 6)
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

function calcularEstadisticasPorEvento(events/*, dividendo, divisor, i*/) //Tomo el array de eventos, los ordeno de mayor a menor según el atributo y selecciono el índice que me interese.
{   
    let percentage = []
    events.map((element)=>
    {
        element = [element.name, element.capacity, element.assistance * element.price, parseFloat((element.assistance / element.capacity*100).toFixed(2))] 
        percentage.push(element)
    } )
    // console.log(percentage)
    // let arrayOrdenado = percentage.sort((a,b) => b - a)
    // let highestAssitance = assitOrdenado[i]
    // return highestAssitance
    return percentage
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

function setRowHightAndLow(eventArray, currentDate, attr1, attr2) // Sólo para los stats hight y low, tomo los eventos clasificados, selecciono los atributos del índice indicado, los agrego an un array que es impreso en pantalla.
{
    let row = []
    let events = Array.from(clasificarPastEvents(eventArray, currentDate))
    let highAssistance = calcularEstadisticasPorEvento(events, /*"assistance", "capacity", 0*/)
    highAssistance.sort((a,b) => b[attr1]-a[attr1])
    let col1 = highAssistance[0]
    let col2 = highAssistance[highAssistance.length-1]
    let col3 = (highAssistance.sort((a,b) => b[attr2] - a[attr2]))[0]
    row.push(`${col1[0]}: ${col1[3]}%`,
            `${col2[0]}: ${col2[3]}%`, 
            `${col3[0]}: `+ col3[1])
    printTd1(2, 0, row)
}

// clasificarPorCategoría(data.events)

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

// function generarEstadisticas(eventos, currentDate)
// {
//     let stats = {}
//     let pastEvents = clasificarPastEvents(eventos, currentDate)
//     // console.log(pastEvents)
//     let arrayDeListas = clasificarPorCategoría(pastEvents)
//     // console.log(arrayDeListas)
//     let totalSuma

//     for(let i=0; i<arrayDeListas.length; i++)
//     {
//         for(let j=0; j<arrayDeListas[i].length; j++)
//         {
//             // console.log(arrayDeListas[i][j])
//             // console.log(data.currentDate)
//             let attr = arrayDeListas[i][j].assistance
//             // console.log(typeof attr)
//             // arrayDeListas[i].forEach(element => {
//                 let revenues = arrayDeListas[i][j].price * arrayDeListas[i][j].assistance
//                 // totalSuma = arrayDeListas[i][j].assistance + arrayDeListas[i][j++].assistance
//                 return revenues
//             // })
            
//         }
//         console.log(revenues)

        

//     }
// }


function generarEstadisticas(eventosPorTemporadaFunction) // Por cada evento de cada categoría calculo las estadísticas, las agrego en arrays diferentes y las reduzco. Después les asigno a la propiedad correspondiente de un nuevo objeto, y cada objeto es pusheado a un nuevo array.
{
    let tempEvents = eventosPorTemporadaFunction
    let arrayDeListas = clasificarPorCategoría(tempEvents)
    let eventStats = []

    for(let i=0; i<arrayDeListas.length; i++)
    {
        let category = {
            categoryName:"",
            revenues:0,
            attendance:0
        }
        let revenues = []
        let attendance = []
        for(let j=0; j<arrayDeListas[i].length; j++)
        {
            // let r = arrayDeListas[i][j].price * arrayDeListas[i][j].assistance
            // revenues.push(r)
            // let a = arrayDeListas[i][j].assistance / arrayDeListas[i][j].capacity*100
            // attendance.push(a)


            

            if(arrayDeListas[i][j].date < dataBase.currentDate)
            {
                let r = arrayDeListas[i][j].price * arrayDeListas[i][j].assistance
                revenues.push(r)
                let a = arrayDeListas[i][j].assistance / arrayDeListas[i][j].capacity*100
                attendance.push(a)
                console.log(attendance)
            }
            else
            {
                let r = arrayDeListas[i][j].price * arrayDeListas[i][j].estimate
                revenues.push(r)
                let a = arrayDeListas[i][j].estimate / arrayDeListas[i][j].capacity*100
            attendance.push(a)
            // console.log(e)
            }
            // let a = arrayDeListas[i][j].assistance / arrayDeListas[i][j].capacity*100
            // attendance.push(a)
        }
        category.categoryName = arrayDeListas[i][0].category
        category.revenues = revenues.reduce((a,b)=>a+b)
        category.attendance = ((attendance.reduce((a,b)=>a+b))/attendance.length).toFixed(2)
        eventStats.push(category)
    }
    return eventStats
}


function printMatriz(eventStats, i_row)
{
    let statsList = eventStats
    for(let i=0; i<statsList.length; i++)
    {
        let row = []
        // console.log(statsList)
        row.push(statsList[i].categoryName, statsList[i].revenues, `${statsList[i].attendance}%`)
        // console.log(row)
        printTd1(i_row, 0, row) //Past: Row = row[0] 1 + encabezados 2*3 + primeraLínea 1 + upcoming * upcoming.lenght
    }
}

// function printUpcomingEvents(eventosPorTemporadaFunction, i_row)
// {
//     let eventStats = generarEstadisticas(eventosPorTemporadaFunction)
//     printMatriz(eventStats, i_row)
// }

