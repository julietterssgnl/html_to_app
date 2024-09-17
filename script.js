// Afficher un message dans la console
console.log('Hello world from script.js');

// Récupérer l'élement h1 dans le DOM
let h1 = document.querySelector('h1');

// Ajouter du texte à l'élément h1
h1.innerText += " from JS";

// Modifier le style de l'élément h1
h1.style.color = 'darkviolet';

// Créer un élément h2
let h2 = document.createElement('h2');
h2.innerText = "Welcome to the DOM";
h2.className = 'subtitle';

// Ajouter l'élément h2 après l'élément h1
h1.after(h2);

// Ajouter un élement h3 après l'élément h2 affichant l'heure actuelle
let h3 = document.createElement('h3');
h3.innerText = new Date().toLocaleTimeString();

// Ajouter l'élément h3 après l'élément h2
h2.after(h3);

// Mettre à jour l'heure toutes les secondes
setInterval(() => {
    h3.innerText = new Date().toLocaleTimeString();
}, 1000);

// Supprimer le premier élément de la liste et ajouter un nouvel élément
const list = document.querySelector("ul");
const firstElement = list.firstElementChild;
console.log(`Suppression le premier élément de valeur <${firstElement.innerText}> de la liste`);
firstElement.remove();

const newLi = document.createElement("li");
newLi.innerText = "Item 3";
console.log(`Ajout d'un nouvel élément de valeur <${newLi.innerText}> à la liste`);
list.append(newLi);

// Changer la couleur de fond de l'élément caption lorsque la souris est dessus
const caption = document.querySelector("caption");
// Change the color of the caption element when the mouse is over it
caption.addEventListener("mouseover", () => {
    caption.style.color = "red";
});

// Changer la couleur de fond de l'élément caption lorsque la souris n'est plus dessus
caption.addEventListener("mouseout", () => {
    caption.style.color = "black";
});



const shake2 =(id) => {
    // récupère l'élément par son id
    const element = document.getElementById(id);
    if (element.classList.contains("shake")){
        element.classList.remove("shake");
    } else {
        element.classList.add("shake");
    }
}




// Nettoyer le contenu du tableau avant de le remplir
document.querySelector("tbody").innerHTML = "";

// Récupérer les utilisateurs depuis l'API JSONPlaceholder et les afficher dans le tableau
fetch("https://jsonplaceholder.typicode.com/users").then((response) => {
    // Une fois la réponse reçue, vérifier si elle est valide
    if(!response.ok) {
        // Si la réponse n'est pas valide, afficher un message d'erreur, en gérant les cas 404 et autres
        if(response.status === 404)
            throw new Error("The server responded with a 404 error");
        else
            throw new Error("The server responded with an error");
    }else {
        // Si la réponse est valide, retourner les données au format JSON
        return response.json();
    }
}).then((users) => {
    if(users.length ==0){
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.innerText = "Aucun utilisateur trouvé";
        td.colSpn = 3;
        tr.appendChild(td);
        document.querySelector("tbody").appendChild(tr);
    }
    // Une fois les données reçues, les afficher dans le tableau en créant une ligne par utilisateur
    users.forEach((user) => {
        // Créer les cellules correspondantes pour le nom, le nom d'utilisateur et l'email
        const td1 = document.createElement("td");
        td1.innerText = user.name;
        const td2 = document.createElement("td");
        td2.innerText = user.username;
        const td3 = document.createElement("td");
        td3.innerHTML = '<a href="mailto:' + user.email + '">' + user.email + '</a>';
        // td3.innerHTML = `<a href="mailto:${user.email}">${user.email}</a>`;

        // Créer la ligne contenant les 3 cellules
        const tr = document.createElement("tr");
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        // Ajouter la ligne au tableau
        document.querySelector("tbody").appendChild(tr);
    });
}).catch((error) => {
    // En cas d'erreur, afficher un message d'erreur dans une ligne du tableau
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.innerText = error.message;
    tr.appendChild(td);
    document.querySelector("tbody").appendChild(tr);
});
