var app = angular.module('todoApp', []);
//service
app.service('dataService', ['$http', function($http) {

    this.getProducts = function() {
        return $http.get("data/mock-data.json");
    }

}]);
//navbar controller
app.controller('NavbarController', ['$scope', 'dataService', '$rootScope', function($scope, dataService, $rootScope) {

    $scope.title = "AngularJS Todo App";
    $scope.loadProducts = function() {
        $rootScope.$emit("testingScope", {});
        $(".load-data-btn").hide();
    }

}]);
//filter

//product controller 
app.controller('ProductController', ['$scope', 'dataService', '$rootScope', function($scope, dataService, $rootScope) {

    $scope.label = {
        add_product_title: "Add Product",
        add_feature_title: "Add Feature",
        product_name_lbl: "Product Name",
        feature_list_lbl: "Feature List",
        feature_name_lbl: "Feature Name",
        product_info_title: "Product Information",
        feature_list_title: "Features List",
        remove_btn_product: "Remove Selected Products",
        remove_btn_feature: "Remove Selected Features"
    }

    $('#addFeatureWindow').hide();
    $scope.addFeatureWindow = function() {
        $('#addFeatureWindow').show();
    }

    //feature
    $scope.features = [
        { text: $scope.featureName || 'Initial Feature Name' }
    ];
    $scope.products = [{
        text: $scope.productName || 'Initial Product Name',
        done: false,
        features: [
            { text: $scope.selectedFeature || $scope.features[0].text }
        ]
    }];
    $scope.selectedFeature = '';
    $scope.editIndex = false;
    var isDuplicate = false;
    //rootScope
    $rootScope.$on("testingScope", function() {
        $scope.getProductsList();
    });
    //http
    $scope.getProductsList = function() {
        dataService.getProducts()
            .then(function(response) {
                //console.log(response);
                $scope.result = response.data;
                angular.forEach($scope.result, function(product, key) {
                    angular.forEach(product.features, function(feature, key) {
                        $scope.products.push({
                            text: product.text,
                            done: product.done,
                            features: [{ text: feature.text }]
                        });
                        //features
                        $scope.features.push({
                            text: feature.text,
                            done: product.done,
                        })
                    })
                })
            }, function(error) {
                //console.log(error.message);
            })
    }

    // add product
    $scope.addProduct = function(index) {
        //$scope.addFeatureBtn();
        if ($scope.editIndex === false) {
            if ($scope.selectedFeature !== '' && $scope.productName !== '') {
                $scope.products.push({
                    text: $scope.productName,
                    done: false,
                    features: [{ text: $scope.selectedFeature.text }]
                });
                $scope.productName = '';
            }

        } else {
            $scope.products[$scope.editIndex].text = $scope.productName;
            $scope.products[$scope.editIndex].features[0] = $scope.selectedFeature;
        }
        $scope.productName = '';
        $scope.editIndex = false;

    }

    //edit
    $scope.editProduct = function(index) {
        $scope.productName = $scope.products[index].text;
        $scope.selectedFeature = ($scope.products[index].features.length !== 0) ? $scope.products[index].features[0].text : "";

        $scope.editIndex = index;
    }

    //delete
    $scope.deleteProduct = function(index) {
        $scope.products.splice(index, 1);
    }

    // clear selected items
    $scope.clearProduct = function() {
        var storedProducts = $scope.products;
        $scope.products = [];
        angular.forEach(storedProducts, function(product) {
            if (!product.done) {
                $scope.products.push(product);
            }
        });
        $scope.toggleSelectionProducts = "Select All";
        $scope.isAllSelectedProducts = false;
        if ($scope.products.length === 0 && $scope.features.length === 0) {
            $(".load-data-btn").show();
        }

    }

    //count
    $scope.totalProductCount = function() {
        var count = 0;
        angular.forEach($scope.products, function(feature) {
            count += feature.done ? 0 : 1;
        });
        return count;
    }

    //select all checkbox
    $scope.toggleSelectionProducts = "Select All";
    $scope.toggleSelectionFeature = "Select All";
    $scope.toggleSelectProduct = function() {
        angular.forEach($scope.products, function(product) {
            product.done = $scope.isAllSelectedProducts;
        });

        ($scope.toggleSelectionProducts === "Deselect All") ? $scope.toggleSelectionProducts = "Select All": $scope.toggleSelectionProducts = "Deselect All";
    }

    $scope.toggleSelectFeature = function() {
        angular.forEach($scope.features, function(feature) {
            feature.done = $scope.isAllSelectedFeature;
        });

        ($scope.toggleSelectionFeature === "Deselect All") ? $scope.toggleSelectionFeature = "Select All": $scope.toggleSelectionFeature = "Deselect All";
    }

    //add feature
    $scope.addFeature = function() {
        // $scope.addFeatureBtn();
        if ($scope.editIndex === false || $scope.features.length === 0) {
            $scope.features.push({
                text: $scope.featureName,
                done: false
            });

        } else {
            $scope.features[$scope.editIndex].text = $scope.featureName;
            $scope.products[$scope.editIndex].features[0].text = $scope.featureName;
        }
        $scope.editIndex = false;
        // clear field
        $scope.featureName = '';
    }

    // clear selected items
    $scope.clearFeature = function() {
        var storedFeatures = $scope.features;
        $scope.features = [];

        angular.forEach(storedFeatures, function(feature) {
            if (!feature.done) {
                $scope.features.push(feature);
            }
        });

        $scope.toggleSelectionFeature = "Select All";
        $scope.isAllSelectedFeature = false;

        if ($scope.products.length === 0 && $scope.features.length === 0) {
            $(".load-data-btn").show();
        }

    }

    //edit
    $scope.editFeature = function(index) {
        $scope.addFeatureWindow();
        $scope.featureName = $scope.features[index].text;
        $scope.editIndex = index;
    }

    //delete
    $scope.deleteFeature = function(index) {
        $scope.delateFeatureInProduct(index);
        $scope.features.splice(index, 1);
    }

    //feature delete under product
    $scope.delateFeatureInProduct = function(index) {
        var storedProductFeatures = $scope.products;
        angular.forEach(storedProductFeatures, function(i) {
            angular.forEach(i.features, function(feature) {
                if (feature.text === $scope.features[index].text) {
                    i.features.splice(0, 1);
                }
            })
        });
    }

    //count
    $scope.totalFeatureCount = function() {
        var count = 0;
        angular.forEach($scope.features, function(feature) {
            count += feature.done ? 0 : 1;
        });
        return count;
    }

}]);