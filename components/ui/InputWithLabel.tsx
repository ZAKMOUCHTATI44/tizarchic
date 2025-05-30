import React, { useState } from "react";
import { Eye, EyeOffIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
const InputWithLabel = ({
  label,
  name,
  type,
  onChange,
  value,
  error,
  readOnly,
}: {
  label: string;
  name: string;
  type?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  readOnly?: boolean;
}) => {
  const [typeInput, setTypeInput] = useState<string>(type ?? "text");

  const handleChnage = (type: string) => {
    setTypeInput(type);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      <div className="">
        <div className="relative">
          <Input
            className={`${!error || "border-2 border-red-500"}`}
            value={value}
            onChange={onChange}
            type={typeInput}
            id={name}
            readOnly={readOnly ?? false}
            placeholder={label}
          />
          {type === "password" && (
            <div className="absolute right-2 top-2">
              {typeInput === "password" && (
                <Eye onClick={() => handleChnage("text")} />
              )}
              {typeInput === "text" && (
                <EyeOffIcon onClick={() => handleChnage("password")} />
              )}
            </div>
          )}
        </div>

        <span className={`text-red-500 text-sm pt-2`}>{error}</span>
      </div>
    </div>
  );
};

export default InputWithLabel;