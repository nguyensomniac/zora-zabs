import React from "react";
import html2canvas from "html2canvas-add-mix-blend-mode";
import RainbowButton from "./components/RainbowButton";

function Mural({ file, onReset }) {
  const [src, setSrc] = React.useState("");
  const [load1, setLoad1] = React.useState(false);
  const [load2, setLoad2] = React.useState(false);
  const [blob, setBlob] = React.useState(null)
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    const downloadCanvas = async () => {
      const canvas = await html2canvas(canvasRef.current, { useCORS: true });
      const image = canvas.toDataURL("image/png", 1.0);
      setBlob(image);
    };

    if (load1 && load2) {
      downloadCanvas()
    }
  }, [load1, load2])

  const downloadImage = () => {
    const fakeLink = window.document.createElement("a");
    fakeLink.style = "display:none;";
    fakeLink.download = 'zimage.png';

    fakeLink.href = blob;

    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);

    fakeLink.remove();
  };

  React.useEffect(() => {
    console.log(file);
    var fr = new FileReader();
    fr.onload = function () {
      setSrc(fr.result);
    };
    fr.readAsDataURL(file);
  }, [file, setSrc]);

  return (
    <div className="mural">
      {blob && <img src={blob} style={{
        position: "relative",
        width: 'min-content',
        height: 'min-content',
        background: 'white',
        width: "400px",
        maxWidth: '100%',
            height: "auto"
      }} />}
      <div
        ref={canvasRef}
        style={{
          position: "relative",
          width: 'min-content',
          height: 'min-content',
          background: 'white',
          display: blob ? 'none' : 'flex'
        }}
      >
        <img
          src="mural.png"
          onLoad={()=> setLoad1(true)}
          crossOrigin="Anonymous"
          style={{
            width: "400px",
            height: "auto"
          }}
        />
        <img
          src={src}
          onLoad={()=> setLoad2(true)}
          crossOrigin="Anonymous"
          style={{
            width: "35px",
            position: "absolute",
            height: "41px",
            top: "259px",
            left: "217px",
            mixBlendMode: "multiply",
            transform: "rotate(-18.76deg) skewX(-11.4deg)",
            objectFit: "cover"
          }}
        />
      </div>
      {
        blob &&
      <div style={{
        display: 'flex',
        flexDirection: 'row', gap: '8px',
        paddingTop: '16px'
      }}>
        <RainbowButton onClick={downloadImage}>Download</RainbowButton>
        <div className="btn btn-secondary" onClick={onReset}>Try another</div>
      </div>
      }
    </div>
  );
}

export default React.memo(Mural)