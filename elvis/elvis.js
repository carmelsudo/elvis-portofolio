const body = document.querySelector("body");
const label = document.getElementsByClassName('label');
 const header = document.getElementById('header-md')
const whoami = document.getElementById('whoami');
const label_star = document.getElementsByClassName("label-star")
const sectionCom = document.getElementById("titre-com");
const contenuCom = document.getElementById('contenu-com');
const whoami_icon = document.getElementById('whoami-icon');
const service = document.getElementById('service-icon');
const link_icon = document.querySelectorAll('.nav-link svg');
const link = document.querySelectorAll('.nav-link');
const exp_icon = document.getElementById('exp-icon');
const section = document.querySelectorAll('section');
const home = document.getElementById('home')
const formation = document.getElementById('formation');
const experience = document.getElementById("experience");

const deleteMessage = document.getElementById('delete-message');
const messageText = document.getElementById("message-text");
// const submitMessage = document.getElementById("submit-message");

const formContainer = document.querySelector(".form");
const changeForm = document.querySelectorAll(".change-form a");

const loginForm = document.querySelector('.login-form');
const loginFormInput = document.querySelectorAll('input');
const loginButton = document.getElementById('button-submit');
const main = document.getElementById('main');

const limiteur = document.querySelectorAll(".limiteur");
const submitButton = document.getElementsByClassName("submit");
const closeNavbarButton = document.getElementById("close-nav-button");

const userMode = document.getElementById('userMode');
const themeLabel = document.getElementById('theme-label');
const themeSelector = document.querySelectorAll(".theme-selector");

const progressCircle = document.getElementsByClassName('progress-circle');


/*change page theme when clicked*/
let count = 0; 
  userMode.addEventListener('click',()=>{
    count += 1;
            userMode.classList.toggle('dark-background');
            userMode.children[0].classList.toggle("switch-toggle");
            if(!userMode.children[0].classList.contains("switch-toggle")){
                userMode.children[0].classList.add("switch-toggle2")
            }
            else{
                userMode.children[0].classList.remove("switch-toggle2")
            }
            body.classList.toggle('dark-body');
            for(let s of themeSelector){
                s.classList.toggle('dark-accent');
            }
               if(count%2 === 1 ){
                themeLabel.textContent = 'sombre';
             }
             else{
                themeLabel.textContent = 'clair';
             }
        });
/*desactiver l'arrière plan si le formulaire est actif*/
const observeForm = new IntersectionObserver((entries)=>{
    if(entries[0].isIntersecting){
        main.classList.add('disable-main');
    }
    else{
        main.classList.remove('disable-main');
    }
});
observeForm.observe(formContainer)
closeNavbarButton.addEventListener('click',()=> {
    console.log(closeNavbarButton.childNodes)
    closeNavbarButton.childNodes[1].classList.toggle("burgur1");
    closeNavbarButton.childNodes[3].classList.toggle("burgur2");
    closeNavbarButton.childNodes[5].classList.toggle("burgur3");
    //desactiver l'arrière plan*/
    main.classList.toggle("disable-main");
    header.classList.toggle("toggle-navbar");
});
closeNavbarButton.addEventListener('mouseleave',()=> {
    closeNavbarButton.childNodes[1].classList.remove("burgur1");
    closeNavbarButton.childNodes[3].classList.remove("burgur2");
    closeNavbarButton.childNodes[5].classList.remove("burgur3");
    header.classList.remove("toggle-navbar");
    main.classList.remove("disable-main");

});

for(let i of submitButton){
        i.addEventListener('click',(event)=>{
            event.preventDefault();
             formContainer.style.display = 'flex';
        });
}
const observeLimiteur = new IntersectionObserver((entries)=>{
    for(let i of entries){
        if(i.isIntersecting){
            i.target.parentNode.classList.add("view-animation");
                observeLimiteur.unobserve(i.target);
            }   
    }
},{
    threshold: 1
});
limiteur.forEach(l => {
    observeLimiteur.observe(l)
});
let messageHeight;
const textArea = document.querySelectorAll("textarea");
/*animer les mots du tableau*/
function afficherEffacerMots(tableauMots) {
    let indexMot = 0;
    let indexLettre = 0;
    let sensAffichage = true; // true = affichage, false = effacement
    let vitesse = 100; // ms entre chaque lettre
    let elementAffichage = document.getElementById('load-word');
    function animer() {
        const motActuel = tableauMots[indexMot];
        
        if (sensAffichage) {
            // Phase d'affichage lettre par lettre
            if (indexLettre <= motActuel.length) {
                elementAffichage.textContent = motActuel.substring(0, indexLettre)+'|';
                indexLettre++;
                setTimeout(animer, vitesse);
            } else {
                // Pause après l'affichage complet du mot
                sensAffichage = false;
                setTimeout(animer, 1000); // Pause de 1 seconde
            }
        } else {
            // Phase d'effacement lettre par lettre
            if (indexLettre >= 0) {
                elementAffichage.textContent = motActuel.substring(0, indexLettre)+'|';
                indexLettre--;
                setTimeout(animer, vitesse / 2); // Effacement plus rapide
            } else {
                // Passer au mot suivant
                sensAffichage = true;
                indexMot = (indexMot + 1) % tableauMots.length;
                setTimeout(animer, 500); // Pause avant le mot suivant
            }
        }
    }

    // Démarrer l'animation
    animer();
}


