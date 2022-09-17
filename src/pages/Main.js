import React , { useState , useEffect }  from 'react'
import { getDocs , collection } from 'firebase/firestore'
import { db } from '../config/firebase'

const Main = () => {

  const [postList , setPostList]  = useState([])
  const postRef = collection(db, "posts");


  const getPosts = async () => {
    const data = await getDocs(postRef);
    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) || [])
    console.log(data.docs.map((doc) => ({...doc.data() , id: doc.id})))    
  }

  

  useEffect(() => {

      // getPosts()

    let flag = true
    console.log('effect start')
    if (flag === true) {
      getPosts()
    }
    return () => {
      flag = false
      console.log('effect clean')

    }
  }, [])
  
  
  return (
    <div className='homepage'>{
      postList?.map((post) => (
        <div className='post'>

          <p>{post.title}</p>  
          <p className='desc-post'>{ post.title}</p>
        </div>
    ))
    
    }</div>
  )
}

export default Main