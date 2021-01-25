// based on schema `https://schema.org/Recipe`
module.exports = {
  recipeTableSchema: `(
    id serial not null primary key,
    name varchar(255) not null,
    cooktime char(50) not null,
    cookingmethod char(50) not null,
    recipecategory char(50) not null,
    recipecuisine char(100) not null,
    recipeingredient text [] not null,
    datecreated char(50) not null,
    author char(50) not null,
    image varchar(255),
    content text not null,
    description text not null
  )`,
};
