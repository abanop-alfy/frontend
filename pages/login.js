import { useState } from "react";
import axios from "axios";
import "react-phone-number-input/style.css";

import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("testing env", process.env.NEXT_PUBLIC_API);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/login`, {
        email,
        password,
      });

      console.log("login response Data");

      // console.table({ firstName, lastName, email, password, birth, country });
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className='jumbotron text-center bg-primary square'>Login</h1>
      <div className='container col-md-4 offset-md-4 pb-5'>
        <form onSubmit={handleSubmit}>
          {/* email input */}
          <input
            type='email'
            className='form-control mb-4 p-4'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Name@example.com'
            required
          />
          {/* password input */}
          <input
            type='password'
            className='form-control mb-4 p-4'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Name@example.com'
            required
          />

          <button
            className='btn btn-block btn-primary mb-4 p-4'
            type='submit'
            disabled={!email || !password || loading}
          >
            {loading ? <SyncOutlined /> : "Submit"}
          </button>
        </form>
        <p className='text-center p-3'>
          Not yet Registered?
          <Link href='/register'>
            <a>Register</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default login;
