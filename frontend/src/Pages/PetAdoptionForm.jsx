import React, { useState,useEffect, Children } from "react";
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import './PetAdoptionForm.css'; // Ensure this imports the updated CSS file

const PetAdoptionForm = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});


  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    petName: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    referenceName: "",
    referenceEmail: "",
    referenceContactNo: "",
    
    
    ownPets: "",
    // add
    petName1: "",
    
    petBreed:"",
    // add end
    petDetails: "",
    veterinarianFirstName: "",
    veterinarianLastName: "",


    veterinarianPhone: "",
    homeOwnership: "",
    landlordInfo: "",
    yard: "",
   
    isFenced: "",

    petPolicy: "",
    // add code child
    surrendered:"",
    childrenHome:"",          
    hoursAlone: "",
    cratePet: "",
    emergencyPlan: "",
    behavioralIssues: "",
    animalCrimes: "",
    crimeDetails: "",
    date: "",
    amount:"",
    paymentMethod:"",
    image: "",
    signature: ""
    


  });


  const [petParent, setPetParent] = useState('');
  const [personalReferences, setPersonalReferences] = useState('');
  const [petName, setPetName] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [isFenced, setIsFenced] = useState('');
  const [landlordPolicy, setLandlordPolicy] = useState('');
  const [childrenHome, setChildrenHome] = useState('');
  const [hoursAlone, setHoursAlone] = useState('');
  
  const[crimeDetails, setCrimeDetails] = useState('');
  // const [amount, setAmount] = useState('');


  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  // Add code 
  const [selectedImage, setSelectedImage] = useState(null); // State for modal image
  const [modalOpen, setModalOpen] = useState(false); // State to control modal visibility
  // added
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
    upiId: ''
  });

 

  const countries = ["India", "USA", "Canada", "UK", "Australia"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setFormData({ ...formData, [name]: value });

      // Convert email to lowercase
  if (name === "email" || name ==="referenceEmail") {
    setFormData({ ...formData, [name]: value.toLowerCase() });
  } 
  // Allow only digits for phone number
  else if (name === "phone" || name === "veterinarianPhone" || name === "referenceContactNo" || name === "hoursAlone") {
    setFormData({ ...formData, [name]: value.replace(/\D/g, '') });
  } 
  else {
    setFormData({ ...formData, [name]: value });
  }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setImage(file); // Update state with the file
    }
  };


  const handleReferenceChange = (index, field, value) => {
    const updatedReferences = [...formData.references];
    updatedReferences[index][field] = value;
    setFormData({ ...formData, references: updatedReferences });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePaymentDetailsChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };









  
  // Validation function
  const validate = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.petName) newErrors.petName = "pet Name is required";

    if (!formData.address){ newErrors.address = "Address is required";
  } else if (!/^[a-zA-Z0-9\s.,+'  -/#]*$/.test(formData.address)) {
    newErrors.address = "Address contains invalid characters";
  }
    if (!formData.city){newErrors.city = "City is required";
    }else if (!/^[a-zA-Z0-9\s.,+'  -/#]*$/.test(formData.city)) {
      newErrors.city = "city contains invalid characters";
    }
    if (!formData.state) {newErrors.state = "State is required";
     } else if (!/^[a-zA-Z0-9\s.,+'  -/#]*$/.test(formData.state)) {
      newErrors.state = "Address contains invalid characters";
    }

    // if (!formData.zip) {
    //   newErrors.zip = "ZIP code is required";
    // } else if (!/^\d{6}$/.test(formData.zip)) {
    //   newErrors.zip = "ZIP code must be 6 digits";
    // }

      // ZIP code validation for 6 digits
  if (!formData.zip) {
    newErrors.zip = "ZIP code is required";
  } else if (!/^\d{6}$/.test(formData.zip)) {
    newErrors.zip = "ZIP code must be exactly 6 digits";
  }

    // Pets validation
    if (!formData.ownPets) {
      newErrors.ownPets = "Please specify if you own any pets.";
    } else if (formData.ownPets === "Yes") {
      if (!formData.petName1) newErrors.petName1 = "Pet name is required.";
      if (!formData.petBreed) newErrors.petBreed = "Pet breed is required.";
      if (!formData.petDetails) newErrors.petDetails = "Pet details are required.";
      if (!formData.veterinarianFirstName) newErrors.veterinarianFirstName = "Veterinarian first name is required.";
      if (!formData.veterinarianLastName) newErrors.veterinarianLastName = "Veterinarian last name is required.";
      // if (!formData.veterinarianPhone) {
      //   newErrors.veterinarianPhone = "Veterinarian phone is required.";
      // } else if (!/^\(\+\d{2}\)\s\d{3}-\d{3}-\d{4}$/.test(formData.veterinarianPhone)) {
      //   newErrors.veterinarianPhone = "Invalid phone No";
      // }



      if (!formData.veterinarianPhone) {
        newErrors.veterinarianphone = "Veterinarian Phone number is required";
      } else if (!/^\d{10}$/.test(formData.veterinarianPhone)) {
        newErrors.veterinarianphone = "Phone number must be 10 digits";
      }

    }

    // Home validation
    if (!formData.homeOwnership) {
      newErrors.homeOwnership = "Please specify your home ownership.";
    } else if (formData.homeOwnership === "Rent" && !formData.landlordInfo) {
      newErrors.landlordInfo = "Landlord's information is required for renters.";
    }

    // Yard validation
    if (!formData.yard) {
      newErrors.yard = "Please specify if you have a yard.";
    } else if (formData.yard === "Yes" && !formData.isFenced) {
      newErrors.isFenced = "Please specify if the yard is fenced.";
    }

    // Reference validation
    if (!formData.referenceName) newErrors.referenceName = "Reference name is required.";
    if (!formData.referenceEmail) {
      newErrors.referenceEmail = "Reference email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.referenceEmail)) {
      newErrors.referenceEmail = "Invalid reference email.";
    }
    if (!formData.referenceContactNo) {
      newErrors.referenceContactNo = "Reference contact number is required.";
    } else if (!/^\d{10}$/.test(formData.referenceContactNo)) {
      newErrors.referenceContactNo = "Invalid 10-digit contact number.";
    }



    if (!formData.animalCrimes) newErrors.animalCrimes = "Please specify if you have been convicted of an animal-related crime.";
    if (formData.animalCrimes === "Yes" && !formData.crimeDetails) {
      newErrors.crimeDetails = "Please provide additional details regarding the conviction.";
    }

    if (!formData.date) newErrors.date = "Please provide the date.";
    // if (!formData.petImage) newErrors.petImage = "Please upload a pet image.";

    // if (!formData.date) newErrors.date = "Date is required.";


    
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async(e) => {
    e.preventDefault();


    if (!validate()) {
      alert('Please correct the errors in the form before submitting.');
      return;
    }




     // Create FormData to send both form fields and image
     const formDataToSend = new FormData();


    //  Append all form fields
     for (const key in formData) {
       formDataToSend.append(key, formData[key]);
     }
 



        // // Append all fields in formData
        // Object.keys(formData).forEach(key => {
        //   formDataToSend.append(key, formData[key]);
        // });



     // Append the image file if uploaded
     if (image) {
       formDataToSend.append('petImage', image); // Image should be uploaded with the key 'petImage'
     }
   



          // const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token'); // Get the token from localStorage
    const userId = localStorage.getItem('userId');
    // const email = localStorage.getItem('email');

    // console.log("Token in PetAdoption:", token); // Log the token value

    // if ( !token) {
      if (!token || !userId) {
      alert('User authentication details are missing. Please log in again.');
      return;
    }

      // Append userId to formDataToSend
      formDataToSend.append('userId', userId);


    try {
      
      // Submit form data to the server
      const response = await axios.post(API_ENDPOINTS.USER_PET_ADOPTIONS,  formDataToSend,{
      headers: {
        // 'Content-Type': 'application/json',
        
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        // 'Content-Type': 'multipart/form-data'
        
      }
    });
      alert('Pet adoption request submitted successfully!');
      setError('');
      setFormErrors({});
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        petName: "",
        address: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        referenceName: "",
        referenceEmail: "",
        referenceContactNo: "",
       
        ownPets: "",
        // add
        petName1: "",
        
        petBreed:"",
        // add end
        petDetails: "",
        veterinarianFirstName: "",
        veterinarianLastName: "",
        // veterinarianName: "",
        veterinarianPhone: "",
        homeOwnership: "",
        landlordInfo: "",
        yard: "",

        isFenced: "",

        petPolicy: "",
        // add chhild
        surrendered:"",
        childrenHome: "",
        hoursAlone: "",
        cratePet: "",
        emergencyPlan: "",
        behavioralIssues: "",
        animalCrimes: "",
        crimeDetails: "",
        date: "",
        amount:"",
        signature: "",
        paymentMethod: "",
        image: "",
      });
      setPaymentMethod('');
      setPaymentDetails({
        cardNumber: '',
        cardExpiry: '',
        cardCVV: '',
        upiId: ''
      });
      setImage(null);
      setImagePreview('');
    } catch (err) {
      alert('Failed to submit the pet adoption request. Please try again.');
      setSuccessMessage('');
    }
  
  };



  // add code 

  // add modal code
  const handleOpenModal = () => {
    setSelectedImage(imagePreview);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  // added


 
  

  return (

   

    <form onSubmit={handleSubmit}>
     
      <h2>Pet Adoption Application Form</h2>
      <h4>Perspective Pet Parent</h4>

      <div className="form-row">
        <div className="form-group">
          <label>First Name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
           {formErrors.firstName && <span className="error">{formErrors.firstName}</span>}
        </div>
        <div className="form-group">
          <label>Last Name *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
           {formErrors.lastName && <span className="error">{formErrors.lastName}</span>}
        </div>
      </div>

      <br/>

      <h4>Contact info*</h4>
      <div className="form-row">
        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {formErrors.email && <span className="error">{formErrors.email}</span>}
        </div>
        <div className="form-group">
          <label>Phone *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            maxLength={10}
            minLength={10}
            onChange={handleChange}
            required
          />
           {formErrors.phone && <span className="error">{formErrors.phone}</span>}
        </div>
      </div>
      <br/>

      <h4>Name of Pet You Wish to Adopt*</h4>
      <div className="form-row">
        <div id="text1" className="form-group">
          <input
            type="text"
            name="petName"
            id="text"
            value={formData.petName}
            onChange={handleChange}
            required
          />
          {formErrors.petName && <span className="error">{formErrors.petName}</span>}
        </div>
      </div><br/>

      <h4>Address*</h4>
      <div className="form-group">
        <label>Address 1 *</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
         pattern="^[a-zA-Z0-9\s.,+'  -/#]*$"
          title="Address can contain letters, numbers, spaces, and special characters like . , ' - / #"
          required
        />
        {formErrors.address && <span className="error">{formErrors.address}</span>}
      </div>
      <br/>
      <br/>
      <div className="form-group">
        <label>Address 2</label>
        <input
          type="text"
          name="address2"
          value={formData.address2}
          onChange={handleChange}
        />
      </div>
      <br/><br/>

      <div className="form-row">
        <div className="form-group">
          <label>City *</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            pattern="^[a-zA-Z0-9\s.,+  '-/#]*$"
            title="Address can contain letters, numbers, spaces, and special characters like . , ' - / #"
            required
          />
           {formErrors.city && <span className="error">{formErrors.city}</span>}
        </div>
        <div className="form-group">
          <label>State *</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            pattern="^[a-zA-Z0-9\s.,'-/#]*$"
            title="Address can contain letters, numbers, spaces, and special characters like . , ' - / #"
            required
          />
          {formErrors.state && <span className="error">{formErrors.state}</span>}
        </div>
      </div><br/>

      <div className="form-row">
        <div className="form-group">
          <label>Zip Code *</label>
          <input
            type="text"
            name="zip"
            minLength={6}
            maxLength={6}
            value={formData.zip}
            onChange={handleChange}
            //  pattern="^[0-9]{6}$"
            required
          />
          {formErrors.zip && <span className="error">{formErrors.zip}</span>}
        </div>
        <div className="form-group">
          <label>Country *</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          >
            <option value="">Select Country</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </div>




      <div className="form-group">
  <h4>Do you own any pets? *</h4>
  <div className="form-row" id="row">
    
    <div className="form-group-radio">
      <input
        type="radio"
        name="ownPets"
        value="Yes"
        checked={formData.ownPets === "Yes"}
        onChange={handleChange}
        required
      />
      <p6>Yes</p6>
    </div>
    <div className="form-group-radio">
      <input
        type="radio"
        name="ownPets"
        value="No"
        checked={formData.ownPets === "No"}
        onChange={handleChange}
        required
      />
      <p6>No</p6>
    </div>
  </div>
  {formErrors.ownPets && <span className="error">{formErrors.ownPets}</span>}
</div>

{formData.ownPets === "Yes" && (
  <>
    <div className="form-row">
      <div className="form-group">
        <p5>Pet Name</p5>
        <input
          type="text"
          name="petName1"
          value={formData.petName1}
          onChange={handleChange}
         
          
        />
         {formErrors.petName1 && <span className="error">{formErrors.petName1}</span>}
      </div>
      <div className="form-group">
        <p5>Pet Breed</p5>
        <input
          type="text"
          name="petBreed"
          value={formData.petBreed}
          onChange={handleChange}
          
        />
        {formErrors.petBreed && <span className="error">{formErrors.petBreed}</span>}
      </div>
    </div><br/><br/>
    <div className="form-group">
      <p5>Pet's disposition and behavior towards other dogs.</p5><br/>
      <textarea
        name="petDetails"
        value={formData.petDetails}
        onChange={handleChange}
        placeholder="Describe your pet's behavior."
      />
       {formErrors.petDetails && <span className="error">{formErrors.petDetails}</span>}
    </div><br/><br/>
    <p5>Veterinarian's Info.</p5><br/>
    <div className="form-row">
      <div className="form-group">
        <label>first Name</label>
        <input
          type="text"
          name="veterinarianFirstName"
          value={formData.veterinarianFirstName}
          onChange={handleChange}
        />
        {formErrors.veterinarianFirstName && <span className="error">{formErrors.veterinarianFirstName}</span>}
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input
          type="text"
          name="veterinarianLastName"
          value={formData.veterinarianLastName}
          onChange={handleChange}
        />
         {formErrors.veterinarianLastName && <span className="error">{formErrors.veterinarianLastName}</span>}
      </div>
      <div className="form-group">
        <label>Veterinarian Phone Number</label>
        <input
          type="tel"
          name="veterinarianPhone"
          value={formData.veterinarianPhone}
          onChange={handleChange}
          // placeholder="(+91) 000-000-0000"
          maxLength={10}
          minLength={10}
          
          required
        />
         {formErrors.veterinarianPhone && <span className="error">{formErrors.veterinarianPhone}</span>}
        
      </div>
    </div>
  </>
)}

      <br/><br/>

    

<label>Do you own or rent your home? *</label>
<div className="form-row" id="row">
  <div className="form-group-radio">
    <input
      type="radio"
      name="homeOwnership"
      value="Own"
      onChange={handleChange}
      checked={formData.homeOwnership === "Own"}
      required
    />
    <label>Own</label>
  </div>
  <div className="form-group-radio">
    <input
      type="radio"
      name="homeOwnership"
      value="Rent"
      onChange={handleChange}
      checked={formData.homeOwnership === "Rent"}
      required
    />
    <label>Rent</label>
    </div>
  </div>
    {formErrors.homeOwnership && <span className="error">{formErrors.homeOwnership}</span>}
    <br/>

{formData.homeOwnership === "Rent" && (
  <>
    <label>Please provide your landlord's information</label>
    <textarea
      name="landlordInfo"
      value={formData.landlordInfo}
      onChange={handleChange}
      rows="4"
      column ="5"
    ></textarea>
     {formErrors.landlordInfo && <span className="error">{formErrors.landlordInfo}</span>}
     
  </>
)}





<label>Do you have a yard? *</label>
<div className="form-row "id="row">
  <div className="form-group-radio">
    <input
      type="radio"
      name="yard"
      value="Yes"
      onChange={handleChange}
      checked={formData.yard === "Yes"}
      required
    />
    <label>Yes</label>
  </div>
  <div className="form-group-radio">
    <input
      type="radio"
      name="yard"
      value="No"
      onChange={handleChange}
      checked={formData.yard === "No"}
      required
    />
    <label>No</label>
  </div>
  </div>
  {formErrors.yard && <span className="error">{formErrors.yard}</span>}

{formData.yard === "Yes" && (
 <div className="form-row">
 <div className="form-group">
   <h4>Is it fenced? please describe</h4>
   <input
     type="text"
     name="isFenced"
     value={formData.isFenced}
     onChange={handleChange}
   
   />
   {formErrors.isFenced && <span className="error">{formErrors.isFenced}</span>}
 </div>

</div>
)}

{formData.yard === "No" && (
  <div className="form-row">
    <div className="form-group">
      <p5>What is your landlord's pet policy? *</p5>
      <br/>
      <textarea
        name="petPolicy"
        value={formData.petPolicy}
        onChange={handleChange}
        rows="4"
        required
      ></textarea>
       {formErrors.petPolicy && <span className="error">{formErrors.petPolicy}</span>}
    </div>
  </div>
)}

<br/>



      <label>Have you ever surrendered a pet you own to any animal shelter including a "low" or "no kill" shelter?</label>
      <div className="form-row"id="row">
        <div className="form-group-radio">
          <input
            type="radio"
            name="surrendered"
            value="Yes"
            onChange={handleChange}
            required
          />
          <label>Yes</label>
        </div>
        <br/>
        <div className="form-group-radio">
          <input
            type="radio"
            name="surrendered"
            value="No"
            onChange={handleChange}
            required
          />
          <label>No</label>
        </div>
      </div>
      {formErrors.surrendered && <span className="error">{formErrors.surrendered}</span>}
      <br/>

      <label>Are there children in the home? (If yes, please list ages)*</label>
      <input
        type="text"
        name="childrenHome"
        value={formData.childrenHome}
        onChange={handleChange}
        
        required
      />
      {formErrors.childrenHome && <span className="error">{formErrors.childrenHome}</span>}
       <br/><br/>

      <label>How many hours will your pet be left alone during the day? *</label>
      <input
        type="text"
        name="hoursAlone"
        id="how"
        value={formData.hoursAlone}
        onChange={handleChange}
        minLength={1}
        maxLength={2}
        
        required
      />
      {formErrors.hoursAlone && <span className="error">{formErrors.hoursAlone}</span>}

     

      <br/><br/>

      <label>How would you deal with behavioral issues such as barking, chewing, destructive behavior, bathroom accidents indoors, unruly leash behaviors in your pet?</label>
      <textarea
        name="emergencyPlan"
        value={formData.emergencyPlan}
        onChange={handleChange}
        rows="4"
        required
      ></textarea>
      {formErrors.emergencyPlan && <span className="error">{formErrors.emergencyPlan}</span>}

     


<h4>Personal References</h4>

<div className="form-row">
  <div className="form-group">
    {/* <p4>Name</p4> */}
    <label>Reference Name:</label>
    <input
      type="text"
      name="referenceName"
      value={formData.referenceName}
      onChange={handleChange}
      required
    />
     {formErrors.referenceName && <span className="error">{formErrors.referenceName}</span>}
  </div>
  <div className="form-group">
    {/* <p4>Email</p4> */}
    <label>Reference Email:</label>

    <input
      type="text"
      name="referenceEmail"
      value={formData.referenceEmail}
      onChange={handleChange}
      required
    />
     {formErrors.referenceEmail && <span className="error">{formErrors.referenceEmail}</span>}
  </div>
  <div className="form-group">
    {/* <p4>Contact No</p4> */}
    <label>Reference Contact No:</label>
    <input
      type="text"
      name="referenceContactNo"
      maxLength={10}
      minLength={10}
      value={formData.referenceContactNo}
      onChange={handleChange}
      required
    />
     {formErrors.referenceContactNo && <span className="error">{formErrors.referenceContactNo}</span>}
  </div>
</div>

<br />
<hr />
<br />
<br />



        <label>Have you ever been convicted of an animal-related crime, such as cruelty to animals, animal theft, or animal abandonment? *</label>
        <div className="form-row"id="row">
          <div className="form-group-radio">
            <input
              type="radio"
              name="animalCrimes"
              value="Yes"
              onChange={handleChange}
              checked={formData.animalCrimes === "Yes"}
              required
            />
            <label>Yes</label>
          </div>
          <div className="form-group-radio">
            <input
              type="radio"
              name="animalCrimes"
              value="No"
              onChange={handleChange}
              checked={formData.animalCrimes === "No"}
              required
            />
            <label>No</label>
          </div>
        </div>
        {formErrors.animalCrimes && <span className="error">{formErrors.animalCrimes}</span>}

        {formData.animalCrimes === "Yes" && (
          <>
            <label>Please provide additional details:</label>
            <textarea
              name="crimeDetails"
              value={formData.crimeDetails}
              onChange={handleChange}
              rows="4"
              cols="50"
            ></textarea>
             {formErrors.crimeDetails && <span className="error">{formErrors.crimeDetails}</span>}
             
          </>
        )}


        <ul>
          <li>By clicking the submit button, I agree to go through the adoption process, will undergo a home check, and an interview.</li>
          <br/><li>By clicking the submit button, I understand my references will be checked, including veterinary and personal.</li>
          <br/><li>By clicking the submit button, I understand there is an adoption donation associated with the adoption of a pet and that it is tax-deductible according to IRS 501(c)(3) guidelines. I understand this donation will ensure the organization is equipped to rescue another homeless pet.</li>
          <br/><li>By clicking the submit button, I understand there is no "cooling off" period, and that if I no longer want or can no longer care for my adopted pet, I agree to notify Rescue Center by email and provide a 14-day period to allow Rescue Center to make arrangements for my pet to be taken back into rescue.</li>
          <br/><li>By clicking the submit button, I agree to indemnify and hold harmless the Rescue Center against any losses, lawsuits, claims, injury, or damages incurred by me or to any persons or property by my adopted pet, once adoption has been completed.</li>
          <br/><li>By clicking the submit button, I understand that Rescue Center will disclose any of the pet's health or behavior issues known by the above-named rescue group before adoption is completed.</li>
          <br/><li>By clicking the submit button, I understand that if I no longer want my pet, or am no longer able to care for my adopted pet, I will be directed to surrender my pet to Rescue Center and provide transport to where Rescue Center deems appropriate.</li>
          <br/><li>By clicking the submit button, I verify all of the above information is true and accurate.</li>
        </ul>

        <br/><br/>





      <label>Date *</label>
      <input
        type="date"
        name="date"
        id="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      {formErrors.date && <span className="error">{formErrors.date}</span>}

<br/><br/>

     


          {/* Upload Pet Image */}
          <div className="form-section1">
          <div className="form-group1">
            <label htmlFor="petImage">Upload Pet Image:</label>
            <input type="file"  id="petImage" name="petImage" accept="image/*" onChange={handleImageChange} />
            {/* <input type="file"  id="petImage" name="petImage" accept="image/*" onChange={handleChange}/> */}
          </div>
          {imagePreview && (
            <div className="form-group1">
              <label>Image Preview:</label>
              <img src={imagePreview} alt="Pet" id="img11" className="image-preview"

              // Add code
              onClick={handleOpenModal} // Click handler to open modal
              // added
               />
            </div>
          )}
        </div>

        <br/><br/>

        


        {/* <h4>Payment Method</h4> */}
        
        <div>
        <label>
            Amount:
            <input
              id="id5"
              type="text"
              name="amount"
              value={formData.amount} 
              onChange={handleChange}
              
            />
          </label>
        </div>

        
      
      <br/>
      <div>
        <label >
          Payment Method:
          <select id="pay" name="paymentMethod" value={paymentMethod} onChange={handlePaymentMethodChange}>
            <option value="">Select Payment Method</option>
            <option value="Card">Card</option>
            <option value="UPI">UPI</option>
          </select>
        </label>
      </div>
      <br/>

    

      {paymentMethod === 'Card' && (
        <div>
          <label>
            Card Number:
            <input
              id="id5"
              type="text"
              name="cardNumber"
              value={paymentDetails.cardNumber}
              onChange={handlePaymentDetailsChange}
            />
          </label>
          <br/>
          <label>
            Expiry Date:
            <input
              id="id5"
              type="text"
              name="cardExpiry"
              value={paymentDetails.cardExpiry}
              onChange={handlePaymentDetailsChange}
            />
          </label>
          <br/>
          <label>
            CVV:
            <input
              id="id5"
              type="text"
              name="cardCVV"
              value={paymentDetails.cardCVV}
              onChange={handlePaymentDetailsChange}
            />
          </label>
          <br/>
          <label>
            OTP:
            <input
              id="id5"
              type="text"
              name="otp"
              value={paymentDetails.cardOTP}
              onChange={handlePaymentDetailsChange}
            />
          </label>
        </div>
      )}
      

      {paymentMethod === 'UPI' && (
        <div>
          <label>
            UPI ID:
            <input
              id="id5"
              type="text"
              name="upiId"
              value={paymentDetails.upiId}
              onChange={handlePaymentDetailsChange}
            />
          </label>
        </div>
      )}
      <br/><br/>

        {/* Modal for image preview */}
        {modalOpen && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <img src={selectedImage} alt="Pet" className="modal-image" />
          </div>
        </div>
      )}
      
      <button type="submit">Submit Application</button>
    </form>

   

    )
  };



export default PetAdoptionForm;
