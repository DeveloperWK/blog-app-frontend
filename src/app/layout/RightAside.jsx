import Flex from '../components/Flex';
import Paragraph from '../components/Paragraph';
import Topic from '../components/Topic';
import WhoToFollow from '../components/WhoToFollow';


export default function RightAside() {
    return (
        <div className="hidden w-[30%] h-screen bg-bg border border-solid border-border_color px-4 lg:block pt-16">
            <div>
                <Paragraph>Recommended topics</Paragraph>
                <Flex className="flex-wrap gap-3 mt-3">
                    <Topic text="React Js" />
                    <Topic text="Node Js" />
                    <Topic text="Next Js" />
                    <Topic text="Python" />
                    <Topic text="JavaScript" />
                    <Topic text="Django" />
                </Flex>
            </div>
            <div className='mt-4'>
                <Paragraph>Who to follow</Paragraph>
                <WhoToFollow />
                <WhoToFollow />
                <WhoToFollow />
                <WhoToFollow />
            </div>
        </div>
    );
}
