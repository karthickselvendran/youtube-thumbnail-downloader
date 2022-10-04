import { useEffect, useState } from "react";
import { saveAs } from 'file-saver'
import youtubeThumbnail from "youtube-thumbnail-downloader-hd";
import vimeoThumbnail from "thumbnail-youtube-vimeo";
import "./styles.css";
import axios from 'axios';

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

  const handleChange = (e) => {
    console.log(e.target.value);
    // if (e.target.value) {
    setUrl(e.target.value)
    // } else {
    //   setResultUrl("")
    // }
  }

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

  const onEnter = (e) => {
    if (e.code === "Enter") {
      getUrl()
    }
  }

  // https://youtu.be/vZrXdQ0hIAY
  const downloadImage = async (url) => {
    saveAs(url, 'thumbnail.jpg')

    // var element = document.createElement("a");
    // var file = new Blob(
    //   [
    //     url
    //   ],
    //   { type: "mp4/*" }
    // );
    // element.href = URL.createObjectURL(file);
    // element.download = `yt-video-${Date.now()}.mp4`;
    // element.click();

    // const a = document.createElement('a')
    // a.href = "https://youtu.be/vZrXdQ0hIAY"
    // a.download = "https://youtu.be/vZrXdQ0hIAY".split('/').pop()
    // document.body.appendChild(a)
    // a.click()
    // document.body.removeChild(a)
    // window.open("http://localhost:4500")

    // saveAs("http://localhost:4500", "v1.mp4")
    // let data =
    // await axios.get("http://localhost:4500")
    // console.log("data  ::  ", data)
  }

  console.log("urlType " + urlType);
  console.log("input url " + url);
  console.log("resultUrl " + resultUrl);
  console.log(resultUrl);
  // console.log(thumbnail);
  // console.log(thumbnail.medium);
  // console.log(thumbnail.medium.url);
  return (
    <div className="App">
      <header>
        <h1>Youtube/Vimeo Thumbnail Downloader</h1>
        {/* <nav>
          <ul>
            <li>Blogs</li>
            <li>About</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>DMCA</li>
          </ul>
        </nav> */}
      </header>
      <main>
        <span className="desc">
          Hey welcome to our platform. Just copy your youtube or vimeo video link and paste in below input and click Get Thumbnail button.  Then you will get thumbnails below, in that you can select your thumbnail size and download your thumbnail.
        </span>
        <br />
        <br />
        <input
          value={url}
          onChange={(e) => handleChange(e)}
          placeholder="Type youtube/vimeo video url here..."
          onKeyDown={(e) => onEnter(e)}
          autoFocus
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
            <div className="">
              <div>
                <h1>HD Image (1280x720)</h1>
                <button onClick={() => downloadImage(resultUrl?.highMaxRes?.url)}>Download</button>
                <br />
                <img src={resultUrl?.highMaxRes?.url} alt="thumbnail"/*  height={"200"} width={"400"} */ />
                <br />
                <br />
              </div>
              <div>
                <h1>SD Image (640x480)</h1>
                <button onClick={() => downloadImage(resultUrl?.highMaxRes?.url)}>Download</button>
                <br />
                <img src={resultUrl?.sdddefautl?.url} alt="thumbnail" /* height={"200"} width={"400"}  */ />
              </div>
              <br />
              <br />
            </div>

            <h1>Normal Image (480x360)</h1>
            <button onClick={() => downloadImage(resultUrl?.highMaxRes?.url)}>Download</button>
            <br />
            <img src={resultUrl?.high?.url} alt="thumbnail"/*  height={"200"} width={"400"} */ />
            <br />
            <br />
            <h1>Normal Image (320x180)</h1>
            <button onClick={() => downloadImage(resultUrl?.highMaxRes?.url)}>Download</button>
            <br />
            <img src={resultUrl?.medium?.url} alt="thumbnail"/*  height={"200"} width={"400"} */ />
            <br />
            <br />
            <h1>Normal Image (120x90)</h1>
            <button onClick={() => downloadImage(resultUrl?.highMaxRes?.url)}>Download</button>
            <br />
            <img src={resultUrl?.default?.url} alt="thumbnail"/*  height={"200"} width={"400"} */ />
          </div>
        )}
        <br />
        <br />
        <span>
          Developed by{" "}
          <a href="https://linkedin.com/in/karthick-selvendran" target={"_blank"}>
            Karthick Selvendran
          </a>{" "}
          @ 2022{" "}
        </span>
        <br />
        <br />
      </main>
    </div>
  );
}
