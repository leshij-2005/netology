'use strict';

pokemonApp.controller('BerryListCtrl', function($scope, BerriesService) {

  $scope.berries = BerriesService.query();
});
