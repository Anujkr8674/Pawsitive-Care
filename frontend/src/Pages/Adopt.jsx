import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {  FaThumbsUp, FaShieldAlt, FaCertificate } from 'react-icons/fa';
import './Adopt.css';

const AdoptionPage = () => {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  
  return (
    <div className="adoption-page">
      {/* Navbar */}
      <nav className="navbar1">
        <div className="con11">
        <h1 id='h1'>    Take Your Best Buddy Home 🐕</h1>
        <p id='p1'>You can make a difference <br/> in their lives</p>
        <button id='btn'>Puppies Available</button>
        </div>
        
        
      </nav>


      <br/><br/>

      
      {/* Shop Section */}
      <div className="Ashop-section">
  <h2>Take Your Best Friend!!! Home</h2>
  
  <div className="Ashop-items">
    <div className="Ashop-item">
      <img src="pics/dog21.jpeg" alt="Toy 1" />
      <p>Trixie Cat Teaser - Playing Rod with Fish</p>
      <button  className="view" onClick={()=>navigate("/puppy1-detail")}  type="button">View Profile</button>
    </div>
    <div className="Ashop-item">
      <img src="pics/dog22.jpg" alt="Toy 2" />
      <p>Trixie Cat Teaser - Playing Rod with Fish</p>
      <button  className="view" onClick={()=>navigate("/puppy2-detail")}  type="button">View Profile</button>
    </div>
    <div className="Ashop-item">
      <img src="pics/dog23.jpg" alt="Toy 2" />
      <p>Trixie Cat Teaser - Playing Rod with Fish</p>
      <button  className="view" onClick={()=>navigate("/puppy3-detail")}  type="button">View Profile</button>
    </div>
    <div className="Ashop-item">
      <img src="pics/dog24.jpg" alt="Toy 2" />
      <p>Trixie Cat Teaser - Playing Rod with Fish</p>
      <button  className="view" onClick={()=>navigate("/puppy4-detail")}  type="button">View Profile</button>
    </div>

    <div className="Ashop-item">
      <img src="pics/dog21.jpeg" alt="Toy 1" />
      <p>Trixie Cat Teaser - Playing Rod with Fish</p>
      <button  className="view" onClick={()=>navigate("/puppy5-detail")}  type="button">View Profile</button>
    </div>
    <div className="Ashop-item">
      <img src="pics/dog22.jpg" alt="Toy 2" />
      <p>Trixie Cat Teaser - Playing Rod with Fish</p>
      <button  className="view" onClick={()=>navigate("/puppy6-detail")}  type="button">View Profile</button>
    </div>
    <div className="Ashop-item">
      <img src="pics/dog23.jpg" alt="Toy 2" />
      <p>Trixie Cat Teaser - Playing Rod with Fish</p>
      <button  className="view" onClick={()=>navigate("/puppy7-detail")}  type="button">View Profile</button>
    </div>
    <div className="Ashop-item">
      <img src="pics/dog21.jpeg" alt="Toy 1" />
      <p>Trixie Cat Teaser - Playing Rod with Fish</p>
      <button  className="view" onClick={()=>navigate("/puppy8-detail")}  type="button">View Profile</button>
    </div>
    <div className="Ashop-item">
      <img src="pics/dog22.jpg" alt="Toy 2" />
      <p>Trixie Cat Teaser - Playing Rod with Fish</p>
      <button  className="view" onClick={()=>navigate("/puppy9-detail")}  type="button">View Profile</button>
    </div>
    <div className="Ashop-item">
      <img src="pics/dog24.jpg" alt="Toy 2" />
      <p>Trixie Cat Teaser - Playing Rod with Fish</p>
      <button  className="view" onClick={()=>navigate("/puppy10-detail")}  type="button">View Profile</button>
    </div> 
   
  </div>
  <br/><br/>

  <button className="view1">View All</button>
</div>

      <br/><br/>

      {/* Why Choose Us Section */}
        {/* <div className="why-choose-us">
            <div className="contentP-wrapper">
            <img src="pics/dog19.png" id='pic1' alt="Description of the image" className="content-image1" />
            <div className="contentP">
                <h1>Why Choose Us?</h1>
                <ul>
                    <li><FaThumbsUp  size={30}/><h4>Highly qualified volunteers </h4></li>
                    <p6 id="p8">We are privileged to have a highly qualified volunteer who brings exceptional skills and dedication to our team.
                    We are privileged to have a highly qualified volunteer who brings exceptional skills and dedication to our team.</p6> <br/>
                     
                    <li><FaShieldAlt size={30}/><h4>Lovable dogs guaranteed</h4></li>
                    <p6 id="p8">We are privileged to have a highly qualified volunteer who brings exceptional skills and dedication to our team.
                    We are privileged to have a highly qualified volunteer who brings exceptional skills and dedication to our team.</p6><br/>
                   
                   
                    <li><FaCertificate size={30}/><h4>Certified healthy puppies</h4></li>
                    <p6 id="p8">We are privileged to have a highly qualified volunteer who brings exceptional skills and dedication to our team.
                    We are privileged to have a highly qualified volunteer who brings exceptional skills and dedication to our team.</p6><br/>
                    
                    
                </ul>
            </div>
        </div>
        </div> */}


        <div className="why-choose-us">
            <div className="content-wrapper1">
            <img src="pics/dog19.png" id='pic1' alt="Description of the image" className="content-image1" />
            <div className="content2">
                <h1 id='why'>Why Choose Us?</h1>
                <ul>
                    <li>
                      {/* <FaThumbsUp  size={30}/> */}
                    <h4> <FaThumbsUp size={20}></FaThumbsUp>Highly qualified volunteers </h4></li>
                    <p6 id="p8">We are privileged to have a highly qualified volunteer who brings exceptional skills and dedication to our team.
                    We are privileged to have a highly qualified volunteer who brings exceptional skills and dedication to our team.</p6> <br/>
                     
                    <li><h4><FaShieldAlt size={20} ></FaShieldAlt>Lovable dogs guaranteed</h4></li>
                    <p6 id="p8">We are privileged to have a highly qualified volunteer who brings exceptional skills and dedication to our team.
                    We are privileged to have a highly qualified volunteer who brings exceptional skills and dedication to our team.</p6><br/>
                   
                   
                    <li><h4> <FaCertificate size={20}></FaCertificate>Certified healthy puppies</h4></li>
                    <p6 id="p8">We are privileged to have a highly qualified volunteer who brings exceptional skills and dedication to our team.
                    We are privileged to have a highly qualified volunteer who brings exceptional skills and dedication to our team.</p6><br/>
                    
                    
                </ul>
            </div>
        </div>
        </div>

        <br/><br/><br/><br/>

        <div className="Adoption-Process">
            <div className="content-wrapper1">
            
            <div className="content2">
                <h1>Adoption Process</h1>
                <ul>
                    <li><h4><FaThumbsUp  size={20}></FaThumbsUp>Choose a pet </h4></li>
                    <p6 id="p9">We are privileged to have a highly qualified volunteer who brings exceptional skills and dedication to our team.
                    We are privileged to have a highly qualified volunteer who brings exceptional skills and dedication to our team.</p6> <br/>
                     
                    <li><h4><FaShieldAlt size={20}></FaShieldAlt>Fill The Adoption Form</h4></li>
                    <p6 id="p10">We are privileged to have a highly qualified volunteer who brings exceptional skills and dedication to our team.
                    </p6><br/>
                    
                    <li><h4> <FaShieldAlt size={20}></FaShieldAlt>Take A Puppy Home</h4></li>
                    <p6 id="p11">We are privileged to have a highly qualified volunteer who brings exceptional skills and dedication to our team.
                   </p6><br/>
                </ul>
            </div>
            {/* <br/>
             <button  onClick={()=>navigate("/PetAdoptionForm")} id='btn2' type="button">Adoption Form</button> */}
            
            <img src="pics/dog20.png" id='pic1' alt="Description of the image" className="content-image1" />
           

        </div>
        <br/>
            <br/>
              <button  onClick={()=>navigate("/PetAdoptionForm")} id='btn2' type="button">Adoption Form</button>
        </div>


      {/* Adoption Process Section */}

     {/* Adoption Process Section */}






      {/* Footer */}
      
    </div>
  );
  
};

export default AdoptionPage;
