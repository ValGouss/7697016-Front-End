//Récupération des pièces depuis le fichier JSON
const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();

for (let i = 0; i < pieces.length; i++) {

    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionFiches = document.querySelector(".fiches");
    // Création d’une balise dédiée à une pièce automobile
    const pieceElement = document.createElement("article");
    
    const article = pieces[i];
    const imageElement = document.createElement('img');
    imageElement.src = article.image;

    const nomElement = document.createElement('h2');
    nomElement.innerText = article.nom;

    const prixElement = document.createElement('p');
    prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;

    const categorieElement = document.createElement('p');
    categorieElement.innerText = article.categorie ?? "(aucune catégorie)";

    const descriptionElement = document.createElement('p');
    descriptionElement.innerText = article.description ?? "Pas de description pour le moment";

    const stockElement = document.createElement('p');
    stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";


    //Ratachement de nos balises au DOM
    sectionFiches.appendChild(pieceElement);
    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(stockElement);

}

//Mise en place du bouton Trier croissant

const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return a.prix - b.prix;
    });
    console.log(piecesOrdonnees);
});

//Mise en place du bouton Filtrer par pièces abordables

const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= 35;
    });
    console.log(piecesFiltrees);
});

//Mise en place du bouton Trier decroissant

const boutonTrierDecroisssant = document.querySelector("btn-trierDesc");
boutonTrierDecroisssant.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a,b) {
        return b.prix - a.prix;
    });
    console.log(piecesOrdonnees);
});

//mise en place du bouton Filtrer sans description

const boutonFiltrerSansDescription = document.querySelector("btn-sansDescription");
boutonFiltrerSansDescription.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.description == null;
    });
    console.log(piecesFiltrees);
});
