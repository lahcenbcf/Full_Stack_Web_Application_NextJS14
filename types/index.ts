export interface Ipost {
   
        author:Iuser
        title:string
        tag:string
        _id:string
      
}

export interface Iuser {
  username:string
  email:string
  id:string
  image:string
}