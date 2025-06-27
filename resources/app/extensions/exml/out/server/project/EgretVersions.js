/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';
var StringUtil_1 = require('../utils/StringUtil');
var childProcess = require('child_process');
/**
 * 获取引擎版本
 * @author featherJ
 */
var EgretVersions = (function () {
    function EgretVersions() {
    }
    EgretVersions.prototype.getVersion = function (callback, thisArg) {
        // var exec = childProcess.exec, 
        // versionsCmd = exec('egret versions', { cwd: '/' }, function () { });
        // var versionsOutPut = '';
        // versionsCmd.stdout.on('data', function (data) {
        //     var str = data.toString('utf-8');
        //     if (str.indexOf('Egret Engine') === -1) {
        //         return;
        //     }
        //     if (versionsOutPut !== '' && versionsOutPut.lastIndexOf('\n') !== versionsOutPut.length) {
        //         versionsOutPut += '\n';
        //     }
        //     versionsOutPut += str;
        //     if (versionsOutPut) {
        //         var versions = versionsOutPut.split('\n');
        //         for (var i = 0; i < versions.length; i++) {
        //             var versionStr = versions[i];
        //             var tempArr = versionStr.split(' ');
        //             tempArr.splice(0, 2); //前2位为Egret Engine 并不需要
        //             var version = tempArr.shift();
        //             version = StringUtil_1.StringUtil.trim(version);
        //             var versionPath = tempArr.join(' '); //后续为地址数组, 不直接取后一位 为避免地址中存在空格
        //             var path = StringUtil_1.StringUtil.trimLeft(versionPath);
        //             path = path.split('\\').join('/');
        //             if (path.charAt(path.length - 1) !== '/') {
        //                 path += '/';
        //             }
        //             if (version) {
        //                 versionInfos.push({ version: version, path: path });
        //             }
        //         }
        //     }
        // });
        //已安装的引擎版本
        var versionInfos = [];
        // versionsCmd.on('exit', function (code, signal) {
        //     setTimeout(function () {

        //     }, 50);
        // });
        //当前安装的引擎
        var currentVersionInfo = null;
        function getCurrentVersion() {
            var exec = childProcess.exec, infoCmd = exec('egret info', { cwd: '/' }, function () { });
            var infoOutPut = '';
            infoCmd.stdout.on('data', function (data) {
                var str = data.toString('utf-8');
                if (infoOutPut !== '' && infoOutPut.lastIndexOf('\n') !== infoOutPut.length) {
                    infoOutPut += '\n';
                }
                infoOutPut += str;
                var versionArr = infoOutPut.match(/(?:[0-9]+\.)+[0-9]+/g);
                var pathArr = infoOutPut.match(/(?:[a-zA-Z]\:)?(?:[\\|\/][^\\|\/]+)+[\\|\/]?/g);
                var currentVersion = versionArr !== null ? versionArr[0] : '';
                var currentPath = pathArr !== null ? pathArr[0] : '';
                currentPath = currentPath.replace(/\n/g, '');
                currentPath = currentPath.replace(/\r/g, '');
                if (currentPath.charAt(currentPath.length - 1) !== '/') {
                    currentPath += '/';
                }
                currentVersionInfo = { version: currentVersion, path: currentPath };
                if (versionInfos.length === 0) {
                    versionInfos.push(currentVersionInfo);
                }
                if (callback !== null) {
                    callback.call(thisArg, versionInfos, currentVersionInfo);
                }
            });
            // infoCmd.on('exit', function (code, signal) {
            //     setTimeout(function () {

            //     }, 50);
            // });
        }
        getCurrentVersion();
    };
    return EgretVersions;
}());
exports.EgretVersions = EgretVersions;

//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/5ba1d55aec03475bcf2ac422a7025818bc02691e/extensions\exml\out/server\project\EgretVersions.js.map
