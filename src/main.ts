import './style.css'

// Step 1: Define the Todo interface
interface Todo {    //We can add more like author
  id: number;
  title: string;
  completed: boolean;   
}

//step 2 : Initialize an empty array to store todos 
let todos: Todo[] = [];  //follow the interface with the objects

//step 3 : Get reference to the HTML elements   
const todoInput = document.getElementById('todo-input') as HTMLInputElement;  // exist in HTML file
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const todoForm = document.querySelector('.todo-form') as HTMLFormElement;

//step 4: Function to add a new todo ; void: not return
// Function to add a new todo: This function creates a new todo object and adds it to the array.
const addTodo = (text:string): void => {
  const newTodo: Todo = {
    id: Date.now(),
    title: text,
    completed: false,     
  };
  todos.push(newTodo); //push only for arrays
  console.log("Todo added: ",todos); // Log the updated list of todos to the console, tested if is work 
  renderTodos(); // Render the updated list of todos => create the function next 
};

// Step 5: Function to render the list of todos
// Function to render the list of todos: This function updates the DOM to display the current list of todos.
const renderTodos = (): void => {    // void because no return - what we are doing is updating the DOM
  todoList.innerHTML = '';    //clear the current list

   
  // Iterate over the todos array and create list items for each todo
  todos.forEach(todo => {  // In this specific case, .forEach is more suitable because we are directly modifying the DOM for each todo item.
    const li = document.createElement('li'); //createElement is the method 
    li.className = 'todo-item'; //attach a class to the list item
    li.innerHTML = `   
      <span>${todo.title}</span>
      <button id="removeBtn"> Remove </button>  
      <button id="editBtn"> Edit </button>      
    `;

    // addRemoveButtonListener is further down in the code. We have onclick in the function instead of template literals. More safe to use addEventListener.
    addRemoveButtonListener(li, todo.id); // listener for remove. li is the parent element, and todo.id is the ID of the todo.   
    addEditButtonListener(li, todo.id);   //listener for edit    
    todoList.appendChild(li);   // Append the list item to the ul element    
  });
};

// Initial render
renderTodos(); // Call the renderTodos function to display the initial list of todos : Should be at the end of the code to ensure that the function is defined before it is called.
// The initial render is important to display the list of todos when the page is first loaded. Without it, the list would be empty until a new todo is added.
// Move it when code is complete ( refactoring ) 


// Step 6: Function to render the list of todos  
// Event listener for the form submission: This listener handles the form submission, adds the new todo, and clears the input field.
todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault(); //stop the page and refresh
  const text = todoInput.value.trim();//trim remove the space 
  if (text !== '') {  //if is empty
    addTodo(text);
    //todoInput.value = ''; // Clear the input field //prueba a ver si esto hace algo
  }
});

// Step 7: Function to removes all a todo by ID
// Function to add event listener to the remove button - this function has an callback function that removes the todo item from the array.
const addRemoveButtonListener = (li:HTMLLIElement, id: number): void => { //original sin void 
  const removeButton = li.querySelector('#removeBtn');
  removeButton?.addEventListener('click', () => removeTodo(id));  //with the ? , when we start is empty meaning could be there or not
};


// Step 8: Function to remove a todo by ID
// Function to remove a todo by ID: This function removes a todo from the array based on its ID.
const removeTodo = (id: number): void => {  //original sin
  todos = todos.filter(todo => todo.id !== id); //filter go for all the array, we should use find insted of filter, because filter will return a ...? ( con find cuando encuentre lo que busca para , y con filter sigue buscando por todo el array )
  renderTodos(); //without this, it is remove from the console but not from the screen // Re-render the updated list of todos
};


// We have to access the li of the todos elements with their id. 
// When accesing the id can we add a function with a button ("Edit the todo")
// We can add a function that when the button is clciked it access the id and it changes the value of the text of the element
//edit function and button
// Edit event listener - make button and add button to each todo
const addEditButtonListener = (li: HTMLLIElement, id:number) => {
  const editButton = li.querySelector ('#editBtn')
  editButton?.addEventListener('click', () => editTodo (id))
}

// Edit function - prompt user to edit the todo : editTodo
const editTodo = (id:number) => {
  const todo = todos.find(todo => todo.id === id)
  if (todo) {
    const text = prompt("edit todo", todo.title)
    if(text) {
      todo.title = text
      renderTodos ()
    }
  }   //if exist todo then run...
}


//Color picker works changing the background color
// Function to initialize the color picker event listener
const initializeColorPicker = () : void => {
  const colorPicker = document.getElementById('colorPicker') as HTMLInputElement 
  if (colorPicker) {
    colorPicker.addEventListener('input', (event: Event) => {
      const target = event.target as HTMLInputElement;
      changeBackgroundColor(target.value)
    })
  }
  else{
    console.error('Color picker element not found')
  }
};

// Function to change the background color of the page based on the color picker value
const changeBackgroundColor = (color:string):void => {
  document.body.style.backgroundColor = color; 
};

// Call the initializeColorPicker function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeColorPicker ();
});


//------------------------------------------------------------------------------------------------Optional features list: 

// Option 1: Add a button to toggle the completed status of a todo item 
// Function to toggle the completed status of a todo + 
// Add a button to toggle the completed status of a todo item


// Option 2: Add a button to clear all completed todos
// Add a button to clear all completed todos
// Function to clear all completed todos
// Add a button to toggle all todos


// Option 3: Add a button to toggle all todos
// Edit a todo item and update it
// Add an input field to edit a todo item
// Save the updated todo item
// Cancel the editing of a todo item
// Add a button to cancel the editing of a todo item


// Option 4: Add a button to filter todos by status
// Add a button to filter todos by status
// Function to filter todos by status


// Option 5: Add a button to sort todos by status
// Add a button to sort todos by status
// Function to sort todos by status

// Option 6: Due Date for Todos:
// Add a date input field to set a due date for each todo item.
// Display the due date next to each todo item.
// Highlight overdue todos.
// Priority Levels:

// Option 7: Add a dropdown to set the priority level (e.g., Low, Medium, High) for each todo item.
// Display the priority level next to each todo item.
// Sort todos by priority.
// Search Functionality:

// Option 8: Add a search input field to filter todos based on the search query.
// Display only the todos that match the search query.
// Category Tags:

// Option 9: Add a text input field to assign category tags to each todo item.
// Display the tags next to each todo item.
// Filter todos by category tags.
// Progress Indicator:

// Option 10: Add a progress bar to show the percentage of completed todos.
// Update the progress bar as todos are marked as completed or incomplete.
// Dark Mode Toggle:

// Option 11: Add a button to toggle between light and dark modes.
// Change the app's theme based on the selected mode.
// Export/Import Todos:

// Option 12: Add buttons to export the list of todos to a JSON file.
// Add functionality to import todos from a JSON file.
// Notifications:

// Option 13: Add notifications to remind users of due todos.
// Use the Notification API to show browser notifications.

// Option 14: Local Storage:
// Save the list of todos to local storage.
// Retrieve the todos from local storage on page load.
// Add a button to clear all todos from local storage.

// Option 15: JSDOC Comments:
// Add JSDoc comments to document the functions and interfaces in the code.
// Link : https://jsdoc.app/

// Optional 16: Handle Errors:
// Add error handling for user input validation. Show red text or border for invalid input.
// Display error messages for invalid input.
