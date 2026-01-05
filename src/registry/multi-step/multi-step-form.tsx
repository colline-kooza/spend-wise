"use client";

import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { AnimatePresence, motion } from "framer-motion";
import { RefreshCcw } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { RoughNotation } from "react-rough-notation";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

// Custom hook for multi-step form
function useMultiStepForm(steps: number) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const nextStep = () => {
    if (currentStepIndex < steps - 1) {
      setCurrentStepIndex((i) => i + 1);
    }
    if (currentStepIndex === 3) {
      setShowSuccessMsg(true);
    }
  };

  const previousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((i) => i - 1);
    }
  };

  const goTo = (index: number) => {
    setCurrentStepIndex(index);
  };

  return {
    currentStepIndex,
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps - 1,
    showSuccessMsg,
    goTo,
    nextStep,
    previousStep,
  };
}

// Form Wrapper Component
interface FormWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const FormWrapper = ({ title, description, children }: FormWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold text-white">{title}</h2>
        <p className="text-neutral-400">{description}</p>
      </div>
      {children}
    </motion.div>
  );
};

// Types
interface AddOn {
  id: number;
  checked: boolean;
  title: string;
  subtitle: string;
  price: number;
}

export type FormItems = {
  name: string;
  email: string;
  phone: string;
  plan: "arcade" | "advanced" | "pro";
  yearly: boolean;
  addOns: AddOn[];
};

type StepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
  errors?: Partial<FormItems>;
  goTo?: (index: number) => void;
};

// User Info Form Component
const UserInfoForm = ({
  name,
  email,
  phone,
  errors = {},
  updateForm,
}: StepProps) => {
  return (
    <FormWrapper
      title="Personal info"
      description="Please provide your name, email address, and phone number."
    >
      <div className="flex w-full flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            autoFocus
            type="text"
            name="name"
            id="name"
            placeholder="e.g. Stephen King"
            value={name}
            onChange={(e) => updateForm({ name: e.target.value })}
            className="w-full"
            required
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            type="text"
            name="email"
            id="email"
            placeholder="e.g. stephenking@lorem.com"
            value={email}
            className="w-full"
            onChange={(e) => updateForm({ email: e.target.value })}
            required
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            type="tel"
            name="phone"
            id="phone"
            placeholder="e.g. +1 234 567 890"
            value={phone}
            className="w-full"
            onChange={(e) => updateForm({ phone: e.target.value })}
            required
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone}</p>
          )}
        </div>
      </div>
    </FormWrapper>
  );
};

// Plan Form Component
const PlanForm = ({ updateForm, plan, yearly }: StepProps) => {
  const [yearlyUpdated, setYearlyUpdated] = useState(yearly);
  const [planSelected, setPlanSelected] = useState<
    "arcade" | "advanced" | "pro"
  >(plan);

  const handleCheckedChange = (yearlyUpdated: boolean) => {
    setYearlyUpdated((prev) => !prev);
    updateForm({ yearly: yearlyUpdated });
  };

  const handleValueChange = (planSelected: "arcade" | "advanced" | "pro") => {
    if (planSelected) {
      setPlanSelected(planSelected);
      updateForm({ plan: planSelected });
    }
  };

  return (
    <FormWrapper
      title="Select your plan"
      description="You have the option of monthly or yearly billing."
    >
      <ToggleGroup.Root
        orientation="horizontal"
        className="my-2 flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-0"
        type="single"
        value={planSelected}
        onValueChange={handleValueChange}
      >
        <ToggleGroup.Item
          value="arcade"
          className="flex aspect-square h-24 items-start gap-3 rounded-md border border-neutral-600 p-3 outline-none hover:border-[#77f6aa] focus:border-[#77f6aa] data-[state=on]:border-[#77f6aa] data-[state=on]:bg-neutral-900 md:h-44 md:w-[30%] md:flex-col md:justify-between md:gap-0"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-500 font-bold text-white">
            A
          </div>
          <div className="relative -top-1 flex flex-col items-start md:top-0">
            <p className="font-semibold text-white">Arcade</p>
            <p className="text-sm">{yearly ? "$90/yr" : "$9/mo"}</p>
            {yearly && (
              <span className="text-sm text-white">2 months free</span>
            )}
          </div>
        </ToggleGroup.Item>
        <ToggleGroup.Item
          value="advanced"
          className="flex aspect-square h-24 items-start gap-3 rounded-md border border-neutral-600 p-3 outline-none hover:border-[#77f6aa] focus:border-[#77f6aa] data-[state=on]:border-[#77f6aa] data-[state=on]:bg-neutral-900 md:h-44 md:w-[30%] md:flex-col md:justify-between md:gap-0"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-purple-500 font-bold text-white">
            A
          </div>
          <div className="relative -top-1 flex flex-col items-start md:top-0">
            <p className="font-semibold text-white">Advanced</p>
            <p className="text-sm">{yearly ? "$120/yr" : "$12/mo"}</p>
            {yearly && (
              <span className="text-sm text-white">2 months free</span>
            )}
          </div>
        </ToggleGroup.Item>
        <ToggleGroup.Item
          className="flex aspect-square h-24 items-start gap-3 rounded-md border border-neutral-600 p-3 outline-none hover:border-[#77f6aa] focus:border-[#77f6aa] data-[state=on]:border-[#77f6aa] data-[state=on]:bg-neutral-900 md:h-44 md:w-[30%] md:flex-col md:justify-between md:gap-0"
          value="pro"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-green-500 font-bold text-white">
            P
          </div>
          <div className="relative -top-1 flex flex-col items-start md:top-0">
            <p className="font-semibold text-white">Pro</p>
            <p className="text-sm">{yearly ? "$150/yr" : "$15/mo"}</p>
            {yearly && (
              <span className="text-sm text-white">2 months free</span>
            )}
          </div>
        </ToggleGroup.Item>
      </ToggleGroup.Root>
      <div className="flex w-full items-center justify-center rounded-md bg-neutral-900 p-3">
        <div className="flex items-center gap-6">
          <Label
            htmlFor="airplane-mode"
            className={yearly ? "" : "text-[#77f6aa]"}
          >
            Monthly
          </Label>
          <Switch
            id="airplane-mode"
            checked={yearlyUpdated}
            onCheckedChange={handleCheckedChange}
          />
          <Label
            htmlFor="airplane-mode"
            className={yearly ? "text-[#77f6aa]" : ""}
          >
            Yearly
          </Label>
        </div>
      </div>
    </FormWrapper>
  );
};

