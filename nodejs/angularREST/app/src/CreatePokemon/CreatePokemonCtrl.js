'use strict';

pokemonApp.controller('CreatePokemonCtrl', function($scope, PokemonsService) {

    $scope.newPokemon = {};

    $scope.createPokemon = function(myPokemon) {

        var newPokemonInstance = new PokemonsService(myPokemon);
        newPokemonInstance.$save({}, function(successResult) {
            // Окей!
            $scope.newPokemon = {};

            $scope.newPokemonId = successResult.objectId;
            $scope.creationSuccess = true;
        }, function(errorResult) {
            // Не окей..
            $scope.creationSuccess = false;
        });

    }

});
