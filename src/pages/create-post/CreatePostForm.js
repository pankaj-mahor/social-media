import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { auth, db } from '../../config/firebase';
import { addDoc, collection } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
const CreatePostForm = () => {
    const [postAdded , setPostAddded] = useState(false)
    const navigate = useNavigate()
    const [user] = useAuthState(auth)

    const schema = yup.object().shape({
        title: yup.string().required("You Must add a title"),
        description: yup.string().required("you must add something to post")
    })


    const {register , handleSubmit , formState: {errors}} = useForm({
        resolver: yupResolver(schema),

    })

    //firebase collection ref
    const postsRef = collection(db , "posts")

    const onCretePost = async (data) => {
        setPostAddded(false)
        // console.log(data) 
        await addDoc(postsRef, {
            // title: data.title,
            // description: data.description,
            //We can do both ways   

            ...data,
            username: user?.displayName,
            userId : user?.uid
        })
        
        setPostAddded(true)     
        setTimeout(() => {
            navigate('/')
        }, 1000)
    }


  return (
      <div className='form-add'>

          {postAdded && (
              
            <div className='post-add-confirm'>
                <p>Post Added Succesfull</p> 
            </div>  
          )}


          <form onSubmit={handleSubmit(onCretePost)}>
              {/* <label htmlFor='title'>Title</label> */}
              <input placeholder='Title...' {...register("title")} />
              <p style={{ colro: 'red' }}>{errors.title?.message}</p>
              {/* <label htmlFor='desc'>Description</label> */}
              
              <textarea placeholder='Description...' {...register("description")} ></textarea>
              <p style={{colro:'red'}}>{ errors.description?.message}</p>
              <input type='submit' value="Add " />
        </form>
    </div>
  )
}

export default CreatePostForm