
import './App.css';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
<main >

  <ToastContainer/>
 <Outlet/>

</main>
  );
}

export default App;
