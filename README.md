# Responsible, Sustainable, and Inclusive Digital Product Creation Website – Documentation Website

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38b2ac?logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-animations-ff69b4?logo=framer)
![MDX](https://img.shields.io/badge/MDX-docs-orange?logo=mdx)

---

## 🚀 Getting Started

To set up the project locally (Docker is recommended):

1. Clone the repository
2. Install dependencies
3. Run the development server
4. Build and start the production server

```
# clone the repository
git clone https://github.com/your-username/website.git
cd website

# install dependencies
npm install

# start development server
npm run dev

# build for production
npm run build

# run production build
npm start
```

After starting, open [http://localhost:3000](http://localhost:3000) in your browser.  
The site will auto-refresh as you edit files.

---

## Docker Usage

This project includes a Dockerfile and docker-compose.yml for easy deployment.

Build and run with Docker Compose:

```
docker compose up --build
```
Access the container: The application should be available at http://localhost:3000.

---

## Project Structure

```
├── public/          # Static assets (images, files)
│   ├── files/       # for PDF files
│   ├── png/       # for png files
│   ├── svg/       # for svg files
│   ├── video/       # for mp4 files (YouTube Link preffered)
├── src/          # Static assets (images, files)
│   ├── projects/       # put project mdx files here
```

## 🛠️ Tech Stack

- [Next.js 16](https://nextjs.org) – App Router, Turbopack
- [React 19](https://react.dev)
- [Tailwind CSS 4](https://tailwindcss.com) – with plugins (forms, typography, aspect-ratio)
- [Framer Motion](https://www.framer.com/motion/) – animations
- [Lucide Icons](https://lucide.dev)
- [MDX](https://mdxjs.com) – rich documentation content

---

## 📜 License

This project is open for **educational and research purposes**.  
For reuse beyond these contexts, please contact the author.  
