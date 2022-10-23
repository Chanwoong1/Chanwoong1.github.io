import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import { PageSEO } from '@/components/SEO'

export default function AuthorLayout({ children, frontMatter }) {
  const { name, avatar, occupation, company, email, twitter, linkedin, github, instagram } =
    frontMatter

  return (
    <>
      <PageSEO title={`About - ${name}`} description={`About me - ${name}`} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center pt-8">
            <Image
              src={avatar}
              alt="avatar"
              width="192px"
              height="192px"
              className="h-48 w-48 rounded-full"
            />
            <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            <div className="text-gray-500 dark:text-gray-400">{company}</div>
            <div className="flex space-x-3 pt-6">
              <SocialIcon kind="mail" href={`mailto:${email}`} />
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="instagram" href={instagram} />
              <SocialIcon kind="linkedin" href={linkedin} />
              <SocialIcon kind="twitter" href={twitter} />
            </div>
          </div>
          <div className="prose max-w-none pt-8 pb-8 dark:prose-dark xl:col-span-2">{children}</div>
          <div className="flex flex-col items-center text-2xl font-extrabold leading-9 tracking-tight text-gray-900  dark:text-gray-100">
            <h1>TECH STACKS</h1>
          </div>
          <div className="flex items-center space-x-1">
            <br></br>
            <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
            <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
            <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
            <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white" />
            <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
          </div>
          <div className="flex items-center space-x-1">
            <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white" />
            <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white" />
            <img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white" />
            <img src="https://img.shields.io/badge/Tensorflow-FF6F00?style=for-the-badge&logo=Tensorflow&logoColor=white" />
          </div>
        </div>
      </div>
    </>
  )
}
