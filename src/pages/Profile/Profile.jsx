import { useQuery } from 'react-query';
import './Profile.css'
import student from '../../images/logo/output-onlinegiftools (21) (1).gif'
import teacher from '../../images/logo/output-onlinegiftools (21).gif'
import { useUserData } from '../../Hooks/Hooks';
import { useNavigate } from 'react-router-dom';
const Profile = () => {
    const navigate = useNavigate();
const userData = useUserData()
    const { data: allProfile = [] } = useQuery({
        queryKey: ['allProfile'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/api/User/Fetch`);
            const data = await res.json();
            return data;
        }
    });
    const fineNumber = allProfile?.data?.map(p => p)
    const singleProfile = fineNumber?.filter(profile => profile?.phoneNumber === userData?.user?.phoneNumber)
    console.log(singleProfile && singleProfile[0]?.userName)
   
    if(!userData){
        navigate('/')
   }
    
    return (
        <div className="pt-20 profile-container">
            <div className="flex items-center justify-center w-full h-full">            
                <div className='w-4/5 p-10 shadow-2xl h-4/5 rounded-xl profile-background'>
                <div className="flex justify-center mt-5">
                        <div className='chose-topic animate__animated animate__backInUp'>
                            <h1 className="uppercase">My_Profile</h1>
                            <h1 className="uppercase">My_Profile</h1>
                        </div>

                    </div>
                    <div className='grid grid-cols-2 gap-3 avatar'>
                         <div className='flex items-center gap-3 borderr animate__animated animate__backInDown'>
                              <div>{userData?.user?.role === "teacher" &&<img className='w-52' src={teacher} alt="" /> } 
                               {userData?.user?.role === "student" &&<img className='w-52' src={student} alt="" /> } </div> 
                               <div className='text-2xl italic font-bold'>
                                    <h1>Name : {singleProfile && singleProfile[0]?.userName}</h1>
                                    <p>Role : {singleProfile && singleProfile[0]?.role}</p>
                                    <p className='text-lg'>Address : {singleProfile && singleProfile[0]?.userAddress}</p>
                                    <p className='text-lg'>Phone no : {singleProfile && singleProfile[0]?.phoneNumber}</p>
                               </div>
                            </div>
                            <div className='p-5 italic font-bold bg-transparent shadow-2xl backdrop-blur-lg rounded-2xl animate__animated animate__backInUp'>
                                <h1>Bio : <br /> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et blanditiis nam tenetur aperiam animi explicabo, ad eaque amet quo? Molestias nulla laboriosam voluptates, quidem nostrum impedit quia aspernatur. Praesentium sapiente ducimus et corporis rem, quaerat mollitia voluptates, quas ea minus harum! Consequuntur excepturi animi doloremque autem suscipit, .</h1>
                            </div>
                    </div>
                           
                </div>
            </div>
        </div>
    );
};

export default Profile;