export interface IRecipeModel {
  id: string;
  name: string;
  cooktime: string;
  cookingmethod: string;
  recipecategory: string;
  recipecuisine: string;
  recipeingredient: string[];
  datecreated: string;
  author: string;
  image: string;
  content: string;
  description: string;
}
