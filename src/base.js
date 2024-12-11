const mysql = require("mysql");
process.loadEnvFile()


const conector = mysql.createConnection(
    {
        host: process.env.HOST_DB || "localhost",
        user: process.env.USER_DB || "icaro",
        password: process.env.PASSWORD_DB || "k]fzi@236.jZx-OA",
        database: process.env.DATABASE_DB || "base"
    }
)

//DEFINIENDOS TODAS LAS FUNCIONES 

const conexion = ()=>{
    
    const promesa = new Promise((resolve,reject)=>{
        const valor = conector.connect(error=>{
            if(error) {
                reject("[-] ERROR, al conectar la base de dato.");
            }else{
                resolve("[+] Conexion a la base de dato correcta.")
            }
        })
    })

    return promesa
}


/**
 * CUANDO AGREGES UNA MATERIAS NUEVA RECUERDA HACER CAMBIOS EN LAS 3 FUNCIONES QUE ESTAN DE ULTIMO
 * LA CUALES SON LA FINCION NOTA,VISTA,AGREGARNOTA
 */


const consulta = (nombre,edad,seccion)=>{
    const promesa = new Promise((resolve,reject)=>{

        //COMVERTIENDO LA SECCION EN MINUSCULAS Y CREANDO LA QUERY
        const seccionMinuscula = seccion.toLowerCase();
        const query1 = `
        INSERT INTO ${seccionMinuscula} (nombre_completo,edad,seccion)
        VALUES ("${nombre}",${edad},"${seccionMinuscula}")
        `;

        conector.query(query1, (error,resultado)=>{
            if(error) {
                reject("[-] ERROR EN LA CONSULTA.");
            }else {
                mostrar(seccion)
                .then(resultado=>{
                    const cantidaRegistro = resultado.length-1;
                    const id = resultado[cantidaRegistro].id_alumnos;
                    nota(id,seccion)

                })
                .catch(error=>{
                    console.log(error)
                })


                resolve("[+] CONSULTA CORRECTA.")
            }
        });


    })

    return promesa
}

//ESTA FUNCION SOLO ES PARA PODER SABER EL NUMERO DE SECCIONES QUE HAY EN LA TABLA DE ACCESO
const mostrarSecciones = ()=>{
    const promesa = new Promise((resolve,reject)=>{
        conector.query(`SELECT seccion FROM acceso`, (error,resultado)=>{
            if(error) {
                reject("[-] ERROR EN LA FUNCION MOSTRAR secciones.");
            }else{ 
                resolve(resultado)
            }
        })
    })

    return promesa

}

const mostrar = (seccion)=>{
    const promesa = new Promise((resolve,reject)=>{
        const seccionMinuscula = seccion.toLowerCase();
        conector.query(`SELECT * FROM ${seccionMinuscula}`, (error,resultado)=>{
            if(error) {
                reject("[-] ERROR EN LA FUNCION MOSTRAR.");
            }else{
                resolve(resultado)
            }
        })
    })

    return promesa

}

const verificarAcceso = async (seccion,codigo)=>{
    const promesa = new Promise((resolve,reject)=>{
        
        conector.query(`SELECT * FROM acceso WHERE seccion = "${seccion}" and codigo = ${codigo}`, (error,resultado)=>{
            if(error) {
                reject("error");
            }else {
                if(resultado.length == 0){
                    reject("basio")
                }else {
                    resolve(resultado);
                }
            }
        });
    })
    return promesa

}
const verificarCalificaciones = (seccion,codigo)=>{
    const promesa = new Promise((resolve,reject)=>{
        const query = `
        SELECT * FROM accesocalificaciones
        WHERE seccion = "${seccion}" and codigo = ${codigo}
        `;
        conector.query(query, (error,resultado)=>{
            if(error) {
                reject("[-] ERROR EN LA FUNCION verificar calificacion.");
            }else{ 
                resolve(resultado)
            }
        })
    })

    return promesa

}

