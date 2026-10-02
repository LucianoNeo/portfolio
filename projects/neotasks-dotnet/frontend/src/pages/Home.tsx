import { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Collaborators from "../components/Collaborators";
import Dashboard from "../components/Dashboard";
import Header from "../components/Header";
import Account from "../components/Account";
import Audit from "../components/Audit";
import List from "../components/List";
import Loading from "../components/Loading";
import Menu from "../components/Menu";
import Projects from "../components/Projects";
import Tasks from "../components/Tasks";
import { AuthContext } from "../contexts/AuthContext";
import { useMyContext } from "../contexts/MyContext";
import { api } from "../services/Api";



function Home() {
  const [close, setClose] = useState(false)
  const [page, setPage] = useState('dashboard')
  const { setProjects, projects, setTasks, tasks, setIsLoading, setCollaborators, dayMinutes, setDayMinutes, monthMinutes, setMonthMinutes, ErrorToast, SuccessToast } = useMyContext()
  const { user, token, signOut } = useContext(AuthContext)

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setProjects([]); setTasks([]); setCollaborators([]); setDayMinutes(null); setMonthMinutes(null);
    Promise.all([api.get('/projects'), api.get('/tasks'), api.get('/collaborators'),
      api.post('/daytotalminutes', { daySent: new Date() }), api.get('/monthtotalminutes')])
      .then(([projects, tasks, collaborators, day, month]) => {
        if (!active) return;
        setProjects(projects.data); setTasks(tasks.data); setCollaborators(collaborators.data);
        setDayMinutes(day.data); setMonthMinutes(month.data);
      }).catch(error => { if (active) ErrorToast(error); })
      .finally(() => { if (active) setIsLoading(false); });
    return () => { active = false; };
  }, [token]);


  return (
    <>
      <ToastContainer />
      <div className="overflow-x-hidden overflow-y-hidden">
        <Loading />
        <Header close={close} setClose={setClose} username={user} />
        <Menu open={close} setPage={setPage} setClose={setClose} close={close} />
        {page == 'dashboard' && <Dashboard setPage={setPage} projects={projects} tasks={tasks} dayMinutes={dayMinutes} monthMinutes={monthMinutes} />}

        {/* @ts-ignore */}
        {page == 'projects' && <Projects projects={projects} />}
        {/* @ts-ignore */}
        {page == 'tasks' && <Tasks tasks={tasks} />}
        {page == 'collaborators' && <Collaborators />}
        {page == 'list' && <List />}
        {page === 'account' && <Account />}
        {page === 'audit' && <Audit />}
      </div>

    </>
  )

}

export default Home
