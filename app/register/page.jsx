"use client";
import Link from "next/link";
import Image from "next/image";
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
    const router = useRouter();

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");
        const password_conf = formData.get("password_conf");

        if (password !== password_conf) {
            alert("Password do not match.")
            return
        }

        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "ContentType": "application/json" },
            body: JSON.stringify({ email, password, password_conf })
        });

        if (response.ok) {
            router.push("/new_profile")
        } else {
            const errorData = await response.json();
            alert(errorData.message || "Registration failed. Please try again.");
        }
    }

    return (
        <>
            <div className="flex justify-center items-center">
                <Image
                    src="/hanger.png"
                    alt="HangerIcon"
                    height={31}
                    width={31}
                />
                <p>OutfitToday</p>
            </div>

            <div className="flex justify-center items-center">
                <form onSubmit={handleSubmit} className="border-2 border-[#4C2B08] rounded-lg p-8 w-3xl">
                    <div className="flex flex-col items-center justify-center gap-4">
                        <div className="flex flex-col items-center justify-center gap-4">
                            <div className="flex flex-col items-center justify-center">
                                <label htmlFor="email" className="self-start w-full text-left">Email</label>
                                <input type="email" name="email" required className="border-2 border-[#4C2B08] rounded-lg py-1" />
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <label  htmlFor="password" className="self-start w-full text-left">Passwort</label>
                                <input type="password" name="password" required className="border-2 border-[#4C2B08] rounded-lg py-1" />
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <label htmlFor="password_conf" className="self-start w-full text-left">Passwort bestätigen</label>
                                <input type="password" name="password_conf" required className="border-2 border-[#4C2B08] rounded-lg py-1" />
                            </div>
                        </div>
                        <button
                            className="px-8 py-3 bg-[#4C2B08] text-[#FAF9F6] flex items-center gap-2 rounded-full transition duration-150 hover:bg-[#6B3F13] group"
                            type="submit"
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
                    </div>
                </form>
            </div>

        </>
    );
}