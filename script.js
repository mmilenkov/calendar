let today = new Date();
let currMonth = today.getMonth();
let currYear = today.getFullYear();

let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthAndYear = document.querySelector("#monthAndYear");
showCalendar(currMonth, currYear);


function next() {
    currYear = (currMonth === 11) ? currYear + 1 : currYear;
    currMonth = (currMonth + 1) % 12;
    showCalendar(currMonth, currYear);
}

function previous() {
    currYear = (currMonth === 0) ? currYear - 1 : currYear;
    currMonth = (currMonth === 0) ? 11 : currMonth - 1;
    showCalendar(currMonth, currYear);
}

function showCalendar(month, year) {
	
	let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    /*
    Explanation, the function new Date(year, month, 32) 
    returns the 32nd day after the month started. If we subtract that date from 32, 
    we get the final day of that month. Example, If we pass feb 2018 as an argument, 
    its ‘32nd’ day will be 4th of march, subtract 32 from 4 and we get 28, 
    final day of the month of feb 2018.
    */

    let tbl = document.querySelector("#calBody"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // Add Month and year
    monthAndYear.innerHTML = months[month] + " " + year;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
                let cell = document.createElement("td");
                let cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("currentDay");
                } // color today's date
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.
    }

}