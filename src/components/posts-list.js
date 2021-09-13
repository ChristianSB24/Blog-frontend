import React, { useState, useEffect } from "react";
import {getAll, deleteAll, findByTitle} from "../services/post-service";
import { Link } from "react-router-dom";

function PostsList() {
    const [posts, setPosts] = useState([]);
    const [currentPost, setCurrentPost] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");
  
    useEffect(() => {
      retrievePosts();
    }, []);
  
    const onChangeSearchTitle = e => {
      const searchTitle = e.target.value;
      setSearchTitle(searchTitle);
    };
  
    const retrievePosts = () => {
      getAll()
        .then(response => {
          setPosts(response.data);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };

    const refreshList = () => {
        retrievePosts();
        setCurrentPost(null);
        setCurrentIndex(-1);
      };
    
      const setActivePost = (post, index) => {
        setCurrentPost(post);
        setCurrentIndex(index);
      };
    
      const removeAllPosts = () => {
        deleteAll()
          .then(response => {
            console.log(response.data);
            refreshList();
          })
          .catch(e => {
            console.log(e);
          });
      };

      const searchByTitle = () => {
        findByTitle(searchTitle)
          .then(response => {
            setPosts(response.data);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      };
    
      return (
        <div className="list row">
          <div className="col-md-8">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by title"
                value={searchTitle}
                onChange={onChangeSearchTitle}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={searchByTitle}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h4>Posts List</h4>

            <ul className="list-group">
          {posts &&
            posts.map((post, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActivePost(post, index)}
                key={index}
              >
                {post.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllPosts}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentPost ? (
          <div>
            <h4>Post</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentPost.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentPost.description}
            </div>
            <Link
              to={"/posts/" + currentPost.id}
              className="badge bg-info text-dark"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Post...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsList;