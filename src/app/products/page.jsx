import { getAttributes, getProducts } from '@/lib/swell/products';
import Products from '@/components/products';
import Productsfilter from '@/components/products/productsfilter';

const Page = async () => {
    const { results: products } = await getProducts({ page: 1 });
    const { results: attributes} = await getAttributes({ page: 1})

    return (
      <>
      <Productsfilter products={products} attributes={attributes}/>
    <Products products={products} />;
    </>
    )
};

export default Page;
