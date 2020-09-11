import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import { Link } from "react-router-dom";

const moment = require("moment");
export default function NoteItem(props) {
  const { note } = props;
  return (
    <div key={note._id}>
      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Chip size="small" label={note.category} color="primary" />
            </Grid>
            <Grid item xs={6}>
              <Typography color="textSecondary" style={{ textAlign: "right" }}>
                {moment(note.date).format("MMMM d")}
              </Typography>
            </Grid>
          </Grid>
          <Grid style={{ marginTop: "1em" }}>
            <Typography variant="body2" component="p">
              {`${note.text.substring(0, 100)}...`}
            </Typography>
          </Grid>
        </CardContent>
        <CardActions>
          <Link to={`/notes/${note._id}`}>
            <Button size="small">More</Button>
          </Link>
        </CardActions>
      </Card>
      <br />
    </div>
  );
}
