'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .filter('filterByType', () => {
        return (items, type) => {
            return type ? items.filter((item) => item.type.indexOf(type) != -1) : items;
        };
    })

    .controller('View1Ctrl', function ($scope) {
        $scope.pokemons = [{
            "abilities": [
                "Overgrow"
            ],
            "detailPageURL": "/us/pokedex/bulbasaur",
            "weight": 15.2,
            "weakness": [
                "Fire",
                "Flying",
                "Ice",
                "Psychic"
            ],
            "height": 28,
            "collectibles_slug": "bulbasaur",
            "featured": "true",
            "id": "1",
            "name": "Bulbasaur",
            "ThumbnailAltText": "Bulbasaur",
            "ThumbnailImage": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
            "slug": "bulbasaur",
            "type": [
                "grass",
                "poison"
            ]
        }, {
            "abilities": [
                "Blaze"
            ],
            "detailPageURL": "/us/pokedex/charmander",
            "weight": 18.7,
            "weakness": [
                "Ground",
                "Rock",
                "Water"
            ],
            "height": 24,
            "collectibles_slug": "charmander",
            "featured": "true",
            "id": "4",
            "name": "Charmander",
            "ThumbnailAltText": "Charmander",
            "ThumbnailImage": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png",
            "slug": "charmander",
            "type": [
                "fire"
            ]
        }, {
            "abilities": [
                "Torrent"
            ],
            "detailPageURL": "/us/pokedex/squirtle",
            "weight": 19.8,
            "weakness": [
                "Electric",
                "Grass"
            ],
            "height": 20,
            "collectibles_slug": "squirtle",
            "featured": "true",
            "id": "7",
            "name": "Squirtle",
            "ThumbnailAltText": "Squirtle",
            "ThumbnailImage": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png",
            "slug": "squirtle",
            "type": [
                "water"
            ]
        }, {
            "abilities": [
                "Static"
            ],
            "detailPageURL": "/us/pokedex/pikachu",
            "weight": 13.2,
            "weakness": [
                "Ground"
            ],
            "height": 16,
            "collectibles_slug": "pikachu",
            "featured": "true",
            "id": "025",
            "name": "Pikachu",
            "ThumbnailAltText": "Pikachu",
            "ThumbnailImage": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png",
            "slug": "pikachu",
            "type": [
                "electric"
            ]
        }, {
            "abilities": [
                "Adaptability",
                "Run Away"
            ],
            "detailPageURL": "/us/pokedex/eevee",
            "weight": 14.3,
            "weakness": [
                "Fighting"
            ],
            "height": 12,
            "collectibles_slug": "eevee",
            "featured": "true",
            "id": "133",
            "name": "Eevee",
            "ThumbnailAltText": "Eevee",
            "ThumbnailImage": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/133.png",
            "slug": "eevee",
            "type": [
                "normal"
            ]
        }];

        $scope.myOrderProperty = 'id';

        $scope.alert = (message) => {
            window.alert(message);
        };

        $scope.getColorByType = (types) => {
            const color = {
                water: 'blue',
                fire: 'red',
                grass: 'green'
            };

            for (var c in color) {
                if (types.indexOf(c) != -1)
                    return color[c];
            }
        }
    });