/**
 * Created by ray on 2014-06-21.
 */


describe('AppHelpers', function () {

  // load the controller's module
//  beforeEach(module('tasksApp'));

    var AppHelpers;
    beforeEach(function () {

        module('tasksApp');
    });

    beforeEach(function () {

        inject(function (_AppHelpers_) {
            AppHelpers = _AppHelpers_;
        });

    });

    describe('method generateProjectTree',function() {
        it('should create tree from project list', function () {
            var data = [{"name":"www","jcr:path":"/www","jcr:score":1000,"jcr:primaryType":"sling:Folder"},
            {"name":"test1","jcr:path":"/www/test1","jcr:score":1000,"jcr:primaryType":"sling:Folder"},
            {"name":"test2","jcr:path":"/www/test2","jcr:score":1000,"jcr:primaryType":"sling:Folder"},
            {"name":"test4","jcr:path":"/www/test4","jcr:score":1000,"jcr:primaryType":"sling:Folder"},
                {"name":"test3","jcr:path":"/www/test4/test3","jcr:score":1000,"jcr:primaryType":"sling:Folder"},
            {"name":"test5","jcr:path":"/www/test5","jcr:score":1000,"jcr:primaryType":"sling:Folder"}];

            var res = AppHelpers.generateProjectTree(data);

            //verify results
            expect(res.length).toBe(1);
        });
    });


});
