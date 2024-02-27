import React, { useState } from 'react'
import SplitPane from 'react-split-pane'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { tomorrowNightBlue } from "@uiw/codemirror-theme-tomorrow-night-blue";
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { NavMenuItems, signingOut } from '../utils/helpers';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../configuration/firebase.config';
import Alert from './Alert';
import { toast } from 'react-toastify';


const CreateNewProj = () => {
    const [htmlVal, sethtmlVal] = useState(``);
    const [cssVal, setcssVal] = useState(``);
    const [jsVal, setjsVal] = useState(``);
    const [finalSrcCodeOutput, setfinalSrcCodeOutput] = useState(``);
    const [isTitle, setIsTitle] = useState();
    const [title, setTitle] = useState("Untitled");
    const updateResFunction = () => {
        const mergedOutput = `
            <html>
                <body>${htmlVal}</body>
                <style>${cssVal}</style>
                <script>${jsVal}</script>
            </html>
        `;
        setfinalSrcCodeOutput(mergedOutput);
    }


    React.useEffect(() => {
        const timeout = setTimeout(() => {
            updateResFunction()
        }, 1000);

        return () => clearTimeout(timeout);
    }, [htmlVal, cssVal, jsVal])

    const user = useSelector(state => state?.user?.user);
    const [navMenuDisplay, setnavMenuDisplay] = useState(false);

    const [alert, setAlert] = useState(false);

    // Saving all of the progress to the database 
    const saveProgress = async () => {
        const id = `${Date.now()}`;
        const _doc = {
            id: id,
            title: title,
            htmlVal: htmlVal,
            cssVal: cssVal,
            jsVal: jsVal,
            finalSrcCodeOutput: finalSrcCodeOutput,
            user: user
        }
        if ((title !== "Untitled" && title !== undefined && title !== null) && finalSrcCodeOutput) {
            await setDoc(doc(db, "projects", id), _doc).then((res) => {
                setAlert(true);
                toast.success('Saved!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }).catch((e) => {
                console.log(e);
                setAlert(true);
                toast.error('An error occured', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            })

        } else {
            setAlert(true);
            toast.warn('Donot leave the title and code empty', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        setInterval(() => {
            setAlert(false);
        }, 5000);

    }


    return (
        <>
            <div className='flex flex-col w-screen min-h-screen items-start justify-start overflow-hidden '>

                {/* alert */}
                <AnimatePresence>
                    {alert && <Alert />}
                </AnimatePresence>

                {/* Header section */}
                <header className='w-full flex items-center justify-between px-12 py-4'>
                    <div className='flex items-center justify-center gap-6'>
                        <Link to="/home">
                            <img src="/logo-horizontal.webp" alt="logoImage" className='object-contain w-40 h-auto' />
                        </Link>
                        <div className='flex flex-col items-start justify-start '>
                            <div className='flex items-center justify-center gap-3'>
                                <AnimatePresence>
                                    {isTitle ? <>
                                        <motion.input key={"titleinp"} type={"text"} placeholder={"Untitled"} value={title} onChange={(e) => setTitle(e.target.value)} className=' px-3 py-2 outline-none border-none bg-transparent text-[#868CA0] text-base ' />

                                    </> : <>
                                        <motion.p key={"titlab"} className='px-3 py-2 text-white text-lg'>
                                            {title}
                                        </motion.p>
                                    </>}
                                </AnimatePresence>
                                <AnimatePresence>
                                    {isTitle ? <>
                                        <motion.div key={"check"} whileTap={{ scale: .9 }} className='cursor-pointer' onClick={() => setIsTitle(false)}>
                                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="text-2xl text-emerald-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>
                                        </motion.div>
                                    </> : <>
                                        <motion.div key={"edit"} whileTap={{ scale: .9 }} className='cursor-pointer' onClick={() => setIsTitle(true)}>
                                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="text-2xl text-[#868CA0]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83a.996.996 0 000-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"></path></svg>
                                        </motion.div>
                                    </>}
                                </AnimatePresence>
                            </div>
                            <div className='flex items-center justify-center px-3 gap-2 -mt-2 text-[#868CA0]'>
                                <p>By <span className='text-emerald-400 italic'>{user?.displayName ? user?.displayName : user?.email.split("@")[0]}</span></p>
                            </div>
                        </div>
                    </div>
                    {user && <>
                        <div className='flex items-center justify-center gap-4 relative'>
                            <motion.button onClick={saveProgress}
                                className='bg-[#868CA0] px-4 py-3 rounded-md' title="Don't forget to click this to save all of your code " whileTap={{ scale: .8 }} >Save</motion.button>
                            <div className='w-12 h-12 flex items-center justify-center rounded-lg overflow-hidden cursor-pointer bg-[#be7b16]'>
                                {user?.photoURL ? <>
                                    <motion.img whileHover={{ scale: 1.2 }} src={user?.photoURL} alt={user?.displayName} referrerPolicy={"no-referrer"} className="w-full h-full object-cover" />
                                </> : <>
                                    <p className='capitalize text-2xl font-semibold p-0'>{user?.email[0]}</p>
                                </>}
                            </div>
                            <motion.div whileTap={{ scale: .8 }} className="px-4 py-4 rounded-lg flex items-center justify-center bg-[#1D1D56] cursor-pointer" onClick={() => setnavMenuDisplay(!navMenuDisplay)}>
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="text-[#868CA0] " height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path></svg>
                            </motion.div>
                            <AnimatePresence>
                                {navMenuDisplay && (
                                    <motion.div className=' bg-[#00000066] absolute top-16 right-0 px-4 py-3 rounded-lg shadow-xl z-10 flex flex-col items-start justify-start gap-4 min-w-[225px] ' initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}>
                                        {NavMenuItems && NavMenuItems.map(item => (
                                            <Link to={item.uri} key={item.id} className="flex items-center w-full justify-start px-2 py-2 rounded-md gap-3 text-[#868CA0] hover:bg-[#1B1B52]">
                                                <div dangerouslySetInnerHTML={{ __html: item.svg }} className="text-lg" />
                                                <span>{item.name}</span>
                                            </Link>
                                        ))}
                                        <motion.p className='flex items-center w-full justify-start px-2 py-2 rounded-md gap-3 text-[#868CA0] hover:bg-[#1B1B52] cursor-pointer' whileTap={{ scale: .9 }} onClick={signingOut}>
                                            <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" className="text-lg" ><path d="M4 12a1 1 0 001 1h7.59l-2.3 2.29a1 1 0 000 1.42 1 1 0 001.42 0l4-4a1 1 0 00.21-.33 1 1 0 000-.76 1 1 0 00-.21-.33l-4-4a1 1 0 10-1.42 1.42l2.3 2.29H5a1 1 0 00-1 1zM17 2H7a3 3 0 00-3 3v3a1 1 0 002 0V5a1 1 0 011-1h10a1 1 0 011 1v14a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-2 0v3a3 3 0 003 3h10a3 3 0 003-3V5a3 3 0 00-3-3z"></path></svg>
                                            Logout
                                        </motion.p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </>}
                </header>

                <div className=''>
                    <SplitPane split='horizontal' allowResize={true} minSize={100} maxSize={100} defaultSize={"50%"}>

                        {/* Coding area */}
                        <SplitPane split='vertical' minSize={500}>

                            <div className='w-full h-full flex flex-col items-start justify-start'>
                                <div className='bg-[rgba(27,27,83,.8)] w-full flex items-center justify-between'>
                                    <div className='bg-[#1c1a1a] px-4 py-2 flex items-center justify-center gap-3 text-[#868CA0] font-semibold'>
                                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 384 512" class="text-2xl text-red-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z"></path></svg>
                                        <span>HTML</span>
                                    </div>

                                </div>
                                <div className='w-full px-0'>
                                    {/* Code mirror area */}
                                    <CodeMirror height="600px" extensions={[javascript({ jsx: true })]} value={htmlVal} onChange={(val, viewUpdate) => {
                                        sethtmlVal(val);
                                        // console.log("html val is " + val);
                                    }} theme={tomorrowNightBlue} className='border-t-2 border-[#31754b]' />
                                </div>
                            </div>

                            <SplitPane split='vertical' minSize={500}>
                                <div className='w-full h-full flex flex-col items-start justify-start'>
                                    <div className='bg-[rgba(27,27,83,.8)] w-full flex items-center justify-between'>
                                        <div className='bg-[#1c1a1a] px-4 py-2 flex items-center justify-center gap-3 text-[#868CA0] font-semibold'>
                                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 384 512" class="text-2xl text-blue-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M480 32l-64 368-223.3 80L0 400l19.6-94.8h82l-8 40.6L210 390.2l134.1-44.4 18.8-97.1H29.5l16-82h333.7l10.5-52.7H56.3l16.3-82H480z"></path></svg>
                                            <span>CSS</span>
                                        </div>
                                    </div>

                                    {/* Code mirror area */}
                                    <div className='w-full px-0'>
                                        {/* Code mirror area */}
                                        <CodeMirror height="600px" extensions={[javascript({ jsx: true })]} value={cssVal} onChange={(val, viewUpdate) => {
                                            setcssVal(val);
                                            // console.log("css val is " + val);
                                        }} theme={tomorrowNightBlue} className='border-t-2 border-[#092a63]' />
                                    </div>

                                </div>
                                <div className='w-full h-full flex flex-col items-start justify-start'>
                                    <div className='bg-[rgba(27,27,83,.8)] w-full flex items-center justify-between'>
                                        <div className='bg-[#1c1a1a] px-4 py-2 flex items-center justify-center gap-3 text-[#868CA0] font-semibold'>
                                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 384 512" class="text-2xl text-yellow-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M0 32v448h448V32H0zm243.8 349.4c0 43.6-25.6 63.5-62.9 63.5-33.7 0-53.2-17.4-63.2-38.5l34.3-20.7c6.6 11.7 12.6 21.6 27.1 21.6 13.8 0 22.6-5.4 22.6-26.5V237.7h42.1v143.7zm99.6 63.5c-39.1 0-64.4-18.6-76.7-43l34.3-19.8c9 14.7 20.8 25.6 41.5 25.6 17.4 0 28.6-8.7 28.6-20.8 0-14.4-11.4-19.5-30.7-28l-10.5-4.5c-30.4-12.9-50.5-29.2-50.5-63.5 0-31.6 24.1-55.6 61.6-55.6 26.8 0 46 9.3 59.8 33.7L368 290c-7.2-12.9-15-18-27.1-18-12.3 0-20.1 7.8-20.1 18 0 12.6 7.8 17.7 25.9 25.6l10.5 4.5c35.8 15.3 55.9 31 55.9 66.2 0 37.8-29.8 58.6-69.7 58.6z"></path></svg>
                                            <span>JavaScript</span>
                                        </div>
                                    </div>

                                    {/* Code mirror area */}
                                    <div className='w-full px-0'>
                                        {/* Code mirror area */}
                                        <CodeMirror height="600px" extensions={[javascript({ jsx: true })]} value={jsVal} onChange={(val, viewUpdate) => {
                                            setjsVal(val);
                                            // console.log("js val is " + val);
                                        }} theme={tomorrowNightBlue} className='border-t-2 border-[#092a63]' />
                                    </div>

                                </div>
                            </SplitPane>

                        </SplitPane>

                        {/* Display area */}
                        <div className='bg-white' style={{ overflow: "hidden", height: "100%" }}>
                            <iframe
                                srcDoc={finalSrcCodeOutput}
                                title="output"
                                sandbox="allow-scripts"
                                width="100%"
                                height="100%"
                                style={{ border: "none" }}
                            />
                        </div>
                    </SplitPane>
                </div>
            </div>
        </>
    )
}

export default CreateNewProj