const eliminal = (id_alumnos,seccion)=>{
    const promesa = new Promise((resolve,reject)=>{
        
        //ELIMINANDO EL REGISTRO DE LA SECCION MANDADA
        conector.query(`DELETE from ${seccion} WHERE id_alumnos = ${id_alumnos}`, (error,resultado)=>{
            if(error){
                reject("[-] ERRRO EN LA FUNCION ELIMINAL.");
            }else {
                resolve("[+] ELIMINACION CORRECTA.")
            }
        })


        //ELIMINANDO EL REGISTRO DE TODAS LAS MATERIAS QUE LE CORRESPONDA
        //BUSCANDO LA SECCION Y ELIMINANDO LOS REGISTRO DE DICHA SECCION
        
        if(seccion == "4toa"){


            const queryCienciasNaturales = `
            DELETE FROM ciencia_naturales WHERE id_alumnos = ${id_alumnos}
            `;
            conector.query(queryCienciasNaturales, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION ELIMINAL ciencia_naturales.");
                }else {
                    resolve("[+] ELIMINACION CORRECTA. en matematica")
                }
            })
    
            const queryCienciasSociales = `
            DELETE FROM ciencia_sociales WHERE id_alumnos = ${id_alumnos}
            `;
            conector.query(queryCienciasSociales, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION ELIMINAL ciencia_sociales.");
                }else {
                    resolve("[+] ELIMINACION CORRECTA. en matematica")
                }
            })
    
            const queryDisenoBasico = `
            DELETE FROM diseno_basico WHERE id_alumnos = ${id_alumnos}
            `;
            conector.query(queryDisenoBasico, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION ELIMINAL diseno_basico.");
                }else {
                    resolve("[+] ELIMINACION CORRECTA. en matematica")
                }
            })
    
            const queryEducacionFisica = `
            DELETE FROM educacion_fisica WHERE id_alumnos = ${id_alumnos}
            `;
            conector.query(queryEducacionFisica, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION ELIMINAL educacion_fisica.");
                }else {
                    resolve("[+] ELIMINACION CORRECTA. en matematica")
                }
            })
    
            const queryFIHM = `
            DELETE FROM formacion_integral_humana_religiosa WHERE id_alumnos = ${id_alumnos}
            `;
            conector.query(queryFIHM, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION ELIMINAL formacion_integral_humana_religiosa.");
                }else {
                    resolve("[+] ELIMINACION CORRECTA. en matematica")
                }
            })
    
            const queryFotografia = `
            DELETE FROM fotografia WHERE id_alumnos = ${id_alumnos}
            `;
            conector.query(queryFotografia, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION ELIMINAL fotografia.");
                }else {
                    resolve("[+] ELIMINACION CORRECTA. en matematica")
                }
            })
    
            const queryHistoriaDelArte = `
            DELETE FROM historia_del_arte WHERE id_alumnos = ${id_alumnos}
            `;
            conector.query(queryHistoriaDelArte, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION ELIMINAL historia_del_arte.");
                }else {
                    resolve("[+] ELIMINACION CORRECTA. en matematica")
                }
            })
    
            const queryIdentidad = `
            DELETE FROM identidad WHERE id_alumnos = ${id_alumnos}
            `;
            conector.query(queryIdentidad, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION ELIMINAL identidad.");
                }else {
                    resolve("[+] ELIMINACION CORRECTA. en matematica")
                }
            })
    
            const queryIngles = `
            DELETE FROM ingles WHERE id_alumnos = ${id_alumnos}
            `;
            conector.query(queryIngles, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION ELIMINAL ingles.");
                }else {
                    resolve("[+] ELIMINACION CORRECTA. en matematica")
                }
            })
    
            const queryLenguajeDanzario = `
            DELETE FROM lenguaje_danzario WHERE id_alumnos = ${id_alumnos}
            `;
            conector.query(queryLenguajeDanzario, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION ELIMINAL lenguaje_danzario.");
                }else {
                    resolve("[+] ELIMINACION CORRECTA. en matematica")
                }
            })
    
            const queryLenguajeMusical = `
            DELETE FROM lenguaje_musical WHERE id_alumnos = ${id_alumnos}
            `;
            conector.query(queryLenguajeMusical, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION ELIMINAL lenguaje_musical.");
                }else {
                    resolve("[+] ELIMINACION CORRECTA. en matematica")
                }
            })
    
            const queryLenguajeVisual = `
            DELETE FROM lenguaje_visual WHERE id_alumnos = ${id_alumnos}
            `;
            conector.query(queryLenguajeVisual, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION ELIMINAL lenguaje_visual.");
                }else {
                    resolve("[+] ELIMINACION CORRECTA. en matematica")
                }
            })
    
            const queryLenguaEspanola = `
            DELETE FROM lengua_espanola WHERE id_alumnos = ${id_alumnos}
            `;
            conector.query(queryLenguaEspanola, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION ELIMINAL lengua_espanola.");
                }else {
                    resolve("[+] ELIMINACION CORRECTA. en matematica")
                }
            })
    
            const queryMatematica = `
            DELETE FROM matematica WHERE id_alumnos = ${id_alumnos}
            `;
            conector.query(queryMatematica, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION ELIMINAL matematica.");
                }else {
                    resolve("[+] ELIMINACION CORRECTA. en matematica")
                }
            })

            
        }

        if(seccion == "5toa"){

            
            const queryDisenoWeb = `
            DELETE FROM diseno_web WHERE id_alumnos = ${id_alumnos}
            `;
            conector.query(queryDisenoWeb, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION ELIMINAL diseno_web.");
                }else {
                    resolve("[+] ELIMINACION CORRECTA. en matematica")
                }
            })
    
            const queryDisenoGrafico = `
            DELETE FROM diseno_grafico WHERE id_alumnos = ${id_alumnos}
            `;
            conector.query(queryDisenoGrafico, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION ELIMINAL diseno_grafico.");
                }else {
                    resolve("[+] ELIMINACION CORRECTA. en matematica")
                }
            })
    
            const queryPublucidadCreatividad = `
            DELETE FROM publicidad_y_creatividad WHERE id_alumnos = ${id_alumnos}
            `;
            conector.query(queryPublucidadCreatividad, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION ELIMINAL publicidad_y_creatividad.");
                }else {
                    resolve("[+] ELIMINACION CORRECTA. en matematica")
                }
            })
    
            const queryOperacionDeCamaraDeVideo = `
            DELETE FROM operacion_de_camara_de_video WHERE id_alumnos = ${id_alumnos}
            `;
            conector.query(queryOperacionDeCamaraDeVideo, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION ELIMINAL operacion_de_camara_de_video.");
                }else {
                    resolve("[+] ELIMINACION CORRECTA. en matematica")
                }
            })
    
            const queryGuion = `
            DELETE FROM guion WHERE id_alumnos = ${id_alumnos}
            `;
            conector.query(queryGuion, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION ELIMINAL guion.");
                }else {
                    resolve("[+] ELIMINACION CORRECTA. en matematica")
                }
            })
    
            const queryMediosDeComunicacion = `
            DELETE FROM medios_de_comunicacion WHERE id_alumnos = ${id_alumnos}
            `;
            conector.query(queryMediosDeComunicacion, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION ELIMINAL medios_de_comunicacion.");
                }else {
                    resolve("[+] ELIMINACION CORRECTA. en matematica")
                }
            })

            const queryCienciasNaturales = `
            DELETE FROM ciencia_naturales WHERE id_alumnos = ${id_alumnos}
            `;
            conector.query(queryCienciasNaturales, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION ELIMINAL ciencia_naturales.");
                }else {
                    resolve("[+] ELIMINACION CORRECTA. en matematica")
                }
            })
    
            const queryCienciasSociales = `
            DELETE FROM ciencia_sociales WHERE id_alumnos = ${id_alumnos}
            `;
            conector.query(queryCienciasSociales, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION ELIMINAL ciencia_sociales.");
                }else {
                    resolve("[+] ELIMINACION CORRECTA. en matematica")
                }
            })

            const queryEducacionFisica = `
            DELETE FROM educacion_fisica WHERE id_alumnos = ${id_alumnos}
            `;
            conector.query(queryEducacionFisica, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION ELIMINAL educacion_fisica.");
                }else {
                    resolve("[+] ELIMINACION CORRECTA. en matematica")
                }
            })
    
            const queryFIHM = `
            DELETE FROM formacion_integral_humana_religiosa WHERE id_alumnos = ${id_alumnos}
            `;
            conector.query(queryFIHM, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION ELIMINAL formacion_integral_humana_religiosa.");
                }else {
                    resolve("[+] ELIMINACION CORRECTA. en matematica")
                }
            })
    
            const queryIngles = `
            DELETE FROM ingles WHERE id_alumnos = ${id_alumnos}
            `;
            conector.query(queryIngles, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION ELIMINAL ingles.");
                }else {
                    resolve("[+] ELIMINACION CORRECTA. en matematica")
                }
            })
    
    
            const queryLenguaEspanola = `
            DELETE FROM lengua_espanola WHERE id_alumnos = ${id_alumnos}
            `;
            conector.query(queryLenguaEspanola, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION ELIMINAL lengua_espanola.");
                }else {
                    resolve("[+] ELIMINACION CORRECTA. en matematica")
                }
            })
    
            const queryMatematica = `
            DELETE FROM matematica WHERE id_alumnos = ${id_alumnos}
            `;
            conector.query(queryMatematica, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION ELIMINAL matematica.");
                }else {
                    resolve("[+] ELIMINACION CORRECTA. en matematica")
                }
            })
    

        }

        if(seccion == "6toa"){


            const queryRedesSociales = `
            DELETE FROM redes_sociles WHERE id_alumnos = ${id_alumnos}
            `;
            conector.query(queryRedesSociales, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION ELIMINAL redes_sociles.");
                }else {
                    resolve("[+] ELIMINACION CORRECTA. en matematica")
                }
            })

            const queryProduccionAudioVisual = `
            DELETE FROM produccion_audiovisual WHERE id_alumnos = ${id_alumnos}
            `;
            conector.query(queryProduccionAudioVisual, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION ELIMINAL produccion_audiovisual.");
                }else {
                    resolve("[+] ELIMINACION CORRECTA. en matematica")
                }
            })

            const queryVideoArte = `
            DELETE FROM videoarte WHERE id_alumnos = ${id_alumnos}
            `;
            conector.query(queryVideoArte, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION ELIMINAL videoarte.");
                }else {
                    resolve("[+] ELIMINACION CORRECTA. en matematica")
                }
            })

            const queryAnimacion = `
            DELETE FROM animacion WHERE id_alumnos = ${id_alumnos}
            `;
            conector.query(queryAnimacion, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION ELIMINAL animacion.");
                }else {
                    resolve("[+] ELIMINACION CORRECTA. en matematica")
                }
            })

            const queryEdicion = `
            DELETE FROM edicion WHERE id_alumnos = ${id_alumnos}
            `;
            conector.query(queryEdicion, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION ELIMINAL edicion.");
                }else {
                    resolve("[+] ELIMINACION CORRECTA. en matematica")
                }
            })

            const queryProduccionDeProyectoEmprendedor = `
            DELETE FROM produccion_de_proyecto_emprendedor WHERE id_alumnos = ${id_alumnos}
            `;
            conector.query(queryProduccionDeProyectoEmprendedor, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION ELIMINAL produccion_de_proyecto_emprendedor.");
                }else {
                    resolve("[+] ELIMINACION CORRECTA. en matematica")
                }
            })

            const queryCienciasNaturales = `
            DELETE FROM ciencia_naturales WHERE id_alumnos = ${id_alumnos}
            `;
            conector.query(queryCienciasNaturales, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION ELIMINAL ciencia_naturales.");
                }else {
                    resolve("[+] ELIMINACION CORRECTA. en matematica")
                }
            })

            const queryCienciasSociales = `
            DELETE FROM ciencia_sociales WHERE id_alumnos = ${id_alumnos}
            `;
            conector.query(queryCienciasSociales, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION ELIMINAL ciencia_sociales.");
                }else {
                    resolve("[+] ELIMINACION CORRECTA. en matematica")
                }
            })
            
            const queryEducacionFisica = `
            DELETE FROM educacion_fisica WHERE id_alumnos = ${id_alumnos}
            `;
            conector.query(queryEducacionFisica, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION ELIMINAL educacion_fisica.");
                }else {
                    resolve("[+] ELIMINACION CORRECTA. en matematica")
                }
            })

            const queryFIHM = `
            DELETE FROM formacion_integral_humana_religiosa WHERE id_alumnos = ${id_alumnos}
            `;
            conector.query(queryFIHM, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION ELIMINAL formacion_integral_humana_religiosa.");
                }else {
                    resolve("[+] ELIMINACION CORRECTA. en matematica")
                }
            })

            const queryIngles = `
            DELETE FROM ingles WHERE id_alumnos = ${id_alumnos}
            `;
            conector.query(queryIngles, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION ELIMINAL ingles.");
                }else {
                    resolve("[+] ELIMINACION CORRECTA. en matematica")
                }
            })
            
            const queryLenguaEspanola = `
            DELETE FROM lengua_espanola WHERE id_alumnos = ${id_alumnos}
            `;
            conector.query(queryLenguaEspanola, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION ELIMINAL lengua_espanola.");
                }else {
                    resolve("[+] ELIMINACION CORRECTA. en matematica")
                }
            })
            
            const queryMatematica = `
            DELETE FROM matematica WHERE id_alumnos = ${id_alumnos}
            `;
            conector.query(queryMatematica, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION ELIMINAL matematica.");
                }else {
                    resolve("[+] ELIMINACION CORRECTA. en matematica")
                }
            })



        }

    })

    return promesa
}

const editar = (id, nombre, edad, seccion)=>{
    const promesa = new Promise((resolve,reject)=>{

        const  query = `
        UPDATE ${seccion}
        SET nombre_completo = "${nombre}",
        edad = ${edad}
        WHERE id_alumnos = ${id}
        `;

        conector.query(query, (error,resultado)=>{
            if(error){
                reject("[-] ERRRO EN LA FUNCION EDITAR.");
            }else {
                resolve("[+] EDICION CORRECTA.")
            }
        })
    })

    return promesa
}

