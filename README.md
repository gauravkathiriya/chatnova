# ChatNova - AI Chat Application

ChatNova is a modern AI chat application built with Next.js, Firebase, and OpenAI's ChatGPT API. It provides a seamless chatting experience with an AI assistant, complete with user authentication, profile management, and theme customization.

## Features

- **AI-Powered Conversations**: Interact with ChatGPT's powerful language model
- **User Authentication**: Secure signup and login with Firebase Authentication
- **Profile Management**: Customize your profile with display name and profile picture
- **Chat History**: All your conversations are saved and can be accessed anytime
- **Dark Mode**: Toggle between light and dark themes with a single click
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technologies Used

- **Next.js**: React framework for building the frontend
- **Firebase**: Authentication, Firestore database, and Storage for profile images
- **OpenAI API**: ChatGPT integration for AI responses
- **TailwindCSS**: Utility-first CSS framework for styling
- **next-themes**: Theme management for dark/light mode

## Getting Started

### Prerequisites

- Node.js 18.x or later
- Firebase account
- OpenAI API key

### Installation

1. Clone the repository:

```bash
git clone https://github.com/gauravkathiriya/chatnova.git
cd chatnova
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with the following variables:

```
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

# OpenAI API Key
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
```

4. Set up Firebase:
   - Create a new Firebase project
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Enable Storage for profile images
   - Copy your Firebase configuration to the `.env.local` file

5. Get an OpenAI API key:
   - Create an account at [OpenAI](https://openai.com)
   - Generate an API key
   - Add the API key to your `.env.local` file

### Running the Application

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

- `app/`: Next.js app directory with pages and layouts
- `components/`: React components organized by feature
  - `auth/`: Authentication components (login, signup)
  - `chat/`: Chat interface components
  - `ui/`: Reusable UI components
- `lib/`: Utility functions and services
  - `firebase.ts`: Firebase configuration
  - `auth-context.tsx`: Authentication context provider
  - `chat-service.ts`: Chat functionality and API calls

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com) from the creators of Next.js.

## License

This project is licensed under the MIT License.
