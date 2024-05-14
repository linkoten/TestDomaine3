'use client';

import { useState, useTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useSWRConfig } from 'swr';

import clsx from 'clsx';

import { Disclosure, Tab } from '@headlessui/react';
import { StarIcon } from '@heroicons/react/20/solid';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { formatCurrency } from '@/lib/utils/index';
import { addToCart } from '@/lib/swell/cart';
import { Blinker } from '@/components/ui/loading';
import { Slash } from 'lucide-react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { backInOut, motion } from 'framer-motion';

const details = [
    {
        name: 'Features',
        items: [
            'Multiple strap configurations',
            'Spacious interior with top zip',
            'Leather handle and tabs',
            'Interior dividers',
            'Stainless strap loops',
            'Double stitched construction',
            'Water-resistant',
        ],
    },
];

const Product = ({ frenchProduct, englishProduct, page }) => {
    const router = useRouter();
    const { mutate } = useSWRConfig();
    const [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState(frenchProduct);
    const [currentLanguage, setCurrentLanguage] = useState('fr'); // État pour suivre la langue actuelle

    const toggleLanguage = () => {
        // Toggle entre 'fr' et 'en' en fonction de la valeur actuelle de currentLanguage
        const newLanguage = currentLanguage === 'fr' ? 'en' : 'fr';
        setCurrentLanguage(newLanguage);
    };

    useEffect(() => {
        // Mettre à jour product en fonction de la langue actuelle
        if (currentLanguage === 'fr') {
            setProduct(frenchProduct);
        } else {
            setProduct(englishProduct);
        }
    }, [currentLanguage, frenchProduct, englishProduct]);

    const isMutating = loading || isPending;

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        await addToCart({
            product_id: product.id,
            quantity: 1,
        });
        setLoading(false);
        mutate('cart');
        startTransition(() => {
            router.refresh();
        });
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0, x: 200 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 1, type: 'spring' }}
            >
                <Breadcrumb className='p-8'>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href='/'>
                                Home
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink href='/products'>
                                Products
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={product.slug}>
                                {product.name}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0, x: 1000 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{
                                duration: 1,
                                type: 'spring',
                            }}
                            viewport={{ once: true }}
                            className='flex justify-end'>
                <Button
                    onClick={toggleLanguage}
                    className='btn btn-outline mx-12 mt-8 sm:btn-lg'
                >
                    {currentLanguage === 'fr'
                        ? 'Switch to English'
                        : 'Changer en Français'}
                </Button>
            </motion.div>
            <div className='py-18 '>
                <div className='container border-b-2 border-zinc-800'>
                    <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
                        {/* Image gallery */}
                        <Tab.Group
                            as='div'
                            className='flex flex-col-reverse'
                        >
                            {/* Image selector */}
                            <div className='mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none'>
                                <Tab.List className='grid grid-cols-4 gap-6 pb-8'>
                                    {product.images.map(
                                        (image, i) => (
                                            <Tab
                                                key={image.id}
                                                className='relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-stone-900 hover:bg-stone-50 focus:outline-none'
                                            >
                                                {({ selected }) => (
                                                    <>
                                                        <motion.span
                                                            initial={{
                                                                opacity: 0,
                                                                scale: 0,
                                                                y: 200,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                scale: 1,
                                                                y: 0,
                                                            }}
                                                            transition={{
                                                                duration: 0.1,
                                                                type: 'spring',
                                                                delay:
                                                                    i *
                                                                    0.1,
                                                            }}
                                                            viewport={{
                                                                once: true,
                                                            }}
                                                            className='sr-only'
                                                        >
                                                            {' '}
                                                            {
                                                                image
                                                                    ?.file
                                                                    ?.metadata
                                                            }{' '}
                                                        </motion.span>
                                                        <motion.span
                                                            initial={{
                                                                opacity: 0,
                                                                scale: 0,
                                                                y: 200,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                scale: 1,
                                                                y: 0,
                                                            }}
                                                            transition={{
                                                                duration: 0.1,
                                                                type: 'spring',
                                                                delay:
                                                                    i *
                                                                    0.1,
                                                            }}
                                                            viewport={{
                                                                once: true,
                                                            }}
                                                            className='absolute inset-0 overflow-hidden rounded-md '
                                                        >
                                                            <Image
                                                                alt=''
                                                                height={
                                                                    400
                                                                }
                                                                width={
                                                                    400
                                                                }
                                                                src={
                                                                    image
                                                                        ?.file
                                                                        ?.url
                                                                }
                                                                className='h-full w-full object-cover object-center '
                                                            />
                                                        </motion.span>
                                                        <span
                                                            className={clsx(
                                                                selected
                                                                    ? 'ring-sky-500'
                                                                    : 'ring-transparent',
                                                                'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2 '
                                                            )}
                                                            aria-hidden='true'
                                                        />
                                                    </>
                                                )}
                                            </Tab>
                                        )
                                    )}
                                </Tab.List>
                            </div>

                            <Tab.Panels className='aspect-w-1 aspect-h-1 w-full'>
                                {product.images?.map((image) => (
                                    <Tab.Panel key={image.id}>
                                        <motion.span
                                            initial={{
                                                opacity: 0,
                                                scale: 0,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                            }}
                                            transition={{
                                                duration: 0.5,
                                            }}
                                            viewport={{ once: true }}
                                        >
                                            <Image
                                                height={1000}
                                                width={1000}
                                                src={image.file.url}
                                                alt={
                                                    image.file
                                                        .metadata ||
                                                    ''
                                                }
                                                className='h-full w-full object-cover object-center sm:rounded-lg'
                                            />
                                        </motion.span>
                                    </Tab.Panel>
                                ))}
                            </Tab.Panels>
                        </Tab.Group>

                        {/* Product info */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0, x: 200 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{
                                duration: 1,
                                type: 'spring',
                            }}
                            viewport={{ once: true }}
                            className='mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0'
                        >
                            <h1 className='text-3xl font-bold tracking-tight text-stone-900'>
                                {product.name}
                            </h1>

                            <div className='mt-3'>
                                <h2 className='sr-only'>
                                    Product information
                                </h2>
                                <p className='text-3xl tracking-tight text-stone-900'>
                                    {formatCurrency({
                                        amount: product.price,
                                    })}
                                </p>
                            </div>

                            {/* Reviews */}
                            <div className='mt-3'>
                                <h3 className='sr-only'>Reviews</h3>
                                <div className='flex items-center'>
                                    <div className='flex items-center'>
                                        {[0, 1, 2, 3, 4].map(
                                            (rating) => (
                                                <StarIcon
                                                    key={rating}
                                                    className={clsx(
                                                        (product.rating ||
                                                            4) >
                                                            rating
                                                            ? 'text-yellow-500'
                                                            : 'text-stone-300',
                                                        'h-5 w-5 flex-shrink-0'
                                                    )}
                                                    aria-hidden='true'
                                                />
                                            )
                                        )}
                                    </div>
                                    <p className='sr-only'>
                                        {product.rating} out of 5
                                        stars
                                    </p>
                                </div>
                            </div>

                            <div className='mt-6'>
                                <h3 className='sr-only'>
                                    Description
                                </h3>

                                <div
                                    className='space-y-6 text-base text-stone-700'
                                    dangerouslySetInnerHTML={{
                                        __html: product.description,
                                    }}
                                />
                            </div>

                            <form
                                className='mt-6'
                                onSubmit={handleSubmit}
                            >
                                <div className='sm:flex-col-1 mt-10 flex'>
                                    <Button
                                        type='submit'
                                        disabled={isMutating}
                                        className='flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-sky-600 py-3 px-8 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-stone-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-full'
                                        onClick={() =>
                                            toast(
                                                'Le Produit a été ajouté au panier',
                                                {
                                                    description:
                                                        product.name,
                                                    action: {
                                                        label: 'Undo',
                                                        onClick: () =>
                                                            console.log(
                                                                'Undo'
                                                            ),
                                                    },
                                                }
                                            )
                                        }
                                    >
                                        {isMutating ? (
                                            <Blinker />
                                        ) : (
                                            'Add to Cart'
                                        )}
                                    </Button>
                                </div>
                            </form>

                            <section
                                aria-labelledby='details-heading'
                                className='mt-12'
                            >
                                <h2
                                    id='details-heading'
                                    className='sr-only'
                                >
                                    Additional details
                                </h2>

                                <div className='divide-y divide-stone-200 border-t'>
                                    {details?.map((detail) => (
                                        <Disclosure
                                            as='div'
                                            key={detail.name}
                                        >
                                            {({ open }) => (
                                                <>
                                                    <h3>
                                                        <Disclosure.Button className='group relative flex w-full items-center justify-between py-6 text-left'>
                                                            <span
                                                                className={clsx(
                                                                    open
                                                                        ? 'text-sky-600'
                                                                        : 'text-stone-900',
                                                                    'text-sm font-medium'
                                                                )}
                                                            >
                                                                {
                                                                    detail.name
                                                                }
                                                            </span>
                                                            <span className='ml-6 flex items-center'>
                                                                {open ? (
                                                                    <MinusIcon
                                                                        className='block h-6 w-6 text-sky-400 group-hover:text-sky-500'
                                                                        aria-hidden='true'
                                                                    />
                                                                ) : (
                                                                    <PlusIcon
                                                                        className='block h-6 w-6 text-stone-400 group-hover:text-stone-500'
                                                                        aria-hidden='true'
                                                                    />
                                                                )}
                                                            </span>
                                                        </Disclosure.Button>
                                                    </h3>
                                                    <Disclosure.Panel
                                                        as='div'
                                                        className='prose prose-sm pb-6'
                                                    >
                                                        <ul role='list'>
                                                            {detail.items.map(
                                                                (
                                                                    item
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            item
                                                                        }
                                                                    >
                                                                        {
                                                                            item
                                                                        }
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    ))}
                                </div>
                            </section>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Product;
