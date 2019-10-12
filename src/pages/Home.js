import React from "react";
import Grid from "@material-ui/core/Grid";

export default function Home() {
  return (
    <Grid
      container
      justify="center"
      item
      md={12}
      style={{
        border: "0px solid red",
        height: "40vh"
      }}>
      <div>
        <h2>Content content</h2>
      </div>

      {/*title*/}
      <Grid
        item
        md={12}
        style={{ height: "300px", border: "1px solid green" }}
      />
    </Grid>
  );
}
