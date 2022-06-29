import * as API from "../API/index";
import { FETCH_ALL, DELETE, UPDATE, LIKE, CREATE, FETCH_BY_QUERY, START_LOADING, END_LOADING, FETCH_POST, COMMENT } from "../constants/actionTypes";

export const getPost = (id) => async (dispatch) => {
  dispatch({ type: START_LOADING })
  try {
    const { data } = await API.fetchPost(id);
    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error.message);
    dispatch({ type: END_LOADING })
  }
};

export const getPosts = (page) => async (dispatch) => {
  dispatch({ type: START_LOADING })
  try {
    const { data } = await API.fetchPosts(page);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error.message);
    dispatch({ type: END_LOADING })
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  dispatch({ type: START_LOADING })
  try {
    const { data } = await API.fetchPostsBySearch(searchQuery)
    dispatch({ type: FETCH_BY_QUERY, payload: data });
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error)
    dispatch({ type: END_LOADING })
  }
}

export const createPost = (post, navigate) => async (dispatch) => {
  dispatch({ type: START_LOADING })
  try {
    const { data } = await API.createPost(post)
    dispatch({ type: CREATE, payload: data });
    dispatch({ type: END_LOADING })
    navigate(`/posts/${data._id}`)
  } catch (error) {
    console.log(error)
    dispatch({ type: END_LOADING })
  }
}

export const updatePost = (id, post) => async (dispatch) => {
  dispatch({ type: START_LOADING })
  try {
    const { data } = await API.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data })
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error)
    dispatch({ type: END_LOADING })
  }
}

export const deletePost = (id, navigate) => async (dispatch) => {
  dispatch({ type: START_LOADING })
  try {
    await API.deletePost(id)
    dispatch({ type: DELETE, payload: id })
    dispatch({ type: END_LOADING })
    navigate('/')
  } catch (error) {
    console.log(error)
    dispatch({ type: END_LOADING })
  }
}

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await API.likePost(id)
    dispatch({ type: LIKE, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const commentPost = (comment, id) => async (dispatch) => {
  try {
    const { data } = await API.commentPost(comment, id)
    dispatch({type: COMMENT, payload: data});
    return data.comments;
  } catch(error) {
    console.log(error)
  }
}