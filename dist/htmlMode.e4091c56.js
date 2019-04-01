// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/monaco-editor/esm/vs/language/html/workerManager.js":[function(require,module,exports) {
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorkerManager = void 0;
var STOP_WHEN_IDLE_FOR = 2 * 60 * 1000; // 2min

var WorkerManager =
/** @class */
function () {
  function WorkerManager(defaults) {
    var _this = this;

    this._defaults = defaults;
    this._worker = null;
    this._idleCheckInterval = setInterval(function () {
      return _this._checkIfIdle();
    }, 30 * 1000);
    this._lastUsedTime = 0;
    this._configChangeListener = this._defaults.onDidChange(function () {
      return _this._stopWorker();
    });
  }

  WorkerManager.prototype._stopWorker = function () {
    if (this._worker) {
      this._worker.dispose();

      this._worker = null;
    }

    this._client = null;
  };

  WorkerManager.prototype.dispose = function () {
    clearInterval(this._idleCheckInterval);

    this._configChangeListener.dispose();

    this._stopWorker();
  };

  WorkerManager.prototype._checkIfIdle = function () {
    if (!this._worker) {
      return;
    }

    var timePassedSinceLastUsed = Date.now() - this._lastUsedTime;

    if (timePassedSinceLastUsed > STOP_WHEN_IDLE_FOR) {
      this._stopWorker();
    }
  };

  WorkerManager.prototype._getClient = function () {
    this._lastUsedTime = Date.now();

    if (!this._client) {
      this._worker = monaco.editor.createWebWorker({
        // module that exports the create() method and returns a `HTMLWorker` instance
        moduleId: 'vs/language/html/htmlWorker',
        // passed in to the create() method
        createData: {
          languageSettings: this._defaults.options,
          languageId: this._defaults.languageId
        },
        label: this._defaults.languageId
      });
      this._client = this._worker.getProxy();
    }

    return this._client;
  };

  WorkerManager.prototype.getLanguageServiceWorker = function () {
    var _this = this;

    var resources = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      resources[_i] = arguments[_i];
    }

    var _client;

    return this._getClient().then(function (client) {
      _client = client;
    }).then(function (_) {
      return _this._worker.withSyncedResources(resources);
    }).then(function (_) {
      return _client;
    });
  };

  return WorkerManager;
}();

exports.WorkerManager = WorkerManager;
},{}],"../node_modules/monaco-editor/esm/vs/language/html/_deps/vscode-languageserver-types/main.js":[function(require,module,exports) {
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';
/**
 * The Position namespace provides helper functions to work with
 * [Position](#Position) literals.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextDocumentSaveReason = exports.TextDocument = exports.EOL = exports.DocumentLink = exports.FormattingOptions = exports.CodeLens = exports.CodeAction = exports.CodeActionContext = exports.CodeActionKind = exports.DocumentSymbol = exports.SymbolInformation = exports.SymbolKind = exports.DocumentHighlight = exports.DocumentHighlightKind = exports.SignatureInformation = exports.ParameterInformation = exports.Hover = exports.MarkedString = exports.CompletionList = exports.CompletionItem = exports.InsertTextFormat = exports.CompletionItemKind = exports.MarkupContent = exports.MarkupKind = exports.TextDocumentItem = exports.VersionedTextDocumentIdentifier = exports.TextDocumentIdentifier = exports.WorkspaceChange = exports.WorkspaceEdit = exports.DeleteFile = exports.RenameFile = exports.CreateFile = exports.TextDocumentEdit = exports.TextEdit = exports.Command = exports.Diagnostic = exports.DiagnosticSeverity = exports.DiagnosticRelatedInformation = exports.FoldingRange = exports.FoldingRangeKind = exports.ColorPresentation = exports.ColorInformation = exports.Color = exports.LocationLink = exports.Location = exports.Range = exports.Position = void 0;
var Position;
exports.Position = Position;

(function (Position) {
  /**
   * Creates a new Position literal from the given line and character.
   * @param line The position's line.
   * @param character The position's character.
   */
  function create(line, character) {
    return {
      line: line,
      character: character
    };
  }

  Position.create = create;
  /**
   * Checks whether the given liternal conforms to the [Position](#Position) interface.
   */

  function is(value) {
    var candidate = value;
    return Is.objectLiteral(candidate) && Is.number(candidate.line) && Is.number(candidate.character);
  }

  Position.is = is;
})(Position || (exports.Position = Position = {}));
/**
 * The Range namespace provides helper functions to work with
 * [Range](#Range) literals.
 */


var Range;
exports.Range = Range;

(function (Range) {
  function create(one, two, three, four) {
    if (Is.number(one) && Is.number(two) && Is.number(three) && Is.number(four)) {
      return {
        start: Position.create(one, two),
        end: Position.create(three, four)
      };
    } else if (Position.is(one) && Position.is(two)) {
      return {
        start: one,
        end: two
      };
    } else {
      throw new Error("Range#create called with invalid arguments[" + one + ", " + two + ", " + three + ", " + four + "]");
    }
  }

  Range.create = create;
  /**
   * Checks whether the given literal conforms to the [Range](#Range) interface.
   */

  function is(value) {
    var candidate = value;
    return Is.objectLiteral(candidate) && Position.is(candidate.start) && Position.is(candidate.end);
  }

  Range.is = is;
})(Range || (exports.Range = Range = {}));
/**
 * The Location namespace provides helper functions to work with
 * [Location](#Location) literals.
 */


var Location;
exports.Location = Location;

(function (Location) {
  /**
   * Creates a Location literal.
   * @param uri The location's uri.
   * @param range The location's range.
   */
  function create(uri, range) {
    return {
      uri: uri,
      range: range
    };
  }

  Location.create = create;
  /**
   * Checks whether the given literal conforms to the [Location](#Location) interface.
   */

  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && Range.is(candidate.range) && (Is.string(candidate.uri) || Is.undefined(candidate.uri));
  }

  Location.is = is;
})(Location || (exports.Location = Location = {}));
/**
 * The LocationLink namespace provides helper functions to work with
 * [LocationLink](#LocationLink) literals.
 */


var LocationLink;
exports.LocationLink = LocationLink;

(function (LocationLink) {
  /**
   * Creates a LocationLink literal.
   * @param targetUri The definition's uri.
   * @param targetRange The full range of the definition.
   * @param targetSelectionRange The span of the symbol definition at the target.
   * @param originSelectionRange The span of the symbol being defined in the originating source file.
   */
  function create(targetUri, targetRange, targetSelectionRange, originSelectionRange) {
    return {
      targetUri: targetUri,
      targetRange: targetRange,
      targetSelectionRange: targetSelectionRange,
      originSelectionRange: originSelectionRange
    };
  }

  LocationLink.create = create;
  /**
   * Checks whether the given literal conforms to the [LocationLink](#LocationLink) interface.
   */

  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && Range.is(candidate.targetRange) && Is.string(candidate.targetUri) && (Range.is(candidate.targetSelectionRange) || Is.undefined(candidate.targetSelectionRange)) && (Range.is(candidate.originSelectionRange) || Is.undefined(candidate.originSelectionRange));
  }

  LocationLink.is = is;
})(LocationLink || (exports.LocationLink = LocationLink = {}));
/**
 * The Color namespace provides helper functions to work with
 * [Color](#Color) literals.
 */


var Color;
exports.Color = Color;

(function (Color) {
  /**
   * Creates a new Color literal.
   */
  function create(red, green, blue, alpha) {
    return {
      red: red,
      green: green,
      blue: blue,
      alpha: alpha
    };
  }

  Color.create = create;
  /**
   * Checks whether the given literal conforms to the [Color](#Color) interface.
   */

  function is(value) {
    var candidate = value;
    return Is.number(candidate.red) && Is.number(candidate.green) && Is.number(candidate.blue) && Is.number(candidate.alpha);
  }

  Color.is = is;
})(Color || (exports.Color = Color = {}));
/**
 * The ColorInformation namespace provides helper functions to work with
 * [ColorInformation](#ColorInformation) literals.
 */


var ColorInformation;
exports.ColorInformation = ColorInformation;

(function (ColorInformation) {
  /**
   * Creates a new ColorInformation literal.
   */
  function create(range, color) {
    return {
      range: range,
      color: color
    };
  }

  ColorInformation.create = create;
  /**
   * Checks whether the given literal conforms to the [ColorInformation](#ColorInformation) interface.
   */

  function is(value) {
    var candidate = value;
    return Range.is(candidate.range) && Color.is(candidate.color);
  }

  ColorInformation.is = is;
})(ColorInformation || (exports.ColorInformation = ColorInformation = {}));
/**
 * The Color namespace provides helper functions to work with
 * [ColorPresentation](#ColorPresentation) literals.
 */


var ColorPresentation;
exports.ColorPresentation = ColorPresentation;

