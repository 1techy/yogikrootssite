# Yogik Roots Site

A full-stack web application built with Node.js, Express, and modern web technologies.

## Features

- User authentication and authorization
- File upload capabilities with Cloudinary
- Payment processing with Stripe
- Redis caching
- MongoDB database integration

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcrypt
- **File Storage**: Cloudinary
- **Payment**: Stripe
- **Caching**: Redis
- **Environment**: dotenv

## Project Structure

```
yogikrootssite/
├── backend/
│   ├── controllers/
│   ├── routes/
│   └── server.js
├── frontend/
├── package.json
└── README.md
```

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd yogikrootssite
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
REDIS_URL=your_redis_url
```

4. Start the development server:
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

## API Endpoints

The API is available at `/api/auth` for authentication routes.

## License

ISC 