const mots = ["Comptable", "Homme d'affaire", "Entrepreneur"];
afficherEffacerMots(mots) ;
//ajuster la taille du text area en fcti du nombre de l'input
textArea.forEach(text=>{
    text.addEventListener('input',() =>{
        text.style.height = 'auto';
        if(text.scrollHeight <= 200){
            text.style.height =  Math.max(text.scrollHeight,40)+'px';
            messageHeight= text.scrollHeight;
        }
        else{
            
            text.style.height = messageHeight+'px';
        }
    });
});
//desactiver le boutton submit en cas de champ vide
function disableSubmit(){

    if(loginFormInput[0].value === '' || loginFormInput[1].value === '' ){
        loginButton.disabled = 'true';
        loginButton.style.opacity = '0.5';
        loginButton.style.cursor = 'not-allowed';
    }
    else{
        loginButton.disabled = 'false';
        loginButton.style.opacity = '1';
        loginButton.style.cursor = 'pointer';
    }
}

function l(element){
    console.log(element)
}

document.getElementById("close-form").addEventListener("click",()=>{
    formContainer.style.display="none";
})

//changement de la section active dans le navbar
const observeSection = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            if(entry.target.id === 'formation'){
                link[3].firstElementChild.style.fill= '#3a86ff';
                link[3].parentElement.classList.add('active-section');
                for(let i of link){
                    if(i !== link[3]){/*parcour tout les autre sections pour les desactiver*/
                        i.firstElementChild.style.fill= 'white';
                        i.parentElement.classList.remove('active-section');
                    }
                }
                const waitFormation = setTimeout(()=>{//attendre 2s avant d'animer les formations
                    const style = document.createElement('style');
                    style.textContent = ".formation h5::after{  animation: movedot 2s ease-in-out forwards}";
                    document.head.appendChild(style);
                    clearTimeout(waitFormation);
                },2000);
            }
            else if(entry.target.id === 'home'){
                link[0].firstElementChild.style.fill= '#3a86ff';
                link[0].parentElement.classList.add('active-section');
                for(let i of link){
                    if(i !== link[0]){/*parcour tout les autre sections pour les desactiver*/
                        i.firstElementChild.style.fill= 'white';
                        i.parentElement.classList.remove('active-section');
                    }
                }
            }
            else if(entry.target.id === 'whoami-div'){
                link[1].firstElementChild.style.fill= '#3a86ff';
                link[1].parentElement.classList.add('active-section');
                for(let i of link){/*parcour tout les autre sections pour les desactiver*/
                    if(i !== link[1]){
                        i.firstElementChild.style.fill= 'white';
                        i.parentElement.classList.remove('active-section');
                    }
                }
                const wait = setTimeout(()=>{//attendre deux seconde avant d'animer les cercles langue
                    progressCircle[0].id='fr';
                    progressCircle[1].id = 'ang';
                    progressCircle[2].id = 'fon';
                    progressCircle[3].id = 'goun';
                    clearTimeout(wait);
                },2000);
            }
            else if(entry.target.id === 'service'){
                link[2].firstElementChild.style.fill= '#3a86ff';
                link[2].parentElement.classList.add('active-section');
                for(let i of link){
                    if(i !== link[2]){
                        i.firstElementChild.style.fill= 'white';
                        i.parentElement.classList.remove('active-section');
                    }
                }
            }
             else if(entry.target.id === 'experience'){
                link[4].firstElementChild.style.fill= '#3a86ff';
                link[4].parentElement.classList.add('active-section');
                for(let i of link){
                    if(i !== link[4]){
                        i.firstElementChild.style.fill= 'white';
                        i.parentElement.classList.remove('active-section');
                    }
                }
            }
             else if(entry.target.id === 'commentaire'){
                link[5].firstElementChild.style.fill= '#3a86ff';
                link[5].parentElement.classList.add('active-section');
                for(let i of link){
                    if(i !== link[5]){
                        i.firstElementChild.style.fill= 'white';
                        i.parentElement.classList.remove('active-section');
                    }
                }
            }
            else if(entry.target.id === 'contact'){
                link[6].firstElementChild.style.fill= '#3a86ff';
                link[6].parentElement.classList.add('active-section');
                for(let i of link){
                    if(i !== link[6]){
                        i.firstElementChild.style.fill= 'white';
                        i.parentElement.classList.remove('active-section');
                    }
                }
            }
        }
    },{
        threshold: 1.0,
        root: main,
    })
})
for(let s of section){
    observeSection.observe(s)
}
/*observer uniquement pour la section qui sui-je*/

