'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './page.css';



async function fetchSchools() {
  const res = await fetch('http://localhost:3000/api/show-schools', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch schools');
  }
  return res.json();
}

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [error, setError] = useState(null);
 

  useEffect(() => {
    fetchSchools()
      .then(data => {
        // Assuming the API response is an object with a 'schools' property
        if (data && Array.isArray(data.schools)) {
          setSchools(data.schools);
        } else {
          setError('Invalid data format');
        }
      })
      .catch(err => setError(err.message));
  }, []);


 
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    
    <div className="bg-gray-100 min-h-screen">
      <div className="space-x-4" style={{
        display:'flex',
        flexDirection:"row",
        justifyContent:"start",
        alignItems:'center',
        gap:'10px',
        width:'100%',
      }}>
        <Link href="/" className="show-link" style={{
          textDecoration: 'none', 
          border:"1px solid grey", 
          borderRadius:"3px",
          padding:"5px 7px",
          marginTop:"10px",
          color:"black",
          cursor:"pointer",
          transition:"all 0.3s ease-in-out",
         
          
           }}>Home</Link>
        <Link href="/add-school" className="show-link" style={{
             textDecoration: 'none', 
             border:"1px solid grey", 
             borderRadius:"3px",
             padding:"5px 7px",
             marginTop:"10px",
             color:"black",
             cursor:"pointer",
             transition:"all 0.3s ease-in-out",

        }}>Add Schools</Link>
      </div>
      <div className="show-container mx-auto px-4 py-8">
        <h1 className="container-heading font-bold mb-8 text-center text-gray-800">Our Schools</h1>
        
        <div className=" card-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {schools.length > 0 ? (
            schools.map((school) => (

            <div className='main-card'>
                <div className="image-container relative h-48">
                  <Image
                  className='card-image'
                    src={school.image_path || '/placeholder-school.jpg'}
                    alt={school.name}
                    width={100}
                    height={100}
                    objectFit="cover"
                  />
                </div>
                <div className="card-details ">
                  <h2 className="text-xl font-semibold mb-2 text-gray-800">{school.name}</h2>
                  <p className="text-gray-600 mb-2">{school.address}</p>
                  <p className="text-gray-500 text-sm">{school.city}</p>
                </div>
             

             </div>
            ))
          ) : (
            <div>No schools found</div>
          )}
        </div>
      </div>
    </div>
  );
}
