'use strict';

angular.module('21pointsApp').controller('PointsDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Points', 'User',
        function ($scope, $stateParams, $modalInstance, entity, Points, User) {

            $scope.points = entity;
            $scope.users = User.query();
            $scope.load = function (id) {
                Points.get({id: id}, function (result) {
                    $scope.points = result;
                });
            };

            var onSaveSuccess = function (result) {
                $scope.$emit('21pointsApp:pointsUpdate', result);
                $modalInstance.close(result);
                $scope.isSaving = false;
            };

            var onSaveError = function (result) {
                $scope.isSaving = false;
            };

            $scope.save = function () {
                $scope.isSaving = true;
                if ($scope.points.id != null) {
                    Points.update($scope.points, onSaveSuccess, onSaveError);
                } else {
                    Points.save($scope.points, onSaveSuccess, onSaveError);
                }
            };

            $scope.clear = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);
