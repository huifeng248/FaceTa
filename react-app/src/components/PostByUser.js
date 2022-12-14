
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetPostByUser } from '../store/post'
import PostCreateBox from "./PicCard/PostCreateBox";
import CardDetail from "./PicCard/CardDetail";
import './PicCard/PicCard.css'
import { useParams } from 'react-router-dom';
import EmptyPost from './EmptyPost'
import SideBar from "./SideBar";

const PostByUser = () => {
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)
    const user = useSelector(state => state.session.user)
    const { userId } = useParams()
    const posts = useSelector(state => state.Posts)
    const post_arr = Object.values(posts)
    // const temp_posts = post_arr.filter(post => post.user.id === Number(userId))
    const filtered_posts = post_arr.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt)
    })

    useEffect(() => {
        dispatch(GetPostByUser(userId))
            .then(() => (setLoaded(true)))
    }, [dispatch, userId])

    // This need to be after the useEffect. AS the result would be filtered by the user id
    return (
        <div className="side_bar_profile_page_container">
            <SideBar />
            <div className="outer_container">
                {Number(user.id) === Number(userId) && <PostCreateBox user={user} />}
                {loaded && filtered_posts.length ?
                    filtered_posts.map((post, index) => {
                        return <div key={index} className="post_card_container">
                            <CardDetail user={user} post={post} />
                        </div>
                    })
                    : <EmptyPost />}
            </div>
        </div>
    )
}

export default PostByUser