(function (ColorPresentation) {
  /**
   * Creates a new ColorInformation literal.
   */
  function create(label, textEdit, additionalTextEdits) {
    return {
      label: label,
      textEdit: textEdit,
      additionalTextEdits: additionalTextEdits
    };
  }

  ColorPresentation.create = create;
  /**
   * Checks whether the given literal conforms to the [ColorInformation](#ColorInformation) interface.
   */

  function is(value) {
    var candidate = value;
    return Is.string(candidate.label) && (Is.undefined(candidate.textEdit) || TextEdit.is(candidate)) && (Is.undefined(candidate.additionalTextEdits) || Is.typedArray(candidate.additionalTextEdits, TextEdit.is));
  }

  ColorPresentation.is = is;
})(ColorPresentation || (exports.ColorPresentation = ColorPresentation = {}));
/**
 * Enum of known range kinds
 */


var FoldingRangeKind;
exports.FoldingRangeKind = FoldingRangeKind;

(function (FoldingRangeKind) {
  /**
   * Folding range for a comment
   */
  FoldingRangeKind["Comment"] = "comment";
  /**
   * Folding range for a imports or includes
   */

  FoldingRangeKind["Imports"] = "imports";
  /**
   * Folding range for a region (e.g. `#region`)
   */

  FoldingRangeKind["Region"] = "region";
})(FoldingRangeKind || (exports.FoldingRangeKind = FoldingRangeKind = {}));
/**
 * The folding range namespace provides helper functions to work with
 * [FoldingRange](#FoldingRange) literals.
 */


var FoldingRange;
exports.FoldingRange = FoldingRange;

(function (FoldingRange) {
  /**
   * Creates a new FoldingRange literal.
   */
  function create(startLine, endLine, startCharacter, endCharacter, kind) {
    var result = {
      startLine: startLine,
      endLine: endLine
    };

    if (Is.defined(startCharacter)) {
      result.startCharacter = startCharacter;
    }

    if (Is.defined(endCharacter)) {
      result.endCharacter = endCharacter;
    }

    if (Is.defined(kind)) {
      result.kind = kind;
    }

    return result;
  }

  FoldingRange.create = create;
  /**
   * Checks whether the given literal conforms to the [FoldingRange](#FoldingRange) interface.
   */

  function is(value) {
    var candidate = value;
    return Is.number(candidate.startLine) && Is.number(candidate.startLine) && (Is.undefined(candidate.startCharacter) || Is.number(candidate.startCharacter)) && (Is.undefined(candidate.endCharacter) || Is.number(candidate.endCharacter)) && (Is.undefined(candidate.kind) || Is.string(candidate.kind));
  }

  FoldingRange.is = is;
})(FoldingRange || (exports.FoldingRange = FoldingRange = {}));
/**
 * The DiagnosticRelatedInformation namespace provides helper functions to work with
 * [DiagnosticRelatedInformation](#DiagnosticRelatedInformation) literals.
 */


var DiagnosticRelatedInformation;
exports.DiagnosticRelatedInformation = DiagnosticRelatedInformation;

(function (DiagnosticRelatedInformation) {
  /**
   * Creates a new DiagnosticRelatedInformation literal.
   */
  function create(location, message) {
    return {
      location: location,
      message: message
    };
  }

  DiagnosticRelatedInformation.create = create;
  /**
   * Checks whether the given literal conforms to the [DiagnosticRelatedInformation](#DiagnosticRelatedInformation) interface.
   */

  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && Location.is(candidate.location) && Is.string(candidate.message);
  }

  DiagnosticRelatedInformation.is = is;
})(DiagnosticRelatedInformation || (exports.DiagnosticRelatedInformation = DiagnosticRelatedInformation = {}));
/**
 * The diagnostic's severity.
 */


var DiagnosticSeverity;
exports.DiagnosticSeverity = DiagnosticSeverity;

(function (DiagnosticSeverity) {
  /**
   * Reports an error.
   */
  DiagnosticSeverity.Error = 1;
  /**
   * Reports a warning.
   */

  DiagnosticSeverity.Warning = 2;
  /**
   * Reports an information.
   */

  DiagnosticSeverity.Information = 3;
  /**
   * Reports a hint.
   */

  DiagnosticSeverity.Hint = 4;
})(DiagnosticSeverity || (exports.DiagnosticSeverity = DiagnosticSeverity = {}));
/**
 * The Diagnostic namespace provides helper functions to work with
 * [Diagnostic](#Diagnostic) literals.
 */


var Diagnostic;
exports.Diagnostic = Diagnostic;

(function (Diagnostic) {
  /**
   * Creates a new Diagnostic literal.
   */
  function create(range, message, severity, code, source, relatedInformation) {
    var result = {
      range: range,
      message: message
    };

    if (Is.defined(severity)) {
      result.severity = severity;
    }

    if (Is.defined(code)) {
      result.code = code;
    }

    if (Is.defined(source)) {
      result.source = source;
    }

    if (Is.defined(relatedInformation)) {
      result.relatedInformation = relatedInformation;
    }

    return result;
  }

  Diagnostic.create = create;
  /**
   * Checks whether the given literal conforms to the [Diagnostic](#Diagnostic) interface.
   */

  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && Range.is(candidate.range) && Is.string(candidate.message) && (Is.number(candidate.severity) || Is.undefined(candidate.severity)) && (Is.number(candidate.code) || Is.string(candidate.code) || Is.undefined(candidate.code)) && (Is.string(candidate.source) || Is.undefined(candidate.source)) && (Is.undefined(candidate.relatedInformation) || Is.typedArray(candidate.relatedInformation, DiagnosticRelatedInformation.is));
  }

  Diagnostic.is = is;
})(Diagnostic || (exports.Diagnostic = Diagnostic = {}));
/**
 * The Command namespace provides helper functions to work with
 * [Command](#Command) literals.
 */


var Command;
exports.Command = Command;

(function (Command) {
  /**
   * Creates a new Command literal.
   */
  function create(title, command) {
    var args = [];

    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }

    var result = {
      title: title,
      command: command
    };

    if (Is.defined(args) && args.length > 0) {
      result.arguments = args;
    }

    return result;
  }

  Command.create = create;
  /**
   * Checks whether the given literal conforms to the [Command](#Command) interface.
   */

  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && Is.string(candidate.title) && Is.string(candidate.command);
  }

  Command.is = is;
})(Command || (exports.Command = Command = {}));
/**
 * The TextEdit namespace provides helper function to create replace,
 * insert and delete edits more easily.
 */


var TextEdit;
exports.TextEdit = TextEdit;

(function (TextEdit) {
  /**
   * Creates a replace text edit.
   * @param range The range of text to be replaced.
   * @param newText The new text.
   */
  function replace(range, newText) {
    return {
      range: range,
      newText: newText
    };
  }

  TextEdit.replace = replace;
  /**
   * Creates a insert text edit.
   * @param position The position to insert the text at.
   * @param newText The text to be inserted.
   */

  function insert(position, newText) {
    return {
      range: {
        start: position,
        end: position
      },
      newText: newText
    };
  }

  TextEdit.insert = insert;
  /**
   * Creates a delete text edit.
   * @param range The range of text to be deleted.
   */

  function del(range) {
    return {
      range: range,
      newText: ''
    };
  }

  TextEdit.del = del;

  function is(value) {
    var candidate = value;
    return Is.objectLiteral(candidate) && Is.string(candidate.newText) && Range.is(candidate.range);
  }

  TextEdit.is = is;
})(TextEdit || (exports.TextEdit = TextEdit = {}));
/**
 * The TextDocumentEdit namespace provides helper function to create
 * an edit that manipulates a text document.
 */


var TextDocumentEdit;
exports.TextDocumentEdit = TextDocumentEdit;

(function (TextDocumentEdit) {
  /**
   * Creates a new `TextDocumentEdit`
   */
  function create(textDocument, edits) {
    return {
      textDocument: textDocument,
      edits: edits
    };
  }

  TextDocumentEdit.create = create;

  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && VersionedTextDocumentIdentifier.is(candidate.textDocument) && Array.isArray(candidate.edits);
  }

  TextDocumentEdit.is = is;
})(TextDocumentEdit || (exports.TextDocumentEdit = TextDocumentEdit = {}));

var CreateFile;
exports.CreateFile = CreateFile;

(function (CreateFile) {
  function create(uri, options) {
    var result = {
      kind: 'create',
      uri: uri
    };

    if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) {
      result.options = options;
    }

    return result;
  }

  CreateFile.create = create;

  function is(value) {
    var candidate = value;
    return candidate && candidate.kind === 'create' && Is.string(candidate.uri) && (candidate.options === void 0 || (candidate.options.overwrite === void 0 || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is.boolean(candidate.options.ignoreIfExists)));
  }

  CreateFile.is = is;
})(CreateFile || (exports.CreateFile = CreateFile = {}));

var RenameFile;
exports.RenameFile = RenameFile;

(function (RenameFile) {
  function create(oldUri, newUri, options) {
    var result = {
      kind: 'rename',
      oldUri: oldUri,
      newUri: newUri
    };

    if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) {
      result.options = options;
    }

    return result;
  }

  RenameFile.create = create;

  function is(value) {
    var candidate = value;
    return candidate && candidate.kind === 'rename' && Is.string(candidate.oldUri) && Is.string(candidate.newUri) && (candidate.options === void 0 || (candidate.options.overwrite === void 0 || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is.boolean(candidate.options.ignoreIfExists)));
  }

  RenameFile.is = is;
})(RenameFile || (exports.RenameFile = RenameFile = {}));

