import { useApp } from './store'
import PreDataPage from './components/pre-data-page'
import PostDataPage from './components/post-data-page'
import './App.css'

export default function App() {
  const hasUploaded = useApp(x => x.hasUploaded);

 return (
    <>
     <div> { hasUploaded ? <PostDataPage/> : <PreDataPage/>} </div>
    </>
  );
}

