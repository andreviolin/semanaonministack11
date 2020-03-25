
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table){
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        //relacinamento 
        table.string('ong_id').notNullable();

        //chave estrageira
        table.foreign('ong_id').references('id').inTable('ongs');
    });    
};
//deletar a tabela
exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
