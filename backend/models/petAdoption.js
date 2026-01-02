const mongoose = require('mongoose');

const petAdoptionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  petName: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  address2: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false
  },
  state: {
    type: String,
    required: false
  },
  zip: {
    type: String,
    required: false
  },
  country: {
    type: String,
    required: false
  },
  referenceName: {
    type: String,
    required: false
  },
  referenceEmail: {
    type: String,
    required: false
  },
  referenceContactNo: {
    type: String,
    required: false
  },
  ownPets: {
    type: String,
    required: false
  },
  petName1: {
    type: String,
    required: false
  },
  petBreed: {
    type: String,
    required: false
  },
  petDetails: {
    type: String,
    required: false
  },
  veterinarianFirstName: {
    type: String,
    required: false
  },
  veterinarianLastName: {
    type: String,
    required: false
  },
  veterinarianPhone: {
    type: String,
    required: false
  },
  homeOwnership: {
    type: String,
    required: false
  },
  landlordInfo: {
    type: String,
    required: false
  },
  yard: {
    type: String,
    required: false
  },
  isFenced: {
    type: String,
    required: false
  },
  petPolicy: {
    type: String,
    required: false
  },
  surrendered: {
    type: String,
    required: false
  },
  childrenHome: {
    type: String,
    required: false
  },
  hoursAlone: {
    type: String,
    required: false
  },
  cratePet: {
    type: String,
    required: false
  },
  emergencyPlan: {
    type: String,
    required: false
  },
  behavioralIssues: {
    type: String,
    required: false
  },
  animalCrimes: {
    type: String,
    required: false
  },
  crimeDetails: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    required: false
  },
  amount: {
    type: Number,
    required: false
  },
  paymentMethod: {
    type: String,
    required: false
  },
  signature: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('PetAdoption', petAdoptionSchema);

