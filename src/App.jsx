import React, { useState, useEffect } from 'react'
import { GoSearch } from 'react-icons/go'
import { CgProfile } from 'react-icons/cg'
import { ImLocation } from 'react-icons/im'
import { HiCursorClick } from 'react-icons/hi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const App = () => {

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [followers, setFollowers] = useState('');
  const [following, setFollowing] = useState('');
  const [repos, setRepos] = useState('');
  const [avatar, setAvatar] = useState('');
  const [userInput, setUserInput] = useState('');
  const [blog, setBlog] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://api.github.com/users/hamzamaach")
      .then(res => res.json())
      .then(data => {
        setData(data);
      });
  }, []);

  const setData = ({
    name,
    login,
    followers,
    following,
    public_repos,
    avatar_url,
    location,
    bio,
    blog
  }) => {
    setName(name);
    setUsername(login);
    setFollowers(followers);
    setFollowing(following);
    setRepos(public_repos);
    setAvatar(avatar_url);
    setLocation(location);
    setBio(bio);
    setBlog(blog);
  };

  const handeleSearch = (e) => {
    setUserInput(e.target.value)
  }

  const search = `https://api.github.com/users/${userInput}`;

  const handeleSubmit = (e) => {
    e.preventDefault();
    fetch(search)
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          setError(true)
          notify();
          e.target.reset()
          // console.log('hi');
        } else {
          setData(data);
          e.target.reset()
        }
      })
  }

  const notify = () => toast.error("Le nom d'utilisateur incorrect", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });



  return (
    <div>
      <header>
        <form
          onSubmit={handeleSubmit}
          className="search-box">
          <button className="btn-search">
            <GoSearch className="fas fa-search" />
          </button>
          <input
            onChange={handeleSearch}
            type="text"
            className="input-search"
            placeholder="Type username..."
          />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </form>
        {/* <p>{JSON.stringify(test)}</p> */}
        {/* <p>{JSON.stringify(reposObj[1])}</p> */}
        <div className="container header_container">
          <div className="card">
            <div className="card-header">
              <img
                src={avatar}
                alt="Profile Image"
                className="profile-img"
              />
            </div>
            <div className="card-body">
              {name &&
                <p className="name">{name}</p>
              }
              {username &&
                <p className="mail">
                  <CgProfile className='iconC' />{username}
                </p>
              }
              {location &&
                <p className="mail">
                  <ImLocation className='iconC' />{location}
                </p>
              }
              {bio &&
                <p className="mail">{bio}</p>
              }
              {blog &&
                <a href={blog} target='_blank' className="mail">
                  <HiCursorClick className='iconC' />{blog}
                </a>
              }

            </div>
            <div className="card-footer">
              <p className="count">
                <span> {followers}</span> Followers |
                <span> {following}</span> Following |
                <span> {repos}</span> Repositories</p>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default App
