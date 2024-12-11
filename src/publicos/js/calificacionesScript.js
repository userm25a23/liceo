
const numeroSeccion = document.getElementById("numeroSeccion").value;

for(let i=0; i<numeroSeccion;i++){
    //SELECCIONANDO TODO LOS ELEMENTOS
    const secciones = document.getElementById(`calificaciones-seccion${i}`);
    const seccionValor = document.getElementById(`seccionValor${i}`).value;

    secciones.addEventListener("click",()=>{
        window.location = `/calificaciones/panel/${seccionValor}`
    })
}