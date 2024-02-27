import { motion } from 'framer-motion';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ proj, index }) => {
    const { cssVal, user, finalSrcCodeOutput, title, id, htmlVal, jsVal } = proj;
    const { displayName, email, uid, phoneNumber, photoURL, providerId } = user;
    const navigate = useNavigate();
    return (
        <motion.div key={index} onClick={()=>navigate(`/view/${id}`)} className='w-full cursor-pointer md:w-[450px] h-[375px] bg-[#09094d] rounded-xl p-4 flex flex-col items-center justify-center gap-4 text-[#808198]' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .5, delay: index * .3 }}>
            <div className='bg-[#26276E] w-full h-full rounded-md overflow-hidden' style={{ overflow: "hidden", height: "100%", width: "100%" }}>
                <iframe
                    srcDoc={finalSrcCodeOutput}
                    title="output"
                    sandbox="allow-scripts"
                    width="100%"
                    height="100%"
                    style={{ border: "none" }}
                />
            </div>
            <div className='flex items-center justify-start gap-3 w-full'>
                <div className='w-10 h-10 flex items-center justify-center rounded-md overflow-hidden cursor-pointer bg-[#be7b16]'>
                    {user?.photoURL ? <>
                        <motion.img whileHover={{ scale: 1.2 }} src={user?.photoURL} alt={user?.displayName} referrerPolicy={"no-referrer"} className="w-full h-full object-cover" />
                    </> : <>
                        <p className='capitalize text-xl font-semibold p-0 text-white'>{user?.email[0]}</p>
                    </>}
                </div>
                <div className='flex flex-col items-start justify-start '>
                    <span>{title}</span>
                    <div className='flex items-center gap-2'>
                        <span className='text-emerald-400 italic '>@{user?.displayName ? user?.displayName : user?.email.split("@")[0]}</span>
                        <svg fill="none" viewBox="0 0 32 16" xmlns="http://www.w3.org/2000/svg" title="PRO" className="w-[32px] h-[16px]"><rect fill="#ffdd40" height="16" rx="1.5" width="32"></rect><g fill="#000"><path d="M9.174 5.598c.834 0 1.214.44 1.214 1.113 0 .76-.422 1.113-1.182 1.113h-.56c-.094 0-.105-.011-.105-.11V5.708c0-.1.01-.11.106-.11zm.106 3.67c.76 0 1.404-.188 1.847-.563.56-.452.855-1.135.855-2.016 0-.893-.317-1.61-.887-2.039-.443-.33-.97-.507-1.857-.507H7.106c-.095 0-.106.011-.106.11v7.494c0 .099.01.11.106.11h1.33c.094 0 .105-.011.105-.11v-2.37c0-.099.01-.11.106-.11zM14.375 9.047c0-.077 0-.11.063-.11.053 0 .074.022.116.088l1.953 2.722c.074.099.084.11.18.11h1.635c.064 0 .095 0 .095-.022a.31.31 0 0 0-.053-.088c-.707-.96-1.425-1.885-2.132-2.854a.085.085 0 0 1-.02-.045c0-.022.01-.044.041-.055.95-.286 1.573-1.124 1.573-2.28 0-.96-.454-1.62-1.055-1.973-.539-.32-1.056-.397-1.943-.397H12.94c-.095 0-.105.011-.105.11v7.494c0 .099.02.11.116.11h1.32c.094 0 .105-.011.105-.11zm.654-3.515c.834 0 1.214.418 1.214 1.09 0 .76-.422 1.07-1.182 1.07h-.58c-.096 0-.106-.012-.106-.11v-1.94c0-.1.01-.11.105-.11zM26 8c0-2.182-1.636-4-3.726-4s-3.726 1.818-3.726 4 1.636 4 3.726 4S26 10.182 26 8zm-5.837 0c0-1.311.855-2.402 2.111-2.402 1.256 0 2.111 1.09 2.111 2.402 0 1.311-.855 2.402-2.11 2.402-1.257 0-2.112-1.09-2.112-2.402z"></path></g></svg>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default ProjectCard