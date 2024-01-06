import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import AutocompleteInput from "./components/AutocompleteInput";
import Dropdown from "./components/Dropdown";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";

const movieData = [
  { label: "The Matrix", rating: 7.5, category: "Action" },
  { label: "Focus", rating: 6.9, category: "Comedy" },
  { label: "The Lazarus Effect", rating: 6.4, category: "Thriller" },
  { label: "Everly", rating: 5.0, category: "Action" },
  { label: "Maps to the Stars", rating: 7.5, category: "Drama" },
];

const genreData = ["Any genre", "Action", "Comedy", "Drama", "Thriller"];

// Function to generate StarIcon and StarBorderIcon based on rating
const generateRatingIcons = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  const icons = [];

  for (let i = 0; i < fullStars; i++) {
    icons.push(<StarIcon key={`star_${i}`} />);
  }

  if (hasHalfStar) {
    icons.push(<StarHalfIcon key="half_star" />);
  }

  const emptyStars = 10 - icons.length; // Remaining empty stars

  for (let i = 0; i < emptyStars; i++) {
    icons.push(<StarBorderIcon key={`star_border_${i}`} />);
  }

  return icons;
};

// Generate updated ratingData array with star icons
const ratingData = ["Any Rating"];
for (let i = 1; i <= 10; i++) {
  ratingData.push({
    rating: i,
    icons: generateRatingIcons(i),
  });
}

function App() {
  const [selectedRating, setSelectedRating] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState(movieData);

  // select movie Rating onChange function
  const onMovieRatingSelectHandler = (e) => {
    const { value } = e.target;
    const updatedValues = Array.isArray(value) ? value : [value];
    setSelectedRating(updatedValues);
  };

  // select movie Genre onChange Function
  const onMovieGenreSelectHandler = (e) => {
    const { value } = e.target;
    const updatedValues = Array.isArray(value) ? value : [value];
    setSelectedGenre(updatedValues);
  };


  // to handle the filter effect
  useEffect(() => {
    let filtered = movieData;

    if (selectedRating.length > 0 && !selectedRating.includes("Any Rating")) {
      filtered = movieData.filter((movie) =>
        selectedRating.includes(Math.floor(movie.rating))
      );
    }

    if (selectedGenre.length > 0 && !selectedGenre.includes("Any genre")) {
      filtered = filtered.filter((movie) =>
        selectedGenre.includes(movie.category)
      );
    }

    setFilteredMovies(filtered);
  }, [selectedRating, selectedGenre]);

  return (
    <Box className="container">
      <AutocompleteInput
        data={filteredMovies}
        generateRatingIcons={generateRatingIcons}
      />
      <Dropdown
        data={ratingData}
        label="Rating"
        selectedValue={selectedRating}
        handleChange={(e) => onMovieRatingSelectHandler(e)}
      />
      <Dropdown
        data={genreData}
        label="Genre"
        selectedValue={selectedGenre}
        handleChange={(e) => onMovieGenreSelectHandler(e)}
      />
    </Box>
  );
}

export default App;
