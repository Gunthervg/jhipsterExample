'use strict';

angular.module('21pointsApp').controller('BloodpressureDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Bloodpressure', 'User',
        function ($scope, $stateParams, $modalInstance, entity, Bloodpressure, User) {

            $scope.bloodpressure = entity;
            $scope.users = User.query();
            $scope.load = function (id) {
                Bloodpressure.get({id: id}, function (result) {
                    $scope.bloodpressure = result;
                });
            };

            var onSaveSuccess = function (result) {
                $scope.$emit('21pointsApp:bloodpressureUpdate', result);
                $modalInstance.close(result);
                $scope.isSaving = false;
            };

            var onSaveError = function (result) {
                $scope.isSaving = false;
            };

            $scope.save = function () {
                $scope.isSaving = true;
                if ($scope.bloodpressure.id != null) {
                    Bloodpressure.update($scope.bloodpressure, onSaveSuccess, onSaveError);
                } else {
                    Bloodpressure.save($scope.bloodpressure, onSaveSuccess, onSaveError);
                }
            };

            $scope.clear = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);
