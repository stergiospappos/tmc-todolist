//Array with the tasks
//Function that will display all the current tasks
//Function that adds a  new task
//Read whats in the input
//After the button is clicked get the input and stored it in the array of all tasks (push)

let myTasks = []; //Here we will save all tasks
const tasksContainer = document.querySelector(".added-items"); //Here we find where to add new tasks as HTML elements
const submitButton = document.querySelector(".submit"); //Here we find the button that is responsible for submiting new tasks
// Create the HTML structure for the task item

function createTaskHTML(task) {
  return `
        <div class="single-item d-flex justify-content-between container-fluid">
            <label class="custom-checkbox d-flex justify-content-center gap-4">
                <input class="checkbox" type="checkbox" />
                <span class="custom-checkmark">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check">
                        <path d="M20 6 9 17l-5-5" />
                    </svg>
                </span>
                <p class="item-content task-${myTasks.length} h5">${task}</p>
            </label>

            <div class="icons d-flex justify-content-between gap-2">
                <span class="edit-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil">
                    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                    <path d="m15 5 4 4" />
                </svg>
                </span>
                <span class="delete-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2">
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                </svg>
                </span>
            </div>
        </div>
    `;
}

//Add a new task
submitButton.addEventListener("click", function () {
  const inputField = document.querySelector(".task-input"); // Select the input using its class
  const inputText = inputField.value.trim(); // Get the input value and trim whitespace

  if (inputText) {
    // Check if the input is not empty
    myTasks.push(inputText); // Add the task to the array
    inputField.value = ""; // Clear the input field
    tasksContainer.insertAdjacentHTML("beforeend", createTaskHTML(inputText));
    updateDOM();
  } else {
    alert("Please enter a task!"); // Alert if input is empty
  }
});

function updateDOM() {
  tasksContainer.addEventListener("click", (event) => {
    // Check if the clicked element is a delete button
    if (event.target.classList.contains("delete-btn")) {
      const btn = event.target; // Get the clicked button
      const currentTask = btn.closest(".single-item"); // Find the closest parent with the class .single-item
      if (currentTask) {
        tasksContainer.removeChild(currentTask); // Remove the task from the container
      }
    }
  });
}
