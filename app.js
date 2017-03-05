var app = angular.module('todoApp', []);

//navbar controller
app.controller('NavbarController', function($scope) {

    $scope.title = "AngularJS Todo App";
});
//product controller 
app.controller('ProductController', function($scope) {

    $scope.add_product_title = "Add Product";
    $scope.add_feature_title = "Add Feature";
    //feature
    $scope.features = [
        { text: 'Feature One', done: false }
    ];

    $scope.products = [{
        text: 'Product One',
        done: false,
        features: [
            { text: $scope.features.text }
        ]
    }];

    //$scope.selectedFeatures = [];

    $scope.editIndex = false;
    // add product
    $scope.addProduct = function() {
            if ($scope.editIndex === false) {
                $scope.products.push({
                    text: $scope.productName,
                    done: false,
                    features: [{ text: $scope.selectedFeature.text }]
                });

            } else {
                $scope.products[$scope.editIndex].text = $scope.productName;
            }
            $scope.editIndex = false;
            // clear text field
            $scope.productName = '';
        }
        //edit
    $scope.editProduct = function(index) {
            $scope.productName = $scope.products[index].text;
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


    //add feature
    $scope.addFeature = function() {
        if ($scope.editIndex === false) {
            $scope.features.push({
                text: $scope.featureName,
                done: false
            });

        } else {
            $scope.features[$scope.editIndex].text = $scope.featureName;
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
            $scope.featureName = $scope.features[index].text;
            $scope.editIndex = index;
        }
        //delete
    $scope.deleteFeature = function(index) {
        $scope.features.splice(index, 1);
    }

});
// angular.module('todoApp', [])
//     .controller('TodoListController', function() {
//         var todoList = this;
//         todoList.todos = [
//             { text: 'learn AngularJS', done: true },
//             { text: 'build an AngularJS app', done: false }
//         ];


//         todoList.remaining = function() {
//             var count = 0;
//             angular.forEach(todoList.todos, function(todo) {
//                 count += todo.done ? 0 : 1;
//             });
//             return count;
//         };


//     });