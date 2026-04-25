import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../Pagination/Pagination";
import "./main.css";

export const Main = ({ searchResults }) => {
    const [trendMovies, settrendMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pag, setPag] = useState(3);
    const [movie, setMovies] = useState([]);
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);
    const navigate = useNavigate();

    function handelCleck(item) {
        navigate("/des", { state: item });
    }

    useEffect(() => {
        if (trendMovies.length === 0 || paused) return;
        const interval = setInterval(() => {
            setCurrent((prev) =>
                prev === trendMovies.length - 1 ? 0 : prev + 1
            );
        }, 5000);
        return () => clearInterval(interval);
    }, [trendMovies, paused]);

    useEffect(() => {
        async function getData() {
            const res = await fetch(
                `https://api.themoviedb.org/3/movie/popular?api_key=d0dbfaaf9e5a616757c0421b49038b70&page=${1}`
            );
            const data = await res.json();
            settrendMovies(data.results);
console.log(data)
            setLoading(true);
            let allMovies = [];
            for (let i = 10; i <= 16; i++) {
                const res = await fetch(
                    `https://api.themoviedb.org/3/movie/popular?api_key=d0dbfaaf9e5a616757c0421b49038b70&page=${pag + i}`
                );
                const data = await res.json();
                allMovies = [...allMovies, ...data.results];
            }
            setMovies(allMovies);
            setLoading(false);
        }
        getData();
    }, [pag]);

    const goPrev = () => {
        setPaused(true);
        setCurrent((prev) => (prev === 0 ? trendMovies.length - 1 : prev - 1));
        setTimeout(() => setPaused(false), 6000);
    };

    const goNext = () => {
        setPaused(true);
        setCurrent((prev) => (prev === trendMovies.length - 1 ? 0 : prev + 1));
        setTimeout(() => setPaused(false), 6000);
    };

    const goTo = (i) => {
        setPaused(true);
        setCurrent(i);
        setTimeout(() => setPaused(false), 6000);
    };

    const displayedMovies = searchResults !== null ? searchResults : movie;
    const isSearching = searchResults !== null;
    const currentMovie = trendMovies[current];

    return (
        <>
            {!isSearching && (
                <div className="slider-section">
                    {trendMovies.length > 0 && currentMovie && (
                        <>
                         
                            <div className="slider-bg">
                                {trendMovies.map((m, i) => (
                                    <img
                                        key={m.id}
                                        src={`https://image.tmdb.org/t/p/original/${m.backdrop_path}`}
                                        alt={m.title}
                                        className={`slider-bg-img ${i === current ? "active" : ""}`}
                                    />
                                ))}
                                <div className="slider-overlay" />
                            </div>

                            
                            <div className="slider-content">
                               
                                <div className="slider-poster-wrap">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w342/${currentMovie.poster_path}`}
                                        alt={currentMovie.title}
                                        className="slider-poster"
                                        onClick={() => handelCleck(currentMovie)}
                                    />
                                </div>

                              
                                <div className="slider-info">
                                    <div className="slider-meta">
                                        <span className="slider-badge">🔥 الأكثر مشاهدة</span>
                                        <span className="slider-rating">
                                            ⭐ {currentMovie.vote_average?.toFixed(1)}
                                        </span>
                                        <span className="slider-year">
                                            {currentMovie.release_date?.slice(0, 4)}
                                        </span>
                                    </div>

                                    <h1 className="slider-title">{currentMovie.title}</h1>

                                    <p className="slider-overview">
                                        {currentMovie.overview?.length > 180
                                            ? currentMovie.overview.slice(0, 180) + "..."
                                            : currentMovie.overview}
                                    </p>

                                    <button
                                        className="slider-cta"
                                        onClick={() => handelCleck(currentMovie)}
                                    >
                                        <span className="slider-cta-icon">▶</span>
                                        عرض تفاصيل الفيلم
                                    </button>
                                </div>
                            </div>

                          
                            <button className="slider-nav slider-nav--prev" onClick={goPrev} aria-label="Previous">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                                    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>

                           
                            <button className="slider-nav slider-nav--next" onClick={goNext} aria-label="Next">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>

                          
                            <div className="slider-dots">
                                {trendMovies.slice(0, 10).map((_, i) => (
                                    <button
                                        key={i}
                                        className={`slider-dot ${i === current ? "active" : ""}`}
                                        onClick={() => goTo(i)}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}

            {isSearching && (
                <div className="search-label">
                    <h2>نتائج البحث ({displayedMovies.length} فيلم)</h2>
                </div>
            )}

            <div className={`list-Movies ${isSearching ? "list-Movies--search" : ""}`}>
                <ul className="Movies">
                    {loading && !isSearching ? (
                        <h1 className="loading-text">Loading...</h1>
                    ) : displayedMovies.length === 0 && isSearching ? (
                        <div className="no-results">
                            <span>🎬</span>
                            <p>لا توجد نتائج</p>
                        </div>
                    ) : (
                        displayedMovies.map((item) => (
                            <li key={item.id} className="card">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                    alt={item.title}
                                />
                                <div className="titel">
                                    <h1>{item.title}</h1>
                                </div>
                                <button
                                    className="More-Button"
                                    onClick={() => handelCleck(item)}
                                >
                                    More
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            </div>

            {!isSearching && <Pagination pag={pag} setPag={setPag} />}
        </>
    );
};

export default Main;