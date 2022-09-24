import React from 'react';

import SignIn from '../components/signin/signin';
import SignUp from '../components/signup/signup';

export type SigninProps = { mode: string };

export default function Signin({ mode }: SigninProps) {
  return mode === "signup"? (<SignUp />) : (<SignIn />);
}