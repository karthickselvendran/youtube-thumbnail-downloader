import { useEffect, useState } from "react";
import youtubeThumbnail from "youtube-thumbnail-downloader-hd";
import vimeoThumbnail from "thumbnail-youtube-vimeo";
import "./styles.css";

let noImgUrl = "https://www.planetread.org/images/bookboximages/copy%20of%20no-image.png";

export default function App() {
  const [url, setUrl] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [urlType, setUrlType] = useState("");

  useEffect(() => {
    if (url.includes("you")) {
      setUrlType("youtube");
    } else if (url.includes("vim")) {
      setUrlType("vimeo");
    } else {
      setUrlType("");
    }
  }, [url]);

  const getUrl = async () => {
    if (!url) return alert("Please enter video url");
    if (urlType === "vimeo") {
      let data = await vimeoThumbnail(url);
      console.log("test.. " + data);
      setResultUrl(data);
    } else {
      let resultUrl = await youtubeThumbnail(url);
      console.log("data " + resultUrl);
      setResultUrl(resultUrl);
    }
  };
  console.log("urlType " + urlType);
  console.log("input url " + url);
  console.log("resultUrl " + resultUrl);
  console.log(resultUrl);
  // console.log(thumbnail);
  // console.log(thumbnail.medium);
  // console.log(thumbnail.medium.url);
  return (
    <div className="App">
      <h1>Youtube/Vimeo Thumbnail Downloader</h1>
      <h3>Type your link and download your video thumbnail</h3>
      <br />
      <br />
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Type youtube/vimeo video url here..."
      />
      <br />
      <br />
      <button onClick={getUrl}>Get Thumbnail</button>
      <br />
      <br />
      <br />
      {resultUrl && urlType === "vimeo" && (
        <div>
          <img height="200" src={resultUrl || noImgUrl} alt="thumbnail" />
        </div>
      )}

      {resultUrl && urlType === "youtube" && resultUrl?.default?.url && (
        <div>
          <h1>HD Image (1280x720)</h1>
          <img src={resultUrl?.highMaxRes?.url} alt="thumbnail" />
          <br />
          <h1>SD Image (640x480)</h1>
          <img src={resultUrl?.sdddefautl?.url} alt="thumbnail" />
          <br />
          <br />
          <h1>Normal Image (480x360)</h1>
          <img src={resultUrl?.high?.url} alt="thumbnail" />
          <br />
          <br />
          <h1>Normal Image (320x180)</h1>
          <img src={resultUrl?.medium?.url} alt="thumbnail" />
          <br />
          <br />
          <h1>Normal Image (120x90)</h1>
          <img src={resultUrl?.default?.url} alt="thumbnail" />
        </div>
      )}
      <br />
      <br />
      <span>
        Developed by{" "}
        <a href="https://linkedin.com/in/karthick-selvendran">
          Karthick Selvendran
        </a>{" "}
        @ 2022{" "}
      </span>
      <br />
      <br />
    </div>
  );
}
