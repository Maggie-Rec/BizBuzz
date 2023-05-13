import React, { useState, useEffect, useRef } from "react";
import { Card } from "antd";
import { Rnd } from "react-rnd";
import styles from "../../styles/Note.module.css";
import { CloseOutlined, DragOutlined } from "@ant-design/icons";
import noteSaver from "../../utils/noteSaver";
import randomAlphaNumeric from "../../utils/randomizer";
import { useDispatch } from "react-redux";

export default function Note({ s, p, t, c, id, setter }) {
  // const [size, setSize] = useState(s);
  const sizeRef = useRef(s);
  // const [position, setPosition] = useState(p);
  const positionRef = useRef(p);
  const [title, setTitle] = useState(t);
  const [content, setContent] = useState(c);

  let titleRef = useRef<HTMLTextAreaElement>(null);
  let contentRef = useRef<HTMLTextAreaElement>(null);

  const dispatch = useDispatch();
  const cardRef = useRef();

  function handleChange(event, setter) {
    setter(event.target.value);
  }

  function onDragStop(e, d) {
    // setPosition({ x: d.x, y: d.y });
    positionRef.current = { x: d.x, y: d.y };
    saveState();
  };
  
  function onResizeStop(e, direction, ref, delta, position) {
    // setSize({
    //   width: parseInt(ref.style.width),
    //   height: parseInt(ref.style.height),
    // });
    positionRef.current = {
      width: parseInt(ref.style.width),
      height: parseInt(ref.style.height),
    };
    // setPosition(position);
    saveState();
    // noteSaver(states);
  };

  function deleteNote() {
    setter((prev) => {
      let next = prev.filter(element => element.id !== id);
      noteSaver(next);
      return next;
    });
  };

  function saveState() {
    setter((prev) => {
      let next = [...prev];
      let index = next.findIndex(element => element.id === id);
      next[index] = {
        // s: size,
        s: sizeRef.current,
        // p: position,
        p: positionRef.current,
        t: title,
        c: content,
        id: id
      };
      noteSaver(next);
      return next;
    });
  };

  return (
    <Rnd
      // size={size}
      size={sizeRef.current}
      // position={position}
      position={positionRef.current}
      onDragStop={onDragStop}
      onResizeStop={onResizeStop}
      dragGrid={[30, 30]}
      resizeGrid={[30, 30]}
      bounds="parent"
      minWidth={300}
      minHeight={300}
      dragHandleClassName={styles.DragOutlined}
    >

      <Card ref={cardRef} className={styles.Card}>
        <DragOutlined className={styles.DragOutlined}/>
        <CloseOutlined className={styles.CloseOutlined} 
        onClick={deleteNote} />

        <textarea ref={titleRef} className={`${styles.noteTextarea} ${styles.title}`}
          onChange={(event) => handleChange(event, setTitle)}
          onBlur={saveState}
          placeholder="Title" defaultValue={t}></textarea>

        <textarea ref={contentRef} className={`${styles.noteTextarea} ${styles.content}`}
          onChange={(event) => handleChange(event, setContent)}
          onBlur={saveState}
          placeholder="Content" defaultValue={c}></textarea>
      </Card>

    </Rnd>
  )
}