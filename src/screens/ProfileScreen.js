import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUserProfile } from "../actions/userActions";
import { PulseLoader } from "react-spinners";
import Message from "./Message";

function ProfileScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthDate] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      setPhone(user.profile?.phone || "");
      setBirthDate(user.profile?.birthdate || "");
    }
  }, [user]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUserProfile({
        first_name: firstName,
        last_name: lastName,
        password: password || undefined,
        phone,
        birthdate,
      })
    );
  };

  return (
    <div className="container mt-4">
      <h2>My Profile</h2>
      {loading ? (
        <PulseLoader color="#184F38" margin={5} speedMultiplier={0.5} />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <form onSubmit={submitHandler}>
          {success && (
            <p style={{ color: "green" }}>Profile Updated Successfully</p>
          )}

          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Birthday</label>
            <input
              type="date"
              className="form-control"
              value={birthdate ? birthdate.substring(0, 10) : ""}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ color: "#fff", backgroundColor: "#184F38" }}
          >
            Update
          </button>
        </form>
      )}
    </div>
  );
}

export default ProfileScreen;
