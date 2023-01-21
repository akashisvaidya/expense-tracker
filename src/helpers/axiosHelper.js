import axios from "axios";

const baseApiUrl =
  process.env.NODE_ENV === "production"
    ? "/api/v1"
    : process.env.REACT_APP_ROOT_URL;

const userEp = baseApiUrl + "/user";
const bookEp = baseApiUrl + "/book";
const transactionEP = baseApiUrl + "/transaction";

// USER

const getUserFromSessionStorage = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (user) {
    return user?._id;
  }
  return;
};

// register user
export const registerNewUser = async (userData) => {
  try {
    const { data } = await axios.post(userEp, userData);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
// login user
export const loginUser = async (userData) => {
  try {
    const { data } = await axios.post(userEp + "/login", userData);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
export const updatePassword = async (passInfo) => {
  try {
    const userId = getUserFromSessionStorage();
    if (!userId) {
      return {
        status: "error",
        message: "Please login first!",
      };
    }

    const { data } = await axios.patch(userEp + "/password-update", passInfo, {
      headers: {
        Authorization: userId,
      },
    });
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

// ====
// BOOK
// ====
export const addBook = async (bookInfo) => {
  try {
    const userId = getUserFromSessionStorage();
    if (!userId) {
      return {
        status: "error",
        message: "Please login first!",
      };
    }

    const { data } = await axios.post(bookEp, bookInfo, {
      headers: {
        Authorization: userId,
      },
    });
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const getBooks = async () => {
  try {
    const userId = getUserFromSessionStorage();
    if (!userId) {
      return {
        status: "error",
        message: "Please log in first!",
      };
    }
    const { data } = await axios.get(bookEp, {
      headers: {
        Authorization: userId,
      },
    });
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const borrowBook = async (bookId) => {
  try {
    const userId = getUserFromSessionStorage();
    if (!userId) {
      return {
        status: "error",
        message: "Please log in first!",
      };
    }

    const { data } = await axios.post(
      bookEp + "/borrow",
      { bookId },
      { headers: { Authorization: userId } }
    );

    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const deleteBook = async (bookId) => {
  try {
    const userId = getUserFromSessionStorage();
    if (!userId) {
      return {
        status: "error",
        message: "Please log in first!",
      };
    }

    const { data } = await axios.delete(bookEp, {
      data: { bookId },
      headers: {
        Authorization: userId,
      },
    });
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const getBorrowedBooks = async () => {
  try {
    const userId = getUserFromSessionStorage();
    if (!userId) {
      return {
        status: "error",
        message: "Please log in first!",
      };
    }
    const { data } = await axios.get(bookEp + "/borrowedByUser", {
      headers: {
        Authorization: userId,
      },
    });
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const returnBook = async (bookId) => {
  try {
    const userId = getUserFromSessionStorage();
    if (!userId) {
      return {
        status: "error",
        message: "Please log in first!",
      };
    }

    const { data } = await axios.patch(
      bookEp + "/return",
      { bookId },
      {
        headers: {
          Authorization: userId,
        },
      }
    );
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

// TRANSACTION

export const getAllTransactions = async () => {
  try {
    const userId = getUserFromSessionStorage();
    if (!userId) {
      return {
        status: "error",
        message: "Please log in first!",
      };
    }
    const { data } = await axios.get(transactionEP, {
      headers: {
        Authorization: userId,
      },
    });

    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
