import React, { useEffect, useLayoutEffect, useState, useMemo } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";

const ToastTypes = {
  INFO: "info",
  ERROR: "error",
  SUCCESS: "success",
  WARNING: "warning",
  NEUTRAL: "neutral",
};

const PositionTypes = {
  LEFTTOP: "left-top",
  RIGHTTOP: "right-top",
  LEFTBOTTOM: "left-bottom",
  RIGHEBOTTOM: "right-bottom",
  TOPCENTER: "top-center",
};

function validateProps(props = {}) {
  Object.keys(props).forEach((key) => {
    if (key === "type" && !Object.values(ToastTypes).includes(props[key])) {
      throw Error(
        "Invalid type. It should be one of " + Object.values(ToastTypes)
      );
    }
    if (
      key === "position" &&
      !Object.values(PositionTypes).includes(props[key])
    ) {
      throw Error(
        "Invalid position. It should be one of " + Object.values(PositionTypes)
      );
    }
  });
}

function getTransformXY(position) {
  switch (position) {
    case PositionTypes.LEFTBOTTOM:
    case PositionTypes.RIGHEBOTTOM:
      return { "--transformX": 0, "--transformY": "100%" };
    case PositionTypes.LEFTTOP:
    case PositionTypes.RIGHTTOP:
      return { "--transformX": 0, "--transformY": "-100%" };
    case PositionTypes.TOPCENTER:
      return { "--transformX": "-50%", "--transformY": "-100%" };
    default:
      throw Error("Invalid Position");
  }
}

const Notify = ({
  children,
  type = ToastTypes.INFO,
  onClose = () => {},
  timeout = 2000,
  containerClass = "",
  handlerClass = "",
  contentClass = "",
  containerStyle = {},
  handleStyle = {},
  contentStyle = {},
  title = "Add a Title Prop",
  content = "Add a Content Prop",
  enableChildren = false,
  show = true,
  closeIcon = <span style={{ color: "gray" }}>Dismiss</span>,
  position = PositionTypes.RIGHTTOP,
  width = "auto",
  height = "auto",
}) => {
  const [portalRoot, setPortalRoot] = useState(null);

  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => {
      onClose();
    }, timeout);
    return () => clearTimeout(timer);
  }, [show, onClose, timeout]);

  useLayoutEffect(() => {
    const root = document.createElement("div");
    root.className = "sappui-toast-portal";
    document.body.appendChild(root);
    setPortalRoot(root);
    return () => document.body.removeChild(root);
  }, []);

  validateProps({ position, type });

  const renderContent = useMemo(() => {
    if (enableChildren) return children;
    return (
      <>
        {title && <H3 type={type}>{title}</H3>}
        {content && <P type={type}>{content}</P>}
      </>
    );
  }, [children, enableChildren, content, title, type]);

  if (!show || !portalRoot) return null;

  return ReactDOM.createPortal(
    <Container
      position={position}
      width={width}
      height={height}
      style={containerStyle}
      className={containerClass}
    >
      <Handle type={type} style={handleStyle} className={handlerClass} />
      <Content style={contentStyle} className={contentClass}>
        {renderContent}
      </Content>
      <CloseButton onClick={onClose.bind(this, false)}>{closeIcon}</CloseButton>
    </Container>,
    portalRoot
  );
};

export const propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(Object.values(ToastTypes)),
  onClose: PropTypes.func.isRequired,
  timeout: PropTypes.number,
  title: PropTypes.string,
  content: PropTypes.string,
  enableChildren: PropTypes.bool,
  show: PropTypes.bool,
  containerStyle: PropTypes.object,
  handlerStyle: PropTypes.object,
  contentStyle: PropTypes.object,
  containerClass: PropTypes.string,
  handleStyle: PropTypes.string,
  contentClass: PropTypes.string,
  closeIcon: PropTypes.node,
  position: PropTypes.string,
  width: PropTypes.string || PropTypes.number,
  height: PropTypes.string || PropTypes.number,
};
Notify.propTypes = propTypes;

export default Notify;

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

const slideDown = (transform) => keyframes`
from {
    transform: translateY(${transform["--transformY"]}) translateX(${transform["--transformX"]});
  }
  to {
    transform: translateY(0) translateX(${transform["--transformX"]});
  }
`;

const Container = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Varela+Round&display=swap");
  @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
  position: fixed;
  left: ${({ position }) =>
    position === PositionTypes.LEFTBOTTOM || position === PositionTypes.LEFTTOP
      ? "10px"
      : position === PositionTypes.TOPCENTER
      ? "50%"
      : "auto"};
  right: ${({ position }) =>
    position === PositionTypes.RIGHEBOTTOM ||
    position === PositionTypes.RIGHTTOP
      ? "10px"
      : "auto"};
  top: ${({ position }) =>
    position === PositionTypes.LEFTTOP || position === PositionTypes.RIGHTTOP
      ? "10px"
      : "auto"};
  bottom: ${({ position }) =>
    position === PositionTypes.LEFTBOTTOM ||
    position === PositionTypes.RIGHEBOTTOM
      ? "10px"
      : "auto"};
  transform: ${({ position }) =>
    position === PositionTypes.TOPCENTER
      ? `translateX(${getTransformXY(position)["--transformX"]})`
      : "none"};
  display: flex;
  align-items: center;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  max-width: 95vw !important;
  padding: 5px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  font-family: Varela round;
  box-sizing: border-box;
  animation: ${({ position }) => slideDown(getTransformXY(position))} 0.3s ease;
  z-index: 10;
`;

const Handle = styled.aside`
  position: absolute;
  width: 7px;
  height: 80%;
  border-radius: 10px;
  background: ${(props) => getColorForType(props.type)};
  color: rgba(32, 116, 208, 1);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 100%;
  height: 100%;
  padding: 10px;
  margin-left: 20px;
  background: none !important;
`;

const H3 = styled.h3`
  display: inline;
  padding: 0;
  margin: 0;
  font-size: 1rem;
  background: none !important;
  color: ${(props) => getColorForType(props.type)};
`;

const P = styled.p`
  font-size: 0.95rem;
  padding: 0;
  margin: 0;
  line-height: 1.3rem;
  background: none !important;
  color: #1c1919;
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  border: none;
  background: none !important;
  cursor: pointer;
  transform: translateY(-100%);
`;
