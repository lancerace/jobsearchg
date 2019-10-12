import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export default function NavBarItem(props) {
  const { children, to } = props;

  return (
    <Link to={to}>
      <Button>{children}</Button>
    </Link>
  );
}

NavBarItem.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string
};

NavBarItem.defaultProps = {
  to: ""
};
