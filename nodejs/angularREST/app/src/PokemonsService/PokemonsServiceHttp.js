angular
    .module('PokemonApp')
    .factory('PokemonsService', function($http) {

            return {

                getPokemons: function() {
                    return $http.get('http://pokeapi.co/api/v2/pokemon/?limit=10');
                },

                getPokemon: function(pokemonId) {
                    return $http.get('http://pokeapi.co/api/v2/pokemon/' + pokemonId);
                },

                createPokemon: function(pokemonData) {
                    return $http({
                        method: 'POST',
                        url: 'https://api.backendless.com/v1/data/pokemon',
                        headers: {
                            "application-id": "4B730C92-F81E-236B-FFF0-6651FE882800",
                            "secret-key": "CB6DE86C-6069-86C4-FF1C-9049D5AC9400"

                        },
                        data: pokemonData
                    });
                },

                deletePokemon: function(pokemonId) {
                    return $http({
                        method: 'DELETE',
                        url: 'https://api.backendless.com/v1/data/pokemon/' + pokemonId,
                        headers: {
                            "application-id": "4B730C92-F81E-236B-FFF0-6651FE882800",
                            "secret-key": "CB6DE86C-6069-86C4-FF1C-9049D5AC9400"

                        }
                    });
                }

            }

        }

    );
