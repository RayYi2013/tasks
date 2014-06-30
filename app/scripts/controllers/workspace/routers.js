/**
 * Created by ray on 2014-06-07.
 */

angular.module('tasksApp')
    .config(function ($stateProvider) {

        $stateProvider
            .state('workspace', {
                url: '/workspace',
//                abstract: true,
                templateUrl: 'partials/workspace.html',
                controller: 'WorkspaceCtrl',
                resolve: {
                    ProjectList: function(WorkspaceAPIResource) {
//                        var deferred = $q.defer();
//
//                        WorkspaceAPIResource.query(function(data) {
//                            console.log('resolve');
//                            deferred.resolve(data);
//                        }, function(err){
//                            console.log('reject');
//                            deferred.reject();
//                        });
//
//                        return deferred.promise;
//                        return WorkspaceAPIResource.query().$promise;
                        return {
                            "jcr:createdBy": "admin",
                            "email": "yisc@sohu.com",
                            "jcr:created": "Sat Jun 21 2014 15:52:25 GMT+0000",
                            "jcr:primaryType": "sling:Folder",
                            "Project_1": {
                                "type": "project",
                                "name": "Project 1",
                                "jcr:mixinTypes": ["mix:lockable"],
                                "jcr:createdBy": "admin",
                                "jcr:created": "Sat Jun 21 2014 20:21:52 GMT+0000",
                                "jcr:primaryType": "sling:Folder",
                                "DataSets": {
                                    "jcr:createdBy": "admin",
                                    "jcr:created": "Sun Jun 22 2014 04:18:48 GMT+0000",
                                    "jcr:primaryType": "sling:Folder",
                                    "type": "datesets",
                                    "name": "Date Sets",
                                    "dataset_1": {
                                        "type": "dateset",
                                        "name": "dataset 1",
                                        "jcr:createdBy": "admin",
                                        "jcr:created": "Sun Jun 22 2014 04:18:53 GMT+0000",
                                        "jcr:primaryType": "slingevent:Event"
                                    },
                                    "dataset_2": {
                                        "type": "dateset",
                                        "name": "dataset 2",
                                        "jcr:createdBy": "admin",
                                        "jcr:created": "Sun Jun 22 2014 04:18:53 GMT+0000",
                                        "jcr:primaryType": "slingevent:Event"
                                    }
                                },
                                "Models": {
                                    "jcr:createdBy": "admin",
                                    "jcr:created": "Sun Jun 22 2014 04:18:48 GMT+0000",
                                    "jcr:primaryType": "sling:Folder",
                                    "type": "models",
                                    "name": "Models",
                                    "model_1": {
                                        "type": "model",
                                        "name": "model 1",
                                        "jcr:createdBy": "admin",
                                        "jcr:created": "Sun Jun 22 2014 04:18:53 GMT+0000",
                                        "jcr:primaryType": "slingevent:Event",
                                        "boundary_conditions": {
                                            "type": "model property",
                                            "name": "Boundary Conditions",
                                            "jcr:createdBy": "admin",
                                            "jcr:created": "Sun Jun 22 2014 04:18:53 GMT+0000",
                                            "jcr:primaryType": "slingevent:Event"
                                        },
                                        "default_properties": {
                                            "type": "model property",
                                            "name": "Default Properties",
                                            "jcr:createdBy": "admin",
                                            "jcr:created": "Sun Jun 22 2014 04:18:53 GMT+0000",
                                            "jcr:primaryType": "slingevent:Event"
                                        },
                                        "property_zones": {
                                            "type": "model property",
                                            "name": "Property Zones",
                                            "jcr:createdBy": "admin",
                                            "jcr:created": "Sun Jun 22 2014 04:18:53 GMT+0000",
                                            "jcr:primaryType": "slingevent:Event"
                                        }
                                    },
                                    "model_2": {
                                        "type": "model",
                                        "name": "model 2",
                                        "jcr:createdBy": "admin",
                                        "jcr:created": "Sun Jun 22 2014 04:18:53 GMT+0000",
                                        "jcr:primaryType": "slingevent:Event"
                                    }
                                },
                                "Tools": {
                                    "type": "tools",
                                    "name": "Tools",
                                    "jcr:createdBy": "admin",
                                    "jcr:created": "Sun Jun 22 2014 04:19:01 GMT+0000",
                                    "jcr:primaryType": "slingevent:Event"
                                }
                            },
                            "Project_2": {
                                "type": "project",
                                "name": "Project 2",
                                "jcr:mixinTypes": ["mix:lockable"],
                                "jcr:createdBy": "admin",
                                "jcr:created": "Sat Jun 21 2014 20:21:52 GMT+0000",
                                "jcr:primaryType": "sling:Folder",
                                "DataSets": {
                                    "jcr:createdBy": "admin",
                                    "jcr:created": "Sun Jun 22 2014 04:18:48 GMT+0000",
                                    "jcr:primaryType": "sling:Folder",
                                    "type": "datesets",
                                    "name": "Date Sets",
                                    "dataset_1": {
                                        "type": "dateset",
                                        "name": "dataset 1",
                                        "jcr:createdBy": "admin",
                                        "jcr:created": "Sun Jun 22 2014 04:18:53 GMT+0000",
                                        "jcr:primaryType": "slingevent:Event"
                                    },
                                    "dataset_2": {
                                        "type": "dateset",
                                        "name": "dataset 2",
                                        "jcr:createdBy": "admin",
                                        "jcr:created": "Sun Jun 22 2014 04:18:53 GMT+0000",
                                        "jcr:primaryType": "slingevent:Event"
                                    }
                                },
                                "Models": {
                                    "jcr:createdBy": "admin",
                                    "jcr:created": "Sun Jun 22 2014 04:18:48 GMT+0000",
                                    "jcr:primaryType": "sling:Folder",
                                    "type": "models",
                                    "name": "Models",
                                    "model_1": {
                                        "type": "model",
                                        "name": "model 1",
                                        "jcr:createdBy": "admin",
                                        "jcr:created": "Sun Jun 22 2014 04:18:53 GMT+0000",
                                        "jcr:primaryType": "slingevent:Event",
                                        "boundary_conditions": {
                                            "type": "model property",
                                            "name": "Boundary Conditions",
                                            "jcr:createdBy": "admin",
                                            "jcr:created": "Sun Jun 22 2014 04:18:53 GMT+0000",
                                            "jcr:primaryType": "slingevent:Event"
                                        },
                                        "default_properties": {
                                            "type": "model property",
                                            "name": "Default Properties",
                                            "jcr:createdBy": "admin",
                                            "jcr:created": "Sun Jun 22 2014 04:18:53 GMT+0000",
                                            "jcr:primaryType": "slingevent:Event"
                                        },
                                        "property_zones": {
                                            "type": "model property",
                                            "name": "Property Zones",
                                            "jcr:createdBy": "admin",
                                            "jcr:created": "Sun Jun 22 2014 04:18:53 GMT+0000",
                                            "jcr:primaryType": "slingevent:Event"
                                        }
                                    },
                                    "model_2": {
                                        "type": "model",
                                        "name": "model 2",
                                        "jcr:createdBy": "admin",
                                        "jcr:created": "Sun Jun 22 2014 04:18:53 GMT+0000",
                                        "jcr:primaryType": "slingevent:Event"
                                    }
                                },
                                "Tools": {
                                    "type": "tools",
                                    "name": "Tools",
                                    "jcr:createdBy": "admin",
                                    "jcr:created": "Sun Jun 22 2014 04:19:01 GMT+0000",
                                    "jcr:primaryType": "slingevent:Event"
                                }
                            },
                            "Project_3": {
                                "type": "project",
                                "name": "Project 3",
                                "jcr:mixinTypes": ["mix:lockable"],
                                "jcr:createdBy": "admin",
                                "jcr:created": "Sat Jun 21 2014 20:21:52 GMT+0000",
                                "jcr:primaryType": "sling:Folder",
                                "DataSets": {
                                    "jcr:createdBy": "admin",
                                    "jcr:created": "Sun Jun 22 2014 04:18:48 GMT+0000",
                                    "jcr:primaryType": "sling:Folder",
                                    "type": "datesets",
                                    "name": "Date Sets",
                                    "dataset_1": {
                                        "type": "dateset",
                                        "name": "dataset 1",
                                        "jcr:createdBy": "admin",
                                        "jcr:created": "Sun Jun 22 2014 04:18:53 GMT+0000",
                                        "jcr:primaryType": "slingevent:Event"
                                    },
                                    "dataset_2": {
                                        "type": "dateset",
                                        "name": "dataset 2",
                                        "jcr:createdBy": "admin",
                                        "jcr:created": "Sun Jun 22 2014 04:18:53 GMT+0000",
                                        "jcr:primaryType": "slingevent:Event"
                                    }
                                },
                                "Models": {
                                    "jcr:createdBy": "admin",
                                    "jcr:created": "Sun Jun 22 2014 04:18:48 GMT+0000",
                                    "jcr:primaryType": "sling:Folder",
                                    "type": "models",
                                    "name": "Models",
                                    "model_1": {
                                        "type": "model",
                                        "name": "model 1",
                                        "jcr:createdBy": "admin",
                                        "jcr:created": "Sun Jun 22 2014 04:18:53 GMT+0000",
                                        "jcr:primaryType": "slingevent:Event",
                                        "boundary_conditions": {
                                            "type": "model property",
                                            "name": "Boundary Conditions",
                                            "jcr:createdBy": "admin",
                                            "jcr:created": "Sun Jun 22 2014 04:18:53 GMT+0000",
                                            "jcr:primaryType": "slingevent:Event"
                                        },
                                        "default_properties": {
                                            "type": "model property",
                                            "name": "Default Properties",
                                            "jcr:createdBy": "admin",
                                            "jcr:created": "Sun Jun 22 2014 04:18:53 GMT+0000",
                                            "jcr:primaryType": "slingevent:Event"
                                        },
                                        "property_zones": {
                                            "type": "model property",
                                            "name": "Property Zones",
                                            "jcr:createdBy": "admin",
                                            "jcr:created": "Sun Jun 22 2014 04:18:53 GMT+0000",
                                            "jcr:primaryType": "slingevent:Event"
                                        }
                                    },
                                    "model_2": {
                                        "type": "model",
                                        "name": "model 2",
                                        "jcr:createdBy": "admin",
                                        "jcr:created": "Sun Jun 22 2014 04:18:53 GMT+0000",
                                        "jcr:primaryType": "slingevent:Event"
                                    }
                                },
                                "Tools": {
                                    "type": "tools",
                                    "name": "Tools",
                                    "jcr:createdBy": "admin",
                                    "jcr:created": "Sun Jun 22 2014 04:19:01 GMT+0000",
                                    "jcr:primaryType": "slingevent:Event"
                                }
                            }
                        };
                    }
                },
                authenticate: true
            })
            .state('workspace.new', {
                url: '/new',
                templateUrl: 'partials/workspace/newProject.html',
                controller: 'WorkspaceNewProjectCtrl',
                onEnter: function(){
                    console.log("enter user");
                },
                authenticate: true
            })
            .state('workspace.project', {
                url: '/project/:name',
                templateUrl: 'partials/workspace/project.html',
                controller: 'WorkspaceProjectCtrl',
                onEnter: function(){
                    console.log("enter user");
                },
                authenticate: true
            });

    });
