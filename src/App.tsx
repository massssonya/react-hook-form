import './App.css'
import { Link } from "react-router-dom"
import { UIButton } from './component/ui'


function App() {


  return (
    <div className='flex w-full h-screen'>
      <div className='flex flex-col gap-4 w-1/2 border'>
        <UIButton>Продолжить игру</UIButton>
        <UIButton>Новая игра</UIButton>
      </div>
    </div>
  )
}

export default App
