// components/WalletSection.jsx
// Wallet balance (number) + wallet icon (emoji picker) in a single card.
// Owns both values and balance validation.
// Props:
//   sectionTitle         string
//   balanceLabel         string
//   balanceHint          string
//   balancePlaceholder   string
//   balanceMin           number
//   balanceMax           number
//   iconLabel            string
//   iconHint             string
//   iconPlaceholder      string  — also used as fallback preview
//   defaultBalance       string
//   defaultIcon          string
//   onCommit             fn({balance: string, icon: string})
//   externalError        string|null  — injected balance error from parent

import { useState, useCallback } from "react";
import Field       from "./Field.jsx";
import NumberInput from "./NumberInput.jsx";
import IconInput   from "./Iconinput.jsx";

export default function WalletSection({
  sectionTitle,
  balanceLabel, balanceHint, balancePlaceholder, balanceMin, balanceMax,
  iconLabel, iconHint, iconPlaceholder,
  defaultBalance, defaultIcon,
  onCommit, externalError,
}) {
  const [balance, setBalance] = useState(defaultBalance ?? "");
  const [icon,    setIcon]    = useState(defaultIcon ?? "");
  const [err,     setErr]     = useState(null);

  const validateBalance = useCallback(v => {
    if (!v)                                        return "Wallet balance is required.";
    if (isNaN(Number(v)) || Number(v) < 0)         return "Must be a valid non-negative number.";
    return null;
  }, []);

  const handleBalance = v => {
    setBalance(v);
    setErr(validateBalance(v));
    onCommit?.({ balance: v, icon });
  };

  const handleIcon = v => {
    setIcon(v);
    onCommit?.({ balance, icon: v });
  };

  const activeError = externalError ?? err;

  return (
    <div className="card">
      <div className="s-hd">
        <span className="s-title">{sectionTitle}</span>
      </div>

      <Field
        label={balanceLabel}
        required
        hint={balanceHint}
        error={activeError}
      >
        <NumberInput
          value={balance}
          onChange={handleBalance}
          placeholder={balancePlaceholder}
          hasError={!!activeError}
          min={balanceMin}
          max={balanceMax}
        />
      </Field>

      <div className="div" />

      <Field label={iconLabel} hint={iconHint}>
        <IconInput
          value={icon}
          onChange={handleIcon}
          placeholder={iconPlaceholder}
        />
      </Field>
    </div>
  );
}