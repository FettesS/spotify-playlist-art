import TextInput from "@/app/components/text-input";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-top h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-900"> Spotify Playlist Art Generator </h1>
      <TextInput placeholder = "Enter a playlist link to generate cover art!" />
    </div>
  );
}
