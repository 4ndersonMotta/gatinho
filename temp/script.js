const horas = document.getElementById('horas');
const minutos = document.getElementById('minutos');
const segundos = document.getElementById('segundos');

let relogio = setInterval(()=> {

    let date = new Date();
    let horasA = date.getHours();
    let minutosA = date.getMinutes();
    let segundosA = date.getSeconds();

    if (horasA < 10) horasA = `0${horasA}`;
    if (minutosA < 10) minutosA = `0${minutosA}`;
    if (segundosA < 10) segundosA = `0${segundosA}`;

    horas.innerHTML = horasA;
    minutos.innerHTML = minutosA;
    segundos.innerHTML = segundosA;
});

const horasT = document.getElementById('horasT');
const minutosT = document.getElementById('minutosT');
const segundosT = document.getElementById('segundosT');
const iniciar = document.getElementById('buttonIniciar');
const zerar = document.getElementById('buttonZerar');
const display = document.getElementById('display');

for (let i=0; i <= 50; i++) {
    horasT.innerHTML += `<option value="${i}">${i}</option>`;
}

for (let i=0; i <= 59; i++) {
    minutosT.innerHTML += `<option value="${i}">${i}</option>`;
}

for (let i=0; i <= 59; i++) {
    segundosT.innerHTML += `<option value="${i}">${i}</option>`;
}

    let interval;

iniciar.addEventListener('click', ()=> {
    
    clearInterval(interval);

    let horasValue = horasT.value;
    let minValue = minutosT.value;
    let segValue = segundosT.value;

    if (horasValue == 0 && minValue == 0 && segValue == 0) {
        error(horasT ,"Nenhum valor definido.");
    } else {
        const check = horasT.parentElement;
        check.className = 'temporizador';

        horasValue = horasValue < 10? "0"+horasValue : horasValue;
        minValue = minValue < 10? "0"+minValue : minValue;
        segValue = segValue < 10? "0"+segValue : segValue;

        display.innerHTML = `<p>${horasValue}:${minValue}:${segValue}</p>`;

        interval = setInterval(()=> {

            segValue--;

            if (segValue <= 0) {
                if (horasValue > 0 && minValue <= 0) {
                    horasValue--;
                    minValue = 60;
                    segValue = 59;  
                    if (horasValue < 10) horasValue = "0" + horasValue;
                        
                }

                if (minValue > 0) {
                    minValue--;
                    segValue = 59;
                    if (minValue < 10) minValue = "0" + minValue;
                    
                } else {
                    document.getElementById('alarme').play();
                    clearInterval(interval);
                }
            }
            if (segValue < 10) segValue = "0" + segValue;
            
            display.innerHTML = `<p>${horasValue}:${minValue}:${segValue}</p>`; 
        }, 1000);
    };
});

zerar.addEventListener('click', ()=> {
    
    clearInterval(interval);
    display.innerHTML = "<p>00:00:00</p>"
});

function error(select, msgError) {

    const check = select.parentElement;
    const small = check.querySelector('small');

    small.innerHTML = msgError;
    check.className = 'temporizador error';
};