var app = angular.module('MiniCMS', ['ngRoute']);

app.run(function($rootScope, $http) {
    $rootScope.pagename = 'Mini-CMS';
    $rootScope.company = 'Bajai SZC Türr István Technikum';
    $rootScope.author = 'NSz';
    if (sessionStorage.getItem('uID')) {
        $rootScope.loggedIn = 1;
        $rootScope.userName = sessionStorage.getItem('uName');
        $rootScope.userMail = sessionStorage.getItem('uMail');
        $rootScope.userStatus = sessionStorage.getItem('uStatus');
        $http({
                method: "POST",
                url: "./API/getAllRecords.php",
                data: {
                    "table": "adminmenu"
                }
            })
            .then(function(response) {
                $rootScope.menuitems = response.data;
            });
    } else {
        $rootScope.loggedIn = 0;
    }
    $rootScope.menuitems = [];

    $rootScope.navitems = [];
    $http({
            method: "POST",
            url: "./API/getAllRecords.php",
            data: {
                'table': 'navitems'
            }
        })
        .then(function(response) {
            $rootScope.navitems = response.data;
        });

    $rootScope.carousels = [];
    $http({
            method: "POST",
            url: "./API/getAllRecords.php",
            data: {
                'table': 'carousels'
            }
        })
        .then(function(response) {
            $rootScope.carousels = response.data;
        });
});

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home.html',
            controller: 'homeCtrl',
        })
        .when('/reg', {
            templateUrl: 'registration.html',
            controller: 'regCtrl',
        })
        .when('/passmod', {
            templateUrl: 'passmod.html',
            controller: 'passmodCtrl',
        })
        .when('/profilmod', {
            templateUrl: 'profilmod.html',
            controller: 'profilmodCtrl',
        })
        .when('/users', {
            templateUrl: 'users.html',
            controller: 'usersCtrl',
        })
        .when('/navitems', {
            templateUrl: 'navitems.html',
            controller: 'navitemsCtrl',
        })
        .when('/newNavItem', {
            templateUrl: 'newnavitem.html',
            controller: 'navitemsCtrl',
        })
        .when('/contents', {

            templateUrl: 'contents.html',
            controller: 'contentsCtrl',
        })
        .when('/carousel', {
            templateUrl: 'carousels.html',
            controller: 'carouselsCtrl',
        })
        .when('/content/:contentID', {
            templateUrl: 'carousels.html',
            controller: 'carouselsCtrl',
        })
        .when('/editNavItem/:ID', {
            templateUrl: 'editNavItem.html',
            controller: 'navmodCtrl',
        })
});

app.controller('homeCtrl', function($scope) {

});

app.controller('regCtrl', function($scope, $http, $location) {

    $scope.userreg = function() {
        $scope.users = [];
        if ($scope.name == null || $scope.email == null || $scope.pass1 == null || $scope.pass2 == null) {
            alert("Nem adtál meg minden adatot!");
        } else {
            if ($scope.pass1 != $scope.pass2) {
                alert("A megadott jelszavak nem egyeznek!");
            } else {
                let pattern = /^[a-zA-Z0-9]{8,}$/;
                if (!$scope.pass1.match(pattern)) {
                    alert("A jelszó nem felel meg a minimális biztonsági kritériumoknak!");
                } else {
                    $http({
                            method: "POST",
                            url: "./API/getOneRecord.php",
                            data: {
                                'table': 'users',
                                'felt': 'email="' + $scope.email + '"'
                            }
                        })
                        .then(function(response) {
                            $scope.users = response.data;

                            if ($scope.users.length != 0) {
                                alert("Ez az e-mail cím már regisztrált!");
                            } else {
                                $http({
                                        method: "POST",
                                        url: "./API/insertRecord.php",
                                        data: {
                                            "table": "users",
                                            "values": {
                                                "name": "'" + $scope.name + "'",
                                                "email": "'" + $scope.email + "'",
                                                "passwd": "'" + CryptoJS.SHA1($scope.pass1) + "'",
                                                "reg": "CURRENT_TIMESTAMP",
                                                "last": "null",
                                                "rights": "'felhasználó'",
                                                "status": 1
                                            }
                                        }
                                    })
                                    .then(function(response) {
                                        alert(response.data.message);
                                        $scope.name = "";
                                        $scope.email = "";
                                        $scope.pass1 = "";
                                        $scope.pass2 = "";
                                        //   $location.path('#!/');
                                    });
                            }
                        });
                }
            }
        }
    }
});

