module.exports = function (grunt) {
    // Define a zip task
    grunt.initConfig({
        compress: {
            authContact: {
                options: {
                    archive: 'restApi2/authentication/contact/index.zip',
                    level: 9
                },
                files: [
                    {cwd: 'restApi2/', src: ['node_modules/**'], dest: '/', expand: true}, // includes files in path and its subdirs
                    {src: ['config/**'], dest: '/', expand: true}, // includes files in path and its subdirs
                    {cwd: 'restApi2/authentication/contact/', src: ['lib/**'], dest: '/', expand: true}, // includes files in path and its subdirs
                    {cwd: 'restApi2/authentication/contact/', src: ['index.js'], dest: '/', expand: true} // includes files in path and its subdirs
                ]
            },
            authSignup: {
                options: {
                    archive: 'restApi2/authentication/signup/index.zip',
                    level: 9
                },
                files: [
                    {cwd: 'restApi2/', src: ['node_modules/**'], dest: '/', expand: true}, // includes files in path and its subdirs
                    {src: ['config/**'], dest: '/', expand: true}, // includes files in path and its subdirs
                    {cwd: 'restApi2/authentication/signup/', src: ['lib/**'], dest: '/', expand: true}, // includes files in path and its subdirs
                    {cwd: 'restApi2/authentication/signup/', src: ['index.js'], dest: '/', expand: true} // includes files in path and its subdirs
                ]
            },
            categoriesAll: {
                options: {
                    archive: 'restApi2/categories/all/index.zip',
                    level: 9
                },
                files: [
                    {cwd: 'restApi2/', src: ['node_modules/**'], dest: '/', expand: true}, // includes files in path and its subdirs
                    {src: ['config/**'], dest: '/', expand: true}, // includes files in path and its subdirs
                    {cwd: 'restApi2/categories/all/', src: ['lib/**'], dest: '/', expand: true}, // includes files in path and its subdirs
                    {cwd: 'restApi2/categories/all/', src: ['index.js'], dest: '/', expand: true} // includes files in path and its subdirs
                ]
            },
            categoriesShow: {
                options: {
                    archive: 'restApi2/categories/show/index.zip',
                    level: 9
                },
                files: [
                    {cwd: 'restApi2/', src: ['node_modules/**'], dest: '/', expand: true}, // includes files in path and its subdirs
                    {src: ['config/**'], dest: '/', expand: true}, // includes files in path and its subdirs
                    {cwd: 'restApi2/categories/show/', src: ['lib/**'], dest: '/', expand: true}, // includes files in path and its subdirs
                    {cwd: 'restApi2/categories/show/', src: ['index.js'], dest: '/', expand: true} // includes files in path and its subdirs
                ]
            },
            classificationsSearch: {
                options: {
                    archive: 'restApi2/classifications/search/index.zip',
                    level: 9
                },
                files: [
                    {cwd: 'restApi2/', src: ['node_modules/**'], dest: '/', expand: true}, // includes files in path and its subdirs
                    {src: ['config/**'], dest: '/', expand: true}, // includes files in path and its subdirs
                    {cwd: 'restApi2/classifications/search/', src: ['lib/**'], dest: '/', expand: true}, // includes files in path and its subdirs
                    {cwd: 'restApi2/classifications/search/', src: ['index.js'], dest: '/', expand: true} // includes files in path and its subdirs
                ]
            },
            companyDetails: {
                options: {
                    archive: 'restApi2/company/details/index.zip',
                    level: 9
                },
                files: [
                    {cwd: 'restApi2/', src: ['node_modules/**'], dest: '/', expand: true}, // includes files in path and its subdirs
                    {src: ['config/**'], dest: '/', expand: true}, // includes files in path and its subdirs
                    {cwd: 'restApi2/company/details/', src: ['lib/**'], dest: '/', expand: true}, // includes files in path and its subdirs
                    {cwd: 'restApi2/company/details/', src: ['index.js'], dest: '/', expand: true} // includes files in path and its subdirs
                ]
            },
            companySave: {
                options: {
                    archive: 'restApi2/company/save/index.zip',
                    level: 9
                },
                files: [
                    {cwd: 'restApi2/', src: ['node_modules/**'], dest: '/', expand: true}, // includes files in path and its subdirs
                    {src: ['config/**'], dest: '/', expand: true}, // includes files in path and its subdirs
                    {cwd: 'restApi2/company/save/', src: ['lib/**'], dest: '/', expand: true}, // includes files in path and its subdirs
                    {cwd: 'restApi2/company/save/', src: ['index.js'], dest: '/', expand: true} // includes files in path and its subdirs
                ]
            },
            companySearch: {
                options: {
                    archive: 'restApi2/company/search/index.zip',
                    level: 9
                },
                files: [
                    {cwd: 'restApi2/', src: ['node_modules/**'], dest: '/', expand: true}, // includes files in path and its subdirs
                    {src: ['config/**'], dest: '/', expand: true}, // includes files in path and its subdirs
                    {cwd: 'restApi2/company/search/', src: ['lib/**'], dest: '/', expand: true}, // includes files in path and its subdirs
                    {cwd: 'restApi2/company/search/', src: ['index.js'], dest: '/', expand: true} // includes files in path and its subdirs
                ]
            },
            dcSummaries: {
                options: {
                    archive: 'restApi2/datacoverage/summaries/index.zip',
                    level: 9
                },
                files: [
                    // {cwd: 'restApi2/', src: ['node_modules/**'], dest: '/', expand: true}, // includes files in path and its subdirs
                    {src: ['config/**'], dest: '/', expand: true}, // includes files in path and its subdirs
                    {cwd: 'restApi2/datacoverage/summaries/', src: ['lib/**'], dest: '/', expand: true}, // includes files in path and its subdirs
                    {cwd: 'restApi2/datacoverage/summaries/', src: ['index.js'], dest: '/', expand: true} // includes files in path and its subdirs
                ]
            },
            domainTechnologies: {
                options: {
                    archive: 'restApi2/domain/technologies/index.zip',
                    level: 9
                },
                files: [
                    {cwd: 'restApi2/', src: ['node_modules/**'], dest: '/', expand: true}, // includes files in path and its subdirs
                    {src: ['config/**'], dest: '/', expand: true}, // includes files in path and its subdirs
                    {cwd: 'restApi2/domain/technologies/', src: ['lib/**'], dest: '/', expand: true}, // includes files in path and its subdirs
                    {cwd: 'restApi2/domain/technologies/', src: ['index.js'], dest: '/', expand: true} // includes files in path and its subdirs
                ]
            },
            geocodeDistance: {
                options: {
                    archive: 'restApi2/geocode/distance/index.zip',
                    level: 9
                },
                files: [
                    {cwd: 'restApi2/', src: ['node_modules/**'], dest: '/', expand: true}, // includes files in path and its subdirs
                    {src: ['config/**'], dest: '/', expand: true}, // includes files in path and its subdirs
                    {cwd: 'restApi2/geocode/distance/', src: ['lib/**'], dest: '/', expand: true}, // includes files in path and its subdirs
                    {cwd: 'restApi2/geocode/distance/', src: ['index.js'], dest: '/', expand: true} // includes files in path and its subdirs
                ]
            },
            keywordsSearch: {
                options: {
                    archive: 'restApi2/keywords/search/index.zip',
                    level: 9
                },
                files: [
                    {cwd: 'restApi2/', src: ['node_modules/**'], dest: '/', expand: true}, // includes files in path and its subdirs
                    {src: ['config/**'], dest: '/', expand: true}, // includes files in path and its subdirs
                    {cwd: 'restApi2/keywords/search/', src: ['lib/**'], dest: '/', expand: true}, // includes files in path and its subdirs
                    {cwd: 'restApi2/keywords/search/', src: ['index.js'], dest: '/', expand: true} // includes files in path and its subdirs
                ]
            },
            uniquify: {
                options: {
                    archive: 'restApi2/uniquify/companies/index.zip',
                    level: 9
                },
                files: [
                    {cwd: 'restApi2/', src: ['node_modules/**'], dest: '/', expand: true}, // includes files in path and its subdirs
                    {src: ['config/**'], dest: '/', expand: true}, // includes files in path and its subdirs
                    {cwd: 'restApi2/uniquify/companies/', src: ['lib/**'], dest: '/', expand: true}, // includes files in path and its subdirs
                    {cwd: 'restApi2/uniquify/companies/', src: ['index.js'], dest: '/', expand: true} // includes files in path and its subdirs
                ]
            }
        }
    });

    // Load in `grunt-zip`
    grunt.loadNpmTasks('grunt-contrib-compress');
};