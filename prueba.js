let table = document.getElementById("table")

// clasificarPastEvents(data.events, data.currentDate)
// detectarMax(data.events, data.currentDate)
// getMaxAndLowAttendance(data.events, data.currentDate, 0)
// getHighAndLowStates(data.events, data.currentDate, "assistance", 0)

// printTable(2, 0, "Esto es agregado desde js")

//FUNCIONES

function clasificarPastEvents(eventArray, currentDate)
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

function getMaxAndLowAttendance(eventArray, currentDate)
{   
    let events = Array.from(clasificarPastEvents(eventArray, currentDate))
    let assitOrdenado = events.sort((a,b)=> b.assistance - a.assistance)
    let highestAssitance = assitOrdenado[0]
    console.log(highestAssitance)
    return highestAssitance.name
}

function getHighAndLowStates(events, attribute, i)
{   
    let assitOrdenado = events.sort((a,b)=> b[attribute] - a[attribute])
    let highestAssitance = assitOrdenado[i]
    return highestAssitance
}

function printTd (row, i, txt)
{
    let pastStats = table.insertRow(row)
    let col1 = pastStats.insertCell(0)
    let col2 = pastStats.insertCell(1)
    let col3 = pastStats.insertCell(2)
    col1.appendChild(document.createTextNode(txt[i]))
    col2.appendChild(document.createTextNode(txt[i+1]))
    col3.appendChild(document.createTextNode(txt[i+2]))
}

setRow(data.events, data.currentDate, "name")
setRow(data.events, data.currentDate, "assistance")


function setRow(eventArray, currentDate, attribute)
{
    let row = []
    let events = Array.from(clasificarPastEvents(eventArray, currentDate))
    let highAssistance = getHighAndLowStates(events, "assistance", 0)
    let lowAssisntance = getHighAndLowStates(events, "assistance", events.length-1)
    let hightCapacity = getHighAndLowStates(events, "capacity", 0)
    row.push(highAssistance[attribute] ,lowAssisntance[attribute] , hightCapacity[attribute])
    printTd(2, 0, row)
}


