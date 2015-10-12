/**
 * Created by fperreault on 12/1/2014.
 */

var should = require('should');
var mailer = require('../src/index');

describe('configure method tests', function () {

    it('should configure the mailer with a wrong api key', function (done) {
        mailer.configure('Wrong api key', 'team@4each.ca', '4Each Solutions').then(function (result) {
            result.should.not.be.ok;
        }).fail(function (error) {
            error.should.be.ok;
            mailer.isReady().should.eql(false);
        }).done(function () {
            done();
        });
    });

    it('should configure the mailer with a test api key', function (done) {
        mailer.configure('4PJKNHkrBPKYq8Al10ka5A', 'team@4each.ca', '4Each Solutions').then(function (result) {
            mailer.isReady().should.eql(true);
        }).fail(function (error) {
            error.should.not.be.ok;
        }).done(function () {
            done();
        });
    });

});

describe('getTemplates method tests', function () {

    it('should get all the templates and print them in the console', function (done) {
        mailer.configure('4PJKNHkrBPKYq8Al10ka5A', 'team@4each.ca', '4Each Solutions').then(function (result) {
            mailer.getTemplateKeys().then(function (templateKeys) {
                console.log('\nAvailable template keys :');
                templateKeys.forEach(function (key, index) {
                    console.log((index + 1) + '. ' + key);
                });
            }).done(function () {
                done();
            });
        });
    });

});

describe('sendEmailsFromTemplate method tests', function () {

    it('should send emails from a template', function (done) {

        mailer.configure('4PJKNHkrBPKYq8Al10ka5A', 'team@4each.ca', '4Each Solutions').then(function (result) {

            var key = 'BEV-BienPréparéVotreEvénement-default-en';

            var content = [
                {
                    name: 'FallbackTickets',
                    content: '1'
                },
                {
                    name: 'PromoCode',
                    content: '8djJUF9444p'
                }
            ];

            var recipients = [
                {
                    email: 'team@4each.ca',
                    name: '4Each'
                }
            ];

            mailer.sendEmailsFromTemplate(key, content, recipients, 'Promotion Royale').then(function (results) {

                // Asserts that the results contains a truthy item
                results[0].should.be.ok;

                // Asserts that the message has been sent.
                results[0].status.should.eql('sent');

            }, function (error) {
                error.should.not.be.ok;
            }).done(function () {
                done();
            });
        });
    })
});

describe('CRUD methods test', function () {

    it('should add a template into mandrill account, ' +
    'verify that it was added correctly, ' +
    'update it,' +
    'verify that it was updated correctly,' +
    'delete it, ' +
    'and verify that it has been deleted', function (done) {

        mailer.configure('4PJKNHkrBPKYq8Al10ka5A', 'team@4each.ca', '4Each Solutions').then(function (result) {

            // Creates a unique name for the template
            var currentDate = new Date();
            var name = currentDate.getDate() + "/"
                + (currentDate.getMonth() + 1) + "/"
                + currentDate.getFullYear() + " @ "
                + currentDate.getHours() + ":"
                + currentDate.getMinutes() + ":"
                + currentDate.getSeconds();

            // Adds a template with a unique name
            mailer.addTemplate(name).then(function (result) {

                // Result should be truthy
                result.should.be.ok;

                // Gets the template from the server
                mailer.getTemplate(name).then(function (template) {

                    // Template should be truthy
                    template.should.be.ok;

                    // Template name should be the uploaded one
                    template.name.should.eql(name);

                    // Creates a template update
                    var update = {
                        from_email: 'team@4each.ca',
                        from_name: '4Each solutions',
                        subject: 'Mail module',
                        code: '<div>Template update html</div>',
                        text: 'Template update text',
                        labels: ['4each-templates']
                    };

                    // Updates the template
                    mailer.updateTemplate(name, update).then(function (result) {

                        // Result should be truthy
                        result.should.be.ok;

                        // Gets the updated template
                        mailer.getTemplate(name).then(function (template) {

                            // Result should be truthy
                            template.should.be.ok;

                            // Template should be the updated one now
                            template.name.should.eql(name);
                            template.from_email.should.eql('team@4each.ca');
                            template.from_name.should.eql('4Each solutions');
                            template.subject.should.eql('Mail module');
                            template.code.should.eql('<div>Template update html</div>');
                            template.text.should.eql('Template update text');
                            template.labels[0].should.eql('4each-templates');

                            // Deletes the template
                            mailer.deleteTemplate(name).then(function (result) {

                                // Result should be truthy
                                result.should.be.ok;

                                // Gets all the templates
                                mailer.listTemplates().then(function (templates) {

                                    // Templates should be truthy
                                    templates.should.be.ok;

                                    // Ensures that the template has been deleted
                                    var isTemplateListed = false;
                                    templates.forEach(function (template) {
                                        if (template.name == name) {
                                            isTemplateListed = true;
                                        }
                                    });

                                    // Asserts that the template is not listed anymore
                                    isTemplateListed.should.eql(false);
                                }, function (error) {
                                    console.log('Error listing the templates : ' + error);
                                    error.should.not.be.ok;
                                }).done(function () {
                                    // Terminates the test !
                                    done();
                                });
                            }, function (error) {
                                console.log('Error deleting the template : ' + error);
                                error.should.not.be.ok;
                            })
                        }, function (error) {
                            console.log('Error getting the updated template : ' + error);
                            error.should.not.be.ok;
                        })
                    }, function (error) {
                        console.log('Error updating the template : ' + error);
                        error.should.not.be.ok;
                    })
                }, function (error) {
                    console.log('Error getting the template : ' + error);
                    error.should.not.be.ok;
                })
            }, function (error) {
                console.log('Error adding the template : ' + error);
                error.should.not.be.ok;
            });
        });
    });

});
