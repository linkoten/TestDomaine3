'use client';

import React, { useEffect, useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils/index';
import Image from 'next/image';
import Pagination from './pagination';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slash } from 'lucide-react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useAnimate, stagger, motion } from 'framer-motion';

export default function ProductsFilter({ products, attributes }) {
    const [price, setPrice] = useState('');
    const [country, setCountry] = useState('');
    const [locality, setLocality] = useState('');
    const [period, setPeriod] = useState('');
    const [stages, setStages] = useState('');
    const [category, setCategory] = useState(''); // Utilisez une variable distincte pour stocker les données des catégories
    const [sorting, setSorting] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(100);

    const sortedProducts = products.sort((a, b) => {
        if (sorting === 'asc') {
            return a.price - b.price; // Tri ascendant
        } else if (sorting === 'desc') {
            return b.price - a.price; // Tri descendant
        } else {
            return 0; // Pas de tri
        }
    });

    const filteredProducts = products
        .filter((product) => {
            // Filtrer par prix
            switch (price) {
                case '0-100':
                    return product.price >= 0 && product.price <= 100;
                case '100-200':
                    return (
                        product.price >= 100 && product.price <= 200
                    );
                case '200-500':
                    return (
                        product.price >= 200 && product.price <= 500
                    );
                case '500-1000':
                    return (
                        product.price >= 500 && product.price <= 1000
                    );
                case '1000+':
                    return product.price >= 1000;
                default:
                    return true;
            }
        })
        .filter((product) => {
            // Filtrer par pays
            if (country !== '') {
                return product.attributes.country.value === country;
            } else {
                return true;
            }
        })
        .filter((product) => {
            // Filtrer par localité
            if (locality !== '') {
                return product.attributes.locality.value === locality;
            } else {
                return true;
            }
        })
        .filter((product) => {
            // Filtrer par période
            if (period !== '') {
                return product.attributes.period.value === period;
            } else {
                return true;
            }
        })
        .filter((product) => {
            // Filtrer par étages
            if (stages !== '') {
                return product.attributes.stages.value === stages;
            } else {
                return true;
            }
        })
        .filter((product) => {
            // Filtrer par catégorie
            if (category !== '') {
                return product.attributes.category.value === category;
            } else {
                return true;
            }
        })
        .filter((val) => {
            return val.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
        });

    const handlePriceFilter = (event) => {
        const range = event.target.value;
        setPrice(range);
    };

    const handleSortingChange = (event) => {
        setSorting(event.target.value);
    };

    const handleSearchTerm = (e) => {
        let value = e.target.value;
        setSearchTerm(value);
    };

    const sortedAttributeValues = {};

    // Triez les valeurs pour chaque attribut que vous souhaitez trier.
    ['Category', 'Country', 'Locality', 'Period', 'Stages'].forEach(
        (attributeName) => {
            const values = attributes
                .filter(
                    (attribute) =>
                        attribute &&
                        attribute.name === attributeName &&
                        Array.isArray(attribute.values)
                )
                .flatMap((attribute) => attribute.values)
                .filter((value) => value !== '') // Filtrer les valeurs vides
                .sort((a, b) => a.localeCompare(b)); // Trier par ordre alphabétique

            sortedAttributeValues[attributeName] = values;
        }
    );

    const sortedCategoryValues = sortedAttributeValues['Category'];
    const sortedCountryValues = sortedAttributeValues['Country'];
    const sortedLocalityValues = sortedAttributeValues['Locality'];
    const sortedPeriodValues = sortedAttributeValues['Period'];
    const sortedStagesValues = sortedAttributeValues['Stages'];

    // Get current posts
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <motion.div
                initial={{ opacity: 0, scale: 0, x: -200 }}
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
                    </BreadcrumbList>
                </Breadcrumb>
            </motion.div>

            <div className=' m-5 rounded-xl'>
                <div className='flex justify-center'>
                    <div className=' text-xs md:text-base  flex justify-center divide-doubled h-128px w-2/3 xl:w-full rounded-lg  mt-10 '>
                        <div className='     grid grid-cols-2   space-x-2 space-y-2  sm:grid-cols-2 xl:grid-cols-8 lg:mx-8'>
                            <div className='flex justify-center pl-2 pt-2 '>
                                <select
                                    id='category'
                                    className='w-full uppercase  hover:brightness-75 hover:ring-blue-600 hover:ring-2  transition ease-in-out delay-150 hover:-tranzinc-y-1  duration-300 bg-zinc-200 border-zinc-600  border-2 rounded-lg '
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                    value={category}
                                >
                                    <option
                                        className=' font-bold text-left  '
                                        value=''
                                    >
                                        {' '}
                                        Categorie{' '}
                                    </option>
                                    {sortedCategoryValues.map(
                                        (value) => (
                                            <option
                                                className='font-style: font-semibold italic text-left'
                                                key={value}
                                                value={value}
                                            >
                                                {value}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>
                            <div className=' flex justify-center'>
                                <select
                                    className=' w-full uppercase hover:bg-zinc-500 hover:ring-blue-600 hover:ring-2  transition ease-in-out delay-150 hover:-tranzinc-y-1  duration-300 bg-zinc-200 border-zinc-600  border-2 rounded-lg '
                                    id='price-range'
                                    value={price}
                                    onChange={handlePriceFilter}
                                >
                                    <option
                                        className='font-bold text-left '
                                        value=''
                                    >
                                        Prix
                                    </option>
                                    <option
                                        className='font-style: font-semibold italic text-left '
                                        value='0-100'
                                    >
                                        0 - 100
                                    </option>
                                    <option
                                        className='font-style: font-semibold italic text-left'
                                        value='100-200'
                                    >
                                        100 - 200
                                    </option>
                                    <option
                                        className='font-style: font-semibold italic text-left'
                                        value='200-500'
                                    >
                                        200 - 500
                                    </option>
                                    <option
                                        className='font-style: font-semibold italic text-left'
                                        value='500-1000'
                                    >
                                        500 - 1000
                                    </option>
                                    <option
                                        className='font-style: font-semibold italic text-left'
                                        value='1000+'
                                    >
                                        1000 et plus
                                    </option>
                                </select>
                            </div>

                            <div className='flex justify-center'>
                                <label
                                    htmlFor='country'
                                    className=' dark:text-gray-200 flex justify-center font-bold'
                                ></label>
                                <select
                                    id='country'
                                    className='w-full uppercase hover:bg-zinc-500 hover:ring-blue-600 hover:ring-2  transition ease-in-out delay-150 hover:-tranzinc-y-1  duration-300 bg-zinc-200 border-zinc-600  border-2 rounded-lg'
                                    onChange={(e) =>
                                        setCountry(e.target.value)
                                    }
                                    value={country}
                                    autoComplete='country'
                                >
                                    <option
                                        className=' font-bold text-left rounded-lg'
                                        value=''
                                    >
                                        Pays
                                    </option>

                                    {sortedCountryValues.map(
                                        (value) => (
                                            <option
                                                className='font-style: font-semibold italic text-left rounded-lg'
                                                key={value}
                                                value={value}
                                            >
                                                {value}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>

                            <div className='flex justify-center'>
                                <label
                                    htmlFor='locality'
                                    className=' dark:text-gray-200 flex justify-center font-bold '
                                ></label>
                                <select
                                    id='locality'
                                    className='w-full uppercase hover:bg-zinc-500 hover:ring-blue-600 hover:ring-2  transition ease-in-out delay-150 hover:-tranzinc-y-1  duration-300 bg-zinc-200 border-zinc-600  border-2 rounded-lg '
                                    onChange={(e) =>
                                        setLocality(e.target.value)
                                    }
                                    value={locality}
                                    autoComplete='locality'
                                >
                                    <option
                                        className='font-bold text-left'
                                        value=''
                                    >
                                        Localité
                                    </option>

                                    {sortedLocalityValues.map(
                                        (value) => (
                                            <option
                                                className='font-style: font-semibold italic text-left'
                                                key={value}
                                                value={value}
                                            >
                                                {value}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>
                            <div className='flex justify-center'>
                                <label
                                    htmlFor='period'
                                    className=' dark:text-gray-200 flex justify-center font-bold '
                                ></label>
                                <select
                                    id='period'
                                    className='w-full uppercase hover:bg-zinc-500 hover:ring-blue-600 hover:ring-2  transition ease-in-out delay-150 hover:-tranzinc-y-1  duration-300 bg-zinc-200 border-zinc-600  border-2 rounded-lg '
                                    onChange={(e) =>
                                        setPeriod(e.target.value)
                                    }
                                    value={period}
                                >
                                    <option
                                        className='font-bold text-left'
                                        value=''
                                    >
                                        Période
                                    </option>

                                    {sortedPeriodValues.map(
                                        (value) => (
                                            <option
                                                className='font-style: font-semibold italic text-left'
                                                key={value}
                                                value={value}
                                            >
                                                {value}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>
                            <div className='flex justify-center'>
                                <label
                                    htmlFor='stages'
                                    className=' dark:text-gray-200 flex justify-center font-bold '
                                ></label>
                                <select
                                    id='stages'
                                    className='w-full uppercase hover:bg-zinc-500 hover:ring-blue-600 hover:ring-2  transition ease-in-out delay-150 hover:-tranzinc-y-1  duration-300 bg-zinc-200 border-zinc-600  border-2 rounded-lg '
                                    onChange={(e) =>
                                        setStages(e.target.value)
                                    }
                                    value={stages}
                                >
                                    <option
                                        className='font-bold text-left'
                                        value=''
                                    >
                                        Etages
                                    </option>

                                    {sortedStagesValues.map(
                                        (value) => (
                                            <option
                                                className='font-style: font-semibold italic text-left'
                                                key={value}
                                                value={value}
                                            >
                                                {value}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>
                            <div className='col-span-2 flex justify-center font-bold  sm:col-span-2   sm:items-end'>
                                <select
                                    id='sorting'
                                    className='w-full uppercase hover:bg-zinc-500 hover:ring-blue-600 hover:ring-2  transition ease-in-out delay-150 hover:-tranzinc-y-1  duration-300 bg-zinc-200 border-zinc-600  border-2 rounded-lg '
                                    value={sorting}
                                    onChange={handleSortingChange}
                                >
                                    <option
                                        className=' font-style: font-semibold italic text-left'
                                        value='date'
                                    >
                                        Date de Création
                                    </option>
                                    <option
                                        className=' font-style: font-semibold italic text-left'
                                        value='asc'
                                    >
                                        Tri ascendant
                                    </option>
                                    <option
                                        className=' font-style: font-semibold italic text-left'
                                        value='desc'
                                    >
                                        Tri descendant
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='  h-full w-full font-bold'>
                    <div className='container '>
                        <div className=' flex justify-center bg-zinc-50 mt-8 '>
                            <Input
                                type='text'
                                name='searchBar'
                                id='searchBar'
                                placeholder='Search'
                                onChange={handleSearchTerm}
                                className='bg-zinc-50 placeholder:text-zinc-900'
                            />
                        </div>

                        <div className='   mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 xl:gap-x-8'>
                            {currentProducts.map((product, i) => (
                                <Link
                                    key={product.id}
                                    href={`/products/${product.slug}`}
                                    className='group'
                                >
                                    <div className='transition ease-in-out delay-150 hover:-tranzinc-y-1 hover:scale-110 duration-300 hover:bg-zinc-50 hover:ring-blue-600 hover:ring-2 rounded-lg'>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{opacity: 1}}
                                            transition={{
                                                duration: 0.1,
                                                type: 'spring',
                                                delay: i * 0.1
                                            }}
                                            viewport={{ once: true }}
                                            className=' block  relative w-full overflow-hidden rounded-lg h-40 '
                                        >
                                            <Image
                                                src={
                                                    product.images[0]
                                                        .file.url
                                                }
                                                alt={
                                                    product.description
                                                }
                                                fill
                                                sizes='(min-width: 1024px) 50vw, 100vw'
                                                className='h-full w-full object-cover object-center transition-opacity group-hover:opacity-75'
                                            />
                                        </motion.div>
                                        <h3 className='text-zinc-800 mt-4 text-sm'>
                                            {product.name}
                                        </h3>
                                        <p className='text-zinc-950 mt-1 text-lg font-medium'>
                                            {formatCurrency({
                                                amount: product.price,
                                            })}
                                        </p>
                                        <p
                                            className={`text-lg  flex justify-end pb-2 pr-2  ${
                                                product.stock_level >=
                                                1
                                                    ? ' text-emerald-600'
                                                    : ' text-red-600'
                                            }`}
                                        >
                                            {product.stock_level >= 1
                                                ? `Stock: ${product.stock_level}`
                                                : 'out of stock'}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Pagination
                productsPerPage={productsPerPage}
                totalProducts={products.length}
                paginate={paginate}
            />
        </div>
    );
}
