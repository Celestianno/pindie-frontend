"use client";
import { CardsListSection } from "../components/CardsListSection/CardsListSection";
import { useGetDataByCategory } from "../api/api-hooks";
import { endpoints } from "../api/config";
import { Preloader } from "../components/Preloader/Preloader";

export default function Runners() {
    const runnerGames = useGetDataByCategory(endpoints.games, "runner");
    console.log(runnerGames);

    return(
        <main className="main-inner">
            {runnerGames ? (
                <CardsListSection id="runner" title="Ранеры" data={runnerGames} slider={false}/>
            ) : (
                <Preloader/>
            )}
        </main>
    );
}