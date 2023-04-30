import { Viaje } from '../models/Viaje.js';
import { Testimonials } from '../models/Testimonials.js';

const paginaInicio =  async (req,res) => {

    //Consultar 3 viajes del modelo Viaje

    const promisesDB = [];
    promisesDB.push(Viaje.findAll({limit: 3}));
    promisesDB.push(Testimonials.findAll({limit: 3}));


    try {
        const resultado = await Promise.all(promisesDB);
        /* ho podriem ficar aixií, però te un problema: estem encadenant dos awaits.
        Fins que no acabi d'executar-se el primer, no coemnçarà el segon. Això pot fer que el codi vagi lent.
        const viajes = await Viaje.findAll({limit: 3});
        const testimonials = await Testimonials.findAll({limit: 3});
        */

        res.render('inicio', {  //passem un objecte que creem
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimonials: resultado[1]
        }); 

    }catch (error){
        console.log(error)
    }
    
}

const paginaNosotros = (req,res) => {
    res.render('nosotros', {  //passem un objecte que creem
        pagina: 'Nosotros'
    }); 
}

//Hem de consultar a la BD i mostrar els testimonials en la pàgina.
const paginaTestimonials = async (req,res) => {
    try {
        const testimonials = await Testimonials.findAll();
        res.render('testimonials', {  //passem un objecte que creem
            pagina: 'Testimoniales',
            testimonials
        }); 
    }catch(error){
        console.log(error);
    }
}

const paginaViajes = async (req,res) => {
    //Passem informació de la consulta de la BD a la vista
    const viajes = await Viaje.findAll();

    console.log(viajes);

    res.render('viajes', {  //passem un objecte que creem
        pagina: 'Próximos viajes',
        viajes,
    }); 
}

const paginaContacto = (req,res) => {
    res.render('contacto', {  //passem un objecte que creem
        pagina: 'Contacto'
    }); 
}

//Mostra un viatge pel seu slug
const paginaDetalleViaje = async (req, res) => {
    console.log(req.params); // 'req.params', retorna un objecte amb els parametres de la request ('get');

    const { slug } = req.params; //Podem veure l'slug que hi ha en la url de la request.

    try{ //Usualment, utilitzem try i catch, perque si hi hagués un error en la consulta, permetriem executar la resta de codi.
        const resultado = await Viaje.findOne( { where : { slug }} ); //Fem un 'where' en la bd i que coincideixi amb l'slug de la url (passat per req.params)
        res.render('viaje', {
            pagina: 'Informacion Viaje',
            resultado
        })
    } catch (error) {
        console.log(error);
    }
}

export {
    paginaNosotros,
    paginaInicio, 
    paginaViajes, 
    paginaTestimonials, 
    paginaContacto,
    paginaDetalleViaje
} 
