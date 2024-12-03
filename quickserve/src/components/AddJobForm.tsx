// FILE: src/components/AddJobForm.tsx
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { updateField, addJob, resetForm, jobTypeIcons } from '../store/formSlice';
import Modal from './Modal';
import { useState } from 'react';
import { useTheme } from '../context/theme/Theme';

const AddJobForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const formState = useSelector((state: RootState) => state.form);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalColor, setModalColor] = useState('');
  const [showOptionalFields, setShowOptionalFields] = useState(false);

  const { theme } = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch(updateField({ field: name, value }));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      setModalMessage('User not authenticated.');
      setModalColor('bg-red-500');
      setShowModal(true);
      return;
    }

    const jobIcon = jobTypeIcons[formState.jobType] || '';
    const formData = { ...formState, jobIcon, userId: user._id }; // Add userId to formData
    try {
      const result = await dispatch(addJob(formData)).unwrap();
      console.log('Result:', result); // Log the result
      setModalMessage('Job created successfully!');
      setModalColor('bg-green-500');
      dispatch(resetForm());
    } catch (error) {
      console.error('Error creating job:', error);
      setModalMessage('Error creating job.');
      setModalColor('bg-red-500');
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const toggleOptionalFields = () => {
    setShowOptionalFields(!showOptionalFields);
  };

  return (
    <div className={`flex items-center justify-center min-h-screen ${theme === 'dark' ? 'dark' : 'light'}`}>
      <form className="w-full max-w-lg p-8">
        <div>
          <label className="block text-center dark:text-white">Job Name</label>
          <input
            name="jobName"
            value={formState.jobName}
            onChange={handleChange}
            className="rounded-md bg-slate-300 font-outfit py-2 my-1 dark:bg-slate-500 w-full dark:text-white"
          />
        </div>
        <div>
          <label className="block text-center dark:text-white">Job Requester</label>
          <input
            name="jobRequester"
            value={formState.jobRequester}
            onChange={handleChange}
            className="rounded-md bg-slate-300 font-outfit py-2 my-1 dark:bg-slate-500 w-full dark:text-white"
          />
        </div>
        <div>
          <label className="block text-center dark:text-white">Job Description</label>
          <input
            name="jobDescription"
            value={formState.jobDescription}
            onChange={handleChange}
            className="rounded-md bg-slate-300 font-outfit py-2 my-1 dark:bg-slate-500 w-full dark:text-white"
          />
        </div>
        <div>
          <label className="block text-center dark:text-white">Job Request Date</label>
          <input
            name="jobRequestDate"
            value={formState.jobRequestDate}
            onChange={handleChange}
            className="rounded-md bg-slate-300 font-outfit py-2 my-1 dark:bg-slate-500 w-full dark:text-white"
            type="date"
          />
        </div>
        <div>
          <label className="block text-center dark:text-white">Assigned By</label>
          <input
            name="assignedBy"
            value={formState.assignedBy}
            onChange={handleChange}
            className="rounded-md bg-slate-300 font-outfit py-2 my-1 dark:bg-slate-500 w-full dark:text-white"
          />
        </div>
        <div>
          <label className="block text-center dark:text-white">Job Location</label>
          <input
            name="jobLocation"
            value={formState.jobLocation}
            onChange={handleChange}
            className="rounded-md bg-slate-300 font-outfit py-2 my-1 dark:bg-slate-500 w-full dark:text-white"
          />
        </div>
        <div>
          <label className="block text-center dark:text-white">Job Type</label>
          <select
            name="jobType"
            value={formState.jobType}
            onChange={handleChange}
            className="rounded-md bg-slate-300 font-outfit py-2 my-1 dark:bg-slate-500 w-full dark:text-white"
          >
            <option value="">Select Job Type</option>
            <option value="PC Repairs">PC Repairs</option>
            <option value="Web Development">Web Development</option>
            <option value="Networking">Networking</option>
          </select>
        </div>
        <div>
          <label className="block text-center dark:text-white">Job Status</label>
          <select
            name="jobStatus"
            value={formState.jobStatus}
            onChange={handleChange}
            className="rounded-md bg-slate-300 font-outfit py-2 my-1 dark:bg-slate-500 w-full dark:text-white"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Complete</option>
            <option value="On Hold">On Hold</option>
            <option value="In Progress">In Progress</option>
          </select>
        </div>
        <button
          type="button"
          onClick={toggleOptionalFields}
          className="bg-blue-500 text-white rounded-md px-3 py-2 font-inter mt-4 w-full dark:text-white"
        >
          {showOptionalFields ? 'Hide Optional Fields' : 'Show Optional Fields'}
        </button>

        {showOptionalFields && (
          <>
            <div>
              <label className="block dark:text-white">Room Number</label>
              <input
                name="roomNumber"
                value={formState.roomNumber}
                onChange={handleChange}
                className="rounded-md bg-slate-300 font-outfit py-2 my-1 dark:bg-slate-500 w-full dark:text-white"
              />
            </div>
            <div>
              <label className="block dark:text-white">Phone Number</label>
              <input
                name="phoneNumber"
                value={formState.phoneNumber}
                onChange={handleChange}
                className="rounded-md bg-slate-300 font-outfit py-2 my-1 dark:bg-slate-500 w-full dark:text-white"
              />
            </div>
            <div>
              <label className="block dark:text-white">Unit</label>
              <input
                name="unit"
                value={formState.unit}
                onChange={handleChange}
                className="rounded-md bg-slate-300 font-outfit py-2 my-1 dark:bg-slate-500 w-full dark:text-white"
              />
            </div>
            <div>
              <label className="block dark:text-white">Requester Email</label>
              <input
                name="requesterEmail"
                value={formState.requesterEmail}
                onChange={handleChange}
                className="rounded-md bg-slate-300 font-outfit py-2 my-1 dark:bg-slate-500 w-full dark:text-white"
              />
            </div>
            <div>
              <label className="block dark:text-white">Product Manufacturer</label>
              <input
                name="productManufacturer"
                value={formState.productInformation.productManufacturer}
                onChange={handleChange}
                className="rounded-md bg-slate-300 font-outfit py-2 my-1 dark:bg-slate-500 w-full dark:text-white"
              />
            </div>
            <div>
              <label className="block dark:text-white">Product Model Number</label>
              <input
                name="productModelNumber"
                value={formState.productInformation.productModelNumber}
                onChange={handleChange}
                className="rounded-md bg-slate-300 font-outfit py-2 my-1 dark:bg-slate-500 w-full dark:text-white"
              />
            </div>
            <div>
              <label className="block dark:text-white">Product Serial Number</label>
              <input
                name="productSerialNumber"
                value={formState.productInformation.productSerialNumber}
                onChange={handleChange}
                className="rounded-md bg-slate-300 font-outfit py-2 my-1 dark:bg-slate-500 w-full dark:text-white"
              />
            </div>
          </>
        )}

        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="bg-orange-500 text-white rounded-md px-3 py-2 font-inter mt-4 w-full dark:text-white"
          >
            Add Job
          </button>
        </div>
      </form>
      {showModal && (
        <Modal type='message'
          color={modalColor}
          message={modalMessage}
          onClose={handleCloseModal}
          show={showModal}
        />
      )}
      {formState.successMessage && (
        <div className="text-center mt-4">
          <p className="text-green-500">{formState.successMessage}</p>
        </div>
      )}
    </div>
  );
};

export default AddJobForm;