import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Welcome to the School Management System</h1>
      <p>Manage schools easily with our intuitive platform</p>
      <div className="grid">
        <Link href="/addSchool" className="card">
          <h2>Add School &rarr;</h2>
          <p>Input school data.</p>
        </Link>
        <Link href="/showSchools" className="card">
          <h2>View Schools &rarr;</h2>
          <p>Browse the list of schools.</p>
        </Link>
      </div>
      <style jsx>{`
        main {
          max-width: 800px;
          margin: 5rem auto;
          padding: 0 1rem;
          text-align: center;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        h1 {
          font-size: 2.8rem;
          margin-bottom: 0.5rem;
          color: #1565c0;
          letter-spacing: 1.2px;
        }
        p {
          font-size: 1.2rem;
          color: #444;
          margin-bottom: 3rem;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }
        a.card {
          display: block;
          padding: 2rem;
          border-radius: 12px;
          background: #f0f8ff;
          color: #0d47a1;
          text-decoration: none;
          box-shadow: 0 8px 20px rgb(13 71 161 / 0.15);
          transition: background 0.3s ease, box-shadow 0.3s ease;
          border: 2px solid transparent;
        }
        a.card:hover,
        a.card:focus {
          background: #e3f2fd;
          box-shadow: 0 12px 28px rgb(13 71 161 / 0.3);
          border-color: #1565c0;
        }
        h2 {
          font-size: 1.6rem;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        @media (max-width: 600px) {
          main {
            margin: 3rem 1rem;
          }
          h1 {
            font-size: 2rem;
          }
          .grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
      `}</style>
    </main>
  );
}
