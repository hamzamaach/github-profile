import React,{ useState,useEffect } from 'react'
import { GoSearch } from 'react-icons/go'
import { CgProfile } from 'react-icons/cg'
import { ImLocation } from 'react-icons/im'
import { HiCursorClick } from 'react-icons/hi'

import data from './data/data.json'
import { FiExternalLink } from 'react-icons/fi'
import { TbCertificate } from 'react-icons/tb'

const App = () => {

  const repos1 = data.certificat


  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [followers, setFollowers] = useState('');
  const [following, setFollowing] = useState('');
  const [repos, setRepos] = useState('');
  const [avatar, setAvatar] = useState('');
  const [reposObj, setReposObj] = useState({});
  const [userInput, setUserInput] = useState('');
  const [blog, setBlog] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch("https://api.github.com/users/ermix3")
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        setData(data);
      });

      fetch("https://api.github.com/users/ermix3/repos")
      .then(res => res.json())
      .then(data => {
        setReposObj(data);
        // console.log(data);
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
  const searchRepos = `https://api.github.com/users/${userInput}/repos`;

  const handeleSubmit = (e) => {
    e.preventDefault();
    fetch(search)
      .then(res => res.json())
      .then(data => {
        setData(data);
        // setObj(data)
      })
      fetch(searchRepos)
      .then(res => res.json())
      .then(data => {
        setReposObj(data);
        // setObj(data)
      })
  }
  return (
    <div>
      <header>
        <form onSubmit={handeleSubmit} class="search-box">
          <button class="btn-search"><GoSearch class="fas fa-search" /></button>
          <input onChange={handeleSearch} type="text" class="input-search" placeholder="Type to Search..." />
        </form>
        {/* <p>{JSON.stringify(test)}</p> */}
        {/* <p>{JSON.stringify(reposObj[1])}</p> */}
        <div className="container header_container">
          <div class="card">
            <div class="card-header">
              <img src={avatar} alt="Profile Image" class="profile-img" />
            </div>
            <div class="card-body">
              {name &&
                <p class="name">{name}</p>
              }
              {username &&
                <p class="mail"><CgProfile className='iconC' />{username}</p>
              }
              {location &&
                <p class="mail"><ImLocation className='iconC' />{location}</p>
              }
              {bio &&
                <p class="mail">{bio}</p>
              }
              {blog &&
                <a href={blog} target='_blank' class="mail"><HiCursorClick className='iconC' />{blog}</a>
              }

            </div>
            <div class="card-footer">
              <p class="count">
                <span> {followers}</span> Followers |
                <span> {following}</span> Following |
                <span> {repos}</span> Repositories</p>
            </div>
          </div>
        </div>
      </header>
      <section id="certificat">
        <h2>Repositories</h2>
        <div className="container certificat_container">
          <div layout className="certificats">
            {
              reposObj.map((item, index) =>
                <div layout className="certificat" key={index} >
                  <div className="card1 card1_container">
                    <div className="card1 card1_titre">
                      <div className="card1_icon">
                        <TbCertificate className='titre-icon' />
                      </div>
                      <div className="titre_card1">
                        <span className='titre'>{item.name}</span>
                      </div>
                    </div>
                    <div className="card1_detail">
                      <div className='card1 card1_afficher'>
                        <a href={item.html_url} target="_blank" className='Afficher' >Afficher <FiExternalLink /></a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
