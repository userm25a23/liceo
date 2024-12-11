"use strinc";
const numeroDeRegistro = document.getElementById("numero-de-registro").value;


for(let i=0; i<numeroDeRegistro; i++){        
    const idEliminal = document.getElementById(`id-eliminal${i}`).value;
    const seccionEliminal = document.getElementById(`seccion-eliminal${i}`).value;
    const codigoEliminal = document.getElementById(`codigo-eliminal${i}`).value;
    const botonEliminal = document.getElementById(`boton-eliminal${i}`);

    //SELECCIONANDO LOS BOTONES (SI Y NO) DE ELIMINAL
    const botonEliminalSi = document.getElementById(`boton-eliminal-si${i}`);
    const botonEliminalNo = document.getElementById(`boton-eliminal-no${i}`);

    
    const seccionCodificada = btoa(seccionEliminal);
    const seccionCodificada2 = btoa(seccionCodificada);
    const codigoCodificado = btoa(codigoEliminal);
    const codigoCodificado2 = btoa(codigoCodificado);

    
    const mensageEliminal = document.getElementById(`contenedor-mensage-eliminal${i}`);

    botonEliminal.addEventListener("click",()=>{
        mensageEliminal.style.display = "flex";
    })
    
    
    botonEliminalSi.addEventListener("click",()=>{
        window.location = `/panel/eliminal/${idEliminal}/${seccionCodificada2}/${codigoCodificado2} `;
    })
    
    botonEliminalNo.addEventListener("click",()=>{
        mensageEliminal.style.display = "none";
    })


}




for(let i=0; i<numeroDeRegistro; i++){        
    const idEditar = document.getElementById(`id-editar${i}`).value;
    const nombreEditar = document.getElementById(`nombre-editar${i}`).value;
    const edadEditar = document.getElementById(`edad-editar${i}`).value;
    const seccionEditar = document.getElementById(`seccion-editar${i}`).value;
    const codigoEditar = document.getElementById(`codigo-editar${i}`).value;
    const botonEditar = document.getElementById(`boton-editar${i}`);
    
    botonEditar.addEventListener("click",()=>{  
        const nombreCodificado = btoa(nombreEditar);
        const nombreCodificado2 = btoa(nombreCodificado);          
        const edadCodificada = btoa(edadEditar);
        const edadCodificada2 = btoa(edadCodificada);
        const seccionCodificada = btoa(seccionEditar);
        const seccionCodificada2 = btoa(seccionCodificada);
        const codigoCodificado = btoa(codigoEditar);
        const codigoCodificado2 = btoa(codigoCodificado);

        window.location = `/panel/editar/${idEditar}/${nombreCodificado2}/${edadCodificada2}/${seccionCodificada2}/${codigoCodificado2} `;
    })

}


for(let i=0; i<numeroDeRegistro; i++){        
    const idVista = document.getElementById(`id-vista${i}`).value;
    const seccionVista = document.getElementById(`seccion-vista${i}`).value;
    const codigoVista = document.getElementById(`codigo-vista${i}`).value;
    const botonVista = document.getElementById(`boton-vista${i}`);

    botonVista.addEventListener("click",()=>{
        const seccionCodificada = btoa(seccionVista);
        const seccionCodificada2 = btoa(seccionCodificada);
        const codigoCodificado = btoa(codigoVista);
        const codigoCodificado2 = btoa(codigoCodificado);

        window.location = `/panel/vista/${idVista}/${seccionCodificada2}/${codigoCodificado2} `;
    
    })

}

