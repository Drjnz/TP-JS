const ButtonAjout = document.getElementById("add")
const ButtonModifie = document.getElementById("edit")
const ButtonAfficher = document.getElementById("print")
const ButtonSupprimer = document.getElementById("del")
const update = document.getElementById("update")
const titreInput = document.getElementById("title")
const tacheInput = document.getElementById("description")
const message  = document.getElementById("ok")
const popUp = document.getElementById("pop")



let taches = [];
let nextId = 1;


ButtonAfficher.addEventListener("click", function(e){
    e.preventDefault();
    popUpTaches();
});

ButtonAjout.addEventListener("click", function(e){
    e.preventDefault();
    saveTaches();
})

function popUpTaches(){
    let newWindow = window.open('/', 'popup', 'width=400,height=400');
    newWindow.focus();
    newWindow.onload = function(){
        let html =  `<div class="dialog-body">
                        <h3 id="dialogTaskTitle" style="margin-top:0">${escapeHtml(taches.titre)}</h3>
                        <p class="meta"><span id="dialogCategory" class="chip">${escapeHtml(taches.tache)}</span></p>
                        <div id="dialogDescription" style="white-space: pre-wrap; line-height:1.6"></div>
                     </div>`;
        newWindow.document.body.insertAdjacentHTML('afterbegin', html);

        if (typeof displayTaches === "function") {
            displayTaches(newWindow);
        }
    };
}



function saveTaches() {
  taches = {
    titre: titreInput.value,
    tache: tacheInput.value,
  };
  localStorage.setItem("taches", JSON.stringify(taches));

  displayTaches();
}
function loadTaches() {
  const tachesString = localStorage.getItem("taches");
  if (!tachesString) {
    return;
  }
  taches = JSON.parse(tachesString);
  displayTaches();

   taches.forEach(function (tache) {
    if (tache.id >= nextId) {
      nextId = tache.id + 1;
   }
    displayTodo(tache);
});
}
function displayTaches() {
  if (!taches) {
    return;
  }


message.innerHTML =     `<div id="list" class="list" aria-live="polite">
                                <div class="todo" data-id="fjv0sl3houd2">
                                     <h3>${escapeHtml(taches.titre)}</h3>
                                         <div class="meta">
                                        <span class="chip">Général</span>
                                        <span>créé le 21/11/2025 16:58:46</span>
                                        </div>
                                        <div class="button-row">
                                        <button class="btn-secondary" id="print">Afficher</button>
                                        <button class="btn-warning" id="edit">Modifier</button>
                                        <button class="btn-danger" id="del">Supprimer</button>
                                    </div>     
                                </div>`;

const tache = document.createElement("div");
tache.innerHTML = todoObject.title;
taches.appendChild(todoLi);                            

}
function addTaches() {
  const tacheTitle = titreInput.value.trim();

  if (tacheTitle === "") return;

  const tacheObject = { id: nextId, titre: titreInput, tache: tacheInput,  };
  taches.push(tacheObject);
  nextId++;

  saveTaches();
  displayTaches();
  titreInput.value = "";
  tacheInput.value = "";

}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

loadTaches();
