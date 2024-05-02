import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";

import { getDatabase, set, ref, update, onValue, push } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyATOOWTeVbH4QjeGpaQZy5irrAqNsn4T2w",
    authDomain: "todo-app-6f8be.firebaseapp.com",
    databaseURL: "https://todo-app-6f8be-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "todo-app-6f8be",
    storageBucket: "todo-app-6f8be.appspot.com",
    messagingSenderId: "231052175426",
    appId: "1:231052175426:web:0e99acf407ca5ba10165db"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();


// tao them 
const todoCreate = document.querySelector("#todo-create")
todoCreate.addEventListener("submit", (event)=> {
    event.preventDefault()
    const content = event.target.elements.content.value;
    if(content)
    {
        set(push(ref(db, "todo-app")),{
            content: content,
            complete: false,
        })
    }

    event.target.elements.content.value = ""
})



// hien thi ra giao dien
onValue(ref(db , "todo-app"), (snapshot)=>{
    let html = "";
    snapshot.forEach((snapshotchild)  => {
        const childkey = snapshot.key;
        const childdata = snapshot.val();
    html +=
    `
    <div class="todo-app__item ${childdata.complete ? "completed" : "" }">
    <div class="todo-app__item-content">${childdata.content}</div>
    <div class="todo-app__item-actions">
        <button class="todo-app__item-button  todo-app__item-button--edit"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="todo-app__item-button  todo-app__item-button--check"><i class="fa-solid fa-check"></i></button>
        <button class="todo-app__item-button  todo-app__item-button--delete"><i class="fa-solid fa-minus"></i></button>
    </div>
</div>
    `
    })
    const todolist = document.querySelector("#todo-list")
    todolist.innerHTML = html
})

