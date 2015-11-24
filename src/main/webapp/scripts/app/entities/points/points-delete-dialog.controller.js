'use strict';

angular.module('21pointsApp')
    .controller('PointsDeleteController', function ($scope, $modalInstance, entity, Points) {

        $scope.points = entity;
        $scope.clear = function () {
            $modalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Points.delete({id: id},
                function () {
                    $modalInstance.close(true);
                });
        };

    });