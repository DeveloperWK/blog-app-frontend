import WriterCard from "@/app/components/WriterCard";

const WritersPage = () => {
    const writer = {
        name: 'J.J. Abrams',
        role: 'Head Writer & Producer',
        bio: 'Known for blending mystery and action, J.J. Abrams has created some of the most iconic TV and film series.',
        avatarUrl: 'https://example.com/jjabrams.jpg',
    };

    return (
        <div className="min-h-screen bg-gray-800 p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-6 text-center underline">Our Writers</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <WriterCard key={i} {...writer} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WritersPage;
