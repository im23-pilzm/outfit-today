"use client";
import Link from "next/link";
import Image from "next/image";
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");

        try {
            console.log('Sending login request...');
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();
            console.log('Response:', data);

            if (response.ok) {
                router.push("/wardrobe");
            } else {
                setError(data.error || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError("An error occurred during login. Please try again.");
        }
    }
    return (
        <>
            <div className="flex justify-center items-center mt-35">
                <Image  
                    src="/hanger.png"
                    alt="HangerIcon"
                    height={31}
                    width={31}
                />
                <p className="ml-4 font-semibold">OutfitToday</p>
            </div>

            <div className="flex justify-center items-center mt-12 text-[#4C2B08]">
                <form onSubmit={handleSubmit} className="border-3 border-[#4C2B08] rounded-lg p-8 w-1xl">
                    <p className="flex justify-center items-center text-center mb-8 font-semibold">Willkommen zurück<br />Melde dich hier an!</p>
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex flex-col items-center justify-center gap-6">
                            <div className="flex flex-col items-center justify-center w-78">
                                <label htmlFor="email" className="self-start w-full text-left text-sm font-semibold">Email</label>
                                <input type="email" name="email" required className="border-[1.5] border-[#4C2B08] rounded-lg py-1 w-full" />
                            </div>
                            <div className="flex flex-col items-center justify-center w-78">
                                <label htmlFor="password" className="self-start w-full text-left text-sm font-semibold">Passwort</label>
                                <input type="password" name="password" required className="border-[1.5] border-[#4C2B08] rounded-lg py-1 w-full" />
                            </div>
                        </div>
                        <button
                            className="px-8 py-3 bg-[#4C2B08] text-[#FAF9F6] flex items-center gap-2 rounded-full transition duration-150 hover:bg-[#6B3F13] group mt-10"
                            type="submit"
                        >
                            Anmelden
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
                        <p className="mt-12 text-xs">
                            Noch nicht registriert?
                            <Link href="/register" className="text-blue-600 hover:underline">
                                Registrieren
                            </Link>
                        </p>
                    </div>

                </form>
            </div>

        </>
    );
}