//GUARDANDO EL ID Y LAS SECCIONES EN LAS TABLAS DE LAS MATERIAS ESCOLARES
const nota = (id, seccion)=>{
    const promesa = new Promise((resolve,reject)=>{
    //CREANDO LOS REGISTRO DE LA MATERIAS

    if(seccion == "4toa"){
        
        const  queryCienciasNaturales = `
            INSERT INTO ciencia_naturales (id_alumnos,seccion,materia)
            VALUES (${id},"${seccion}","ciencias naturales")
        `;
        conector.query(queryCienciasNaturales, (error,resultado)=>{
            if(error){
                reject("[-] ERRRO EN NOTA ciencia_naturales.");
            }else {
                resolve("[+] CONSULTA MATEMATICA CORRECTA.");
            }
        })
            
        const  queryCienciasSociales = `
            INSERT INTO ciencia_sociales (id_alumnos,seccion,materia)
            VALUES (${id},"${seccion}","ciencias sociales")
        `;
        conector.query(queryCienciasSociales, (error,resultado)=>{
            if(error){
                reject("[-] ERRRO EN NOTA ciencia_sociales.");
            }else {
                resolve("[+] CONSULTA MATEMATICA CORRECTA.");
            }
        })

        const  queryDisenoBasico = `
            INSERT INTO diseno_basico (id_alumnos,seccion,materia)
            VALUES (${id},"${seccion}","diseño basico y exprecion visual")
        `;
        conector.query(queryDisenoBasico, (error,resultado)=>{
            if(error){
                reject("[-] ERRRO EN NOTA diseno_basico.");
            }else {
                resolve("[+] CONSULTA MATEMATICA CORRECTA.");
            }
        })

        const  queryEducacionFisica = `
            INSERT INTO educacion_fisica (id_alumnos,seccion,materia)
            VALUES (${id},"${seccion}","educacion fisica")
        `;
        conector.query(queryEducacionFisica, (error,resultado)=>{
            if(error){
                reject("[-] ERRRO EN NOTA educacion_fisica.");
            }else {
                resolve("[+] CONSULTA MATEMATICA CORRECTA.");
            }
        })

        const  queryFIHM = `
            INSERT INTO formacion_integral_humana_religiosa (id_alumnos,seccion,materia)
            VALUES (${id},"${seccion}","formacion integral humana religiosa")
        `;
        conector.query(queryFIHM, (error,resultado)=>{
            if(error){
                reject("[-] ERRRO EN NOTA formacion_integral_humana_religiosa.");
            }else {
                resolve("[+] CONSULTA MATEMATICA CORRECTA.");
            }
        })

        const  queryFotografia = `
            INSERT INTO fotografia (id_alumnos,seccion,materia)
            VALUES (${id},"${seccion}","fotografia")
        `;
        conector.query(queryFotografia, (error,resultado)=>{
            if(error){
                reject("[-] ERRRO EN NOTA fotografia.");
            }else {
                resolve("[+] CONSULTA MATEMATICA CORRECTA.");
            }
        })

        const  queryHistoriaDelArte = `
            INSERT INTO historia_del_arte (id_alumnos,seccion,materia)
            VALUES (${id},"${seccion}","historia del arte")
        `;
        conector.query(queryHistoriaDelArte, (error,resultado)=>{
            if(error){
                reject("[-] ERRRO EN NOTA historia_del_arte.");
            }else {
                resolve("[+] CONSULTA MATEMATICA CORRECTA.");
            }
        })

        const  queryIdentidad = `
            INSERT INTO identidad (id_alumnos,seccion,materia)
            VALUES (${id},"${seccion}","identidad, cultura y emprendimiento")
        `;
        conector.query(queryIdentidad, (error,resultado)=>{
            if(error){
                reject("[-] ERRRO EN NOTA identidad.");
            }else {
                resolve("[+] CONSULTA MATEMATICA CORRECTA.");
            }
        })

        const  queryIngles = `
            INSERT INTO ingles (id_alumnos,seccion,materia)
            VALUES (${id},"${seccion}","ingles")
        `;
        conector.query(queryIngles, (error,resultado)=>{
            if(error){
                reject("[-] ERRRO EN NOTA ingles.");
            }else {
                resolve("[+] CONSULTA MATEMATICA CORRECTA.");
            }
        })

        const  queryLenguajeDanzario = `
            INSERT INTO lenguaje_danzario (id_alumnos,seccion,materia)
            VALUES (${id},"${seccion}","lenguaje danzario y teatral")
        `;
        conector.query(queryLenguajeDanzario, (error,resultado)=>{
            if(error){
                reject("[-] ERRRO EN NOTA lenguaje_danzario.");
            }else {
                resolve("[+] CONSULTA MATEMATICA CORRECTA.");
            }
        })

        const  queryLenguajeMusical = `
            INSERT INTO lenguaje_musical (id_alumnos,seccion,materia)
            VALUES (${id},"${seccion}","lenguaje musical")
        `;
        conector.query(queryLenguajeMusical, (error,resultado)=>{
            if(error){
                reject("[-] ERRRO EN NOTA lenguaje_musical.");
            }else {
                resolve("[+] CONSULTA MATEMATICA CORRECTA.");
            }
        })

        const  queryLenguajeVisual = `
            INSERT INTO lenguaje_visual (id_alumnos,seccion,materia)
            VALUES (${id},"${seccion}","lenguaje visual, dibujo y creacion de personajes")
        `;
        conector.query(queryLenguajeVisual, (error,resultado)=>{
            if(error){
                reject("[-] ERRRO EN NOTA lenguaje_visual.");
            }else {
                resolve("[+] CONSULTA MATEMATICA CORRECTA.");
            }
        })

        const  queryLenguaEspanola = `
            INSERT INTO lengua_espanola (id_alumnos,seccion,materia)
            VALUES (${id},"${seccion}","lengua espanola")
        `;
        conector.query(queryLenguaEspanola, (error,resultado)=>{
            if(error){
                reject("[-] ERRRO EN NOTA lengua_espanola.");
            }else {
                resolve("[+] CONSULTA MATEMATICA CORRECTA.");
            }
        })

        const  queryMatematica = `
            INSERT INTO matematica (id_alumnos,seccion,materia)
            VALUES (${id},"${seccion}","matematica")
        `;
        conector.query(queryMatematica, (error,resultado)=>{
            if(error){
                reject("[-] ERRRO EN NOTA matematica.");
            }else {
                resolve("[+] CONSULTA MATEMATICA CORRECTA.");
            }
        })


    }

    if(seccion == "5toa"){

        
        const  queryDisenoWeb = `
            INSERT INTO diseno_web (id_alumnos,seccion,materia)
            VALUES (${id},"${seccion}","diseño web")
        `;
        conector.query(queryDisenoWeb, (error,resultado)=>{
            if(error){
                reject("[-] ERRRO EN NOTA diseno_web.");
            }else {
                resolve("[+] CONSULTA MATEMATICA CORRECTA.");
            }
        })

        const  queryDisenoGrafico = `
            INSERT INTO diseno_grafico (id_alumnos,seccion,materia)
            VALUES (${id},"${seccion}","diseño grafico")
        `;
        conector.query(queryDisenoGrafico, (error,resultado)=>{
            if(error){
                reject("[-] ERRRO EN NOTA diseno_grafico.");
            }else {
                resolve("[+] CONSULTA MATEMATICA CORRECTA.");
            }
        })

        const  queryPublucidadCreatividad= `
            INSERT INTO publicidad_y_creatividad (id_alumnos,seccion,materia)
            VALUES (${id},"${seccion}","publicidad y creatividad")
        `;
        conector.query(queryPublucidadCreatividad, (error,resultado)=>{
            if(error){
                reject("[-] ERRRO EN NOTA publicidad_y_creatividad.");
            }else {
                resolve("[+] CONSULTA MATEMATICA CORRECTA.");
            }
        })

        const  queryOperacionDeCamaraDeVideo = `
            INSERT INTO operacion_de_camara_de_video (id_alumnos,seccion,materia)
            VALUES (${id},"${seccion}","operacion de camara de video")
        `;
        conector.query(queryOperacionDeCamaraDeVideo, (error,resultado)=>{
            if(error){
                reject("[-] ERRRO EN NOTA operacion_de_camara_de_video.");
            }else {
                resolve("[+] CONSULTA MATEMATICA CORRECTA.");
            }
        })

        const  queryGuion = `
            INSERT INTO guion (id_alumnos,seccion,materia)
            VALUES (${id},"${seccion}","guion")
        `;
        conector.query(queryGuion, (error,resultado)=>{
            if(error){
                reject("[-] ERRRO EN NOTA guion.");
            }else {
                resolve("[+] CONSULTA MATEMATICA CORRECTA.");
            }
        })

        const  queryMediosDeComunicacion = `
            INSERT INTO medios_de_comunicacion (id_alumnos,seccion,materia)
            VALUES (${id},"${seccion}","operacion de camara de video")
        `;
        conector.query(queryMediosDeComunicacion, (error,resultado)=>{
            if(error){
                reject("[-] ERRRO EN NOTA medios_de_comunicacion.");
            }else {
                resolve("[+] CONSULTA MATEMATICA CORRECTA.");
            }
        })

        const  queryCienciasNaturales = `
        INSERT INTO ciencia_naturales (id_alumnos,seccion,materia)
        VALUES (${id},"${seccion}","ciencias naturales")
    `;
    conector.query(queryCienciasNaturales, (error,resultado)=>{
        if(error){
            reject("[-] ERRRO EN NOTA ciencia_naturales.");
        }else {
            resolve("[+] CONSULTA MATEMATICA CORRECTA.");
        }
    })
        
    const  queryCienciasSociales = `
        INSERT INTO ciencia_sociales (id_alumnos,seccion,materia)
        VALUES (${id},"${seccion}","ciencias sociales")
    `;
    conector.query(queryCienciasSociales, (error,resultado)=>{
        if(error){
            reject("[-] ERRRO EN NOTA ciencia_sociales.");
        }else {
            resolve("[+] CONSULTA MATEMATICA CORRECTA.");
        }
    })

    const  queryEducacionFisica = `
        INSERT INTO educacion_fisica (id_alumnos,seccion,materia)
        VALUES (${id},"${seccion}","educacion fisica")
    `;
    conector.query(queryEducacionFisica, (error,resultado)=>{
        if(error){
            reject("[-] ERRRO EN NOTA educacion_fisica.");
        }else {
            resolve("[+] CONSULTA MATEMATICA CORRECTA.");
        }
    })

    const  queryFIHM = `
        INSERT INTO formacion_integral_humana_religiosa (id_alumnos,seccion,materia)
        VALUES (${id},"${seccion}","formacion integral humana religiosa")
    `;
    conector.query(queryFIHM, (error,resultado)=>{
        if(error){
            reject("[-] ERRRO EN NOTA formacion_integral_humana_religiosa.");
        }else {
            resolve("[+] CONSULTA MATEMATICA CORRECTA.");
        }
    })

    const  queryIngles = `
        INSERT INTO ingles (id_alumnos,seccion,materia)
        VALUES (${id},"${seccion}","ingles")
    `;
    conector.query(queryIngles, (error,resultado)=>{
        if(error){
            reject("[-] ERRRO EN NOTA ingles.");
        }else {
            resolve("[+] CONSULTA MATEMATICA CORRECTA.");
        }
    })

    const  queryLenguaEspanola = `
        INSERT INTO lengua_espanola (id_alumnos,seccion,materia)
        VALUES (${id},"${seccion}","lengua espanola")
    `;
    conector.query(queryLenguaEspanola, (error,resultado)=>{
        if(error){
            reject("[-] ERRRO EN NOTA lengua_espanola.");
        }else {
            resolve("[+] CONSULTA MATEMATICA CORRECTA.");
        }
    })

    const  queryMatematica = `
        INSERT INTO matematica (id_alumnos,seccion,materia)
        VALUES (${id},"${seccion}","matematica")
    `;
    conector.query(queryMatematica, (error,resultado)=>{
        if(error){
            reject("[-] ERRRO EN NOTA matematica.");
        }else {
            resolve("[+] CONSULTA MATEMATICA CORRECTA.");
        }
    })

    }

    if(seccion == "6toa"){


        const  queryRedesSociales = `
            INSERT INTO redes_sociles (id_alumnos,seccion,materia)
            VALUES (${id},"${seccion}","redes sociales")
        `;
        conector.query(queryRedesSociales, (error,resultado)=>{
            if(error){
                reject("[-] ERRRO EN NOTA redes_sociles.");
            }else {
                resolve("[+] CONSULTA MATEMATICA CORRECTA.");
            }
        })

        const  queryProduccionAudioVisual = `
            INSERT INTO produccion_audiovisual (id_alumnos,seccion,materia)
            VALUES (${id},"${seccion}","produccion audiovisual")
        `;
        conector.query(queryProduccionAudioVisual, (error,resultado)=>{
            if(error){
                reject("[-] ERRRO EN NOTA produccion_audiovisual.");
            }else {
                resolve("[+] CONSULTA MATEMATICA CORRECTA.");
            }
        })

        const  queryVideoArte = `
            INSERT INTO videoarte (id_alumnos,seccion,materia)
            VALUES (${id},"${seccion}","videoarte")
        `;
        conector.query(queryVideoArte, (error,resultado)=>{
            if(error){
                reject("[-] ERRRO EN NOTA videoarte.");
            }else {
                resolve("[+] CONSULTA MATEMATICA CORRECTA.");
            }
        })

        const  queryAnimacion = `
            INSERT INTO animacion (id_alumnos,seccion,materia)
            VALUES (${id},"${seccion}","animacion")
        `;
        conector.query(queryAnimacion, (error,resultado)=>{
            if(error){
                reject("[-] ERRRO EN NOTA animacion.");
            }else {
                resolve("[+] CONSULTA MATEMATICA CORRECTA.");
            }
        })

        const  queryEdicion = `
            INSERT INTO edicion (id_alumnos,seccion,materia)
            VALUES (${id},"${seccion}","edicion, sonido y musicalizacion")
        `;
        conector.query(queryEdicion, (error,resultado)=>{
            if(error){
                reject("[-] ERRRO EN NOTA edicion.");
            }else {
                resolve("[+] CONSULTA MATEMATICA CORRECTA.");
            }
        })

        const  queryProduccionDeProyectoEmprendedor = `
            INSERT INTO produccion_de_proyecto_emprendedor (id_alumnos,seccion,materia)
            VALUES (${id},"${seccion}","produccion de proyecto emprendedor")
        `;
        conector.query(queryProduccionDeProyectoEmprendedor, (error,resultado)=>{
            if(error){
                reject("[-] ERRRO EN NOTA produccion_de_proyecto_emprendedor.");
            }else {
                resolve("[+] CONSULTA MATEMATICA CORRECTA.");
            }
        })


        
        const  queryCienciasNaturales = `
        INSERT INTO ciencia_naturales (id_alumnos,seccion,materia)
        VALUES (${id},"${seccion}","ciencias naturales")
    `;
    
        conector.query(queryCienciasNaturales, (error,resultado)=>{
            if(error){
                reject("[-] ERRRO EN NOTA ciencia_naturales.");
            }else {
                resolve("[+] CONSULTA MATEMATICA CORRECTA.");
            }
        })
            
        const  queryCienciasSociales = `
            INSERT INTO ciencia_sociales (id_alumnos,seccion,materia)
            VALUES (${id},"${seccion}","ciencias sociales")
        `;
        conector.query(queryCienciasSociales, (error,resultado)=>{
            if(error){
                reject("[-] ERRRO EN NOTA ciencia_sociales.");
            }else {
                resolve("[+] CONSULTA MATEMATICA CORRECTA.");
            }
        })
    
        const  queryEducacionFisica = `
            INSERT INTO educacion_fisica (id_alumnos,seccion,materia)
            VALUES (${id},"${seccion}","educacion fisica")
        `;
        conector.query(queryEducacionFisica, (error,resultado)=>{
            if(error){
                reject("[-] ERRRO EN NOTA educacion_fisica.");
            }else {
                resolve("[+] CONSULTA MATEMATICA CORRECTA.");
            }
        })
    
        const  queryFIHM = `
            INSERT INTO formacion_integral_humana_religiosa (id_alumnos,seccion,materia)
            VALUES (${id},"${seccion}","formacion integral humana religiosa")
        `;
        conector.query(queryFIHM, (error,resultado)=>{
            if(error){
                reject("[-] ERRRO EN NOTA formacion_integral_humana_religiosa.");
            }else {
                resolve("[+] CONSULTA MATEMATICA CORRECTA.");
            }
        })
    
        const  queryIngles = `
            INSERT INTO ingles (id_alumnos,seccion,materia)
            VALUES (${id},"${seccion}","ingles")
        `;
        conector.query(queryIngles, (error,resultado)=>{
            if(error){
                reject("[-] ERRRO EN NOTA ingles.");
            }else {
                resolve("[+] CONSULTA MATEMATICA CORRECTA.");
            }
        })
    
        const  queryLenguaEspanola = `
            INSERT INTO lengua_espanola (id_alumnos,seccion,materia)
            VALUES (${id},"${seccion}","lengua espanola")
        `;
        conector.query(queryLenguaEspanola, (error,resultado)=>{
            if(error){
                reject("[-] ERRRO EN NOTA lengua_espanola.");
            }else {
                resolve("[+] CONSULTA MATEMATICA CORRECTA.");
            }
        })
    
        const  queryMatematica = `
            INSERT INTO matematica (id_alumnos,seccion,materia)
            VALUES (${id},"${seccion}","matematica")
        `;
        conector.query(queryMatematica, (error,resultado)=>{
            if(error){
                reject("[-] ERRRO EN NOTA matematica.");
            }else {
                resolve("[+] CONSULTA MATEMATICA CORRECTA.");
            }
        })
    
    }
    
    })

    return promesa

}

