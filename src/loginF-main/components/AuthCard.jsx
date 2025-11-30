import React, { useState } from 'react';
import Input from './Input';

export default function AuthCard() {
  const [first, setFirst] = useState('Michal');
  const [last, setLast] = useState('Masiak');
  const [email, setEmail] = useState('michal.masiak@anywhere.co');
  const [pass, setPass] = useState('');

  return (
    <div className="left">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 10, height: 10, background: '#2fb3ff', borderRadius: '50%' }}></div>
        <div style={{ color: '#cfefff' }}>Anywhere app.</div>
      </div>

      <div style={{ marginTop: 18 }}>
        <div className="muted">START FOR FREE</div>
        <h1 className="h1">
          Create new account<span style={{ color: '#2fb3ff' }}>.</span>
        </h1>
        <div className="muted" style={{ marginTop: 6 }}>
          Already a Member? <a href="#" style={{ color: '#2fb3ff', textDecoration: 'none' }}>Log In</a>
        </div>
      </div>

      <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="form-row">
          <Input placeholder="First name" value={first} onChange={(e) => setFirst(e.target.value)} />
          <Input placeholder="Last name" value={last} onChange={(e) => setLast(e.target.value)} />
        </div>
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={pass} onChange={(e) => setPass(e.target.value)} />

        <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
          <button className="btn btn-ghost">Change method</button>
          <button className="btn btn-primary">Create account</button>
        </div>
      </div>
    </div>
  );
}
