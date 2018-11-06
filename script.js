let today = new Date();
let currMonth = today.getMonth();
let currYear = today.getFullYear();
let cellID;
let events = [];
let base = {
    name: "none",
    id: "0",
    month: currMonth,
    start: "00:00",
    end: "23:59",
    loc: "none"
};
let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
let monthAndYear = document.querySelector("#monthAndYear");
let monthEvents = document.querySelector("#eventListMonth");
document.querySelector("#cancelEdit").addEventListener("click", function() {document.querySelector(".editWrap").style.display = "none";});
document.querySelector("#cancelAdd").addEventListener("click", function() {document.querySelector(".eventWrap").style.display = "none";});
genEventList();
genCal(currMonth, currYear);

function next() {
    currYear = (currMonth === 11) ? currYear + 1 : currYear;
    currMonth = (currMonth + 1) % 12;
    genCal(currMonth, currYear);
}

function previous() {
    currYear = (currMonth === 0) ? currYear - 1 : currYear;
    currMonth = (currMonth === 0) ? 11 : currMonth - 1;
    genCal(currMonth, currYear);
}

function genCal(month, year) {
    let firstDay = (new Date(year,month)).getDay();
    let daysInMonth = 32 - new Date(year,month,32).getDate();
    let tbl = document.querySelector("#calBody");
    tbl.innerHTML = "";
    monthAndYear.innerHTML = months[month] + " " + year;
    monthEvents.innerHTML = months[month];
    let date = 1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth) {
                break;
            }
            else {
                let idTest = "d" + date;
                let cell = document.createElement("td");
                cell.id = idTest;
                cell.addEventListener("click", function(ev) {cellID = ev.target.id;openEventScheduler(cellID)});
                if (events[date].id != "0" && events[date].month == currMonth) {
                    cell.style.backgroundColor = "red";
                }
                let cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("currentDay");
                }
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }
        }
        tbl.appendChild(row);
    }
    printEvents(month);
}

function openEventScheduler() {
    let addEvtWin = document.querySelector(".eventWrap");
    addEvtWin.style.display = "block";
}

function addEvent() {
    let eventForm = document.querySelector("#addEvent");
    let submitEvent = document.querySelector("#submitEvent");
    let addEvtWin = document.querySelector(".eventWrap");
    let testEvent = {};
    genNewEventObject(testEvent, eventForm)
    testEvent.month = currMonth;
    addEvtWin.style.display = "none";

    genEvents(testEvent);
}

function editEvent() {
    let eventForm = document.querySelector("#editEvt");
    let submitEvent = document.querySelector("#editEvent");
    let addEvtWin = document.querySelector(".editWrap");
    let testEvent = {};
    genNewEventObject(testEvent, eventForm)
    testEvent.month = events[cellID.slice(1, cellID.length)].month;
    addEvtWin.style.display = "none";

    genEvents(testEvent);
}

function genNewEventObject(testEvent, eventForm) {
    testEvent.id = cellID;
    testEvent.name = eventForm.name.value;
    testEvent.location = eventForm.loc.value;
    testEvent.startTime = eventForm.start.value;
    testEvent.endTime = eventForm.end.value;

    return testEvent;
}

function genEvents(newEv) {
    events[newEv.id.slice(1, newEv.id.length)] = newEv;
    genCal(currMonth, currYear);
}

function printEvents(month) {
    let sched = document.querySelector(".schedule");
    sched.innerHTML = "";

    for (let i = 0; i <= 31; i++) {
        if (events[i].id != "0" && events[i].month == month) {
            let event = document.createElement("div");
            event.classList.add("newEvent");

            let remove = document.createElement("button");
            remove.id = ("x" + events[i].id.slice(1, events[i].id.length));
            remove.innerText = "Remove";
            remove.addEventListener("click", function() {
                this.parentNode.remove();
                events[remove.id.slice(1, remove.id.length)] = base;
                document.querySelector("#d" + remove.id.slice(1, remove.id.length)).style.backgroundColor = "#ced6e2";
            });

            let edit = document.createElement("button");
            edit.innerText = "Edit Event";
            edit.id = ("e" + events[i].id.slice(1, events[i].id.length));
            edit.addEventListener("click", function() {
                cellID = edit.id;
                document.querySelector(".editWrap").style.display = "block";
            });

            event.innerHTML = events[i].id.slice(1, events[i].id.length) + " " + months[events[i].month] + " " + currYear + "<br>Name: " + events[i].name + "<br>Location: " + events[i].location + "<br>Start time: " + events[i].startTime + "<br>End time: " + events[i].endTime + "<br>";
            event.appendChild(remove);
            event.appendChild(edit);
            sched.appendChild(event);
        }
    }
}

function genEventList() {
    for (let i = 0; i <= 31; i++) {
        events.push(base);
    }
}