app.controller('loginCtrl', function($scope, $http, $location, $rootScope) {

    $scope.login = function() {
        $scope.users = [];

        if ($scope.email == null || $scope.passwd == null) {
            alert('Nem adtad meg a belépési adatokat!');
        } else {
            $http({
                    method: "POST",
                    url: "./API/getOneRecord.php",
                    data: {
                        'table': 'users',
                        'felt': 'email="' + $scope.email + '" AND passwd="' + CryptoJS.SHA1($scope.passwd) + '"'
                    }
                })
                .then(function(response) {
                    $scope.users = response.data;
                    if ($scope.users.length == 0) {
                        alert('Hibás belépési adatok!');
                    } else {
                        if ($scope.users.status == 0) {
                            alert('Tiltott felhasználó!');
                        } else {
                            sessionStorage.setItem('uID', $scope.users.ID);
                            sessionStorage.setItem('uName', $scope.users.name);
                            sessionStorage.setItem('uMail', $scope.users.email);
                            sessionStorage.setItem('uStatus', $scope.users.status);
                            $rootScope.loggedIn = 1;
                            $rootScope.userName = $scope.users.name;
                            $rootScope.userMail = $scope.users.email;
                            $rootScope.userStatus = $scope.users.status;
                            $http({
                                    method: "POST",
                                    url: "./API/updateRecord.php",
                                    data: {
                                        "id": $scope.users.ID,
                                        "table": "users",
                                        "values": {
                                            "last": "CURRENT_TIMESTAMP"
                                        }
                                    }
                                })
                                .then(function(response) {
                                    $http({
                                            method: "POST",
                                            url: "./API/getAllRecords.php",
                                            data: {
                                                "table": "adminmenu"
                                            }
                                        })
                                        .then(function(response) {
                                            $rootScope.menuitems = response.data;
                                        });

                                    $location.path('#!/');
                                });
                        }
                    }
                });
        }
    }

    $scope.logout = function() {
        sessionStorage.removeItem('uID');
        sessionStorage.removeItem('uName');
        sessionStorage.removeItem('uMail');
        $rootScope.loggedIn = 0;
        $rootScope.userName = '';
        $rootScope.userMail = '';
        $location.path('#!/');
    }
});

app.controller('passmodCtrl', function($scope, $http, $rootScope) {

    $scope.passmod = function() {
        if ($scope.oldpass == null || $scope.newpass1 == null || $scope.newpass2 == null) {
            alert("Nem adtad meg az adatokat!");
        } else {
            if ($scope.newpass1 != $scope.newpass2) {
                alert("A megadott új jleszavak nem egyeznek!");
            } else {
                if ($scope.oldpass == $scope.newpass1) {
                    alert("Az új jelszó megegyezik a régivel!");
                } else {
                    let pattern = /^[a-zA-Z0-9]{8,}$/;
                    if (!$scope.newpass1.match(pattern)) {
                        alert("A jelszó nem felel meg a minimális biztonsági kritériumoknak!");
                    } else {
                        $http({
                                method: 'POST',
                                url: './API/getOneRecord.php',
                                data: {
                                    'table': 'users',
                                    'felt': 'email="' + $rootScope.userMail + '"'
                                }
                            })
                            .then(function(response) {
                                if (response.data.passwd != CryptoJS.SHA1($scope.oldpass)) {
                                    alert('Nem megfelelő a jelenlegi jelszó!');
                                } else {
                                    $http({
                                            method: 'POST',
                                            url: './API/updateRecord.php',
                                            data: {
                                                "id": response.data.ID,
                                                "table": "users",
                                                "values": {
                                                    "passwd": "'" + CryptoJS.SHA1($scope.newpass1) + "'"
                                                }
                                            }
                                        })
                                        .then(function(response) {
                                            alert(response.data.message);
                                        });
                                }
                            });
                    }
                }
            }
        }
    }

});

