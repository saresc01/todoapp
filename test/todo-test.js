import {Selector} from "testcafe";

fixture("Todo test")
    .page("https://test.saraescallon.dk/todo/");


//test 1 background color

test("Change color background", async t =>{
    await t 
        .click(Selector("#colorPicker")) 
        .typeText(Selector("#colorPicker"), "#ff5733", { replace: true }) //change color to orange
        .expect(Selector("body").getStyleProperty("background-color")).eql("rgb(255, 87, 51)");  
});


//test 2 filter completed

test("Add todos and filter completed", async t => {    
    await t
        .typeText(Selector("#todo-input"), "patata") //write patata       
        .click(Selector('button[type="submit"]')) //click add        
        .typeText(Selector("#todo-input"), ", calabacin") //write calabacin        
        .click(Selector('button[type="submit"]'))
        .click(Selector('.todo-item').withText("patata").find("#completedBtn")) //patata completed
        .click(Selector("#filter-completed")) //filter
        .expect(Selector(".todo-item").withText("patata").exists).ok()
        .expect(Selector(".todo-item").withText("calabacin").exists).notOk();
});


//test 3 filter and see all 

test("Click on 'Show All' filter", async t => {    
    await t
        .typeText(Selector("#todo-input"), "pan") //write pan      
        .click(Selector('button[type="submit"]')) //click add        
        .typeText(Selector("#todo-input"), ", pepino") //write pepino       
        .click(Selector('button[type="submit"]'))
        .click(Selector('.todo-item').withText("pan").find("#completedBtn")) //pan completed
        .click(Selector("#filter-completed")) //filter completed
        .click(Selector("#filter-all")) //click show all         
        .expect(Selector("#filter-all").exists).ok(); 
});


//test 4 change to dark mode 

 test("Toggle dark mode", async t => {
    const darkModeButton = Selector("#dark-mode"); //click to dark mode button
    const body = Selector("body"); 

    await t   //active dark 
        .click(darkModeButton)
        .expect(body.getStyleProperty("background-color")).eql("rgb(18, 18, 18)")
        .expect(darkModeButton.innerText).eql("Light Mode");

    await t  //come back to light 
        .click(darkModeButton)
        .expect(body.getStyleProperty("background-color")).notEql("rgb(18, 18, 18)");
}); 


//test 5 sort the task, incomplete first  

/* test("Sort task, incomplete first", async t => {
    await t
        .typeText(Selector("#todo-input"), "Do the dishes") 
        .click(Selector('button[type="submit"]')) 

        .typeText(Selector("#todo-input"), "Do the laundry") 
        .click(Selector('button[type="submit"]')) 

        .typeText(Selector("#todo-input"), "Order a pizza") 
        .click(Selector('button[type="submit"]')) 

        .typeText(Selector("#todo-input"), "Buy carrots") 
        .click(Selector('button[type="submit"]'))

        .typeText(Selector("#todo-input"), "Clean the wc") 
        .click(Selector('button[type="submit"]')) 

        .typeText(Selector("#todo-input"), "Fix the tap") 
        .click(Selector('button[type="submit"]'))

        //carrots and do the laudry completed
        .click(Selector('.todo-item').withText("Do the laundry").find("#completedBtn"))         
        .click(Selector('.todo-item').withText("Buy carrots").find("#completedBtn")) 
        
        .click(Selector("#sort-todo")) 

        // check task incomplete before completed
        const todoItems = Selector('.todo-item');
        
        let completedFound = false;

        for (let i = 0; i < 6; i++) {
            // Getting the elements in order
            const spanStyle = await todoItems.nth(i).find('span').getStyleProperty('text-decoration');

            if (spanStyle === 'line-through') {
                // Found an incomplete task, set flag
                completedFound = true;
            } else if (spanStyle === 'none' && completedFound) {
                // Found a incompleted task after a completed
                await t.expect(spanStyle === 'none').notOk(`Found incompleted task after completed one at index ${i}`);
            }
        }
}); */