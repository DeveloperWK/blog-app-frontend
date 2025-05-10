

import Image from 'next/image'
import Link from 'next/link'

function BookmarkList({ bookmarks = [], onRemoveBookmark }) {
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold text-white mb-6">Your Bookmarks</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookmarks.length === 0 ? (
                    <p className="text-gray-400 text-lg">No bookmarks yet.</p>
                ) : (
                    bookmarks.map((bookmark) => (
                        <div
                            key={bookmark._id}
                            className="bg-gray-900 rounded-xl overflow-hidden shadow-lg flex flex-col"
                        >
                            <Image
                                src={bookmark.post.image || '/placeholder.jpg'}
                                alt={bookmark.post.title}
                                width={500}
                                height={300}
                                className="object-cover w-full h-48"
                            />
                            <div className="p-4 flex flex-col flex-grow justify-between">
                                <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
                                    {bookmark.post.title}
                                </h3>
                                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                                    {bookmark.post.body?.slice(0, 100)}...
                                </p>

                                <div className="mt-auto flex items-center justify-between gap-2">
                                    <Link
                                        href={`/blog/${bookmark.post._id}`}
                                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition"
                                    >
                                        Go to Post
                                    </Link>
                                    <button
                                        onClick={() => onRemoveBookmark(bookmark._id)}
                                        className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg transition"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
export default BookmarkList