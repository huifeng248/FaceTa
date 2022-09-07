import { Modal } from '../../context/Modal'
import { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { CreatePost, EditPost } from '../../store/post'
import './PostModal.css'


function PostModal({ user, post, setShowPostModal, showPostModal }) {
    const [description, setDescription] = useState()
    const [url, setUrl] = useState()
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch()

    // this will populate the data for the edit
    useEffect(() => {
        if (post) {
            setDescription(post.description)
            setUrl(post.url)
        }
    }, [post])


    const handleSubmit = async (e) => {
        e.preventDefault()
        let errors_arr = []

        if (!description) {
            errors_arr.push('Please provide a valid post')
        }
        if (!url) {
            errors_arr.push('Please provide a valid image url')
        }
        if (errors_arr.length > 0) {
            return setErrors(errors_arr)
        }
        // create a post  
        if (!post) {
            const create_post_payload = {
                description,
                url
            }

            dispatch(CreatePost(create_post_payload))
                // .then(() => onClose())
                .catch(async (data) => {
                    if (data && data.errors) {
                        setErrors(data.errors)
                    }
                })
            setShowPostModal(false)
        } else {
            const edit_post_payload = {
                id: post.id,
                description,
                url
            }
            dispatch(EditPost(edit_post_payload))
                // .then(() => onClose())
                .catch(async (data) => {
                    if (data && data.errors) {
                        setErrors(data.errors)
                    }
                })
            setShowPostModal(false)
        }
    }

    return (
        <div>
            {showPostModal &&
                <Modal onClose={() => setShowPostModal(false)}>
                    <div className='create_post_form_container'>
                        <div className='post_title_wrapper'>
                            <div className='post_form_title'>{post ? "Edit post" : "Create post"}</div>
                            <i onClick={() => { setShowPostModal(false) }}
                                className="fa-solid fa-x cancel_post_button"></i>
                        </div>

                        {errors.length > 0 && <ul className='Post_error_message_container'>
                            {errors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>}
                        <div className="user_box">
                            <div>
                                <img className="user_profile_image" src={user.profile_img}></img>
                            </div>
                            <div className="user_name">
                                {user.first_name} {user.last_name}
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>

                            <div className='post_info_container'>
                                <div className='post_info_div'>
                                    <textarea className="post_description"
                                        placeholder="What's on your mind, Hui?"
                                        onChange={(e) => setDescription(e.target.value)}
                                        value={description}
                                    >
                                    </textarea>
                                </div>

                                <div className='post_info_div'>
                                    <textarea className="post_url"
                                        placeholder='Image url here...'
                                        onChange={(e) => setUrl(e.target.value)}
                                        value={url}
                                        type="url"
                                    >
                                    </textarea>
                                </div>

                                <div className="post_image_preview_container">
                                    <img className='post_image_preview_holder' src={url}></img>
                                </div>
                            </div>
                            <div className='button_container'>
                            <button className="post_submit_button" type='submit'
                            > {post ? "Save" : "Post"}</button>
                            </div>
                        </form>
                    </div>
                </Modal>}
        </div>
    )
}

export default PostModal