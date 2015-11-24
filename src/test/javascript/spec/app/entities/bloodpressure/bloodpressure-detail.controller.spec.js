'use strict';

describe('Bloodpressure Detail Controller', function () {
    var $scope, $rootScope;
    var MockEntity, MockBloodpressure, MockUser;
    var createController;

    beforeEach(inject(function ($injector) {
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        MockEntity = jasmine.createSpy('MockEntity');
        MockBloodpressure = jasmine.createSpy('MockBloodpressure');
        MockUser = jasmine.createSpy('MockUser');


        var locals = {
            '$scope': $scope,
            '$rootScope': $rootScope,
            'entity': MockEntity,
            'Bloodpressure': MockBloodpressure,
            'User': MockUser
        };
        createController = function () {
            $injector.get('$controller')("BloodpressureDetailController", locals);
        };
    }));


    describe('Root Scope Listening', function () {
        it('Unregisters root scope listener upon scope destruction', function () {
            var eventType = '21pointsApp:bloodpressureUpdate';

            createController();
            expect($rootScope.$$listenerCount[eventType]).toEqual(1);

            $scope.$destroy();
            expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
        });
    });
});
