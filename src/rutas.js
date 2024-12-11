const rutas = require("express").Router();
const { render } = require("ejs");
const { conexion, verificarAcceso, mostrar, consulta, eliminal, editar, vista, agregarNota, mostrarSecciones, verificarCalificaciones, vistaNota } = require("./base.js");


//ESTA PARTE ES PARA PODER GENERAR UNA CONSULTA SQL PARA CAMBIAR EL CODIGO DE CALIFICACIONES
/**
const listaSeccion = [
"1roa",
"1rob",
"1roc",
"1rod",
"2doa",
"2dob",
"2doc",
"2dod",
"3roa",
"3rob",
"3roc",
"3rod",
"4toa",
"4tob",
"4toc",
"4tod",
"5toa",
"5tob",
"5toc",
"5tod",
"6toa",
"6tob",
"6toc",
"6tod"]

const max = 999;
const min = 999999;

for(let i=0; i<listaSeccion.length;i++){
    
    const random = Math.floor((Math.random() * (max - min + 1)) + min);


    console.log(`
        UPDATE accesocalificaciones
        SET codigo = ${random}
        WHERE id_acceso = ${i+1};       
        `)


}

 */




//CONECTANDOME A LA BASE DE DATO MYSQL
conexion()
.then(resultado=>{console.log(resultado)})
.catch(error=>{console.log(error)});

//DEFINICION DE CADA UNAS DE LAS RUTAS
rutas.get("/",(req,res,next)=>{
    res.render("index.ejs");
    next();
})

//TRABAJANDO CON LAS RUTAS DE CALIFICACIONES
rutas.get("/calificaciones",(req,res,next)=>{
    //LLAMANDO A LA FUNCION QUE ME DATA LA CANTIDA DE SECCIONES EN LA TABLA ACCESO
    mostrarSecciones()
    .then(resultado=>{
        res.render("calificaciones.ejs", {numeroSeccion: resultado});
        next();
    })
    .catch(error=>{console.log(error)})
})
rutas.get("/calificaciones/panel/:seccionValor",(req,res,next)=>{
    const seccion = req.params.seccionValor;

    res.render("calificacionesPanel.ejs",{seccion: seccion});
    next()
})
rutas.post("/calificaciones/verificar", (req,res,next)=>{
    //OBTENIENDO LA SECCION Y EL CODIGO DE CALIFICACIONES
    const { seccion, codigo } = req.body;

    verificarCalificaciones(seccion,codigo)
    .then(resultado=>{
        //CODIFICANDO LA SECCION PARA LA RUTA DE NOTAS
        const seccionCodificada = btoa(seccion);
        const seccionCodificada2 = btoa(seccionCodificada);

        res.redirect(`/calificaciones/notas/${seccionCodificada2}`);

    })
    .catch(error=>{console.log(error)})
    
})
rutas.get("/calificaciones/notas/:seccion",(req,res,next)=>{
    const seccion = req.params.seccion;
    //DECODIFICANDO LA SECCION ENVIADO POR EL METODO GET
    const seccionDecodificada = atob(seccion);
    const seccionDecodificada2 = atob(seccionDecodificada);

    vistaNota(seccionDecodificada2)
    .then(resultado=>{
        res.render("calificacionesNota.ejs",{notas: resultado, seccion: seccionDecodificada2});
    })
    .catch(error=>{console.log(error)})
})



rutas.get("/acercade",(req,res,next)=>{
    res.render("acercaDe.ejs");
    next();
})
rutas.get("/acceder",(req,res,next)=>{
    res.render("acceder.ejs",{mensage: ""});
    next();
})


rutas.post("/accederVerificar", (req,res)=>{

    const {seccion, codigo } = req.body;

    verificarAcceso(seccion,codigo)
    .then(resultado=>{
        const seccion = resultado[0].seccion;
        const seccionCodificada = btoa(seccion);
        const codigoCodificado = btoa(codigo);
        const seccionCodificada2 = btoa(seccionCodificada);
        const codigoCodificado2 = btoa(codigoCodificado);
        res.redirect(`/panel/${seccionCodificada2}/${codigoCodificado2}`);
    })
    .catch(error=>{
        if(error == "error"){
            res.render("acceder.ejs",{ mensage: "Hay campos basios." });
        }
        else if(error == "basio") {
            res.render("acceder.ejs",{ mensage: "El codigo de la seccion no es correcto." });
        }
    })
        


})




