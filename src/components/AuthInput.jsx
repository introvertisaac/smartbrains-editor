import React, { useState } from 'react'
import { motion } from "framer-motion"

const AuthInput = ({ what, isPasswordField, setStateFxn, setgetIsEmailValidStatus }) => {

    const [value, setValue] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);

    const handleChange = (event) => {
        setValue(event.target.value);
        setStateFxn(event.target.value);

        // Now we have to validate this value
        if (what === "Email") {
            const emailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const status = emailRegx.test(value); // returns true/false
            // console.log(status);
            setIsValidEmail(status)
            setgetIsEmailValidStatus(status)

        }
    };


    return (
        <div className='flex flex-col items-start justify-start gap-1 w-full'>
            <label className='text-sm text-gray-300'>{what}</label>
            <div className={`flex items-center justify-center w-full gap-3 md:w-96 rounded-md px-4 py-1 bg-gray-200 ${!isValidEmail && what === "Email" && value.length > 0 && "border-[3px] border-red-600"}`}>

                {isPasswordField ? (
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="text-[#6e6e6e]  text-2xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M2 17h20v2H2v-2zm1.15-4.05L4 11.47l.85 1.48 1.3-.75-.85-1.48H7v-1.5H5.3l.85-1.47L4.85 7 4 8.47 3.15 7l-1.3.75.85 1.47H1v1.5h1.7l-.85 1.48 1.3.75zm6.7-.75l1.3.75.85-1.48.85 1.48 1.3-.75-.85-1.48H15v-1.5h-1.7l.85-1.47-1.3-.75L12 8.47 11.15 7l-1.3.75.85 1.47H9v1.5h1.7l-.85 1.48zM23 9.22h-1.7l.85-1.47-1.3-.75L20 8.47 19.15 7l-1.3.75.85 1.47H17v1.5h1.7l-.85 1.48 1.3.75.85-1.48.85 1.48 1.3-.75-.85-1.48H23v-1.5z"></path></svg>
                ) : (
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" className="text-[#6e6e6e] text-2xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"></path></svg>
                )}


                <input type={isPasswordField && !showPass ? `password` : `text`} placeholder={"Enter your " + what.toLowerCase() + " here"} className="px-4 py-1 flex-1 text-lg outline-none bg-transparent text-black" value={value} onChange={handleChange} />
                {isPasswordField && <motion.div whileTap={{ scale: .5 }} className='cursor-pointer' onClick={() => setShowPass(!showPass)} >
                    {showPass ? (
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" className="text-[#6e6e6e] text-2xl cursor-pointer" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path></svg>
                    ) : (<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 640 512" className="text-[#6e6e6e] text-2xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"></path></svg>)}
                </motion.div>
                }
            </div>
        </div>
    )
}

export default AuthInput