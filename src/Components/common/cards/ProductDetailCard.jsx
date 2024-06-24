import { Card } from "flowbite-react";

export default function ProductDetailCard({image,title,description,price}){
    return(
        <Card className="max-w-sm">
        <div>
            <img className="h-[250px] object-cover" src={image || "No Image"} alt={title}/>
        </div>
            <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {title || "No title"}
                </h5>
                <p>{description || "not description"}</p>
            </a>
            <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{price ? price : "unavailable"} $</span>
            </div>
        </Card>    
    )
}