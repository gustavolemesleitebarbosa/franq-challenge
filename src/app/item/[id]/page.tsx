export default function ItemPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex h-screen w-full items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-4">
        <h1>Item Page</h1>
        <p>{params.id}</p>
      </div>
    </div>
  );
}
