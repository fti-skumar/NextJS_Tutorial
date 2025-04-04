'use client';
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import LoginIllustration from '../assets/login-security.svg';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { LuEye, LuEyeOff } from "react-icons/lu";

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
  cursor: pointer;
  margin-top: 15px;
`;

type LoginProps = {
  isLoggedIn: boolean;
}

const Login: React.FC<LoginProps> = ({isLoggedIn}) => {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    console.log(isLoggedIn, 'abcdl');
  }, [isLoggedIn]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  return (
  <Container className='w-full h-[560px] max-w-[411px] flex justify-center items-center padding-[10px] border-[1px] border-[#94b7ff] shadow-[rgba(50,69,82,0.15)_0px_20px_30px_0px] rounded-[15px] overflow-hidden'>
    <LeftContainer className='opacity-[0] w-[0] h-full flex items-center gap-[20px] flex-col p-[80px_0]'>
      <LoginHeading>Hello NextJS!</LoginHeading>
      <InputContainer>
        <Label htmlFor='username' className='text-[16px] text-[#263238]'>Username</Label>
        <Input className='rounded-[5px]' id='username' type='text' placeholder=''/>
      </InputContainer>
      <InputContainer>
        <Label htmlFor='password' className='text-[16px] text-[#263238]'>Password</Label>
        <Input className='rounded-[5px]' id='password' type={showPassword ? 'text' : 'password'} placeholder='' />
        <div className='absolute right-2 top-9.5 cursor-pointer' onClick={togglePasswordVisibility}>
          {showPassword ? <LuEye className='text-[20px]' /> : <LuEyeOff className='text-[20px]' />}
        </div>
      </InputContainer>
      <LoginButton className='hover:opacity-85 rounded-[5px]' onClick={() => {}}>Login</LoginButton>
    </LeftContainer>
    <div className='w-[418px] h-full bg-[#94b7ff] flex justify-center items-center rounded-[15px] ml-auto'>
      <Image
        loading='eager'
        src={LoginIllustration}
        alt='Login Illustration'
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  </Container>
  );
};

export default Login;