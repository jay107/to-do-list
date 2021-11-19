//selector
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".select-btn");

//eventlistener
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo)
//function

function addTodo(e){
    e.preventDefault();
    //create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create li
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);
    //create check button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fa fa-check-square"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //create trash button 
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fa fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // append this in todo-list
    todoList.appendChild(todoDiv);

    //clear the input
    todoInput.value = "";
}


function deleteCheck(e){
    const item = e.target;
    if(item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("trash-ani");
        todo.addEventListener("transitionend", function(){
            todo.remove();
        })
    }
    //checkmark
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("checked");
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    const todo = document.querySelector(".todo")
    todos.forEach(function(todoDiv){
        console.log("class: " + todoDiv.classList)
        switch(e.target.value){
            case "all":
                break
            case "completed":
                if(todoDiv.classList.contains("checked")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display ="none";
                }
        }
    })
}

localStorage.setItem("todos", JSON.stringify(todoDiv));

document.addEventListener("DOMcontentLoaded", function(){
    const result = localStorage.getItem("todos");

    if(result){
        todoDiv = JSON.parse(result);
        todoDiv.forEach((t) =>{
            addTodo(t);
        })
    }
})