import express from 'express';
import { paginaInicio, 
         paginaNosotros, 
         paginaViajes, 
         paginaTestimonials, 
         paginaDetalleViaje 
} from  '../controllers/paginasController.js';

import guardarTestimonial from '../controllers/testimonialController.js';


const router = express.Router(); //Creem un nou 'Router Object'

const viajes = 'Viaje a Alemania';


router.get('/',paginaInicio);

router.get('/nosotros', paginaNosotros);

router.get('/viajes', paginaViajes);

router.get('/viajes/:slug', paginaDetalleViaje); // els ':' son un comodin variable

router.get('/testimonials',paginaTestimonials);
router.post('/testimonials',guardarTestimonial);


export default router;

//Ara falta afegir un template engine per tal de poder carregar un HTML.
//Existeixen diversos templates Engines. Els mes comuns son:
//PUG (molt fàcil de fer codi)
//EJS (EMBED javascript)
//React

//S'instala així: 'npm install pug'
