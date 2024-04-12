document.addEventListener('DOMContentLoaded', function () {

    // Itens dos projetos
    let imgPrincipal = document.querySelector('.imgPrincipal');
    let titleJogos = document.querySelector('.title-jogos');
    let descJogos = document.querySelector('.desc-jogos');
    let main = document.querySelector('main');
    let btnJogar = document.querySelector('.btn-jogar');
    const audioFundo = document.querySelector('#musicaFundo');
    let imgIcon = document.createElement('img')
    let scrollButtons = document.querySelector('.scroll')
    let setaBaixo = document.querySelector('.setaBaixo')
    let setaCima = document.querySelector('.setaCima')
    let btnAtualizar = document.querySelector('#btn-atualizar')

    // Button
    const buttons = document.querySelectorAll('.btn-open');
    
    // Objeto contendo todos os projetos
    const projetos = {

        // Battle Tetris
        'btn-1': {
            img: "view/img/battle-tetris.gif",
            title: "Battle Tetris",
            description: "<strong>Feito por:</strong> Gustavo Gualda, João Paulo e João Luiz<br>"+
            "Batalhe com um amigo, podendo escolher diversas músicas para acompanhar sua batalha "+
            "e diversos fundos também!",
            music:"view/sounds/battle.mp3",
            imgIcon:"view/img/battletetris.gif"
        },

         // Bob Esponja Tetris
         'btn-2': {
            img: "view/img/bob-esponja.gif",
            title: "Bob Esponja Tetris",
            description: "<strong>Feito por:</strong> Ana Gabrielly, Maria Luisa, Leandro, Luiza e Fabiola<br>"+
            "Venha jogar na fenda do bikini, com três modos diferentes repletos de designs incríveis e pura diversão!",
            music:"view/sounds/bob-esponja.mp3",
            imgIcon:"view/img/bob-logo.gif"
        },

        // Mario Word Tetris
        'btn-3': {
            img: "view/img/mario-world.gif",
            title: "Mario World Tetris",
            description: "<strong>Feito por:</strong> Myrela, Nicoli, Leonardo e Patrick<br>"+
            "Venha se aventurar com os três modos de dificuldade no mundo do Mario! Luigi, Mario e Bowser!<br>"+
            "Dúvido você ganhar o modo Bowser!",
            music:"view/sounds/mario.mp3",
            imgIcon:"view/img/mario-icon.gif"
        },  
        
        // One piece tetris
        'btn-4': {
            img: "view/img/one-piece.gif",
            title: "One Piece Tetris",
            description: "<strong>Feito por:</strong> Nicole, Maria Clara e Raissa<br>"+
            "Venha embarcar em uma jornada com diversos desafios, e conquiste cada um deles!",
            music:"view/sounds/one-piece.mp3",
            imgIcon:"view/img/onepiece-icon.gif"
        },  

        // Barbie Tetris
        'btn-5': {
            img: "view/img/barbie.gif",
            title: "Barbie Tetris",
            description: "<strong>Feito por:</strong> Gisele, Brenda, Kauany e Kírya<br>"+
            "Venha conhecer a BarbieLândia com o Tetris da Barbie! <br>Fique ligado e presta atenção, "+
            "meu Tetris é diferente sou muito exigente!",
            music:"view/sounds/barbie.mp3",
            imgIcon:"view/img/barbie-icon.gif"
        },

        // Food Tetris
        'btn-6': {
            img: "view/img/food-tetris.gif",
            title: "Food Tetris",
            description: "<strong>Feito por:</strong> Gustavo Sachetto"+
            "Está com fome? Venha saborear esse Tetris, e se deliciar com a diversão!",
            music:"view/sounds/food.mp3",
            imgIcon:"view/img/food-tetris-logo.gif"
        },

        // Windows XP Tetris 
        'btn-7': {
            img: "view/img/windowsxp.gif",
            title: "Windows XP Tetris",
            description: "<strong>Feito por:</strong> Miguel, Matheus e Pedro<br>"+
            "Você tem sede de nostálgia? Aqui é o lugar certo! Jogue o Tetris do Windows XP agora mesmo!S2",
            music:"view/sounds/windows-xp.mp3",
            imgIcon:"view/img/img-windowsxp.webp"
        },
        
        
        // McQueen Tetris 
        'btn-8': {
            img: "view/img/mc-queen.gif",
            title: "McQueen Tetris",
            description: "<strong>Feito por:</strong> Júlio, Sales, Jhonatas e Ana Júlia<br>"+
            "Venha correr e se divertir na Copa Pistão! Katchau!",
            music:"view/sounds/mcqueen.mp3",
            imgIcon:"view/img/mcqueen.webp"
        },
        
        // Naruto Tetris 
        'btn-9': {
            img: "view/img/naruto.gif",
            title: "Naruto Tetris",
            description: "<strong>Feito por:</strong> Lara, Silvia, Isabela e Julia<br>"+
            "Recarregue seu Chakra e venha jogar esse Tetris nível ninja! Dúvido você sobreviver ao Sharingan!",
            music:"view/sounds/naruto.mp3",
            imgIcon:"view/img/naruto-icon.gif"
        },

         // Tetris Troll
         'btn-10': {
            img: "view/img/tetris-troll.gif",
            title: "Tetris Troll",
            description: "<strong>Feito por:</strong> Lucas, Richard e Ryan<br>"+
            "Será você capaz de sobreviver ao Tetris mais fácil? PS: Cuidado com as peças malucas",
            music:"view/sounds/troll.mp3",
            imgIcon:"view/img/troll-logo.webp"
        },

         // Mario Bros Tetris
         'btn-11': {
            img: "view/img/mario-bros.gif",
            title: "Mario Bros Tetris",
            description: "<strong>Feito por:</strong> Cauã, Gabriel e Daniel<br>"+
            "Venha conhecer o incrível mundo de Mario Bros e seus amigos!<br>",
            music:"view/sounds/super-mario.mp3",
            imgIcon:"view/img/mario2-icon.gif"
        },
        'btn-12':{
            img: "view/img/retrotetris.gif",
            title: "Retro Tetris",
            description: "<strong>Feito por:</strong> Erick, Gustavo Lima e Kauê<br>"+
            "No momento ainda não tem texto!<br>",
            music:"view/sounds/retro.mp3",
            imgIcon:"view/img/retroMatrix.gif"
        }  
        
    }

    function scrollParaCima(){
        scrollButtons.scroll({
            top: -500,
            behavior: "smooth"
        })
    }

    function scrollParaBaixo(){
        scrollButtons.scroll({
            top: 500,
            behavior: "smooth"
        })
    }
    setaBaixo.addEventListener('click', ()=>{
        scrollParaBaixo()
    })

    setaCima.addEventListener('click', ()=>{
        scrollParaCima()
    })

    btnJogar.addEventListener('click',()=>{
        let primeiraPagina = document.querySelector('.primeiraPagina')
        primeiraPagina.style.display='none'
        main.style.display='flex'
        
    })

    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            imgPrincipal.src = projetos[button.id]['img'];
            titleJogos.innerHTML = projetos[button.id]['title'];
            descJogos.innerHTML = projetos[button.id]['description'];
            audioFundo.src= projetos[button.id]['music'];
            audioFundo.volume=0.3
            audioFundo.play()

            

            imgIcon.classList.add('imgIconBtn')
            imgIcon.src=projetos[button.id]['imgIcon']
            button.appendChild(imgIcon)
        });

        button.addEventListener('mouseleave', () => {
            audioFundo.pause();
            button.removeChild(imgIcon)
        });
    });

    btnAtualizar.addEventListener('click', function(){
        location.reload();

    })


  
});