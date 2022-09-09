import fs from 'fs';
import matter from 'gray-matter';
import Image from 'next/image';
import Link from 'next/link';
import utilStyles from '../../styles/utils.module.css';

export async function getStaticProps(){
  const files = fs.readdirSync('src/tutorials');

  const tutorials = files.map((fileName) => {
    const slug = fileName.replace('.md', '');
    const readFile = fs.readFileSync(`src/tutorials/${fileName}/index.md`, 'utf-8');
    const { data: frontmatter } = matter(readFile);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      tutorials,
    },
  };
}

const Tutorials = ({ tutorials }: any) => {
  return (
    <main className={utilStyles.main}>
      {tutorials.map((tutorial: any) => {
        //extract slug and frontmatter
        const {slug, frontmatter} = tutorial;
        //extract frontmatter properties
        const {parent} = frontmatter;

        const title = slug.replace('-', ' ');

        //JSX for individual blog listing
        return (
          <article key={slug}>
            <Link href={`/tutorials/${slug}`}>
              <h1 style={{ textTransform: "capitalize" }}>{title}</h1>
            </Link>
          </article>
        );
      })}
    </main>
  );
}

export default Tutorials;