var DeleteFile;
exports.DeleteFile = DeleteFile;

(function (DeleteFile) {
  function create(uri, options) {
    var result = {
      kind: 'delete',
      uri: uri
    };

    if (options !== void 0 && (options.recursive !== void 0 || options.ignoreIfNotExists !== void 0)) {
      result.options = options;
    }

    return result;
  }

  DeleteFile.create = create;

  function is(value) {
    var candidate = value;
    return candidate && candidate.kind === 'delete' && Is.string(candidate.uri) && (candidate.options === void 0 || (candidate.options.recursive === void 0 || Is.boolean(candidate.options.recursive)) && (candidate.options.ignoreIfNotExists === void 0 || Is.boolean(candidate.options.ignoreIfNotExists)));
  }

  DeleteFile.is = is;
})(DeleteFile || (exports.DeleteFile = DeleteFile = {}));

var WorkspaceEdit;
exports.WorkspaceEdit = WorkspaceEdit;

(function (WorkspaceEdit) {
  function is(value) {
    var candidate = value;
    return candidate && (candidate.changes !== void 0 || candidate.documentChanges !== void 0) && (candidate.documentChanges === void 0 || candidate.documentChanges.every(function (change) {
      if (Is.string(change.kind)) {
        return CreateFile.is(change) || RenameFile.is(change) || DeleteFile.is(change);
      } else {
        return TextDocumentEdit.is(change);
      }
    }));
  }

  WorkspaceEdit.is = is;
})(WorkspaceEdit || (exports.WorkspaceEdit = WorkspaceEdit = {}));

var TextEditChangeImpl =
/** @class */
function () {
  function TextEditChangeImpl(edits) {
    this.edits = edits;
  }

  TextEditChangeImpl.prototype.insert = function (position, newText) {
    this.edits.push(TextEdit.insert(position, newText));
  };

  TextEditChangeImpl.prototype.replace = function (range, newText) {
    this.edits.push(TextEdit.replace(range, newText));
  };

  TextEditChangeImpl.prototype.delete = function (range) {
    this.edits.push(TextEdit.del(range));
  };

  TextEditChangeImpl.prototype.add = function (edit) {
    this.edits.push(edit);
  };

  TextEditChangeImpl.prototype.all = function () {
    return this.edits;
  };

  TextEditChangeImpl.prototype.clear = function () {
    this.edits.splice(0, this.edits.length);
  };

  return TextEditChangeImpl;
}();
/**
 * A workspace change helps constructing changes to a workspace.
 */


var WorkspaceChange =
/** @class */
function () {
  function WorkspaceChange(workspaceEdit) {
    var _this = this;

    this._textEditChanges = Object.create(null);

    if (workspaceEdit) {
      this._workspaceEdit = workspaceEdit;

      if (workspaceEdit.documentChanges) {
        workspaceEdit.documentChanges.forEach(function (change) {
          if (TextDocumentEdit.is(change)) {
            var textEditChange = new TextEditChangeImpl(change.edits);
            _this._textEditChanges[change.textDocument.uri] = textEditChange;
          }
        });
      } else if (workspaceEdit.changes) {
        Object.keys(workspaceEdit.changes).forEach(function (key) {
          var textEditChange = new TextEditChangeImpl(workspaceEdit.changes[key]);
          _this._textEditChanges[key] = textEditChange;
        });
      }
    }
  }

  Object.defineProperty(WorkspaceChange.prototype, "edit", {
    /**
     * Returns the underlying [WorkspaceEdit](#WorkspaceEdit) literal
     * use to be returned from a workspace edit operation like rename.
     */
    get: function () {
      return this._workspaceEdit;
    },
    enumerable: true,
    configurable: true
  });

  WorkspaceChange.prototype.getTextEditChange = function (key) {
    if (VersionedTextDocumentIdentifier.is(key)) {
      if (!this._workspaceEdit) {
        this._workspaceEdit = {
          documentChanges: []
        };
      }

      if (!this._workspaceEdit.documentChanges) {
        throw new Error('Workspace edit is not configured for document changes.');
      }

      var textDocument = key;
      var result = this._textEditChanges[textDocument.uri];

      if (!result) {
        var edits = [];
        var textDocumentEdit = {
          textDocument: textDocument,
          edits: edits
        };

        this._workspaceEdit.documentChanges.push(textDocumentEdit);

        result = new TextEditChangeImpl(edits);
        this._textEditChanges[textDocument.uri] = result;
      }

      return result;
    } else {
      if (!this._workspaceEdit) {
        this._workspaceEdit = {
          changes: Object.create(null)
        };
      }

      if (!this._workspaceEdit.changes) {
        throw new Error('Workspace edit is not configured for normal text edit changes.');
      }

      var result = this._textEditChanges[key];

      if (!result) {
        var edits = [];
        this._workspaceEdit.changes[key] = edits;
        result = new TextEditChangeImpl(edits);
        this._textEditChanges[key] = result;
      }

      return result;
    }
  };

  WorkspaceChange.prototype.createFile = function (uri, options) {
    this.checkDocumentChanges();

    this._workspaceEdit.documentChanges.push(CreateFile.create(uri, options));
  };

  WorkspaceChange.prototype.renameFile = function (oldUri, newUri, options) {
    this.checkDocumentChanges();

    this._workspaceEdit.documentChanges.push(RenameFile.create(oldUri, newUri, options));
  };

  WorkspaceChange.prototype.deleteFile = function (uri, options) {
    this.checkDocumentChanges();

    this._workspaceEdit.documentChanges.push(DeleteFile.create(uri, options));
  };

  WorkspaceChange.prototype.checkDocumentChanges = function () {
    if (!this._workspaceEdit || !this._workspaceEdit.documentChanges) {
      throw new Error('Workspace edit is not configured for document changes.');
    }
  };

  return WorkspaceChange;
}();

exports.WorkspaceChange = WorkspaceChange;

/**
 * The TextDocumentIdentifier namespace provides helper functions to work with
 * [TextDocumentIdentifier](#TextDocumentIdentifier) literals.
 */
var TextDocumentIdentifier;
exports.TextDocumentIdentifier = TextDocumentIdentifier;

(function (TextDocumentIdentifier) {
  /**
   * Creates a new TextDocumentIdentifier literal.
   * @param uri The document's uri.
   */
  function create(uri) {
    return {
      uri: uri
    };
  }

  TextDocumentIdentifier.create = create;
  /**
   * Checks whether the given literal conforms to the [TextDocumentIdentifier](#TextDocumentIdentifier) interface.
   */

  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && Is.string(candidate.uri);
  }

  TextDocumentIdentifier.is = is;
})(TextDocumentIdentifier || (exports.TextDocumentIdentifier = TextDocumentIdentifier = {}));
/**
 * The VersionedTextDocumentIdentifier namespace provides helper functions to work with
 * [VersionedTextDocumentIdentifier](#VersionedTextDocumentIdentifier) literals.
 */


var VersionedTextDocumentIdentifier;
exports.VersionedTextDocumentIdentifier = VersionedTextDocumentIdentifier;

(function (VersionedTextDocumentIdentifier) {
  /**
   * Creates a new VersionedTextDocumentIdentifier literal.
   * @param uri The document's uri.
   * @param uri The document's text.
   */
  function create(uri, version) {
    return {
      uri: uri,
      version: version
    };
  }

  VersionedTextDocumentIdentifier.create = create;
  /**
   * Checks whether the given literal conforms to the [VersionedTextDocumentIdentifier](#VersionedTextDocumentIdentifier) interface.
   */

  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && Is.string(candidate.uri) && (candidate.version === null || Is.number(candidate.version));
  }

  VersionedTextDocumentIdentifier.is = is;
})(VersionedTextDocumentIdentifier || (exports.VersionedTextDocumentIdentifier = VersionedTextDocumentIdentifier = {}));
/**
 * The TextDocumentItem namespace provides helper functions to work with
 * [TextDocumentItem](#TextDocumentItem) literals.
 */


var TextDocumentItem;
exports.TextDocumentItem = TextDocumentItem;

(function (TextDocumentItem) {
  /**
   * Creates a new TextDocumentItem literal.
   * @param uri The document's uri.
   * @param languageId The document's language identifier.
   * @param version The document's version number.
   * @param text The document's text.
   */
  function create(uri, languageId, version, text) {
    return {
      uri: uri,
      languageId: languageId,
      version: version,
      text: text
    };
  }

  TextDocumentItem.create = create;
  /**
   * Checks whether the given literal conforms to the [TextDocumentItem](#TextDocumentItem) interface.
   */

  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && Is.string(candidate.uri) && Is.string(candidate.languageId) && Is.number(candidate.version) && Is.string(candidate.text);
  }

  TextDocumentItem.is = is;
})(TextDocumentItem || (exports.TextDocumentItem = TextDocumentItem = {}));
/**
 * Describes the content type that a client supports in various
 * result literals like `Hover`, `ParameterInfo` or `CompletionItem`.
 *
 * Please note that `MarkupKinds` must not start with a `$`. This kinds
 * are reserved for internal usage.
 */