app.controller('profilmodCtrl', function($scope, $http, $rootScope) {
    $http({
            method: "POST",
            url: "./API/getOneRecord.php",
            data: {
                'table': 'users',
                'felt': 'email="' + $rootScope.userMail + '"'
            }
        })
        .then(function(response) {
            $scope.name = response.data.name;
            $scope.email = response.data.email;
            $scope.reg = response.data.reg;
            $scope.last = response.data.last;
            $scope.ID = response.data.ID;
        });

    $scope.profilmod = function() {
        if ($scope.name == null || $scope.email == null) {
            alert("Nem adtál meg minden adatot!");
        } else {
            $http({
                    method: "POST",
                    url: "./API/getOneRecord.php",
                    data: {
                        'table': 'users',
                        'felt': 'email="' + $scope.email + '" AND ID<>' + $scope.ID
                    }
                })
                .then(function(response) {
                    if (response.data != "") {
                        alert("Ez az e-mail cím már foglalt!");
                    } else {
                        $http({
                                method: "POST",
                                url: "./API/updateRecord.php",
                                data: {
                                    'table': 'users',
                                    'id': $scope.ID,
                                    'values': {
                                        'name': "'" + $scope.name + "'",
                                        'email': "'" + $scope.email + "'"
                                    }
                                }
                            })
                            .then(function(response) {
                                alert(response.data.message);
                                sessionStorage.setItem('uName', $scope.name);
                                sessionStorage.setItem('uMail', $scope.email);
                                $rootScope.userName = $scope.name;
                                $rootScope.userMail = $scope.email;
                            });
                    }
                });
        }

    }

});

app.controller('usersCtrl', function($scope, $http, $rootScope) {
    $scope.users = [];
    $http({
            method: "POST",
            url: "./API/getAllRecords.php",
            data: {
                'table': 'users'
            }
        })
        .then(function(response) {
            $scope.users = response.data;
        });

    $scope.switchstatus = function(id) {
        $http({
            method: "POST",
            url: "./API/updateRecord.php",
            data: {
                id: id,
                table: "users",
                values: {
                    status: "not status"
                }
            }
        });
    }
});

app.controller('navitemsCtrl', function($scope, $http, $rootScope, $location) {
    $scope.navitems = [];
    $http({
            method: "POST",
            url: "./API/getAllRecords.php",
            data: {
                'table': 'navitems'
            }
        })
        .then(function(response) {
            $scope.navitems = response.data;
        });

    $scope.switchstatus = function(id) {
        $http({
            method: "POST",
            url: "./API/updateRecord.php",
            data: {
                id: id,
                table: "navitems",
                values: {
                    status: "not status"
                }
            }
        });
        let index = $rootScope.navitems.findIndex(item => item.ID === id);
        $rootScope.navitems[index].status = !$rootScope.navitems[index].status;
    }

    $scope.addNavItem = function() {
        if ($scope.name == null || $scope.url == null) {
            alert("Nem adtál meg minden adtot!");
        } else {
            $http({
                    method: "POST",
                    url: "./API/insertRecord.php",
                    data: {
                        "table": "navitems",
                        "values": {
                            "name": "'" + $scope.name + "'",
                            "icon": "null",
                            "url": "'" + $scope.url + "'",
                            "status": 1
                        }
                    }
                })
                .then(function(response) {
                    alert(response.data.message);
                    $location.path('#!/navitems');
                });
        }
    }
    
    $scope.deleteNavItem = function(ID) {
        $http({
            method: "POST",
            url: "./API/deleteRecord.php",
            data: {
                "table": "navitems",
                "id": ID,
            }
        })
        .then(function(response) {
            let index = $scope.navitems.findIndex(item => item.ID === ID);
            $scope.navitems.splice(index, 1);
            alert(response.data.message);
        });
    }
});

app.controller('contentsCtrl', function($scope, $http, $rootScope) {
    $scope.contents = [];
    $http({
            method: "POST",
            url: "./API/getAllRecords.php",
            data: {
                'table': 'contents'
            }
        })
        .then(function(response) {
            $scope.contents = response.data;
        });
});

app.controller('carouselsCtrl', function($scope, $http, $rootScope) {
    $scope.carousels = [];
    $http({
            method: "POST",
            url: "./API/getAllRecords.php",
            data: {
                'table': 'carousels'
            }
        })
        .then(function(response) {
            $scope.carousels = response.data;
        });
});

app.controller('navmodCtrl', function($scope, $http, $rootScope, $location, $routeParams) {
    $http({
            method: "POST",
            url: "./API/getOneRecord.php",
            data: {
                "table": "navitems",
                "felt": "ID =" + $routeParams.ID
            }
        })
        .then(function(response) {
            console.log(response.data);
            $scope.name = response.data.name;
            $scope.url = response.data.url;
            $scope.ID = response.data.ID;
        });

    $scope.navitemMod = function() {

        $http({
            method: "POST",
            url: "./API/updateRecord.php",
            data: {
                "table": "navitems",
                "id": $scope.ID,
                "values": {
                    "name": "'" + $scope.name + "'",
                    "icon": "null",
                    "url": "'" + $scope.url + "'",
                    "status": 1
                }
            }
        })
        .then(function(response) {
            alert(response.data.message)
            $location.path('#!/navitems')
        });
    }
});
