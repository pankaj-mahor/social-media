import React, { useState, useEffect } from "react";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection, query, where, getDocs  ,deleteDoc , doc} from "firebase/firestore";
const Post = (props) => {
    
    const [likes, setLikes] = useState([]);
    const [user] = useAuthState(auth);

    const { post } = props;

    //firebase collection ref
    const likesRef = collection(db, "likes");

    const likesDoc = query(likesRef, where("postId", "==", post.id));

    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        // setLikek(data.docs.length)
        setLikes(data.docs.map((doc) => ({ userId: doc.data().userId  , likeId: doc.id})));
    };

    const addLike = async (data) => {
        // console.log(data)

        try {
            const newDoc = await addDoc(likesRef, { userId: user?.uid, postId: post.id });
     
            if (user) {
                setLikes((prev) =>
                    prev
                        ? [...prev, { userId: user?.uid  , likeId : newDoc.id}]
                        : [{ userId: user?.uid  ,  likeId : newDoc.id}]
                );
            }
        } catch (err) {
            console.log(err);
        }
    };

    const removeLike = async (data) => {
        // console.log(data)

        try {
            const likeTodeleteQuery = query(likesRef, where("postId", "==", post.id) , where("userId" ,"==" , user.uid));

            const likeToDeleteData = await getDocs(likeTodeleteQuery)
            const likeId = likeToDeleteData.docs[0].id;
            const likeToBeDeleted = doc(db , "likes" , likeId)
            await deleteDoc(likeToBeDeleted);
           
            if (user) {
                setLikes(((prev) => prev && prev.filter((like) => like.likeId !== likeId)));
            }
        } catch (err) {
            console.log(err);
        }
    };

    const hasUserLiked = likes?.find((like) => like?.userId === user?.uid);

    useEffect(() => {
        getLikes();
    }, []);

    return (
        <div className="post">
            <div className="title">
                <h2>{post.title}</h2>
            </div>
            <div className="body">
                <p className="desc-post">{post.description}</p>
            </div>
            <div className="footer">
                <p>@{post.username}</p>

                <button
                    onClick={hasUserLiked ? removeLike : addLike}
                    // style={
                    //     postliked
                    //         ? { background: "limegreen" }
                    //         : { background: "cream" }
                    // }
                >
                    {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
                </button>

                {likes && <p>Likes: {likes.length} </p>}
            </div>
        </div>
    );
};

export default Post;
