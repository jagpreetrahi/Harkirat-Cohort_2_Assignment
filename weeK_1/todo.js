/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo{

    constructor(){
        this.todos = []
    }

    add(todo){
     this.todos.push(todo) 
    }

    remove(indexOfTodo){
        if(indexOfTodo >= 0 && indexOfTodo < this.todos.length){
            this.todos.splice(indexOfTodo, 1)
        }
        else{
            throw new Error("invalid index of the todo")
        }
       
    }

    getAll(){
        return this.todos
    }

    update(index , updateTodo){
        if(index > 0 && index < this.todos.length){
            this.todos[index] = updateTodo;
        }
        else{
            throw new Error("invalid index for updating the todo")
        }
    }

    getTodo(index){
        if(index > 0 && index < this.todos.length){
            return  this.todos[index]
        }
        else{
             throw new Error("invalid index for getting the todo")
        }
    }

    clear(){
        this.todos = []
    }
}

const myTodo = new Todo();
myTodo.add("learning harkirat course")
myTodo.add("Completed the assignment of week1")
myTodo.add("making the paytm  project");

console.log(myTodo.getAll())

myTodo.update(1, "start with the week 12");
console.log(myTodo.getTodo(1))
console.log(myTodo.getAll());

myTodo.remove(0);
console.log(myTodo.getAll());

myTodo.clear();
console.log(myTodo.getAll())