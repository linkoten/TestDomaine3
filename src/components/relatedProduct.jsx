"use client";

import { useEffect, useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils/index';

const RelatedProduct = ({ product, products }) => {

    console.log(product)

  const [upsellsProducts, setUpsellsProducts] = useState([]);
  const [crosssellsProducts, setCrosssellsProducts] = useState([]);
  const [discountProduct, setDiscountProduct] = useState([]);
  useEffect(() => {
    const upsellsIds = product.up_sells?.map((upsell) => upsell.product_id);
    setUpsellsProducts(upsellsIds || []); // Set empty array if up_sells is undefined
  }, [product.up_sells]);

  useEffect(() => {
    const crosssellsIds = product.cross_sells?.map((crosssell) => crosssell.product_id);
    const discounts = product.cross_sells?.map((crosssell) => crosssell.discount_percent);
    setCrosssellsProducts(crosssellsIds || []); // Set empty array if cross_sells is undefined
    setDiscountProduct(discounts || [])
  }, [product.cross_sells]);

  // Separate filtering for up-sells and cross-sells
  const upsellProducts = products.results.filter((relatedProduct) =>
    upsellsProducts.includes(relatedProduct.id)
  );
  const crosssellProducts = products.results.filter((relatedProduct) =>
    crosssellsProducts.includes(relatedProduct.id)
  );

  if (!upsellProducts.length && !crosssellProducts.length) return null;

  const applyDiscount = (price, discountPercent) => {
    if (!discountPercent) return price; // Handle cases where discount is undefined
    const discountAmount = price * (discountPercent / 100);
    return price - discountAmount;
  };

  console.log(discountProduct)

  
    return (
      <div className=" space-y-4 p-8">
      {upsellProducts.length > 0 && (
        <>
        <h3 className=" font-bold text-2xl">Up-sells</h3>
        <div className="grid grid-cols-4 gap-4 px-4 bg-orange-200 py-4">
      
             {upsellProducts.map(product => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className='group'
            >
              <div className='aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-orange-200 xl:aspect-w-7 xl:aspect-h-8'>
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

        {crosssellProducts.length > 0 && (
        <>
        <h3 className=" font-bold text-2xl">Cross-sells</h3>
        <div className="grid grid-cols-4 gap-4 px-4 bg-orange-200 py-8">
      
             {crosssellProducts.map((product, index) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className='group'

            >
              <div className='aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-orange-200 '>
                <Image
                  src={product.images[0].file.url}
                  alt={product.description}
                  width={400}
                  height={400}
                  className='object-cover object-center transition-opacity group-hover:opacity-75'
                />
              </div>
              <h3 className='mt-4 text-sm text-stone-700'>{product.name}</h3>
              <div className="flex justify-between">

              <p className='mt-1 text-xs font-medium text-red-500 line-through md:text-xl'>
                {formatCurrency({ amount: product.price })}
              </p>
              <p className="mt-1 text-xs font-medium text-emerald-600 md:text-xl">
                  {formatCurrency({
                    amount: product.price - (product.price * (discountProduct[index] || 0)) / 100,
                  })}
                </p>
                </div>
            </Link>
          ))}
          </div>
          </>
        )}


      </div>
    );
  };
  
  export default RelatedProduct;

  
   

  