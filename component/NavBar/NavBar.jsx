import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import "./styles.css";
import NavBarItem from "./NavBarItem/NavBarItem";

export default class NavBar extends React.Component {
  static Item = NavBarItem;
  constructor(props) {
    super(props);
  }
  render() {
    const { styles, children } = this.props;

    return (
      /*navBar container*/
      /*  <Grid item md={12} styleName={styles["bgWhite"]}>*/
      <Grid item md={12} styleName={styles}>
        <ul styleName="container">{children}</ul>
      </Grid>
    );
  }
} //end class
NavBar.propTypes = {
  //  listItems: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.node,
  styles: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};
NavBar.defaultProps = {
  children: "",
  styles: ""
};

/*
return listItems.map((liItem, index) => {
  console.log(index);
  console.log(liItem.text);
  <NavBar.Item>asgasg</NavBar.Item>;
}); //end Array.map*()


 */
/*
  <nav>
    <ul>
      {listItems.map(liItem => {
        return (
          <Grid item md={12} key={Shortid.generate()}>
            <li>{liItem.text}</li>
          </Grid>
        );
      })}
    </ul>
  </nav>


 */
