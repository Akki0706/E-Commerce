export interface Product{
        _id?:string,
        name: string,
        shotDescription: string,
        description: string,
        price:string,
        discount: string,
        images: string[],
        categoryId: string,
        isFeatured:boolean,
        isNew:boolean
      
}