import { Card, CardContent } from "@/components/ui/card";
import { client, urlFor } from "./lib/sanity"
import Image from "next/image"
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getData() {
  const query = `
  *[_type == 'blog'] | order(_createdAt desc){
    title,
      smallDescription,
      "currentSlug": slug.current,
      titleImage
  }
  `;
  const data = await client.fetch(query)
  return data;
}
export default async function Home() {
  const data = await getData()
  console.log(data)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
      {data.map((post, idx) => (
        <Card key={idx} >
          <Image src={urlFor(post.titleImage).url()} alt="image" width={500} height={500} className="rounded-t-lg  h-[200px] object-cover" />
          <CardContent className='mt-5'>
            <h3 className="line-clamp-2 text-lg dark:text-gray-200 font-bold ">{post.title}</h3>
            <p className="mt-2 dark:text-gray-300 text-sm line-clamp-3">{post.smallDescription}</p>
            <Button asChild className='w-full mt-7'>
              <Link href={`/blog/${post.currentSlug}`}>
                Read More
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}

    </div>
  )
}