var MarkupKind;
exports.MarkupKind = MarkupKind;

(function (MarkupKind) {
  /**
   * Plain text is supported as a content format
   */
  MarkupKind.PlainText = 'plaintext';
  /**
   * Markdown is supported as a content format
   */

  MarkupKind.Markdown = 'markdown';
})(MarkupKind || (exports.MarkupKind = MarkupKind = {}));

(function (MarkupKind) {
  /**
   * Checks whether the given value is a value of the [MarkupKind](#MarkupKind) type.
   */
  function is(value) {
    var candidate = value;
    return candidate === MarkupKind.PlainText || candidate === MarkupKind.Markdown;
  }

  MarkupKind.is = is;
})(MarkupKind || (exports.MarkupKind = MarkupKind = {}));

var MarkupContent;
exports.MarkupContent = MarkupContent;

(function (MarkupContent) {
  /**
   * Checks whether the given value conforms to the [MarkupContent](#MarkupContent) interface.
   */
  function is(value) {
    var candidate = value;
    return Is.objectLiteral(value) && MarkupKind.is(candidate.kind) && Is.string(candidate.value);
  }

  MarkupContent.is = is;
})(MarkupContent || (exports.MarkupContent = MarkupContent = {}));
/**
 * The kind of a completion entry.
 */


var CompletionItemKind;
exports.CompletionItemKind = CompletionItemKind;

(function (CompletionItemKind) {
  CompletionItemKind.Text = 1;
  CompletionItemKind.Method = 2;
  CompletionItemKind.Function = 3;
  CompletionItemKind.Constructor = 4;
  CompletionItemKind.Field = 5;
  CompletionItemKind.Variable = 6;
  CompletionItemKind.Class = 7;
  CompletionItemKind.Interface = 8;
  CompletionItemKind.Module = 9;
  CompletionItemKind.Property = 10;
  CompletionItemKind.Unit = 11;
  CompletionItemKind.Value = 12;
  CompletionItemKind.Enum = 13;
  CompletionItemKind.Keyword = 14;
  CompletionItemKind.Snippet = 15;
  CompletionItemKind.Color = 16;
  CompletionItemKind.File = 17;
  CompletionItemKind.Reference = 18;
  CompletionItemKind.Folder = 19;
  CompletionItemKind.EnumMember = 20;
  CompletionItemKind.Constant = 21;
  CompletionItemKind.Struct = 22;
  CompletionItemKind.Event = 23;
  CompletionItemKind.Operator = 24;
  CompletionItemKind.TypeParameter = 25;
})(CompletionItemKind || (exports.CompletionItemKind = CompletionItemKind = {}));
/**
 * Defines whether the insert text in a completion item should be interpreted as
 * plain text or a snippet.
 */


var InsertTextFormat;
exports.InsertTextFormat = InsertTextFormat;

(function (InsertTextFormat) {
  /**
   * The primary text to be inserted is treated as a plain string.
   */
  InsertTextFormat.PlainText = 1;
  /**
   * The primary text to be inserted is treated as a snippet.
   *
   * A snippet can define tab stops and placeholders with `$1`, `$2`
   * and `${3:foo}`. `$0` defines the final tab stop, it defaults to
   * the end of the snippet. Placeholders with equal identifiers are linked,
   * that is typing in one will update others too.
   *
   * See also: https://github.com/Microsoft/vscode/blob/master/src/vs/editor/contrib/snippet/common/snippet.md
   */

  InsertTextFormat.Snippet = 2;
})(InsertTextFormat || (exports.InsertTextFormat = InsertTextFormat = {}));
/**
 * The CompletionItem namespace provides functions to deal with
 * completion items.
 */


var CompletionItem;
exports.CompletionItem = CompletionItem;

(function (CompletionItem) {
  /**
   * Create a completion item and seed it with a label.
   * @param label The completion item's label
   */
  function create(label) {
    return {
      label: label
    };
  }

  CompletionItem.create = create;
})(CompletionItem || (exports.CompletionItem = CompletionItem = {}));
/**
 * The CompletionList namespace provides functions to deal with
 * completion lists.
 */


var CompletionList;
exports.CompletionList = CompletionList;

(function (CompletionList) {
  /**
   * Creates a new completion list.
   *
   * @param items The completion items.
   * @param isIncomplete The list is not complete.
   */
  function create(items, isIncomplete) {
    return {
      items: items ? items : [],
      isIncomplete: !!isIncomplete
    };
  }

  CompletionList.create = create;
})(CompletionList || (exports.CompletionList = CompletionList = {}));

var MarkedString;
exports.MarkedString = MarkedString;

(function (MarkedString) {
  /**
   * Creates a marked string from plain text.
   *
   * @param plainText The plain text.
   */
  function fromPlainText(plainText) {
    return plainText.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&"); // escape markdown syntax tokens: http://daringfireball.net/projects/markdown/syntax#backslash
  }

  MarkedString.fromPlainText = fromPlainText;
  /**
   * Checks whether the given value conforms to the [MarkedString](#MarkedString) type.
   */

  function is(value) {
    var candidate = value;
    return Is.string(candidate) || Is.objectLiteral(candidate) && Is.string(candidate.language) && Is.string(candidate.value);
  }

  MarkedString.is = is;
})(MarkedString || (exports.MarkedString = MarkedString = {}));

var Hover;
exports.Hover = Hover;

(function (Hover) {
  /**
   * Checks whether the given value conforms to the [Hover](#Hover) interface.
   */
  function is(value) {
    var candidate = value;
    return !!candidate && Is.objectLiteral(candidate) && (MarkupContent.is(candidate.contents) || MarkedString.is(candidate.contents) || Is.typedArray(candidate.contents, MarkedString.is)) && (value.range === void 0 || Range.is(value.range));
  }

  Hover.is = is;
})(Hover || (exports.Hover = Hover = {}));
/**
 * The ParameterInformation namespace provides helper functions to work with
 * [ParameterInformation](#ParameterInformation) literals.
 */


var ParameterInformation;
exports.ParameterInformation = ParameterInformation;

(function (ParameterInformation) {
  /**
   * Creates a new parameter information literal.
   *
   * @param label A label string.
   * @param documentation A doc string.
   */
  function create(label, documentation) {
    return documentation ? {
      label: label,
      documentation: documentation
    } : {
      label: label
    };
  }

  ParameterInformation.create = create;
  ;
})(ParameterInformation || (exports.ParameterInformation = ParameterInformation = {}));
/**
 * The SignatureInformation namespace provides helper functions to work with
 * [SignatureInformation](#SignatureInformation) literals.
 */


var SignatureInformation;
exports.SignatureInformation = SignatureInformation;

(function (SignatureInformation) {
  function create(label, documentation) {
    var parameters = [];

    for (var _i = 2; _i < arguments.length; _i++) {
      parameters[_i - 2] = arguments[_i];
    }

    var result = {
      label: label
    };

    if (Is.defined(documentation)) {
      result.documentation = documentation;
    }

    if (Is.defined(parameters)) {
      result.parameters = parameters;
    } else {
      result.parameters = [];
    }

    return result;
  }

  SignatureInformation.create = create;
})(SignatureInformation || (exports.SignatureInformation = SignatureInformation = {}));
/**
 * A document highlight kind.
 */


var DocumentHighlightKind;
exports.DocumentHighlightKind = DocumentHighlightKind;

(function (DocumentHighlightKind) {
  /**
   * A textual occurrence.
   */
  DocumentHighlightKind.Text = 1;
  /**
   * Read-access of a symbol, like reading a variable.
   */

  DocumentHighlightKind.Read = 2;
  /**
   * Write-access of a symbol, like writing to a variable.
   */

  DocumentHighlightKind.Write = 3;
})(DocumentHighlightKind || (exports.DocumentHighlightKind = DocumentHighlightKind = {}));
/**
 * DocumentHighlight namespace to provide helper functions to work with
 * [DocumentHighlight](#DocumentHighlight) literals.
 */


var DocumentHighlight;
exports.DocumentHighlight = DocumentHighlight;

(function (DocumentHighlight) {
  /**
   * Create a DocumentHighlight object.
   * @param range The range the highlight applies to.
   */
  function create(range, kind) {
    var result = {
      range: range
    };

    if (Is.number(kind)) {
      result.kind = kind;
    }

    return result;
  }

  DocumentHighlight.create = create;
})(DocumentHighlight || (exports.DocumentHighlight = DocumentHighlight = {}));
/**
 * A symbol kind.
 */


var SymbolKind;
exports.SymbolKind = SymbolKind;

(function (SymbolKind) {
  SymbolKind.File = 1;
  SymbolKind.Module = 2;
  SymbolKind.Namespace = 3;
  SymbolKind.Package = 4;
  SymbolKind.Class = 5;
  SymbolKind.Method = 6;
  SymbolKind.Property = 7;
  SymbolKind.Field = 8;
  SymbolKind.Constructor = 9;
  SymbolKind.Enum = 10;
  SymbolKind.Interface = 11;
  SymbolKind.Function = 12;
  SymbolKind.Variable = 13;
  SymbolKind.Constant = 14;
  SymbolKind.String = 15;
  SymbolKind.Number = 16;
  SymbolKind.Boolean = 17;
  SymbolKind.Array = 18;
  SymbolKind.Object = 19;
  SymbolKind.Key = 20;
  SymbolKind.Null = 21;
  SymbolKind.EnumMember = 22;
  SymbolKind.Struct = 23;
  SymbolKind.Event = 24;
  SymbolKind.Operator = 25;
  SymbolKind.TypeParameter = 26;
})(SymbolKind || (exports.SymbolKind = SymbolKind = {}));

