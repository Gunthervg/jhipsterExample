'use strict';

angular.module('21pointsApp')
    .controller('PointsController', function ($scope, $state, $modal, Points, PointsSearch, ParseLinks) {

        $scope.pointss = [];
        $scope.page = 0;
        $scope.loadAll = function () {
            Points.query({page: $scope.page, size: 20}, function (result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                for (var i = 0; i < result.length; i++) {
                    $scope.pointss.push(result[i]);
                }
            });
        };
        $scope.reset = function () {
            $scope.page = 0;
            $scope.pointss = [];
            $scope.loadAll();
        };
        $scope.loadPage = function (page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();


        $scope.search = function () {
            PointsSearch.query({query: $scope.searchQuery}, function (result) {
                $scope.pointss = result;
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
            $scope.points = {
                date: null,
                exercise: null,
                meals: null,
                alcohol: null,
                notes: null,
                id: null
            };
        };
    });
