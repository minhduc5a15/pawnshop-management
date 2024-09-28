const Page = ({ params }: { params: { id: string } }) => {
    return <h1 className="text-black">{params.id}</h1>;
}

export default Page;