import Image from "next/image";
import WeatherApp from "./components/WeatherApp";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <WeatherApp />
    </main>
  );
}
