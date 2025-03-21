// create header content

import { sanityFetch } from '@/sanity/live';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from "@/sanity/client";


const HEADER_QUERY = `*[_type == "siteSettings" && _id == "siteSettings"][0]{ siteTitle, logo, header }`;


export default async function Header() {

    const { data: siteSettings } = await sanityFetch({ query: HEADER_QUERY });

    if (!siteSettings) {
        notFound();
    }

    const { siteTitle, logo, header }: {
        siteTitle?: string;
        logo?: { asset?: { _ref: string }; url?: string; alt?: string; width?: number; height?: number };
        header?: { menuItems?: { title: string; subMenu?: { title: string; link: string }[] }[] };
    } = siteSettings;

    console.log(header);
    return (
        <header className="bg-gray-100 p-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="flex flex-row gap-4 items-center">
                        <Image
                            src={logo?.asset?._ref ? urlFor({ asset: { _ref: logo.asset._ref, _type: "reference" } }).url() || '' : logo?.url || ''}
                            alt={logo?.alt || 'Post Image'}
                            width={logo?.width || 800}
                            height={logo?.height || 600}
                            priority
                        />
                        <h1 className="text-2xl font-bold">{siteTitle}</h1>
                    </div>
                </div>
                <nav>
                    <ul className="flex space-x-4">
                        {header?.menuItems?.map((menuItem: { title: string; subMenu?: { title: string; link: string }[] }) => (
                            <li key={menuItem.title} className="relative group">
                                <Link href={`/${menuItem.title.toLowerCase()}`}>
                                    {menuItem.title}
                                </Link>
                                {menuItem.subMenu && menuItem.subMenu.length > 0 && (
                                    <ul className="absolute left-0 mt-2 bg-white border border-gray-200 shadow-lg hidden group-hover:block">
                                        {menuItem.subMenu.map((subMenuItem) => (
                                            <li key={subMenuItem.title}>
                                                {subMenuItem.link ? (
                                                    <Link href={subMenuItem.link} className="block px-4 py-2 hover:bg-gray-100">
                                                        {subMenuItem.title}
                                                    </Link>
                                                ) : (
                                                    <span className="block px-4 py-2 text-gray-500">
                                                        {subMenuItem.title}
                                                    </span>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
}