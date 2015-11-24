'use strict';

angular.module('21pointsApp')
    .controller('PreferencesDeleteController', function ($scope, $modalInstance, entity, Preferences) {

        $scope.preferences = entity;
        $scope.clear = function () {
            $modalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Preferences.delete({id: id},
                function () {
                    $modalInstance.close(true);
                });
        };

    });