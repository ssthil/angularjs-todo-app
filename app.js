var app = angular.module('todoApp', []);

//navbar controller
app.controller('NavbarController', function($scope) {

    $scope.title = "AngularJS Todo App";
});
//filter

//product controller 
app.controller('ProductController', function($scope) {

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
        $scope.selectedFeature = $scope.products[index].features[0].text;
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
    }

    //count
    $scope.totalProductCount = function() {
        var count = 0;
        angular.forEach($scope.products, function(feature) {
            count += feature.done ? 0 : 1;
        });
        return count;
    }

    //add feature
    $scope.addFeature = function() {
        // $scope.addFeatureBtn();
        if ($scope.editIndex === false) {
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


});