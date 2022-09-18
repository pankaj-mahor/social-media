import React , { useState , useEffect }  from 'react'
import { getDocs , collection } from 'firebase/firestore'
import { db } from '../../config/firebase'
import Post from './Post'

const Main = () => {
    const [isloaded, setLoaded] = useState(false)

  const [postList , setPostList]  = useState([])
  const postRef = collection(db, "posts");


  const getPosts = async () => {
    const data = await getDocs(postRef);
    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) || [])
    console.log(data.docs.map((doc) => ({...doc.data() , id: doc.id})))    
  }

  

  useEffect(() => {

      getPosts()

    // let flag = true/
    // console.log('effect start')
    // if (!isloaded) {
    //   getPosts()
    // }
    // return () => {
    //   setLoaded(true)
    //   console.log('effect clean')

    // }
  }, [])
  
  
  return (
    <div className='homepage'>{
      postList?.map((post , index) => (
        <Post key={index} post={ post} />
    ))
    
    }</div>
  )
}

export default Main