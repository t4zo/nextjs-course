import path from 'path';
import fs from 'fs/promises';

// import { useRouter } from 'next/router';

export default function Product({ product }) {
  // const router = useRouter();
  // const { pid } = router.query;

  // Don't need if fallback: blocking
  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </>
  );
}

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;

  const data = await getData();

  
  if (!data) {
    return {
      redirect: {
        destination: '/nodata',
      },
    };
  }
  
  const product = data.products.filter((product) => product.id === productId)[0];
  if (!product) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  let data;

  try {
    data = await getData();
  } catch (e) {
    return {
      redirect: {
        destination: '/nodata',
      },
    };
  }

  const paths = data.products.map((p) => p.id).map((pid) => ({ params: { pid } }));

  return {
    paths,
    // paths: [{ params: { pid: 'p1' } }],
    fallback: true,
    // fallback: false,
    // fallback: 'blocking',
  };
}

async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const file = await fs.readFile(filePath);
  return JSON.parse(file);
}