//FUNCION PARA VER LA NOTA DE LOS ALUMNOS EN LA SECCION PANEL
const vista = (id, seccion)=>{
    const promesa = new Promise((resolve,reject)=>{
    //HACIENDO CONSULTA A LAS DISTINTAS TABLAS DE MATERIAS

        //LISTA DE RESULTADO 
        const listaResultado = [];

        if(seccion == "4toa"){

            const  queryCienciasNaturales = `
            SELECT * FROM ciencia_naturales as m, ${seccion} as s
            WHERE m.id_alumnos = ${id} AND s.id_alumnos = ${id} AND m.seccion = s.seccion
            `;
            conector.query(queryCienciasNaturales, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTa queryCienciasNaturales.");
                }else {
                    listaResultado.push(resultado);
                }
            })
    
            const  queryCienciasSociales = `
            SELECT * FROM ciencia_sociales as m, ${seccion} as s
            WHERE m.id_alumnos = ${id} AND s.id_alumnos = ${id} AND m.seccion = s.seccion
            `;
            conector.query(queryCienciasSociales, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA queryCienciasSociales.");
                }else {
                    listaResultado.push(resultado);
                }
            })    
            
            const  queryDisenoBasico = `
            SELECT * FROM diseno_basico as m, ${seccion} as s
            WHERE m.id_alumnos = ${id} AND s.id_alumnos = ${id} AND m.seccion = s.seccion
            `;
            conector.query(queryDisenoBasico, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA CIENENCIASA queryDisenoBasico.");
                }else {
                    listaResultado.push(resultado);
                }
            })
    
            const  queryEducacionFisica = `
            SELECT * FROM educacion_fisica as m, ${seccion} as s
            WHERE m.id_alumnos = ${id} AND s.id_alumnos = ${id} AND m.seccion = s.seccion
            `;
            conector.query(queryEducacionFisica, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA CIENENCIASA educacion_fisica.");
                }else {
                    listaResultado.push(resultado);
                }
            })
            
            const  queryFIHM = `
            SELECT * FROM formacion_integral_humana_religiosa as m, ${seccion} as s
            WHERE m.id_alumnos = ${id} AND s.id_alumnos = ${id} AND m.seccion = s.seccion
            `;
            conector.query(queryFIHM, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA CIENENCIASA formacion_integral_humana_religiosa.");
                }else {
                    listaResultado.push(resultado);
                }
            })
            
            const  queryFotografia = `
            SELECT * FROM fotografia as m, ${seccion} as s
            WHERE m.id_alumnos = ${id} AND s.id_alumnos = ${id} AND m.seccion = s.seccion
            `;
            conector.query(queryFotografia, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA CIENENCIASA fotografia.");
                }else {
                    listaResultado.push(resultado);
                }
            })
            
            const  queryHistoriaDelArte = `
            SELECT * FROM historia_del_arte as m, ${seccion} as s
            WHERE m.id_alumnos = ${id} AND s.id_alumnos = ${id} AND m.seccion = s.seccion
            `;
            conector.query(queryHistoriaDelArte, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA CIENENCIASA historia_del_arte.");
                }else {
                    listaResultado.push(resultado);
                }
            })
            
            const  queryIdentidad = `
            SELECT * FROM identidad as m, ${seccion} as s
            WHERE m.id_alumnos = ${id} AND s.id_alumnos = ${id} AND m.seccion = s.seccion
            `;
            conector.query(queryIdentidad, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA CIENENCIASA identidad.");
                }else {
                    listaResultado.push(resultado);
                }
            })
            
            const  queryIngles = `
            SELECT * FROM ingles as m, ${seccion} as s
            WHERE m.id_alumnos = ${id} AND s.id_alumnos = ${id} AND m.seccion = s.seccion
            `;
            conector.query(queryIngles, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA CIENENCIASA ingles.");
                }else {
                    listaResultado.push(resultado);
                }
            })
            
            const  queryLenguajeDanzario = `
            SELECT * FROM lenguaje_danzario as m, ${seccion} as s
            WHERE m.id_alumnos = ${id} AND s.id_alumnos = ${id} AND m.seccion = s.seccion
            `;
            conector.query(queryLenguajeDanzario, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA CIENENCIASA lenguaje_danzario.");
                }else {
                    listaResultado.push(resultado);
                }
            })
    
            const  queryLenguajeMusical = `
            SELECT * FROM lenguaje_musical as m, ${seccion} as s
            WHERE m.id_alumnos = ${id} AND s.id_alumnos = ${id} AND m.seccion = s.seccion
            `;
            conector.query(queryLenguajeMusical, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA CIENENCIASA lenguaje_musical.");
                }else {
                    listaResultado.push(resultado);
                }
            })
    
            const  queryLenguajeVisual = `
            SELECT * FROM lenguaje_visual as m, ${seccion} as s
            WHERE m.id_alumnos = ${id} AND s.id_alumnos = ${id} AND m.seccion = s.seccion
            `;
            conector.query(queryLenguajeVisual, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA CIENENCIASA lenguaje_visual.");
                }else {
                    listaResultado.push(resultado);
                }
            })
            
            const  queryLenguaEspanola = `
            SELECT * FROM lengua_espanola as m, ${seccion} as s
            WHERE m.id_alumnos = ${id} AND s.id_alumnos = ${id} AND m.seccion = s.seccion
            `;
            conector.query(queryLenguaEspanola, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA CIENENCIASA lengua_espanola.");
                }else {
                    listaResultado.push(resultado);
                }
            })
    
            const  queryMatematica = `
            SELECT * FROM matematica as m, ${seccion} as s
            WHERE m.id_alumnos = ${id} AND s.id_alumnos = ${id} AND m.seccion = s.seccion
            `;
            conector.query(queryMatematica, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA educacion_fisica");
                }else {
                    listaResultado.push(resultado);
    
                    
                    //MANDANDO LA LISTA DE RESULTADO EN LA ULTIMA CONSULTA
                    resolve(listaResultado)
                }
            })


        }

        if(seccion == "5toa"){

            const  queryDisenoWeb = `
            SELECT * FROM diseno_web as m, ${seccion} as s
            WHERE m.id_alumnos = ${id} AND s.id_alumnos = ${id} AND m.seccion = s.seccion
            `;
            conector.query(queryDisenoWeb, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTa diseno_web.");
                }else {
                    listaResultado.push(resultado);
                }
            })
            
            const  queryDisenoGrafico = `
            SELECT * FROM diseno_grafico as m, ${seccion} as s
            WHERE m.id_alumnos = ${id} AND s.id_alumnos = ${id} AND m.seccion = s.seccion
            `;
            conector.query(queryDisenoGrafico, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTa diseno_grafico.");
                }else {
                    listaResultado.push(resultado);
                }
            })
    
            const  queryPublucidadCreatividad = `
            SELECT * FROM publicidad_y_creatividad as m, ${seccion} as s
            WHERE m.id_alumnos = ${id} AND s.id_alumnos = ${id} AND m.seccion = s.seccion
            `;
            conector.query(queryPublucidadCreatividad, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTa publicidad_y_creatividad.");
                }else {
                    listaResultado.push(resultado);
                }
            })
    
            const  queryOperacionDeCamaraDeVideo = `
            SELECT * FROM operacion_de_camara_de_video as m, ${seccion} as s
            WHERE m.id_alumnos = ${id} AND s.id_alumnos = ${id} AND m.seccion = s.seccion
            `;
            conector.query(queryOperacionDeCamaraDeVideo, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTa operacion_de_camara_de_video.");
                }else {
                    listaResultado.push(resultado);
                }
            })
    
            const  queryGuion = `
            SELECT * FROM guion as m, ${seccion} as s
            WHERE m.id_alumnos = ${id} AND s.id_alumnos = ${id} AND m.seccion = s.seccion
            `;
            conector.query(queryGuion, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTa guion.");
                }else {
                    listaResultado.push(resultado);
                }
            })
    
            const  queryMediosDeComunicacion = `
            SELECT * FROM medios_de_comunicacion as m, ${seccion} as s
            WHERE m.id_alumnos = ${id} AND s.id_alumnos = ${id} AND m.seccion = s.seccion
            `;
            conector.query(queryMediosDeComunicacion, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTa medios_de_comunicacion.");
                }else {
                    listaResultado.push(resultado);
                }
            })

            const  queryCienciasNaturales = `
            SELECT * FROM ciencia_naturales as m, ${seccion} as s
            WHERE m.id_alumnos = ${id} AND s.id_alumnos = ${id} AND m.seccion = s.seccion
            `;
            conector.query(queryCienciasNaturales, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTa queryCienciasNaturales.");
                }else {
                    listaResultado.push(resultado);
                }
            })
    
            const  queryCienciasSociales = `
            SELECT * FROM ciencia_sociales as m, ${seccion} as s
            WHERE m.id_alumnos = ${id} AND s.id_alumnos = ${id} AND m.seccion = s.seccion
            `;
            conector.query(queryCienciasSociales, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA queryCienciasSociales.");
                }else {
                    listaResultado.push(resultado);
                }
            })

            const  queryEducacionFisica = `
            SELECT * FROM educacion_fisica as m, ${seccion} as s
            WHERE m.id_alumnos = ${id} AND s.id_alumnos = ${id} AND m.seccion = s.seccion
            `;
            conector.query(queryEducacionFisica, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA CIENENCIASA educacion_fisica.");
                }else {
                    listaResultado.push(resultado);
                }
            })
            
            const  queryFIHM = `
            SELECT * FROM formacion_integral_humana_religiosa as m, ${seccion} as s
            WHERE m.id_alumnos = ${id} AND s.id_alumnos = ${id} AND m.seccion = s.seccion
            `;
            conector.query(queryFIHM, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA formacion_integral_humana_religiosa.");
                }else {
                    listaResultado.push(resultado);
                }
            })
    
            const  queryIngles = `
            SELECT * FROM ingles as m, ${seccion} as s
            WHERE m.id_alumnos = ${id} AND s.id_alumnos = ${id} AND m.seccion = s.seccion
            `;
            conector.query(queryIngles, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA CIENENCIASA ingles.");
                }else {
                    listaResultado.push(resultado);
                }
            })
                    
            const  queryLenguaEspanola = `
            SELECT * FROM lengua_espanola as m, ${seccion} as s
            WHERE m.id_alumnos = ${id} AND s.id_alumnos = ${id} AND m.seccion = s.seccion
            `;
            conector.query(queryLenguaEspanola, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA CIENENCIASA lengua_espanola.");
                }else {
                    listaResultado.push(resultado);
                }
            })
    
            const  queryMatematica = `
            SELECT * FROM matematica as m, ${seccion} as s
            WHERE m.id_alumnos = ${id} AND s.id_alumnos = ${id} AND m.seccion = s.seccion
            `;
            conector.query(queryMatematica, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA matematica");
                }else {
                    listaResultado.push(resultado);
    
                    
                    //MANDANDO LA LISTA DE RESULTADO EN LA ULTIMA CONSULTA
                    resolve(listaResultado)
                }
            })


        }

        if(seccion == "6toa"){

            
            const  queryRedesSociales = `
            SELECT * FROM redes_sociles as m, ${seccion} as s
            WHERE m.id_alumnos = ${id} AND s.id_alumnos = ${id} AND m.seccion = s.seccion
            `;
            conector.query(queryRedesSociales, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTa redes_sociles.");
                }else {
                    listaResultado.push(resultado);
                }
            })
    
            const  queryProduccionAudioVisual = `
            SELECT * FROM produccion_audiovisual as m, ${seccion} as s
            WHERE m.id_alumnos = ${id} AND s.id_alumnos = ${id} AND m.seccion = s.seccion
            `;
            conector.query(queryProduccionAudioVisual, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTa produccion_audiovisual.");
                }else {
                    listaResultado.push(resultado);
                }
            })
            
            const  queryVideoArte = `
            SELECT * FROM videoarte as m, ${seccion} as s
            WHERE m.id_alumnos = ${id} AND s.id_alumnos = ${id} AND m.seccion = s.seccion
            `;
            conector.query(queryVideoArte, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTa videoarte.");
                }else {
                    listaResultado.push(resultado);
                }
            })
            
            const  queryAnimacion = `
            SELECT * FROM animacion as m, ${seccion} as s
            WHERE m.id_alumnos = ${id} AND s.id_alumnos = ${id} AND m.seccion = s.seccion
            `;
            conector.query(queryAnimacion, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTa animacion.");
                }else {
                    listaResultado.push(resultado);
                }
            })
            
            const  queryEdicion = `
            SELECT * FROM edicion as m, ${seccion} as s
            WHERE m.id_alumnos = ${id} AND s.id_alumnos = ${id} AND m.seccion = s.seccion
            `;
            conector.query(queryEdicion, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTa edicion.");
                }else {
                    listaResultado.push(resultado);
                }
            })
            
            const  queryProduccionDeProyectoEmprendedor = `
            SELECT * FROM produccion_de_proyecto_emprendedor as m, ${seccion} as s
            WHERE m.id_alumnos = ${id} AND s.id_alumnos = ${id} AND m.seccion = s.seccion
            `;
            conector.query(queryProduccionDeProyectoEmprendedor, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTa produccion_de_proyecto_emprendedor.");
                }else {
                    listaResultado.push(resultado);
                }
            })
            
            const  queryCienciasNaturales = `
            SELECT * FROM ciencia_naturales as m, ${seccion} as s
            WHERE m.id_alumnos = ${id} AND s.id_alumnos = ${id} AND m.seccion = s.seccion
            `;
            conector.query(queryCienciasNaturales, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTa queryCienciasNaturales.");
                }else {
                    listaResultado.push(resultado);
                }
            })
    
            const  queryCienciasSociales = `
            SELECT * FROM ciencia_sociales as m, ${seccion} as s
            WHERE m.id_alumnos = ${id} AND s.id_alumnos = ${id} AND m.seccion = s.seccion
            `;
            conector.query(queryCienciasSociales, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA queryCienciasSociales.");
                }else {
                    listaResultado.push(resultado);
                }
            })

            const  queryEducacionFisica = `
            SELECT * FROM educacion_fisica as m, ${seccion} as s
            WHERE m.id_alumnos = ${id} AND s.id_alumnos = ${id} AND m.seccion = s.seccion
            `;
            conector.query(queryEducacionFisica, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA CIENENCIASA educacion_fisica.");
                }else {
                    listaResultado.push(resultado);
                }
            })
            
            const  queryFIHM = `
            SELECT * FROM formacion_integral_humana_religiosa as m, ${seccion} as s
            WHERE m.id_alumnos = ${id} AND s.id_alumnos = ${id} AND m.seccion = s.seccion
            `;
            conector.query(queryFIHM, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA formacion_integral_humana_religiosa.");
                }else {
                    listaResultado.push(resultado);
                }
            })
    
            const  queryIngles = `
            SELECT * FROM ingles as m, ${seccion} as s
            WHERE m.id_alumnos = ${id} AND s.id_alumnos = ${id} AND m.seccion = s.seccion
            `;
            conector.query(queryIngles, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA CIENENCIASA ingles.");
                }else {
                    listaResultado.push(resultado);
                }
            })
                    
            const  queryLenguaEspanola = `
            SELECT * FROM lengua_espanola as m, ${seccion} as s
            WHERE m.id_alumnos = ${id} AND s.id_alumnos = ${id} AND m.seccion = s.seccion
            `;
            conector.query(queryLenguaEspanola, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA CIENENCIASA lengua_espanola.");
                }else {
                    listaResultado.push(resultado);
                }
            })
    
            const  queryMatematica = `
            SELECT * FROM matematica as m, ${seccion} as s
            WHERE m.id_alumnos = ${id} AND s.id_alumnos = ${id} AND m.seccion = s.seccion
            `;
            conector.query(queryMatematica, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA matematica");
                }else {
                    listaResultado.push(resultado);
    
                    
                    //MANDANDO LA LISTA DE RESULTADO EN LA ULTIMA CONSULTA
                    console.log(listaResultado)
                    resolve(listaResultado)
                }
            })





        }

    })

    return promesa
}

