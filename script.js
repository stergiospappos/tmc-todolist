let myTasks = []; // Here we will save all tasks
const tasksContainer = document.querySelector(".added-items"); // Here we find where to add new tasks as HTML elements
const submitButton = document.querySelector(".submit"); // Here we find the button that is responsible for submiting new tasks

// Create the HTML structure for the task item
function createTaskHTML(task, index) {
  return `
        <div class="single-item d-flex justify-content-between container-fluid" data-index="${index}">
            <label class="custom-checkbox d-flex justify-content-center gap-4">
                <input class="checkbox" type="checkbox" />
                <span class="custom-checkmark">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check">
                        <path d="M20 6 9 17l-5-5" />
                    </svg>
                </span>
                <p class="item-content task-${index} h5">${task}</p>
            </label>

            <div class="icons d-flex justify-content-between gap-2">
                <button class="edit-btn"
                data-bs-toggle="modal"
            data-bs-target="#editModal">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil">
                    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                    <path d="m15 5 4 4" />
                </svg>
                
                </button>
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
    myTasks.push({ name: inputText, id: Math.random(5, 4) }); // Add the task to the array
    inputField.value = ""; // Clear the input field
    tasksContainer.insertAdjacentHTML(
      "beforeend",
      createTaskHTML(inputText, myTasks.length - 1)
    ); // Pass the index of the task
    deleteTask(); // Attach event listeners for delete buttons
    editTask(); //Attach event listeners for edit buttons
  } else {
    alert("Please enter a task!"); // Alert if input is empty
  }
  console.log(myTasks);
});

// Remove task
function deleteTask() {
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const taskElement = this.closest(".single-item"); // Find the closest parent task element
      const taskIndex = taskElement.getAttribute("data-index"); // Get the index of the task from the attribute

      // Remove the task from the array
      myTasks.splice(taskIndex, 1);

      // Remove the task from the DOM
      taskElement.remove();

      // Update data-index attributes for the remaining tasks
      const remainingTasks = document.querySelectorAll(".single-item");
      remainingTasks.forEach((task, index) => {
        task.setAttribute("data-index", index); // Update each task's index after deletion
      });
    });
  });
}

let selectedItem = null;
const editInput = document.querySelector(".edit-task");

function editTask() {
  const editButtons = document.querySelectorAll(".edit-btn");
  const submitEditButton = document.querySelector(".submit-edit");
  editButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const taskElement = this.closest(".single-item"); // Find the closest parent task element
      const taskIndex = taskElement.getAttribute("data-index"); // Get the index of the task from the attribute

      selectedItem = taskIndex;
      editInput.value = myTasks[taskIndex];
    });
  });

  submitEditButton.addEventListener("click", function () {
    myTasks[selectedItem] = editInput.value;
  });
}

//Get Task
//Get Task Input
//Add the task input to the input
//after user changes it push the new change to the array and the input index
//updatedom
