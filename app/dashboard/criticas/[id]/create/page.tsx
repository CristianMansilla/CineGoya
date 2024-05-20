import CreateReviewForm from "@/app/components/CreateReviewForm";

const CreateReview = ({ params }: any) => {
    const { id } = params;

    return (
        <>
            <title>Crear Reseña - CineGoya</title>
            <CreateReviewForm selectedCriticismId={id}></CreateReviewForm>
        </>
    )
}

export default CreateReview;
