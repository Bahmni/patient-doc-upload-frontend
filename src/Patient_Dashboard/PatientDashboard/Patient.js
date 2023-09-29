class Patient {
    constructor(patientData) {
      this.patientData = patientData;
    }
  
    getName() {
      return this.patientData && this.patientData.name;
    }
  
    getIdentifier() {
      return this.patientData && this.patientData.identifier;
    }
  
    getPhotoUrl() {
      return this.patientData && this.patientData.photoUrl;
    }
  }
  
  export default Patient;
  