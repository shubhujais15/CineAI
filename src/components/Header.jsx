import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { App_Logo, SUPPORTED_LANGUAGES } from '../utils/constant';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store)=> store.user)
  const gptSearchView = useSelector((store)=> store.gpt.gptSearchView)


  const handleLanguageChange = (e) => {
    // console.log(e.target.value)
    dispatch(changeLanguage(e.target.value))
  }


  const handleGPTSearch = () => {
    dispatch(toggleGptSearchView())
  }


  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      // navigate("/");
    }).catch((error) => {
      // An error happened.
      navigate("/error")
    });
  }

  useEffect(()=>{
   const unsubscribe =  onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const {uid, email ,displayName, photoURL} = user;
          dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}))
          navigate("/browse")
          // ...
        } else {
          // User is signed out
          // ...
          dispatch(removeUser());
          navigate("/")
        }
      });
      return() => unsubscribe();
  },[]);

  return (
    <div className="absolute top-0 left-0 px-4 py-2 z-10 flex items-center w-screen bg-gradient-to-b from-black">
      <img
        className="w-12 h-12 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-2 my-1 rounded-full"
        src = {App_Logo}
        alt="Logo"
      />
      <div className="flex flex-col sm:flex-row sm:items-center">
        <h3 className="shadow-sm text-lg sm:text-3xl lg:text-4xl font-bold font-serif text-gray-100 rounded-xl mx-2 p-1 text-center bg-opacity-75 bg-black">
          CineAI
        </h3>
        {/* <h3 className="shadow-md bg-opacity-60 bg-black text-sm sm:text-lg lg:text-xl italic text-yellow-100 rounded-xl mx-2 p-1 text-center">
          Your Personalized Movie Guide
        </h3> */}
      </div>

     {user && <div className='flex ml-auto'>

        {gptSearchView &&
        <select className='py-2 mx-5 px-1 rounded-lg bg-gray-900 text-white' onChange={handleLanguageChange}>
          {SUPPORTED_LANGUAGES.map((lang)=>(
            <option value={lang.identifier} key={lang.identifier}>{lang.name}</option>
          ))}
        </select>}

        <button className='mr-14 px-4 py-2 rounded-lg bg-violet-800 text-white hover:bg-opacity-80 active:scale-95'
         onClick={handleGPTSearch}>
          {gptSearchView ? "Home Page" : "GPT Search"}
          </button>
        <img className='w-10 h-10 rounded-md' src={user?.photoURL} alt="userIcon" />
        <button className=' h-8 px-1 rounded-md text-sm mt-1 text-white bg-red-700 ml-4 hover:bg-red-600 active:scale-95 focus:outline-none'
        onClick={handleSignOut}>
          Sign Out</button>
      </div>
      }   
    </div>
  );
};

export default Header;
