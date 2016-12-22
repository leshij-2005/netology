'use strict';

pokemonApp.controller('PokemonRealtimeCtrl', function($scope, mySocket, $routeParams) {

    $scope.username = $routeParams.userName;
    $scope.messages = [];

    mySocket.on('chatMessage', function(data) {
        $scope.messages.push(data);
    });

    $scope.MySocket = mySocket;

    $scope.submit = function(new_message) {

        if (!new_message) {
            return;
        }

        mySocket.emit('chatMessage', {
            username: $scope.username,
            content: new_message
        });

        $scope.new_message = '';
    };

});
