
# Form Builder


A dynamic and customizable form-building application designed to empower users to create, edit, and render forms with ease. This project leverages modern web technologies to provide a seamless and secure user experience.

This project is deployed via Vercel. Check out the live demo [here]([https://akramramoul.github.io/React_Kanban_Board](https://formbuilder-xcuz.vercel.app/).




## Features

- Dynamic Form Creation: Build custom forms effortlessly with a drag-and-drop interface powered by DND-kit.
- Database Integration: Fetch and store form data dynamically using PostgreSQL and Prisma ORM.
- Secure Authentication: User access and sessions managed with Clerk for robust security.
- Efficient Database Queries: Optimized database performance for faster rendering of user-generated forms.
- Modern UI: Styled with TailwindCSS and Shadcn UI for a polished look and feel.

- Light and dark mode toggle

- interactive with all screens
## Tech Stack

- Frontend: Next.js, TypeScript, TailwindCSS, Shadcn UI
- Database: PostgreSQL with Prisma ORM
- State Management: React Context
- Drag-and-Drop: DND-kit
- Authentication: Clerk
- Deployment: Vercel
- Version Control: GitHub
## Installation

Install my-project with npm

```bash
git clone https://github.com/AkramRamoul/formbuilder.git

cd formbuilder

npm install
```

Run database migrations:

```bash
npx prisma migrate dev
```
Start the development server:

```bash
npm run dev
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
`CLERK_SECRET_KEY`
`NEXT_PUBLIC_CLERK_SIGN_IN_URL`
`NEXT_PUBLIC_CLERK_SIGN_UP_URL`

`NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`
`NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`
`POSTGRES_PRISMA_URL`
`POSTGRES_URL_NON_POOLING`

