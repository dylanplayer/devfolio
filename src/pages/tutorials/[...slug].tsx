import fs from "fs";
import matter from "gray-matter";
import md from 'markdown-it';
import utilStyles from '../../styles/utils.module.css';
import tutorialStyles from '../../styles/tutorialStyles.module.css';
import Link from "next/link";

// Generating the paths for each post
export const getStaticPaths = async () => {
  // Get list of all files from our posts directory
  const tutorials = fs.readdirSync("src/tutorials");

  const paths = tutorials.map((tutorial) => {
    const pages = fs.readdirSync(`src/tutorials/${tutorial}`);
    const paths = pages.map((page) => {
      return {
        params: {
          slug: [tutorial, page === 'index.md' ? '' : page.replace(".md", "")],
        },
      }
    });

    return paths
  }).flat();

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = async ({ params: { slug } }: any) => {
  const fileName = `${slug[1] ? slug[1] : 'index'}.md`;
  const filePath = fs.readFileSync(`src/tutorials/${slug[0]}/${fileName}`, 'utf-8');
  const { data: frontmatter, content } = matter(filePath);

  const pages: string[] = fs.readdirSync(`src/tutorials/${slug[0]}/`);
  const currentIndex = pages.findIndex(x => x === fileName);
  const next = (pages[currentIndex+1] ? pages[currentIndex+1] : '').replace('.md', '');
  const back = (pages[currentIndex-1] ? pages[currentIndex-1] !== 'index.md' ? pages[currentIndex-1] : '' : '').replace('.md', '');
  const tutorial = slug[0];
  
  return {
    props: {
      tutorial,
      next,
      back,
      frontmatter,
      content,
    },
  };
}

const Tutorial = ({tutorial, next, back, frontmatter, content}: any) => {
  const {} = frontmatter;

  return (
    <main className={utilStyles.main}>
      <div className={tutorialStyles.container}>
        <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
        <div className={tutorialStyles.navigationButtons}>
          <Link href={`/tutorials/${tutorial}/${back}`} className={[tutorialStyles.navigationButton, tutorialStyles.navigationButtonBack].join(' ')}>
            Back
          </Link>
          <Link href={`/tutorials/${tutorial}/${next}`} className={[tutorialStyles.navigationButton, tutorialStyles.navigationButtonNext].join(' ')}>
            Next
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Tutorial;
