// shortcut: tap on the component and CTRL + SPACE.
// npm i -g vercel@latest
// 1) vercel login
// 2) Set up and deploy “~\OneDrive\Desktop\React_projects\trello-appwrite-clone1copy”? [Y/n] y
// 3) ? Which scope do you want to deploy to? mohammed-blue
// 4) ? Link to existing project? [y/N] n
// 5) ? What’s your project’s name? trello-appwrite-clone1copy
// 6) ? In which directory is your code located? ./
// 7) set up the project environment:
    // go setting of the project, select Environment variables
    // go to .env.local and copy all, and past it all in the Environment variables in the settings.
// 8) now re-run the build. vercel
// 9) to deploy to production, use vercel --prod. https://trello-appwrite-clone1copy.vercel.app
// 10) go to Appwrite and select your project and paste in the following trello-appwrite-clone1copy.vercel.app
//   under Hostname in place of localhostand Update it.

/**
 * This project is a note taking application that allows users to create, view, and delete notes. The application is built using NextJs, Typescript, Appwrite, Tailwind CSS, React Beautiful DND, Zustand, and OpenAI. The application is deployed on Vercel.
 */
import Board from '@/components/Board'
import Header from '@/components/Header'
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      {/*Header component  */}
      <Header />
      {/* Board component */}
      <Board />
    </main>
  )
}
