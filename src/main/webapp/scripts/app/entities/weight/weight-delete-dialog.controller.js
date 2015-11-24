'use strict';

angular.module('21pointsApp')
    .controller('WeightDeleteController', function ($scope, $modalInstance, entity, Weight) {

        $scope.weight = entity;
        $scope.clear = function () {
            $modalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Weight.delete({id: id},
                function () {
                    $modalInstance.close(true);
                });
        };

    });