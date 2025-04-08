'use client';
import React, { useContext, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Loader2 } from 'lucide-react';
import { UserContext } from '@/context/UserContext';

const fadeIn = keyframes`
  0% {  opacity: 0; width: 50%; }
  100% { opacity: 1; width: 50%; }
`;

const updatWidth = keyframes`
  0% {  max-width: 411px; }
  100% { max-width: 858px; }
`;

const Container = styled.div`
  animation: ${updatWidth} 0.5s ease-in-out forwards 0.5s;
`;

const LeftContainer = styled.div`
  animation: ${fadeIn} 0.5s ease-in-out forwards 1s;
`;

const LoginHeading = styled.h1`
  font-size: 2rem;
  color: #263238;
  margin-bottom: 15px;
`;

const InputContainer = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  position: relative;
`;

const LoginButton = styled(Button)`
  width: 320px;
  background: #263238;
  margin-top: 15px;
`;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [userDetails, setUserDetails] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const loginSvgVersion = useRef(new Date().getTime());
  const { updateUser } = useContext(UserContext);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      });
      const data = await response.json();
      if (response.ok) {
        updateUser({ username: data.user.username, _id: data.user._id });
        // console.log('Login successful:', data);
      } else {
        console.error('Login failed:', data.error);
      }
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Registration successful:');
      } else {
        console.error('Registration failed:', data.error);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className='w-full h-[560px] max-w-[411px] flex justify-center items-center padding-[10px] border-[1px] border-[#94b7ff] shadow-[0px_20px_30px_0px_rgba(50,69,82,0.15)] rounded-[10px] overflow-hidden'>
      <LeftContainer className='opacity-[0] w-[0] h-full flex items-center gap-[20px] flex-col p-[80px_0]'>
        <LoginHeading>Hello NextJS!</LoginHeading>
        <InputContainer>
          <Label htmlFor='username' className='text-[16px] text-[#263238]'>Username</Label>
          <Input disabled={loading} value={userDetails.username} onChange={handleInputChange} className='rounded-[5px]' name='username' id='username' type='text' placeholder=''/>
        </InputContainer>
        <InputContainer>
          <Label htmlFor='password' className='text-[16px] text-[#263238]'>Password</Label>
          <Input disabled={loading} value={userDetails.password} onChange={handleInputChange} className='rounded-[5px]' name='password' id='password' type={showPassword ? 'text' : 'password'} placeholder='' />
          <div className={`absolute right-2 top-9.5 cursor-pointer ${loading ? 'opacity-[0.5] pointer-events-none' : ''}`} onClick={togglePasswordVisibility}>
            {showPassword ? <LuEye className='text-[20px]' /> : <LuEyeOff className='text-[20px]' />}
          </div>
        </InputContainer>
        <LoginButton disabled={loading} className='hover:opacity-85 rounded-[5px] leading-none text-[16px] cursor-pointer' onClick={handleLogin}>
          <Loader2 className={`animate-spin ${loading ? 'block' : 'hidden'} !w-[22px] !h-[22px] `} /> {loading ? 'Loading...' : 'Login'}
        </LoginButton>
        <LoginButton disabled={loading} className='hover:opacity-85 rounded-[5px] leading-none text-[16px] cursor-pointer hidden' onClick={handleRegister}>
          <Loader2 className={`animate-spin ${loading ? 'block' : 'hidden'} !w-[22px] !h-[22px] `} /> {loading ? 'Loading...' : 'Sign Up'}
        </LoginButton>
      </LeftContainer>
      <div className='w-[418px] h-full bg-[#94b7ff] flex justify-center items-center rounded-[10px] ml-auto'>
        <Image
          src={`/assets/login-security.svg?ver=${loginSvgVersion.current}`}
          width={418}
          height={560}
          alt='Login Illustration'
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </Container>
  );
};