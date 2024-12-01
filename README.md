# devLinks - A link sharing app (highest level of difficulty "Guru" in Frontend Mentor)

***Note: Please login and checkout the editor which is the most challenging part of the application***
You can login using this credentials: username is `john`, password is `12345678`

This is a Guru level challenge in [Frontend Mentor](https://www.frontendmentor.io/challenges/linksharing-app-Fbt7yweGsT). In this project, I built a fully-functional link-sharing app for developers! I practiced working with image uploads, repeater fields, drag-and-drop, and more! Here is a list of what I did in this project:
- Create, read, update, delete links and see previews in the mobile mockup
- Receive validations if the links form is submitted without a URL or with the wrong URL pattern for the platform
- Drag and drop links to reorder them
- Add profile details like profile picture, first name, last name, and email
- Receive validations if the profile details form is saved with no first or last name
- Preview their devlinks profile and copy the link to their clipboard
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Save details to a database (build the project as a full-stack app)
- Create an account and log in (add user authentication to the full-stack app)

## Project Setup

Follow these steps to run the application locally:

### 1. Setup the Database

-   Install PostgreSQL locally or use the Vercel PostgreSQL connection string.
-   Ensure that the `.env` file contains the correct `DATABASE_URL` for your local or remote PostgreSQL instance.

Example for a local setup:

```bash
DATABASE_URL=postgres://username:password@localhost:5432/dbname
```

### 2. Setup Vercel Blob Storage

We used Vercel Blob storage because serverless function does support local file storage.

-   Create a folder called dev-links in the blob storage.
-   Add the `BLOB_READ_WRITE_TOKEN` to the .env file. You can find the URL and credentials from your Vercel Blob Storage setup.

```bash
BLOB_READ_WRITE_TOKEN=''
```

### 3. Setup Environment Variables

Ensure all necessary environment variables are defined in the .env file, including:

-   `DATABASE_URL` The PostgreSQL connection string.
-   `BLOB_STORAGE_URL` URL to the blob storage folder.
-   `NEXTAUTH_`s for authentication

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```

### 4. Run the Application

1. Install dependencies:
    ```bash
    npm install
    ```
2. Deploy database migrations:
    ```bash
    npx prisma migrate deploy
    ```
3. Generate the Prisma client:
    ```bash
    npx prisma generate
    ```
4. Start the development server:
    ```bash
    npm run dev
    ```

The app should now be running at http://localhost:3000.
