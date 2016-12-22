'use strict';

pokemonApp.controller('CreatePokemonCtrl', function($scope, PokemonsService) {

    $scope.newPokemon = {};

    $scope.createPokemon = function(myPokemon) {

        $scope.creationSuccess = false;

        PokemonsService.createPokemon(myPokemon).then(function(response) {

            $scope.newPokemon = {};

            $scope.newPokemonId = response.data.objectId;
            $scope.creationSuccess = true;

        });

    }

});
