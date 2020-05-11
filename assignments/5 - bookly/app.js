//SST
let arr = [];

//updateUI()

function updateUI() {
   document.querySelectorAll("li").forEach(li => {
   li.remove();
   })
   arr.forEach(item => {
      let listItem = document.createElement("li");
      listItem.innerText = String(item);
      list.append(listItem);
   })
}

//On click Submit, add a new book to ul
let addInput = document.querySelector(".addInput");
let button = document.querySelector("button");
let list = document.querySelector(".listOfBooks");
button.addEventListener("click", (e) => {
   e.preventDefault();
   let bookName = addInput.value;
   if (bookName.trim()){
      arr.push(bookName);
      updateUI();
   }
   addInput.value = "";
})



//on search, every keyup, add event listener and run a search in the data, and display all matching(includes function) and display none all, display block only matching

let searchInput = document.querySelector(".searchInput");
document.querySelector("#search-books").addEventListener("submit", (e) => {e.preventDefault()});
searchInput.addEventListener("keyup", (e) => {
   // e.preventDefault();
   arr.forEach(book => {
      if (e.target.value.trim()){
      document.querySelectorAll("li").forEach(li => { li.style.display = "none" })
      }
      if (book.includes(e.target.value)){
         document.querySelectorAll("li").forEach(li => {
            if (li.innerText == book){
               li.style.display = "block";
            }
         })
      }

   })
})

// Hide all books checkbox
let counter = false;
document.getElementById("hide").addEventListener("click", (e) => {

   if (!counter){
      document.querySelectorAll("li").forEach(li => {li.style.display = "none"})
      counter = true;    
   } 
   else if (counter) {
      document.querySelectorAll("li").forEach(li => {li.style.display = "block"})
      counter = false;
   }
})