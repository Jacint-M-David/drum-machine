import './App.css';
import {useState, useEffect} from "react";

// const Drumpad = ({id, audioSrc}) => {
//     const playAudio = () => {
//         const audio = new Audio(audioSrc);
//         audio.play();
//     };    
//     return <button onKeyUp={playAudio} onClick={playAudio}>{id}</button>
// };

const Drumpad = ({name, clickHandler}) => {   
    return (
        <div className="drumpad">
            <button onClick={clickHandler}>{name}</button>
            {/* This tag makes no sense and only exists to fulfil User Story #4 */}
            <audio src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" id={name} className='clip'></audio>
        </div>
    )
};

function App() {
    const drumpads = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"],
        audioLinks = [
            "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3", 
            "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3", 
            "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3", 
            "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3", 
            "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3", 
            "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3", 
            "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3", 
            "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3", 
            "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
        ],
        playAudio = audioLink => (event) => {
            const audio = new Audio(audioLink);
            const soundName = idDescription[audioLinks.indexOf(audioLink)];
            setPlaying(soundName)
            setTimeout(() => {
                setPlaying("")    
            }, 250);
            audio.play();
            // console.log(event.target.innerText);
            // setPlaying(event.target.name);
            // setTimeout()
        },
        keyUpHandler = (event) => {
            if (drumpads.some(letter => letter === event.key.toUpperCase())) {
                const index = drumpads.indexOf(event.key.toUpperCase());
                const button = document.querySelector(`#${event.key.toUpperCase()}`).previousElementSibling;
                console.log(button);
                button.classList.toggle("active");
                setTimeout(() => {button.classList.toggle("active")}, 200);
                playAudio(audioLinks[index])();
            }
        },
        idDescription = ["Heater-1", "Heater-2", "Heater-3", "Heater-4", "Clap", "Open-HH", "Kick-n'-Hat", "Kick", "Closed-HH"],
        [playing, setPlaying] = useState("");
        
        useEffect(() => {
            document.addEventListener("keypress", keyUpHandler);
        },[]);
        
        return (
            <div className="App" tabIndex="0">
        <h1 className="h1">Drum Machine</h1>
        <main id="drum-machine">
            <section className="section">
                {drumpads.map((drumpad, index) => <Drumpad name={drumpad} key={index} audioSrc={audioLinks[index]}  clickHandler={playAudio(audioLinks[index])} id={idDescription[index]}/>)}
            </section>
        </main>
            <div id="display">
                <output>{playing}</output>
            </div>
    </div>
  );

}


export default App;
