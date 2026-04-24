import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import "./Headr.css";
import prof from "../../assets/prof.jpg";

function Headr({ onSearch }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Navbar shrinks on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !inputRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Debounced search
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setShowDropdown(false);
      if (onSearch) onSearch(null);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=d0dbfaaf9e5a616757c0421b49038b70&query=${encodeURIComponent(query)}&page=1`
        );
        const data = await res.json();
        setResults(data.results?.slice(0, 6) || []);
        setShowDropdown(true);
      } catch {
        setResults([]);
      }
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (item) => {
    setQuery(item.title);
    setShowDropdown(false);
    if (onSearch) onSearch([item]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query.trim().length < 2) return;
    setLoading(true);
    setShowDropdown(false);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=d0dbfaaf9e5a616757c0421b49038b70&query=${encodeURIComponent(query)}&page=1`
      );
      const data = await res.json();
      if (onSearch) onSearch(data.results || []);
    } catch {}
    setLoading(false);
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setShowDropdown(false);
    if (onSearch) onSearch(null);
    inputRef.current?.focus();
  };

  return (
    <header className={`Headr ${scrolled ? "Headr--scrolled" : ""}`}>
      <div className="cointer">
      
        <div className="logo">
          <span className="logo-c">C</span>ien
        </div>

       
        <form className="Serach-div" onSubmit={handleSubmit}>
          <div className="search-wrapper">
            <FaSearch
              size={16}
              className="icon-Srech"
              onClick={handleSubmit}
            />
            <input
              ref={inputRef}
              type="text"
              placeholder="ابحث عن فيلم..."
              className="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => results.length > 0 && setShowDropdown(true)}
              autoComplete="off"
            />
            {query && (
              <button type="button" className="clear-btn" onClick={handleClear}>
                <FaTimes size={13} />
              </button>
            )}
            {loading && <span className="search-spinner" />}
          </div>

         
          {showDropdown && results.length > 0 && (
            <div className="search-dropdown" ref={dropdownRef}>
              {results.map((item) => (
                <div
                  key={item.id}
                  className="dropdown-item"
                  onClick={() => handleSelect(item)}
                >
                  <img
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w92/${item.poster_path}`
                        : "https://via.placeholder.com/46x68?text=?"
                    }
                    alt={item.title}
                    className="dropdown-thumb"
                  />
                  <div className="dropdown-info">
                    <span className="dropdown-title">{item.title}</span>
                    <span className="dropdown-year">
                      {item.release_date?.slice(0, 4) || "—"}
                      {item.vote_average
                        ? ` · ⭐ ${item.vote_average.toFixed(1)}`
                        : ""}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </form>

       
        <div className="option">
          <div className="profile">
            <img src={prof} className="Icone" alt="profile" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Headr;