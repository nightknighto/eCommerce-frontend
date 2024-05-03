"use client";

import ProductCard from "@/components/Cards/ProductCard";
import Checkbox from "@/components/Checkboxes/Checkbox";
import MainLayout from "@/components/Layouts/MainLayout";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Search = () => {
    const searchString = useSearchParams();
    const [inStock, setInStock] = useState(false);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [rating, setRating] = useState(0);

    const [selectedBrands, setSelectedBrands] = useState<{brand: string, selected: boolean}[]>([]);

    useEffect(() => {
        // Placeholder data
        const brands = ["AMD", "Nvidia", "Intel", "Asus", "MSI"]
        setSelectedBrands(brands.map(b => ({brand: b, selected: false})))
    }, []);

    return (
        <>
            <div className="flex flex-col md:flex-row p-4 gap-x-4">
                {/* Sidebar */}
                <div className="bg-white border-slate-400 rounded-md border-2 w-full md:w-1/5 p-2">
                    <p className="font-semibold mb-2">Filters</p>

                    <p className="font-medium mt-2">Availability</p>
                    <Checkbox isChecked={inStock} setIsChecked={setInStock} label="In stock"/>

                    <p className="font-medium mt-2">Brands</p>
                    {selectedBrands.map(b => 
                        <Checkbox key={b.brand} isChecked={b.selected} setIsChecked={e => setSelectedBrands(
                            selectedBrands.map((brand) =>
                                brand.brand === b.brand ? { ...brand, selected: e } : brand
                              )
                        )} label={b.brand}/>
                    )}

                    <p className="font-medium mt-2">Price</p>
                    <div className="flex gap-x-2">
                        <div className="w-2/5">
                            <p>From:</p>
                            <input
                                className="bg-gray border-slate-400 border-2 rounded-sm w-full"
                                value={minPrice}
                                onChange={e => setMinPrice(e.target.value)}
                                placeholder="EGP"
                            />
                        </div>
                        <div className="w-2/5">
                            <p>To:</p>
                            <input
                                className="bg-gray border-slate-400 border-2 rounded-sm w-full"
                                value={maxPrice}
                                onChange={e => setMaxPrice(e.target.value)}
                                placeholder="EGP"
                            />
                        </div>
                    </div>

                    <p className="font-medium mt-2">Rating</p>
                    <Checkbox isChecked={rating == 4} setIsChecked={() => setRating(rating == 4 ? 0 : 4)} label="4 stars & up"/>
                    <Checkbox isChecked={rating == 3} setIsChecked={() => setRating(rating == 3 ? 0 : 3)} label="3 stars & up"/>
                    <Checkbox isChecked={rating == 2} setIsChecked={() => setRating(rating == 2 ? 0 : 2)} label="2 stars & up"/>
                    <Checkbox isChecked={rating == 1} setIsChecked={() => setRating(rating == 1 ? 0 : 1)} label="1 star & up"/>
                    
                </div>
                {/* Search results */}
                <section>
                    <h2 className="text-4xl font-bold dark:text-white">Search results for {searchString.get("search")}</h2>
                    <div className="flex justify-around gap-x-1">
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                    </div>
                </section>
            </div>
        </>
    );
}
 
export default Search;