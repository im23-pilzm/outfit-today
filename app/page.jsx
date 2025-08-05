import Image from "next/image";

export default function HomePage() {
    return (
        <>
            <div className="flex justify-center">
                <Image
                    src="/hanger.png"
                    alt="HangerIcon"
                    height={123}
                    width={123}
                />
            </div>

            <div className="flex justify-center">
                <p>Erstelle ein einzigartiges Outfit jeden Tage nicht nur Heute.</p>
            </div>
        </>

    );
}