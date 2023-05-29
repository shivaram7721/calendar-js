const monthSelect = document.getElementById("month");
const yearSelect = document.getElementById("year");
const calendarBody = document.querySelector("#calendar tbody");
const dateInput = document.getElementById("date-input");
const enterDate = document.getElementById('enter-date');

const currentYear = new Date().getFullYear();
const yearRange = 30; // Number of years to display in the dropdown
const startYear = currentYear - yearRange;
for (let i = startYear; i <= currentYear; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = i;
  yearSelect.appendChild(option);
}

monthSelect.addEventListener("change", generateCalendar);
yearSelect.addEventListener("change", generateCalendar);
dateInput.addEventListener("keydown", handleDateInput);
enterDate.addEventListener('click',handleDate);

generateCalendar();


function generateCalendar() {

  calendarBody.innerHTML = "";


  const month = parseInt(monthSelect.value) - 1; // JavaScript months are 0-based
  const year = parseInt(yearSelect.value);


  const date = new Date(year, month);

  // Get the number of days in the selected month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Get the day of the week for the first day of the month
  const startDay = date.getDay();

  // Generate calendar cells
  let dateCount = 1;
  for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");

    for (let j = 0; j < 7; j++) {
      const cell = document.createElement("td");

      // Check if it's time to stop generating cells
      if (i === 0 && j < startDay) {
        // Empty cell before the start day of the month
        cell.textContent = "";
      } else if (dateCount > daysInMonth) {
        // Empty cell after the last day of the month
        cell.textContent = "";
      } else {

        cell.textContent = dateCount;
        dateCount++;

        cell.addEventListener("click", toggleCellBackground);
      }

      row.appendChild(cell);
    }

    calendarBody.appendChild(row);
  }
}


function handleDateInput(event) {
  if (event.key === "Enter") {
    const date = parseInt(dateInput.value);
    if (!isNaN(date) && date >= 1 && date <= 31) {
      const cells = document.querySelectorAll("#calendar td");
      cells.forEach((cell) => {
        const cellDate = parseInt(cell.textContent);
        if (!isNaN(cellDate) && cellDate === date) {
          cell.classList.toggle("green-background");
        }
      });
      dateInput.value = "";
    }
  }
}


function toggleCellBackground(event) {
  event.target.classList.toggle("green-background");
}

function handleDate(event){
  const date = parseInt(dateInput.value);
    if (!isNaN(date) && date >= 1 && date <= 31) {
      const cells = document.querySelectorAll("#calendar td");
      cells.forEach((cell) => {
        const cellDate = parseInt(cell.textContent);
        if (!isNaN(cellDate) && cellDate === date) {
          cell.classList.toggle("green-background");
        }
      });
      dateInput.value = "";
    }

}