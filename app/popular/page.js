"use client";
import { CardsListSection } from "../components/CardsListSection/CardsListSection";
import { useGetDataByCategory } from "../api/api-hooks";
import { endpoints } from "../api/config";
import { Preloader } from "../components/Preloader/Preloader";

export default function Popular() {
    const popularGames = useGetDataByCategory(endpoints.games, "popular");

    return(
        <main className="main-inner">
            {popularGames ? (
                <CardsListSection id="popular" title="Популярные" data={popularGames} slider={false}/>
            ) : (
                <Preloader/>
            )}
        </main>
    );
}