import React, { useRef, useState } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/Validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';


const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch =useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  // Validate form data
  const handleButtonClick = () => {
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    const message = checkValidData(emailValue, passwordValue);
    setErrorMessage(message);

    // if (message) {
    //   email.current.value = "";
    //   password.current.value = "";
    // }

    if(message) return;

    if(!isSignInForm){
      //signup logic
    createUserWithEmailAndPassword(auth, emailValue, passwordValue)
    .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    updateProfile(user, {
      displayName: name.current.value, photoURL: "https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-dyrp6bw6adbulg5b.jpg"
    }).then(() => {
      // Profile updated!
      const {uid, email ,displayName, photoURL} = auth.currentUser;
      dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}))
      // navigate("/browse")
      // ...
    }).catch((error) => {
      // An error occurred
      setErrorMessage(errorMessage)
      // ...
    });
    console.log(user);
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+""+errorMessage)
    // ..
  });
    }
    else{
      //signin logic
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    // navigate("/browse")
    // ...
  })
  .catch((error) => {
    // const errorCode = error.code;
    const errorMessage = "User Not Registered";
    setErrorMessage(errorMessage)
  });
    }
    
  };

  // Swapping the form in signUp/signIn
  const toggleisSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  // Clear error message on input change
  const handleInputChange = () => {
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  return (
    <div className="relative h-screen w-screen">
      <Header />
      <div className="absolute top-0 left-0 h-full w-full">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/cacfadb7-c017-4318-85e4-7f46da1cae88/e43aa8b1-ea06-46a5-abe3-df13243e718d/IN-en-20240603-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="background-img"
          className="object-cover h-full w-full"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute bg-black p-9 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12 text-white bg-opacity-85 rounded-lg"
      >
        <h1 className="py-4 font-bold text-3xl">{isSignInForm ? "Sign In" : "Sign Up"}</h1>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-2 my-3 w-full bg-gray-700 rounded-md"
            onChange={handleInputChange}
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-2 my-3 w-full bg-gray-700 rounded-md"
          onChange={handleInputChange}
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-2 my-3 w-full bg-gray-700 rounded-md"
          onChange={handleInputChange}
        />

        <button className="p-2 my-5 w-full rounded-md bg-red-700 hover:bg-red-600 active:scale-95 focus:outline-none"
          onClick={handleButtonClick}>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        {errorMessage && <p className="text-red-500 p-2 m-1 font-bold">{errorMessage}</p>}

        <div className="flex">
          <p className="mx-2">{isSignInForm ? "Already Registered?" : "New to CineAI?"}</p>
          <p className="cursor-pointer font-bold underline" onClick={toggleisSignInForm}>
            {isSignInForm ? "Sign up now" : "Sign in now"}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