// Add-ons Form Component
const AddonsForm = ({ addOns, yearly, updateForm }: StepProps) => {
  function handleCheckboxChange(addOnId: number, checked: boolean) {
    const updatedAddOns = addOns.map((addOn) =>
      addOn.id === addOnId ? { ...addOn, checked } : addOn
    );
    updateForm({ addOns: updatedAddOns });
  }

  return (
    <FormWrapper
      title="Pick add-ons"
      description="Add-ons help enhance your gaming experience"
    >
      <div className="flex flex-col gap-3">
        {addOns.map((addOn) => (
          <div
            className={`flex items-center gap-3 rounded-md border border-neutral-600 p-3 ${
              addOn.checked ? "border-[#77f6aa] bg-neutral-900" : ""
            } outline-none hover:border-[#77f6aa] focus:border-[#77f6aa] md:gap-5 md:p-5`}
            key={addOn.id}
          >
            <Checkbox
              id={`addon-${addOn.id}`}
              checked={addOn.checked}
              onCheckedChange={(checked) =>
                handleCheckboxChange(addOn.id, checked as boolean)
              }
            />
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col">
                <label
                  htmlFor={`addon-${addOn.id}`}
                  className="font-semibold text-white"
                >
                  {addOn.title}
                </label>
                <p className="text-sm">{addOn.subtitle}</p>
              </div>
              <p className="text-[#77f6aa]">
                {`+$${yearly ? addOn.price * 10 : addOn.price}${yearly ? "/yr" : "/mo"}`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </FormWrapper>
  );
};

// Final Step Component
const FinalStep = ({ yearly, plan, addOns, goTo }: StepProps) => {
  let planPrice = 0;
  switch (plan) {
    case "arcade":
      planPrice = 9;
      break;
    case "advanced":
      planPrice = 12;
      break;
    case "pro":
      planPrice = 15;
      break;
    default:
      planPrice = 0;
      break;
  }

  const filteredAddOns = addOns.filter((addOn) => addOn.checked === true);
  const totalAddOnsPrice = filteredAddOns?.reduce(
    (acc, obj) => acc + obj.price,
    0
  );

  return (
    <FormWrapper
      title="Finishing Up"
      description="Double-check everything looks OK before confirming."
    >
      <div className="">
        <div className="mt-2 rounded-md border border-neutral-700 bg-neutral-900 p-4">
          <div className="flex items-center justify-between">
            <div className="">
              <h4 className="font-semibold text-white md:text-lg">
                {`${plan.charAt(0).toUpperCase() + plan.slice(1)} (${yearly ? "Yearly" : "Monthly"})`}
              </h4>
              <button
                onClick={() => goTo?.(1)}
                className="text-sm text-[#6fe79f]"
              >
                Change
              </button>
            </div>
            <p className="font-semibold text-white">{`$${
              yearly ? planPrice * 10 : planPrice
            }${yearly ? "/yr" : "/mo"}`}</p>
          </div>
          {filteredAddOns.length > 0 && <Separator className="my-4" />}
          {filteredAddOns?.map((addOn) => (
            <div
              className="my-2 flex items-center justify-between"
              key={addOn.id}
            >
              <p className="text-neutral-400">{addOn.title}</p>
              <p className="">{`$${yearly ? addOn.price * 10 : addOn.price}${yearly ? "/yr" : "/mo"}`}</p>
            </div>
          ))}
        </div>
        <div className="my-4 flex items-center justify-between px-4">
          <p className="text-neutral-400">
            Total (per {yearly ? "year" : "month"})
          </p>
          <p className="font-semibold text-[#6fe79f] md:text-lg">
            +$
            {yearly
              ? planPrice * 10 + totalAddOnsPrice * 10
              : planPrice + totalAddOnsPrice}
            /{yearly ? "yr" : "mo"}
          </p>
        </div>
      </div>
    </FormWrapper>
  );
};

// Sidebar Component
interface SideBarProps {
  currentStepIndex: number;
  goTo: (index: number) => void;
}

const SideBar = ({ currentStepIndex, goTo }: SideBarProps) => {
  return (
    <div className="absolute -top-20 left-0 w-full md:relative md:top-0 md:left-0 md:w-[25%]">
      <nav className="h-full rounded-md border border-neutral-700 bg-neutral-900 py-5 text-slate-200 md:p-5">
        <ul className="flex justify-center gap-2 md:flex-col">
          <li className="flex flex-col items-start font-medium">
            <span className="hidden text-sm text-neutral-500 uppercase md:flex">
              step 1
            </span>
            <button
              tabIndex={0}
              onClick={() => goTo(0)}
              className={`text-sm ${currentStepIndex === 0 ? "text-[#ffe666]" : "text-white"} md:text-base`}
            >
              <RoughNotation
                type="underline"
                show={currentStepIndex === 0}
                color="#ffe666"
              >
                Your info
              </RoughNotation>
            </button>
          </li>
          <li className="flex flex-col items-start font-medium">
            <span className="hidden text-sm text-neutral-500 uppercase md:flex">
              step 2
            </span>
            <button
              tabIndex={0}
              onClick={() => goTo(1)}
              className={`text-sm ${currentStepIndex === 1 ? "text-[#bd284d]" : "text-white"} md:text-base`}
            >
              <RoughNotation
                type="underline"
                show={currentStepIndex === 1}
                color="#bd284d"
              >
                Select plan
              </RoughNotation>
            </button>
          </li>
          <li className="flex flex-col items-start font-medium">
            <span className="hidden text-sm text-neutral-500 uppercase md:flex">
              step 3
            </span>
            <button
              tabIndex={0}
              onClick={() => goTo(2)}
              className={`text-sm ${currentStepIndex === 2 ? "text-[#E7B8FF]" : "text-white"} md:text-base`}
            >
              <RoughNotation
                type="underline"
                show={currentStepIndex === 2}
                color="#E7B8FF"
              >
                Add-ons
              </RoughNotation>
            </button>
          </li>
          <li className="flex flex-col items-start font-medium">
            <span className="hidden text-sm text-neutral-500 uppercase md:flex">
              step 4
            </span>
            <button
              tabIndex={0}
              onClick={() => goTo(3)}
              className={`text-sm ${currentStepIndex === 3 ? "text-[#6fe79f]" : "text-white"} md:text-base`}
            >
              <RoughNotation
                type="underline"
                show={currentStepIndex === 3}
                color="#6fe79f"
              >
                Summary
              </RoughNotation>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

// Success Message Component
const SuccessMessage = () => {
  const refresh = () => window.location.reload();
  return (
    <motion.section
      className="flex h-full w-full flex-col items-center justify-center gap-4 text-center md:gap-2"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: "backIn", duration: 0.6 }}
    >
      <div className="mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-green-500 text-4xl font-bold text-white">
        ✓
      </div>
      <h4 className="text-2xl font-semibold text-white md:text-3xl">
        Thank you!
      </h4>
      <p className="max-w-md text-sm text-neutral-300 md:text-base">
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com
      </p>
      <div className="mt-6 flex items-center">
        <div className="after:shadow-highlight relative after:pointer-events-none after:absolute after:inset-px after:rounded-[11px] after:shadow-white/10 after:transition focus-within:after:shadow-[#77f6aa]">
          <Button
            onClick={refresh}
            className="relative rounded-xl border border-black/20 bg-neutral-900 text-neutral-200 shadow-black/10 hover:text-white"
          >
            <RefreshCcw className="mr-2 h-4 w-4" /> Restart
          </Button>
        </div>
      </div>
    </motion.section>
  );
};

// Main Multi-Step Form Component
const initialValues: FormItems = {
  name: "",
  email: "",
  phone: "",
  plan: "arcade",
  yearly: false,
  addOns: [
    {
      id: 1,
      checked: true,
      title: "Online Service",
      subtitle: "Access to multiple games",
      price: 1,
    },
    {
      id: 2,
      checked: false,
      title: "Large storage",
      subtitle: "Extra 1TB of cloud save",
      price: 2,
    },
    {
      id: 3,
      checked: false,
      title: "Customizable Profile",
      subtitle: "Custom theme on your profile",
      price: 2,
    },
  ],
};

export function MultiStepForm() {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const {
    previousStep,
    nextStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    goTo,
    showSuccessMsg,
  } = useMultiStepForm(4);

  function updateForm(fieldToUpdate: Partial<FormItems>) {
    const { name, email, phone } = fieldToUpdate;

    if (name && name.trim().length < 3) {
      setErrors((prevState) => ({
        ...prevState,
        name: "Name should be at least 3 characters long",
      }));
    } else if (name && name.trim().length > 15) {
      setErrors((prevState) => ({
        ...prevState,
        name: "Name should be no longer than 15 characters",
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        name: "",
      }));
    }

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      setErrors((prevState) => ({
        ...prevState,
        email: "Please enter a valid email address",
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        email: "",
      }));
    }

    if (phone && !/^[0-9]{10}$/.test(phone)) {
      setErrors((prevState) => ({
        ...prevState,
        phone: "Please enter a valid 10-digit phone number",
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        phone: "",
      }));
    }

    setFormData({ ...formData, ...fieldToUpdate });
  }

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error)) {
      return;
    }
    nextStep();
  };

  return (
    <div
      className={`flex justify-between ${
        currentStepIndex === 1 ? "h-[600px] md:h-[500px]" : "h-[500px]"
      } relative m-1 w-11/12 max-w-4xl rounded-lg border border-neutral-700 bg-[#262626] p-4`}
    >
      {!showSuccessMsg ? (
        <SideBar currentStepIndex={currentStepIndex} goTo={goTo} />
      ) : (
        ""
      )}
      <main
        className={`${showSuccessMsg ? "w-full" : "w-full md:mt-5 md:w-[65%]"}`}
      >
        {showSuccessMsg ? (
          <AnimatePresence mode="wait">
            <SuccessMessage />
          </AnimatePresence>
        ) : (
          <form
            onSubmit={handleOnSubmit}
            className="flex h-full w-full flex-col justify-between"
          >
            <AnimatePresence mode="wait">
              {currentStepIndex === 0 && (
                <UserInfoForm
                  key="step1"
                  {...formData}
                  updateForm={updateForm}
                  errors={errors}
                />
              )}
              {currentStepIndex === 1 && (
                <PlanForm key="step2" {...formData} updateForm={updateForm} />
              )}
              {currentStepIndex === 2 && (
                <AddonsForm key="step3" {...formData} updateForm={updateForm} />
              )}
              {currentStepIndex === 3 && (
                <FinalStep
                  updateForm={updateForm}
                  key="step4"
                  {...formData}
                  goTo={goTo}
                />
              )}
            </AnimatePresence>
            <div className="flex w-full items-center justify-between">
              <div className="">
                <Button
                  onClick={previousStep}
                  type="button"
                  variant="ghost"
                  className={`${isFirstStep ? "invisible" : "visible p-0 text-neutral-200 hover:text-white"}`}
                >
                  Go Back
                </Button>
              </div>
              <div className="flex items-center">
                <div className="after:shadow-highlight relative after:pointer-events-none after:absolute after:inset-px after:rounded-[11px] after:shadow-white/10 after:transition focus-within:after:shadow-[#77f6aa]">
                  <Button
                    type="submit"
                    className="relative rounded-xl border border-black/20 bg-neutral-900 text-neutral-200 shadow-black/10 shadow-input hover:text-white"
                  >
                    {isLastStep ? "Confirm" : "Next Step"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
