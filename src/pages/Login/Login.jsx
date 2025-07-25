import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { login, signUp } from '../../firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'

const Login = () => {
  const [signState, setsignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);

  const user_auth = async (event) => {
    event.preventDefault();
    setloading(true);
    if (!email || !password || (signState !== "Sign In" && !name)) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      if (signState === "Sign In") {
        await login(email, password);
      } else {
        await signUp(name, email, password);
      }
    } catch (error) {
      console.error("Authentication error:", error);
      alert("Authentication failed. Please try again.");
    }
    setloading(false);
  };

  return (
    loading ? <div className='login-spinner'>
      <img src={netflix_spinner} alt="" />
    </div> :
      <div className='login'>
        <img src={logo} alt="" className='login-logo' />
        <div className="login-form">
          <h1>{signState}</h1>
          <form>
            {signState === "Sign Up" ? <input type="text" placeholder='Your Name' value={name} onChange={(e) => { setName(e.target.value) }} /> : <></>}
            <input type="email" placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} value={email} />
            <input type="password" placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} value={password} />
            <button onClick={user_auth} type='submit'>{signState}</button>
            <div className="form-help">
              <div className="remember">
                <input type="checkbox" />
                <label htmlFor=""> Remember Me</label>
              </div>
              <p>Need Help?</p>
            </div>
          </form>
          <div className="form-switch">
            {signState === "Sign In" ? <p>New To Netflix? <span onClick={() => {
              setsignState("Sign Up")
            }}>Sign Up Now</span></p> : <p>Already have account? <span onClick={() => {
              setsignState("Sign In")
            }}>Sign In Now</span></p>}
          </div>
        </div>
      </div>
  )
}

export default Login