observeSection.observe(document.getElementById('whoami-div'))
/* change link color if clicked inside the nav bar*/
function toggleState(){
    for(let i of link){
    i.addEventListener('click',(target)=>{
        i.firstElementChild.style.fill= '#3a86ff';
         i.parentElement.classList.add('active-section');
        for(let j of link){
            if(i !== j){
                j.firstElementChild.style.fill= 'white';
                 j.parentElement.classList.remove('active-section');
                
            }
        }

    })}
}
toggleState();
/* change link color if clicked*/

/*bounce comment star when visible*/
const observer = new IntersectionObserver((entries)=>{
    if(entries[0].isIntersecting){
           for(let i of label_star){
                i.classList.add('bounce-star');
                
            }
    }
    },{

    threshold: 1.0
})
observer.observe(sectionCom)
const c3 = document.getElementById('c3')
function scrollComments(){
    c3.scrollTo(
        {
            left:c3.scrollWidth,
            behavior:"smooth"
        }
    );
}

setInterval(scrollComments,1000)
/*code js pour créer et animer les icones*/
 // Icônes comptables avec leurs classes CSS
        const icons = [
            { class: 'comptable-icon icon-budget', html: '📊', name: 'Budget' },
            { class: 'comptable-icon icon-facture', html: '🧾', name: 'Facture' },
            { class: 'comptable-icon icon-bilan', html: '📈', name: 'Bilan' },
            { class: 'comptable-icon icon-taxe', html: '💰', name: 'Taxes' },
            { class: 'comptable-icon icon-profit', html: '💹', name: 'Profit' },
            { class: 'comptable-icon icon-compte', html: '🏦', name: 'Compte' },
            { class: 'comptable-icon icon-budget', html: '📋', name: 'Rapport' },
            { class: 'comptable-icon icon-facture', html: '💳', name: 'Paiement' },
            { class: 'comptable-icon icon-bilan', html: '📉', name: 'Analyse' },
            { class: 'comptable-icon icon-taxe', html: '⚖️', name: 'Juridique' }
        ];

        const container = document.getElementById('comptableApp');

        // Fonction pour générer une position aléatoire
        function getRandomPosition() {
            const x = Math.random() * (container.offsetWidth - 60);
            const y = Math.random() * (container.offsetHeight - 60);
            return { x, y };
        }

        // Fonction pour animer les icônes
        function animateIcons() {
            const iconElements = document.querySelectorAll('.comptable-icon');
            
            iconElements.forEach(icon => {
                const newPos = getRandomPosition();
                const duration = 2 + Math.random() * 3; // Durée aléatoire entre 2 et 5 secondes
                
                icon.style.transition = `all ${duration}s ease-in-out`;
                icon.style.left = `${newPos.x}px`;
                icon.style.top = `${newPos.y}px`;
                icon.style.transform = `scale(${0.8 + Math.random() * 0.4}) rotate(${Math.random() * 360}deg)`;
            });
        }

        // Créer et positionner les icônes initialement
        icons.forEach((iconData, index) => {
            const iconElement = document.createElement('div');
            iconElement.className = iconData.class;
            iconElement.innerHTML = iconData.html;
            iconElement.title = iconData.name;
            
            const pos = getRandomPosition();
            iconElement.style.left = `${pos.x}px`;
            iconElement.style.top = `${pos.y}px`;
            iconElement.style.opacity = '0.8';
            iconElement.style.transform = `scale(${0.8 + Math.random() * 0.4})`;
            
            // Effet au survol
            iconElement.addEventListener('mouseenter', function() {
                this.style.opacity = '1';
                this.style.transform = 'scale(1.2)';
                this.style.zIndex = '1000';
            });
            
            iconElement.addEventListener('mouseleave', function() {
                this.style.opacity = '0.8';
                this.style.zIndex = '1';
            });
            
            container.appendChild(iconElement);
        });

        // Démarrer l'animation
        animateIcons();
        
        // Changer les positions toutes les 3 secondes
        setInterval(animateIcons, 3000);

        // Redimensionner les icônes quand la fenêtre change de taille
        window.addEventListener('resize', function() {
            const iconElements = document.querySelectorAll('.comptable-icon');
            iconElements.forEach(icon => {
                const pos = getRandomPosition();
                icon.style.left = `${pos.x}px`;
                icon.style.top = `${pos.y}px`;
            });
        });