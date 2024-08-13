import StudentsTable from '../components/StudentsTable';
import './global.css';
import Sidenav from '@/components/sidenav';

export default function Page() {
  return (
    <div>
      <h1 className='text-center'>Welcome to the Students Page</h1>
      <StudentsTable />
    </div>
  );
}
