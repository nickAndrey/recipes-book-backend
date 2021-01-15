const tableName = 'recipes';

// based on schema `https://schema.org/Recipe`
module.exports = {
  recipeTableSchema: `(
    id serial primary key not null,
    cookTime text not null,
    cookingMethod text not null,
    recipeCategory text default 'entree',
    recipeCuisine text not null,
    recipeIngredient text not null,
    dateCreated date not null default now()
  )`,
};
