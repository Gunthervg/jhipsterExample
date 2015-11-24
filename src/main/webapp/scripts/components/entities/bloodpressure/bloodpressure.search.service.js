'use strict';

angular.module('21pointsApp')
    .factory('BloodpressureSearch', function ($resource) {
        return $resource('api/_search/bloodpressures/:query', {}, {
            'query': {method: 'GET', isArray: true}
        });
    });
