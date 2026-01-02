import React,{useEffect} from 'react';
import './Puppy.css';
import { useNavigate } from 'react-router-dom';

const Puppy5 = () => {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  
  return (
    <div className="puppy1">
      <div className="puppy1-content">
        <div className="puppy1-image">
          <img
            src="pics/dog21.jpeg" alt="Dogs" className="dogs-image" />
        </div>
        <div className="puppy1-text">
          <h1 className="puppy1-title">PAWSITIVE CARE</h1>
          <p className="puppy1-description">
            In addition to running a full-time for-profit retail, manufacturing,
            and design outlet, we also run our very own Heads Up For Tails Foundation.
            Through this, we aim to reconnect our world with animals so we can
            all find a space to co-exist peacefully.
          </p>
          <p className="puppy1-description">
            Our work through the Foundation involves running grassroots programs
            that include sterilisation drives, feeding programs, adoption drives,
            and setting up reflective collars for street dogs, both independently
            and in collaboration with other NGOs.
          </p>
          <p className="puppy1-description">
            Our work through the Foundation involves running grassroots programs
            that include sterilisation drives, feeding programs, adoption drives,
            and setting up reflective collars for street dogs, both independently
            and in collaboration with other NGOs.
          </p>
          <button  className="view" onClick={()=>navigate("/PetAdoptionForm")}  type="button">Adopt Pet</button>
        </div>
        
      </div>
    </div>
  );
};

export default Puppy5;
