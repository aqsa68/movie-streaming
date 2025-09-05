// app/components/Input.tsx
"use client";
import React from "react";

interface Props {
  id: string;
  value: string;
  label: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ id, value, label, type="text", onChange }: Props) {
  return (
    <div className="relative">
      <input id={id} name={id} type={type} value={value} onChange={onChange}
        className="block rounded-md px-6 pt-6 pb-1 w-full text-md text-white bg-neutral-700 appearance-none focus:outline-none peer"
        placeholder=""
      />
      <label htmlFor={id} className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-3">{label}</label>
    </div>
  );
}
