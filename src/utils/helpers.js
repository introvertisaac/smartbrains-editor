import { uuidv4 } from "@firebase/util";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../configuration/firebase.config";

export const signInWithGoogle = async () => {
    await signInWithPopup(auth, new GoogleAuthProvider())
        .then(userCredential => {
            window.location.reload();
        })
}
export const signInWithGithub = async () => {
    await signInWithPopup(auth, new GithubAuthProvider())
        .then(userCredential => {
            window.location.reload();
        })
}


export const NavMenuItems = [
    {
        id: uuidv4(),
        name: "Projects",
        uri: "/home/projects",
        svg: `<svg viewBox="0 0 1024 1024" fill="currentColor" height="1em" width="1em"><path d="M280 752h80c4.4 0 8-3.6 8-8V280c0-4.4-3.6-8-8-8h-80c-4.4 0-8 3.6-8 8v464c0 4.4 3.6 8 8 8zm192-280h80c4.4 0 8-3.6 8-8V280c0-4.4-3.6-8-8-8h-80c-4.4 0-8 3.6-8 8v184c0 4.4 3.6 8 8 8zm192 72h80c4.4 0 8-3.6 8-8V280c0-4.4-3.6-8-8-8h-80c-4.4 0-8 3.6-8 8v256c0 4.4 3.6 8 8 8zm216-432H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"></path></svg>`
    },
    {
        id: uuidv4(),
        name: "Collections",
        uri: "/home/collections",
        svg: `<svg fill="currentColor" viewBox="0 0 16 16" height="1em" width="1em"><path d="M2.5 3.5a.5.5 0 010-1h11a.5.5 0 010 1h-11zm2-2a.5.5 0 010-1h7a.5.5 0 010 1h-7zM0 13a1.5 1.5 0 001.5 1.5h13A1.5 1.5 0 0016 13V6a1.5 1.5 0 00-1.5-1.5h-13A1.5 1.5 0 000 6v7zm1.5.5A.5.5 0 011 13V6a.5.5 0 01.5-.5h13a.5.5 0 01.5.5v7a.5.5 0 01-.5.5h-13z"></path></svg>`
    },
    {
        id: uuidv4(),
        name: "Profile",
        uri: "/home/profile",
        svg: `<svg fill="none" viewBox="0 0 24 24" height="1em" width="1em"><path fill="currentColor" fill-rule="evenodd" d="M16 9a4 4 0 11-8 0 4 4 0 018 0zm-2 0a2 2 0 11-4 0 2 2 0 014 0z" clip-rule="evenodd"></path><path fill="currentColor" fill-rule="evenodd" d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM3 12c0 2.09.713 4.014 1.908 5.542A8.986 8.986 0 0112.065 14a8.984 8.984 0 017.092 3.458A9 9 0 103 12zm9 9a8.963 8.963 0 01-5.672-2.012A6.992 6.992 0 0112.065 16a6.991 6.991 0 015.689 2.92A8.964 8.964 0 0112 21z" clip-rule="evenodd"></path></svg>`
    },
];



export const signingOut = async () => {
    await auth.signOut().then(() => {
        window.location.reload();
    })
}
