"use strict";
var wing = require("wing");
var nls = require('vscode-nls');
var localize = nls.config({ locale: wing.env.language })(__filename);
var sync_command_1 = require("./modules/sync-command");
var init_command_1 = require("./modules/init-command");
var ftpConfig = require("./modules/ftp-config");
var sync_helper_1 = require("./modules/sync-helper");
var command_helper_1 = require("./modules/command-helper");
var pathtool = require('path');
function activate(context) {
    ftpConfig.setContext(context);
    // wing.window.webviews.ex
    var getSyncHelper = function () {
        var currentConfig = ftpConfig.getCurrentConfig();
        if (sync_helper_1.helper.checkNeedInit() === false) {
            if (sync_helper_1.helper.connectionChanged(currentConfig)) {
                sync_helper_1.helper.disconnect();
            }
        }
        sync_helper_1.helper.useConfig(currentConfig);
        return sync_helper_1.helper;
    };
    var checkRoot = function () {
        if (!wing.workspace.rootPath) {
            wing.window.showErrorMessage(localize(0, null));
        }
        return wing.workspace.rootPath !== undefined && !command_helper_1.checkConnectAndPop();
    };
    wing.commands.registerCommand('extension.ftpsyncaddNewConfig', function () {
        if (!checkRoot()) {
            return;
        }
        ftpConfig.initAllConfig();
        init_command_1.initCommand(ftpConfig.createDefaultInfo());
    });
    wing.commands.registerCommand('extension.ftpsyncupload', function (version, isWeb) {
        if (!checkRoot()) {
            return;
        }
        var dir;
        if (isWeb) {
            dir = (escapePath(pathtool.join(wing.workspace.rootPath, 'bin-release/web/' + version)));
        }
        else {
            dir = (escapePath(pathtool.join(wing.workspace.rootPath, 'bin-release/native/' + version)));
        }
        ftpConfig.initAllConfig();
        sync_command_1.synccommand(true, dir, getSyncHelper);
    });
    wing.commands.registerCommand('extension.ftpsyncuploadBySelected', function () {
        if (!checkRoot()) {
            return;
        }
        ftpConfig.initAllConfig();
        sync_command_1.synccommand(true, '', getSyncHelper);
    });
    if (1) {
        wing.commands.registerCommand('extension.ftpsyncuploadToFreeFtp', function () {
            if (!checkRoot()) {
                return;
            }
            ftpConfig.initAllConfig();
            sync_command_1.synccommand(true, '', getSyncHelper, true);
        });
        wing.commands.registerCommand('extension.ftpActiviteCloud', init_command_1.activityYun);
        // wing.commands.registerCommand('extension.showFreeFTPUrl', showPanel);
    }
    wing.window.onDidCreateWebView(function (webview) {
        webview.addEventListener('ipc-message', function (m) { return onWebViewMessage(m.channel, m.args); });
    });
}
exports.activate = activate;
function escapePath(path) {
    if (!path) {
        return '';
    }
    return path.split('\\').join('/');
}
function showPanel() {
    var url = ftpConfig.getLastFinishUrl();
    if (!url) {
        wing.window.showInformationMessage(localize(1, null));
        return;
    }
    //serverStatusItem.text=KEY_STATUSBAR_LABEL;
    var extensionRoot = ftpConfig.context.extensionPath;
    var panelPath = pathtool.join(extensionRoot, 'web/index.html');
    var options = {
        uri: wing.Uri.file(panelPath)
    };
    var popupOptions = {
        width: 300,
        height: 400,
        position: wing.PopupPosition.MIDDLE,
        closeButton: true,
        movable: true,
        title: localize(2, null)
    };
    wing.window.showPopup(wing.PopupType.WebView, options, popupOptions);
}
function onWebViewMessage(channel, args) {
    if (channel === 'httpServer:panelReady') {
        updatePanel();
    }
    function updatePanel() {
        wing.window.webviews.forEach(function (v) { return v.send('httpServer:configUpdate', ftpConfig.getLastFinishUrl()); });
    }
    //  wing.commands.registerCommand('extension.ftpsyncdownload', function() {
    // 		 if(!checkRoot())
    // 		{
    // 			return;
    // 		}
    // 	 	ftpConfig.initAllConfig();
    // 	  	synccommand(false, getSyncHelper)
    // 	});
    // wing.commands.registerCommand('extension.ftpsynccommitCurrent', function() {
    // 		ftpConfig.initAllConfig();
    // 	 	commitCurrentEditText(getSyncHelper)
    // 	});
    // wing.workspace.onDidSaveTextDocument(function(file) {
    // 	onsave(file, getSyncHelper);
    // });
}

//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/5ba1d55aec03475bcf2ac422a7025818bc02691e/extensions\ftp-upload\out/extension.js.map
