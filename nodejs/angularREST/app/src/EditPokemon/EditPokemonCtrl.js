'use strict';

pokemonApp.controller('EditPokemonCtrl', function($scope, PokemonsService, $routeParams) {

    $scope.pokemon = PokemonsService.get({
        pokemonId: $routeParams['pokemonId']
    });

    $scope.updatePokemon = function() {

        $scope.pokemon.$update({}, function(successResult) {
            // Окей!
            $scope.updateSuccess = true;
        }, function(errorResult) {
            // Не окей..
            $scope.updateSuccess = false;
        });

    }

});
