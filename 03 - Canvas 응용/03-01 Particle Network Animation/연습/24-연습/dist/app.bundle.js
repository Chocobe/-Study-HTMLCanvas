/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_app_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_app_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_app_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_app_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_app_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 2 */
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),
/* 4 */
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),
/* 5 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),
/* 6 */
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),
/* 7 */
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),
/* 8 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\n.canvasWrapper {\n  width: 100%;\n  height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: #121212;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 9 */
/***/ ((module) => {



module.exports = function (i) {
  return i[1];
};

/***/ }),
/* 10 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ParticleNetworkCanvas)
/* harmony export */ });
/* harmony import */ var _LineHub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _LineHubOptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var _Particle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15);
/* harmony import */ var _ParticleOptions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(17);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }






var ParticleNetworkCanvas = /*#__PURE__*/function () {
  // ``변수!`` 는 확정 할당 어설션 (Definite Assignment Assersions) 입니다.
  function ParticleNetworkCanvas(params) {
    _classCallCheck(this, ParticleNetworkCanvas);

    this._initCanvas(params);

    this._resizeCanvas();

    this._initParticleOptions();

    this._initParticles();

    this._initLineHubOptions();

    this._initLineHub();

    this._startAnimation();
  }

  _createClass(ParticleNetworkCanvas, [{
    key: "_initCanvas",
    value: function _initCanvas(_ref) {
      var selector = _ref.selector;
      var canvas = document.querySelector(selector);

      if (!(canvas instanceof HTMLCanvasElement)) {
        throw new Error("<canvas id=\"".concat(selector, "\" /> \uB97C \uCC3E\uC9C0 \uBABB\uD558\uC600\uC2B5\uB2C8\uB2E4."));
      }

      this._canvas = canvas;
      this._ctx = canvas.getContext("2d");
    }
  }, {
    key: "_resizeCanvas",
    value: function _resizeCanvas() {
      var _canvas = this._canvas;
      _canvas.width = window.innerWidth;
      _canvas.height = window.innerHeight;
    }
  }, {
    key: "_initParticleOptions",
    value: function _initParticleOptions() {
      this._particleOptions = new _ParticleOptions__WEBPACK_IMPORTED_MODULE_3__["default"]();
    }
  }, {
    key: "_initParticles",
    value: function _initParticles() {
      var _canvas = this._canvas,
          _particleOptions = this._particleOptions;

      var _particleOptions$toJS = _particleOptions.toJSON(),
          amount = _particleOptions$toJS.amount;

      this._particles = Array.from({
        length: amount
      }, function () {
        return new _Particle__WEBPACK_IMPORTED_MODULE_2__["default"]({
          canvas: _canvas,
          particleOptions: _particleOptions
        });
      });
    }
  }, {
    key: "_initLineHubOptions",
    value: function _initLineHubOptions() {
      this._lineHubOptions = new _LineHubOptions__WEBPACK_IMPORTED_MODULE_1__["default"]();
    }
  }, {
    key: "_initLineHub",
    value: function _initLineHub() {
      var _ctx = this._ctx,
          _lineHubOptions = this._lineHubOptions,
          _particles = this._particles;
      this._lineHub = new _LineHub__WEBPACK_IMPORTED_MODULE_0__["default"]({
        ctx: _ctx,
        lineHubOptions: _lineHubOptions,
        particles: _particles
      });
    }
  }, {
    key: "_startAnimation",
    value: function _startAnimation() {
      this._loopAnimationFrame();
    }
  }, {
    key: "_loopAnimationFrame",
    value: function _loopAnimationFrame() {
      var _this = this;

      var _ctx = this._ctx,
          _this$_canvas = this._canvas,
          width = _this$_canvas.width,
          height = _this$_canvas.height;

      _ctx.clearRect(0, 0, width, height);

      this._draw();

      this._animationFrameId = window.requestAnimationFrame(function () {
        return _this._loopAnimationFrame();
      });
    }
  }, {
    key: "_draw",
    value: function _draw() {
      this._drawParticles();

      this._drawLineHub();
    }
  }, {
    key: "_drawParticles",
    value: function _drawParticles() {
      this._particles.forEach(function (particle) {
        return particle.draw();
      });
    }
  }, {
    key: "_drawLineHub",
    value: function _drawLineHub() {
      this._lineHub.draw();
    }
  }]);

  return ParticleNetworkCanvas;
}();