var SymbolInformation;
exports.SymbolInformation = SymbolInformation;

(function (SymbolInformation) {
  /**
   * Creates a new symbol information literal.
   *
   * @param name The name of the symbol.
   * @param kind The kind of the symbol.
   * @param range The range of the location of the symbol.
   * @param uri The resource of the location of symbol, defaults to the current document.
   * @param containerName The name of the symbol containing the symbol.
   */
  function create(name, kind, range, uri, containerName) {
    var result = {
      name: name,
      kind: kind,
      location: {
        uri: uri,
        range: range
      }
    };

    if (containerName) {
      result.containerName = containerName;
    }

    return result;
  }

  SymbolInformation.create = create;
})(SymbolInformation || (exports.SymbolInformation = SymbolInformation = {}));
/**
 * Represents programming constructs like variables, classes, interfaces etc.
 * that appear in a document. Document symbols can be hierarchical and they
 * have two ranges: one that encloses its definition and one that points to
 * its most interesting range, e.g. the range of an identifier.
 */


var DocumentSymbol =
/** @class */
function () {
  function DocumentSymbol() {}

  return DocumentSymbol;
}();

exports.DocumentSymbol = DocumentSymbol;

(function (DocumentSymbol) {
  /**
   * Creates a new symbol information literal.
   *
   * @param name The name of the symbol.
   * @param detail The detail of the symbol.
   * @param kind The kind of the symbol.
   * @param range The range of the symbol.
   * @param selectionRange The selectionRange of the symbol.
   * @param children Children of the symbol.
   */
  function create(name, detail, kind, range, selectionRange, children) {
    var result = {
      name: name,
      detail: detail,
      kind: kind,
      range: range,
      selectionRange: selectionRange
    };

    if (children !== void 0) {
      result.children = children;
    }

    return result;
  }

  DocumentSymbol.create = create;
  /**
   * Checks whether the given literal conforms to the [DocumentSymbol](#DocumentSymbol) interface.
   */

  function is(value) {
    var candidate = value;
    return candidate && Is.string(candidate.name) && Is.number(candidate.kind) && Range.is(candidate.range) && Range.is(candidate.selectionRange) && (candidate.detail === void 0 || Is.string(candidate.detail)) && (candidate.deprecated === void 0 || Is.boolean(candidate.deprecated)) && (candidate.children === void 0 || Array.isArray(candidate.children));
  }

  DocumentSymbol.is = is;
})(DocumentSymbol || (exports.DocumentSymbol = DocumentSymbol = {}));
/**
 * A set of predefined code action kinds
 */


var CodeActionKind;
exports.CodeActionKind = CodeActionKind;

(function (CodeActionKind) {
  /**
   * Base kind for quickfix actions: 'quickfix'
   */
  CodeActionKind.QuickFix = 'quickfix';
  /**
   * Base kind for refactoring actions: 'refactor'
   */

  CodeActionKind.Refactor = 'refactor';
  /**
   * Base kind for refactoring extraction actions: 'refactor.extract'
   *
   * Example extract actions:
   *
   * - Extract method
   * - Extract function
   * - Extract variable
   * - Extract interface from class
   * - ...
   */

  CodeActionKind.RefactorExtract = 'refactor.extract';
  /**
   * Base kind for refactoring inline actions: 'refactor.inline'
   *
   * Example inline actions:
   *
   * - Inline function
   * - Inline variable
   * - Inline constant
   * - ...
   */

  CodeActionKind.RefactorInline = 'refactor.inline';
  /**
   * Base kind for refactoring rewrite actions: 'refactor.rewrite'
   *
   * Example rewrite actions:
   *
   * - Convert JavaScript function to class
   * - Add or remove parameter
   * - Encapsulate field
   * - Make method static
   * - Move method to base class
   * - ...
   */

  CodeActionKind.RefactorRewrite = 'refactor.rewrite';
  /**
   * Base kind for source actions: `source`
   *
   * Source code actions apply to the entire file.
   */

  CodeActionKind.Source = 'source';
  /**
   * Base kind for an organize imports source action: `source.organizeImports`
   */

  CodeActionKind.SourceOrganizeImports = 'source.organizeImports';
})(CodeActionKind || (exports.CodeActionKind = CodeActionKind = {}));
/**
 * The CodeActionContext namespace provides helper functions to work with
 * [CodeActionContext](#CodeActionContext) literals.
 */


var CodeActionContext;
exports.CodeActionContext = CodeActionContext;

(function (CodeActionContext) {
  /**
   * Creates a new CodeActionContext literal.
   */
  function create(diagnostics, only) {
    var result = {
      diagnostics: diagnostics
    };

    if (only !== void 0 && only !== null) {
      result.only = only;
    }

    return result;
  }

  CodeActionContext.create = create;
  /**
   * Checks whether the given literal conforms to the [CodeActionContext](#CodeActionContext) interface.
   */

  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && Is.typedArray(candidate.diagnostics, Diagnostic.is) && (candidate.only === void 0 || Is.typedArray(candidate.only, Is.string));
  }

  CodeActionContext.is = is;
})(CodeActionContext || (exports.CodeActionContext = CodeActionContext = {}));

var CodeAction;
exports.CodeAction = CodeAction;

(function (CodeAction) {
  function create(title, commandOrEdit, kind) {
    var result = {
      title: title
    };

    if (Command.is(commandOrEdit)) {
      result.command = commandOrEdit;
    } else {
      result.edit = commandOrEdit;
    }

    if (kind !== void null) {
      result.kind = kind;
    }

    return result;
  }

  CodeAction.create = create;

  function is(value) {
    var candidate = value;
    return candidate && Is.string(candidate.title) && (candidate.diagnostics === void 0 || Is.typedArray(candidate.diagnostics, Diagnostic.is)) && (candidate.kind === void 0 || Is.string(candidate.kind)) && (candidate.edit !== void 0 || candidate.command !== void 0) && (candidate.command === void 0 || Command.is(candidate.command)) && (candidate.edit === void 0 || WorkspaceEdit.is(candidate.edit));
  }

  CodeAction.is = is;
})(CodeAction || (exports.CodeAction = CodeAction = {}));
/**
 * The CodeLens namespace provides helper functions to work with
 * [CodeLens](#CodeLens) literals.
 */


var CodeLens;
exports.CodeLens = CodeLens;

(function (CodeLens) {
  /**
   * Creates a new CodeLens literal.
   */
  function create(range, data) {
    var result = {
      range: range
    };
    if (Is.defined(data)) result.data = data;
    return result;
  }

  CodeLens.create = create;
  /**
   * Checks whether the given literal conforms to the [CodeLens](#CodeLens) interface.
   */

  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.command) || Command.is(candidate.command));
  }

  CodeLens.is = is;
})(CodeLens || (exports.CodeLens = CodeLens = {}));
/**
 * The FormattingOptions namespace provides helper functions to work with
 * [FormattingOptions](#FormattingOptions) literals.
 */


var FormattingOptions;
exports.FormattingOptions = FormattingOptions;

(function (FormattingOptions) {
  /**
   * Creates a new FormattingOptions literal.
   */
  function create(tabSize, insertSpaces) {
    return {
      tabSize: tabSize,
      insertSpaces: insertSpaces
    };
  }

  FormattingOptions.create = create;
  /**
   * Checks whether the given literal conforms to the [FormattingOptions](#FormattingOptions) interface.
   */

  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && Is.number(candidate.tabSize) && Is.boolean(candidate.insertSpaces);
  }

  FormattingOptions.is = is;
})(FormattingOptions || (exports.FormattingOptions = FormattingOptions = {}));
/**
 * A document link is a range in a text document that links to an internal or external resource, like another
 * text document or a web site.
 */


var DocumentLink =
/** @class */
function () {
  function DocumentLink() {}

  return DocumentLink;
}();

exports.DocumentLink = DocumentLink;

/**
 * The DocumentLink namespace provides helper functions to work with
 * [DocumentLink](#DocumentLink) literals.
 */
(function (DocumentLink) {
  /**
   * Creates a new DocumentLink literal.
   */
  function create(range, target, data) {
    return {
      range: range,
      target: target,
      data: data
    };
  }

  DocumentLink.create = create;
  /**
   * Checks whether the given literal conforms to the [DocumentLink](#DocumentLink) interface.
   */

  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.target) || Is.string(candidate.target));
  }

  DocumentLink.is = is;
})(DocumentLink || (exports.DocumentLink = DocumentLink = {}));

var EOL = ['\n', '\r\n', '\r'];
exports.EOL = EOL;
var TextDocument;
exports.TextDocument = TextDocument;

