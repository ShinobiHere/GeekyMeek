import { client, urlFor } from "@/app/lib/sanity"
import { PortableText } from "next-sanity"
import Image from "next/image"
export const revalidate = 5;
async function getData(slug) {
    const query = `
    *[_type == 'blog' && slug.current == "${slug}"]{
        "currentSlug": slug.current,
          title,
          content,
          titleImage
    }[0]
    `
    const data = await client.fetch(query)
    return data
}
export default async function BlogArticle({ params }) {
    const data = await getData(params.slug)
    console.log(data)
    return (
        <div className="mt-5">
            <h1>
                <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">Geeky - Blogs</span>
                <span className="mt-3 block lg:text-2xl text-center leading-8 font-bold tracking-tighter  sm:text-4xl" >{data.title}</span>
            </h1>
            <Image src={urlFor(data.titleImage).url()} alt="image" priority width={800} height={800}
                className="w-full rounded-lg border mt-8" />
            <div className="mt-16 prose prose-headings:h2  prose-a:text-red prose-red prose-li:marker:text-primary dark:prose-invert">
                <PortableText value={data.content} />
            </div>

        </div>
    )
}