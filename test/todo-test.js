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
