import { useEffect, useRef, useState } from "react";
import "./Login.scss";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

const normalizePhone = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  return digits;
};

const isValidIndianMobile = (value) => {
  const digits = normalizePhone(value);
  return /^(?!((\d)\2{9}))[6-9]\d{9}$/.test(digits);
};

const generateOtp = () => String(Math.floor(100000 + Math.random() * 900000));

export default function Login({ onLoginSuccess }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [lastSentPhone, setLastSentPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_SECONDS);
  const [statusText, setStatusText] = useState(
    "Enter your mobile number to receive a one-time password.",
  );
  const otpInputRef = useRef(null);

  useEffect(() => {
    if (!otpSent || resendTimer <= 0) return undefined;

    const timer = setInterval(() => {
      setResendTimer((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [otpSent, resendTimer]);

  useEffect(() => {
    if (otpSent) {
      otpInputRef.current?.focus();
    }
  }, [otpSent]);

  const handlePhoneChange = (event) => {
    const rawValue = event.target.value;
    const cleaned = rawValue.replace(/\D/g, "").slice(0, 10);
    setPhone(cleaned);
    setOtp("");

    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }

    if (otpSent) {
      setOtpSent(false);
      setLastSentPhone("");
      setResendTimer(RESEND_SECONDS);
      setStatusText("Enter your mobile number to receive a one-time password.");
    }
  };

  const handleOtpChange = (event) => {
    const rawValue = event.target.value.replace(/\D/g, "").slice(0, OTP_LENGTH);
    setOtp(rawValue);

    if (errors.otp) {
      setErrors((prev) => ({ ...prev, otp: "" }));
    }

    if (statusText.includes("OTP sent") || statusText.includes("Enter OTP")) {
      setStatusText("Enter the 6-digit OTP sent to your mobile number.");
    }
  };

  const validatePhone = () => {
    const trimmedPhone = normalizePhone(phone);

    if (!trimmedPhone) {
      setErrors({ phone: "Mobile number is required." });
      setStatusText("Please enter a valid Indian mobile number.");
      return false;
    }

    if (!isValidIndianMobile(trimmedPhone)) {
      setErrors({
        phone:
          "Enter a valid Indian mobile number starting with 6, 7, 8, or 9.",
      });
      setStatusText(
        "The mobile number must be a valid 10-digit Indian number.",
      );
      return false;
    }

    return true;
  };

  const sendOtp = () => {
    if (!validatePhone()) {
      return;
    }

    const trimmedPhone = normalizePhone(phone);

    if (otpSent && lastSentPhone === trimmedPhone && resendTimer > 0) {
      setStatusText(
        `Please wait ${resendTimer} seconds before requesting another OTP for this number.`,
      );
      return;
    }

    const generatedOtp = generateOtp();

    setOtpSent(true);
    setOtp("");
    setErrors({});
    setLastSentPhone(trimmedPhone);
    setResendTimer(RESEND_SECONDS);
    setStatusText(
      `OTP sent to +91 ${trimmedPhone.slice(0, 5)}xxxxx. Demo OTP: ${generatedOtp}`,
    );
  };

  const handleSendOtp = () => {
    sendOtp();
  };

  const handleResendOtp = () => {
    if (resendTimer > 0) return;
    sendOtp();
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (!validatePhone()) {
      return;
    }

    if (!otpSent) {
      setErrors({ otp: "Please generate an OTP before logging in." });
      setStatusText("Send the OTP first to continue.");
      return;
    }

    if (!otp) {
      setErrors({ otp: "OTP is required." });
      setStatusText("Please enter the OTP to continue.");
      return;
    }

    if (otp.length !== OTP_LENGTH) {
      setErrors({ otp: `OTP must be ${OTP_LENGTH} digits.` });
      setStatusText("The OTP must be exactly 6 digits.");
      return;
    }

    if (!/^[0-9]{6}$/.test(otp)) {
      setErrors({ otp: "Invalid OTP. Please enter only numeric digits." });
      setStatusText("The OTP must contain only numbers.");
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setStatusText("Login successful. Redirecting to dashboard...");

    setTimeout(() => {
      onLoginSuccess?.();
    }, 700);
  };

  return (
    <div className="login-page">
      <aside className="login-hero">
        <div className="brand-mark">
          <i className="bi bi-bus-front"></i>
        </div>
        <div className="hero-copy">
          <p className="eyebrow">Smart Fleet Platform</p>
          <h1>BusGuard</h1>
          <p>
            Monitor schools, buses, drivers, routes, and live passenger safety
            from one secure dashboard.
          </p>
        </div>

        <div className="hero-stats">
          <div>
            <strong>24/7</strong>
            <span>Live tracking</span>
          </div>
          <div>
            <strong>12K+</strong>
            <span>Trips monitored</span>
          </div>
          <div>
            <strong>99.9%</strong>
            <span>Operational uptime</span>
          </div>
        </div>
      </aside>

      <section className="login-panel">
        <div className="login-card">
          <div className="login-header">
            <p className="eyebrow">Secure Login</p>
            <h2>Welcome back</h2>
            <p>Sign in with your mobile number and OTP.</p>
          </div>

          <form
            className="login-form"
            onSubmit={(event) => {
              if (!otpSent) {
                event.preventDefault();
                handleSendOtp();
                return;
              }

              handleLogin(event);
            }}
            noValidate
          >
            <div className="field-group">
              <label htmlFor="phone">Mobile Number</label>
              <div className="input-shell">
                <span className="input-prefix">+91</span>
                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="98765 43210"
                  aria-invalid={Boolean(errors.phone)}
                  maxLength={10}
                />
              </div>
              {errors.phone && (
                <small className="field-error">{errors.phone}</small>
              )}
            </div>

            {otpSent && (
              <div className="field-group otp-group">
                <label htmlFor="otp">Enter OTP</label>
                <input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  ref={otpInputRef}
                  value={otp}
                  onChange={handleOtpChange}
                  placeholder="6-digit OTP"
                  maxLength={OTP_LENGTH}
                  aria-invalid={Boolean(errors.otp)}
                />
                <button
                  type="button"
                  className="resend-link"
                  onClick={handleResendOtp}
                  disabled={resendTimer > 0 || isSubmitting}
                >
                  {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
                </button>
                {errors.otp && (
                  <small className="field-error">{errors.otp}</small>
                )}
              </div>
            )}

            <div className="action-row">
              <button
                type={otpSent ? "submit" : "button"}
                className="primary-button full-width"
                onClick={otpSent ? undefined : handleSendOtp}
                disabled={isSubmitting}
              >
                {otpSent ? "Verify OTP" : "Send OTP"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
