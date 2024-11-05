import './style.css'

// Step 1: Define the Todo interface
interface Todo {    
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
const filterAllBtn = document.getElementById('filter-all') as HTMLButtonElement; //step4
const filterComplBtn = document.getElementById('filter-completed') as HTMLButtonElement;
const filterIncomplBtn = document.getElementById('filter-incomplete') as HTMLButtonElement;

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
      <span style="text-decoration: ${todo.completed ? 'line-through' : 'none'}">
        ${todo.title}
      </span>
      <button id="completedBtn">${todo.completed ? 'Incomplete' : 'Complete'}</button>
      <button id="removeBtn"> Remove </button>        
      <button id="editBtn"> Edit </button>            
    `;

    // addRemoveButtonListener is further down in the code. We have onclick in the function instead of template literals. More safe to use addEventListener.
    addRemoveButtonListener(li, todo.id); // listener for remove. li is the parent element, and todo.id is the ID of the todo.   
    addEditButtonListener(li, todo.id);   //listener for edit  
    addCompletedListener(li, todo.id); 
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
const removeTodo = (id: number): void => {  
  todos = todos.filter(todo => todo.id !== id); 
  renderTodos();  // Re-render the updated list of todos
};

// We have to access the li of the todos elements with their id. 
// When accesing the id can we add a function with a button ("Edit the todo")
// We can add a function that when the button is clicked it access the id and it changes the value of the text of the element
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


//------------------------------------------------------------------------------------------------Optional features: 

// Option 1: Add a button to toggle the completed status of a todo item 
// Function to toggle the completed status of a todo + 
// Add a button to toggle the completed status of a todo item

const addCompletedListener = (li: HTMLLIElement, id: number): void =>{
  const completedBtn = li.querySelector('#completedBtn');
  completedBtn?.addEventListener('click', () => completedTodo(id))
}

const completedTodo = (id: number): void => {
  const todo = todos.find(todo => todo.id === id)
  if(todo){
    if (todo.completed == true){
      todo.completed = false
    } else {
      todo.completed = true
    }
  } 
  renderTodos(); 
}

// Option 4: Add a button to filter todos by status
// Add a button to filter todos by status
// Function to filter todos by status

//select all button (listener + render)
filterAllBtn.addEventListener('click', () => showAll());

const showAll = (): void => {
  renderTodos();
}

//filter completed (listener + function)
filterComplBtn.addEventListener('click', () => showComplete() );

const showComplete = (): void => {
 let completedTodos = todos.filter(todo => todo.completed == true);
 renderTodosParam(completedTodos);
}

//filter incomplete (listener + function)
filterIncomplBtn.addEventListener('click', () => showInComplete() );

const showInComplete = (): void => {
  let incompletedTodos = todos.filter(todo => todo.completed == false); 
  renderTodosParam(incompletedTodos);
 }

 //renderTodosParam is for render the filter buttons
const renderTodosParam = (todosParam: Todo[]): void => {   
  todoList.innerHTML = '';     
 
  todosParam.forEach(todo => {  
    const li = document.createElement('li'); 
    li.className = 'todo-item'; 
    li.innerHTML = `   
      <span style="text-decoration: ${todo.completed ? 'line-through' : 'none'}">
        ${todo.title}
      </span>
      <button id="completedBtn">${todo.completed ? 'Incomplete' : 'Complete'}</button>
      <button id="removeBtn"> Remove </button>        
      <button id="editBtn"> Edit </button>            
    `;
        
    addRemoveButtonListener(li, todo.id);   
    addEditButtonListener(li, todo.id);  
    addCompletedListener(li, todo.id); 
    todoList.appendChild(li);        
  });
};



// Part 2, Feature 1 : Add a button to toggle between light and dark modes.   

 const darkModeButton = document.getElementById("dark-mode") as HTMLButtonElement;

const toggleDarkMode = (): void => {
  document.body.classList.toggle("dark-mode");
  darkModeButton.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
};

darkModeButton.addEventListener('click', toggleDarkMode);
 


// Part 2, Feature 2 : Add a button sort the task, first incomplete task, and later the complete.

const sortButton = document.getElementById("sort-todo") as HTMLButtonElement; 

const sortTodos = (): void => {

  const completedTodos: Todo[] = []
  const incompletedTodos: Todo[] = []

  todos.forEach(todo => {
    if (todo.completed == true){
      completedTodos.push(todo)
    } else{
      incompletedTodos.push(todo)
    }
  })

  var sortedTodos: Todo[] = []
  sortedTodos = sortedTodos.concat(incompletedTodos)
  sortedTodos = sortedTodos.concat(completedTodos)

  renderTodosParam(sortedTodos)
};

sortButton.addEventListener('click', sortTodos); 