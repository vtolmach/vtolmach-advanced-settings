Package.describe({
    summary: "Provide advanced (logging, default values, generating file) functionality for meteor settings",
    version: "1.0.0",
    name: "vtolmach:advanced-settings",
    documentation: 'README.md',
    git: 'https://github.com/vtolmach/vtolmach-advanced-settings.git'
});


Package.onUse(function (api) {
    api.versionsFrom('1.1.0.2');
    api.use('underscore');
    api.addFiles('src/advanced-settings.js');
    api.addFiles('src/advanced-settings-server.js', 'server');
    api.export('AdvSettings');
});

Package.onTest(function(api) {
    api.use('underscore');
    api.use('tinytest');
    api.addFiles('src/advanced-settings.js');
    api.addFiles('src/advanced-settings-tests.js');
    api.addFiles('src/advanced-settings-server.js', 'server');
});


