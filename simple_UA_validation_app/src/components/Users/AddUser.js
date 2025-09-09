import { useState } from "react";
import Button from "../UI/Button.js";
import Card from "../UI/Card.js";
import classes from "./AddUser.module.css";
import ErrorModal from "../UI/ErrorModal.js";

const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  function addUserHandler(event) {
    event.preventDefault();
    /* trim removes any excess white space */
    /* adding validation */
    /* converting a string to a number with the + symbol */
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid input!",
        message: "Please enter a valid name and age!",
      });
      return;
    } else if (+enteredAge < 1) {
      setError({
        title: "Invalid age!",
        message: "Please enter an age number >= 1!",
      });
      return;
    }

    props.onAddUser(enteredUsername, enteredAge); /* executing as a function */
    setEnteredUsername("");
    setEnteredAge("");
  }

  function usernameHandler(event) {
    setEnteredUsername(event.target.value);
  }

  function ageHandler(event) {
    setEnteredAge(event.target.value);
  }

  function errorHandler() {
    /* resetting our error */
    setError(null);
  }

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          errorReset={errorHandler}
        ></ErrorModal>
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          {/* to connect the label with the right input */}
          <input
            id="username"
            type="text"
            onChange={usernameHandler}
            value={enteredUsername}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            onChange={ageHandler}
            value={enteredAge}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
