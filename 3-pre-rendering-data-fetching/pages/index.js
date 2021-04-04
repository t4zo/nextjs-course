import Head from 'next/head';
import Link from 'next/link';
import path from 'path';
import fs from 'fs/promises';

export default function HomePage({ products }) {
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={product.id}>
              <a>{product.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  let file;
  let data;

  try {
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    file = await fs.readFile(filePath);
  } catch (e) {
    return {
      redirect: {
        destination: '/nodata',
      },
    };
  }

  data = JSON.parse(file);

  if (!data) {
    return {
      redirect: {
        destination: '/nodata',
      },
    };
  }

  if (data.products.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}
