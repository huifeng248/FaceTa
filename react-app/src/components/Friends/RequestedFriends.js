import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { get_friends_requested, accept_friend_request, delete_request_and_friend } from '../../store/friend'
import no_friend_image from "../../image/no_friend.png"


function RequestedFriends() {
    const current_user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false)
    const friends = useSelector(state => state.Friends)
    const requested_friends = Object.values(friends)

    useEffect(() => {
        dispatch(get_friends_requested())
            .then(() => setLoaded(true))

    }, [])

    const deleteOnClick = async (frienshipId) => {
        await dispatch(delete_request_and_friend(frienshipId))
    }

    const acceptRequestOnclick = async (id) => {
        await dispatch(accept_friend_request(id))
        // await dispatch(get_friends_requested())
    }

    if (!requested_friends.length) {
        return (
            <div className='no_friend_container'>
                <img className="no_friend_avaialble" src={no_friend_image} alt="no friend image"></img>
                {/* <img className="no_friend_avaialble" src='https://faceta2.s3.amazonaws.com/7507152f397242bc951754f904d9df6e.png' alt="no friend image"></img> */}
                <div className='no_friend_words'>
                    There is no friend request yet. Go to Suggestions to send request to friends.
                </div>
            </div>
        )
    }


    return (
        <div className="friend_card_detail_container">
            {loaded && 
                requested_friends.length && requested_friends.map((friend, index) => {
                return (
                    <div className="friend_detail_wrapper">
                        <div className="friend_card_detail" key={index}>
                            <img className="friend_profile_image" src={friend.requester.profile_img} alt="profile_image"></img>
                            <div>{friend.requester.first_name} {friend.requester.last_name}</div>
                            <div className='friends_button_container'>
                                <button className='accept_button'
                                    onClick={() => {
                                        // acceptRequestOnclick(friend.friend_id)
                                        acceptRequestOnclick(friend.id)

                                    }
                                    }>Confirm</button>
                                <button className="reject_button"
                                
                                    onClick={()=>{
                                        deleteOnClick(friend.id)
                                    }}>Delete</button>
                            </div>
                        </div>
                    </div>
                )
            })
            }

            {/* {loaded && requested_friends.length && requested_friends.map((friend, index) => {
                return (
                    <div className="friend_detail_wrapper">
                        <div className="friend_card_detail" key={index}>
                            <img className="friend_profile_image" src={friend.requester.profile_img} alt="profile_image"></img>
                            <div>{friend.requester.first_name} {friend.requester.last_name}</div>
                            <div className='friends_button_container'>
                                <button className='accept_button'
                                    onClick={() => {
                                        acceptRequestOnclick(friend.friend_id)
                                    }
                                    }>Confirm</button>
                                <button className="reject_button">Delete</button>
                            </div>
                        </div>
                    </div>
                )
            })
            } */}
            {/* {loaded && requested_friends.length && requested_friends.map((friend, index) => {
                return (
                    <div className="friend_detail_wrapper">
                        <div className="friend_card_detail" key={index}>
                            <img className="friend_profile_image" src={friend.requester.profile_img} alt="profile_image"></img>
                            <div>{friend.requester.first_name} {friend.requester.last_name}</div>
                            <div className='friends_button_container'>
                                <button className='accept_button'>Confirm</button>
                                <button className="reject_button">Delete</button>
                            </div>
                        </div>
                    </div>
                )
            })
            } */}
            {/* {loaded && requested_friends.length && requested_friends.map((friend, index) => {
                return (
                    <div className="friend_detail_wrapper">
                        <div className="friend_card_detail" key={index}>
                            <img className="friend_profile_image" src={friend.requester.profile_img} alt="profile_image"></img>
                            <div>{friend.requester.first_name} {friend.requester.last_name}</div>
                            <div className='friends_button_container'>
                                <button className='accept_button'>Confirm</button>
                                <button className="reject_button">Delete</button>
                            </div>
                        </div>
                    </div>
                )
            })
            } */}
        </div>
    )
}

export default RequestedFriends