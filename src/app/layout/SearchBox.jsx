import { CiSearch } from "react-icons/ci";
import Flex from "../components/Flex";

function SearchBox({className}) {
    return (
        <Flex
            className={
                `w-[300px] border border-solid border-border_color px-5 py-2 rounded-2xl lg:flex ${className}`
            }
        >
            <CiSearch className="text-primary text-lg mr-3" />
            <input
                type="search"
                className="w-full text-md text-secondary focus:border-none outline-none"
                placeholder="Search here >>>>>"
            />
        </Flex>
    );
}
export default  SearchBox;