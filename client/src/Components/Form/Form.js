import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import FileBase from "react-file-base64";
import { TextField, Button, Typography, Paper, Avatar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux"
import { createPost, updatePost } from "../../Actions/posts";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import { useNavigate } from "react-router-dom";

const Form = ({ currentPostId, setCurrentPostId }) => {
  const classes = useStyles();
  const [postData, setPostData] = useState({ title: "", message: "", selectedFile: "", tags: [] });
  const post = useSelector((state) => currentPostId ? state.posts.posts.find((post) => post._id === currentPostId) : null)
  const user = JSON.parse(localStorage.getItem('profile'))
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentPostId) {
      dispatch(updatePost(currentPostId, { ...postData, name: user?.result?.name}))
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate))
    }
    clear()
  };

  const clear = () => {
    setCurrentPostId(null)
    setPostData({ title: "", message: "", selectedFile: "", tags: [] })
  };

  useEffect(() => {
    if (post) {
      setPostData(post)
    }
  }, [post])

  return (
    <Paper className={classes.paper} elevation={6}>
      {!user?.result ? <><Avatar className={classes.avatar} >
        <LockOutlinedIcon />
      </Avatar>
        <Typography variant="h6">
          Please Sign in to access features of Memories
        </Typography>
      </> :
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}
          onSubmit={handleSubmit}>
          <Typography variant="h6">{currentPostId ? "Editing a Memory" : "Create a Memory"}</Typography>
          <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title}
            onChange={(event) => setPostData({ ...postData, title: event.target.value })}
          />
          <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message}
            onChange={(event) => setPostData({ ...postData, message: event.target.value })}
          />
          <TextField name="tags" variant="outlined" label="Tags ',' separated" fullWidth value={postData.tags.join(",")}
            onChange={(event) => setPostData({ ...postData, tags: event.target.value.split(",") })}
          />
          <div className={classes.fileInput}>
            <FileBase type="file" multiple={false}
              onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
            />
          </div>
          <Button className={classes.buttonSubmit} variant="contained" color="primary"
            size="large" type="submit" fullWidth>Submit</Button>
          <Button className={classes.buttonSubmit} variant="contained" color="secondary"
            size="large" fullWidth onClick={clear}>Clear</Button>
        </form>
      }
    </Paper>
  );
};

export default Form;
