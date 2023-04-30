import { Testimonials } from "../models/Testimonials.js";

const guardarTestimonial = async (req,res) => { //utilitzarem async await pk potser que trigui una mica en donar resposta la BD
    //Validem el formulari

    const{nombre, correo, mensaje}  = req.body;
    const errores = [];
    if(nombre.trim() === ''){errores.push({mensaje : 'Nombre vacio'})}
    if(correo.trim() === ''){errores.push({mensaje : 'correo vacio'})}
    if(mensaje.trim() === ''){errores.push({mensaje : 'mensaje vacio'})}

    console.log(errores);
    console.log(req.body);

    //També podem validar coses amb 'EXPRESS VALIDATOR'.
    //Ara que fem el render, la pàgina ja no dona error. Es torna a mostrar la pàgina de 'Testimonials'.
    if(errores.length > 0){
        //Mostrem la vista amb errors
        //Fem una consulta dels testimonials a la bd
        const testimonials = await Testimonials.findAll();

        res.render('testimonials', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            testimonials,
            mensaje
        })
    }else{
        //guardar en la BD. Hem de crear la taula de BD i el model
        try{ //Controlem si hi ha un error amb el try - catch
            await Testimonials.create({
                nombre,
                correo,
                mensaje
            })
            //Si no redirigim, l'usuari a la pàgina de testimonials, la pàgina és queda carregant.
            res.redirect('/testimonials');
        }catch(error){
            console.log(error);
        }
    }
}

export default guardarTestimonial; 