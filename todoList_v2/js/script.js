/* 
list 為儲存 list 的地方
將 lists 的 ul 存入 listsContainer
建立 render function 來新增 listsUl 裡面的 li

建立 clearElement 確保 ul 裡面沒有東西

將 list 裡面都是儲存 object ，這樣每個 list 都是一個 object，有 id 和 name 以及 task（array） 屬性，並且在 list form 裡面增加 data-new-list-form，input增加 data-new-list-input，並且使用這些 html 屬性來用 document.querySelector來放變數 newListForm, newListInput

在  newListForm 增加 event listener，參數為 submit ，function 是 抓取 input 的值，並且另外創建一個 createList來新增 list 到 lists Array 裡面，id為利用 Date.now()，並且回傳一個 object，這樣就可以把 list push到 lists 然後執行 render 來渲染畫面

建立local storage key 的變數，讓 lists 來抓取 localStorage 沒有值的話就是空陣列

建立 save function 來將 lists 放入 localStorage
建立 savaAndRender 來執行 save, render function

建立 localStorageListIdKey 拿來 object裡面selectedListId
建立被選中localStorage的 list id 為 selectedListId, 
如果 list.id 等於 selectedListId 就增加 active-list class

在 listContainer 建立監聽事件，事件是 click，function 是 如果目標tagName 是 li的話，那selectedListId就是 e.target.dataset.listId，並且執行 saveAndRender()
並且在 save function 裡面增加 將selectedListId存入 localStorage


在 button delete list 裡面增加 data-delete-list-button，來使用 document.querySelector 放入 deleteListButton ，並且建立監聽事件, click, function為 將 list.id 更新為沒有 selectedListId ， 並將selectedListId 更改為 null ，並且執行 saveAndRender


在 todo-list 增加 data-list-display-container ，在 list-title 增加 data-list-title，在 task-count 增加 data-list-count，在 tasks 增加 data-tasks
之後把他們增加到共同變數裡面

把 render function 重新整理出子function為 renderLists ， render function 改為 selectedListId 為 null 的時候 listDisplayContainer 的 display 就是 none 反之 display 為 ''，並且 listTitleElement 為 selectedList.name (selectedList 為 list find=> list.id === selectedListedId)
並且建立 renderTaskCount function

function renderTaskCount 裡面有 incompleteTasks 變數儲存 task.complete 為 false 的 task的長度，並建立 taskString 變數來決定要顯示 task還是 tasks

再回到 render 裡面執行 clearElement(tasksContainer)，並且執行 renderTasks，renderTasks function 裡面是跑 selectedList.tasks的迴圈，讓每個元素都 importNode(template) 一次，並且設立 checkbox 和 label 變數抓取 html DOM，讓 checkbox.id = task.id， checkbox.checked = task.complete，label.htmlFor 為 task.id，並使用 append 插入 task.name，在使用 appendChild 插入 taskElement


(在 html 裡面把 task div 整個搬到 template 裡面 template id 為 task-template，並且把 template放入變數 taskTemplate)


在第二個html form 裡面增加 data-new-task-form，input 裡面放 data-new-task-input，一樣把他們都抓進去共同變數，增加 newTaskForm 監聽事件，裡面的 function 跟 newListForm 類似，並創建 createTask function 裡面執行回傳 ojbect 好放入 list 裡面的 task，並且在監聽事件裡面記得放入 selectedList = list find list.id=== selectedListId，並把 object push 到 selectedList.tasks 並且執行 saveAndRender

在 tasksContainer建立監聽事件好執行 click 就完成task的模樣

在 html complete btn 裡面新增 data-clear-complete-tasks-button，並新增監聽事件，好讓已經完成的不要再顯示，只顯示還沒完成的
*/
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


listsContainer.addEventListener('click', (e) =>{
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