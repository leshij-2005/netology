'use strict';

angular
    .module('myApp')
    .controller('PokemonDetailCtrl', function($state, $stateParams, PokemonService) {

        var vm = this;

        vm.format = 'M/d/yy h:mm:ss a';

        PokemonService.getPokemon($stateParams.pokemonId)
            .then(function(pokemonData) {
                vm.pokemon = pokemonData.data;
            });

        vm.renameItem = function(value){
            return new Promise(function(resolve, reject){
                vm.pokemon.name = value;

                resolve(vm.pokemon.name);
            });
        };

        vm.toggleRename = function() {
            vm.rename = false;
        }

    }).component('pokemonDetail', {
        //components match only elements
        template: '<p>Вес: {{$ctrl.pokemon.weight}}, рост: {{$ctrl.pokemon.height}}</p>',
        controller: function() {},
        bindings: {
            pokemon: '='
        }
    })
    .directive('myCurrentTime', ['$interval', 'dateFilter', function($interval, dateFilter) {

        function link(scope, element, attrs) {
            var format,
                timeoutId;


            function updateTime() {
                element.text(dateFilter(new Date(), format));
            }

            scope.$watch(attrs.myCurrentTime, function(value) {
                format = value;
                updateTime();
            });

            element.on('$destroy', function() {
                $interval.cancel(timeoutId);
            });

            // start the UI update process; save the timeoutId for canceling
            timeoutId = $interval(function() {
                updateTime(); // update DOM
            }, 1000);
        }

        return {
            restrict: 'A',
            link: link
        };
    }])
    .directive('ndInlineEdit', function($compile, $templateRequest) {

        'use strict';

        /*
         * This directive should be used on an element wrapping the original element that you want to replace
         * with an input field. The directive is made to have as small a footprint as possible to be able to use
         * it in longer lists.
         * The directive will not apply more scope watchers until the trigger expression evaluates to true.
         */

        return {
            restrict: 'A',
            scope: {
                ndModel: '=', // The string model to edit
                ndTrigger: '=', // The property to watch to decide when to trigger the input field.
                ndSaveFn: '=', // The ctrl function to call to save the update. Expects a promise to be returned.
                ndCancel: '=', // Function to call when cancel is clicked. Can be toggle function as it won't pass anything
                ndValidationConfig: '=?' //Object containing settings for validation config
            },
            link: function(scope, element) {

                var originalValue = angular.copy(scope.ndModel);
                var originalContent;
                var initialized = false;
                var childScope;
                var editValue = '';

                function getInnerElement() {
                    return angular.element(element.children()[0]);
                }

                function cancel() {
                    if (initialized) {
                        editValue = '';
                        getInnerElement().replaceWith($compile(originalContent)(scope.$parent));
                        scope.ndCancel();
                        initialized = false;
                        childScope.$destroy();
                    }
                }

                function save(form) {

                    if (originalValue === form.input.$viewValue) {
                        cancel();
                        return;
                    }

                    if (form.$valid) {
                        scope.ndSaveFn(childScope.editValue).then(function() {
                            cancel();
                        });
                    }

                }

                function initInput() {

                    originalValue = angular.copy(scope.ndModel);
                    $templateRequest('components/nd-inline-edit.html').then(function(template) {
                        editValue = originalValue;
                        childScope = scope.$new();
                        angular.extend(childScope, {
                            save: save,
                            cancel: cancel,
                            editValue: editValue
                        });

                        originalContent = getInnerElement().replaceWith($compile(template)(childScope));
                        initialized = true;

                        childScope.edit.$setPristine();
                    });
                }

                var triggerListener = scope.$watch('ndTrigger', function() {
                    if (scope.ndTrigger) {
                        initInput();
                    } else {
                        cancel();
                    }
                });

                scope.$on('$destroy', function() {
                    triggerListener();
                });
            }
        };
    });