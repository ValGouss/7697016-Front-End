export function ajoutListenerAvis() {
    const piecesElements = document.querySelectorAll('.fiches article button');

    for (let i=0; i < piecesElements.length; i ++) {
        piecesElements[i].addEventListener("click", async function (event) {
            
            const id = event.target.dataset.id;
            const reponse = await fetch(`http://localhost:8081/pieces/${id}/avis`);
            const avis = await reponse.json();
            const pieceElement = event.target.parentElement;
            const etoile = document.createElement('p');
            const avisElement = document.createElement('p');
            for (let i = 0; i < avis.length; i ++) {
                avisElement.innerHTML += `${avis[i].utilisateur}: ${avis[i].commentaire} <br>`;
            }
            etoile.innerText = `Nombre d'étoiles: ${avis[i].nbEtoiles} / 5`;
            pieceElement.appendChild(avisElement);
            pieceElement.appendChild(etoile);
        });
    };
};

export function ajoutListenerEnvoyerAvis() {
    const formulaireAvis = document.querySelector('.formulaire-avis');
    formulaireAvis.addEventListener("submit", function (event) {
        event.preventDefault();
        const avis = {
            pieceId : parseInt(event.target.querySelector("[name=piece-id]").value),
            utilisateur : event.target.querySelector("[name=utilisateur").value,
            commentaire : event.target.querySelector("[name=commentaire]").value,
            nbEtoiles : parseInt(event.target.querySelector("[name=etoiles]").value),
        };
        const chargeUtile = JSON.stringify(avis);
        fetch("http://localhost:8081/avis", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: chargeUtile,
        });
    });
};