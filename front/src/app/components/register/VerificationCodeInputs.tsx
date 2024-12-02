"use client";
import React from 'react';
import { Input } from 'antd';
import type { InputRef } from 'antd';

interface VerificationCodeInputsProps {
  verificationCode: string[];
  setVerificationCode: (code: string[]) => void;
  inputRefs: React.MutableRefObject<(InputRef | null)[]>;
}

const VerificationCodeInputs: React.FC<VerificationCodeInputsProps> = ({
  verificationCode,
  setVerificationCode,
  inputRefs,
}) => {
  const handleCodeChange = (index: number, value: string) => {
    const updatedCode = [...verificationCode];
    updatedCode[index] = value;
    setVerificationCode(updatedCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
      {verificationCode.map((digit, index) => (
        <Input
          key={index}
          type="number"
          min={0}
          max={9}
          value={digit}
          onChange={(e) => handleCodeChange(index, e.target.value)}
          style={{ width: '60px', textAlign: 'center' }}
          ref={(el) => {
            if (inputRefs.current) {
              inputRefs.current[index] = el;
            }
          }}
        />
      ))}
    </div>
  );
};

export default VerificationCodeInputs;