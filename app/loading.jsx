'use client';
import ClipLoader from "react-spinners/ClipLoader";

const override = {
    display: "block",
    margin: "100px auto",
    borderColor: "red",
}

const LoadingPage = () => {
    return (
        <ClipLoader
            color={"#2563EB"}
            size={150}
            loading={true}
            cssOverride={override}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    );
}

export default LoadingPage;