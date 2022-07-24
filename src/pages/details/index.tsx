import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Character } from "models/Character";
import { getByName } from "services/ApiService";
import { Done, Clear } from '@mui/icons-material';


import "./index.css";

const gryffindor = require('assets/gryffindor.png');
const slytherin = require('assets/slytherin.png');
const hufflepuff = require('assets/hufflepuff.png');
const ravenclaw = require('assets/ravenclaw.png');
const noHouse = require('assets/noHouse.png');

const houseImage = (house: string | undefined) => {
  switch (house) {
    case 'Gryffindor':
      return <img className="house-image" src={gryffindor} />;
    case 'Slytherin':
      return <img className="house-image" src={slytherin} />;
    case 'Hufflepuff':
      return <img className="house-image" src={hufflepuff} />;
    case 'Ravenclaw':
      return <img className="house-image" src={ravenclaw} />;
    default:
      return <img className="house-image" src={noHouse} />;
  }
}

const renderWandInformation = (characterData: Character | undefined) => {
  if (!characterData || characterData?.wand.wood === '' || characterData?.wand.core === '' || !characterData?.wand.length){
    return <></>;
  }
  return (
    <div className="wand-information">
      <div className="title">Wand information</div>
      <div className="element"><span className="title">Wood:</span> {characterData?.wand?.wood}</div>
      <div className="element"><span className="title">Core:</span> {characterData?.wand?.core}</div>
      <div className="element"><span className="title">Length:</span> {characterData?.wand?.length}</div>
    </div>
  );
}

const Details = () => {
  const urlParams = useParams();
  const [characterData, setCharacterData] = useState<Character>();

  useEffect(() => {
    setCharacterData(getByName(urlParams.name || ""));
  }, [urlParams]);

  return (
    <div className="character-data-warpper">
      <div className="character-data">
        <div className="character-name">{characterData?.name}</div>
        <div className="image"><img src={characterData?.image} /></div>
        <div className="basic-data">
          <div className="house-image-container">{ houseImage(characterData?.house) }</div>
          {characterData?.dateOfBirth !== '' ? <div className="element"><span className="title">Birth:</span> {characterData?.dateOfBirth}</div> : <></> }
          {characterData?.alive !== null ? <div className="element"><span className="title">Alive:</span> {characterData?.alive ? <Done className="icon" /> : <Clear className="icon" />}</div> : <></> }
          {characterData?.hogwartsStudent !== null ? <div className="element"><span className="title">Student:</span> {characterData?.hogwartsStudent ? <Done className="icon" /> : <Clear className="icon" />}</div> : <></> }
          {characterData?.hogwartsStaff !== null ? <div className="element"><span className="title">Staff:</span> {characterData?.hogwartsStaff ? <Done className="icon" /> : <Clear className="icon" />}</div> : <></> }
          {characterData?.eyeColour !== '' ? <div className="element"><span className="title">Eye colour:</span> {characterData?.eyeColour}</div> : <></> }
          {characterData?.hairColour !== '' ? <div className="element"><span className="title">Hair colour:</span> {characterData?.hairColour}</div> : <></> }
        </div>
        { renderWandInformation(characterData) }
        <Link className="return" to="/">Go to Index</Link>
      </div>
    </div>
  );
};

export default Details;
