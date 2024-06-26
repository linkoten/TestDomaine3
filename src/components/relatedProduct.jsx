"use client";

import { useEffect, useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils/index';

const RelatedProduct = ({ product, products }) => {


  const [upsellsProducts, setUpsellsProducts] = useState([]);
  useEffect(() => {
    const upsellsIds = product.up_sells?.map((upsell) => upsell.product_id);
    setUpsellsProducts(upsellsIds || []); // Set empty array if up_sells is undefined
  }, [product.up_sells]);

 

  // Separate filtering for up-sells and cross-sells
  const upsellProducts = products.results.filter((relatedProduct) =>
    upsellsProducts.includes(relatedProduct.id)
  );
  

  if (!upsellProducts.length ) return null;

  

  
    return (
      <div className=" space-y-4 p-8">
      {upsellProducts.length > 0 && (
        <>
        <h3 className=" font-bold text-2xl">Up-sells</h3>
        <div className="grid grid-cols-4 gap-4 px-4  py-4">
      
             {upsellProducts.map(product => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className='group'
            >
              <div className='aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg  xl:aspect-w-7 xl:aspect-h-8'>
                <Image
                  src={product.images[0].file.url}
                  alt={product.description}
                  width={400}
                  height={400}
                  className='object-cover object-center transition-opacity group-hover:opacity-75'
                />
              </div>
              <h3 className='mt-4 text-sm text-stone-700'>{product.name}</h3>
              <p className='mt-1  font-medium text-stone-900 text-xs md:text-lg'>
                {formatCurrency({ amount: product.price })}
              </p>
            </Link>
          ))}
          </div>
          </>
        )}

        

      </div>
    );
  };
  
  export default RelatedProduct;

  
   

  