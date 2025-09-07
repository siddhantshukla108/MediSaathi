import React from "react";
import { useNavigate } from "react-router-dom"; // import useNavigate

const MedicalLoginPage = () => {
  const navigate = useNavigate(); // initialize navigate

  const handleGuestLogin = () => {
    navigate("/home"); // navigate to your home page route
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center">
      <div className="bg-white w-full max-w-6xl rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left side - doctors */}
        <div className="w-full md:w-1/2 bg-gray-900 relative flex items-center justify-center">
          {/* Background medical image */}
          <img
            src="img/bg.jpg"
            alt="Medical background"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />

          {/* Overlayed doctors */}
          <div className="relative z-10 space-y-8">
            <div className="flex flex-col items-center">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Urologist"
                className="w-24 h-24 mr-36 rounded-full border-4 border-white shadow-lg"
              />
              <div className="bg-gray-500 mr-36 bg-opacity-60 text-white text-sm px-3 py-1 rounded-lg mt-2">
                <p className="font-semibold">Urologist</p>
                <p className="text-xs">experience of 25 years</p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <img
                src="https://randomuser.me/api/portraits/women/68.jpg"
                alt="Ophthalmologist"
                className="w-24 h-24 ml-96 rounded-full border-4 border-white shadow-lg"
              />
              <div className="bg-gray-500 ml-96 bg-opacity-60 text-white text-sm px-3 py-1 rounded-lg mt-2">
                <p className="font-semibold">Ophthalmologist</p>
                <p className="text-xs">experience of 9 years</p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <img
                src="https://randomuser.me/api/portraits/men/36.jpg"
                alt="Psychiatrist"
                className="w-24 h-24 mr-36 rounded-full border-4 border-white shadow-lg"
              />
              <div className="bg-gray-500 mr-36 bg-opacity-60 text-white text-sm px-3 py-1 rounded-lg mt-2">
                <p className="font-semibold">Psychiatrist</p>
                <p className="text-xs">experience of 33 years</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - login */}
        <div className="w-full md:w-1/2 bg-white p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome!</h2>

          <form className="space-y-6 mt-6">
            <div>
              <input
                type="text"
                placeholder="Enter your login"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-500 hover:text-white transition duration-300"
            >
              Login
            </button>
          </form>

          <div className="text-sm text-gray-600 mt-6">
            I don’t have an account yet,{" "}
            <a href="#" className="text-blue-600 hover:underline">
              registration
            </a>
          </div>

          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-3 text-gray-400 text-sm">or log in via</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <div className="flex space-x-4">
            {/* Guest button navigates to home */}
            <button
              onClick={handleGuestLogin}
              className="flex-1 flex items-center justify-center border border-gray-300 rounded-lg py-3 hover:bg-gray-500 hover:text-white transition duration-300"
            >
              Guest
            </button>

            <button className="flex-1 flex items-center justify-center border border-gray-300 rounded-lg py-3 hover:bg-gray-500 hover:text-white transition duration-300">
              Google
            </button>
          </div>

          <div className="mt-10 text-gray-600 text-sm">
            For all questions:
            <p className="font-semibold text-gray-800">+91-7570054274</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalLoginPage;
