'use strict';

angular.module('21pointsApp')
    .controller('BloodpressureDeleteController', function ($scope, $modalInstance, entity, Bloodpressure) {

        $scope.bloodpressure = entity;
        $scope.clear = function () {
            $modalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Bloodpressure.delete({id: id},
                function () {
                    $modalInstance.close(true);
                });
        };

    });