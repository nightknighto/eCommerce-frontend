"use client";

import ProductCard from "@/components/Cards/ProductCard";
import Checkbox from "@/components/Checkboxes/Checkbox";
import MainLayout from "@/components/Layouts/MainLayout";
import { Category } from "@/types/category";
import { Product } from "@/types/product";
import { Pagination } from "flowbite-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEventHandler, useCallback, useEffect, useRef, useState } from "react";

const Search = () => {
    const pathname = usePathname()
    const router = useRouter();
    const searchParams = useSearchParams();
    const searchRef = useRef<HTMLInputElement>(null);
    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page") ?? "1"));
    const [minPrice, setMinPrice] = useState(searchParams.get("price")?.split(",")[0] ?? "");
    const [maxPrice, setMaxPrice] = useState(searchParams.get("price")?.split(",")[1] ?? "");
    const [rating, setRating] = useState(parseInt(searchParams.get("rating") ?? "0"));
    const [selectedCategories, setSelectedCategories] = useState<{categoryName: string, id: number, selected: boolean}[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    const addQuery = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            if (value) params.set(name, value)
            else params.delete(name)
     
            router.push(pathname + '?' + params.toString())
        },
        [searchParams, router]
    )

    // fetch categories
    useEffect(() => {
        async function fetchData() {
            const res = await fetch("https://distributed-project-backend.onrender.com/api/home/categories/")
            const data: Category[] = await res.json()
            const categories = searchParams.get("cat")?.split(",")
            setSelectedCategories(data.map((b) => ({categoryName: b.name, id: b.id, selected: categories ? categories.includes(b.id.toString()) : false})))
        }
        fetchData()
    }, []);

    // Categories
    useEffect(() => {
        addQuery("cat", selectedCategories.filter(b => b.selected).map(b => b.id.toString()).join(","))
    }, [selectedCategories])

    // Price
    useEffect(() => {
        if(minPrice || maxPrice) {
            if(maxPrice) {
                if(minPrice) {
                    addQuery("price", `${minPrice},${maxPrice}`)
                } else {
                    addQuery("price", maxPrice)
                }
            } else {
                addQuery("price", `${minPrice},9999999`)
            }
        } else {
            addQuery("price", "")
        }
    }, [minPrice, maxPrice])

    // Rating
    useEffect(() => {
        addQuery("rating", rating > 0 ? rating.toString() : "")
    }, [rating])

    // Page
    useEffect(() => {
        addQuery("page", currentPage.toString())
    }, [currentPage])

    // get products
    useEffect(() => {
        async function fetchProducts() {
            const res = await fetch("https://distributed-project-backend.onrender.com/api/home/products/?" + searchParams.toString())
            const data: Product[] = await res.json()

            setProducts(data)
        }
        fetchProducts()
    }, [searchParams])

    const handleKeyPress = (event: { key: any; }) => {
        if (event.key === "Enter") return search()
    }

    const search = () => {
       addQuery('search', searchRef.current?.value ?? '')
    }

    return (
        <>
            <div className="flex flex-col md:flex-row p-4 gap-x-4">
                {/* Sidebar */}
                <div className="bg-white border-slate-400 rounded-md border-2 w-full md:w-1/5 p-2">
                    <input className="bg-gray border-slate-400 border-2 rounded-sm w-full pl-1"
                        placeholder="Search"
                        defaultValue={searchParams.get("search") ?? ""}
                        onKeyDown={handleKeyPress}
                        ref={searchRef}
                    />
                    <p className="font-semibold mb-2">Filters</p>

                    <p className="font-medium mt-2">Brands</p>
                    {selectedCategories.map(b => 
                        <Checkbox key={b.categoryName} isChecked={b.selected} setIsChecked={e => setSelectedCategories(
                            selectedCategories.map((brand) =>
                                brand.categoryName === b.categoryName ? { ...brand, selected: e } : brand
                              )
                        )} label={b.categoryName}/>
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
                    <h2 className="text-4xl font-bold dark:text-white">Search results for {searchParams.get("search")}</h2>
                    <div className="flex justify-around gap-x-1">
                        {
                            products.length == 0 ? <p>No results found</p> : (
                                products.map((product) => (
                                    <ProductCard key={product.id} product={product} type="addtocart" />
                                ))
                            )
                        }
                    </div>
                </section>
            </div>
            <div className="flex overflow-x-auto sm:justify-center">
                <Pagination layout="navigation" currentPage={currentPage} totalPages={100} onPageChange={(page: number) => setCurrentPage(page)} />
            </div>
        </>
    );
}
 
export default Search;