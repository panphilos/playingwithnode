import Sequelize from 'sequelize';
import db from '../config/db.js';

export const Testimonials = db.define('testimonials', {
    nombre: {
        type: Sequelize.STRING //En la BD és 'varchar'. ho hem de col·locar com a string en Sequelize
    },
    correo: {
        type: Sequelize.STRING
    },
    mensaje: {
        type: Sequelize.STRING
    }
})