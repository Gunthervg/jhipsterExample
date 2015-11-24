'use strict';

angular.module('21pointsApp')
    .controller('WeightController', function ($scope, $state, $modal, Weight, WeightSearch, ParseLinks) {

        $scope.weights = [];
        $scope.page = 0;
        $scope.loadAll = function () {
            Weight.query({page: $scope.page, size: 20}, function (result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                for (var i = 0; i < result.length; i++) {
                    $scope.weights.push(result[i]);
                }
            });
        };
        $scope.reset = function () {
            $scope.page = 0;
            $scope.weights = [];
            $scope.loadAll();
        };
        $scope.loadPage = function (page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();


        $scope.search = function () {
            WeightSearch.query({query: $scope.searchQuery}, function (result) {
                $scope.weights = result;
            }, function (response) {
                if (response.status === 404) {
                    $scope.loadAll();
                }
            });
        };

        $scope.refresh = function () {
            $scope.reset();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.weight = {
                timestamp: null,
                weight: null,
                id: null
            };
        };
    });
