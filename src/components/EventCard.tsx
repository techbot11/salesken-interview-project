import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import moment from "moment";

export default function EventCard({ data }: any) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={data?.links?.mission_patch}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data?.mission_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rocket Name: {data?.rocket?.rocket_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {moment(data?.launch_date_local).format("DD, MMM YYYY hh:ss")}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={data?.links?.article_link} variant="body2">
          Article
        </Link>
      </CardActions>
    </Card>
  );
}
