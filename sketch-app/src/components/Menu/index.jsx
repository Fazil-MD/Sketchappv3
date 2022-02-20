import React from 'react';
import styles from "./styles.module.css"


const Menu = ({ setLineColor, clearRect, addimagehandler, savecanvas, loadcanvas }) => {

  return (
    <div className={styles.Menu}>
      <label>Brush Color </label>
      <input
        type="color"
        onChange={(e) => {
          setLineColor(e.target.value);
        }}
      />
      <label className={styles.upload_label}>
        Upload Image
        <input id="uploader" className={styles.upload_btn} type="file" onChange={addimagehandler} />
      </label>
      <input type="button" className={styles.clear_btn} value="Clear" onClick={(e) => { clearRect(e.target.value) }} />
      <input type="button" id='save' className={styles.save_btn} value="Save" onClick={savecanvas} />
      <input type="button" id="load-btn" className={styles.load_btn} value="Load" onClick={loadcanvas} />
    </div>
  )

}

export default Menu;