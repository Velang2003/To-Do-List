window.addEventListener('DOMContentLoaded', () => {
    const saved = JSON.parse(localStorage.getItem('tasks')) || [];
    saved.forEach(t => addTask(t.text, t.completed, false));
});

function add(){
    const input = document.getElementById("task-input");
    const text = input.value.trim();

    if(text === ""){
        alert("Fill the Task");
        return;
    }

    addTask(text, false, true);
    input.value = "";
}

function addTask(text, completed, doSave){
    const ol = document.getElementById("list-items");
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.classList.add("item");
    span.textContent = text;

    if(completed){
        span.classList.add("completed");
    }

    const del = document.createElement("button");
    del.classList.add("remove");
    del.textContent = "x";

    li.appendChild(span);
    li.appendChild(del);
    ol.prepend(li);
    if(doSave) save();
}

document.getElementById("list-items").addEventListener("click", e => {
    if(e.target.classList.contains("item")){
        e.target.classList.toggle("completed");
        save();
    }
    if(e.target.classList.contains("remove")){
        e.target.parentElement.remove();
        save();
    }
});

function save(){
    const tasks = [];
    const items = Array.from(document.querySelectorAll("#list-items li")).reverse();


    items.forEach(li => {
        const text = li.querySelector(".item").textContent;
        const completed = li.querySelector(".item").classList.contains("completed");
        tasks.push({text, completed});
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}