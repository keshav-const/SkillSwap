# SkillSwap

SkillSwap is a full-stack web application that enables users to exchange skills with each other in a community-driven platform. Users can create profiles, list their skills, request skills they want to learn, and connect with others for collaboration and knowledge sharing.  

The platform leverages a PostgreSQL database for managing users, skills, and matches, while the backend provides secure APIs for authentication, matching logic, and skill management.

## Features

* **User Profiles**: Create and manage personal profiles with listed skills.  
* **Skill Listings**: Offer skills you can teach and request skills you want to learn.  
* **Matching System**: Intelligent matching of users based on offered/requested skills.  
* **Authentication**: Secure user signup and login system.  
* **PostgreSQL Integration**: Uses stored procedures and efficient queries for database operations.  
* **Responsive UI**: Clean, responsive frontend for seamless user experience.  
* **Vercel Deployment**: Hosted and deployed easily on Vercel.

## Technologies Used

### Frontend:
* **React.js**: For building an interactive user interface.  
* **TypeScript**: Ensures type safety and maintainable frontend code.  
* **Tailwind CSS** *(if included)*: For modern, responsive styling.  

### Backend:
* **Node.js**: JavaScript runtime environment.  
* **Express.js**: Web Framework for handling server APIs.  
* **TypeScript**: Strongly typed backend code.  
* **PostgreSQL**: Relational database for users, skills, and matches.  
* **PL/pgSQL**: For stored procedures and advanced database logic.  

### Deployment & Services:
* **Vercel**: For frontend hosting and deployment.  
* **External Postgres Provider**: e.g., Supabase, Render, or Heroku Postgres.  

## Setup and Installation

To get a local copy up and running, follow these steps:

### Prerequisites
* Node.js and npm installed on your system.  
  👉 [Download Node.js](https://nodejs.org/) (npm comes with Node.js).  
* PostgreSQL installed locally or provisioned via a cloud provider.  

### Installation

1. **Clone the repository**
    ```sh
    git clone https://github.com/keshav-const/SkillSwap.git
    cd SkillSwap/project
    ```

2. **Backend Setup**
    * Navigate to the backend directory (if separated, else remain in `project`):
      ```sh
      cd backend
      ```
    * Install dependencies:
      ```sh
      npm install
      ```
    * Create a `.env` file inside the backend directory and add your keys:
      ```env
      PORT=5000
      DATABASE_URL=postgres://username:password@localhost:5432/skillswap
      JWT_SECRET=your-secret-key
      ```
    * Run database migrations or SQL scripts to set up tables and stored procedures:
      ```sh
      psql -U username -d skillswap -f migrations/init.sql
      ```
    * Start the backend server:
      ```sh
      npm run dev
      ```
    * The backend will run on `http://localhost:5000`.

3. **Frontend Setup**
    * Navigate to the frontend directory:
      ```sh
      cd ../frontend
      ```
    * Install dependencies:
      ```sh
      npm install
      ```
    * Start the frontend development server:
      ```sh
      npm run dev
      ```
    * The frontend will run on `http://localhost:3000`.


## License
Distributed under the MIT License. See `LICENSE` for more information.
