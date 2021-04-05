import React, { useState } from "react";
import "../App.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function SelectFirstPlayerModal(props) {
    const [isOpen, setIsOpen] = useState(props.isOpen);
    const [selectedOption, setSelectedOption] = useState(null);

    function getStartingPlayerRandomly() {
        console.log("meep");
        let players = ["Red", "Yellow"];
        let random = Math.floor(Math.random() * players.length);
        return players[random];
    }
  
    function toggleModal() {
        setIsOpen(!isOpen);
    }

    function onValueChange(event) {
        setSelectedOption(event.target.value);
    }

    function submitFirstPlayer(event) {        
        if (selectedOption === "Random") {
            props.selectFirstPlayer(getStartingPlayerRandomly());
        } else {
            props.selectFirstPlayer(selectedOption);
        }

        setIsOpen(!isOpen);
    }
  
    return (
      <>
        <Modal
          isOpen={isOpen}
          onRequestClose={toggleModal}
          contentLabel="Modal to select the player who goes first"
          className="select-first-player-modal"
          overlayClassName="select-first-player-modal-overlay"
          closeTimeoutMS={500}
          shouldCloseOnOverlayClick={false}
        >
          <div>Select the Player who goes first</div>
          <div className="radio">
                <label>
                    <input
                    type="radio"
                    value="Red"
                    checked={selectedOption === "Red"}
                    onChange={onValueChange}
                    />
                    Red
                </label>
            </div>
            <div className="radio">
                <label>
                    <input
                    type="radio"
                    value="Yellow"
                    checked={selectedOption === "Yellow"}
                    onChange={onValueChange}
                    />
                    Yellow
                </label>
            </div>
            <div className="radio">
                <label>
                    <input
                    type="radio"
                    value="Random"
                    checked={selectedOption === "Random"}
                    onChange={onValueChange}
                    />
                    Random
                </label>
            </div>
          <button onClick={submitFirstPlayer} disabled={selectedOption === null}>Continue</button>
        </Modal>
      </>
    );
  }