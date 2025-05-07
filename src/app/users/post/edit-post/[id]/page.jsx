"use client"
import {useParams} from "next/navigation";

const EditPostPage = () => {
    const params = useParams();
    return <div>{params.id}</div>;
}
export default EditPostPage;