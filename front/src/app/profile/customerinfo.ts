export class ShippingInfo{
  id:number;
  firstName:string;
  lastName:string;
  email:string;
  address:string;
  city:string;
  zipCode:string;
  phoneNumber:string;
  constructor(id:number,firstName:string, lastName:string, email:string, address:string, city:string, zipCode:string, phoneNumber:string){
    this.id=id;
    this.firstName=firstName;
    this.lastName=lastName;
    this.email=email;
    this.address=address;
    this.city=city;
    this.zipCode=zipCode;
    this.phoneNumber=phoneNumber;
  }
}
export class UserInfo{
  id:number;
  name:string;
  surname:string;
  address:string;
  city:string;
  phone:string;
  user_id:string;
  // constructor(username:string, info:ShippingInfo){
  //   this.username=username;
  //   this.info=info;
  // }
}

