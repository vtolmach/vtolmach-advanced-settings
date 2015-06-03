
var fs = Npm.require('fs');

AdvSettings = _.extend(AdvSettings, {
    makeSettingsFile : function (targetSettingsPath, defaultSettingsPath) {
        targetSettingsPath = targetSettingsPath || process.env.PWD + '/settings.json';
        defaultSettingsPath = defaultSettingsPath || process.env.PWD + '/default-settings.json';
        var options = { encoding: "UTF8" };

        if(!fs.existsSync(targetSettingsPath)) {
            if(fs.existsSync(defaultSettingsPath)) {
                fs.writeFileSync(targetSettingsPath, fs.readFileSync(defaultSettingsPath, options));
            } else {
                this.log('Can`t find default settings file by "' + defaultSettingsPath + '"');
            }
        }
    }
});

