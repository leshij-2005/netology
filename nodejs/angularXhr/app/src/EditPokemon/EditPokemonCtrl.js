'use strict';

pokemonApp.controller('EditPokemonCtrl', function($scope, $routeParams, PokemonsService) {

    $scope.updateSuccess = false;

    PokemonsService.getPokemon($routeParams['pokemonId']).then(function(response) {
      $scope.pokemon = response.data;
    });

    $scope.editPokemon = function({name, weight}) {
        $scope.state = 'processing';

        PokemonsService.editPokemon($scope.pokemon.objectId, { name, weight }).then(function(response) {
          $scope.state = 'ready';
          $scope.updateSuccess = true;
        });

    }

});
