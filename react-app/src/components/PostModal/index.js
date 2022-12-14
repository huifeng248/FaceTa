import { Modal } from '../../context/Modal'
import { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { CreatePost, EditPost, Load_Posts_Homepage } from '../../store/post'
import './PostModal.css'


function PostModal({ user, post, setShowPostModal, showPostModal }) {
    const [description, setDescription] = useState()
    const [url, setUrl] = useState()
    const [errors, setErrors] = useState([]);
    const [isValid, setIsValid] = useState(false)
    const [uploadImage, setUploadImage] = useState(null);
    const dispatch = useDispatch()
    // this will populate the data for the edit
    useEffect(() => {
        if (post) {
            setDescription(post.description)
            setUrl(post.url)
            setIsValid(true)
            // setUploadImage(post.url)
        }
    }, [post])

    useEffect(() => {
        if (!showPostModal) return
        const focusEvent = () => document.getElementById('post_description_id').focus()
        return focusEvent()

    }, [showPostModal])

    function checkImageUrl(post_url) {
        if (!post_url || post_url.trimEnd().length === 0) return false
        if (post_url && post_url.includes(' ')) return false
        if (post_url && post_url.includes("File:")) return false

        return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(post_url);
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setUploadImage(file);
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        let errors_arr = []

        if (!description || description.trimEnd().length === 0) {
            errors_arr.push('Please provide a valid description')
        }
        if (description && description.trimEnd().length > 3000) {
            errors_arr.push('Description must be within 3000 characters')
        }
        // if (!url || url.trimEnd().length === 0) {
        //     errors_arr.push('Please provide a valid image url')
        // }

        // if (!isValid) {
        //     errors_arr.push('Please provide a valid image url that ends with jpg, jpeg, png, webp, avif, gif, or svg')
        // }
        // if (url && url.includes(' ')) {
        //     errors_arr.push(
        //         'Cannot have an empty space in the url'
        //     )
        // }
        // if (url && url.includes("File:")) {
        //     errors_arr.push(
        //         'Invalid URL: URL must not include "File:", please use original image address'
        //     );
        // }



        if (errors_arr.length > 0) {
            return setErrors(errors_arr)
        }
        // create a post  

        if (!post) {
            const create_post_payload = {
                description,
                // url
                uploadImage
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
                url,
                // uploadImage
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
                                <div key={index}>{error}</div>
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
                                        id="post_description_id"
                                        placeholder={`What's on your mind, ${user.first_name}?`}
                                        onChange={(e) => {
                                            setDescription(e.target.value)
                                            setErrors([])
                                        }}
                                        value={description}
                                    >
                                    </textarea>
                                </div>

                                {!post && <div className='post_info_div'>
                                    {/* <input className="post_url"
                                        placeholder='Image url here...'
                                        onChange={(e) => {
                                            setUrl(e.target.value)
                                            setIsValid(checkImageUrl(e.target.value))
                                            setErrors([])}}
                                        value={url}
                                        type="url"
                                    >
                                    </input> */}
                                    <label htmlFor="file_input" className="post_url">Click to upload image</label>
                                    <input id="file_input"
                                        type="file"
                                        accept="image/*"
                                        onChange={updateImage}
                                    />
                                </div>}

                                <div className="post_image_preview_container">
                                    {
                                        post && (
                                            <img
                                                className='post_image_preview_holder'
                                                src={post.url}
                                                alt="existing image"
                                            ></img>
                                        )
                                    }

                                    {uploadImage && (<img id="preview_img"
                                        // onError={({ target }) => {
                                        //     target.onError = null
                                        //     target.src = "https://community.clover.com/themes/base/admin/img/default-coverImage.png"
                                        // }}
                                        className='post_image_preview_holder'
                                        src={URL.createObjectURL(uploadImage)}
                                    ></img>)}

                                    {/* {isValid? 
                                    <img className='post_image_preview_holder' src={url}></img>
                                    : <img className='post_image_preview_holder' src="https://community.clover.com/themes/base/admin/img/default-coverImage.png"></img>} */}
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