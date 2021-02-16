export class CustomerInfo{
  firstName:string;
  lastName:string;
  email:string;
  address:string;
  city:string;
  zipCode:string;
  phoneNumber:string;
  constructor(firstName:string, lastName:string, email:string, address:string, city:string, zipCode:string, phoneNumber:string){
    this.firstName=firstName;
    this.lastName=lastName;
    this.email=email;
    this.address=address;
    this.city=city;
    this.zipCode=zipCode;
    this.phoneNumber=phoneNumber;
  }
}
