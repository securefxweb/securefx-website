import React, { useState } from "react";
import styles from "./demoAccountForm.module.scss";
import classNames from "classnames";
import Input from "@/components/input";
import Dropdown from "@/components/dropdown";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { sendRegisterOTP, registerUser } from "@/services/register-api";

export default function DemoAccountForm() {
  const [formData, setFormData] = useState({
    prefix: "Mr.",
    name: "",
    email: "",
    countrycode: "+1",
    telephone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const prefixItems = ["Mr.", "Ms.", "Mrs.", "Dr.", "Prof."];
  const countryCodeItems = [
    "+1",
    "+44",
    "+91",
    "+86",
    "+49",
    "+33",
    "+81",
    "+61",
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+]?[\d\s\-\(\)]{10,15}$/;

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (formData.email.trim() && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.countrycode) {
      newErrors.countrycode = "Please select country code";
    }

    if (!formData.telephone.trim()) {
      newErrors.telephone = "Telephone is required";
    } else if (
      formData.telephone.trim() &&
      !phoneRegex.test(formData.telephone)
    ) {
      newErrors.telephone = "Invalid phone format";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.trim() && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // If OTP not sent yet, request OTP
    if (!otpSent) {
      setLoading(true);
      try {
        const otpData = {
          user_full_name: formData.name,
          user_email_address: formData.email,
          user_country_code: formData.countrycode,
          user_phone: formData.telephone,
          user_password: formData.password,
        };

        const response = await sendRegisterOTP(otpData);

        // Check for successful OTP send
        if (
          response.status === "ok" ||
          response.send_otp === 1 ||
          response.success === true ||
          response.status === "success"
        ) {
          toast.success(
            response.message ||
              "OTP sent successfully! Please check your email.",
          );
          setOtpSent(true);
        } else {
          toast.error(
            response.message || "Failed to send OTP. Please try again.",
          );
        }
      } catch (error) {
        console.error("Error sending OTP:", error);
        toast.error("Error sending OTP. Please try again.");
      } finally {
        setLoading(false);
      }
      return;
    }

    // If OTP sent, verify and register user
    if (otpSent) {
      if (!otp.trim()) {
        setErrors((prev) => ({ ...prev, otp: "OTP is required" }));
        return;
      }

      setLoading(true);
      try {
        const registrationData = {
          user_full_name: formData.name,
          user_email_address: formData.email,
          user_country_code: formData.countrycode,
          user_phone: formData.telephone,
          user_password: formData.password,
          send_otp: otp,
        };

        const response = await registerUser(registrationData);

        // Check for successful registration
        if (
          response.status === "ok" ||
          response.send_otp === 0 ||
          response.user_data
        ) {
          // // Save to Strapi
          // const strapiObject = {
          // 	prefix: formData.prefix,
          // 	fullname: formData.name,
          // 	email: formData.email,
          // 	password: formData.password,
          // 	countrycode: "",
          // 	phonenumber: formData.telephone,
          // 	industry: "",
          // 	type: "try_demo_account",
          // };

          // await contactForm.saveContactForm(strapiObject);
          // await submitDemoAccountForm(formData);

          toast.success(
            response.message ||
              response.app_message ||
              "Registration successful!",
          );

          // Reset form only on successful registration
          setFormData({
            prefix: "Mr.",
            name: "",
            email: "",
            countrycode: "+1",
            telephone: "",
            password: "",
          });
          setOtp("");
          setOtpSent(false);
          setErrors({});
        } else {
          toast.error(
            response.message ||
              response.app_message ||
              "Registration failed. Please try again.",
          );
        }
      } catch (error) {
        console.error("Error registering user:", error);
        toast.error("Error registering user. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form className={styles.demoAccountForm} onSubmit={handleSubmit}>
      <div className={styles.spacer}>
        <Dropdown
          placeholder="Mr."
          label="Prefix"
          items={prefixItems}
          value={formData.prefix}
          onChange={(value) => handleInputChange("prefix", value)}
        />
      </div>

      <div className={styles.spacer}>
        <Input
          label="Your Name"
          placeholder="Ex. John Doe"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          error={errors.name}
        />
      </div>

      <div className={styles.spacer}>
        <Input
          label="Email Address"
          placeholder="Enter your email..."
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          error={errors.email}
        />
      </div>

      <div className={styles.spacer}>
        <label
          style={{
            color: "#fff",
            fontSize: "14px",
            display: "block",
            marginBottom: "4px",
          }}
        >
          Telephone no.
        </label>
        <div style={{ display: "flex", gap: "8px" }}>
          <div style={{ width: "120px" }}>
            <Dropdown
              placeholder="+1"
              items={countryCodeItems}
              value={formData.countrycode}
              onChange={(value) => handleInputChange("countrycode", value)}
            />
          </div>
          <div style={{ flex: 1 }}>
            <Input
              placeholder="123 123 1234"
              type="tel"
              value={formData.telephone}
              onChange={(e) => handleInputChange("telephone", e.target.value)}
            />
          </div>
        </div>
        {(errors.countrycode || errors.telephone) && (
          <div style={{ color: "#ff4444", fontSize: "12px", marginTop: "4px" }}>
            {errors.countrycode || errors.telephone}
          </div>
        )}
      </div>

      <div className={styles.spacer}>
        <Input
          label="Password"
          placeholder="Enter your password"
          type="password"
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          error={errors.password}
        />
      </div>

      {otpSent && (
        <div className={styles.spacer}>
          <Input
            label="Enter OTP"
            placeholder="Enter the OTP sent to your email"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
              if (errors.otp) {
                setErrors((prev) => ({ ...prev, otp: "" }));
              }
            }}
            error={errors.otp}
          />
        </div>
      )}

      <div className={styles.submitButton}>
        <button type="submit" className={styles.buttonUi} disabled={loading}>
          {/* gradient glow layers */}
          <span className={styles.layer}></span>
          <span className={styles.layer2}></span>

          {/* button text */}
          <span>
            {loading ? (
              <Loader2 className={styles.loader} />
            ) : otpSent ? (
              "Verify & Register"
            ) : (
              "Send OTP"
            )}
          </span>
        </button>
      </div>
    </form>
  );
}