(function (TextDocument) {
  /**
   * Creates a new ITextDocument literal from the given uri and content.
   * @param uri The document's uri.
   * @param languageId  The document's language Id.
   * @param content The document's content.
   */
  function create(uri, languageId, version, content) {
    return new FullTextDocument(uri, languageId, version, content);
  }

  TextDocument.create = create;
  /**
   * Checks whether the given literal conforms to the [ITextDocument](#ITextDocument) interface.
   */

  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && Is.string(candidate.uri) && (Is.undefined(candidate.languageId) || Is.string(candidate.languageId)) && Is.number(candidate.lineCount) && Is.func(candidate.getText) && Is.func(candidate.positionAt) && Is.func(candidate.offsetAt) ? true : false;
  }

  TextDocument.is = is;

  function applyEdits(document, edits) {
    var text = document.getText();
    var sortedEdits = mergeSort(edits, function (a, b) {
      var diff = a.range.start.line - b.range.start.line;

      if (diff === 0) {
        return a.range.start.character - b.range.start.character;
      }

      return diff;
    });
    var lastModifiedOffset = text.length;

    for (var i = sortedEdits.length - 1; i >= 0; i--) {
      var e = sortedEdits[i];
      var startOffset = document.offsetAt(e.range.start);
      var endOffset = document.offsetAt(e.range.end);

      if (endOffset <= lastModifiedOffset) {
        text = text.substring(0, startOffset) + e.newText + text.substring(endOffset, text.length);
      } else {
        throw new Error('Overlapping edit');
      }

      lastModifiedOffset = startOffset;
    }

    return text;
  }

  TextDocument.applyEdits = applyEdits;

  function mergeSort(data, compare) {
    if (data.length <= 1) {
      // sorted
      return data;
    }

    var p = data.length / 2 | 0;
    var left = data.slice(0, p);
    var right = data.slice(p);
    mergeSort(left, compare);
    mergeSort(right, compare);
    var leftIdx = 0;
    var rightIdx = 0;
    var i = 0;

    while (leftIdx < left.length && rightIdx < right.length) {
      var ret = compare(left[leftIdx], right[rightIdx]);

      if (ret <= 0) {
        // smaller_equal -> take left to preserve order
        data[i++] = left[leftIdx++];
      } else {
        // greater -> take right
        data[i++] = right[rightIdx++];
      }
    }

    while (leftIdx < left.length) {
      data[i++] = left[leftIdx++];
    }

    while (rightIdx < right.length) {
      data[i++] = right[rightIdx++];
    }

    return data;
  }
})(TextDocument || (exports.TextDocument = TextDocument = {}));
/**
 * Represents reasons why a text document is saved.
 */


var TextDocumentSaveReason;
exports.TextDocumentSaveReason = TextDocumentSaveReason;

(function (TextDocumentSaveReason) {
  /**
   * Manually triggered, e.g. by the user pressing save, by starting debugging,
   * or by an API call.
   */
  TextDocumentSaveReason.Manual = 1;
  /**
   * Automatic after a delay.
   */

  TextDocumentSaveReason.AfterDelay = 2;
  /**
   * When the editor lost focus.
   */

  TextDocumentSaveReason.FocusOut = 3;
})(TextDocumentSaveReason || (exports.TextDocumentSaveReason = TextDocumentSaveReason = {}));

