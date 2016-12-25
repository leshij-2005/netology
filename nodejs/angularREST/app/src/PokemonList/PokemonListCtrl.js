'use strict';

pokemonApp.controller('PokemonListCtrl', function($scope, PokemonsService) {

    $scope.pokemons = PokemonsService.query();

});
