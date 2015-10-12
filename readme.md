
# Email Module for NodeJS

## General use

All functions exposed in the node module are using the Q deferring library internally. Since API calls to mandrill are asynchronous, exposing the module through the Q promises helps prevent "callback hell" by providing an easy to use Api which resemble try-catch-finally blocks but are asynchronous. Here is a usage example:
````javascript
functionUsingQ(...)
    .then(functionToDoOnSuccess)
    .fail(functionToDoOnError)
    .done(functionToDoAfterAllIsDone)
````

Q promises can also be chained:
````javascript
functionUsingQ(...)
    .then(otherFunctionUsingQ(...))
    .then(thirdFunctionUsingQ(...))
    .fail(...)
    .done(...)
````

`fail()` and `done()` functions are optional in the promise chain. 
Not using the `then()` function will cause an asynchronous fire and forget type of call if needed. Results from that function won't be available for further use.

More documentation and advanced usage of the Q library is available [here](http://documentup.com/kriskowal/q/).

## Functions
### configure(apiKey, fromEmail, fromName) : Q promise
This function must be called to initialize the mail module with basic information that will be used throughout the existance of the module. It returns a Q promise to allow an asynchronous behavior.

| Parameter | Type | Description |
|:--------- |:---- |:----------- |
| apiKey | string | Your valid mandrill api key. |
| fromEmail | string | The default email from which the email is sent. Overridden by the template value if provided. (Note: be careful to properly setup the sending domain in Mandrill, using a sending email not from an allowed sending domain may cause an account block.) |
| fromName | string | The default name from which the email is sent. Overridden by the template value if provided. |

Usage example:

````javascript
var mailer = require('studentsphere-emails');
mailer.configure('bEdBJ_h0lKTxEowA', 'bob@studentsphere.ca', 'Bob')
    .then(function (result) { })
    .fail(function (err) { })
  	.done(function() { });
````

### isReady() : bool
This function returns a boolean indicating whether the configure function has been called properly with valid data.

Usage example:

````javascript
var status = mailer.isReady();
````

### sendEmailsFromTemplate(templateKey, templateContent, emailRecipients, emailSubject) : Q promise
This function allows to send an email from a template to one or many recipients, replacing the provided content in the template.

| Parameter | Type | Description |
|:---------- |:---- |:----------- |
| templateKey | string | The key of the template. |
| templateContent | Array | An array of objects representing the information that will be substituted in the template. For more convenience, the contents 'Username' and 'Subject' are passed in by default into the template contents. They can be overriden by feeding them to the function. The the objects must have the structure shown in the usage example. |
| emailRecipients | Array | An array of objects representing the recipients of the email. The objects must have the structure shown in the usage example. |
| emailSubject | string | The subject of the email. |

Usage example:

````javascript
var templateKey = 'key';
var templateContent = [{name: 'PromoCode', content: 'JIsu888'}, ...]; // The innerHtml of the tag containing the attribute mc:edit="PromoCode" will be replaced by JISu888, regardless of the initial value.
var emailRecipients = [{email:'team@4each.ca', name:'4Each'}, ...]; // An email will be sent to all of the recipients contained in this array.
var emailSubject = 'subject';
mailer.sendEmailsFromTemplate(templateKey, templateContent, emailRecipients, emailSubject)
	.then(function(result) { })
    .fail(function(err) { })
    .done(function() { });
````

### getTemplate(templateName) : Q promise
| Parameter | Type | Description |
|:--------- |:---- |:----------- |
| templateName | string | The name of the template. |

Usage example:

````javascript
mailer.getTemplate('my_template')
    .then(function(template) { })
    .fail(function(err) { })
    .done(function() { });
````

### addTemplate(templateName, params) : Q promise
| Parameter | Type | Description |
|:--------- |:---- |:----------- |
| templateName | string | The name of the template. It must be unique. |
| params | object | This object can contain any of the following properties: - from_email (string) A default sending address for emails sent using this template. - from_name (string) A default from name to be used. - subject (string) A default subject line to be used. - code (string) The HTML code for the template with mc:edit attributes for the editable elements. - text (string) A default text part to be used when sending with this template. - labels (array) An optional array of up to 10 labels to use for filtering templates. |

Usage example:

````javascript
var params = {from_email: 'team@4each.ca', from_name: '4Each'};
mailer.addTemplate('templateName', params)
    .then(function(result) { })
    .fail(function(err) { })
    .done(function() { });
````

### deleteTemplate(templateName) : Q promise
| Parameter | Type | Description |
|:--------- |:---- |:----------- |
| templateName | string | The name of the template. |

Usage example:

````javascript
mailer.deleteTemplate('my_template')
    .then(function(template) { })
    .fail(function(err) { })
    .done(function() { });
````

### updateTemplate(templateName, params) : Q promise
| Parameter | Type | Description |
|:--------- |:---- |:----------- |
| templateName | string | The name of the template. It must be unique. |
| params | object | This object can contain any of the following properties: - from_email (string) A default sending address for emails sent using this template. - from_name (string) A default from name to be used. - subject (string) A default subject line to be used. - code (string) The HTML code for the template with mc:edit attributes for the editable elements. - text (string) A default text part to be used when sending with this template. - labels (array) An optional array of up to 10 labels to use for filtering templates. |

Usage example:

````javascript
var params = {from_email: 'team@4each.ca', from_name: '4Each', code:'<!-- Put some html code here! -->'};
mailer.updateTemplate('my_template', params)
    .then(function(template) { })
    .fail(function(err) { })
    .done(function() { });
````

### listTemplates() : Q promise
This function returns an array of the template objects contained in the associated mandrill account.

Usage example:

````javascript
mailer.listTemplate()
    .then(function(templates) { })
    .fail(function(err) { })
    .done(function() { });
````

### getTemplateKeys() : Q promise
This function returns an array of the template keys available in the associated mandrill account.

Usage example:

````javascript
mailer.getTemplateKeys()
    .then(function(templateKeys) { })
    .fail(function(err) { })
    .done(function() { });
````

## Running tests
The test framework uses mocha runner and the project contains a gulp task named "test" that will start the unit tests:
````bash
gulp test
````