/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LineHub)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var LineHub = /*#__PURE__*/function () {
  function LineHub(_ref) {
    var ctx = _ref.ctx,
        lineHubOptions = _ref.lineHubOptions,
        particles = _ref.particles;

    _classCallCheck(this, LineHub);

    this._initCtx(ctx);

    this._initRGB(lineHubOptions);

    this._initLineRadius(lineHubOptions);

    this._initParticles(particles);
  }

  _createClass(LineHub, [{
    key: "_initCtx",
    value: function _initCtx(ctx) {
      this._ctx = ctx;
    }
  }, {
    key: "_initRGB",
    value: function _initRGB(lineHubOptions) {
      var _lineHubOptions$toJSO = lineHubOptions.toJSON(),
          rgb = _lineHubOptions$toJSO.rgb;

      this._rgb = rgb;
    }
  }, {
    key: "_initLineRadius",
    value: function _initLineRadius(lineHubOptions) {
      var _lineHubOptions$toJSO2 = lineHubOptions.toJSON(),
          lineRadius = _lineHubOptions$toJSO2.lineRadius;

      this._lineRadius = lineRadius;
    }
  }, {
    key: "_initParticles",
    value: function _initParticles(particles) {
      this._particles = particles;
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this = this;

      this._particles.forEach(function (sour) {
        return _this._lineToOthers(sour);
      });
    }
  }, {
    key: "_lineToOthers",
    value: function _lineToOthers(sour) {
      var _this2 = this;

      this._particles.forEach(function (dest) {
        return _this2._lineToDest(sour, dest);
      });
    }
  }, {
    key: "_lineToDest",
    value: function _lineToDest(sour, dest) {
      var sourPosition = sour.getPosition();
      var destPosition = dest.getPosition();
      var distance = Math.abs(sourPosition.calcDistance(destPosition));

      var opacity = this._calcOpacity(distance);

      if (opacity > 0) {
        var _ctx = this._ctx,
            _rgb = this._rgb;

        var _rgb$toJSON = _rgb.toJSON(),
            r = _rgb$toJSON.r,
            g = _rgb$toJSON.g,
            b = _rgb$toJSON.b;

        var _sourPosition$toJSON = sourPosition.toJSON(),
            x1 = _sourPosition$toJSON.x,
            y1 = _sourPosition$toJSON.y;

        var _destPosition$toJSON = destPosition.toJSON(),
            x2 = _destPosition$toJSON.x,
            y2 = _destPosition$toJSON.y;

        _ctx.save();

        _ctx.strokeStyle = "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(opacity, ")");

        _ctx.beginPath();

        _ctx.moveTo(x1, y1);

        _ctx.lineTo(x2, y2);

        _ctx.stroke();

        _ctx.restore();
      }
    }
  }, {
    key: "_calcOpacity",
    value: function _calcOpacity(distance) {
      return 1 - distance / this._lineRadius;
    }
  }]);

  return LineHub;
}();



/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LineHubOptions)
/* harmony export */ });
/* harmony import */ var _RGB__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var LineHubOptions = /*#__PURE__*/function () {
  function LineHubOptions() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$color = _ref.color,
        color = _ref$color === void 0 ? "rgb(0, 181, 255)" : _ref$color,
        _ref$lineRadius = _ref.lineRadius,
        lineRadius = _ref$lineRadius === void 0 ? 200 : _ref$lineRadius;

    _classCallCheck(this, LineHubOptions);

    this._initRGB(color);

    this._initLineRadius(lineRadius);
  }

  _createClass(LineHubOptions, [{
    key: "_initRGB",
    value: function _initRGB(color) {
      this._rgb = new _RGB__WEBPACK_IMPORTED_MODULE_0__["default"](color);
    }
  }, {
    key: "_initLineRadius",
    value: function _initLineRadius(lineRadius) {
      this._lineRadius = lineRadius;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var _color = this._color,
          _rgb = this._rgb,
          _lineRadius = this._lineRadius;
      return {
        color: _color,
        rgb: _rgb,
        lineRadius: _lineRadius
      };
    }
  }]);

  return LineHubOptions;
}();



