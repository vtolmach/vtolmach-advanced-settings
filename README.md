
#Advanced Settings - advanced functionality for meteor settings

Before using try to read basic documentation about [Meteor settings](//docs.meteor.com/#/full/meteor_settings)

## Introduction

Meteor settings doesn't provide any checks or default values for settings. So if you will use wrong value or if you forget to call **--settings settings.json** parameter with meteor instance you will get error message.    
Advanced settings give elegant way to resolve all issues.  

## Quick start

1) Run
```
meteor add vtolmach:advanced-settings
```
2) Use method "get" on server
```javascript
AdvSettings.get('any.server.test.setting', 'any default value or null') 
```
3) Use method "getPublic" on client
```javascript
AdvSettings.getPublic('any.client.test.setting', 'any default value or null');   
```

## Advanced functionality

---

1) Create default settings file **default-settings.json**
```javascript
{  
  "public": {}
}    
```
2) Set that code in startup folder to use auto generating settings file. By default it will generate **settings.json** from **default-settings.json** if **settings.json** not exists.
So you can set **settings.json** to **.gitignore** and keep **default-settings.json** for developers.  
```javascript
Meteor.startup(function() {  
    AdvSettings.makeSettingsFile();  
});
```
3) Set **verbose** setting in **true** to check when AdvSettings used default value or turn off it by **false** value, by default is **true**. There was warning in server console or in browser console.   
```javascript
{
  "AdvSettings": {
    "verbose": true
  },
  "public": {
    "AdvSettings": {
      "verbose": false
    }
  }
}    
```

##Lincense


The MIT License (MIT)  
Copyright (c) 2015
