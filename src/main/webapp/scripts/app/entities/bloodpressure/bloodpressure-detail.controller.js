'use strict';

angular.module('21pointsApp')
    .controller('BloodpressureDetailController', function ($scope, $rootScope, $stateParams, entity, Bloodpressure, User) {
        $scope.bloodpressure = entity;
        $scope.load = function (id) {
            Bloodpressure.get({id: id}, function (result) {
                $scope.bloodpressure = result;
            });
        };
        var unsubscribe = $rootScope.$on('21pointsApp:bloodpressureUpdate', function (event, result) {
            $scope.bloodpressure = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
