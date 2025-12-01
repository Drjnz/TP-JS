const ButtonAjout = document.getElementById("add")
const ButtonModifie = document.getElementById("edit")
const ButtonAfficher = document.getElementById("print")
const ButtonSupprimer = document.getElementById("del")
const update = document.getElementById("update")
const titreInput = document.getElementById("title")
const tacheInput = document.getElementById("description")
const message  = document.getElementById("ok")
const dialog = document.querySelector("dialog");
const closeButton = document.getElementById("close");



function displayPop()
{
    dialog.showModal(tache.id);

}
ButtonAfficher.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});
let taches = [];
let nextId = 1;



ButtonAjout.addEventListener("click", function(e){
    e.preventDefault();
    saveTaches()
    displayTaches()
    loadTaches()
    addTaches()
  })

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

  taches.forEach(function(tache){
    if(tache.id >= nextId){
      nextId = tache.id + 1;
    }
  })
  displayTaches();


};

function displayTaches() {
  if (!taches) return;
  message.innerHTML = "";

  taches.forEach(tache => {
    message.innerHTML += `
      <div class="todo" data-id="${tache.id}">
        <h3>${escapeHtml(tache.titre)}</h3>
        <div class="meta">
          <span class="chip">Général</span>
          <span>créé le ${tache.date}</span>
        </div>
        <p>${escapeHtml(tache.tache)}</p>
        <div class="button-row">
          <button onclick="displayPop(${tache.id})" class="btn-secondary">Afficher</button>
          <button onclick="modifierTache(${tache.id})" class="btn-warning">Modifier</button>
          <button onclick="supprimerTache(${tache.id})" class="btn-danger">Supprimer</button>
        </div>     
      </div>`;
  });
}

ButtonSupprimer.addEventListener ("click", function supprimerTaches(id, tacheInput) {
  taches = taches.filter(t => t.id !== id);
  saveTaches();
  tacheInput.remove();
});

function addTaches() {
  const tacheTitle = titreInput.value.trim();
  const tacheDesc = tacheInput.value.trim()

  if (tacheTitle === "") return;

  const tacheObject = { 
        id: nextId++,
        titre: titreInput,
        tache: tacheInput,
        date: new Date().toLocaleString() 
 
  };
  
  taches.push(tacheObject);
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
