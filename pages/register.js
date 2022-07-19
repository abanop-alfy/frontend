import { useState } from "react";
import axios from "axios";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";

const register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birth, setBirth] = useState("");
  const [country, setCountry] = useState("");
  const [church, setChurch] = useState("");
  const [phone, setPhone] = useState();
  const [loading, setLoading] = useState(false);

  console.log("testing env", process.env.NEXT_PUBLIC_API);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/register`, {
        firstName,
        lastName,
        email,
        password,
        birth,
        country,
        church,
        phone,
      });
      toast.success("you are reg successfully. Please login ");
      setLoading(false);
      // console.log("Register response Data");

      // console.table({ firstName, lastName, email, password, birth, country });
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className='jumbotron text-center bg-primary square'>Register</h1>
      <div className='container col-md-4 offset-md-4 pb-5'>
        <form onSubmit={handleSubmit}>
          {/* first name input */}

          <input
            type='text'
            className='form-control mb-4 p-4'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='First Name'
            required
          />
          {/* //Last name input */}
          <input
            type='text'
            className='form-control mb-4 p-4'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder='Last Name'
            required
          />
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
          <label>Birth Date </label>
          <input
            type='date'
            className='form-control mb-4 p-4'
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
            required
          />
          <input
            type='text'
            className='form-control mb-4 p-4'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder='Egypt'
            required
          />
          <input
            type='text'
            className='form-control mb-4 p-4'
            value={church}
            onChange={(e) => setChurch(e.target.value)}
            placeholder='Church'
          />
          <PhoneInput
            className='form-control mb-4 p-4'
            country='EG'
            placeholder='Enter phone number'
            value={phone}
            onChange={setPhone}
            required
          />
          <label>Marital status </label>
          <select className='form-control mb-4 p-4'>
            <option value='Single'>Single</option>
            <option value='Married'>Married</option>
            <option value='Divorced'>Divorced</option>
          </select>
          <button
            className='btn btn-block btn-primary mb-4 p-4'
            type='submit'
            disabled={!firstName || !email || !password || loading}
          >
            {loading ? <SyncOutlined /> : "Submit"}
          </button>
        </form>
        <p className='text-center p-3'>
          Already Registered?
          <Link href='/login'>
            <a>Login</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default register;
