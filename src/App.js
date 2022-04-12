import React from 'react'
import { AuthorTable } from './components/authorTable/AuthorTable'
import { TaskTable } from './components/taskTable/TaskTable'
import './App.css'

export const App = () => {
  return (
    <div className='timerAppParent'>
      <div className='titleMainHeading b1px txtAlnCtr'>
        <span className='mainTitle'>Add Author and Task Details</span>
      </div>
      <div className='authorTaskTodoComponent'>
        <div className='authorTable b1px'>
          <AuthorTable />
        </div>
        <div className='taskTable b1px'>
          <TaskTable />
        </div>
      </div>
      <div className='txtAlnCtr mg20px'>
        <button className='crsptr'>TIMERS</button>
      </div>
    </div>
  )
}
