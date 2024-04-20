"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propTypes = exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _this = void 0,
  _templateObject,
  _templateObject2,
  _templateObject3,
  _templateObject4,
  _templateObject5,
  _templateObject6,
  _templateObject7;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var ToastTypes = {
  INFO: "info",
  ERROR: "error",
  SUCCESS: "success",
  WARNING: "warning",
  NEUTRAL: "neutral"
};
var PositionTypes = {
  LEFTTOP: "left-top",
  RIGHTTOP: "right-top",
  LEFTBOTTOM: "left-bottom",
  RIGHEBOTTOM: "right-bottom",
  TOPCENTER: "top-center"
};
function validateProps() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  Object.keys(props).forEach(function (key) {
    if (key === "type" && !Object.values(ToastTypes).includes(props[key])) {
      throw Error("Invalid type. It should be one of " + Object.values(ToastTypes));
    }
    if (key === "position" && !Object.values(PositionTypes).includes(props[key])) {
      throw Error("Invalid position. It should be one of " + Object.values(PositionTypes));
    }
  });
}
function getTransformXY(position) {
  switch (position) {
    case PositionTypes.LEFTBOTTOM:
    case PositionTypes.RIGHEBOTTOM:
      return {
        "--transformX": 0,
        "--transformY": "100%"
      };
    case PositionTypes.LEFTTOP:
    case PositionTypes.RIGHTTOP:
      return {
        "--transformX": 0,
        "--transformY": "-100%"
      };
    case PositionTypes.TOPCENTER:
      return {
        "--transformX": "-50%",
        "--transformY": "-100%"
      };
    default:
      throw Error("Invalid Position");
  }
}
var Notify = function Notify(_ref) {
  var children = _ref.children,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? ToastTypes.INFO : _ref$type,
    _ref$onClose = _ref.onClose,
    onClose = _ref$onClose === void 0 ? function () {} : _ref$onClose,
    _ref$timeout = _ref.timeout,
    timeout = _ref$timeout === void 0 ? 2000 : _ref$timeout,
    _ref$containerClass = _ref.containerClass,
    containerClass = _ref$containerClass === void 0 ? "" : _ref$containerClass,
    _ref$handlerClass = _ref.handlerClass,
    handlerClass = _ref$handlerClass === void 0 ? "" : _ref$handlerClass,
    _ref$contentClass = _ref.contentClass,
    contentClass = _ref$contentClass === void 0 ? "" : _ref$contentClass,
    _ref$containerStyle = _ref.containerStyle,
    containerStyle = _ref$containerStyle === void 0 ? {} : _ref$containerStyle,
    _ref$handleStyle = _ref.handleStyle,
    handleStyle = _ref$handleStyle === void 0 ? {} : _ref$handleStyle,
    _ref$contentStyle = _ref.contentStyle,
    contentStyle = _ref$contentStyle === void 0 ? {} : _ref$contentStyle,
    _ref$title = _ref.title,
    title = _ref$title === void 0 ? "Add a Title Prop" : _ref$title,
    _ref$content = _ref.content,
    content = _ref$content === void 0 ? "Add a Content Prop" : _ref$content,
    _ref$enableChildren = _ref.enableChildren,
    enableChildren = _ref$enableChildren === void 0 ? false : _ref$enableChildren,
    _ref$show = _ref.show,
    show = _ref$show === void 0 ? true : _ref$show,
    _ref$closeIcon = _ref.closeIcon,
    closeIcon = _ref$closeIcon === void 0 ? /*#__PURE__*/_react["default"].createElement("span", {
      style: {
        color: "gray"
      }
    }, "Dismiss") : _ref$closeIcon,
    _ref$position = _ref.position,
    position = _ref$position === void 0 ? PositionTypes.RIGHTTOP : _ref$position,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? "auto" : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? "auto" : _ref$height;
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    portalRoot = _useState2[0],
    setPortalRoot = _useState2[1];
  (0, _react.useEffect)(function () {
    if (!show) return;
    var timer = setTimeout(function () {
      onClose();
    }, timeout);
    return function () {
      return clearTimeout(timer);
    };
  }, [show, onClose, timeout]);
  (0, _react.useLayoutEffect)(function () {
    var root = document.createElement("div");
    root.className = "sappui-toast-portal";
    document.body.appendChild(root);
    setPortalRoot(root);
    return function () {
      return document.body.removeChild(root);
    };
  }, []);
  validateProps({
    position: position,
    type: type
  });
  var renderContent = (0, _react.useMemo)(function () {
    if (enableChildren) return children;
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, title && /*#__PURE__*/_react["default"].createElement(H3, {
      type: type
    }, title), content && /*#__PURE__*/_react["default"].createElement(P, {
      type: type
    }, content));
  }, [children, enableChildren, content, title, type]);
  if (!show || !portalRoot) return null;
  return /*#__PURE__*/_reactDom["default"].createPortal( /*#__PURE__*/_react["default"].createElement(Container, {
    position: position,
    width: width,
    height: height,
    style: containerStyle,
    className: containerClass
  }, /*#__PURE__*/_react["default"].createElement(Handle, {
    type: type,
    style: handleStyle,
    className: handlerClass
  }), /*#__PURE__*/_react["default"].createElement(Content, {
    style: contentStyle,
    className: contentClass
  }, renderContent), /*#__PURE__*/_react["default"].createElement(CloseButton, {
    onClick: onClose.bind(_this, false)
  }, closeIcon)), portalRoot);
};
var propTypes = exports.propTypes = {
  children: _propTypes["default"].node,
  type: _propTypes["default"].oneOf(Object.values(ToastTypes)),
  onClose: _propTypes["default"].func.isRequired,
  timeout: _propTypes["default"].number,
  title: _propTypes["default"].string,
  content: _propTypes["default"].string,
  enableChildren: _propTypes["default"].bool,
  show: _propTypes["default"].bool,
  containerStyle: _propTypes["default"].object,
  handlerStyle: _propTypes["default"].object,
  contentStyle: _propTypes["default"].object,
  containerClass: _propTypes["default"].string,
  handleStyle: _propTypes["default"].string,
  contentClass: _propTypes["default"].string,
  closeIcon: _propTypes["default"].node,
  position: _propTypes["default"].string,
  width: _propTypes["default"].string || _propTypes["default"].number,
  height: _propTypes["default"].string || _propTypes["default"].number
};
Notify.propTypes = propTypes;
var _default = exports["default"] = Notify;
function getColorForType(type) {
  switch (type) {
    case ToastTypes.INFO:
      return "rgba(32, 116, 208, 1)";
    case ToastTypes.ERROR:
      return "#f31260;";
    case ToastTypes.NEUTRAL:
      return "#7b8c9d";
    case ToastTypes.SUCCESS:
      return "#009a40";
    case ToastTypes.WARNING:
      return "#fe8b2e";
    default:
      throw Error("Invalid Type");
  }
}
var slideDown = function slideDown(transform) {
  return (0, _styledComponents.keyframes)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\nfrom {\n    transform: translateY(", ") translateX(", ");\n  }\n  to {\n    transform: translateY(0) translateX(", ");\n  }\n"])), transform["--transformY"], transform["--transformX"], transform["--transformX"]);
};
var Container = _styledComponents["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  @import url(\"https://fonts.googleapis.com/css2?family=Varela+Round&display=swap\");\n  @import url(\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\");\n  position: fixed;\n  left: ", ";\n  right: ", ";\n  top: ", ";\n  bottom: ", ";\n  transform: ", ";\n  display: flex;\n  align-items: center;\n  width: ", ";\n  height: ", ";\n  max-width: 95vw !important;\n  padding: 5px;\n  border-radius: 10px;\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);\n  font-family: Varela round;\n  box-sizing: border-box;\n  animation: ", " 0.3s ease;\n  z-index: 10;\n"])), function (_ref2) {
  var position = _ref2.position;
  return position === PositionTypes.LEFTBOTTOM || position === PositionTypes.LEFTTOP ? "10px" : position === PositionTypes.TOPCENTER ? "50%" : "auto";
}, function (_ref3) {
  var position = _ref3.position;
  return position === PositionTypes.RIGHEBOTTOM || position === PositionTypes.RIGHTTOP ? "10px" : "auto";
}, function (_ref4) {
  var position = _ref4.position;
  return position === PositionTypes.LEFTTOP || position === PositionTypes.RIGHTTOP ? "10px" : "auto";
}, function (_ref5) {
  var position = _ref5.position;
  return position === PositionTypes.LEFTBOTTOM || position === PositionTypes.RIGHEBOTTOM ? "10px" : "auto";
}, function (_ref6) {
  var position = _ref6.position;
  return position === PositionTypes.TOPCENTER ? "translateX(".concat(getTransformXY(position)["--transformX"], ")") : "none";
}, function (_ref7) {
  var width = _ref7.width;
  return width;
}, function (_ref8) {
  var height = _ref8.height;
  return height;
}, function (_ref9) {
  var position = _ref9.position;
  return slideDown(getTransformXY(position));
});
var Handle = _styledComponents["default"].aside(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  position: absolute;\n  width: 7px;\n  height: 80%;\n  border-radius: 10px;\n  background: ", ";\n  color: rgba(32, 116, 208, 1);\n"])), function (props) {
  return getColorForType(props.type);
});
var Content = _styledComponents["default"].div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  gap: 5px;\n  width: 100%;\n  height: 100%;\n  padding: 10px;\n  margin-left: 20px;\n  background: none !important;\n"])));
var H3 = _styledComponents["default"].h3(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  display: inline;\n  padding: 0;\n  margin: 0;\n  font-size: 1rem;\n  background: none !important;\n  color: ", ";\n"])), function (props) {
  return getColorForType(props.type);
});
var P = _styledComponents["default"].p(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  font-size: 0.95rem;\n  padding: 0;\n  margin: 0;\n  line-height: 1.3rem;\n  background: none !important;\n  color: #1c1919;\n"])));
var CloseButton = _styledComponents["default"].button(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  font-size: 14px;\n  font-weight: bold;\n  border: none;\n  background: none !important;\n  cursor: pointer;\n  transform: translateY(-100%);\n"])));
//# sourceMappingURL=Notify.js.map