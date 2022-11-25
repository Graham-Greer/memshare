import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import jwt_decode from 'jwt-decode';

import { client } from '../client';

const Login = () => {
  const navigate = useNavigate();
  
  const onSuccess = (response) => {
    const decoded = jwt_decode(response.credential);
    localStorage.setItem('user', JSON.stringify(decoded));

    const {name, picture, sub} = decoded;

    if ( (decoded.sub) > 1 ) {
      const doc = {
        _type: 'user',
        _id: sub,
        userName: name,
        image: picture
      };
      console.log(doc);
      client.createOrReplace(doc).then(() => {
        navigate('/', { replace: true });
      });
    }
}

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-5">
            <img src={logo} alt="logo" width="130px" />
          </div>

          <div className="shadow-2xl">
            <GoogleLogin
              onSuccess={onSuccess}
              onError={'Error'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;