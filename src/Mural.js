import React from "react";
import html2canvas from "html2canvas-add-mix-blend-mode";

export default function Mural({ file, onReset }) {
  const [src, setSrc] = React.useState("");
  const canvasRef = React.useRef(null);
  const downloadCanvas = async () => {
    const canvas = await html2canvas(canvasRef.current, { useCORS: true });
    const image = canvas.toDataURL("image/png", 1.0);
    downloadImage(image, "zimage.png");
  };

  const downloadImage = (blob, fileName) => {
    const fakeLink = window.document.createElement("a");
    fakeLink.style = "display:none;";
    fakeLink.download = fileName;

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
      <div
        ref={canvasRef}
        style={{
          position: "relative",
          width: 'min-content',
          height: 'min-content',
          background: 'white',
          display: 'flex'
        }}
      >
        <img
          src="mural.png"
          crossOrigin="Anonymous"
          style={{
            width: "400px",
            height: "auto"
          }}
        />
        <img
          src={src}
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
      <div style={{
        display: 'flex',
        flexDirection: 'row', gap: '8px',
        paddingTop: '16px'
      }}>
        <div className="btn" onClick={downloadCanvas}>Download</div>
        <div className="btn btn-secondary" onClick={onReset}>Try another</div>
      </div>
    </div>
  );
}
