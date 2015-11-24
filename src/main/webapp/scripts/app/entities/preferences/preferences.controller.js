'use strict';

angular.module('21pointsApp')
    .controller('PreferencesController', function ($scope, $state, $modal, Preferences, PreferencesSearch, ParseLinks) {

        $scope.preferencess = [];
        $scope.page = 0;
        $scope.loadAll = function () {
            Preferences.query({page: $scope.page, size: 20}, function (result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                for (var i = 0; i < result.length; i++) {
                    $scope.preferencess.push(result[i]);
                }
            });
        };
        $scope.reset = function () {
            $scope.page = 0;
            $scope.preferencess = [];
            $scope.loadAll();
        };
        $scope.loadPage = function (page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();


        $scope.search = function () {
            PreferencesSearch.query({query: $scope.searchQuery}, function (result) {
                $scope.preferencess = result;
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
            $scope.preferences = {
                weekly_goal: null,
                weight_units: null,
                id: null
            };
        };
    });
