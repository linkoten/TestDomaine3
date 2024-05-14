'use client';

import { GraphQLClient } from 'graphql-request';
import Link from 'next/link';
import { RichText } from '@graphcms/rich-text-react-renderer';
import Map from '../../../components/dynamic';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Slash } from 'lucide-react';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge"
import { backInOut, motion, useScroll } from 'framer-motion';



const hygraph = new GraphQLClient(
    'https://api-eu-west-2.hygraph.com/v2/clkp6kxt31b6x01ta51b202ki/master'
);

const getPost = async (params) => {
    const { post } = await hygraph.request(
        `query PostPageQuery($slug: String!)  {
      post (where: { slug: $slug }) {
        slug
        title
        date
        tag
        
        content {
          json
          
        }
        carte {
          latitude
          longitude
        }
        localizations(includeCurrent: true) {
        slug
        title
        date
        tag
        markerInformation
        content {
          json

        }
        carte {
          latitude
          longitude
        }
      }
      }
    }`,
        {
            slug: params.slug,
        }
    );

    return post;
};

const renderers = {
    h1: ({ children }) => (
        <h1 className=' my-2 mb-4 flex items-center justify-center text-3xl font-bold text-blue-900   md:text-4xl lg:text-5xl'>
            {children}
        </h1>
    ),
    h2: ({ children }) => (
        <h2 className='  my-4 mb-4 flex items-center justify-center text-2xl font-bold text-cyan-900  md:text-3xl lg:text-4xl'>
            {children}
        </h2>
    ),
    h3: ({ children }) => (
        <h3 className='  my-4 mb-4 flex items-center justify-center text-xl font-bold text-emerald-900  md:text-3xl lg:text-3xl'>
            {children}
        </h3>
    ),
    h4: ({ children }) => (
        <h4 className=' my-2 text-xl font-bold text-zinc-900 '>
            {children}
        </h4>
    ),
    h5: ({ children }) => (
        <h5 className=' my-2 text-sm md:text-xl font-bold text-red-800'>
            {children}
        </h5>
    ),
    table: ({ children }) => (
        <table className=' text-center border md:w-1/2 md:mx-auto'>
            {children}
        </table>
    ),
    table_head: ({ children }) => (
        <thead className=' text-center bg-red-200 border-2 border-red-800'>
            {children}
        </thead>
    ),
    table_cell: ({ children }) => (
        <td className='   border border-red-800 text-xs px-2'>{children}</td>
    ),
    table_header_cell: ({ children }) => (
        <th className='  border text-green-800'>{children}</th>
    ),
    h6: ({ children }) => (
        <h6 className=' text-large my-2 font-bold text-zinc-900 '>
            {children}
        </h6>
    ),
    p: ({ children }) => (
        <p className=' my-4  text-xs md:text-lg text-black '>
            {children}
        </p>
    ),
    ul: ({ children }) => (
        <ul className=' my-4  list-inside list-disc text-lg text-black '>
            {children}
        </ul>
    ),
    ol: ({ children }) => (
        <ol className=' my-4  list-inside list-decimal text-lg text-black  '>
            {children}
        </ol>
    ),
    li: ({ children }) => (
        <li className='  my-2  text-lg text-black '>
            {children}
        </li>
    ),
    code: ({ children }) => (
        <code className='   rounded-md bg-base-300 p-2 text-sm'>
            {children}
        </code>
    ),
    code_block: ({ children }) => (
        <pre className='  overflow-y-scroll rounded-md bg-slate-300 p-2 text-sm '>
            {children}
        </pre>
    ),
    a: ({ href }) => (
        <a
            className='link:text-blue-500 my-4 text-lg text-blue-500 underline '
            href={href}
        ></a>
    ),
    img: ({ src, title }) => (
        <Image
            width={400}
            height={200}
            src={src}
            className='mx-auto py-2'
            alt={title}
        />
    ),
};

export default function Posts({ params }) {
    const [post, setPost] = useState(null); // État pour stocker le post
    const [language, setLanguage] = useState('english'); // État pour suivre la langue actuelle
    const { scrollYProgress } = useScroll();

    useEffect(() => {
        async function fetchPost() {
            try {
                const postData = await getPost(params);
                setPost(postData);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        }

        fetchPost();
    }, [params]);

    if (!post) {
        // Retournez un indicateur de chargement tant que les données ne sont pas chargées
        return <div>Loading...</div>;
    }

    const currentPosts =
        language === 'english'
            ? post.localizations[0]
            : post.localizations[1];

    const toggleLanguage = () => {
        setLanguage(language === 'english' ? 'french' : 'english');
    };

    return (
        
        <div className='mx-6 flex flex-col relative z-10 '>
        <motion.div initial={{ opacity: 0, scale: 0, x: 200 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 1, type: 'spring' }}>
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
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            {currentPosts.title}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            </motion.div>

            <Button className='btn btn-outline btn-info mx-6 mb-8'>
                {currentPosts.tag}{' '}
            </Button>

            <Map
                markers={currentPosts.carte}
                markerInformation={currentPosts.markerInformation}
            />

            <div className='flex justify-end'>
                <Button
                    className='btn btn-outline  mx-12 mt-8 sm:btn-lg'
                    onClick={toggleLanguage}
                >
                    (
                    {language === 'english'
                        ? 'Changer en Français'
                        : 'Switch To English'}
                    )
                </Button>
            </div>

            <div className=' flex items-center justify-center mt-8 space-x-8 '>
                <Button className='w-1/3'>
                    <Link className='w-full' href='/'>
                        Home
                    </Link>
                </Button>
                <Button className='w-1/3'>
                    <Link className='w-full' href='/blog'>
                        Blog
                    </Link>
                </Button>
            </div>

            <Badge className=' font-bold my-4 w-fit'>
                {currentPosts.date}
            </Badge>
            
            <RichText className="w-1/2"
                content={currentPosts.content.json.children}
                renderers={renderers}
            />
        </div>
    );
}
