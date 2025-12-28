# DigiCare Deployment Guide

This guide details the steps to deploy the DigiCare application to Vercel.

## Prerequisites

**IMPORTANT**: Before deploying, set up your environment variables!  
📖 **Read [ENV_SETUP_GUIDE.md](./ENV_SETUP_GUIDE.md) first** to get all your credentials ready.

## Part 1: Push Changes to GitHub

Ensure your latest code is on GitHub.

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

## Part 2: Deploy on Vercel

1.  **Log in to Vercel**: Go to [vercel.com](https://vercel.com).
2.  **Add New Project**: Click **"Add New..."** -> **"Project"**.
3.  **Import Git Repository**: Find `DigiCare` and click **"Import"**.
4.  **Configure Project**:
    *   **Framework Preset**: Select **Vite**.
    *   **Root Directory**: Leave as `./`.
    *   **Environment Variables**: Add your backend `.env` variables (e.g., `MONGODB_URI`, `CLOUDINARY_...`, `JWT_SECRET`).
5.  **Deploy**: Click **"Deploy"**.

## Troubleshooting

*   **404 on API**: Ensure frontend calls use relative paths (e.g., `/api/...`) or the correct Vercel URL.
*   **500 Error**: Check Vercel Logs; likely missing Environment Variables.
