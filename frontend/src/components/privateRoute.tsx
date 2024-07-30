import { Outlet } from "react-router-dom";
import useCardTypeStore from "../store/cardTypeStore";
import { useEffect } from "react";
import NavBar from "./components/Navbar";
import useCardStore from "../store/cardStore";

const PrivateRoute = () => {
    const { getCardTypes } = useCardTypeStore();
    const { getCards } = useCardStore();

    const fetchData = async () => {
        await getCardTypes();
        await getCards();
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="flex justify-center absolute w-full">
                <Outlet />
            </div>
        </>
    );
};

export default PrivateRoute;
