import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Reciver from './pages/Reciver';
import { SenderRouter } from './pages/Sender';
import TransactionHistory from './pages/TransactionHistory';

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
            <Route index element={<SenderRouter />} />
            <Route path="/reciver" element={<Reciver />} />
            <Route path="/transactionhistory" element={<TransactionHistory />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App