/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RGB)
/* harmony export */ });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var RGB = /*#__PURE__*/function () {
  function RGB(color) {
    _classCallCheck(this, RGB);

    var _ref = color.match(/\d+/g),
        _ref2 = _slicedToArray(_ref, 3),
        r = _ref2[0],
        g = _ref2[1],
        b = _ref2[2];

    this._r = r;
    this._g = g;
    this._b = b;
  }

  _createClass(RGB, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        r: this._r,
        g: this._g,
        b: this._b
      };
    }
  }]);

  return RGB;
}();



/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Particle)
/* harmony export */ });
/* harmony import */ var _Position__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var Particle = /*#__PURE__*/function () {
  function Particle(_ref) {
    var canvas = _ref.canvas,
        particleOptions = _ref.particleOptions;

    _classCallCheck(this, Particle);

    var options = particleOptions.toJSON();

    this._initCanvas(canvas);

    this._initPosition();

    this._initColor(options);

    this._initRadius(options);

    this._initSpeed(options);

    this._initDirectionAngle();

    this._initVector();
  }

  _createClass(Particle, [{
    key: "_initCanvas",
    value: function _initCanvas(canvas) {
      this._canvas = canvas;
      this._ctx = canvas.getContext("2d");
    }
  }, {
    key: "_initPosition",
    value: function _initPosition() {
      var _this$_canvas = this._canvas,
          width = _this$_canvas.width,
          height = _this$_canvas.height;
      this._position = new _Position__WEBPACK_IMPORTED_MODULE_0__["default"]({
        x: width * Math.random(),
        y: height * Math.random()
      });
    }
  }, {
    key: "_initColor",
    value: function _initColor(_ref2) {
      var color = _ref2.color;
      this._color = color;
    }
  }, {
    key: "_initRadius",
    value: function _initRadius(_ref3) {
      var defaultRadius = _ref3.defaultRadius,
          variantRadius = _ref3.variantRadius;
      this._radius = defaultRadius + variantRadius * Math.random();
    }
  }, {
    key: "_initSpeed",
    value: function _initSpeed(_ref4) {
      var defaultSpeed = _ref4.defaultSpeed,
          variantSpeed = _ref4.variantSpeed;
      this._speed = defaultSpeed + variantSpeed * Math.random();
    }
  }, {
    key: "_initDirectionAngle",
    value: function _initDirectionAngle() {
      this._directionAngle = Math.PI * 2 * Math.random();
    }
  }, {
    key: "_initVector",
    value: function _initVector() {
      var _directionAngle = this._directionAngle,
          _speed = this._speed;
      this._vector = new _Position__WEBPACK_IMPORTED_MODULE_0__["default"]({
        x: Math.cos(_directionAngle) * _speed,
        y: Math.sin(_directionAngle) * _speed
      });
    }
  }, {
    key: "draw",
    value: function draw() {
      var _ctx = this._ctx,
          _color = this._color,
          _radius = this._radius,
          _position = this._position;

      var _position$toJSON = _position.toJSON(),
          x = _position$toJSON.x,
          y = _position$toJSON.y;

      _ctx.save();

      _ctx.fillStyle = _color;

      _ctx.beginPath();

      _ctx.arc(x, y, _radius, 0, Math.PI * 2);

      _ctx.fill();

      _ctx.restore();

      this._update();
    }
  }, {
    key: "_update",
    value: function _update() {
      var _position = this._position,
          _vector = this._vector;

      var _position$toJSON2 = _position.toJSON(),
          x = _position$toJSON2.x,
          y = _position$toJSON2.y;

      var _vector$toJSON = _vector.toJSON(),
          vX = _vector$toJSON.x,
          vY = _vector$toJSON.y;

      _position.setX(x + vX);

      _position.setY(y + vY);

      this._applyWall();
    }
  }, {
    key: "_applyWall",
    value: function _applyWall() {
      var _position = this._position,
          _vector = this._vector,
          _this$_canvas2 = this._canvas,
          width = _this$_canvas2.width,
          height = _this$_canvas2.height;

      var _position$toJSON3 = _position.toJSON(),
          x = _position$toJSON3.x,
          y = _position$toJSON3.y;

      var _vector$toJSON2 = _vector.toJSON(),
          vX = _vector$toJSON2.x,
          vY = _vector$toJSON2.y;

      if (x >= width || x <= 0) _vector.setX(vX * -1);
      if (y >= height || y <= 0) _vector.setY(vY * -1);
    }
  }, {
    key: "getPosition",
    value: function getPosition() {
      return this._position;
    }
  }]);

  return Particle;
}();



