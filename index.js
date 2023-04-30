import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
//per a que funcionin els mòduls, ho hem d'indicar en el 'pacakage.json'.



//dotenv.config(); S afegim el "/config" després de dotenv, no cal afegir això.

//const express = require('express'); //Sintaxi common.js. js no soporta aquesta sintaxi de forma nativa. Js només soporta moduls. 
                                    //importem Express

const app = express(); //Només hi pot haver una instancia de l'aplicació.

//Conectem amb la base de dades
db.authenticate()
    .then( () => console.log('Base de dadas conectada'))
    .catch( error => console.log('Base dadades no conectada '+error) );

//MIDELWARE: És una funció que es pot executar abans o després d'una ruta. 
//Te accés a l'ojbecte Request, Response i la funció next(); Tots els 'app.set(....)' és middelware de Express.
//Podem crear midelware propi
app.use((req, res, next) => { //next és necessari per a que l'execució passi a la següent pila del middleware. (per a que es segueixi executant el codi vaja)
    const year = new Date();
    //Com passem d'un elements d'un arxiu a l'altre on hi ha una vista? Mitjançant 'Locals'
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = 'Agencia de Viajes';
    console.log(res.locals);

   return next(); //obliquem a passar al següent element de la pila.
})

//Agreguem body parser per llegir les dades del formulari (pertany a Express).
//Si no fiquem això, dona error a l'enviar el formulari, i no llegueix l'objecte "req.body". (No ho entenc.)
app.use(express.urlencoded({extended:true}));


//Habilitem PUG
app.set('view engine','pug'); //Hem de crear la carpeta que es diu 'views'

//Definim la carpeta publica (es una convenció)
app.use(express.static('public')); // app.use s'executa en tots els mètodes 'get', 'post'...

//Agreguem el router
app.use('/', router); //soporta get, post, delete, etc. Agrega totes les rutes al router.

const port = process.env.PORT || 4000; //En producció, no sabrem mai quin port tindrem. Com que estem el local, utilitzarem el port 4000
            //això son variables d'entorn

app.listen(port, () => {  //Arranquem el servidor escoltant en el port que diem.
    console.log(`El Servidor está funcionando en el puerto ${port}`);
})



//MODEL VIEW CONTROLER
//pATRÓ DE DISSENY DE SOFTWARE. Permet la separació d'obligacions de cada peça de codi de l'aplicació.
//Es separa la lògica de programació i el que es mostra en pantalla.

//MODEL: encarregat de les dades. Ex: un usuari vol veure la secció de productes d'una bd, 
//El model farà la consulta a la bd.

//VIEW: S'encarrega del que es veu en pantalla. 

//Controler: el que s'encarrega de comunicar entre el model i la vista.

//Router (terme important): És l'encarregat de registrar totes les url's o endpoints que soporta
//l'aplicació.

//Si l'usuari accedeix a /productes, el router crida a un controller, que es comunica amb el model per tal d'obtenir les dades que son pasades a la vista per a ser mostrades

