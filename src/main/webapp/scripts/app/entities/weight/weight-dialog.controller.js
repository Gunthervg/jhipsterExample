'use strict';

angular.module('21pointsApp').controller('WeightDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Weight', 'User',
        function ($scope, $stateParams, $modalInstance, entity, Weight, User) {

            $scope.weight = entity;
            $scope.users = User.query();
            $scope.load = function (id) {
                Weight.get({id: id}, function (result) {
                    $scope.weight = result;
                });
            };

            var onSaveSuccess = function (result) {
                $scope.$emit('21pointsApp:weightUpdate', result);
                $modalInstance.close(result);
                $scope.isSaving = false;
            };

            var onSaveError = function (result) {
                $scope.isSaving = false;
            };

            $scope.save = function () {
                $scope.isSaving = true;
                if ($scope.weight.id != null) {
                    Weight.update($scope.weight, onSaveSuccess, onSaveError);
                } else {
                    Weight.save($scope.weight, onSaveSuccess, onSaveError);
                }
            };

            $scope.clear = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);
