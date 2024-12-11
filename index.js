const { app, puerto } = require("./src/app.js");


app.listen(puerto,()=>{
    console.log(`SERVIDOR MONTADO EN EL PUERTO ${puerto}.`)
})