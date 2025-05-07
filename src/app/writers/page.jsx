import WriterGrid from "@/app/components/WriterGrid";

const WritersPage = () => {
    return (
        <div className="min-h-screen bg-gray-800 p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-6 text-center underline">Our Writers</h1>
            <WriterGrid/>
            </div>
        </div>
    );
};

export default WritersPage;
