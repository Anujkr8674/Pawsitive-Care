import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './Donation.css'; 

const Donations = () => {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);
    const navigate = useNavigate(); // Initialize useNavigate
  
    const handleNavigate = () => {
      navigate('/Donate'); // Navigate to the Adopt page
    };
  return (
    <div className="donations-container">
      <div id='don1' className="donations-header ">
      <br/><br/><br/><br/><br/><br/><br/>
      <button id='btn4' className="donate-button"onClick={handleNavigate}>Donate </button> 
        {/* <button className="donate-button">Donate Now</button> */}
      </div>

      
      <h1>Donations Save Lives!</h1>
        <p>
          Humane Animal Society (HAS) depends solely on donations for the general functioning and upkeep of the facilities.
          Running HAS costs approximately INR 12 Lakh (USD 15,000) per month and every donation makes a difference.
        </p>

      <p>
        As HAS is registered under the Indian Trust Act, and granted certification as a charity organization under section 12A(a) 
        of the Income Tax Act, 1961, all donations are tax exempted under section 80G of the Income Tax Act.
      </p>
      <p>
        General donations, asset donations, and donations from our Amazon wishlist can be made by following the instructions below. 
        Options for sponsoring individual animals are found in the animals section of the website. After receiving your donation, 
        we will forward a receipt via email. You may also want to check through our various policies before making a donation.
      </p>

      <h3>Donation information</h3>
      <p>
        Detailed information on the nature of expenses and utilization of donations is available below. For more information about 
        the economy of HAS, please refer to our financial reports.
      </p>
      
      <h3>Major Expenses (Monthly) in Detail</h3>
      <table className="expenses-table">
        <thead>
          <tr>
            <th>Purpose</th>
            <th>Amount (INR)</th>
            <th>Amount (USD)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Maintenance</td>
            <td>80,000</td>
            <td>1,000</td>
          </tr>
          <tr>
            <td>Vehicle and fuel</td>
            <td>160,000</td>
            <td>2,000</td>
          </tr>
          <tr>
            <td>Animal food expenses</td>
            <td>240,000</td>
            <td>3,000</td>
          </tr>
          <tr>
            <td>Medicine</td>
            <td>320,000</td>
            <td>4,000</td>
          </tr>
          <tr>
            <td>Animal care</td>
            <td>400,000</td>
            <td>5,000</td>
          </tr>
          <tr className="total-row">
            <td><strong>Total</strong></td>
            <td><strong>1,200,000</strong></td>
            <td><strong>15,000</strong></td>
          </tr>
        </tbody>
      </table>

      <h3>Utilization of General Donations in Detail</h3>
      <table className="donations-table">
        <thead>
          <tr>
            <th>Purpose</th>
            <th>Amount (INR)</th>
            <th>Amount (USD)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Per cat per month</td>
            <td>2,000</td>
            <td>25</td>
          </tr>
          <tr>
            <td>Per dog per month</td>
            <td>4,000</td>
            <td>50</td>
          </tr>
          <tr>
            <td>Per cow/pony per month</td>
            <td>6,000</td>
            <td>75</td>
          </tr>
          <tr>
            <td>One day of food for all animals in our care</td>
            <td>8,000</td>
            <td>100</td>
          </tr>
          <tr>
            <td>One day of medicine</td>
            <td>10,000</td>
            <td>125</td>
          </tr>
          <tr>
            <td>10 ABCs and rabies vaccinations</td>
            <td>16,000</td>
            <td>200</td>
          </tr>
          <tr>
            <td>All vaccinations for one month</td>
            <td>20,000</td>
            <td>250</td>
          </tr>
        </tbody>
      </table>
      <button id='bt' className="donate-button"onClick={handleNavigate}>Donate Now</button>
    </div>

    
  );
};

export default Donations;
