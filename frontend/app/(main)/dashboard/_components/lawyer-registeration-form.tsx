import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, useWatch } from "react-hook-form";

import { FormInput, FormSelect, FormTextArea } from "@/components/form-fields";
import Modal from "@/components/layouts/modal";
import { Button } from "@/components/ui/button";
import {
  defaultLawyerServices,
  defaultLawyerSpecialization,
} from "@/lib/constant";
import { IconClose, IconDelete, IconLawyerSolid } from "@/lib/icons";
import { cn } from "@/lib/utils";

import { LawyerRegistrationSchema } from "../_schemas/lawyer-registeration";

interface LawyerRegisterationFormProps {
  showModal: boolean;
  onClose: () => void;
}

function LawyerRegisterationForm({
  showModal,
  onClose,
}: LawyerRegisterationFormProps) {
  const {
    control,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LawyerRegistrationSchema),
    mode: "onChange",
    defaultValues: {
      services: [],
    },
  });

  const servicesArray = useFieldArray({
    control: control,
    name: "services",
  });

  const servicesWatch = useWatch({ control, name: "services" });
  const currServiceIndex = servicesWatch.length - 1;

  return (
    <Modal showModal={showModal} onClose={onClose}>
      <form action="">
        <h3 className="flex items-center gap-4 text-lg font-medium">
          <IconLawyerSolid className="h-4" />
          <span>Lawyer Registration Form</span>
        </h3>

        <div className="space-y-4 py-6">
          <FormTextArea
            {...register("bio")}
            label="Bio"
            placeholder="Enter your bio"
            error={errors?.bio?.message}
          />

          <FormSelect
            control={control}
            registerName="specialization"
            label="Specialization"
            placeholder="Select your specialization"
            options={defaultLawyerSpecialization.reduce(
              (acc: Record<string, string>, curr: string, i) => {
                acc[curr] = curr;
                return acc;
              },
              {},
            )}
          />

          <FormInput
            {...register("experienceInYr")}
            label="Experience"
            error={errors?.experienceInYr?.message}
            placeholder="Enter your experience in years"
          />

          <div className="">
            <div className="mb-1 inline-block text-sm">Services</div>

            <div className="space-y-1">
              {servicesArray.fields.map((item, index) => (
                <div key={item.id} className="flex items-center gap-2">
                  <FormSelect
                    control={control}
                    registerName={`services.${index}.value`}
                    className={cn(
                      servicesWatch[index]?.value !== "Other" && "w-full",
                    )}
                    placeholder="Select your services"
                    options={defaultLawyerServices.reduce(
                      (acc: Record<string, string>, curr: string, i) => {
                        acc[curr] = curr;
                        return acc;
                      },
                      {},
                    )}
                  />
                  {servicesWatch[currServiceIndex]?.value === "Other" && (
                    <FormInput
                      {...register(`services.${currServiceIndex}.other`)}
                      placeholder="Enter your service"
                    />
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => servicesArray.remove(index)}
                  >
                    <IconDelete className="h-5 text-muted-foreground" />
                  </Button>
                </div>
              ))}
            </div>

            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="mt-1.5 flex items-center gap-2"
              onClick={() => servicesArray.append({ value: "", other: "" })}
            >
              + Add Service
            </Button>
          </div>

          <FormInput
            {...register("consultationFees")}
            label="Consultation Fees"
            placeholder="Enter your consultation fees"
            error={errors?.consultationFees?.message}
          />

          <FormInput
            {...register("phoneNumber")}
            type="tel"
            label="Phone Number"
            placeholder="Enter your phone number"
            error={errors?.phoneNumber?.message}
          />
        </div>

        <Button className="w-full">Submit</Button>
      </form>
    </Modal>
  );
}

export default LawyerRegisterationForm;
