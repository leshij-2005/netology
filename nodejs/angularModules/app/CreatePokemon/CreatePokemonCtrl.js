'use strict';

angular
    .module('myApp')
    .controller('CreatePokemonCtrl', function() {

    var vm = this;
    vm.newPokemon = {};
    vm.addPokemon = function(myPokemon) {
        console.log(myPokemon);
        vm.newPokemon = {};
        vm.pokemonForm.$setPristine();
    };

});