var FullTextDocument =
/** @class */
function () {
  function FullTextDocument(uri, languageId, version, content) {
    this._uri = uri;
    this._languageId = languageId;
    this._version = version;
    this._content = content;
    this._lineOffsets = null;
  }

  Object.defineProperty(FullTextDocument.prototype, "uri", {
    get: function () {
      return this._uri;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(FullTextDocument.prototype, "languageId", {
    get: function () {
      return this._languageId;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(FullTextDocument.prototype, "version", {
    get: function () {
      return this._version;
    },
    enumerable: true,
    configurable: true
  });

  FullTextDocument.prototype.getText = function (range) {
    if (range) {
      var start = this.offsetAt(range.start);
      var end = this.offsetAt(range.end);
      return this._content.substring(start, end);
    }

    return this._content;
  };

  FullTextDocument.prototype.update = function (event, version) {
    this._content = event.text;
    this._version = version;
    this._lineOffsets = null;
  };

  FullTextDocument.prototype.getLineOffsets = function () {
    if (this._lineOffsets === null) {
      var lineOffsets = [];
      var text = this._content;
      var isLineStart = true;

      for (var i = 0; i < text.length; i++) {
        if (isLineStart) {
          lineOffsets.push(i);
          isLineStart = false;
        }

        var ch = text.charAt(i);
        isLineStart = ch === '\r' || ch === '\n';

        if (ch === '\r' && i + 1 < text.length && text.charAt(i + 1) === '\n') {
          i++;
        }
      }

      if (isLineStart && text.length > 0) {
        lineOffsets.push(text.length);
      }

      this._lineOffsets = lineOffsets;
    }

    return this._lineOffsets;
  };

  FullTextDocument.prototype.positionAt = function (offset) {
    offset = Math.max(Math.min(offset, this._content.length), 0);
    var lineOffsets = this.getLineOffsets();
    var low = 0,
        high = lineOffsets.length;

    if (high === 0) {
      return Position.create(0, offset);
    }

    while (low < high) {
      var mid = Math.floor((low + high) / 2);

      if (lineOffsets[mid] > offset) {
        high = mid;
      } else {
        low = mid + 1;
      }
    } // low is the least x for which the line offset is larger than the current offset
    // or array.length if no line offset is larger than the current offset


    var line = low - 1;
    return Position.create(line, offset - lineOffsets[line]);
  };

  FullTextDocument.prototype.offsetAt = function (position) {
    var lineOffsets = this.getLineOffsets();

    if (position.line >= lineOffsets.length) {
      return this._content.length;
    } else if (position.line < 0) {
      return 0;
    }

    var lineOffset = lineOffsets[position.line];
    var nextLineOffset = position.line + 1 < lineOffsets.length ? lineOffsets[position.line + 1] : this._content.length;
    return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
  };

  Object.defineProperty(FullTextDocument.prototype, "lineCount", {
    get: function () {
      return this.getLineOffsets().length;
    },
    enumerable: true,
    configurable: true
  });
  return FullTextDocument;
}();

var Is;

(function (Is) {
  var toString = Object.prototype.toString;

  function defined(value) {
    return typeof value !== 'undefined';
  }

  Is.defined = defined;

  function undefined(value) {
    return typeof value === 'undefined';
  }

  Is.undefined = undefined;

  function boolean(value) {
    return value === true || value === false;
  }

  Is.boolean = boolean;

  function string(value) {
    return toString.call(value) === '[object String]';
  }

  Is.string = string;

  function number(value) {
    return toString.call(value) === '[object Number]';
  }

  Is.number = number;

  function func(value) {
    return toString.call(value) === '[object Function]';
  }

  Is.func = func;

  function objectLiteral(value) {
    // Strictly speaking class instances pass this check as well. Since the LSP
    // doesn't use classes we ignore this for now. If we do we need to add something
    // like this: `Object.getPrototypeOf(Object.getPrototypeOf(x)) === null`
    return value !== null && typeof value === 'object';
  }

  Is.objectLiteral = objectLiteral;

  function typedArray(value, check) {
    return Array.isArray(value) && value.every(check);
  }

  Is.typedArray = typedArray;
})(Is || (Is = {}));
},{}],"../node_modules/monaco-editor/esm/vs/language/html/languageFeatures.js":[function(require,module,exports) {
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FoldingRangeAdapter = exports.DocumentRangeFormattingEditProvider = exports.DocumentFormattingEditProvider = exports.DocumentLinkAdapter = exports.DocumentSymbolAdapter = exports.DocumentHighlightAdapter = exports.HoverAdapter = exports.CompletionAdapter = exports.DiagnosticsAdapter = void 0;

var ls = _interopRequireWildcard(require("./_deps/vscode-languageserver-types/main.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var Range = monaco.Range; // --- diagnostics --- ---

var DiagnosticsAdapter =
/** @class */
function () {
  function DiagnosticsAdapter(_languageId, _worker, defaults) {
    var _this = this;

    this._languageId = _languageId;
    this._worker = _worker;
    this._disposables = [];
    this._listener = Object.create(null);

    var onModelAdd = function (model) {
      var modeId = model.getModeId();

      if (modeId !== _this._languageId) {
        return;
      }

      var handle;
      _this._listener[model.uri.toString()] = model.onDidChangeContent(function () {
        clearTimeout(handle);
        handle = setTimeout(function () {
          return _this._doValidate(model.uri, modeId);
        }, 500);
      });

      _this._doValidate(model.uri, modeId);
    };

    var onModelRemoved = function (model) {
      monaco.editor.setModelMarkers(model, _this._languageId, []);
      var uriStr = model.uri.toString();
      var listener = _this._listener[uriStr];

      if (listener) {
        listener.dispose();
        delete _this._listener[uriStr];
      }
    };

    this._disposables.push(monaco.editor.onDidCreateModel(onModelAdd));

    this._disposables.push(monaco.editor.onWillDisposeModel(function (model) {
      onModelRemoved(model);
    }));

    this._disposables.push(monaco.editor.onDidChangeModelLanguage(function (event) {
      onModelRemoved(event.model);
      onModelAdd(event.model);
    }));

    this._disposables.push(defaults.onDidChange(function (_) {
      monaco.editor.getModels().forEach(function (model) {
        if (model.getModeId() === _this._languageId) {
          onModelRemoved(model);
          onModelAdd(model);
        }
      });
    }));

    this._disposables.push({
      dispose: function () {
        for (var key in _this._listener) {
          _this._listener[key].dispose();
        }
      }
    });

    monaco.editor.getModels().forEach(onModelAdd);
  }

  DiagnosticsAdapter.prototype.dispose = function () {
    this._disposables.forEach(function (d) {
      return d && d.dispose();
    });

    this._disposables = [];
  };

  DiagnosticsAdapter.prototype._doValidate = function (resource, languageId) {
    this._worker(resource).then(function (worker) {
      return worker.doValidation(resource.toString()).then(function (diagnostics) {
        var markers = diagnostics.map(function (d) {
          return toDiagnostics(resource, d);
        });
        monaco.editor.setModelMarkers(monaco.editor.getModel(resource), languageId, markers);
      });
    }).then(undefined, function (err) {
      console.error(err);
    });
  };

  return DiagnosticsAdapter;
}();

exports.DiagnosticsAdapter = DiagnosticsAdapter;

function toSeverity(lsSeverity) {
  switch (lsSeverity) {
    case ls.DiagnosticSeverity.Error:
      return monaco.MarkerSeverity.Error;

    case ls.DiagnosticSeverity.Warning:
      return monaco.MarkerSeverity.Warning;

    case ls.DiagnosticSeverity.Information:
      return monaco.MarkerSeverity.Info;

    case ls.DiagnosticSeverity.Hint:
      return monaco.MarkerSeverity.Hint;

    default:
      return monaco.MarkerSeverity.Info;
  }
}

function toDiagnostics(resource, diag) {
  var code = typeof diag.code === 'number' ? String(diag.code) : diag.code;
  return {
    severity: toSeverity(diag.severity),
    startLineNumber: diag.range.start.line + 1,
    startColumn: diag.range.start.character + 1,
    endLineNumber: diag.range.end.line + 1,
    endColumn: diag.range.end.character + 1,
    message: diag.message,
    code: code,
    source: diag.source
  };
} // --- completion ------


function fromPosition(position) {
  if (!position) {
    return void 0;
  }

  return {
    character: position.column - 1,
    line: position.lineNumber - 1
  };
}

function fromRange(range) {
  if (!range) {
    return void 0;
  }

  return {
    start: fromPosition(range.getStartPosition()),
    end: fromPosition(range.getEndPosition())
  };
}

function toRange(range) {
  if (!range) {
    return void 0;
  }

  return new Range(range.start.line + 1, range.start.character + 1, range.end.line + 1, range.end.character + 1);
}

function toCompletionItemKind(kind) {
  var mItemKind = monaco.languages.CompletionItemKind;

  switch (kind) {
    case ls.CompletionItemKind.Text:
      return mItemKind.Text;

    case ls.CompletionItemKind.Method:
      return mItemKind.Method;

    case ls.CompletionItemKind.Function:
      return mItemKind.Function;

    case ls.CompletionItemKind.Constructor:
      return mItemKind.Constructor;

    case ls.CompletionItemKind.Field:
      return mItemKind.Field;

    case ls.CompletionItemKind.Variable:
      return mItemKind.Variable;

    case ls.CompletionItemKind.Class:
      return mItemKind.Class;

    case ls.CompletionItemKind.Interface:
      return mItemKind.Interface;

    case ls.CompletionItemKind.Module:
      return mItemKind.Module;

    case ls.CompletionItemKind.Property:
      return mItemKind.Property;

    case ls.CompletionItemKind.Unit:
      return mItemKind.Unit;

    case ls.CompletionItemKind.Value:
      return mItemKind.Value;

    case ls.CompletionItemKind.Enum:
      return mItemKind.Enum;

    case ls.CompletionItemKind.Keyword:
      return mItemKind.Keyword;

    case ls.CompletionItemKind.Snippet:
      return mItemKind.Snippet;

    case ls.CompletionItemKind.Color:
      return mItemKind.Color;

    case ls.CompletionItemKind.File:
      return mItemKind.File;

    case ls.CompletionItemKind.Reference:
      return mItemKind.Reference;
  }

  return mItemKind.Property;
}

function fromCompletionItemKind(kind) {
  var mItemKind = monaco.languages.CompletionItemKind;

  switch (kind) {
    case mItemKind.Text:
      return ls.CompletionItemKind.Text;

    case mItemKind.Method:
      return ls.CompletionItemKind.Method;

    case mItemKind.Function:
      return ls.CompletionItemKind.Function;

    case mItemKind.Constructor:
      return ls.CompletionItemKind.Constructor;

    case mItemKind.Field:
      return ls.CompletionItemKind.Field;

    case mItemKind.Variable:
      return ls.CompletionItemKind.Variable;

    case mItemKind.Class:
      return ls.CompletionItemKind.Class;

    case mItemKind.Interface:
      return ls.CompletionItemKind.Interface;

    case mItemKind.Module:
      return ls.CompletionItemKind.Module;

    case mItemKind.Property:
      return ls.CompletionItemKind.Property;

    case mItemKind.Unit:
      return ls.CompletionItemKind.Unit;

    case mItemKind.Value:
      return ls.CompletionItemKind.Value;

    case mItemKind.Enum:
      return ls.CompletionItemKind.Enum;

    case mItemKind.Keyword:
      return ls.CompletionItemKind.Keyword;

    case mItemKind.Snippet:
      return ls.CompletionItemKind.Snippet;

    case mItemKind.Color:
      return ls.CompletionItemKind.Color;

    case mItemKind.File:
      return ls.CompletionItemKind.File;

    case mItemKind.Reference:
      return ls.CompletionItemKind.Reference;
  }

  return ls.CompletionItemKind.Property;
}

function toTextEdit(textEdit) {
  if (!textEdit) {
    return void 0;
  }

  return {
    range: toRange(textEdit.range),
    text: textEdit.newText
  };
}

var CompletionAdapter =
/** @class */
function () {
  function CompletionAdapter(_worker) {
    this._worker = _worker;
  }

  Object.defineProperty(CompletionAdapter.prototype, "triggerCharacters", {
    get: function () {
      return ['.', ':', '<', '"', '=', '/'];
    },
    enumerable: true,
    configurable: true
  });

  CompletionAdapter.prototype.provideCompletionItems = function (model, position, context, token) {
    var resource = model.uri;
    return this._worker(resource).then(function (worker) {
      return worker.doComplete(resource.toString(), fromPosition(position));
    }).then(function (info) {
      if (!info) {
        return;
      }

      var wordInfo = model.getWordUntilPosition(position);
      var wordRange = new Range(position.lineNumber, wordInfo.startColumn, position.lineNumber, wordInfo.endColumn);
      var items = info.items.map(function (entry) {
        var item = {
          label: entry.label,
          insertText: entry.insertText || entry.label,
          sortText: entry.sortText,
          filterText: entry.filterText,
          documentation: entry.documentation,
          detail: entry.detail,
          range: wordRange,
          kind: toCompletionItemKind(entry.kind)
        };

        if (entry.textEdit) {
          item.range = toRange(entry.textEdit.range);
          item.insertText = entry.textEdit.newText;
        }

        if (entry.additionalTextEdits) {
          item.additionalTextEdits = entry.additionalTextEdits.map(toTextEdit);
        }

        if (entry.insertTextFormat === ls.InsertTextFormat.Snippet) {
          item.insertTextRules = monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet;
        }

        return item;
      });
      return {
        isIncomplete: info.isIncomplete,
        suggestions: items
      };
    });
  };

  return CompletionAdapter;
}();

exports.CompletionAdapter = CompletionAdapter;

// --- hover ------
function isMarkupContent(thing) {
  return thing && typeof thing === 'object' && typeof thing.kind === 'string';
}

function toMarkdownString(entry) {
  if (typeof entry === 'string') {
    return {
      value: entry
    };
  }

  if (isMarkupContent(entry)) {
    if (entry.kind === 'plaintext') {
      return {
        value: entry.value.replace(/[\\`*_{}[\]()#+\-.!]/g, '\\$&')
      };
    }

    return {
      value: entry.value
    };
  }

  return {
    value: '```' + entry.language + '\n' + entry.value + '\n```\n'
  };
}

function toMarkedStringArray(contents) {
  if (!contents) {
    return void 0;
  }

  if (Array.isArray(contents)) {
    return contents.map(toMarkdownString);
  }

  return [toMarkdownString(contents)];
}

var HoverAdapter =
/** @class */
function () {
  function HoverAdapter(_worker) {
    this._worker = _worker;
  }

  HoverAdapter.prototype.provideHover = function (model, position, token) {
    var resource = model.uri;
    return this._worker(resource).then(function (worker) {
      return worker.doHover(resource.toString(), fromPosition(position));
    }).then(function (info) {
      if (!info) {
        return;
      }

      return {
        range: toRange(info.range),
        contents: toMarkedStringArray(info.contents)
      };
    });
  };

  return HoverAdapter;
}();

exports.HoverAdapter = HoverAdapter;

// --- document highlights ------
function toHighlighKind(kind) {
  var mKind = monaco.languages.DocumentHighlightKind;

  switch (kind) {
    case ls.DocumentHighlightKind.Read:
      return mKind.Read;

    case ls.DocumentHighlightKind.Write:
      return mKind.Write;

    case ls.DocumentHighlightKind.Text:
      return mKind.Text;
  }

  return mKind.Text;
}

var DocumentHighlightAdapter =
/** @class */
function () {
  function DocumentHighlightAdapter(_worker) {
    this._worker = _worker;
  }

  DocumentHighlightAdapter.prototype.provideDocumentHighlights = function (model, position, token) {
    var resource = model.uri;
    return this._worker(resource).then(function (worker) {
      return worker.findDocumentHighlights(resource.toString(), fromPosition(position));
    }).then(function (items) {
      if (!items) {
        return;
      }

      return items.map(function (item) {
        return {
          range: toRange(item.range),
          kind: toHighlighKind(item.kind)
        };
      });
    });
  };

  return DocumentHighlightAdapter;
}();

exports.DocumentHighlightAdapter = DocumentHighlightAdapter;

// --- document symbols ------
function toSymbolKind(kind) {
  var mKind = monaco.languages.SymbolKind;

  switch (kind) {
    case ls.SymbolKind.File:
      return mKind.Array;

    case ls.SymbolKind.Module:
      return mKind.Module;

    case ls.SymbolKind.Namespace:
      return mKind.Namespace;

    case ls.SymbolKind.Package:
      return mKind.Package;

    case ls.SymbolKind.Class:
      return mKind.Class;

    case ls.SymbolKind.Method:
      return mKind.Method;

    case ls.SymbolKind.Property:
      return mKind.Property;

    case ls.SymbolKind.Field:
      return mKind.Field;

    case ls.SymbolKind.Constructor:
      return mKind.Constructor;

    case ls.SymbolKind.Enum:
      return mKind.Enum;

    case ls.SymbolKind.Interface:
      return mKind.Interface;

    case ls.SymbolKind.Function:
      return mKind.Function;

    case ls.SymbolKind.Variable:
      return mKind.Variable;

    case ls.SymbolKind.Constant:
      return mKind.Constant;

    case ls.SymbolKind.String:
      return mKind.String;

    case ls.SymbolKind.Number:
      return mKind.Number;

    case ls.SymbolKind.Boolean:
      return mKind.Boolean;

    case ls.SymbolKind.Array:
      return mKind.Array;
  }

  return mKind.Function;
}

var DocumentSymbolAdapter =
/** @class */
function () {
  function DocumentSymbolAdapter(_worker) {
    this._worker = _worker;
  }

  DocumentSymbolAdapter.prototype.provideDocumentSymbols = function (model, token) {
    var resource = model.uri;
    return this._worker(resource).then(function (worker) {
      return worker.findDocumentSymbols(resource.toString());
    }).then(function (items) {
      if (!items) {
        return;
      }

      return items.map(function (item) {
        return {
          name: item.name,
          detail: '',
          containerName: item.containerName,
          kind: toSymbolKind(item.kind),
          range: toRange(item.location.range),
          selectionRange: toRange(item.location.range)
        };
      });
    });
  };

  return DocumentSymbolAdapter;
}();

exports.DocumentSymbolAdapter = DocumentSymbolAdapter;

var DocumentLinkAdapter =
/** @class */
function () {
  function DocumentLinkAdapter(_worker) {
    this._worker = _worker;
  }

  DocumentLinkAdapter.prototype.provideLinks = function (model, token) {
    var resource = model.uri;
    return this._worker(resource).then(function (worker) {
      return worker.findDocumentLinks(resource.toString());
    }).then(function (items) {
      if (!items) {
        return;
      }

      return items.map(function (item) {
        return {
          range: toRange(item.range),
          url: item.target
        };
      });
    });
  };

  return DocumentLinkAdapter;
}();

exports.DocumentLinkAdapter = DocumentLinkAdapter;

function fromFormattingOptions(options) {
  return {
    tabSize: options.tabSize,
    insertSpaces: options.insertSpaces
  };
}

var DocumentFormattingEditProvider =
/** @class */
function () {
  function DocumentFormattingEditProvider(_worker) {
    this._worker = _worker;
  }

  DocumentFormattingEditProvider.prototype.provideDocumentFormattingEdits = function (model, options, token) {
    var resource = model.uri;
    return this._worker(resource).then(function (worker) {
      return worker.format(resource.toString(), null, fromFormattingOptions(options)).then(function (edits) {
        if (!edits || edits.length === 0) {
          return;
        }

        return edits.map(toTextEdit);
      });
    });
  };

  return DocumentFormattingEditProvider;
}();

exports.DocumentFormattingEditProvider = DocumentFormattingEditProvider;

var DocumentRangeFormattingEditProvider =
/** @class */
function () {
  function DocumentRangeFormattingEditProvider(_worker) {
    this._worker = _worker;
  }

  DocumentRangeFormattingEditProvider.prototype.provideDocumentRangeFormattingEdits = function (model, range, options, token) {
    var resource = model.uri;
    return this._worker(resource).then(function (worker) {
      return worker.format(resource.toString(), fromRange(range), fromFormattingOptions(options)).then(function (edits) {
        if (!edits || edits.length === 0) {
          return;
        }

        return edits.map(toTextEdit);
      });
    });
  };

  return DocumentRangeFormattingEditProvider;
}();

exports.DocumentRangeFormattingEditProvider = DocumentRangeFormattingEditProvider;

var FoldingRangeAdapter =
/** @class */
function () {
  function FoldingRangeAdapter(_worker) {
    this._worker = _worker;
  }

  FoldingRangeAdapter.prototype.provideFoldingRanges = function (model, context, token) {
    var resource = model.uri;
    return this._worker(resource).then(function (worker) {
      return worker.provideFoldingRanges(resource.toString(), context);
    }).then(function (ranges) {
      if (!ranges) {
        return;
      }

      return ranges.map(function (range) {
        var result = {
          start: range.startLine + 1,
          end: range.endLine + 1
        };

        if (typeof range.kind !== 'undefined') {
          result.kind = toFoldingRangeKind(range.kind);
        }

        return result;
      });
    });
  };

  return FoldingRangeAdapter;
}();

exports.FoldingRangeAdapter = FoldingRangeAdapter;

function toFoldingRangeKind(kind) {
  switch (kind) {
    case ls.FoldingRangeKind.Comment:
      return monaco.languages.FoldingRangeKind.Comment;

    case ls.FoldingRangeKind.Imports:
      return monaco.languages.FoldingRangeKind.Imports;

    case ls.FoldingRangeKind.Region:
      return monaco.languages.FoldingRangeKind.Region;
  }

  return void 0;
}
},{"./_deps/vscode-languageserver-types/main.js":"../node_modules/monaco-editor/esm/vs/language/html/_deps/vscode-languageserver-types/main.js"}],"../node_modules/monaco-editor/esm/vs/language/html/htmlMode.js":[function(require,module,exports) {
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupMode = setupMode;

var _workerManager = require("./workerManager.js");

var languageFeatures = _interopRequireWildcard(require("./languageFeatures.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function setupMode(defaults) {
  var client = new _workerManager.WorkerManager(defaults);

  var worker = function () {
    var uris = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      uris[_i] = arguments[_i];
    }

    return client.getLanguageServiceWorker.apply(client, uris);
  };

  var languageId = defaults.languageId; // all modes

  monaco.languages.registerCompletionItemProvider(languageId, new languageFeatures.CompletionAdapter(worker));
  monaco.languages.registerHoverProvider(languageId, new languageFeatures.HoverAdapter(worker));
  monaco.languages.registerDocumentHighlightProvider(languageId, new languageFeatures.DocumentHighlightAdapter(worker));
  monaco.languages.registerLinkProvider(languageId, new languageFeatures.DocumentLinkAdapter(worker));
  monaco.languages.registerFoldingRangeProvider(languageId, new languageFeatures.FoldingRangeAdapter(worker));
  monaco.languages.registerDocumentSymbolProvider(languageId, new languageFeatures.DocumentSymbolAdapter(worker)); // only html

  if (languageId === 'html') {
    monaco.languages.registerDocumentFormattingEditProvider(languageId, new languageFeatures.DocumentFormattingEditProvider(worker));
    monaco.languages.registerDocumentRangeFormattingEditProvider(languageId, new languageFeatures.DocumentRangeFormattingEditProvider(worker));
    new languageFeatures.DiagnosticsAdapter(languageId, worker, defaults);
  }
}
},{"./workerManager.js":"../node_modules/monaco-editor/esm/vs/language/html/workerManager.js","./languageFeatures.js":"../node_modules/monaco-editor/esm/vs/language/html/languageFeatures.js"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50077" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","../node_modules/monaco-editor/esm/vs/language/html/htmlMode.js"], null)
//# sourceMappingURL=/htmlMode.e4091c56.js.map