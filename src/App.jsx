import { useState } from "react";
import "./App.css";

function App() {
  // 검색어
  const [keyword, setKeyword] = useState("");

  // 영화 목록
  const [movies, setMovies] = useState([]);

  // 선택한 영화의 상세 정보
  const [selectedMovie, setSelectedMovie] = useState(null);

  // 로딩 상태
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);

  // 오류 메시지
  const [error, setError] = useState("");

  // API 키
  const API_KEY = "6a0a8eb4";

  // 1. 영화 목록 검색 API
  const searchMovies = async () => {
    if (keyword.trim() === "") {
      alert("검색어를 입력해주세요.");
      return;
    }

    setLoading(true);
    setError("");
    setMovies([]);
    setSelectedMovie(null);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(keyword)}`,
      );

      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError("검색 결과가 없습니다.");
      }
    } catch (err) {
      setError("영화 검색에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 2. 영화 상세 정보 API
  const getMovieDetail = async (id) => {
    setDetailLoading(true);
    setSelectedMovie(null);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`,
      );

      const data = await response.json();

      if (data.Response === "True") {
        setSelectedMovie(data);
      } else {
        alert("상세 정보를 불러오지 못했습니다.");
      }
    } catch (err) {
      alert("상세 정보 요청에 실패했습니다.");
    } finally {
      setDetailLoading(false);
    }
  };

  return (
    <div className="container">
      {/* 상세 페이지 */}
      {selectedMovie ? (
        <div className="detail-page">
          {/* 뒤로 가기 */}
          <button
            className="back-button"
            onClick={() => setSelectedMovie(null)}
          >
            ← Back
          </button>

          {/* 영화 포스터 */}
          <img
            className="detail-poster"
            src={
              selectedMovie.Poster !== "N/A"
                ? selectedMovie.Poster
                : "https://placehold.co/300x450?text=No+Image"
            }
            alt={selectedMovie.Title}
          />

          {/* 영화 제목 */}
          <h1>{selectedMovie.Title}</h1>

          {/* 영화 정보 */}
          <div className="movie-information">
            <p>
              <strong>Year:</strong> {selectedMovie.Year}
            </p>

            <p>
              <strong>Genre:</strong> {selectedMovie.Genre}
            </p>

            <p>
              <strong>Director:</strong> {selectedMovie.Director}
            </p>
          </div>

          {/* 영화 줄거리 */}
          <p className="movie-plot">{selectedMovie.Plot}</p>
        </div>
      ) : (
        /* 검색 페이지 */
        <>
          <div className="search-area">
            <h3>Movie Search : {keyword}</h3>

            <div className="search-box">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    searchMovies();
                  }
                }}
                placeholder="영화 제목 입력"
              />

              <button onClick={searchMovies}>Search</button>
            </div>
          </div>

          {/* 검색 결과 */}
          {loading && <p>검색 중입니다...</p>}

          {error && <p>{error}</p>}

          <div className="movie-list">
            {movies.map((movie) => (
              <div
                className="movie-card"
                key={movie.imdbID}
                onClick={() => getMovieDetail(movie.imdbID)}
              >
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://placehold.co/300x450?text=No+Image"
                  }
                  alt={movie.Title}
                />

                <h4>{movie.Title}</h4>

                <p>{movie.Year}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 상세 정보 로딩 */}
      {detailLoading && (
        <div className="detail-loading">상세 정보를 불러오는 중입니다...</div>
      )}
    </div>
  );
}
export default App;
