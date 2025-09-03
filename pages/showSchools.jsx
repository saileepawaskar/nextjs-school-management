import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSchools() {
      try {
        const res = await fetch('/api/getSchool');
        const data = await res.json();
        setSchools(data);
      } catch (err) {
        console.error('Error fetching schools:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchSchools();
  }, []);

  if (loading)
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading schools...</p>;
  if (!schools.length)
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>No schools found.</p>;

  return (
    <div className="container">
      <header>
		<Link href="/" legacyBehavior>
		  <a className="home-button" aria-label="Go to Home Page">Home</a>
		</Link>
      </header>	
      <h1>Schools</h1>
      <div className="grid">
        {schools.map(({ id, name, address, city, image }) => {
          // ✅ Handle both local paths & full URLs
          const imgSrc = image?.startsWith('http')
            ? image
            : image
            ? image // relative like "/schoolImages/filename.jpg"
            : '/default-school.jpg'; // fallback

          return (
            <div key={id} className="card">
              <Image
                src={imgSrc}
                alt={name}
                width={400}
                height={250}
                style={{ objectFit: 'cover', width: '100%', height: '180px' }}
              />
              <div className="info">
                <h2>{name}</h2>
                <p>{address}</p>
                <p>{city}</p>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .container {
          max-width: 960px;
          margin: 2rem auto;
          padding: 1rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
		header {
		  margin-bottom: 1rem;
		  display: flex;
		  justify-content: flex-start;
		}
		.home-button {
		  background: #1565c0;
		  color: white;
		  padding: 0.5rem 1rem;
		  border-radius: 6px;
		  text-decoration: none;
		  font-weight: 700;
		  transition: background 0.3s ease;
		  user-select: none;
		}
		.home-button:hover,
		.home-button:focus {
		  background: #0d47a1;
		}		
        h1 {
          text-align: center;
          margin-bottom: 2rem;
          font-weight: 700;
          color: #222;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }
        .card {
          border: 1px solid #ddd;
          border-radius: 12px;
          overflow: hidden;
          background: white;
          box-shadow: 0 15px 30px rgb(0 0 0 / 0.07);
          cursor: pointer;
          transition: box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        .card:hover {
          box-shadow: 0 24px 36px rgb(0 0 0 / 0.15);
        }
        .info {
          padding: 1rem 1.25rem;
          flex-grow: 1;
        }
        h2 {
          font-size: 1.4rem;
          margin: 0 0 0.5rem 0;
          color: #1565c0;
        }
        p {
          margin: 0.15rem 0;
          color: #555;
          font-size: 1rem;
          line-height: 1.3;
          word-wrap: break-word;
        }
        @media (max-width: 600px) {
          .card {
            border-radius: 10px;
          }
        }
      `}</style>
    </div>
  );
}
