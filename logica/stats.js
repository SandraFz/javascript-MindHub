let table = document.getElementById("table")

startStats()

async function startStats()
{
    try
    {
        let res = await fetch(url)
        let dataBase = await res.json()

        let upE = clasificarUpcomingEvents(dataBase.events, dataBase.currentDate)
        let catLength = definirCategorias(upE).length

        setRowHightAndLow(dataBase.events, dataBase.currentDate, 1, 1)
        printMatriz(generarEstadisticas(clasificarPastEvents(dataBase.events, dataBase.currentDate), dataBase), 3+catLength)
        printMatriz(generarEstadisticas(clasificarUpcomingEvents(dataBase.events, dataBase.currentDate), dataBase), 6)


        // setRowHightAndLow(dataBase.events, dataBase.currentDate, 3, 1)
        // printMatriz(generarEstadisticas(clasificarPastEvents(dataBase.events, dataBase.currentDate), dataBase), 9)
        // printMatriz(generarEstadisticas(clasificarUpcomingEvents(dataBase.events, dataBase.currentDate), dataBase), 6)
    }
    catch(error)
    {
        console.log(error)
        let res = await fetch("../service/bd.json")
        let dataBase = await res.json()

        let upE = clasificarUpcomingEvents(dataBase.events, dataBase.currentDate)
        let catLength = definirCategorias(upE).length

        setRowHightAndLow(dataBase.events, dataBase.currentDate, 3, 1)
        printMatriz(generarEstadisticas(clasificarPastEvents(dataBase.events, dataBase.currentDate), dataBase), 3+catLength)
        printMatriz(generarEstadisticas(clasificarUpcomingEvents(dataBase.events, dataBase.currentDate), dataBase), 6)
    }
}

//FUNCIONES

function calcularEstadisticasPorEvento(events/*, dividendo, divisor, i*/) //Tomo el array de eventos, los ordeno de mayor a menor según el atributo y selecciono el índice que me interese.
{   
    let percentage = []
    events.map((element)=>
    {
        element = [element.name, element.capacity, element.assistance * element.price, parseFloat((element.assistance / element.capacity*100).toFixed(2))] 
        percentage.push(element)
    } )
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
        return arrayDeListas
}


function sumarAll(total, num)
{
    total + num
    return total
}

function generarEstadisticas(eventosPorTemporadaFunction, obj) // Por cada evento de cada categoría calculo las estadísticas, las agrego en arrays diferentes y las reduzco. Después les asigno a la propiedad correspondiente de un nuevo objeto, y cada objeto es pusheado a un nuevo array.
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
            if(arrayDeListas[i][j].date < obj.currentDate)
            {
                let r = arrayDeListas[i][j].price * arrayDeListas[i][j].assistance
                revenues.push(r)
                let a = arrayDeListas[i][j].assistance / arrayDeListas[i][j].capacity*100
                attendance.push(a)
            }
            else
            {
                let r = arrayDeListas[i][j].price * arrayDeListas[i][j].estimate
                revenues.push(r)
                let a = arrayDeListas[i][j].estimate / arrayDeListas[i][j].capacity*100
            attendance.push(a)
            }
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
    let statsList = eventStats.sort((a, b)=> 
    {
        if (a.categoryName < b.categoryName) {
            return 1;
          }
          if (a.categoryName > b.categoryName) {
            return -1;
          }
          return 0;
    })
    for(let i=0; i<statsList.length; i++)
    {
        let row = []
        row.push(statsList[i].categoryName, statsList[i].revenues, `${statsList[i].attendance}%`)
        printTd1(i_row, 0, row) //Past: i_row = 3 th + categoriasUpcoming.lenght
    }
}

