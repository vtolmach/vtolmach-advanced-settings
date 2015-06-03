AdvSettings.verbose = false;

Tinytest.add('AdvSettings.get - get setting', function (test) {

    Meteor.settings = Meteor.settings || {};

    Meteor.settings.data = {
        user : {
            key : 'test'
        }
    };

    if(Meteor.isServer) {
        test.equal(AdvSettings.get('data.user.key'), 'test');
    }


});

Tinytest.add('AdvSettings.get - don`t have access on client', function (test) {

    Meteor.settings = Meteor.settings || {};

    Meteor.settings.data = {
        user : {
            key : 'test'
        }
    };

    if(Meteor.isClient) {
        test.equal(AdvSettings.get('data.user.key', '1'), '1');

        test.equal(AdvSettings.get('data.user.key'), null);
    }


});

Tinytest.add('AdvSettings.get - check default settings', function (test) {

    Meteor.settings = Meteor.settings || {};

    Meteor.settings.test = {
        data : null
    };

    if(Meteor.isServer) {
        test.equal(AdvSettings.get('data.test', '1'), '1');

        test.equal(AdvSettings.get('data.test'), null);
    }

});

Tinytest.add('AdvSettings.get - current value null', function (test) {

    Meteor.settings = Meteor.settings || {};

    Meteor.settings.data = {
        test : null
    };

    if(Meteor.isServer) {
        test.equal(AdvSettings.get('data.test', '1'), null);
    }

});

Tinytest.add('AdvSettings.get - settings is undefined', function (test) {

    Meteor.settings = undefined;

    if(Meteor.isServer) {
        test.equal(AdvSettings.get('data.test', '1'), '1');

        test.equal(AdvSettings.get('data.test'), null);
    }

});

Tinytest.add('AdvSettings.get - empty context', function (test) {

    Meteor.settings = Meteor.settings || {};

    Meteor.settings.data = {
        test : null
    };

    if(Meteor.isServer) {
        test.equal(AdvSettings.get('', '1'), '1');

        test.equal(AdvSettings.get(), null);
    }

});


Tinytest.add('AdvSettings.get - fake context', function (test) {

    Meteor.settings = Meteor.settings || {};

    Meteor.settings.data = {
        test : null
    };

    if(Meteor.isServer) {
        test.equal(AdvSettings.get('!@#$%^&*()...#%$^', '1'), '1');

        test.equal(AdvSettings.get('!@#$%^&*()...#%$^', null), null);
    }

});

Tinytest.add('AdvSettings.getPublic - get public setting', function (test) {

    Meteor.settings = Meteor.settings || {};

    Meteor.settings.public = {
        data : {
            user : {
                key : 'test'
            }
        }
    };

    test.equal(AdvSettings.getPublic('data.user.key'), 'test');

});


Tinytest.add('AdvSettings.getPublic - check default settings', function (test) {

    Meteor.settings = Meteor.settings || {};

    Meteor.settings.public = {
        data : {
            user : {
                key : 'test'
            }
        }
    };

    test.equal(AdvSettings.getPublic('data.user.key.test', '1'), '1');

    test.equal(AdvSettings.getPublic('data.user.key.test'), null);

});

Tinytest.add('AdvSettings.getPublic - current value null', function (test) {

    Meteor.settings = Meteor.settings || {};

    Meteor.settings.public = {
        data : {
            test : null
        }
    };


    test.equal(AdvSettings.getPublic('data.test', '1'), null);


});


Tinytest.add('AdvSettings.getPublic - empty context', function (test) {

    Meteor.settings = Meteor.settings || {};

    Meteor.settings.public = {
        data : {
            test : null
        }
    };

    test.equal(AdvSettings.getPublic('', '1'), '1');

    test.equal(AdvSettings.getPublic(), null);

});

Tinytest.add('AdvSettings.getPublic - fake context', function (test) {

    Meteor.settings = Meteor.settings || {};

    Meteor.settings.public = {
        data : {
            test : null
        }
    };

    test.equal(AdvSettings.getPublic('!@#$%^&*()...#%$^', '1'), '1');

    test.equal(AdvSettings.getPublic('!@#$%^&*()...#%$^'), null);

});

Tinytest.add('AdvSettings.getPublic - settings is undefined', function (test) {

    Meteor.settings = undefined;

    test.equal(AdvSettings.getPublic('data.test'), null);

    Meteor.settings =  {
        public: undefined
    };

    test.equal(AdvSettings.getPublic('data.test', '1'), '1');

    test.equal(AdvSettings.getPublic('data.test'), null);

});


Tinytest.add('AdvSettings.makeSettingsFile - making file from default', function (test) {

    if(Meteor.isServer) {
        var fs = Npm.require('fs');

        var settingsPath = process.env.PWD + '/settings_test.json';
        var defaultSettingsPath = process.env.PWD + '/default-settings_test.json';

        fs.writeFileSync(defaultSettingsPath, '{ "only": "for test" }', { encoding: "UTF8" });

        AdvSettings.makeSettingsFile(settingsPath, defaultSettingsPath);

        test.isTrue(fs.existsSync(settingsPath));

        if(fs.existsSync(settingsPath)) {
            fs.unlink(settingsPath);
        }

        if(fs.existsSync(defaultSettingsPath)) {
            fs.unlink(defaultSettingsPath);
        }

    }

});