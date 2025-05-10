import BackToTop from "@/app/components/BackToTop";
import CommentSection from "@/app/components/CommentSections";
import HeroText from "@/app/components/HeroText";
import Paragraph from "@/app/components/Paragraph";
import Image from "next/image";

export async function generateMetadata({ params }) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URI}blog-post/${id}`
  );
  const data = await res.json();

  const title = `CodeVerse | ${data?.post?.title}` || "Blog Post";
  const description = data?.post?.body || "Read this blog post to learn more.";
  const imageUrl = data?.post?.image || "/default-image.jpg";

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URI),
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
const BlogPost = async ({ params }) => {
  const { id } = await params;
  let post = {};
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URI}blog-post/${id}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch blog post");
    }

    post = await res.json();
  } catch (error) {
    console.error(error);
    return (
      <section className="min-h-screen flex flex-col justify-center px-4 py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto w-full space-y-6">
          <div className="bg-red-500 text-white p-4 rounded-lg shadow-md">
            <p className="font-semibold">Oops! Something went wrong.</p>
            <p>We couldn&apos;t load the blog post. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-bg text-white">
      <Image
        src={post?.post?.image}
        alt={post?.post?.title}
        width={1200}
        height={630}
        className="w-full rounded-xl mb-8 object-cover shadow-lg"
        quality={100}
      />
      <HeroText>{post?.post?.title}</HeroText>
      <div className="flex items-center gap-4 mb-10 mt-4">
        <Image
          src={post?.post?.author?.avatar || "/logo.jpg"}
          alt="Author"
          width={50}
          height={50}
          className="rounded-full border border-gray-700 shadow-sm"
        />
        <div>
          <p className="text-lg font-semibold text-gray-200">
            {post?.post?.author?.firstName || "Owner"}
          </p>
          <p className="text-sm text-gray-400">
            {post?.post?.updatedAt
              ? new Date(post?.post?.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Date Not Available"}
          </p>
        </div>
      </div>

      <div className="prose prose-invert max-w-none text-lg leading-relaxed">
        <Paragraph>{post?.post?.body}</Paragraph>
      </div>
      <BackToTop />
      <div className="flex justify-center mt-10">
        <CommentSection postId={id} />
      </div>
    </main>
  );
};
export default BlogPost;
