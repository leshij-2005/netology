'use strict';

pokemonApp.controller('PokemonListCtrl', function($scope, $q, PokemonsService, BerriesService) {

    // PokemonsService.getPokemons().then(function(response) {
    //     $scope.pokemons = response.data.results;
    // });
    //
    // BerriesService.getBerries().then(function(response) {
    //     $scope.berries = response.data.results;
    // });

    $scope.state = 'processing';

    $q.all([PokemonsService.getPokemons()/*, BerriesService.getBerries()*/])
        .then(function([pokemons, berries]){
            $scope.pokemons = pokemons.data.data;
            //$scope.berries = berries.data.results;;

            $scope.state = 'ready';
        });



});
