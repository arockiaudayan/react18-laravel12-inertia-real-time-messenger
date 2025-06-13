import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ChatLayout from '@/Layouts/ChatLayout';

export default function Home() {
    return (
        <>
        messages
        </>
    );
}
Home.layout = (page) => <AuthenticatedLayout><ChatLayout children={page} /></AuthenticatedLayout>;
