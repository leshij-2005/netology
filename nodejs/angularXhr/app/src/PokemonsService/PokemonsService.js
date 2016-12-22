angular
    .module('PokemonApp')
    .factory('PokemonsService', function($http) {

            $http.defaults.headers.common = {
                'application-id': 'C01F972D-7700-493A-FF45-9452A01F4100',
                'secret-key': 'EE9BB6C8-EDA9-1410-FF8E-6EBAC140FD00'
            };

            return {

                getPokemons: function() {
                    return $http.get('http://api.backendless.com/v1/data/pokemon');
                },

                getPokemon: function(pokemonId) {
                    return $http.get('http://api.backendless.com/v1/data/pokemon/' + pokemonId);
                },

                createPokemon: function(pokemonData) {
                    return $http({
                        method: 'POST',
                        url: 'http://api.backendless.com/v1/data/pokemon',
                        data: pokemonData
                    });
                },

                deletePokemon: function(pokemonId) {
                    return $http({
                        method: 'DELETE',
                        url: 'http://api.backendless.com/v1/data/pokemon/' + pokemonId
                    });
                },

                editPokemon: function(id, data) {
                    return $http({
                        method: 'PUT',
                        url: 'http://api.backendless.com/v1/data/pokemon/' + id,
                        data
                    });
                }

            }

        }

    );
