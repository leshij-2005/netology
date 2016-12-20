'use strict';

angular
    .module('myApp')
    .controller('PokemonListCtrl', function(PokemonService, ShoppingCartStore) {

        var vm = this;

        vm.myOrderProperty = 'weight';
        vm.myQuery = '';

        PokemonService.getPokemons().then(function(pokemonData) {
            console.log(pokemonData);
            vm.pokemons = pokemonData.data;
        });

        vm.addToCart = function(pokemon) {
            ShoppingCartStore.addItem(pokemon);
        };

    });
