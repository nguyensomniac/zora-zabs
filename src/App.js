import React from "react";
import "./styles.css";
import Mural from "./Mural";
import FileDrop from "./FileDrop";

export default function App() {
  const [file, setFile] = React.useState(undefined);
  const resetFile = () => {
    setFile(undefined)
  }
  return (
    <div style={{
      background: 'url("bg.svg") center no-repeat',
      minHeight: '100vh',
      minWidth: '100vw',
    }}>
      {file && <Mural file={file} onReset={resetFile} />}
      {!file && (
        <FileDrop
          onDrop={(file) => {
            setFile(file);
          }}
        />
      )}
    </div>
  );
}
