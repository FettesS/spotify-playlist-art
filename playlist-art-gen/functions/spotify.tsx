import { SpotifyApi  } from "@spotify/web-api-ts-sdk";
import { get } from "http";
import { responseCookiesToRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
 
let accessToken = ""; 

interface SpotifyTrack {
    track: {
      name: string;
      artists: { name: string }[];
      album: { name: string };
    };
  }
  
  interface SpotifyPlaylistResponse {
    items: SpotifyTrack[];
  }


  interface SpotifyAuthResponse {
    access_token: string,
    token_type: string,
    expires_in: number
  }

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!
const sdk = SpotifyApi.withClientCredentials(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, ["scope1", "scope2"]);

export const authenticateSpotify = async() => {
    console.log(`Spotify Client ID`, process.env.SPOTIFY_CLIENT_ID);
    console.log(`Spotify Client Secret:`, process.env.SPOTIFY_CLIENT_SECRET);
    try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST", 
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `grant_type=client_credentials&client_id=${SPOTIFY_CLIENT_ID}&client_secret=${SPOTIFY_CLIENT_SECRET}`
        });
    

    const data: SpotifyAuthResponse = await response.json(); 
    accessToken = data.access_token; 
    console.log("Spotify authenticated successfully"); 
    } catch (error) {
        console.error("Spotify authentication failed: ", error); 
    }
}

/**
 * 
 * @param playlistID - The Spotify playlist ID
 * @returns array of track names
 */
export const parseTracks = async (playlistID: string): Promise<string[]> => {
    if (!accessToken) {
        await authenticateSpotify(); 
    }

    try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const data: SpotifyPlaylistResponse = await response.json(); 
        if (!data.items) {
            console.error("Error fetching playlist", data); 
            return []; 
        }
        return data.items.map((item: any) => item.track.name);
    } catch (error) {
        console.error("Failed to fetch playlist tracks: ", error); 
        return []; 
    }
}