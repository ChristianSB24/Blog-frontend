import React, { useState, useEffect } from "react";
import {get, update, deletePost} from "../services/post-service";

function Post(props) {
    const initialPostState = {
      id: null,
      title: "",
      description: "",
    };

    const [currentPost, setCurrentPost] = useState(initialPostState);
    const [message, setMessage] = useState("");
  
    const getPost = id => {
      get(id)
        .then(response => {
          setCurrentPost(response.data);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };
  
    useEffect(() => {
      getPost(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentPost({ ...currentPost, [name]: value });
      };
    

      const updatePost = () => {
        update(currentPost.id, currentPost)
          .then(response => {
            console.log(response.data);
            setMessage("The post was updated successfully!");
          })
          .catch(e => {
            console.log(e);
          });
      };
    
      const removePost = () => {
        deletePost(currentPost.id)
          .then(response => {
            console.log(response.data);
            props.history.push("/posts");
          })
          .catch(e => {
            console.log(e);
          });
      };

      return (
        <div>
          {currentPost ? (
            <div className="edit-form">
              <h4>Post</h4>
              <form>
                <div className="mb-3">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={currentPost.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={currentPost.description}
                    onChange={handleInputChange}
                  />
                </div>
          </form>

          <button className="badge bg-danger text-white me-2" onClick={removePost}>
            Delete
          </button>

          <button
            type="submit"
            className="badge bg-success text-white"
            onClick={updatePost}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Post...</p>
        </div>
      )}
    </div>
  );
};
    
export default Post;