(function(angular) {
    var app = angular.module("todos.controller", []);
    app.controller("todosController", ['$scope', '$location', function($scope, $location) {
        // 功能1，显示数据列表
        var task = [
            { id: 1, name: "吃饭", completed: true },
            { id: 2, name: "睡觉", completed: true },
            { id: 3, name: "打豆豆", completed: false },
            { id: 4, name: "吃水果", completed: true },
            { id: 5, name: "啊啊啊啊", completed: false },
        ]
        $scope.tasks = task;
        // 功能2
        //暴露数据模型
        $scope.newtask = "";
        $scope.add = function() {
                if (!$scope.newtask) {
                    return; //如果为空，直接跳出
                }
                var id;
                if (!$scope.tasks) {
                    id = 1;
                } else {
                    id = $scope.tasks[$scope.tasks.length - 1].id + 1;
                }

                $scope.tasks.push({ id: id, name: $scope.newtask, completed: true }) //这里id写成
                $scope.newtask = "";
            }
            //第三个功能 删除任务
        $scope.remove = function(id) {
                for (var i = 0; i < $scope.tasks.length; i++) {
                    var item = $scope.tasks[i];
                    if (item.id = id) {
                        $scope.tasks.splice(i, 1);
                        return;
                    }
                }
            }
            //功能4，修改任务
            //暴露数据模型
        $scope.isEditingId = -1;
        $scope.edit = function(id) {
            $scope.isEditingId = id;
        }
        $scope.save = function() {
                //让d等式不成立就可以了，等于li没有edting属性
                $scope.isEditingId = -1;
            }
            // 功能5，点击选框，切换任务是否完成的状态
            //不需要写任何js代码
        $scope.isSelected = false;
        $scope.toggleAll = function() {
                for (var i = 0; i < $scope.tasks.length; i++) {
                    var item = $scope.tasks[i];
                    item.completed = $scope.isSelected;
                }
            }
            // 功能6 点击全部清除
            //方法1
            // $scope.clearCompleted = function() {
            //     for (var i = 0; i < $scope.tasks.length; i++) {
            //         var item = $scope.tasks[i];
            //         if (item.completed) {
            //             $scope.tasks.splice(i, 1);
            //             i--; //这里解决了lenght动态改变后无法遍历最后一项的 问题
            //         }
            //     }
            // }
            //将未完成的任务加入到新数组中
            //方法2
        $scope.clearCompleted = function() {
                var temp = [];
                for (var i = 0; i < $scope.tasks.length; i++) {
                    var item = $scope.tasks[i];
                    if (!item.completed) {
                        temp.push(item);
                    }
                }
                $scope.tasks = temp;
            }
            // 功能6.1
        $scope.isShow = function() {
                var temp = [];
                for (var i = 0; i < $scope.tasks.length; i++) {
                    var item = $scope.tasks[i];
                    if (item.completed) { //只要有已完成，就返回true 否则返回false
                        return true;
                    }
                }
                return false;
            }
            // 功能7,显示未完成数目
            // $scope.uncompleted = function() {
            //         var count = 0;
            //         for (var i = 0; i < $scope.tasks.length; i++) {
            //             var item = $scope.tasks[i];
            //             if (item.completed) { //只要有已完成，就返回true 否则返回false
            //                 count++;
            //             }
            //         }
            //         return count;
            //     }
            // 方法二，第三个参数表示深度监听，可以用来监听数组和对象，表示会监听每一个元素的每一个属性
        $scope.$watch("tasks", function() {
                var count = 0;
                for (var i = 0; i < $scope.tasks.length; i++) {
                    var item = $scope.tasks[i];
                    if (!item.completed) { //只要有已完成，就返回true 否则返回false
                        count++;
                    }
                }
                $scope.count = count;
            }, true)
            // 功能9 切换不同状态任务的显示
            // 暴露数据
        $scope.isCompleted = {};
        // $scope.active = function() {
        //     $scope.isCompleted = { completed: false };
        // }
        // $scope.completed = function() {
        //     $scope.isCompleted = { completed: true };
        // }
        // $scope.all = function() {
        //     $scope.isCompleted = {};
        // }
        // var hash = $location.url();
        $scope.location = $location; //angular只能监视数据模型，手动给scope自定义一个数据模型
        $scope.$watch("location.url()", function(nowVlalue, oldValue) {
            switch (nowVlalue) {
                case "/active":
                    $scope.isCompleted = { completed: false }
                    break;
                case "/completed":
                    $scope.isCompleted = { completed: true }
                    break;
                case "/all":
                    $scope.isCompleted = { completed: undefined }
                    break;
            }
        })
        $scope.$watch("tasks", function() {
            console.log("task发生改变了了");
            localStorage.setItem("tasks", JSON.stringify($scope.tasks));
        }, true)
    }])
})(angular)