/// <reference path="bower_components/ag-grid-enterprise/dist/ag-grid-enterprise.js" />
/// <reference path="bower_components/ag-grid-enterprise/dist/ag-grid-enterprise.js" />
/// <binding BeforeBuild='AllHcmsJsSourceMap' />
/// <reference path="C:\D\Eid\Eid Work\HCMS\HebsWeb\Scripts/ag-grid/ag-grid-enterprise.min.js" />
/// <reference path="C:\D\Eid\Eid Work\HCMS\HebsWeb\Scripts/ag-grid/ag-grid-enterprise.min.js" />
/// <binding AfterBuild='AllHcmsJsSourceMap' ProjectOpened='watch' />
/// <vs BeforeBuild='default' SolutionOpened='watch' />
var es = require('event-stream');
var gulp = require('gulp');
var concat = require('gulp-concat');
//var connect = require('gulp-connect');
var templateCache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var fs = require('fs');
var _ = require('lodash');

var ts = require('gulp-typescript');
//var merge = require('merge2');

var sourcemaps = require('gulp-sourcemaps');

var scripts = require('./app.scripts.json');

var allDts = {
    angular: 'Scripts/typings/jquery/jquery.d.ts',
    jquery: 'Scripts/typings/angularjs/angular.d.ts'
}

var source = {
    js: {
        main: 'app/main.js',
        src: [
            // application config
            'app.config.js',

            // application bootstrap file
            'app/main.js',

            // main module
            'app/app.js',

            // module files
            'app/**/module.js',

            // other js files [controllers, services, etc.]
            'app/**/!(module)*.js'
        ],
        tpl: 'app/**/*.tpl.html',

        hcms: [
             'app_hebs/hcms/module.ts',
           //'app_hebs/string.js',
           //'app_hcms/**/module.js',
           //'app_hebs/app.js',
           //'app_hebs/appConfig.js',
           //'app_hcms/**/!(module)*.js',
        ],

        agGrid: [
         'Scripts/ag-grid/ag-grid-enterprise.js'
         //'bower_components/ag-grid-enterprise/dist/ag-grid-enterprise.js'
        ],

        Authentication: [
           //allDts.angular,
           //allDts.jquery,
           'app_hebs/_common/authentication/**/module.ts',
           'app_hebs/_common/authentication/**/!(module)*.ts',
        ],

        validations: [
            //allDts.angular,
            //allDts.jquery,
            'app_hebs/_common/validation/**/module.ts',
            'app_hebs/_common/validation/**/!(module)*.ts',
        ],
        menus: [
             //allDts.angular,
             //allDts.jquery,
            'app_hebs/menus/**/module.ts',
            'app_hebs/menus/**/!(module)*.ts',
        ],
        controls: [
            // allDts.angular,
            //allDts.jquery,
            'app_hebs/_common/controls/**/module.ts',
            'app_hebs/_common/controls/**/!(module)*.ts',
        ],
        dataaccess: [
            //allDts.angular,
            //allDts.jquery,
            'app_hebs/dataAccess/**/module.ts',
            'app_hebs/dataAccess/**/!(module)*.ts',
        ],
        forms: [
            //allDts.angular,
            //allDts.jquery,
            'app_hebs/forms/**/module.ts',
            'app_hebs/forms/**/!(module)*.ts',
        ],

        hebs: [

            //allDts.angular,
            //allDts.jquery,


           'app_hebs/hcms/**/module.ts',
           'app_hebs/hcms/**/!(module)*.ts',



        ]

        , AllHcms: function () {
            return [
                 allDts.angular,
                 allDts.jquery
            ]
                 .concat(this.validations)
                 .concat(this.hcms)
                 .concat(this.dataaccess)
                 .concat(this.Authentication)
                 .concat(this.controls)
                 .concat(this.menus)
                 .concat(this.forms)
                 .concat(this.hebs);



        }

    }
};

var destinations = {
    js: 'build'
};


gulp.task('build', function () {
    return es.merge(gulp.src(source.js.src), getTemplateStream())
         .pipe(ngAnnotate())
         .pipe(uglify())
         .pipe(concat('app.js'))
        .pipe(gulp.dest(destinations.js));
});

gulp.task('agGrid', function () {
    return gulp.src(source.js.agGrid)
         .pipe(uglify())
         .pipe(concat('ag-grid.js'))
        .pipe(gulp.dest(destinations.js));
});

//gulp.task('hcmsbuild', function () {
//    return gulp.src(source.js.hcms)
//         .pipe(ngAnnotate())
//         .pipe(uglify())
//        .pipe(concat('hcms.js'))
//        .pipe(gulp.dest(destinations.js));
//});

gulp.task('js', function () {
    return es.merge(gulp.src(source.js.src), getTemplateStream())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(destinations.js));
});