//TODAS LAS DEFINICIONES DE LA RUTAS PANEL
rutas.get("/panel/:seccion/:codigo",(req,res,next)=>{
    //DECODIFICANDO EL PARAMETRO SECCION Y EL CODIGO
    const seccion = req.params.seccion;
    const codigo = req.params.codigo;
    const seccionDecodificada = atob(seccion);
    const codigoDecodificado = atob(codigo);
    const seccionDecodificada2 = atob(seccionDecodificada);
    const codigoDecodificado2 = atob(codigoDecodificado);

    //LLAMANDO  A LA FUNCION MOSTRAR 
    mostrar(seccionDecodificada2)
    .then(datosTablas=>{
        res.render("panel.ejs",{ tabla: datosTablas, seccion: seccionDecodificada2, codigo: codigoDecodificado2});
        next();
    })
    .catch(errorMostrar=>{console.log(errorMostrar)});
})


rutas.post("/panel/agregar",(req,res,next)=>{
    //OTENIENDO LOS DATOS DE TODOS LOS INPUT, ENVIADOS POR EL METODO POST
    let { nombre, edad, seccion, codigo} = req.body;

    //LLAMANDO A LA FUNCION SONSULTA
    consulta(nombre,edad,seccion)
    .then(bien=>{
        //CODIFICANDO LA SECCION Y EL CODIGO PARA ENVIARLO 
        const seccionCodificada = btoa(seccion);
        const codigoCodificado = btoa(codigo);
        const seccionCodificada2 = btoa(seccionCodificada);
        const codigoCodificado2 = btoa(codigoCodificado);

        //REDIRECCIONANDO AL USUARIO A EL PANEL, LUEGO DE GUARDAR LOS DATOS
        res.redirect(`/panel/${seccionCodificada2}/${codigoCodificado2}`);
    })
    .catch(mal=>{
        console.log(mal)
    })
})
rutas.get("/panel/eliminal/:id/:seccion/:codigo",(req,res)=>{


    //OTENIENIENDO EL ID DE ALUMNO, LA SECCION, Y EL CODIGO.
    const id = req.params.id;
    const seccion = req.params.seccion;
    const codigo = req.params.codigo;

    const seccionDecodificada = atob(seccion);
    const codigoDecodificado = atob(codigo);
    const seccionDecodificada2 = atob(seccionDecodificada);
    const codigoDecodificado2 = atob(codigoDecodificado);



    //LLAMANDO A LA FUNCION ELIMINAL, Y PASANDO EL ID Y LA SECCION
    eliminal(id,seccionDecodificada2)
    .then(resultado=>{        
        //CODIFICANDO LA SECCION Y EL CODIGO PARA ENVIARLO 
        const seccionCodificada = btoa(seccionDecodificada2);
        const codigoCodificado = btoa(codigoDecodificado2);
        const seccionCodificada2 = btoa(seccionCodificada);
        const codigoCodificado2 = btoa(codigoCodificado);

        res.redirect(`/panel/${seccionCodificada2}/${codigoCodificado2}`);
    })
    .catch(error=>{console.log(error)})
})

rutas.get("/panel/editar/:id/:nombre/:edad/:seccion/:codigo",(req,res,next)=>{
    //OTENIENDO LOS DATOS DE NECESARIOS PARA LA EDICION, POR EL METODO POST
    //const { id_alumnos, nombre, edad, seccion, codigo } = req.body;
    const id = req.params.id;
    const nombre = req.params.nombre;
    const edad = req.params.edad;
    const seccion = req.params.seccion;
    const codigo = req.params.codigo;
    
    const nombreDecodificado = atob(nombre);
    const nombreDecodificado2 = atob(nombreDecodificado);
    const edadDecodificada = atob(edad);
    const edadDecodificada2 = atob(edadDecodificada);
    const seccionDecodificada = atob(seccion);
    const seccionDecodificada2 = atob(seccionDecodificada);
    const codigoDecodificado = atob(codigo);
    const codigoDecodificado2 = atob(codigoDecodificado);


    res.render("panelEditar.ejs", {id_alumnos: id,nombre: nombreDecodificado2,edad: edadDecodificada2,seccion: seccionDecodificada2, codigo: codigoDecodificado2});
    next()

})
rutas.post("/editar",(req,res,next)=>{
    //OTENIENDO LOS DATOS DE NECESARIOS PARA LA EDICION, POR EL METODO POST
    const { id_alumnos, nombre, edad, seccion, codigo } = req.body;

    //LLAMANDO A LA FUNCION ELIMINAL, Y PASANDO EL ID Y LA SECCION
    editar(id_alumnos,nombre, edad, seccion)
    .then(resultado=>{        
        //CODIFICANDO LA SECCION Y EL CODIGO PARA ENVIARLO 
        const seccionCodificada = btoa(seccion);
        const codigoCodificado = btoa(codigo);
        const seccionCodificada2 = btoa(seccionCodificada);
        const codigoCodificado2 = btoa(codigoCodificado);

        res.redirect(`/panel/${seccionCodificada2}/${codigoCodificado2}`);
    })
    .catch(error=>{console.log(error)})

})



