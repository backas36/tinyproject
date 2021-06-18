const listsContainer = document.querySelector('[data-lists]')
const newListForm = document.querySelector('[data-new-list-form]')
const newListInput = document.querySelector('[data-new-list-input]')
const deleteListButton = document.querySelector('[data-delete-list-button]')

const listDisplayContainer = document.querySelector('[data-list-display-container]')
const listTitleElement = document.querySelector('[data-list-title]')
const listCountElement = document.querySelector('[data-list-count]')
const tasksContainer = document.querySelector('[data-tasks]')
const taskTemplate = document.querySelector('#task-template')
const newTaskForm = document.querySelector('[data-new-task-form]')
const newTaskInput = document.querySelector('[data-new-task-input]')
const clearCompleteTasksButton = document.querySelector('[data-clear-complete-tasks-button]')

const LOCAL_STORAGE_LIST_KEY = 'task.lists' 
const LOCAL_STORAGE_LIST_ID_KEY = 'task.selectedListId' 


let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY))|| []
let selectedListId = localStorage.getItem(LOCAL_STORAGE_LIST_ID_KEY )


listsContainer.addEventListener('click', e =>{
  if(e.target.tagName.toLowerCase() === 'li'){
    selectedListId = e.target.dataset.listId
    saveAndRender()
  }
})

// 看不太懂這裡
tasksContainer.addEventListener('click', e => {
  if(e.target.tagName.toLowerCase() === 'input') {
    const selectedList = lists.find(list => list.id === selectedListId)
    const selectedTask = selectedList.tasks.find(task => task.id === e.target.id)
    selectedTask.complete = e.target.checked
    save()
    renderTaskCount(selectedList)
  }
})

//這邊不太懂
clearCompleteTasksButton.addEventListener('click', e => {
  const selectedList = lists.find(list => list.id === selectedListId)
  selectedList.tasks = selectedList.tasks.filter(task => !task.complete)
  saveAndRender()
})

deleteListButton.addEventListener('click', e => {
  lists = lists.filter(list => list.id !== selectedListId)
  selectedListId = null
  saveAndRender()
})

newListForm.addEventListener('submit', e => {
  e.preventDefault()
  const listName = newListInput.value
  // 為什麼需要 listName == null 而且為什麼不是使用嚴格相等
  if(listName == null || listName === '') return 
  const list = createList(listName)
  newListInput.value = null
  lists.push(list)
  saveAndRender()
})

newTaskForm.addEventListener('submit', e => {
  e.preventDefault()
  const taskName = newTaskInput.value
  // 為什麼需要 listName == null 而且為什麼不是使用嚴格相等
  if(taskName == null || taskName === '') return 
  const task = createTask(taskName)
  newTaskInput.value = null
  const selectedList = lists.find(list => list.id === selectedListId)
  // 這邊看不太懂
  selectedList.tasks.push(task)
  saveAndRender()
})

function createList(name) {
  return {id:Date.now().toString(), name:name, tasks:[]}
}
function createTask(name){
  return {id:Date.now().toString(), name:name, complete:false}
}
function saveAndRender() {
  save()
  render()
}

function save(){
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))
  // 讓被選中的元素ID存在 localStorage
  localStorage.setItem(LOCAL_STORAGE_LIST_ID_KEY,selectedListId)
}

function render() {
  // 為什麼沒加這行就會把全部列表在印一次？
  clearElement(listsContainer)
  renderLists()
  const selectedList = lists.find(list => list.id === selectedListId)
  if (selectedListId == null ){
    listDisplayContainer.style.display = 'none'
  } else {
    listDisplayContainer.style.display = ''
    listTitleElement.innerText = selectedList.name
    renderTaskCount(selectedList)
    clearElement(tasksContainer)
    renderTasks(selectedList)
  }
}

function renderTasks(selectedList) {
  selectedList.tasks.forEach(task => {
    // 記得查詢 importNode 用法
    const taskElement = document.importNode(taskTemplate.content,true)
    const checkbox = taskElement.querySelector('input')
    checkbox.id = task.id
    checkbox.checked = task.complete
    const label = taskElement.querySelector('label')
    // what is htmlFor ?
    label.htmlFor = task.id
    // what is different between append 和 appendChild
    label.append(task.name)
    tasksContainer.appendChild(taskElement)
  })
}

function renderTaskCount(selectedList) {
  const incompleteTasksCount = selectedList.tasks.filter(task => !task.complete).length
  const taskString = incompleteTasksCount === 1 ? 'task':'tasks'
  listCountElement.innerText = `${incompleteTasksCount} ${taskString} remaining`
}

function renderLists() {
  lists.forEach( list => {
    const listElement = document.createElement('li')
    listElement.dataset.listId = list.id
    listElement.classList.add('list-name')
    listElement.innerText = list.name
    if(list.id === selectedListId){
      listElement.classList.add('active-list')
    }
    listsContainer.appendChild(listElement)
  })
  
}


// 為了確保沒有被加入其他的child
function clearElement(element){
  while(element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

render()

//localStorage.clear()