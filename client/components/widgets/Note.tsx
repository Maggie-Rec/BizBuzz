import React, { useState, useEffect, useRef } from "react";
import { Card } from "antd";
import { Rnd } from "react-rnd";
import styles from "../../styles/Note.module.css";
import { CloseOutlined } from "@ant-design/icons";
import noteSaver from "../../utils/noteSaver";
import randomAlphaNumeric from "../../utils/randomizer";
import { useDispatch } from "react-redux";

export default function Note({ s, p, t, c, id }) {
  const [size, setSize] = useState(s);
  const [position, setPosition] = useState(p);
  const [title, setTitle] = useState(t);
  const [content, setContent] = useState(c);

  let titleRef = useRef<HTMLTextAreaElement>(null);
  let contentRef = useRef<HTMLTextAreaElement>(null);

  const dispatch = useDispatch();

  function handleChange(event, setter) {
    setter(event.target.value);
    dispatch({
      type: "EDIT_NOTE",
      payload: {
        s: s,
        p: p,
        t: t,
        c: c,
        id: id
      }
    })
    // noteSaver(states);
  }

  function onDragStop(e, d) {
    setPosition({ x: d.x, y: d.y });
    // noteSaver(states);
  };

  function onResizeStop(e, direction, ref, delta, position) {
    setSize({
      width: parseInt(ref.style.width),
      height: parseInt(ref.style.height),
    });
    setPosition(position);
    // noteSaver(states);
  };

  function deleteNote() {
    null;
  }

  // useEffect(() => {
  //   console.log(titleRef, contentRef);
  //   // titleRef.current.value = t;
  //   // contentRef.current.value = c;
  // }, []);

  return (
    <Rnd
      size={size}
      position={position}
      onDragStop={onDragStop}
      onResizeStop={onResizeStop}
      dragGrid={[30, 30]}
      resizeGrid={[30, 30]}
      bounds="parent"
      minWidth={300}
      minHeight={300}
    >

      <Card className={styles.Card}>
        <CloseOutlined className={styles.CloseOutlined} />

        <textarea ref={titleRef} className={`${styles.noteTextarea} ${styles.title}`}
          onChange={(event) => handleChange(event, setTitle)}
          placeholder="Title"></textarea>

        <textarea ref={contentRef} className={`${styles.noteTextarea} ${styles.content}`}
          onChange={(event) => handleChange(event, setContent)}
          placeholder="Content"></textarea>
      </Card>

    </Rnd>
  )
}