
import { useForm } from 'react-hook-form';
import './Question.css'
import { useToasts } from 'react-toast-notifications';
const Question = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { addToast } = useToasts();
    const handleQusSubmit = async (data) => {

        const qusData = {
            question: data.question,
            questionCategory: data.questionCategory,
            option1: data.option1,
            option2: data.option2,
            option3: data.option3,
            option4: data.option4,
            answer: data.answer
        }
        // console.log(qusData.answer)
        try {
            const response = await fetch('https://localhost:7274/api/Question', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(qusData)
            });

            const responseData = await response.json();
            console.log(responseData)
            if (responseData) {
                // console.log('question Added successfully');
                addToast('Question Added successfully', { appearance: 'success' })
                reset();
            } else {
                addToast('Question not added', { appearance: 'error' })
                // console.log('Failed to add Question');
            }
        } catch (error) {
            console.error('Error creating', error);
            addToast('internel server problem', { appearance: 'error' })
        }


    }

    return (
        <div className="pt-24 qus-container">
            <div className='flex items-center justify-center w-full h-full'>
                <div className='w-3/4 p-4 bg-transparent shadow-2xl h-4/5 backdrop-blur-3xl rounded-xl'>
                    <form onSubmit={handleSubmit(handleQusSubmit)}>
                        <div className='flex gap-2 mb-2'>
                            <textarea type="text" {...register("question", {
                                required: "*",
                            })} placeholder="Please write the Qustion......" className='w-full p-3 bg-transparent border rounded-lg h-28 animate__animated animate__backInLeft' />
                            {errors.question && <small className='relative ml-2 text-red-500 right-2'>{errors.question?.message}</small>}
                            <select className="w-64 rounded-lg animate__animated animate__backInRight" {...register("questionCategory", {
                                required: "*"
                            })}>
                                <option value="teacher">select Category</option>
                                <option value="Visual Progamming">Visual Progamming</option>
                                <option value="Java">Java</option>
                                <option value="Data structure & algorithms">Data structure & algorithms</option>
                                <option value="Machine learning">Machine learning</option>
                                <option value="Computer networks">Computer networks</option>
                                <option value="Operating Systems">Operating Systems</option>
                            </select>
                        </div>

                        <div className='flex gap-1'>
                            <textarea type="text" {...register("option1", {
                                required: "*",
                            })} placeholder="Option - A" className='w-full h-20 p-3 bg-transparent border rounded-lg animate__animated animate__backInLeft' />
                            {errors.option1 && <small className='relative ml-2 text-red-500 right-2'>{errors.option1?.message}</small>}
                            <textarea type="text" {...register("option2", {
                                required: "*",
                            })} placeholder="Option - B" className='w-full h-20 p-3 bg-transparent border rounded-lg animate__animated animate__backInRight' />
                            {errors.option2 && <small className='relative ml-2 text-red-500 right-2'>{errors.option2?.message}</small>}
                        </div>
                        <div className='flex gap-1 mt-2'>
                            <textarea type="text" {...register("option3", {
                                required: "*",
                            })} placeholder="Option - c" className='w-full h-20 p-3 bg-transparent border rounded-lg animate__animated animate__backInLeft' />
                            {errors.option3 && <small className='relative ml-2 text-red-500 right-2'>{errors.option3?.message}</small>}
                            <textarea type="text" {...register("option4", {
                                required: "*",
                            })} placeholder="Option - D" className='w-full h-20 p-3 bg-transparent border rounded-lg animate__animated animate__backInRight' />
                            {errors.option4 && <small className='relative ml-2 text-red-500 right-2'>{errors.option4?.message}</small>}
                        </div>
                        <div className='flex items-center justify-between'>

                            <textarea type="text" {...register("answer", {
                                required: "*",
                            })} placeholder="Write the correct Answer" className='w-1/2 h-20 p-3 mt-2 bg-transparent border rounded-lg animate__animated animate__backInLeft' />
                            {errors.answer && <small className='relative ml-2 text-red-500 right-36'>{errors.answer?.message}</small>}
                            <button className='absolute button right-44 animate__animated animate__backInRight' type='submit'>
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
            <div className="flex justify-center">
                <div className='qus-content animate__animated animate__backInDown'>
                    <h1 className="uppercase">add_Question</h1>
                    <h1 className="uppercase">add_Question</h1>
                </div>
            </div>
        </div>
    );
};

export default Question;