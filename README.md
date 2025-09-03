# 🏫 School Management System (Next.js + MySQL + Cloudinary)

## 📌 Overview
This is a mini web app built with **Next.js (React framework)** and **MySQL** for managing schools.  
It has two main pages:
- **Add School** → Form to input school details and upload an image  
- **Show Schools** → Displays list of schools in a product-grid style  

---

## 🚀 Features
- Next.js frontend with **react-hook-form** for form handling + validation  
- **MySQL database integration** (local + cloud-hosted with Railway)  
- **Image upload** with two modes:
  - **Local Development** → Images saved in `/public/schoolImages/` (as per assignment)  
  - **Vercel Deployment** → Images uploaded to **Cloudinary** (since Vercel is read-only)  
- **Duplicate email check** (no two schools with same email)  
- Responsive design (desktop + mobile)  
- Default fallback school image (`default-school.jpg`)  

---

### 📂 Images Folder
- Assignment requires `/public/schoolImages/`.  
- This folder exists in repo with a `.gitkeep` placeholder (empty by default).  
- **Local Dev** → Images saved inside `/public/schoolImages/`.  
- **Vercel Deploy** → Images stored on Cloudinary, folder exists only to fulfill assignment guidelines.  

---

## 🛠 Tech Stack
- **Frontend** → Next.js, React, react-hook-form, next/image  
- **Backend** → Next.js API routes, mysql2  
- **Database** → MySQL (local with XAMPP/MAMP, cloud with Railway)  
- **Image Hosting** → Cloudinary (Vercel) / Local folder (development)  

---

## 📂 Project Structure
pages/
├── index.jsx # Home with links
├── addSchool.jsx # School input form
├── showSchools.jsx # School list display
├── api/
│ ├── addSchool.js # API for adding school + uploading image
│ └── getSchool.js # API for fetching schools
public/
├── default-school.jpg # Fallback image
└── schoolImages/ # Used for local image storage
db.js # MySQL connection pool


---

## ⚙️ Setup Instructions

### 1. Clone Repo
git clone https://github.com/saileepawaskar/nextjs-school-management.git
cd nextjs-school-management
npm install


### 2. Configure MySQL

#### Local DB
CREATE DATABASE school_management;
USE school_management;

CREATE TABLE schools (
id INT AUTO_INCREMENT PRIMARY KEY,
name TEXT NOT NULL,
address TEXT NOT NULL,
city TEXT NOT NULL,
state TEXT NOT NULL,
contact VARCHAR(20) NOT NULL,
image TEXT NOT NULL,
email_id TEXT NOT NULL
);


#### Railway DB (for hosting)
- On Railway dashboard → Connect using **MySQL CLI** or MySQL Workbench.  
- Run the same SQL script above to create the `schools` table in your Railway DB.  


#### ⚙️ next.config.js
To safely and efficiently display external images (e.g., Cloudinary-hosted) with Next.js <Image />, the following setting is required in your next.config.js:

js
module.exports = {
  images: {
    domains: ['res.cloudinary.com'],
  },
};

---

### 3. Environment Variables

Create a `.env.local` file on local machine (**never push this to GitHub**):

-----------------
LOCAL DATABASE
-----------------
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_local_password
DB_NAME=school_management

DB_PORT is optional (defaults 3306)
-----------------
RAILWAY DB (for Vercel Deployment)
-----------------
Example values (from Railway dashboard)
DB_HOST=shuttle.proxy.rlwy.net
DB_USER=root
DB_PASSWORD=xxxxxx
DB_NAME=railway
DB_PORT=12345
-----------------
Cloudinary Config (used on Vercel)
-----------------
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


⚠️ On **Vercel**: set these under **Project → Settings → Environment Variables**.  
⚠️ Do not commit `.env.local` to GitHub (it’s in `.gitignore`).  

---

### 4. Run Locally
npm run dev

Visit your app at [http://localhost:3000](http://localhost:3000):  
- `/addSchool` → Add new school (image stored in `/public/schoolImages`)  
- `/showSchools` → Display schools with name, address, city, image  

---

## ☁️ Deployment (Vercel)
- Repo connected to **Vercel**  
- Environment variables set on Vercel for Railway DB + Cloudinary  
- On Vercel:
  - Images go to Cloudinary (`schoolImages` folder there)  
  - DB stores the Cloudinary URL path in `image`  
- `/public/schoolImages` remains in repo, but unused in production  

---

## 🔎 Notes
- **Duplicate Email** → If email already exists:
  - Record insert is blocked
  - Image is not saved (prevents orphan files)  
- **Fallback Image** → If school has no image, `default-school.jpg` is shown  

---

## 📌 Submission
- **GitHub Repo**: [https://github.com/saileepawaskar/nextjs-school-management.git](https://github.com/saileepawaskar/nextjs-school-management.git)  
- **Hosted App (Vercel)**: [https://nextjs-school-management-theta.vercel.app/](https://nextjs-school-management-theta.vercel.app/)