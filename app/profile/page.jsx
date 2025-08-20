"use client"
import React, { useState, useEffect } from 'react';

export default function ProfilePage() {
    const [preferences, setPreferences] = useState({
        favoriteStyle: '',
        favoriteColor1: '',
        favoriteColor2: '',
        favoriteBottom: '',
        favoriteTop: '',
        favoriteShoes: '',
        favoriteMaterial: ''
    });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState("Name Nachname");
    const [profileImageFile, setProfileImageFile] = useState(null);
    const [originalData, setOriginalData] = useState(null);

    useEffect(() => {
        async function fetchProfile() {
            const res = await fetch('/api/profile');
            if (res.ok) {
                const data = await res.json();
                setUsername(data.displayName || "Name Nachname");
                setEmail(data.email || "");
                setPreferences({
                    favoriteStyle: data.favoriteStyle || '',
                    favoriteColor1: data.favoriteColor1 || '',
                    favoriteColor2: data.favoriteColor2 || '',
                    favoriteBottom: data.favoriteBottom || '',
                    favoriteTop: data.favoriteTop || '',
                    favoriteShoes: data.favoriteShoes || '',
                    favoriteMaterial: data.favoriteMaterial || ''
                });
                setOriginalData({
                    username: data.displayName || "Name Nachname",
                    email: data.email || "",
                    password: "",
                    preferences: {
                        favoriteStyle: data.favoriteStyle || '',
                        favoriteColor1: data.favoriteColor1 || '',
                        favoriteColor2: data.favoriteColor2 || '',
                        favoriteBottom: data.favoriteBottom || '',
                        favoriteTop: data.favoriteTop || '',
                        favoriteShoes: data.favoriteShoes || '',
                        favoriteMaterial: data.favoriteMaterial || ''
                    },
                    profileImageFile: null
                });
            }
        }
        fetchProfile();
    }, []);

    const handleSave = async () => {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('username', username);
        formData.append('preferences', JSON.stringify(preferences));
        if (profileImageFile) {
            formData.append('profileImage', profileImageFile);
        }

        try {
            const res = await fetch('/api/profile', {
                method: 'PUT',
                body: formData,
            });
            const data = await res.json();
            if (res.ok) {
                setIsEditing(false);
            } else {
                alert(data.error || "Fehler beim Speichern.");
            }
        } catch (err) {
            alert("Netzwerkfehler beim Speichern.");
        }
    };

    const handleCancel = () => {
        if (originalData) {
            setUsername(originalData.username);
            setEmail(originalData.email);
            setPassword("");
            setPreferences(originalData.preferences);
            setProfileImageFile(originalData.profileImageFile);
        }
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-[var(--background)]">
            <div className="container mx-auto px-4 py-8">
                <div className="flex gap-8">
                    <div className="w-1/3">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="w-100 h-100 rounded-full border-2 border-solid border-[#4C2B08] flex items-center justify-center bg-gray-100 relative">
                                <label
                                    htmlFor="profileImageInput"
                                    className={`w-full h-full rounded-full flex items-center justify-center text-[#4C2B08] hover:bg-[#4C2B08]/5 transition-colors duration-200 cursor-pointer ${isEditing ? '' : 'pointer-events-none opacity-60'}`}
                                    title={isEditing ? "Profilbild ändern" : ""}
                                >
                                    <span className="text-lg font-medium">Profilbild</span>
                                </label>
                                <input
                                    id="profileImageInput"
                                    type="file"
                                    accept="image/*"
                                    onChange={e => setProfileImageFile(e.target.files[0])}
                                    className="hidden"
                                    disabled={!isEditing}
                                />
                                {profileImageFile && (
                                    <img
                                        src={URL.createObjectURL(profileImageFile)}
                                        alt="Profilbild Vorschau"
                                        className="absolute inset-0 w-full h-full object-cover rounded-full"
                                        style={{ zIndex: 1 }}
                                    />
                                )}
                            </div>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="text-4xl font-bold mt-10 text-[#4C2B08] text-center bg-transparent border-b-2 border-[#4C2B08] focus:outline-none focus:border-[#4C2B08] px-2"
                                    placeholder="Name eingeben"
                                />
                            ) : (
                                <h2 className="text-4xl font-bold mt-10 text-[#4C2B08]">{username}</h2>
                            )}
                        </div>
                    </div>
                    <div className="w-2/3">
                        <div className="flex justify-end mb-6 gap-3">
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-[#4C2B08] text-white rounded-lg hover:bg-[#4C2B08]/90 transition-colors duration-200"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Bearbeiten
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={handleCancel}
                                        className="px-4 py-2 border border-[#4C2B08] text-[#4C2B08] rounded-lg hover:bg-[#4C2B08]/5 transition-colors duration-200"
                                    >
                                        Abbrechen
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="px-4 py-2 bg-[#4C2B08] text-white rounded-lg hover:bg-[#4C2B08]/90 transition-colors duration-200"
                                    >
                                        Speichern
                                    </button>
                                </>
                            )}
                        </div>
                        <div className="rounded-lg border-2 border-solid border-[#4C2B08] p-6 space-y-10">
                            <div>
                                <div className="flex items-center gap-3 flex-wrap">
                                    <span className="text-lg font-medium text-[#4C2B08]">Mein Lieblingsstil ist</span>
                                    <select
                                        className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C2B08] focus:border-transparent bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        value={preferences.favoriteStyle}
                                        onChange={(e) => setPreferences(prev => ({ ...prev, favoriteStyle: e.target.value }))}
                                        disabled={!isEditing}
                                    >
                                        <option value="">Stil wählen...</option>
                                        <option value="casual">Casual</option>
                                        <option value="streetwear">Streetwear</option>
                                        <option value="sporty">Sporty</option>
                                        <option value="business-casual">Business Casual</option>
                                        <option value="vintage">Vintage</option>
                                        <option value="minimalistic">Minimalistisch</option>
                                        <option value="elegant">Elegant</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center gap-3 flex-wrap">
                                    <span className="text-lg font-medium text-[#4C2B08]">Meine Lieblingsfarben sind</span>
                                    <select
                                        className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C2B08] focus:border-transparent bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        value={preferences.favoriteColor1}
                                        onChange={(e) => setPreferences(prev => ({ ...prev, favoriteColor1: e.target.value }))}
                                        disabled={!isEditing}
                                    >
                                        <option value="">erste Farbe wählen...</option>
                                        <option value="schwarz">Schwarz</option>
                                        <option value="weiss">Weiß</option>
                                        <option value="grau">Grau</option>
                                        <option value="beige">Beige</option>
                                        <option value="braun">Braun</option>
                                        <option value="navy">Navy</option>
                                        <option value="rot">Rot</option>
                                        <option value="blau">Blau</option>
                                        <option value="gruen">Grün</option>
                                        <option value="gelb">Gelb</option>
                                        <option value="rosa">Rosa</option>
                                        <option value="orange">Orange</option>
                                        <option value="violett">Violett</option>
                                        <option value="tuerkis">Türkis</option>
                                    </select>
                                    <span className="text-lg font-medium text-[#4C2B08]">und</span>
                                    <select
                                        className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C2B08] focus:border-transparent bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        value={preferences.favoriteColor2}
                                        onChange={(e) => setPreferences(prev => ({ ...prev, favoriteColor2: e.target.value }))}
                                        disabled={!isEditing}
                                    >
                                        <option value="">weitere Farbe...</option>
                                        <option value="schwarz">Schwarz</option>
                                        <option value="weiss">Weiß</option>
                                        <option value="grau">Grau</option>
                                        <option value="beige">Beige</option>
                                        <option value="braun">Braun</option>
                                        <option value="navy">Navy</option>
                                        <option value="rot">Rot</option>
                                        <option value="blau">Blau</option>
                                        <option value="gruen">Grün</option>
                                        <option value="gelb">Gelb</option>
                                        <option value="rosa">Rosa</option>
                                        <option value="orange">Orange</option>
                                        <option value="violett">Violett</option>
                                        <option value="tuerkis">Türkis</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center gap-3 flex-wrap">
                                    <span className="text-lg font-medium text-[#4C2B08]">Am liebsten trage ich</span>
                                    <select
                                        className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C2B08] focus:border-transparent bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        value={preferences.favoriteBottom}
                                        onChange={(e) => setPreferences(prev => ({ ...prev, favoriteBottom: e.target.value }))}
                                        disabled={!isEditing}
                                    >
                                        <option value="">Kleidungsstück wählen...</option>
                                        <option value="jeans">Jeans</option>
                                        <option value="chinos">Chinos</option>
                                        <option value="jogginghose">Jogginghose</option>
                                        <option value="shorts">Shorts</option>
                                        <option value="rock">Rock</option>
                                        <option value="kleid">Kleid</option>
                                    </select>
                                    <span className="text-lg font-medium text-[#4C2B08]">mit</span>
                                    <select
                                        className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C2B08] focus:border-transparent bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        value={preferences.favoriteTop}
                                        onChange={(e) => setPreferences(prev => ({ ...prev, favoriteTop: e.target.value }))}
                                        disabled={!isEditing}
                                    >
                                        <option value="">Oberteil wählen...</option>
                                        <option value="t-shirt">T-Shirt</option>
                                        <option value="hoodie">Hoodie</option>
                                        <option value="pullover">Pullover</option>
                                        <option value="hemd">Hemd/Bluse</option>
                                        <option value="tanktop">Tanktop</option>
                                    </select>
                                    <span className="text-lg font-medium text-[#4C2B08]">und</span>
                                    <select
                                        className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C2B08] focus:border-transparent bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        value={preferences.favoriteShoes}
                                        onChange={(e) => setPreferences(prev => ({ ...prev, favoriteShoes: e.target.value }))}
                                        disabled={!isEditing}
                                    >
                                        <option value="">Schuhe wählen...</option>
                                        <option value="sneaker">Sneaker</option>
                                        <option value="boots">Boots</option>
                                        <option value="sandalen">Sandalen</option>
                                        <option value="heels">High Heels</option>
                                        <option value="loafers">Loafers</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center gap-3 flex-wrap">
                                    <span className="text-lg font-medium text-[#4C2B08]">Mein Lieblingsmaterial ist</span>
                                    <select
                                        className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C2B08] focus:border-transparent bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        value={preferences.favoriteMaterial}
                                        onChange={(e) => setPreferences(prev => ({ ...prev, favoriteMaterial: e.target.value }))}
                                        disabled={!isEditing}
                                    >
                                        <option value="">Material wählen...</option>
                                        <option value="baumwolle">Baumwolle</option>
                                        <option value="leinen">Leinen</option>
                                        <option value="wolle">Wolle</option>
                                        <option value="seide">Seide</option>
                                        <option value="denim">Denim</option>
                                        <option value="leder">Leder</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-lg border-2 border-solid border-[#4C2B08] text-[#4C2B08] p-6 space-y-10 mt-10">
                            <div>
                                <form>
                                    <p className="text-3xl font-semibold">Sicherheit</p>
                                    <div className="flex mt-4">
                                        <div className="flex items-start gap-6">
                                            <div className="flex flex-col items-center justify-center w-78">
                                                <label htmlFor="email" className="self-start w-full text-left text-sm font-semibold">Email</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="border-[1.5] border-[#4C2B08] rounded-lg py-1 w-full disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                    disabled={!isEditing}
                                                />
                                            </div>
                                            <div className="flex flex-col items-center justify-center w-78">
                                                <label htmlFor="password" className="self-start w-full text-left text-sm font-semibold">Passwort</label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="border-[1.5] border-[#4C2B08] rounded-lg py-1 w-full disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                    disabled={!isEditing}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}