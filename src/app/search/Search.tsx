"use client";

import MainLayout from "@/components/Layouts/MainLayout";
import { useSearchParams } from "next/navigation";

const Search = () => {
    const searchString = useSearchParams();

    return (
        <MainLayout>
            <p>{searchString.get("search")}</p>
        </MainLayout>
    );
}
 
export default Search;