/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Position)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Position = /*#__PURE__*/function () {
  function Position(_ref) {
    var x = _ref.x,
        y = _ref.y;

    _classCallCheck(this, Position);

    this._x = x;
    this._y = y;
  }

  _createClass(Position, [{
    key: "setX",
    value: function setX(x) {
      this._x = x;
    }
  }, {
    key: "setY",
    value: function setY(y) {
      this._y = y;
    }
  }, {
    key: "calcDistance",
    value: function calcDistance(dest) {
      var x1 = this._x,
          y1 = this._y;
      var x2 = dest._x,
          y2 = dest._y;
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var _x = this._x,
          _y = this._y;
      return {
        x: _x,
        y: _y
      };
    }
  }]);

  return Position;
}();



/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ParticleOptions)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var ParticleOptions = /*#__PURE__*/function () {
  function ParticleOptions() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$color = _ref.color,
        color = _ref$color === void 0 ? "rgb(255, 255, 255)" : _ref$color,
        _ref$amount = _ref.amount,
        amount = _ref$amount === void 0 ? 50 : _ref$amount,
        _ref$defaultRadius = _ref.defaultRadius,
        defaultRadius = _ref$defaultRadius === void 0 ? 3 : _ref$defaultRadius,
        _ref$variantRadius = _ref.variantRadius,
        variantRadius = _ref$variantRadius === void 0 ? 5 : _ref$variantRadius,
        _ref$defaultSpeed = _ref.defaultSpeed,
        defaultSpeed = _ref$defaultSpeed === void 0 ? 2 : _ref$defaultSpeed,
        _ref$variantSpeed = _ref.variantSpeed,
        variantSpeed = _ref$variantSpeed === void 0 ? 5 : _ref$variantSpeed;

    _classCallCheck(this, ParticleOptions);

    this._color = color;
    this._amount = amount;
    this._defaultRadius = defaultRadius;
    this._variantRadius = variantRadius;
    this._defaultSpeed = defaultSpeed;
    this._variantSpeed = variantSpeed;
  }

  _createClass(ParticleOptions, [{
    key: "toJSON",
    value: function toJSON() {
      var _color = this._color,
          _amount = this._amount,
          _defaultRadius = this._defaultRadius,
          _variantRadius = this._variantRadius,
          _defaultSpeed = this._defaultSpeed,
          _variantSpeed = this._variantSpeed;
      return {
        color: _color,
        amount: _amount,
        defaultRadius: _defaultRadius,
        variantRadius: _variantRadius,
        defaultSpeed: _defaultSpeed,
        variantSpeed: _variantSpeed
      };
    }
  }]);

  return ParticleOptions;
}();



/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _src_ParticleNetworkCanvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);


window.addEventListener("DOMContentLoaded", function () {
  new _src_ParticleNetworkCanvas__WEBPACK_IMPORTED_MODULE_1__["default"]({
    selector: "#particleNetworkCanvas"
  });
});
})();

/******/ })()
;