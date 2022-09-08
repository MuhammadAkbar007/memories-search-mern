import '../../../App.css'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../../actions/postsActions'
import { AiFillLike, AiFillDelete } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const Post = ({ post, setCurrentId }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('profile'))

  const openPost = () => navigate(`/posts/${post._id}`)

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(like => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <>
            <AiFillLike className={post.likes.length === 1 ? 'text-success' : 'text-warning'} />&nbsp;
            {post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
          </>
        ) : (
          <>
            <AiFillLike className={post.likes.length === 1 ? 'text-success' : 'text-warning'} />&nbsp;
            {post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
          </>
        )
    }

    return <><AiFillLike className='text-white' />&nbsp;Like</>
  }

  return (
    <div>
      <div className="card shadow my-card-overlay" onClick={openPost}>
        <img src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
          alt="chosenImage" className='card-img' style={{ height: '25vh' }} />
        <div className="my-overlay"></div>
        <div className="card-img-overlay text-white">
          <div className="row">
            <div className="col-10">
              <h6 className="card-title">{post.name}</h6>
              <p className="card-text small">{moment(post.createdAt).fromNow()}</p>
            </div>
            <div className="col-2">
              {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <p className="card-text text-wrap badge bg-warning" role="button" onClick={() => setCurrentId(post._id)}>...</p>
              )}
            </div>
          </div>
        </div>

        <p className='text-secondary'>{post.tags.map(tag => `#${tag} `)}</p>
        <h5><b>{post.title}</b></h5>
        <p className='text-secondary'>{post.message}</p>

      </div>
      
      <div className="card-footer shadow text-white rounded">
        <div className="row">
          <div className={!user?.result ? "visually-hidden" : "col-4 d-flex align-items-center my_icon"}
            onClick={() => dispatch(likePost(post._id))} >
            <Likes />
          </div>
          {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <div className="col-4 d-flex align-items-center my_icon" onClick={() => dispatch(deletePost(post._id))} >
              <AiFillDelete />
              Delete
            </div>
          )}
        </div>
      </div>
    
    </div>
  )
}

export default Post