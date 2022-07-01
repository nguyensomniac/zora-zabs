import "./styles.css";
import * as React from "react";
import classNames from "classnames";

export default function FileDrop(props) {
  const { onDrop } = props;
  const [isDragging, setIsDragging] = React.useState(false);
  const inputRef = React.useRef(null);

  const toggleIsDragging = (val) => {
    setIsDragging(val);
  };

  return (
    <div
      onDragOver={(e) => {
        toggleIsDragging(true);
        e.preventDefault();
        e.stopPropagation();
      }}
      onDragEnter={() => toggleIsDragging(true)}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        let file;
        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
          if (
            e.dataTransfer.files[0].type === "image/png" ||
            e.dataTransfer.files[0].type === "image/jpeg"
          ) {
            file = e.dataTransfer.files[0];
            onDrop(file);
          }
        }
      }}
      onDragLeave={() => toggleIsDragging(false)}
      onClick={() => {
        if (inputRef && inputRef.current) {
          inputRef.current.click();
        }
      }}
      className={classNames("fileDrop", isDragging && "fileDropActive")}
    >
      <div
        style={{
          overflow: "hidden",
          height: "min-content",
          width: "min-content",
          transform: "translate(-50%, -50%)",
          position: "absolute",
          top: "50%",
          left: "50%",
          background: 'white'
        }}
      >
        <img
          style={{
            width: "400px",
            height: "auto",
            filter: "blur(10px)",
          }}
          src={"./mural.png"}
        />
      </div>
      <div style={{zIndex: 1}}>
        <svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M72 36C72 55.8823 55.8823 72 36 72C16.1177 72 0 55.8823 0 36C0 16.1177 16.1177 0 36 0C55.8823 0 72 16.1177 72 36Z"
            fill="white"
          />
          <path
            d="M34.5 50.0859V20.4141H38.5078V50.0859H34.5ZM21.6562 37.2422V33.2578H51.3516V37.2422H21.6562Z"
            fill="#B7B7B7"
          />
        </svg>
      </div>

      <span
        style={{
          opacity: 1,
          zIndex: 1,
          color: "white",
        }}
      >
        Drag and drop file here
      </span>
      <span
        style={{
          color: "white",
          opacity: 0.75,
        }}
      >
        PNG & JPG accepted
      </span>
      <input
        type="file"
        hidden
        ref={inputRef}
        onChange={(e) => {
          if (e.target && e.target.files && e.target.files[0]) {
            onDrop(e.target.files[0]);
          }
        }}
        accept=".png, .jpg"
      />
    </div>
  );
}
