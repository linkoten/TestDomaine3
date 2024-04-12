import { getAttributes, getProducts } from '@/lib/swell/products';
import Productsfilter from '@/components/products/productsfilter';

export const revalidate = 60


const Page = async () => {
    const { results: products } = await getProducts({ page: 1 });
    const { results: attributes} = await getAttributes({ page: 1})

    return (
      <>
      <Productsfilter products={products} attributes={attributes}/>
    </>
    )
};

export default Page;
