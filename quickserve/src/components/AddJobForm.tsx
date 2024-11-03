import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store"; // Import AppDispatch here
import { updateField, addJob, resetForm } from "../store/formSlice";
import Modal from "./Modal";
import { useState } from "react";

const AddJobForm = () => {
  const dispatch = useDispatch<AppDispatch>(); // Apply AppDispatch type here
  const formState = useSelector((state: RootState) => state.form);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showOptionalFields, setShowOptionalFields] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateField({ field: name, value }));
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addJob(formState)).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        setModalMessage("Job created successfully!");
      } else {
        setModalMessage("Error creating job.");
      }
      setShowModal(true);
      dispatch(resetForm());
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const toggleOptionalFields = () => {
    setShowOptionalFields(!showOptionalFields);
  };

  return (
    <div>
      <form>
        <div>
          <label className="block text-center">Job Requester</label>
          <input
            name="jobRequester"
            value={formState.jobRequester}
            onChange={handleChange}
            className="rounded-md bg-slate-300 font-outfit py-2 my-1"
          />
        </div>
        <div>
          <label className="block text-center">Job Description</label>
          <input
            name="jobDescription"
            value={formState.jobDescription}
            onChange={handleChange}
            className="rounded-md bg-slate-300 font-outfit py-2 my-1"
          />
        </div>
        <div>
          <label className="block text-center">Job Request Date</label>
          <input
            name="jobRequestDate"
            value={formState.jobRequestDate}
            onChange={handleChange}
            className="rounded-md bg-slate-300 font-outfit py-2 my-1"
            type="date"
          />
        </div>
        <div>
          <label className="block text-center">Assigned By</label>
          <input
            name="assignedBy"
            value={formState.assignedBy}
            onChange={handleChange}
            className="rounded-md bg-slate-300 font-outfit py-2 my-1"
          />
        </div>
        <div>
          <label className="block text-center">Job Location</label>
          <input
            name="jobLocation"
            value={formState.jobLocation}
            onChange={handleChange}
            className="rounded-md bg-slate-300 font-outfit py-2 my-1"
          />
        </div>
        <div>
          <label className="block text-center">Job Type</label>
          <input
            name="jobType"
            value={formState.jobType}
            onChange={handleChange}
            className="rounded-md bg-slate-300 font-outfit py-2 my-1"
          />
        </div>
        <button
          type="button"
          onClick={toggleOptionalFields}
          className="bg-blue-500 text-white rounded-md px-3 py-2 font-inter mt-4"
        >
          {showOptionalFields ? "Hide Optional Fields" : "Show Optional Fields"}
        </button>

        {showOptionalFields && (
          <>
            <div>
              <label className="block">Room Number</label>
              <input
                name="roomNumber"
                value={formState.roomNumber}
                onChange={handleChange}
                className="rounded-md bg-slate-300 font-outfit py-2 my-1"
              />
            </div>
            <div>
              <label className="block">Phone Number</label>
              <input
                name="phoneNumber"
                value={formState.phoneNumber}
                onChange={handleChange}
                className="rounded-md bg-slate-300 font-outfit py-2 my-1"
              />
            </div>
            <div>
              <label className="block">Unit</label>
              <input
                name="unit"
                value={formState.unit}
                onChange={handleChange}
                className="rounded-md bg-slate-300 font-outfit py-2 my-1"
              />
            </div>
            <div>
              <label className="block">Requester Email</label>
              <input
                name="requesterEmail"
                value={formState.requesterEmail}
                onChange={handleChange}
                className="rounded-md bg-slate-300 font-outfit py-2 my-1"
              />
            </div>
            <div>
              <label className="block">Product Manufacturer</label>
              <input
                name="productManufacturer"
                value={formState.productInformation.productManufacturer}
                onChange={handleChange}
                className="rounded-md bg-slate-300 font-outfit py-2 my-1"
              />
            </div>
            <div>
              <label className="block">Product Model Number</label>
              <input
                name="productModelNumber"
                value={formState.productInformation.productModelNumber}
                onChange={handleChange}
                className="rounded-md bg-slate-300 font-outfit py-2 my-1"
              />
            </div>
            <div>
              <label className="block">Product Serial Number</label>
              <input
                name="productSerialNumber"
                value={formState.productInformation.productSerialNumber}
                onChange={handleChange}
                className="rounded-md bg-slate-300 font-outfit py-2 my-1"
              />
            </div>
          </>
        )}

        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="bg-orange-500 text-white rounded-md px-3 py-2 font-inter mt-4"
          >
            Add Job
          </button>
        </div>
      </form>
      {showModal && (
        <Modal
          message={modalMessage}
          onClose={handleCloseModal}
          show={showModal}
        />
      )}
    </div>
  );
};

export default AddJobForm;
