'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BlogFilter from '../blogFilter'; // Assurez-vous que le chemin est correct
import { Slash } from 'lucide-react';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Badge } from '../ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default function Page({ page, posts }) {
    const [filter, setFilter] = useState('');
    const [language, setLanguage] = useState('english'); // État pour suivre la langue actuelle
    const englishOptions = [
        'Show',
        'Collection',
        'Excavation',
        'Deposit',
    ];
    const frenchOptions = [
        'Salon',
        'Collection',
        'Fouille',
        'Gisement',
    ];

    const currentOptions =
        language === 'english' ? englishOptions : frenchOptions;

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    const englishPosts = posts.map((post) => post.localizations[0]);
    const frenchPosts = posts.map((post) => post.localizations[1]);
    const currentPosts =
        language === 'english' ? englishPosts : frenchPosts;

    const filteredPosts = filter
        ? currentPosts.filter((post) => post.tag === filter)
        : currentPosts;

    return (
        <>
            <Breadcrumb className='p-8'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/blog'>
                            Blog
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className='h-full py-12'>
                <div className='container'>
                    <h1 className='text-2xl font-semibold '>
                        Articles
                    </h1>

                    <BlogFilter
                        page={page}
                        options={currentOptions}
                        initialFilter={filter}
                        onFilterChange={handleFilterChange}
                    />
                    <div className='mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3  xl:gap-x-8'>
                        {filteredPosts.map(
                            ({
                                slug,
                                date,
                                id,
                                title,
                                coverImage,
                                tag,
                                excerpt,
                            }) => (
                                <Link
                                    key={id}
                                    href={`/blog/${slug}`}
                                    className='group'
                                >
                                    <Card className="relative">
                                        <CardHeader >
                                            <CardTitle>
                                                {title}
                                            </CardTitle>
                                            <CardDescription>
                                                {coverImage && (
                                                    <span >
                                                        {coverImage.url && (
                                                            <Image
                                                                src={
                                                                    coverImage.url
                                                                }
                                                                alt={
                                                                    title
                                                                }
                                                                width={
                                                                    coverImage.width
                                                                }
                                                                height={
                                                                    coverImage.height
                                                                }
                                                                priority={
                                                                    true
                                                                }
                                                                className='h-full w-full object-cover object-center transition-opacity group-hover:opacity-75'
                                                            />
                                                        )}
                                                    </span>
                                                )}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent  >
                                        {excerpt}
                                            
                                        </CardContent>
                                        <CardFooter className="absolute bottom-0 left-0 space-x-2">
                                            <Badge className=' text-[8px] sm:text-xs '>
                                                {tag}
                                            </Badge>
                                            <Badge className=' text-[8px] sm:text-xs'>
                                                {date}
                                            </Badge>
                                        </CardFooter>
                                    </Card>
                                </Link>
                            )
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}