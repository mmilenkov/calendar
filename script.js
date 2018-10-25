let today = new Date(); // Get current day
let currMonth = today.getMonth(); //Get current month
let currYear = today.getFullYear(); // get current year

//Variables to test
let cellID;
let events = [];
let base =
      {
        name:"none",
        id:"0",
        month: currMonth,
        start:"00:00",
        end:"23:59",
        loc:"none"
      };



let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]; // array of months so they can be added to the header

let monthAndYear = document.querySelector("#monthAndYear"); //select header
genCal(currMonth, currYear); // call calendar gen


function next() 
{
    currYear = (currMonth === 11) ? currYear + 1 : currYear; // change year if moving from dec to jan
    currMonth = (currMonth + 1) % 12; // moving between years
    genCal(currMonth, currYear); // call generator to redraw
}

function previous() 
{
    currYear = (currMonth === 0) ? currYear - 1 : currYear; // change year if moving from dec to jan
    currMonth = (currMonth === 0) ? 11 : currMonth - 1;// moving between years
    genCal(currMonth, currYear);// call generator to redraw
}

function genCal(month, year) 
{  
  genEventList(); // Needs to be moved. Generates again and again;
	let firstDay = (new Date(year, month)).getDay(); // find the first day of the selected month
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    /*
    Explanation, the function new Date(year, month, 32) 
    returns the 32nd day after the month started. If we subtract that date from 32, 
    we get the final day of that month. Example, If we pass feb 2018 as an argument, 
    its ‘32nd’ day will be 4th of march, subtract 32 from 4 and we get 28, 
    final day of the month of feb 2018.
    */

    let tbl = document.querySelector("#calBody"); // body of the calendar

    // clearing all previous cells from previous months if generated
    tbl.innerHTML = "";

    // Add Month and year to header
    monthAndYear.innerHTML = months[month] + " " + year;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) 
    {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with dates.
        for (let j = 0; j < 7; j++) 
        {
            if (i === 0 && j < firstDay) //Adding them in a bundle broke the code more than it worked
            {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) // stop the loop once enough is generated
            {
                break;
            }

            else 
            {
                let idTest = "d" + date;
                let cell = document.createElement("td");
                cell.id = idTest;
                cell.addEventListener("click",function(ev){
                cellID = ev.target.id; openEventScheduler(cellID)}); // Dynamically add event
              if(events[date].id != "0" && events[date].month == currMonth)
                {
                  cell.style.backgroundColor = "red";
                }
                let cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) 
                {
                    cell.classList.add("currentDay");
                } // color today's date
              
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }
        }
        tbl.appendChild(row); // appending each row into calendar body.
    }
printEvents();
}


function openEventScheduler ()
{
  let addEvtWin = document.querySelector(".eventWrap");
  addEvtWin.style.display = "block";
}


function addEvent() 
{
  let eventForm = document.querySelector("#addEvent");
  let submitEvent = document.querySelector("#submitEvent");
  let name = eventForm.name.value;
  let location = eventForm.loc.value;
  let startTime = eventForm.start.value;
  let endTime = eventForm.end.value;
  //Add any other required metadata
  
  let addEvtWin = document.querySelector(".eventWrap"); // to hide the window
  
  let testEvent = {};
  testEvent.id = cellID;
  testEvent.name = name;
  testEvent.location = location;
  testEvent.startTime = startTime;
  testEvent.endTime = endTime;
  testEvent.month = currMonth;
      
  addEvtWin.style.display = "none";
  
  genEvents(testEvent);
}

function genEvents (newEv)
{
 events[newEv.id.slice(1,newEv.id.length)]=newEv;
 
  //Experiment to save to localstorage
  
  
  genCal(currMonth, currYear);

}

/*remove magic numbers */

function printEvents()
{
  let sched = document.querySelector(".schedule");
  sched.innerHTML = ""; // Clear or you will print events multiple times when adding a new one
  
  for(let i=0; i<31; i++)
    {
      if(events[i].id != "0")
        {                
      let event = document.createElement("div"); 
          event.classList.add("newEvent");
          
          let remove = document.createElement("button");
          remove.id = ("x"+ events[i].id.slice(1,events[i].id.length));
          remove.innerText ="Remove";
          // Event listener to remove an event with the remove button
          remove.addEventListener("click",function(){
            this.parentNode.remove();
            events[remove.id.slice(1,remove.id.length)] = base;
            document.querySelector("#d"+remove.id.slice(1,remove.id.length)).style.backgroundColor= "#ced6e2";
          });
          
          let edit = document.createElement("button");
          edit.innerText = "Edit Event";
          edit.id = ("e"+ events[i].id.slice(1,events[i].id.length));
          edit.addEventListener("click",function()
                               {
           cellID = edit.id;
            document.querySelector(".editWrap").style.display="block";  
          });
          
          event.innerHTML = events[i].id.slice(1,events[i].id.length) + " " + months[events[i].month] + " " + currYear + "<br>Name: " + events[i].name + "<br>Location: " + events[i].location + "<br>Start time: " + events[i].startTime + "<br>End time: " +events[i].endTime + "<br>";
         event.appendChild(remove);
          event.appendChild(edit);
         sched.appendChild(event);
        }
    }
}


function genEventList()
{

  for (let i =0; i<31; i++)
    {
     events.push(base);
    } 
}


function editEvent() 
{
  let eventForm = document.querySelector("#editEvt");
  let submitEvent = document.querySelector("#editEvent");
  let name = eventForm.newName.value;
  let location = eventForm.newLoc.value;
  let startTime = eventForm.newStart.value;
  let endTime = eventForm.newEnd.value;
  //Add any other required metadata
  
  let addEvtWin = document.querySelector(".editWrap"); // to hide the window
  
  let testEvent = {};
  testEvent.id = cellID;
  testEvent.name = name;
  testEvent.location = location;
  testEvent.startTime = startTime;
  testEvent.endTime = endTime;
  testEvent.month = events[cellID.slice(1,cellID.length)].month;
      
  addEvtWin.style.display = "none";
  
  genEvents(testEvent);
}
