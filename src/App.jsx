import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import CreateNewProj from "./components/CreateNewProj";
import Home from "./components/Home"
import Loader from "./components/Loader";
import View from "./components/View";
import { auth, db } from "./configuration/firebase.config"
import { SET_PROJECTS } from "./context/actions/allProjectAction";
import { SET_USER } from "./context/actions/userActions";


function App() {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();


  // Getting info of logged in individual
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(userCred => {
      if (userCred) {
        console.log(userCred?.providerData[0]);
        setDoc(doc(db, "users", userCred?.uid), userCred?.providerData[0])
          // addDoc(collection(db, "users"), userCred?.providerData[0])
          .then(() => {
            // Here the data will be dispatched to redux store 
            dispatch(SET_USER(userCred?.providerData[0]))
            navigate("/home/projects", { replace: true });
          })
      } else {
        navigate("/home/auth", { replace: true });
      }
      setInterval(() => {
        setIsLoading(false);
      }, 2000);
    })

    // cleaning up the listener event
    return () => unsub();
    /*
      This is where the cleanup is happening. When the component is unmounted or when the dependency array (the second argument to useEffect) changes, React will automatically invoke the cleanup function. In this case, the cleanup function calls unsub(), which unsubscribes from the event listener established with auth.onAuthStateChanged. This ensures that you remove the event listener to prevent memory leaks and unwanted side effects when the component is unmounted or re-rendered.

      So, in summary, the cleanup in your code is achieved by returning a function that unsubscribes from the authentication state change event listener when the component is unmounted or when the dependency array changes (in this case, it's an empty array, so it only runs once on mount and once on unmount).
    */
  }, [])

  
  useEffect(() => {
    const projQuery = query(
      collection(db, "projects"),
      orderBy("id", "desc")
    )

    const unsub = onSnapshot(projQuery, (querySnap) => {
      const projectsList = querySnap.docs.map(doc => doc.data())
      dispatch(SET_PROJECTS(projectsList))
    })
    return () => unsub();
  }, [])



  return (
    <>
      {isLoading ? (
        <div className="flex w-screen h-screen items-center justify-center bg-[#030303] bg-gradient-to-tr from-[#1A1A4E] to-[#040417] overflow-hidden">
          <Loader />
        </div>
      )
        :
        <div className="w-screen h-screen flex items-start justify-start overflow-hidden bg-[#131417] bg-gradient-to-tr from-[#1A1A4E] to-[#292A75]">
          <Routes>
            <Route path="/home/*" element={<Home />} />
            <Route path='/create' element={<CreateNewProj />} />
            <Route path='view/:id' element={<View />} />



            {/* If no route path matches*/}
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </div >
      }
    </>
  )
}

export default App
