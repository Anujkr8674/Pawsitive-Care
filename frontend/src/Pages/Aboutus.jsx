import React,{useEffect} from 'react';
import './Aboutus.css';

const Aboutus = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on component mount
}, []);
  return (
    <div className="about-us-container">
      {/* About Us Section */}
      <section id="about-section" className="about-section">
        {/* <h1 className="about-heading">About Us</h1> */}
        <div className="about-content">
          <img src="about/about1.png" alt="People with Dog" className="about-image" />
          <br/><br/>
          <p className="about-text">Long before the stores, the spas,<br/> and the website, even before that<br/> tiny spark of an idea came to be,<br/> there was love. The kind of love you<br/> can only share with a pet. <b>The kind<br/> of love that makes us family.</b></p>
        </div>
      </section>

      {/* Founder Section */}
      <section id="founder-section" className="founder-section">
        <div className="founder-content">
          <img src="about/about2.png" alt="Rashi and Sara" className="founder-image" />
          <div className="founder-text">
          <p className="about-text1">"Over a decade ago, a bundle of love named Sara bounded into our lives and  made our family whole.  Unquestioningly, she showered us with affection, expanded our hearts and showed us the way to pay it forward." </p>
            
            <p className="founder-name"><span>Padosan</span> <span>Founder</span></p>
          </div>
        </div>
      </section>

      {/* Senior Leadership Team */}
      <section id="leadership-section" className="leadership-section">
        <h2 className="leadership-heading">Senior Leadership Team</h2>
        <div className="aboutcon"> 
          <blockquote>Our senior leadership team comprises pet parents and individuals with diverse profiles.
           Together, they bring in a plethora of experience spanning across industries such as
            business, retail, finance, management consulting and HR. The team also has expertise in
             grooming, canine behaviour and understanding animal communication.
          </blockquote>
        </div>
        <br/><br/>
        <div className="leadership-team">
          <div className="team-member">
            <img src="about/Doc2.jpg"  alt="Team Member 1" />
            <p className="member-name">Founder</p>
          </div>
          <div className="team-member">
            <img src="about/Doc3.jpeg" alt="Team Member 2" />
            <p className="member-name">Co Founder</p>
          </div>
          <div className="team-member">
            <img src="about/Doc4.png"  alt="Team Member 3" />
            <p className="member-name"> Advisor</p>
          </div>
        </div>

        
      </section>

      {/* Hi Section */}
      <section id="hi-section" className="hi-section">
        {/* <h2 className="hi-heading">Hi!</h2>
        <p className="hi-subheading">We're Heads Up For Tails, India's first and most trusted pet care brand...</p> */}
        <div className="hi-content">
          {/* <img src="about/about3bg.png" alt="Dog" className="hi-image" /> */}
          <p className="hi-description">
          <h2 className="hi-heading">Hi!</h2>
          <p className="hi-subheading">
            <b>We're Heads Up For Tails...<br/><br/><br/> India’s 1st and most trusted pet care brand in the industry, dedicated to our favourite family members - our pets.</b>
          </p>
          <p className='border'><span>.............</span></p><br/>
            {/* As pet parents ourselves, we want to help you put your pet's best paw forward. We offer products, services, and expertise to support your pet’s well-being. Whether you're raising a puppy, senior dog, or anything in between, we’re here to help. */}
            <h4 className='head'>A little about us</h4>
            <p className='hi-subheading1'>
              As pet parents ourselves, we want to help every pet parent and their pet meet all their needs through our innovative products and services. Our hope is that we can play a meaningful role in bringing pets and their humans closer to each other for years and years to come, and through that build a kinder world.
           </p>
           </p>
          <img src="about/about3bg.png" alt="Dog" className="hi-image" />
        </div>
      </section>

      <br/><br/>

      
      


          {/* HUFT Foundation */}
      <section className="about1-section">
      <div className="about1-content">
        <div className="about1-image">
          <img
            src="about/about4.png" alt="Dogs" className="dogs-image"/>
        </div>
        <div className="about1-text">
          <h1 className="foundation-title">HUFT Foundation</h1>
          <p className="foundation-description">
            In addition to running a full-time for-profit retail, manufacturing,
            and design outlet, we also run our very own Heads Up For Tails Foundation.
            Through this, we aim to reconnect our world with animals so we can
            all find a space to co-exist peacefully.
          </p>
          <p className="foundation-description">
            Our work through the Foundation involves running grassroots programs
            that include sterilisation drives, feeding programs, adoption drives,
            and setting up reflective collars for street dogs, both independently
            and in collaboration with other NGOs.
          </p>
          {/* <button className="know-more-btn">Know More</button> */}
        </div>
      </div>
      <div className="cats-image-container">
        {/* <img
          src="about/cat1.png" alt="Cats" className="cats-image"/> */}
      </div>
    </section>


       {/* Vision Section */}
       <section id="vision-section" className="vision-section">
        <h2 className="vision-heading">OUR VISION</h2>
        <p className="vision-text">
          <b>When the right pet finds you, they can turn a house into a home,
           bring people closer, and fill our lives with endless love.</b>
        </p>
        <br/>
        <p>...................................</p>
        <br/>
        <p className='vision-text1'>At Heads Up For Tails, we envision that with our passion and efforts,
        every home can realise the joys of raising pets as family.</p>
      </section>


      {/* Mission Section */}
      <section id="mission-section" className="mission-section">
        <h2 className="mission-heading"><span className='white' >OUR</span> <span className='orange'>MISSION</span> </h2>
        {/* <div className="pics"> */}
        {/* <img src="about/about1.png" alt="People with Dog" className="about-image" /> */}
        
        <p className="mission-description">
          To create and curate innovative products and<br/> services that bring joy to pets and their families, one <br/>home at a time.
        </p>
        <br/>
        <div className="mission-stats">
          <div className="stat-item">13000+ Pet Products</div>
          <div className="stat-item">250+ Brands</div>
          {/* <div className="stat-item">400+ In-House Products</div> */}
          <div className="stat-item">90+ Stores</div>
        </div>
        {/* </div> */}
      </section>
            <br/><br/><br/>


      
      <section id="values-section" className="values-section">
      <h2 className="values-heading">OUR VALUES</h2>
      <br/>
      <div className="values-team">
          <div className="values-member">
            <img src="about/Doc2.jpg"  alt="Value 1" />
            <p className="values-name"><h3>Innovation</h3>
            We believe in pushing boundaries, thinking big, and constantly evolving to provide the best for our pets.</p>
          </div>
          <div className="values-member">
            <img src="about/Doc2.jpg"  alt="Value 1" />
            <p className="values-name"><h3>Courage</h3>
             We fight for what's right for our pet family, and we're not afraid to make bold decisions for their well-being.</p>
          </div>
          <div className="values-member">
            <img src="about/Doc2.jpg"  alt="Value 1" />
            <p className="values-name"><h3>Innovation</h3>
            We believe in pushing boundaries, thinking big, and constantly evolving to provide the best for our pets.</p>
          </div>
        </div>
        </section>
    </div>
  );
};

export default Aboutus;





