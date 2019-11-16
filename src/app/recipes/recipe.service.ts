import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
   /*  private recipes: Recipe[] = [
        new Recipe('First Recipe',
            'This is simply a test', 'https://www.hap.org/-/media/blog/images/post-images/201812/hap-minestrone-600x300.jpg?h=300&w=600&la=en&hash=56BCA000C02ABB32467E4F36C148C4B4A095CC30',
            [
                new Ingredient('Meat', 12),
                new Ingredient('French Fries', 25)
            ]
        ),
        new Recipe('Second Recipe',
            'This is simply a test', 'https://tasteasianfood.com/wp-content/uploads/2015/10/beef-rendang-3a-600x300.jpg',
            [
                new Ingredient('Buns', 20),
                new Ingredient('Meat', 20)
            ])
    ]; */

    private recipes: Recipe[] = [];

    constructor(private shoppingListService: ShoppingListService) { }

    getRecipes() {
        return this.recipes.slice();
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.getRecipes());
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.getRecipes());
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.getRecipes());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.getRecipes());
    }
}
