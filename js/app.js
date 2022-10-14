

const sendEmail = {
    destinatario: "",
    asunto: "",
    mensaje: ""
}

let errores = [];
const btnEnviar = document.querySelector('form button');


document.addEventListener('DOMContentLoaded',() => {

    btnEnviar.addEventListener('click',handleSubmit);
    document.querySelector('form #resetBtn').addEventListener('click',resetForm);

    const email = document.querySelector('#email');
    const asunto = document.querySelector('#asunto');
    const mensaje = document.querySelector('#mensaje');


    email.addEventListener('blur', validarForm);
    asunto.addEventListener('blur', validarForm);
    mensaje.addEventListener('blur',validarForm);

});

function validarForm(e) {
       
    if (e.target.id === "email") {
        const emailValido = validarEmail(e.target.value);
        const contiene = errores.includes(email);

        if (!emailValido) {
            if (!contiene) errores = [...errores, e.target];
            alerta(e.target, true);
        } else {
            
            if (contiene) {
                const erroresBorrado = errores.filter( error => error.id !== email.id);
                errores = erroresBorrado;
            }
    
            alerta(e.target, false);
            sendEmail.destinatario = e.target.value;

        }
    };

    if (e.target.id === "asunto") {
        const contiene = errores.includes(asunto);

        if (e.target.value.length < 3) {
            if (!contiene) errores = [...errores, e.target];
            
            alerta(e.target, true);
        } else {
            
            if (contiene) {
                const erroresBorrado = errores.filter( error => error.id !== asunto.id);
                errores = erroresBorrado;
            }
            sendEmail.asunto = e.target.value;

            alerta(e.target, false);
        }
        
    };

    if (e.target.id === "mensaje") {
        const contiene = errores.includes(mensaje);

        if (e.target.value.length < 5 ) {
            if (!contiene) errores = [...errores, e.target];
            
            alerta(e.target, true);
        } else {
            
            if (contiene) {
                const erroresBorrado = errores.filter( error => error.id !== mensaje.id);
                errores = erroresBorrado;
            }
            sendEmail.mensaje = e.target.value;
            
            alerta(e.target, false);
        }

    };
    console.log(mensaje.value.length);
    if (errores.length > 0 || email.value.length === 0 || asunto.value.length === 0 || mensaje.value.length === 0 ) {
        if (!btnEnviar.classList.contains('cursor-not-allowed')) {
            btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
        }  

        btnEnviar.disabled = true;
        return;
    }

    btnEnviar.disabled = false;
    btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');

} 

function alerta(alerta, modo = 'reset') {

    if (modo === "reset") {
        email.classList.remove('success','error');
        asunto.classList.remove('success','error');
        mensaje.classList.remove('success','error');
    };

    //error
    if (modo) {
        alerta.classList.remove('success');
        alerta.classList.add('error');
    } else {
        //Quito el error
        alerta.classList.remove('error');
        alerta.classList.add('success');

    }
}

function validarEmail(email) {
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
    const resultado = regex.test(email);
    return resultado;
} 

function resetForm(e) {
    e.preventDefault();   

    const confirmar = confirm('¿Seguro que quieres borrar el formulario?');
    if (!confirmar) return;

    document.querySelector('form').reset();
    alerta(null);

    sendEmail.asunto = '';
    sendEmail.destinatario = '';
    sendEmail.mensaje = '';
    
}

function handleSubmit(e) {
    e.preventDefault();


    alert(`Email para:${sendEmail.destinatario} Asunto: ${sendEmail.asunto} Mensaje: ${sendEmail.mensaje}`);
}
