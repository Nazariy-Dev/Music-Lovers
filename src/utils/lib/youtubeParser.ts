import axios from "axios";

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
const YOUTUBE_API_URL = import.meta.env.VITE_YOUTUBE_API_URL

class YoutubeParser {
    private isYouTubeMusicURL(url: string) {
        const regex = /^(?:https?:\/\/)?(?:www\.)?music\.youtube\.com\/watch\?v=([^&]+)|youtu\.be\/([^?&]+)/;
        return regex.test(url);
    }

    private extractVideoID(url: string) {
        const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)|youtu\.be\/([^?&]+)/;
        const match = url.match(regex);
        return match ? (match[1] || match[2]) : null;
    }

    async getYouTubeTitle(url: string) {
        if (!this.isYouTubeMusicURL(url)) {
            throw new Error("The video does not belong to YouTube Music");
        }

        const videoID = this.extractVideoID(url);
        if (!videoID) {
            throw new Error("Invalid YouTube URL")
        }

        try {
            const response = await axios.get(YOUTUBE_API_URL, {
                params: {
                    id: videoID,
                    key: YOUTUBE_API_KEY,
                    part: "snippet"
                }
            })
            const videoDetails = response.data.items[0].snippet
            return videoDetails
        } catch (error) {
            throw new Error(`Error fetching video details: ${error}`)
        }
    }
}

export default new YoutubeParser()

