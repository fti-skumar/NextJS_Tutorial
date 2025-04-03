'use client';
import React, { useState } from 'react';
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
  width: 100%;
  max-width: 411px;
  height: 560px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #94b7ff;
  box-shadow: rgba(50, 69, 82, 0.15) 0px 20px 30px 0px;
  border-radius: 15px;
  overflow: hidden;
  animation: ${updatWidth} 0.5s ease-in-out forwards 0.5s;
`;

const LeftContainer = styled.div`
  width: 0;
  height: 100%;
  padding: 80px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-in-out forwards 1s;
`;

const RightContainer = styled.div`
  width: 418px;
  height: 100%;
  background-color: #fff;
  background-color: #94b7ff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  margin-left: auto;
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

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  // const [isHidden, setIsHidden] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  return (
  <Container>
    <LeftContainer>
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
    <RightContainer>
      <Image
        src={LoginIllustration}
        alt='Login Illustration'
        style={{ width: '100%', height: '100%' }}
        onLoad={() => {
          console.log('loaded');
        }}
      />
    </RightContainer>
  </Container>
  );
};

export default Login;