import { signOut } from 'firebase/auth';
import React from 'react';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {

  const navigate = useNavigate();
  const user = useSelector((store)=> store.user)


  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/");
    }).catch((error) => {
      // An error happened.
      navigate("/error")
    });
  }

  return (
    <div className="absolute top-0 left-0 px-4 py-2 z-10 flex items-center w-full bg-gradient-to-b from-black">
      <img
        className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-2 my-1 rounded-full"
        src="https://media.istockphoto.com/id/1642381175/vector/cinema.jpg?s=612x612&w=0&k=20&c=owIct55daWlWRwPbTYLI9Y1IsrgYiqJcpvvgycvxBhE="
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
        <img className='w-12 h-12 rounded-md' src={user?.photoURL} alt="userIcon" />
        <button className=' h-9 px-1 rounded-md text-sm mt-1 text-white bg-red-700 ml-4 hover:bg-red-600 active:scale-95 focus:outline-none'
        onClick={handleSignOut}>
          Sign Out</button>
      </div>
      }   
    </div>
  );
};

export default Header;
