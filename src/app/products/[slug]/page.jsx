import { getEnglishProductBySlugOrId, getFrenchProductBySlugOrId, getProductBySlugOrId, getProducts } from '@/lib/swell/products'
import Product from '@/components/product'
import RelatedProduct from '@/components/relatedProduct'

export const revalidate = 60



  
  
export default async function Page({
  params: {lang, slug }
}) {
  const product = await getProductBySlugOrId(slug)
  const products = await getProducts({ page: 1 })
  const frenchProduct = await getFrenchProductBySlugOrId(slug)
  const englishProduct = await getEnglishProductBySlugOrId(slug)
return(
  <>

  <Product frenchProduct={frenchProduct} englishProduct={englishProduct} />
  <RelatedProduct product={product} products={products}  />

  </>
  )
}

