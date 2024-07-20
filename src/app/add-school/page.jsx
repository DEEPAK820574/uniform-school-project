import AddSchoolForm from '@/components/AddSchoolForm';
import Link from 'next/link';

export default function AddSchool() {
  return (
    <div className="container mx-auto px-4 py-8" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
      }}> 
         <div className="space-x-4" style={{
        display:'flex',
        flexDirection:"row",
        justifyContent:"start",
        alignItems:'center',
        gap:'10px',
        width:'100%',
      }}>
        <Link href="/" className="add-link" style={{
          textDecoration: 'none', 
          border:"1px solid grey", 
          borderRadius:"3px",
          padding:"5px 7px",
          color:"black",
          cursor:"pointer",
          transition:"all 0.3s ease-in-out",
         
          
           }}>Home</Link>
        <Link href="/showSchool" className="add-link" style={{
             textDecoration: 'none', 
             border:"1px solid grey", 
             borderRadius:"3px",
             padding:"5px 7px",
             color:"black",
             cursor:"pointer",
             transition:"all 0.3s ease-in-out",

        }}>View Schools</Link>
      </div>
      <h1 className="text-2xl font-bold mb-4" 
      style={{ textAlign:"center"}}>Add New School</h1>

      <AddSchoolForm />
   
     
    </div>
  );
}