'use strict';

pokemonApp.controller('BerryListCtrl', function($scope, BerriesService) {

    PokemonsService.getBerries().then(function(response) {
        $scope.berries = response.data.results;
    });

});
