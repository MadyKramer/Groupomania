import { useState, useContext } from "react";

// import { UserContext } from "./AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";


const CreatePost = ({setUpdateUseEffect}) => {
  //STATE
  const [errorMsg, setErrorMsg] = useState("");
  const [postimg, setPostimg] = useState("");
  const [content, setContent] = useState("");



  //COMPORTEMENTS
  // const user = useContext(UserContext);
  const token = localStorage.getItem("token");
  


  const handleCreatePost = (e) => {
    e.preventDefault();
    let postCreate = { content };
    if (postimg.length !== 0) {
      postCreate = new FormData();
      postCreate.append("image", postimg[0]);
      postCreate.append("content", JSON.stringify(content));
    }
    
    axios
      .post(`${process.env.REACT_APP_API_URL}api/posts`, postCreate,{
        headers: { Authorization: `Bearer ${token}`},
      })
      .then((res) => {
        setUpdateUseEffect(true);
        setContent("");
        setPostimg("");
      })
      .catch((err) => {
        setErrorMsg(err);
      });
     
    }
  //RENDER
  return (
    <div className="bigContainer">
      {/* <img src={whiteLogo} alt="" className="whiteLogo" /> */}
      <div className="mainWrapper">
        <div className="createPostContainer">
          <div className="createPostContent">
            <form
              action=""
              className="writeNews"
              onSubmit={handleCreatePost}
              id="createPostForm"
            >
              {/* PP */}
              <label htmlFor="createPost"></label>
              <input
                name="createPost"
                id="createPost"
                className="createPostInput"
                type="textarea"
                placeholder={`Quoi de neuf ?`}
                onChange={(e) => setContent(e.target.value)}
                value={content}
              ></input>
              <div className="createPostOptions">
                <FontAwesomeIcon icon={faImage} className="createPostIcon" />
                <input
                  onClick={handleCreatePost}
                  type="submit"
                  value="Postez!"
                  className="postBtn"
                ></input>
              </div>
            </form>
            
          </div>
          {errorMsg && <h3>{errorMsg}</h3>}
        </div>
      </div>
    </div>
  );
}
  

export default CreatePost;
