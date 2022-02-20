import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Menu from "../Menu";
import styles from './styles.module.css'


const PaintBoard = () => {

    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const textRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lineColor, setLineColor] = useState('black');
    const [imageData, setImageData] = useState([]);
    const [loadData, setLoadData] = useState();
    //  const [textData, setText] = useState('');
    var textdata = "";

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.strokeStyle = lineColor;
        ctxRef.current = ctx;
        loadAllCanvas();

    }, [lineColor]
    )

    // Function for starting the drawing
    const startDrawing = (e) => {
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(
            e.nativeEvent.offsetX,
            e.nativeEvent.offsetY
        );
        setIsDrawing(true);
    };

    // Function for ending the drawing
    const endDrawing = () => {
        ctxRef.current.closePath();
        setIsDrawing(false);
    };

    const draw = (e) => {
        if (!isDrawing) {
            return;
        }
        ctxRef.current.lineTo(
            e.nativeEvent.offsetX,
            e.nativeEvent.offsetY
        );

        ctxRef.current.stroke();
    };

    //Add image to Canvas
    const addImage = (e) => {
        var img = new Image();
        img.onload = () => {
            ctxRef.current.drawImage(img, 100, 100, img.width * 0.3, img.height * 0.3)
        }
        img.src = URL.createObjectURL(e.target.files[0]);

    }

    const addText = () => {
        clearRect();
        ctxRef.current.fillStyle = "black";
        ctxRef.current.textBaseline = 'middle';
        ctxRef.current.font = "50px 'Montserrat'";
        textdata = textRef.current.value;
        ctxRef.current.fillText(textdata, 50, 50);
        console.log(textdata);
    }


    //Clear Canvas
    const clearRect = () => {
        ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    //save canvas
    const saveCanvas = async (e) => {
        e.preventDefault();
        var canvasContent = canvasRef.current.toDataURL(); //a data URL of the current canvas
        let userDetails = JSON.parse(localStorage.getItem('currentUser'));
        var data = { image: canvasContent, user: userDetails.firstName };
        setLoadData(data); // saving current canvas to temp variable
        //var sendData = JSON.stringify(data);
        const url = "http://localhost:8080/api/canvas";
        axios.post(url, data);

    }

    //load canvas
    const loadCanvas = () => {
        loadAllCanvas();
        var image = new Image();
        ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        image.onload = () => {
            ctxRef.current.drawImage(image, 0, 0)
        }
        var canvasContent = canvasRef.current.toDataURL();
        let userDetails = JSON.parse(localStorage.getItem('currentUser'));
        var data = { image: canvasContent, user: userDetails.firstName };
        if (loadData.user === data.user) {
            image.src = loadData.image;
        }
        else {
            return null;
        }
    }


    const loadAllCanvas = async () => {
        const url = "http://localhost:8080/api/canvas";
        axios.get(url, {
            responseType: 'json',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                console.log(response)
                setImageData(response.data);
            }
            )


    }
    return (
        <div className={styles.wrapper}>
            <nav className={styles.sidebar}>
                <aside>
                    <span>
                        <figure>
                            {imageData.map((data, i) =>
                                [<React.Fragment key={i}>
                                    <img src={data.image} alt="" />
                                    <figcaption >{data.user}</figcaption>
                                </React.Fragment>])}
                        </figure>
                    </span>
                </aside>
            </nav>
            <div className={styles.main_board}>
                <Menu
                    setLineColor={setLineColor}
                    clearRect={clearRect}
                    addimagehandler={addImage}
                    savecanvas={saveCanvas}
                    loadcanvas={loadCanvas}
                //addtexthandler={addText}
                />
                <div className={styles.draw_area}>
                    <canvas
                        id="canvas"
                        onMouseDown={startDrawing}
                        onMouseUp={endDrawing}
                        onMouseMove={draw}
                        ref={canvasRef}
                        width={`600px`}
                        height={`400px`}
                    />
                </div>
            </div>
            <span className={styles.text_span}>
                <input type="text" name="" id="text_canvas" className={styles.text_canvas} placeholder="type here" ref={textRef} onKeyUp={addText} />
            </span>
        </div >
    )
}

export default PaintBoard;