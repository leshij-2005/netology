'use strict';

angular
    .module('myApp')
    .component('shoppingCartComponent', {
        templateUrl: 'ShoppingCartComponent/ShoppingCartComponent.html',
        controller: function(ShoppingCartStore) {
            this.cartItems = ShoppingCartStore.getItems();

            this.removeFromCart = function(pokemonId) {
                ShoppingCartStore.removeItem(pokemonId);
            };
        }
    })