import { ajoutListenerAvis, ajoutListenerEnvoyerAvis } from "./avis.js";

window.localStorage.setItem("nom", "Les Bonnes Pièces !");

const nomEntreprise =window.localStorage.getItem("nom");
let pieces = window.localStorage.getItem("pieces");

if (pieces === null) {
    //Récupération des pièces depuis le fichier JSON
    const reponse = await fetch('http://localhost:8081/pieces/');
    pieces = await reponse.json();
    window.localStorage.setItem("pieces", JSON.stringify(pieces));
}
else {
    pieces = JSON.parse(pieces);
}

function genererPieces (pieces) {
    for (let i = 0; i < pieces.length; i++) {

        // Création d’une balise dédiée à une pièce automobile
        const pieceElement = document.createElement("article");

        const imageElement = document.createElement('img');
        imageElement.src = pieces[i].image;
        pieceElement.appendChild(imageElement);

        const nomElement = document.createElement('h2');
        nomElement.innerText = pieces[i].nom;
        pieceElement.appendChild(nomElement);

        const prixElement = document.createElement('p');
        prixElement.innerText = `Prix: ${pieces[i].prix} € (${pieces[i].prix < 35 ? "€" : "€€€"})`;
        pieceElement.appendChild(prixElement);

        const categorieElement = document.createElement('p');
        categorieElement.innerText = pieces[i].categorie ?? "(aucune catégorie)";
        pieceElement.appendChild(categorieElement);
        
        const descriptionElement = document.createElement('p');
        descriptionElement.innerText = pieces[i].description ?? "Pas de description pour le moment";
        pieceElement.appendChild(descriptionElement);
        
        const stockElement = document.createElement('p');
        stockElement.innerText = pieces[i].disponibilite ? "En stock" : "Rupture de stock";
        pieceElement.appendChild(stockElement);

        const avisBouton = document.createElement("button");
        avisBouton.dataset.id = pieces[i].id;
        avisBouton.textContent = "Afficher les avis";
        pieceElement.appendChild(avisBouton);

        //Ratachement de la balise article au body
        document.querySelector(".fiches").appendChild(pieceElement);
    }
    ajoutListenerAvis();
    ajoutListenerEnvoyerAvis();
}
// Affichage de la page
genererPieces(pieces);


//mise en place du boutton accueil
const boutonAccueil = document.querySelector(".btn-accueil");
boutonAccueil.addEventListener("click", function () {
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(pieces);
});


//Mise en place du bouton Trier croissant

const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return a.prix - b.prix;
    });
    console.log(piecesOrdonnees);
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
});


//Mise en place du bouton Filtrer par pièces abordables

const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= 35;
    });
    console.log(piecesFiltrees);
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

//Mise en place du bouton Trier decroissant

const boutonTrierDecroisssant = document.querySelector(".btn-triDesc");
boutonTrierDecroisssant.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a,b) {
        return b.prix - a.prix;
    });
    console.log(piecesOrdonnees);
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
});

//mise en place du bouton Filtrer sans description

const boutonFiltrerSansDescription = document.querySelector(".btn-sansDescription");
boutonFiltrerSansDescription.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.description != null;
    });
    console.log(piecesFiltrees);
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});


//Récupération des noms des pièces
const noms = pieces.map(piece => piece.nom);
for(let i = pieces.length - 1; i >= 0; i--) {
    if(pieces[i].prix > 35) {
        noms.splice(i, 1);
    }
}
console.log(noms);
    
//Création d'une liste des pièces abordables
const abordablesElements = document.createElement('ul');
for (let i=0; i< noms.length ; i++) {
    const nomElement = document.createElement('li');
    nomElement.innerText = noms[i];
    abordablesElements.appendChild(nomElement);
};
document.querySelector('.abordables').appendChild(abordablesElements);


//Récupération des noms et prixDisponible des pièces disponibles
const nomsDisponible = pieces.map(piece => piece.nom);
const prixDisponible = pieces.map(piece => piece.prix);
for(let i = pieces.length - 1; i >= 0; i--) {
    if(pieces[i].disponibilite == false) {
        nomsDisponible.splice(i, 1);
        prixDisponible.splice(i, 1);
    }
}
console.log(nomsDisponible);

//Création d'une liste de pièces disponibles
const disponiblesElements = document.createElement('ul');
for (let i=0; i < nomsDisponible.length ; i++) {
    const nomElement = document.createElement('li');
    nomElement.innerText = `${nomsDisponible[i]} - ${prixDisponible[i]} €`;
    disponiblesElements.appendChild(nomElement);
};
document.querySelector('.disponibles').appendChild(disponiblesElements)

//Récupération des prix des pièces et multiplication par 2
const prix_double = pieces.map(piece => piece.prixDisponible * 2);

//Efface le contenue de la balise body
//document.querySelector(".fiches").innerHTML = "";

//Prix max par range
const prixMax = document.querySelector("#prix-max");
prixMax.addEventListener("input", function(){
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= prixMax.value;
    });
    console.log(piecesFiltrees);
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

const bouttonMettreAJour = document.querySelector(".btn-maj");
bouttonMettreAJour.addEventListener("click", function () {
    window.localStorage.removeItem("pieces");
});