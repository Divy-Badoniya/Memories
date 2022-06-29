import React, { useState }from 'react'
import useStyles from "./styles"
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core'
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt"
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import moment from 'moment'
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { deletePost, likePost } from '../../../Actions/posts'

const Post = ({ post, setCurrentPostId }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))
  const navigate = useNavigate()
  const [likes, setLikes] = useState(post?.likes)
  const openPost = () => navigate(`/posts/${post._id}`)
  const userId = (user?.result?.googleId || user?.result?._id)
  const handleLike = () => {
    dispatch(likePost(post._id))
    const hasLiked = likes.find((likedBy) => likedBy === userId)
    if(hasLiked) {
      setLikes(likes.filter((id) => id !== userId))
    } else {
      setLikes([...likes, userId])
    }
  }
  const Like = () => {
    if (likes.length > 0) {
      return post.likes.find((likedBy) => likedBy === userId)
        ? (
          <><ThumbUpAltIcon fontSize='small' />&nbsp;{`${likes.length} like${likes.length > 1 ? 's' : ''}`} </>
        ) : (
          <><ThumbUpAltOutlined fontSize='small' />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        )
    }
    return <><ThumbUpAltOutlined fontSize='small' /></>
  }
  
  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase className={classes.cardAction} onClick={openPost}>
        <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
      </ButtonBase>
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        <div className={classes.overlay2} name="edit" >
          {(user?.result?._id === post.creator || user?.result?.googleId === post.creator) && <Button style={{ color: "white" }} size="small" onClick={() => setCurrentPostId(post._id)} >
            {setCurrentPostId && <EditIcon fontSize="medium" />}
          </Button>}
        </div>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
        <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p" >{post.message}</Typography>
        </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
          <Like />
        </Button>
        {(user?.result?._id === post.creator || user?.result?.googleId === post.creator) && <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id, navigate))}>
          <DeleteIcon fontSize="small" />
          Delete
        </Button>}
      </CardActions>
    </Card>
  )
}

export default Post