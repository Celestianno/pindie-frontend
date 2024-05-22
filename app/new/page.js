"use client";
import { CardsListSection } from "../components/CardsListSection/CardsListSection";
import { useGetDataByCategory } from "../api/api-hooks";
import { endpoints } from "../api/config";
import { Preloader } from "../components/Preloader/Preloader";

export default function New() {
    const newGames = useGetDataByCategory(endpoints.games, "new");

    return(
        <main className="main-inner">
            {newGames ? (
                <CardsListSection id="new" title="Новинки" data={newGames} slider={false}/>
            ) : (
                <Preloader/>
            )}
        </main>
    );
}