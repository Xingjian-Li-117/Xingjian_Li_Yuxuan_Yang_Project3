import React, {useState} from 'react';
import axios from 'axios';

const EditProfile = ({setOpen, userId, setProfileDescription }) => {
  const [newDescription, setNewDescription] = useState('');

  const handleUpdateProfile = async () => {
    try {
      await axios.put(`/users/updateDescription/${userId}`, { newDescription });
      
      setProfileDescription(newDescription);

      setOpen(false);
      window.location.reload(false); 
    } catch (error) {
      console.error('Error updating profile description:', error);
    }
  };

  return (
    <div className="absolute w-full h-full top-0 left-0 bg-transparent flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-slate-200 rounded-lg p-8 flex flex-col gap-4 relative">
            <button 
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 cursor-pointer">
                X
            </button>
            <h2 className="font-bold text-xl">Edit Profile</h2>
            <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Enter new description"
                className="rounded-md p-3"
            />
            <button 
                onClick={handleUpdateProfile}
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
                Update Profile
            </button>
            
        </div>
        
    </div>
  )
}

export default EditProfile