// Don't Delete these commented functions its very important when you want to build every folder independant.

//gulp.task('hcmsjs', function () {
//    return gulp.src(source.js.hcms)
//        .pipe(concat('hcms.js'))
//        .pipe(gulp.dest(destinations.js));
//});

//gulp.task('validationsjs', function () {
//    //return gulp.src(source.js.validations)
//    //    .pipe(concat('validations.js'))
//    //    .pipe(gulp.dest(destinations.js));

//    return gulp.src(source.js.validations)
//      .pipe(ts({
//          outFile: 'validations.js',
//          declaration: true,
//          noResolve: true,
//          target: "es6"
//      }))
//      .pipe(gulp.dest(destinations.js));

//});

//gulp.task('dataaccessjs', function () {
//    return gulp.src(source.js.dataaccess)
//      .pipe(ts({
//          outFile: 'dataaccess.js',
//          // declaration: true,
//          noResolve: true,
//          target: "es6"
//      }))
//      .pipe(gulp.dest(destinations.js));
//});

//gulp.task('controlsjs', function () {
//    return gulp.src(source.js.controls)
//      .pipe(ts({
//          outFile: 'controls.js',
//          //declaration: true,
//          noResolve: true,
//          target: "es6"
//      }))
//      .pipe(gulp.dest(destinations.js));
//});

//gulp.task('menusjs', function () {

//    return gulp.src(source.js.menus)
//     .pipe(ts({
//         outFile: 'menus.js',
//         //declaration: true,
//         noResolve: true,
//         target: "es6"
//     }))
//     .pipe(gulp.dest(destinations.js));
//});

//gulp.task('formsjs', function () {

//    return gulp.src(source.js.forms)
//    .pipe(ts({
//        outFile: 'forms.js',
//        //declaration: true,
//        noResolve: true,
//        target: "es6"
//    }))
//    .pipe(gulp.dest(destinations.js));
//});

//gulp.task('hebsjs', function () {
//    return gulp.src(source.js.hebs)
//    .pipe(ts({
//        outFile: 'hebs.js'
//    }))
//    .pipe(gulp.dest(destinations.js));

//});


//gulp.task('AllHcmsJs', function () {
//    return gulp.src(source.js.AllHcms())
//    .pipe(ts({
//        outFile: 'allhcms.js',
//        //noResolve: true,
//        target: "es6",
//        allowJs: true
//    }))
//    .pipe(gulp.dest(destinations.js));

//});

gulp.task('AllHcmsJsSourceMap', function () {
    var tsResult = gulp.src(source.js.AllHcms())
        .pipe(sourcemaps.init()) // This means sourcemaps will be generated
        .pipe(ts({
            outFile: 'allhcms.js',
            //noResolve: true,
            target: "es6",
            allowJs: true
        }));

    return tsResult.js
        .pipe(sourcemaps.write()) // Now the sourcemaps are added to the .js file
        .pipe(gulp.dest(destinations.js));
});


gulp.task('watch', function () {
    gulp.watch(source.js.src, ['js']);
    //gulp.watch(source.js.hcms, ['hcmsjs']);
    //gulp.watch(source.js.hcms, ['validationsjs']);
    //gulp.watch(source.js.hcms, ['controlsjs']);
    //gulp.watch(source.js.hcms, ['menusjs']);
    //gulp.watch(source.js.hcms, ['dataaccessjs']);
    //gulp.watch(source.js.hcms, ['formsjs']);
    //gulp.watch(source.js.hcms, ['hebsjs']);
    gulp.watch(source.js.AllHcms, ['AllHcmsJsSourceMap']);
    gulp.watch(source.js.tpl, ['js']);
});

//gulp.task('connect', function() {     
//    connect.server({
//        port: 8888
//    });
//});

gulp.task('vendor', function () {
    _.forIn(scripts.chunks, function (chunkScripts, chunkName) {
        var paths = [];
        chunkScripts.forEach(function (script) {
            var scriptFileName = scripts.paths[script];

            if (!fs.existsSync(__dirname + '/' + scriptFileName)) {

                throw console.error('Required path doesn\'t exist: ' + __dirname + '/' + scriptFileName, script)
            }
            paths.push(scriptFileName);
        });
        gulp.src(paths)
            .pipe(concat(chunkName + '.js'))
            //.on('error', swallowError)
            .pipe(gulp.dest(destinations.js))
    })

});


gulp.task('prod', ['vendor', 'build', 'hcmsbuild']);
gulp.task('dev', ['vendor', 'js', 'AllHcmsJsSourceMap', 'watch']);
gulp.task('default', ['dev']);

var swallowError = function (error) {
    console.log(error.toString());
    this.emit('end')
};

var getTemplateStream = function () {
    return gulp.src(source.js.tpl)
        .pipe(templateCache({
            root: 'app/',
            module: 'app'
        }))
};