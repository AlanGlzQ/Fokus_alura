//Constantes a utilizar
const html = document.querySelector('html');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonLargo = document.querySelector('.app__card-button--largo');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const inputEnfoqueMusica = document.querySelector('#alternar-musica');//al ser con una id se usa el "#"
const botonIniciarPausar = document.querySelector('#start-pause');
const textoIniciarPausar = document.querySelector('#start-pause span');
const iconoIniciarPausar = document.querySelector('.app__card-primary-button');
const tiempoEnPantalla = document.querySelector('#timer');

//seccion de audios
const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const audioPlay = new Audio('./sonidos/play.mav');
const audioPause = new Audio('./sonidos/pause.mp3');
const auidioTiempoFinalizado = new Audio('./sonidos/beep.mp3');


let tiempoTranscurridoEnSegundos = 1500;//se declara en miles
let idIntervalo = null;

musica.loop = true;//permitir que el usuario escuche la musica cuanto desee

inputEnfoqueMusica.addEventListener('change', () => {
    if(musica.paused)
    {
        musica.play();
    }else
        {
            musica.pause();
        }
})

botonCorto.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 300;
    cambiarContexto('descanso-corto');
    botonCorto.classList.add('active');
});//funcion para cuando se haga click en el "descanso corto" cambie el color 


botonEnfoque.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 1500;
    cambiarContexto('enfoque');
    botonEnfoque.classList.add('active');
});//funcion para cuando se haga click en el "enfoque" cambie el color
   

botonLargo.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 900;
    cambiarContexto('descanso-largo');
    botonLargo.classList.add('active');
});//funcion para cuando se haga click en el "descanso largo" cambie el color


function cambiarContexto(contexto){
    
    mostrarTiempo();
    botones.forEach(function(contexto){
        contexto.classList.remove('active');
    })
   
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagenes/${contexto}.png`);

    switch (contexto) { //cambiar el texto qeu saldria dependiendo de la pantalla que se muestre
        
        case "enfoque":
            titulo.innerHTML = `
            Optimiza tu productividad,<br>
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>
                `//pantalla de enfoque
            break;

        case "descanso-corto":
            titulo.innerHTML = `
                ¿Qué tal tomar un respiro?
                    <strong class="app__title-strong">¡Haz una pausa corta!</strong>
                `//pantalla de descanso corto 
            break; 

        case "descanso-largo":
            titulo.innerHTML = `
            Hora de volver a la superficie 
                <strong class="app__title-strong">Haz una pausa larga.</strong>
            `//pantalla de descanso largo 
    
        default:
            break;
    }
}

const cuentaRegresiva = () => {//variable para la cuenta regresiva
    if(tiempoTranscurridoEnSegundos <= 0){
        auidioTiempoFinalizado .play();
        alert('Tiempo Finalizado');
        reiniciar();
        return;
    }
    textoIniciarPausar.textContent = "Pausar";
    iconoIniciarPausar.setAttribute('src', '/imagenes/pause.png');
    tiempoTranscurridoEnSegundos -= 1;
    console.log("Temporizador: " + tiempoTranscurridoEnSegundos);
    console.log('id: ' + idIntervalo);
    mostrarTiempo();

}

botonIniciarPausar.addEventListener('click', iniciarPausar);//para que se tome en cuenta el click en el boton de inicio independientemente de la actividad

function iniciarPausar (){ //funcion para determinar las acciones que se llevan a cabo al presionar el boton de inicio
    if(idIntervalo){
        audioPause.play();
        reiniciar();
        return;
    }//condicional para determinar posibles casos

    audioPlay.play();
    idIntervalo = setInterval(cuentaRegresiva, 1000);
}

function reiniciar(){//funcion para reiniciar los atributos colocados 
    clearInterval(idIntervalo);
    textoIniciarPausar.textContent = "Comenzar";//el textcontent comprende todo como texto sin nesecidad de etiquetas 
    iconoIniciarPausar.setAttribute('src', '/imagenes/play_arrow.png');
    idIntervalo = null;
}

function mostrarTiempo(){
    const tiempo = new Date(tiempoTranscurridoEnSegundos  * 1000);
    const tiempoFormateado = tiempo.toLocaleDateString('es-MX', {minute: '2-digit', second:'2-digit'});//variable que declara el tiempo en la localidad, esta vez en México con las especificaciones de tener 2 digitos en minutos y segundos.
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`
}

mostrarTiempo();//para que muestre el temporizador en todo momento 