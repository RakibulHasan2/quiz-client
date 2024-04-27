
import { useForm } from 'react-hook-form';
import './Question.css'
const Question = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const handleQusSubmit = (data) => {

        const qusData ={
            question: data.question,
            questionCategory: data.questionCategory,
            option1: data.option1,
            option2: data.option2,
            option3: data.option3,
            option4: data.option4,
            answer: data.answer
        }
        console.log(qusData.answer)

    }

    return (
        <div className="pt-24 qus-container">
            <div>

            </div>
            <div className='flex items-center justify-center w-full h-full'>
                <div className='w-3/4 p-4 bg-transparent shadow-2xl h-4/5 backdrop-blur-3xl rounded-xl'>
                    <form onSubmit={handleSubmit(handleQusSubmit)}>
                        <div className='flex gap-2 mb-2'>
                            <textarea type="text" {...register("question", {
                                required: "*",
                            })} placeholder="Please write the Qustion......" className='w-full p-3 bg-transparent border rounded-lg h-28' />
                            {errors.question && <small className='relative ml-2 text-red-500 right-2'>{errors.question?.message}</small>}
                            <select className="w-64 rounded-lg" {...register("questionCategory", {
                                required: "*"
                            })}>
                                <option value="teacher">select Category</option>
                                <option value="Visual Progamming">Visual Progamming</option>
                                <option value="Java">Java</option>
                            </select>
                        </div>

                        <div className='flex gap-1'>
                            <textarea type="text" {...register("option1", {
                                required: "*",
                            })} placeholder="Option - A" className='w-full h-20 p-3 bg-transparent border rounded-lg' />
                            {errors.option1 && <small className='relative ml-2 text-red-500 right-2'>{errors.option1?.message}</small>}
                            <textarea type="text" {...register("option2", {
                                required: "*",
                            })} placeholder="Option - B" className='w-full h-20 p-3 bg-transparent border rounded-lg' />
                            {errors.option2 && <small className='relative ml-2 text-red-500 right-2'>{errors.option2?.message}</small>}
                        </div>
                        <div className='flex gap-1 mt-2'>
                            <textarea type="text" {...register("option3", {
                                required: "*",
                            })} placeholder="Option - c" className='w-full h-20 p-3 bg-transparent border rounded-lg' />
                            {errors.option3 && <small className='relative ml-2 text-red-500 right-2'>{errors.option3?.message}</small>}
                            <textarea type="text" {...register("option4", {
                                required: "*",
                            })} placeholder="Option - D" className='w-full h-20 p-3 bg-transparent border rounded-lg' />
                            {errors.option4 && <small className='relative ml-2 text-red-500 right-2'>{errors.option4?.message}</small>}
                        </div>
                        <div className='flex items-center justify-between'>

                            <textarea type="text" {...register("answer", {
                                required: "*",
                            })} placeholder="Write the correct Answer" className='w-1/2 h-20 p-3 mt-2 bg-transparent border rounded-lg' />
                            {errors.answer && <small className='relative ml-2 text-red-500 right-[480px]'>{errors.answer?.message}</small>}
                            <button className='absolute button right-44' type='submit'>
                                <span className="circle1"></span>
                                <span className="circle2"></span>
                                <span className="circle3"></span>
                                <span className="circle4"></span>
                                <span className="circle5"></span>
                                <span className="text">Submit Question</span>
                            </button>
                        </div>
                    </form>

                </div>
            </div>
            <div className="flex justify-center mb-20">

                <div className='qus-content animate__animated animate__backInDown'>
                    <h1 className="uppercase">add_Question</h1>
                    <h1 className="uppercase">add_Question</h1>
                </div>

            </div>
            <div className="flex justify-center mb-20">

                <div className='qus-content animate__animated animate__backInDown'>
                    <h1 className="uppercase">add_Question</h1>
                    <h1 className="uppercase">add_Question</h1>
                </div>

            </div>
        </div>
    );
};

export default Question;