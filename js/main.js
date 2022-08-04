const tasks = [];
let time = 0;
let timer = null;
let timeBreak = null;
let current = null;
const itAdd = document.querySelector('#itAdd');
const itTask = document.querySelector('#itTask');
const form = document.querySelector('#form');
const taskName = document.querySelector('#time #taskName');

form.addEventListener("submit", e => eventForm(e));

function eventForm(e){
    e.preventDefault();
    if(itTask !== ""){
        createTask(itTask.value)
        itTask.value = ""; 
        renderTasks();
    };
};

function createTask(value){
    const newTask = {
        id: (Math.random() * 100 ).toString(36).slice(3),
        title: value,
        completed: false,
    }

    tasks.unshift(newTask);
};

function renderTasks(){
    const html = tasks.map( task => {
        return `
        <div class="task">
            <div class="completed">${task.completed ? `<span class="done">Done</span>` : `<button class="start-button" data-id="${task.id}">Start</button>` } </div>
            <div class="title">${task.title} </div>
        </div>`;
    })

    const tasksContainer = document.querySelector('#tasks');
    tasksContainer.innerHTML = html.join("");

    const startBtns = document.querySelectorAll('.task .start-button')

    startBtns.forEach((startBtns) => {
        startBtns.addEventListener("click", e => {
            if(!timer){
                startBtnsHandler(startBtns.getAttribute("data-id"));
                startBtns.textContent  = 'in progress ...'
            }
        });
    })
};

function startBtnsHandler(id){
    time = 25 * 60;
    current = id;
    const taskIndex = tasks.findIndex((task) => task.id === id);
    const taskName = document.querySelector('#time #taskName');
    taskName.textContent = tasks[taskIndex].title;
    
    timer = setInterval(() => {
        timeHandler(id);
    }, 1000);
};

function timeHandler(id){
    time--;
    renderTime();

    if(time === 0){
        clearInterval(timer);
        current = null;
        taskName.textContent =  "";
        renderTime();
    }
};

function renderTime(){
    const timeDiv = document.querySelector('#time #value');
    const minutes = parseInt(time / 60);
    const seconds = parseInt(time % 60);

    timeDiv.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// 30:37