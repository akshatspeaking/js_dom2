let sst = [];
let input = document.querySelector("#textin");
let list = document.querySelector("ul");
input.addEventListener("keyup", addTodo);
document.querySelector(".all").addEventListener("click", showAll)
document.querySelector(".actv").addEventListener("click", showActive)
document.querySelector(".completed").addEventListener("click", showCompleted)
document.querySelector(".clr").addEventListener("click", clearCompleted)
document.querySelector(".fas").addEventListener("click", selectAll)

// ADD new note to SST
function addTodo(e) {
   let inputText = input.value.trim();
   if (e.keyCode == 13 && inputText !== "") {
      sst.push({note: input.value, isDone: false})
      input.value = "";
   }
   updateUI(sst); 
};

//FN - Display/Refresh SST items on UI
function updateUI(arr) {
   list.innerHTML = "";
   
   arr.forEach((obj, i) => {

      // ADD new note to UL

      obj.id = i;
      let item = document.createElement("li");
      item.setAttribute("data-id", obj.id);
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("check")
      checkbox.classList.add("checkbox");
      checkbox.checked = obj.isDone;
      let noteText = document.createElement("p");
      noteText.classList.add("note")
      let cross = document.createElement("span");
      cross.innerText = "X";
      cross.classList.add("span")
      cross.classList.add("delete")

      item.append(checkbox, noteText, cross);
      list.append(item);

      if (obj.isDone) {
         noteText.innerHTML = "<del>" + obj.note + "</del>";
      }
      else {noteText.innerHTML = obj.note;}   
   })

   //EVENT LISTENERS on List Items
   document.querySelectorAll(".check").forEach(x => {x.addEventListener("click", checkBoxClick)})
   document.querySelectorAll(".span").forEach(x => {x.addEventListener("click", crossClick)}) 
   document.querySelectorAll(".note").forEach(x => {x.addEventListener("dblclick", editNote)}) 

   // No of items left
   let noLeft = 0;
   sst.forEach((obj) => {
      if (!obj.isDone) {noLeft++;}
   });
   document.querySelector(".itemsLeft").innerText = noLeft;
}
// FN - on checkbox Complete checked items
function checkBoxClick(e) {
   let id = e.target.parentElement.dataset.id;
   sst[id].isDone = !sst[id].isDone;
   updateUI(sst);
}

//FN - DELETE X SPAN
function crossClick(e) {
   let id = e.target.parentElement.dataset.id;
   sst.splice(id, 1);
   updateUI(sst);
}

//footer part
// show All
function showAll() {
   updateUI(sst);
}

// show active
function showActive() {
   updateUI(sst.filter(x => !x.isDone));
}

//show completed
function showCompleted() {
   updateUI(sst.filter(x => x.isDone));
}

//Clear completed
function clearCompleted() {
   sst = sst.filter(obj => obj.isDone == false)
   updateUI(sst);
}

// Select All button

var cnt = false;
function selectAll() {
   if(!cnt) {
      sst.forEach(x => {x.isDone = true});
      updateUI(sst);
      cnt = true;
   }
   else if(cnt) {
      sst.forEach(x => {x.isDone = false});
      updateUI(sst);
      cnt = false;
   }
}

// double click edit
function editNote(e) {
   let para = e.target;
   let tempId = e.target.parentElement.getAttribute("data-id");
   para.style.display = "none";
   let tempInput = document.createElement("input");
   tempInput.classList.add("tempInput")
   tempInput.value = para.innerText;
   let nextEl = e.target.parentElement.children[2];
   e.target.parentElement.insertBefore(tempInput, nextEl);
   tempInput.focus();

   tempInput.addEventListener("keyup", (event) => {
 
   if (event.keyCode == 13 && tempInput.value.trim() !== "") {
      sst[tempId].note = tempInput.value;
      para.style.display = "inline-block";
      tempInput.style.display = "none";
      updateUI(sst);
   }}) }