//FUNCION PARA VER LAS NOTAS DE LOS ALUMNOS PERO EN LA SECCION DE CALIFICACION 
const vistaNota = (seccion)=>{
    const promesa = new Promise((resolve,reject)=>{
    //HACIENDO CONSULTA A LAS DISTINTAS TABLAS DE MATERIAS

        //LISTA DE RESULTADO 
        const listaResultado = [];

        if(seccion == "4toa"){

            
            const  queryCienciasNaturales = `
            SELECT * FROM ciencia_naturales as m, ${seccion} as s
            WHERE m.id_alumnos = s.id_alumnos AND m.seccion = s.seccion
            `;
            conector.query(queryCienciasNaturales, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTa queryCienciasNaturales.");
                }else {
                    listaResultado.push(resultado);
                }
            })
    
            const  queryCienciasSociales = `
            SELECT * FROM ciencia_sociales as m, ${seccion} as s
            WHERE m.id_alumnos = s.id_alumnos AND m.seccion = s.seccion
            `;
            conector.query(queryCienciasSociales, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA queryCienciasSociales.");
                }else {
                    listaResultado.push(resultado);
                }
            })    
            
            const  queryDisenoBasico = `
            SELECT * FROM diseno_basico as m, ${seccion} as s
            WHERE m.id_alumnos = s.id_alumnos AND m.seccion = s.seccion
            `;
            conector.query(queryDisenoBasico, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA CIENENCIASA queryDisenoBasico.");
                }else {
                    listaResultado.push(resultado);
                }
            })
    
            const  queryEducacionFisica = `
            SELECT * FROM educacion_fisica as m, ${seccion} as s
            WHERE m.id_alumnos = s.id_alumnos AND m.seccion = s.seccion
            `;
            conector.query(queryEducacionFisica, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA CIENENCIASA educacion_fisica.");
                }else {
                    listaResultado.push(resultado);
                }
            })
            
            const  queryFIHM = `
            SELECT * FROM formacion_integral_humana_religiosa as m, ${seccion} as s
            WHERE m.id_alumnos = s.id_alumnos AND m.seccion = s.seccion
            `;
            conector.query(queryFIHM, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA CIENENCIASA formacion_integral_humana_religiosa.");
                }else {
                    listaResultado.push(resultado);
                }
            })
            
            const  queryFotografia = `
            SELECT * FROM fotografia as m, ${seccion} as s
            WHERE m.id_alumnos = s.id_alumnos AND m.seccion = s.seccion
            `;
            conector.query(queryFotografia, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA CIENENCIASA fotografia.");
                }else {
                    listaResultado.push(resultado);
                }
            })
            
            const  queryHistoriaDelArte = `
            SELECT * FROM historia_del_arte as m, ${seccion} as s
            WHERE m.id_alumnos = s.id_alumnos AND m.seccion = s.seccion
            `;
            conector.query(queryHistoriaDelArte, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA CIENENCIASA historia_del_arte.");
                }else {
                    listaResultado.push(resultado);
                }
            })
            
            const  queryIdentidad = `
            SELECT * FROM identidad as m, ${seccion} as s
            WHERE m.id_alumnos = s.id_alumnos AND m.seccion = s.seccion
            `;
            conector.query(queryIdentidad, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA CIENENCIASA identidad.");
                }else {
                    listaResultado.push(resultado);
                }
            })
            
            const  queryIngles = `
            SELECT * FROM ingles as m, ${seccion} as s
            WHERE m.id_alumnos = s.id_alumnos AND m.seccion = s.seccion
            `;
            conector.query(queryIngles, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA CIENENCIASA ingles.");
                }else {
                    listaResultado.push(resultado);
                }
            })
            
            const  queryLenguajeDanzario = `
            SELECT * FROM lenguaje_danzario as m, ${seccion} as s
            WHERE m.id_alumnos = s.id_alumnos AND m.seccion = s.seccion
            `;
            conector.query(queryLenguajeDanzario, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA CIENENCIASA lenguaje_danzario.");
                }else {
                    listaResultado.push(resultado);
                }
            })
    
            const  queryLenguajeMusical = `
            SELECT * FROM lenguaje_musical as m, ${seccion} as s
            WHERE m.id_alumnos = s.id_alumnos AND m.seccion = s.seccion
            `;
            conector.query(queryLenguajeMusical, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA CIENENCIASA lenguaje_musical.");
                }else {
                    listaResultado.push(resultado);
                }
            })
    
            const  queryLenguajeVisual = `
            SELECT * FROM lenguaje_visual as m, ${seccion} as s
            WHERE m.id_alumnos = s.id_alumnos AND m.seccion = s.seccion
            `;
            conector.query(queryLenguajeVisual, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA CIENENCIASA lenguaje_visual.");
                }else {
                    listaResultado.push(resultado);
                }
            })
            
            const  queryLenguaEspanola = `
            SELECT * FROM lengua_espanola as m, ${seccion} as s
            WHERE m.id_alumnos = s.id_alumnos AND m.seccion = s.seccion
            `;
            conector.query(queryLenguaEspanola, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA CIENENCIASA lengua_espanola.");
                }else {
                    listaResultado.push(resultado);
                }
            })
    
            const  queryMatematica = `
            SELECT * FROM matematica as m, ${seccion} as s
            WHERE m.id_alumnos = s.id_alumnos AND m.seccion = s.seccion

            `;
            conector.query(queryMatematica, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA educacion_fisica");
                }else {
                    listaResultado.push(resultado);
    
                    
                    //MANDANDO LA LISTA DE RESULTADO EN LA ULTIMA CONSULTA
                    resolve(listaResultado)
                }
            })

        }

        if(seccion == "5toa"){

            const  queryDisenoWeb = `
            SELECT * FROM diseno_web as m, ${seccion} as s
            WHERE m.id_alumnos = s.id_alumnos AND m.seccion = s.seccion
            `;
            conector.query(queryDisenoWeb, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTa diseno_web.");
                }else {
                    listaResultado.push(resultado);
                }
            })
            
            const  queryDisenoGrafico = `
            SELECT * FROM diseno_grafico as m, ${seccion} as s
            WHERE m.id_alumnos = s.id_alumnos AND m.seccion = s.seccion
            `;
            conector.query(queryDisenoGrafico, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTa diseno_grafico.");
                }else {
                    listaResultado.push(resultado);
                }
            })
    
            const  queryPublucidadCreatividad = `
            SELECT * FROM publicidad_y_creatividad as m, ${seccion} as s
            WHERE m.id_alumnos = s.id_alumnos AND m.seccion = s.seccion
            `;
            conector.query(queryPublucidadCreatividad, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTa publicidad_y_creatividad.");
                }else {
                    listaResultado.push(resultado);
                }
            })
    
            const  queryOperacionDeCamaraDeVideo = `
            SELECT * FROM operacion_de_camara_de_video as m, ${seccion} as s
            WHERE m.id_alumnos = s.id_alumnos AND m.seccion = s.seccion
            `;
            conector.query(queryOperacionDeCamaraDeVideo, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTa operacion_de_camara_de_video.");
                }else {
                    listaResultado.push(resultado);
                }
            })
    
            const  queryGuion = `
            SELECT * FROM guion as m, ${seccion} as s
            WHERE m.id_alumnos = s.id_alumnos AND m.seccion = s.seccion
            `;
            conector.query(queryGuion, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTa guion.");
                }else {
                    listaResultado.push(resultado);
                }
            })
    
            const  queryMediosDeComunicacion = `
            SELECT * FROM medios_de_comunicacion as m, ${seccion} as s
            WHERE m.id_alumnos = s.id_alumnos AND m.seccion = s.seccion
            `;
            conector.query(queryMediosDeComunicacion, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTa medios_de_comunicacion.");
                }else {
                    listaResultado.push(resultado);
                }
            })

            const  queryCienciasNaturales = `
            SELECT * FROM ciencia_naturales as m, ${seccion} as s
            WHERE m.id_alumnos = s.id_alumnos AND m.seccion = s.seccion
            `;
            conector.query(queryCienciasNaturales, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTa queryCienciasNaturales.");
                }else {
                    listaResultado.push(resultado);
                }
            })
    
            const  queryCienciasSociales = `
            SELECT * FROM ciencia_sociales as m, ${seccion} as s
            WHERE m.id_alumnos = s.id_alumnos AND m.seccion = s.seccion
            `;
            conector.query(queryCienciasSociales, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA queryCienciasSociales.");
                }else {
                    listaResultado.push(resultado);
                }
            })

            const  queryEducacionFisica = `
            SELECT * FROM educacion_fisica as m, ${seccion} as s
            WHERE m.id_alumnos = s.id_alumnos AND m.seccion = s.seccion
            `;
            conector.query(queryEducacionFisica, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA CIENENCIASA educacion_fisica.");
                }else {
                    listaResultado.push(resultado);
                }
            })
            
            const  queryFIHM = `
            SELECT * FROM formacion_integral_humana_religiosa as m, ${seccion} as s
            WHERE m.id_alumnos = s.id_alumnos AND m.seccion = s.seccion
            `;
            conector.query(queryFIHM, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA CIENENCIASA formacion_integral_humana_religiosa.");
                }else {
                    listaResultado.push(resultado);
                }
            })
    
            const  queryIngles = `
            SELECT * FROM ingles as m, ${seccion} as s
            WHERE m.id_alumnos = s.id_alumnos AND m.seccion = s.seccion
            `;
            conector.query(queryIngles, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA CIENENCIASA ingles.");
                }else {
                    listaResultado.push(resultado);
                }
            })
                    
            const  queryLenguaEspanola = `
            SELECT * FROM lengua_espanola as m, ${seccion} as s
            WHERE m.id_alumnos = s.id_alumnos AND m.seccion = s.seccion
            `;
            conector.query(queryLenguaEspanola, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA CIENENCIASA lengua_espanola.");
                }else {
                    listaResultado.push(resultado);
                }
            })
    
            const  queryMatematica = `
            SELECT * FROM matematica as m, ${seccion} as s
            WHERE m.id_alumnos = s.id_alumnos AND m.seccion = s.seccion
            `;
            conector.query(queryMatematica, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA educacion_fisica");
                }else {
                    listaResultado.push(resultado);
    
                    
                    //MANDANDO LA LISTA DE RESULTADO EN LA ULTIMA CONSULTA
                    resolve(listaResultado)
                }
            })
        }

        if(seccion == "6toa"){
               
            const  queryRedesSociales = `
            SELECT * FROM redes_sociles as m, ${seccion} as s
            WHERE m.id_alumnos = s.id_alumnos AND m.seccion = s.seccion
            `;
            conector.query(queryRedesSociales, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTa redes_sociles.");
                }else {
                    listaResultado.push(resultado);
                }
            })
    
            const  queryProduccionAudioVisual = `
            SELECT * FROM produccion_audiovisual as m, ${seccion} as s
            WHERE m.id_alumnos = s.id_alumnos AND m.seccion = s.seccion
            `;
            conector.query(queryProduccionAudioVisual, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTa produccion_audiovisual.");
                }else {
                    listaResultado.push(resultado);
                }
            })
            
            const  queryVideoArte = `
            SELECT * FROM videoarte as m, ${seccion} as s
            WHERE m.id_alumnos = s.id_alumnos AND m.seccion = s.seccion
            `;
            conector.query(queryVideoArte, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTa videoarte.");
                }else {
                    listaResultado.push(resultado);
                }
            })
            
            const  queryAnimacion = `
            SELECT * FROM animacion as m, ${seccion} as s
            WHERE m.id_alumnos = s.id_alumnos AND m.seccion = s.seccion
            `;
            conector.query(queryAnimacion, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTa animacion.");
                }else {
                    listaResultado.push(resultado);
                }
            })
            
            const  queryEdicion = `
            SELECT * FROM edicion as m, ${seccion} as s
            WHERE m.id_alumnos = s.id_alumnos AND m.seccion = s.seccion
            `;
            conector.query(queryEdicion, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTa edicion.");
                }else {
                    listaResultado.push(resultado);
                }
            })
            
            const  queryProduccionDeProyectoEmprendedor = `
            SELECT * FROM produccion_de_proyecto_emprendedor as m, ${seccion} as s
            WHERE m.id_alumnos = s.id_alumnos AND m.seccion = s.seccion
            `;
            conector.query(queryProduccionDeProyectoEmprendedor, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTa produccion_de_proyecto_emprendedor.");
                }else {
                    listaResultado.push(resultado);
                }
            })
            
            const  queryCienciasNaturales = `
            SELECT * FROM ciencia_naturales as m, ${seccion} as s
            WHERE m.id_alumnos = s.id_alumnos AND m.seccion = s.seccion
            `;
            conector.query(queryCienciasNaturales, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTa queryCienciasNaturales.");
                }else {
                    listaResultado.push(resultado);
                }
            })
    
            const  queryCienciasSociales = `
            SELECT * FROM ciencia_sociales as m, ${seccion} as s
            WHERE m.id_alumnos = s.id_alumnos AND m.seccion = s.seccion
            `;
            conector.query(queryCienciasSociales, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA queryCienciasSociales.");
                }else {
                    listaResultado.push(resultado);
                }
            })

            const  queryEducacionFisica = `
            SELECT * FROM educacion_fisica as m, ${seccion} as s
            WHERE m.id_alumnos = s.id_alumnos AND m.seccion = s.seccion
            `;
            conector.query(queryEducacionFisica, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA CIENENCIASA educacion_fisica.");
                }else {
                    listaResultado.push(resultado);
                }
            })
            
            const  queryFIHM = `
            SELECT * FROM formacion_integral_humana_religiosa as m, ${seccion} as s
            WHERE m.id_alumnos = s.id_alumnos AND m.seccion = s.seccion
            `;
            conector.query(queryFIHM, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA formacion_integral_humana_religiosa.");
                }else {
                    listaResultado.push(resultado);
                }
            })
    
            const  queryIngles = `
            SELECT * FROM ingles as m, ${seccion} as s
            WHERE m.id_alumnos = s.id_alumnos AND m.seccion = s.seccion
            `;
            conector.query(queryIngles, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA CIENENCIASA ingles.");
                }else {
                    listaResultado.push(resultado);
                }
            })
                    
            const  queryLenguaEspanola = `
            SELECT * FROM lengua_espanola as m, ${seccion} as s
            WHERE m.id_alumnos = s.id_alumnos AND m.seccion = s.seccion
            `;
            conector.query(queryLenguaEspanola, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA CIENENCIASA lengua_espanola.");
                }else {
                    listaResultado.push(resultado);
                }
            })
    
            const  queryMatematica = `
            SELECT * FROM matematica as m, ${seccion} as s
            WHERE m.id_alumnos = s.id_alumnos AND m.seccion = s.seccion
            `;
            conector.query(queryMatematica, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN VISTA matematica");
                }else {
                    listaResultado.push(resultado);
    
                    
                    //MANDANDO LA LISTA DE RESULTADO EN LA ULTIMA CONSULTA
                    resolve(listaResultado)
                }
            })




        }

    })

    return promesa
}


