'use strict';

angular.module('21pointsApp').controller('PreferencesDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Preferences',
        function ($scope, $stateParams, $modalInstance, entity, Preferences) {

            $scope.preferences = entity;
            $scope.load = function (id) {
                Preferences.get({id: id}, function (result) {
                    $scope.preferences = result;
                });
            };

            var onSaveSuccess = function (result) {
                $scope.$emit('21pointsApp:preferencesUpdate', result);
                $modalInstance.close(result);
                $scope.isSaving = false;
            };

            var onSaveError = function (result) {
                $scope.isSaving = false;
            };

            $scope.save = function () {
                $scope.isSaving = true;
                if ($scope.preferences.id != null) {
                    Preferences.update($scope.preferences, onSaveSuccess, onSaveError);
                } else {
                    Preferences.save($scope.preferences, onSaveSuccess, onSaveError);
                }
            };

            $scope.clear = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);
