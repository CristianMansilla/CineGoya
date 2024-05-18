import CreateReviewForm from "@/app/components/CreateReviewForm";

const CreateReview = ({ params }: any) => {
    const { id } = params;
    console.log("ID recibido en CreateReview:", id);

    return (
        <CreateReviewForm selectedCriticismId={id}></CreateReviewForm>
    )
}

export default CreateReview;
