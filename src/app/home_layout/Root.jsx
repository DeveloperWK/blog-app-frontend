'use client';
import Flex from '@/app/components/Flex';
import Navbar from '@/app/layout/Navbar';
import useClick from '@/app/hooks/useClick';
import LeftAside from './LeftAside';

<<<<<<< HEAD
function Root({ children }) {
  const { bar, content } = useClick();
=======
export default function Root({ children }) {
    const { bar, content } = useClick();
>>>>>>> 6751ab1 (added search page and all users page)

    return (
        <>
            <Navbar bar={bar} />
            <div className="relative pt-10 pb-16 md:pb-0 md:pt-15 bg-bg flex">
                <LeftAside ref={content} />
                <main className="w-full bg-bg overflow-hidden">{children}</main>
            </div>
        </>
    );
}
export default Root;
