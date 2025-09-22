import ErrorLayout from "@/components/layout/ErrorLayout";
import NotFoundImage from "@/public/gifs/errors/4O4.gif";
const NotFound = () => {
    return (
        <ErrorLayout
            description="We can’t seem to find the page you’re looking for."
            header="Looks like you’re out of the flow!"
            img={NotFoundImage}
        />
    );
};

export default NotFound;