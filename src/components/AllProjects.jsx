import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import ProjectCard from './ProjectCard';

const AllProjects = () => {
  const allProjects = useSelector(state => state?.projects?.projects);
  const searchTerm = useSelector(state => state?.searchTerm?.searchTerm ? state?.searchTerm?.searchTerm : "");
  // console.log(allProjects);

  const [filtered, setFiltered] = useState(null);

  React.useEffect(() => {
    if (searchTerm?.length > 0) {
      setFiltered(allProjects?.filter(proj => {
        const item = proj?.title.toLowerCase();
        return searchTerm.split("").every((letter) => item.includes(letter))
      }))
      // console.log(allProjects?.filter(proj => {
      //   const item = proj?.title.toLowerCase();
      //   return searchTerm.split("").every((letter) => item.includes(letter))
      // }));
    } else {
      setFiltered(null);
    }
  }, [searchTerm])


  return (
    <div className='w-full py-6 flex items-center justify-center gap-6 flex-wrap transition-all'>
      {
        filtered ? <>
          {filtered.map((item, index) => (
            <ProjectCard key={item.id} proj={item} index={index} />
          ))}
        </> : <>
          {allProjects && allProjects.map((item, index) => (
            <ProjectCard key={item.id} proj={item} index={index} />
          ))
          }
        </>
      }
    </div>
  )
}

export default AllProjects