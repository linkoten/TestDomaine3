import { getProductBySlugOrId, getProducts } from '@/lib/swell/products'
import Product from '@/components/product'
import RelatedProduct from '@/components/relatedProduct'

export const revalidate = 60


const Page = async ({ params }) => {
  const product = await getProductBySlugOrId(params.slug)
  const products = await getProducts({ page: 1 })

  return( 
  <>

  <Product product={product} />
  <RelatedProduct product={product} products={products} />

  </>
  )
}

export default Page
