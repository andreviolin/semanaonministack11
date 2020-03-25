const crypto = require('crypto');
//conexao com banco
const connection = require('../database/connection');

//exporte o metodo com seus objetos
module.exports = {
    //listar ongs
    async index (request, response){
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },


    async create(request, response){
        const { name, email, whatsapp, city, uf } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });

    return response.json({ id });
    }
};


