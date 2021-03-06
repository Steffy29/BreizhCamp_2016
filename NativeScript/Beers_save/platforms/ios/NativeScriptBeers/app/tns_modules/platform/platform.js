var enums = require("ui/enums");
var platformNames;
(function (platformNames) {
    platformNames.android = "Android";
    platformNames.ios = "iOS";
})(platformNames = exports.platformNames || (exports.platformNames = {}));
var device = (function () {
    function device() {
    }
    Object.defineProperty(device, "manufacturer", {
        get: function () {
            return "Apple";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(device, "os", {
        get: function () {
            return platformNames.ios;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(device, "osVersion", {
        get: function () {
            if (!device._osVersion) {
                device._osVersion = UIDevice.currentDevice().systemVersion;
            }
            return device._osVersion;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(device, "model", {
        get: function () {
            if (!device._model) {
                device._model = UIDevice.currentDevice().model;
            }
            return device._model;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(device, "sdkVersion", {
        get: function () {
            if (!device._sdkVersion) {
                device._sdkVersion = UIDevice.currentDevice().systemVersion;
            }
            return device._sdkVersion;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(device, "deviceType", {
        get: function () {
            if (!device._deviceType) {
                if (UIDevice.currentDevice().userInterfaceIdiom === UIUserInterfaceIdiom.UIUserInterfaceIdiomPhone) {
                    device._deviceType = enums.DeviceType.Phone;
                }
                else {
                    device._deviceType = enums.DeviceType.Tablet;
                }
            }
            return device._deviceType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(device, "uuid", {
        get: function () {
            var userDefaults = NSUserDefaults.standardUserDefaults();
            var uuid_key = "TNSUUID";
            var app_uuid = userDefaults.stringForKey(uuid_key);
            if (!app_uuid) {
                var uuidRef = CFUUIDCreate(kCFAllocatorDefault);
                app_uuid = CFUUIDCreateString(kCFAllocatorDefault, uuidRef);
                userDefaults.setObjectForKey(app_uuid, uuid_key);
                userDefaults.synchronize();
            }
            return app_uuid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(device, "language", {
        get: function () {
            if (!device._language) {
                var languages = NSLocale.preferredLanguages();
                device._language = languages[0];
            }
            return device._language;
        },
        enumerable: true,
        configurable: true
    });
    return device;
})();
exports.device = device;
var mainScreen;
var screen = (function () {
    function screen() {
    }
    Object.defineProperty(screen, "mainScreen", {
        get: function () {
            if (!mainScreen) {
                mainScreen = new MainScreen(UIScreen.mainScreen());
            }
            return mainScreen;
        },
        enumerable: true,
        configurable: true
    });
    return screen;
})();
exports.screen = screen;
var MainScreen = (function () {
    function MainScreen(metrics) {
        this._screen = metrics;
    }
    Object.defineProperty(MainScreen.prototype, "widthPixels", {
        get: function () {
            return this.widthDIPs * this.scale;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MainScreen.prototype, "heightPixels", {
        get: function () {
            return this.heightDIPs * this.scale;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MainScreen.prototype, "scale", {
        get: function () {
            return this._screen.scale;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MainScreen.prototype, "widthDIPs", {
        get: function () {
            return this._screen.bounds.size.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MainScreen.prototype, "heightDIPs", {
        get: function () {
            return this._screen.bounds.size.height;
        },
        enumerable: true,
        configurable: true
    });
    return MainScreen;
})();
