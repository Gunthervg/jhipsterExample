'use strict';

angular.module('21pointsApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('bloodpressure', {
                parent: 'entity',
                url: '/bloodpressures',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: '21pointsApp.bloodpressure.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/bloodpressure/bloodpressures.html',
                        controller: 'BloodpressureController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('bloodpressure');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('bloodpressure.detail', {
                parent: 'entity',
                url: '/bloodpressure/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: '21pointsApp.bloodpressure.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/bloodpressure/bloodpressure-detail.html',
                        controller: 'BloodpressureDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('bloodpressure');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Bloodpressure', function ($stateParams, Bloodpressure) {
                        return Bloodpressure.get({id: $stateParams.id});
                    }]
                }
            })
            .state('bloodpressure.new', {
                parent: 'bloodpressure',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/bloodpressure/bloodpressure-dialog.html',
                        controller: 'BloodpressureDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    timestamp: null,
                                    systolic: null,
                                    diastolic: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function (result) {
                        $state.go('bloodpressure', null, {reload: true});
                    }, function () {
                        $state.go('bloodpressure');
                    })
                }]
            })
            .state('bloodpressure.edit', {
                parent: 'bloodpressure',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/bloodpressure/bloodpressure-dialog.html',
                        controller: 'BloodpressureDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Bloodpressure', function (Bloodpressure) {
                                return Bloodpressure.get({id: $stateParams.id});
                            }]
                        }
                    }).result.then(function (result) {
                        $state.go('bloodpressure', null, {reload: true});
                    }, function () {
                        $state.go('^');
                    })
                }]
            })
            .state('bloodpressure.delete', {
                parent: 'bloodpressure',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/bloodpressure/bloodpressure-delete-dialog.html',
                        controller: 'BloodpressureDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Bloodpressure', function (Bloodpressure) {
                                return Bloodpressure.get({id: $stateParams.id});
                            }]
                        }
                    }).result.then(function (result) {
                        $state.go('bloodpressure', null, {reload: true});
                    }, function () {
                        $state.go('^');
                    })
                }]
            });
    });
