import React, { useState } from 'react'
import AuthInput from './AuthInput'
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithGithub, signInWithGoogle } from '../utils/helpers';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../configuration/firebase.config';

const SigningUp = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordField, setIsPasswordField] = useState(true);
    const [getIsEmailValidStatus, setgetIsEmailValidStatus] = useState(false); // Based on this only we'll proceed to login
    const [isTobeLogin, setIsTobeLogin] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");


    // console.log("getIsEmailValidStatus is "+getIsEmailValidStatus);
    const navigate = useNavigate();
    const createNewUserWithEmailAndPass = async () => {
        if (getIsEmailValidStatus) {
            await createUserWithEmailAndPassword(auth, email, password)
                .then(userCred => {
                    if (userCred) {
                        // console.log(userCred.user);
                    }
                })
                .catch((error) => console.log(error.message))
        }
    }


    const loginWithEmailAnsPassword = async () => {
        if (getIsEmailValidStatus) {
            await signInWithEmailAndPassword(auth, email, password)
                .then(useCred => {
                    if (useCred) {
                        // console.log(useCred);
                        navigate("/home", { replace: true });
                    }
                })
                .catch((error) => {
                    console.log(error.message);
                    if (error.message.includes("invalid-login-credentials")) {
                        setAlert(true);
                        setAlertMessage("User doesn't exist")
                    } else if (error.message.includes("wrong-password")) {
                        setAlert(true);
                        setAlertMessage("Password Mismatch")
                    } else {
                        setAlert(true);
                        setAlertMessage("Account disabled due to multiple\n failed attempts")
                    }
                    setInterval(() => {
                        setAlert(false);
                    }, 5000);
                })
        }
    }


    return (
        <div className='text-[#868CA0] w-full py-6'>
            <div className='w-full flex flex-col items-center justify-center py-8 '>
                <p className='py-6 text-2xl opacity-95 font-semibold'>Built For the Next Generation of Kenyan Techies<span className='text-white'></span>⚡</p>
                <div className="px-6 py-4 w-full md:w-auto bg-[#2f3181] rounded-lg shadow-md flex flex-col items-center justify-center gap-5">
                    {/* Signup Form */}

                    {/* Email */}
                    <AuthInput what="Email" isPasswordField={false} key={"foremail"} setStateFxn={setEmail} setgetIsEmailValidStatus={setgetIsEmailValidStatus} />

                    {/* Password */}
                    <AuthInput what="Password" isPasswordField={isPasswordField} key={"forpass"} setStateFxn={setPassword} />

                    {/* Alert */}
                    <AnimatePresence>
                        {/* {alert && <motion.p className='text-[#f2ff37]' key={"AlertMessage"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{alertMessage}</motion.p>} */}
                        {alert && (
                            <motion.p className='text-[#f2ff37] flex text-center' key={"AlertMessage"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                {alertMessage.split('\n').map((line, index) => (
                                    <React.Fragment key={index}>
                                        {line}
                                        {index < alertMessage.split('\n').length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                            </motion.p>
                        )}

                    </AnimatePresence>

                    {/* Login button  */}
                    {isTobeLogin ?
                        <motion.div onClick={loginWithEmailAnsPassword} whileTap={{ scale: 0.8 }} className='w-full flex py-3 items-center justify-center bg-[rgb(32,172,248)] rounded-lg cursor-pointer'>
                            <span className='text-white text-xl'>Login</span>
                        </motion.div>
                        :
                        <motion.div onClick={createNewUserWithEmailAndPass} whileTap={{ scale: 0.8 }} className='w-full flex py-3 items-center justify-center bg-[rgb(32,172,248)] rounded-lg cursor-pointer'>
                            <span className='text-white text-xl'>Signup</span>
                        </motion.div>
                    }

                    <p className='text-md flex gap-3 items-center justify-center'>{!isTobeLogin ? `Already have an account?` : `Don't have an account?`} <span className='text-white cursor-pointer' onClick={() => setIsTobeLogin(!isTobeLogin)}>{!isTobeLogin ? `Login here.` : `Create now.`}</span> </p>


                    <div className='flex items-center justify-center gap-3'>
                        <span className='w-24 h-[1px] bg-gray-200'></span>
                        <span className='text-xl text-[#c59d5f]'>✦</span>
                        <span className='w-24 h-[1px] bg-gray-200'></span>
                    </div>


                    {/* Signin with google  */}

                    <motion.div onClick={signInWithGoogle} whileTap={{ scale: .8 }} className="flex items-center justify-center gap-5 bg-[#1D1D57] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[#0e0e68] cursor-pointer">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" x="0px" y="0px" viewBox="0 0 48 48" enable-background="new 0 0 48 48" className="text-3xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
                        c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
                        C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
                        c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
                        c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
                        <span className='font-semibold text-white'>Sign in with Google</span>
                    </motion.div>



                    <div className='flex items-center justify-center gap-3'>
                        <span className='w-24 h-[1px] bg-gray-200'></span>
                        <span className='text-xl text-[#c59d5f]'>✦</span>
                        <span className='w-24 h-[1px] bg-gray-200'></span>
                    </div>

                    {/* Signin with github  */}

                    <motion.div onClick={signInWithGithub} whileTap={{ scale: .8 }} className="flex items-center justify-center gap-5 bg-[#1D1D57] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[#0e0e68] cursor-pointer">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 496 512" class="text-3xl text-white" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
                        <span className='font-semibold text-white'>Sign in with GitHub</span>
                    </motion.div>

                </div>
            </div>
        </div>
    )
}

export default SigningUp
