import React from "react";
import { useSelector } from "react-redux";
import noPostsYet from "../../Images/noPostsYet.png"
import { Grid, CircularProgress } from "@material-ui/core"
import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = ({ setCurrentPostId }) => {
  const classes = useStyles();
  const { posts, isLoading } = useSelector((state) => state.posts);
  if(!posts?.length && !isLoading) {
    return (<Grid className={classes.mainContainer} elevation={6}>
      <img className={classes.image} src={noPostsYet} alt="No Posts Yet" />
    </Grid>)
  }
  return (
    isLoading ? <CircularProgress /> : (
      <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
            <Post post={post} setCurrentPostId={setCurrentPostId}/>
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
