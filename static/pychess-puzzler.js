"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/mousetrap/mousetrap.js
  var require_mousetrap = __commonJS({
    "node_modules/mousetrap/mousetrap.js"(exports, module) {
      (function(window2, document2, undefined2) {
        if (!window2) {
          return;
        }
        var _MAP = {
          8: "backspace",
          9: "tab",
          13: "enter",
          16: "shift",
          17: "ctrl",
          18: "alt",
          20: "capslock",
          27: "esc",
          32: "space",
          33: "pageup",
          34: "pagedown",
          35: "end",
          36: "home",
          37: "left",
          38: "up",
          39: "right",
          40: "down",
          45: "ins",
          46: "del",
          91: "meta",
          93: "meta",
          224: "meta"
        };
        var _KEYCODE_MAP = {
          106: "*",
          107: "+",
          109: "-",
          110: ".",
          111: "/",
          186: ";",
          187: "=",
          188: ",",
          189: "-",
          190: ".",
          191: "/",
          192: "`",
          219: "[",
          220: "\\",
          221: "]",
          222: "'"
        };
        var _SHIFT_MAP = {
          "~": "`",
          "!": "1",
          "@": "2",
          "#": "3",
          "$": "4",
          "%": "5",
          "^": "6",
          "&": "7",
          "*": "8",
          "(": "9",
          ")": "0",
          "_": "-",
          "+": "=",
          ":": ";",
          '"': "'",
          "<": ",",
          ">": ".",
          "?": "/",
          "|": "\\"
        };
        var _SPECIAL_ALIASES = {
          "option": "alt",
          "command": "meta",
          "return": "enter",
          "escape": "esc",
          "plus": "+",
          "mod": /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "meta" : "ctrl"
        };
        var _REVERSE_MAP;
        for (var i = 1; i < 20; ++i) {
          _MAP[111 + i] = "f" + i;
        }
        for (i = 0; i <= 9; ++i) {
          _MAP[i + 96] = i.toString();
        }
        function _addEvent(object, type, callback) {
          if (object.addEventListener) {
            object.addEventListener(type, callback, false);
            return;
          }
          object.attachEvent("on" + type, callback);
        }
        function _characterFromEvent(e) {
          if (e.type == "keypress") {
            var character = String.fromCharCode(e.which);
            if (!e.shiftKey) {
              character = character.toLowerCase();
            }
            return character;
          }
          if (_MAP[e.which]) {
            return _MAP[e.which];
          }
          if (_KEYCODE_MAP[e.which]) {
            return _KEYCODE_MAP[e.which];
          }
          return String.fromCharCode(e.which).toLowerCase();
        }
        function _modifiersMatch(modifiers1, modifiers2) {
          return modifiers1.sort().join(",") === modifiers2.sort().join(",");
        }
        function _eventModifiers(e) {
          var modifiers = [];
          if (e.shiftKey) {
            modifiers.push("shift");
          }
          if (e.altKey) {
            modifiers.push("alt");
          }
          if (e.ctrlKey) {
            modifiers.push("ctrl");
          }
          if (e.metaKey) {
            modifiers.push("meta");
          }
          return modifiers;
        }
        function _preventDefault(e) {
          if (e.preventDefault) {
            e.preventDefault();
            return;
          }
          e.returnValue = false;
        }
        function _stopPropagation(e) {
          if (e.stopPropagation) {
            e.stopPropagation();
            return;
          }
          e.cancelBubble = true;
        }
        function _isModifier(key) {
          return key == "shift" || key == "ctrl" || key == "alt" || key == "meta";
        }
        function _getReverseMap() {
          if (!_REVERSE_MAP) {
            _REVERSE_MAP = {};
            for (var key in _MAP) {
              if (key > 95 && key < 112) {
                continue;
              }
              if (_MAP.hasOwnProperty(key)) {
                _REVERSE_MAP[_MAP[key]] = key;
              }
            }
          }
          return _REVERSE_MAP;
        }
        function _pickBestAction(key, modifiers, action) {
          if (!action) {
            action = _getReverseMap()[key] ? "keydown" : "keypress";
          }
          if (action == "keypress" && modifiers.length) {
            action = "keydown";
          }
          return action;
        }
        function _keysFromString(combination) {
          if (combination === "+") {
            return ["+"];
          }
          combination = combination.replace(/\+{2}/g, "+plus");
          return combination.split("+");
        }
        function _getKeyInfo(combination, action) {
          var keys;
          var key;
          var i2;
          var modifiers = [];
          keys = _keysFromString(combination);
          for (i2 = 0; i2 < keys.length; ++i2) {
            key = keys[i2];
            if (_SPECIAL_ALIASES[key]) {
              key = _SPECIAL_ALIASES[key];
            }
            if (action && action != "keypress" && _SHIFT_MAP[key]) {
              key = _SHIFT_MAP[key];
              modifiers.push("shift");
            }
            if (_isModifier(key)) {
              modifiers.push(key);
            }
          }
          action = _pickBestAction(key, modifiers, action);
          return {
            key,
            modifiers,
            action
          };
        }
        function _belongsTo(element, ancestor) {
          if (element === null || element === document2) {
            return false;
          }
          if (element === ancestor) {
            return true;
          }
          return _belongsTo(element.parentNode, ancestor);
        }
        function Mousetrap2(targetElement) {
          var self2 = this;
          targetElement = targetElement || document2;
          if (!(self2 instanceof Mousetrap2)) {
            return new Mousetrap2(targetElement);
          }
          self2.target = targetElement;
          self2._callbacks = {};
          self2._directMap = {};
          var _sequenceLevels = {};
          var _resetTimer;
          var _ignoreNextKeyup = false;
          var _ignoreNextKeypress = false;
          var _nextExpectedAction = false;
          function _resetSequences(doNotReset) {
            doNotReset = doNotReset || {};
            var activeSequences = false, key;
            for (key in _sequenceLevels) {
              if (doNotReset[key]) {
                activeSequences = true;
                continue;
              }
              _sequenceLevels[key] = 0;
            }
            if (!activeSequences) {
              _nextExpectedAction = false;
            }
          }
          function _getMatches(character, modifiers, e, sequenceName, combination, level) {
            var i2;
            var callback;
            var matches = [];
            var action = e.type;
            if (!self2._callbacks[character]) {
              return [];
            }
            if (action == "keyup" && _isModifier(character)) {
              modifiers = [character];
            }
            for (i2 = 0; i2 < self2._callbacks[character].length; ++i2) {
              callback = self2._callbacks[character][i2];
              if (!sequenceName && callback.seq && _sequenceLevels[callback.seq] != callback.level) {
                continue;
              }
              if (action != callback.action) {
                continue;
              }
              if (action == "keypress" && !e.metaKey && !e.ctrlKey || _modifiersMatch(modifiers, callback.modifiers)) {
                var deleteCombo = !sequenceName && callback.combo == combination;
                var deleteSequence = sequenceName && callback.seq == sequenceName && callback.level == level;
                if (deleteCombo || deleteSequence) {
                  self2._callbacks[character].splice(i2, 1);
                }
                matches.push(callback);
              }
            }
            return matches;
          }
          function _fireCallback(callback, e, combo, sequence) {
            if (self2.stopCallback(e, e.target || e.srcElement, combo, sequence)) {
              return;
            }
            if (callback(e, combo) === false) {
              _preventDefault(e);
              _stopPropagation(e);
            }
          }
          self2._handleKey = function(character, modifiers, e) {
            var callbacks = _getMatches(character, modifiers, e);
            var i2;
            var doNotReset = {};
            var maxLevel = 0;
            var processedSequenceCallback = false;
            for (i2 = 0; i2 < callbacks.length; ++i2) {
              if (callbacks[i2].seq) {
                maxLevel = Math.max(maxLevel, callbacks[i2].level);
              }
            }
            for (i2 = 0; i2 < callbacks.length; ++i2) {
              if (callbacks[i2].seq) {
                if (callbacks[i2].level != maxLevel) {
                  continue;
                }
                processedSequenceCallback = true;
                doNotReset[callbacks[i2].seq] = 1;
                _fireCallback(callbacks[i2].callback, e, callbacks[i2].combo, callbacks[i2].seq);
                continue;
              }
              if (!processedSequenceCallback) {
                _fireCallback(callbacks[i2].callback, e, callbacks[i2].combo);
              }
            }
            var ignoreThisKeypress = e.type == "keypress" && _ignoreNextKeypress;
            if (e.type == _nextExpectedAction && !_isModifier(character) && !ignoreThisKeypress) {
              _resetSequences(doNotReset);
            }
            _ignoreNextKeypress = processedSequenceCallback && e.type == "keydown";
          };
          function _handleKeyEvent(e) {
            if (typeof e.which !== "number") {
              e.which = e.keyCode;
            }
            var character = _characterFromEvent(e);
            if (!character) {
              return;
            }
            if (e.type == "keyup" && _ignoreNextKeyup === character) {
              _ignoreNextKeyup = false;
              return;
            }
            self2.handleKey(character, _eventModifiers(e), e);
          }
          function _resetSequenceTimer() {
            clearTimeout(_resetTimer);
            _resetTimer = setTimeout(_resetSequences, 1e3);
          }
          function _bindSequence(combo, keys, callback, action) {
            _sequenceLevels[combo] = 0;
            function _increaseSequence(nextAction) {
              return function() {
                _nextExpectedAction = nextAction;
                ++_sequenceLevels[combo];
                _resetSequenceTimer();
              };
            }
            function _callbackAndReset(e) {
              _fireCallback(callback, e, combo);
              if (action !== "keyup") {
                _ignoreNextKeyup = _characterFromEvent(e);
              }
              setTimeout(_resetSequences, 10);
            }
            for (var i2 = 0; i2 < keys.length; ++i2) {
              var isFinal = i2 + 1 === keys.length;
              var wrappedCallback = isFinal ? _callbackAndReset : _increaseSequence(action || _getKeyInfo(keys[i2 + 1]).action);
              _bindSingle(keys[i2], wrappedCallback, action, combo, i2);
            }
          }
          function _bindSingle(combination, callback, action, sequenceName, level) {
            self2._directMap[combination + ":" + action] = callback;
            combination = combination.replace(/\s+/g, " ");
            var sequence = combination.split(" ");
            var info;
            if (sequence.length > 1) {
              _bindSequence(combination, sequence, callback, action);
              return;
            }
            info = _getKeyInfo(combination, action);
            self2._callbacks[info.key] = self2._callbacks[info.key] || [];
            _getMatches(info.key, info.modifiers, { type: info.action }, sequenceName, combination, level);
            self2._callbacks[info.key][sequenceName ? "unshift" : "push"]({
              callback,
              modifiers: info.modifiers,
              action: info.action,
              seq: sequenceName,
              level,
              combo: combination
            });
          }
          self2._bindMultiple = function(combinations, callback, action) {
            for (var i2 = 0; i2 < combinations.length; ++i2) {
              _bindSingle(combinations[i2], callback, action);
            }
          };
          _addEvent(targetElement, "keypress", _handleKeyEvent);
          _addEvent(targetElement, "keydown", _handleKeyEvent);
          _addEvent(targetElement, "keyup", _handleKeyEvent);
        }
        Mousetrap2.prototype.bind = function(keys, callback, action) {
          var self2 = this;
          keys = keys instanceof Array ? keys : [keys];
          self2._bindMultiple.call(self2, keys, callback, action);
          return self2;
        };
        Mousetrap2.prototype.unbind = function(keys, action) {
          var self2 = this;
          return self2.bind.call(self2, keys, function() {
          }, action);
        };
        Mousetrap2.prototype.trigger = function(keys, action) {
          var self2 = this;
          if (self2._directMap[keys + ":" + action]) {
            self2._directMap[keys + ":" + action]({}, keys);
          }
          return self2;
        };
        Mousetrap2.prototype.reset = function() {
          var self2 = this;
          self2._callbacks = {};
          self2._directMap = {};
          return self2;
        };
        Mousetrap2.prototype.stopCallback = function(e, element) {
          var self2 = this;
          if ((" " + element.className + " ").indexOf(" mousetrap ") > -1) {
            return false;
          }
          if (_belongsTo(element, self2.target)) {
            return false;
          }
          if ("composedPath" in e && typeof e.composedPath === "function") {
            var initialEventTarget = e.composedPath()[0];
            if (initialEventTarget !== e.target) {
              element = initialEventTarget;
            }
          }
          return element.tagName == "INPUT" || element.tagName == "SELECT" || element.tagName == "TEXTAREA" || element.isContentEditable;
        };
        Mousetrap2.prototype.handleKey = function() {
          var self2 = this;
          return self2._handleKey.apply(self2, arguments);
        };
        Mousetrap2.addKeycodes = function(object) {
          for (var key in object) {
            if (object.hasOwnProperty(key)) {
              _MAP[key] = object[key];
            }
          }
          _REVERSE_MAP = null;
        };
        Mousetrap2.init = function() {
          var documentMousetrap = Mousetrap2(document2);
          for (var method in documentMousetrap) {
            if (method.charAt(0) !== "_") {
              Mousetrap2[method] = function(method2) {
                return function() {
                  return documentMousetrap[method2].apply(documentMousetrap, arguments);
                };
              }(method);
            }
          }
        };
        Mousetrap2.init();
        window2.Mousetrap = Mousetrap2;
        if (typeof module !== "undefined" && module.exports) {
          module.exports = Mousetrap2;
        }
        if (typeof define === "function" && define.amd) {
          define(function() {
            return Mousetrap2;
          });
        }
      })(typeof window !== "undefined" ? window : null, typeof window !== "undefined" ? document : null);
    }
  });

  // node_modules/howler/dist/howler.js
  var require_howler = __commonJS({
    "node_modules/howler/dist/howler.js"(exports) {
      (function() {
        "use strict";
        var HowlerGlobal2 = function() {
          this.init();
        };
        HowlerGlobal2.prototype = {
          /**
           * Initialize the global Howler object.
           * @return {Howler}
           */
          init: function() {
            var self2 = this || Howler2;
            self2._counter = 1e3;
            self2._html5AudioPool = [];
            self2.html5PoolSize = 10;
            self2._codecs = {};
            self2._howls = [];
            self2._muted = false;
            self2._volume = 1;
            self2._canPlayEvent = "canplaythrough";
            self2._navigator = typeof window !== "undefined" && window.navigator ? window.navigator : null;
            self2.masterGain = null;
            self2.noAudio = false;
            self2.usingWebAudio = true;
            self2.autoSuspend = true;
            self2.ctx = null;
            self2.autoUnlock = true;
            self2._setup();
            return self2;
          },
          /**
           * Get/set the global volume for all sounds.
           * @param  {Float} vol Volume from 0.0 to 1.0.
           * @return {Howler/Float}     Returns self or current volume.
           */
          volume: function(vol) {
            var self2 = this || Howler2;
            vol = parseFloat(vol);
            if (!self2.ctx) {
              setupAudioContext();
            }
            if (typeof vol !== "undefined" && vol >= 0 && vol <= 1) {
              self2._volume = vol;
              if (self2._muted) {
                return self2;
              }
              if (self2.usingWebAudio) {
                self2.masterGain.gain.setValueAtTime(vol, Howler2.ctx.currentTime);
              }
              for (var i = 0; i < self2._howls.length; i++) {
                if (!self2._howls[i]._webAudio) {
                  var ids = self2._howls[i]._getSoundIds();
                  for (var j = 0; j < ids.length; j++) {
                    var sound2 = self2._howls[i]._soundById(ids[j]);
                    if (sound2 && sound2._node) {
                      sound2._node.volume = sound2._volume * vol;
                    }
                  }
                }
              }
              return self2;
            }
            return self2._volume;
          },
          /**
           * Handle muting and unmuting globally.
           * @param  {Boolean} muted Is muted or not.
           */
          mute: function(muted) {
            var self2 = this || Howler2;
            if (!self2.ctx) {
              setupAudioContext();
            }
            self2._muted = muted;
            if (self2.usingWebAudio) {
              self2.masterGain.gain.setValueAtTime(muted ? 0 : self2._volume, Howler2.ctx.currentTime);
            }
            for (var i = 0; i < self2._howls.length; i++) {
              if (!self2._howls[i]._webAudio) {
                var ids = self2._howls[i]._getSoundIds();
                for (var j = 0; j < ids.length; j++) {
                  var sound2 = self2._howls[i]._soundById(ids[j]);
                  if (sound2 && sound2._node) {
                    sound2._node.muted = muted ? true : sound2._muted;
                  }
                }
              }
            }
            return self2;
          },
          /**
           * Handle stopping all sounds globally.
           */
          stop: function() {
            var self2 = this || Howler2;
            for (var i = 0; i < self2._howls.length; i++) {
              self2._howls[i].stop();
            }
            return self2;
          },
          /**
           * Unload and destroy all currently loaded Howl objects.
           * @return {Howler}
           */
          unload: function() {
            var self2 = this || Howler2;
            for (var i = self2._howls.length - 1; i >= 0; i--) {
              self2._howls[i].unload();
            }
            if (self2.usingWebAudio && self2.ctx && typeof self2.ctx.close !== "undefined") {
              self2.ctx.close();
              self2.ctx = null;
              setupAudioContext();
            }
            return self2;
          },
          /**
           * Check for codec support of specific extension.
           * @param  {String} ext Audio file extention.
           * @return {Boolean}
           */
          codecs: function(ext) {
            return (this || Howler2)._codecs[ext.replace(/^x-/, "")];
          },
          /**
           * Setup various state values for global tracking.
           * @return {Howler}
           */
          _setup: function() {
            var self2 = this || Howler2;
            self2.state = self2.ctx ? self2.ctx.state || "suspended" : "suspended";
            self2._autoSuspend();
            if (!self2.usingWebAudio) {
              if (typeof Audio !== "undefined") {
                try {
                  var test = new Audio();
                  if (typeof test.oncanplaythrough === "undefined") {
                    self2._canPlayEvent = "canplay";
                  }
                } catch (e) {
                  self2.noAudio = true;
                }
              } else {
                self2.noAudio = true;
              }
            }
            try {
              var test = new Audio();
              if (test.muted) {
                self2.noAudio = true;
              }
            } catch (e) {
            }
            if (!self2.noAudio) {
              self2._setupCodecs();
            }
            return self2;
          },
          /**
           * Check for browser support for various codecs and cache the results.
           * @return {Howler}
           */
          _setupCodecs: function() {
            var self2 = this || Howler2;
            var audioTest = null;
            try {
              audioTest = typeof Audio !== "undefined" ? new Audio() : null;
            } catch (err) {
              return self2;
            }
            if (!audioTest || typeof audioTest.canPlayType !== "function") {
              return self2;
            }
            var mpegTest = audioTest.canPlayType("audio/mpeg;").replace(/^no$/, "");
            var ua = self2._navigator ? self2._navigator.userAgent : "";
            var checkOpera = ua.match(/OPR\/([0-6].)/g);
            var isOldOpera = checkOpera && parseInt(checkOpera[0].split("/")[1], 10) < 33;
            var checkSafari = ua.indexOf("Safari") !== -1 && ua.indexOf("Chrome") === -1;
            var safariVersion = ua.match(/Version\/(.*?) /);
            var isOldSafari = checkSafari && safariVersion && parseInt(safariVersion[1], 10) < 15;
            self2._codecs = {
              mp3: !!(!isOldOpera && (mpegTest || audioTest.canPlayType("audio/mp3;").replace(/^no$/, ""))),
              mpeg: !!mpegTest,
              opus: !!audioTest.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
              ogg: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
              oga: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
              wav: !!(audioTest.canPlayType('audio/wav; codecs="1"') || audioTest.canPlayType("audio/wav")).replace(/^no$/, ""),
              aac: !!audioTest.canPlayType("audio/aac;").replace(/^no$/, ""),
              caf: !!audioTest.canPlayType("audio/x-caf;").replace(/^no$/, ""),
              m4a: !!(audioTest.canPlayType("audio/x-m4a;") || audioTest.canPlayType("audio/m4a;") || audioTest.canPlayType("audio/aac;")).replace(/^no$/, ""),
              m4b: !!(audioTest.canPlayType("audio/x-m4b;") || audioTest.canPlayType("audio/m4b;") || audioTest.canPlayType("audio/aac;")).replace(/^no$/, ""),
              mp4: !!(audioTest.canPlayType("audio/x-mp4;") || audioTest.canPlayType("audio/mp4;") || audioTest.canPlayType("audio/aac;")).replace(/^no$/, ""),
              weba: !!(!isOldSafari && audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
              webm: !!(!isOldSafari && audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
              dolby: !!audioTest.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ""),
              flac: !!(audioTest.canPlayType("audio/x-flac;") || audioTest.canPlayType("audio/flac;")).replace(/^no$/, "")
            };
            return self2;
          },
          /**
           * Some browsers/devices will only allow audio to be played after a user interaction.
           * Attempt to automatically unlock audio on the first user interaction.
           * Concept from: http://paulbakaus.com/tutorials/html5/web-audio-on-ios/
           * @return {Howler}
           */
          _unlockAudio: function() {
            var self2 = this || Howler2;
            if (self2._audioUnlocked || !self2.ctx) {
              return;
            }
            self2._audioUnlocked = false;
            self2.autoUnlock = false;
            if (!self2._mobileUnloaded && self2.ctx.sampleRate !== 44100) {
              self2._mobileUnloaded = true;
              self2.unload();
            }
            self2._scratchBuffer = self2.ctx.createBuffer(1, 1, 22050);
            var unlock = function(e) {
              while (self2._html5AudioPool.length < self2.html5PoolSize) {
                try {
                  var audioNode = new Audio();
                  audioNode._unlocked = true;
                  self2._releaseHtml5Audio(audioNode);
                } catch (e2) {
                  self2.noAudio = true;
                  break;
                }
              }
              for (var i = 0; i < self2._howls.length; i++) {
                if (!self2._howls[i]._webAudio) {
                  var ids = self2._howls[i]._getSoundIds();
                  for (var j = 0; j < ids.length; j++) {
                    var sound2 = self2._howls[i]._soundById(ids[j]);
                    if (sound2 && sound2._node && !sound2._node._unlocked) {
                      sound2._node._unlocked = true;
                      sound2._node.load();
                    }
                  }
                }
              }
              self2._autoResume();
              var source = self2.ctx.createBufferSource();
              source.buffer = self2._scratchBuffer;
              source.connect(self2.ctx.destination);
              if (typeof source.start === "undefined") {
                source.noteOn(0);
              } else {
                source.start(0);
              }
              if (typeof self2.ctx.resume === "function") {
                self2.ctx.resume();
              }
              source.onended = function() {
                source.disconnect(0);
                self2._audioUnlocked = true;
                document.removeEventListener("touchstart", unlock, true);
                document.removeEventListener("touchend", unlock, true);
                document.removeEventListener("click", unlock, true);
                document.removeEventListener("keydown", unlock, true);
                for (var i2 = 0; i2 < self2._howls.length; i2++) {
                  self2._howls[i2]._emit("unlock");
                }
              };
            };
            document.addEventListener("touchstart", unlock, true);
            document.addEventListener("touchend", unlock, true);
            document.addEventListener("click", unlock, true);
            document.addEventListener("keydown", unlock, true);
            return self2;
          },
          /**
           * Get an unlocked HTML5 Audio object from the pool. If none are left,
           * return a new Audio object and throw a warning.
           * @return {Audio} HTML5 Audio object.
           */
          _obtainHtml5Audio: function() {
            var self2 = this || Howler2;
            if (self2._html5AudioPool.length) {
              return self2._html5AudioPool.pop();
            }
            var testPlay = new Audio().play();
            if (testPlay && typeof Promise !== "undefined" && (testPlay instanceof Promise || typeof testPlay.then === "function")) {
              testPlay.catch(function() {
                console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.");
              });
            }
            return new Audio();
          },
          /**
           * Return an activated HTML5 Audio object to the pool.
           * @return {Howler}
           */
          _releaseHtml5Audio: function(audio) {
            var self2 = this || Howler2;
            if (audio._unlocked) {
              self2._html5AudioPool.push(audio);
            }
            return self2;
          },
          /**
           * Automatically suspend the Web Audio AudioContext after no sound has played for 30 seconds.
           * This saves processing/energy and fixes various browser-specific bugs with audio getting stuck.
           * @return {Howler}
           */
          _autoSuspend: function() {
            var self2 = this;
            if (!self2.autoSuspend || !self2.ctx || typeof self2.ctx.suspend === "undefined" || !Howler2.usingWebAudio) {
              return;
            }
            for (var i = 0; i < self2._howls.length; i++) {
              if (self2._howls[i]._webAudio) {
                for (var j = 0; j < self2._howls[i]._sounds.length; j++) {
                  if (!self2._howls[i]._sounds[j]._paused) {
                    return self2;
                  }
                }
              }
            }
            if (self2._suspendTimer) {
              clearTimeout(self2._suspendTimer);
            }
            self2._suspendTimer = setTimeout(function() {
              if (!self2.autoSuspend) {
                return;
              }
              self2._suspendTimer = null;
              self2.state = "suspending";
              var handleSuspension = function() {
                self2.state = "suspended";
                if (self2._resumeAfterSuspend) {
                  delete self2._resumeAfterSuspend;
                  self2._autoResume();
                }
              };
              self2.ctx.suspend().then(handleSuspension, handleSuspension);
            }, 3e4);
            return self2;
          },
          /**
           * Automatically resume the Web Audio AudioContext when a new sound is played.
           * @return {Howler}
           */
          _autoResume: function() {
            var self2 = this;
            if (!self2.ctx || typeof self2.ctx.resume === "undefined" || !Howler2.usingWebAudio) {
              return;
            }
            if (self2.state === "running" && self2.ctx.state !== "interrupted" && self2._suspendTimer) {
              clearTimeout(self2._suspendTimer);
              self2._suspendTimer = null;
            } else if (self2.state === "suspended" || self2.state === "running" && self2.ctx.state === "interrupted") {
              self2.ctx.resume().then(function() {
                self2.state = "running";
                for (var i = 0; i < self2._howls.length; i++) {
                  self2._howls[i]._emit("resume");
                }
              });
              if (self2._suspendTimer) {
                clearTimeout(self2._suspendTimer);
                self2._suspendTimer = null;
              }
            } else if (self2.state === "suspending") {
              self2._resumeAfterSuspend = true;
            }
            return self2;
          }
        };
        var Howler2 = new HowlerGlobal2();
        var Howl3 = function(o) {
          var self2 = this;
          if (!o.src || o.src.length === 0) {
            console.error("An array of source files must be passed with any new Howl.");
            return;
          }
          self2.init(o);
        };
        Howl3.prototype = {
          /**
           * Initialize a new Howl group object.
           * @param  {Object} o Passed in properties for this group.
           * @return {Howl}
           */
          init: function(o) {
            var self2 = this;
            if (!Howler2.ctx) {
              setupAudioContext();
            }
            self2._autoplay = o.autoplay || false;
            self2._format = typeof o.format !== "string" ? o.format : [o.format];
            self2._html5 = o.html5 || false;
            self2._muted = o.mute || false;
            self2._loop = o.loop || false;
            self2._pool = o.pool || 5;
            self2._preload = typeof o.preload === "boolean" || o.preload === "metadata" ? o.preload : true;
            self2._rate = o.rate || 1;
            self2._sprite = o.sprite || {};
            self2._src = typeof o.src !== "string" ? o.src : [o.src];
            self2._volume = o.volume !== void 0 ? o.volume : 1;
            self2._xhr = {
              method: o.xhr && o.xhr.method ? o.xhr.method : "GET",
              headers: o.xhr && o.xhr.headers ? o.xhr.headers : null,
              withCredentials: o.xhr && o.xhr.withCredentials ? o.xhr.withCredentials : false
            };
            self2._duration = 0;
            self2._state = "unloaded";
            self2._sounds = [];
            self2._endTimers = {};
            self2._queue = [];
            self2._playLock = false;
            self2._onend = o.onend ? [{ fn: o.onend }] : [];
            self2._onfade = o.onfade ? [{ fn: o.onfade }] : [];
            self2._onload = o.onload ? [{ fn: o.onload }] : [];
            self2._onloaderror = o.onloaderror ? [{ fn: o.onloaderror }] : [];
            self2._onplayerror = o.onplayerror ? [{ fn: o.onplayerror }] : [];
            self2._onpause = o.onpause ? [{ fn: o.onpause }] : [];
            self2._onplay = o.onplay ? [{ fn: o.onplay }] : [];
            self2._onstop = o.onstop ? [{ fn: o.onstop }] : [];
            self2._onmute = o.onmute ? [{ fn: o.onmute }] : [];
            self2._onvolume = o.onvolume ? [{ fn: o.onvolume }] : [];
            self2._onrate = o.onrate ? [{ fn: o.onrate }] : [];
            self2._onseek = o.onseek ? [{ fn: o.onseek }] : [];
            self2._onunlock = o.onunlock ? [{ fn: o.onunlock }] : [];
            self2._onresume = [];
            self2._webAudio = Howler2.usingWebAudio && !self2._html5;
            if (typeof Howler2.ctx !== "undefined" && Howler2.ctx && Howler2.autoUnlock) {
              Howler2._unlockAudio();
            }
            Howler2._howls.push(self2);
            if (self2._autoplay) {
              self2._queue.push({
                event: "play",
                action: function() {
                  self2.play();
                }
              });
            }
            if (self2._preload && self2._preload !== "none") {
              self2.load();
            }
            return self2;
          },
          /**
           * Load the audio file.
           * @return {Howler}
           */
          load: function() {
            var self2 = this;
            var url = null;
            if (Howler2.noAudio) {
              self2._emit("loaderror", null, "No audio support.");
              return;
            }
            if (typeof self2._src === "string") {
              self2._src = [self2._src];
            }
            for (var i = 0; i < self2._src.length; i++) {
              var ext, str;
              if (self2._format && self2._format[i]) {
                ext = self2._format[i];
              } else {
                str = self2._src[i];
                if (typeof str !== "string") {
                  self2._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
                  continue;
                }
                ext = /^data:audio\/([^;,]+);/i.exec(str);
                if (!ext) {
                  ext = /\.([^.]+)$/.exec(str.split("?", 1)[0]);
                }
                if (ext) {
                  ext = ext[1].toLowerCase();
                }
              }
              if (!ext) {
                console.warn('No file extension was found. Consider using the "format" property or specify an extension.');
              }
              if (ext && Howler2.codecs(ext)) {
                url = self2._src[i];
                break;
              }
            }
            if (!url) {
              self2._emit("loaderror", null, "No codec support for selected audio sources.");
              return;
            }
            self2._src = url;
            self2._state = "loading";
            if (window.location.protocol === "https:" && url.slice(0, 5) === "http:") {
              self2._html5 = true;
              self2._webAudio = false;
            }
            new Sound2(self2);
            if (self2._webAudio) {
              loadBuffer(self2);
            }
            return self2;
          },
          /**
           * Play a sound or resume previous playback.
           * @param  {String/Number} sprite   Sprite name for sprite playback or sound id to continue previous.
           * @param  {Boolean} internal Internal Use: true prevents event firing.
           * @return {Number}          Sound ID.
           */
          play: function(sprite, internal) {
            var self2 = this;
            var id = null;
            if (typeof sprite === "number") {
              id = sprite;
              sprite = null;
            } else if (typeof sprite === "string" && self2._state === "loaded" && !self2._sprite[sprite]) {
              return null;
            } else if (typeof sprite === "undefined") {
              sprite = "__default";
              if (!self2._playLock) {
                var num = 0;
                for (var i = 0; i < self2._sounds.length; i++) {
                  if (self2._sounds[i]._paused && !self2._sounds[i]._ended) {
                    num++;
                    id = self2._sounds[i]._id;
                  }
                }
                if (num === 1) {
                  sprite = null;
                } else {
                  id = null;
                }
              }
            }
            var sound2 = id ? self2._soundById(id) : self2._inactiveSound();
            if (!sound2) {
              return null;
            }
            if (id && !sprite) {
              sprite = sound2._sprite || "__default";
            }
            if (self2._state !== "loaded") {
              sound2._sprite = sprite;
              sound2._ended = false;
              var soundId = sound2._id;
              self2._queue.push({
                event: "play",
                action: function() {
                  self2.play(soundId);
                }
              });
              return soundId;
            }
            if (id && !sound2._paused) {
              if (!internal) {
                self2._loadQueue("play");
              }
              return sound2._id;
            }
            if (self2._webAudio) {
              Howler2._autoResume();
            }
            var seek = Math.max(0, sound2._seek > 0 ? sound2._seek : self2._sprite[sprite][0] / 1e3);
            var duration = Math.max(0, (self2._sprite[sprite][0] + self2._sprite[sprite][1]) / 1e3 - seek);
            var timeout = duration * 1e3 / Math.abs(sound2._rate);
            var start4 = self2._sprite[sprite][0] / 1e3;
            var stop2 = (self2._sprite[sprite][0] + self2._sprite[sprite][1]) / 1e3;
            sound2._sprite = sprite;
            sound2._ended = false;
            var setParams = function() {
              sound2._paused = false;
              sound2._seek = seek;
              sound2._start = start4;
              sound2._stop = stop2;
              sound2._loop = !!(sound2._loop || self2._sprite[sprite][2]);
            };
            if (seek >= stop2) {
              self2._ended(sound2);
              return;
            }
            var node = sound2._node;
            if (self2._webAudio) {
              var playWebAudio = function() {
                self2._playLock = false;
                setParams();
                self2._refreshBuffer(sound2);
                var vol = sound2._muted || self2._muted ? 0 : sound2._volume;
                node.gain.setValueAtTime(vol, Howler2.ctx.currentTime);
                sound2._playStart = Howler2.ctx.currentTime;
                if (typeof node.bufferSource.start === "undefined") {
                  sound2._loop ? node.bufferSource.noteGrainOn(0, seek, 86400) : node.bufferSource.noteGrainOn(0, seek, duration);
                } else {
                  sound2._loop ? node.bufferSource.start(0, seek, 86400) : node.bufferSource.start(0, seek, duration);
                }
                if (timeout !== Infinity) {
                  self2._endTimers[sound2._id] = setTimeout(self2._ended.bind(self2, sound2), timeout);
                }
                if (!internal) {
                  setTimeout(function() {
                    self2._emit("play", sound2._id);
                    self2._loadQueue();
                  }, 0);
                }
              };
              if (Howler2.state === "running" && Howler2.ctx.state !== "interrupted") {
                playWebAudio();
              } else {
                self2._playLock = true;
                self2.once("resume", playWebAudio);
                self2._clearTimer(sound2._id);
              }
            } else {
              var playHtml5 = function() {
                node.currentTime = seek;
                node.muted = sound2._muted || self2._muted || Howler2._muted || node.muted;
                node.volume = sound2._volume * Howler2.volume();
                node.playbackRate = sound2._rate;
                try {
                  var play = node.play();
                  if (play && typeof Promise !== "undefined" && (play instanceof Promise || typeof play.then === "function")) {
                    self2._playLock = true;
                    setParams();
                    play.then(function() {
                      self2._playLock = false;
                      node._unlocked = true;
                      if (!internal) {
                        self2._emit("play", sound2._id);
                      } else {
                        self2._loadQueue();
                      }
                    }).catch(function() {
                      self2._playLock = false;
                      self2._emit("playerror", sound2._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");
                      sound2._ended = true;
                      sound2._paused = true;
                    });
                  } else if (!internal) {
                    self2._playLock = false;
                    setParams();
                    self2._emit("play", sound2._id);
                  }
                  node.playbackRate = sound2._rate;
                  if (node.paused) {
                    self2._emit("playerror", sound2._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");
                    return;
                  }
                  if (sprite !== "__default" || sound2._loop) {
                    self2._endTimers[sound2._id] = setTimeout(self2._ended.bind(self2, sound2), timeout);
                  } else {
                    self2._endTimers[sound2._id] = function() {
                      self2._ended(sound2);
                      node.removeEventListener("ended", self2._endTimers[sound2._id], false);
                    };
                    node.addEventListener("ended", self2._endTimers[sound2._id], false);
                  }
                } catch (err) {
                  self2._emit("playerror", sound2._id, err);
                }
              };
              if (node.src === "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA") {
                node.src = self2._src;
                node.load();
              }
              var loadedNoReadyState = window && window.ejecta || !node.readyState && Howler2._navigator.isCocoonJS;
              if (node.readyState >= 3 || loadedNoReadyState) {
                playHtml5();
              } else {
                self2._playLock = true;
                self2._state = "loading";
                var listener = function() {
                  self2._state = "loaded";
                  playHtml5();
                  node.removeEventListener(Howler2._canPlayEvent, listener, false);
                };
                node.addEventListener(Howler2._canPlayEvent, listener, false);
                self2._clearTimer(sound2._id);
              }
            }
            return sound2._id;
          },
          /**
           * Pause playback and save current position.
           * @param  {Number} id The sound ID (empty to pause all in group).
           * @return {Howl}
           */
          pause: function(id) {
            var self2 = this;
            if (self2._state !== "loaded" || self2._playLock) {
              self2._queue.push({
                event: "pause",
                action: function() {
                  self2.pause(id);
                }
              });
              return self2;
            }
            var ids = self2._getSoundIds(id);
            for (var i = 0; i < ids.length; i++) {
              self2._clearTimer(ids[i]);
              var sound2 = self2._soundById(ids[i]);
              if (sound2 && !sound2._paused) {
                sound2._seek = self2.seek(ids[i]);
                sound2._rateSeek = 0;
                sound2._paused = true;
                self2._stopFade(ids[i]);
                if (sound2._node) {
                  if (self2._webAudio) {
                    if (!sound2._node.bufferSource) {
                      continue;
                    }
                    if (typeof sound2._node.bufferSource.stop === "undefined") {
                      sound2._node.bufferSource.noteOff(0);
                    } else {
                      sound2._node.bufferSource.stop(0);
                    }
                    self2._cleanBuffer(sound2._node);
                  } else if (!isNaN(sound2._node.duration) || sound2._node.duration === Infinity) {
                    sound2._node.pause();
                  }
                }
              }
              if (!arguments[1]) {
                self2._emit("pause", sound2 ? sound2._id : null);
              }
            }
            return self2;
          },
          /**
           * Stop playback and reset to start.
           * @param  {Number} id The sound ID (empty to stop all in group).
           * @param  {Boolean} internal Internal Use: true prevents event firing.
           * @return {Howl}
           */
          stop: function(id, internal) {
            var self2 = this;
            if (self2._state !== "loaded" || self2._playLock) {
              self2._queue.push({
                event: "stop",
                action: function() {
                  self2.stop(id);
                }
              });
              return self2;
            }
            var ids = self2._getSoundIds(id);
            for (var i = 0; i < ids.length; i++) {
              self2._clearTimer(ids[i]);
              var sound2 = self2._soundById(ids[i]);
              if (sound2) {
                sound2._seek = sound2._start || 0;
                sound2._rateSeek = 0;
                sound2._paused = true;
                sound2._ended = true;
                self2._stopFade(ids[i]);
                if (sound2._node) {
                  if (self2._webAudio) {
                    if (sound2._node.bufferSource) {
                      if (typeof sound2._node.bufferSource.stop === "undefined") {
                        sound2._node.bufferSource.noteOff(0);
                      } else {
                        sound2._node.bufferSource.stop(0);
                      }
                      self2._cleanBuffer(sound2._node);
                    }
                  } else if (!isNaN(sound2._node.duration) || sound2._node.duration === Infinity) {
                    sound2._node.currentTime = sound2._start || 0;
                    sound2._node.pause();
                    if (sound2._node.duration === Infinity) {
                      self2._clearSound(sound2._node);
                    }
                  }
                }
                if (!internal) {
                  self2._emit("stop", sound2._id);
                }
              }
            }
            return self2;
          },
          /**
           * Mute/unmute a single sound or all sounds in this Howl group.
           * @param  {Boolean} muted Set to true to mute and false to unmute.
           * @param  {Number} id    The sound ID to update (omit to mute/unmute all).
           * @return {Howl}
           */
          mute: function(muted, id) {
            var self2 = this;
            if (self2._state !== "loaded" || self2._playLock) {
              self2._queue.push({
                event: "mute",
                action: function() {
                  self2.mute(muted, id);
                }
              });
              return self2;
            }
            if (typeof id === "undefined") {
              if (typeof muted === "boolean") {
                self2._muted = muted;
              } else {
                return self2._muted;
              }
            }
            var ids = self2._getSoundIds(id);
            for (var i = 0; i < ids.length; i++) {
              var sound2 = self2._soundById(ids[i]);
              if (sound2) {
                sound2._muted = muted;
                if (sound2._interval) {
                  self2._stopFade(sound2._id);
                }
                if (self2._webAudio && sound2._node) {
                  sound2._node.gain.setValueAtTime(muted ? 0 : sound2._volume, Howler2.ctx.currentTime);
                } else if (sound2._node) {
                  sound2._node.muted = Howler2._muted ? true : muted;
                }
                self2._emit("mute", sound2._id);
              }
            }
            return self2;
          },
          /**
           * Get/set the volume of this sound or of the Howl group. This method can optionally take 0, 1 or 2 arguments.
           *   volume() -> Returns the group's volume value.
           *   volume(id) -> Returns the sound id's current volume.
           *   volume(vol) -> Sets the volume of all sounds in this Howl group.
           *   volume(vol, id) -> Sets the volume of passed sound id.
           * @return {Howl/Number} Returns self or current volume.
           */
          volume: function() {
            var self2 = this;
            var args = arguments;
            var vol, id;
            if (args.length === 0) {
              return self2._volume;
            } else if (args.length === 1 || args.length === 2 && typeof args[1] === "undefined") {
              var ids = self2._getSoundIds();
              var index = ids.indexOf(args[0]);
              if (index >= 0) {
                id = parseInt(args[0], 10);
              } else {
                vol = parseFloat(args[0]);
              }
            } else if (args.length >= 2) {
              vol = parseFloat(args[0]);
              id = parseInt(args[1], 10);
            }
            var sound2;
            if (typeof vol !== "undefined" && vol >= 0 && vol <= 1) {
              if (self2._state !== "loaded" || self2._playLock) {
                self2._queue.push({
                  event: "volume",
                  action: function() {
                    self2.volume.apply(self2, args);
                  }
                });
                return self2;
              }
              if (typeof id === "undefined") {
                self2._volume = vol;
              }
              id = self2._getSoundIds(id);
              for (var i = 0; i < id.length; i++) {
                sound2 = self2._soundById(id[i]);
                if (sound2) {
                  sound2._volume = vol;
                  if (!args[2]) {
                    self2._stopFade(id[i]);
                  }
                  if (self2._webAudio && sound2._node && !sound2._muted) {
                    sound2._node.gain.setValueAtTime(vol, Howler2.ctx.currentTime);
                  } else if (sound2._node && !sound2._muted) {
                    sound2._node.volume = vol * Howler2.volume();
                  }
                  self2._emit("volume", sound2._id);
                }
              }
            } else {
              sound2 = id ? self2._soundById(id) : self2._sounds[0];
              return sound2 ? sound2._volume : 0;
            }
            return self2;
          },
          /**
           * Fade a currently playing sound between two volumes (if no id is passed, all sounds will fade).
           * @param  {Number} from The value to fade from (0.0 to 1.0).
           * @param  {Number} to   The volume to fade to (0.0 to 1.0).
           * @param  {Number} len  Time in milliseconds to fade.
           * @param  {Number} id   The sound id (omit to fade all sounds).
           * @return {Howl}
           */
          fade: function(from, to, len, id) {
            var self2 = this;
            if (self2._state !== "loaded" || self2._playLock) {
              self2._queue.push({
                event: "fade",
                action: function() {
                  self2.fade(from, to, len, id);
                }
              });
              return self2;
            }
            from = Math.min(Math.max(0, parseFloat(from)), 1);
            to = Math.min(Math.max(0, parseFloat(to)), 1);
            len = parseFloat(len);
            self2.volume(from, id);
            var ids = self2._getSoundIds(id);
            for (var i = 0; i < ids.length; i++) {
              var sound2 = self2._soundById(ids[i]);
              if (sound2) {
                if (!id) {
                  self2._stopFade(ids[i]);
                }
                if (self2._webAudio && !sound2._muted) {
                  var currentTime = Howler2.ctx.currentTime;
                  var end3 = currentTime + len / 1e3;
                  sound2._volume = from;
                  sound2._node.gain.setValueAtTime(from, currentTime);
                  sound2._node.gain.linearRampToValueAtTime(to, end3);
                }
                self2._startFadeInterval(sound2, from, to, len, ids[i], typeof id === "undefined");
              }
            }
            return self2;
          },
          /**
           * Starts the internal interval to fade a sound.
           * @param  {Object} sound Reference to sound to fade.
           * @param  {Number} from The value to fade from (0.0 to 1.0).
           * @param  {Number} to   The volume to fade to (0.0 to 1.0).
           * @param  {Number} len  Time in milliseconds to fade.
           * @param  {Number} id   The sound id to fade.
           * @param  {Boolean} isGroup   If true, set the volume on the group.
           */
          _startFadeInterval: function(sound2, from, to, len, id, isGroup) {
            var self2 = this;
            var vol = from;
            var diff2 = to - from;
            var steps = Math.abs(diff2 / 0.01);
            var stepLen = Math.max(4, steps > 0 ? len / steps : len);
            var lastTick = Date.now();
            sound2._fadeTo = to;
            sound2._interval = setInterval(function() {
              var tick = (Date.now() - lastTick) / len;
              lastTick = Date.now();
              vol += diff2 * tick;
              vol = Math.round(vol * 100) / 100;
              if (diff2 < 0) {
                vol = Math.max(to, vol);
              } else {
                vol = Math.min(to, vol);
              }
              if (self2._webAudio) {
                sound2._volume = vol;
              } else {
                self2.volume(vol, sound2._id, true);
              }
              if (isGroup) {
                self2._volume = vol;
              }
              if (to < from && vol <= to || to > from && vol >= to) {
                clearInterval(sound2._interval);
                sound2._interval = null;
                sound2._fadeTo = null;
                self2.volume(to, sound2._id);
                self2._emit("fade", sound2._id);
              }
            }, stepLen);
          },
          /**
           * Internal method that stops the currently playing fade when
           * a new fade starts, volume is changed or the sound is stopped.
           * @param  {Number} id The sound id.
           * @return {Howl}
           */
          _stopFade: function(id) {
            var self2 = this;
            var sound2 = self2._soundById(id);
            if (sound2 && sound2._interval) {
              if (self2._webAudio) {
                sound2._node.gain.cancelScheduledValues(Howler2.ctx.currentTime);
              }
              clearInterval(sound2._interval);
              sound2._interval = null;
              self2.volume(sound2._fadeTo, id);
              sound2._fadeTo = null;
              self2._emit("fade", id);
            }
            return self2;
          },
          /**
           * Get/set the loop parameter on a sound. This method can optionally take 0, 1 or 2 arguments.
           *   loop() -> Returns the group's loop value.
           *   loop(id) -> Returns the sound id's loop value.
           *   loop(loop) -> Sets the loop value for all sounds in this Howl group.
           *   loop(loop, id) -> Sets the loop value of passed sound id.
           * @return {Howl/Boolean} Returns self or current loop value.
           */
          loop: function() {
            var self2 = this;
            var args = arguments;
            var loop, id, sound2;
            if (args.length === 0) {
              return self2._loop;
            } else if (args.length === 1) {
              if (typeof args[0] === "boolean") {
                loop = args[0];
                self2._loop = loop;
              } else {
                sound2 = self2._soundById(parseInt(args[0], 10));
                return sound2 ? sound2._loop : false;
              }
            } else if (args.length === 2) {
              loop = args[0];
              id = parseInt(args[1], 10);
            }
            var ids = self2._getSoundIds(id);
            for (var i = 0; i < ids.length; i++) {
              sound2 = self2._soundById(ids[i]);
              if (sound2) {
                sound2._loop = loop;
                if (self2._webAudio && sound2._node && sound2._node.bufferSource) {
                  sound2._node.bufferSource.loop = loop;
                  if (loop) {
                    sound2._node.bufferSource.loopStart = sound2._start || 0;
                    sound2._node.bufferSource.loopEnd = sound2._stop;
                    if (self2.playing(ids[i])) {
                      self2.pause(ids[i], true);
                      self2.play(ids[i], true);
                    }
                  }
                }
              }
            }
            return self2;
          },
          /**
           * Get/set the playback rate of a sound. This method can optionally take 0, 1 or 2 arguments.
           *   rate() -> Returns the first sound node's current playback rate.
           *   rate(id) -> Returns the sound id's current playback rate.
           *   rate(rate) -> Sets the playback rate of all sounds in this Howl group.
           *   rate(rate, id) -> Sets the playback rate of passed sound id.
           * @return {Howl/Number} Returns self or the current playback rate.
           */
          rate: function() {
            var self2 = this;
            var args = arguments;
            var rate, id;
            if (args.length === 0) {
              id = self2._sounds[0]._id;
            } else if (args.length === 1) {
              var ids = self2._getSoundIds();
              var index = ids.indexOf(args[0]);
              if (index >= 0) {
                id = parseInt(args[0], 10);
              } else {
                rate = parseFloat(args[0]);
              }
            } else if (args.length === 2) {
              rate = parseFloat(args[0]);
              id = parseInt(args[1], 10);
            }
            var sound2;
            if (typeof rate === "number") {
              if (self2._state !== "loaded" || self2._playLock) {
                self2._queue.push({
                  event: "rate",
                  action: function() {
                    self2.rate.apply(self2, args);
                  }
                });
                return self2;
              }
              if (typeof id === "undefined") {
                self2._rate = rate;
              }
              id = self2._getSoundIds(id);
              for (var i = 0; i < id.length; i++) {
                sound2 = self2._soundById(id[i]);
                if (sound2) {
                  if (self2.playing(id[i])) {
                    sound2._rateSeek = self2.seek(id[i]);
                    sound2._playStart = self2._webAudio ? Howler2.ctx.currentTime : sound2._playStart;
                  }
                  sound2._rate = rate;
                  if (self2._webAudio && sound2._node && sound2._node.bufferSource) {
                    sound2._node.bufferSource.playbackRate.setValueAtTime(rate, Howler2.ctx.currentTime);
                  } else if (sound2._node) {
                    sound2._node.playbackRate = rate;
                  }
                  var seek = self2.seek(id[i]);
                  var duration = (self2._sprite[sound2._sprite][0] + self2._sprite[sound2._sprite][1]) / 1e3 - seek;
                  var timeout = duration * 1e3 / Math.abs(sound2._rate);
                  if (self2._endTimers[id[i]] || !sound2._paused) {
                    self2._clearTimer(id[i]);
                    self2._endTimers[id[i]] = setTimeout(self2._ended.bind(self2, sound2), timeout);
                  }
                  self2._emit("rate", sound2._id);
                }
              }
            } else {
              sound2 = self2._soundById(id);
              return sound2 ? sound2._rate : self2._rate;
            }
            return self2;
          },
          /**
           * Get/set the seek position of a sound. This method can optionally take 0, 1 or 2 arguments.
           *   seek() -> Returns the first sound node's current seek position.
           *   seek(id) -> Returns the sound id's current seek position.
           *   seek(seek) -> Sets the seek position of the first sound node.
           *   seek(seek, id) -> Sets the seek position of passed sound id.
           * @return {Howl/Number} Returns self or the current seek position.
           */
          seek: function() {
            var self2 = this;
            var args = arguments;
            var seek, id;
            if (args.length === 0) {
              if (self2._sounds.length) {
                id = self2._sounds[0]._id;
              }
            } else if (args.length === 1) {
              var ids = self2._getSoundIds();
              var index = ids.indexOf(args[0]);
              if (index >= 0) {
                id = parseInt(args[0], 10);
              } else if (self2._sounds.length) {
                id = self2._sounds[0]._id;
                seek = parseFloat(args[0]);
              }
            } else if (args.length === 2) {
              seek = parseFloat(args[0]);
              id = parseInt(args[1], 10);
            }
            if (typeof id === "undefined") {
              return 0;
            }
            if (typeof seek === "number" && (self2._state !== "loaded" || self2._playLock)) {
              self2._queue.push({
                event: "seek",
                action: function() {
                  self2.seek.apply(self2, args);
                }
              });
              return self2;
            }
            var sound2 = self2._soundById(id);
            if (sound2) {
              if (typeof seek === "number" && seek >= 0) {
                var playing = self2.playing(id);
                if (playing) {
                  self2.pause(id, true);
                }
                sound2._seek = seek;
                sound2._ended = false;
                self2._clearTimer(id);
                if (!self2._webAudio && sound2._node && !isNaN(sound2._node.duration)) {
                  sound2._node.currentTime = seek;
                }
                var seekAndEmit = function() {
                  if (playing) {
                    self2.play(id, true);
                  }
                  self2._emit("seek", id);
                };
                if (playing && !self2._webAudio) {
                  var emitSeek = function() {
                    if (!self2._playLock) {
                      seekAndEmit();
                    } else {
                      setTimeout(emitSeek, 0);
                    }
                  };
                  setTimeout(emitSeek, 0);
                } else {
                  seekAndEmit();
                }
              } else {
                if (self2._webAudio) {
                  var realTime = self2.playing(id) ? Howler2.ctx.currentTime - sound2._playStart : 0;
                  var rateSeek = sound2._rateSeek ? sound2._rateSeek - sound2._seek : 0;
                  return sound2._seek + (rateSeek + realTime * Math.abs(sound2._rate));
                } else {
                  return sound2._node.currentTime;
                }
              }
            }
            return self2;
          },
          /**
           * Check if a specific sound is currently playing or not (if id is provided), or check if at least one of the sounds in the group is playing or not.
           * @param  {Number}  id The sound id to check. If none is passed, the whole sound group is checked.
           * @return {Boolean} True if playing and false if not.
           */
          playing: function(id) {
            var self2 = this;
            if (typeof id === "number") {
              var sound2 = self2._soundById(id);
              return sound2 ? !sound2._paused : false;
            }
            for (var i = 0; i < self2._sounds.length; i++) {
              if (!self2._sounds[i]._paused) {
                return true;
              }
            }
            return false;
          },
          /**
           * Get the duration of this sound. Passing a sound id will return the sprite duration.
           * @param  {Number} id The sound id to check. If none is passed, return full source duration.
           * @return {Number} Audio duration in seconds.
           */
          duration: function(id) {
            var self2 = this;
            var duration = self2._duration;
            var sound2 = self2._soundById(id);
            if (sound2) {
              duration = self2._sprite[sound2._sprite][1] / 1e3;
            }
            return duration;
          },
          /**
           * Returns the current loaded state of this Howl.
           * @return {String} 'unloaded', 'loading', 'loaded'
           */
          state: function() {
            return this._state;
          },
          /**
           * Unload and destroy the current Howl object.
           * This will immediately stop all sound instances attached to this group.
           */
          unload: function() {
            var self2 = this;
            var sounds = self2._sounds;
            for (var i = 0; i < sounds.length; i++) {
              if (!sounds[i]._paused) {
                self2.stop(sounds[i]._id);
              }
              if (!self2._webAudio) {
                self2._clearSound(sounds[i]._node);
                sounds[i]._node.removeEventListener("error", sounds[i]._errorFn, false);
                sounds[i]._node.removeEventListener(Howler2._canPlayEvent, sounds[i]._loadFn, false);
                sounds[i]._node.removeEventListener("ended", sounds[i]._endFn, false);
                Howler2._releaseHtml5Audio(sounds[i]._node);
              }
              delete sounds[i]._node;
              self2._clearTimer(sounds[i]._id);
            }
            var index = Howler2._howls.indexOf(self2);
            if (index >= 0) {
              Howler2._howls.splice(index, 1);
            }
            var remCache = true;
            for (i = 0; i < Howler2._howls.length; i++) {
              if (Howler2._howls[i]._src === self2._src || self2._src.indexOf(Howler2._howls[i]._src) >= 0) {
                remCache = false;
                break;
              }
            }
            if (cache && remCache) {
              delete cache[self2._src];
            }
            Howler2.noAudio = false;
            self2._state = "unloaded";
            self2._sounds = [];
            self2 = null;
            return null;
          },
          /**
           * Listen to a custom event.
           * @param  {String}   event Event name.
           * @param  {Function} fn    Listener to call.
           * @param  {Number}   id    (optional) Only listen to events for this sound.
           * @param  {Number}   once  (INTERNAL) Marks event to fire only once.
           * @return {Howl}
           */
          on: function(event, fn, id, once) {
            var self2 = this;
            var events = self2["_on" + event];
            if (typeof fn === "function") {
              events.push(once ? { id, fn, once } : { id, fn });
            }
            return self2;
          },
          /**
           * Remove a custom event. Call without parameters to remove all events.
           * @param  {String}   event Event name.
           * @param  {Function} fn    Listener to remove. Leave empty to remove all.
           * @param  {Number}   id    (optional) Only remove events for this sound.
           * @return {Howl}
           */
          off: function(event, fn, id) {
            var self2 = this;
            var events = self2["_on" + event];
            var i = 0;
            if (typeof fn === "number") {
              id = fn;
              fn = null;
            }
            if (fn || id) {
              for (i = 0; i < events.length; i++) {
                var isId = id === events[i].id;
                if (fn === events[i].fn && isId || !fn && isId) {
                  events.splice(i, 1);
                  break;
                }
              }
            } else if (event) {
              self2["_on" + event] = [];
            } else {
              var keys = Object.keys(self2);
              for (i = 0; i < keys.length; i++) {
                if (keys[i].indexOf("_on") === 0 && Array.isArray(self2[keys[i]])) {
                  self2[keys[i]] = [];
                }
              }
            }
            return self2;
          },
          /**
           * Listen to a custom event and remove it once fired.
           * @param  {String}   event Event name.
           * @param  {Function} fn    Listener to call.
           * @param  {Number}   id    (optional) Only listen to events for this sound.
           * @return {Howl}
           */
          once: function(event, fn, id) {
            var self2 = this;
            self2.on(event, fn, id, 1);
            return self2;
          },
          /**
           * Emit all events of a specific type and pass the sound id.
           * @param  {String} event Event name.
           * @param  {Number} id    Sound ID.
           * @param  {Number} msg   Message to go with event.
           * @return {Howl}
           */
          _emit: function(event, id, msg) {
            var self2 = this;
            var events = self2["_on" + event];
            for (var i = events.length - 1; i >= 0; i--) {
              if (!events[i].id || events[i].id === id || event === "load") {
                setTimeout(function(fn) {
                  fn.call(this, id, msg);
                }.bind(self2, events[i].fn), 0);
                if (events[i].once) {
                  self2.off(event, events[i].fn, events[i].id);
                }
              }
            }
            self2._loadQueue(event);
            return self2;
          },
          /**
           * Queue of actions initiated before the sound has loaded.
           * These will be called in sequence, with the next only firing
           * after the previous has finished executing (even if async like play).
           * @return {Howl}
           */
          _loadQueue: function(event) {
            var self2 = this;
            if (self2._queue.length > 0) {
              var task = self2._queue[0];
              if (task.event === event) {
                self2._queue.shift();
                self2._loadQueue();
              }
              if (!event) {
                task.action();
              }
            }
            return self2;
          },
          /**
           * Fired when playback ends at the end of the duration.
           * @param  {Sound} sound The sound object to work with.
           * @return {Howl}
           */
          _ended: function(sound2) {
            var self2 = this;
            var sprite = sound2._sprite;
            if (!self2._webAudio && sound2._node && !sound2._node.paused && !sound2._node.ended && sound2._node.currentTime < sound2._stop) {
              setTimeout(self2._ended.bind(self2, sound2), 100);
              return self2;
            }
            var loop = !!(sound2._loop || self2._sprite[sprite][2]);
            self2._emit("end", sound2._id);
            if (!self2._webAudio && loop) {
              self2.stop(sound2._id, true).play(sound2._id);
            }
            if (self2._webAudio && loop) {
              self2._emit("play", sound2._id);
              sound2._seek = sound2._start || 0;
              sound2._rateSeek = 0;
              sound2._playStart = Howler2.ctx.currentTime;
              var timeout = (sound2._stop - sound2._start) * 1e3 / Math.abs(sound2._rate);
              self2._endTimers[sound2._id] = setTimeout(self2._ended.bind(self2, sound2), timeout);
            }
            if (self2._webAudio && !loop) {
              sound2._paused = true;
              sound2._ended = true;
              sound2._seek = sound2._start || 0;
              sound2._rateSeek = 0;
              self2._clearTimer(sound2._id);
              self2._cleanBuffer(sound2._node);
              Howler2._autoSuspend();
            }
            if (!self2._webAudio && !loop) {
              self2.stop(sound2._id, true);
            }
            return self2;
          },
          /**
           * Clear the end timer for a sound playback.
           * @param  {Number} id The sound ID.
           * @return {Howl}
           */
          _clearTimer: function(id) {
            var self2 = this;
            if (self2._endTimers[id]) {
              if (typeof self2._endTimers[id] !== "function") {
                clearTimeout(self2._endTimers[id]);
              } else {
                var sound2 = self2._soundById(id);
                if (sound2 && sound2._node) {
                  sound2._node.removeEventListener("ended", self2._endTimers[id], false);
                }
              }
              delete self2._endTimers[id];
            }
            return self2;
          },
          /**
           * Return the sound identified by this ID, or return null.
           * @param  {Number} id Sound ID
           * @return {Object}    Sound object or null.
           */
          _soundById: function(id) {
            var self2 = this;
            for (var i = 0; i < self2._sounds.length; i++) {
              if (id === self2._sounds[i]._id) {
                return self2._sounds[i];
              }
            }
            return null;
          },
          /**
           * Return an inactive sound from the pool or create a new one.
           * @return {Sound} Sound playback object.
           */
          _inactiveSound: function() {
            var self2 = this;
            self2._drain();
            for (var i = 0; i < self2._sounds.length; i++) {
              if (self2._sounds[i]._ended) {
                return self2._sounds[i].reset();
              }
            }
            return new Sound2(self2);
          },
          /**
           * Drain excess inactive sounds from the pool.
           */
          _drain: function() {
            var self2 = this;
            var limit = self2._pool;
            var cnt = 0;
            var i = 0;
            if (self2._sounds.length < limit) {
              return;
            }
            for (i = 0; i < self2._sounds.length; i++) {
              if (self2._sounds[i]._ended) {
                cnt++;
              }
            }
            for (i = self2._sounds.length - 1; i >= 0; i--) {
              if (cnt <= limit) {
                return;
              }
              if (self2._sounds[i]._ended) {
                if (self2._webAudio && self2._sounds[i]._node) {
                  self2._sounds[i]._node.disconnect(0);
                }
                self2._sounds.splice(i, 1);
                cnt--;
              }
            }
          },
          /**
           * Get all ID's from the sounds pool.
           * @param  {Number} id Only return one ID if one is passed.
           * @return {Array}    Array of IDs.
           */
          _getSoundIds: function(id) {
            var self2 = this;
            if (typeof id === "undefined") {
              var ids = [];
              for (var i = 0; i < self2._sounds.length; i++) {
                ids.push(self2._sounds[i]._id);
              }
              return ids;
            } else {
              return [id];
            }
          },
          /**
           * Load the sound back into the buffer source.
           * @param  {Sound} sound The sound object to work with.
           * @return {Howl}
           */
          _refreshBuffer: function(sound2) {
            var self2 = this;
            sound2._node.bufferSource = Howler2.ctx.createBufferSource();
            sound2._node.bufferSource.buffer = cache[self2._src];
            if (sound2._panner) {
              sound2._node.bufferSource.connect(sound2._panner);
            } else {
              sound2._node.bufferSource.connect(sound2._node);
            }
            sound2._node.bufferSource.loop = sound2._loop;
            if (sound2._loop) {
              sound2._node.bufferSource.loopStart = sound2._start || 0;
              sound2._node.bufferSource.loopEnd = sound2._stop || 0;
            }
            sound2._node.bufferSource.playbackRate.setValueAtTime(sound2._rate, Howler2.ctx.currentTime);
            return self2;
          },
          /**
           * Prevent memory leaks by cleaning up the buffer source after playback.
           * @param  {Object} node Sound's audio node containing the buffer source.
           * @return {Howl}
           */
          _cleanBuffer: function(node) {
            var self2 = this;
            var isIOS = Howler2._navigator && Howler2._navigator.vendor.indexOf("Apple") >= 0;
            if (Howler2._scratchBuffer && node.bufferSource) {
              node.bufferSource.onended = null;
              node.bufferSource.disconnect(0);
              if (isIOS) {
                try {
                  node.bufferSource.buffer = Howler2._scratchBuffer;
                } catch (e) {
                }
              }
            }
            node.bufferSource = null;
            return self2;
          },
          /**
           * Set the source to a 0-second silence to stop any downloading (except in IE).
           * @param  {Object} node Audio node to clear.
           */
          _clearSound: function(node) {
            var checkIE = /MSIE |Trident\//.test(Howler2._navigator && Howler2._navigator.userAgent);
            if (!checkIE) {
              node.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
            }
          }
        };
        var Sound2 = function(howl) {
          this._parent = howl;
          this.init();
        };
        Sound2.prototype = {
          /**
           * Initialize a new Sound object.
           * @return {Sound}
           */
          init: function() {
            var self2 = this;
            var parent = self2._parent;
            self2._muted = parent._muted;
            self2._loop = parent._loop;
            self2._volume = parent._volume;
            self2._rate = parent._rate;
            self2._seek = 0;
            self2._paused = true;
            self2._ended = true;
            self2._sprite = "__default";
            self2._id = ++Howler2._counter;
            parent._sounds.push(self2);
            self2.create();
            return self2;
          },
          /**
           * Create and setup a new sound object, whether HTML5 Audio or Web Audio.
           * @return {Sound}
           */
          create: function() {
            var self2 = this;
            var parent = self2._parent;
            var volume = Howler2._muted || self2._muted || self2._parent._muted ? 0 : self2._volume;
            if (parent._webAudio) {
              self2._node = typeof Howler2.ctx.createGain === "undefined" ? Howler2.ctx.createGainNode() : Howler2.ctx.createGain();
              self2._node.gain.setValueAtTime(volume, Howler2.ctx.currentTime);
              self2._node.paused = true;
              self2._node.connect(Howler2.masterGain);
            } else if (!Howler2.noAudio) {
              self2._node = Howler2._obtainHtml5Audio();
              self2._errorFn = self2._errorListener.bind(self2);
              self2._node.addEventListener("error", self2._errorFn, false);
              self2._loadFn = self2._loadListener.bind(self2);
              self2._node.addEventListener(Howler2._canPlayEvent, self2._loadFn, false);
              self2._endFn = self2._endListener.bind(self2);
              self2._node.addEventListener("ended", self2._endFn, false);
              self2._node.src = parent._src;
              self2._node.preload = parent._preload === true ? "auto" : parent._preload;
              self2._node.volume = volume * Howler2.volume();
              self2._node.load();
            }
            return self2;
          },
          /**
           * Reset the parameters of this sound to the original state (for recycle).
           * @return {Sound}
           */
          reset: function() {
            var self2 = this;
            var parent = self2._parent;
            self2._muted = parent._muted;
            self2._loop = parent._loop;
            self2._volume = parent._volume;
            self2._rate = parent._rate;
            self2._seek = 0;
            self2._rateSeek = 0;
            self2._paused = true;
            self2._ended = true;
            self2._sprite = "__default";
            self2._id = ++Howler2._counter;
            return self2;
          },
          /**
           * HTML5 Audio error listener callback.
           */
          _errorListener: function() {
            var self2 = this;
            self2._parent._emit("loaderror", self2._id, self2._node.error ? self2._node.error.code : 0);
            self2._node.removeEventListener("error", self2._errorFn, false);
          },
          /**
           * HTML5 Audio canplaythrough listener callback.
           */
          _loadListener: function() {
            var self2 = this;
            var parent = self2._parent;
            parent._duration = Math.ceil(self2._node.duration * 10) / 10;
            if (Object.keys(parent._sprite).length === 0) {
              parent._sprite = { __default: [0, parent._duration * 1e3] };
            }
            if (parent._state !== "loaded") {
              parent._state = "loaded";
              parent._emit("load");
              parent._loadQueue();
            }
            self2._node.removeEventListener(Howler2._canPlayEvent, self2._loadFn, false);
          },
          /**
           * HTML5 Audio ended listener callback.
           */
          _endListener: function() {
            var self2 = this;
            var parent = self2._parent;
            if (parent._duration === Infinity) {
              parent._duration = Math.ceil(self2._node.duration * 10) / 10;
              if (parent._sprite.__default[1] === Infinity) {
                parent._sprite.__default[1] = parent._duration * 1e3;
              }
              parent._ended(self2);
            }
            self2._node.removeEventListener("ended", self2._endFn, false);
          }
        };
        var cache = {};
        var loadBuffer = function(self2) {
          var url = self2._src;
          if (cache[url]) {
            self2._duration = cache[url].duration;
            loadSound(self2);
            return;
          }
          if (/^data:[^;]+;base64,/.test(url)) {
            var data = atob(url.split(",")[1]);
            var dataView = new Uint8Array(data.length);
            for (var i = 0; i < data.length; ++i) {
              dataView[i] = data.charCodeAt(i);
            }
            decodeAudioData(dataView.buffer, self2);
          } else {
            var xhr = new XMLHttpRequest();
            xhr.open(self2._xhr.method, url, true);
            xhr.withCredentials = self2._xhr.withCredentials;
            xhr.responseType = "arraybuffer";
            if (self2._xhr.headers) {
              Object.keys(self2._xhr.headers).forEach(function(key) {
                xhr.setRequestHeader(key, self2._xhr.headers[key]);
              });
            }
            xhr.onload = function() {
              var code = (xhr.status + "")[0];
              if (code !== "0" && code !== "2" && code !== "3") {
                self2._emit("loaderror", null, "Failed loading audio file with status: " + xhr.status + ".");
                return;
              }
              decodeAudioData(xhr.response, self2);
            };
            xhr.onerror = function() {
              if (self2._webAudio) {
                self2._html5 = true;
                self2._webAudio = false;
                self2._sounds = [];
                delete cache[url];
                self2.load();
              }
            };
            safeXhrSend(xhr);
          }
        };
        var safeXhrSend = function(xhr) {
          try {
            xhr.send();
          } catch (e) {
            xhr.onerror();
          }
        };
        var decodeAudioData = function(arraybuffer, self2) {
          var error = function() {
            self2._emit("loaderror", null, "Decoding audio data failed.");
          };
          var success = function(buffer) {
            if (buffer && self2._sounds.length > 0) {
              cache[self2._src] = buffer;
              loadSound(self2, buffer);
            } else {
              error();
            }
          };
          if (typeof Promise !== "undefined" && Howler2.ctx.decodeAudioData.length === 1) {
            Howler2.ctx.decodeAudioData(arraybuffer).then(success).catch(error);
          } else {
            Howler2.ctx.decodeAudioData(arraybuffer, success, error);
          }
        };
        var loadSound = function(self2, buffer) {
          if (buffer && !self2._duration) {
            self2._duration = buffer.duration;
          }
          if (Object.keys(self2._sprite).length === 0) {
            self2._sprite = { __default: [0, self2._duration * 1e3] };
          }
          if (self2._state !== "loaded") {
            self2._state = "loaded";
            self2._emit("load");
            self2._loadQueue();
          }
        };
        var setupAudioContext = function() {
          if (!Howler2.usingWebAudio) {
            return;
          }
          try {
            if (typeof AudioContext !== "undefined") {
              Howler2.ctx = new AudioContext();
            } else if (typeof webkitAudioContext !== "undefined") {
              Howler2.ctx = new webkitAudioContext();
            } else {
              Howler2.usingWebAudio = false;
            }
          } catch (e) {
            Howler2.usingWebAudio = false;
          }
          if (!Howler2.ctx) {
            Howler2.usingWebAudio = false;
          }
          var iOS = /iP(hone|od|ad)/.test(Howler2._navigator && Howler2._navigator.platform);
          var appVersion = Howler2._navigator && Howler2._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
          var version = appVersion ? parseInt(appVersion[1], 10) : null;
          if (iOS && version && version < 9) {
            var safari = /safari/.test(Howler2._navigator && Howler2._navigator.userAgent.toLowerCase());
            if (Howler2._navigator && !safari) {
              Howler2.usingWebAudio = false;
            }
          }
          if (Howler2.usingWebAudio) {
            Howler2.masterGain = typeof Howler2.ctx.createGain === "undefined" ? Howler2.ctx.createGainNode() : Howler2.ctx.createGain();
            Howler2.masterGain.gain.setValueAtTime(Howler2._muted ? 0 : Howler2._volume, Howler2.ctx.currentTime);
            Howler2.masterGain.connect(Howler2.ctx.destination);
          }
          Howler2._setup();
        };
        if (typeof define === "function" && define.amd) {
          define([], function() {
            return {
              Howler: Howler2,
              Howl: Howl3
            };
          });
        }
        if (typeof exports !== "undefined") {
          exports.Howler = Howler2;
          exports.Howl = Howl3;
        }
        if (typeof global !== "undefined") {
          global.HowlerGlobal = HowlerGlobal2;
          global.Howler = Howler2;
          global.Howl = Howl3;
          global.Sound = Sound2;
        } else if (typeof window !== "undefined") {
          window.HowlerGlobal = HowlerGlobal2;
          window.Howler = Howler2;
          window.Howl = Howl3;
          window.Sound = Sound2;
        }
      })();
      (function() {
        "use strict";
        HowlerGlobal.prototype._pos = [0, 0, 0];
        HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0];
        HowlerGlobal.prototype.stereo = function(pan) {
          var self2 = this;
          if (!self2.ctx || !self2.ctx.listener) {
            return self2;
          }
          for (var i = self2._howls.length - 1; i >= 0; i--) {
            self2._howls[i].stereo(pan);
          }
          return self2;
        };
        HowlerGlobal.prototype.pos = function(x, y, z) {
          var self2 = this;
          if (!self2.ctx || !self2.ctx.listener) {
            return self2;
          }
          y = typeof y !== "number" ? self2._pos[1] : y;
          z = typeof z !== "number" ? self2._pos[2] : z;
          if (typeof x === "number") {
            self2._pos = [x, y, z];
            if (typeof self2.ctx.listener.positionX !== "undefined") {
              self2.ctx.listener.positionX.setTargetAtTime(self2._pos[0], Howler.ctx.currentTime, 0.1);
              self2.ctx.listener.positionY.setTargetAtTime(self2._pos[1], Howler.ctx.currentTime, 0.1);
              self2.ctx.listener.positionZ.setTargetAtTime(self2._pos[2], Howler.ctx.currentTime, 0.1);
            } else {
              self2.ctx.listener.setPosition(self2._pos[0], self2._pos[1], self2._pos[2]);
            }
          } else {
            return self2._pos;
          }
          return self2;
        };
        HowlerGlobal.prototype.orientation = function(x, y, z, xUp, yUp, zUp) {
          var self2 = this;
          if (!self2.ctx || !self2.ctx.listener) {
            return self2;
          }
          var or2 = self2._orientation;
          y = typeof y !== "number" ? or2[1] : y;
          z = typeof z !== "number" ? or2[2] : z;
          xUp = typeof xUp !== "number" ? or2[3] : xUp;
          yUp = typeof yUp !== "number" ? or2[4] : yUp;
          zUp = typeof zUp !== "number" ? or2[5] : zUp;
          if (typeof x === "number") {
            self2._orientation = [x, y, z, xUp, yUp, zUp];
            if (typeof self2.ctx.listener.forwardX !== "undefined") {
              self2.ctx.listener.forwardX.setTargetAtTime(x, Howler.ctx.currentTime, 0.1);
              self2.ctx.listener.forwardY.setTargetAtTime(y, Howler.ctx.currentTime, 0.1);
              self2.ctx.listener.forwardZ.setTargetAtTime(z, Howler.ctx.currentTime, 0.1);
              self2.ctx.listener.upX.setTargetAtTime(xUp, Howler.ctx.currentTime, 0.1);
              self2.ctx.listener.upY.setTargetAtTime(yUp, Howler.ctx.currentTime, 0.1);
              self2.ctx.listener.upZ.setTargetAtTime(zUp, Howler.ctx.currentTime, 0.1);
            } else {
              self2.ctx.listener.setOrientation(x, y, z, xUp, yUp, zUp);
            }
          } else {
            return or2;
          }
          return self2;
        };
        Howl.prototype.init = function(_super) {
          return function(o) {
            var self2 = this;
            self2._orientation = o.orientation || [1, 0, 0];
            self2._stereo = o.stereo || null;
            self2._pos = o.pos || null;
            self2._pannerAttr = {
              coneInnerAngle: typeof o.coneInnerAngle !== "undefined" ? o.coneInnerAngle : 360,
              coneOuterAngle: typeof o.coneOuterAngle !== "undefined" ? o.coneOuterAngle : 360,
              coneOuterGain: typeof o.coneOuterGain !== "undefined" ? o.coneOuterGain : 0,
              distanceModel: typeof o.distanceModel !== "undefined" ? o.distanceModel : "inverse",
              maxDistance: typeof o.maxDistance !== "undefined" ? o.maxDistance : 1e4,
              panningModel: typeof o.panningModel !== "undefined" ? o.panningModel : "HRTF",
              refDistance: typeof o.refDistance !== "undefined" ? o.refDistance : 1,
              rolloffFactor: typeof o.rolloffFactor !== "undefined" ? o.rolloffFactor : 1
            };
            self2._onstereo = o.onstereo ? [{ fn: o.onstereo }] : [];
            self2._onpos = o.onpos ? [{ fn: o.onpos }] : [];
            self2._onorientation = o.onorientation ? [{ fn: o.onorientation }] : [];
            return _super.call(this, o);
          };
        }(Howl.prototype.init);
        Howl.prototype.stereo = function(pan, id) {
          var self2 = this;
          if (!self2._webAudio) {
            return self2;
          }
          if (self2._state !== "loaded") {
            self2._queue.push({
              event: "stereo",
              action: function() {
                self2.stereo(pan, id);
              }
            });
            return self2;
          }
          var pannerType = typeof Howler.ctx.createStereoPanner === "undefined" ? "spatial" : "stereo";
          if (typeof id === "undefined") {
            if (typeof pan === "number") {
              self2._stereo = pan;
              self2._pos = [pan, 0, 0];
            } else {
              return self2._stereo;
            }
          }
          var ids = self2._getSoundIds(id);
          for (var i = 0; i < ids.length; i++) {
            var sound2 = self2._soundById(ids[i]);
            if (sound2) {
              if (typeof pan === "number") {
                sound2._stereo = pan;
                sound2._pos = [pan, 0, 0];
                if (sound2._node) {
                  sound2._pannerAttr.panningModel = "equalpower";
                  if (!sound2._panner || !sound2._panner.pan) {
                    setupPanner(sound2, pannerType);
                  }
                  if (pannerType === "spatial") {
                    if (typeof sound2._panner.positionX !== "undefined") {
                      sound2._panner.positionX.setValueAtTime(pan, Howler.ctx.currentTime);
                      sound2._panner.positionY.setValueAtTime(0, Howler.ctx.currentTime);
                      sound2._panner.positionZ.setValueAtTime(0, Howler.ctx.currentTime);
                    } else {
                      sound2._panner.setPosition(pan, 0, 0);
                    }
                  } else {
                    sound2._panner.pan.setValueAtTime(pan, Howler.ctx.currentTime);
                  }
                }
                self2._emit("stereo", sound2._id);
              } else {
                return sound2._stereo;
              }
            }
          }
          return self2;
        };
        Howl.prototype.pos = function(x, y, z, id) {
          var self2 = this;
          if (!self2._webAudio) {
            return self2;
          }
          if (self2._state !== "loaded") {
            self2._queue.push({
              event: "pos",
              action: function() {
                self2.pos(x, y, z, id);
              }
            });
            return self2;
          }
          y = typeof y !== "number" ? 0 : y;
          z = typeof z !== "number" ? -0.5 : z;
          if (typeof id === "undefined") {
            if (typeof x === "number") {
              self2._pos = [x, y, z];
            } else {
              return self2._pos;
            }
          }
          var ids = self2._getSoundIds(id);
          for (var i = 0; i < ids.length; i++) {
            var sound2 = self2._soundById(ids[i]);
            if (sound2) {
              if (typeof x === "number") {
                sound2._pos = [x, y, z];
                if (sound2._node) {
                  if (!sound2._panner || sound2._panner.pan) {
                    setupPanner(sound2, "spatial");
                  }
                  if (typeof sound2._panner.positionX !== "undefined") {
                    sound2._panner.positionX.setValueAtTime(x, Howler.ctx.currentTime);
                    sound2._panner.positionY.setValueAtTime(y, Howler.ctx.currentTime);
                    sound2._panner.positionZ.setValueAtTime(z, Howler.ctx.currentTime);
                  } else {
                    sound2._panner.setPosition(x, y, z);
                  }
                }
                self2._emit("pos", sound2._id);
              } else {
                return sound2._pos;
              }
            }
          }
          return self2;
        };
        Howl.prototype.orientation = function(x, y, z, id) {
          var self2 = this;
          if (!self2._webAudio) {
            return self2;
          }
          if (self2._state !== "loaded") {
            self2._queue.push({
              event: "orientation",
              action: function() {
                self2.orientation(x, y, z, id);
              }
            });
            return self2;
          }
          y = typeof y !== "number" ? self2._orientation[1] : y;
          z = typeof z !== "number" ? self2._orientation[2] : z;
          if (typeof id === "undefined") {
            if (typeof x === "number") {
              self2._orientation = [x, y, z];
            } else {
              return self2._orientation;
            }
          }
          var ids = self2._getSoundIds(id);
          for (var i = 0; i < ids.length; i++) {
            var sound2 = self2._soundById(ids[i]);
            if (sound2) {
              if (typeof x === "number") {
                sound2._orientation = [x, y, z];
                if (sound2._node) {
                  if (!sound2._panner) {
                    if (!sound2._pos) {
                      sound2._pos = self2._pos || [0, 0, -0.5];
                    }
                    setupPanner(sound2, "spatial");
                  }
                  if (typeof sound2._panner.orientationX !== "undefined") {
                    sound2._panner.orientationX.setValueAtTime(x, Howler.ctx.currentTime);
                    sound2._panner.orientationY.setValueAtTime(y, Howler.ctx.currentTime);
                    sound2._panner.orientationZ.setValueAtTime(z, Howler.ctx.currentTime);
                  } else {
                    sound2._panner.setOrientation(x, y, z);
                  }
                }
                self2._emit("orientation", sound2._id);
              } else {
                return sound2._orientation;
              }
            }
          }
          return self2;
        };
        Howl.prototype.pannerAttr = function() {
          var self2 = this;
          var args = arguments;
          var o, id, sound2;
          if (!self2._webAudio) {
            return self2;
          }
          if (args.length === 0) {
            return self2._pannerAttr;
          } else if (args.length === 1) {
            if (typeof args[0] === "object") {
              o = args[0];
              if (typeof id === "undefined") {
                if (!o.pannerAttr) {
                  o.pannerAttr = {
                    coneInnerAngle: o.coneInnerAngle,
                    coneOuterAngle: o.coneOuterAngle,
                    coneOuterGain: o.coneOuterGain,
                    distanceModel: o.distanceModel,
                    maxDistance: o.maxDistance,
                    refDistance: o.refDistance,
                    rolloffFactor: o.rolloffFactor,
                    panningModel: o.panningModel
                  };
                }
                self2._pannerAttr = {
                  coneInnerAngle: typeof o.pannerAttr.coneInnerAngle !== "undefined" ? o.pannerAttr.coneInnerAngle : self2._coneInnerAngle,
                  coneOuterAngle: typeof o.pannerAttr.coneOuterAngle !== "undefined" ? o.pannerAttr.coneOuterAngle : self2._coneOuterAngle,
                  coneOuterGain: typeof o.pannerAttr.coneOuterGain !== "undefined" ? o.pannerAttr.coneOuterGain : self2._coneOuterGain,
                  distanceModel: typeof o.pannerAttr.distanceModel !== "undefined" ? o.pannerAttr.distanceModel : self2._distanceModel,
                  maxDistance: typeof o.pannerAttr.maxDistance !== "undefined" ? o.pannerAttr.maxDistance : self2._maxDistance,
                  refDistance: typeof o.pannerAttr.refDistance !== "undefined" ? o.pannerAttr.refDistance : self2._refDistance,
                  rolloffFactor: typeof o.pannerAttr.rolloffFactor !== "undefined" ? o.pannerAttr.rolloffFactor : self2._rolloffFactor,
                  panningModel: typeof o.pannerAttr.panningModel !== "undefined" ? o.pannerAttr.panningModel : self2._panningModel
                };
              }
            } else {
              sound2 = self2._soundById(parseInt(args[0], 10));
              return sound2 ? sound2._pannerAttr : self2._pannerAttr;
            }
          } else if (args.length === 2) {
            o = args[0];
            id = parseInt(args[1], 10);
          }
          var ids = self2._getSoundIds(id);
          for (var i = 0; i < ids.length; i++) {
            sound2 = self2._soundById(ids[i]);
            if (sound2) {
              var pa = sound2._pannerAttr;
              pa = {
                coneInnerAngle: typeof o.coneInnerAngle !== "undefined" ? o.coneInnerAngle : pa.coneInnerAngle,
                coneOuterAngle: typeof o.coneOuterAngle !== "undefined" ? o.coneOuterAngle : pa.coneOuterAngle,
                coneOuterGain: typeof o.coneOuterGain !== "undefined" ? o.coneOuterGain : pa.coneOuterGain,
                distanceModel: typeof o.distanceModel !== "undefined" ? o.distanceModel : pa.distanceModel,
                maxDistance: typeof o.maxDistance !== "undefined" ? o.maxDistance : pa.maxDistance,
                refDistance: typeof o.refDistance !== "undefined" ? o.refDistance : pa.refDistance,
                rolloffFactor: typeof o.rolloffFactor !== "undefined" ? o.rolloffFactor : pa.rolloffFactor,
                panningModel: typeof o.panningModel !== "undefined" ? o.panningModel : pa.panningModel
              };
              var panner = sound2._panner;
              if (panner) {
                panner.coneInnerAngle = pa.coneInnerAngle;
                panner.coneOuterAngle = pa.coneOuterAngle;
                panner.coneOuterGain = pa.coneOuterGain;
                panner.distanceModel = pa.distanceModel;
                panner.maxDistance = pa.maxDistance;
                panner.refDistance = pa.refDistance;
                panner.rolloffFactor = pa.rolloffFactor;
                panner.panningModel = pa.panningModel;
              } else {
                if (!sound2._pos) {
                  sound2._pos = self2._pos || [0, 0, -0.5];
                }
                setupPanner(sound2, "spatial");
              }
            }
          }
          return self2;
        };
        Sound.prototype.init = function(_super) {
          return function() {
            var self2 = this;
            var parent = self2._parent;
            self2._orientation = parent._orientation;
            self2._stereo = parent._stereo;
            self2._pos = parent._pos;
            self2._pannerAttr = parent._pannerAttr;
            _super.call(this);
            if (self2._stereo) {
              parent.stereo(self2._stereo);
            } else if (self2._pos) {
              parent.pos(self2._pos[0], self2._pos[1], self2._pos[2], self2._id);
            }
          };
        }(Sound.prototype.init);
        Sound.prototype.reset = function(_super) {
          return function() {
            var self2 = this;
            var parent = self2._parent;
            self2._orientation = parent._orientation;
            self2._stereo = parent._stereo;
            self2._pos = parent._pos;
            self2._pannerAttr = parent._pannerAttr;
            if (self2._stereo) {
              parent.stereo(self2._stereo);
            } else if (self2._pos) {
              parent.pos(self2._pos[0], self2._pos[1], self2._pos[2], self2._id);
            } else if (self2._panner) {
              self2._panner.disconnect(0);
              self2._panner = void 0;
              parent._refreshBuffer(self2);
            }
            return _super.call(this);
          };
        }(Sound.prototype.reset);
        var setupPanner = function(sound2, type) {
          type = type || "spatial";
          if (type === "spatial") {
            sound2._panner = Howler.ctx.createPanner();
            sound2._panner.coneInnerAngle = sound2._pannerAttr.coneInnerAngle;
            sound2._panner.coneOuterAngle = sound2._pannerAttr.coneOuterAngle;
            sound2._panner.coneOuterGain = sound2._pannerAttr.coneOuterGain;
            sound2._panner.distanceModel = sound2._pannerAttr.distanceModel;
            sound2._panner.maxDistance = sound2._pannerAttr.maxDistance;
            sound2._panner.refDistance = sound2._pannerAttr.refDistance;
            sound2._panner.rolloffFactor = sound2._pannerAttr.rolloffFactor;
            sound2._panner.panningModel = sound2._pannerAttr.panningModel;
            if (typeof sound2._panner.positionX !== "undefined") {
              sound2._panner.positionX.setValueAtTime(sound2._pos[0], Howler.ctx.currentTime);
              sound2._panner.positionY.setValueAtTime(sound2._pos[1], Howler.ctx.currentTime);
              sound2._panner.positionZ.setValueAtTime(sound2._pos[2], Howler.ctx.currentTime);
            } else {
              sound2._panner.setPosition(sound2._pos[0], sound2._pos[1], sound2._pos[2]);
            }
            if (typeof sound2._panner.orientationX !== "undefined") {
              sound2._panner.orientationX.setValueAtTime(sound2._orientation[0], Howler.ctx.currentTime);
              sound2._panner.orientationY.setValueAtTime(sound2._orientation[1], Howler.ctx.currentTime);
              sound2._panner.orientationZ.setValueAtTime(sound2._orientation[2], Howler.ctx.currentTime);
            } else {
              sound2._panner.setOrientation(sound2._orientation[0], sound2._orientation[1], sound2._orientation[2]);
            }
          } else {
            sound2._panner = Howler.ctx.createStereoPanner();
            sound2._panner.pan.setValueAtTime(sound2._stereo, Howler.ctx.currentTime);
          }
          sound2._panner.connect(sound2._node);
          if (!sound2._paused) {
            sound2._parent.pause(sound2._id, true).play(sound2._id, true);
          }
        };
      })();
    }
  });

  // node_modules/snabbdom/build/htmldomapi.js
  function createElement(tagName2, options) {
    return document.createElement(tagName2, options);
  }
  function createElementNS(namespaceURI, qualifiedName, options) {
    return document.createElementNS(namespaceURI, qualifiedName, options);
  }
  function createDocumentFragment() {
    return parseFragment(document.createDocumentFragment());
  }
  function createTextNode(text) {
    return document.createTextNode(text);
  }
  function createComment(text) {
    return document.createComment(text);
  }
  function insertBefore(parentNode2, newNode, referenceNode) {
    if (isDocumentFragment(parentNode2)) {
      let node = parentNode2;
      while (node && isDocumentFragment(node)) {
        const fragment2 = parseFragment(node);
        node = fragment2.parent;
      }
      parentNode2 = node !== null && node !== void 0 ? node : parentNode2;
    }
    if (isDocumentFragment(newNode)) {
      newNode = parseFragment(newNode, parentNode2);
    }
    if (referenceNode && isDocumentFragment(referenceNode)) {
      referenceNode = parseFragment(referenceNode).firstChildNode;
    }
    parentNode2.insertBefore(newNode, referenceNode);
  }
  function removeChild(node, child) {
    node.removeChild(child);
  }
  function appendChild(node, child) {
    if (isDocumentFragment(child)) {
      child = parseFragment(child, node);
    }
    node.appendChild(child);
  }
  function parentNode(node) {
    if (isDocumentFragment(node)) {
      while (node && isDocumentFragment(node)) {
        const fragment2 = parseFragment(node);
        node = fragment2.parent;
      }
      return node !== null && node !== void 0 ? node : null;
    }
    return node.parentNode;
  }
  function nextSibling(node) {
    var _a2;
    if (isDocumentFragment(node)) {
      const fragment2 = parseFragment(node);
      const parent = parentNode(fragment2);
      if (parent && fragment2.lastChildNode) {
        const children = Array.from(parent.childNodes);
        const index = children.indexOf(fragment2.lastChildNode);
        return (_a2 = children[index + 1]) !== null && _a2 !== void 0 ? _a2 : null;
      }
      return null;
    }
    return node.nextSibling;
  }
  function tagName(elm) {
    return elm.tagName;
  }
  function setTextContent(node, text) {
    node.textContent = text;
  }
  function getTextContent(node) {
    return node.textContent;
  }
  function isElement(node) {
    return node.nodeType === 1;
  }
  function isText(node) {
    return node.nodeType === 3;
  }
  function isComment(node) {
    return node.nodeType === 8;
  }
  function isDocumentFragment(node) {
    return node.nodeType === 11;
  }
  function parseFragment(fragmentNode, parentNode2) {
    var _a2, _b, _c;
    const fragment2 = fragmentNode;
    (_a2 = fragment2.parent) !== null && _a2 !== void 0 ? _a2 : fragment2.parent = parentNode2 !== null && parentNode2 !== void 0 ? parentNode2 : null;
    (_b = fragment2.firstChildNode) !== null && _b !== void 0 ? _b : fragment2.firstChildNode = fragmentNode.firstChild;
    (_c = fragment2.lastChildNode) !== null && _c !== void 0 ? _c : fragment2.lastChildNode = fragmentNode.lastChild;
    return fragment2;
  }
  var htmlDomApi = {
    createElement,
    createElementNS,
    createTextNode,
    createDocumentFragment,
    createComment,
    insertBefore,
    removeChild,
    appendChild,
    parentNode,
    nextSibling,
    tagName,
    setTextContent,
    getTextContent,
    isElement,
    isText,
    isComment,
    isDocumentFragment
  };

  // node_modules/snabbdom/build/vnode.js
  function vnode(sel, data, children, text, elm) {
    const key = data === void 0 ? void 0 : data.key;
    return { sel, data, children, text, elm, key };
  }

  // node_modules/snabbdom/build/is.js
  var array = Array.isArray;
  function primitive(s) {
    return typeof s === "string" || typeof s === "number" || s instanceof String || s instanceof Number;
  }

  // node_modules/snabbdom/build/init.js
  function isUndef(s) {
    return s === void 0;
  }
  function isDef(s) {
    return s !== void 0;
  }
  var emptyNode = vnode("", {}, [], void 0, void 0);
  function sameVnode(vnode1, vnode2) {
    var _a2, _b;
    const isSameKey = vnode1.key === vnode2.key;
    const isSameIs = ((_a2 = vnode1.data) === null || _a2 === void 0 ? void 0 : _a2.is) === ((_b = vnode2.data) === null || _b === void 0 ? void 0 : _b.is);
    const isSameSel = vnode1.sel === vnode2.sel;
    const isSameTextOrFragment = !vnode1.sel && vnode1.sel === vnode2.sel ? typeof vnode1.text === typeof vnode2.text : true;
    return isSameSel && isSameKey && isSameIs && isSameTextOrFragment;
  }
  function documentFragmentIsNotSupported() {
    throw new Error("The document fragment is not supported on this platform.");
  }
  function isElement2(api, vnode2) {
    return api.isElement(vnode2);
  }
  function isDocumentFragment2(api, vnode2) {
    return api.isDocumentFragment(vnode2);
  }
  function createKeyToOldIdx(children, beginIdx, endIdx) {
    var _a2;
    const map = {};
    for (let i = beginIdx; i <= endIdx; ++i) {
      const key = (_a2 = children[i]) === null || _a2 === void 0 ? void 0 : _a2.key;
      if (key !== void 0) {
        map[key] = i;
      }
    }
    return map;
  }
  var hooks = [
    "create",
    "update",
    "remove",
    "destroy",
    "pre",
    "post"
  ];
  function init(modules, domApi, options) {
    const cbs = {
      create: [],
      update: [],
      remove: [],
      destroy: [],
      pre: [],
      post: []
    };
    const api = domApi !== void 0 ? domApi : htmlDomApi;
    for (const hook of hooks) {
      for (const module of modules) {
        const currentHook = module[hook];
        if (currentHook !== void 0) {
          cbs[hook].push(currentHook);
        }
      }
    }
    function emptyNodeAt(elm) {
      const id = elm.id ? "#" + elm.id : "";
      const classes = elm.getAttribute("class");
      const c = classes ? "." + classes.split(" ").join(".") : "";
      return vnode(api.tagName(elm).toLowerCase() + id + c, {}, [], void 0, elm);
    }
    function emptyDocumentFragmentAt(frag) {
      return vnode(void 0, {}, [], void 0, frag);
    }
    function createRmCb(childElm, listeners) {
      return function rmCb() {
        if (--listeners === 0) {
          const parent = api.parentNode(childElm);
          api.removeChild(parent, childElm);
        }
      };
    }
    function createElm(vnode2, insertedVnodeQueue) {
      var _a2, _b, _c, _d;
      let i;
      let data = vnode2.data;
      if (data !== void 0) {
        const init2 = (_a2 = data.hook) === null || _a2 === void 0 ? void 0 : _a2.init;
        if (isDef(init2)) {
          init2(vnode2);
          data = vnode2.data;
        }
      }
      const children = vnode2.children;
      const sel = vnode2.sel;
      if (sel === "!") {
        if (isUndef(vnode2.text)) {
          vnode2.text = "";
        }
        vnode2.elm = api.createComment(vnode2.text);
      } else if (sel !== void 0) {
        const hashIdx = sel.indexOf("#");
        const dotIdx = sel.indexOf(".", hashIdx);
        const hash2 = hashIdx > 0 ? hashIdx : sel.length;
        const dot = dotIdx > 0 ? dotIdx : sel.length;
        const tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash2, dot)) : sel;
        const elm = vnode2.elm = isDef(data) && isDef(i = data.ns) ? api.createElementNS(i, tag, data) : api.createElement(tag, data);
        if (hash2 < dot)
          elm.setAttribute("id", sel.slice(hash2 + 1, dot));
        if (dotIdx > 0)
          elm.setAttribute("class", sel.slice(dot + 1).replace(/\./g, " "));
        for (i = 0; i < cbs.create.length; ++i)
          cbs.create[i](emptyNode, vnode2);
        if (array(children)) {
          for (i = 0; i < children.length; ++i) {
            const ch = children[i];
            if (ch != null) {
              api.appendChild(elm, createElm(ch, insertedVnodeQueue));
            }
          }
        } else if (primitive(vnode2.text)) {
          api.appendChild(elm, api.createTextNode(vnode2.text));
        }
        const hook = vnode2.data.hook;
        if (isDef(hook)) {
          (_b = hook.create) === null || _b === void 0 ? void 0 : _b.call(hook, emptyNode, vnode2);
          if (hook.insert) {
            insertedVnodeQueue.push(vnode2);
          }
        }
      } else if (((_c = options === null || options === void 0 ? void 0 : options.experimental) === null || _c === void 0 ? void 0 : _c.fragments) && vnode2.children) {
        vnode2.elm = ((_d = api.createDocumentFragment) !== null && _d !== void 0 ? _d : documentFragmentIsNotSupported)();
        for (i = 0; i < cbs.create.length; ++i)
          cbs.create[i](emptyNode, vnode2);
        for (i = 0; i < vnode2.children.length; ++i) {
          const ch = vnode2.children[i];
          if (ch != null) {
            api.appendChild(vnode2.elm, createElm(ch, insertedVnodeQueue));
          }
        }
      } else {
        vnode2.elm = api.createTextNode(vnode2.text);
      }
      return vnode2.elm;
    }
    function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
      for (; startIdx <= endIdx; ++startIdx) {
        const ch = vnodes[startIdx];
        if (ch != null) {
          api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before);
        }
      }
    }
    function invokeDestroyHook(vnode2) {
      var _a2, _b;
      const data = vnode2.data;
      if (data !== void 0) {
        (_b = (_a2 = data === null || data === void 0 ? void 0 : data.hook) === null || _a2 === void 0 ? void 0 : _a2.destroy) === null || _b === void 0 ? void 0 : _b.call(_a2, vnode2);
        for (let i = 0; i < cbs.destroy.length; ++i)
          cbs.destroy[i](vnode2);
        if (vnode2.children !== void 0) {
          for (let j = 0; j < vnode2.children.length; ++j) {
            const child = vnode2.children[j];
            if (child != null && typeof child !== "string") {
              invokeDestroyHook(child);
            }
          }
        }
      }
    }
    function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
      var _a2, _b;
      for (; startIdx <= endIdx; ++startIdx) {
        let listeners;
        let rm;
        const ch = vnodes[startIdx];
        if (ch != null) {
          if (isDef(ch.sel)) {
            invokeDestroyHook(ch);
            listeners = cbs.remove.length + 1;
            rm = createRmCb(ch.elm, listeners);
            for (let i = 0; i < cbs.remove.length; ++i)
              cbs.remove[i](ch, rm);
            const removeHook = (_b = (_a2 = ch === null || ch === void 0 ? void 0 : ch.data) === null || _a2 === void 0 ? void 0 : _a2.hook) === null || _b === void 0 ? void 0 : _b.remove;
            if (isDef(removeHook)) {
              removeHook(ch, rm);
            } else {
              rm();
            }
          } else if (ch.children) {
            invokeDestroyHook(ch);
            removeVnodes(parentElm, ch.children, 0, ch.children.length - 1);
          } else {
            api.removeChild(parentElm, ch.elm);
          }
        }
      }
    }
    function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
      let oldStartIdx = 0;
      let newStartIdx = 0;
      let oldEndIdx = oldCh.length - 1;
      let oldStartVnode = oldCh[0];
      let oldEndVnode = oldCh[oldEndIdx];
      let newEndIdx = newCh.length - 1;
      let newStartVnode = newCh[0];
      let newEndVnode = newCh[newEndIdx];
      let oldKeyToIdx;
      let idxInOld;
      let elmToMove;
      let before;
      while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (oldStartVnode == null) {
          oldStartVnode = oldCh[++oldStartIdx];
        } else if (oldEndVnode == null) {
          oldEndVnode = oldCh[--oldEndIdx];
        } else if (newStartVnode == null) {
          newStartVnode = newCh[++newStartIdx];
        } else if (newEndVnode == null) {
          newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(oldStartVnode, newStartVnode)) {
          patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
          oldStartVnode = oldCh[++oldStartIdx];
          newStartVnode = newCh[++newStartIdx];
        } else if (sameVnode(oldEndVnode, newEndVnode)) {
          patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
          oldEndVnode = oldCh[--oldEndIdx];
          newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(oldStartVnode, newEndVnode)) {
          patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
          api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
          oldStartVnode = oldCh[++oldStartIdx];
          newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(oldEndVnode, newStartVnode)) {
          patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
          api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
          oldEndVnode = oldCh[--oldEndIdx];
          newStartVnode = newCh[++newStartIdx];
        } else {
          if (oldKeyToIdx === void 0) {
            oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
          }
          idxInOld = oldKeyToIdx[newStartVnode.key];
          if (isUndef(idxInOld)) {
            api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
          } else {
            elmToMove = oldCh[idxInOld];
            if (elmToMove.sel !== newStartVnode.sel) {
              api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
            } else {
              patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
              oldCh[idxInOld] = void 0;
              api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
            }
          }
          newStartVnode = newCh[++newStartIdx];
        }
      }
      if (newStartIdx <= newEndIdx) {
        before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
        addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
      }
      if (oldStartIdx <= oldEndIdx) {
        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
      }
    }
    function patchVnode(oldVnode, vnode2, insertedVnodeQueue) {
      var _a2, _b, _c, _d, _e, _f, _g, _h;
      const hook = (_a2 = vnode2.data) === null || _a2 === void 0 ? void 0 : _a2.hook;
      (_b = hook === null || hook === void 0 ? void 0 : hook.prepatch) === null || _b === void 0 ? void 0 : _b.call(hook, oldVnode, vnode2);
      const elm = vnode2.elm = oldVnode.elm;
      if (oldVnode === vnode2)
        return;
      if (vnode2.data !== void 0 || isDef(vnode2.text) && vnode2.text !== oldVnode.text) {
        (_c = vnode2.data) !== null && _c !== void 0 ? _c : vnode2.data = {};
        (_d = oldVnode.data) !== null && _d !== void 0 ? _d : oldVnode.data = {};
        for (let i = 0; i < cbs.update.length; ++i)
          cbs.update[i](oldVnode, vnode2);
        (_g = (_f = (_e = vnode2.data) === null || _e === void 0 ? void 0 : _e.hook) === null || _f === void 0 ? void 0 : _f.update) === null || _g === void 0 ? void 0 : _g.call(_f, oldVnode, vnode2);
      }
      const oldCh = oldVnode.children;
      const ch = vnode2.children;
      if (isUndef(vnode2.text)) {
        if (isDef(oldCh) && isDef(ch)) {
          if (oldCh !== ch)
            updateChildren(elm, oldCh, ch, insertedVnodeQueue);
        } else if (isDef(ch)) {
          if (isDef(oldVnode.text))
            api.setTextContent(elm, "");
          addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
        } else if (isDef(oldCh)) {
          removeVnodes(elm, oldCh, 0, oldCh.length - 1);
        } else if (isDef(oldVnode.text)) {
          api.setTextContent(elm, "");
        }
      } else if (oldVnode.text !== vnode2.text) {
        if (isDef(oldCh)) {
          removeVnodes(elm, oldCh, 0, oldCh.length - 1);
        }
        api.setTextContent(elm, vnode2.text);
      }
      (_h = hook === null || hook === void 0 ? void 0 : hook.postpatch) === null || _h === void 0 ? void 0 : _h.call(hook, oldVnode, vnode2);
    }
    return function patch2(oldVnode, vnode2) {
      let i, elm, parent;
      const insertedVnodeQueue = [];
      for (i = 0; i < cbs.pre.length; ++i)
        cbs.pre[i]();
      if (isElement2(api, oldVnode)) {
        oldVnode = emptyNodeAt(oldVnode);
      } else if (isDocumentFragment2(api, oldVnode)) {
        oldVnode = emptyDocumentFragmentAt(oldVnode);
      }
      if (sameVnode(oldVnode, vnode2)) {
        patchVnode(oldVnode, vnode2, insertedVnodeQueue);
      } else {
        elm = oldVnode.elm;
        parent = api.parentNode(elm);
        createElm(vnode2, insertedVnodeQueue);
        if (parent !== null) {
          api.insertBefore(parent, vnode2.elm, api.nextSibling(elm));
          removeVnodes(parent, [oldVnode], 0, 0);
        }
      }
      for (i = 0; i < insertedVnodeQueue.length; ++i) {
        insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
      }
      for (i = 0; i < cbs.post.length; ++i)
        cbs.post[i]();
      return vnode2;
    };
  }

  // node_modules/snabbdom/build/h.js
  function addNS(data, children, sel) {
    data.ns = "http://www.w3.org/2000/svg";
    if (sel !== "foreignObject" && children !== void 0) {
      for (let i = 0; i < children.length; ++i) {
        const child = children[i];
        if (typeof child === "string")
          continue;
        const childData = child.data;
        if (childData !== void 0) {
          addNS(childData, child.children, child.sel);
        }
      }
    }
  }
  function h(sel, b, c) {
    let data = {};
    let children;
    let text;
    let i;
    if (c !== void 0) {
      if (b !== null) {
        data = b;
      }
      if (array(c)) {
        children = c;
      } else if (primitive(c)) {
        text = c.toString();
      } else if (c && c.sel) {
        children = [c];
      }
    } else if (b !== void 0 && b !== null) {
      if (array(b)) {
        children = b;
      } else if (primitive(b)) {
        text = b.toString();
      } else if (b && b.sel) {
        children = [b];
      } else {
        data = b;
      }
    }
    if (children !== void 0) {
      for (i = 0; i < children.length; ++i) {
        if (primitive(children[i]))
          children[i] = vnode(void 0, void 0, void 0, children[i], void 0);
      }
    }
    if (sel[0] === "s" && sel[1] === "v" && sel[2] === "g" && (sel.length === 3 || sel[3] === "." || sel[3] === "#")) {
      addNS(data, children, sel);
    }
    return vnode(sel, data, children, text, void 0);
  }

  // node_modules/snabbdom/build/tovnode.js
  function toVNode(node, domApi) {
    const api = domApi !== void 0 ? domApi : htmlDomApi;
    let text;
    if (api.isElement(node)) {
      const id = node.id ? "#" + node.id : "";
      const cn = node.getAttribute("class");
      const c = cn ? "." + cn.split(" ").join(".") : "";
      const sel = api.tagName(node).toLowerCase() + id + c;
      const attrs = {};
      const dataset = {};
      const data = {};
      const children = [];
      let name;
      let i, n;
      const elmAttrs = node.attributes;
      const elmChildren = node.childNodes;
      for (i = 0, n = elmAttrs.length; i < n; i++) {
        name = elmAttrs[i].nodeName;
        if (name[0] === "d" && name[1] === "a" && name[2] === "t" && name[3] === "a" && name[4] === "-") {
          dataset[name.slice(5)] = elmAttrs[i].nodeValue || "";
        } else if (name !== "id" && name !== "class") {
          attrs[name] = elmAttrs[i].nodeValue;
        }
      }
      for (i = 0, n = elmChildren.length; i < n; i++) {
        children.push(toVNode(elmChildren[i], domApi));
      }
      if (Object.keys(attrs).length > 0)
        data.attrs = attrs;
      if (Object.keys(dataset).length > 0)
        data.dataset = dataset;
      if (sel[0] === "s" && sel[1] === "v" && sel[2] === "g" && (sel.length === 3 || sel[3] === "." || sel[3] === "#")) {
        addNS(data, children, sel);
      }
      return vnode(sel, data, children, void 0, node);
    } else if (api.isText(node)) {
      text = api.getTextContent(node);
      return vnode(void 0, void 0, void 0, text, node);
    } else if (api.isComment(node)) {
      text = api.getTextContent(node);
      return vnode("!", {}, [], text, node);
    } else {
      return vnode("", {}, [], void 0, node);
    }
  }

  // node_modules/snabbdom/build/modules/attributes.js
  var xlinkNS = "http://www.w3.org/1999/xlink";
  var xmlNS = "http://www.w3.org/XML/1998/namespace";
  var colonChar = 58;
  var xChar = 120;
  function updateAttrs(oldVnode, vnode2) {
    let key;
    const elm = vnode2.elm;
    let oldAttrs = oldVnode.data.attrs;
    let attrs = vnode2.data.attrs;
    if (!oldAttrs && !attrs)
      return;
    if (oldAttrs === attrs)
      return;
    oldAttrs = oldAttrs || {};
    attrs = attrs || {};
    for (key in attrs) {
      const cur = attrs[key];
      const old = oldAttrs[key];
      if (old !== cur) {
        if (cur === true) {
          elm.setAttribute(key, "");
        } else if (cur === false) {
          elm.removeAttribute(key);
        } else {
          if (key.charCodeAt(0) !== xChar) {
            elm.setAttribute(key, cur);
          } else if (key.charCodeAt(3) === colonChar) {
            elm.setAttributeNS(xmlNS, key, cur);
          } else if (key.charCodeAt(5) === colonChar) {
            elm.setAttributeNS(xlinkNS, key, cur);
          } else {
            elm.setAttribute(key, cur);
          }
        }
      }
    }
    for (key in oldAttrs) {
      if (!(key in attrs)) {
        elm.removeAttribute(key);
      }
    }
  }
  var attributesModule = {
    create: updateAttrs,
    update: updateAttrs
  };

  // node_modules/snabbdom/build/modules/class.js
  function updateClass(oldVnode, vnode2) {
    let cur;
    let name;
    const elm = vnode2.elm;
    let oldClass = oldVnode.data.class;
    let klass = vnode2.data.class;
    if (!oldClass && !klass)
      return;
    if (oldClass === klass)
      return;
    oldClass = oldClass || {};
    klass = klass || {};
    for (name in oldClass) {
      if (oldClass[name] && !Object.prototype.hasOwnProperty.call(klass, name)) {
        elm.classList.remove(name);
      }
    }
    for (name in klass) {
      cur = klass[name];
      if (cur !== oldClass[name]) {
        elm.classList[cur ? "add" : "remove"](name);
      }
    }
  }
  var classModule = { create: updateClass, update: updateClass };

  // node_modules/snabbdom/build/modules/eventlisteners.js
  function invokeHandler(handler, vnode2, event) {
    if (typeof handler === "function") {
      handler.call(vnode2, event, vnode2);
    } else if (typeof handler === "object") {
      for (let i = 0; i < handler.length; i++) {
        invokeHandler(handler[i], vnode2, event);
      }
    }
  }
  function handleEvent(event, vnode2) {
    const name = event.type;
    const on = vnode2.data.on;
    if (on && on[name]) {
      invokeHandler(on[name], vnode2, event);
    }
  }
  function createListener() {
    return function handler(event) {
      handleEvent(event, handler.vnode);
    };
  }
  function updateEventListeners(oldVnode, vnode2) {
    const oldOn = oldVnode.data.on;
    const oldListener = oldVnode.listener;
    const oldElm = oldVnode.elm;
    const on = vnode2 && vnode2.data.on;
    const elm = vnode2 && vnode2.elm;
    let name;
    if (oldOn === on) {
      return;
    }
    if (oldOn && oldListener) {
      if (!on) {
        for (name in oldOn) {
          oldElm.removeEventListener(name, oldListener, false);
        }
      } else {
        for (name in oldOn) {
          if (!on[name]) {
            oldElm.removeEventListener(name, oldListener, false);
          }
        }
      }
    }
    if (on) {
      const listener = vnode2.listener = oldVnode.listener || createListener();
      listener.vnode = vnode2;
      if (!oldOn) {
        for (name in on) {
          elm.addEventListener(name, listener, false);
        }
      } else {
        for (name in on) {
          if (!oldOn[name]) {
            elm.addEventListener(name, listener, false);
          }
        }
      }
    }
  }
  var eventListenersModule = {
    create: updateEventListeners,
    update: updateEventListeners,
    destroy: updateEventListeners
  };

  // node_modules/snabbdom/build/modules/props.js
  function updateProps(oldVnode, vnode2) {
    let key;
    let cur;
    let old;
    const elm = vnode2.elm;
    let oldProps = oldVnode.data.props;
    let props = vnode2.data.props;
    if (!oldProps && !props)
      return;
    if (oldProps === props)
      return;
    oldProps = oldProps || {};
    props = props || {};
    for (key in props) {
      cur = props[key];
      old = oldProps[key];
      if (old !== cur && (key !== "value" || elm[key] !== cur)) {
        elm[key] = cur;
      }
    }
  }
  var propsModule = { create: updateProps, update: updateProps };

  // node_modules/snabbdom/build/modules/style.js
  var raf = typeof window !== "undefined" && window.requestAnimationFrame.bind(window) || setTimeout;
  var nextFrame = function(fn) {
    raf(function() {
      raf(fn);
    });
  };
  var reflowForced = false;
  function setNextFrame(obj, prop, val) {
    nextFrame(function() {
      obj[prop] = val;
    });
  }
  function updateStyle(oldVnode, vnode2) {
    let cur;
    let name;
    const elm = vnode2.elm;
    let oldStyle = oldVnode.data.style;
    let style = vnode2.data.style;
    if (!oldStyle && !style)
      return;
    if (oldStyle === style)
      return;
    oldStyle = oldStyle || {};
    style = style || {};
    const oldHasDel = "delayed" in oldStyle;
    for (name in oldStyle) {
      if (!style[name]) {
        if (name[0] === "-" && name[1] === "-") {
          elm.style.removeProperty(name);
        } else {
          elm.style[name] = "";
        }
      }
    }
    for (name in style) {
      cur = style[name];
      if (name === "delayed" && style.delayed) {
        for (const name2 in style.delayed) {
          cur = style.delayed[name2];
          if (!oldHasDel || cur !== oldStyle.delayed[name2]) {
            setNextFrame(elm.style, name2, cur);
          }
        }
      } else if (name !== "remove" && cur !== oldStyle[name]) {
        if (name[0] === "-" && name[1] === "-") {
          elm.style.setProperty(name, cur);
        } else {
          elm.style[name] = cur;
        }
      }
    }
  }
  function applyDestroyStyle(vnode2) {
    let style;
    let name;
    const elm = vnode2.elm;
    const s = vnode2.data.style;
    if (!s || !(style = s.destroy))
      return;
    for (name in style) {
      elm.style[name] = style[name];
    }
  }
  function applyRemoveStyle(vnode2, rm) {
    const s = vnode2.data.style;
    if (!s || !s.remove) {
      rm();
      return;
    }
    if (!reflowForced) {
      vnode2.elm.offsetLeft;
      reflowForced = true;
    }
    let name;
    const elm = vnode2.elm;
    let i = 0;
    const style = s.remove;
    let amount = 0;
    const applied = [];
    for (name in style) {
      applied.push(name);
      elm.style[name] = style[name];
    }
    const compStyle = getComputedStyle(elm);
    const props = compStyle["transition-property"].split(", ");
    for (; i < props.length; ++i) {
      if (applied.indexOf(props[i]) !== -1)
        amount++;
    }
    elm.addEventListener("transitionend", function(ev) {
      if (ev.target === elm)
        --amount;
      if (amount === 0)
        rm();
    });
  }
  function forceReflow() {
    reflowForced = false;
  }
  var styleModule = {
    pre: forceReflow,
    create: updateStyle,
    update: updateStyle,
    destroy: applyDestroyStyle,
    remove: applyRemoveStyle
  };

  // client/document.ts
  var patch = init([classModule, attributesModule, propsModule, eventListenersModule, styleModule]);
  function getDocumentData(name) {
    const elm = document.getElementById("pychess-variants");
    if (elm) {
      return elm.getAttribute("data-" + name.toLowerCase());
    } else {
      return "";
    }
  }
  function changeCSS(cssLinkIndex, cssFile) {
    document.getElementsByTagName("link").item(cssLinkIndex).setAttribute("href", cssFile);
  }
  var BOARD_CSS_IDX = 1;
  var PIECE_CSS_IDX = 2;
  function changeBoardCSS(assetUrl, family, cssFile) {
    const sheet = document.styleSheets[BOARD_CSS_IDX];
    const cssRules = sheet.cssRules;
    for (let i = 0; i < cssRules.length; i++) {
      const rule = cssRules[i];
      if (!(rule instanceof CSSStyleRule)) {
        continue;
      }
      if (rule.selectorText === `.${family} cg-board`) {
        sheet.deleteRule(i);
        const newRule = `.${family} cg-board {background-image: url(${assetUrl}/images/board/${cssFile})}`;
        sheet.insertRule(newRule, i);
        break;
      }
    }
  }
  function changePieceCSS(assetUrl, family, cssFile) {
    let cssLinkIndex = PIECE_CSS_IDX;
    switch (family) {
      case "standard":
        break;
      case "seirawan":
        cssLinkIndex += 1;
        break;
      case "makruk":
        cssLinkIndex += 2;
        break;
      case "sittuyin":
        cssLinkIndex += 3;
        break;
      case "asean":
        cssLinkIndex += 4;
        break;
      case "shogi":
        cssLinkIndex += 5;
        break;
      case "kyoto":
        cssLinkIndex += 6;
        break;
      case "tori":
        cssLinkIndex += 7;
        break;
      case "xiangqi":
        cssLinkIndex += 8;
        break;
      case "capa":
        cssLinkIndex += 9;
        break;
      case "shako":
        cssLinkIndex += 10;
        break;
      case "shogun":
        cssLinkIndex += 11;
        break;
      case "janggi":
        cssLinkIndex += 12;
        break;
      case "orda":
        cssLinkIndex += 13;
        break;
      case "synochess":
        cssLinkIndex += 14;
        break;
      case "hoppel":
        cssLinkIndex += 15;
        break;
      case "dobutsu":
        cssLinkIndex += 16;
        break;
      case "shinobi":
        cssLinkIndex += 17;
        break;
      case "empire":
        cssLinkIndex += 18;
        break;
      case "ordamirror":
        cssLinkIndex += 19;
        break;
      case "chak":
        cssLinkIndex += 20;
        break;
      case "chennis":
        cssLinkIndex += 21;
        break;
      case "spartan":
        cssLinkIndex += 22;
        break;
      default:
        throw "Unknown piece family " + family;
    }
    const newUrl = `${assetUrl}/piece/${family}/${cssFile}.css`;
    changeCSS(cssLinkIndex, newUrl);
  }
  function bind(eventName, f, redraw) {
    return {
      insert(vnode2) {
        var _a2;
        (_a2 = vnode2.elm) == null ? void 0 : _a2.addEventListener(eventName, (e) => {
          const res = f(e);
          if (redraw)
            redraw();
          return res;
        });
      }
    };
  }

  // node_modules/chessgroundx/types.js
  var Notation;
  (function(Notation3) {
    Notation3[Notation3["ALGEBRAIC"] = 0] = "ALGEBRAIC";
    Notation3[Notation3["SHOGI_ENGLET"] = 1] = "SHOGI_ENGLET";
    Notation3[Notation3["SHOGI_ARBNUM"] = 2] = "SHOGI_ARBNUM";
    Notation3[Notation3["SHOGI_HANNUM"] = 3] = "SHOGI_HANNUM";
    Notation3[Notation3["JANGGI"] = 4] = "JANGGI";
    Notation3[Notation3["XIANGQI_ARBNUM"] = 5] = "XIANGQI_ARBNUM";
    Notation3[Notation3["XIANGQI_HANNUM"] = 6] = "XIANGQI_HANNUM";
    Notation3[Notation3["THAI_ALGEBRAIC"] = 7] = "THAI_ALGEBRAIC";
  })(Notation || (Notation = {}));
  var colors = ["white", "black"];
  var files = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p"];
  var ranks = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "<", "=", ">", "?", "@"];
  var letters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
  ];

  // node_modules/chessgroundx/util.js
  var invRanks = [...ranks].reverse();
  function files2(n) {
    return files.slice(0, n);
  }
  function ranks2(n) {
    return ranks.slice(0, n);
  }
  function allKeys(bd) {
    return Array.prototype.concat(...files2(bd.width).map((c) => ranks2(bd.height).map((r) => c + r)));
  }
  function allPos(bd) {
    return allKeys(bd).map(key2pos);
  }
  var pos2key = (pos) => files[pos[0]] + ranks[pos[1]];
  var key2pos = (k) => [k.charCodeAt(0) - 97, k.charCodeAt(1) - 49];
  function roleOf(letter) {
    return letter.replace("+", "p").replace("*", "_").replace("@", "").toLowerCase() + "-piece";
  }
  function letterOf(role, uppercase = false) {
    const letterPart = role.slice(0, role.indexOf("-"));
    const letter = (letterPart.length > 1 ? letterPart.replace("p", "+") : letterPart).replace("_", "*");
    return uppercase ? letter.toUpperCase() : letter;
  }
  function dropOrigOf(role) {
    return letterOf(role, true) + "@";
  }
  function isDropOrig(orig) {
    return orig[0] === orig[0].toUpperCase();
  }
  function isKey(selectable) {
    return typeof selectable === "string" && selectable[0] === selectable[0].toLowerCase();
  }
  function isPiece(selectable) {
    return typeof selectable !== "string";
  }
  function isSame(lhs, rhs) {
    if (isPiece(lhs) && isPiece(rhs))
      return samePiece(lhs, rhs);
    else
      return lhs === rhs;
  }
  function changeNumber(map, key, num) {
    var _a2;
    map.set(key, ((_a2 = map.get(key)) !== null && _a2 !== void 0 ? _a2 : 0) + num);
  }
  function memo(f) {
    let v;
    const ret = () => {
      if (v === void 0)
        v = f();
      return v;
    };
    ret.clear = () => {
      v = void 0;
    };
    return ret;
  }
  var timer = () => {
    let startAt;
    return {
      start() {
        startAt = performance.now();
      },
      cancel() {
        startAt = void 0;
      },
      stop() {
        if (!startAt)
          return 0;
        const time = performance.now() - startAt;
        startAt = void 0;
        return time;
      }
    };
  };
  var opposite = (c) => c === "white" ? "black" : "white";
  var samePiece = (p1, p2) => p1.role === p2.role && p1.color === p2.color && !!p1.promoted === !!p2.promoted;
  var pieceSide = (p, o) => p.color === o ? "ally" : "enemy";
  var pieceClasses = (p, o) => `${p.color} ${pieceSide(p, o)} ${p.promoted ? "promoted " : ""}${p.role}`;
  var distanceSq = (pos1, pos2) => {
    const dx = pos1[0] - pos2[0], dy = pos1[1] - pos2[1];
    return dx * dx + dy * dy;
  };
  var posToTranslate = (bounds, bd) => (pos, asWhite) => [
    (asWhite ? pos[0] : bd.width - 1 - pos[0]) * bounds.width / bd.width,
    (asWhite ? bd.height - 1 - pos[1] : pos[1]) * bounds.height / bd.height
  ];
  var translate = (el, pos) => {
    el.style.transform = `translate(${pos[0]}px,${pos[1]}px)`;
  };
  var translateAndScale = (el, pos, scale = 1) => {
    el.style.transform = `translate(${pos[0]}px,${pos[1]}px) scale(${scale})`;
  };
  var setVisible = (el, v) => {
    el.style.visibility = v ? "visible" : "hidden";
  };
  var eventPosition = (e) => {
    var _a2;
    if (e.clientX || e.clientX === 0)
      return [e.clientX, e.clientY];
    if ((_a2 = e.targetTouches) === null || _a2 === void 0 ? void 0 : _a2[0])
      return [e.targetTouches[0].clientX, e.targetTouches[0].clientY];
    return;
  };
  var isRightButton = (e) => e.buttons === 2 || e.button === 2;
  var createEl = (tagName2, className) => {
    const el = document.createElement(tagName2);
    if (className)
      el.className = className;
    return el;
  };
  var isMiniBoard = (el) => {
    return Array.from(el.classList).includes("mini");
  };
  function computeSquareCenter(key, asWhite, bounds, bd) {
    const pos = key2pos(key);
    if (!asWhite) {
      pos[0] = bd.width - 1 - pos[0];
      pos[1] = bd.height - 1 - pos[1];
    }
    return [
      bounds.left + bounds.width * (pos[0] + 0.5) / bd.width,
      bounds.top + bounds.height * (bd.height - pos[1] - 0.5) / bd.height
    ];
  }

  // node_modules/gettext.js/lib/gettext.js
  var i18n = function(options) {
    options = options || {};
    this && (this.__version = "1.1.1");
    var defaults2 = {
      domain: "messages",
      locale: (typeof document !== "undefined" ? document.documentElement.getAttribute("lang") : false) || "en",
      plural_func: function(n) {
        return { nplurals: 2, plural: n != 1 ? 1 : 0 };
      },
      ctxt_delimiter: String.fromCharCode(4)
      // \u0004
    };
    var _2 = {
      isObject: function(obj) {
        var type = typeof obj;
        return type === "function" || type === "object" && !!obj;
      },
      isArray: function(obj) {
        return toString.call(obj) === "[object Array]";
      }
    };
    var _plural_funcs = {}, _locale = options.locale || defaults2.locale, _domain = options.domain || defaults2.domain, _dictionary = {}, _plural_forms = {}, _ctxt_delimiter = options.ctxt_delimiter || defaults2.ctxt_delimiter;
    if (options.messages) {
      _dictionary[_domain] = {};
      _dictionary[_domain][_locale] = options.messages;
    }
    if (options.plural_forms) {
      _plural_forms[_locale] = options.plural_forms;
    }
    var strfmt = function(fmt) {
      var args = arguments;
      return fmt.replace(/%%/g, "%% ").replace(/%(\d+)/g, function(str, p1) {
        return args[p1];
      }).replace(/%% /g, "%");
    };
    var removeContext = function(str) {
      if (str.indexOf(_ctxt_delimiter) !== -1) {
        var parts = str.split(_ctxt_delimiter);
        return parts[1];
      }
      return str;
    };
    var expand_locale = function(locale) {
      var locales = [locale], i = locale.lastIndexOf("-");
      while (i > 0) {
        locale = locale.slice(0, i);
        locales.push(locale);
        i = locale.lastIndexOf("-");
      }
      return locales;
    };
    var normalizeLocale = function(locale) {
      locale = locale.replace("_", "-");
      var i = locale.search(/[.@]/);
      if (i != -1)
        locale = locale.slice(0, i);
      return locale;
    };
    var getPluralFunc = function(plural_form) {
      var pf_re = new RegExp("^\\s*nplurals\\s*=\\s*[0-9]+\\s*;\\s*plural\\s*=\\s*(?:\\s|[-\\?\\|&=!<>+*/%:;n0-9_()])+");
      if (!pf_re.test(plural_form))
        throw new Error(strfmt('The plural form "%1" is not valid', plural_form));
      return new Function("n", "var plural, nplurals; " + plural_form + " return { nplurals: nplurals, plural: (plural === true ? 1 : (plural ? plural : 0)) };");
    };
    var t = function(messages, n, options2) {
      if (!options2.plural_form)
        return strfmt.apply(this, [removeContext(messages[0])].concat(Array.prototype.slice.call(arguments, 3)));
      var plural;
      if (options2.plural_func) {
        plural = options2.plural_func(n);
      } else if (!_plural_funcs[_locale]) {
        _plural_funcs[_locale] = getPluralFunc(_plural_forms[_locale]);
        plural = _plural_funcs[_locale](n);
      } else {
        plural = _plural_funcs[_locale](n);
      }
      if ("undefined" === typeof plural.plural || plural.plural > plural.nplurals || messages.length <= plural.plural)
        plural.plural = 0;
      return strfmt.apply(this, [removeContext(messages[plural.plural]), n].concat(Array.prototype.slice.call(arguments, 3)));
    };
    return {
      strfmt,
      // expose strfmt util
      expand_locale,
      // expose expand_locale util
      // Declare shortcuts
      __: function() {
        return this.gettext.apply(this, arguments);
      },
      _n: function() {
        return this.ngettext.apply(this, arguments);
      },
      _p: function() {
        return this.pgettext.apply(this, arguments);
      },
      setMessages: function(domain, locale, messages, plural_forms) {
        if (!domain || !locale || !messages)
          throw new Error("You must provide a domain, a locale and messages");
        if ("string" !== typeof domain || "string" !== typeof locale || !_2.isObject(messages))
          throw new Error("Invalid arguments");
        locale = normalizeLocale(locale);
        if (plural_forms)
          _plural_forms[locale] = plural_forms;
        if (!_dictionary[domain])
          _dictionary[domain] = {};
        _dictionary[domain][locale] = messages;
        return this;
      },
      loadJSON: function(jsonData, domain) {
        if (!_2.isObject(jsonData))
          jsonData = JSON.parse(jsonData);
        if (!jsonData[""] || !jsonData[""]["language"] || !jsonData[""]["plural-forms"])
          throw new Error('Wrong JSON, it must have an empty key ("") with "language" and "plural-forms" information');
        var headers = jsonData[""];
        delete jsonData[""];
        return this.setMessages(domain || defaults2.domain, headers["language"], jsonData, headers["plural-forms"]);
      },
      setLocale: function(locale) {
        _locale = normalizeLocale(locale);
        return this;
      },
      getLocale: function() {
        return _locale;
      },
      // getter/setter for domain
      textdomain: function(domain) {
        if (!domain)
          return _domain;
        _domain = domain;
        return this;
      },
      gettext: function(msgid) {
        return this.dcnpgettext.apply(this, [void 0, void 0, msgid, void 0, void 0].concat(Array.prototype.slice.call(arguments, 1)));
      },
      ngettext: function(msgid, msgid_plural, n) {
        return this.dcnpgettext.apply(this, [void 0, void 0, msgid, msgid_plural, n].concat(Array.prototype.slice.call(arguments, 3)));
      },
      pgettext: function(msgctxt, msgid) {
        return this.dcnpgettext.apply(this, [void 0, msgctxt, msgid, void 0, void 0].concat(Array.prototype.slice.call(arguments, 2)));
      },
      dcnpgettext: function(domain, msgctxt, msgid, msgid_plural, n) {
        domain = domain || _domain;
        if ("string" !== typeof msgid)
          throw new Error(this.strfmt('Msgid "%1" is not a valid translatable string', msgid));
        var translation, options2 = { plural_form: false }, key = msgctxt ? msgctxt + _ctxt_delimiter + msgid : msgid, exist, locale, locales = expand_locale(_locale);
        for (var i in locales) {
          locale = locales[i];
          exist = _dictionary[domain] && _dictionary[domain][locale] && _dictionary[domain][locale][key];
          if (msgid_plural) {
            exist = exist && "string" !== typeof _dictionary[domain][locale][key];
          } else {
            exist = exist && "string" === typeof _dictionary[domain][locale][key];
          }
          if (exist) {
            break;
          }
        }
        if (!exist) {
          translation = msgid;
          options2.plural_func = defaults2.plural_func;
        } else {
          translation = _dictionary[domain][locale][key];
        }
        if (!msgid_plural)
          return t.apply(this, [[translation], n, options2].concat(Array.prototype.slice.call(arguments, 5)));
        options2.plural_form = true;
        return t.apply(this, [exist ? translation : [msgid, msgid_plural], n, options2].concat(Array.prototype.slice.call(arguments, 5)));
      }
    };
  };
  var gettext_default = i18n;

  // client/settings.ts
  var Settings = class {
    constructor(name) {
      this.name = name;
    }
    get value() {
      return this._value;
    }
    set value(value) {
      localStorage[this.name] = value;
      this._value = value;
      this.update();
    }
  };
  var StringSettings = class extends Settings {
    constructor(name, defaultValue) {
      var _a2, _b;
      super(name);
      this._value = (_b = (_a2 = getDocumentData(name)) != null ? _a2 : localStorage[name]) != null ? _b : defaultValue;
    }
  };
  var NumberSettings = class extends Settings {
    constructor(name, defaultValue) {
      var _a2, _b;
      super(name);
      this._value = Number((_b = getDocumentData(name)) != null ? _b : (_a2 = localStorage[name]) != null ? _a2 : defaultValue);
    }
  };
  var BooleanSettings = class extends Settings {
    constructor(name, defaultValue) {
      super(name);
      if (getDocumentData(name))
        this._value = getDocumentData(name) === "True";
      else if (localStorage[name])
        this._value = localStorage[name] === "true";
      else
        this._value = defaultValue;
    }
  };

  // node_modules/idb-keyval/dist/index.js
  function promisifyRequest(request) {
    return new Promise((resolve, reject) => {
      request.oncomplete = request.onsuccess = () => resolve(request.result);
      request.onabort = request.onerror = () => reject(request.error);
    });
  }
  function createStore(dbName, storeName) {
    const request = indexedDB.open(dbName);
    request.onupgradeneeded = () => request.result.createObjectStore(storeName);
    const dbp = promisifyRequest(request);
    return (txMode, callback) => dbp.then((db) => callback(db.transaction(storeName, txMode).objectStore(storeName)));
  }
  var defaultGetStoreFunc;
  function defaultGetStore() {
    if (!defaultGetStoreFunc) {
      defaultGetStoreFunc = createStore("keyval-store", "keyval");
    }
    return defaultGetStoreFunc;
  }
  function get(key, customStore = defaultGetStore()) {
    return customStore("readonly", (store) => promisifyRequest(store.get(key)));
  }
  function set(key, value, customStore = defaultGetStore()) {
    return customStore("readwrite", (store) => {
      store.put(value, key);
      return promisifyRequest(store.transaction);
    });
  }
  function del(key, customStore = defaultGetStore()) {
    return customStore("readwrite", (store) => {
      store.delete(key);
      return promisifyRequest(store.transaction);
    });
  }

  // client/view.ts
  function radioList(settings, name, options, onchange) {
    const result = [];
    Object.keys(options).forEach((key) => {
      const id = name + "-" + key;
      result.push(h(`input#${id}`, {
        props: { name, type: "radio", value: key },
        attrs: { checked: settings.value === key },
        on: { change: (evt) => onchange(evt, key) }
      }));
      result.push(h("label", { attrs: { for: id } }, options[key]));
    });
    return result;
  }
  function slider(settings, name, min = 0, max = 100, step2 = 1, text) {
    const id = name;
    return [
      h(`input#${id}.slider`, {
        props: { name, type: "range", min, max, step: step2, value: settings.value },
        on: { input: (e) => settings.value = Number(e.target.value) }
      }),
      h("label", { attrs: { for: id } }, text)
    ];
  }
  function checkbox(settings, name, text) {
    const id = name;
    return [
      h(`input#${id}`, {
        props: { name, type: "checkbox" },
        attrs: { checked: settings.value },
        on: { change: (evt) => settings.value = evt.target.checked }
      }),
      h("label", { attrs: { for: id } }, text)
    ];
  }
  function nnueFile(settings, name, text, variant2) {
    const id = name;
    return [
      h(`input#${id}`, {
        props: { name, type: "file", accept: "*.nnue", title: _("Page reload required after change") },
        on: { change: (evt) => {
          const files3 = evt.target.files;
          if (files3 && files3.length > 0) {
            const fileName = files3[0].name;
            if (possibleNnueFile(fileName, variant2)) {
              settings.value = "";
              console.log("Selected file:", fileName);
              get(`${variant2}--nnue-file`).then((nnuefile) => {
                if (nnuefile === void 0) {
                  saveNnueFileToIdb(settings, variant2, files3[0]);
                } else {
                  if (nnuefile === fileName) {
                    console.log(variant2, "is already in idb.");
                  } else {
                    del(`${variant2}--nnue-file`);
                    saveNnueFileToIdb(settings, variant2, files3[0]);
                  }
                }
              });
            }
          }
        } }
      }),
      h("label", { attrs: { for: id } }, text)
    ];
  }
  function saveNnueFileToIdb(settings, variant2, file) {
    const fileName = file.name;
    var fileReader = new FileReader();
    fileReader.onload = function(event) {
      set(`${variant2}--nnue-data`, event.target.result).then(() => {
        set(`${variant2}--nnue-file`, fileName).then((nnuefile) => {
          settings.value = fileName;
          console.log(`${nnuefile} saved!`);
        }).catch((err) => {
          alert(err);
        });
      }).catch((err) => {
        alert(err);
      });
    };
    fileReader.readAsArrayBuffer(file);
  }
  function possibleNnueFile(fileName, variant2) {
    let possible;
    let prefix;
    switch (variant2) {
      case "chess":
      case "placement":
        prefix = "nn";
        break;
      case "cambodian":
        prefix = "makruk";
        break;
      default:
        prefix = variant2;
    }
    possible = fileName.startsWith(`${prefix}-`);
    if (!possible) {
      alert(`.nnue file name required to start with ${prefix}-`);
    }
    return possible;
  }

  // client/i18n.ts
  var i18n2 = gettext_default();
  function _(msgid, ...vars) {
    return i18n2.gettext(msgid, vars);
  }
  var LANGUAGES = {
    en: "English",
    de: "Deutsch",
    es: "Espa\xF1ol",
    fr: "Fran\xE7ais",
    gl_ES: "Galego",
    hu: "Magyar",
    it: "Italiano",
    ja: "\u65E5\u672C\u8A9E",
    ko: "\uD55C\uAD6D\uC5B4",
    nl: "Nederlands",
    pl: "Polskie",
    pt: "Portugu\xEAs",
    ru: "P\u0443\u0441\u0441\u043A\u0438\u0439",
    th: "\u0E44\u0E17\u0E22",
    tr: "T\xFCrk\xE7e",
    zh_CN: "\u7B80\u4F53\u4E2D\u6587",
    zh_TW: "\u7E41\u9AD4\u4E2D\u6587"
  };
  var LANGUAGETEXT = {
    en: "Language",
    de: "Sprache",
    es: "Idioma",
    fr: "Langue",
    gl_ES: "Lingua",
    hu: "Nyelv",
    it: "Lingua",
    ja: "\u8A00\u8A9E",
    ko: "\uC5B8\uC5B4",
    nl: "Taal",
    pl: "J\u0119zyk ",
    pt: "Lingua",
    ru: "\u042F\u0437\u044B\u043A",
    th: "\u0E20\u0E32\u0E29\u0E32",
    tr: "Dil",
    zh_CN: "\u8BED\u8A00",
    zh_TW: "\u8A9E\u8A00"
  };
  var preferredLang = window.navigator.language.slice(0, 2);
  var _a;
  var translatedLanguage = (_a = LANGUAGETEXT[preferredLang]) != null ? _a : "Language";
  var translatedColorNames = [
    _("White"),
    _("Black"),
    _("Red"),
    _("Blue"),
    _("Gold"),
    _("Pink"),
    _("Green")
  ];
  var translatedVariantDisplayNames = [
    _("chess"),
    _("crazyhouse"),
    _("placement"),
    _("atomic"),
    _("makruk"),
    _("makpong"),
    _("ouk chaktrang"),
    _("sittuyin"),
    _("asean"),
    _("shogi"),
    _("minishogi"),
    _("kyoto shogi"),
    _("dobutsu"),
    _("gorogoro"),
    _("gorogoro+"),
    _("tori shogi"),
    _("xiangqi"),
    _("manchu"),
    _("janggi"),
    _("minixiangqi"),
    _("capablanca"),
    _("capahouse"),
    _("s-chess"),
    _("s-house"),
    _("grand"),
    _("grandhouse"),
    _("shako"),
    _("shogun"),
    _("hoppel-poppel"),
    _("orda"),
    _("synochess"),
    _("shinobi"),
    _("empire"),
    _("orda mirror"),
    _("chak"),
    _("chennis")
  ];
  var translatedCustomStartPositions = [
    _("PawnsPushed"),
    _("PawnsPassed"),
    _("UpsideDown"),
    _("Theban"),
    _("No castle"),
    _("Lance HC"),
    _("Bishop HC"),
    _("Rook HC"),
    _("Rook+Lance HC"),
    _("2-Piece HC"),
    _("4-Piece HC"),
    _("6-Piece HC"),
    _("8-Piece HC"),
    _("9-Piece HC"),
    _("10-Piece HC"),
    _("Gorogoro Plus N+L"),
    _("Original (No N+L)"),
    _("Left Quail HC"),
    _("Falcon HC"),
    _("Falcon + Left Quail HC"),
    _("Falcon + Both Quails HC"),
    _("Bird"),
    _("Carrera"),
    _("Gothic"),
    _("Embassy"),
    _("Conservative")
  ];
  var translatedTooltips = [
    _("Chess, unmodified, as it's played by FIDE standards."),
    _("Take captured pieces and drop them back on to the board as your own."),
    _("Choose where your pieces start."),
    _("Pieces explode upon capture."),
    _("The duck must be moved to a new square after every turn."),
    _("Thai Chess. A game closely resembling the original Chaturanga. Similar to Chess but with a different queen and bishop."),
    _("Makruk variant where kings cannot move to escape out of check."),
    _("Cambodian Chess. Makruk with a few additional opening abilities."),
    _("Burmese Chess. Similar to Makruk, but pieces are placed at the start of the match."),
    _("Makruk using the board/pieces from International Chess as well as pawn promotion rules."),
    _("Japanese Chess, and the standard 9x9 version played today with drops and promotions. "),
    _("5x5 Shogi for more compact and faster games. There are no knights or lances."),
    _("A wild Shogi variant on a 5x5 board where pieces flip into a different piece after each move."),
    _("3x4 game with cute animals, designed to teach children how to play Shogi."),
    _("5x6 Shogi designed to introduce tactics with the generals."),
    _("A confrontational 7x7 variant with unique pieces each named after different birds."),
    _("Chinese Chess, one of the oldest and most played board games in the world."),
    _("Xiangqi variant where one side has a chariot that can also move as a cannon or horse."),
    _("Korean Chess, similar to Xiangqi but plays much differently. Tournament rules are used."),
    _("Compact version of Xiangqi played on a 7x7 board without a river."),
    _("Play with the hybrid pieces, archbishop (B+N) and chancellor (R+N), on a 10x8 board."),
    _("Capablanca with Crazyhouse drop rules."),
    _("Hybrid pieces, the hawk (B+N) and elephant (R+N), can enter the board after moving a back rank piece."),
    _("S-Chess with Crazyhouse drop rules."),
    _("Play with the hybrid pieces, archbishop (B+N) and chancellor (R+N), on a grand 10x10 board."),
    _("Grand Chess with Crazyhouse drop rules."),
    _("Introduces the cannon and elephant from Xiangqi into a 10x10 chess board."),
    _("Pieces promote and can be dropped, similar to Shogi."),
    _("Knights capture as bishops; bishops  capture as knights."),
    _("Asymmetric variant where one army has pieces that move like knights but capture differently."),
    _("Asymmetric East vs. West variant which pits the western Chess army against a Xiangqi and Janggi-styled army."),
    _("Asymmetric variant which pits the western Chess army against a drop-based, Shogi-styled army."),
    _("Asymmetric variant where one army has pieces that move like queens but capture as usual."),
    _("Orda Chess variant with two Horde armies. The Falcon replaces the Yurt."),
    _("Mayan chess. Inspired by cultural elements of Mesoamerica."),
    _("Pieces alternate between two forms with each move."),
    _("Like Capablanca Chess but with Grand starting setup."),
    _("Embassy with Crazyhouse drop rules."),
    _("Like Capablanca Chess but with a different starting setup."),
    _("Gothic with Crazyhouse drop rules.")
  ];
  var LanguageSettings = class extends StringSettings {
    constructor() {
      super("lang", "en");
    }
    update() {
    }
    view() {
      const langList = radioList(
        this,
        "lang",
        LANGUAGES,
        (evt, key) => {
          this.value = key;
          evt.target.form.submit();
        }
      );
      return h("div#settings-lang", [
        h("form.radio-list", { props: { method: "post", action: "/translation/select" } }, langList)
      ]);
    }
  };
  var languageSettings = new LanguageSettings();

  // node_modules/chessgroundx/fen.js
  var initial = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
  function read(fen, bd) {
    const piecesPart = fen.split(" ")[0];
    const bracketIdx = piecesPart.indexOf("[");
    let boardPart;
    let pocketPart;
    if (bracketIdx > -1) {
      boardPart = piecesPart.slice(0, bracketIdx);
      pocketPart = piecesPart.slice(bracketIdx + 1, piecesPart.indexOf("]"));
    } else {
      const ranks3 = piecesPart.split("/");
      boardPart = ranks3.slice(0, bd.height).join("/");
      pocketPart = ranks3.length > bd.height ? ranks3[bd.height] : void 0;
    }
    return {
      pieces: readBoard(boardPart),
      pockets: readPockets(pocketPart)
    };
  }
  function readBoard(fen) {
    if (fen === "start")
      fen = initial;
    const pieces = /* @__PURE__ */ new Map();
    let row = fen.split("/").length - 1;
    let col = 0;
    let promoted = false;
    let num = 0;
    for (const c of fen) {
      switch (c) {
        case " ":
        case "[":
          return pieces;
        case "/":
          --row;
          if (row < 0)
            return pieces;
          col = 0;
          num = 0;
          break;
        case "+":
          promoted = true;
          break;
        case "~": {
          const piece = pieces.get(pos2key([col - 1, row]));
          if (piece)
            piece.promoted = true;
          break;
        }
        default: {
          const nb = c.charCodeAt(0);
          if (48 <= nb && nb < 58) {
            num = 10 * num + nb - 48;
          } else {
            col += num;
            num = 0;
            const letter = c.toLowerCase();
            const piece = {
              role: roleOf(letter),
              color: c === letter ? "black" : "white"
            };
            if (promoted) {
              piece.role = "p" + piece.role;
              piece.promoted = true;
              promoted = false;
            }
            pieces.set(pos2key([col, row]), piece);
            ++col;
          }
        }
      }
    }
    return pieces;
  }
  function readPockets(pocketStr) {
    if (pocketStr !== void 0) {
      const whitePocket = /* @__PURE__ */ new Map();
      const blackPocket = /* @__PURE__ */ new Map();
      for (const p of pocketStr) {
        const role = roleOf(p);
        if (/[A-Z]/.test(p))
          changeNumber(whitePocket, role, 1);
        else if (/[a-z]/.test(p))
          changeNumber(blackPocket, role, 1);
      }
      return {
        white: whitePocket,
        black: blackPocket
      };
    } else {
      return void 0;
    }
  }
  function write(boardState, bd) {
    return writeBoard(boardState.pieces, bd) + writePockets(boardState.pockets);
  }
  function writeBoard(pieces, bd) {
    return invRanks.slice(-bd.height).map((y) => files.slice(0, bd.width).map((x) => {
      const piece = pieces.get(x + y);
      if (piece) {
        let p = letterOf(piece.role, piece.color === "white");
        if (piece.promoted && p.charAt(0) !== "+")
          p += "~";
        return p;
      } else
        return "1";
    }).join("")).join("/").replace(/1{2,}/g, (s) => s.length.toString());
  }
  function writePockets(pockets) {
    if (pockets)
      return "[" + writePocket(pockets.white, true) + writePocket(pockets.black, false) + "]";
    else
      return "";
  }
  function writePocket(pocket, asWhite) {
    const letters2 = [];
    for (const [r, n] of pocket.entries())
      letters2.push(letterOf(r, asWhite).repeat(n));
    return letters2.join("");
  }

  // client/material.ts
  function equivalentRole(role, equivalences, captureToHand) {
    if (captureToHand) {
      if (role.indexOf("-") > 1)
        return role.slice(1);
      else
        return role;
    } else {
      if (role in equivalences)
        return equivalences[role];
      else
        return role;
    }
  }
  function calculateDiff(fen, dimensions, equivalences, captureToHand) {
    var _a2, _b, _c;
    const materialDiff = /* @__PURE__ */ new Map();
    const boardState = read(fen, dimensions);
    for (const [_2, piece] of boardState.pieces) {
      const role = equivalentRole(piece.role, equivalences, captureToHand);
      const num = (_a2 = materialDiff.get(role)) != null ? _a2 : 0;
      materialDiff.set(role, piece.color === "white" ? num - 1 : num + 1);
    }
    if (boardState.pockets) {
      for (const [r, c] of boardState.pockets.white.entries()) {
        const role = equivalentRole(r, equivalences, captureToHand);
        const num = (_b = materialDiff.get(role)) != null ? _b : 0;
        materialDiff.set(role, num - c);
      }
      for (const [r, c] of boardState.pockets.black.entries()) {
        const role = equivalentRole(r, equivalences, captureToHand);
        const num = (_c = materialDiff.get(role)) != null ? _c : 0;
        materialDiff.set(role, num + c);
      }
    }
    return materialDiff;
  }

  // client/variants.ts
  var BOARD_FAMILIES = {
    standard8x8: { dimensions: { width: 8, height: 8 }, cg: "cg-512", boardCSS: ["8x8brown.svg", "8x8blue.svg", "8x8green.svg", "8x8maple.jpg", "8x8olive.jpg", "8x8santa.png", "8x8wood2.jpg", "8x8wood4.jpg", "8x8ic.svg", "8x8purple.svg"] },
    standard10x8: { dimensions: { width: 10, height: 8 }, cg: "cg-640", boardCSS: ["10x8brown.svg", "10x8blue.svg", "10x8green.svg", "10x8maple.jpg", "10x8olive.jpg"] },
    standard10x10: { dimensions: { width: 10, height: 10 }, cg: "cg-640-640", boardCSS: ["10x10brown.svg", "10x10blue.svg", "10x10green.svg", "10x10maple.jpg", "10x10olive.jpg"] },
    grand10x10: { dimensions: { width: 10, height: 10 }, cg: "cg-640-640", boardCSS: ["Grandboard.svg", "10x10brown.svg", "10x10blue.svg", "10x10green.svg", "10x10maple.jpg", "10x10mapleGrand.png"] },
    makruk8x8: { dimensions: { width: 8, height: 8 }, cg: "cg-512", boardCSS: ["makruk2.svg", "makruk.svg", "makrukWhite.svg", "makruk.jpg", "makrukWood.png"] },
    sittuyin8x8: { dimensions: { width: 8, height: 8 }, cg: "cg-512", boardCSS: ["sittuyin2.svg", "sittuyin.svg", "sittuyin.jpg", "sittuyingreen.svg", "sittuyinGrainBrown.svg", "sittuyinWood.png"] },
    shogi9x9: { dimensions: { width: 9, height: 9 }, cg: "cg-576", boardCSS: ["shogi.svg", "Shogiban1.png", "Shogiban2.png", "shogic.svg", "ShogiMaple.png", "ShogiGrayTexture.png", "ShogiSpace1.svg", "dobutsu.png", "ShogiOak.png"] },
    shogi7x7: { dimensions: { width: 7, height: 7 }, cg: "cg-448-516", boardCSS: ["ToriPlain.svg", "ToriWood.svg", "ToriDaySky.svg", "ToriNightSky.svg"] },
    shogi5x5: { dimensions: { width: 5, height: 5 }, cg: "cg-260", boardCSS: ["minishogi.svg", "MiniboardWood1.png", "MiniboardWood2.png", "MinishogiDobutsu.svg", "MinishogiDobutsu2.svg"] },
    shogi5x6: { dimensions: { width: 5, height: 6 }, cg: "cg-260-360", boardCSS: ["gorogoro.svg", "gorogoroboard.svg", "gorogoro2.svg", "GorogoroWood.png"] },
    shogi3x4: { dimensions: { width: 3, height: 4 }, cg: "cg-156", boardCSS: ["doubutsuboard.svg", "dobutsu3x4.svg"] },
    xiangqi9x10: { dimensions: { width: 9, height: 10 }, cg: "cg-576-640", boardCSS: ["xiangqi.svg", "xiangqic.svg", "xiangqiCTexture.png", "xiangqiPaper.png", "xiangqiWood.png", "xiangqiDark.svg", "xiangqiWikimedia.svg", "xiangqiLightWood.png", "xiangqiSand.svg"] },
    xiangqi7x7: { dimensions: { width: 7, height: 7 }, cg: "cg-448", boardCSS: ["minixiangqi.svg", "minixiangqiw.png", "minixqlg.svg"] },
    janggi9x10: { dimensions: { width: 9, height: 10 }, cg: "cg-576-640", boardCSS: ["JanggiBrown.svg", "JanggiPaper.png", "JanggiWood.png", "JanggiDark.svg", "JanggiWoodDark.svg", "JanggiStone.svg"] },
    shogun8x8: { dimensions: { width: 8, height: 8 }, cg: "cg-512", boardCSS: ["ShogunPlain.svg", "ShogunMaple.png", "ShogunMaple2.png", "ShogunBlue.svg", "8x8brown.svg", "8x8maple.jpg"] },
    chak9x9: { dimensions: { width: 9, height: 9 }, cg: "cg-540", boardCSS: ["StandardChakBoard.svg", "ColoredChakBoard.svg", "ChakArt.jpg"] },
    chennis7x7: { dimensions: { width: 7, height: 7 }, cg: "cg-448", boardCSS: ["WimbledonBoard.svg", "FrenchOpenBoard.svg", "USOpenBoard.svg"] }
  };
  var PIECE_FAMILIES = {
    standard: { pieceCSS: ["standard", "green", "alpha", "chess_kaneo", "santa", "maestro", "dubrovny", "disguised", "atopdown"] },
    capa: { pieceCSS: ["capa0", "capa1", "capa2", "capa3", "capa4", "capa5", "disguised"] },
    seirawan: { pieceCSS: ["seir1", "seir0", "seir2", "seir3", "seir4", "seir5", "disguised"] },
    makruk: { pieceCSS: ["makrukwb", "makrukwr", "makruk", "makruks", "makruki", "makrukc", "disguised"] },
    sittuyin: { pieceCSS: ["sittuyins", "sittuyinkagr", "sittuyinkabr", "sittuyinm", "sittuyini", "sittuyincb", "disguised"] },
    asean: { pieceCSS: ["aseani", "aseanm", "aseanc", "aseans", "aseancb", "disguised"] },
    shogi: { pieceCSS: ["shogik", "shogi", "shogiw", "shogip", "shogim", "shogip3d", "shogikw3d", "shogid", "shogiim", "shogibw", "portk", "porti", "disguised"] },
    kyoto: { pieceCSS: ["kyoto", "kyotok", "kyotoks", "kyotoi", "kyotod", "disguised"] },
    dobutsu: { pieceCSS: ["dobutsu", "disguised"] },
    tori: { pieceCSS: ["torii", "torik", "torim", "porti", "disguised"] },
    xiangqi: { pieceCSS: ["xiangqi2d", "xiangqi2di", "xiangqi", "xiangqict3", "xiangqihnz", "xiangqict2", "xiangqihnzw", "xiangqict2w", "xiangqiwikim", "xiangqiKa", "xiangqittxqhnz", "xiangqittxqintl", "disguised", "euro"] },
    janggi: { pieceCSS: ["janggihb", "janggihg", "janggiikak", "janggiikaw", "janggikak", "janggikaw", "janggiib", "janggiig", "disguised"] },
    shako: { pieceCSS: ["shako0", "shako1", "shako2", "disguised"] },
    shogun: { pieceCSS: ["shogun0", "shogun1", "shogun2", "shogun3", "shogun4", "shogun5", "disguised"] },
    orda: { pieceCSS: ["orda0", "orda1", "disguised"] },
    synochess: { pieceCSS: ["synochess0", "synochess1", "synochess2", "synochess3", "synochess4", "synochess5", "disguised"] },
    hoppel: { pieceCSS: ["hoppel0", "hoppel1", "hoppel2", "disguised"] },
    shinobi: { pieceCSS: ["shinobi0", "shinobi1", "disguised"] },
    empire: { pieceCSS: ["empire0", "empire1", "disguised"] },
    ordamirror: { pieceCSS: ["ordamirror0", "ordamirror1", "disguised"] },
    chak: { pieceCSS: ["chak0", "disguised"] },
    chennis: { pieceCSS: ["chennis0", "chennis1", "chennis2", "disguised"] },
    spartan: { pieceCSS: ["spartan0", "disguised"] }
  };
  function variant(config) {
    var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G;
    return {
      name: config.name,
      _displayName: (_a2 = config.displayName) != null ? _a2 : config.name,
      displayName: function(chess960 = false) {
        return _(this._displayName).toUpperCase() + (chess960 ? "960" : "");
      },
      _tooltip: config.tooltip,
      get tooltip() {
        return _(this._tooltip);
      },
      chess960: !!config.chess960,
      _icon: config.icon,
      _icon960: (_b = config.icon960) != null ? _b : config.icon,
      icon: function(chess960 = false) {
        return chess960 ? this._icon960 : this._icon;
      },
      startFen: config.startFen,
      boardFamily: config.boardFamily,
      board: BOARD_FAMILIES[config.boardFamily],
      pieceFamily: config.pieceFamily,
      piece: PIECE_FAMILIES[config.pieceFamily],
      colors: (_c = config.colors) != null ? _c : { first: "White", second: "Black" },
      pieceRow: Array.isArray(config.pieceRow) ? {
        white: config.pieceRow.map(roleOf),
        black: config.pieceRow.map(roleOf)
      } : {
        white: config.pieceRow.white.map(roleOf),
        black: config.pieceRow.black.map(roleOf)
      },
      kingRoles: ((_d = config.kingRoles) != null ? _d : ["k"]).map(roleOf),
      pocket: config.pocket ? {
        roles: Array.isArray(config.pocket.roles) ? {
          white: config.pocket.roles.map(roleOf),
          black: config.pocket.roles.map(roleOf)
        } : {
          white: config.pocket.roles.white.map(roleOf),
          black: config.pocket.roles.black.map(roleOf)
        },
        captureToHand: config.pocket.captureToHand
      } : void 0,
      promotion: {
        type: (_f = (_e = config.promotion) == null ? void 0 : _e.type) != null ? _f : "regular",
        order: (_i = (_g = config.promotion) == null ? void 0 : _g.order) != null ? _i : ((_h = config.promotion) == null ? void 0 : _h.type) === "shogi" ? ["+", ""] : ["q", "c", "e", "a", "h", "n", "r", "b", "p"],
        roles: ((_k = (_j = config.promotion) == null ? void 0 : _j.roles) != null ? _k : ["p"]).map(roleOf),
        strict: (_l = config.promotion) == null ? void 0 : _l.strict,
        get autoPromoteable() {
          return this.order.length > 2;
        }
      },
      rules: {
        defaultTimeControl: (_n = (_m = config.rules) == null ? void 0 : _m.defaultTimeControl) != null ? _n : "incremental",
        enPassant: !!((_o = config.rules) == null ? void 0 : _o.enPassant),
        gate: !!((_p = config.rules) == null ? void 0 : _p.gate),
        duck: !!((_q = config.rules) == null ? void 0 : _q.duck),
        pass: !!((_r = config.rules) == null ? void 0 : _r.pass),
        setup: !!((_s = config.rules) == null ? void 0 : _s.setup)
      },
      material: {
        showDiff: !((_t = config.pocket) == null ? void 0 : _t.captureToHand),
        initialDiff: calculateDiff(config.startFen, BOARD_FAMILIES[config.boardFamily].dimensions, (_v = (_u = config.material) == null ? void 0 : _u.equivalences) != null ? _v : {}, !!((_w = config.pocket) == null ? void 0 : _w.captureToHand)),
        equivalences: (_y = (_x = config.material) == null ? void 0 : _x.equivalences) != null ? _y : {}
      },
      ui: {
        counting: (_z = config.ui) == null ? void 0 : _z.counting,
        materialPoint: (_A = config.ui) == null ? void 0 : _A.materialPoint,
        showPromoted: (_C = (_B = config.ui) == null ? void 0 : _B.showPromoted) != null ? _C : false,
        pieceSound: (_E = (_D = config.ui) == null ? void 0 : _D.pieceSound) != null ? _E : "regular",
        boardMark: (_G = (_F = config.ui) == null ? void 0 : _F.boardMark) != null ? _G : ""
      },
      alternateStart: config.alternateStart
    };
  }
  var VARIANTS = {
    chess: variant({
      name: "chess",
      tooltip: "Chess, unmodified, as it's played by FIDE standards.",
      startFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      chess960: true,
      icon: "M",
      icon960: "V",
      boardFamily: "standard8x8",
      pieceFamily: "standard",
      pieceRow: ["k", "q", "r", "b", "n", "p"],
      rules: { enPassant: true },
      alternateStart: {
        "": "",
        "PawnsPushed": "rnbqkbnr/8/8/pppppppp/PPPPPPPP/8/8/RNBQKBNR w KQkq - 0 1",
        "PawnsPassed": "rnbqkbnr/8/8/PPPPPPPP/pppppppp/8/8/RNBQKBNR w KQkq - 0 1",
        "UpsideDown": "RNBKQBNR/PPPPPPPP/8/8/8/8/pppppppp/rnbkqbnr w - - 0 1",
        "Theban": "1p6/2p3kn/3p2pp/4pppp/5ppp/8/PPPPPPPP/PPPPPPKN w - - 0 1",
        "No castle": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1"
      }
    }),
    crazyhouse: variant({
      name: "crazyhouse",
      tooltip: "Take captured pieces and drop them back on to the board as your own.",
      startFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR[] w KQkq - 0 1",
      chess960: true,
      icon: "+",
      icon960: "%",
      boardFamily: "standard8x8",
      pieceFamily: "standard",
      pieceRow: ["k", "q", "r", "b", "n", "p"],
      pocket: {
        roles: ["p", "n", "b", "r", "q"],
        captureToHand: true
      },
      rules: { enPassant: true },
      alternateStart: {
        "": "",
        "PawnsPushed": "rnbqkbnr/8/8/pppppppp/PPPPPPPP/8/8/RNBQKBNR w - - 0 1",
        "PawnsPassed": "rnbqkbnr/8/8/PPPPPPPP/pppppppp/8/8/RNBQKBNR w - - 0 1",
        "UpsideDown": "RNBQKBNR/PPPPPPPP/8/8/8/8/pppppppp/rnbqkbnr w - - 0 1",
        "Theban": "1p6/2p3kn/3p2pp/4pppp/5ppp/8/PPPPPPPP/PPPPPPKN w - - 0 1",
        "No castle": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1"
      }
    }),
    placement: variant({
      name: "placement",
      tooltip: "Choose where your pieces start.",
      startFen: "8/pppppppp/8/8/8/8/PPPPPPPP/8[KQRRBBNNkqrrbbnn] w - - 0 1",
      icon: "S",
      boardFamily: "standard8x8",
      pieceFamily: "standard",
      pieceRow: ["k", "q", "r", "b", "n", "p"],
      pocket: { roles: ["n", "b", "r", "q", "k"], captureToHand: false },
      rules: { enPassant: true }
    }),
    atomic: variant({
      name: "atomic",
      tooltip: "Pieces explode upon capture.",
      startFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      chess960: true,
      icon: "~",
      icon960: "\\",
      boardFamily: "standard8x8",
      pieceFamily: "standard",
      pieceRow: ["k", "q", "r", "b", "n", "p"],
      rules: { enPassant: true },
      ui: { pieceSound: "atomic" }
    }),
    duck: variant({
      name: "duck",
      tooltip: "The duck must be moved to a new square after every turn.",
      startFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      icon: "\u{1F986}",
      boardFamily: "standard8x8",
      pieceFamily: "standard",
      pieceRow: { white: ["k", "q", "r", "b", "n", "p", "*"], black: ["k", "q", "r", "b", "n", "p"] },
      rules: { enPassant: true, duck: true }
    }),
    makruk: variant({
      name: "makruk",
      tooltip: "Thai Chess. A game closely resembling the original Chaturanga. Similar to Chess but with a different queen and bishop.",
      startFen: "rnsmksnr/8/pppppppp/8/8/PPPPPPPP/8/RNSKMSNR w - - 0 1",
      icon: "Q",
      boardFamily: "makruk8x8",
      pieceFamily: "makruk",
      pieceRow: ["k", "s", "m", "n", "r", "p", "m~"],
      promotion: { type: "regular", order: ["m"] },
      ui: { counting: "makruk", showPromoted: true }
    }),
    makpong: variant({
      name: "makpong",
      tooltip: _("Makruk variant where kings cannot move to escape out of check."),
      startFen: "rnsmksnr/8/pppppppp/8/8/PPPPPPPP/8/RNSKMSNR w - - 0 1",
      icon: "O",
      boardFamily: "makruk8x8",
      pieceFamily: "makruk",
      pieceRow: ["k", "s", "m", "n", "r", "p", "m~"],
      promotion: { type: "regular", order: ["m"] },
      ui: { counting: "makruk", showPromoted: true }
    }),
    cambodian: variant({
      name: "cambodian",
      displayName: "ouk chaktrang",
      tooltip: "Cambodian Chess. Makruk with a few additional opening abilities.",
      startFen: "rnsmksnr/8/pppppppp/8/8/PPPPPPPP/8/RNSKMSNR w DEde - 0 1",
      icon: "!",
      boardFamily: "makruk8x8",
      pieceFamily: "makruk",
      pieceRow: ["k", "s", "m", "n", "r", "p", "m~"],
      promotion: { type: "regular", order: ["m"] },
      ui: { counting: "makruk", showPromoted: true }
    }),
    sittuyin: variant({
      name: "sittuyin",
      tooltip: "Burmese Chess. Similar to Makruk, but pieces are placed at the start of the match.",
      startFen: "8/8/4pppp/pppp4/4PPPP/PPPP4/8/8[KFRRSSNNkfrrssnn] w - - 0 1",
      icon: ":",
      boardFamily: "sittuyin8x8",
      pieceFamily: "sittuyin",
      colors: { first: "Red", second: "Black" },
      pieceRow: ["k", "f", "s", "n", "r", "p"],
      pocket: { roles: ["r", "n", "s", "f", "k"], captureToHand: false },
      promotion: { type: "regular", order: ["f"] }
    }),
    asean: variant({
      name: "asean",
      tooltip: "Makruk using the board/pieces from International Chess as well as pawn promotion rules.",
      startFen: "rnbqkbnr/8/pppppppp/8/8/PPPPPPPP/8/RNBQKBNR w - - 0 1",
      icon: "\u267B",
      boardFamily: "standard8x8",
      pieceFamily: "asean",
      pieceRow: ["k", "q", "b", "n", "r", "p"],
      promotion: { type: "regular", order: ["r", "n", "b", "q"] },
      ui: { counting: "asean" }
    }),
    shogi: variant({
      name: "shogi",
      tooltip: _("Japanese Chess, and the standard 9x9 version played today with drops and promotions. "),
      startFen: "lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL[-] w 0 1",
      icon: "K",
      boardFamily: "shogi9x9",
      pieceFamily: "shogi",
      colors: { first: "Black", second: "White" },
      pieceRow: ["k", "g", "r", "b", "s", "n", "l", "p"],
      pocket: { roles: ["p", "l", "n", "s", "g", "b", "r"], captureToHand: true },
      promotion: { type: "shogi", roles: ["p", "l", "n", "s", "r", "b"] },
      rules: { defaultTimeControl: "byoyomi" },
      ui: { pieceSound: "shogi" },
      alternateStart: {
        "": "",
        "Lance HC": "lnsgkgsn1/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL[-] b 0 1",
        "Bishop HC": "lnsgkgsnl/1r7/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL[-] b 0 1",
        "Rook HC": "lnsgkgsnl/7b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL[-] b 0 1",
        "Rook+Lance HC": "lnsgkgsn1/7b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL[-] b 0 1",
        "2-Piece HC": "lnsgkgsnl/9/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL[-] b 0 1",
        "4-Piece HC": "1nsgkgsn1/9/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL[-] b 0 1",
        "6-Piece HC": "2sgkgs2/9/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL[-] b 0 1",
        "8-Piece HC": "3gkg3/9/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL[-] b 0 1",
        "9-Piece HC": "3gk4/9/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL[-] b 0 1",
        "10-Piece HC": "4k4/9/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL[-] b 0 1"
      }
    }),
    minishogi: variant({
      name: "minishogi",
      tooltip: "5x5 Shogi for more compact and faster games. There are no knights or lances.",
      startFen: "rbsgk/4p/5/P4/KGSBR[-] w 0 1",
      icon: "6",
      boardFamily: "shogi5x5",
      pieceFamily: "shogi",
      colors: { first: "Black", second: "White" },
      pieceRow: ["k", "g", "r", "b", "s", "p"],
      pocket: { roles: ["p", "s", "g", "b", "r"], captureToHand: true },
      promotion: { type: "shogi", roles: ["p", "s", "r", "b"] },
      rules: { defaultTimeControl: "byoyomi" },
      ui: { pieceSound: "shogi" }
    }),
    kyotoshogi: variant({
      name: "kyotoshogi",
      displayName: "kyoto shogi",
      tooltip: "A wild Shogi variant on a 5x5 board where pieces flip into a different piece after each move.",
      startFen: "p+nks+l/5/5/5/+LSK+NP[-] w 0 1",
      icon: ")",
      boardFamily: "shogi5x5",
      pieceFamily: "kyoto",
      colors: { first: "Black", second: "White" },
      pieceRow: ["k", "l", "s", "n", "p"],
      pocket: { roles: ["p", "l", "n", "s"], captureToHand: true },
      promotion: { type: "shogi", roles: ["p", "l", "n", "s"] },
      rules: { defaultTimeControl: "byoyomi" },
      ui: { pieceSound: "shogi" }
    }),
    dobutsu: variant({
      name: "dobutsu",
      tooltip: _("3x4 game with cute animals, designed to teach children how to play Shogi."),
      startFen: "gle/1c1/1C1/ELG[-] w 0 1",
      icon: "8",
      boardFamily: "shogi3x4",
      pieceFamily: "dobutsu",
      colors: { first: "Black", second: "White" },
      pieceRow: ["l", "g", "e", "c"],
      kingRoles: ["l"],
      pocket: { roles: ["e", "g", "c"], captureToHand: true },
      promotion: { type: "shogi", roles: ["c"] },
      rules: { defaultTimeControl: "byoyomi" },
      ui: { pieceSound: "shogi" }
    }),
    gorogoro: variant({
      name: "gorogoro",
      tooltip: "5x6 Shogi designed to introduce tactics with the generals.",
      startFen: "sgkgs/5/1ppp1/1PPP1/5/SGKGS[-] w 0 1",
      icon: "\u{1F431}",
      boardFamily: "shogi5x6",
      pieceFamily: "shogi",
      colors: { first: "Black", second: "White" },
      pieceRow: ["k", "g", "s", "p"],
      pocket: { roles: ["p", "s", "g"], captureToHand: true },
      promotion: { type: "shogi", roles: ["p", "s"] },
      rules: { defaultTimeControl: "byoyomi" },
      ui: { pieceSound: "shogi" }
    }),
    gorogoroplus: variant({
      name: "gorogoroplus",
      displayName: "gorogoro+",
      tooltip: "5x6 Shogi designed to introduce tactics with the generals.",
      startFen: "sgkgs/5/1ppp1/1PPP1/5/SGKGS[LNln] w 0 1",
      icon: "\u{1F431}",
      boardFamily: "shogi5x6",
      pieceFamily: "shogi",
      colors: { first: "Black", second: "White" },
      pieceRow: ["k", "g", "s", "n", "l", "p"],
      pocket: { roles: ["p", "l", "n", "s", "g"], captureToHand: true },
      promotion: { type: "shogi", roles: ["p", "s", "n", "l"] },
      rules: { defaultTimeControl: "byoyomi" },
      ui: { pieceSound: "shogi" },
      alternateStart: {
        "Gorogoro Plus N+L": "",
        "Original (No N+L)": "sgkgs/5/1ppp1/1PPP1/5/SGKGS[-] w 0 1"
      }
    }),
    torishogi: variant({
      name: "torishogi",
      displayName: "tori shogi",
      tooltip: "A confrontational 7x7 variant with unique pieces each named after different birds.",
      startFen: "rpckcpl/3f3/sssssss/2s1S2/SSSSSSS/3F3/LPCKCPR[-] w 0 1",
      icon: "\u{1F426}",
      boardFamily: "shogi7x7",
      pieceFamily: "tori",
      colors: { first: "Black", second: "White" },
      pieceRow: ["k", "c", "p", "l", "r", "f", "s"],
      pocket: { roles: ["s", "p", "l", "r", "c", "f"], captureToHand: true },
      promotion: { type: "shogi", roles: ["s", "f"] },
      rules: { defaultTimeControl: "byoyomi" },
      ui: { pieceSound: "shogi" },
      alternateStart: {
        "": "",
        "Left Quail HC": "rpckcp1/3f3/sssssss/2s1S2/SSSSSSS/3F3/LPCKCPR[] b 0 1",
        "Falcon HC": "rpckcpl/7/sssssss/2s1S2/SSSSSSS/3F3/LPCKCPR[] b 0 1",
        "Falcon + Left Quail HC": "rpckcp1/7/sssssss/2s1S2/SSSSSSS/3F3/LPCKCPR[] b 0 1",
        "Falcon + Both Quails HC": "1pckcp1/7/sssssss/2s1S2/SSSSSSS/3F3/LPCKCPR[] b 0 1"
      }
    }),
    xiangqi: variant({
      name: "xiangqi",
      tooltip: "Chinese Chess, one of the oldest and most played board games in the world.",
      startFen: "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
      icon: "|",
      boardFamily: "xiangqi9x10",
      pieceFamily: "xiangqi",
      colors: { first: "Red", second: "Black" },
      pieceRow: ["k", "a", "c", "r", "b", "n", "p"],
      promotion: { type: "regular", roles: [] }
    }),
    manchu: variant({
      name: "manchu",
      tooltip: "Xiangqi variant where one side has a chariot that can also move as a cannon or horse.",
      startFen: "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/9/9/M1BAKAB2 w - - 0 1",
      icon: "{",
      boardFamily: "xiangqi9x10",
      pieceFamily: "xiangqi",
      colors: { first: "Red", second: "Black" },
      pieceRow: { white: ["k", "a", "m", "b", "p"], black: ["k", "a", "c", "r", "b", "n", "p"] },
      promotion: { type: "regular", roles: [] }
    }),
    janggi: variant({
      name: "janggi",
      tooltip: "Korean Chess, similar to Xiangqi but plays much differently. Tournament rules are used.",
      startFen: "rnba1abnr/4k4/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/4K4/RNBA1ABNR w - - 0 1",
      icon: "=",
      boardFamily: "janggi9x10",
      pieceFamily: "janggi",
      colors: { first: "Blue", second: "Red" },
      pieceRow: ["k", "a", "c", "r", "b", "n", "p"],
      promotion: { type: "regular", roles: [] },
      rules: { defaultTimeControl: "byoyomi", pass: true, setup: true },
      ui: { materialPoint: "janggi" }
    }),
    minixiangqi: variant({
      name: "minixiangqi",
      tooltip: "Compact version of Xiangqi played on a 7x7 board without a river.",
      startFen: "rcnkncr/p1ppp1p/7/7/7/P1PPP1P/RCNKNCR w - - 0 1",
      icon: "7",
      boardFamily: "xiangqi7x7",
      pieceFamily: "xiangqi",
      colors: { first: "Red", second: "Black" },
      pieceRow: ["k", "c", "r", "n", "p"],
      promotion: { type: "regular", roles: [] }
    }),
    capablanca: variant({
      name: "capablanca",
      tooltip: "Play with the hybrid pieces, archbishop (B+N) and chancellor (R+N), on a 10x8 board.",
      startFen: "rnabqkbcnr/pppppppppp/10/10/10/10/PPPPPPPPPP/RNABQKBCNR w KQkq - 0 1",
      chess960: true,
      icon: "P",
      icon960: ",",
      boardFamily: "standard10x8",
      pieceFamily: "capa",
      pieceRow: ["k", "q", "c", "a", "r", "b", "n", "p"],
      rules: { enPassant: true },
      alternateStart: {
        "": "",
        "Bird": "rnbcqkabnr/pppppppppp/10/10/10/10/PPPPPPPPPP/RNBCQKABNR w KQkq - 0 1",
        "Carrera": "rcnbqkbnar/pppppppppp/10/10/10/10/PPPPPPPPPP/RCNBQKBNAR w KQkq - 0 1",
        "Conservative": "arnbqkbnrc/pppppppppp/10/10/10/10/PPPPPPPPPP/ARNBQKBNRC w KQkq - 0 1",
        "Embassy": "rnbqkcabnr/pppppppppp/10/10/10/10/PPPPPPPPPP/RNBQKCABNR w KQkq - 0 1",
        "Gothic": "rnbqckabnr/pppppppppp/10/10/10/10/PPPPPPPPPP/RNBQCKABNR w KQkq - 0 1",
        "Schoolbook": "rqnbakbncr/pppppppppp/10/10/10/10/PPPPPPPPPP/RQNBAKBNCR w KQkq - 0 1"
      }
    }),
    capahouse: variant({
      name: "capahouse",
      tooltip: _("Capablanca with Crazyhouse drop rules."),
      startFen: "rnabqkbcnr/pppppppppp/10/10/10/10/PPPPPPPPPP/RNABQKBCNR[] w KQkq - 0 1",
      chess960: true,
      icon: "&",
      icon960: "'",
      boardFamily: "standard10x8",
      pieceFamily: "capa",
      pieceRow: ["k", "q", "c", "a", "r", "b", "n", "p"],
      pocket: { roles: ["p", "n", "b", "r", "a", "c", "q"], captureToHand: true },
      rules: { enPassant: true },
      alternateStart: {
        "": "",
        "Bird": "rnbcqkabnr/pppppppppp/10/10/10/10/PPPPPPPPPP/RNBCQKABNR[] w KQkq - 0 1",
        "Carrera": "rcnbqkbnar/pppppppppp/10/10/10/10/PPPPPPPPPP/RCNBQKBNAR[] w KQkq - 0 1",
        "Conservative": "arnbqkbnrc/pppppppppp/10/10/10/10/PPPPPPPPPP/ARNBQKBNRC[] w KQkq - 0 1",
        "Embassy": "rnbqkcabnr/pppppppppp/10/10/10/10/PPPPPPPPPP/RNBQKCABNR[] w KQkq - 0 1",
        "Gothic": "rnbqckabnr/pppppppppp/10/10/10/10/PPPPPPPPPP/RNBQCKABNR[] w KQkq - 0 1",
        "Schoolbook": "rqnbakbncr/pppppppppp/10/10/10/10/PPPPPPPPPP/RQNBAKBNCR[] w KQkq - 0 1"
      }
    }),
    seirawan: variant({
      name: "seirawan",
      displayName: "s-chess",
      tooltip: "Hybrid pieces, the hawk (B+N) and elephant (R+N), can enter the board after moving a back rank piece.",
      startFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR[HEhe] w KQBCDFGkqbcdfg - 0 1",
      icon: "L",
      chess960: true,
      icon960: "}",
      boardFamily: "standard8x8",
      pieceFamily: "seirawan",
      pieceRow: ["k", "q", "e", "h", "r", "b", "n", "p"],
      pocket: { roles: ["h", "e"], captureToHand: false },
      rules: { enPassant: true, gate: true }
    }),
    shouse: variant({
      name: "shouse",
      displayName: "s-house",
      tooltip: "S-Chess with Crazyhouse drop rules.",
      startFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR[HEhe] w KQBCDFGkqbcdfg - 0 1",
      icon: "$",
      boardFamily: "standard8x8",
      pieceFamily: "seirawan",
      pieceRow: ["k", "q", "e", "h", "r", "b", "n", "p"],
      pocket: { roles: ["p", "n", "b", "r", "h", "e", "q"], captureToHand: true },
      rules: { enPassant: true, gate: true }
    }),
    grand: variant({
      name: "grand",
      tooltip: _("Play with the hybrid pieces, archbishop (B+N) and chancellor (R+N), on a grand 10x10 board."),
      startFen: "r8r/1nbqkcabn1/pppppppppp/10/10/10/10/PPPPPPPPPP/1NBQKCABN1/R8R w - - 0 1",
      icon: "(",
      boardFamily: "grand10x10",
      pieceFamily: "capa",
      pieceRow: ["k", "q", "c", "a", "r", "b", "n", "p"],
      rules: { enPassant: true }
    }),
    grandhouse: variant({
      name: "grandhouse",
      tooltip: "Grand Chess with Crazyhouse drop rules.",
      startFen: "r8r/1nbqkcabn1/pppppppppp/10/10/10/10/PPPPPPPPPP/1NBQKCABN1/R8R[] w - - 0 1",
      icon: "*",
      boardFamily: "grand10x10",
      pieceFamily: "capa",
      pieceRow: ["k", "q", "c", "a", "r", "b", "n", "p"],
      pocket: { roles: ["p", "n", "b", "r", "a", "c", "q"], captureToHand: true },
      rules: { enPassant: true }
    }),
    shako: variant({
      name: "shako",
      tooltip: "Introduces the cannon and elephant from Xiangqi into a 10x10 chess board.",
      startFen: "c8c/ernbqkbnre/pppppppppp/10/10/10/10/PPPPPPPPPP/ERNBQKBNRE/C8C w KQkq - 0 1",
      icon: "9",
      boardFamily: "standard10x10",
      pieceFamily: "shako",
      pieceRow: ["k", "q", "e", "c", "r", "b", "n", "p"],
      promotion: { type: "regular", order: ["q", "n", "c", "r", "e", "b"] },
      rules: { enPassant: true }
    }),
    shogun: variant({
      name: "shogun",
      tooltip: "Pieces promote and can be dropped, similar to Shogi.",
      startFen: "rnb+fkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNB+FKBNR w KQkq - 0 1",
      icon: "-",
      boardFamily: "shogun8x8",
      pieceFamily: "shogun",
      pieceRow: ["k", "f", "r", "b", "n", "p"],
      pocket: { roles: ["p", "n", "b", "r", "f"], captureToHand: true },
      promotion: { type: "shogi", roles: ["p", "f", "r", "b", "n"] },
      rules: { defaultTimeControl: "byoyomi", enPassant: true }
    }),
    hoppelpoppel: variant({
      name: "hoppelpoppel",
      displayName: "hoppel-poppel",
      tooltip: "Knights capture as bishops; bishops  capture as knights.",
      startFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      icon: "`",
      boardFamily: "standard8x8",
      pieceFamily: "hoppel",
      pieceRow: ["k", "q", "r", "b", "n", "p"],
      rules: { enPassant: true }
    }),
    orda: variant({
      name: "orda",
      tooltip: "Asymmetric variant where one army has pieces that move like knights but capture differently.",
      startFen: "lhaykahl/8/pppppppp/8/8/8/PPPPPPPP/RNBQKBNR w KQ - 0 1",
      icon: "R",
      boardFamily: "standard8x8",
      pieceFamily: "orda",
      colors: { first: "White", second: "Gold" },
      pieceRow: { white: ["k", "q", "r", "b", "n", "p", "h"], black: ["k", "y", "l", "a", "h", "p", "q"] },
      promotion: { type: "regular", order: ["q", "h"] },
      rules: { enPassant: true },
      ui: { boardMark: "campmate" }
    }),
    synochess: variant({
      name: "synochess",
      tooltip: _("Asymmetric East vs. West variant which pits the western Chess army against a Xiangqi and Janggi-styled army."),
      startFen: "rneakenr/8/1c4c1/1ss2ss1/8/8/PPPPPPPP/RNBQKBNR[ss] w KQ - 0 1",
      icon: "_",
      boardFamily: "standard8x8",
      pieceFamily: "synochess",
      colors: { first: "White", second: "Red" },
      pieceRow: { white: ["k", "q", "r", "b", "n", "p"], black: ["k", "a", "c", "r", "e", "n", "s"] },
      pocket: { roles: { white: [], black: ["s"] }, captureToHand: false },
      ui: { boardMark: "campmate" }
    }),
    shinobi: variant({
      name: "shinobi",
      tooltip: "Asymmetric variant which pits the western Chess army against a drop-based, Shogi-styled army.",
      startFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/LH1CK1HL[LHMMDJ] w kq - 0 1",
      icon: "\u{1F422}",
      boardFamily: "standard8x8",
      pieceFamily: "shinobi",
      colors: { first: "Pink", second: "Black" },
      pieceRow: { white: ["k", "d", "j", "c", "l", "h", "m", "p"], black: ["k", "q", "r", "b", "n", "p"] },
      pocket: { roles: { white: ["l", "h", "m", "d", "j"], black: [] }, captureToHand: false },
      promotion: { type: "shogi", roles: ["p", "l", "h", "m"] },
      rules: { enPassant: true },
      ui: { boardMark: "campmate" },
      material: {
        equivalences: {
          "pl-piece": "r-piece",
          "ph-piece": "n-piece",
          "pm-piece": "b-piece",
          "pp-piece": "c-piece"
        }
      }
    }),
    empire: variant({
      name: "empire",
      tooltip: _("Asymmetric variant where one army has pieces that move like queens but capture as usual."),
      startFen: "rnbqkbnr/pppppppp/8/8/8/PPPSSPPP/8/TECDKCET w kq - 0 1",
      icon: "\u265A",
      boardFamily: "standard8x8",
      pieceFamily: "empire",
      colors: { first: "Gold", second: "Black" },
      pieceRow: { white: ["k", "d", "t", "c", "e", "p", "s", "q"], black: ["k", "q", "r", "b", "n", "p"] },
      rules: { enPassant: true },
      ui: { boardMark: "campmate" }
    }),
    ordamirror: variant({
      name: "ordamirror",
      displayName: "orda mirror",
      tooltip: _("Orda Chess variant with two Horde armies. The Falcon replaces the Yurt."),
      startFen: "lhafkahl/8/pppppppp/8/8/PPPPPPPP/8/LHAFKAHL w - - 0 1",
      icon: "\u25E9",
      boardFamily: "standard8x8",
      pieceFamily: "ordamirror",
      colors: { first: "White", second: "Gold" },
      pieceRow: ["k", "f", "l", "a", "h", "p"],
      promotion: { type: "regular", order: ["h", "l", "f", "a"] },
      ui: { boardMark: "campmate" }
    }),
    chak: variant({
      name: "chak",
      tooltip: "Mayan chess. Inspired by cultural elements of Mesoamerica.",
      startFen: "rvsqkjsvr/4o4/p1p1p1p1p/9/9/9/P1P1P1P1P/4O4/RVSJKQSVR w - - 0 1",
      icon: "\u{1F42C}",
      boardFamily: "chak9x9",
      pieceFamily: "chak",
      colors: { first: "White", second: "Green" },
      pieceRow: ["k", "j", "q", "r", "v", "s", "o", "p"],
      kingRoles: ["k", "+k"],
      promotion: {
        type: "shogi",
        roles: ["p", "k"],
        strict: {
          isPromoted: (piece, pos) => {
            switch (piece.role) {
              case "p-piece":
              case "pp-piece":
              case "k-piece":
              case "pk-piece":
                return piece.color === "white" && pos[1] >= 4 || piece.color === "black" && pos[1] <= 4;
              default:
                return false;
            }
          }
        }
      },
      material: {
        equivalences: {
          "pk-piece": "k-piece"
        }
      }
    }),
    chennis: variant({
      name: "chennis",
      tooltip: "Pieces alternate between two forms with each move.",
      startFen: "1fkm3/1p1s3/7/7/7/3S1P1/3MKF1[] w - 0 1",
      icon: "\u{1F3BE}",
      boardFamily: "chennis7x7",
      pieceFamily: "chennis",
      pieceRow: ["k", "p", "m", "s", "f"],
      pocket: { roles: ["p", "m", "s", "f"], captureToHand: true },
      promotion: { type: "shogi", roles: ["p", "m", "s", "f"] }
    }),
    spartan: variant({
      name: "spartan",
      tooltip: _("Asymmetric Spartans vs. Persians variant."),
      startFen: "lgkcckwl/hhhhhhhh/8/8/8/8/PPPPPPPP/RNBQKBNR w KQ - 0 1",
      icon: "\u237A",
      boardFamily: "standard8x8",
      pieceFamily: "spartan",
      pieceRow: { white: ["k", "q", "r", "b", "n", "p"], black: ["k", "g", "w", "l", "c", "h"] }
    }),
    // We support the functionality to import/store/analyze some variants
    // but don't want to add them to leaderboard page
    embassy: variant({
      name: "embassy",
      tooltip: "Like Capablanca Chess but with Grand starting setup.",
      startFen: "rnbqkcabnr/pppppppppp/10/10/10/10/PPPPPPPPPP/RNBQKCABNR w KQkq - 0 1",
      icon: "P",
      boardFamily: "standard10x8",
      pieceFamily: "capa",
      pieceRow: ["k", "q", "c", "a", "r", "b", "n", "p"],
      rules: { enPassant: true }
    }),
    embassyhouse: variant({
      name: "embassyhouse",
      tooltip: "Embassy with Crazyhouse drop rules.",
      startFen: "rnbqkcabnr/pppppppppp/10/10/10/10/PPPPPPPPPP/RNBQKCABNR[] w KQkq - 0 1",
      icon: "&",
      boardFamily: "standard10x8",
      pieceFamily: "capa",
      pieceRow: ["k", "q", "c", "a", "r", "b", "n", "p"],
      pocket: { roles: ["p", "n", "b", "r", "a", "c", "q"], captureToHand: true },
      rules: { enPassant: true }
    }),
    gothic: variant({
      name: "gothic",
      tooltip: "Like Capablanca Chess but with a different starting setup.",
      startFen: "rnbqckabnr/pppppppppp/10/10/10/10/PPPPPPPPPP/RNBQCKABNR w KQkq - 0 1",
      icon: "P",
      boardFamily: "standard10x8",
      pieceFamily: "capa",
      pieceRow: ["k", "q", "c", "a", "r", "b", "n", "p"],
      rules: { enPassant: true }
    }),
    gothhouse: variant({
      name: "gothhouse",
      tooltip: _("Gothic with Crazyhouse drop rules."),
      startFen: "rnbqckabnr/pppppppppp/10/10/10/10/PPPPPPPPPP/RNBQCKABNR[] w KQkq - 0 1",
      icon: "&",
      boardFamily: "standard10x8",
      pieceFamily: "capa",
      pieceRow: ["k", "q", "c", "a", "r", "b", "n", "p"],
      pocket: { roles: ["p", "n", "b", "r", "a", "c", "q"], captureToHand: true },
      rules: { enPassant: true }
    })
  };
  var variants = Object.keys(VARIANTS);
  var disabledVariants = ["gothic", "gothhouse", "embassy", "embassyhouse", "gorogoro"];
  var enabledVariants = variants.filter((v) => !disabledVariants.includes(v));
  var variantGroups = {
    standard: { variants: ["chess", "crazyhouse", "placement", "atomic", "duck"] },
    sea: { variants: ["makruk", "makpong", "cambodian", "sittuyin", "asean"] },
    shogi: { variants: ["shogi", "minishogi", "kyotoshogi", "dobutsu", "gorogoroplus", "torishogi"] },
    xiangqi: { variants: ["xiangqi", "manchu", "janggi", "minixiangqi"] },
    fairy: { variants: ["capablanca", "capahouse", "seirawan", "shouse", "grand", "grandhouse", "shako", "shogun", "hoppelpoppel"] },
    army: { variants: ["orda", "synochess", "shinobi", "empire", "ordamirror", "chak", "chennis", "spartan"] }
  };
  function variantGroupLabel(group) {
    const groups = {
      standard: _("Chess Variants"),
      sea: _("Makruk Variants"),
      shogi: _("Shogi Variants"),
      xiangqi: _("Xiangqi Variants"),
      fairy: _("Fairy Piece Variants"),
      army: _("New Army Variants")
    };
    return groups[group];
  }
  function selectVariant(id, selected, onChange2, hookInsert) {
    return h(
      "select#" + id,
      {
        props: { name: id },
        on: { change: onChange2 },
        hook: { insert: hookInsert }
      },
      Object.keys(variantGroups).map((g) => {
        const group = variantGroups[g];
        return h("optgroup", { props: { label: variantGroupLabel(g) } }, group.variants.map((v) => {
          const variant2 = VARIANTS[v];
          return h("option", {
            props: { value: v, title: variant2.tooltip },
            attrs: { selected: v === selected }
          }, variant2.displayName(false));
        }));
      })
    );
  }
  function moddedVariant(variantName, chess960, pieces, castling) {
    if (!chess960 && ["capablanca", "capahouse"].includes(variantName)) {
      const whiteKing = pieces.get("e1");
      const blackKing = pieces.get("e8");
      if (castling !== "-" && (!castling.includes("K") && !castling.includes("Q") || whiteKing && samePiece(whiteKing, { role: "k-piece", color: "white" })) && (!castling.includes("k") && !castling.includes("q") || blackKing && samePiece(blackKing, { role: "k-piece", color: "black" })))
        return variantName.includes("house") ? "embassyhouse" : "embassy";
    }
    return variantName;
  }
  function notation(variant2) {
    let cgNotation = Notation.ALGEBRAIC;
    switch (variant2.name) {
      case "janggi":
        cgNotation = Notation.JANGGI;
        break;
      case "shogi":
      case "minishogi":
      case "kyotoshogi":
      case "dobutsu":
      case "gorogoro":
      case "gorogoroplus":
      case "torishogi":
        cgNotation = Notation.SHOGI_ARBNUM;
        break;
      case "xiangqi":
      case "minixiangqi":
        cgNotation = Notation.XIANGQI_ARBNUM;
        break;
    }
    return cgNotation;
  }

  // client/puzzlerCtrl.ts
  var Mousetrap = __toESM(require_mousetrap());

  // client/chess.ts
  function uci2cg(move3) {
    return move3.replace(/10/g, ":");
  }
  function uci2LastMove(move3) {
    if (!move3)
      return void 0;
    let moveStr = uci2cg(move3);
    if (moveStr.startsWith("+"))
      moveStr = moveStr.slice(1);
    const comma = moveStr.indexOf(",");
    const lastMove = [moveStr.slice(0, 2), moveStr.slice(2, 4)];
    if (comma > -1)
      lastMove.push(moveStr.slice(-2));
    return lastMove;
  }
  function cg2uci(move3) {
    return move3.replace(/:/g, "10");
  }
  function getCounting(fen) {
    const parts = fen.split(" ");
    let countingPly = Number(parts[4]);
    if (isNaN(countingPly))
      countingPly = 0;
    let countingLimit = Number(parts[3]);
    if (isNaN(countingLimit))
      countingLimit = 0;
    const board = parts[0];
    const whitePieces = (board.match(/[A-Z]/g) || []).length;
    const blackPieces = (board.match(/[a-z]/g) || []).length;
    const pawns = (board.match(/[Pp]/g) || []).length;
    const countingType = countingLimit === 0 ? "none" : pawns === 0 && (whitePieces <= 1 || blackPieces <= 1) ? "piece" : "board";
    const sideToMove = parts[1];
    const opponent = sideToMove === "w" ? "b" : "w";
    const countingSide = countingType === "none" || countingPly === 0 ? "" : countingPly % 2 === 0 ? sideToMove : opponent;
    return [countingPly, countingLimit, countingSide, countingType];
  }
  function getJanggiPoints(board) {
    let choPoint = 0;
    let hanPoint = 1.5;
    for (const c of board) {
      switch (c) {
        case "P":
          choPoint += 2;
          break;
        case "A":
        case "B":
          choPoint += 3;
          break;
        case "N":
          choPoint += 5;
          break;
        case "C":
          choPoint += 7;
          break;
        case "R":
          choPoint += 13;
          break;
        case "p":
          hanPoint += 2;
          break;
        case "a":
        case "b":
          hanPoint += 3;
          break;
        case "n":
          hanPoint += 5;
          break;
        case "c":
          hanPoint += 7;
          break;
        case "r":
          hanPoint += 13;
          break;
      }
    }
    return [choPoint, hanPoint];
  }
  function unpromotedRole(variant2, piece) {
    if (piece.promoted) {
      if (variant2.promotion.type === "shogi")
        return piece.role.slice(1);
      else
        return "p-piece";
    } else {
      return piece.role;
    }
  }
  function promotedRole(variant2, piece) {
    if (!piece.promoted && variant2.promotion.roles.includes(piece.role)) {
      if (variant2.promotion.type === "shogi")
        return "p" + piece.role;
      else
        return roleOf(variant2.promotion.order[0]);
    } else {
      return piece.role;
    }
  }
  function moveDests(legalMoves) {
    const dests = /* @__PURE__ */ new Map();
    legalMoves.map(uci2cg).forEach((move3) => {
      const orig = move3.slice(0, 2);
      const dest = move3.slice(2, 4);
      if (dests.has(orig))
        dests.get(orig).push(dest);
      else
        dests.set(orig, [dest]);
    });
    return dests;
  }
  function promotionSuffix(move3) {
    if (move3.startsWith("+")) {
      return "+";
    } else {
      const comma = move3.indexOf(",");
      if (comma > -1)
        move3 = move3.substring(0, comma);
      const last = move3.slice(-1);
      if (last.match(/[a-z+-]/))
        return last;
      else
        return "";
    }
  }
  function colorCase(color, str) {
    if (color === "white")
      return str.toUpperCase();
    else
      return str.toLowerCase();
  }

  // client/input/input.ts
  var ExtraInput = class {
    constructor(ctrl) {
      this.ctrl = ctrl;
    }
    next(suffix) {
      if (this.data)
        this.ctrl.processInput(this.data.piece, this.data.orig, this.data.dest, this.data.meta, suffix, this.type);
      this.data = void 0;
    }
  };

  // client/input/gating.ts
  var GatingInput = class extends ExtraInput {
    constructor(ctrl) {
      super(ctrl);
      this.type = "gating";
      this.choices = {};
    }
    /*
     * NOTE: This code only works with S-Chess, S-Chess960, and S-House
     *       Some parts assume an 8x8 board
     *       Please modify as you see fit if other gating variants come along
     */
    start(piece, orig, dest, meta) {
      this.data = { piece, orig, dest, meta };
      if (!this.ctrl.variant.rules.gate || isDropOrig(orig) || !this.canGate(orig)) {
        this.next("-");
        return;
      }
      this.choices = {};
      this.choices[orig] = this.gatingChoices(orig, dest);
      if (piece.role === "k-piece" && orig[1] === dest[1]) {
        const rookOrig = this.ctrl.chess960 ? dest : (dest[0] === "g" ? "h" : "a") + orig[1];
        const rookChoices = this.gatingChoices(rookOrig, orig);
        if (rookChoices.length > 0) {
          rookChoices.push("");
          this.choices[rookOrig] = rookChoices;
          if (this.choices[orig].length <= 1)
            delete this.choices[orig];
        }
      }
      const keys = Object.keys(this.choices);
      if (keys.length === 1 && this.choices[keys[0]].length === 1)
        this.finish("", orig);
      else
        this.drawGating(piece.color, this.ctrl.chessground.state.orientation);
    }
    canGate(orig) {
      const fen = this.ctrl.fullfen;
      const parts = fen.split(" ");
      const castling = parts[2];
      const color = parts[1] === "w" ? "white" : "black";
      const gateRank = color === "white" ? "1" : "8";
      if (orig[1] === gateRank) {
        if (castling.includes(colorCase(color, orig[0]))) {
          return true;
        }
        if (!this.ctrl.chess960) {
          if (orig[0] === "e" || orig[0] === "h") {
            if (castling.includes(colorCase(color, "K")))
              return true;
          }
          if (orig[0] === "e" || orig[0] === "a") {
            if (castling.includes(colorCase(color, "Q")))
              return true;
          }
        }
      }
      return false;
    }
    gatingChoices(orig, dest) {
      const possibleGating = this.ctrl.legalMoves().filter((move3) => move3.includes(orig + dest));
      return possibleGating.map(promotionSuffix).map((s) => s === "" ? "" : roleOf(s));
    }
    gate(piece, key) {
      this.ctrl.chessground.newPiece(piece, key, true);
    }
    drawGating(color, orientation) {
      const container = toVNode(document.querySelector("extension"));
      patch(container, this.view(color, orientation));
    }
    drawNoGating() {
      const container = document.getElementById("extension_choice");
      if (container)
        patch(container, h("extension"));
    }
    finish(role, key) {
      if (this.data) {
        console.log(role, key);
        this.drawNoGating();
        const letter = role === "" ? "" : letterOf(role);
        if (role === "") {
          this.next("");
        } else {
          this.gate({ role, color: this.data.piece.color }, key);
          if (key === this.data.orig)
            this.next(letter);
          else
            this.castlingNext(letter, key);
        }
        this.choices = {};
      }
    }
    castlingNext(suffix, key) {
      if (this.data)
        this.ctrl.processInput(this.data.piece, key, this.data.orig, this.data.meta, suffix, this.type);
      this.data = void 0;
    }
    cancel() {
      this.drawNoGating();
      this.ctrl.goPly(this.ctrl.ply);
    }
    squareView(orig, color, orientation) {
      const leftFile = key2pos(orig)[0];
      const left = (orientation === "white" ? leftFile : 7 - leftFile) * 12.5;
      return this.choices[orig].map((role, i) => {
        const top = (color === orientation ? 7 - i : i) * 12.5;
        console.log(role, orig);
        return h("square", {
          style: { top: top + "%", left: left + "%" },
          hook: bind("click", (e) => {
            e.stopPropagation();
            this.finish(role, orig);
          }, null)
        }, [
          h("piece." + role + "." + color)
        ]);
      });
    }
    view(color, orientation) {
      const direction = color === orientation ? "top" : "bottom";
      let squares = [];
      const pocket = this.ctrl.variant.pocket.roles[color];
      let orig;
      for (orig in this.choices) {
        this.choices[orig].sort((a, b) => pocket.indexOf(a) - pocket.indexOf(b));
        squares.push(...this.squareView(orig, color, orientation));
      }
      return h(
        "div#extension_choice." + direction,
        {
          hook: {
            insert: (vnode2) => {
              const el = vnode2.elm;
              el.addEventListener("click", () => this.cancel());
              el.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                return false;
              });
            }
          }
        },
        squares
      );
    }
  };

  // client/input/promotion.ts
  var PromotionInput = class extends ExtraInput {
    constructor(ctrl) {
      super(ctrl);
      this.type = "promotion";
      this.choices = {};
    }
    start(piece, orig, dest, meta) {
      this.data = { piece, orig, dest, meta };
      if (this.ctrl.chessground.state.boardState.pieces.get(dest) === void 0) {
        this.next("");
        return;
      }
      const choices = this.promotionChoices(piece, orig, dest);
      const autoSuffix = this.ctrl.variant.promotion.order[0];
      const autoRole = this.ctrl.variant.promotion.type === "shogi" ? void 0 : roleOf(autoSuffix);
      const disableAutoPromote = meta.ctrlKey;
      if (this.ctrl.variant.promotion.autoPromoteable && this.ctrl.autoPromote && !disableAutoPromote && autoRole && autoSuffix && choices[autoRole] === autoSuffix)
        this.choices = { [autoRole]: autoSuffix };
      else
        this.choices = choices;
      if (Object.keys(this.choices).length === 1) {
        const role = Object.keys(this.choices)[0];
        this.finish(role);
      } else {
        this.drawPromo(dest, piece.color);
      }
    }
    promotionChoices(piece, orig, dest) {
      const variant2 = this.ctrl.variant;
      const possiblePromotions = this.ctrl.legalMoves().filter((move3) => move3.includes(orig + dest));
      const choices = {};
      possiblePromotions.map(promotionSuffix).forEach((suffix) => {
        let role;
        if (suffix === "+")
          role = promotedRole(variant2, piece);
        else if (suffix === "-")
          role = unpromotedRole(variant2, piece);
        else if (suffix === "")
          role = piece.role;
        else
          role = roleOf(suffix);
        choices[role] = suffix;
      });
      return choices;
    }
    promote(key, role) {
      const ground = this.ctrl.chessground;
      const piece = ground.state.boardState.pieces.get(key);
      if (piece && piece.role !== role) {
        ground.setPieces(/* @__PURE__ */ new Map([[key, {
          color: piece.color,
          role,
          promoted: true
        }]]));
      }
    }
    drawPromo(dest, color) {
      const container = toVNode(document.querySelector("extension"));
      patch(container, this.view(dest, color, this.ctrl.chessground.state.orientation));
    }
    drawNoPromo() {
      const container = document.getElementById("extension_choice");
      if (container)
        patch(container, h("extension"));
    }
    finish(role) {
      if (this.data) {
        this.drawNoPromo();
        this.promote(this.data.dest, role);
        if (isDropOrig(this.data.orig))
          this.dropNext(role);
        else
          this.next(this.choices[role]);
      }
    }
    dropNext(role) {
      if (this.data)
        this.ctrl.processInput(this.data.piece, dropOrigOf(role), this.data.dest, this.data.meta, "", "promotion");
      this.data = void 0;
    }
    cancel() {
      this.drawNoPromo();
      this.ctrl.goPly(this.ctrl.ply);
    }
    view(dest, color, orientation) {
      const variant2 = this.ctrl.variant;
      const width = variant2.board.dimensions.width;
      const height = variant2.board.dimensions.height;
      const pos = key2pos(dest);
      const choices = Object.keys(this.choices);
      choices.sort((a, b) => variant2.promotion.order.indexOf(this.choices[a]) - variant2.promotion.order.indexOf(this.choices[b]));
      const direction = color === orientation ? "bottom" : "top";
      const leftFile = orientation === "white" ? pos[0] : width - 1 - pos[0];
      const left = leftFile * (100 / width);
      const topRank = orientation === "white" ? height - 1 - pos[1] : pos[1];
      const side = color === orientation ? "ally" : "enemy";
      return h(
        "div#extension_choice",
        {
          hook: {
            insert: (vnode2) => {
              const el = vnode2.elm;
              el.addEventListener("click", () => this.cancel());
              el.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                return false;
              });
            }
          }
        },
        choices.map((role, i) => {
          const rank = topRank + (direction === "bottom" ? i : -i);
          const top = rank * (100 / height);
          return h(
            "square",
            {
              style: { top: top + "%", left: left + "%" },
              hook: bind("click", (e) => {
                e.stopPropagation();
                this.finish(role);
              }, null)
            },
            [h(`piece.${role}.${color}.${side}`)]
          );
        })
      );
    }
  };

  // client/input/duck.ts
  var DuckInput = class extends ExtraInput {
    constructor(ctrl) {
      super(ctrl);
      this.type = "duck";
      this.inputState = void 0;
      this.duckDests = [];
    }
    start(piece, orig, dest, meta) {
      this.data = { piece, orig, dest, meta };
      if (!this.ctrl.variant.rules.duck) {
        this.next("");
        return;
      }
      this.duckDests = this.ctrl.legalMoves().filter((move3) => move3.includes(orig + dest)).map((move3) => move3.slice(-2));
      let duckKey;
      const pieces = this.ctrl.chessground.state.boardState.pieces;
      for (const [k, p] of pieces) {
        if (p.role === "_-piece") {
          duckKey = k;
          break;
        }
      }
      if (meta.captured && this.ctrl.variant.kingRoles.includes(meta.captured.role)) {
        this.finish(orig);
        return;
      }
      const undo = document.getElementById("undo");
      if (undo && undo.tagName === "DIV") {
        patch(
          undo,
          h("button#undo", { on: { click: () => this.ctrl.undo() }, props: { title: _("Undo") } }, [h("i", { class: { "icon": true, "icon-reply": true } })])
        );
      }
      if (!duckKey) {
        this.inputState = "click";
      } else {
        this.ctrl.chessground.state.boardState.pieces.get(duckKey).color = piece.color;
        this.ctrl.chessground.set({
          turnColor: piece.color,
          movable: {
            dests: /* @__PURE__ */ new Map([[duckKey, this.duckDests]])
          }
        });
        this.inputState = "move";
      }
    }
    finish(key) {
      if (this.duckDests.includes(key) && this.data) {
        this.ctrl.chessground.state.lastMove = [this.data.orig, this.data.dest, key];
        this.next("," + this.data.dest + key);
        this.inputState = void 0;
        this.data = void 0;
      }
    }
  };

  // node_modules/chessgroundx/premove.js
  var diff = (a, b) => Math.abs(a - b);
  var pawn = (color) => (x1, y1, x2, y2) => diff(x1, x2) < 2 && (color === "white" ? (
    // allow 2 squares from first two ranks, for horde
    y2 === y1 + 1 || y1 <= 1 && y2 === y1 + 2 && x1 === x2
  ) : y2 === y1 - 1 || y1 >= 6 && y2 === y1 - 2 && x1 === x2);
  var knight = (x1, y1, x2, y2) => {
    const xd = diff(x1, x2);
    const yd = diff(y1, y2);
    return xd === 1 && yd === 2 || xd === 2 && yd === 1;
  };
  var bishop = (x1, y1, x2, y2) => {
    return diff(x1, x2) === diff(y1, y2);
  };
  var rook = (x1, y1, x2, y2) => {
    return x1 === x2 || y1 === y2;
  };
  var queen = (x1, y1, x2, y2) => {
    return bishop(x1, y1, x2, y2) || rook(x1, y1, x2, y2);
  };
  var king = (color, rookFiles, canCastle) => (x1, y1, x2, y2) => diff(x1, x2) < 2 && diff(y1, y2) < 2 || canCastle && y1 === y2 && y1 === (color === "white" ? 0 : 7) && (x1 === 4 && (x2 === 2 && rookFiles.includes(0) || x2 === 6 && rookFiles.includes(7)) || rookFiles.includes(x2));
  function rookFilesOf(pieces, color) {
    const backrank2 = color === "white" ? "1" : "8";
    const files3 = [];
    for (const [key, piece] of pieces) {
      if (key[1] === backrank2 && piece.color === color && piece.role === "r-piece") {
        files3.push(key2pos(key)[0]);
      }
    }
    return files3;
  }
  function and(...ms) {
    return (x1, y1, x2, y2) => ms.map((m) => m(x1, y1, x2, y2)).reduce((a, b) => a && b);
  }
  function or(...ms) {
    return (x1, y1, x2, y2) => ms.map((m) => m(x1, y1, x2, y2)).reduce((a, b) => a || b);
  }
  function _distance(dist) {
    return (x1, y1, x2, y2) => Math.max(diff(x1, x2), diff(y1, y2)) <= dist;
  }
  function memoizeDistance() {
    const cache = {};
    return (dist) => {
      const key = `${dist}`;
      if (!(key in cache))
        cache[key] = _distance(dist);
      return cache[key];
    };
  }
  var distance = memoizeDistance();
  function backrank(color) {
    return color === "white" ? 0 : 7;
  }
  var kingNoCastling = (x1, y1, x2, y2) => {
    return diff(x1, x2) < 2 && diff(y1, y2) < 2;
  };
  function king960(color, rookFiles, canCastle) {
    return (x1, y1, x2, y2) => kingNoCastling(x1, y1, x2, y2) || canCastle && y1 === y2 && y1 === backrank(color) && rookFiles.includes(x2);
  }
  function kingCapa(color, rookFiles, canCastle) {
    return (x1, y1, x2, y2) => kingNoCastling(x1, y1, x2, y2) || canCastle && y1 === y2 && y1 === backrank(color) && x1 === 5 && (x2 === 8 && rookFiles.includes(9) || x2 === 2 && rookFiles.includes(0));
  }
  function kingShako(color, rookFiles, canCastle) {
    return (x1, y1, x2, y2) => kingNoCastling(x1, y1, x2, y2) || canCastle && y1 === y2 && y1 === (color === "white" ? 1 : 8) && x1 === 5 && (x2 === 7 && rookFiles.includes(8) || x2 === 3 && rookFiles.includes(1));
  }
  function rookFilesOfShako(pieces, color) {
    const backrank2 = color === "white" ? "2" : "9";
    const files3 = [];
    for (const [key, piece] of pieces) {
      if (key[1] === backrank2 && piece.color === color && piece.role === "r-piece") {
        files3.push(key2pos(key)[0]);
      }
    }
    return files3;
  }
  function kingOuk(color, canCastle) {
    return (x1, y1, x2, y2) => kingNoCastling(x1, y1, x2, y2) || canCastle && (color === "white" ? x1 === 3 && y1 === 0 && (x2 === 1 || x2 === 5) && y2 === 1 : x1 === 4 && y1 === 7 && (x2 === 6 || x2 === 2) && y2 === 6);
  }
  function pawnNoDoubleStep(color) {
    return (x1, y1, x2, y2) => diff(x1, x2) < 2 && (color === "white" ? y2 === y1 + 1 : y2 === y1 - 1);
  }
  function pawnGrand(color) {
    return (x1, y1, x2, y2) => diff(x1, x2) < 2 && (color === "white" ? y2 === y1 + 1 || y1 <= 2 && y2 === y1 + 2 && x1 === x2 : y2 === y1 - 1 || y1 >= 7 && y2 === y1 - 2 && x1 === x2);
  }
  function pawnSittuyin(pieces, color) {
    return (x1, y1, x2, y2) => {
      let canPromote = (color === "white" ? y1 >= 4 : y1 <= 3) && (x1 === y1 || 7 - x1 === y1);
      if (!canPromote) {
        let pawnCount = 0;
        for (const p of pieces.values())
          if (p.role === "p-piece" && p.color === color)
            pawnCount += 1;
        canPromote || (canPromote = pawnCount === 1);
      }
      return pawnNoDoubleStep(color)(x1, y1, x2, y2) || canPromote && ferz(x1, y1, x2, y2);
    };
  }
  function pawnBerolina(color) {
    return (x1, y1, x2, y2) => {
      const xd = diff(x1, x2);
      return color === "white" ? (
        // allow 2 squares from first two ranks, for horde
        y2 === y1 + 1 && xd <= 1 || y1 <= 1 && y2 === y1 + 2 && xd === 2
      ) : y2 === y1 - 1 && xd <= 1 || y1 >= 6 && y2 === y1 - 2 && xd === 2;
    };
  }
  var sideways = (x1, y1, x2, y2) => {
    return y1 === y2 && diff(x1, x2) <= 1;
  };
  var wazir = (x1, y1, x2, y2) => {
    const xd = diff(x1, x2);
    const yd = diff(y1, y2);
    return xd === 1 && yd === 0 || xd === 0 && yd === 1;
  };
  var ferz = (x1, y1, x2, y2) => diff(x1, x2) === diff(y1, y2) && diff(x1, x2) === 1;
  function ferzOuk(color) {
    return (x1, y1, x2, y2) => ferz(x1, y1, x2, y2) || (color === "white" ? x1 === 4 && y1 === 0 && x2 === 4 && y2 === 2 : x1 === 3 && y1 === 7 && x2 === 3 && y2 === 5);
  }
  var elephant = (x1, y1, x2, y2) => {
    const xd = diff(x1, x2);
    const yd = diff(y1, y2);
    return xd === yd && xd === 2;
  };
  var archbishop = (x1, y1, x2, y2) => {
    return bishop(x1, y1, x2, y2) || knight(x1, y1, x2, y2);
  };
  var chancellor = (x1, y1, x2, y2) => {
    return rook(x1, y1, x2, y2) || knight(x1, y1, x2, y2);
  };
  var amazon = (x1, y1, x2, y2) => {
    return bishop(x1, y1, x2, y2) || rook(x1, y1, x2, y2) || knight(x1, y1, x2, y2);
  };
  var centaur = (x1, y1, x2, y2) => {
    return kingNoCastling(x1, y1, x2, y2) || knight(x1, y1, x2, y2);
  };
  function shogiLance(color) {
    return (x1, y1, x2, y2) => x2 === x1 && (color === "white" ? y2 > y1 : y2 < y1);
  }
  function shogiSilver(color) {
    return (x1, y1, x2, y2) => ferz(x1, y1, x2, y2) || x1 === x2 && (color === "white" ? y2 === y1 + 1 : y2 === y1 - 1);
  }
  function shogiGold(color) {
    return (x1, y1, x2, y2) => wazir(x1, y1, x2, y2) || diff(x1, x2) < 2 && (color === "white" ? y2 === y1 + 1 : y2 === y1 - 1);
  }
  function shogiPawn(color) {
    return (x1, y1, x2, y2) => x2 === x1 && (color === "white" ? y2 === y1 + 1 : y2 === y1 - 1);
  }
  function shogiKnight(color) {
    return (x1, y1, x2, y2) => (x2 === x1 - 1 || x2 === x1 + 1) && (color === "white" ? y2 === y1 + 2 : y2 === y1 - 2);
  }
  var shogiDragon = (x1, y1, x2, y2) => {
    return rook(x1, y1, x2, y2) || ferz(x1, y1, x2, y2);
  };
  var shogiHorse = (x1, y1, x2, y2) => {
    return bishop(x1, y1, x2, y2) || wazir(x1, y1, x2, y2);
  };
  function _palace(bd, color) {
    const middleFile = Math.floor(bd.width / 2);
    const startingRank = color === "white" ? 0 : bd.height - 3;
    return [
      [middleFile - 1, startingRank + 2],
      [middleFile, startingRank + 2],
      [middleFile + 1, startingRank + 2],
      [middleFile - 1, startingRank + 1],
      [middleFile, startingRank + 1],
      [middleFile + 1, startingRank + 1],
      [middleFile - 1, startingRank],
      [middleFile, startingRank],
      [middleFile + 1, startingRank]
    ];
  }
  function memoizePalace() {
    const cache = {};
    return (bd, color) => {
      const key = `${bd.width}x${bd.height}${color.slice(0, 1)}`;
      if (!(key in cache))
        cache[key] = _palace(bd, color);
      return cache[key];
    };
  }
  var palace = memoizePalace();
  function xiangqiPawn(color) {
    return (x1, y1, x2, y2) => x2 === x1 && (color === "white" ? y2 === y1 + 1 : y2 === y1 - 1) || y2 === y1 && diff(x1, x2) < 2 && (color === "white" ? y1 > 4 : y1 < 5);
  }
  function minixiangqiPawn(color) {
    return (x1, y1, x2, y2) => x2 === x1 && (color === "white" ? y2 === y1 + 1 : y2 === y1 - 1) || y2 === y1 && diff(x1, x2) < 2;
  }
  function xiangqiElephant(color) {
    return (x1, y1, x2, y2) => elephant(x1, y1, x2, y2) && (color === "white" ? y2 < 5 : y2 > 4);
  }
  function xiangqiAdvisor(color, bd) {
    const p = palace(bd, color);
    return (x1, y1, x2, y2) => ferz(x1, y1, x2, y2) && p.some((point) => point[0] === x2 && point[1] === y2);
  }
  function xiangqiKing(color, bd) {
    const p = palace(bd, color);
    return (x1, y1, x2, y2) => wazir(x1, y1, x2, y2) && p.some((point) => point[0] === x2 && point[1] === y2);
  }
  var shakoElephant = (x1, y1, x2, y2) => {
    return diff(x1, x2) === diff(y1, y2) && diff(x1, x2) < 3;
  };
  var janggiElephant = (x1, y1, x2, y2) => {
    const xd = diff(x1, x2);
    const yd = diff(y1, y2);
    return xd === 2 && yd === 3 || xd === 3 && yd === 2;
  };
  function janggiPawn(color, bd) {
    const oppPalace = palace(bd, opposite(color));
    return (x1, y1, x2, y2) => {
      const palacePos = oppPalace.findIndex((point) => point[0] === x1 && point[1] === y1);
      let additionalMobility;
      switch (palacePos) {
        case 0:
          additionalMobility = (x12, y12, x22, y22) => x22 === x12 + 1 && color === "black" && y22 === y12 - 1;
          break;
        case 2:
          additionalMobility = (x12, y12, x22, y22) => x22 === x12 - 1 && color === "black" && y22 === y12 - 1;
          break;
        case 4:
          additionalMobility = (x12, y12, x22, y22) => diff(x12, x22) === 1 && (color === "white" ? y22 === y12 + 1 : y22 === y12 - 1);
          break;
        case 6:
          additionalMobility = (x12, y12, x22, y22) => x22 === x12 + 1 && color === "white" && y22 === y12 + 1;
          break;
        case 8:
          additionalMobility = (x12, y12, x22, y22) => x22 === x12 - 1 && color === "white" && y22 === y12 + 1;
          break;
        default:
          additionalMobility = () => false;
      }
      return minixiangqiPawn(color)(x1, y1, x2, y2) || additionalMobility(x1, y1, x2, y2);
    };
  }
  function janggiRook(bd) {
    const wPalace = palace(bd, "white");
    const bPalace = palace(bd, "black");
    return (x1, y1, x2, y2) => {
      let additionalMobility;
      const wPalacePos = wPalace.findIndex((point) => point[0] === x1 && point[1] === y1);
      const bPalacePos = bPalace.findIndex((point) => point[0] === x1 && point[1] === y1);
      const palacePos = wPalacePos !== -1 ? wPalacePos : bPalacePos;
      const xd = diff(x1, x2);
      const yd = diff(y1, y2);
      switch (palacePos) {
        case 0:
          additionalMobility = (x12, y12, x22, y22) => xd === yd && x22 > x12 && x22 <= x12 + 2 && y22 < y12 && y22 >= y12 - 2;
          break;
        case 2:
          additionalMobility = (x12, y12, x22, y22) => xd === yd && x22 < x12 && x22 >= x12 - 2 && y22 < y12 && y22 >= y12 - 2;
          break;
        case 4:
          additionalMobility = ferz;
          break;
        case 6:
          additionalMobility = (x12, y12, x22, y22) => xd === yd && x22 > x12 && x22 <= x12 + 2 && y22 > y12 && y22 <= y12 + 2;
          break;
        case 8:
          additionalMobility = (x12, y12, x22, y22) => xd === yd && x22 < x12 && x22 >= x12 - 2 && y22 > y12 && y22 <= y12 + 2;
          break;
        default:
          additionalMobility = () => false;
      }
      return rook(x1, y1, x2, y2) || additionalMobility(x1, y1, x2, y2);
    };
  }
  function janggiKing(color, bd) {
    const ownPalace = palace(bd, color);
    return (x1, y1, x2, y2) => {
      const palacePos = ownPalace.findIndex((point) => point[0] === x1 && point[1] === y1);
      let additionalMobility;
      switch (palacePos) {
        case 0:
          additionalMobility = (x12, y12, x22, y22) => x22 === x12 + 1 && y22 === y12 - 1;
          break;
        case 2:
          additionalMobility = (x12, y12, x22, y22) => x22 === x12 - 1 && y22 === y12 - 1;
          break;
        case 4:
          additionalMobility = ferz;
          break;
        case 6:
          additionalMobility = (x12, y12, x22, y22) => x22 === x12 + 1 && y22 === y12 + 1;
          break;
        case 8:
          additionalMobility = (x12, y12, x22, y22) => x22 === x12 - 1 && y22 === y12 + 1;
          break;
        default:
          additionalMobility = () => false;
      }
      return (wazir(x1, y1, x2, y2) || additionalMobility(x1, y1, x2, y2)) && ownPalace.some((point) => point[0] === x2 && point[1] === y2);
    };
  }
  var musketeerLeopard = (x1, y1, x2, y2) => {
    const xd = diff(x1, x2);
    const yd = diff(y1, y2);
    return (xd === 1 || xd === 2) && (yd === 1 || yd === 2);
  };
  var musketeerHawk = (x1, y1, x2, y2) => {
    const xd = diff(x1, x2);
    const yd = diff(y1, y2);
    return xd === 0 && (yd === 2 || yd === 3) || yd === 0 && (xd === 2 || xd === 3) || xd === yd && (xd === 2 || xd === 3);
  };
  var musketeerElephant = (x1, y1, x2, y2) => {
    const xd = diff(x1, x2);
    const yd = diff(y1, y2);
    return xd === 1 || yd === 1 || xd === 2 && (yd === 0 || yd === 2) || xd === 0 && yd === 2;
  };
  var musketeerCannon = (x1, y1, x2, y2) => {
    const xd = diff(x1, x2);
    const yd = diff(y1, y2);
    return xd < 3 && (yd < 2 || yd === 2 && xd === 0);
  };
  var musketeerUnicorn = (x1, y1, x2, y2) => {
    const xd = diff(x1, x2);
    const yd = diff(y1, y2);
    return knight(x1, y1, x2, y2) || xd === 1 && yd === 3 || xd === 3 && yd === 1;
  };
  var musketeerDragon = (x1, y1, x2, y2) => {
    return knight(x1, y1, x2, y2) || queen(x1, y1, x2, y2);
  };
  var musketeerFortress = (x1, y1, x2, y2) => {
    const xd = diff(x1, x2);
    const yd = diff(y1, y2);
    return xd === yd && xd < 4 || yd === 0 && xd === 2 || yd === 2 && xd < 2;
  };
  var musketeerSpider = (x1, y1, x2, y2) => {
    const xd = diff(x1, x2);
    const yd = diff(y1, y2);
    return xd < 3 && yd < 3 && !(xd === 1 && yd === 0) && !(xd === 0 && yd === 1);
  };
  function toriGoose(color) {
    return (x1, y1, x2, y2) => {
      const xd = diff(x1, x2);
      return color === "white" ? xd === 2 && y2 === y1 + 2 || xd === 0 && y2 === y1 - 2 : xd === 2 && y2 === y1 - 2 || xd === 0 && y2 === y1 + 2;
    };
  }
  function toriLeftQuail(color) {
    return (x1, y1, x2, y2) => {
      const xd = diff(x1, x2);
      const yd = diff(y1, y2);
      return color === "white" ? x2 === x1 && y2 > y1 || xd === yd && x2 > x1 && y2 < y1 || x2 === x1 - 1 && y2 === y1 - 1 : x2 === x1 && y2 < y1 || xd === yd && x2 < x1 && y2 > y1 || x2 === x1 + 1 && y2 === y1 + 1;
    };
  }
  function toriRightQuail(color) {
    return (x1, y1, x2, y2) => {
      const xd = diff(x1, x2);
      const yd = diff(y1, y2);
      return color === "white" ? x2 === x1 && y2 > y1 || xd === yd && x2 < x1 && y2 < y1 || x2 === x1 + 1 && y2 === y1 - 1 : x2 === x1 && y2 < y1 || xd === yd && x2 > x1 && y2 > y1 || x2 === x1 - 1 && y2 === y1 + 1;
    };
  }
  function toriPheasant(color) {
    return (x1, y1, x2, y2) => {
      const xd = diff(x1, x2);
      return color === "white" ? x2 === x1 && y2 === y1 + 2 || xd === 1 && y2 === y1 - 1 : x2 === x1 && y2 === y1 - 2 || xd === 1 && y2 === y1 + 1;
    };
  }
  var toriCrane = (x1, y1, x2, y2) => {
    return kingNoCastling(x1, y1, x2, y2) && y2 !== y1;
  };
  function toriFalcon(color) {
    return (x1, y1, x2, y2) => {
      return color === "white" ? kingNoCastling(x1, y1, x2, y2) && !(x2 === x1 && y2 === y1 - 1) : kingNoCastling(x1, y1, x2, y2) && !(x2 === x1 && y2 === y1 + 1);
    };
  }
  function toriEagle(color) {
    return (x1, y1, x2, y2) => {
      const xd = diff(x1, x2);
      const yd = diff(y1, y2);
      return color === "white" ? kingNoCastling(x1, y1, x2, y2) || xd === yd && (y2 > y1 || y2 < y1 && yd <= 2) || x2 === x1 && y2 < y1 : kingNoCastling(x1, y1, x2, y2) || xd === yd && (y2 < y1 || y2 > y1 && yd <= 2) || x2 === x1 && y2 > y1;
    };
  }
  function pawnChak(color) {
    return (x1, y1, x2, y2) => {
      const xd = diff(x1, x2);
      return color === "white" ? y2 >= y1 && y2 - y1 <= 1 && xd <= 1 : y1 >= y2 && y1 - y2 <= 1 && xd <= 1;
    };
  }
  function chakWarrior(color) {
    return (x1, y1, x2, y2) => toriCrane(x1, y1, x2, y2) && (color === "white" ? y2 >= 4 : y2 <= 4);
  }
  function chakDivineKing(color) {
    return (x1, y1, x2, y2) => {
      const xd = diff(x1, x2);
      const yd = diff(y1, y2);
      return queen(x1, y1, x2, y2) && xd <= 2 && yd <= 2 && (color === "white" ? y2 >= 4 : y2 <= 4);
    };
  }
  function kingChennis(color) {
    return (x1, y1, x2, y2) => kingNoCastling(x1, y1, x2, y2) && x2 >= 1 && x2 <= 5 && (color === "white" ? y2 <= 3 : y2 >= 3);
  }
  var noMove = () => false;
  function premove(variant2, chess960, bd) {
    const mobility = builtinMobility(variant2, chess960, bd);
    return (boardState, key, canCastle) => {
      const pos = key2pos(key);
      return allPos(bd).filter((pos2) => (pos[0] !== pos2[0] || pos[1] !== pos2[1]) && mobility(boardState, key, canCastle)(pos[0], pos[1], pos2[0], pos2[1])).map(pos2key);
    };
  }
  function builtinMobility(variant2, chess960, bd) {
    switch (variant2) {
      case "xiangqi":
      case "manchu":
        return (boardState, key) => {
          const piece = boardState.pieces.get(key);
          const role = piece.role;
          const color = piece.color;
          switch (role) {
            case "p-piece":
              return xiangqiPawn(color);
            case "c-piece":
            case "r-piece":
              return rook;
            case "n-piece":
              return knight;
            case "b-piece":
              return xiangqiElephant(color);
            case "a-piece":
              return xiangqiAdvisor(color, bd);
            case "k-piece":
              return xiangqiKing(color, bd);
            case "m-piece":
              return chancellor;
            default:
              return noMove;
          }
        };
      case "janggi":
        return (boardState, key) => {
          const piece = boardState.pieces.get(key);
          const role = piece.role;
          const color = piece.color;
          switch (role) {
            case "p-piece":
              return janggiPawn(color, bd);
            case "c-piece":
            case "r-piece":
              return janggiRook(bd);
            case "n-piece":
              return knight;
            case "b-piece":
              return janggiElephant;
            case "a-piece":
            case "k-piece":
              return janggiKing(color, bd);
            default:
              return noMove;
          }
        };
      case "minixiangqi":
        return (boardState, key) => {
          const piece = boardState.pieces.get(key);
          const role = piece.role;
          const color = piece.color;
          switch (role) {
            case "p-piece":
              return minixiangqiPawn(color);
            case "c-piece":
            case "r-piece":
              return rook;
            case "n-piece":
              return knight;
            case "k-piece":
              return xiangqiKing(color, bd);
            default:
              return noMove;
          }
        };
      case "shogi":
      case "minishogi":
      case "gorogoro":
      case "gorogoroplus":
        return (boardState, key) => {
          const piece = boardState.pieces.get(key);
          const role = piece.role;
          const color = piece.color;
          switch (role) {
            case "p-piece":
              return shogiPawn(color);
            case "l-piece":
              return shogiLance(color);
            case "n-piece":
              return shogiKnight(color);
            case "k-piece":
              return kingNoCastling;
            case "s-piece":
              return shogiSilver(color);
            case "g-piece":
            case "pp-piece":
            case "pl-piece":
            case "pn-piece":
            case "ps-piece":
              return shogiGold(color);
            case "b-piece":
              return bishop;
            case "r-piece":
              return rook;
            case "pr-piece":
              return shogiDragon;
            case "pb-piece":
              return shogiHorse;
            default:
              return noMove;
          }
        };
      case "kyotoshogi":
        return (boardState, key) => {
          const piece = boardState.pieces.get(key);
          const role = piece.role;
          const color = piece.color;
          switch (role) {
            case "l-piece":
              return shogiLance(color);
            case "pl-piece":
              return shogiGold(color);
            case "s-piece":
              return shogiSilver(color);
            case "ps-piece":
              return bishop;
            case "n-piece":
              return shogiKnight(color);
            case "pn-piece":
              return shogiGold(color);
            case "p-piece":
              return shogiPawn(color);
            case "pp-piece":
              return rook;
            case "k-piece":
              return kingNoCastling;
            default:
              return noMove;
          }
        };
      case "dobutsu":
        return (boardState, key) => {
          const piece = boardState.pieces.get(key);
          const role = piece.role;
          const color = piece.color;
          switch (role) {
            case "c-piece":
              return shogiPawn(color);
            case "e-piece":
              return ferz;
            case "g-piece":
              return wazir;
            case "l-piece":
              return kingNoCastling;
            case "pc-piece":
              return shogiGold(color);
            default:
              return noMove;
          }
        };
      case "torishogi":
        return (boardState, key) => {
          const piece = boardState.pieces.get(key);
          const role = piece.role;
          const color = piece.color;
          switch (role) {
            case "s-piece":
              return shogiPawn(color);
            case "ps-piece":
              return toriGoose(color);
            case "l-piece":
              return toriLeftQuail(color);
            case "r-piece":
              return toriRightQuail(color);
            case "p-piece":
              return toriPheasant(color);
            case "c-piece":
              return toriCrane;
            case "f-piece":
              return toriFalcon(color);
            case "pf-piece":
              return toriEagle(color);
            case "k-piece":
              return kingNoCastling;
            default:
              return noMove;
          }
        };
      case "makruk":
      case "makpong":
      case "sittuyin":
      case "cambodian":
      case "asean":
        return (boardState, key, canCastle) => {
          const piece = boardState.pieces.get(key);
          const role = piece.role;
          const color = piece.color;
          switch (role) {
            case "p-piece":
              return variant2 === "sittuyin" ? pawnSittuyin(boardState.pieces, color) : pawnNoDoubleStep(color);
            case "r-piece":
              return rook;
            case "n-piece":
              return knight;
            case "b-piece":
            case "s-piece":
              return shogiSilver(color);
            case "q-piece":
            case "f-piece":
            case "m-piece":
              return variant2 === "cambodian" ? ferzOuk(color) : ferz;
            case "k-piece":
              return variant2 === "cambodian" ? kingOuk(color, canCastle) : kingNoCastling;
            default:
              return noMove;
          }
        };
      case "grand":
      case "grandhouse":
        return (boardState, key) => {
          const piece = boardState.pieces.get(key);
          const role = piece.role;
          const color = piece.color;
          switch (role) {
            case "p-piece":
              return pawnGrand(color);
            case "r-piece":
              return rook;
            case "n-piece":
              return knight;
            case "b-piece":
              return bishop;
            case "q-piece":
              return queen;
            case "c-piece":
              return chancellor;
            case "a-piece":
              return archbishop;
            case "k-piece":
              return kingNoCastling;
            default:
              return noMove;
          }
        };
      case "shako":
        return (boardState, key, canCastle) => {
          const piece = boardState.pieces.get(key);
          const role = piece.role;
          const color = piece.color;
          switch (role) {
            case "p-piece":
              return pawnGrand(color);
            case "c-piece":
            case "r-piece":
              return rook;
            case "n-piece":
              return knight;
            case "b-piece":
              return bishop;
            case "q-piece":
              return queen;
            case "e-piece":
              return shakoElephant;
            case "k-piece":
              return kingShako(color, rookFilesOfShako(boardState.pieces, color), canCastle);
            default:
              return noMove;
          }
        };
      case "shogun":
        return (boardState, key, canCastle) => {
          const piece = boardState.pieces.get(key);
          const role = piece.role;
          const color = piece.color;
          switch (role) {
            case "p-piece":
              return pawn(color);
            case "pp-piece":
              return kingNoCastling;
            case "r-piece":
              return rook;
            case "pr-piece":
              return chancellor;
            case "n-piece":
              return knight;
            case "pn-piece":
              return centaur;
            case "b-piece":
              return bishop;
            case "pb-piece":
              return archbishop;
            case "f-piece":
              return ferz;
            case "pf-piece":
              return queen;
            case "k-piece":
              return king(color, rookFilesOf(boardState.pieces, color), canCastle);
            default:
              return noMove;
          }
        };
      case "orda":
      case "ordamirror":
        return (boardState, key, canCastle) => {
          const piece = boardState.pieces.get(key);
          const role = piece.role;
          const color = piece.color;
          switch (role) {
            case "p-piece":
              return pawn(color);
            case "r-piece":
              return rook;
            case "n-piece":
              return knight;
            case "b-piece":
              return bishop;
            case "q-piece":
              return queen;
            case "l-piece":
              return chancellor;
            case "h-piece":
              return centaur;
            case "a-piece":
              return archbishop;
            case "y-piece":
              return shogiSilver(color);
            case "f-piece":
              return amazon;
            case "k-piece":
              return king(color, rookFilesOf(boardState.pieces, color), canCastle);
            default:
              return noMove;
          }
        };
      case "synochess":
        return (boardState, key, canCastle) => {
          const piece = boardState.pieces.get(key);
          const role = piece.role;
          const color = piece.color;
          switch (role) {
            case "p-piece":
              return pawn(color);
            case "c-piece":
            case "r-piece":
              return rook;
            case "n-piece":
              return knight;
            case "b-piece":
              return bishop;
            case "q-piece":
              return queen;
            case "s-piece":
              return minixiangqiPawn(color);
            case "e-piece":
              return shakoElephant;
            case "a-piece":
              return kingNoCastling;
            case "k-piece":
              return king(color, rookFilesOf(boardState.pieces, color), canCastle && color === "white");
            default:
              return noMove;
          }
        };
      case "musketeer":
        return (boardState, key, canCastle) => {
          const piece = boardState.pieces.get(key);
          const role = piece.role;
          const color = piece.color;
          switch (role) {
            case "p-piece":
              return pawn(color);
            case "r-piece":
              return rook;
            case "n-piece":
              return knight;
            case "b-piece":
              return bishop;
            case "q-piece":
              return queen;
            case "l-piece":
              return musketeerLeopard;
            case "o-piece":
              return musketeerCannon;
            case "u-piece":
              return musketeerUnicorn;
            case "d-piece":
              return musketeerDragon;
            case "c-piece":
              return chancellor;
            case "a-piece":
              return archbishop;
            case "e-piece":
              return musketeerElephant;
            case "h-piece":
              return musketeerHawk;
            case "f-piece":
              return musketeerFortress;
            case "s-piece":
              return musketeerSpider;
            case "k-piece":
              return king(color, rookFilesOf(boardState.pieces, color), canCastle);
            default:
              return noMove;
          }
        };
      case "hoppelpoppel":
        return (boardState, key, canCastle) => {
          const piece = boardState.pieces.get(key);
          const role = piece.role;
          const color = piece.color;
          switch (role) {
            case "p-piece":
              return pawn(color);
            case "r-piece":
              return rook;
            case "n-piece":
            case "b-piece":
              return archbishop;
            case "q-piece":
              return queen;
            case "k-piece":
              return king(color, rookFilesOf(boardState.pieces, color), canCastle);
            default:
              return noMove;
          }
        };
      case "shinobi":
        return (boardState, key, canCastle) => {
          const piece = boardState.pieces.get(key);
          const role = piece.role;
          const color = piece.color;
          switch (role) {
            case "p-piece":
              return pawn(color);
            case "pl-piece":
            case "r-piece":
              return rook;
            case "ph-piece":
            case "n-piece":
              return knight;
            case "pm-piece":
            case "b-piece":
              return bishop;
            case "q-piece":
              return queen;
            case "pp-piece":
            case "c-piece":
              return kingNoCastling;
            case "l-piece":
              return shogiLance(color);
            case "h-piece":
              return shogiKnight(color);
            case "m-piece":
              return ferz;
            case "d-piece":
              return shogiDragon;
            case "j-piece":
              return archbishop;
            case "k-piece":
              return king(color, rookFilesOf(boardState.pieces, color), canCastle);
            default:
              return noMove;
          }
        };
      case "empire":
        return (boardState, key, canCastle) => {
          const piece = boardState.pieces.get(key);
          const role = piece.role;
          const color = piece.color;
          switch (role) {
            case "p-piece":
              return pawn(color);
            case "s-piece":
              return minixiangqiPawn(color);
            case "r-piece":
              return rook;
            case "n-piece":
              return knight;
            case "b-piece":
              return bishop;
            case "q-piece":
            case "d-piece":
            case "t-piece":
            case "c-piece":
              return queen;
            case "e-piece":
              return amazon;
            case "k-piece":
              return king(color, rookFilesOf(boardState.pieces, color), canCastle);
            default:
              return noMove;
          }
        };
      case "chak":
        return (boardState, key) => {
          const piece = boardState.pieces.get(key);
          const role = piece.role;
          const color = piece.color;
          switch (role) {
            case "p-piece":
              return pawnChak(color);
            case "pp-piece":
              return chakWarrior(color);
            case "r-piece":
              return rook;
            case "v-piece":
              return knight;
            case "s-piece":
              return toriCrane;
            case "j-piece":
              return centaur;
            case "q-piece":
              return queen;
            case "k-piece":
              return kingNoCastling;
            case "pk-piece":
              return chakDivineKing(color);
            case "o-piece":
            default:
              return noMove;
          }
        };
      case "chennis":
        return (boardState, key) => {
          const piece = boardState.pieces.get(key);
          const role = piece.role;
          const color = piece.color;
          switch (role) {
            case "p-piece":
              return pawnNoDoubleStep(color);
            case "pp-piece":
              return rook;
            case "s-piece":
              return minixiangqiPawn(color);
            case "ps-piece":
              return bishop;
            case "f-piece":
              return ferz;
            case "pf-piece":
              return rook;
            case "m-piece":
              return kingNoCastling;
            case "pm-piece":
              return knight;
            case "k-piece":
              return kingChennis(color);
            default:
              return noMove;
          }
        };
      case "spartan":
        return (boardState, key, canCastle) => {
          const piece = boardState.pieces.get(key);
          const role = piece.role;
          const color = piece.color;
          switch (role) {
            case "h-piece":
              return pawnBerolina(color);
            case "g-piece":
              return shogiDragon;
            case "w-piece":
              return archbishop;
            case "c-piece":
              return and(rook, distance(2));
            case "l-piece":
              return or(and(bishop, distance(2)), sideways);
            case "p-piece":
              return pawn(color);
            case "r-piece":
              return rook;
            case "n-piece":
              return knight;
            case "b-piece":
              return bishop;
            case "q-piece":
              return queen;
            case "k-piece":
              return chess960 ? king960(color, rookFilesOf(boardState.pieces, color), canCastle) : king(color, rookFilesOf(boardState.pieces, color), canCastle);
            default:
              return noMove;
          }
        };
      case "capablanca":
      case "capahouse":
        return (boardState, key, canCastle) => {
          const piece = boardState.pieces.get(key);
          const role = piece.role;
          const color = piece.color;
          switch (role) {
            case "p-piece":
              return pawn(color);
            case "r-piece":
              return rook;
            case "n-piece":
              return knight;
            case "b-piece":
              return bishop;
            case "q-piece":
              return queen;
            case "c-piece":
              return chancellor;
            case "a-piece":
              return archbishop;
            case "k-piece":
              return chess960 ? king960(color, rookFilesOf(boardState.pieces, color), canCastle) : kingCapa(color, rookFilesOf(boardState.pieces, color), canCastle);
            default:
              return noMove;
          }
        };
      default:
        return (boardState, key, canCastle) => {
          const piece = boardState.pieces.get(key);
          const role = piece.role;
          const color = piece.color;
          switch (role) {
            case "p-piece":
              return pawn(color);
            case "r-piece":
              return rook;
            case "n-piece":
              return knight;
            case "b-piece":
              return bishop;
            case "q-piece":
              return queen;
            case "e-piece":
            case "c-piece":
              return chancellor;
            case "h-piece":
            case "a-piece":
              return archbishop;
            case "k-piece":
              return chess960 ? king960(color, rookFilesOf(boardState.pieces, color), canCastle) : king(color, rookFilesOf(boardState.pieces, color), canCastle);
            default:
              return noMove;
          }
        };
    }
  }

  // node_modules/chessgroundx/board.js
  function callUserFunction(f, ...args) {
    if (f)
      setTimeout(() => f(...args), 1);
  }
  function toggleOrientation(state) {
    state.orientation = opposite(state.orientation);
    state.animation.current = state.draggable.current = state.selectable.selected = void 0;
  }
  function setPieces(state, pieces) {
    for (const [key, piece] of pieces) {
      if (piece)
        state.boardState.pieces.set(key, piece);
      else
        state.boardState.pieces.delete(key);
    }
  }
  function setCheck(state, color) {
    state.check = void 0;
    if (color === true)
      color = state.turnColor;
    if (color)
      for (const [k, p] of state.boardState.pieces) {
        if (state.kingRoles.includes(p.role) && p.color === color) {
          state.check = k;
          break;
        }
      }
  }
  function setPremove(state, orig, dest, meta) {
    state.premovable.current = [orig, dest];
    callUserFunction(state.premovable.events.set, orig, dest, meta);
  }
  function unsetPremove(state) {
    if (state.premovable.current) {
      state.premovable.current = void 0;
      callUserFunction(state.premovable.events.unset);
    }
  }
  function tryAutoCastle(state, orig, dest) {
    if (!state.autoCastle)
      return false;
    const king2 = state.boardState.pieces.get(orig);
    if (!king2 || king2.role !== "k-piece")
      return false;
    const origPos = key2pos(orig);
    const destPos = key2pos(dest);
    if (origPos[1] !== 0 && origPos[1] !== 7 || origPos[1] !== destPos[1])
      return false;
    if (origPos[0] === 4 && !state.boardState.pieces.has(dest)) {
      if (destPos[0] === 6)
        dest = pos2key([7, destPos[1]]);
      else if (destPos[0] === 2)
        dest = pos2key([0, destPos[1]]);
    }
    const rook2 = state.boardState.pieces.get(dest);
    if (!rook2 || rook2.color !== king2.color || rook2.role !== "r-piece")
      return false;
    state.boardState.pieces.delete(orig);
    state.boardState.pieces.delete(dest);
    if (origPos[0] < destPos[0]) {
      state.boardState.pieces.set(pos2key([6, destPos[1]]), king2);
      state.boardState.pieces.set(pos2key([5, destPos[1]]), rook2);
    } else {
      state.boardState.pieces.set(pos2key([2, destPos[1]]), king2);
      state.boardState.pieces.set(pos2key([3, destPos[1]]), rook2);
    }
    return true;
  }
  function baseMove(state, orig, dest) {
    const origPiece = state.boardState.pieces.get(orig), destPiece = state.boardState.pieces.get(dest);
    if (orig === dest || !origPiece)
      return false;
    const captured = destPiece && destPiece.color !== origPiece.color ? destPiece : void 0;
    if (dest === state.selectable.selected)
      unselect(state);
    callUserFunction(state.events.move, orig, dest, captured);
    if (!tryAutoCastle(state, orig, dest)) {
      state.boardState.pieces.set(dest, origPiece);
      state.boardState.pieces.delete(orig);
    }
    state.lastMove = [orig, dest];
    state.check = void 0;
    callUserFunction(state.events.change);
    return captured || true;
  }
  function baseNewPiece(state, piece, dest, fromPocket, force) {
    if (state.boardState.pieces.has(dest)) {
      if (force)
        state.boardState.pieces.delete(dest);
      else
        return false;
    }
    callUserFunction(state.events.dropNewPiece, piece, dest);
    state.boardState.pieces.set(dest, piece);
    if (fromPocket)
      changeNumber(state.boardState.pockets[piece.color], piece.role, -1);
    state.lastMove = [dropOrigOf(piece.role), dest];
    state.check = void 0;
    callUserFunction(state.events.change);
    state.movable.dests = void 0;
    state.turnColor = opposite(state.turnColor);
    return true;
  }
  function baseUserMove(state, orig, dest, fromPocket, force) {
    const result = isKey(orig) ? baseMove(state, orig, dest) : baseNewPiece(state, orig, dest, fromPocket, force);
    if (result) {
      state.movable.dests = void 0;
      state.turnColor = opposite(state.turnColor);
      state.animation.current = void 0;
    }
    return result;
  }
  function userMove(state, orig, dest, fromPocket, force) {
    if (canMove(state, orig, dest, fromPocket) || force) {
      const result = baseUserMove(state, orig, dest, fromPocket, force);
      if (result) {
        const holdTime = state.hold.stop();
        unselect(state);
        const metadata = {
          premove: false,
          ctrlKey: state.stats.ctrlKey,
          holdTime
        };
        if (result !== true)
          metadata.captured = result;
        if (isKey(orig))
          callUserFunction(state.movable.events.after, orig, dest, metadata);
        else
          callUserFunction(state.movable.events.afterNewPiece, orig, dest, metadata);
        return true;
      }
    } else if (canPremove(state, orig, dest, fromPocket)) {
      setPremove(state, isKey(orig) ? orig : dropOrigOf(orig.role), dest, {
        ctrlKey: state.stats.ctrlKey
      });
      unselect(state);
      return true;
    }
    unselect(state);
    return false;
  }
  function select(state, selected, force) {
    if (isKey(selected))
      callUserFunction(state.events.select, selected);
    else
      callUserFunction(state.events.selectPocket, selected);
    if (state.selectable.selected) {
      if (isSame(state.selectable.selected, selected) && !state.draggable.enabled) {
        unselect(state);
        state.hold.cancel();
        return;
      } else if ((state.selectable.enabled || force) && isKey(selected) && state.selectable.selected !== selected) {
        if (userMove(state, state.selectable.selected, selected, !!state.selectable.fromPocket)) {
          state.stats.dragged = false;
          return;
        }
      }
    }
    if ((state.selectable.enabled || state.draggable.enabled) && (isMovable(state, selected, true) || isPremovable(state, selected, true))) {
      setSelected(state, selected, true);
      state.hold.start();
    }
  }
  function setSelected(state, selected, fromPocket) {
    if (isKey(selected))
      setSelectedKey(state, selected);
    else
      setDropMode(state, selected, !!fromPocket);
  }
  function setSelectedKey(state, key) {
    state.selectable.selected = key;
    state.selectable.fromPocket = false;
    if (isPremovable(state, key, false)) {
      state.premovable.dests = state.premovable.premoveFunc(state.boardState, key, state.premovable.castle);
    } else {
      state.premovable.dests = void 0;
    }
  }
  function setDropMode(state, piece, fromPocket) {
    state.selectable.selected = piece;
    state.selectable.fromPocket = fromPocket;
    if (isPremovable(state, piece, fromPocket)) {
      state.premovable.dests = state.premovable.predropFunc(state.boardState, piece);
    } else {
      state.premovable.dests = void 0;
    }
  }
  function unselect(state) {
    state.selectable.selected = void 0;
    state.premovable.dests = void 0;
    state.hold.cancel();
  }
  function pieceAvailability(state, orig, fromPocket) {
    var _a2, _b;
    let piece;
    let available = false;
    if (isKey(orig)) {
      piece = state.boardState.pieces.get(orig);
      available = !!piece;
    } else {
      piece = orig;
      const num = (_b = (_a2 = state.boardState.pockets) === null || _a2 === void 0 ? void 0 : _a2[piece.color].get(piece.role)) !== null && _b !== void 0 ? _b : 0;
      available = !fromPocket || num > 0;
    }
    return [piece, available];
  }
  function isMovable(state, orig, fromPocket) {
    const [piece, available] = pieceAvailability(state, orig, fromPocket);
    return available && (state.movable.color === "both" || state.movable.color === piece.color && state.turnColor === piece.color);
  }
  var canMove = (state, orig, dest, fromPocket) => {
    var _a2, _b;
    return orig !== dest && isMovable(state, orig, fromPocket) && (state.movable.free || !!((_b = (_a2 = state.movable.dests) === null || _a2 === void 0 ? void 0 : _a2.get(isKey(orig) ? orig : dropOrigOf(orig.role))) === null || _b === void 0 ? void 0 : _b.includes(dest)));
  };
  function isPremovable(state, orig, fromPocket) {
    const [piece, available] = pieceAvailability(state, orig, fromPocket);
    return available && state.premovable.enabled && state.movable.color === piece.color && state.turnColor !== piece.color;
  }
  var canPremove = (state, orig, dest, fromPocket) => orig !== dest && isPremovable(state, orig, fromPocket) && (isKey(orig) ? state.premovable.premoveFunc(state.boardState, orig, state.premovable.castle).includes(dest) : state.premovable.predropFunc(state.boardState, orig).includes(dest));
  function isDraggable(state, orig, fromPocket) {
    const [piece, available] = pieceAvailability(state, orig, fromPocket);
    return available && state.draggable.enabled && (state.movable.color === "both" || state.movable.color === piece.color && (state.turnColor === piece.color || state.premovable.enabled));
  }
  function playPremove(state) {
    const move3 = state.premovable.current;
    if (!move3)
      return false;
    const orig = isKey(move3[0]) ? move3[0] : { role: roleOf(move3[0]), color: state.turnColor };
    const dest = move3[1];
    let success = false;
    if (canMove(state, orig, dest, true)) {
      const result = baseUserMove(state, orig, dest, true);
      if (result) {
        const metadata = { premove: true };
        if (result !== true)
          metadata.captured = result;
        if (isKey(orig))
          callUserFunction(state.movable.events.after, orig, dest, metadata);
        else
          callUserFunction(state.movable.events.afterNewPiece, orig, dest, metadata);
        success = true;
      }
    }
    unsetPremove(state);
    return success;
  }
  function cancelMove(state) {
    unsetPremove(state);
    unselect(state);
  }
  function stop(state) {
    state.movable.color = state.movable.dests = state.animation.current = void 0;
    cancelMove(state);
  }
  function getKeyAtDomPos(pos, asWhite, bounds, bd) {
    let file = Math.floor(bd.width * (pos[0] - bounds.left) / bounds.width);
    if (!asWhite)
      file = bd.width - 1 - file;
    let rank = bd.height - 1 - Math.floor(bd.height * (pos[1] - bounds.top) / bounds.height);
    if (!asWhite)
      rank = bd.height - 1 - rank;
    return file >= 0 && file < bd.width && rank >= 0 && rank < bd.height ? pos2key([file, rank]) : void 0;
  }
  function getSnappedKeyAtDomPos(orig, pos, asWhite, bounds, bd) {
    const origPos = key2pos(orig);
    const validSnapPos = allPos(bd).filter((pos2) => {
      return queen(origPos[0], origPos[1], pos2[0], pos2[1]) || knight(origPos[0], origPos[1], pos2[0], pos2[1]) || // Only apply this to 9x10 board to avoid interfering with other variants beside Janggi
      bd.width === 9 && bd.height === 10 && janggiElephant(origPos[0], origPos[1], pos2[0], pos2[1]);
    });
    const validSnapCenters = validSnapPos.map((pos2) => computeSquareCenter(pos2key(pos2), asWhite, bounds, bd));
    const validSnapDistances = validSnapCenters.map((pos2) => distanceSq(pos, pos2));
    const [, closestSnapIndex] = validSnapDistances.reduce((a, b, index) => a[0] < b ? a : [b, index], [validSnapDistances[0], 0]);
    return pos2key(validSnapPos[closestSnapIndex]);
  }
  var whitePov = (s) => s.orientation === "white";

  // node_modules/chessgroundx/config.js
  function applyAnimation(state, config) {
    if (config.animation) {
      deepMerge(state.animation, config.animation);
      if ((state.animation.duration || 0) < 70)
        state.animation.enabled = false;
    }
  }
  function configure(state, config) {
    var _a2, _b, _c;
    if ((_a2 = config.movable) === null || _a2 === void 0 ? void 0 : _a2.dests)
      state.movable.dests = void 0;
    if ((_b = config.drawable) === null || _b === void 0 ? void 0 : _b.autoShapes)
      state.drawable.autoShapes = [];
    deepMerge(state, config);
    if (config.fen) {
      const boardState = read(config.fen, state.dimensions);
      const draggedPiece = state.boardState.pieces.get("a0");
      if (draggedPiece !== void 0)
        boardState.pieces.set("a0", draggedPiece);
      if (state.pocketRoles)
        boardState.pockets = (_c = boardState.pockets) !== null && _c !== void 0 ? _c : { white: /* @__PURE__ */ new Map(), black: /* @__PURE__ */ new Map() };
      else
        boardState.pockets = void 0;
      state.boardState = boardState;
      state.drawable.shapes = [];
    }
    if ("check" in config || "kingRoles" in config)
      setCheck(state, config.check || false);
    if ("lastMove" in config && !config.lastMove)
      state.lastMove = void 0;
    else if (config.lastMove)
      state.lastMove = config.lastMove;
    if (state.selectable.selected)
      setSelected(state, state.selectable.selected, state.selectable.fromPocket);
    applyAnimation(state, config);
    if (!state.movable.rookCastle && state.movable.dests) {
      const rank = state.movable.color === "white" ? "1" : "8", kingStartPos = "e" + rank, dests = state.movable.dests.get(kingStartPos), king2 = state.boardState.pieces.get(kingStartPos);
      if (!dests || !king2 || king2.role !== "k-piece")
        return;
      state.movable.dests.set(kingStartPos, dests.filter((d) => !(d === "a" + rank && dests.includes("c" + rank)) && !(d === "h" + rank && dests.includes("g" + rank))));
    }
  }
  function deepMerge(base, extend) {
    for (const key in extend) {
      if (Object.prototype.hasOwnProperty.call(extend, key)) {
        if (Object.prototype.hasOwnProperty.call(base, key) && isPlainObject(base[key]) && isPlainObject(extend[key]))
          deepMerge(base[key], extend[key]);
        else
          base[key] = extend[key];
      }
    }
  }
  function isPlainObject(o) {
    if (typeof o !== "object" || o === null)
      return false;
    const proto = Object.getPrototypeOf(o);
    return proto === Object.prototype || proto === null;
  }

  // node_modules/chessgroundx/anim.js
  var anim = (mutation, state) => state.animation.enabled ? animate(mutation, state) : render(mutation, state);
  function render(mutation, state) {
    const result = mutation(state);
    state.dom.redraw();
    return result;
  }
  var makePiece = (key, piece) => ({
    key,
    pos: key2pos(key),
    piece
  });
  var closer = (piece, pieces) => pieces.sort((p1, p2) => distanceSq(piece.pos, p1.pos) - distanceSq(piece.pos, p2.pos))[0];
  function computePlan(prevPieces, current) {
    const anims = /* @__PURE__ */ new Map(), animedOrigs = [], fadings = /* @__PURE__ */ new Map(), missings = [], news = [], prePieces = /* @__PURE__ */ new Map();
    let curP, preP, vector;
    for (const [k, p] of prevPieces) {
      prePieces.set(k, makePiece(k, p));
    }
    for (const key of allKeys(current.dimensions)) {
      curP = current.boardState.pieces.get(key);
      preP = prePieces.get(key);
      if (curP) {
        if (preP) {
          if (!samePiece(curP, preP.piece)) {
            missings.push(preP);
            news.push(makePiece(key, curP));
          }
        } else
          news.push(makePiece(key, curP));
      } else if (preP)
        missings.push(preP);
    }
    for (const newP of news) {
      preP = closer(newP, missings.filter((p) => samePiece(newP.piece, p.piece)));
      if (preP) {
        vector = [preP.pos[0] - newP.pos[0], preP.pos[1] - newP.pos[1]];
        anims.set(newP.key, vector.concat(vector));
        animedOrigs.push(preP.key);
      }
    }
    for (const p of missings) {
      if (!animedOrigs.includes(p.key))
        fadings.set(p.key, p.piece);
    }
    return {
      anims,
      fadings
    };
  }
  function step(state, now) {
    const cur = state.animation.current;
    if (cur === void 0) {
      if (!state.dom.destroyed)
        state.dom.redrawNow();
      return;
    }
    const rest = 1 - (now - cur.start) * cur.frequency;
    if (rest <= 0) {
      state.animation.current = void 0;
      state.dom.redrawNow();
    } else {
      const ease = easing(rest);
      for (const cfg of cur.plan.anims.values()) {
        cfg[2] = cfg[0] * ease;
        cfg[3] = cfg[1] * ease;
      }
      state.dom.redrawNow(true);
      requestAnimationFrame((now2 = performance.now()) => step(state, now2));
    }
  }
  function animate(mutation, state) {
    const prevPieces = new Map(state.boardState.pieces);
    const result = mutation(state);
    const plan = computePlan(prevPieces, state);
    if (plan.anims.size || plan.fadings.size) {
      const alreadyRunning = state.animation.current && state.animation.current.start;
      state.animation.current = {
        start: performance.now(),
        frequency: 1 / state.animation.duration,
        plan
      };
      if (!alreadyRunning)
        step(state, performance.now());
    } else {
      state.dom.redraw();
    }
    return result;
  }
  var easing = (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

  // node_modules/chessgroundx/draw.js
  var brushes = ["green", "red", "blue", "yellow"];
  function start(state, e) {
    if (e.touches && e.touches.length > 1)
      return;
    e.stopPropagation();
    e.preventDefault();
    e.ctrlKey ? unselect(state) : cancelMove(state);
    const pos = eventPosition(e), orig = getKeyAtDomPos(pos, whitePov(state), state.dom.bounds(), state.dimensions);
    if (!orig)
      return;
    state.drawable.current = {
      orig,
      pos,
      brush: eventBrush(e),
      snapToValidMove: state.drawable.defaultSnapToValidMove
    };
    processDraw(state);
  }
  function processDraw(state) {
    requestAnimationFrame(() => {
      const cur = state.drawable.current;
      if (cur) {
        const keyAtDomPos = getKeyAtDomPos(cur.pos, whitePov(state), state.dom.bounds(), state.dimensions);
        if (!keyAtDomPos) {
          cur.snapToValidMove = false;
        }
        const mouseSq = cur.snapToValidMove ? getSnappedKeyAtDomPos(cur.orig, cur.pos, whitePov(state), state.dom.bounds(), state.dimensions) : keyAtDomPos;
        if (mouseSq !== cur.mouseSq) {
          cur.mouseSq = mouseSq;
          cur.dest = mouseSq !== cur.orig ? mouseSq : void 0;
          state.dom.redrawNow();
        }
        processDraw(state);
      }
    });
  }
  function move(state, e) {
    if (state.drawable.current)
      state.drawable.current.pos = eventPosition(e);
  }
  function end(state) {
    const cur = state.drawable.current;
    if (cur) {
      if (cur.mouseSq)
        addShape(state.drawable, cur);
      cancel(state);
    }
  }
  function cancel(state) {
    if (state.drawable.current) {
      state.drawable.current = void 0;
      state.dom.redraw();
    }
  }
  function clear(state) {
    if (state.drawable.shapes.length) {
      state.drawable.shapes = [];
      state.dom.redraw();
      onChange(state.drawable);
    }
  }
  function eventBrush(e) {
    var _a2;
    const modA = (e.shiftKey || e.ctrlKey) && isRightButton(e);
    const modB = e.altKey || e.metaKey || ((_a2 = e.getModifierState) === null || _a2 === void 0 ? void 0 : _a2.call(e, "AltGraph"));
    return brushes[(modA ? 1 : 0) + (modB ? 2 : 0)];
  }
  function addShape(drawable, cur) {
    const sameShape = (s) => s.orig === cur.orig && s.dest === cur.dest;
    const similar = drawable.shapes.find(sameShape);
    if (similar)
      drawable.shapes = drawable.shapes.filter((s) => !sameShape(s));
    if (!similar || similar.brush !== cur.brush)
      drawable.shapes.push(cur);
    onChange(drawable);
  }
  function onChange(drawable) {
    if (drawable.onChange)
      drawable.onChange(drawable.shapes);
  }

  // node_modules/chessgroundx/drag.js
  function start2(s, e) {
    if (!e.isTrusted || e.button !== void 0 && e.button !== 0)
      return;
    if (e.touches && e.touches.length > 1)
      return;
    const bounds = s.dom.bounds(), position = eventPosition(e), orig = getKeyAtDomPos(position, whitePov(s), bounds, s.dimensions);
    if (!orig)
      return;
    const piece = s.boardState.pieces.get(orig);
    const previouslySelected = s.selectable.selected;
    if (!previouslySelected && s.drawable.enabled && (s.drawable.eraseOnClick || !piece || piece.color !== s.turnColor))
      clear(s);
    if (e.cancelable !== false && (!e.touches || s.blockTouchScroll || piece || previouslySelected || pieceCloseTo(s, position)))
      e.preventDefault();
    const hadPremove = !!s.premovable.current;
    s.stats.ctrlKey = e.ctrlKey;
    if (s.selectable.selected && canMove(s, s.selectable.selected, orig, !!s.selectable.fromPocket)) {
      anim((state) => select(state, orig), s);
    } else {
      select(s, orig);
    }
    const stillSelected = s.selectable.selected === orig;
    const element = pieceElementByKey(s, orig);
    if (piece && element && stillSelected && isDraggable(s, orig, false)) {
      s.draggable.current = {
        orig,
        piece,
        origPos: position,
        pos: position,
        started: s.draggable.autoDistance && s.stats.dragged,
        element,
        previouslySelected,
        originTarget: e.target,
        keyHasChanged: false
      };
      element.cgDragging = true;
      element.classList.add("dragging");
      const ghost = s.dom.elements.ghost;
      if (ghost) {
        ghost.className = "ghost " + pieceClasses(piece, s.orientation);
        translate(ghost, posToTranslate(bounds, s.dimensions)(key2pos(orig), whitePov(s)));
        setVisible(ghost, true);
      }
      processDrag(s);
    } else {
      if (hadPremove)
        unsetPremove(s);
    }
    s.dom.redraw();
  }
  function pieceCloseTo(s, pos) {
    const asWhite = whitePov(s), bounds = s.dom.bounds(), radiusSq = Math.pow(bounds.width / s.dimensions.width, 2);
    for (const key of s.boardState.pieces.keys()) {
      const center = computeSquareCenter(key, asWhite, bounds, s.dimensions);
      if (distanceSq(center, pos) <= radiusSq)
        return true;
    }
    return false;
  }
  function dragNewPiece(s, piece, fromPocket, e, previouslySelected, force) {
    s.dom.redraw();
    const position = eventPosition(e);
    s.boardState.pieces.set("a0", piece);
    s.draggable.current = {
      orig: "a0",
      piece,
      origPos: position,
      pos: position,
      started: true,
      element: () => pieceElementByKey(s, "a0"),
      previouslySelected,
      originTarget: e.target,
      fromPocket,
      force: !!force,
      keyHasChanged: false
    };
    processDrag(s);
  }
  function processDrag(s) {
    requestAnimationFrame(() => {
      var _a2;
      const cur = s.draggable.current;
      if (!cur)
        return;
      if ((_a2 = s.animation.current) === null || _a2 === void 0 ? void 0 : _a2.plan.anims.has(cur.orig))
        s.animation.current = void 0;
      const origPiece = s.boardState.pieces.get(cur.orig);
      if (!samePiece(origPiece, cur.piece))
        cancel2(s);
      else {
        if (!cur.started && distanceSq(cur.pos, cur.origPos) >= Math.pow(s.draggable.distance, 2))
          cur.started = true;
        if (cur.started) {
          if (typeof cur.element === "function") {
            const found = cur.element();
            if (!found)
              return;
            found.cgDragging = true;
            found.classList.add("dragging");
            cur.element = found;
          }
          const bounds = s.dom.bounds();
          translate(cur.element, [
            cur.pos[0] - bounds.left - bounds.width / (2 * s.dimensions.width),
            cur.pos[1] - bounds.top - bounds.height / (2 * s.dimensions.height)
          ]);
          if (cur.orig !== "a0")
            cur.keyHasChanged || (cur.keyHasChanged = cur.orig !== getKeyAtDomPos(cur.pos, whitePov(s), bounds, s.dimensions));
        }
      }
      processDrag(s);
    });
  }
  function move2(s, e) {
    if (s.draggable.current && (!e.touches || e.touches.length < 2)) {
      s.draggable.current.pos = eventPosition(e);
    }
  }
  function end2(s, e) {
    var _a2;
    const cur = s.draggable.current;
    if (!cur)
      return;
    if (e.type === "touchend" && e.cancelable !== false)
      e.preventDefault();
    if (e.type === "touchend" && cur.originTarget !== e.target) {
      s.draggable.current = void 0;
      return;
    }
    unsetPremove(s);
    const eventPos = eventPosition(e) || cur.pos;
    const dest = getKeyAtDomPos(eventPos, whitePov(s), s.dom.bounds(), s.dimensions);
    const target = e.target;
    const onPocket = Number((_a2 = target.getAttribute("data-nb")) !== null && _a2 !== void 0 ? _a2 : -1) >= 0;
    const targetPiece = onPocket ? { role: target.getAttribute("data-role"), color: target.getAttribute("data-color") } : void 0;
    if (dest && cur.started && cur.orig !== dest) {
      s.stats.ctrlKey = e.ctrlKey;
      if (userMove(s, cur.orig !== "a0" ? cur.orig : cur.piece, dest, !!cur.fromPocket))
        s.stats.dragged = true;
    } else if (s.draggable.deleteOnDropOff && !dest) {
      s.boardState.pieces.delete(cur.orig);
      if (cur.fromPocket)
        changeNumber(s.boardState.pockets[cur.piece.color], cur.piece.role, -1);
      callUserFunction(s.events.change);
    }
    if ((cur.previouslySelected && (cur.orig === cur.previouslySelected || isSame(cur.piece, cur.previouslySelected)) || cur.keyHasChanged) && (cur.orig === dest || !dest))
      unselect(s);
    if (cur.orig === "a0" && (!targetPiece || !samePiece(cur.piece, targetPiece)))
      unselect(s);
    else if (!s.selectable.enabled)
      unselect(s);
    if (cur.orig === "a0")
      s.boardState.pieces.delete("a0");
    removeDragElements(s);
    s.draggable.current = void 0;
    s.dom.redraw();
  }
  function cancel2(s) {
    const cur = s.draggable.current;
    if (cur) {
      s.draggable.current = void 0;
      s.boardState.pieces.delete("a0");
      unselect(s);
      removeDragElements(s);
      s.dom.redraw();
    }
  }
  function removeDragElements(s) {
    const e = s.dom.elements;
    if (e.ghost)
      setVisible(e.ghost, false);
  }
  function pieceElementByKey(s, key) {
    let el = s.dom.elements.board.firstChild;
    while (el) {
      if (el.cgKey === key && el.tagName === "PIECE")
        return el;
      el = el.nextSibling;
    }
    return;
  }

  // node_modules/chessgroundx/explosion.js
  function explosion(state, keys) {
    state.exploding = { stage: 1, keys };
    state.dom.redraw();
    setTimeout(() => {
      setStage(state, 2);
      setTimeout(() => setStage(state, void 0), 120);
    }, 120);
  }
  function setStage(state, stage) {
    if (state.exploding) {
      if (stage)
        state.exploding.stage = stage;
      else
        state.exploding = void 0;
      state.dom.redraw();
    }
  }

  // node_modules/chessgroundx/api.js
  function start3(state, redrawAll) {
    function toggleOrientation2() {
      toggleOrientation(state);
      redrawAll();
    }
    return {
      set(config) {
        if (config.orientation && config.orientation !== state.orientation)
          toggleOrientation2();
        applyAnimation(state, config);
        (config.fen ? anim : render)((state2) => configure(state2, config), state);
      },
      state,
      getFen: () => write(state.boardState, state.dimensions),
      toggleOrientation: toggleOrientation2,
      setPieces(pieces) {
        anim((state2) => setPieces(state2, pieces), state);
      },
      changePocket(piece, num) {
        var _a2;
        if ((_a2 = state.pocketRoles) === null || _a2 === void 0 ? void 0 : _a2[piece.color].includes(piece.role)) {
          changeNumber(state.boardState.pockets[piece.color], piece.role, num);
          state.dom.redraw();
        }
      },
      selectSquare(key, force) {
        if (key)
          anim((state2) => select(state2, key, force), state);
        else if (state.selectable.selected) {
          unselect(state);
          state.dom.redraw();
        }
      },
      selectPocket(piece) {
        if (piece)
          anim((state2) => select(state2, piece), state);
        else if (state.selectable.selected) {
          unselect(state);
          state.dom.redraw();
        }
      },
      unselect() {
        unselect(state);
      },
      move(orig, dest) {
        if (isDropOrig(orig))
          baseNewPiece(state, { role: roleOf(orig), color: state.turnColor }, dest, true);
        else
          anim((state2) => baseMove(state2, orig, dest), state);
      },
      newPiece(piece, key, fromPocket) {
        anim((state2) => baseNewPiece(state2, piece, key, fromPocket), state);
      },
      playPremove() {
        if (state.premovable.current) {
          if (anim(playPremove, state))
            return true;
          state.dom.redraw();
        }
        return false;
      },
      cancelPremove() {
        render(unsetPremove, state);
      },
      cancelMove() {
        render((state2) => {
          cancelMove(state2);
          cancel2(state2);
        }, state);
      },
      stop() {
        render((state2) => {
          stop(state2);
          cancel2(state2);
        }, state);
      },
      explode(keys) {
        explosion(state, keys);
      },
      setAutoShapes(shapes) {
        render((state2) => state2.drawable.autoShapes = shapes, state);
      },
      setShapes(shapes) {
        render((state2) => state2.drawable.shapes = shapes, state);
      },
      getKeyAtDomPos(pos) {
        return getKeyAtDomPos(pos, whitePov(state), state.dom.bounds(), state.dimensions);
      },
      redrawAll,
      dragNewPiece(piece, fromPocket, event, force) {
        dragNewPiece(state, piece, fromPocket, event, void 0, force);
      },
      destroy() {
        stop(state);
        state.dom.unbind && state.dom.unbind();
        state.dom.destroyed = true;
      }
    };
  }

  // node_modules/chessgroundx/predrop.js
  var wholeBoard = () => true;
  function rankRange(from, to, color, bd) {
    if (from < 0)
      from += bd.height;
    if (to < 0)
      to += bd.height;
    return (_x, y) => {
      if (color === "black")
        y = bd.height - 1 - y;
      return from <= y && y < to;
    };
  }
  function predrop(variant2, bd) {
    const mobility = builtinMobility2(variant2, bd);
    return (boardState, piece) => allPos(bd).filter((pos) => {
      var _a2;
      return ((_a2 = boardState.pieces.get(pos2key(pos))) === null || _a2 === void 0 ? void 0 : _a2.color) !== piece.color && mobility(piece)(pos[0], pos[1]);
    }).map(pos2key);
  }
  function builtinMobility2(variant2, bd) {
    switch (variant2) {
      case "crazyhouse":
      case "shouse":
      case "capahouse":
      case "gothhouse":
        return (piece) => piece.role === "p-piece" ? rankRange(1, -1, piece.color, bd) : wholeBoard;
      case "placement":
        return (piece) => rankRange(0, 1, piece.color, bd);
      case "sittuyin":
        return (piece) => piece.role === "r-piece" ? rankRange(0, 1, piece.color, bd) : rankRange(0, 3, piece.color, bd);
      case "shogi":
      case "minishogi":
      case "gorogoro":
      case "gorogoroplus":
        return (piece) => {
          switch (piece.role) {
            case "p-piece":
            case "l-piece":
              return rankRange(0, -1, piece.color, bd);
            case "n-piece":
              return rankRange(0, -2, piece.color, bd);
            default:
              return wholeBoard;
          }
        };
      case "torishogi":
        return (piece) => piece.role === "s-piece" ? rankRange(0, -1, piece.color, bd) : wholeBoard;
      case "grandhouse":
        return (piece) => piece.role === "p-piece" ? rankRange(1, 7, piece.color, bd) : wholeBoard;
      case "shogun":
        return (piece) => rankRange(0, 5, piece.color, bd);
      case "synochess":
        return () => (_x, y) => y === 4;
      case "shinobi":
        return () => (_x, y) => y <= 3;
      case "kyotoshogi":
      case "dobutsu":
      case "chennis":
      default:
        return () => wholeBoard;
    }
  }

  // node_modules/chessgroundx/state.js
  function defaults() {
    return {
      boardState: read(initial, { width: 8, height: 8 }),
      orientation: "white",
      turnColor: "white",
      coordinates: true,
      ranksPosition: "right",
      autoCastle: true,
      viewOnly: false,
      disableContextMenu: false,
      addPieceZIndex: false,
      blockTouchScroll: false,
      pieceKey: false,
      highlight: {
        lastMove: true,
        check: true
      },
      animation: {
        enabled: true,
        duration: 200
      },
      movable: {
        free: true,
        color: "both",
        showDests: true,
        events: {},
        rookCastle: true
      },
      premovable: {
        enabled: true,
        premoveFunc: premove("chess", false, { width: 8, height: 8 }),
        predropFunc: predrop("chess", { width: 8, height: 8 }),
        castle: true,
        events: {}
      },
      draggable: {
        enabled: true,
        distance: 3,
        autoDistance: true,
        showGhost: true,
        deleteOnDropOff: false
      },
      selectable: {
        enabled: true
      },
      stats: {
        // on touchscreen, default to "tap-tap" moves
        // instead of drag
        dragged: !("ontouchstart" in window)
      },
      events: {},
      drawable: {
        enabled: true,
        visible: true,
        defaultSnapToValidMove: true,
        eraseOnClick: true,
        shapes: [],
        autoShapes: [],
        brushes: {
          green: { key: "g", color: "#15781B", opacity: 1, lineWidth: 10 },
          red: { key: "r", color: "#882020", opacity: 1, lineWidth: 10 },
          blue: { key: "b", color: "#003088", opacity: 1, lineWidth: 10 },
          yellow: { key: "y", color: "#e68f00", opacity: 1, lineWidth: 10 },
          paleBlue: { key: "pb", color: "#003088", opacity: 0.4, lineWidth: 15 },
          paleGreen: { key: "pg", color: "#15781B", opacity: 0.4, lineWidth: 15 },
          paleRed: { key: "pr", color: "#882020", opacity: 0.4, lineWidth: 15 },
          paleGrey: {
            key: "pgr",
            color: "#4a4a4a",
            opacity: 0.35,
            lineWidth: 15
          }
        },
        prevSvgHash: ""
      },
      hold: timer(),
      dimensions: { width: 8, height: 8 },
      notation: Notation.ALGEBRAIC,
      kingRoles: ["k-piece"]
    };
  }

  // node_modules/chessgroundx/sync.js
  function syncShapes(shapes, root, renderShape3) {
    const hashesInDom = /* @__PURE__ */ new Map(), toRemove = [];
    for (const sc of shapes)
      hashesInDom.set(sc.hash, false);
    let el = root.firstChild, elHash;
    while (el) {
      elHash = el.getAttribute("cgHash");
      if (hashesInDom.has(elHash))
        hashesInDom.set(elHash, true);
      else
        toRemove.push(el);
      el = el.nextSibling;
    }
    for (const el2 of toRemove)
      root.removeChild(el2);
    for (const sc of shapes) {
      if (!hashesInDom.get(sc.hash))
        root.appendChild(renderShape3(sc));
    }
  }

  // node_modules/chessgroundx/svg.js
  function createElement2(tagName2) {
    return document.createElementNS("http://www.w3.org/2000/svg", tagName2);
  }
  function renderSvg(state, svg, customSvg) {
    const d = state.drawable, curD = d.current, cur = curD && curD.mouseSq ? curD : void 0, arrowDests = /* @__PURE__ */ new Map(), bounds = state.dom.bounds(), nonPieceAutoShapes = d.autoShapes.filter((autoShape) => !autoShape.piece);
    for (const s of d.shapes.concat(nonPieceAutoShapes).concat(cur ? [cur] : [])) {
      if (s.dest)
        arrowDests.set(s.dest, (arrowDests.get(s.dest) || 0) + 1);
    }
    const shapes = d.shapes.concat(nonPieceAutoShapes).map((s) => {
      return {
        shape: s,
        current: false,
        hash: shapeHash(s, arrowDests, false, bounds)
      };
    });
    if (cur)
      shapes.push({
        shape: cur,
        current: true,
        hash: shapeHash(cur, arrowDests, true, bounds)
      });
    const fullHash = shapes.map((sc) => sc.hash).join(";");
    if (fullHash === state.drawable.prevSvgHash)
      return;
    state.drawable.prevSvgHash = fullHash;
    const defsEl = svg.querySelector("defs");
    const shapesEl = svg.querySelector("g");
    const customSvgsEl = customSvg.querySelector("g");
    syncDefs(d, shapes, defsEl);
    syncShapes(shapes.filter((s) => !s.shape.customSvg), shapesEl, (shape) => renderShape(state, shape, d.brushes, arrowDests, bounds));
    syncShapes(shapes.filter((s) => s.shape.customSvg), customSvgsEl, (shape) => renderShape(state, shape, d.brushes, arrowDests, bounds));
  }
  function syncDefs(d, shapes, defsEl) {
    const brushes2 = /* @__PURE__ */ new Map();
    let brush;
    for (const s of shapes) {
      if (s.shape.dest) {
        brush = d.brushes[s.shape.brush];
        if (s.shape.modifiers)
          brush = makeCustomBrush(brush, s.shape.modifiers);
        brushes2.set(brush.key, brush);
      }
    }
    const keysInDom = /* @__PURE__ */ new Set();
    let el = defsEl.firstChild;
    while (el) {
      keysInDom.add(el.getAttribute("cgKey"));
      el = el.nextSibling;
    }
    for (const [key, brush2] of brushes2.entries()) {
      if (!keysInDom.has(key))
        defsEl.appendChild(renderMarker(brush2));
    }
  }
  function shapeHash({ orig, dest, brush, piece, modifiers, customSvg }, arrowDests, current, bounds) {
    return [
      bounds.width,
      bounds.height,
      current,
      orig,
      dest,
      brush,
      dest && (arrowDests.get(dest) || 0) > 1,
      piece && pieceHash(piece),
      modifiers && modifiersHash(modifiers),
      customSvg && customSvgHash(customSvg)
    ].filter((x) => x).join(",");
  }
  function pieceHash(piece) {
    return [piece.color, piece.role, piece.promoted, piece.scale].filter((x) => x).join(",");
  }
  function modifiersHash(m) {
    return "" + (m.lineWidth || "");
  }
  function customSvgHash(s) {
    let h2 = 0;
    for (let i = 0; i < s.length; i++) {
      h2 = (h2 << 5) - h2 + s.charCodeAt(i) >>> 0;
    }
    return "custom-" + h2.toString();
  }
  function renderShape(state, { shape, current, hash: hash2 }, brushes2, arrowDests, bounds) {
    let el;
    const orig = orient(key2pos(shape.orig), state.orientation, state.dimensions);
    if (shape.customSvg) {
      el = renderCustomSvg(shape.customSvg, orig, bounds, state.dimensions);
    } else {
      if (shape.dest) {
        let brush = brushes2[shape.brush];
        if (shape.modifiers)
          brush = makeCustomBrush(brush, shape.modifiers);
        el = renderArrow(brush, orig, orient(key2pos(shape.dest), state.orientation, state.dimensions), current, (arrowDests.get(shape.dest) || 0) > 1, bounds, state.dimensions);
      } else
        el = renderCircle(brushes2[shape.brush], orig, current, bounds, state.dimensions);
    }
    el.setAttribute("cgHash", hash2);
    return el;
  }
  function renderCustomSvg(customSvg, pos, bounds, bd) {
    const [x, y] = pos2user(pos, bounds, bd);
    const g = setAttributes(createElement2("g"), { transform: `translate(${x},${y})` });
    const svg = setAttributes(createElement2("svg"), { width: 1, height: 1, viewBox: "0 0 100 100" });
    g.appendChild(svg);
    svg.innerHTML = customSvg;
    return g;
  }
  function renderCircle(brush, pos, current, bounds, bd) {
    const o = pos2user(pos, bounds, bd), widths = circleWidth(), radius = (bounds.width + bounds.height) / (4 * Math.max(bounds.width, bounds.height));
    return setAttributes(createElement2("circle"), {
      stroke: brush.color,
      "stroke-width": widths[current ? 0 : 1],
      fill: "none",
      opacity: opacity(brush, current),
      cx: o[0],
      cy: o[1],
      r: radius - widths[1] / 2
    });
  }
  function renderArrow(brush, orig, dest, current, shorten, bounds, bd) {
    const m = arrowMargin(shorten && !current), a = pos2user(orig, bounds, bd), b = pos2user(dest, bounds, bd), dx = b[0] - a[0], dy = b[1] - a[1], angle = Math.atan2(dy, dx), xo = Math.cos(angle) * m, yo = Math.sin(angle) * m;
    return setAttributes(createElement2("line"), {
      stroke: brush.color,
      "stroke-width": lineWidth(brush, current),
      "stroke-linecap": "round",
      "marker-end": "url(#arrowhead-" + brush.key + ")",
      opacity: opacity(brush, current),
      x1: a[0],
      y1: a[1],
      x2: b[0] - xo,
      y2: b[1] - yo
    });
  }
  function renderMarker(brush) {
    const marker = setAttributes(createElement2("marker"), {
      id: "arrowhead-" + brush.key,
      orient: "auto",
      markerWidth: 4,
      markerHeight: 8,
      refX: 2.05,
      refY: 2.01
    });
    marker.appendChild(setAttributes(createElement2("path"), {
      d: "M0,0 V4 L3,2 Z",
      fill: brush.color
    }));
    marker.setAttribute("cgKey", brush.key);
    return marker;
  }
  function setAttributes(el, attrs) {
    for (const key in attrs) {
      if (Object.prototype.hasOwnProperty.call(attrs, key))
        el.setAttribute(key, attrs[key]);
    }
    return el;
  }
  function orient(pos, color, bd) {
    return color === "white" ? pos : [bd.width - 1 - pos[0], bd.height - 1 - pos[1]];
  }
  function makeCustomBrush(base, modifiers) {
    return {
      color: base.color,
      opacity: Math.round(base.opacity * 10) / 10,
      lineWidth: Math.round(modifiers.lineWidth || base.lineWidth),
      key: [base.key, modifiers.lineWidth].filter((x) => x).join("")
    };
  }
  function circleWidth() {
    return [3 / 64, 4 / 64];
  }
  function lineWidth(brush, current) {
    return (brush.lineWidth || 10) * (current ? 0.85 : 1) / 64;
  }
  function opacity(brush, current) {
    return (brush.opacity || 1) * (current ? 0.9 : 1);
  }
  function arrowMargin(shorten) {
    return (shorten ? 20 : 10) / 64;
  }
  function pos2user(pos, bounds, bd) {
    const xScale = Math.min(1, bounds.width / bounds.height) * Math.max(1, bd.height / bd.width);
    const yScale = Math.min(1, bounds.height / bounds.width) * Math.max(1, bd.width / bd.height);
    return [(pos[0] - (bd.width - 1) / 2) * xScale, ((bd.height - 1) / 2 - pos[1]) * yScale];
  }

  // node_modules/chessgroundx/wrap.js
  var LETTER_ENGLISH = letters;
  var LETTER_THAI = ["\u0E01", "\u0E02", "\u0E04", "\u0E07", "\u0E08", "\u0E09", "\u0E0A", "\u0E0D", "\u0E15", "\u0E16", "\u0E17", "\u0E19", "\u0E1B", "\u0E1C", "\u0E1E", "\u0E21"];
  var NUMBER_ARABIC = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"];
  var NUMBER_JANGGI = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "1", "2", "3", "4", "5", "6"];
  var NUMBER_HANZI = [
    "\u4E00",
    "\u4E8C",
    "\u4E09",
    "\u56DB",
    "\u4E94",
    "\u516D",
    "\u4E03",
    "\u516B",
    "\u4E5D",
    "\u5341",
    "\u5341\u4E00",
    "\u5341\u4E8C",
    "\u5341\u4E09",
    "\u5341\u56DB",
    "\u5341\u4E94",
    "\u5341\u516D"
  ];
  var NUMBER_THAI = ["\u0E51", "\u0E52", "\u0E53", "\u0E54", "\u0E55", "\u0E56", "\u0E57", "\u0E58", "\u0E59", "\u0E51\u0E50", "\u0E51\u0E51", "\u0E51\u0E52", "\u0E51\u0E53", "\u0E51\u0E54", "\u0E51\u0E55", "\u0E51\u0E56"];
  var coordFormat = {
    [Notation.ALGEBRAIC]: [
      {
        coords: LETTER_ENGLISH,
        position: "bottom",
        direction: "forward"
      },
      {
        coords: NUMBER_ARABIC,
        position: "side",
        direction: "forward"
      }
    ],
    [Notation.SHOGI_ENGLET]: [
      {
        coords: NUMBER_ARABIC,
        position: "top",
        direction: "backward"
      },
      {
        coords: LETTER_ENGLISH,
        position: "side",
        direction: "backward"
      }
    ],
    [Notation.SHOGI_ARBNUM]: [
      {
        coords: NUMBER_ARABIC,
        position: "top",
        direction: "backward"
      },
      {
        coords: NUMBER_ARABIC,
        position: "side",
        direction: "backward"
      }
    ],
    [Notation.SHOGI_HANNUM]: [
      {
        coords: NUMBER_ARABIC,
        position: "top",
        direction: "backward"
      },
      {
        coords: NUMBER_HANZI,
        position: "side",
        direction: "backward"
      }
    ],
    [Notation.JANGGI]: [
      {
        coords: NUMBER_ARABIC,
        position: "bottom",
        direction: "forward"
      },
      {
        coords: NUMBER_JANGGI,
        position: "side",
        direction: "backward"
      }
    ],
    [Notation.XIANGQI_ARBNUM]: [
      {
        coords: NUMBER_ARABIC,
        position: "top",
        direction: "forward",
        noBlackReverse: true
      },
      {
        coords: NUMBER_ARABIC,
        position: "bottom",
        direction: "backward",
        noBlackReverse: true
      }
    ],
    [Notation.XIANGQI_HANNUM]: [
      {
        coords: NUMBER_ARABIC,
        position: "top",
        direction: "forward",
        noBlackReverse: true
      },
      {
        coords: NUMBER_HANZI,
        position: "bottom",
        direction: "backward",
        noBlackReverse: true
      }
    ],
    [Notation.THAI_ALGEBRAIC]: [
      {
        coords: LETTER_THAI,
        position: "bottom",
        direction: "forward"
      },
      {
        coords: NUMBER_THAI,
        position: "side",
        direction: "forward"
      }
    ]
  };
  function renderWrap(element, s) {
    element.innerHTML = "";
    element.classList.add("cg-wrap");
    for (const c of colors)
      element.classList.toggle("orientation-" + c, s.orientation === c);
    element.classList.toggle("manipulable", !s.viewOnly);
    const container = createEl("cg-container");
    element.appendChild(container);
    const extension = createEl("extension");
    container.appendChild(extension);
    const board = createEl("cg-board");
    container.appendChild(board);
    let pocketBottom, pocketTop;
    if (isMiniBoard(element)) {
      if (s.boardState.pockets) {
        pocketBottom = createEl("pocketBottom");
        pocketTop = createEl("pocketTop");
        container.insertBefore(s.orientation === "white" ? pocketTop : pocketBottom, board);
        container.insertBefore(s.orientation === "white" ? pocketBottom : pocketTop, board.nextSibling);
      }
    }
    let svg;
    let customSvg;
    let autoPieces;
    if (s.drawable.visible) {
      const width = s.dimensions.width;
      const height = s.dimensions.height;
      svg = setAttributes(createElement2("svg"), {
        class: "cg-shapes",
        viewBox: `${-width / 2} ${-height / 2} ${width} ${height}`,
        preserveAspectRatio: "xMidYMid slice"
      });
      svg.appendChild(createElement2("defs"));
      svg.appendChild(createElement2("g"));
      customSvg = setAttributes(createElement2("svg"), {
        class: "cg-custom-svgs",
        viewBox: `${-(width - 1) / 2} ${-(height - 1) / 2} ${width} ${height}`,
        preserveAspectRatio: "xMidYMid slice"
      });
      customSvg.appendChild(createElement2("g"));
      autoPieces = createEl("cg-auto-pieces");
      container.appendChild(svg);
      container.appendChild(customSvg);
      container.appendChild(autoPieces);
    }
    if (s.coordinates) {
      coordFormat[s.notation].forEach((f) => {
        const max = f.position === "side" ? s.dimensions.height : s.dimensions.width;
        const pos = f.position;
        const coords = f.coords.slice(0, max);
        container.appendChild(renderCoords(coords, `${pos} ${f.direction}${f.noBlackReverse ? "" : " " + s.orientation}`));
      });
    }
    let ghost;
    if (s.draggable.enabled && s.draggable.showGhost) {
      ghost = createEl("piece", "ghost");
      setVisible(ghost, false);
      container.appendChild(ghost);
    }
    return {
      pocketTop,
      pocketBottom,
      board,
      container,
      wrap: element,
      ghost,
      svg,
      customSvg,
      autoPieces
    };
  }
  function renderCoords(elems, className) {
    const el = createEl("coords", className);
    let f;
    for (const elem of elems) {
      f = createEl("coord");
      f.textContent = elem;
      el.appendChild(f);
    }
    return el;
  }

  // node_modules/chessgroundx/pocket.js
  function renderPocketsInitial(state, elements, pocketTop, pocketBottom) {
    if (pocketTop) {
      pocketTop.innerHTML = "";
      elements.pocketTop = pocketTop;
      pocketView(state, elements.pocketTop, "top");
    }
    if (pocketBottom) {
      pocketBottom.innerHTML = "";
      elements.pocketBottom = pocketBottom;
      pocketView(state, elements.pocketBottom, "bottom");
    }
  }
  function pocketView(state, pocketEl, position) {
    if (!state.pocketRoles)
      return;
    const color = position === "top" ? opposite(state.orientation) : state.orientation;
    const roles = state.pocketRoles[color];
    const pl = String(roles.length);
    const files3 = String(state.dimensions.width);
    const ranks3 = String(state.dimensions.height);
    pocketEl.setAttribute("style", `--pocketLength: ${pl}; --files: ${files3}; --ranks: ${ranks3}`);
    pocketEl.classList.add("pocket", position);
    roles.forEach((role) => {
      const pieceName = pieceClasses({ role, color }, state.orientation);
      const sq = createEl("square");
      const p = createEl("piece", pieceName);
      sq.appendChild(p);
      p.setAttribute("data-color", color);
      p.setAttribute("data-role", role);
      renderPiece(state, sq);
      pocketEl.appendChild(sq);
    });
  }
  function renderPockets(state) {
    renderPocket(state, state.dom.elements.pocketBottom);
    renderPocket(state, state.dom.elements.pocketTop);
  }
  function renderPocket(state, pocketEl) {
    if (pocketEl) {
      let sq = pocketEl.firstChild;
      if (sq && sq.firstChild) {
        const color = sq.firstChild.getAttribute("data-color");
        pocketEl.classList.toggle("usable", !state.viewOnly && (state.movable.free || state.movable.color === "both" || !!color && state.movable.color === color));
        while (sq) {
          renderPiece(state, sq);
          sq = sq.nextSibling;
        }
      }
    }
  }
  function renderPiece(state, sq) {
    var _a2, _b, _c;
    const p = sq.firstChild;
    const role = p.getAttribute("data-role");
    const color = p.getAttribute("data-color");
    p.setAttribute("data-nb", "" + ((_a2 = state.boardState.pockets[color].get(role)) !== null && _a2 !== void 0 ? _a2 : 0));
    const piece = { role, color };
    const selected = state.selectable.selected;
    sq.classList.toggle("selected-square", !!selected && isPiece(selected) && state.selectable.fromPocket && samePiece(selected, piece));
    const premoveOrig = (_b = state.premovable.current) === null || _b === void 0 ? void 0 : _b[0];
    sq.classList.toggle("premove", !!premoveOrig && isDropOrig(premoveOrig) && roleOf(premoveOrig) === role && state.turnColor !== color);
    sq.classList.toggle("last-move", state.highlight.lastMove && !!((_c = state.lastMove) === null || _c === void 0 ? void 0 : _c.includes(dropOrigOf(role))) && state.turnColor !== color);
  }
  function drag(s, e) {
    if (!e.isTrusted || e.button !== void 0 && e.button !== 0)
      return;
    if (e.touches && e.touches.length > 1)
      return;
    const el = e.target, role = el.getAttribute("data-role"), color = el.getAttribute("data-color"), n = Number(el.getAttribute("data-nb"));
    if (n === 0)
      return;
    const piece = { role, color };
    const previouslySelected = s.selectable.selected;
    if (!previouslySelected && s.drawable.enabled && (s.drawable.eraseOnClick || piece.color !== s.turnColor))
      clear(s);
    if (e.cancelable !== false)
      e.preventDefault();
    const hadPremove = !!s.premovable.current;
    s.stats.ctrlKey = e.ctrlKey;
    select(s, piece);
    const selected = s.selectable.selected;
    const stillSelected = selected && isSame(selected, piece);
    if (stillSelected && isDraggable(s, piece, true)) {
      dragNewPiece(s, piece, true, e, previouslySelected);
    } else {
      if (hadPremove)
        unsetPremove(s);
    }
    s.dom.redraw();
  }

  // node_modules/chessgroundx/events.js
  function bindBoard(s, onResize) {
    const boardEl = s.dom.elements.board;
    if ("ResizeObserver" in window)
      new ResizeObserver(onResize).observe(s.dom.elements.wrap);
    if (s.viewOnly)
      return;
    const onStart = startDragOrDraw(s);
    boardEl.addEventListener("touchstart", onStart, {
      passive: false
    });
    boardEl.addEventListener("mousedown", onStart, {
      passive: false
    });
    if (s.disableContextMenu || s.drawable.enabled) {
      boardEl.addEventListener("contextmenu", (e) => e.preventDefault());
    }
  }
  function bindDocument(s, onResize) {
    const unbinds = [];
    if (!("ResizeObserver" in window))
      unbinds.push(unbindable(document.body, "chessground.resize", onResize));
    if (!s.viewOnly) {
      const onmove = dragOrDraw(s, move2, move);
      const onend = dragOrDraw(s, end2, end);
      for (const ev of ["touchmove", "mousemove"])
        unbinds.push(unbindable(document, ev, onmove));
      for (const ev of ["touchend", "mouseup"])
        unbinds.push(unbindable(document, ev, onend));
      const onScroll = () => s.dom.bounds.clear();
      unbinds.push(unbindable(document, "scroll", onScroll, { capture: true, passive: true }));
      unbinds.push(unbindable(window, "resize", onScroll, { passive: true }));
      const pocketTop = s.dom.elements.pocketTop;
      const pocketBottom = s.dom.elements.pocketBottom;
      const pocketStart = startDragOrDrawPocket(s);
      [pocketTop, pocketBottom].forEach((el) => {
        if (el) {
          for (const ev of ["touchstart", "mousedown"])
            unbinds.push(unbindable(el, ev, pocketStart));
          if (s.disableContextMenu || s.drawable.enabled)
            unbinds.push(unbindable(el, "contextmenu", (e) => e.preventDefault()));
        }
      });
    }
    return () => unbinds.forEach((f) => f());
  }
  function unbindable(el, eventName, callback, options) {
    el.addEventListener(eventName, callback, options);
    return () => el.removeEventListener(eventName, callback, options);
  }
  var startDragOrDraw = (s) => (e) => {
    if (s.draggable.current)
      cancel2(s);
    else if (s.drawable.current)
      cancel(s);
    else if (e.shiftKey || isRightButton(e)) {
      if (s.drawable.enabled)
        start(s, e);
    } else if (!s.viewOnly) {
      start2(s, e);
    }
  };
  var startDragOrDrawPocket = (s) => (e) => {
    if (s.draggable.current)
      cancel2(s);
    else if (s.drawable.current)
      cancel(s);
    else if (e.shiftKey || isRightButton(e)) {
      if (s.drawable.enabled)
        start(s, e);
    } else if (!s.viewOnly) {
      drag(s, e);
    }
  };
  var dragOrDraw = (s, withDrag, withDraw) => (e) => {
    if (s.drawable.current) {
      if (s.drawable.enabled)
        withDraw(s, e);
    } else if (!s.viewOnly)
      withDrag(s, e);
  };

  // node_modules/chessgroundx/render.js
  function render2(s) {
    const asWhite = whitePov(s), posToTranslate2 = posToTranslate(s.dom.bounds(), s.dimensions), boardEl = s.dom.elements.board, pieces = s.boardState.pieces, curAnim = s.animation.current, anims = curAnim ? curAnim.plan.anims : /* @__PURE__ */ new Map(), fadings = curAnim ? curAnim.plan.fadings : /* @__PURE__ */ new Map(), curDrag = s.draggable.current, squares = computeSquareClasses(s), samePieces = /* @__PURE__ */ new Set(), sameSquares = /* @__PURE__ */ new Set(), movedPieces = /* @__PURE__ */ new Map(), movedSquares = /* @__PURE__ */ new Map();
    let k, el, pieceAtKey, elPieceName, anim2, fading, pMvdset, pMvd, sMvdset, sMvd;
    el = boardEl.firstChild;
    while (el) {
      k = el.cgKey;
      if (isPieceNode(el)) {
        pieceAtKey = pieces.get(k);
        anim2 = anims.get(k);
        fading = fadings.get(k);
        elPieceName = el.cgPiece;
        if (el.cgDragging && (!curDrag || curDrag.orig !== k)) {
          el.classList.remove("dragging");
          translate(el, posToTranslate2(key2pos(k), asWhite));
          el.cgDragging = false;
        }
        if (!fading && el.cgFading) {
          el.cgFading = false;
          el.classList.remove("fading");
        }
        if (pieceAtKey) {
          if (anim2 && el.cgAnimating && elPieceName === pieceClasses(pieceAtKey, s.orientation)) {
            const pos = key2pos(k);
            pos[0] += anim2[2];
            pos[1] += anim2[3];
            el.classList.add("anim");
            translate(el, posToTranslate2(pos, asWhite));
          } else if (el.cgAnimating) {
            el.cgAnimating = false;
            el.classList.remove("anim");
            translate(el, posToTranslate2(key2pos(k), asWhite));
            if (s.addPieceZIndex)
              el.style.zIndex = posZIndex(key2pos(k), asWhite);
          }
          if (elPieceName === pieceClasses(pieceAtKey, s.orientation) && (!fading || !el.cgFading)) {
            samePieces.add(k);
          } else {
            if (fading && elPieceName === pieceClasses(fading, s.orientation)) {
              el.classList.add("fading");
              el.cgFading = true;
            } else {
              appendValue(movedPieces, elPieceName, el);
            }
          }
        } else {
          appendValue(movedPieces, elPieceName, el);
        }
      } else if (isSquareNode(el)) {
        const cn = el.className;
        if (squares.get(k) === cn)
          sameSquares.add(k);
        else
          appendValue(movedSquares, cn, el);
      }
      el = el.nextSibling;
    }
    for (const [sk, className] of squares) {
      if (!sameSquares.has(sk)) {
        sMvdset = movedSquares.get(className);
        sMvd = sMvdset && sMvdset.pop();
        const translation = posToTranslate2(key2pos(sk), asWhite);
        if (sMvd) {
          sMvd.cgKey = sk;
          translate(sMvd, translation);
        } else {
          const squareNode = createEl("square", className);
          squareNode.cgKey = sk;
          translate(squareNode, translation);
          boardEl.insertBefore(squareNode, boardEl.firstChild);
        }
      }
    }
    for (const [k2, p] of pieces) {
      anim2 = anims.get(k2);
      if (!samePieces.has(k2)) {
        pMvdset = movedPieces.get(pieceClasses(p, s.orientation));
        pMvd = pMvdset && pMvdset.pop();
        if (pMvd) {
          pMvd.cgKey = k2;
          if (pMvd.cgFading) {
            pMvd.classList.remove("fading");
            pMvd.cgFading = false;
          }
          const pos = key2pos(k2);
          if (s.addPieceZIndex)
            pMvd.style.zIndex = posZIndex(pos, asWhite);
          if (anim2) {
            pMvd.cgAnimating = true;
            pMvd.classList.add("anim");
            pos[0] += anim2[2];
            pos[1] += anim2[3];
          }
          translate(pMvd, posToTranslate2(pos, asWhite));
        } else {
          const pieceName = pieceClasses(p, s.orientation), pieceNode = createEl("piece", pieceName), pos = key2pos(k2);
          pieceNode.cgPiece = pieceName;
          pieceNode.cgKey = k2;
          if (anim2) {
            pieceNode.cgAnimating = true;
            pos[0] += anim2[2];
            pos[1] += anim2[3];
          }
          translate(pieceNode, posToTranslate2(pos, asWhite));
          if (s.addPieceZIndex)
            pieceNode.style.zIndex = posZIndex(pos, asWhite);
          boardEl.appendChild(pieceNode);
        }
      }
    }
    for (const nodes of movedPieces.values())
      removeNodes(s, nodes);
    for (const nodes of movedSquares.values())
      removeNodes(s, nodes);
  }
  function renderResized(s) {
    const asWhite = whitePov(s), posToTranslate2 = posToTranslate(s.dom.bounds(), s.dimensions);
    let el = s.dom.elements.board.firstChild;
    while (el) {
      if (isPieceNode(el) && !el.cgAnimating || isSquareNode(el)) {
        translate(el, posToTranslate2(key2pos(el.cgKey), asWhite));
      }
      el = el.nextSibling;
    }
  }
  function updateBounds(s) {
    var _a2, _b, _c, _d, _e, _f;
    const bounds = s.dom.elements.wrap.getBoundingClientRect();
    const container = s.dom.elements.container;
    const ratio = bounds.height / bounds.width;
    const width = Math.floor(bounds.width * window.devicePixelRatio / s.dimensions.width) * s.dimensions.width / window.devicePixelRatio;
    const height = width * ratio;
    container.style.width = width + "px";
    container.style.height = height + "px";
    s.dom.bounds.clear();
    (_a2 = s.addDimensionsCssVarsTo) === null || _a2 === void 0 ? void 0 : _a2.style.setProperty("--cg-width", width + "px");
    (_b = s.addDimensionsCssVarsTo) === null || _b === void 0 ? void 0 : _b.style.setProperty("--cg-height", height + "px");
    (_c = s.dom.elements.pocketTop) === null || _c === void 0 ? void 0 : _c.style.setProperty("--cg-width", width + "px");
    (_d = s.dom.elements.pocketTop) === null || _d === void 0 ? void 0 : _d.style.setProperty("--cg-height", height + "px");
    (_e = s.dom.elements.pocketBottom) === null || _e === void 0 ? void 0 : _e.style.setProperty("--cg-width", width + "px");
    (_f = s.dom.elements.pocketBottom) === null || _f === void 0 ? void 0 : _f.style.setProperty("--cg-height", height + "px");
  }
  var isPieceNode = (el) => el.tagName === "PIECE";
  var isSquareNode = (el) => el.tagName === "SQUARE";
  function removeNodes(s, nodes) {
    for (const node of nodes)
      s.dom.elements.board.removeChild(node);
  }
  function posZIndex(pos, asWhite) {
    const minZ = 3;
    const rank = pos[1];
    const z = asWhite ? minZ + 7 - rank : minZ + rank;
    return `${z}`;
  }
  function computeSquareClasses(s) {
    var _a2;
    const squares = /* @__PURE__ */ new Map();
    if (s.lastMove && s.highlight.lastMove)
      for (const k of s.lastMove) {
        if (isKey(k) && k !== "a0")
          addSquare(squares, k, "last-move");
      }
    if (s.check && s.highlight.check)
      addSquare(squares, s.check, "check");
    const selected = s.selectable.selected;
    if (selected) {
      if (isKey(selected))
        addSquare(squares, selected, "selected");
      if (s.movable.showDests) {
        const dests = (_a2 = s.movable.dests) === null || _a2 === void 0 ? void 0 : _a2.get(isKey(selected) ? selected : dropOrigOf(selected.role));
        if (dests)
          for (const k of dests) {
            addSquare(squares, k, "move-dest" + (s.boardState.pieces.has(k) ? " oc" : ""));
          }
        const pDests = s.premovable.dests;
        if (pDests)
          for (const k of pDests) {
            addSquare(squares, k, "premove-dest" + (s.boardState.pieces.has(k) ? " oc" : ""));
          }
      }
    }
    const premove2 = s.premovable.current;
    if (premove2) {
      for (const k of premove2)
        if (isKey(k))
          addSquare(squares, k, "current-premove");
    }
    const o = s.exploding;
    if (o)
      for (const k of o.keys)
        addSquare(squares, k, "exploding" + o.stage);
    return squares;
  }
  function addSquare(squares, key, klass) {
    const classes = squares.get(key);
    if (classes)
      squares.set(key, `${classes} ${klass}`);
    else
      squares.set(key, klass);
  }
  function appendValue(map, key, value) {
    const arr = map.get(key);
    if (arr)
      arr.push(value);
    else
      map.set(key, [value]);
  }

  // node_modules/chessgroundx/autoPieces.js
  function render3(state, autoPieceEl) {
    const autoPieces = state.drawable.autoShapes.filter((autoShape) => autoShape.piece);
    const autoPieceShapes = autoPieces.map((s) => {
      return {
        shape: s,
        hash: hash(s),
        current: false
      };
    });
    syncShapes(autoPieceShapes, autoPieceEl, (shape) => renderShape2(state, shape, state.dom.bounds()));
  }
  function renderResized2(state) {
    var _a2;
    const asWhite = whitePov(state), posToTranslate2 = posToTranslate(state.dom.bounds(), state.dimensions);
    let el = (_a2 = state.dom.elements.autoPieces) === null || _a2 === void 0 ? void 0 : _a2.firstChild;
    while (el) {
      translateAndScale(el, posToTranslate2(key2pos(el.cgKey), asWhite), el.cgScale);
      el = el.nextSibling;
    }
  }
  function renderShape2(state, { shape, hash: hash2 }, bounds) {
    if (shape.piece) {
      const orig = shape.orig;
      const scale = shape.piece.scale;
      const pieceEl = createEl("piece", pieceClasses(shape.piece, state.orientation));
      pieceEl.setAttribute("cgHash", hash2);
      pieceEl.cgKey = orig;
      pieceEl.cgScale = scale;
      translateAndScale(pieceEl, posToTranslate(bounds, state.dimensions)(key2pos(orig), whitePov(state)), scale);
      return pieceEl;
    } else {
      return createEl("piece", "");
    }
  }
  var hash = (autoPiece) => {
    var _a2, _b, _c;
    return [autoPiece.orig, (_a2 = autoPiece.piece) === null || _a2 === void 0 ? void 0 : _a2.role, (_b = autoPiece.piece) === null || _b === void 0 ? void 0 : _b.color, (_c = autoPiece.piece) === null || _c === void 0 ? void 0 : _c.scale].join(",");
  };

  // node_modules/chessgroundx/chessground.js
  function Chessground(element, config, pocketTop, pocketBottom) {
    const maybeState = defaults();
    configure(maybeState, config || {});
    function redrawAll() {
      const prevUnbind = "dom" in maybeState ? maybeState.dom.unbind : void 0;
      const elements = renderWrap(element, maybeState), bounds = memo(() => elements.board.getBoundingClientRect()), redrawNow = (skipSvg) => {
        render2(state);
        renderPockets(state);
        if (elements.autoPieces)
          render3(state, elements.autoPieces);
        if (!skipSvg && elements.svg)
          renderSvg(state, elements.svg, elements.customSvg);
      }, onResize = () => {
        updateBounds(state);
        renderResized(state);
        if (elements.autoPieces)
          renderResized2(state);
      };
      if (elements.pocketTop)
        pocketTop = elements.pocketTop;
      if (elements.pocketBottom)
        pocketBottom = elements.pocketBottom;
      renderPocketsInitial(maybeState, elements, pocketTop, pocketBottom);
      const state = maybeState;
      state.dom = {
        elements,
        bounds,
        redraw: debounceRedraw(redrawNow),
        redrawNow,
        unbind: prevUnbind
      };
      state.drawable.prevSvgHash = "";
      updateBounds(state);
      redrawNow(false);
      bindBoard(state, onResize);
      if (!prevUnbind)
        state.dom.unbind = bindDocument(state, onResize);
      state.events.insert && state.events.insert(elements);
      return state;
    }
    return start3(redrawAll(), redrawAll);
  }
  function debounceRedraw(redrawNow) {
    let redrawing = false;
    return () => {
      if (redrawing)
        return;
      redrawing = true;
      requestAnimationFrame(() => {
        redrawNow();
        redrawing = false;
      });
    };
  }

  // node_modules/ffish-es6/ffish.js
  var Module = function() {
    var _scriptDir = typeof document !== "undefined" && document.currentScript ? document.currentScript.src : void 0;
    return function(Module2) {
      Module2 = Module2 || {};
      var Module2 = typeof Module2 !== "undefined" ? Module2 : {};
      var readyPromiseResolve, readyPromiseReject;
      Module2["ready"] = new Promise(function(resolve, reject) {
        readyPromiseResolve = resolve;
        readyPromiseReject = reject;
      });
      var moduleOverrides = {};
      var key;
      for (key in Module2) {
        if (Module2.hasOwnProperty(key)) {
          moduleOverrides[key] = Module2[key];
        }
      }
      var arguments_ = [];
      var thisProgram = "./this.program";
      var quit_ = function(status, toThrow) {
        throw toThrow;
      };
      var ENVIRONMENT_IS_WEB = typeof window === "object";
      var ENVIRONMENT_IS_WORKER = typeof importScripts === "function";
      var ENVIRONMENT_IS_NODE = typeof process === "object" && typeof process.versions === "object" && typeof process.versions.node === "string";
      var scriptDirectory = "";
      function locateFile(path) {
        if (Module2["locateFile"]) {
          return Module2["locateFile"](path, scriptDirectory);
        }
        return scriptDirectory + path;
      }
      var read_, readAsync, readBinary, setWindowTitle;
      if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
        if (ENVIRONMENT_IS_WORKER) {
          scriptDirectory = self.location.href;
        } else if (typeof document !== "undefined" && document.currentScript) {
          scriptDirectory = document.currentScript.src;
        }
        if (_scriptDir) {
          scriptDirectory = _scriptDir;
        }
        if (scriptDirectory.indexOf("blob:") !== 0) {
          scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1);
        } else {
          scriptDirectory = "";
        }
        {
          read_ = function(url) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, false);
            xhr.send(null);
            return xhr.responseText;
          };
          if (ENVIRONMENT_IS_WORKER) {
            readBinary = function(url) {
              var xhr = new XMLHttpRequest();
              xhr.open("GET", url, false);
              xhr.responseType = "arraybuffer";
              xhr.send(null);
              return new Uint8Array(xhr.response);
            };
          }
          readAsync = function(url, onload, onerror) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.responseType = "arraybuffer";
            xhr.onload = function() {
              if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
                onload(xhr.response);
                return;
              }
              onerror();
            };
            xhr.onerror = onerror;
            xhr.send(null);
          };
        }
        setWindowTitle = function(title) {
          document.title = title;
        };
      } else {
      }
      var out = Module2["print"] || console.log.bind(console);
      var err = Module2["printErr"] || console.warn.bind(console);
      for (key in moduleOverrides) {
        if (moduleOverrides.hasOwnProperty(key)) {
          Module2[key] = moduleOverrides[key];
        }
      }
      moduleOverrides = null;
      if (Module2["arguments"])
        arguments_ = Module2["arguments"];
      if (Module2["thisProgram"])
        thisProgram = Module2["thisProgram"];
      if (Module2["quit"])
        quit_ = Module2["quit"];
      var tempRet0 = 0;
      var setTempRet0 = function(value) {
        tempRet0 = value;
      };
      var wasmBinary;
      if (Module2["wasmBinary"])
        wasmBinary = Module2["wasmBinary"];
      var noExitRuntime = Module2["noExitRuntime"] || true;
      if (typeof WebAssembly !== "object") {
        abort("no native wasm support detected");
      }
      var wasmMemory;
      var ABORT = false;
      var EXITSTATUS;
      function assert(condition, text) {
        if (!condition) {
          abort("Assertion failed: " + text);
        }
      }
      var UTF8Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf8") : void 0;
      function UTF8ArrayToString(heap, idx, maxBytesToRead) {
        var endIdx = idx + maxBytesToRead;
        var endPtr = idx;
        while (heap[endPtr] && !(endPtr >= endIdx))
          ++endPtr;
        if (endPtr - idx > 16 && heap.subarray && UTF8Decoder) {
          return UTF8Decoder.decode(heap.subarray(idx, endPtr));
        } else {
          var str = "";
          while (idx < endPtr) {
            var u0 = heap[idx++];
            if (!(u0 & 128)) {
              str += String.fromCharCode(u0);
              continue;
            }
            var u1 = heap[idx++] & 63;
            if ((u0 & 224) == 192) {
              str += String.fromCharCode((u0 & 31) << 6 | u1);
              continue;
            }
            var u2 = heap[idx++] & 63;
            if ((u0 & 240) == 224) {
              u0 = (u0 & 15) << 12 | u1 << 6 | u2;
            } else {
              u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heap[idx++] & 63;
            }
            if (u0 < 65536) {
              str += String.fromCharCode(u0);
            } else {
              var ch = u0 - 65536;
              str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
            }
          }
        }
        return str;
      }
      function UTF8ToString(ptr, maxBytesToRead) {
        return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
      }
      function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
        if (!(maxBytesToWrite > 0))
          return 0;
        var startIdx = outIdx;
        var endIdx = outIdx + maxBytesToWrite - 1;
        for (var i = 0; i < str.length; ++i) {
          var u = str.charCodeAt(i);
          if (u >= 55296 && u <= 57343) {
            var u1 = str.charCodeAt(++i);
            u = 65536 + ((u & 1023) << 10) | u1 & 1023;
          }
          if (u <= 127) {
            if (outIdx >= endIdx)
              break;
            heap[outIdx++] = u;
          } else if (u <= 2047) {
            if (outIdx + 1 >= endIdx)
              break;
            heap[outIdx++] = 192 | u >> 6;
            heap[outIdx++] = 128 | u & 63;
          } else if (u <= 65535) {
            if (outIdx + 2 >= endIdx)
              break;
            heap[outIdx++] = 224 | u >> 12;
            heap[outIdx++] = 128 | u >> 6 & 63;
            heap[outIdx++] = 128 | u & 63;
          } else {
            if (outIdx + 3 >= endIdx)
              break;
            heap[outIdx++] = 240 | u >> 18;
            heap[outIdx++] = 128 | u >> 12 & 63;
            heap[outIdx++] = 128 | u >> 6 & 63;
            heap[outIdx++] = 128 | u & 63;
          }
        }
        heap[outIdx] = 0;
        return outIdx - startIdx;
      }
      function stringToUTF8(str, outPtr, maxBytesToWrite) {
        return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
      }
      function lengthBytesUTF8(str) {
        var len = 0;
        for (var i = 0; i < str.length; ++i) {
          var u = str.charCodeAt(i);
          if (u >= 55296 && u <= 57343)
            u = 65536 + ((u & 1023) << 10) | str.charCodeAt(++i) & 1023;
          if (u <= 127)
            ++len;
          else if (u <= 2047)
            len += 2;
          else if (u <= 65535)
            len += 3;
          else
            len += 4;
        }
        return len;
      }
      var UTF16Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-16le") : void 0;
      function UTF16ToString(ptr, maxBytesToRead) {
        var endPtr = ptr;
        var idx = endPtr >> 1;
        var maxIdx = idx + maxBytesToRead / 2;
        while (!(idx >= maxIdx) && HEAPU16[idx])
          ++idx;
        endPtr = idx << 1;
        if (endPtr - ptr > 32 && UTF16Decoder) {
          return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr));
        } else {
          var str = "";
          for (var i = 0; !(i >= maxBytesToRead / 2); ++i) {
            var codeUnit = HEAP16[ptr + i * 2 >> 1];
            if (codeUnit == 0)
              break;
            str += String.fromCharCode(codeUnit);
          }
          return str;
        }
      }
      function stringToUTF16(str, outPtr, maxBytesToWrite) {
        if (maxBytesToWrite === void 0) {
          maxBytesToWrite = 2147483647;
        }
        if (maxBytesToWrite < 2)
          return 0;
        maxBytesToWrite -= 2;
        var startPtr = outPtr;
        var numCharsToWrite = maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;
        for (var i = 0; i < numCharsToWrite; ++i) {
          var codeUnit = str.charCodeAt(i);
          HEAP16[outPtr >> 1] = codeUnit;
          outPtr += 2;
        }
        HEAP16[outPtr >> 1] = 0;
        return outPtr - startPtr;
      }
      function lengthBytesUTF16(str) {
        return str.length * 2;
      }
      function UTF32ToString(ptr, maxBytesToRead) {
        var i = 0;
        var str = "";
        while (!(i >= maxBytesToRead / 4)) {
          var utf32 = HEAP32[ptr + i * 4 >> 2];
          if (utf32 == 0)
            break;
          ++i;
          if (utf32 >= 65536) {
            var ch = utf32 - 65536;
            str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
          } else {
            str += String.fromCharCode(utf32);
          }
        }
        return str;
      }
      function stringToUTF32(str, outPtr, maxBytesToWrite) {
        if (maxBytesToWrite === void 0) {
          maxBytesToWrite = 2147483647;
        }
        if (maxBytesToWrite < 4)
          return 0;
        var startPtr = outPtr;
        var endPtr = startPtr + maxBytesToWrite - 4;
        for (var i = 0; i < str.length; ++i) {
          var codeUnit = str.charCodeAt(i);
          if (codeUnit >= 55296 && codeUnit <= 57343) {
            var trailSurrogate = str.charCodeAt(++i);
            codeUnit = 65536 + ((codeUnit & 1023) << 10) | trailSurrogate & 1023;
          }
          HEAP32[outPtr >> 2] = codeUnit;
          outPtr += 4;
          if (outPtr + 4 > endPtr)
            break;
        }
        HEAP32[outPtr >> 2] = 0;
        return outPtr - startPtr;
      }
      function lengthBytesUTF32(str) {
        var len = 0;
        for (var i = 0; i < str.length; ++i) {
          var codeUnit = str.charCodeAt(i);
          if (codeUnit >= 55296 && codeUnit <= 57343)
            ++i;
          len += 4;
        }
        return len;
      }
      function writeArrayToMemory(array2, buffer2) {
        HEAP8.set(array2, buffer2);
      }
      function writeAsciiToMemory(str, buffer2, dontAddNull) {
        for (var i = 0; i < str.length; ++i) {
          HEAP8[buffer2++ >> 0] = str.charCodeAt(i);
        }
        if (!dontAddNull)
          HEAP8[buffer2 >> 0] = 0;
      }
      function alignUp(x, multiple) {
        if (x % multiple > 0) {
          x += multiple - x % multiple;
        }
        return x;
      }
      var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
      function updateGlobalBufferAndViews(buf) {
        buffer = buf;
        Module2["HEAP8"] = HEAP8 = new Int8Array(buf);
        Module2["HEAP16"] = HEAP16 = new Int16Array(buf);
        Module2["HEAP32"] = HEAP32 = new Int32Array(buf);
        Module2["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
        Module2["HEAPU16"] = HEAPU16 = new Uint16Array(buf);
        Module2["HEAPU32"] = HEAPU32 = new Uint32Array(buf);
        Module2["HEAPF32"] = HEAPF32 = new Float32Array(buf);
        Module2["HEAPF64"] = HEAPF64 = new Float64Array(buf);
      }
      var INITIAL_MEMORY = Module2["INITIAL_MEMORY"] || 33554432;
      var wasmTable;
      var __ATPRERUN__ = [];
      var __ATINIT__ = [];
      var __ATPOSTRUN__ = [];
      var runtimeInitialized = false;
      var runtimeExited = false;
      var runtimeKeepaliveCounter = 0;
      function keepRuntimeAlive() {
        return noExitRuntime || runtimeKeepaliveCounter > 0;
      }
      function preRun() {
        if (Module2["preRun"]) {
          if (typeof Module2["preRun"] == "function")
            Module2["preRun"] = [Module2["preRun"]];
          while (Module2["preRun"].length) {
            addOnPreRun(Module2["preRun"].shift());
          }
        }
        callRuntimeCallbacks(__ATPRERUN__);
      }
      function initRuntime() {
        runtimeInitialized = true;
        if (!Module2["noFSInit"] && !FS.init.initialized)
          FS.init();
        FS.ignorePermissions = false;
        TTY.init();
        callRuntimeCallbacks(__ATINIT__);
      }
      function exitRuntime() {
        runtimeExited = true;
      }
      function postRun() {
        if (Module2["postRun"]) {
          if (typeof Module2["postRun"] == "function")
            Module2["postRun"] = [Module2["postRun"]];
          while (Module2["postRun"].length) {
            addOnPostRun(Module2["postRun"].shift());
          }
        }
        callRuntimeCallbacks(__ATPOSTRUN__);
      }
      function addOnPreRun(cb) {
        __ATPRERUN__.unshift(cb);
      }
      function addOnInit(cb) {
        __ATINIT__.unshift(cb);
      }
      function addOnPostRun(cb) {
        __ATPOSTRUN__.unshift(cb);
      }
      var runDependencies = 0;
      var runDependencyWatcher = null;
      var dependenciesFulfilled = null;
      function getUniqueRunDependency(id) {
        return id;
      }
      function addRunDependency(id) {
        runDependencies++;
        if (Module2["monitorRunDependencies"]) {
          Module2["monitorRunDependencies"](runDependencies);
        }
      }
      function removeRunDependency(id) {
        runDependencies--;
        if (Module2["monitorRunDependencies"]) {
          Module2["monitorRunDependencies"](runDependencies);
        }
        if (runDependencies == 0) {
          if (runDependencyWatcher !== null) {
            clearInterval(runDependencyWatcher);
            runDependencyWatcher = null;
          }
          if (dependenciesFulfilled) {
            var callback = dependenciesFulfilled;
            dependenciesFulfilled = null;
            callback();
          }
        }
      }
      Module2["preloadedImages"] = {};
      Module2["preloadedAudios"] = {};
      function abort(what) {
        {
          if (Module2["onAbort"]) {
            Module2["onAbort"](what);
          }
        }
        what = "Aborted(" + what + ")";
        err(what);
        ABORT = true;
        EXITSTATUS = 1;
        what += ". Build with -s ASSERTIONS=1 for more info.";
        var e = new WebAssembly.RuntimeError(what);
        readyPromiseReject(e);
        throw e;
      }
      var dataURIPrefix = "data:application/octet-stream;base64,";
      function isDataURI(filename) {
        return filename.startsWith(dataURIPrefix);
      }
      var wasmBinaryFile;
      wasmBinaryFile = "ffish.wasm";
      if (!isDataURI(wasmBinaryFile)) {
        wasmBinaryFile = locateFile(wasmBinaryFile);
      }
      function getBinary(file) {
        try {
          if (file == wasmBinaryFile && wasmBinary) {
            return new Uint8Array(wasmBinary);
          }
          if (readBinary) {
            return readBinary(file);
          } else {
            throw "both async and sync fetching of the wasm failed";
          }
        } catch (err2) {
          abort(err2);
        }
      }
      function getBinaryPromise() {
        if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
          if (typeof fetch === "function") {
            return fetch(wasmBinaryFile, { credentials: "same-origin" }).then(function(response) {
              if (!response["ok"]) {
                throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
              }
              return response["arrayBuffer"]();
            }).catch(function() {
              return getBinary(wasmBinaryFile);
            });
          }
        }
        return Promise.resolve().then(function() {
          return getBinary(wasmBinaryFile);
        });
      }
      function createWasm() {
        var info = { "a": asmLibraryArg };
        function receiveInstance(instance, module) {
          var exports2 = instance.exports;
          Module2["asm"] = exports2;
          wasmMemory = Module2["asm"]["M"];
          updateGlobalBufferAndViews(wasmMemory.buffer);
          wasmTable = Module2["asm"]["P"];
          addOnInit(Module2["asm"]["N"]);
          removeRunDependency("wasm-instantiate");
        }
        addRunDependency("wasm-instantiate");
        function receiveInstantiationResult(result) {
          receiveInstance(result["instance"]);
        }
        function instantiateArrayBuffer(receiver) {
          return getBinaryPromise().then(function(binary) {
            return WebAssembly.instantiate(binary, info);
          }).then(function(instance) {
            return instance;
          }).then(receiver, function(reason) {
            err("failed to asynchronously prepare wasm: " + reason);
            abort(reason);
          });
        }
        function instantiateAsync() {
          if (!wasmBinary && typeof WebAssembly.instantiateStreaming === "function" && !isDataURI(wasmBinaryFile) && typeof fetch === "function") {
            return fetch(wasmBinaryFile, { credentials: "same-origin" }).then(function(response) {
              var result = WebAssembly.instantiateStreaming(response, info);
              return result.then(receiveInstantiationResult, function(reason) {
                err("wasm streaming compile failed: " + reason);
                err("falling back to ArrayBuffer instantiation");
                return instantiateArrayBuffer(receiveInstantiationResult);
              });
            });
          } else {
            return instantiateArrayBuffer(receiveInstantiationResult);
          }
        }
        if (Module2["instantiateWasm"]) {
          try {
            var exports = Module2["instantiateWasm"](info, receiveInstance);
            return exports;
          } catch (e) {
            err("Module.instantiateWasm callback failed with error: " + e);
            return false;
          }
        }
        instantiateAsync().catch(readyPromiseReject);
        return {};
      }
      var tempDouble;
      var tempI64;
      function callRuntimeCallbacks(callbacks) {
        while (callbacks.length > 0) {
          var callback = callbacks.shift();
          if (typeof callback == "function") {
            callback(Module2);
            continue;
          }
          var func = callback.func;
          if (typeof func === "number") {
            if (callback.arg === void 0) {
              getWasmTableEntry(func)();
            } else {
              getWasmTableEntry(func)(callback.arg);
            }
          } else {
            func(callback.arg === void 0 ? null : callback.arg);
          }
        }
      }
      var wasmTableMirror = [];
      function getWasmTableEntry(funcPtr) {
        var func = wasmTableMirror[funcPtr];
        if (!func) {
          if (funcPtr >= wasmTableMirror.length)
            wasmTableMirror.length = funcPtr + 1;
          wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
        }
        return func;
      }
      function ___cxa_allocate_exception(size) {
        return _malloc(size + 16) + 16;
      }
      function ExceptionInfo(excPtr) {
        this.excPtr = excPtr;
        this.ptr = excPtr - 16;
        this.set_type = function(type) {
          HEAP32[this.ptr + 4 >> 2] = type;
        };
        this.get_type = function() {
          return HEAP32[this.ptr + 4 >> 2];
        };
        this.set_destructor = function(destructor) {
          HEAP32[this.ptr + 8 >> 2] = destructor;
        };
        this.get_destructor = function() {
          return HEAP32[this.ptr + 8 >> 2];
        };
        this.set_refcount = function(refcount) {
          HEAP32[this.ptr >> 2] = refcount;
        };
        this.set_caught = function(caught) {
          caught = caught ? 1 : 0;
          HEAP8[this.ptr + 12 >> 0] = caught;
        };
        this.get_caught = function() {
          return HEAP8[this.ptr + 12 >> 0] != 0;
        };
        this.set_rethrown = function(rethrown) {
          rethrown = rethrown ? 1 : 0;
          HEAP8[this.ptr + 13 >> 0] = rethrown;
        };
        this.get_rethrown = function() {
          return HEAP8[this.ptr + 13 >> 0] != 0;
        };
        this.init = function(type, destructor) {
          this.set_type(type);
          this.set_destructor(destructor);
          this.set_refcount(0);
          this.set_caught(false);
          this.set_rethrown(false);
        };
        this.add_ref = function() {
          var value = HEAP32[this.ptr >> 2];
          HEAP32[this.ptr >> 2] = value + 1;
        };
        this.release_ref = function() {
          var prev = HEAP32[this.ptr >> 2];
          HEAP32[this.ptr >> 2] = prev - 1;
          return prev === 1;
        };
      }
      var exceptionLast = 0;
      var uncaughtExceptionCount = 0;
      function ___cxa_throw(ptr, type, destructor) {
        var info = new ExceptionInfo(ptr);
        info.init(type, destructor);
        exceptionLast = ptr;
        uncaughtExceptionCount++;
        throw ptr;
      }
      function setErrNo(value) {
        HEAP32[___errno_location() >> 2] = value;
        return value;
      }
      var PATH = { splitPath: function(filename) {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      }, normalizeArray: function(parts, allowAboveRoot) {
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === ".") {
            parts.splice(i, 1);
          } else if (last === "..") {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        if (allowAboveRoot) {
          for (; up; up--) {
            parts.unshift("..");
          }
        }
        return parts;
      }, normalize: function(path) {
        var isAbsolute = path.charAt(0) === "/", trailingSlash = path.substr(-1) === "/";
        path = PATH.normalizeArray(path.split("/").filter(function(p) {
          return !!p;
        }), !isAbsolute).join("/");
        if (!path && !isAbsolute) {
          path = ".";
        }
        if (path && trailingSlash) {
          path += "/";
        }
        return (isAbsolute ? "/" : "") + path;
      }, dirname: function(path) {
        var result = PATH.splitPath(path), root = result[0], dir = result[1];
        if (!root && !dir) {
          return ".";
        }
        if (dir) {
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      }, basename: function(path) {
        if (path === "/")
          return "/";
        path = PATH.normalize(path);
        path = path.replace(/\/$/, "");
        var lastSlash = path.lastIndexOf("/");
        if (lastSlash === -1)
          return path;
        return path.substr(lastSlash + 1);
      }, extname: function(path) {
        return PATH.splitPath(path)[3];
      }, join: function() {
        var paths = Array.prototype.slice.call(arguments, 0);
        return PATH.normalize(paths.join("/"));
      }, join2: function(l, r) {
        return PATH.normalize(l + "/" + r);
      } };
      function getRandomDevice() {
        if (typeof crypto === "object" && typeof crypto["getRandomValues"] === "function") {
          var randomBuffer = new Uint8Array(1);
          return function() {
            crypto.getRandomValues(randomBuffer);
            return randomBuffer[0];
          };
        } else
          return function() {
            abort("randomDevice");
          };
      }
      var PATH_FS = { resolve: function() {
        var resolvedPath = "", resolvedAbsolute = false;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = i >= 0 ? arguments[i] : FS.cwd();
          if (typeof path !== "string") {
            throw new TypeError("Arguments to path.resolve must be strings");
          } else if (!path) {
            return "";
          }
          resolvedPath = path + "/" + resolvedPath;
          resolvedAbsolute = path.charAt(0) === "/";
        }
        resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter(function(p) {
          return !!p;
        }), !resolvedAbsolute).join("/");
        return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
      }, relative: function(from, to) {
        from = PATH_FS.resolve(from).substr(1);
        to = PATH_FS.resolve(to).substr(1);
        function trim(arr) {
          var start4 = 0;
          for (; start4 < arr.length; start4++) {
            if (arr[start4] !== "")
              break;
          }
          var end3 = arr.length - 1;
          for (; end3 >= 0; end3--) {
            if (arr[end3] !== "")
              break;
          }
          if (start4 > end3)
            return [];
          return arr.slice(start4, end3 - start4 + 1);
        }
        var fromParts = trim(from.split("/"));
        var toParts = trim(to.split("/"));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push("..");
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join("/");
      } };
      var TTY = { ttys: [], init: function() {
      }, shutdown: function() {
      }, register: function(dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops };
        FS.registerDevice(dev, TTY.stream_ops);
      }, stream_ops: { open: function(stream) {
        var tty = TTY.ttys[stream.node.rdev];
        if (!tty) {
          throw new FS.ErrnoError(43);
        }
        stream.tty = tty;
        stream.seekable = false;
      }, close: function(stream) {
        stream.tty.ops.flush(stream.tty);
      }, flush: function(stream) {
        stream.tty.ops.flush(stream.tty);
      }, read: function(stream, buffer2, offset, length, pos) {
        if (!stream.tty || !stream.tty.ops.get_char) {
          throw new FS.ErrnoError(60);
        }
        var bytesRead = 0;
        for (var i = 0; i < length; i++) {
          var result;
          try {
            result = stream.tty.ops.get_char(stream.tty);
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (result === void 0 && bytesRead === 0) {
            throw new FS.ErrnoError(6);
          }
          if (result === null || result === void 0)
            break;
          bytesRead++;
          buffer2[offset + i] = result;
        }
        if (bytesRead) {
          stream.node.timestamp = Date.now();
        }
        return bytesRead;
      }, write: function(stream, buffer2, offset, length, pos) {
        if (!stream.tty || !stream.tty.ops.put_char) {
          throw new FS.ErrnoError(60);
        }
        try {
          for (var i = 0; i < length; i++) {
            stream.tty.ops.put_char(stream.tty, buffer2[offset + i]);
          }
        } catch (e) {
          throw new FS.ErrnoError(29);
        }
        if (length) {
          stream.node.timestamp = Date.now();
        }
        return i;
      } }, default_tty_ops: { get_char: function(tty) {
        if (!tty.input.length) {
          var result = null;
          if (typeof window != "undefined" && typeof window.prompt == "function") {
            result = window.prompt("Input: ");
            if (result !== null) {
              result += "\n";
            }
          } else if (typeof readline == "function") {
            result = readline();
            if (result !== null) {
              result += "\n";
            }
          }
          if (!result) {
            return null;
          }
          tty.input = intArrayFromString(result, true);
        }
        return tty.input.shift();
      }, put_char: function(tty, val) {
        if (val === null || val === 10) {
          out(UTF8ArrayToString(tty.output, 0));
          tty.output = [];
        } else {
          if (val != 0)
            tty.output.push(val);
        }
      }, flush: function(tty) {
        if (tty.output && tty.output.length > 0) {
          out(UTF8ArrayToString(tty.output, 0));
          tty.output = [];
        }
      } }, default_tty1_ops: { put_char: function(tty, val) {
        if (val === null || val === 10) {
          err(UTF8ArrayToString(tty.output, 0));
          tty.output = [];
        } else {
          if (val != 0)
            tty.output.push(val);
        }
      }, flush: function(tty) {
        if (tty.output && tty.output.length > 0) {
          err(UTF8ArrayToString(tty.output, 0));
          tty.output = [];
        }
      } } };
      function zeroMemory(address, size) {
        HEAPU8.fill(0, address, address + size);
      }
      function alignMemory(size, alignment) {
        return Math.ceil(size / alignment) * alignment;
      }
      function mmapAlloc(size) {
        size = alignMemory(size, 65536);
        var ptr = _memalign(65536, size);
        if (!ptr)
          return 0;
        zeroMemory(ptr, size);
        return ptr;
      }
      var MEMFS = { ops_table: null, mount: function(mount) {
        return MEMFS.createNode(null, "/", 16384 | 511, 0);
      }, createNode: function(parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          throw new FS.ErrnoError(63);
        }
        if (!MEMFS.ops_table) {
          MEMFS.ops_table = { dir: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr, lookup: MEMFS.node_ops.lookup, mknod: MEMFS.node_ops.mknod, rename: MEMFS.node_ops.rename, unlink: MEMFS.node_ops.unlink, rmdir: MEMFS.node_ops.rmdir, readdir: MEMFS.node_ops.readdir, symlink: MEMFS.node_ops.symlink }, stream: { llseek: MEMFS.stream_ops.llseek } }, file: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr }, stream: { llseek: MEMFS.stream_ops.llseek, read: MEMFS.stream_ops.read, write: MEMFS.stream_ops.write, allocate: MEMFS.stream_ops.allocate, mmap: MEMFS.stream_ops.mmap, msync: MEMFS.stream_ops.msync } }, link: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr, readlink: MEMFS.node_ops.readlink }, stream: {} }, chrdev: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr }, stream: FS.chrdev_stream_ops } };
        }
        var node = FS.createNode(parent, name, mode, dev);
        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node;
          node.stream_ops = MEMFS.ops_table.dir.stream;
          node.contents = {};
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node;
          node.stream_ops = MEMFS.ops_table.file.stream;
          node.usedBytes = 0;
          node.contents = null;
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node;
          node.stream_ops = MEMFS.ops_table.link.stream;
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node;
          node.stream_ops = MEMFS.ops_table.chrdev.stream;
        }
        node.timestamp = Date.now();
        if (parent) {
          parent.contents[name] = node;
          parent.timestamp = node.timestamp;
        }
        return node;
      }, getFileDataAsTypedArray: function(node) {
        if (!node.contents)
          return new Uint8Array(0);
        if (node.contents.subarray)
          return node.contents.subarray(0, node.usedBytes);
        return new Uint8Array(node.contents);
      }, expandFileStorage: function(node, newCapacity) {
        var prevCapacity = node.contents ? node.contents.length : 0;
        if (prevCapacity >= newCapacity)
          return;
        var CAPACITY_DOUBLING_MAX = 1024 * 1024;
        newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125) >>> 0);
        if (prevCapacity != 0)
          newCapacity = Math.max(newCapacity, 256);
        var oldContents = node.contents;
        node.contents = new Uint8Array(newCapacity);
        if (node.usedBytes > 0)
          node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
      }, resizeFileStorage: function(node, newSize) {
        if (node.usedBytes == newSize)
          return;
        if (newSize == 0) {
          node.contents = null;
          node.usedBytes = 0;
        } else {
          var oldContents = node.contents;
          node.contents = new Uint8Array(newSize);
          if (oldContents) {
            node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
          }
          node.usedBytes = newSize;
        }
      }, node_ops: { getattr: function(node) {
        var attr = {};
        attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
        attr.ino = node.id;
        attr.mode = node.mode;
        attr.nlink = 1;
        attr.uid = 0;
        attr.gid = 0;
        attr.rdev = node.rdev;
        if (FS.isDir(node.mode)) {
          attr.size = 4096;
        } else if (FS.isFile(node.mode)) {
          attr.size = node.usedBytes;
        } else if (FS.isLink(node.mode)) {
          attr.size = node.link.length;
        } else {
          attr.size = 0;
        }
        attr.atime = new Date(node.timestamp);
        attr.mtime = new Date(node.timestamp);
        attr.ctime = new Date(node.timestamp);
        attr.blksize = 4096;
        attr.blocks = Math.ceil(attr.size / attr.blksize);
        return attr;
      }, setattr: function(node, attr) {
        if (attr.mode !== void 0) {
          node.mode = attr.mode;
        }
        if (attr.timestamp !== void 0) {
          node.timestamp = attr.timestamp;
        }
        if (attr.size !== void 0) {
          MEMFS.resizeFileStorage(node, attr.size);
        }
      }, lookup: function(parent, name) {
        throw FS.genericErrors[44];
      }, mknod: function(parent, name, mode, dev) {
        return MEMFS.createNode(parent, name, mode, dev);
      }, rename: function(old_node, new_dir, new_name) {
        if (FS.isDir(old_node.mode)) {
          var new_node;
          try {
            new_node = FS.lookupNode(new_dir, new_name);
          } catch (e) {
          }
          if (new_node) {
            for (var i in new_node.contents) {
              throw new FS.ErrnoError(55);
            }
          }
        }
        delete old_node.parent.contents[old_node.name];
        old_node.parent.timestamp = Date.now();
        old_node.name = new_name;
        new_dir.contents[new_name] = old_node;
        new_dir.timestamp = old_node.parent.timestamp;
        old_node.parent = new_dir;
      }, unlink: function(parent, name) {
        delete parent.contents[name];
        parent.timestamp = Date.now();
      }, rmdir: function(parent, name) {
        var node = FS.lookupNode(parent, name);
        for (var i in node.contents) {
          throw new FS.ErrnoError(55);
        }
        delete parent.contents[name];
        parent.timestamp = Date.now();
      }, readdir: function(node) {
        var entries = [".", ".."];
        for (var key2 in node.contents) {
          if (!node.contents.hasOwnProperty(key2)) {
            continue;
          }
          entries.push(key2);
        }
        return entries;
      }, symlink: function(parent, newname, oldpath) {
        var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
        node.link = oldpath;
        return node;
      }, readlink: function(node) {
        if (!FS.isLink(node.mode)) {
          throw new FS.ErrnoError(28);
        }
        return node.link;
      } }, stream_ops: { read: function(stream, buffer2, offset, length, position) {
        var contents = stream.node.contents;
        if (position >= stream.node.usedBytes)
          return 0;
        var size = Math.min(stream.node.usedBytes - position, length);
        if (size > 8 && contents.subarray) {
          buffer2.set(contents.subarray(position, position + size), offset);
        } else {
          for (var i = 0; i < size; i++)
            buffer2[offset + i] = contents[position + i];
        }
        return size;
      }, write: function(stream, buffer2, offset, length, position, canOwn) {
        if (buffer2.buffer === HEAP8.buffer) {
          canOwn = false;
        }
        if (!length)
          return 0;
        var node = stream.node;
        node.timestamp = Date.now();
        if (buffer2.subarray && (!node.contents || node.contents.subarray)) {
          if (canOwn) {
            node.contents = buffer2.subarray(offset, offset + length);
            node.usedBytes = length;
            return length;
          } else if (node.usedBytes === 0 && position === 0) {
            node.contents = buffer2.slice(offset, offset + length);
            node.usedBytes = length;
            return length;
          } else if (position + length <= node.usedBytes) {
            node.contents.set(buffer2.subarray(offset, offset + length), position);
            return length;
          }
        }
        MEMFS.expandFileStorage(node, position + length);
        if (node.contents.subarray && buffer2.subarray) {
          node.contents.set(buffer2.subarray(offset, offset + length), position);
        } else {
          for (var i = 0; i < length; i++) {
            node.contents[position + i] = buffer2[offset + i];
          }
        }
        node.usedBytes = Math.max(node.usedBytes, position + length);
        return length;
      }, llseek: function(stream, offset, whence) {
        var position = offset;
        if (whence === 1) {
          position += stream.position;
        } else if (whence === 2) {
          if (FS.isFile(stream.node.mode)) {
            position += stream.node.usedBytes;
          }
        }
        if (position < 0) {
          throw new FS.ErrnoError(28);
        }
        return position;
      }, allocate: function(stream, offset, length) {
        MEMFS.expandFileStorage(stream.node, offset + length);
        stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
      }, mmap: function(stream, address, length, position, prot, flags) {
        if (address !== 0) {
          throw new FS.ErrnoError(28);
        }
        if (!FS.isFile(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        var ptr;
        var allocated;
        var contents = stream.node.contents;
        if (!(flags & 2) && contents.buffer === buffer) {
          allocated = false;
          ptr = contents.byteOffset;
        } else {
          if (position > 0 || position + length < contents.length) {
            if (contents.subarray) {
              contents = contents.subarray(position, position + length);
            } else {
              contents = Array.prototype.slice.call(contents, position, position + length);
            }
          }
          allocated = true;
          ptr = mmapAlloc(length);
          if (!ptr) {
            throw new FS.ErrnoError(48);
          }
          HEAP8.set(contents, ptr);
        }
        return { ptr, allocated };
      }, msync: function(stream, buffer2, offset, length, mmapFlags) {
        if (!FS.isFile(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        if (mmapFlags & 2) {
          return 0;
        }
        var bytesWritten = MEMFS.stream_ops.write(stream, buffer2, 0, length, offset, false);
        return 0;
      } } };
      function asyncLoad(url, onload, onerror, noRunDep) {
        var dep = !noRunDep ? getUniqueRunDependency("al " + url) : "";
        readAsync(url, function(arrayBuffer) {
          assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).');
          onload(new Uint8Array(arrayBuffer));
          if (dep)
            removeRunDependency(dep);
        }, function(event) {
          if (onerror) {
            onerror();
          } else {
            throw 'Loading data file "' + url + '" failed.';
          }
        });
        if (dep)
          addRunDependency(dep);
      }
      var FS = { root: null, mounts: [], devices: {}, streams: [], nextInode: 1, nameTable: null, currentPath: "/", initialized: false, ignorePermissions: true, ErrnoError: null, genericErrors: {}, filesystems: null, syncFSRequests: 0, lookupPath: function(path, opts) {
        path = PATH_FS.resolve(FS.cwd(), path);
        opts = opts || {};
        if (!path)
          return { path: "", node: null };
        var defaults2 = { follow_mount: true, recurse_count: 0 };
        for (var key2 in defaults2) {
          if (opts[key2] === void 0) {
            opts[key2] = defaults2[key2];
          }
        }
        if (opts.recurse_count > 8) {
          throw new FS.ErrnoError(32);
        }
        var parts = PATH.normalizeArray(path.split("/").filter(function(p) {
          return !!p;
        }), false);
        var current = FS.root;
        var current_path = "/";
        for (var i = 0; i < parts.length; i++) {
          var islast = i === parts.length - 1;
          if (islast && opts.parent) {
            break;
          }
          current = FS.lookupNode(current, parts[i]);
          current_path = PATH.join2(current_path, parts[i]);
          if (FS.isMountpoint(current)) {
            if (!islast || islast && opts.follow_mount) {
              current = current.mounted.root;
            }
          }
          if (!islast || opts.follow) {
            var count = 0;
            while (FS.isLink(current.mode)) {
              var link = FS.readlink(current_path);
              current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
              var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count });
              current = lookup.node;
              if (count++ > 40) {
                throw new FS.ErrnoError(32);
              }
            }
          }
        }
        return { path: current_path, node: current };
      }, getPath: function(node) {
        var path;
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint;
            if (!path)
              return mount;
            return mount[mount.length - 1] !== "/" ? mount + "/" + path : mount + path;
          }
          path = path ? node.name + "/" + path : node.name;
          node = node.parent;
        }
      }, hashName: function(parentid, name) {
        var hash2 = 0;
        for (var i = 0; i < name.length; i++) {
          hash2 = (hash2 << 5) - hash2 + name.charCodeAt(i) | 0;
        }
        return (parentid + hash2 >>> 0) % FS.nameTable.length;
      }, hashAddNode: function(node) {
        var hash2 = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash2];
        FS.nameTable[hash2] = node;
      }, hashRemoveNode: function(node) {
        var hash2 = FS.hashName(node.parent.id, node.name);
        if (FS.nameTable[hash2] === node) {
          FS.nameTable[hash2] = node.name_next;
        } else {
          var current = FS.nameTable[hash2];
          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next;
              break;
            }
            current = current.name_next;
          }
        }
      }, lookupNode: function(parent, name) {
        var errCode = FS.mayLookup(parent);
        if (errCode) {
          throw new FS.ErrnoError(errCode, parent);
        }
        var hash2 = FS.hashName(parent.id, name);
        for (var node = FS.nameTable[hash2]; node; node = node.name_next) {
          var nodeName = node.name;
          if (node.parent.id === parent.id && nodeName === name) {
            return node;
          }
        }
        return FS.lookup(parent, name);
      }, createNode: function(parent, name, mode, rdev) {
        var node = new FS.FSNode(parent, name, mode, rdev);
        FS.hashAddNode(node);
        return node;
      }, destroyNode: function(node) {
        FS.hashRemoveNode(node);
      }, isRoot: function(node) {
        return node === node.parent;
      }, isMountpoint: function(node) {
        return !!node.mounted;
      }, isFile: function(mode) {
        return (mode & 61440) === 32768;
      }, isDir: function(mode) {
        return (mode & 61440) === 16384;
      }, isLink: function(mode) {
        return (mode & 61440) === 40960;
      }, isChrdev: function(mode) {
        return (mode & 61440) === 8192;
      }, isBlkdev: function(mode) {
        return (mode & 61440) === 24576;
      }, isFIFO: function(mode) {
        return (mode & 61440) === 4096;
      }, isSocket: function(mode) {
        return (mode & 49152) === 49152;
      }, flagModes: { "r": 0, "r+": 2, "w": 577, "w+": 578, "a": 1089, "a+": 1090 }, modeStringToFlags: function(str) {
        var flags = FS.flagModes[str];
        if (typeof flags === "undefined") {
          throw new Error("Unknown file open mode: " + str);
        }
        return flags;
      }, flagsToPermissionString: function(flag) {
        var perms = ["r", "w", "rw"][flag & 3];
        if (flag & 512) {
          perms += "w";
        }
        return perms;
      }, nodePermissions: function(node, perms) {
        if (FS.ignorePermissions) {
          return 0;
        }
        if (perms.includes("r") && !(node.mode & 292)) {
          return 2;
        } else if (perms.includes("w") && !(node.mode & 146)) {
          return 2;
        } else if (perms.includes("x") && !(node.mode & 73)) {
          return 2;
        }
        return 0;
      }, mayLookup: function(dir) {
        var errCode = FS.nodePermissions(dir, "x");
        if (errCode)
          return errCode;
        if (!dir.node_ops.lookup)
          return 2;
        return 0;
      }, mayCreate: function(dir, name) {
        try {
          var node = FS.lookupNode(dir, name);
          return 20;
        } catch (e) {
        }
        return FS.nodePermissions(dir, "wx");
      }, mayDelete: function(dir, name, isdir) {
        var node;
        try {
          node = FS.lookupNode(dir, name);
        } catch (e) {
          return e.errno;
        }
        var errCode = FS.nodePermissions(dir, "wx");
        if (errCode) {
          return errCode;
        }
        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return 54;
          }
          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return 10;
          }
        } else {
          if (FS.isDir(node.mode)) {
            return 31;
          }
        }
        return 0;
      }, mayOpen: function(node, flags) {
        if (!node) {
          return 44;
        }
        if (FS.isLink(node.mode)) {
          return 32;
        } else if (FS.isDir(node.mode)) {
          if (FS.flagsToPermissionString(flags) !== "r" || flags & 512) {
            return 31;
          }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
      }, MAX_OPEN_FDS: 4096, nextfd: function(fd_start, fd_end) {
        fd_start = fd_start || 0;
        fd_end = fd_end || FS.MAX_OPEN_FDS;
        for (var fd = fd_start; fd <= fd_end; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }
        throw new FS.ErrnoError(33);
      }, getStream: function(fd) {
        return FS.streams[fd];
      }, createStream: function(stream, fd_start, fd_end) {
        if (!FS.FSStream) {
          FS.FSStream = function() {
          };
          FS.FSStream.prototype = { object: { get: function() {
            return this.node;
          }, set: function(val) {
            this.node = val;
          } }, isRead: { get: function() {
            return (this.flags & 2097155) !== 1;
          } }, isWrite: { get: function() {
            return (this.flags & 2097155) !== 0;
          } }, isAppend: { get: function() {
            return this.flags & 1024;
          } } };
        }
        var newStream = new FS.FSStream();
        for (var p in stream) {
          newStream[p] = stream[p];
        }
        stream = newStream;
        var fd = FS.nextfd(fd_start, fd_end);
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      }, closeStream: function(fd) {
        FS.streams[fd] = null;
      }, chrdev_stream_ops: { open: function(stream) {
        var device = FS.getDevice(stream.node.rdev);
        stream.stream_ops = device.stream_ops;
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
      }, llseek: function() {
        throw new FS.ErrnoError(70);
      } }, major: function(dev) {
        return dev >> 8;
      }, minor: function(dev) {
        return dev & 255;
      }, makedev: function(ma, mi) {
        return ma << 8 | mi;
      }, registerDevice: function(dev, ops) {
        FS.devices[dev] = { stream_ops: ops };
      }, getDevice: function(dev) {
        return FS.devices[dev];
      }, getMounts: function(mount) {
        var mounts = [];
        var check = [mount];
        while (check.length) {
          var m = check.pop();
          mounts.push(m);
          check.push.apply(check, m.mounts);
        }
        return mounts;
      }, syncfs: function(populate, callback) {
        if (typeof populate === "function") {
          callback = populate;
          populate = false;
        }
        FS.syncFSRequests++;
        if (FS.syncFSRequests > 1) {
          err("warning: " + FS.syncFSRequests + " FS.syncfs operations in flight at once, probably just doing extra work");
        }
        var mounts = FS.getMounts(FS.root.mount);
        var completed = 0;
        function doCallback(errCode) {
          FS.syncFSRequests--;
          return callback(errCode);
        }
        function done(errCode) {
          if (errCode) {
            if (!done.errored) {
              done.errored = true;
              return doCallback(errCode);
            }
            return;
          }
          if (++completed >= mounts.length) {
            doCallback(null);
          }
        }
        mounts.forEach(function(mount) {
          if (!mount.type.syncfs) {
            return done(null);
          }
          mount.type.syncfs(mount, populate, done);
        });
      }, mount: function(type, opts, mountpoint) {
        var root = mountpoint === "/";
        var pseudo = !mountpoint;
        var node;
        if (root && FS.root) {
          throw new FS.ErrnoError(10);
        } else if (!root && !pseudo) {
          var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
          mountpoint = lookup.path;
          node = lookup.node;
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10);
          }
          if (!FS.isDir(node.mode)) {
            throw new FS.ErrnoError(54);
          }
        }
        var mount = { type, opts, mountpoint, mounts: [] };
        var mountRoot = type.mount(mount);
        mountRoot.mount = mount;
        mount.root = mountRoot;
        if (root) {
          FS.root = mountRoot;
        } else if (node) {
          node.mounted = mount;
          if (node.mount) {
            node.mount.mounts.push(mount);
          }
        }
        return mountRoot;
      }, unmount: function(mountpoint) {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
        if (!FS.isMountpoint(lookup.node)) {
          throw new FS.ErrnoError(28);
        }
        var node = lookup.node;
        var mount = node.mounted;
        var mounts = FS.getMounts(mount);
        Object.keys(FS.nameTable).forEach(function(hash2) {
          var current = FS.nameTable[hash2];
          while (current) {
            var next = current.name_next;
            if (mounts.includes(current.mount)) {
              FS.destroyNode(current);
            }
            current = next;
          }
        });
        node.mounted = null;
        var idx = node.mount.mounts.indexOf(mount);
        node.mount.mounts.splice(idx, 1);
      }, lookup: function(parent, name) {
        return parent.node_ops.lookup(parent, name);
      }, mknod: function(path, mode, dev) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        if (!name || name === "." || name === "..") {
          throw new FS.ErrnoError(28);
        }
        var errCode = FS.mayCreate(parent, name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.mknod(parent, name, mode, dev);
      }, create: function(path, mode) {
        mode = mode !== void 0 ? mode : 438;
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      }, mkdir: function(path, mode) {
        mode = mode !== void 0 ? mode : 511;
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      }, mkdirTree: function(path, mode) {
        var dirs = path.split("/");
        var d = "";
        for (var i = 0; i < dirs.length; ++i) {
          if (!dirs[i])
            continue;
          d += "/" + dirs[i];
          try {
            FS.mkdir(d, mode);
          } catch (e) {
            if (e.errno != 20)
              throw e;
          }
        }
      }, mkdev: function(path, mode, dev) {
        if (typeof dev === "undefined") {
          dev = mode;
          mode = 438;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
      }, symlink: function(oldpath, newpath) {
        if (!PATH_FS.resolve(oldpath)) {
          throw new FS.ErrnoError(44);
        }
        var lookup = FS.lookupPath(newpath, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(44);
        }
        var newname = PATH.basename(newpath);
        var errCode = FS.mayCreate(parent, newname);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.symlink(parent, newname, oldpath);
      }, rename: function(old_path, new_path) {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path);
        var lookup, old_dir, new_dir;
        lookup = FS.lookupPath(old_path, { parent: true });
        old_dir = lookup.node;
        lookup = FS.lookupPath(new_path, { parent: true });
        new_dir = lookup.node;
        if (!old_dir || !new_dir)
          throw new FS.ErrnoError(44);
        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(75);
        }
        var old_node = FS.lookupNode(old_dir, old_name);
        var relative = PATH_FS.relative(old_path, new_dirname);
        if (relative.charAt(0) !== ".") {
          throw new FS.ErrnoError(28);
        }
        relative = PATH_FS.relative(new_path, old_dirname);
        if (relative.charAt(0) !== ".") {
          throw new FS.ErrnoError(55);
        }
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {
        }
        if (old_node === new_node) {
          return;
        }
        var isdir = FS.isDir(old_node.mode);
        var errCode = FS.mayDelete(old_dir, old_name, isdir);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) {
          throw new FS.ErrnoError(10);
        }
        if (new_dir !== old_dir) {
          errCode = FS.nodePermissions(old_dir, "w");
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        FS.hashRemoveNode(old_node);
        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name);
        } catch (e) {
          throw e;
        } finally {
          FS.hashAddNode(old_node);
        }
      }, rmdir: function(path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, true);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
      }, readdir: function(path) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(54);
        }
        return node.node_ops.readdir(node);
      }, unlink: function(path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, false);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
      }, readlink: function(path) {
        var lookup = FS.lookupPath(path);
        var link = lookup.node;
        if (!link) {
          throw new FS.ErrnoError(44);
        }
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(28);
        }
        return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
      }, stat: function(path, dontFollow) {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        var node = lookup.node;
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(63);
        }
        return node.node_ops.getattr(node);
      }, lstat: function(path) {
        return FS.stat(path, true);
      }, chmod: function(path, mode, dontFollow) {
        var node;
        if (typeof path === "string") {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        node.node_ops.setattr(node, { mode: mode & 4095 | node.mode & ~4095, timestamp: Date.now() });
      }, lchmod: function(path, mode) {
        FS.chmod(path, mode, true);
      }, fchmod: function(fd, mode) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        FS.chmod(stream.node, mode);
      }, chown: function(path, uid, gid, dontFollow) {
        var node;
        if (typeof path === "string") {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        node.node_ops.setattr(node, { timestamp: Date.now() });
      }, lchown: function(path, uid, gid) {
        FS.chown(path, uid, gid, true);
      }, fchown: function(fd, uid, gid) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        FS.chown(stream.node, uid, gid);
      }, truncate: function(path, len) {
        if (len < 0) {
          throw new FS.ErrnoError(28);
        }
        var node;
        if (typeof path === "string") {
          var lookup = FS.lookupPath(path, { follow: true });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(28);
        }
        var errCode = FS.nodePermissions(node, "w");
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        node.node_ops.setattr(node, { size: len, timestamp: Date.now() });
      }, ftruncate: function(fd, len) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(28);
        }
        FS.truncate(stream.node, len);
      }, utime: function(path, atime, mtime) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        node.node_ops.setattr(node, { timestamp: Math.max(atime, mtime) });
      }, open: function(path, flags, mode, fd_start, fd_end) {
        if (path === "") {
          throw new FS.ErrnoError(44);
        }
        flags = typeof flags === "string" ? FS.modeStringToFlags(flags) : flags;
        mode = typeof mode === "undefined" ? 438 : mode;
        if (flags & 64) {
          mode = mode & 4095 | 32768;
        } else {
          mode = 0;
        }
        var node;
        if (typeof path === "object") {
          node = path;
        } else {
          path = PATH.normalize(path);
          try {
            var lookup = FS.lookupPath(path, { follow: !(flags & 131072) });
            node = lookup.node;
          } catch (e) {
          }
        }
        var created = false;
        if (flags & 64) {
          if (node) {
            if (flags & 128) {
              throw new FS.ErrnoError(20);
            }
          } else {
            node = FS.mknod(path, mode, 0);
            created = true;
          }
        }
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        if (FS.isChrdev(node.mode)) {
          flags &= ~512;
        }
        if (flags & 65536 && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(54);
        }
        if (!created) {
          var errCode = FS.mayOpen(node, flags);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        if (flags & 512) {
          FS.truncate(node, 0);
        }
        flags &= ~(128 | 512 | 131072);
        var stream = FS.createStream({ node, path: FS.getPath(node), id: node.id, flags, mode: node.mode, seekable: true, position: 0, stream_ops: node.stream_ops, node_ops: node.node_ops, ungotten: [], error: false }, fd_start, fd_end);
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
        if (Module2["logReadFiles"] && !(flags & 1)) {
          if (!FS.readFiles)
            FS.readFiles = {};
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1;
          }
        }
        return stream;
      }, close: function(stream) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (stream.getdents)
          stream.getdents = null;
        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream);
          }
        } catch (e) {
          throw e;
        } finally {
          FS.closeStream(stream.fd);
        }
        stream.fd = null;
      }, isClosed: function(stream) {
        return stream.fd === null;
      }, llseek: function(stream, offset, whence) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(70);
        }
        if (whence != 0 && whence != 1 && whence != 2) {
          throw new FS.ErrnoError(28);
        }
        stream.position = stream.stream_ops.llseek(stream, offset, whence);
        stream.ungotten = [];
        return stream.position;
      }, read: function(stream, buffer2, offset, length, position) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(28);
        }
        var seeking = typeof position !== "undefined";
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesRead = stream.stream_ops.read(stream, buffer2, offset, length, position);
        if (!seeking)
          stream.position += bytesRead;
        return bytesRead;
      }, write: function(stream, buffer2, offset, length, position, canOwn) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(28);
        }
        if (stream.seekable && stream.flags & 1024) {
          FS.llseek(stream, 0, 2);
        }
        var seeking = typeof position !== "undefined";
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesWritten = stream.stream_ops.write(stream, buffer2, offset, length, position, canOwn);
        if (!seeking)
          stream.position += bytesWritten;
        return bytesWritten;
      }, allocate: function(stream, offset, length) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (offset < 0 || length <= 0) {
          throw new FS.ErrnoError(28);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        if (!stream.stream_ops.allocate) {
          throw new FS.ErrnoError(138);
        }
        stream.stream_ops.allocate(stream, offset, length);
      }, mmap: function(stream, address, length, position, prot, flags) {
        if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
          throw new FS.ErrnoError(2);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(2);
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.ErrnoError(43);
        }
        return stream.stream_ops.mmap(stream, address, length, position, prot, flags);
      }, msync: function(stream, buffer2, offset, length, mmapFlags) {
        if (!stream || !stream.stream_ops.msync) {
          return 0;
        }
        return stream.stream_ops.msync(stream, buffer2, offset, length, mmapFlags);
      }, munmap: function(stream) {
        return 0;
      }, ioctl: function(stream, cmd, arg) {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(59);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
      }, readFile: function(path, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 0;
        opts.encoding = opts.encoding || "binary";
        if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        var ret;
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);
        if (opts.encoding === "utf8") {
          ret = UTF8ArrayToString(buf, 0);
        } else if (opts.encoding === "binary") {
          ret = buf;
        }
        FS.close(stream);
        return ret;
      }, writeFile: function(path, data, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 577;
        var stream = FS.open(path, opts.flags, opts.mode);
        if (typeof data === "string") {
          var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
          var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
          FS.write(stream, buf, 0, actualNumBytes, void 0, opts.canOwn);
        } else if (ArrayBuffer.isView(data)) {
          FS.write(stream, data, 0, data.byteLength, void 0, opts.canOwn);
        } else {
          throw new Error("Unsupported data type");
        }
        FS.close(stream);
      }, cwd: function() {
        return FS.currentPath;
      }, chdir: function(path) {
        var lookup = FS.lookupPath(path, { follow: true });
        if (lookup.node === null) {
          throw new FS.ErrnoError(44);
        }
        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(54);
        }
        var errCode = FS.nodePermissions(lookup.node, "x");
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        FS.currentPath = lookup.path;
      }, createDefaultDirectories: function() {
        FS.mkdir("/tmp");
        FS.mkdir("/home");
        FS.mkdir("/home/web_user");
      }, createDefaultDevices: function() {
        FS.mkdir("/dev");
        FS.registerDevice(FS.makedev(1, 3), { read: function() {
          return 0;
        }, write: function(stream, buffer2, offset, length, pos) {
          return length;
        } });
        FS.mkdev("/dev/null", FS.makedev(1, 3));
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev("/dev/tty", FS.makedev(5, 0));
        FS.mkdev("/dev/tty1", FS.makedev(6, 0));
        var random_device = getRandomDevice();
        FS.createDevice("/dev", "random", random_device);
        FS.createDevice("/dev", "urandom", random_device);
        FS.mkdir("/dev/shm");
        FS.mkdir("/dev/shm/tmp");
      }, createSpecialDirectories: function() {
        FS.mkdir("/proc");
        var proc_self = FS.mkdir("/proc/self");
        FS.mkdir("/proc/self/fd");
        FS.mount({ mount: function() {
          var node = FS.createNode(proc_self, "fd", 16384 | 511, 73);
          node.node_ops = { lookup: function(parent, name) {
            var fd = +name;
            var stream = FS.getStream(fd);
            if (!stream)
              throw new FS.ErrnoError(8);
            var ret = { parent: null, mount: { mountpoint: "fake" }, node_ops: { readlink: function() {
              return stream.path;
            } } };
            ret.parent = ret;
            return ret;
          } };
          return node;
        } }, {}, "/proc/self/fd");
      }, createStandardStreams: function() {
        if (Module2["stdin"]) {
          FS.createDevice("/dev", "stdin", Module2["stdin"]);
        } else {
          FS.symlink("/dev/tty", "/dev/stdin");
        }
        if (Module2["stdout"]) {
          FS.createDevice("/dev", "stdout", null, Module2["stdout"]);
        } else {
          FS.symlink("/dev/tty", "/dev/stdout");
        }
        if (Module2["stderr"]) {
          FS.createDevice("/dev", "stderr", null, Module2["stderr"]);
        } else {
          FS.symlink("/dev/tty1", "/dev/stderr");
        }
        var stdin = FS.open("/dev/stdin", 0);
        var stdout = FS.open("/dev/stdout", 1);
        var stderr = FS.open("/dev/stderr", 1);
      }, ensureErrnoError: function() {
        if (FS.ErrnoError)
          return;
        FS.ErrnoError = function ErrnoError(errno, node) {
          this.node = node;
          this.setErrno = function(errno2) {
            this.errno = errno2;
          };
          this.setErrno(errno);
          this.message = "FS error";
        };
        FS.ErrnoError.prototype = new Error();
        FS.ErrnoError.prototype.constructor = FS.ErrnoError;
        [44].forEach(function(code) {
          FS.genericErrors[code] = new FS.ErrnoError(code);
          FS.genericErrors[code].stack = "<generic error, no stack>";
        });
      }, staticInit: function() {
        FS.ensureErrnoError();
        FS.nameTable = new Array(4096);
        FS.mount(MEMFS, {}, "/");
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
        FS.createSpecialDirectories();
        FS.filesystems = { "MEMFS": MEMFS };
      }, init: function(input, output, error) {
        FS.init.initialized = true;
        FS.ensureErrnoError();
        Module2["stdin"] = input || Module2["stdin"];
        Module2["stdout"] = output || Module2["stdout"];
        Module2["stderr"] = error || Module2["stderr"];
        FS.createStandardStreams();
      }, quit: function() {
        FS.init.initialized = false;
        var fflush = Module2["_fflush"];
        if (fflush)
          fflush(0);
        for (var i = 0; i < FS.streams.length; i++) {
          var stream = FS.streams[i];
          if (!stream) {
            continue;
          }
          FS.close(stream);
        }
      }, getMode: function(canRead, canWrite) {
        var mode = 0;
        if (canRead)
          mode |= 292 | 73;
        if (canWrite)
          mode |= 146;
        return mode;
      }, findObject: function(path, dontResolveLastLink) {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (ret.exists) {
          return ret.object;
        } else {
          return null;
        }
      }, analyzePath: function(path, dontResolveLastLink) {
        try {
          var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          path = lookup.path;
        } catch (e) {
        }
        var ret = { isRoot: false, exists: false, error: 0, name: null, path: null, object: null, parentExists: false, parentPath: null, parentObject: null };
        try {
          var lookup = FS.lookupPath(path, { parent: true });
          ret.parentExists = true;
          ret.parentPath = lookup.path;
          ret.parentObject = lookup.node;
          ret.name = PATH.basename(path);
          lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          ret.exists = true;
          ret.path = lookup.path;
          ret.object = lookup.node;
          ret.name = lookup.node.name;
          ret.isRoot = lookup.path === "/";
        } catch (e) {
          ret.error = e.errno;
        }
        return ret;
      }, createPath: function(parent, path, canRead, canWrite) {
        parent = typeof parent === "string" ? parent : FS.getPath(parent);
        var parts = path.split("/").reverse();
        while (parts.length) {
          var part = parts.pop();
          if (!part)
            continue;
          var current = PATH.join2(parent, part);
          try {
            FS.mkdir(current);
          } catch (e) {
          }
          parent = current;
        }
        return current;
      }, createFile: function(parent, name, properties, canRead, canWrite) {
        var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.create(path, mode);
      }, createDataFile: function(parent, name, data, canRead, canWrite, canOwn) {
        var path = name ? PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name) : parent;
        var mode = FS.getMode(canRead, canWrite);
        var node = FS.create(path, mode);
        if (data) {
          if (typeof data === "string") {
            var arr = new Array(data.length);
            for (var i = 0, len = data.length; i < len; ++i)
              arr[i] = data.charCodeAt(i);
            data = arr;
          }
          FS.chmod(node, mode | 146);
          var stream = FS.open(node, 577);
          FS.write(stream, data, 0, data.length, 0, canOwn);
          FS.close(stream);
          FS.chmod(node, mode);
        }
        return node;
      }, createDevice: function(parent, name, input, output) {
        var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(!!input, !!output);
        if (!FS.createDevice.major)
          FS.createDevice.major = 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        FS.registerDevice(dev, { open: function(stream) {
          stream.seekable = false;
        }, close: function(stream) {
          if (output && output.buffer && output.buffer.length) {
            output(10);
          }
        }, read: function(stream, buffer2, offset, length, pos) {
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = input();
            } catch (e) {
              throw new FS.ErrnoError(29);
            }
            if (result === void 0 && bytesRead === 0) {
              throw new FS.ErrnoError(6);
            }
            if (result === null || result === void 0)
              break;
            bytesRead++;
            buffer2[offset + i] = result;
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now();
          }
          return bytesRead;
        }, write: function(stream, buffer2, offset, length, pos) {
          for (var i = 0; i < length; i++) {
            try {
              output(buffer2[offset + i]);
            } catch (e) {
              throw new FS.ErrnoError(29);
            }
          }
          if (length) {
            stream.node.timestamp = Date.now();
          }
          return i;
        } });
        return FS.mkdev(path, mode, dev);
      }, forceLoadFile: function(obj) {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents)
          return true;
        if (typeof XMLHttpRequest !== "undefined") {
          throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        } else if (read_) {
          try {
            obj.contents = intArrayFromString(read_(obj.url), true);
            obj.usedBytes = obj.contents.length;
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
        } else {
          throw new Error("Cannot load without read() or XMLHttpRequest.");
        }
      }, createLazyFile: function(parent, name, url, canRead, canWrite) {
        function LazyUint8Array() {
          this.lengthKnown = false;
          this.chunks = [];
        }
        LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
          if (idx > this.length - 1 || idx < 0) {
            return void 0;
          }
          var chunkOffset = idx % this.chunkSize;
          var chunkNum = idx / this.chunkSize | 0;
          return this.getter(chunkNum)[chunkOffset];
        };
        LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
          this.getter = getter;
        };
        LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
          var xhr = new XMLHttpRequest();
          xhr.open("HEAD", url, false);
          xhr.send(null);
          if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304))
            throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
          var datalength = Number(xhr.getResponseHeader("Content-length"));
          var header;
          var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
          var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
          var chunkSize = 1024 * 1024;
          if (!hasByteServing)
            chunkSize = datalength;
          var doXHR = function(from, to) {
            if (from > to)
              throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
            if (to > datalength - 1)
              throw new Error("only " + datalength + " bytes available! programmer error!");
            var xhr2 = new XMLHttpRequest();
            xhr2.open("GET", url, false);
            if (datalength !== chunkSize)
              xhr2.setRequestHeader("Range", "bytes=" + from + "-" + to);
            if (typeof Uint8Array != "undefined")
              xhr2.responseType = "arraybuffer";
            if (xhr2.overrideMimeType) {
              xhr2.overrideMimeType("text/plain; charset=x-user-defined");
            }
            xhr2.send(null);
            if (!(xhr2.status >= 200 && xhr2.status < 300 || xhr2.status === 304))
              throw new Error("Couldn't load " + url + ". Status: " + xhr2.status);
            if (xhr2.response !== void 0) {
              return new Uint8Array(xhr2.response || []);
            } else {
              return intArrayFromString(xhr2.responseText || "", true);
            }
          };
          var lazyArray2 = this;
          lazyArray2.setDataGetter(function(chunkNum) {
            var start4 = chunkNum * chunkSize;
            var end3 = (chunkNum + 1) * chunkSize - 1;
            end3 = Math.min(end3, datalength - 1);
            if (typeof lazyArray2.chunks[chunkNum] === "undefined") {
              lazyArray2.chunks[chunkNum] = doXHR(start4, end3);
            }
            if (typeof lazyArray2.chunks[chunkNum] === "undefined")
              throw new Error("doXHR failed!");
            return lazyArray2.chunks[chunkNum];
          });
          if (usesGzip || !datalength) {
            chunkSize = datalength = 1;
            datalength = this.getter(0).length;
            chunkSize = datalength;
            out("LazyFiles on gzip forces download of the whole file when length is accessed");
          }
          this._length = datalength;
          this._chunkSize = chunkSize;
          this.lengthKnown = true;
        };
        if (typeof XMLHttpRequest !== "undefined") {
          if (!ENVIRONMENT_IS_WORKER)
            throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
          var lazyArray = new LazyUint8Array();
          Object.defineProperties(lazyArray, { length: { get: function() {
            if (!this.lengthKnown) {
              this.cacheLength();
            }
            return this._length;
          } }, chunkSize: { get: function() {
            if (!this.lengthKnown) {
              this.cacheLength();
            }
            return this._chunkSize;
          } } });
          var properties = { isDevice: false, contents: lazyArray };
        } else {
          var properties = { isDevice: false, url };
        }
        var node = FS.createFile(parent, name, properties, canRead, canWrite);
        if (properties.contents) {
          node.contents = properties.contents;
        } else if (properties.url) {
          node.contents = null;
          node.url = properties.url;
        }
        Object.defineProperties(node, { usedBytes: { get: function() {
          return this.contents.length;
        } } });
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach(function(key2) {
          var fn = node.stream_ops[key2];
          stream_ops[key2] = function forceLoadLazyFile() {
            FS.forceLoadFile(node);
            return fn.apply(null, arguments);
          };
        });
        stream_ops.read = function stream_ops_read(stream, buffer2, offset, length, position) {
          FS.forceLoadFile(node);
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          if (contents.slice) {
            for (var i = 0; i < size; i++) {
              buffer2[offset + i] = contents[position + i];
            }
          } else {
            for (var i = 0; i < size; i++) {
              buffer2[offset + i] = contents.get(position + i);
            }
          }
          return size;
        };
        node.stream_ops = stream_ops;
        return node;
      }, createPreloadedFile: function(parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) {
        Browser.init();
        var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
        var dep = getUniqueRunDependency("cp " + fullname);
        function processData(byteArray) {
          function finish(byteArray2) {
            if (preFinish)
              preFinish();
            if (!dontCreateFile) {
              FS.createDataFile(parent, name, byteArray2, canRead, canWrite, canOwn);
            }
            if (onload)
              onload();
            removeRunDependency(dep);
          }
          var handled = false;
          Module2["preloadPlugins"].forEach(function(plugin) {
            if (handled)
              return;
            if (plugin["canHandle"](fullname)) {
              plugin["handle"](byteArray, fullname, finish, function() {
                if (onerror)
                  onerror();
                removeRunDependency(dep);
              });
              handled = true;
            }
          });
          if (!handled)
            finish(byteArray);
        }
        addRunDependency(dep);
        if (typeof url == "string") {
          asyncLoad(url, function(byteArray) {
            processData(byteArray);
          }, onerror);
        } else {
          processData(url);
        }
      }, indexedDB: function() {
        return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      }, DB_NAME: function() {
        return "EM_FS_" + window.location.pathname;
      }, DB_VERSION: 20, DB_STORE_NAME: "FILE_DATA", saveFilesToDB: function(paths, onload, onerror) {
        onload = onload || function() {
        };
        onerror = onerror || function() {
        };
        var indexedDB2 = FS.indexedDB();
        try {
          var openRequest = indexedDB2.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
          out("creating db");
          var db = openRequest.result;
          db.createObjectStore(FS.DB_STORE_NAME);
        };
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          var transaction = db.transaction([FS.DB_STORE_NAME], "readwrite");
          var files3 = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0)
              onload();
            else
              onerror();
          }
          paths.forEach(function(path) {
            var putRequest = files3.put(FS.analyzePath(path).object.contents, path);
            putRequest.onsuccess = function putRequest_onsuccess() {
              ok++;
              if (ok + fail == total)
                finish();
            };
            putRequest.onerror = function putRequest_onerror() {
              fail++;
              if (ok + fail == total)
                finish();
            };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      }, loadFilesFromDB: function(paths, onload, onerror) {
        onload = onload || function() {
        };
        onerror = onerror || function() {
        };
        var indexedDB2 = FS.indexedDB();
        try {
          var openRequest = indexedDB2.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = onerror;
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          try {
            var transaction = db.transaction([FS.DB_STORE_NAME], "readonly");
          } catch (e) {
            onerror(e);
            return;
          }
          var files3 = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0)
              onload();
            else
              onerror();
          }
          paths.forEach(function(path) {
            var getRequest = files3.get(path);
            getRequest.onsuccess = function getRequest_onsuccess() {
              if (FS.analyzePath(path).exists) {
                FS.unlink(path);
              }
              FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
              ok++;
              if (ok + fail == total)
                finish();
            };
            getRequest.onerror = function getRequest_onerror() {
              fail++;
              if (ok + fail == total)
                finish();
            };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      } };
      var SYSCALLS = { mappings: {}, DEFAULT_POLLMASK: 5, calculateAt: function(dirfd, path, allowEmpty) {
        if (path[0] === "/") {
          return path;
        }
        var dir;
        if (dirfd === -100) {
          dir = FS.cwd();
        } else {
          var dirstream = FS.getStream(dirfd);
          if (!dirstream)
            throw new FS.ErrnoError(8);
          dir = dirstream.path;
        }
        if (path.length == 0) {
          if (!allowEmpty) {
            throw new FS.ErrnoError(44);
          }
          return dir;
        }
        return PATH.join2(dir, path);
      }, doStat: function(func, path, buf) {
        try {
          var stat = func(path);
        } catch (e) {
          if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
            return -54;
          }
          throw e;
        }
        HEAP32[buf >> 2] = stat.dev;
        HEAP32[buf + 4 >> 2] = 0;
        HEAP32[buf + 8 >> 2] = stat.ino;
        HEAP32[buf + 12 >> 2] = stat.mode;
        HEAP32[buf + 16 >> 2] = stat.nlink;
        HEAP32[buf + 20 >> 2] = stat.uid;
        HEAP32[buf + 24 >> 2] = stat.gid;
        HEAP32[buf + 28 >> 2] = stat.rdev;
        HEAP32[buf + 32 >> 2] = 0;
        tempI64 = [stat.size >>> 0, (tempDouble = stat.size, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 40 >> 2] = tempI64[0], HEAP32[buf + 44 >> 2] = tempI64[1];
        HEAP32[buf + 48 >> 2] = 4096;
        HEAP32[buf + 52 >> 2] = stat.blocks;
        HEAP32[buf + 56 >> 2] = stat.atime.getTime() / 1e3 | 0;
        HEAP32[buf + 60 >> 2] = 0;
        HEAP32[buf + 64 >> 2] = stat.mtime.getTime() / 1e3 | 0;
        HEAP32[buf + 68 >> 2] = 0;
        HEAP32[buf + 72 >> 2] = stat.ctime.getTime() / 1e3 | 0;
        HEAP32[buf + 76 >> 2] = 0;
        tempI64 = [stat.ino >>> 0, (tempDouble = stat.ino, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 80 >> 2] = tempI64[0], HEAP32[buf + 84 >> 2] = tempI64[1];
        return 0;
      }, doMsync: function(addr, stream, len, flags, offset) {
        var buffer2 = HEAPU8.slice(addr, addr + len);
        FS.msync(stream, buffer2, offset, len, flags);
      }, doMkdir: function(path, mode) {
        path = PATH.normalize(path);
        if (path[path.length - 1] === "/")
          path = path.substr(0, path.length - 1);
        FS.mkdir(path, mode, 0);
        return 0;
      }, doMknod: function(path, mode, dev) {
        switch (mode & 61440) {
          case 32768:
          case 8192:
          case 24576:
          case 4096:
          case 49152:
            break;
          default:
            return -28;
        }
        FS.mknod(path, mode, dev);
        return 0;
      }, doReadlink: function(path, buf, bufsize) {
        if (bufsize <= 0)
          return -28;
        var ret = FS.readlink(path);
        var len = Math.min(bufsize, lengthBytesUTF8(ret));
        var endChar = HEAP8[buf + len];
        stringToUTF8(ret, buf, bufsize + 1);
        HEAP8[buf + len] = endChar;
        return len;
      }, doAccess: function(path, amode) {
        if (amode & ~7) {
          return -28;
        }
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node) {
          return -44;
        }
        var perms = "";
        if (amode & 4)
          perms += "r";
        if (amode & 2)
          perms += "w";
        if (amode & 1)
          perms += "x";
        if (perms && FS.nodePermissions(node, perms)) {
          return -2;
        }
        return 0;
      }, doDup: function(path, flags, suggestFD) {
        var suggest = FS.getStream(suggestFD);
        if (suggest)
          FS.close(suggest);
        return FS.open(path, flags, 0, suggestFD, suggestFD).fd;
      }, doReadv: function(stream, iov, iovcnt, offset) {
        var ret = 0;
        for (var i = 0; i < iovcnt; i++) {
          var ptr = HEAP32[iov + i * 8 >> 2];
          var len = HEAP32[iov + (i * 8 + 4) >> 2];
          var curr = FS.read(stream, HEAP8, ptr, len, offset);
          if (curr < 0)
            return -1;
          ret += curr;
          if (curr < len)
            break;
        }
        return ret;
      }, doWritev: function(stream, iov, iovcnt, offset) {
        var ret = 0;
        for (var i = 0; i < iovcnt; i++) {
          var ptr = HEAP32[iov + i * 8 >> 2];
          var len = HEAP32[iov + (i * 8 + 4) >> 2];
          var curr = FS.write(stream, HEAP8, ptr, len, offset);
          if (curr < 0)
            return -1;
          ret += curr;
        }
        return ret;
      }, varargs: void 0, get: function() {
        SYSCALLS.varargs += 4;
        var ret = HEAP32[SYSCALLS.varargs - 4 >> 2];
        return ret;
      }, getStr: function(ptr) {
        var ret = UTF8ToString(ptr);
        return ret;
      }, getStreamFromFD: function(fd) {
        var stream = FS.getStream(fd);
        if (!stream)
          throw new FS.ErrnoError(8);
        return stream;
      }, get64: function(low, high) {
        return low;
      } };
      function ___syscall_fcntl64(fd, cmd, varargs) {
        SYSCALLS.varargs = varargs;
        try {
          var stream = SYSCALLS.getStreamFromFD(fd);
          switch (cmd) {
            case 0: {
              var arg = SYSCALLS.get();
              if (arg < 0) {
                return -28;
              }
              var newStream;
              newStream = FS.open(stream.path, stream.flags, 0, arg);
              return newStream.fd;
            }
            case 1:
            case 2:
              return 0;
            case 3:
              return stream.flags;
            case 4: {
              var arg = SYSCALLS.get();
              stream.flags |= arg;
              return 0;
            }
            case 5: {
              var arg = SYSCALLS.get();
              var offset = 0;
              HEAP16[arg + offset >> 1] = 2;
              return 0;
            }
            case 6:
            case 7:
              return 0;
            case 16:
            case 8:
              return -28;
            case 9:
              setErrNo(28);
              return -1;
            default: {
              return -28;
            }
          }
        } catch (e) {
          if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
            throw e;
          return -e.errno;
        }
      }
      function ___syscall_fstat64(fd, buf) {
        try {
          var stream = SYSCALLS.getStreamFromFD(fd);
          return SYSCALLS.doStat(FS.stat, stream.path, buf);
        } catch (e) {
          if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
            throw e;
          return -e.errno;
        }
      }
      function ___syscall_fstatat64(dirfd, path, buf, flags) {
        try {
          path = SYSCALLS.getStr(path);
          var nofollow = flags & 256;
          var allowEmpty = flags & 4096;
          flags = flags & ~4352;
          path = SYSCALLS.calculateAt(dirfd, path, allowEmpty);
          return SYSCALLS.doStat(nofollow ? FS.lstat : FS.stat, path, buf);
        } catch (e) {
          if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
            throw e;
          return -e.errno;
        }
      }
      function ___syscall_ioctl(fd, op, varargs) {
        SYSCALLS.varargs = varargs;
        try {
          var stream = SYSCALLS.getStreamFromFD(fd);
          switch (op) {
            case 21509:
            case 21505: {
              if (!stream.tty)
                return -59;
              return 0;
            }
            case 21510:
            case 21511:
            case 21512:
            case 21506:
            case 21507:
            case 21508: {
              if (!stream.tty)
                return -59;
              return 0;
            }
            case 21519: {
              if (!stream.tty)
                return -59;
              var argp = SYSCALLS.get();
              HEAP32[argp >> 2] = 0;
              return 0;
            }
            case 21520: {
              if (!stream.tty)
                return -59;
              return -28;
            }
            case 21531: {
              var argp = SYSCALLS.get();
              return FS.ioctl(stream, op, argp);
            }
            case 21523: {
              if (!stream.tty)
                return -59;
              return 0;
            }
            case 21524: {
              if (!stream.tty)
                return -59;
              return 0;
            }
            default:
              abort("bad ioctl syscall " + op);
          }
        } catch (e) {
          if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
            throw e;
          return -e.errno;
        }
      }
      function syscallMmap2(addr, len, prot, flags, fd, off) {
        off <<= 12;
        var ptr;
        var allocated = false;
        if ((flags & 16) !== 0 && addr % 65536 !== 0) {
          return -28;
        }
        if ((flags & 32) !== 0) {
          ptr = mmapAlloc(len);
          if (!ptr)
            return -48;
          allocated = true;
        } else {
          var info = FS.getStream(fd);
          if (!info)
            return -8;
          var res = FS.mmap(info, addr, len, off, prot, flags);
          ptr = res.ptr;
          allocated = res.allocated;
        }
        SYSCALLS.mappings[ptr] = { malloc: ptr, len, allocated, fd, prot, flags, offset: off };
        return ptr;
      }
      function ___syscall_mmap2(addr, len, prot, flags, fd, off) {
        try {
          return syscallMmap2(addr, len, prot, flags, fd, off);
        } catch (e) {
          if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
            throw e;
          return -e.errno;
        }
      }
      function syscallMunmap(addr, len) {
        var info = SYSCALLS.mappings[addr];
        if (len === 0 || !info) {
          return -28;
        }
        if (len === info.len) {
          var stream = FS.getStream(info.fd);
          if (stream) {
            if (info.prot & 2) {
              SYSCALLS.doMsync(addr, stream, len, info.flags, info.offset);
            }
            FS.munmap(stream);
          }
          SYSCALLS.mappings[addr] = null;
          if (info.allocated) {
            _free(info.malloc);
          }
        }
        return 0;
      }
      function ___syscall_munmap(addr, len) {
        try {
          return syscallMunmap(addr, len);
        } catch (e) {
          if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
            throw e;
          return -e.errno;
        }
      }
      function ___syscall_open(path, flags, varargs) {
        SYSCALLS.varargs = varargs;
        try {
          var pathname = SYSCALLS.getStr(path);
          var mode = varargs ? SYSCALLS.get() : 0;
          var stream = FS.open(pathname, flags, mode);
          return stream.fd;
        } catch (e) {
          if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
            throw e;
          return -e.errno;
        }
      }
      function ___syscall_stat64(path, buf) {
        try {
          path = SYSCALLS.getStr(path);
          return SYSCALLS.doStat(FS.stat, path, buf);
        } catch (e) {
          if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
            throw e;
          return -e.errno;
        }
      }
      function __embind_register_bigint(primitiveType, name, size, minRange, maxRange) {
      }
      function getShiftFromSize(size) {
        switch (size) {
          case 1:
            return 0;
          case 2:
            return 1;
          case 4:
            return 2;
          case 8:
            return 3;
          default:
            throw new TypeError("Unknown type size: " + size);
        }
      }
      function embind_init_charCodes() {
        var codes = new Array(256);
        for (var i = 0; i < 256; ++i) {
          codes[i] = String.fromCharCode(i);
        }
        embind_charCodes = codes;
      }
      var embind_charCodes = void 0;
      function readLatin1String(ptr) {
        var ret = "";
        var c = ptr;
        while (HEAPU8[c]) {
          ret += embind_charCodes[HEAPU8[c++]];
        }
        return ret;
      }
      var awaitingDependencies = {};
      var registeredTypes = {};
      var typeDependencies = {};
      var char_0 = 48;
      var char_9 = 57;
      function makeLegalFunctionName(name) {
        if (void 0 === name) {
          return "_unknown";
        }
        name = name.replace(/[^a-zA-Z0-9_]/g, "$");
        var f = name.charCodeAt(0);
        if (f >= char_0 && f <= char_9) {
          return "_" + name;
        } else {
          return name;
        }
      }
      function createNamedFunction(name, body) {
        name = makeLegalFunctionName(name);
        return new Function("body", "return function " + name + '() {\n    "use strict";    return body.apply(this, arguments);\n};\n')(body);
      }
      function extendError(baseErrorType, errorName) {
        var errorClass = createNamedFunction(errorName, function(message) {
          this.name = errorName;
          this.message = message;
          var stack = new Error(message).stack;
          if (stack !== void 0) {
            this.stack = this.toString() + "\n" + stack.replace(/^Error(:[^\n]*)?\n/, "");
          }
        });
        errorClass.prototype = Object.create(baseErrorType.prototype);
        errorClass.prototype.constructor = errorClass;
        errorClass.prototype.toString = function() {
          if (this.message === void 0) {
            return this.name;
          } else {
            return this.name + ": " + this.message;
          }
        };
        return errorClass;
      }
      var BindingError = void 0;
      function throwBindingError(message) {
        throw new BindingError(message);
      }
      var InternalError = void 0;
      function throwInternalError(message) {
        throw new InternalError(message);
      }
      function whenDependentTypesAreResolved(myTypes, dependentTypes, getTypeConverters) {
        myTypes.forEach(function(type) {
          typeDependencies[type] = dependentTypes;
        });
        function onComplete(typeConverters2) {
          var myTypeConverters = getTypeConverters(typeConverters2);
          if (myTypeConverters.length !== myTypes.length) {
            throwInternalError("Mismatched type converter count");
          }
          for (var i = 0; i < myTypes.length; ++i) {
            registerType(myTypes[i], myTypeConverters[i]);
          }
        }
        var typeConverters = new Array(dependentTypes.length);
        var unregisteredTypes = [];
        var registered = 0;
        dependentTypes.forEach(function(dt, i) {
          if (registeredTypes.hasOwnProperty(dt)) {
            typeConverters[i] = registeredTypes[dt];
          } else {
            unregisteredTypes.push(dt);
            if (!awaitingDependencies.hasOwnProperty(dt)) {
              awaitingDependencies[dt] = [];
            }
            awaitingDependencies[dt].push(function() {
              typeConverters[i] = registeredTypes[dt];
              ++registered;
              if (registered === unregisteredTypes.length) {
                onComplete(typeConverters);
              }
            });
          }
        });
        if (0 === unregisteredTypes.length) {
          onComplete(typeConverters);
        }
      }
      function registerType(rawType, registeredInstance, options) {
        options = options || {};
        if (!("argPackAdvance" in registeredInstance)) {
          throw new TypeError("registerType registeredInstance requires argPackAdvance");
        }
        var name = registeredInstance.name;
        if (!rawType) {
          throwBindingError('type "' + name + '" must have a positive integer typeid pointer');
        }
        if (registeredTypes.hasOwnProperty(rawType)) {
          if (options.ignoreDuplicateRegistrations) {
            return;
          } else {
            throwBindingError("Cannot register type '" + name + "' twice");
          }
        }
        registeredTypes[rawType] = registeredInstance;
        delete typeDependencies[rawType];
        if (awaitingDependencies.hasOwnProperty(rawType)) {
          var callbacks = awaitingDependencies[rawType];
          delete awaitingDependencies[rawType];
          callbacks.forEach(function(cb) {
            cb();
          });
        }
      }
      function __embind_register_bool(rawType, name, size, trueValue, falseValue) {
        var shift = getShiftFromSize(size);
        name = readLatin1String(name);
        registerType(rawType, { name, "fromWireType": function(wt) {
          return !!wt;
        }, "toWireType": function(destructors, o) {
          return o ? trueValue : falseValue;
        }, "argPackAdvance": 8, "readValueFromPointer": function(pointer) {
          var heap;
          if (size === 1) {
            heap = HEAP8;
          } else if (size === 2) {
            heap = HEAP16;
          } else if (size === 4) {
            heap = HEAP32;
          } else {
            throw new TypeError("Unknown boolean type size: " + name);
          }
          return this["fromWireType"](heap[pointer >> shift]);
        }, destructorFunction: null });
      }
      function ClassHandle_isAliasOf(other) {
        if (!(this instanceof ClassHandle)) {
          return false;
        }
        if (!(other instanceof ClassHandle)) {
          return false;
        }
        var leftClass = this.$$.ptrType.registeredClass;
        var left = this.$$.ptr;
        var rightClass = other.$$.ptrType.registeredClass;
        var right = other.$$.ptr;
        while (leftClass.baseClass) {
          left = leftClass.upcast(left);
          leftClass = leftClass.baseClass;
        }
        while (rightClass.baseClass) {
          right = rightClass.upcast(right);
          rightClass = rightClass.baseClass;
        }
        return leftClass === rightClass && left === right;
      }
      function shallowCopyInternalPointer(o) {
        return { count: o.count, deleteScheduled: o.deleteScheduled, preservePointerOnDelete: o.preservePointerOnDelete, ptr: o.ptr, ptrType: o.ptrType, smartPtr: o.smartPtr, smartPtrType: o.smartPtrType };
      }
      function throwInstanceAlreadyDeleted(obj) {
        function getInstanceTypeName(handle) {
          return handle.$$.ptrType.registeredClass.name;
        }
        throwBindingError(getInstanceTypeName(obj) + " instance already deleted");
      }
      var finalizationGroup = false;
      function detachFinalizer(handle) {
      }
      function runDestructor($$) {
        if ($$.smartPtr) {
          $$.smartPtrType.rawDestructor($$.smartPtr);
        } else {
          $$.ptrType.registeredClass.rawDestructor($$.ptr);
        }
      }
      function releaseClassHandle($$) {
        $$.count.value -= 1;
        var toDelete = 0 === $$.count.value;
        if (toDelete) {
          runDestructor($$);
        }
      }
      function attachFinalizer(handle) {
        if ("undefined" === typeof FinalizationGroup) {
          attachFinalizer = function(handle2) {
            return handle2;
          };
          return handle;
        }
        finalizationGroup = new FinalizationGroup(function(iter) {
          for (var result = iter.next(); !result.done; result = iter.next()) {
            var $$ = result.value;
            if (!$$.ptr) {
              console.warn("object already deleted: " + $$.ptr);
            } else {
              releaseClassHandle($$);
            }
          }
        });
        attachFinalizer = function(handle2) {
          finalizationGroup.register(handle2, handle2.$$, handle2.$$);
          return handle2;
        };
        detachFinalizer = function(handle2) {
          finalizationGroup.unregister(handle2.$$);
        };
        return attachFinalizer(handle);
      }
      function ClassHandle_clone() {
        if (!this.$$.ptr) {
          throwInstanceAlreadyDeleted(this);
        }
        if (this.$$.preservePointerOnDelete) {
          this.$$.count.value += 1;
          return this;
        } else {
          var clone = attachFinalizer(Object.create(Object.getPrototypeOf(this), { $$: { value: shallowCopyInternalPointer(this.$$) } }));
          clone.$$.count.value += 1;
          clone.$$.deleteScheduled = false;
          return clone;
        }
      }
      function ClassHandle_delete() {
        if (!this.$$.ptr) {
          throwInstanceAlreadyDeleted(this);
        }
        if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
          throwBindingError("Object already scheduled for deletion");
        }
        detachFinalizer(this);
        releaseClassHandle(this.$$);
        if (!this.$$.preservePointerOnDelete) {
          this.$$.smartPtr = void 0;
          this.$$.ptr = void 0;
        }
      }
      function ClassHandle_isDeleted() {
        return !this.$$.ptr;
      }
      var delayFunction = void 0;
      var deletionQueue = [];
      function flushPendingDeletes() {
        while (deletionQueue.length) {
          var obj = deletionQueue.pop();
          obj.$$.deleteScheduled = false;
          obj["delete"]();
        }
      }
      function ClassHandle_deleteLater() {
        if (!this.$$.ptr) {
          throwInstanceAlreadyDeleted(this);
        }
        if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
          throwBindingError("Object already scheduled for deletion");
        }
        deletionQueue.push(this);
        if (deletionQueue.length === 1 && delayFunction) {
          delayFunction(flushPendingDeletes);
        }
        this.$$.deleteScheduled = true;
        return this;
      }
      function init_ClassHandle() {
        ClassHandle.prototype["isAliasOf"] = ClassHandle_isAliasOf;
        ClassHandle.prototype["clone"] = ClassHandle_clone;
        ClassHandle.prototype["delete"] = ClassHandle_delete;
        ClassHandle.prototype["isDeleted"] = ClassHandle_isDeleted;
        ClassHandle.prototype["deleteLater"] = ClassHandle_deleteLater;
      }
      function ClassHandle() {
      }
      var registeredPointers = {};
      function ensureOverloadTable(proto, methodName, humanName) {
        if (void 0 === proto[methodName].overloadTable) {
          var prevFunc = proto[methodName];
          proto[methodName] = function() {
            if (!proto[methodName].overloadTable.hasOwnProperty(arguments.length)) {
              throwBindingError("Function '" + humanName + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + proto[methodName].overloadTable + ")!");
            }
            return proto[methodName].overloadTable[arguments.length].apply(this, arguments);
          };
          proto[methodName].overloadTable = [];
          proto[methodName].overloadTable[prevFunc.argCount] = prevFunc;
        }
      }
      function exposePublicSymbol(name, value, numArguments) {
        if (Module2.hasOwnProperty(name)) {
          if (void 0 === numArguments || void 0 !== Module2[name].overloadTable && void 0 !== Module2[name].overloadTable[numArguments]) {
            throwBindingError("Cannot register public name '" + name + "' twice");
          }
          ensureOverloadTable(Module2, name, name);
          if (Module2.hasOwnProperty(numArguments)) {
            throwBindingError("Cannot register multiple overloads of a function with the same number of arguments (" + numArguments + ")!");
          }
          Module2[name].overloadTable[numArguments] = value;
        } else {
          Module2[name] = value;
          if (void 0 !== numArguments) {
            Module2[name].numArguments = numArguments;
          }
        }
      }
      function RegisteredClass(name, constructor, instancePrototype, rawDestructor, baseClass, getActualType, upcast, downcast) {
        this.name = name;
        this.constructor = constructor;
        this.instancePrototype = instancePrototype;
        this.rawDestructor = rawDestructor;
        this.baseClass = baseClass;
        this.getActualType = getActualType;
        this.upcast = upcast;
        this.downcast = downcast;
        this.pureVirtualFunctions = [];
      }
      function upcastPointer(ptr, ptrClass, desiredClass) {
        while (ptrClass !== desiredClass) {
          if (!ptrClass.upcast) {
            throwBindingError("Expected null or instance of " + desiredClass.name + ", got an instance of " + ptrClass.name);
          }
          ptr = ptrClass.upcast(ptr);
          ptrClass = ptrClass.baseClass;
        }
        return ptr;
      }
      function constNoSmartPtrRawPointerToWireType(destructors, handle) {
        if (handle === null) {
          if (this.isReference) {
            throwBindingError("null is not a valid " + this.name);
          }
          return 0;
        }
        if (!handle.$$) {
          throwBindingError('Cannot pass "' + _embind_repr(handle) + '" as a ' + this.name);
        }
        if (!handle.$$.ptr) {
          throwBindingError("Cannot pass deleted object as a pointer of type " + this.name);
        }
        var handleClass = handle.$$.ptrType.registeredClass;
        var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
        return ptr;
      }
      function genericPointerToWireType(destructors, handle) {
        var ptr;
        if (handle === null) {
          if (this.isReference) {
            throwBindingError("null is not a valid " + this.name);
          }
          if (this.isSmartPointer) {
            ptr = this.rawConstructor();
            if (destructors !== null) {
              destructors.push(this.rawDestructor, ptr);
            }
            return ptr;
          } else {
            return 0;
          }
        }
        if (!handle.$$) {
          throwBindingError('Cannot pass "' + _embind_repr(handle) + '" as a ' + this.name);
        }
        if (!handle.$$.ptr) {
          throwBindingError("Cannot pass deleted object as a pointer of type " + this.name);
        }
        if (!this.isConst && handle.$$.ptrType.isConst) {
          throwBindingError("Cannot convert argument of type " + (handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name) + " to parameter type " + this.name);
        }
        var handleClass = handle.$$.ptrType.registeredClass;
        ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
        if (this.isSmartPointer) {
          if (void 0 === handle.$$.smartPtr) {
            throwBindingError("Passing raw pointer to smart pointer is illegal");
          }
          switch (this.sharingPolicy) {
            case 0:
              if (handle.$$.smartPtrType === this) {
                ptr = handle.$$.smartPtr;
              } else {
                throwBindingError("Cannot convert argument of type " + (handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name) + " to parameter type " + this.name);
              }
              break;
            case 1:
              ptr = handle.$$.smartPtr;
              break;
            case 2:
              if (handle.$$.smartPtrType === this) {
                ptr = handle.$$.smartPtr;
              } else {
                var clonedHandle = handle["clone"]();
                ptr = this.rawShare(ptr, Emval.toHandle(function() {
                  clonedHandle["delete"]();
                }));
                if (destructors !== null) {
                  destructors.push(this.rawDestructor, ptr);
                }
              }
              break;
            default:
              throwBindingError("Unsupporting sharing policy");
          }
        }
        return ptr;
      }
      function nonConstNoSmartPtrRawPointerToWireType(destructors, handle) {
        if (handle === null) {
          if (this.isReference) {
            throwBindingError("null is not a valid " + this.name);
          }
          return 0;
        }
        if (!handle.$$) {
          throwBindingError('Cannot pass "' + _embind_repr(handle) + '" as a ' + this.name);
        }
        if (!handle.$$.ptr) {
          throwBindingError("Cannot pass deleted object as a pointer of type " + this.name);
        }
        if (handle.$$.ptrType.isConst) {
          throwBindingError("Cannot convert argument of type " + handle.$$.ptrType.name + " to parameter type " + this.name);
        }
        var handleClass = handle.$$.ptrType.registeredClass;
        var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
        return ptr;
      }
      function simpleReadValueFromPointer(pointer) {
        return this["fromWireType"](HEAPU32[pointer >> 2]);
      }
      function RegisteredPointer_getPointee(ptr) {
        if (this.rawGetPointee) {
          ptr = this.rawGetPointee(ptr);
        }
        return ptr;
      }
      function RegisteredPointer_destructor(ptr) {
        if (this.rawDestructor) {
          this.rawDestructor(ptr);
        }
      }
      function RegisteredPointer_deleteObject(handle) {
        if (handle !== null) {
          handle["delete"]();
        }
      }
      function downcastPointer(ptr, ptrClass, desiredClass) {
        if (ptrClass === desiredClass) {
          return ptr;
        }
        if (void 0 === desiredClass.baseClass) {
          return null;
        }
        var rv = downcastPointer(ptr, ptrClass, desiredClass.baseClass);
        if (rv === null) {
          return null;
        }
        return desiredClass.downcast(rv);
      }
      function getInheritedInstanceCount() {
        return Object.keys(registeredInstances).length;
      }
      function getLiveInheritedInstances() {
        var rv = [];
        for (var k in registeredInstances) {
          if (registeredInstances.hasOwnProperty(k)) {
            rv.push(registeredInstances[k]);
          }
        }
        return rv;
      }
      function setDelayFunction(fn) {
        delayFunction = fn;
        if (deletionQueue.length && delayFunction) {
          delayFunction(flushPendingDeletes);
        }
      }
      function init_embind() {
        Module2["getInheritedInstanceCount"] = getInheritedInstanceCount;
        Module2["getLiveInheritedInstances"] = getLiveInheritedInstances;
        Module2["flushPendingDeletes"] = flushPendingDeletes;
        Module2["setDelayFunction"] = setDelayFunction;
      }
      var registeredInstances = {};
      function getBasestPointer(class_, ptr) {
        if (ptr === void 0) {
          throwBindingError("ptr should not be undefined");
        }
        while (class_.baseClass) {
          ptr = class_.upcast(ptr);
          class_ = class_.baseClass;
        }
        return ptr;
      }
      function getInheritedInstance(class_, ptr) {
        ptr = getBasestPointer(class_, ptr);
        return registeredInstances[ptr];
      }
      function makeClassHandle(prototype, record) {
        if (!record.ptrType || !record.ptr) {
          throwInternalError("makeClassHandle requires ptr and ptrType");
        }
        var hasSmartPtrType = !!record.smartPtrType;
        var hasSmartPtr = !!record.smartPtr;
        if (hasSmartPtrType !== hasSmartPtr) {
          throwInternalError("Both smartPtrType and smartPtr must be specified");
        }
        record.count = { value: 1 };
        return attachFinalizer(Object.create(prototype, { $$: { value: record } }));
      }
      function RegisteredPointer_fromWireType(ptr) {
        var rawPointer = this.getPointee(ptr);
        if (!rawPointer) {
          this.destructor(ptr);
          return null;
        }
        var registeredInstance = getInheritedInstance(this.registeredClass, rawPointer);
        if (void 0 !== registeredInstance) {
          if (0 === registeredInstance.$$.count.value) {
            registeredInstance.$$.ptr = rawPointer;
            registeredInstance.$$.smartPtr = ptr;
            return registeredInstance["clone"]();
          } else {
            var rv = registeredInstance["clone"]();
            this.destructor(ptr);
            return rv;
          }
        }
        function makeDefaultHandle() {
          if (this.isSmartPointer) {
            return makeClassHandle(this.registeredClass.instancePrototype, { ptrType: this.pointeeType, ptr: rawPointer, smartPtrType: this, smartPtr: ptr });
          } else {
            return makeClassHandle(this.registeredClass.instancePrototype, { ptrType: this, ptr });
          }
        }
        var actualType = this.registeredClass.getActualType(rawPointer);
        var registeredPointerRecord = registeredPointers[actualType];
        if (!registeredPointerRecord) {
          return makeDefaultHandle.call(this);
        }
        var toType;
        if (this.isConst) {
          toType = registeredPointerRecord.constPointerType;
        } else {
          toType = registeredPointerRecord.pointerType;
        }
        var dp = downcastPointer(rawPointer, this.registeredClass, toType.registeredClass);
        if (dp === null) {
          return makeDefaultHandle.call(this);
        }
        if (this.isSmartPointer) {
          return makeClassHandle(toType.registeredClass.instancePrototype, { ptrType: toType, ptr: dp, smartPtrType: this, smartPtr: ptr });
        } else {
          return makeClassHandle(toType.registeredClass.instancePrototype, { ptrType: toType, ptr: dp });
        }
      }
      function init_RegisteredPointer() {
        RegisteredPointer.prototype.getPointee = RegisteredPointer_getPointee;
        RegisteredPointer.prototype.destructor = RegisteredPointer_destructor;
        RegisteredPointer.prototype["argPackAdvance"] = 8;
        RegisteredPointer.prototype["readValueFromPointer"] = simpleReadValueFromPointer;
        RegisteredPointer.prototype["deleteObject"] = RegisteredPointer_deleteObject;
        RegisteredPointer.prototype["fromWireType"] = RegisteredPointer_fromWireType;
      }
      function RegisteredPointer(name, registeredClass, isReference, isConst, isSmartPointer, pointeeType, sharingPolicy, rawGetPointee, rawConstructor, rawShare, rawDestructor) {
        this.name = name;
        this.registeredClass = registeredClass;
        this.isReference = isReference;
        this.isConst = isConst;
        this.isSmartPointer = isSmartPointer;
        this.pointeeType = pointeeType;
        this.sharingPolicy = sharingPolicy;
        this.rawGetPointee = rawGetPointee;
        this.rawConstructor = rawConstructor;
        this.rawShare = rawShare;
        this.rawDestructor = rawDestructor;
        if (!isSmartPointer && registeredClass.baseClass === void 0) {
          if (isConst) {
            this["toWireType"] = constNoSmartPtrRawPointerToWireType;
            this.destructorFunction = null;
          } else {
            this["toWireType"] = nonConstNoSmartPtrRawPointerToWireType;
            this.destructorFunction = null;
          }
        } else {
          this["toWireType"] = genericPointerToWireType;
        }
      }
      function replacePublicSymbol(name, value, numArguments) {
        if (!Module2.hasOwnProperty(name)) {
          throwInternalError("Replacing nonexistant public symbol");
        }
        if (void 0 !== Module2[name].overloadTable && void 0 !== numArguments) {
          Module2[name].overloadTable[numArguments] = value;
        } else {
          Module2[name] = value;
          Module2[name].argCount = numArguments;
        }
      }
      function dynCallLegacy(sig, ptr, args) {
        var f = Module2["dynCall_" + sig];
        return args && args.length ? f.apply(null, [ptr].concat(args)) : f.call(null, ptr);
      }
      function dynCall(sig, ptr, args) {
        if (sig.includes("j")) {
          return dynCallLegacy(sig, ptr, args);
        }
        return getWasmTableEntry(ptr).apply(null, args);
      }
      function getDynCaller(sig, ptr) {
        var argCache = [];
        return function() {
          argCache.length = arguments.length;
          for (var i = 0; i < arguments.length; i++) {
            argCache[i] = arguments[i];
          }
          return dynCall(sig, ptr, argCache);
        };
      }
      function embind__requireFunction(signature, rawFunction) {
        signature = readLatin1String(signature);
        function makeDynCaller() {
          if (signature.includes("j")) {
            return getDynCaller(signature, rawFunction);
          }
          return getWasmTableEntry(rawFunction);
        }
        var fp = makeDynCaller();
        if (typeof fp !== "function") {
          throwBindingError("unknown function pointer with signature " + signature + ": " + rawFunction);
        }
        return fp;
      }
      var UnboundTypeError = void 0;
      function getTypeName(type) {
        var ptr = ___getTypeName(type);
        var rv = readLatin1String(ptr);
        _free(ptr);
        return rv;
      }
      function throwUnboundTypeError(message, types) {
        var unboundTypes = [];
        var seen = {};
        function visit(type) {
          if (seen[type]) {
            return;
          }
          if (registeredTypes[type]) {
            return;
          }
          if (typeDependencies[type]) {
            typeDependencies[type].forEach(visit);
            return;
          }
          unboundTypes.push(type);
          seen[type] = true;
        }
        types.forEach(visit);
        throw new UnboundTypeError(message + ": " + unboundTypes.map(getTypeName).join([", "]));
      }
      function __embind_register_class(rawType, rawPointerType, rawConstPointerType, baseClassRawType, getActualTypeSignature, getActualType, upcastSignature, upcast, downcastSignature, downcast, name, destructorSignature, rawDestructor) {
        name = readLatin1String(name);
        getActualType = embind__requireFunction(getActualTypeSignature, getActualType);
        if (upcast) {
          upcast = embind__requireFunction(upcastSignature, upcast);
        }
        if (downcast) {
          downcast = embind__requireFunction(downcastSignature, downcast);
        }
        rawDestructor = embind__requireFunction(destructorSignature, rawDestructor);
        var legalFunctionName = makeLegalFunctionName(name);
        exposePublicSymbol(legalFunctionName, function() {
          throwUnboundTypeError("Cannot construct " + name + " due to unbound types", [baseClassRawType]);
        });
        whenDependentTypesAreResolved([rawType, rawPointerType, rawConstPointerType], baseClassRawType ? [baseClassRawType] : [], function(base) {
          base = base[0];
          var baseClass;
          var basePrototype;
          if (baseClassRawType) {
            baseClass = base.registeredClass;
            basePrototype = baseClass.instancePrototype;
          } else {
            basePrototype = ClassHandle.prototype;
          }
          var constructor = createNamedFunction(legalFunctionName, function() {
            if (Object.getPrototypeOf(this) !== instancePrototype) {
              throw new BindingError("Use 'new' to construct " + name);
            }
            if (void 0 === registeredClass.constructor_body) {
              throw new BindingError(name + " has no accessible constructor");
            }
            var body = registeredClass.constructor_body[arguments.length];
            if (void 0 === body) {
              throw new BindingError("Tried to invoke ctor of " + name + " with invalid number of parameters (" + arguments.length + ") - expected (" + Object.keys(registeredClass.constructor_body).toString() + ") parameters instead!");
            }
            return body.apply(this, arguments);
          });
          var instancePrototype = Object.create(basePrototype, { constructor: { value: constructor } });
          constructor.prototype = instancePrototype;
          var registeredClass = new RegisteredClass(name, constructor, instancePrototype, rawDestructor, baseClass, getActualType, upcast, downcast);
          var referenceConverter = new RegisteredPointer(name, registeredClass, true, false, false);
          var pointerConverter = new RegisteredPointer(name + "*", registeredClass, false, false, false);
          var constPointerConverter = new RegisteredPointer(name + " const*", registeredClass, false, true, false);
          registeredPointers[rawType] = { pointerType: pointerConverter, constPointerType: constPointerConverter };
          replacePublicSymbol(legalFunctionName, constructor);
          return [referenceConverter, pointerConverter, constPointerConverter];
        });
      }
      function heap32VectorToArray(count, firstElement) {
        var array2 = [];
        for (var i = 0; i < count; i++) {
          array2.push(HEAP32[(firstElement >> 2) + i]);
        }
        return array2;
      }
      function runDestructors(destructors) {
        while (destructors.length) {
          var ptr = destructors.pop();
          var del2 = destructors.pop();
          del2(ptr);
        }
      }
      function __embind_register_class_constructor(rawClassType, argCount, rawArgTypesAddr, invokerSignature, invoker, rawConstructor) {
        assert(argCount > 0);
        var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
        invoker = embind__requireFunction(invokerSignature, invoker);
        whenDependentTypesAreResolved([], [rawClassType], function(classType) {
          classType = classType[0];
          var humanName = "constructor " + classType.name;
          if (void 0 === classType.registeredClass.constructor_body) {
            classType.registeredClass.constructor_body = [];
          }
          if (void 0 !== classType.registeredClass.constructor_body[argCount - 1]) {
            throw new BindingError("Cannot register multiple constructors with identical number of parameters (" + (argCount - 1) + ") for class '" + classType.name + "'! Overload resolution is currently only performed using the parameter count, not actual type info!");
          }
          classType.registeredClass.constructor_body[argCount - 1] = function unboundTypeHandler() {
            throwUnboundTypeError("Cannot construct " + classType.name + " due to unbound types", rawArgTypes);
          };
          whenDependentTypesAreResolved([], rawArgTypes, function(argTypes) {
            argTypes.splice(1, 0, null);
            classType.registeredClass.constructor_body[argCount - 1] = craftInvokerFunction(humanName, argTypes, null, invoker, rawConstructor);
            return [];
          });
          return [];
        });
      }
      function new_(constructor, argumentList) {
        if (!(constructor instanceof Function)) {
          throw new TypeError("new_ called with constructor type " + typeof constructor + " which is not a function");
        }
        var dummy = createNamedFunction(constructor.name || "unknownFunctionName", function() {
        });
        dummy.prototype = constructor.prototype;
        var obj = new dummy();
        var r = constructor.apply(obj, argumentList);
        return r instanceof Object ? r : obj;
      }
      function craftInvokerFunction(humanName, argTypes, classType, cppInvokerFunc, cppTargetFunc) {
        var argCount = argTypes.length;
        if (argCount < 2) {
          throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!");
        }
        var isClassMethodFunc = argTypes[1] !== null && classType !== null;
        var needsDestructorStack = false;
        for (var i = 1; i < argTypes.length; ++i) {
          if (argTypes[i] !== null && argTypes[i].destructorFunction === void 0) {
            needsDestructorStack = true;
            break;
          }
        }
        var returns = argTypes[0].name !== "void";
        var argsList = "";
        var argsListWired = "";
        for (var i = 0; i < argCount - 2; ++i) {
          argsList += (i !== 0 ? ", " : "") + "arg" + i;
          argsListWired += (i !== 0 ? ", " : "") + "arg" + i + "Wired";
        }
        var invokerFnBody = "return function " + makeLegalFunctionName(humanName) + "(" + argsList + ") {\nif (arguments.length !== " + (argCount - 2) + ") {\nthrowBindingError('function " + humanName + " called with ' + arguments.length + ' arguments, expected " + (argCount - 2) + " args!');\n}\n";
        if (needsDestructorStack) {
          invokerFnBody += "var destructors = [];\n";
        }
        var dtorStack = needsDestructorStack ? "destructors" : "null";
        var args1 = ["throwBindingError", "invoker", "fn", "runDestructors", "retType", "classParam"];
        var args2 = [throwBindingError, cppInvokerFunc, cppTargetFunc, runDestructors, argTypes[0], argTypes[1]];
        if (isClassMethodFunc) {
          invokerFnBody += "var thisWired = classParam.toWireType(" + dtorStack + ", this);\n";
        }
        for (var i = 0; i < argCount - 2; ++i) {
          invokerFnBody += "var arg" + i + "Wired = argType" + i + ".toWireType(" + dtorStack + ", arg" + i + "); // " + argTypes[i + 2].name + "\n";
          args1.push("argType" + i);
          args2.push(argTypes[i + 2]);
        }
        if (isClassMethodFunc) {
          argsListWired = "thisWired" + (argsListWired.length > 0 ? ", " : "") + argsListWired;
        }
        invokerFnBody += (returns ? "var rv = " : "") + "invoker(fn" + (argsListWired.length > 0 ? ", " : "") + argsListWired + ");\n";
        if (needsDestructorStack) {
          invokerFnBody += "runDestructors(destructors);\n";
        } else {
          for (var i = isClassMethodFunc ? 1 : 2; i < argTypes.length; ++i) {
            var paramName = i === 1 ? "thisWired" : "arg" + (i - 2) + "Wired";
            if (argTypes[i].destructorFunction !== null) {
              invokerFnBody += paramName + "_dtor(" + paramName + "); // " + argTypes[i].name + "\n";
              args1.push(paramName + "_dtor");
              args2.push(argTypes[i].destructorFunction);
            }
          }
        }
        if (returns) {
          invokerFnBody += "var ret = retType.fromWireType(rv);\nreturn ret;\n";
        } else {
        }
        invokerFnBody += "}\n";
        args1.push(invokerFnBody);
        var invokerFunction = new_(Function, args1).apply(null, args2);
        return invokerFunction;
      }
      function __embind_register_class_function(rawClassType, methodName, argCount, rawArgTypesAddr, invokerSignature, rawInvoker, context, isPureVirtual) {
        var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
        methodName = readLatin1String(methodName);
        rawInvoker = embind__requireFunction(invokerSignature, rawInvoker);
        whenDependentTypesAreResolved([], [rawClassType], function(classType) {
          classType = classType[0];
          var humanName = classType.name + "." + methodName;
          if (methodName.startsWith("@@")) {
            methodName = Symbol[methodName.substring(2)];
          }
          if (isPureVirtual) {
            classType.registeredClass.pureVirtualFunctions.push(methodName);
          }
          function unboundTypesHandler() {
            throwUnboundTypeError("Cannot call " + humanName + " due to unbound types", rawArgTypes);
          }
          var proto = classType.registeredClass.instancePrototype;
          var method = proto[methodName];
          if (void 0 === method || void 0 === method.overloadTable && method.className !== classType.name && method.argCount === argCount - 2) {
            unboundTypesHandler.argCount = argCount - 2;
            unboundTypesHandler.className = classType.name;
            proto[methodName] = unboundTypesHandler;
          } else {
            ensureOverloadTable(proto, methodName, humanName);
            proto[methodName].overloadTable[argCount - 2] = unboundTypesHandler;
          }
          whenDependentTypesAreResolved([], rawArgTypes, function(argTypes) {
            var memberFunction = craftInvokerFunction(humanName, argTypes, classType, rawInvoker, context);
            if (void 0 === proto[methodName].overloadTable) {
              memberFunction.argCount = argCount - 2;
              proto[methodName] = memberFunction;
            } else {
              proto[methodName].overloadTable[argCount - 2] = memberFunction;
            }
            return [];
          });
          return [];
        });
      }
      var emval_free_list = [];
      var emval_handle_array = [{}, { value: void 0 }, { value: null }, { value: true }, { value: false }];
      function __emval_decref(handle) {
        if (handle > 4 && 0 === --emval_handle_array[handle].refcount) {
          emval_handle_array[handle] = void 0;
          emval_free_list.push(handle);
        }
      }
      function count_emval_handles() {
        var count = 0;
        for (var i = 5; i < emval_handle_array.length; ++i) {
          if (emval_handle_array[i] !== void 0) {
            ++count;
          }
        }
        return count;
      }
      function get_first_emval() {
        for (var i = 5; i < emval_handle_array.length; ++i) {
          if (emval_handle_array[i] !== void 0) {
            return emval_handle_array[i];
          }
        }
        return null;
      }
      function init_emval() {
        Module2["count_emval_handles"] = count_emval_handles;
        Module2["get_first_emval"] = get_first_emval;
      }
      var Emval = { toValue: function(handle) {
        if (!handle) {
          throwBindingError("Cannot use deleted val. handle = " + handle);
        }
        return emval_handle_array[handle].value;
      }, toHandle: function(value) {
        switch (value) {
          case void 0: {
            return 1;
          }
          case null: {
            return 2;
          }
          case true: {
            return 3;
          }
          case false: {
            return 4;
          }
          default: {
            var handle = emval_free_list.length ? emval_free_list.pop() : emval_handle_array.length;
            emval_handle_array[handle] = { refcount: 1, value };
            return handle;
          }
        }
      } };
      function __embind_register_emval(rawType, name) {
        name = readLatin1String(name);
        registerType(rawType, { name, "fromWireType": function(handle) {
          var rv = Emval.toValue(handle);
          __emval_decref(handle);
          return rv;
        }, "toWireType": function(destructors, value) {
          return Emval.toHandle(value);
        }, "argPackAdvance": 8, "readValueFromPointer": simpleReadValueFromPointer, destructorFunction: null });
      }
      function enumReadValueFromPointer(name, shift, signed) {
        switch (shift) {
          case 0:
            return function(pointer) {
              var heap = signed ? HEAP8 : HEAPU8;
              return this["fromWireType"](heap[pointer]);
            };
          case 1:
            return function(pointer) {
              var heap = signed ? HEAP16 : HEAPU16;
              return this["fromWireType"](heap[pointer >> 1]);
            };
          case 2:
            return function(pointer) {
              var heap = signed ? HEAP32 : HEAPU32;
              return this["fromWireType"](heap[pointer >> 2]);
            };
          default:
            throw new TypeError("Unknown integer type: " + name);
        }
      }
      function __embind_register_enum(rawType, name, size, isSigned) {
        var shift = getShiftFromSize(size);
        name = readLatin1String(name);
        function ctor() {
        }
        ctor.values = {};
        registerType(rawType, { name, constructor: ctor, "fromWireType": function(c) {
          return this.constructor.values[c];
        }, "toWireType": function(destructors, c) {
          return c.value;
        }, "argPackAdvance": 8, "readValueFromPointer": enumReadValueFromPointer(name, shift, isSigned), destructorFunction: null });
        exposePublicSymbol(name, ctor);
      }
      function requireRegisteredType(rawType, humanName) {
        var impl = registeredTypes[rawType];
        if (void 0 === impl) {
          throwBindingError(humanName + " has unknown type " + getTypeName(rawType));
        }
        return impl;
      }
      function __embind_register_enum_value(rawEnumType, name, enumValue) {
        var enumType = requireRegisteredType(rawEnumType, "enum");
        name = readLatin1String(name);
        var Enum = enumType.constructor;
        var Value = Object.create(enumType.constructor.prototype, { value: { value: enumValue }, constructor: { value: createNamedFunction(enumType.name + "_" + name, function() {
        }) } });
        Enum.values[enumValue] = Value;
        Enum[name] = Value;
      }
      function _embind_repr(v) {
        if (v === null) {
          return "null";
        }
        var t = typeof v;
        if (t === "object" || t === "array" || t === "function") {
          return v.toString();
        } else {
          return "" + v;
        }
      }
      function floatReadValueFromPointer(name, shift) {
        switch (shift) {
          case 2:
            return function(pointer) {
              return this["fromWireType"](HEAPF32[pointer >> 2]);
            };
          case 3:
            return function(pointer) {
              return this["fromWireType"](HEAPF64[pointer >> 3]);
            };
          default:
            throw new TypeError("Unknown float type: " + name);
        }
      }
      function __embind_register_float(rawType, name, size) {
        var shift = getShiftFromSize(size);
        name = readLatin1String(name);
        registerType(rawType, { name, "fromWireType": function(value) {
          return value;
        }, "toWireType": function(destructors, value) {
          return value;
        }, "argPackAdvance": 8, "readValueFromPointer": floatReadValueFromPointer(name, shift), destructorFunction: null });
      }
      function __embind_register_function(name, argCount, rawArgTypesAddr, signature, rawInvoker, fn) {
        var argTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
        name = readLatin1String(name);
        rawInvoker = embind__requireFunction(signature, rawInvoker);
        exposePublicSymbol(name, function() {
          throwUnboundTypeError("Cannot call " + name + " due to unbound types", argTypes);
        }, argCount - 1);
        whenDependentTypesAreResolved([], argTypes, function(argTypes2) {
          var invokerArgsArray = [argTypes2[0], null].concat(argTypes2.slice(1));
          replacePublicSymbol(name, craftInvokerFunction(name, invokerArgsArray, null, rawInvoker, fn), argCount - 1);
          return [];
        });
      }
      function integerReadValueFromPointer(name, shift, signed) {
        switch (shift) {
          case 0:
            return signed ? function readS8FromPointer(pointer) {
              return HEAP8[pointer];
            } : function readU8FromPointer(pointer) {
              return HEAPU8[pointer];
            };
          case 1:
            return signed ? function readS16FromPointer(pointer) {
              return HEAP16[pointer >> 1];
            } : function readU16FromPointer(pointer) {
              return HEAPU16[pointer >> 1];
            };
          case 2:
            return signed ? function readS32FromPointer(pointer) {
              return HEAP32[pointer >> 2];
            } : function readU32FromPointer(pointer) {
              return HEAPU32[pointer >> 2];
            };
          default:
            throw new TypeError("Unknown integer type: " + name);
        }
      }
      function __embind_register_integer(primitiveType, name, size, minRange, maxRange) {
        name = readLatin1String(name);
        if (maxRange === -1) {
          maxRange = 4294967295;
        }
        var shift = getShiftFromSize(size);
        var fromWireType = function(value) {
          return value;
        };
        if (minRange === 0) {
          var bitshift = 32 - 8 * size;
          fromWireType = function(value) {
            return value << bitshift >>> bitshift;
          };
        }
        var isUnsignedType = name.includes("unsigned");
        registerType(primitiveType, { name, "fromWireType": fromWireType, "toWireType": function(destructors, value) {
          if (typeof value !== "number" && typeof value !== "boolean") {
            throw new TypeError('Cannot convert "' + _embind_repr(value) + '" to ' + this.name);
          }
          if (value < minRange || value > maxRange) {
            throw new TypeError('Passing a number "' + _embind_repr(value) + '" from JS side to C/C++ side to an argument of type "' + name + '", which is outside the valid range [' + minRange + ", " + maxRange + "]!");
          }
          return isUnsignedType ? value >>> 0 : value | 0;
        }, "argPackAdvance": 8, "readValueFromPointer": integerReadValueFromPointer(name, shift, minRange !== 0), destructorFunction: null });
      }
      function __embind_register_memory_view(rawType, dataTypeIndex, name) {
        var typeMapping = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array];
        var TA = typeMapping[dataTypeIndex];
        function decodeMemoryView(handle) {
          handle = handle >> 2;
          var heap = HEAPU32;
          var size = heap[handle];
          var data = heap[handle + 1];
          return new TA(buffer, data, size);
        }
        name = readLatin1String(name);
        registerType(rawType, { name, "fromWireType": decodeMemoryView, "argPackAdvance": 8, "readValueFromPointer": decodeMemoryView }, { ignoreDuplicateRegistrations: true });
      }
      function __embind_register_std_string(rawType, name) {
        name = readLatin1String(name);
        var stdStringIsUTF8 = name === "std::string";
        registerType(rawType, { name, "fromWireType": function(value) {
          var length = HEAPU32[value >> 2];
          var str;
          if (stdStringIsUTF8) {
            var decodeStartPtr = value + 4;
            for (var i = 0; i <= length; ++i) {
              var currentBytePtr = value + 4 + i;
              if (i == length || HEAPU8[currentBytePtr] == 0) {
                var maxRead = currentBytePtr - decodeStartPtr;
                var stringSegment = UTF8ToString(decodeStartPtr, maxRead);
                if (str === void 0) {
                  str = stringSegment;
                } else {
                  str += String.fromCharCode(0);
                  str += stringSegment;
                }
                decodeStartPtr = currentBytePtr + 1;
              }
            }
          } else {
            var a = new Array(length);
            for (var i = 0; i < length; ++i) {
              a[i] = String.fromCharCode(HEAPU8[value + 4 + i]);
            }
            str = a.join("");
          }
          _free(value);
          return str;
        }, "toWireType": function(destructors, value) {
          if (value instanceof ArrayBuffer) {
            value = new Uint8Array(value);
          }
          var getLength;
          var valueIsOfTypeString = typeof value === "string";
          if (!(valueIsOfTypeString || value instanceof Uint8Array || value instanceof Uint8ClampedArray || value instanceof Int8Array)) {
            throwBindingError("Cannot pass non-string to std::string");
          }
          if (stdStringIsUTF8 && valueIsOfTypeString) {
            getLength = function() {
              return lengthBytesUTF8(value);
            };
          } else {
            getLength = function() {
              return value.length;
            };
          }
          var length = getLength();
          var ptr = _malloc(4 + length + 1);
          HEAPU32[ptr >> 2] = length;
          if (stdStringIsUTF8 && valueIsOfTypeString) {
            stringToUTF8(value, ptr + 4, length + 1);
          } else {
            if (valueIsOfTypeString) {
              for (var i = 0; i < length; ++i) {
                var charCode = value.charCodeAt(i);
                if (charCode > 255) {
                  _free(ptr);
                  throwBindingError("String has UTF-16 code units that do not fit in 8 bits");
                }
                HEAPU8[ptr + 4 + i] = charCode;
              }
            } else {
              for (var i = 0; i < length; ++i) {
                HEAPU8[ptr + 4 + i] = value[i];
              }
            }
          }
          if (destructors !== null) {
            destructors.push(_free, ptr);
          }
          return ptr;
        }, "argPackAdvance": 8, "readValueFromPointer": simpleReadValueFromPointer, destructorFunction: function(ptr) {
          _free(ptr);
        } });
      }
      function __embind_register_std_wstring(rawType, charSize, name) {
        name = readLatin1String(name);
        var decodeString, encodeString, getHeap, lengthBytesUTF, shift;
        if (charSize === 2) {
          decodeString = UTF16ToString;
          encodeString = stringToUTF16;
          lengthBytesUTF = lengthBytesUTF16;
          getHeap = function() {
            return HEAPU16;
          };
          shift = 1;
        } else if (charSize === 4) {
          decodeString = UTF32ToString;
          encodeString = stringToUTF32;
          lengthBytesUTF = lengthBytesUTF32;
          getHeap = function() {
            return HEAPU32;
          };
          shift = 2;
        }
        registerType(rawType, { name, "fromWireType": function(value) {
          var length = HEAPU32[value >> 2];
          var HEAP = getHeap();
          var str;
          var decodeStartPtr = value + 4;
          for (var i = 0; i <= length; ++i) {
            var currentBytePtr = value + 4 + i * charSize;
            if (i == length || HEAP[currentBytePtr >> shift] == 0) {
              var maxReadBytes = currentBytePtr - decodeStartPtr;
              var stringSegment = decodeString(decodeStartPtr, maxReadBytes);
              if (str === void 0) {
                str = stringSegment;
              } else {
                str += String.fromCharCode(0);
                str += stringSegment;
              }
              decodeStartPtr = currentBytePtr + charSize;
            }
          }
          _free(value);
          return str;
        }, "toWireType": function(destructors, value) {
          if (!(typeof value === "string")) {
            throwBindingError("Cannot pass non-string to C++ string type " + name);
          }
          var length = lengthBytesUTF(value);
          var ptr = _malloc(4 + length + charSize);
          HEAPU32[ptr >> 2] = length >> shift;
          encodeString(value, ptr + 4, length + charSize);
          if (destructors !== null) {
            destructors.push(_free, ptr);
          }
          return ptr;
        }, "argPackAdvance": 8, "readValueFromPointer": simpleReadValueFromPointer, destructorFunction: function(ptr) {
          _free(ptr);
        } });
      }
      function __embind_register_void(rawType, name) {
        name = readLatin1String(name);
        registerType(rawType, { isVoid: true, name, "argPackAdvance": 0, "fromWireType": function() {
          return void 0;
        }, "toWireType": function(destructors, o) {
          return void 0;
        } });
      }
      function _abort() {
        abort("");
      }
      var _emscripten_get_now;
      _emscripten_get_now = function() {
        return performance.now();
      };
      var _emscripten_get_now_is_monotonic = true;
      function _clock_gettime(clk_id, tp) {
        var now;
        if (clk_id === 0) {
          now = Date.now();
        } else if ((clk_id === 1 || clk_id === 4) && _emscripten_get_now_is_monotonic) {
          now = _emscripten_get_now();
        } else {
          setErrNo(28);
          return -1;
        }
        HEAP32[tp >> 2] = now / 1e3 | 0;
        HEAP32[tp + 4 >> 2] = now % 1e3 * 1e3 * 1e3 | 0;
        return 0;
      }
      function _emscripten_memcpy_big(dest, src, num) {
        HEAPU8.copyWithin(dest, src, src + num);
      }
      function emscripten_realloc_buffer(size) {
        try {
          wasmMemory.grow(size - buffer.byteLength + 65535 >>> 16);
          updateGlobalBufferAndViews(wasmMemory.buffer);
          return 1;
        } catch (e) {
        }
      }
      function _emscripten_resize_heap(requestedSize) {
        var oldSize = HEAPU8.length;
        requestedSize = requestedSize >>> 0;
        var maxHeapSize = 1073741824;
        if (requestedSize > maxHeapSize) {
          return false;
        }
        for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
          var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
          overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
          var newSize = Math.min(maxHeapSize, alignUp(Math.max(requestedSize, overGrownHeapSize), 65536));
          var replacement = emscripten_realloc_buffer(newSize);
          if (replacement) {
            return true;
          }
        }
        return false;
      }
      var ENV = {};
      function getExecutableName() {
        return thisProgram || "./this.program";
      }
      function getEnvStrings() {
        if (!getEnvStrings.strings) {
          var lang = (typeof navigator === "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8";
          var env = { "USER": "web_user", "LOGNAME": "web_user", "PATH": "/", "PWD": "/", "HOME": "/home/web_user", "LANG": lang, "_": getExecutableName() };
          for (var x in ENV) {
            if (ENV[x] === void 0)
              delete env[x];
            else
              env[x] = ENV[x];
          }
          var strings = [];
          for (var x in env) {
            strings.push(x + "=" + env[x]);
          }
          getEnvStrings.strings = strings;
        }
        return getEnvStrings.strings;
      }
      function _environ_get(__environ, environ_buf) {
        var bufSize = 0;
        getEnvStrings().forEach(function(string, i) {
          var ptr = environ_buf + bufSize;
          HEAP32[__environ + i * 4 >> 2] = ptr;
          writeAsciiToMemory(string, ptr);
          bufSize += string.length + 1;
        });
        return 0;
      }
      function _environ_sizes_get(penviron_count, penviron_buf_size) {
        var strings = getEnvStrings();
        HEAP32[penviron_count >> 2] = strings.length;
        var bufSize = 0;
        strings.forEach(function(string) {
          bufSize += string.length + 1;
        });
        HEAP32[penviron_buf_size >> 2] = bufSize;
        return 0;
      }
      function _exit(status) {
        exit(status);
      }
      function _fd_close(fd) {
        try {
          var stream = SYSCALLS.getStreamFromFD(fd);
          FS.close(stream);
          return 0;
        } catch (e) {
          if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
            throw e;
          return e.errno;
        }
      }
      function _fd_read(fd, iov, iovcnt, pnum) {
        try {
          var stream = SYSCALLS.getStreamFromFD(fd);
          var num = SYSCALLS.doReadv(stream, iov, iovcnt);
          HEAP32[pnum >> 2] = num;
          return 0;
        } catch (e) {
          if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
            throw e;
          return e.errno;
        }
      }
      function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
        try {
          var stream = SYSCALLS.getStreamFromFD(fd);
          var HIGH_OFFSET = 4294967296;
          var offset = offset_high * HIGH_OFFSET + (offset_low >>> 0);
          var DOUBLE_LIMIT = 9007199254740992;
          if (offset <= -DOUBLE_LIMIT || offset >= DOUBLE_LIMIT) {
            return -61;
          }
          FS.llseek(stream, offset, whence);
          tempI64 = [stream.position >>> 0, (tempDouble = stream.position, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[newOffset >> 2] = tempI64[0], HEAP32[newOffset + 4 >> 2] = tempI64[1];
          if (stream.getdents && offset === 0 && whence === 0)
            stream.getdents = null;
          return 0;
        } catch (e) {
          if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
            throw e;
          return e.errno;
        }
      }
      function _fd_write(fd, iov, iovcnt, pnum) {
        try {
          var stream = SYSCALLS.getStreamFromFD(fd);
          var num = SYSCALLS.doWritev(stream, iov, iovcnt);
          HEAP32[pnum >> 2] = num;
          return 0;
        } catch (e) {
          if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
            throw e;
          return e.errno;
        }
      }
      function _setTempRet0(val) {
        setTempRet0(val);
      }
      function __isLeapYear(year) {
        return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
      }
      function __arraySum(array2, index) {
        var sum = 0;
        for (var i = 0; i <= index; sum += array2[i++]) {
        }
        return sum;
      }
      var __MONTH_DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      var __MONTH_DAYS_REGULAR = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      function __addDays(date, days) {
        var newDate = new Date(date.getTime());
        while (days > 0) {
          var leap = __isLeapYear(newDate.getFullYear());
          var currentMonth = newDate.getMonth();
          var daysInCurrentMonth = (leap ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR)[currentMonth];
          if (days > daysInCurrentMonth - newDate.getDate()) {
            days -= daysInCurrentMonth - newDate.getDate() + 1;
            newDate.setDate(1);
            if (currentMonth < 11) {
              newDate.setMonth(currentMonth + 1);
            } else {
              newDate.setMonth(0);
              newDate.setFullYear(newDate.getFullYear() + 1);
            }
          } else {
            newDate.setDate(newDate.getDate() + days);
            return newDate;
          }
        }
        return newDate;
      }
      function _strftime(s, maxsize, format, tm) {
        var tm_zone = HEAP32[tm + 40 >> 2];
        var date = { tm_sec: HEAP32[tm >> 2], tm_min: HEAP32[tm + 4 >> 2], tm_hour: HEAP32[tm + 8 >> 2], tm_mday: HEAP32[tm + 12 >> 2], tm_mon: HEAP32[tm + 16 >> 2], tm_year: HEAP32[tm + 20 >> 2], tm_wday: HEAP32[tm + 24 >> 2], tm_yday: HEAP32[tm + 28 >> 2], tm_isdst: HEAP32[tm + 32 >> 2], tm_gmtoff: HEAP32[tm + 36 >> 2], tm_zone: tm_zone ? UTF8ToString(tm_zone) : "" };
        var pattern = UTF8ToString(format);
        var EXPANSION_RULES_1 = { "%c": "%a %b %d %H:%M:%S %Y", "%D": "%m/%d/%y", "%F": "%Y-%m-%d", "%h": "%b", "%r": "%I:%M:%S %p", "%R": "%H:%M", "%T": "%H:%M:%S", "%x": "%m/%d/%y", "%X": "%H:%M:%S", "%Ec": "%c", "%EC": "%C", "%Ex": "%m/%d/%y", "%EX": "%H:%M:%S", "%Ey": "%y", "%EY": "%Y", "%Od": "%d", "%Oe": "%e", "%OH": "%H", "%OI": "%I", "%Om": "%m", "%OM": "%M", "%OS": "%S", "%Ou": "%u", "%OU": "%U", "%OV": "%V", "%Ow": "%w", "%OW": "%W", "%Oy": "%y" };
        for (var rule in EXPANSION_RULES_1) {
          pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_1[rule]);
        }
        var WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        function leadingSomething(value, digits, character) {
          var str = typeof value === "number" ? value.toString() : value || "";
          while (str.length < digits) {
            str = character[0] + str;
          }
          return str;
        }
        function leadingNulls(value, digits) {
          return leadingSomething(value, digits, "0");
        }
        function compareByDay(date1, date2) {
          function sgn(value) {
            return value < 0 ? -1 : value > 0 ? 1 : 0;
          }
          var compare;
          if ((compare = sgn(date1.getFullYear() - date2.getFullYear())) === 0) {
            if ((compare = sgn(date1.getMonth() - date2.getMonth())) === 0) {
              compare = sgn(date1.getDate() - date2.getDate());
            }
          }
          return compare;
        }
        function getFirstWeekStartDate(janFourth) {
          switch (janFourth.getDay()) {
            case 0:
              return new Date(janFourth.getFullYear() - 1, 11, 29);
            case 1:
              return janFourth;
            case 2:
              return new Date(janFourth.getFullYear(), 0, 3);
            case 3:
              return new Date(janFourth.getFullYear(), 0, 2);
            case 4:
              return new Date(janFourth.getFullYear(), 0, 1);
            case 5:
              return new Date(janFourth.getFullYear() - 1, 11, 31);
            case 6:
              return new Date(janFourth.getFullYear() - 1, 11, 30);
          }
        }
        function getWeekBasedYear(date2) {
          var thisDate = __addDays(new Date(date2.tm_year + 1900, 0, 1), date2.tm_yday);
          var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4);
          var janFourthNextYear = new Date(thisDate.getFullYear() + 1, 0, 4);
          var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
          var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
          if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
            if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
              return thisDate.getFullYear() + 1;
            } else {
              return thisDate.getFullYear();
            }
          } else {
            return thisDate.getFullYear() - 1;
          }
        }
        var EXPANSION_RULES_2 = { "%a": function(date2) {
          return WEEKDAYS[date2.tm_wday].substring(0, 3);
        }, "%A": function(date2) {
          return WEEKDAYS[date2.tm_wday];
        }, "%b": function(date2) {
          return MONTHS[date2.tm_mon].substring(0, 3);
        }, "%B": function(date2) {
          return MONTHS[date2.tm_mon];
        }, "%C": function(date2) {
          var year = date2.tm_year + 1900;
          return leadingNulls(year / 100 | 0, 2);
        }, "%d": function(date2) {
          return leadingNulls(date2.tm_mday, 2);
        }, "%e": function(date2) {
          return leadingSomething(date2.tm_mday, 2, " ");
        }, "%g": function(date2) {
          return getWeekBasedYear(date2).toString().substring(2);
        }, "%G": function(date2) {
          return getWeekBasedYear(date2);
        }, "%H": function(date2) {
          return leadingNulls(date2.tm_hour, 2);
        }, "%I": function(date2) {
          var twelveHour = date2.tm_hour;
          if (twelveHour == 0)
            twelveHour = 12;
          else if (twelveHour > 12)
            twelveHour -= 12;
          return leadingNulls(twelveHour, 2);
        }, "%j": function(date2) {
          return leadingNulls(date2.tm_mday + __arraySum(__isLeapYear(date2.tm_year + 1900) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, date2.tm_mon - 1), 3);
        }, "%m": function(date2) {
          return leadingNulls(date2.tm_mon + 1, 2);
        }, "%M": function(date2) {
          return leadingNulls(date2.tm_min, 2);
        }, "%n": function() {
          return "\n";
        }, "%p": function(date2) {
          if (date2.tm_hour >= 0 && date2.tm_hour < 12) {
            return "AM";
          } else {
            return "PM";
          }
        }, "%S": function(date2) {
          return leadingNulls(date2.tm_sec, 2);
        }, "%t": function() {
          return "	";
        }, "%u": function(date2) {
          return date2.tm_wday || 7;
        }, "%U": function(date2) {
          var janFirst = new Date(date2.tm_year + 1900, 0, 1);
          var firstSunday = janFirst.getDay() === 0 ? janFirst : __addDays(janFirst, 7 - janFirst.getDay());
          var endDate = new Date(date2.tm_year + 1900, date2.tm_mon, date2.tm_mday);
          if (compareByDay(firstSunday, endDate) < 0) {
            var februaryFirstUntilEndMonth = __arraySum(__isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, endDate.getMonth() - 1) - 31;
            var firstSundayUntilEndJanuary = 31 - firstSunday.getDate();
            var days = firstSundayUntilEndJanuary + februaryFirstUntilEndMonth + endDate.getDate();
            return leadingNulls(Math.ceil(days / 7), 2);
          }
          return compareByDay(firstSunday, janFirst) === 0 ? "01" : "00";
        }, "%V": function(date2) {
          var janFourthThisYear = new Date(date2.tm_year + 1900, 0, 4);
          var janFourthNextYear = new Date(date2.tm_year + 1901, 0, 4);
          var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
          var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
          var endDate = __addDays(new Date(date2.tm_year + 1900, 0, 1), date2.tm_yday);
          if (compareByDay(endDate, firstWeekStartThisYear) < 0) {
            return "53";
          }
          if (compareByDay(firstWeekStartNextYear, endDate) <= 0) {
            return "01";
          }
          var daysDifference;
          if (firstWeekStartThisYear.getFullYear() < date2.tm_year + 1900) {
            daysDifference = date2.tm_yday + 32 - firstWeekStartThisYear.getDate();
          } else {
            daysDifference = date2.tm_yday + 1 - firstWeekStartThisYear.getDate();
          }
          return leadingNulls(Math.ceil(daysDifference / 7), 2);
        }, "%w": function(date2) {
          return date2.tm_wday;
        }, "%W": function(date2) {
          var janFirst = new Date(date2.tm_year, 0, 1);
          var firstMonday = janFirst.getDay() === 1 ? janFirst : __addDays(janFirst, janFirst.getDay() === 0 ? 1 : 7 - janFirst.getDay() + 1);
          var endDate = new Date(date2.tm_year + 1900, date2.tm_mon, date2.tm_mday);
          if (compareByDay(firstMonday, endDate) < 0) {
            var februaryFirstUntilEndMonth = __arraySum(__isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, endDate.getMonth() - 1) - 31;
            var firstMondayUntilEndJanuary = 31 - firstMonday.getDate();
            var days = firstMondayUntilEndJanuary + februaryFirstUntilEndMonth + endDate.getDate();
            return leadingNulls(Math.ceil(days / 7), 2);
          }
          return compareByDay(firstMonday, janFirst) === 0 ? "01" : "00";
        }, "%y": function(date2) {
          return (date2.tm_year + 1900).toString().substring(2);
        }, "%Y": function(date2) {
          return date2.tm_year + 1900;
        }, "%z": function(date2) {
          var off = date2.tm_gmtoff;
          var ahead = off >= 0;
          off = Math.abs(off) / 60;
          off = off / 60 * 100 + off % 60;
          return (ahead ? "+" : "-") + String("0000" + off).slice(-4);
        }, "%Z": function(date2) {
          return date2.tm_zone;
        }, "%%": function() {
          return "%";
        } };
        for (var rule in EXPANSION_RULES_2) {
          if (pattern.includes(rule)) {
            pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_2[rule](date));
          }
        }
        var bytes = intArrayFromString(pattern, false);
        if (bytes.length > maxsize) {
          return 0;
        }
        writeArrayToMemory(bytes, s);
        return bytes.length - 1;
      }
      function _strftime_l(s, maxsize, format, tm) {
        return _strftime(s, maxsize, format, tm);
      }
      var FSNode = function(parent, name, mode, rdev) {
        if (!parent) {
          parent = this;
        }
        this.parent = parent;
        this.mount = parent.mount;
        this.mounted = null;
        this.id = FS.nextInode++;
        this.name = name;
        this.mode = mode;
        this.node_ops = {};
        this.stream_ops = {};
        this.rdev = rdev;
      };
      var readMode = 292 | 73;
      var writeMode = 146;
      Object.defineProperties(FSNode.prototype, { read: { get: function() {
        return (this.mode & readMode) === readMode;
      }, set: function(val) {
        val ? this.mode |= readMode : this.mode &= ~readMode;
      } }, write: { get: function() {
        return (this.mode & writeMode) === writeMode;
      }, set: function(val) {
        val ? this.mode |= writeMode : this.mode &= ~writeMode;
      } }, isFolder: { get: function() {
        return FS.isDir(this.mode);
      } }, isDevice: { get: function() {
        return FS.isChrdev(this.mode);
      } } });
      FS.FSNode = FSNode;
      FS.staticInit();
      embind_init_charCodes();
      BindingError = Module2["BindingError"] = extendError(Error, "BindingError");
      InternalError = Module2["InternalError"] = extendError(Error, "InternalError");
      init_ClassHandle();
      init_RegisteredPointer();
      init_embind();
      UnboundTypeError = Module2["UnboundTypeError"] = extendError(Error, "UnboundTypeError");
      init_emval();
      function intArrayFromString(stringy, dontAddNull, length) {
        var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
        var u8array = new Array(len);
        var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
        if (dontAddNull)
          u8array.length = numBytesWritten;
        return u8array;
      }
      var asmLibraryArg = { "l": ___cxa_allocate_exception, "k": ___cxa_throw, "m": ___syscall_fcntl64, "H": ___syscall_fstat64, "F": ___syscall_fstatat64, "A": ___syscall_ioctl, "J": ___syscall_mmap2, "I": ___syscall_munmap, "p": ___syscall_open, "G": ___syscall_stat64, "v": __embind_register_bigint, "L": __embind_register_bool, "s": __embind_register_class, "h": __embind_register_class_constructor, "a": __embind_register_class_function, "K": __embind_register_emval, "n": __embind_register_enum, "b": __embind_register_enum_value, "q": __embind_register_float, "c": __embind_register_function, "e": __embind_register_integer, "d": __embind_register_memory_view, "r": __embind_register_std_string, "j": __embind_register_std_wstring, "t": __embind_register_void, "g": _abort, "C": _clock_gettime, "x": _emscripten_memcpy_big, "y": _emscripten_resize_heap, "D": _environ_get, "E": _environ_sizes_get, "f": _exit, "i": _fd_close, "B": _fd_read, "u": _fd_seek, "o": _fd_write, "w": _setTempRet0, "z": _strftime_l };
      var asm = createWasm();
      var ___wasm_call_ctors = Module2["___wasm_call_ctors"] = function() {
        return (___wasm_call_ctors = Module2["___wasm_call_ctors"] = Module2["asm"]["N"]).apply(null, arguments);
      };
      var _malloc = Module2["_malloc"] = function() {
        return (_malloc = Module2["_malloc"] = Module2["asm"]["O"]).apply(null, arguments);
      };
      var _free = Module2["_free"] = function() {
        return (_free = Module2["_free"] = Module2["asm"]["Q"]).apply(null, arguments);
      };
      var ___getTypeName = Module2["___getTypeName"] = function() {
        return (___getTypeName = Module2["___getTypeName"] = Module2["asm"]["R"]).apply(null, arguments);
      };
      var ___embind_register_native_and_builtin_types = Module2["___embind_register_native_and_builtin_types"] = function() {
        return (___embind_register_native_and_builtin_types = Module2["___embind_register_native_and_builtin_types"] = Module2["asm"]["S"]).apply(null, arguments);
      };
      var ___errno_location = Module2["___errno_location"] = function() {
        return (___errno_location = Module2["___errno_location"] = Module2["asm"]["T"]).apply(null, arguments);
      };
      var _memalign = Module2["_memalign"] = function() {
        return (_memalign = Module2["_memalign"] = Module2["asm"]["U"]).apply(null, arguments);
      };
      var dynCall_viijii = Module2["dynCall_viijii"] = function() {
        return (dynCall_viijii = Module2["dynCall_viijii"] = Module2["asm"]["V"]).apply(null, arguments);
      };
      var dynCall_jiji = Module2["dynCall_jiji"] = function() {
        return (dynCall_jiji = Module2["dynCall_jiji"] = Module2["asm"]["W"]).apply(null, arguments);
      };
      var dynCall_iiiiij = Module2["dynCall_iiiiij"] = function() {
        return (dynCall_iiiiij = Module2["dynCall_iiiiij"] = Module2["asm"]["X"]).apply(null, arguments);
      };
      var dynCall_iiiiijj = Module2["dynCall_iiiiijj"] = function() {
        return (dynCall_iiiiijj = Module2["dynCall_iiiiijj"] = Module2["asm"]["Y"]).apply(null, arguments);
      };
      var dynCall_iiiiiijj = Module2["dynCall_iiiiiijj"] = function() {
        return (dynCall_iiiiiijj = Module2["dynCall_iiiiiijj"] = Module2["asm"]["Z"]).apply(null, arguments);
      };
      var calledRun;
      function ExitStatus(status) {
        this.name = "ExitStatus";
        this.message = "Program terminated with exit(" + status + ")";
        this.status = status;
      }
      dependenciesFulfilled = function runCaller() {
        if (!calledRun)
          run();
        if (!calledRun)
          dependenciesFulfilled = runCaller;
      };
      function run(args) {
        args = args || arguments_;
        if (runDependencies > 0) {
          return;
        }
        preRun();
        if (runDependencies > 0) {
          return;
        }
        function doRun() {
          if (calledRun)
            return;
          calledRun = true;
          Module2["calledRun"] = true;
          if (ABORT)
            return;
          initRuntime();
          readyPromiseResolve(Module2);
          if (Module2["onRuntimeInitialized"])
            Module2["onRuntimeInitialized"]();
          postRun();
        }
        if (Module2["setStatus"]) {
          Module2["setStatus"]("Running...");
          setTimeout(function() {
            setTimeout(function() {
              Module2["setStatus"]("");
            }, 1);
            doRun();
          }, 1);
        } else {
          doRun();
        }
      }
      Module2["run"] = run;
      function exit(status, implicit) {
        EXITSTATUS = status;
        if (keepRuntimeAlive()) {
        } else {
          exitRuntime();
        }
        procExit(status);
      }
      function procExit(code) {
        EXITSTATUS = code;
        if (!keepRuntimeAlive()) {
          if (Module2["onExit"])
            Module2["onExit"](code);
          ABORT = true;
        }
        quit_(code, new ExitStatus(code));
      }
      if (Module2["preInit"]) {
        if (typeof Module2["preInit"] == "function")
          Module2["preInit"] = [Module2["preInit"]];
        while (Module2["preInit"].length > 0) {
          Module2["preInit"].pop()();
        }
      }
      run();
      return Module2.ready;
    };
  }();
  var ffish_default = Module;

  // client/boardSettings.ts
  var BoardSettings = class {
    constructor() {
      this.settings = {};
      this.settings["animation"] = new AnimationSettings(this);
      this.settings["showDests"] = new ShowDestsSettings(this);
      this.settings["autoPromote"] = new AutoPromoteSettings(this);
      this.settings["arrow"] = new ArrowSettings(this);
      this.settings["multipv"] = new MultiPVSettings(this);
      this.settings["blindfold"] = new BlindfoldSettings(this);
      this.settings["materialDifference"] = new MaterialDifferenceSettings(this);
    }
    getSettings(settingsType, family) {
      const fullName = family + settingsType;
      if (!this.settings[fullName]) {
        switch (settingsType) {
          case "BoardStyle":
            this.settings[fullName] = new BoardStyleSettings(this, family);
            break;
          case "PieceStyle":
            this.settings[fullName] = new PieceStyleSettings(this, family);
            break;
          case "Zoom":
            this.settings[fullName] = new ZoomSettings(this, family);
            break;
          case "Nnue":
            this.settings[fullName] = new NnueSettings(this, family);
            break;
          default:
            throw "Unknown settings type " + settingsType;
        }
      }
      return this.settings[fullName];
    }
    updateBoardAndPieceStyles() {
      Object.keys(BOARD_FAMILIES).forEach((family) => this.updateBoardStyle(family));
      Object.keys(PIECE_FAMILIES).forEach((family) => this.updatePieceStyle(family));
    }
    updateBoardStyle(family) {
      const idx = this.getSettings("BoardStyle", family).value;
      const board = BOARD_FAMILIES[family].boardCSS[idx];
      changeBoardCSS(this.assetURL, family, board);
    }
    updatePieceStyle(family) {
      const idx = this.getSettings("PieceStyle", family).value;
      let css = PIECE_FAMILIES[family].pieceCSS[idx];
      changePieceCSS(this.assetURL, family, css);
      this.updateDropSuggestion();
    }
    updateDropSuggestion() {
      if (this.ctrl && this.ctrl.hasPockets) {
        const chessground = this.ctrl.chessground;
        const el = document.querySelector("svg image");
        if (el) {
          chessground.redrawAll();
        }
      }
    }
    updateZoom(family) {
      var _a2;
      const variant2 = (_a2 = this.ctrl) == null ? void 0 : _a2.variant;
      if (variant2 && variant2.boardFamily === family) {
        const zoomSettings = this.getSettings("Zoom", family);
        const zoom = zoomSettings.value;
        const el = document.querySelector(".cg-wrap:not(.pocket)");
        if (el) {
          document.body.setAttribute("style", "--zoom:" + zoom);
          document.body.dispatchEvent(new Event("chessground.resize"));
          if ("chartFunctions" in this.ctrl && this.ctrl.chartFunctions) {
            this.ctrl.chartFunctions.forEach((func) => {
              func(this.ctrl);
            });
          }
        }
      }
    }
    updateBlindfold() {
      this.settings["blindfold"].update();
    }
    view(variantName) {
      var _a2, _b;
      if (!variantName)
        return h("div#board-settings");
      const variant2 = VARIANTS[variantName];
      const settingsList = [];
      const boardFamily = VARIANTS[variantName].boardFamily;
      const pieceFamily = VARIANTS[variantName].pieceFamily;
      settingsList.push(this.settings["animation"].view());
      settingsList.push(this.settings["showDests"].view());
      if (variant2.promotion.autoPromoteable)
        settingsList.push(this.settings["autoPromote"].view());
      settingsList.push(this.settings["arrow"].view());
      settingsList.push(this.settings["multipv"].view());
      if (variantName === ((_a2 = this.ctrl) == null ? void 0 : _a2.variant.name))
        settingsList.push(this.getSettings("Nnue", variantName).view());
      settingsList.push(this.settings["blindfold"].view());
      settingsList.push(this.settings["materialDifference"].view());
      if (variantName === ((_b = this.ctrl) == null ? void 0 : _b.variant.name))
        settingsList.push(this.getSettings("Zoom", boardFamily).view());
      settingsList.push(
        h("div#style-settings", [
          this.getSettings("BoardStyle", boardFamily).view(),
          this.getSettings("PieceStyle", pieceFamily).view()
        ])
      );
      settingsList.push();
      return h("div#board-settings", settingsList);
    }
  };
  var AnimationSettings = class extends BooleanSettings {
    constructor(boardSettings2) {
      super("animation", true);
      this.boardSettings = boardSettings2;
    }
    update() {
      var _a2;
      (_a2 = this.boardSettings.ctrl) == null ? void 0 : _a2.chessground.set({ animation: { enabled: this.value } });
    }
    view() {
      return h("div", checkbox(this, "animation", _("Piece animation")));
    }
  };
  var BoardStyleSettings = class extends NumberSettings {
    constructor(boardSettings2, boardFamily) {
      super(boardFamily + "-board", 0);
      this.boardSettings = boardSettings2;
      this.boardFamily = boardFamily;
    }
    update() {
      this.boardSettings.updateBoardStyle(this.boardFamily);
    }
    view() {
      const vboard = this.value;
      const boards = [];
      const boardCSS = BOARD_FAMILIES[this.boardFamily].boardCSS;
      for (let i = 0; i < boardCSS.length; i++) {
        boards.push(h("input#board" + i, {
          on: { change: (evt) => this.value = Number(evt.target.value) },
          props: { type: "radio", name: "board", value: i },
          attrs: { checked: vboard === i }
        }));
        boards.push(h("label.board.board" + i + "." + this.boardFamily, {
          attrs: { for: "board" + i },
          style: { backgroundImage: `url('/static/images/board/${boardCSS[i]}')` }
        }, ""));
      }
      return h("settings-board", boards);
    }
  };
  var PieceStyleSettings = class extends NumberSettings {
    constructor(boardSettings2, pieceFamily) {
      super(pieceFamily + "-piece", 0);
      this.boardSettings = boardSettings2;
      this.pieceFamily = pieceFamily;
    }
    update() {
      this.boardSettings.updatePieceStyle(this.pieceFamily);
    }
    view() {
      const vpiece = this.value;
      const pieces = [];
      const pieceCSS = PIECE_FAMILIES[this.pieceFamily].pieceCSS;
      for (let i = 0; i < pieceCSS.length; i++) {
        pieces.push(h("input#piece" + i, {
          on: { change: (e) => this.value = Number(e.target.value) },
          props: { type: "radio", name: "piece", value: i },
          attrs: { checked: vpiece === i }
        }));
        pieces.push(h("label.piece.piece" + i + "." + this.pieceFamily, { attrs: { for: "piece" + i } }, ""));
      }
      return h("settings-pieces", pieces);
    }
  };
  var ZoomSettings = class extends NumberSettings {
    constructor(boardSettings2, boardFamily) {
      super(boardFamily + "-zoom", 80);
      this.boardSettings = boardSettings2;
      this.boardFamily = boardFamily;
    }
    update() {
      this.boardSettings.updateZoom(this.boardFamily);
    }
    view() {
      return h("div", slider(this, "zoom", 0, 100, this.boardFamily.includes("shogi") ? 1 : 1.15625, _("Zoom")));
    }
  };
  var ShowDestsSettings = class extends BooleanSettings {
    constructor(boardSettings2) {
      super("showDests", true);
      this.boardSettings = boardSettings2;
    }
    update() {
      var _a2;
      (_a2 = this.boardSettings.ctrl) == null ? void 0 : _a2.chessground.set({
        movable: {
          showDests: this.value
        }
      });
    }
    view() {
      return h("div", checkbox(this, "showDests", _("Show piece destinations")));
    }
  };
  var AutoPromoteSettings = class extends BooleanSettings {
    constructor(boardSettings2) {
      super("autoPromote", false);
      this.boardSettings = boardSettings2;
    }
    update() {
      const ctrl = this.boardSettings.ctrl;
      if ("autoPromote" in ctrl)
        ctrl.autoPromote = this.value;
    }
    view() {
      return h("div", checkbox(this, "autoPromote", _("Promote to the top choice automatically")));
    }
  };
  var ArrowSettings = class extends BooleanSettings {
    constructor(boardSettings2) {
      super("arrow", true);
      this.boardSettings = boardSettings2;
    }
    update() {
      const ctrl = this.boardSettings.ctrl;
      if ("arrow" in ctrl)
        ctrl.arrow = this.value;
    }
    view() {
      return h("div", checkbox(this, "arrow", _("Best move arrow in analysis board")));
    }
  };
  var MultiPVSettings = class extends NumberSettings {
    constructor(boardSettings2) {
      super("multipv", 1);
      this.boardSettings = boardSettings2;
    }
    update() {
      const ctrl = this.boardSettings.ctrl;
      if ("multipv" in ctrl)
        ctrl.multipv = this.value;
      ctrl.pvboxIni();
    }
    view() {
      return h("div", slider(this, "multipv", 1, 5, 1, _("MultiPV")));
    }
  };
  var NnueSettings = class extends StringSettings {
    constructor(boardSettings2, variant2) {
      super(variant2 + "-nnue", "");
      this.boardSettings = boardSettings2;
      this.variant = variant2;
    }
    update() {
      const ctrl = this.boardSettings.ctrl;
      if ("evalFile" in ctrl)
        ctrl.evalFile = this.value;
      ctrl.nnueIni();
    }
    view() {
      return h("div", nnueFile(this, "evalFile", "NNUE", this.variant));
    }
  };
  var BlindfoldSettings = class extends BooleanSettings {
    constructor(boardSettings2) {
      super("blindfold", false);
      this.boardSettings = boardSettings2;
    }
    update() {
      const ctrl = this.boardSettings.ctrl;
      if ("blindfold" in ctrl)
        ctrl.blindfold = this.value;
      const el = document.getElementById("mainboard");
      if (el) {
        if (this.value) {
          el.classList.add("blindfold");
        } else {
          el.classList.remove("blindfold");
        }
      }
    }
    view() {
      return h("div", checkbox(this, "blindfold", _("Invisible pieces")));
    }
  };
  var MaterialDifferenceSettings = class extends BooleanSettings {
    constructor(boardSettings2) {
      super("materialDifference", false);
      this.boardSettings = boardSettings2;
    }
    update() {
      const ctrl = this.boardSettings.ctrl;
      if ("materialDifference" in ctrl) {
        ctrl.materialDifference = this.value;
        if ("updateMaterial" in ctrl) {
          ctrl.updateMaterial();
        }
      }
    }
    view() {
      return h("div", checkbox(this, "captured", _("Show material difference")));
    }
  };
  var boardSettings = new BoardSettings();

  // client/variantsIni.ts
  var variantsIni = `
# Hybrid variant of Grand-chess and crazyhouse, using Grand-chess as a template
[grandhouse:grand]
startFen = r8r/1nbqkcabn1/pppppppppp/10/10/10/10/PPPPPPPPPP/1NBQKCABN1/R8R[] w - - 0 1
pieceDrops = true
capturesToHand = true

# Hybrid variant of Gothic-chess and crazyhouse, using Capablanca as a template
[gothhouse:capablanca]
startFen = rnbqckabnr/pppppppppp/10/10/10/10/PPPPPPPPPP/RNBQCKABNR[] w KQkq - 0 1
pieceDrops = true
capturesToHand = true

# Hybrid variant of Embassy chess and crazyhouse, using Embassy as a template
[embassyhouse:embassy]
startFen = rnbqkcabnr/pppppppppp/10/10/10/10/PPPPPPPPPP/RNBQKCABNR[] w KQkq - 0 1
pieceDrops = true
capturesToHand = true

[gorogoroplus:gorogoro]
startFen = sgkgs/5/1ppp1/1PPP1/5/SGKGS[LNln] w 0 1
lance = l
shogiKnight = n
promotedPieceType = l:g n:g

[shogun:crazyhouse]
startFen = rnb+fkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNB+FKBNR[] w KQkq - 0 1
commoner = c
centaur = g
archbishop = a
chancellor = m
fers = f
promotionRank = 6
promotionLimit = g:1 a:1 m:1 q:1
promotionPieceTypes = -
promotedPieceType = p:c n:g b:a r:m f:q
mandatoryPawnPromotion = false
firstRankPawnDrops = true
promotionZonePawnDrops = true
whiteDropRegion = *1 *2 *3 *4 *5
blackDropRegion = *4 *5 *6 *7 *8
immobilityIllegal = true

[orda:chess]
centaur = h
knibis = a
kniroo = l
silver = y
promotionPieceTypes = qh
startFen = lhaykahl/8/pppppppp/8/8/8/PPPPPPPP/RNBQKBNR w KQ - 0 1
flagPiece = k
whiteFlag = *8
blackFlag = *1

[synochess:pocketknight]
janggiCannon = c
soldier = s
horse = h
fersAlfil = e
commoner = a
startFen = rneakenr/8/1c4c1/1ss2ss1/8/8/PPPPPPPP/RNBQKBNR[ss] w KQ - 0 1
stalemateValue = loss
perpetualCheckIllegal = true
flyingGeneral = true
blackDropRegion = *5
flagPiece = k
whiteFlag = *8
blackFlag = *1

[shinobi:crazyhouse]
commoner = c
bers = d
archbishop = j
fers = m
shogiKnight = h
lance = l
promotionRank = 7
promotionPieceTypes = -
promotedPieceType = p:c m:b h:n l:r
mandatoryPiecePromotion = true
stalemateValue = loss
nFoldRule = 4
perpetualCheckIllegal = true
startFen = rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/LH1CK1HL[LHMMDJ] w kq - 0 1
capturesToHand = false
whiteDropRegion = *1 *2 *3 *4
immobilityIllegal = true
flagPiece = k
whiteFlag = *8
blackFlag = *1

[ordamirror:chess]
centaur = h
knibis = a
kniroo = l
customPiece1 = f:mQcN
promotionPieceTypes = lhaf
startFen = lhafkahl/8/pppppppp/8/8/PPPPPPPP/8/LHAFKAHL w - - 0 1
flagPiece = k
whiteFlag = *8
blackFlag = *1

[empire:chess]
customPiece1 = e:mQcN
customPiece2 = c:mQcB
customPiece3 = t:mQcR
customPiece4 = d:mQcK
soldier = s
promotionPieceTypes = q
startFen = rnbqkbnr/pppppppp/8/8/8/PPPSSPPP/8/TECDKCET w kq - 0 1
stalemateValue = loss
nFoldValue = loss
flagPiece = k
whiteFlag = *8
blackFlag = *1
flyingGeneral = true

[chak]
maxRank = 9
maxFile = 9
rook = r
knight = v
centaur = j
immobile = o
customPiece1 = s:FvW
customPiece2 = q:pQ
customPiece3 = d:mQ2cQ2
customPiece4 = p:fsmWfceF
customPiece5 = k:WF
customPiece6 = w:FvW
startFen = rvsqkjsvr/4o4/p1p1p1p1p/9/9/9/P1P1P1P1P/4O4/RVSJKQSVR w - - 0 1
mobilityRegionWhiteCustomPiece6 = *5 *6 *7 *8 *9
mobilityRegionWhiteCustomPiece3 = *5 *6 *7 *8 *9
mobilityRegionBlackCustomPiece6 = *1 *2 *3 *4 *5
mobilityRegionBlackCustomPiece3 = *1 *2 *3 *4 *5
promotionRank = 5
promotionPieceTypes = -
mandatoryPiecePromotion = true
promotedPieceType = p:w k:d
extinctionValue = loss
extinctionPieceTypes = kd
extinctionPseudoRoyal = true
flagPiece = d
whiteFlag = e8
blackFlag = e2
nMoveRule = 50
nFoldRule = 3
nFoldValue = draw
stalemateValue = loss

[chennis]
maxRank = 7
maxFile = 7
mobilityRegionWhiteKing = b1 c1 d1 e1 f1 b2 c2 d2 e2 f2 b3 c3 d3 e3 f3 b4 c4 d4 e4 f4
mobilityRegionBlackKing = b4 c4 d4 e4 f4 b5 c5 d5 e5 f5 b6 c6 d6 e6 f6 b7 c7 d7 e7 f7
customPiece1 = p:fmWfceF
cannon = c
commoner = m
fers = f
soldier = s
king = k
bishop = b
knight = n
rook = r
promotionPieceTypes = -
promotedPieceType = p:r f:c s:b m:n
promotionRank = 1
startFen = 1fkm3/1p1s3/7/7/7/3S1P1/3MKF1[] w - 0 1
pieceDrops = true
capturesToHand = true
pieceDemotion = true
mandatoryPiecePromotion = true
dropPromoted = true
castling = false
stalemateValue = loss`;

  // client/cgCtrl.ts
  var ChessgroundController = class {
    constructor(el, model) {
      var _a2;
      this.home = model.home;
      this.variant = VARIANTS[model.variant];
      this.chess960 = model.chess960 === "True";
      this.hasPockets = !!this.variant.pocket;
      this.anon = model.anon === "True";
      this.mycolor = "white";
      this.oppcolor = "black";
      this.fullfen = model.fen;
      this.notation = notation(this.variant);
      const pocket0 = document.getElementById("pocket0");
      const pocket1 = document.getElementById("pocket1");
      const parts = this.fullfen.split(" ");
      const fen_placement = parts[0];
      this.chessground = Chessground(el, {
        fen: fen_placement,
        dimensions: this.variant.board.dimensions,
        notation: this.notation,
        addDimensionsCssVarsTo: document.body,
        kingRoles: this.variant.kingRoles,
        pocketRoles: (_a2 = this.variant.pocket) == null ? void 0 : _a2.roles
      }, pocket0, pocket1);
      boardSettings.ctrl = this;
      boardSettings.assetURL = model.assetURL;
      const boardFamily = this.variant.boardFamily;
      const pieceFamily = this.variant.pieceFamily;
      boardSettings.updateBoardStyle(boardFamily);
      boardSettings.updatePieceStyle(pieceFamily);
      boardSettings.updateZoom(boardFamily);
      boardSettings.updateBlindfold();
      ffish_default().then((loadedModule) => {
        this.ffish = loadedModule;
        this.ffish.loadVariantConfig(variantsIni);
        this.notationAsObject = this.notation2ffishjs(this.notation);
        this.ffishBoard = new this.ffish.Board(
          moddedVariant(this.variant.name, this.chess960, this.chessground.state.boardState.pieces, parts[2]),
          this.fullfen,
          this.chess960
        );
        window.addEventListener("beforeunload", () => this.ffishBoard.delete());
      });
    }
    toggleOrientation() {
      this.chessground.toggleOrientation();
    }
    flipped() {
      return this.chessground.state.orientation === "black";
    }
    legalMoves() {
      return this.ffishBoard.legalMoves().split(" ").map(uci2cg);
    }
    notation2ffishjs(n) {
      switch (n) {
        case Notation.ALGEBRAIC:
          return this.ffish.Notation.SAN;
        case Notation.SHOGI_ARBNUM:
          return this.ffish.Notation.SHOGI_HODGES_NUMBER;
        case Notation.JANGGI:
          return this.ffish.Notation.JANGGI;
        case Notation.XIANGQI_ARBNUM:
          return this.ffish.Notation.XIANGQI_WXF;
        default:
          return this.ffish.Notation.SAN;
      }
    }
  };

  // client/info.ts
  function updateCount(fen, whiteContainer, blackContainer) {
    const [countingPly, countingLimit, countingSide] = getCounting(fen);
    whiteContainer = patch(whiteContainer, h("div#misc-infow", ""));
    blackContainer = patch(blackContainer, h("div#misc-infob", ""));
    const countingStr = `${Math.floor((countingPly + 1) / 2)}/${countingLimit / 2 + countingLimit / 2 % 2}`;
    if (countingLimit !== 0 && countingPly !== 0) {
      if (countingSide === "w")
        whiteContainer = patch(whiteContainer, h("div#misc-infow", countingStr));
      else
        blackContainer = patch(blackContainer, h("div#misc-infob", countingStr));
    }
    return [whiteContainer, blackContainer];
  }
  function updatePoint(fen, choContainer, hanContainer) {
    const board = fen.split(" ")[0];
    const [choPoint, hanPoint] = getJanggiPoints(board);
    choContainer = patch(choContainer, h("div#misc-infow", { class: { "text-color-blue": true } }, choPoint));
    hanContainer = patch(hanContainer, h("div#misc-infob", { class: { "text-color-red": true } }, hanPoint));
    return [choContainer, hanContainer];
  }

  // client/sound.ts
  var import_howler = __toESM(require_howler());
  var _Sounds = class {
    constructor() {
      this.moveSoundSet = {
        regular: { move: () => this.move(), capture: () => this.capture() },
        shogi: { move: () => this.shogimove(), capture: () => this.shogicapture() },
        atomic: { move: () => this.move(), capture: () => this.explosion() }
      };
      this.tracks = {};
    }
    updateVolume() {
      const volume = volumeSettings.value;
      Object.keys(this.tracks).forEach((key) => {
        this.tracks[key].volume(volume);
      });
    }
    updateSoundTheme(assetURL) {
      Object.keys(_Sounds.trackNames).forEach((key) => {
        this.tracks[key] = this.buildSound(assetURL, _Sounds.trackNames[key]);
      });
    }
    buildSound(assetURL, trackName) {
      const soundTheme = soundThemeSettings.value;
      const soundTrack = soundTheme === "silent" ? "Silence" : trackName;
      const sound2 = new import_howler.Howl({
        src: [
          assetURL + "/sound/" + soundTheme + "/" + soundTrack + ".ogg",
          assetURL + "/sound/" + soundTheme + "/" + soundTrack + ".mp3"
        ],
        onplayerror: function() {
          sound2.once("unlock", function() {
            sound2.play();
          });
        },
        volume: volumeSettings.value
      });
      return sound2;
    }
    audio() {
      return soundThemeSettings.value !== "silent";
    }
    genericNotify() {
      if (this.audio())
        this.tracks.GenericNotify.play();
    }
    socialNotify() {
      if (this.audio())
        this.tracks.SocialNotify.play();
    }
    move() {
      if (this.audio())
        this.tracks.Move.play();
    }
    capture() {
      if (this.audio())
        this.tracks.Capture.play();
    }
    check() {
      if (this.audio())
        this.tracks.Check.play();
    }
    draw() {
      if (this.audio())
        this.tracks.Draw.play();
    }
    victory() {
      if (this.audio())
        this.tracks.Victory.play();
    }
    defeat() {
      if (this.audio())
        this.tracks.Defeat.play();
    }
    shogimove() {
      if (this.audio())
        this.tracks.ShogiMove.play();
    }
    shogicapture() {
      if (this.audio())
        this.tracks.ShogiCapture.play();
    }
    chat() {
      if (this.audio())
        this.tracks.Chat.play();
    }
    setup() {
      if (this.audio())
        this.tracks.Setup.play();
    }
    lowTime() {
      if (this.audio())
        this.tracks.LowTime.play();
    }
    tick() {
      if (this.audio())
        this.tracks.Tick.play();
    }
    explosion() {
      if (this.audio())
        this.tracks.Explosion.play();
    }
    berserk() {
      if (this.audio())
        this.tracks.Berserk.play();
    }
    moveSound(variant2, capture) {
      const soundSet = variant2.ui.pieceSound in this.moveSoundSet ? this.moveSoundSet[variant2.ui.pieceSound] : this.moveSoundSet.regular;
      if (capture)
        soundSet.capture();
      else
        soundSet.move();
    }
    gameEndSound(result, color) {
      switch (result) {
        case "1/2-1/2":
          this.draw();
          break;
        case "1-0":
          if (color === "white")
            this.victory();
          else
            this.defeat();
          break;
        case "0-1":
          if (color === "black")
            this.victory();
          else
            this.defeat();
          break;
      }
    }
  };
  var Sounds = _Sounds;
  Sounds.trackNames = {
    GenericNotify: "GenericNotify",
    SocialNotify: "SocialNotify",
    Move: "Move",
    Capture: "Capture",
    Check: "Check",
    Draw: "Draw",
    Victory: "Victory",
    Defeat: "Defeat",
    ShogiMove: "shogisnap",
    ShogiCapture: "shogislam",
    Chat: "chat",
    Setup: "dinding",
    LowTime: "LowTime",
    Tick: "Tick",
    Explosion: "Explosion",
    Berserk: "Berserk"
  };
  var VolumeSettings = class extends NumberSettings {
    constructor() {
      super("volume", 1);
    }
    update() {
      sound.updateVolume();
    }
    view() {
      return h("div", slider(this, "sound-volume", 0, 1, 0.01, _("Volume")));
    }
  };
  var soundThemes = {
    silent: "Silent",
    standard: "Standard",
    piano: "Piano",
    nes: "NES",
    sfx: "SFX",
    futuristic: "Futuristic",
    lisp: "Lisp",
    robot: "Robot"
  };
  var SoundThemeSettings = class extends StringSettings {
    constructor() {
      super("soundtheme", "standard");
    }
    update() {
      sound.updateSoundTheme(this.assetURL);
    }
    view() {
      return h("div#soundtheme.radio-list", radioList(this, "soundtheme", soundThemes, (_2, key) => this.value = key));
    }
  };
  var sound = new Sounds();
  var volumeSettings = new VolumeSettings();
  var soundThemeSettings = new SoundThemeSettings();

  // client/chat.ts
  function chatMessage(user, message, chatType, time) {
    const chatDiv = document.getElementById(chatType + "-messages");
    const isBottom = chatDiv.scrollHeight - (chatDiv.scrollTop + chatDiv.offsetHeight) < 80;
    const localTime = time ? new Date(time * 1e3).toLocaleTimeString("default", { hour: "2-digit", minute: "2-digit", hour12: false }) : "";
    const container = document.getElementById("messages");
    if (user.length === 0) {
      patch(container, h("div#messages", [h("li.message.offer", [h("t", message)])]));
    } else if (user === "_server") {
      patch(container, h("div#messages", [h("li.message.server", [h("div.time", localTime), h("user", _("Server")), h("t", message)])]));
    } else if (user === "Discord-Relay") {
      const colonIndex = message.indexOf(":");
      const discordUser = message.substring(0, colonIndex);
      const discordMessage = message.substring(colonIndex + 2);
      patch(container, h("div#messages", [h("li.message", [h("div.time", localTime), h("div.discord-icon-container", h("img.icon-discord-icon", { attrs: { src: "/static/icons/discord.svg" } })), h("user", discordUser), h("t", discordMessage)])]));
    } else {
      patch(container, h("div#messages", [h("li.message", [h("div.time", localTime), h("user", h("a", { attrs: { href: "/@/" + user } }, user)), h("t", message)])]));
    }
    if (isBottom)
      setTimeout(() => {
        chatDiv.scrollTop = chatDiv.scrollHeight;
      }, 200);
  }

  // client/gameCtrl.ts
  var GameController = class extends ChessgroundController {
    constructor(el, model) {
      super(el, model);
      this.setDests = () => {
        if (this.ffishBoard === void 0) {
          setTimeout(this.setDests, 100);
        } else {
          const legalMoves = this.ffishBoard.legalMoves().split(" ");
          const dests = moveDests(legalMoves);
          this.chessground.set({ movable: { dests } });
          if (this.steps.length === 1) {
            this.chessground.set({ check: this.ffishBoard.isCheck() ? this.turnColor : false });
          }
        }
      };
      this.doSend = (message) => {
        this.sock.send(JSON.stringify(message));
      };
      this.onMove = () => {
        return (_orig, _dest, capturedPiece) => {
          sound.moveSound(this.variant, !!capturedPiece);
        };
      };
      this.onDrop = () => {
        return (piece, _dest) => {
          if (piece.role)
            sound.moveSound(this.variant, false);
        };
      };
      this.onSelect = () => {
        let lastTime = performance.now();
        let lastKey;
        return (key) => {
          var _a2;
          if (this.duck.inputState === "click") {
            this.duck.finish(key);
            return;
          }
          if (this.chessground.state.movable.dests === void 0)
            return;
          const curTime = performance.now();
          if (this.chessground.state.stats.ctrlKey || lastKey === key && curTime - lastTime < 500) {
            if ((_a2 = this.chessground.state.movable.dests.get(key)) == null ? void 0 : _a2.includes(key)) {
              const piece = this.chessground.state.boardState.pieces.get(key);
              if (this.variant.name === "sittuyin") {
                this.chessground.setPieces(/* @__PURE__ */ new Map([[key, {
                  color: piece.color,
                  role: "f-piece",
                  promoted: true
                }]]));
                this.chessground.state.movable.dests = void 0;
                this.chessground.selectSquare(key);
                sound.moveSound(this.variant, false);
                this.processInput(piece, key, key, { premove: false }, "f", "promotion");
              } else if ((this.chessground.state.stats.ctrlKey || this.dblClickPass) && this.variant.rules.pass) {
                this.pass(key);
              }
            }
            lastKey = void 0;
          } else {
            lastKey = key;
            lastTime = curTime;
          }
        };
      };
      this.pass = (passKey) => {
        var _a2;
        if (this.turnColor === this.chessground.state.movable.color || this.chessground.state.movable.color === "both") {
          if (!passKey) {
            const pieces = this.chessground.state.boardState.pieces;
            const dests = this.chessground.state.movable.dests;
            for (const [k, p] of pieces) {
              if (p.role === "k-piece" && p.color === this.turnColor) {
                if ((_a2 = dests == null ? void 0 : dests.get(k)) == null ? void 0 : _a2.includes(k)) {
                  passKey = k;
                  break;
                }
              }
            }
          }
          if (passKey) {
            this.chessground.unselect();
            sound.moveSound(this.variant, false);
            this.sendMove(passKey, passKey, "");
          }
        }
      };
      this.onMsgSpectators = (msg) => {
        const container = document.getElementById("spectators");
        patch(container, h("under-left#spectators", _("Spectators: ") + msg.spectators));
      };
      this.onMsgChat = (msg) => {
        if (this.spectator && msg.room === "spectator" || !this.spectator && msg.room !== "spectator" || msg.user.length === 0) {
          chatMessage(msg.user, msg.message, "roundchat", msg.time);
        }
      };
      this.onMsgFullChat = (msg) => {
        patch(document.getElementById("messages"), h("div#messages-clear"));
        patch(document.getElementById("messages-clear"), h("div#messages"));
        msg.lines.forEach((line) => {
          if (this.spectator && line.room === "spectator" || !this.spectator && line.room !== "spectator" || line.user.length === 0) {
            chatMessage(line.user, line.message, "roundchat", line.time);
          }
        });
      };
      this.onMsgGameNotFound = (msg) => {
        alert(_("Requested game %1 not found!", msg["gameId"]));
        window.location.assign(this.home);
      };
      this.onMsgShutdown = (msg) => {
        alert(msg.message);
      };
      this.gameId = model["gameId"];
      this.tournamentId = model["tournamentId"];
      this.username = model["username"];
      this.wplayer = model["wplayer"];
      this.bplayer = model["bplayer"];
      this.base = Number(model["base"]);
      this.inc = Number(model["inc"]);
      this.status = Number(model["status"]);
      this.steps = [];
      this.pgn = "";
      this.ply = isNaN(model["ply"]) ? 0 : model["ply"];
      this.wtitle = model["wtitle"];
      this.btitle = model["btitle"];
      this.wrating = model["wrating"];
      this.brating = model["brating"];
      this.rated = model["rated"];
      this.spectator = this.username !== this.wplayer && this.username !== this.bplayer;
      this.gating = new GatingInput(this);
      this.promotion = new PromotionInput(this);
      this.duck = new DuckInput(this);
      if (this.spectator) {
        this.mycolor = "white";
        this.oppcolor = "black";
      } else {
        this.mycolor = this.username === this.wplayer ? "white" : "black";
        this.oppcolor = this.username === this.wplayer ? "black" : "white";
      }
      this.players = [
        this.mycolor === "white" ? this.bplayer : this.wplayer,
        this.mycolor === "white" ? this.wplayer : this.bplayer
      ];
      this.titles = [
        this.mycolor === "white" ? this.btitle : this.wtitle,
        this.mycolor === "white" ? this.wtitle : this.btitle
      ];
      this.ratings = [
        this.mycolor === "white" ? this.brating : this.wrating,
        this.mycolor === "white" ? this.wrating : this.brating
      ];
      this.result = "*";
      const parts = this.fullfen.split(" ");
      this.turnColor = parts[1] === "w" ? "white" : "black";
      this.suffix = "";
      this.chessground.set({
        animation: {
          enabled: localStorage.animation === void 0 || localStorage.animation === "true"
        },
        movable: {
          showDests: localStorage.showDests === void 0 || localStorage.showDests === "true"
        }
      });
      this.steps.push({
        "fen": this.fullfen,
        "move": void 0,
        "check": false,
        "turnColor": this.turnColor
      });
      this.setDests();
    }
    flipped() {
      return this.chessground.state.orientation !== this.mycolor;
    }
    processInput(piece, orig, dest, meta, lastSuffix, lastInputType) {
      switch (lastInputType) {
        case void 0:
          this.suffix = "";
          this.gating.start(piece, orig, dest, meta);
          break;
        case "gating":
          if (lastSuffix === "-") {
            this.promotion.start(piece, orig, dest, meta);
          } else {
            this.suffix += lastSuffix;
            this.duck.start(piece, orig, dest, meta);
          }
          break;
        case "promotion":
          this.suffix += lastSuffix;
          this.duck.start(piece, orig, dest, meta);
          break;
        case "duck":
          this.suffix += lastSuffix;
          this.sendMove(orig, dest, this.suffix);
          break;
      }
    }
    sendMove(orig, dest, promo) {
      this.doSendMove(cg2uci(orig + dest + promo));
    }
    goPly(ply, plyVari = 0) {
      var _a2, _b, _c;
      const vv = (_a2 = this.steps[plyVari]) == null ? void 0 : _a2.vari;
      const step2 = plyVari > 0 && vv ? vv[ply - plyVari] : this.steps[ply];
      if (step2 === void 0)
        return;
      const move3 = uci2LastMove(step2.move);
      let capture = false;
      if (move3) {
        capture = this.chessground.state.boardState.pieces.get(move3[1]) !== void 0 && ((_b = step2.san) == null ? void 0 : _b.slice(0, 2)) !== "O-" || ((_c = step2.san) == null ? void 0 : _c.slice(1, 2)) === "x";
      }
      this.chessground.set({
        fen: step2.fen,
        turnColor: step2.turnColor,
        movable: {
          color: step2.turnColor
        },
        check: step2.check,
        lastMove: move3
      });
      this.setDests();
      this.turnColor = step2.turnColor;
      this.fullfen = step2.fen;
      this.suffix = "";
      this.duck.inputState = void 0;
      if (this.variant.ui.counting) {
        updateCount(step2.fen, document.getElementById("misc-infow"), document.getElementById("misc-infob"));
      }
      if (this.variant.ui.materialPoint) {
        updatePoint(step2.fen, document.getElementById("misc-infow"), document.getElementById("misc-infob"));
      }
      if (ply === this.ply + 1) {
        sound.moveSound(this.variant, capture);
      }
      this.ply = ply;
    }
    /**
      * Custom variant-specific logic to be triggered on move and alter state of board/pocket depending on variant rules.
      */
    onUserMove(orig, dest, meta) {
      var _a2;
      if (this.duck.inputState === "move") {
        this.duck.finish(dest);
        return;
      }
      this.preaction = meta.premove;
      const pieces = this.chessground.state.boardState.pieces;
      let moved = pieces.get(dest);
      if (moved === void 0)
        moved = { role: "k-piece", color: this.mycolor };
      if (meta.captured === void 0 && moved !== void 0 && moved.role === "p-piece" && orig[0] !== dest[0] && this.variant.rules.enPassant) {
        const pos = key2pos(dest), pawnKey = pos2key([pos[0], pos[1] + (this.mycolor === "white" ? -1 : 1)]);
        meta.captured = pieces.get(pawnKey);
        this.chessground.setPieces(/* @__PURE__ */ new Map([[pawnKey, void 0]]));
      }
      if (((_a2 = this.variant.pocket) == null ? void 0 : _a2.captureToHand) && meta.captured) {
        const piece = {
          role: unpromotedRole(this.variant, meta.captured),
          color: opposite(meta.captured.color)
        };
        this.chessground.changePocket(piece, 1);
        this.chessground.state.dom.redraw();
      }
      this.processInput(moved, orig, dest, meta);
      this.preaction = false;
    }
    /**
     * Variant specific logic for when dropping a piece from pocket is performed
     */
    onUserDrop(piece, dest, meta) {
      this.preaction = meta.premove;
      const role = piece.role;
      this.processInput(piece, dropOrigOf(role), dest, meta);
      this.preaction = false;
    }
    onMessage(evt) {
      if (evt.data === "/n")
        return;
      const msg = JSON.parse(evt.data);
      switch (msg.type) {
        case "spectators":
          this.onMsgSpectators(msg);
          break;
        case "roundchat":
          this.onMsgChat(msg);
          break;
        case "fullchat":
          this.onMsgFullChat(msg);
          break;
        case "game_not_found":
          this.onMsgGameNotFound(msg);
          break;
        case "shutdown":
          this.onMsgShutdown(msg);
          break;
        case "logout":
          this.doSend({ type: "logout" });
          break;
      }
    }
  };

  // client/puzzlerTypes.ts
  var idChars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var idLength = 5;
  function randomId() {
    let result = "";
    for (let i = idLength; i > 0; --i)
      result += idChars[Math.floor(Math.random() * idChars.length)];
    return result;
  }

  // client/puzzlerCtrl.ts
  var PuzzleController = class extends GameController {
    constructor(el, data) {
      const model = {
        home: data.home,
        assetURL: data.assetURL,
        username: data.username,
        variant: data.variant,
        fen: data.fen,
        ply: data.ply,
        gameId: data.gameId
      };
      super(el, model);
      this.moves = [];
      this.movesSan = [];
      this.undo = () => {
        console.log("Undo");
      };
      this.createSolutionSan = () => {
        if (this.ffishBoard === void 0) {
          console.log("updateSolution() WAIT 100...");
          setTimeout(this.createSolutionSan, 100);
        } else {
          this.solutionSan = this.ffishBoard.variationSan(this.solution.join(" "), this.notationAsObject, false).split(" ");
          console.log("updateSolution() solutionSan=", this.solutionSan);
          this.solutionEl = document.querySelector(".solution");
          if (this.solution) {
            this.updateSolution();
          }
          ;
        }
      };
      this.updateSolution = () => {
        this.solutionEl = patch(this.solutionEl, h("p.solution", [
          "Solution: ",
          ...this.solutionSan.map(
            (san, i) => h("san", {
              class: { done: this.moves[i] === this.solution[i] }
            }, san)
          )
        ]));
        this.movesEl = patch(this.movesEl, h("p.moves", [
          "My moves: ",
          ...this.movesSan.map(
            (move3, i) => h("uci", {
              class: { done: this.moves[i] === this.solution[i] }
            }, move3)
          )
        ]));
      };
      this.canAppend = () => this.moves.length > this.solution.length && this.moves.slice(0, this.solution.length).join(" ") === this.solution.join(" ");
      this.canForward = () => this.moves.length < this.solution.length && this.moves.join(" ") == this.solution.slice(0, this.moves.length).join(" ");
      this.isComplete = () => this.moves.join(" ") == this.solution.join(" ");
      this.isInVariation = () => !this.isComplete() && !this.canForward();
      this.cgConfig = (move3) => {
        const fen = this.ffishBoard.fen(this.variant.ui.showPromoted, 0);
        const turnColor = fen.split(" ")[1] === "w" ? "white" : "black";
        return {
          fen,
          turnColor,
          movable: {
            color: turnColor
          },
          check: this.ffishBoard.isCheck(),
          lastMove: uci2LastMove(move3)
        };
      };
      this.username = data.username;
      this.solution = model.variant === "duck" ? data.moves.match(/[^,]+,[^,]+/g) : data.moves.split(",");
      this.moves = [];
      this._id = data._id;
      this.all = data.all;
      if (!data.ply) {
        const parts = data.fen.split(" ");
        const color = parts[1];
        const fullmove = parseInt(parts[parts.length - 1]);
        this.ply = (fullmove - 1) * 2 + (color === "b" ? 1 : 0);
      }
      this.chessground.set({
        animation: { enabled: true },
        orientation: this.turnColor,
        turnColor: this.turnColor,
        movable: {
          free: false,
          color: this.turnColor,
          //                showDests: this.showDests,
          events: {
            after: (orig, dest, meta) => this.onUserMove(orig, dest, meta),
            afterNewPiece: (role, dest, meta) => this.onUserDrop(role, dest, meta)
          }
        },
        events: {
          move: this.onMove(),
          dropNewPiece: this.onDrop(),
          select: this.onSelect()
        }
      });
      changePieceCSS(model.assetURL, "shogi", "porti");
      changePieceCSS(model.assetURL, "tori", "porti");
      changePieceCSS(model.assetURL, "kyoto", "kyotoi");
      changePieceCSS(model.assetURL, "xiangqi", "xiangqi2di");
      changePieceCSS(model.assetURL, "janggi", "janggiikaw");
      const vVariant = this.variant.name || "chess";
      const variantEl = document.getElementById("variant");
      patch(variantEl, selectVariant("variant", vVariant, () => this.setVariant(true), () => this.setVariant(false)));
      const allEl = document.getElementById("all");
      patch(allEl, h(
        "input#all",
        {
          props: { name: "all", type: "checkbox" },
          attrs: { checked: this.all, title: "View already reviewed and skipped puzzles as well." },
          on: { click: () => this.setAll() }
        }
      ));
      const fileEl = document.getElementById("puzzlefile");
      patch(fileEl, h(
        "input#puzzlefile",
        {
          props: { name: "puzzlefile", type: "file", accept: ".epd", title: "Select a .epd file generated by chess-variants-puzzler." },
          on: { change: () => this.readFile() }
        }
      ));
      this.movesEl = document.querySelector(".moves");
      const approveEl = document.querySelector(".approve");
      patch(approveEl, h("button.approve", { on: { click: () => this.review(true) } }, [
        h("em", "Approve"),
        h("strong", "\u2713"),
        h("em", "[enter]")
      ]));
      const rejectEl = document.querySelector(".reject");
      patch(rejectEl, h("button.reject", { on: { click: () => this.review(false) } }, [
        h("em", "Reject"),
        h("strong", "\u2717"),
        h("em", "[backspace]")
      ]));
      const appendEl = document.querySelector(".append");
      patch(appendEl, h("button.append", { attrs: { disabled: true, title: "Complete the solution with missing moves." }, on: { click: () => this.append() } }, [
        h("em", "solution"),
        h("strong", "\u2191"),
        h("em", "my moves")
      ]));
      const skipEl = document.querySelector(".puzzle-skip");
      patch(skipEl, h("div.puzzle-skip", [h("button", { on: { click: () => this.skip() } }, "Skip")]));
      const forwardEl = document.querySelector(".next");
      patch(forwardEl, h("button.next", { on: { click: () => this.forward() } }, "Forward >"));
      const rewindEl = document.querySelector(".prev");
      patch(
        rewindEl,
        h(
          "button.prev",
          {
            attrs: { disabled: true },
            class: { variation: false },
            on: { click: () => this.rewind() }
          },
          "< Rewind"
        )
      );
      this.createSolutionSan();
      const noRepeat = (f) => (e) => {
        if (!e.repeat)
          f();
      };
      Mousetrap.bind("left", noRepeat(() => this.rewind()));
      Mousetrap.bind("right", noRepeat(() => this.forward()));
      Mousetrap.bind("backspace", noRepeat(() => this.review(false)));
      Mousetrap.bind("enter", noRepeat(() => this.review(true)));
      Mousetrap.bind("a", () => document.querySelector("a.analyse").click());
    }
    setVariant(isInput) {
      const e = document.getElementById("variant");
      const variant2 = e.options[e.selectedIndex].value;
      const p = document.querySelector(".variant");
      console.log("Selected varient is:", variant2, isInput);
      p.submit();
    }
    setAll() {
      const e = document.getElementById("all");
      const all = e.checked;
      const p = document.querySelector(".all");
      console.log("Selected all is:", all);
      p.submit();
    }
    updateGui(move3) {
      this.chessground.set(this.cgConfig(move3));
      this.setDests();
      const rewindEl = document.querySelector(".prev");
      rewindEl.classList.toggle("variation", this.isInVariation());
      rewindEl.disabled = this.moves.length === 0;
      const forwardEl = document.querySelector(".next");
      forwardEl.disabled = !this.canForward();
      const appendEl = document.querySelector(".append");
      appendEl.disabled = !this.canAppend();
      this.updateSolution();
    }
    skip() {
      window.location.assign(`${this.home}/skip?skipped=${this._id}`);
    }
    append() {
      this.solution = [...this.moves];
      this.solutionSan = [...this.movesSan];
      const rewindEl = document.querySelector(".prev");
      rewindEl.classList.toggle("variation", false);
      this.updateSolution();
    }
    doSendMove(move3) {
      console.log(move3);
      this.moves.push(move3);
      const san = this.ffishBoard.sanMove(move3, this.notationAsObject);
      this.movesSan.push(san);
      this.ffishBoard.push(move3);
      this.updateGui(move3);
    }
    rewind() {
      if (this.moves.length === 0)
        return;
      this.moves.pop();
      this.movesSan.pop();
      this.ffishBoard.pop();
      const move3 = this.moves[this.moves.length - 1];
      this.updateGui(move3);
    }
    forward() {
      const move3 = uci2cg(this.solution[this.moves.length]);
      if (move3) {
        this.doSendMove(move3);
      }
    }
    review(approved) {
      const elApprove = document.querySelector(".approve");
      const elReject = document.querySelector(".reject");
      console.log("approved:", approved);
      if (approved) {
        elApprove.classList.toggle("active", true);
        elReject.classList.toggle("active", false);
      } else {
        elApprove.classList.toggle("active", false);
        elReject.classList.toggle("active", true);
      }
      console.log("review", approved);
      window.location.assign(`${this.home}/review/${this._id}?approved=${approved ? 1 : 0}&moves=${this.solution.join(",")}`);
    }
    readFile() {
      const fileEl = document.getElementById("puzzlefile");
      const files3 = fileEl.files;
      if (files3) {
        const username = this.username;
        const fileReader = new FileReader();
        fileReader.readAsText(files3[0]);
        fileReader.onload = function() {
          if (fileReader.result) {
            const allLines = fileReader.result.split("\n");
            allLines.forEach((line) => {
              if (line.trim()) {
                const parts = line.trim().split(";");
                const ops = Object.fromEntries(parts.slice(1).map((s) => s.split(" ")));
                const puzzle = {
                  _id: randomId(),
                  fen: parts[0],
                  variant: ops.variant,
                  moves: ops.pv,
                  eval: ops.eval,
                  type: ops.type,
                  uploadedBy: username
                };
                if (ops.site) {
                  if (ops.site.includes("pychess")) {
                    puzzle.gameId = ops.site.slice(-8);
                  } else {
                    puzzle.site = ops.site;
                  }
                }
                postPuzzle(puzzle);
              }
            });
          }
        };
        fileReader.onerror = function() {
          alert(fileReader.error);
        };
      }
    }
  };
  function postPuzzle(puzzle) {
    const XHR = new XMLHttpRequest();
    const FD = new FormData();
    Object.entries(puzzle).forEach((entry) => {
      FD.append(entry[0], entry[1]);
    });
    XHR.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        if (response["error"] !== void 0) {
          console.log(response["error"]);
        }
      }
    };
    XHR.open("POST", "/puzzle", true);
    XHR.send(FD);
  }

  // client/puzzlerView.ts
  function runGround(vnode2, data) {
    const el = vnode2.elm;
    new PuzzleController(el, data);
  }
  function puzzlerView_default(data) {
    const variant2 = VARIANTS[data.variant];
    const parts = data.fen.split(" ");
    const color = parts[1];
    const fullmove = parseInt(parts[parts.length - 1]);
    const ply = (fullmove - 1) * 2 + (color === "b" ? 1 : 0);
    const fen = parts.join("_").replace(/\+/g, ".");
    let gameUrl;
    if (data.gameId) {
      gameUrl = `${data.pychessURL}/${data.gameId}?ply=${ply}`;
    } else {
      gameUrl = `${data.pychessURL}/analysis/${data.variant}?fen=${fen}`;
    }
    window.history.replaceState({}, "", `/puzzle/${data._id}`);
    return h("main", [
      h("section.top", [
        h("form.variant", { props: { method: "post", action: "/variant" } }, [
          h("select#variant")
        ]),
        h("form.all", { props: { method: "post", action: "/all" } }, [
          h("label", { attrs: { for: "all" } }, "All"),
          h("input#all")
        ]),
        h("span.wrapper", [
          h("label", { attrs: { for: "puzzlefile" } }, "Upload puzzle file: "),
          h("input#puzzlefile")
        ]),
        h("div#username", data.username),
        h("a", { attrs: { href: "/logout" } }, "Log out")
      ]),
      h("div.puzzle", [
        h("div.pocket-top", [
          h("div." + variant2.piece + "." + data.variant, [
            h("div.cg-wrap.pocket", [
              h("div#pocket0")
            ])
          ])
        ]),
        h(`selection#mainboard.${variant2.boardFamily}.${variant2.pieceFamily}.${variant2.ui.boardMark}`, [
          h("div.cg-wrap." + variant2.board.cg, { hook: { insert: (vnode2) => runGround(vnode2, data) } })
        ]),
        h("div.pocket-bot", [
          h("div." + variant2.piece + "." + data.variant, [
            h("div.cg-wrap.pocket", [
              h("div#pocket1")
            ])
          ])
        ]),
        h("div.puzzle-ui", [
          h("div.puzzle-info", [
            h("p.puzzle-info-title", `Candidate id: ${data._id}`),
            h("p", [
              "Site: ",
              "site" in data ? h("a.analyse", { attrs: { href: `${data.site}`, target: "_blank" } }, `${data.site}`) : ""
            ]),
            h("p", [
              "From game: ",
              h("a.analyse", { attrs: { href: gameUrl, target: "_blank" } }, "gameId" in data ? `${data.gameId}` : "analysis")
            ]),
            h("p", `Type: ${data.type}`),
            h("p", `Eval: ${data.eval}`),
            h("p.solution"),
            h("p.moves")
          ]),
          h("div.puzzle-review", [
            h("button.reject"),
            h("button.approve"),
            h("button.append")
          ]),
          h("div.puzzle-skip"),
          h("div.puzzle-help", [
            h("p", "Does the puzzle feel a bit off, computer-like, or frustrating? Just reject it. Too difficult and you're not sure if interesting? Skip it. Use arrow keys to replay, backspace/enter to review, a to analyse.")
          ])
        ])
      ]),
      h("div.replay", [
        h("button.prev"),
        h("button.next")
      ])
    ]);
  }

  // client/main.ts
  function puzzlerStart(data) {
    console.log(data);
    const element = document.querySelector("main");
    patch(element, puzzlerView_default(data));
  }
  window.puzzlerStart = puzzlerStart;
})();
/*! Bundled license information:

howler/dist/howler.js:
  (*!
   *  howler.js v2.2.3
   *  howlerjs.com
   *
   *  (c) 2013-2020, James Simpson of GoldFire Studios
   *  goldfirestudios.com
   *
   *  MIT License
   *)
  (*!
   *  Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.
   *  
   *  howler.js v2.2.3
   *  howlerjs.com
   *
   *  (c) 2013-2020, James Simpson of GoldFire Studios
   *  goldfirestudios.com
   *
   *  MIT License
   *)

gettext.js/lib/gettext.js:
  (*! gettext.js - Guillaume Potier - MIT Licensed *)
*/