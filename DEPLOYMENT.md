# 🚀 Lumetrix Website Deployment Guide

This guide provides step-by-step instructions for deploying the **Lumetrix Website (MERN Stack)** without any issues.

---

## 🌟 Method 1: Single Web Service Deployment on Render (Recommended ⭐)

Deploy both Frontend & Backend together on **Render** with a single click.

### Steps:

1. Push your latest code to GitHub:
   ```bash
   git add .
   git commit -m "Configure deployment scripts"
   git push origin main
   ```

2. Go to [Render Dashboard](https://dashboard.render.com/) and log in with GitHub.

3. Click **New +** -> **Blueprint**.

4. Connect your GitHub repository `spksuman03-spec/Lumetrix-Website`.

5. Select **lumetrix-fullstack** (or Render will automatically read `render.yaml`).

6. (Optional) Set Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas Connection String (If left empty, Lumetrix will use its built-in JSON database).
   - `JWT_SECRET`: A secure random string (e.g. `lumetrix_jwt_secret_2026`).

7. Click **Apply**. Render will automatically build the frontend, install dependencies, and start the backend service.

---

## ⚡ Method 2: Split Deployment (Vercel / Netlify Frontend + Render Backend)

### Step 1: Deploy Backend to Render

1. Go to [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** -> **Web Service**.
3. Connect your repository `spksuman03-spec/Lumetrix-Website`.
4. Configure settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Environment Variables**:
     - `PORT`: `5000`
     - `NODE_ENV`: `production`
     - `MONGODB_URI`: *(Your MongoDB Atlas URI)*
     - `JWT_SECRET`: `lumetrix_jwt_secret_2026`
5. Click **Create Web Service**. Note your backend URL (e.g., `https://lumetrix-backend.onrender.com`).

### Step 2A: Deploy Frontend to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New...** -> **Project**.
3. Import `spksuman03-spec/Lumetrix-Website`.
4. Configure Project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Environment Variables**:
     - `VITE_API_URL`: `https://lumetrix-backend.onrender.com/api` *(replace with your actual backend URL)*
5. Click **Deploy**.

### Step 2B: Deploy Frontend to Netlify

1. Go to [Netlify Dashboard](https://app.netlify.com/).
2. Click **Add new site** -> **Import an existing project**.
3. Select GitHub -> `spksuman03-spec/Lumetrix-Website`.
4. Build Settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
   - **Environment variables**:
     - `VITE_API_URL`: `https://lumetrix-backend.onrender.com/api` *(replace with your actual backend URL)*
5. Click **Deploy Site**.

---

## 🍃 MongoDB Atlas Setup (Optional but Recommended)

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a Database User (Username & Password).
3. Under **Network Access**, add IP Address `0.0.0.0/0` (Allow access from anywhere).
4. Get your Connection String:
   `mongodb+srv://<username>:<password>@cluster.mongodb.net/lumetrix?retryWrites=true&w=majority`
5. Set this string as `MONGODB_URI` in your hosting platform's environment variables.

---

## ✅ Deployment Checklist

- [x] Production build script added (`npm run build`).
- [x] Backend static file serving enabled for SPA client routing.
- [x] `render.yaml`, `vercel.json`, and `netlify.toml` configured.
- [x] CORS allowed for cross-origin frontend API calls.
