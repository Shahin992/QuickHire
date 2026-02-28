# QuickHire Frontend

QuickHire is a React + Vite job portal frontend. It connects to the QuickHire backend API for authentication, job listings, job details, job posting, and job applications.

## Backend

Base URL:

`https://quick-hire-backend-gilt.vercel.app`

API base URL used by the frontend:

`https://quick-hire-backend-gilt.vercel.app/api`

Health check:

`GET https://quick-hire-backend-gilt.vercel.app/`

## Tech Stack

- React
- Vite
- Redux Toolkit
- React Router
- Axios
- Tailwind CSS

## Installation

1. Clone the repository.
2. Move into the project directory.
3. Install dependencies.
4. Create the environment file.
5. Start the development server.

```bash
git clone <your-repo-url>
cd Qtec-task-front-end
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the project root with:

```env
VITE_API_BASE_URL=https://quick-hire-backend-gilt.vercel.app/api
```

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## API Routes Used By Frontend

Auth:

- `POST /api/auth/register`
- `POST /api/auth/login`

Jobs:

- `GET /api/jobs`
- `GET /api/jobs/:id`
- `POST /api/jobs`
- `DELETE /api/jobs/:id`

Applications:

- `POST /api/applications`

## Admin Credentials

This frontend expects JWT-based authentication from the backend.

Admin login:

```json
{
  "email": "shahinkhan5979@gmail.com",
  "password": "qwerty"
}
```

Protected admin actions:

- Create a job
- Delete a job

These routes require:

`Authorization: Bearer <token>`

## Deployment

The project includes [vercel.json](/home/shahin983/Projects/Qtec-task-front-end/vercel.json#L1) for SPA route rewrites on Vercel.

## Notes

- Restart the dev server after changing `.env`.
- In development, React Strict Mode may re-run effects. The jobs fetch logic has been guarded to avoid duplicate API requests for the same in-flight request.
