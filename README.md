# Project Setup

Follow these steps to run the application locally:

## 1. Setup the Database

-   Install PostgreSQL locally or use the Vercel PostgreSQL connection string.
-   Ensure that the `.env` file contains the correct `DATABASE_URL` for your local or remote PostgreSQL instance.

Example for a local setup:

```bash
DATABASE_URL=postgres://username:password@localhost:5432/dbname
```

## 2. Setup Vercel Blob Storage

-   Create a folder called dev-links in the blob storage.
-   Add the `BLOB_READ_WRITE_TOKEN` to the .env file. You can find the URL and credentials from your Vercel Blob Storage setup.

```bash
BLOB_READ_WRITE_TOKEN=''
```

## 3. Setup Environment Variables

Ensure all necessary environment variables are defined in the .env file, including:

-   `DATABASE_URL` The PostgreSQL connection string.
-   `BLOB_STORAGE_URL` URL to the blob storage folder.
-   `NEXTAUTH_`s for authentication

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```

## 4. Run the Application

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
