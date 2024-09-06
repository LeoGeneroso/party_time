import { useRouteError } from "react-router-dom"

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div>
            <h1>Ops!</h1>
            <p>This party doesn't exist!...</p>
            <p>='(</p>
        </div>
    )
}

export default ErrorPage