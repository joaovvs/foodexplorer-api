
exports.up = knex => knex.schema.createTable("foods", table => {
    table.increments("id");
    table.text("name").notNullable();
    table.text("category").notNullable();
    table.text("description").notNullable();
    table.float("price").notNullable();
    table.text("image");
    table.integer("user_id").references("id").inTable("users");
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
}); 

exports.down = knex => knex.schema.dropTable("foods");