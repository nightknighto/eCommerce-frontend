import MainLayout from "@/components/Layouts/MainLayout";
import TableTwo from "@/components/Tables/TableTwo";

export default function CartPage() {
    
    return (
        <>
            <div className="grid grid-cols-12 gap-4 m-3">
                <div className="col-span-12 lg:col-span-8">
                    <TableTwo />
                </div>

                {/* Summary */}
                <div className="bg-white col-span-12 lg:col-span-4 p-3">
                    <h3>Summary</h3>
                    <div className="flex justify-between">
                        <p>Total</p>
                        <p>$100.00</p>
                    </div>
                    <p>Tax included. Shipping calculated at checkout.</p>
                    <button className="block border-2 p-1 w-full">Checkout</button>
                    <button className="block border-2 p-1 w-full">Continue Shopping</button>
                    <button className="block border-2 p-1 w-full">Clear Cart</button>
                </div>
            </div>
        </>
    )
} 