/**
    ORDEN ENQUE SE DEVE DE TRABAJAR LAS MATERIAS DE LA SECCION 4TOA
    ESTOS NOMBRE SON DE LAS MATERIAS NO DE LA TABLAS.

ciencias naturales
ciencias sociales
educacion fisica
formacion integral humana religiosa
diseño basico y exprecion visual
fotografia
historia del arte
identidad, cultura y emprendimiento
ingles
lenguaje danzario y teatral
lenguaje musical
lenguaje visual, dibujo y creacion de personajes
lengua espanola
matematica


SECCION 5TOA

diseno_web
diseno_grafico
publicidad_y_creatividad
operacion_de_camara_de_video
guion
medios_de_comunicacion
lengua espanola
matematica
ingles
ciencias naturales
ciencias sociales
educacion fisica
formacion integral humana religiosa
 */




const agregarNota = (id,seccion,listaMateriasTotal)=>{
    const promesa = new Promise((resolve,reject)=>{

        if(seccion == "4toa"){


            const  query1 = `
            UPDATE ciencia_naturales
            SET p1 = ${listaMateriasTotal[0]},
            p2 = ${listaMateriasTotal[1]},
            p3 = ${listaMateriasTotal[2]},
            p4 = ${listaMateriasTotal[3]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query1, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota ciencia_naturales.");
                }
            })

            const  query2 = `
            UPDATE ciencia_sociales
            SET p1 = ${listaMateriasTotal[4]},
            p2 = ${listaMateriasTotal[5]},
            p3 = ${listaMateriasTotal[6]},
            p4 = ${listaMateriasTotal[7]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query2, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota ciencia_sociales.");
                }
            })
    
            const  query3 = `
            UPDATE diseno_basico
            SET p1 = ${listaMateriasTotal[8]},
            p2 = ${listaMateriasTotal[9]},
            p3 = ${listaMateriasTotal[10]},
            p4 = ${listaMateriasTotal[11]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query3, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota diseno_basico.");
                }
            })

            const  query4 = `
            UPDATE educacion_fisica
            SET p1 = ${listaMateriasTotal[12]},
            p2 = ${listaMateriasTotal[13]},
            p3 = ${listaMateriasTotal[14]},
            p4 = ${listaMateriasTotal[15]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query4, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota educacion_fisica.");
                }
            })
            
            const  query5 = `
            UPDATE formacion_integral_humana_religiosa
            SET p1 = ${listaMateriasTotal[16]},
            p2 = ${listaMateriasTotal[17]},
            p3 = ${listaMateriasTotal[18]},
            p4 = ${listaMateriasTotal[19]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query5, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota formacion_integral_humana_religiosa.");
                }
            })

            const  query6 = `
            UPDATE fotografia
            SET p1 = ${listaMateriasTotal[20]},
            p2 = ${listaMateriasTotal[21]},
            p3 = ${listaMateriasTotal[22]},
            p4 = ${listaMateriasTotal[23]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query6, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota fotografia.");
                }
            })

            const  query7 = `
            UPDATE historia_del_arte
            SET p1 = ${listaMateriasTotal[24]},
            p2 = ${listaMateriasTotal[25]},
            p3 = ${listaMateriasTotal[26]},
            p4 = ${listaMateriasTotal[27]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query7, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota historia_del_arte.");
                }
            })

            const  query8 = `
            UPDATE identidad
            SET p1 = ${listaMateriasTotal[28]},
            p2 = ${listaMateriasTotal[29]},
            p3 = ${listaMateriasTotal[30]},
            p4 = ${listaMateriasTotal[31]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query8, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota identidad.");
                }
            })
            
            const  query9 = `
            UPDATE ingles
            SET p1 = ${listaMateriasTotal[32]},
            p2 = ${listaMateriasTotal[33]},
            p3 = ${listaMateriasTotal[34]},
            p4 = ${listaMateriasTotal[35]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query9, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota ingles.");
                }
            })

            const  query10 = `
            UPDATE lenguaje_danzario
            SET p1 = ${listaMateriasTotal[36]},
            p2 = ${listaMateriasTotal[37]},
            p3 = ${listaMateriasTotal[38]},
            p4 = ${listaMateriasTotal[39]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query10, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota lenguaje_danzario.");
                }
            })
            
            const  query11 = `
            UPDATE lenguaje_musical
            SET p1 = ${listaMateriasTotal[40]},
            p2 = ${listaMateriasTotal[41]},
            p3 = ${listaMateriasTotal[42]},
            p4 = ${listaMateriasTotal[43]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query11, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota lenguaje_musical.");
                }
            })

            const  query12 = `
            UPDATE lenguaje_visual
            SET p1 = ${listaMateriasTotal[44]},
            p2 = ${listaMateriasTotal[45]},
            p3 = ${listaMateriasTotal[46]},
            p4 = ${listaMateriasTotal[47]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query12, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota lenguaje_visual.");
                }
            })
            
            const  query13 = `
            UPDATE lengua_espanola
            SET p1 = ${listaMateriasTotal[48]},
            p2 = ${listaMateriasTotal[49]},
            p3 = ${listaMateriasTotal[50]},
            p4 = ${listaMateriasTotal[51]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query13, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota lengua_espanola.");
                }
            })
            
            const  query14 = `
            UPDATE matematica
            SET p1 = ${listaMateriasTotal[52]},
            p2 = ${listaMateriasTotal[53]},
            p3 = ${listaMateriasTotal[54]},
            p4 = ${listaMateriasTotal[55]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query14, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota matematica.");
                }
            })
            

        }

        if(seccion == "5toa"){


            
            const  query1 = `
            UPDATE diseno_web
            SET p1 = ${listaMateriasTotal[0]},
            p2 = ${listaMateriasTotal[1]},
            p3 = ${listaMateriasTotal[2]},
            p4 = ${listaMateriasTotal[3]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query1, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota diseno_web.");
                }
            })

            const  query2 = `
            UPDATE diseno_grafico
            SET p1 = ${listaMateriasTotal[4]},
            p2 = ${listaMateriasTotal[5]},
            p3 = ${listaMateriasTotal[6]},
            p4 = ${listaMateriasTotal[7]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query2, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota diseno_grafico.");
                }
            })
    
            const  query3 = `
            UPDATE publicidad_y_creatividad
            SET p1 = ${listaMateriasTotal[8]},
            p2 = ${listaMateriasTotal[9]},
            p3 = ${listaMateriasTotal[10]},
            p4 = ${listaMateriasTotal[11]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query3, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota publicidad_y_creatividad.");
                }
            })

            const  query4 = `
            UPDATE operacion_de_camara_de_video
            SET p1 = ${listaMateriasTotal[12]},
            p2 = ${listaMateriasTotal[13]},
            p3 = ${listaMateriasTotal[14]},
            p4 = ${listaMateriasTotal[15]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query4, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota operacion_de_camara_de_video.");
                }
            })
            
            const  query5 = `
            UPDATE guion
            SET p1 = ${listaMateriasTotal[16]},
            p2 = ${listaMateriasTotal[17]},
            p3 = ${listaMateriasTotal[18]},
            p4 = ${listaMateriasTotal[19]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query5, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota guion.");
                }
            })

            const  query6 = `
            UPDATE medios_de_comunicacion
            SET p1 = ${listaMateriasTotal[20]},
            p2 = ${listaMateriasTotal[21]},
            p3 = ${listaMateriasTotal[22]},
            p4 = ${listaMateriasTotal[23]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query6, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota medios_de_comunicacion.");
                }
            })

            const  query7 = `
            UPDATE ciencia_naturales
            SET p1 = ${listaMateriasTotal[24]},
            p2 = ${listaMateriasTotal[25]},
            p3 = ${listaMateriasTotal[26]},
            p4 = ${listaMateriasTotal[27]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query7, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota ciencia_naturales.");
                }
            })

            const  query8 = `
            UPDATE ciencia_sociales
            SET p1 = ${listaMateriasTotal[28]},
            p2 = ${listaMateriasTotal[29]},
            p3 = ${listaMateriasTotal[30]},
            p4 = ${listaMateriasTotal[31]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query8, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota ciencia_sociales.");
                }
            })
            
            const  query9 = `
            UPDATE diseno_basico
            SET p1 = ${listaMateriasTotal[32]},
            p2 = ${listaMateriasTotal[33]},
            p3 = ${listaMateriasTotal[34]},
            p4 = ${listaMateriasTotal[35]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query9, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota diseno_basico.");
                }
            })

            const  query10 = `
            UPDATE diseno_basico
            SET p1 = ${listaMateriasTotal[36]},
            p2 = ${listaMateriasTotal[37]},
            p3 = ${listaMateriasTotal[38]},
            p4 = ${listaMateriasTotal[39]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query10, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota diseno_basico.");
                }
            })
            
            const  query11 = `
            UPDATE educacion_fisica
            SET p1 = ${listaMateriasTotal[40]},
            p2 = ${listaMateriasTotal[41]},
            p3 = ${listaMateriasTotal[42]},
            p4 = ${listaMateriasTotal[43]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query11, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota educacion_fisica.");
                }
            })

            const  query12 = `
            UPDATE formacion_integral_humana_religiosa
            SET p1 = ${listaMateriasTotal[44]},
            p2 = ${listaMateriasTotal[45]},
            p3 = ${listaMateriasTotal[46]},
            p4 = ${listaMateriasTotal[47]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query12, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota formacion_integral_humana_religiosa.");
                }
            })
            
            const  query13 = `
            UPDATE ingles
            SET p1 = ${listaMateriasTotal[48]},
            p2 = ${listaMateriasTotal[49]},
            p3 = ${listaMateriasTotal[50]},
            p4 = ${listaMateriasTotal[51]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query13, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota ingles.");
                }
            })
            
            const  query14 = `
            UPDATE lengua_espanola
            SET p1 = ${listaMateriasTotal[52]},
            p2 = ${listaMateriasTotal[53]},
            p3 = ${listaMateriasTotal[54]},
            p4 = ${listaMateriasTotal[55]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query14, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota lengua_espanola.");
                }
            })
            
            const  query15 = `
            UPDATE matematica
            SET p1 = ${listaMateriasTotal[56]},
            p2 = ${listaMateriasTotal[57]},
            p3 = ${listaMateriasTotal[58]},
            p4 = ${listaMateriasTotal[59]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query15, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota matematica.");
                }
            })


        }

        if(seccion == "6toa"){



            
            
            const  query1 = `
            UPDATE redes_sociles
            SET p1 = ${listaMateriasTotal[0]},
            p2 = ${listaMateriasTotal[1]},
            p3 = ${listaMateriasTotal[2]},
            p4 = ${listaMateriasTotal[3]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query1, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota redes_sociles.");
                }
            })

            const  query2 = `
            UPDATE produccion_audiovisual
            SET p1 = ${listaMateriasTotal[4]},
            p2 = ${listaMateriasTotal[5]},
            p3 = ${listaMateriasTotal[6]},
            p4 = ${listaMateriasTotal[7]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query2, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota produccion_audiovisual.");
                }
            })
    
            const  query3 = `
            UPDATE videoarte
            SET p1 = ${listaMateriasTotal[8]},
            p2 = ${listaMateriasTotal[9]},
            p3 = ${listaMateriasTotal[10]},
            p4 = ${listaMateriasTotal[11]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query3, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota videoarte.");
                }
            })

            const  query4 = `
            UPDATE animacion
            SET p1 = ${listaMateriasTotal[12]},
            p2 = ${listaMateriasTotal[13]},
            p3 = ${listaMateriasTotal[14]},
            p4 = ${listaMateriasTotal[15]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query4, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota animacion.");
                }
            })
            
            const  query5 = `
            UPDATE edicion
            SET p1 = ${listaMateriasTotal[16]},
            p2 = ${listaMateriasTotal[17]},
            p3 = ${listaMateriasTotal[18]},
            p4 = ${listaMateriasTotal[19]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query5, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota edicion.");
                }
            })

            const  query6 = `
            UPDATE produccion_de_proyecto_emprendedor
            SET p1 = ${listaMateriasTotal[20]},
            p2 = ${listaMateriasTotal[21]},
            p3 = ${listaMateriasTotal[22]},
            p4 = ${listaMateriasTotal[23]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query6, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota produccion_de_proyecto_emprendedor.");
                }
            })

            const  query7 = `
            UPDATE ciencia_naturales
            SET p1 = ${listaMateriasTotal[24]},
            p2 = ${listaMateriasTotal[25]},
            p3 = ${listaMateriasTotal[26]},
            p4 = ${listaMateriasTotal[27]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query7, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota ciencia_naturales.");
                }
            })

            const  query8 = `
            UPDATE educacion_fisica
            SET p1 = ${listaMateriasTotal[28]},
            p2 = ${listaMateriasTotal[29]},
            p3 = ${listaMateriasTotal[30]},
            p4 = ${listaMateriasTotal[31]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query8, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota ciencia_sociales.");
                }
            })


            
            const  query9 = `
            UPDATE formacion_integral_humana_religiosa
            SET p1 = ${listaMateriasTotal[32]},
            p2 = ${listaMateriasTotal[33]},
            p3 = ${listaMateriasTotal[34]},
            p4 = ${listaMateriasTotal[35]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query9, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota formacion_integral_humana_religiosa.");
                }
            })
            
            const  query10 = `
            UPDATE ingles
            SET p1 = ${listaMateriasTotal[36]},
            p2 = ${listaMateriasTotal[37]},
            p3 = ${listaMateriasTotal[38]},
            p4 = ${listaMateriasTotal[39]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query10, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota ingles.");
                }
            })
            
            const  query11 = `
            UPDATE lengua_espanola
            SET p1 = ${listaMateriasTotal[40]},
            p2 = ${listaMateriasTotal[41]},
            p3 = ${listaMateriasTotal[42]},
            p4 = ${listaMateriasTotal[43]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query11, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota lengua_espanola.");
                }
            })
            
            const  query12 = `
            UPDATE matematica
            SET p1 = ${listaMateriasTotal[44]},
            p2 = ${listaMateriasTotal[45]},
            p3 = ${listaMateriasTotal[46]},
            p4 = ${listaMateriasTotal[47]}
            WHERE id_alumnos = ${id} AND seccion = "${seccion}"
            `;
            conector.query(query12, (error,resultado)=>{
                if(error){
                    reject("[-] ERRRO EN LA FUNCION  agergarNota matematica.");
                }
            })
            
            

        }

        resolve("los datos se guardaron correctamente.")
        
        

    })

    return promesa
}




module.exports = { conexion, verificarAcceso, mostrar, consulta, eliminal, editar, vista,agregarNota, mostrarSecciones, verificarCalificaciones, vistaNota }



//DESARROLLADO POR ANDREW SANCHEZ SEVERINO EDAD: 16