'use strict';

angular.module('21pointsApp')
    .controller('BloodpressureController', function ($scope, $state, $modal, Bloodpressure, BloodpressureSearch, ParseLinks) {

        $scope.bloodpressures = [];
        $scope.page = 0;
        $scope.loadAll = function () {
            Bloodpressure.query({page: $scope.page, size: 20}, function (result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                for (var i = 0; i < result.length; i++) {
                    $scope.bloodpressures.push(result[i]);
                }
            });
        };
        $scope.reset = function () {
            $scope.page = 0;
            $scope.bloodpressures = [];
            $scope.loadAll();
        };
        $scope.loadPage = function (page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();


        $scope.search = function () {
            BloodpressureSearch.query({query: $scope.searchQuery}, function (result) {
                $scope.bloodpressures = result;
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
            $scope.bloodpressure = {
                timestamp: null,
                systolic: null,
                diastolic: null,
                id: null
            };
        };
    });
