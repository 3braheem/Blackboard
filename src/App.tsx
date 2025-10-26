import { useApp } from './store'
import PreDataPage from './components/pre-data-page'
import PostDataPage from './components/post-data-page'
import './App.css'
import ThemeWatcher from './components/theme-watcher';

export default function App() {
  // const hasUploaded = useApp(x => x.hasUploaded);
  const hasUploaded = true; // TEMPORARY OVERRIDE FOR TESTING POST-DATA PAGE

 return (
    <>
      <ThemeWatcher />
      <div> { hasUploaded ? <PostDataPage/> : <PreDataPage/>} </div>
    </>
  );
}

