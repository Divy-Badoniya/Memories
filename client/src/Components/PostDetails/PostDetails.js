import React, { useEffect } from 'react'
import useStyles from "./styles"
import moment from "moment"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { CircularProgress, Divider, Grid, Paper, Typography } from '@material-ui/core'
import { getPost, getPostsBySearch } from '../../Actions/posts'
import Post from '../Posts/Post/Post'
import CommentSection from './CommentSection/CommentSection'


const PostDetails = () => {
  const classes = useStyles()
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams()
  useEffect(() => {
    dispatch(getPost(id));
  }, [id])

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ searchTitle: 'none', tagSearch: post.tags.join(',') }))
    }
  }, [post])

  if (!post) return null;

  if (isLoading) {
    return <CircularProgress />
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id)

  return (
    <Paper elevation={6} style={{ 'padding': '20px', borderRadius: '15px' }}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post?.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post?.tags?.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post?.message}</Typography>
          <Typography variant="h6">Created by: {post?.name}</Typography>
          <Typography variant="body1">{moment(post?.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post?.selectedFile} alt={post?.title} />
        </div>
      </div>
      {recommendedPosts?.length > 0 && <div className={classes.section}>
        <Typography gutterBottom variant="h5" >You might also like</Typography>
        <Divider />
        <div className={classes.recommendedPosts}>
          {recommendedPosts.map((p) => (
            <Grid key={p._id} item xs={12} sm={12} md={6} lg={2}>
              <Post post={p} setCurrentPostId={false} />
            </Grid>
          ))}
        </div>
      </div>}
    </Paper>
  )
}

export default PostDetails