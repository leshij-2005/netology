angular
    .module('PokemonApp')
    .factory('PokemonsService', function($resource, $http) {

        return $resource('https://api.backendless.com/v1/data/pokemon/:pokemonId/', {
            pokemonId: '@pokemonId'
        }, {
            query: {
                method: 'GET',
                isArray: true,
                transformResponse: function(responseData) {
                    return angular.fromJson(responseData).data;
                }
            },
            update: {
                method: 'PUT'
            }
        })
    });
