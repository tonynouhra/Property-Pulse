when we name a filder [id] it  make it dynamic 
i can make [...id].js file in pages folder to make it catch all routes 
for example if i have a file like this : 

**1. What useRouter Does**
useRouter is a React Hook provided by Next.js (App Router) that allows you to:
- Programmatically navigate between routes
- Access router information (current path, query parameters, etc.)
- Perform client-side navigation


npx create-next-app@latest
npx create-next-app@latest my-app
npm i react-spinners
npm i react-icons


1. How routes are created:

Pages Router: One file = one route

pages/about.js → creates /about


App Router: One folder with page.js = one route

app/about/page.js → creates /about



2. Components:

Pages Router: Client-side by default (runs in browser)
App Router: Server-side by default (runs on server) - faster and more efficient

3. Layouts:

Pages Router: Need to manually wrap pages with layouts using _app.js
App Router: Built-in layout.js that automatically wraps child routes

4. Data Fetching:

Pages Router: Uses getServerSideProps, getStaticProps
App Router: Uses async components and fetch directly

npm -i mongodb mongoos