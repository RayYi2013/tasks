/**
 * Created by ray on 2014-06-21.
 */


angular.module('tasksApp')
    .factory('AppHelpers', function ($rootScope) {



        function generateProjectTree(data){
            //data sample:
            //[{"name":"www","jcr:path":"/data/yisc_sohu_com/www","jcr:score":1000,"jcr:primaryType":"sling:Folder"},
            // {"name":"test1","jcr:path":"/data/yisc_sohu_com/www/test1","jcr:score":1000,"jcr:primaryType":"sling:Folder"},
            // {"name":"test2","jcr:path":"/data/yisc_sohu_com/www/test2","jcr:score":1000,"jcr:primaryType":"sling:Folder"},
            // {"name":"test4","jcr:path":"/data/yisc_sohu_com/www/test4","jcr:score":1000,"jcr:primaryType":"sling:Folder"},
            // {"name":"test5","jcr:path":"/data/yisc_sohu_com/www/test5","jcr:score":1000,"jcr:primaryType":"sling:Folder"}]
            //the root '/data/yisc_sohu_com' should be removed on server side.
            //tree structure sample:
            //[{label: 'Languages',
//                data: { title:'Hello'},
//            children: [{
//                label: 'English',
//                children: [ {label:'US'},'AU',{label:'CA'}]
//            }]
//        },
//        {label: 'Foods',
//            data: { title:'Food Hello'},
//            children: [{
//                label: 'China'
//            }]}];

            function indexOf(node,label) {
                var i=0, len=node.length;
                for (; i<len; i++) {
                    if (node[i].label === label) {
                        return i;
                    }
                }
                return -1;
            }

            function createNode(label,value,level,children){
                var node = {
                    label: label,
                    data:value
                };
                if(level===0){
                    node.data.type='project';
                }
                if(children){
                    node.children = children;
                }
                return node;
            }

            var tree = [];
            angular.forEach(data, function(value, key) {
                var pathList = value['jcr:path'].split('/'),
                    n , c,
                    i = 0, temp,
                    node = tree;
                pathList = pathList.filter(function(item){
                    return !!item;
                });
                n = pathList.length;
                for(i=0; i<n; i++){
                    c = indexOf(node,pathList[i]);
                    if(c>=0){ //find label
                        if(i===n-1){ //if reach last path, we set data, and without children
                            node[c] = createNode(pathList[i],value,i);
                        }
                        else{
                            if(!node[c].children){
                                node[c].children = [];
                            }
                            node = node[c].children;
                        }
                    }
                    else{
                        if(i===n-1){ //if reach last path, we set data, and without children
                            node.push(createNode(pathList[i],value,i));
                        }
                        else{  //if not in the last path, we add children node, and ref it for next name.
                            temp = [];
                            node.push(createNode(pathList[i],value,i,temp));
                            node = temp;
                        }
                    }

                }
            });
            console.dir(tree);
            return tree;
        }
        return {

            generateProjectTree: generateProjectTree
        };
    });