import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotFound } from '../pages/notFound';
import { Beer } from '../pages/beer';
import { Edit } from '../pages/edit';
import { UserList } from '../pages/userList';

function PrivateRoutes() {
  return (
    <Router>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path="/" element={<Beer />} />
        <Route path="/edit/:id/:page" element={<Edit />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </Router>
  )
}

export { PrivateRoutes }