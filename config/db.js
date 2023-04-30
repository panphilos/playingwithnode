import Sequelize from 'sequelize';
import dotenv from 'dotenv/config';  //De cara al Deployment, importem les variables d'entorn. Reiniciar servidor un cop introduïda.
//Per a que funcioni, el dotenv, ha d'estar en l'arxiu on faré anar les variables d'entorn.

//Sequelize facilita treballar bases de dades en Node.
//Pot treballar amb qualsevol tipus de base de dades sense tenir que adaptar el codi.

//Abans de tenir les variables d'entorn, hi havia les de dev en la consulta a la db:
// const db = new Sequelize('viajes', 'root', '', {

//Afegim les variables d'entorn així, ja que l'arxiu ".env" no serà accessible.
const db = new Sequelize(process.env.DB_NAME,process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    post: '3306',
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    pool: {
        max:5,
        min:0,
        acquire: 30000,
        idle:10000
    },
    operatorAliases:false

});

export default db;