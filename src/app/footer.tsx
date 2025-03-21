// create footer content

import { sanityFetch } from "@/sanity/live";
import { notFound } from "next/navigation";
import Link from "next/link";   

const FOOTER_QUERY = `*[_type == "siteSettings" && _id == "siteSettings"][0]{ siteTitle, logo, footer }`;

export default async function Footer() {

    const { data: siteSettingsFooter } = await sanityFetch({ query: FOOTER_QUERY });
    
    if (!siteSettingsFooter) {
        notFound();
    }    
    const { siteTitle, footer }: {
        siteTitle?: string;
        footer?: { socialLinks?: { url: string; name: string }[] };
    } = siteSettingsFooter;
    console.log(siteSettingsFooter);
    return (
        <footer className="bg-gray-100 p-8 ">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-amber-950">{siteTitle}</h1> 
                    </div>
                </div>
                <div>
                    <p>{siteSettingsFooter?.footer?.footerText}</p>
                </div>
                <nav>
                    <ul className="flex space-x-4">
                        {footer?.socialLinks?.map((socialLink: { url: string; name: string }) => (
                            <li key={socialLink.url}>
                                <Link href={`/${socialLink.url}`}>
                                    {socialLink.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </footer>
    );
}