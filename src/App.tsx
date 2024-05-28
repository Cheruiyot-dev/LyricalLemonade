import { useState } from "react";
import axios, { AxiosError } from "axios";

import "./App.css";

interface LyricsResponse {
  lyrics: string;
  error?: string;
}

function App() {
  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [error, setError] = useState("");

  const searchLyrics = async () => {
    if (artist === "" || song === "") {
      setError("Enter both artist and song names!");
      return;
    }
    try {
      const response = await axios.get<LyricsResponse>(
        `https://api.lyrics.ovh/v1/${artist}/${song}`
      );
      const data = await response.data;
      console.log("response from api:", data);
      if (data.error) {
        setError(data.error); //set the error from the API
        setLyrics("");
      } else {
        setLyrics(data.lyrics);
        setLyrics("");
      }
    } catch (error) {
      console.error("Error fetching lyrics:", error);
      console.log(">>>>>>>>.error is:",error);
      
      if (error instanceof AxiosError) {
        setError(
          error.response?.data?.error ||
            "Failed to fetch lyrics. Please try again."
        ); // Set the error message from the API or a default message
      } else {
        setError("Failed to fetch lyrics. Please try again.");
      }
    }
  };

  return (
    <div className="App">
      <h1>Lyrical Lemonade</h1>
      <input
        className="input"
        type="text"
        placeholder="Type Artist's Name"
        onChange={(e) => {
          setArtist(e.target.value);
        }}
      />
      <input
        className="input"
        type="text"
        placeholder="Song Name"
        onChange={(e) => {
          setSong(e.target.value);
        }}
      />

      <button onClick={searchLyrics}>Search Song Lyrics</button>
      {error && <p> {error} </p>}
      <hr />
      <pre>{lyrics}</pre>
    </div>
  );
}

export default App;
