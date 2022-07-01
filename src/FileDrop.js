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
      Drag and drop file here
      <span
        style={{
          opacity: 0.5
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
