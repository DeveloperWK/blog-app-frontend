// export const dynamic = "force-dynamic";
import { redirect } from 'next/navigation';
import ResetPassField from "@/app/components/ResetPassField";

const ResetPassword = async ({ searchParams }) => {
    const params = await searchParams;
    const token =  params?.token;
    if (!token) redirect('/');
    return (
        <div>
          <ResetPassField token={token}/>
        </div>
    );
};

export default ResetPassword;
