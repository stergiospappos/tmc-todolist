const tasksContainer = document.querySelector(".added-items"); // Here we find where to add new tasks as HTML elements
const submitButton = document.querySelector(".submit"); // Here we find the button that is responsible for submiting new tasks
const submitInput = document.querySelector(".task-input");
const editInput = document.querySelector(".edit-task");
const submitEditButton = document.querySelector(".submit-edit");
let editingTaskId = null; // Store the ID of the task being edited

let savedTasks = JSON.parse(localStorage.getItem("tasks"));

let myTasks = savedTasks ? savedTasks : []; //we check for saved tasks in local storage

submitButton.addEventListener("click", () => {
  let inputValue = submitInput.value; //Get the input the user has entered in the form
  myTasks.push({ name: inputValue, id: Math.random(5, 4) }); //Add the input to the array with unique id
  submitInput.value = ""; //Clear the input
  showItems(myTasks); //Create HTML to show it to the frontend

  localStorage.setItem("tasks", JSON.stringify(myTasks));
});

function deleteItem(id) {
  let filteredData = myTasks.filter((item) => {
    //Get the array and create a new one with everything BUT the id of the selected item
    return item.id != id;
  });
  myTasks = filteredData; //update the original array with the new one
  localStorage.setItem("tasks", JSON.stringify(myTasks));

  showItems(myTasks); //Re-render the list of tasks
}

// Handle the submit button for editing, ensure the event listener is only attached once
submitEditButton.removeEventListener("click", submitEdit); // Remove any previous event listener
submitEditButton.addEventListener("click", () => {
  submitEdit();
  const editModal = bootstrap.Modal.getInstance(
    document.querySelector("#editModal")
  );
  editModal.hide();
});

function editItem(taskName, id) {
  editInput.value = taskName; //Show the task name of the form when the modal opens
  editingTaskId = id; //Get the ID of the task we are trying to edit and store it
}

function submitEdit() {
  // Update the task with the new name based on the stored ID
  myTasks = myTasks.map((task) => {
    if (task.id === editingTaskId) {
      return { ...task, name: editInput.value }; // Update task name
    }
    return task; // Return unchanged tasks
  });
  showItems(myTasks); // Re-render the list of tasks
  localStorage.setItem("tasks", JSON.stringify(myTasks));
}

function showItems(data) {
  tasksContainer.innerHTML = data
    .map((item) => {
      return `
        <div class="single-item d-flex justify-content-between container-fluid">
            <label class="custom-checkbox d-flex justify-content-center gap-4">
                <input class="checkbox" type="checkbox" />
                <span class="custom-checkmark">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check">
                        <path d="M20 6 9 17l-5-5" />
                    </svg>
                </span>
                <p class="item-content h5">${item.name}</p>
            </label>

            <div class="icons d-flex justify-content-between gap-2">
                <button class="edit-btn"
                data-bs-toggle="modal"
            data-bs-target="#editModal"
            onclick="editItem('${item.name}', ${item.id})"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil">
                    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                    <path d="m15 5 4 4" />
                </svg>
                
                </button>
                <span class="delete-btn" onclick="deleteItem(${item.id})">
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
    })
    .join(" ");
}

const searchInput = document.querySelector(".search-input");
const searchSubmitBtn = document.querySelector(".btn-search");
const allBtn = document.querySelector(".filter-all");

searchSubmitBtn.addEventListener("click", () => {
  let searchTerm = searchInput.value.toLowerCase();
  let filteredSearchData = myTasks.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm);
  });

  showItems(filteredSearchData);
});

const modeToggleBtn = document.querySelector(".toggler");

modeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

allBtn.addEventListener("click", () => {
  showItems(myTasks);
});

showItems(myTasks);
