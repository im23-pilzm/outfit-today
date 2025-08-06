import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
    return (
        <>
            <div className="flex justify-center mt-56">
                <Image
                    src="/hanger.png"
                    alt="HangerIcon"
                    height={123}
                    width={123}
                />
            </div>

            <div className="flex justify-center mt-18 w-full">
                <p className="text-5xl text-[#4C2B08] text-center font-semibold">Erstelle jeden Tag ein einzigartiges Outfit <br /> nicht nur Heute.</p>
            </div>

            <div className="flex justify-center mt-5">
                <Link href="/register">
                    <button
                        className="px-8 py-3 bg-[#4C2B08] text-[#FAF9F6] flex items-center gap-2 rounded-full transition duration-150 hover:bg-[#6B3F13] group"
                    >
                        Registrieren
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-arrow-right transition-transform duration-200 group-hover:translate-x-2"
                            viewBox="0 0 16 16"
                        >
                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                        </svg>
                    </button>
                </Link>
            </div>
        </>
    );
}