import React, { useState, useEffect, useRef } from "react";
import { Card } from "antd";
import { Rnd } from "react-rnd";
import styles from "../../styles/Note.module.css";
import { DeleteOutlined, DragOutlined } from "@ant-design/icons";
import noteSaver from "../../utils/noteSaver";

export default function Note({ s, p, t, c, id, setter, containerRef }) {
  // const [size, setSize] = useState(s);
  const sizeRef = useRef(s);
  // const [position, setPosition] = useState(p);
  const positionRef = useRef(p);
  const [title, setTitle] = useState(t);
  const [content, setContent] = useState(c);

  let titleRef = useRef<HTMLTextAreaElement>(null);
  let contentRef = useRef<HTMLTextAreaElement>(null);

  const cardRef = useRef();
  const rndRef = useRef();

  function handleChange(event, setter) {
    setter(event.target.value);
  }

  function onDragStop(e, d) {
    // setPosition({ x: d.x, y: d.y });
    // getPositions();
    positionRef.current = { x: d.x, y: d.y };
    saveState();
  };

  // function getPositions() {
  //   const container = containerRef.current as HTMLElement;
  //   const siblings = container.children as HTMLCollection;
  //   console.log(container, siblings);
  //   for (let i = 0; i < siblings.length; i++) {
  //     console.log(siblings[i]);
  //   }
  // }
  
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
      ref={rndRef}
      // size={size}
      size={sizeRef.current}
      // position={position}
      position={positionRef.current}
      onDragStop={onDragStop}
      dragGrid={[30, 30]}
      bounds="parent"
      dragHandleClassName={styles.DragOutlined}
    >

      <Card ref={cardRef} className={styles.Card}>
        <DragOutlined className={styles.DragOutlined}/>
        <DeleteOutlined className={styles.DeleteOutlined} 
        onClick={deleteNote} />

        <textarea ref={titleRef} className={`${styles.noteTextarea} ${styles.title}`}
          onChange={(event) => handleChange(event, setTitle)}
          onBlur={saveState}
          // onKeyDown={(event) => event.keyCode === 13 ? console.log('enter') : contentRef.current.focus()}
          placeholder="Title" defaultValue={t}></textarea>

        <textarea ref={contentRef} className={`${styles.noteTextarea} ${styles.content}`}
          onChange={(event) => handleChange(event, setContent)}
          onBlur={saveState}
          placeholder="Content" defaultValue={c}></textarea>
      </Card>

    </Rnd>
  )
}