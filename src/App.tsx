
import './App.css'
import ParentList from './components/Delivery/ParentList'
import Navbar from './components/Navbar'
import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"
function App() {
  

  return (
    <>
 <Navbar />
 <DndProvider backend={HTML5Backend}>
 <ParentList />
 </DndProvider>
    </>
  )
}

export default App
