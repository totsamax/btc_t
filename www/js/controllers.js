app.controller('MainCtrl',
    function (
        $scope,
        $http,
        $ionicModal,
        $ionicPopup,
        $localStorage
    ) {
        var makeRequest = function (type, params, callback) {
            $http.get('http://api.bishkektaxi.org/' + type, {
                    params: params
                })
                .success(function (response) {
                    if (callback) {
                        callback(response);
                    }
                });
        };
        var canselOrder = function () {

        };
        $ionicModal.fromTemplateUrl('pages/order.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.myModal = modal;
        });
        $scope.$on('modal.hidden', function () {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function () {
            // Execute action
        });
        $scope.showModal = function () {
            makeRequest(
                "SetTaxiOrderState", {
                    method: "create",
                    from: $scope.from,
                    where: $scope.where,
                    time: "",
                    feed_asap: true,
                    user_phonenumber: +111
                },
                function (result) {
                    $localStorage.lastOrderId = result.Id;
                    console.info("Ура! Работает!");
                }
            );
            $scope.myModal.show();
        };
        $scope.hideModal = function () {
            $scope.myModal.hide();
        };



    });

app.controller('Check', ['$scope', '$localStorage', '$http', '$state', '$rootScope', function ($scope, $localStorage, $http, $state, $rootScope) {
    $scope.tempPhone = "+996";
    $scope.codeStatus = '';
    $scope.disabled = '';
    $scope.hide = false;
    $scope.getRandomSpan = function () {
        return Math.floor((Math.random() * 10000) - 1);
    };
    $scope.sendSMS = function (tempPhone) {
        console.log(tempPhone);
        $scope.tempPhone = tempPhone;
        $scope.code = $scope.getRandomSpan();
        $http({
            method: 'GET',
            url: 'https://smsc.ru/sys/send.php',
            params: {
                login: "totsamax",
                psw: "955d427c32d5709e2574efffd5148985",
                phones: tempPhone,
                mes: $scope.code
            }
        }).success(function (data) {
            $scope.disabled = 'disabled';
            $scope.codeStatus = "На ваш номер отправлен код, для продолжения введите код в поле ниже";
        }).error(function (data) {
            $scope.disabled = 'disabled';
            $scope.codeStatus = "На ваш номер отправлен код, для продолжения введите код в поле ниже";
        });
    };
    $scope.chekCode = function (userCode) {
        if (userCode === $scope.code) {
            $scope.phone = $scope.tempPhone;
            $localStorage.phone = $scope.phone;
            $rootScope.hideTabs = false;
            $state.go('page');
        } else {
            $scope.disabled = undefined;
            $scope.hide = false;
            $scope.codeStatus = 'Вы ввели неверный код, попробуйте еще раз';
        }
    };
    }]);