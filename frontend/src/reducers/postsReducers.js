import { FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, FETCH_BY_PAGE, CREATE, UPDATE, LIKE, DELETE, START_LOADING, END_LOADING } from "../constants/actionTypes"

export default (state = { posts: [], isLoading: true }, action) => {
    switch (action.type) {
        case FETCH_ALL:
            return { ...state, posts: action.payload }
        case FETCH_POST:
            return { ...state, post: action.payload}
        case FETCH_BY_SEARCH:
            const { data: { data } } = action.payload
            return { ...state, posts: data}
        case FETCH_BY_PAGE:
            return { ...state, posts: action.payload.data, currentPage: action.payload.currentPage, numberOfPages: action.payload.numberOfPages }
        case CREATE:
            return [...state, action.payload]
        case UPDATE:
        case LIKE:
            return { ...state, posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post) }
        case DELETE:
            return { ...state, posts: state.posts.filter(post => post._id !== action.payload) }
        case START_LOADING:
            return { ...state, isLoading: true }
        case END_LOADING:
            return { ...state, isLoading: false }
        default:
            return state
    }
}