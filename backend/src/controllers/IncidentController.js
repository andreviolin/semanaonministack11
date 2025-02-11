const connection = require('../database/connection');

module.exports = {
    async index(request,response){
        //esquema de paginação 
        const { page = 1 } = request.query;

        //total de casos
        const [count] = await connection('incidents').count();
 
        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1)* 5)
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
        ]);

        response.header('X-Total-Count', count['count(*)']);
        
        return response.json(incidents);
    },

    async create(request, response){
        const {title, description, value} = request.body;
        //pegando o id ong_id
        const ong_id = request.headers.authorization;

        //desistruturar 
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },

    async delete(request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        //verificando se é da mesma ong
        const incident = await connection('incidents')
          .where('id',id)
          .select('ong_id')
          .first();

        if(incident.ong_id != ong_id){
            return response.status(401).json({ error: 'operação não autorizada.'});
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
};