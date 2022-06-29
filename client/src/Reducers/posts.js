import { FETCH_ALL, CREATE, DELETE, LIKE, UPDATE, FETCH_BY_QUERY, START_LOADING, END_LOADING, FETCH_POST, COMMENT } from "../constants/actionTypes"

const reducer = (state = { posts: [], isLoading: false, post: null }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true }
        case END_LOADING:
            return { ...state, isLoading: false }
        case FETCH_POST:
            return { ...state, post: action.payload }
        case FETCH_ALL:
            return { ...state, posts: action.payload.data, currentPage: action.payload.currentPage, numberOfPages: action.payload.numberOfPages }
        case FETCH_BY_QUERY:
            return { ...state, posts: action.payload }
        case CREATE:
            return { ...state, posts: [action.payload, ...state.posts] }
        case UPDATE:
        case COMMENT:
        case LIKE:
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) }
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) }
        default:
            return state
    }
}
export default reducer