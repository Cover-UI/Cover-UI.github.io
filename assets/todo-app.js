const addTodoForm = $('#todo');
const addTodoBtn = $('#addtodo');
const todoList = $('#todolist');
const clearTodos = $("#clear");

let Todos = JSON.parse( localStorage.getItem("Todos") ? localStorage.getItem("Todos") : "[]" );;

addTodoBtn.click(addTodo);
todoList.click(removeTodo);
clearTodos.click(clear);
$(window).ready(show);


function addTodo(e){
    let r_id = Math.random().toString().substr(2, 8);

    Todos.push({
        id: r_id,
        todo: addTodoForm.val()
    });
   
    save();
    show();
    e.preventDefault();
}

function removeTodo(e){
    let $t = $(e.target);
    if($t.hasClass("delete-item") ){
        let id = $t.closest("li").attr("id");        
        Todos = Todos.filter(t => t.id != id);
        save();
        show();
    }
    e.preventDefault();
}

function clear(e){
    localStorage.removeItem("Todos");
    Todos = [];
    show();
    e.preventDefault();
}


function show(){
    todoList.html("");
    if (Todos.length > 0){
        for (let i = 0; i < Todos.length; i++) {
        const todo = Todos[i];
        let html = `
        <li class="list-group-item todo-item d-flex justify-content-between" id="${todo.id}">${ todo.todo }<i class="delete-item float-right material-icons">close</i></li>
        `;
        
        todoList.html( todoList.html() + html );
        

        }
    }else{
        let html = `
        <li class="list-group-item todo-item p-0" id="no-item"><div class="alert alert-danger m-0">No item!</div></li>
        `;
        
        todoList.html( html );
    }
    save();
}


function save(){
    localStorage.setItem("Todos", JSON.stringify( Todos ) )
}
