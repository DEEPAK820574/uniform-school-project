import './page.css';
import Link from 'next/link';
export default function Home() {
  return (
    
    <div className="page-container mx-auto px-4 py-8">
      <h1 className="text-3xl page-heading font-bold mb-4">Welcome to the School Directory</h1>
      <p className="mb-4 page-p">This application allows you to add and view schools in our directory.</p>
      <div className="space-x-4">
        <Link href="/add-school" className="bg-blue-500 text-white px-4 py-2 rounded page-link">Add a School</Link>
        <Link href="/showSchool" className="bg-green-500 text-white px-4 py-2 rounded page-link">View Schools</Link>
      </div>
    </div>
   
  );
}