import React, { useState , useEffect } from 'react'
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc ,collection , query, where  , getDocs} from 'firebase/firestore';
const Post = (props) => {
    const [postliked , setPostLiked] = useState(false)
    const [likedAmount , setlikedAmount] = useState(0)
    const [user] = useAuthState(auth)

    const { post } = props;

     //firebase collection ref
    const likesRef = collection(db , "likes")


    const likesDoc = query(likesRef, where("postId", "==", post.id))
    
    const getLikes = async () => {
        const data = await getDocs(likesDoc)
        setlikedAmount(data.docs.length)
        // console.log(data.docs.map((doc) => ({...doc.data() , id: doc.id})))
    }

    const addLike = async (data) => {
        // console.log(data) 
        await addDoc(likesRef , {userId: user?.uid , postId: post.id })
        setPostLiked(true)
    }

    useEffect(() => {
      getLikes()
    }, [])
    
  return (
      <div className='post'>
          <div className='title'>
              
        <h2>{post.title}</h2>     
          </div>
          <div className='body'>
              
        <p className='desc-post'>{ post.description}</p>
          </div>
          <div className='footer'>
              <p>@{post.username}</p>
              <button onClick={addLike} style={postliked ? {background: 'limegreen' } : {background:'cream'}}> &#128077;</button>
                
              {likedAmount > 0 ? (<p>Likes: {likedAmount} </p>) : null }
              
          </div>
    </div>
  )
}

export default Post