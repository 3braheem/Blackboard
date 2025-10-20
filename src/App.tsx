import { useApp } from './store'
import PreDataPage from './components/PreDataPage'
import PostDataPage from './components/PostDataPage'
import './App.css'

export default function App() {
  const hasUploaded = useApp(x => x.hasUploaded);

 return (
    <>
     <div> { hasUploaded ? <PostDataPage/> : <PreDataPage/>} </div>
    </>
  );
}