rutas.get("/panel/vista/:id/:seccion/:codigo",(req,res,next)=>{
    //LOS DATOS ENVIADOS POR LA URL
    const id = req.params.id;
    const seccion = req.params.seccion;
    const codigo = req.params.codigo;

    //DECODIFICANDO LOS DATOS ENVIADOS
    const seccionDecodificada = atob(seccion);
    const seccionDecodificada2 = atob(seccionDecodificada);
    const codigoDecodificado = atob(codigo);
    const codigoDecodificado2 = atob(codigoDecodificado);

    //LLAMANDO A LA FUNCION VISTA
    vista(id,seccionDecodificada2)
    .then(resultado=>{
        res.render("panelVista.ejs", {id_alumnos: id, seccion: seccionDecodificada2, codigo: codigoDecodificado2, nota: resultado});
        next()
    })
    .catch(error=>{console.log(error)})
})

rutas.post("/panel/vista",(req,res)=>{
    //OBTENIENDO LOS VALORES DE LOS (P) DE CADA MATERIA
    const id = req.body.id;
    const seccion = req.body.seccion;
    const codigo = req.body.codigo
    const cantidad = req.body.cantidad;

    //CREANDO LA LISTA DONDE ESTARAN TODAS LAS NOTAS DE LAS MATERIAS DEPENDIENDO DE LA SECCION
    listaMateriasTotal = [];


    //DEFINIENDOS LAS CONDICIONES
    if(seccion == "4toa") {


        //CREANDO LAS VARIABLES QUE TENDRAN LA NOTA DE CADA UNO DE LOS (P)

        const cienciasNaturalesP1 = req.body.p1Notas0;
        const cienciasNaturalesP2 = req.body.p2Notas0;
        const cienciasNaturalesP3 = req.body.p3Notas0;
        const cienciasNaturalesP4 = req.body.p4Notas0;

        const cienciasSocialesP1 = req.body.p1Notas1;
        const cienciasSocialesP2 = req.body.p2Notas1;
        const cienciasSocialesP3 = req.body.p3Notas1;
        const cienciasSocialesP4 = req.body.p4Notas1;
        
        const DisenoBasicoP1 = req.body.p1Notas2;
        const DisenoBasicosP2 = req.body.p2Notas2;
        const DisenoBasicoP3 = req.body.p3Notas2;
        const DisenoBasicoP4 = req.body.p4Notas2;

        const educacionFisicaP1 = req.body.p1Notas3;
        const educacionFisicaP2 = req.body.p2Notas3;
        const educacionFisicaP3 = req.body.p3Notas3;
        const educacionFisicaP4 = req.body.p4Notas3;

        const formacionIntegralHumanaReligiosaP1 = req.body.p1Notas4;
        const formacionIntegralHumanaReligiosaP2 = req.body.p2Notas4;
        const formacionIntegralHumanaReligiosaP3 = req.body.p3Notas4;
        const formacionIntegralHumanaReligiosaP4 = req.body.p4Notas4;

        const fotografiaP1 = req.body.p1Notas5;
        const fotografiaP2 = req.body.p2Notas5;
        const fotografiaP3 = req.body.p3Notas5;
        const fotografiaP4 = req.body.p4Notas5;

        const historiaDelArteP1 = req.body.p1Notas6;
        const historiaDelArteP2 = req.body.p2Notas6;
        const historiaDelArteP3 = req.body.p3Notas6;
        const historiaDelArteP4 = req.body.p4Notas6;

        const identidadP1 = req.body.p1Notas7;
        const identidadP2 = req.body.p2Notas7;
        const identidadP3 = req.body.p3Notas7;
        const identidadP4 = req.body.p4Notas7;
                
        const inglesP1 = req.body.p1Notas8;
        const inglesP2 = req.body.p2Notas8;
        const inglesP3 = req.body.p3Notas8;
        const inglesP4 = req.body.p4Notas8;
                
        const lenguajeDanzarioP1 = req.body.p1Notas9;
        const lenguajeDanzarioP2 = req.body.p2Notas9;
        const lenguajeDanzarioP3 = req.body.p3Notas9;
        const lenguajeDanzarioP4 = req.body.p4Notas9;
        
        const lenguajeMusicalP1 = req.body.p1Notas10;
        const lenguajeMusicalP2 = req.body.p2Notas10;
        const lenguajeMusicalP3 = req.body.p3Notas10;
        const lenguajeMusicalP4 = req.body.p4Notas10;
                
        const lenguajeVisualP1 = req.body.p1Notas11;
        const lenguajeVisualP2 = req.body.p2Notas11;
        const lenguajeVisualP3 = req.body.p3Notas11;
        const lenguajeVisualP4 = req.body.p4Notas11;

        const lenguaEspanolaP1 = req.body.p1Notas12;
        const lenguaEspanolaP2 = req.body.p2Notas12;
        const lenguaEspanolaP3 = req.body.p3Notas12;
        const lenguaEspanolaP4 = req.body.p4Notas12;
                
        const matematicaP1 = req.body.p1Notas13;
        const matematicaP2 = req.body.p2Notas13;
        const matematicaP3 = req.body.p3Notas13;
        const matematicaP4 = req.body.p4Notas13;

        
        listaMateriasTotal.push(cienciasNaturalesP1,cienciasNaturalesP2,cienciasNaturalesP3,cienciasNaturalesP4,cienciasSocialesP1,cienciasSocialesP2,cienciasSocialesP3,cienciasSocialesP4,DisenoBasicoP1,DisenoBasicosP2,DisenoBasicoP3,DisenoBasicoP4,educacionFisicaP1,educacionFisicaP2,educacionFisicaP3,educacionFisicaP4,formacionIntegralHumanaReligiosaP1,formacionIntegralHumanaReligiosaP2,formacionIntegralHumanaReligiosaP3,formacionIntegralHumanaReligiosaP4,fotografiaP1,fotografiaP2,fotografiaP3,fotografiaP4,historiaDelArteP1,historiaDelArteP2,historiaDelArteP3,historiaDelArteP4,identidadP1,identidadP2,identidadP3,identidadP4,inglesP1,inglesP2,inglesP3,inglesP4,lenguajeDanzarioP1,lenguajeDanzarioP2,lenguajeDanzarioP3,lenguajeDanzarioP4,lenguajeMusicalP1,lenguajeMusicalP2,lenguajeMusicalP3,lenguajeMusicalP4,lenguajeVisualP1,lenguajeVisualP2,lenguajeVisualP3,lenguajeVisualP4,lenguaEspanolaP1,lenguaEspanolaP2,lenguaEspanolaP3,lenguaEspanolaP4,matematicaP1,matematicaP2,matematicaP3,matematicaP4);


        

    }

    if(seccion == "5toa"){

        
        const disenoWebP1 = req.body.p1Notas0;
        const disenoWebP2 = req.body.p2Notas0;
        const disenoWebP3 = req.body.p3Notas0;
        const disenoWebP4 = req.body.p4Notas0;

        const disenoGraficoP1 = req.body.p1Notas1;
        const disenoGraficoP2 = req.body.p2Notas1;
        const disenoGraficoP3 = req.body.p3Notas1;
        const disenoGraficoP4 = req.body.p4Notas1;
        
        const publicidadCreatividadP1 = req.body.p1Notas2;
        const publicidadCreatividadP2 = req.body.p2Notas2;
        const publicidadCreatividadP3 = req.body.p3Notas2;
        const publicidadCreatividadP4 = req.body.p4Notas2;
        
        const operacionDeCamaraDeVideoP1 = req.body.p1Notas3;
        const operacionDeCamaraDeVideoP2 = req.body.p2Notas3;
        const operacionDeCamaraDeVideoP3 = req.body.p3Notas3;
        const operacionDeCamaraDeVideoP4 = req.body.p4Notas3;
        
        const guionP1 = req.body.p1Notas4;
        const guionP2 = req.body.p2Notas4;
        const guionP3 = req.body.p3Notas4;
        const guionP4 = req.body.p4Notas4;
        
        const mediosDeComunicacionP1 = req.body.p1Notas5;
        const mediosDeComunicacionP2 = req.body.p2Notas5;
        const mediosDeComunicacionP3 = req.body.p3Notas5;
        const mediosDeComunicacionP4 = req.body.p4Notas5;

        const cienciasNaturalesP1 = req.body.p1Notas6;
        const cienciasNaturalesP2 = req.body.p2Notas6;
        const cienciasNaturalesP3 = req.body.p3Notas6;
        const cienciasNaturalesP4 = req.body.p4Notas6;

        const cienciasSocialesP1 = req.body.p1Notas7;
        const cienciasSocialesP2 = req.body.p2Notas7;
        const cienciasSocialesP3 = req.body.p3Notas7;
        const cienciasSocialesP4 = req.body.p4Notas7;

        const educacionFisicaP1 = req.body.p1Notas8;
        const educacionFisicaP2 = req.body.p2Notas8;
        const educacionFisicaP3 = req.body.p3Notas8;
        const educacionFisicaP4 = req.body.p4Notas8;

        const formacionIntegralHumanaReligiosaP1 = req.body.p1Notas9;
        const formacionIntegralHumanaReligiosaP2 = req.body.p2Notas9;
        const formacionIntegralHumanaReligiosaP3 = req.body.p3Notas9;
        const formacionIntegralHumanaReligiosaP4 = req.body.p4Notas9;

        const inglesP1 = req.body.p1Notas10;
        const inglesP2 = req.body.p2Notas10;
        const inglesP3 = req.body.p3Notas10;
        const inglesP4 = req.body.p4Notas10;
                
        const lenguaEspanolaP1 = req.body.p1Notas11;
        const lenguaEspanolaP2 = req.body.p2Notas11;
        const lenguaEspanolaP3 = req.body.p3Notas11;
        const lenguaEspanolaP4 = req.body.p4Notas11;
                
        const matematicaP1 = req.body.p1Notas12;
        const matematicaP2 = req.body.p2Notas12;
        const matematicaP3 = req.body.p3Notas12;
        const matematicaP4 = req.body.p4Notas12;


        listaMateriasTotal.push(disenoWebP1,disenoWebP2,disenoWebP3,disenoWebP4,disenoGraficoP1,disenoGraficoP2,disenoGraficoP3,disenoGraficoP4,publicidadCreatividadP1,publicidadCreatividadP2,publicidadCreatividadP3,publicidadCreatividadP4,operacionDeCamaraDeVideoP1,operacionDeCamaraDeVideoP2,operacionDeCamaraDeVideoP3,operacionDeCamaraDeVideoP4,guionP1,guionP2,guionP3,guionP4,mediosDeComunicacionP1,mediosDeComunicacionP2,mediosDeComunicacionP3,mediosDeComunicacionP4,cienciasNaturalesP1,cienciasNaturalesP2,cienciasNaturalesP3,cienciasNaturalesP4,cienciasSocialesP1,cienciasSocialesP2,cienciasSocialesP3,cienciasSocialesP4,educacionFisicaP1,educacionFisicaP2,educacionFisicaP3,educacionFisicaP4,formacionIntegralHumanaReligiosaP1,formacionIntegralHumanaReligiosaP2,formacionIntegralHumanaReligiosaP3,formacionIntegralHumanaReligiosaP4,inglesP1,inglesP2,inglesP3,inglesP4,lenguaEspanolaP1,lenguaEspanolaP2,lenguaEspanolaP3,lenguaEspanolaP4,matematicaP1,matematicaP2,matematicaP3,matematicaP4);


    }

    if(seccion == "6toa"){


        
        
        const redesSocilesP1 = req.body.p1Notas0;
        const redesSocilesP2 = req.body.p2Notas0;
        const redesSocilesP3 = req.body.p3Notas0;
        const redesSocilesP4 = req.body.p4Notas0;

        const produccionAudiovisualP1 = req.body.p1Notas1;
        const produccionAudiovisualP2 = req.body.p2Notas1;
        const produccionAudiovisualP3 = req.body.p3Notas1;
        const produccionAudiovisualP4 = req.body.p4Notas1;
        
        const videoarteP1 = req.body.p1Notas2;
        const videoarteP2 = req.body.p2Notas2;
        const videoarteP3 = req.body.p3Notas2;
        const videoarteP4 = req.body.p4Notas2;
        
        const animacionP1 = req.body.p1Notas3;
        const animacionP2 = req.body.p2Notas3;
        const animacionP3 = req.body.p3Notas3;
        const animacionP4 = req.body.p4Notas3;
        
        const edicionP1 = req.body.p1Notas4;
        const edicionP2 = req.body.p2Notas4;
        const edicionP3 = req.body.p3Notas4;
        const edicionP4 = req.body.p4Notas4;
        
        const produccionDeProyectoEmprendedorP1 = req.body.p1Notas5;
        const produccionDeProyectoEmprendedorP2 = req.body.p2Notas5;
        const produccionDeProyectoEmprendedorP3 = req.body.p3Notas5;
        const produccionDeProyectoEmprendedorP4 = req.body.p4Notas5;

        const cienciasNaturalesP1 = req.body.p1Notas6;
        const cienciasNaturalesP2 = req.body.p2Notas6;
        const cienciasNaturalesP3 = req.body.p3Notas6;
        const cienciasNaturalesP4 = req.body.p4Notas6;

        const cienciasSocialesP1 = req.body.p1Notas7;
        const cienciasSocialesP2 = req.body.p2Notas7;
        const cienciasSocialesP3 = req.body.p3Notas7;
        const cienciasSocialesP4 = req.body.p4Notas7;

        const educacionFisicaP1 = req.body.p1Notas8;
        const educacionFisicaP2 = req.body.p2Notas8;
        const educacionFisicaP3 = req.body.p3Notas8;
        const educacionFisicaP4 = req.body.p4Notas8;

        const formacionIntegralHumanaReligiosaP1 = req.body.p1Notas9;
        const formacionIntegralHumanaReligiosaP2 = req.body.p2Notas9;
        const formacionIntegralHumanaReligiosaP3 = req.body.p3Notas9;
        const formacionIntegralHumanaReligiosaP4 = req.body.p4Notas9;

        const inglesP1 = req.body.p1Notas10;
        const inglesP2 = req.body.p2Notas10;
        const inglesP3 = req.body.p3Notas10;
        const inglesP4 = req.body.p4Notas10;
                
        const lenguaEspanolaP1 = req.body.p1Notas11;
        const lenguaEspanolaP2 = req.body.p2Notas11;
        const lenguaEspanolaP3 = req.body.p3Notas11;
        const lenguaEspanolaP4 = req.body.p4Notas11;
                
        const matematicaP1 = req.body.p1Notas12;
        const matematicaP2 = req.body.p2Notas12;
        const matematicaP3 = req.body.p3Notas12;
        const matematicaP4 = req.body.p4Notas12;


        listaMateriasTotal.push(redesSocilesP1,redesSocilesP2,redesSocilesP3,redesSocilesP4,produccionAudiovisualP1,produccionAudiovisualP2,produccionAudiovisualP3,produccionAudiovisualP4,videoarteP1,videoarteP2,videoarteP3,videoarteP4,animacionP1,animacionP2,animacionP3,animacionP4,edicionP1,edicionP2,edicionP3,edicionP4,produccionDeProyectoEmprendedorP1,produccionDeProyectoEmprendedorP2,produccionDeProyectoEmprendedorP3,produccionDeProyectoEmprendedorP4,cienciasNaturalesP1,cienciasNaturalesP2,cienciasNaturalesP3,cienciasNaturalesP4,cienciasSocialesP1,cienciasSocialesP2,cienciasSocialesP3,cienciasSocialesP4,educacionFisicaP1,educacionFisicaP2,educacionFisicaP3,educacionFisicaP4,formacionIntegralHumanaReligiosaP1,formacionIntegralHumanaReligiosaP2,formacionIntegralHumanaReligiosaP3,formacionIntegralHumanaReligiosaP4,inglesP1,inglesP2,inglesP3,inglesP4,lenguaEspanolaP1,lenguaEspanolaP2,lenguaEspanolaP3,lenguaEspanolaP4,matematicaP1,matematicaP2,matematicaP3,matematicaP4);





    }

    //llamando a la funcion agregar nota
    agregarNota(id,seccion,listaMateriasTotal)
    .then(resultado=>{
        
        //CODIFICANDO LA SECCION Y EL CODIGO PARA ENVIARLO 
        const seccionCodificada = btoa(seccion);
        const codigoCodificado = btoa(codigo);
        const seccionCodificada2 = btoa(seccionCodificada);
        const codigoCodificado2 = btoa(codigoCodificado);

        res.redirect(`/panel/${seccionCodificada2}/${codigoCodificado2}`);
    
    })
    .catch(error=>{console.log(error)})
    
})



module.exports = { rutas }


//DESARROLLADO POR ANDREW SANCHEZ SEVERINO EDAD: 16