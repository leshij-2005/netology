angular
    .module('PokemonApp')
    .factory('BerriesService', function($resource) {
        return $resource('http://api.backendless.com/v1/data/berries', {}, {
          query: {
            method: 'GET',
            isArray: true,
            transformResponse: function(responseData) {
                return angular.fromJson(responseData).data;
            }
          }
        })
      }
    );
