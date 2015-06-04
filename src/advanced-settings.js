
var _AdvSettings =  function () {

    var self = this;

    this.verbose = true;

    var processParam = function (context, source, defaultVal) {
        if(!context) {
            self.log('Context is undefined');
            return defaultVal;
        }
        defaultVal = defaultVal || null;

        var path = context.split('.');
        var paramValue = source;
        for(var i = 0; i < path.length; i++) {
            var key = path[i];
            if(typeof(paramValue[key]) !== 'undefined') {
                paramValue = paramValue[key];
            } else {
                paramValue = defaultVal;
                if(typeof(defaultVal) === 'object') {
                    self.log('Can`t find setting by context "' + context + '" used default value :');
                    self.log(defaultVal);
                } else {
                    self.log('Can`t find setting by context "' + context + '" used default value : "' + defaultVal + '" ');
                }

                break;
            }
        }
        return paramValue;
    };

    this.get = function (context, defaultVal) {
        defaultVal = defaultVal || null;
        if(!Meteor.isServer) {
            this.log('Can\'t use server method by context "'+ context +'"');
            return defaultVal;
        }

        return processParam(context, Meteor.settings || {}, defaultVal);
    };

    this.getPublic = function (context, defaultVal) {
        defaultVal = defaultVal || null;
        return processParam(context, Meteor.settings ? Meteor.settings.public || {} : {} , defaultVal);
    };

    this.log = function (msg) {
        if(this.verbose) {
            console.warn(msg);
        }
    };

};

AdvSettings = new _AdvSettings();

if(Meteor.isServer) {
    AdvSettings.verbose = AdvSettings.get('AdvSettings.verbose', true);
} else {
    AdvSettings.verbose = AdvSettings.getPublic('AdvSettings.verbose', true);
}


